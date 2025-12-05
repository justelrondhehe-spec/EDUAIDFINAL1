import {
  ArrowLeft,
  CheckCircle,
  Music,
  Hand,
  Volume2,
  Trophy,
  Award,
  Play,
  Pause,
} from "lucide-react";
import {
  useState,
  useEffect,
  useRef,
  useCallback,
  MouseEvent,
  FocusEvent,
} from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { useApp } from "../contexts/AppContext";
import { Page } from "../App";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { ReadAloudButton } from "./ReadAloudButton";

interface MusicRhythmLessonProps {
  onBack: () => void;              // <- unified name
  onNavigate?: (page: Page) => void;
}

// Small helper for Web Audio click sound
declare global {
  interface Window {
    webkitAudioContext?: typeof AudioContext;
  }
}

export function MusicRhythmLesson({ onBack, onNavigate }: MusicRhythmLessonProps) {
  const {
    lessons,
    lessonProgress,
    completeLesson,
    startLesson,
    saveAndExitLesson,
  } = useApp();

  const [showCompletionDialog, setShowCompletionDialog] = useState(false);

  // --- Beat state ---
  const [isBeating, setIsBeating] = useState(false);
  const [beatCount, setBeatCount] = useState(0);
  const [selectedTempo, setSelectedTempo] = useState<
    "slow" | "medium" | "fast" | null
  >(null);

  // --- Pattern state ---
  const [isPlayingPattern, setIsPlayingPattern] = useState(false);
  const [currentPatternBeat, setCurrentPatternBeat] = useState(-1);
  const [activePatternIndex, setActivePatternIndex] = useState<number | null>(
    null
  );

  // --- Progress tracking inside the lesson ---
  const [hasUsedBeat, setHasUsedBeat] = useState(false);
  const [hasPlayedPatternOnce, setHasPlayedPatternOnce] = useState(false);
  const [hasPracticedReading, setHasPracticedReading] = useState(false);

  const beatIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // ---------- RESOLVE REAL LESSON ID (works with DB + fixtures) ----------
  const musicLessonFromContext =
    lessons.find(
      (l) =>
        l.title?.toLowerCase?.() === "music & rhythm" ||
        l.title?.toLowerCase?.() === "music and rhythm" ||
        (l as any).slug === "music-rhythm"
    ) || lessons.find((l) => Number(l.id) === 5);

  const rawLessonId: number | string =
    (musicLessonFromContext as any)?._id ??
    musicLessonFromContext?.id ??
    5; // fallback

  const lessonKey = rawLessonId as any;

  const lesson =
    lessonProgress[lessonKey] ??
    lessonProgress[String(lessonKey)] ??
    lessonProgress[Number(lessonKey) as any];

  const isLessonCompleted = lesson?.completed || false;

  // ---------- AUDIO HELPERS ----------

  const ensureAudioContext = useCallback((): AudioContext | null => {
    if (typeof window === "undefined") return null;
    if (audioCtxRef.current) return audioCtxRef.current;

    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;

    const ctx = new AC();
    if (ctx.state === "suspended") {
      ctx.resume().catch(() => {});
    }
    audioCtxRef.current = ctx;
    return ctx;
  }, []);

  const playClickSound = useCallback(() => {
    const ctx = ensureAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "square";
    osc.frequency.value = 880; // high-ish pitch

    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.12);
  }, [ensureAudioContext]);

  // ---------- PROGRESS COMPUTATION ----------

  const computeLocalProgress = () => {
    let sectionsDone = 0;
    if (hasUsedBeat) sectionsDone += 1;
    if (hasPlayedPatternOnce) sectionsDone += 1;
    if (hasPracticedReading) sectionsDone += 1;

    if (sectionsDone === 0) return 0;
    if (sectionsDone === 1) return 33;
    if (sectionsDone === 2) return 67;
    return 100;
  };

  const localProgress = computeLocalProgress();

  const currentProgress =
    typeof lesson?.progressPercent === "number"
      ? Math.max(lesson.progressPercent, localProgress)
      : localProgress;

  const safeProgress = Math.round(
    Math.min(Math.max(currentProgress, 0), 100)
  );

  // ---------- LIFECYCLE ----------

  useEffect(() => {
    if (!lesson && !isLessonCompleted) {
      startLesson(lessonKey);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isLessonCompleted) {
      setShowCompletionDialog(false);
    }
  }, [isLessonCompleted]);

  // Tempo → interval ms
  const getTempoInterval = (tempo: typeof selectedTempo) => {
    switch (tempo) {
      case "slow":
        return 1000;
      case "fast":
        return 400;
      case "medium":
      default:
        return 600;
    }
  };

  // Beat loop with sound
  useEffect(() => {
    if (!isBeating) {
      if (beatIntervalRef.current) {
        clearInterval(beatIntervalRef.current);
        beatIntervalRef.current = null;
      }
      return;
    }

    const intervalMs = getTempoInterval(selectedTempo);

    if (beatIntervalRef.current) {
      clearInterval(beatIntervalRef.current);
    }

    beatIntervalRef.current = setInterval(() => {
      setBeatCount((prev) => {
        const next = prev >= 4 ? 1 : prev + 1;
        playClickSound();
        return next;
      });
    }, intervalMs);

    return () => {
      if (beatIntervalRef.current) {
        clearInterval(beatIntervalRef.current);
        beatIntervalRef.current = null;
      }
    };
  }, [isBeating, selectedTempo, playClickSound]);

  // Clean up audio context on unmount
  useEffect(() => {
    return () => {
      if (beatIntervalRef.current) {
        clearInterval(beatIntervalRef.current);
      }
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  // ---------- HANDLERS ----------

  const handleSaveAndExit = () => {
    const progressToSave = Math.round(
      Math.min(Math.max(currentProgress, 0), 100)
    );
    saveAndExitLesson(lessonKey, progressToSave);
    onBack();
  };

  const startBeating = () => {
    // First user interaction → safe to create audio context
    playClickSound();
    setBeatCount(0);
    setIsBeating(true);
    setHasUsedBeat(true);
  };

  const stopBeating = () => {
    setIsBeating(false);
  };

  const simplePatterns = [
    {
      name: "Pattern 1",
      beats: ["clap", "clap", "rest", "clap"] as const,
      notation: "ta ta (rest) ta",
    },
    {
      name: "Pattern 2",
      beats: ["clap", "rest", "clap", "clap"] as const,
      notation: "ta (rest) ta ta",
    },
    {
      name: "Pattern 3",
      beats: ["clap", "clap", "clap", "rest"] as const,
      notation: "ta ta ta (rest)",
    },
  ];

  // Only the clicked pattern animates (and makes sound)
  const playPattern = (patternIndex: number) => {
    if (isPlayingPattern) return;

    const pattern = simplePatterns[patternIndex];
    setIsPlayingPattern(true);
    setActivePatternIndex(patternIndex);
    setCurrentPatternBeat(-1);
    setHasPlayedPatternOnce(true);

    pattern.beats.forEach((beat, index) => {
      setTimeout(() => {
        setCurrentPatternBeat(index);
        if (beat === "clap") {
          playClickSound();
        }
      }, index * 600);
    });

    setTimeout(() => {
      setIsPlayingPattern(false);
      setCurrentPatternBeat(-1);
      setActivePatternIndex(null);
    }, pattern.beats.length * 600 + 150);
  };

  const rhythmSymbols = [
    {
      name: "Quarter Note",
      symbol: "♩",
      sound: "ta",
      duration: "1 beat",
    },
    {
      name: "Eighth Notes",
      symbol: "♫",
      sound: "ti-ti",
      duration: "2 quick beats",
    },
    {
      name: "Rest",
      symbol: "𝄽",
      sound: "(silence)",
      duration: "1 beat",
    },
  ];

  const exampleRhythms = [
    {
      name: "Easy Pattern",
      pattern: ["♩", "♫", "♩", "𝄽"],
      sounds: ["ta", "ti-ti", "ta", "(rest)"],
      color: "from-yellow-500 to-orange-600",
    },
    {
      name: "Marching Pattern",
      pattern: ["♩", "♩", "♩", "♩"],
      sounds: ["ta", "ta", "ta", "ta"],
      color: "from-red-500 to-rose-600",
    },
  ];

  // Mark reading section as "touched" for progress on hover OR focus OR click
  const markPracticedReading = (
    _e: MouseEvent<HTMLDivElement> | FocusEvent<HTMLDivElement>
  ) => {
    if (!hasPracticedReading) {
      setHasPracticedReading(true);
    }
  };

  // ---------- UI ----------

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header row (back + badge) */}
      <div className="flex items-center justify-between gap-4">
        <Button
          variant="outline"
          onClick={onBack}
          className="dark:bg-slate-800 dark:border-slate-700 rounded-2xl px-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to lessons
        </Button>

        <Badge className="bg-pink-500 hover:bg-pink-600 flex items-center gap-1 px-3 py-1 rounded-full text-xs text-white">
          <Music className="w-3 h-3" />
          Arts • Rhythm
        </Badge>
      </div>

      {/* HERO */}
      <div className="bg-gradient-to-br from-pink-500 via-pink-500 to-pink-400 rounded-3xl p-6 md:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
        <div className="absolute -left-8 bottom-0 w-40 h-40 bg-pink-900/20 rounded-full blur-2xl" />

        <div className="relative space-y-6 max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-3 py-1 text-xs font-medium">
            ✨ Move to the beat
          </div>

          <div>
            <h1 className="text-2xl md:text-3xl font-semibold">
              Music &amp; Rhythm
            </h1>
            <p className="mt-2 text-sm md:text-base text-pink-50/90">
              Explore sounds, rhythms, and musical patterns.
            </p>

            {/* Read hero aloud */}
            <div className="mt-4">
              <ReadAloudButton
                text="Music and Rhythm. In this lesson we explore sounds, rhythms, and simple musical patterns. We will clap the beat, copy patterns, and read easy rhythms together."
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-8 text-sm">
            <div>
              <div className="text-xs uppercase tracking-wide text-pink-100">
                Duration
              </div>
              <div className="font-medium">18 min</div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-wide text-pink-100">
                Level
              </div>
              <div className="font-medium">Beginner</div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-wide text-pink-100">
                Rating
              </div>
              <div className="font-medium">⭐ 4.5</div>
            </div>
          </div>
        </div>
      </div>

      {/* YOUR PROGRESS */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md border border-slate-200 dark:border-slate-700 p-6">
        <h3 className="text-slate-900 dark:text-slate-100 text-lg mb-3">
          Your progress
        </h3>
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-slate-500 dark:text-slate-300">
            Lesson completion
          </span>
          <span className="text-slate-700 dark:text-slate-100 font-medium">
            {safeProgress}%
          </span>
        </div>
        <div className="h-2 rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-orange-400 to-orange-600"
            style={{ width: `${safeProgress}%` }}
          />
        </div>
        <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
          Tip: Touch or say each beat aloud while clapping the rhythm.
        </p>
      </div>

      {/* Section 1: Feel the Beat */}
      <div>
        <div className="mb-6">
          <h2 className="text-slate-800 dark:text-slate-100 mb-2">
            1. Feel the Beat
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            Start with a steady beat at a comfortable tempo.
          </p>
        </div>

        <div className="mb-4">
          <ReadAloudButton
            small
            text="Section one. Feel the beat. We will clap and count one, two, three, four to a steady beat."
          />
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-8">
          <div className="space-y-6">
            {/* Interactive Beat Counter */}
            <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl p-8 text-white">
              <h3 className="text-white mb-4 flex items-center gap-2">
                <Hand className="w-6 h-6" />
                Let&apos;s Clap Together!
              </h3>
              <p className="text-white/90 mb-6">
                Watch the numbers and clap along. Count 1–2–3–4 in a loop.
              </p>

              <div className="flex justify-center mb-6">
                <div
                  style={{
                    width: 170,
                    height: 170,
                    borderRadius: "9999px",
                    border: "4px solid #ffffff",
                    background: "rgba(255,255,255,0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "transform 150ms ease-out",
                    transform:
                      isBeating && beatCount > 0 ? "scale(1.1)" : "scale(1)",
                  }}
                >
                  <span
                    style={{
                      fontSize: 80,
                      fontWeight: 300,
                      lineHeight: 1,
                      color: "#ffffff",
                    }}
                  >
                    {beatCount > 0 ? beatCount : "•"}
                  </span>
                </div>
              </div>

              <div className="flex justify-center gap-4">
                <Button
                  onClick={startBeating}
                  disabled={isBeating}
                  className="bg-white text-blue-600 hover:bg-blue-50 disabled:opacity-50"
                  size="lg"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Start Beat
                </Button>
                <Button
                  onClick={stopBeating}
                  disabled={!isBeating}
                  className="bg-white/20 text-white border-2 border-white hover:bg-white/30 disabled:opacity-50"
                  size="lg"
                >
                  <Pause className="w-5 h-5 mr-2" />
                  Stop
                </Button>
              </div>
            </div>

            {/* Instructions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
                <div className="text-4xl mb-3">👏</div>
                <h4 className="text-slate-800 dark:text-slate-100 mb-2">
                  Step 1
                </h4>
                <p className="text-slate-600 dark:text-slate-400">
                  Tap your knees or clap along with a simple song.
                </p>
              </div>

              <div className="bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-6 border border-green-200 dark:border-green-800">
                <div className="text-4xl mb-3">🔢</div>
                <h4 className="text-slate-800 dark:text-slate-100 mb-2">
                  Step 2
                </h4>
                <p className="text-slate-600 dark:text-slate-400">
                  Count 1–2–3–4 in a loop as you clap.
                </p>
              </div>

              <div className="bg-gradient-to-br from-yellow-100 to-orange-100 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-xl p-6 border border-yellow-200 dark:border-yellow-800">
                <div className="text-4xl mb-3">🙌</div>
                <h4 className="text-slate-800 dark:text-slate-100 mb-2">
                  Step 3
                </h4>
                <p className="text-slate-600 dark:text-slate-400">
                  Switch body parts: clap, tap shoulders, tap desk.
                </p>
              </div>
            </div>

            {/* Tempo Selection */}
            <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
              <h4 className="text-slate-800 dark:text-slate-100 mb-4">
                Try Different Tempos
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                  onClick={() => setSelectedTempo("slow")}
                  className={`p-6 rounded-xl border-2 transition-all ${
                    selectedTempo === "slow"
                      ? "bg-blue-500 border-blue-500 text-white shadow-lg"
                      : "bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:border-blue-400"
                  }`}
                >
                  <div className="text-3xl mb-2">🐢</div>
                  <div className="mb-1">Slow</div>
                  <div className="text-sm opacity-80">Like a turtle</div>
                </button>

                <button
                  onClick={() => setSelectedTempo("medium")}
                  className={`p-6 rounded-xl border-2 transition-all ${
                    selectedTempo === "medium" || selectedTempo === null
                      ? "bg-blue-500 border-blue-500 text-white shadow-lg"
                      : "bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:border-blue-400"
                  }`}
                >
                  <div className="text-3xl mb-2">🚶</div>
                  <div className="mb-1">Medium</div>
                  <div className="text-sm opacity-80">Like walking</div>
                </button>

                <button
                  onClick={() => setSelectedTempo("fast")}
                  className={`p-6 rounded-xl border-2 transition-all ${
                    selectedTempo === "fast"
                      ? "bg-blue-500 border-blue-500 text-white shadow-lg"
                      : "bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:border-blue-400"
                  }`}
                >
                  <div className="text-3xl mb-2">🐰</div>
                  <div className="mb-1">Fast</div>
                  <div className="text-sm opacity-80">Like a rabbit</div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section 2: Copy the Pattern */}
      <div>
        <div className="mb-6">
          <h2 className="text-slate-800 dark:text-slate-100 mb-2">
            2. Copy the Pattern
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            Echo simple patterns the teacher claps or plays.
          </p>
        </div>

        <div className="mb-4">
          <ReadAloudButton
            small
            text="Section two. Copy the pattern. Listen to the clapping pattern and then clap it back: ta ta rest ta."
          />
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-8">
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl p-8 text-white">
              <h3 className="text-white mb-4 flex items-center gap-2">
                <Volume2 className="w-6 h-6" />
                Listen and Repeat
              </h3>
              <p className="text-white/90 mb-6">
                Start with 3–4 beats: clap–clap–rest–clap. Say the pattern:
                &quot;ta ta (rest) ta&quot;.
              </p>

              {/* Pattern Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {simplePatterns.map((pattern, index) => (
                  <div
                    key={index}
                    className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/30"
                  >
                    <h4 className="text-white mb-4">{pattern.name}</h4>

                    {/* Beat Visualization */}
                    <div className="flex justify-center gap-2 mb-4">
                      {pattern.beats.map((beat, beatIndex) => (
                        <div
                          key={beatIndex}
                          className={`w-12 h-12 rounded-lg flex items-center justify-center text-2xl transition-all ${
                            activePatternIndex === index &&
                            currentPatternBeat === beatIndex &&
                            isPlayingPattern
                              ? "bg-white scale-110 shadow-lg"
                              : "bg-white/20"
                          } ${beat === "rest" ? "opacity-40" : ""}`}
                        >
                          {beat === "clap" ? "👏" : "•"}
                        </div>
                      ))}
                    </div>

                    {/* Pattern Notation */}
                    <div className="bg-white/10 rounded-lg p-3 mb-4">
                      <p className="text-white text-center">
                        {pattern.notation}
                      </p>
                    </div>

                    <Button
                      onClick={() => playPattern(index)}
                      disabled={isPlayingPattern}
                      className="w-full bg-white text-purple-600 hover:bg-purple-50 disabled:opacity-50"
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Play Pattern
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Practice Tips */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
                <div className="text-4xl mb-3">👂</div>
                <h4 className="text-slate-800 dark:text-slate-100 mb-2">
                  Listen First
                </h4>
                <p className="text-slate-600 dark:text-slate-400">
                  Pay attention to the pattern before you try to copy it.
                </p>
              </div>

              <div className="bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-6 border border-green-200 dark:border-green-800">
                <div className="text-4xl mb-3">🗣️</div>
                <h4 className="text-slate-800 dark:text-slate-100 mb-2">
                  Say It Out Loud
                </h4>
                <p className="text-slate-600 dark:text-slate-400">
                  Use words like &quot;ta&quot; and &quot;rest&quot; to help
                  remember.
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6 border border-purple-200 dark:border-purple-800">
                <div className="text-4xl mb-3">✨</div>
                <h4 className="text-slate-800 dark:text-slate-100 mb-2">
                  Create Your Own
                </h4>
                <p className="text-slate-600 dark:text-slate-400">
                  Let learners create their own short pattern!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section 3: Read Simple Rhythms */}
      <div>
        <div className="mb-6">
          <h2 className="text-slate-800 dark:text-slate-100 mb-2">
            3. Read Simple Rhythms
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            Connect symbols to sounds using quarter notes and eighth notes.
          </p>
        </div>

        <div className="mb-4">
          <ReadAloudButton
            small
            text="Section three. Read simple rhythms. We will match music symbols like quarter notes and eighth notes to sounds like ta and ti ti."
          />
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-8">
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-8 text-white">
              <h3 className="text-white mb-6 flex items-center gap-2">
                <Music className="w-6 h-6" />
                Musical Symbols
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {rhythmSymbols.map((symbol, index) => (
                  <div
                    key={index}
                    className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/30"
                  >
                    <div className="text-7xl text-center mb-4">
                      {symbol.symbol}
                    </div>
                    <h4 className="text-white mb-2 text-center">
                      {symbol.name}
                    </h4>
                    <div className="space-y-2 text-center">
                      <div className="bg-white/20 rounded-lg px-3 py-2">
                        <div className="text-white/80 text-sm">Sound</div>
                        <div className="text-white">{symbol.sound}</div>
                      </div>
                      <div className="bg-white/20 rounded-lg px-3 py-2">
                        <div className="text-white/80 text-sm">Duration</div>
                        <div className="text-white">{symbol.duration}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-slate-800 dark:text-slate-100 mb-4">
                Practice Reading
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                Clap and say the pattern together, then try without speaking!
              </p>

              {/* Helpful Tips – marks section as done for progress when interacted with */}
              <div
                className="bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 rounded-xl p-6 border border-cyan-200 dark:border-cyan-800"
                onMouseEnter={markPracticedReading}
                onFocus={markPracticedReading}
                onClick={markPracticedReading}
                tabIndex={0}
              >
                <h4 className="text-slate-800 dark:text-slate-100 mb-4">
                  💡 Helpful Tips
                </h4>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-cyan-600 dark:text-cyan-400 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700 dark:text-slate-300">
                      Use &quot;ta&quot; for quarter notes (♩) — one steady
                      beat.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-cyan-600 dark:text-cyan-400 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700 dark:text-slate-300">
                      Use &quot;ti-ti&quot; for eighth notes (♫) — two quick
                      beats.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-cyan-600 dark:text-cyan-400 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700 dark:text-slate-300">
                      Show a 4-beat pattern and practice together.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-cyan-600 dark:text-cyan-400 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700 dark:text-slate-300">
                      Clap and say the pattern together, then try without
                      speaking.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                {exampleRhythms.map((rhythm, index) => (
                  <div
                    key={index}
                    className={`bg-gradient-to-br ${rhythm.color} rounded-2xl p-6 shadow-lg`}
                  >
                    <h4 className="text-white mb-4">{rhythm.name}</h4>

                    <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 mb-4">
                      <div className="flex justify-center gap-3 mb-4">
                        {rhythm.pattern.map((symbol, symbolIndex) => (
                          <div
                            key={symbolIndex}
                            className="w-16 h-16 bg-white/30 rounded-lg flex items-center justify-center text-4xl"
                          >
                            {symbol}
                          </div>
                        ))}
                      </div>
                      <div className="bg-white/20 rounded-lg p-3">
                        <p className="text-white text-center">
                          {rhythm.sounds.join(" ")}
                        </p>
                      </div>
                    </div>

                    <div className="text-white/90 text-sm text-center">
                      👏 Clap along with this rhythm pattern!
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Completion Section */}
      <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl p-8 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
          <div className="flex items-center gap-4">
            <CheckCircle className="w-12 h-12 text-white" />
            <div className="text-white">
              <h3 className="text-white mb-1">
                Ready to complete this lesson?
              </h3>
              <p className="text-white/90">
                You&apos;ve reviewed all the content. Mark this lesson as
                complete to unlock activities!
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            {!isLessonCompleted ? (
              <>
                <Button
                  onClick={() => {
                    completeLesson(lessonKey);
                    setShowCompletionDialog(true);
                  }}
                  className="bg-white text-emerald-600 hover:bg-emerald-50"
                >
                  <Trophy className="w-4 h-4 mr-2" />
                  Complete lesson
                </Button>
                <Button
                  onClick={handleSaveAndExit}
                  variant="outline"
                  className="bg-white/10 border-white/30 text-white hover:bg-white/20"
                >
                  Save &amp; Exit
                </Button>
                <Button
                  variant="outline"
                  className="bg-white/10 border-white/30 text-white hover:bg-white/20"
                  onClick={() => onNavigate?.("activities")}
                >
                  Rhythm challenge
                </Button>
              </>
            ) : (
              <>
                <Button
                  onClick={onBack}
                  className="bg-white text-emerald-600 hover:bg-emerald-50"
                >
                  Back to lessons
                </Button>
                <Button
                  variant="outline"
                  className="bg-white/10 border-white/30 text-white hover:bg-white/20"
                  onClick={() => onNavigate?.("activities")}
                >
                  Rhythm challenge
                </Button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Completion Dialog */}
      <Dialog open={showCompletionDialog} onOpenChange={setShowCompletionDialog}>
        <DialogContent className="sm:max-w-md">
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center">
              <Trophy className="w-10 h-10 text-white" />
            </div>
          </div>
          <DialogHeader>
            <DialogTitle className="text-center text-2xl">
              Lesson completed! 🎉
            </DialogTitle>
            <DialogDescription className="text-center">
              Congratulations! You&apos;ve successfully completed the Music
              &amp; Rhythm lesson.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 border border-emerald-200 dark:border-emerald-800/30 rounded-xl p-4">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Award className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                <span className="text-emerald-700 dark:text-emerald-300">
                  +100 Points earned
                </span>
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400 text-center">
                Great job learning about rhythm and music! Keep practicing!
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 mt-4">
            <Button
              onClick={() => {
                setShowCompletionDialog(false);
                onBack();
              }}
              className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700"
            >
              Back to lessons
            </Button>
            <Button
              onClick={() => setShowCompletionDialog(false)}
              variant="outline"
            >
              Continue reviewing
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
