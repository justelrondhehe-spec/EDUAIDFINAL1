// frontend/src/components/MusicRhythmActivity.tsx
import { useState, useEffect, useRef } from "react";
import {
  ArrowLeft,
  Star,
  Play,
  Volume2,
  Hand,
  Music,
  Trophy,
  Sparkles,
  Award,
  CheckCircle,
} from "lucide-react";
import { useApp } from "../contexts/AppContext";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";

interface MusicRhythmActivityProps {
  onBack: () => void;
}

export function MusicRhythmActivity({ onBack }: MusicRhythmActivityProps) {
  const { completeActivity, activityScores } = useApp();

  // IMPORTANT: must match activity id in DB / seed
  const activityId = 5;

  // Read existing score (if user already completed this before)
  const existingScore =
    activityScores[activityId] ?? activityScores[String(activityId)] ?? null;
  const isActivityCompleted = !!existingScore?.completed;

  // ----- Audio (simple beeps using Web Audio API) -----
  const [audioCtx, setAudioCtx] = useState<AudioContext | null>(null);

  const ensureAudioContext = () => {
    if (audioCtx) return audioCtx;
    const ctx = new (window.AudioContext ||
      (window as any).webkitAudioContext)();
    setAudioCtx(ctx);
    return ctx;
  };

  const playBeep = (frequency = 880, durationMs = 120) => {
    try {
      const ctx = ensureAudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.frequency.value = frequency;
      osc.type = "sine";
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(
        0.001,
        ctx.currentTime + durationMs / 1000
      );
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + durationMs / 1000);
    } catch {
      // fail silently if audio not available
    }
  };

  const playClapSound = () => playBeep(660, 140);
  const playMetronomeClick = (speed: "slow" | "medium" | "fast") => {
    if (speed === "slow") playBeep(440, 120);
    else if (speed === "medium") playBeep(660, 120);
    else playBeep(880, 100);
  };

  const playRhythmPattern = (pattern: ("clap" | "rest")[]) => {
    const ctx = ensureAudioContext();
    const baseTime = ctx.currentTime;
    const beatGap = 0.35;
    pattern.forEach((beat, i) => {
      if (beat === "clap") {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.frequency.value = 750;
        gain.gain.setValueAtTime(0.15, baseTime + i * beatGap);
        gain.gain.exponentialRampToValueAtTime(
          0.001,
          baseTime + i * beatGap + 0.18
        );
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(baseTime + i * beatGap);
        osc.stop(baseTime + i * beatGap + 0.2);
      }
    });
  };

  // ----- Backend score state -----
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [showCompletionDialog, setShowCompletionDialog] = useState(false);

  useEffect(() => {
    if (existingScore?.completed) {
      setHasSubmitted(true);
    }
  }, [existingScore]);

  // ----- Module 1: Tempo -----
  const [tempoAnswers, setTempoAnswers] = useState<Record<number, string>>({});
  const [currentTempoScenario, setCurrentTempoScenario] = useState(0);
  const [isPlayingTempo, setIsPlayingTempo] = useState(false);
  const beatIntervalRef = useRef<number | null>(null);

  const tempoScenarios = [
    {
      speed: "slow",
      emoji: "🐢",
      label: "Slow Beat",
      description: "Clap slowly with the turtle.",
      interval: 1200,
      feedback: "Slow beat... Clap... Clap...",
    },
    {
      speed: "fast",
      emoji: "🐰",
      label: "Fast Beat",
      description: "Clap quickly with the bunny.",
      interval: 300,
      feedback: "Fast beat! Clap-clap-clap!",
    },
    {
      speed: "medium",
      emoji: "🚶",
      label: "Steady Beat",
      description: "Clap like walking steps.",
      interval: 600,
      feedback: "Steady beat... Clap... Clap...",
    },
  ] as const;

  const currentTempo = tempoScenarios[currentTempoScenario];
  const tempoAnswer = tempoAnswers[currentTempoScenario];
  const isTempoCorrect = !!currentTempo && tempoAnswer === currentTempo.speed;

  const playTempo = (scenarioIndex: number) => {
    const scenario = tempoScenarios[scenarioIndex];
    if (!scenario) return;
    setIsPlayingTempo(true);

    if (beatIntervalRef.current !== null) {
      window.clearInterval(beatIntervalRef.current);
    }

    let beats = 0;
    playMetronomeClick(scenario.speed as any);
    beats++;

    const id = window.setInterval(() => {
      playMetronomeClick(scenario.speed as any);
      beats++;
      if (beats >= 4) {
        setIsPlayingTempo(false);
        window.clearInterval(id);
        beatIntervalRef.current = null;
      }
    }, scenario.interval);

    beatIntervalRef.current = id;
  };

  const handleTempoSelect = (speed: string) => {
    if (tempoAnswers[currentTempoScenario]) return;
    setTempoAnswers((prev) => ({ ...prev, [currentTempoScenario]: speed }));

    if (currentTempoScenario < tempoScenarios.length - 1) {
      setTimeout(() => {
        setCurrentTempoScenario((prev) => prev + 1);
        setIsPlayingTempo(false);
      }, 1800);
    }
  };

  // ----- Module 2: Echo Patterns -----
  const [patternAnswers, setPatternAnswers] = useState<Record<number, number[]>>(
    {}
  );
  const [currentPattern, setCurrentPattern] = useState(0);
  const [userTaps, setUserTaps] = useState<number[]>([]);
  const [isShowingPattern, setIsShowingPattern] = useState(false);
  const [currentBeat, setCurrentBeat] = useState(-1);

  const echoPatterns = [
    {
      name: "Pattern 1",
      pattern: [1, 1, 0, 1], // clap, clap, rest, clap
      hint: "ta ... ta ... (rest) ... ta",
      feedback: "Nice echo! Great timing!",
    },
    {
      name: "Pattern 2",
      pattern: [1, 0, 1, 1],
      hint: "ta ... (rest) ... ta ... ta",
      feedback: "Perfect rest in the middle!",
    },
    {
      name: "Pattern 3",
      pattern: [1, 1, 1, 0],
      hint: "ta ... ta ... ta ... (rest)",
      feedback: "Excellent! You matched the robot!",
    },
  ];

  const currentEchoPattern = echoPatterns[currentPattern];
  const patternAnswer = patternAnswers[currentPattern];
  const isPatternCorrect = !!patternAnswer;

  const playPattern = (patternIndex: number) => {
    const p = echoPatterns[patternIndex];
    if (!p) return;
    setIsShowingPattern(true);
    setCurrentBeat(-1);

    p.pattern.forEach((beat, idx) => {
      setTimeout(() => {
        setCurrentBeat(idx);
        if (beat === 1) playClapSound();
      }, idx * 600);
    });

    setTimeout(() => {
      setIsShowingPattern(false);
      setCurrentBeat(-1);
    }, p.pattern.length * 600 + 200);
  };

  const checkPattern = (taps: number[]) => {
    const pattern = echoPatterns[currentPattern];
    const isCorrect = taps.every((tap, i) => tap === pattern.pattern[i]);

    if (isCorrect) {
      setPatternAnswers((prev) => ({ ...prev, [currentPattern]: taps }));
      playRhythmPattern(
        pattern.pattern.map((b) => (b === 1 ? "clap" : "rest"))
      );

      setTimeout(() => {
        if (currentPattern < echoPatterns.length - 1) {
          setCurrentPattern((prev) => prev + 1);
          setUserTaps([]);
        }
      }, 1400);
    }
  };

  const handleUserTap = () => {
    if (userTaps.length >= 4 || isPatternCorrect) return;
    playClapSound();
    const newTaps = [...userTaps, 1];
    setUserTaps(newTaps);
    if (newTaps.length === 4) {
      checkPattern(newTaps);
    }
  };

  const handleRest = () => {
    if (userTaps.length >= 4 || isPatternCorrect) return;
    const newTaps = [...userTaps, 0];
    setUserTaps(newTaps);
    if (newTaps.length === 4) {
      checkPattern(newTaps);
    }
  };

  // ----- Module 3: Symbol matching -----
  const [symbolMatches, setSymbolMatches] = useState<Record<string, string>>(
    {}
  );

  const symbolItems = [
    { id: "hand1", emoji: "✋", name: "One Clap", correctBin: "ta" },
    { id: "hands", emoji: "👐", name: "Two Quick Claps", correctBin: "titi" },
    { id: "shh", emoji: "🤫", name: "Quiet / Rest", correctBin: "rest" },
  ];

  const handleSymbolDrop = (itemId: string, bin: string) => {
    const item = symbolItems.find((i) => i.id === itemId);
    if (!item) return;
    setSymbolMatches((prev) => ({ ...prev, [itemId]: bin }));
  };

  const allSymbolsCorrect =
    symbolItems.length === Object.keys(symbolMatches).length &&
    symbolItems.every((item) => symbolMatches[item.id] === item.correctBin);

  // ----- Module 4: Rhythm Reader -----
  const [readerSlots, setReaderSlots] = useState<string[]>(["", "", "", ""]);
  const targetPattern = ["♩", "♫", "♩", "𝄽"];
  const rhythmSymbols = ["", "♩", "♫", "𝄽"] as const;

  const cycleSlotSymbol = (slotIdx: number) => {
    setReaderSlots((prev) => {
      const next = [...prev];
      const current = prev[slotIdx] as (typeof rhythmSymbols)[number];
      const currentIndex = rhythmSymbols.indexOf(current);
      const nextIndex =
        currentIndex === -1
          ? 1
          : (currentIndex + 1) % rhythmSymbols.length;
      next[slotIdx] = rhythmSymbols[nextIndex];
      return next;
    });
  };

  const patternIsPerfect = readerSlots.every(
    (s, i) => s === targetPattern[i]
  );

  useEffect(() => {
    if (beatIntervalRef.current !== null) {
      return () => {
        window.clearInterval(beatIntervalRef.current!);
      };
    }
  }, []);

  // ----- Progress + completion -----
  const calculateProgress = () => {
    const module1 =
      (Object.keys(tempoAnswers).length / tempoScenarios.length) * 25;
    const module2 =
      (Object.keys(patternAnswers).length / echoPatterns.length) * 25;
    const module3 =
      (Object.keys(symbolMatches).length / symbolItems.length) * 25;
    const module4 =
      (readerSlots.filter((s, i) => s === targetPattern[i]).length / 4) * 25;
    return Math.round(module1 + module2 + module3 + module4);
  };

  const progress = calculateProgress();

  const allModulesComplete =
    Object.keys(tempoAnswers).length === tempoScenarios.length &&
    Object.keys(patternAnswers).length === echoPatterns.length &&
    allSymbolsCorrect &&
    patternIsPerfect;

  // simple per-module completion flags (for module cards)
  const module1Complete =
    Object.keys(tempoAnswers).length === tempoScenarios.length;
  const module2Complete =
    Object.keys(patternAnswers).length === echoPatterns.length;
  const module3Complete = allSymbolsCorrect;
  const module4Complete = patternIsPerfect;

  // auto-submit to backend when everything is correct + show popup
  useEffect(() => {
    if (!allModulesComplete || isActivityCompleted || hasSubmitted) return;

    const score = 100;
    const maxScore = 100;

    completeActivity(activityId, score, maxScore)
      .then(() => {
        setHasSubmitted(true);
        setShowCompletionDialog(true);
      })
      .catch((err) => {
        console.warn("Failed to complete Music Rhythm activity:", err);
      });
  }, [
    allModulesComplete,
    isActivityCompleted,
    hasSubmitted,
    completeActivity,
    activityId,
  ]);

  const handleReset = () => {
    setTempoAnswers({});
    setPatternAnswers({});
    setSymbolMatches({});
    setReaderSlots(["", "", "", ""]);
    setCurrentTempoScenario(0);
    setCurrentPattern(0);
    setUserTaps([]);
    setCurrentBeat(-1);
    setIsShowingPattern(false);
    setIsPlayingTempo(false);
    setHasSubmitted(false);
    setShowCompletionDialog(false);
  };

  const getGrade = () => {
    if (progress >= 95) return "A+";
    if (progress >= 90) return "A";
    if (progress >= 85) return "B+";
    if (progress >= 80) return "B";
    if (progress >= 70) return "C";
    return "D";
  };

  // ----- UI -----
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-slate-900 dark:via-purple-900/20 dark:to-pink-900/20 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={onBack}
            className="flex items-center gap-2 bg-white dark:bg-slate-800 rounded-xl shadow-sm hover:shadow-md border border-slate-200 dark:border-slate-700"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-slate-700 dark:text-slate-300">
              Back to Activities
            </span>
          </Button>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
              <Star className="w-5 h-5 text-yellow-500" />
              <span className="text-slate-700 dark:text-slate-300 font-semibold">
                Progress: {progress}%
              </span>
            </div>
            {isActivityCompleted && (
              <div className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-semibold flex items-center gap-1">
                <Trophy className="w-4 h-4" />
                Completed
              </div>
            )}
            <Button
              variant="outline"
              onClick={handleReset}
              className="bg-white dark:bg-slate-800 rounded-xl shadow-sm hover:shadow-md border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300"
            >
              Reset Activity
            </Button>
          </div>
        </div>

        {/* Title Card */}
        <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="relative z-10 flex flex-col md:flex-row gap-6 items-center">
            <div className="flex-shrink-0">
              <div className="w-24 h-24 rounded-3xl bg-white/20 flex items-center justify-center shadow-lg">
                <Music className="w-12 h-12 text-white" />
              </div>
            </div>
            <div className="flex-1 text-white space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs uppercase tracking-wide">
                <Sparkles className="w-4 h-4" />
                Music & Rhythm
              </div>
              <h1 className="text-3xl font-bold">Music & Rhythm Activity</h1>
              <p className="text-white/90 text-sm md:text-base">
                4 colorful, sound-filled modules to help learners feel the beat,
                echo patterns, read simple rhythms, and build their own.
              </p>
              <div className="flex flex-wrap gap-2 text-xs">
                <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm">
                  🎵 Lots of sound
                </span>
                <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm">
                  👆 Big tap buttons
                </span>
                <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm">
                  😊 Kid-friendly visuals
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Module cards overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 shadow border border-slate-200 dark:border-slate-700 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">
                Module 1
              </span>
              {module1Complete && (
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">
                  Done
                </span>
              )}
            </div>
            <div className="text-lg font-semibold text-slate-800 dark:text-slate-100">
              Feel the Beat
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400">
              Slow, medium, and fast tempos.
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 shadow border border-slate-200 dark:border-slate-700 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">
                Module 2
              </span>
              {module2Complete && (
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">
                  Done
                </span>
              )}
            </div>
            <div className="text-lg font-semibold text-slate-800 dark:text-slate-100">
              Copy the Pattern
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400">
              Clap echoes to match the robot.
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 shadow border border-slate-200 dark:border-slate-700 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">
                Module 3
              </span>
              {module3Complete && (
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">
                  Done
                </span>
              )}
            </div>
            <div className="text-lg font-semibold text-slate-800 dark:text-slate-100">
              Read Simple Rhythms
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400">
              Match emojis to ta, ti-ti, and rest.
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 shadow border border-slate-200 dark:border-slate-700 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">
                Module 4
              </span>
              {module4Complete && (
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">
                  Done
                </span>
              )}
            </div>
            <div className="text-lg font-semibold text-slate-800 dark:text-slate-100">
              Rhythm Reader
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400">
              Tap symbols to build the pattern.
            </div>
          </div>
        </div>

        {/* Module 1: Tempo */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg border border-slate-200 dark:border-slate-700 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-3xl">
              🥁
            </div>
            <div>
              <h2 className="text-slate-800 dark:text-slate-100 text-2xl font-bold">
                Module 1: Feel the Beat
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Watch and listen. Is the beat slow, medium, or fast?
              </p>
            </div>
          </div>

          {currentTempo && (
            <div className="grid md:grid-cols-2 gap-6">
              {/* Visual + Play */}
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl p-6 border border-blue-200 dark:border-blue-800 flex flex-col items-center gap-4">
                <p className="text-slate-700 dark:text-slate-300 text-center text-sm md:text-base">
                  {currentTempo.description}
                </p>
                <div className="bg-white dark:bg-slate-900 rounded-3xl p-10 border-4 border-dashed border-blue-300 dark:border-blue-700 flex flex-col items-center gap-3">
                  <div
                    className={`text-8xl md:text-9xl transition-transform ${
                      isPlayingTempo ? "scale-110" : "scale-100"
                    }`}
                  >
                    👏
                  </div>
                  <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-xs">
                    <Volume2 className="w-4 h-4" />
                    <span>Turn on your sound</span>
                  </div>
                </div>
                <Button
                  onClick={() => playTempo(currentTempoScenario)}
                  disabled={isPlayingTempo || !!tempoAnswer}
                  className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white rounded-xl px-6 py-3 text-sm md:text-base disabled:bg-slate-300 disabled:cursor-not-allowed"
                >
                  <Play className="w-4 h-4" />
                  {isPlayingTempo ? "Listen..." : "Play the Beat"}
                </Button>
              </div>

              {/* Choices */}
              <div className="space-y-4">
                <p className="text-slate-700 dark:text-slate-300 text-center font-semibold">
                  Tap the speed that matches the beat:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {tempoScenarios.map((scenario, idx) => {
                    const isSelected = tempoAnswer === scenario.speed;
                    const isCorrectChoice =
                      isSelected && scenario.speed === currentTempo.speed;
                    const isWrongChoice =
                      isSelected && scenario.speed !== currentTempo.speed;
                    return (
                      <button
                        key={idx}
                        onClick={() => handleTempoSelect(scenario.speed)}
                        disabled={!!tempoAnswer}
                        className={`p-4 rounded-2xl border-3 text-center transition-all hover:scale-105 ${
                          isCorrectChoice
                            ? "bg-emerald-100 border-emerald-500 dark:bg-emerald-900/30 dark:border-emerald-500"
                            : isWrongChoice
                            ? "bg-red-100 border-red-500 dark:bg-red-900/30 dark:border-red-500"
                            : "bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700"
                        }`}
                      >
                        <div className="text-4xl mb-1">{scenario.emoji}</div>
                        <div className="font-semibold text-slate-800 dark:text-slate-100 text-sm">
                          {scenario.label}
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                          {scenario.speed === "slow" && "🐢 Slow"}
                          {scenario.speed === "medium" && "🚶 Medium"}
                          {scenario.speed === "fast" && "🐰 Fast"}
                        </div>
                      </button>
                    );
                  })}
                </div>
                {tempoAnswer && (
                  <div
                    className={`w-full p-4 rounded-xl text-center text-sm font-semibold ${
                      isTempoCorrect
                        ? "bg-emerald-100 dark:bg-emerald-900/30 border border-emerald-500 text-emerald-800 dark:text-emerald-300"
                        : "bg-red-100 dark:bg-red-900/30 border border-red-500 text-red-800 dark:text-red-300"
                    }`}
                  >
                    {isTempoCorrect
                      ? currentTempo.feedback
                      : "Not quite. Listen again to how fast or slow it is."}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Module 2: Echo Pattern */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg border border-slate-200 dark:border-slate-700 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-3xl">
              🤖
            </div>
            <div>
              <h2 className="text-slate-800 dark:text-slate-100 text-2xl font-bold">
                Module 2: Copy the Pattern
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Watch the robot lights, then clap the same pattern!
              </p>
            </div>
          </div>

          {currentEchoPattern && (
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-6 border border-purple-200 dark:border-purple-800 space-y-6">
              {/* Robot preview */}
              <div className="flex flex-col items-center">
                <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border-4 border-dashed border-purple-300 dark:border-purple-700 flex flex-col items-center gap-4 w-full max-w-md">
                  <div className="text-7xl">🤖</div>
                  <div className="flex justify-center gap-3 w-full">
                    {currentEchoPattern.pattern.map((beat, idx) => (
                      <div
                        key={idx}
                        className={`w-16 h-16 rounded-xl flex items-center justify-center text-2xl transition-all ${
                          isShowingPattern && currentBeat === idx
                            ? "bg-purple-500 text-white scale-110"
                            : beat === 1
                            ? "bg-purple-200 dark:bg-purple-800"
                            : "bg-gray-200 dark:bg-gray-700"
                        }`}
                      >
                        {beat === 1 ? "💡" : "⚫"}
                      </div>
                    ))}
                  </div>
                  <Button
                    onClick={() => playPattern(currentPattern)}
                    disabled={isShowingPattern || isPatternCorrect}
                    className="bg-purple-500 hover:bg-purple-600 text-white rounded-xl px-6 py-3 text-sm disabled:bg-slate-300 disabled:cursor-not-allowed"
                  >
                    <Play className="w-4 h-4 mr-1 inline" />
                    {isShowingPattern ? "Playing..." : "Watch the Pattern"}
                  </Button>
                  <p className="text-xs text-slate-500 dark:text-slate-400 text-center">
                    Hint: {currentEchoPattern.hint}
                  </p>
                </div>
              </div>

              {/* Child taps */}
              {!isPatternCorrect && (
                <div className="space-y-4">
                  <p className="text-center text-slate-800 dark:text-slate-100 font-semibold">
                    Your Turn – Tap or Rest:
                  </p>
                  <div className="flex justify-center gap-3 mb-4">
                    {[0, 1, 2, 3].map((idx) => (
                      <div
                        key={idx}
                        className={`w-16 h-16 rounded-xl flex items-center justify-center text-2xl border-2 border-dashed ${
                          userTaps[idx] !== undefined
                            ? userTaps[idx] === 1
                              ? "bg-blue-200 dark:bg-blue-800 border-blue-500"
                              : "bg-gray-200 dark:bg-gray-700 border-gray-500"
                            : "border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-900/60"
                        }`}
                      >
                        {userTaps[idx] === 1
                          ? "👏"
                          : userTaps[idx] === 0
                          ? "🤫"
                          : "?"}
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-wrap justify-center gap-4">
                    <Button
                      onClick={handleUserTap}
                      disabled={userTaps.length >= 4}
                      className="px-8 py-4 bg-blue-500 hover:bg-blue-600 disabled:bg-slate-300 text-white rounded-2xl text-lg flex items-center gap-2"
                    >
                      <Hand className="w-5 h-5" />
                      Clap
                    </Button>
                    <Button
                      onClick={handleRest}
                      disabled={userTaps.length >= 4}
                      className="px-8 py-4 bg-gray-500 hover:bg-gray-600 disabled:bg-slate-300 text-white rounded-2xl text-lg"
                    >
                      Rest
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setUserTaps([])}
                      className="px-6 py-4 rounded-2xl"
                    >
                      Clear
                    </Button>
                  </div>
                </div>
              )}

              {isPatternCorrect && (
                <div className="bg-emerald-100 dark:bg-emerald-900/30 border border-emerald-500 rounded-xl p-6 text-center">
                  <div className="text-6xl mb-2">🎉</div>
                  <p className="text-emerald-800 dark:text-emerald-300 font-bold text-lg">
                    {currentEchoPattern.feedback}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Module 3: Symbol Matching */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg border border-slate-200 dark:border-slate-700 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-3xl">
              ♩
            </div>
            <div>
              <h2 className="text-slate-800 dark:text-slate-100 text-2xl font-bold">
                Module 3: Read Simple Rhythms
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Match the picture with the correct music note.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {/* Bins */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl p-6 border-2 border-blue-300 dark:border-blue-700">
                <div className="text-center mb-2">
                  <div className="text-5xl mb-1">♩</div>
                  <h3 className="text-slate-800 dark:text-slate-100 font-bold text-sm">
                    Ta (One Beat)
                  </h3>
                </div>
                <div className="min-h-[96px] bg-white/60 dark:bg-slate-900/60 rounded-lg p-3 flex flex-wrap gap-2 justify-center items-center">
                  {symbolItems
                    .filter((i) => symbolMatches[i.id] === "ta")
                    .map((item) => (
                      <div
                        key={item.id}
                        className="text-4xl bg-white dark:bg-slate-800 rounded-xl p-2"
                      >
                        {item.emoji}
                      </div>
                    ))}
                </div>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-xl p-6 border-2 border-purple-300 dark:border-purple-700">
                <div className="text-center mb-2">
                  <div className="text-5xl mb-1">♫</div>
                  <h3 className="text-slate-800 dark:text-slate-100 font-bold text-sm">
                    Ti-Ti (Two Quick)
                  </h3>
                </div>
                <div className="min-h-[96px] bg-white/60 dark:bg-slate-900/60 rounded-lg p-3 flex flex-wrap gap-2 justify-center items-center">
                  {symbolItems
                    .filter((i) => symbolMatches[i.id] === "titi")
                    .map((item) => (
                      <div
                        key={item.id}
                        className="text-4xl bg-white dark:bg-slate-800 rounded-xl p-2"
                      >
                        {item.emoji}
                      </div>
                    ))}
                </div>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl p-6 border-2 border-green-300 dark:border-green-700">
                <div className="text-center mb-2">
                  <div className="text-5xl mb-1">𝄽</div>
                  <h3 className="text-slate-800 dark:text-slate-100 font-bold text-sm">
                    Rest (Silent)
                  </h3>
                </div>
                <div className="min-h-[96px] bg-white/60 dark:bg-slate-900/60 rounded-lg p-3 flex flex-wrap gap-2 justify-center items-center">
                  {symbolItems
                    .filter((i) => symbolMatches[i.id] === "rest")
                    .map((item) => (
                      <div
                        key={item.id}
                        className="text-4xl bg-white dark:bg-slate-800 rounded-xl p-2"
                      >
                        {item.emoji}
                      </div>
                    ))}
                </div>
              </div>
            </div>

            {/* Choices */}
            {symbolItems.filter((i) => !symbolMatches[i.id]).length > 0 && (
              <div className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-2xl p-6 border border-yellow-300 dark:border-yellow-700">
                <p className="text-slate-800 dark:text-slate-100 text-center mb-4 font-semibold text-sm">
                  Choose where each picture belongs:
                </p>
                <div className="flex flex-wrap gap-6 justify-center">
                  {symbolItems
                    .filter((i) => !symbolMatches[i.id])
                    .map((item) => (
                      <div
                        key={item.id}
                        className="flex flex-col items-center gap-2"
                      >
                        <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 text-5xl border-2 border-slate-200 dark:border-slate-600">
                          {item.emoji}
                        </div>
                        <div className="text-xs text-slate-700 dark:text-slate-300 mb-1">
                          {item.name}
                        </div>
                        <div className="flex flex-col gap-1 w-36">
                          <Button
                            onClick={() => handleSymbolDrop(item.id, "ta")}
                            className="h-8 text-xs bg-blue-500 hover:bg-blue-600"
                          >
                            → ♩ Ta
                          </Button>
                          <Button
                            onClick={() => handleSymbolDrop(item.id, "titi")}
                            className="h-8 text-xs bg-purple-500 hover:bg-purple-600"
                          >
                            → ♫ Ti-Ti
                          </Button>
                          <Button
                            onClick={() => handleSymbolDrop(item.id, "rest")}
                            className="h-8 text-xs bg-green-500 hover:bg-green-600"
                          >
                            → 𝄽 Rest
                          </Button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {allSymbolsCorrect && (
              <div className="bg-emerald-100 dark:bg-emerald-900/30 border border-emerald-500 rounded-xl p-6 text-center">
                <div className="text-6xl mb-2">🎉</div>
                <p className="text-emerald-800 dark:text-emerald-300 font-bold text-lg">
                  Perfect match! Your notes are glowing green!
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Module 4: Rhythm Reader */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg border border-slate-200 dark:border-slate-700 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-3xl">
              🎼
            </div>
            <div>
              <h2 className="text-slate-800 dark:text-slate-100 text-2xl font-bold">
                Module 4: Rhythm Reader
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Tap each box to build the rhythm you see.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {/* Target pattern */}
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-2xl p-6 border border-yellow-300 dark:border-yellow-700">
              <p className="text-center text-slate-800 dark:text-slate-100 mb-3 font-semibold text-sm">
                Target Pattern:
              </p>
              <div className="flex justify-center gap-3 mb-2">
                {targetPattern.map((sym, idx) => (
                  <div
                    key={idx}
                    className="bg-white dark:bg-slate-800 rounded-2xl p-4 text-5xl border-2 border-yellow-500"
                  >
                    {sym}
                  </div>
                ))}
              </div>
              <p className="text-center text-slate-600 dark:text-slate-400 text-xs mt-2">
                ta • ti-ti • ta • rest
              </p>
            </div>

            {/* Your pattern – TAP each box */}
            <div>
              <p className="text-center text-slate-800 dark:text-slate-100 mb-3 font-semibold text-sm">
                Your Pattern (tap each box to change it):
              </p>
              <div className="grid grid-cols-4 gap-3 mb-5">
                {readerSlots.map((slot, idx) => {
                  const isCorrect = slot === targetPattern[idx];
                  const hasSymbol = slot !== "";
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => cycleSlotSymbol(idx)}
                      className={`rounded-2xl p-6 min-h-[120px] flex items-center justify-center border-4 text-4xl transition-all focus:outline-none focus:ring-4 focus:ring-indigo-300 ${
                        isCorrect
                          ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20"
                          : hasSymbol
                          ? "border-red-500 bg-red-50 dark:bg-red-900/20"
                          : "border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900/40 text-slate-400 dark:text-slate-500 text-base"
                      }`}
                    >
                      {slot || `Tap ${idx + 1}`}
                    </button>
                  );
                })}
              </div>

              {patternIsPerfect && (
                <div className="bg-emerald-100 dark:bg-emerald-900/30 border border-emerald-500 rounded-xl p-6 text-center">
                  <div className="text-6xl mb-2">🏆</div>
                  <p className="text-emerald-800 dark:text-emerald-300 font-bold text-lg">
                    You built the rhythm! ta, ti-ti, ta, rest!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Big completion banner */}
        {allModulesComplete && (
          <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl p-8 text-center shadow-2xl">
            <div className="text-8xl mb-3">🎉</div>
            <h2 className="text-white text-3xl font-bold mb-2">
              Congratulations, Rhythm Master!
            </h2>
            <p className="text-white/90 text-lg mb-2">
              You finished all 4 modules with sound, symbols, and patterns!
            </p>
            <p className="text-white/80 text-sm">
              {hasSubmitted || isActivityCompleted
                ? "Your score is saved. You can replay anytime!"
                : "Saving your score..."}
            </p>
          </div>
        )}
      </div>

      {/* Completion Dialog */}
      <Dialog open={showCompletionDialog} onOpenChange={setShowCompletionDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-2xl">
              <Trophy className="w-8 h-8 text-yellow-500" />
              Rhythm Activity Complete!
            </DialogTitle>
            <DialogDescription>
              Awesome job! You completed all Music & Rhythm modules.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {/* Score Display */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-200 dark:border-purple-800 rounded-xl p-6">
              <div className="text-center mb-4">
                <div className="text-6xl mb-3">
                  {progress >= 90 ? "🌟" : progress >= 70 ? "⭐" : "💪"}
                </div>
                <div className="text-4xl text-purple-600 dark:text-purple-400 mb-2">
                  {progress}%
                </div>
                <div className="text-slate-600 dark:text-slate-400">
                  Grade:{" "}
                  <span className="text-slate-800 dark:text-slate-200 text-xl">
                    {getGrade()}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600 dark:text-slate-400">
                  Modules Completed:
                </span>
                <span className="text-slate-800 dark:text-slate-200">
                  4 / 4
                </span>
              </div>
              <div className="flex items-center justify-between text-sm mt-2">
                <span className="text-slate-600 dark:text-slate-400">
                  Activity Status:
                </span>
                <span className="text-slate-800 dark:text-slate-200">
                  Saved ✓
                </span>
              </div>
            </div>

            {/* Achievements */}
            <div className="space-y-2">
              {progress === 100 && (
                <div className="flex items-center gap-2 p-3 bg-yellow-100 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                  <Award className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                  <span className="text-slate-800 dark:text-slate-200">
                    Perfect Rhythm! You got everything right!
                  </span>
                </div>
              )}
              {progress >= 90 && (
                <div className="flex items-center gap-2 p-3 bg-blue-100 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <span className="text-slate-800 dark:text-slate-200">
                    Excellent work keeping the beat!
                  </span>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <Button
                onClick={onBack}
                className="flex-1 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700"
              >
                Back to Activities
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
