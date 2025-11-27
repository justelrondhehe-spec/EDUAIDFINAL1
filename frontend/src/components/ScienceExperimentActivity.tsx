import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  Trophy,
  Star,
} from "lucide-react";

interface ScienceExperimentActivityProps {
  onBack: () => void;
}

type BodyMapAnswers = Record<number, string>;
type HotColdAnswers = Record<string, string>;
type ToolMatches = Record<string, string>;
type SafetyAnswers = Record<number, boolean>;

interface SavedState {
  bodyMapAnswers: BodyMapAnswers;
  currentBodyMapQuestion: number;
  hotColdAnswers: HotColdAnswers;
  draggedItem: string | null;
  toolMatches: ToolMatches;
  selectedTool: string | null;
  safetyAnswers: SafetyAnswers;
  currentSafetyCard: number;
}

const STORAGE_KEY = "scienceExperimentActivityState";

export function ScienceExperimentActivity({ onBack }: ScienceExperimentActivityProps) {
  // Module 1: Senses Body Map
  const [bodyMapAnswers, setBodyMapAnswers] = useState<BodyMapAnswers>({});
  const [currentBodyMapQuestion, setCurrentBodyMapQuestion] = useState(0);

  // Module 2: Hot or Cold Sort
  const [hotColdAnswers, setHotColdAnswers] = useState<HotColdAnswers>({});
  const [draggedItem, setDraggedItem] = useState<string | null>(null);

  // Module 3: Match the Tool
  const [toolMatches, setToolMatches] = useState<ToolMatches>({});
  const [selectedTool, setSelectedTool] = useState<string | null>(null);

  // Module 4: Safety Check
  const [safetyAnswers, setSafetyAnswers] = useState<SafetyAnswers>({});
  const [currentSafetyCard, setCurrentSafetyCard] = useState(0);

  // Completion dialog
  const [showCompletionDialog, setShowCompletionDialog] = useState(false);

  // Body Map Questions
  const bodyMapQuestions = [
    {
      question: "Tap the part we use to SEE the rainbow.",
      correctAnswer: "eyes",
      emoji: "🌈",
      feedback: "Yes! Your eyes see colors.",
    },
    {
      question: "Tap the part we use to SMELL the flower.",
      correctAnswer: "nose",
      emoji: "🌸",
      feedback: "Sniff sniff! Good job.",
    },
    {
      question: "Tap the part we use to TOUCH the fuzzy bear.",
      correctAnswer: "hands",
      emoji: "🧸",
      feedback: "High five! Hands feel soft things.",
    },
  ];

  const bodyParts = [
    {
      id: "eyes",
      emoji: "👁️",
      label: "Eyes",
      position: "top-[25%] left-1/2 -translate-x-1/2",
    },
    {
      id: "ears",
      emoji: "👂",
      label: "Ears",
      position: "top-[28%] left-[20%]",
    },
    {
      id: "nose",
      emoji: "👃",
      label: "Nose",
      position: "top-[35%] left-1/2 -translate-x-1/2",
    },
    {
      id: "mouth",
      emoji: "👄",
      label: "Mouth",
      position: "top-[45%] left-1/2 -translate-x-1/2",
    },
    {
      id: "hands",
      emoji: "✋",
      label: "Hands",
      position: "top-[65%] left-1/2 -translate-x-1/2",
    },
  ];

  // Hot or Cold Items
  const hotColdItems = [
    { id: "icecream", emoji: "🍦", name: "Ice Cream", correctBin: "cold" },
    { id: "sun", emoji: "☀️", name: "Sun", correctBin: "hot" },
    { id: "snowman", emoji: "☃️", name: "Snowman", correctBin: "cold" },
    { id: "cocoa", emoji: "☕", name: "Hot Cocoa", correctBin: "hot" },
    { id: "fire", emoji: "🔥", name: "Campfire", correctBin: "hot" },
    { id: "ice", emoji: "🧊", name: "Ice Cube", correctBin: "cold" },
  ];

  // Tool Matching Data
  const tools = [
    { id: "magnifying", emoji: "🔍", name: "Magnifying Glass" },
    { id: "binoculars", emoji: "🔭", name: "Binoculars" },
    { id: "scale", emoji: "⚖️", name: "Balance Scale" },
  ];

  const matchObjects = [
    { id: "ant", emoji: "🐜", name: "Tiny Ant", correctTool: "magnifying" },
    { id: "bird", emoji: "🦅", name: "Bird in Tree", correctTool: "binoculars" },
    { id: "fruits", emoji: "🍎🍇", name: "Apple vs Grape", correctTool: "scale" },
  ];

  // Safety Cards
  const safetyCards = [
    {
      image: "🥽🧒",
      description: "Child wearing Goggles in a lab.",
      isSafe: true,
      feedback: "Safe! Goggles protect eyes.",
    },
    {
      image: "🧪👦",
      description: "Child tasting a blue liquid from a beaker.",
      isSafe: false,
      feedback: "Stop! Never taste without asking.",
    },
    {
      image: "🧼👧",
      description: "Washing hands with soap.",
      isSafe: true,
      feedback: "Clean hands keep germs away!",
    },
    {
      image: "🐻👶",
      description: "Poking a sleeping bear.",
      isSafe: false,
      feedback: "Unsafe! Be gentle with animals.",
    },
  ];

  // ---------- LOAD & SAVE PROGRESS (localStorage) ----------

  // Load once on mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return;

      const saved: SavedState = JSON.parse(raw);

      setBodyMapAnswers(saved.bodyMapAnswers ?? {});
      setCurrentBodyMapQuestion(saved.currentBodyMapQuestion ?? 0);
      setHotColdAnswers(saved.hotColdAnswers ?? {});
      setDraggedItem(saved.draggedItem ?? null);
      setToolMatches(saved.toolMatches ?? {});
      setSelectedTool(saved.selectedTool ?? null);
      setSafetyAnswers(saved.safetyAnswers ?? {});
      setCurrentSafetyCard(saved.currentSafetyCard ?? 0);
    } catch {
      // ignore corrupted storage
    }
  }, []);

  // Save whenever key parts of state change
  useEffect(() => {
    if (typeof window === "undefined") return;
    const toSave: SavedState = {
      bodyMapAnswers,
      currentBodyMapQuestion,
      hotColdAnswers,
      draggedItem,
      toolMatches,
      selectedTool,
      safetyAnswers,
      currentSafetyCard,
    };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
  }, [
    bodyMapAnswers,
    currentBodyMapQuestion,
    hotColdAnswers,
    draggedItem,
    toolMatches,
    selectedTool,
    safetyAnswers,
    currentSafetyCard,
  ]);

  // ---------- PROGRESS & COMPLETION ----------

  const calculateProgress = () => {
    const module1 =
      (Object.keys(bodyMapAnswers).length / bodyMapQuestions.length) * 25;
    const module2 =
      (Object.keys(hotColdAnswers).length / hotColdItems.length) * 25;
    const module3 =
      (Object.keys(toolMatches).length / matchObjects.length) * 25;
    const module4 =
      (Object.keys(safetyAnswers).length / safetyCards.length) * 25;
    return Math.round(module1 + module2 + module3 + module4);
  };

  const allModulesComplete =
    Object.keys(bodyMapAnswers).length === bodyMapQuestions.length &&
    Object.keys(hotColdAnswers).length === hotColdItems.length &&
    Object.keys(toolMatches).length === matchObjects.length &&
    Object.keys(safetyAnswers).length === safetyCards.length;

  // When everything is complete, show popup once
  useEffect(() => {
    if (allModulesComplete) {
      setShowCompletionDialog(true);
    }
  }, [allModulesComplete]);

  // ---------- HANDLERS ----------

  const handleBodyPartClick = (partId: string) => {
    if (bodyMapAnswers[currentBodyMapQuestion]) return;

    const isCorrect =
      partId === bodyMapQuestions[currentBodyMapQuestion].correctAnswer;
    setBodyMapAnswers({ ...bodyMapAnswers, [currentBodyMapQuestion]: partId });

    if (isCorrect && currentBodyMapQuestion < bodyMapQuestions.length - 1) {
      setTimeout(
        () => setCurrentBodyMapQuestion((prev) => prev + 1),
        1500
      );
    }
  };

  const handleDrop = (itemId: string, bin: string) => {
    const item = hotColdItems.find((i) => i.id === itemId);
    if (!item) return;

    setHotColdAnswers({ ...hotColdAnswers, [itemId]: bin });
    setDraggedItem(null);
  };

  const handleToolMatch = (objectId: string) => {
    if (!selectedTool) return;
    setToolMatches({ ...toolMatches, [objectId]: selectedTool });
    setSelectedTool(null);
  };

  const handleSafetyAnswer = (isSafe: boolean) => {
    if (safetyAnswers[currentSafetyCard] !== undefined) return;

    setSafetyAnswers({ ...safetyAnswers, [currentSafetyCard]: isSafe });

    if (currentSafetyCard < safetyCards.length - 1) {
      setTimeout(
        () => setCurrentSafetyCard((prev) => prev + 1),
        2000
      );
    }
  };

  const handleResetAll = () => {
    setBodyMapAnswers({});
    setCurrentBodyMapQuestion(0);
    setHotColdAnswers({});
    setDraggedItem(null);
    setToolMatches({});
    setSelectedTool(null);
    setSafetyAnswers({});
    setCurrentSafetyCard(0);
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  };

  const currentQuestion = bodyMapQuestions[currentBodyMapQuestion];
  const bodyMapAnswer = bodyMapAnswers[currentBodyMapQuestion];
  const isBodyMapCorrect =
    bodyMapAnswer === currentQuestion?.correctAnswer;

  const currentCard = safetyCards[currentSafetyCard];
  const safetyAnswer = safetyAnswers[currentSafetyCard];
  const isSafetyCorrect = safetyAnswer === currentCard?.isSafe;

  // ---------- UI ----------

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-slate-900 dark:via-purple-900/20 dark:to-indigo-900/20 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 rounded-xl shadow-sm hover:shadow-md transition-all border border-slate-200 dark:border-slate-700"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-slate-700 dark:text-slate-300">
              Back to Activities
            </span>
          </button>

          <div className="flex items-center gap-3">
            {/* Progress badge */}
            <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
              <Star className="w-5 h-5 text-yellow-500" />
              <span className="text-slate-700 dark:text-slate-300 font-semibold">
                Progress: {calculateProgress()}%
              </span>
            </div>

            {/* Reset all progress */}
            <button
              onClick={handleResetAll}
              className="px-3 py-2 text-xs font-medium rounded-lg bg-white/70 hover:bg-white shadow-sm border border-slate-200 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200"
            >
              Reset Activity
            </button>
          </div>
        </div>

        {/* Title Card */}
        <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="text-5xl">🔬</div>
              <h1 className="text-white text-3xl font-bold">
                Science Adventure: Explore Your Senses & Safety
              </h1>
            </div>
            <p className="text-white/90 mb-4">
              Complete 4 fun modules to become a Junior Scientist! Learn about
              your senses, temperature, tools, and safety rules.
            </p>
            <div className="flex gap-4 text-sm">
              <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-white">
                4 Modules
              </div>
              <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-white">
                Interactive
              </div>
              <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-white">
                Kid-Friendly
              </div>
            </div>
          </div>
        </div>

        {/* Module 1: The Senses Body Map */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg border border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-3 mb-6">
            <div className="text-4xl">👤</div>
            <div>
              <h2 className="text-slate-800 dark:text-slate-100 text-2xl font-bold">
                Module 1: The Senses Body Map
              </h2>
              <p className="text-slate-600 dark:text-slate-400">
                Tap the body part we use for each sense!
              </p>
            </div>
          </div>

          {currentQuestion && (
            <>
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl p-6 mb-6 border border-blue-200 dark:border-blue-800">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <div className="text-5xl">{currentQuestion.emoji}</div>
                  <h3 className="text-slate-800 dark:text-slate-100 font-bold text-xl">
                    {currentQuestion.question}
                  </h3>
                </div>

{/* Interactive Body Map */}
<div className="bg-white dark:bg-slate-900 rounded-2xl p-8 border-2 border-dashed border-blue-300 dark:border-blue-700 flex flex-col items-center gap-6">
  {/* kid silhouette */}
  <div className="text-[120px] opacity-20">🧒</div>

  {/* body part options in a grid, NOT absolute */}
  <div className="grid grid-cols-3 sm:grid-cols-5 gap-4">
    {bodyParts.map((part) => (
      <button
        key={part.id}
        onClick={() => handleBodyPartClick(part.id)}
        disabled={bodyMapAnswer !== undefined}
        className={`transition-all duration-200 hover:scale-105 disabled:cursor-not-allowed ${
          bodyMapAnswer === part.id && isBodyMapCorrect
            ? "scale-110"
            : ""
        }`}
      >
        <div
          className={`px-4 py-3 rounded-xl border-2 min-w-[90px] text-center shadow-sm transition-all ${
            bodyMapAnswer === part.id && isBodyMapCorrect
              ? "bg-emerald-100 dark:bg-emerald-900/30 border-emerald-500"
              : bodyMapAnswer === part.id
              ? "bg-red-100 dark:bg-red-900/30 border-red-500"
              : "bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 hover:border-blue-400"
          }`}
        >
          <div className="text-4xl mb-1">{part.emoji}</div>
          <div className="text-xs font-semibold text-slate-700 dark:text-slate-300">
            {part.label}
          </div>
        </div>
      </button>
    ))}
  </div>
</div>

                {/* Feedback */}
                {bodyMapAnswer && (
                  <div
                    className={`mt-4 p-4 rounded-xl animate-in fade-in-0 zoom-in-95 ${
                      isBodyMapCorrect
                        ? "bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800"
                        : "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-3xl">
                        {isBodyMapCorrect ? "✅" : "❌"}
                      </div>
                      <p
                        className={`font-semibold ${
                          isBodyMapCorrect
                            ? "text-emerald-700 dark:text-emerald-300"
                            : "text-red-700 dark:text-red-300"
                        }`}
                      >
                        {isBodyMapCorrect
                          ? currentQuestion.feedback
                          : "Try again! Think about which body part helps you with this sense."}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-center gap-2 text-slate-600 dark:text-slate-400">
                <span className="font-semibold">
                  Question {currentBodyMapQuestion + 1} of{" "}
                  {bodyMapQuestions.length}
                </span>
              </div>
            </>
          )}
        </div>

        {/* Module 2: Hot or Cold Sort */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg border border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-3 mb-6">
            <div className="text-4xl">🌡️</div>
            <div>
              <h2 className="text-slate-800 dark:text-slate-100 text-2xl font-bold">
                Module 2: Hot or Cold Sort
              </h2>
              <p className="text-slate-600 dark:text-slate-400">
                Drag each item to the right basket!
              </p>
            </div>
          </div>

          {/* Draggable Items */}
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-6">
            {hotColdItems.map((item) => {
              const isPlaced = hotColdAnswers[item.id] !== undefined;
              const isCorrect = hotColdAnswers[item.id] === item.correctBin;

              return (
                <div
                  key={item.id}
                  draggable={!isPlaced}
                  onDragStart={() => setDraggedItem(item.id)}
                  onDragEnd={() => setDraggedItem(null)}
                  className={`cursor-move p-4 rounded-xl border-2 transition-all ${
                    isPlaced
                      ? isCorrect
                        ? "bg-emerald-100 dark:bg-emerald-900/30 border-emerald-500 cursor-default"
                        : "bg-red-100 dark:bg-red-900/30 border-red-500 cursor-default"
                      : "bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 hover:border-purple-400 hover:shadow-lg"
                  }`}
                >
                  <div className="text-4xl mb-2 text-center">{item.emoji}</div>
                  <div className="text-xs text-center font-semibold text-slate-700 dark:text-slate-300">
                    {item.name}
                  </div>
                  {isPlaced && (
                    <div className="text-center mt-1">
                      {isCorrect ? "✅" : "❌"}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Drop Bins */}
          <div className="grid grid-cols-2 gap-6">
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => draggedItem && handleDrop(draggedItem, "hot")}
              className="bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-2xl p-8 border-4 border-dashed border-red-300 dark:border-red-700 min-h-[200px] flex flex-col items-center justify-center"
            >
              <div className="text-6xl mb-3">🔴</div>
              <h3 className="text-red-600 dark:text-red-400 font-bold text-xl mb-2">
                HOT
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm text-center">
                Drag hot things here
              </p>
            </div>

            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => draggedItem && handleDrop(draggedItem, "cold")}
              className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl p-8 border-4 border-dashed border-blue-300 dark:border-blue-700 min-h-[200px] flex flex-col items-center justify-center"
            >
              <div className="text-6xl mb-3">🔵</div>
              <h3 className="text-blue-600 dark:text-blue-400 font-bold text-xl mb-2">
                COLD
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm text-center">
                Drag cold things here
              </p>
            </div>
          </div>

          <div className="mt-6 bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4 border border-purple-200 dark:border-purple-800">
            <div className="flex items-center justify-center gap-2">
              <Trophy className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              <span className="text-slate-800 dark:text-slate-100 font-bold">
                Sorted: {Object.keys(hotColdAnswers).length} /{" "}
                {hotColdItems.length}
              </span>
            </div>
          </div>
        </div>

        {/* Module 3: Match the Tool */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg border border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-3 mb-6">
            <div className="text-4xl">🔬</div>
            <div>
              <h2 className="text-slate-800 dark:text-slate-100 text-2xl font-bold">
                Module 3: Match the Tool
              </h2>
              <p className="text-slate-600 dark:text-slate-400">
                First pick a tool, then tap the object that goes with it!
              </p>
            </div>
          </div>

          {/* Tools Selection */}
          <div className="mb-6">
            <h3 className="text-slate-700 dark:text-slate-300 font-semibold mb-3">
              Pick a Tool:
            </h3>
            <div className="grid grid-cols-3 gap-4">
              {tools.map((tool) => (
                <button
                  key={tool.id}
                  onClick={() => setSelectedTool(tool.id)}
                  className={`p-6 rounded-xl border-2 transition-all transform hover:scale-105 ${
                    selectedTool === tool.id
                      ? "bg-cyan-100 dark:bg-cyan-900/30 border-cyan-500 dark:border-cyan-600 shadow-lg"
                      : "bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 hover:border-cyan-400"
                  }`}
                >
                  <div className="text-5xl mb-3 text-center">{tool.emoji}</div>
                  <div className="text-sm text-center font-semibold text-slate-700 dark:text-slate-300">
                    {tool.name}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Objects to Match */}
          <div>
            <h3 className="text-slate-700 dark:text-slate-300 font-semibold mb-3">
              Then Tap the Object:
            </h3>
            <div className="grid grid-cols-3 gap-4">
              {matchObjects.map((obj) => {
                const isMatched = toolMatches[obj.id] !== undefined;
                const isCorrect = toolMatches[obj.id] === obj.correctTool;

                return (
                  <button
                    key={obj.id}
                    onClick={() => handleToolMatch(obj.id)}
                    disabled={!selectedTool || isMatched}
                    className={`p-6 rounded-xl border-2 transition-all transform hover:scale-105 disabled:cursor-not-allowed ${
                      isMatched
                        ? isCorrect
                          ? "bg-emerald-100 dark:bg-emerald-900/30 border-emerald-500"
                          : "bg-red-100 dark:bg-red-900/30 border-red-500"
                        : "bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 hover:border-blue-400"
                    }`}
                  >
                    <div className="text-5xl mb-3 text-center">
                      {obj.emoji}
                    </div>
                    <div className="text-sm text-center font-semibold text-slate-700 dark:text-slate-300 mb-2">
                      {obj.name}
                    </div>
                    {isMatched && (
                      <div className="text-center text-2xl">
                        {isCorrect ? "✅" : "❌"}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-6 bg-amber-50 dark:bg-amber-900/20 rounded-xl p-4 border border-amber-200 dark:border-amber-800">
            <div className="flex items-center justify-center gap-2">
              <Trophy className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              <span className="text-slate-800 dark:text-slate-100 font-bold">
                Matched: {Object.keys(toolMatches).length} /{" "}
                {matchObjects.length}
              </span>
            </div>
          </div>
        </div>

        {/* Module 4: Safety Check */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg border border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-3 mb-6">
            <div className="text-4xl">⚠️</div>
            <div>
              <h2 className="text-slate-800 dark:text-slate-100 text-2xl font-bold">
                Module 4: Safety Check
              </h2>
              <p className="text-slate-600 dark:text-slate-400">
                Is this safe? Tap Green for Yes or Red for No!
              </p>
            </div>
          </div>

          {currentCard && (
            <>
              <div className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-xl p-8 border border-orange-200 dark:border-orange-800">
                <div className="text-center mb-6">
                  <div className="text-8xl mb-4">{currentCard.image}</div>
                  <p className="text-slate-700 dark:text-slate-300 text-lg font-semibold">
                    {currentCard.description}
                  </p>
                </div>

                {/* Safety Buttons */}
                <div className="flex gap-4 mb-6">
                  <button
                    onClick={() => handleSafetyAnswer(true)}
                    disabled={safetyAnswer !== undefined}
                    className={`flex-1 py-6 px-6 rounded-2xl border-4 transition-all transform hover:scale-105 disabled:cursor-not-allowed ${
                      safetyAnswer === true
                        ? isSafetyCorrect
                          ? "bg-emerald-100 dark:bg-emerald-900/30 border-emerald-500 scale-105"
                          : "bg-red-100 dark:bg-red-900/30 border-red-500 opacity-70"
                        : "bg-white dark:bg-slate-800 border-emerald-400 dark:border-emerald-600 hover:bg-emerald-50"
                    }`}
                  >
                    <div className="text-6xl mb-3">👍</div>
                    <div className="text-emerald-600 dark:text-emerald-400 font-bold text-xl">
                      SAFE
                    </div>
                  </button>

                  <button
                    onClick={() => handleSafetyAnswer(false)}
                    disabled={safetyAnswer !== undefined}
                    className={`flex-1 py-6 px-6 rounded-2xl border-4 transition-all transform hover:scale-105 disabled:cursor-not-allowed ${
                      safetyAnswer === false
                        ? isSafetyCorrect
                          ? "bg-emerald-100 dark:bg-emerald-900/30 border-emerald-500 scale-105"
                          : "bg-red-100 dark:bg-red-900/30 border-red-500 opacity-70"
                        : "bg-white dark:bg-slate-800 border-red-400 dark:border-red-600 hover:bg-red-50"
                    }`}
                  >
                    <div className="text-6xl mb-3">👎</div>
                    <div className="text-red-600 dark:text-red-400 font-bold text-xl">
                      UNSAFE
                    </div>
                  </button>
                </div>

                {/* Feedback */}
                {safetyAnswer !== undefined && (
                  <div
                    className={`p-4 rounded-xl animate-in fade-in-0 zoom-in-95 ${
                      isSafetyCorrect
                        ? "bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800"
                        : "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-4xl">
                        {isSafetyCorrect ? "✅" : "❌"}
                      </div>
                      <p
                        className={`font-semibold text-lg ${
                          isSafetyCorrect
                            ? "text-emerald-700 dark:text-emerald-300"
                            : "text-red-700 dark:text-red-300"
                        }`}
                      >
                        {currentCard.feedback}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-6 flex items-center justify-center gap-2 text-slate-600 dark:text-slate-400">
                <span className="font-semibold">
                  Card {currentSafetyCard + 1} of {safetyCards.length}
                </span>
              </div>
            </>
          )}
        </div>

        {/* Completion Card (still on page) */}
        {allModulesComplete && (
          <div className="bg-gradient-to-br from-emerald-500 to-green-600 rounded-3xl p-8 shadow-2xl animate-in fade-in-0 zoom-in-95">
            <div className="text-center text-white">
              <div className="text-8xl mb-4">🎉</div>
              <h2 className="text-3xl font-bold mb-3">
                Amazing Work, Junior Scientist!
              </h2>
              <p className="text-white/90 mb-6 text-lg">
                You completed all 4 modules! You're now a Science Explorer
                expert!
              </p>
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl">
                  <Trophy className="w-6 h-6 inline mr-2" />
                  <span className="font-bold">+200 Points</span>
                </div>
                <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl">
                  <Star className="w-6 h-6 inline mr-2" />
                  <span className="font-bold">Achievement Unlocked</span>
                </div>
              </div>
              <button
                onClick={onBack}
                className="bg-white text-emerald-600 px-8 py-3 rounded-xl hover:bg-white/90 transition-all font-bold shadow-lg"
              >
                Back to Activities
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ---------- COMPLETION POPUP DIALOG ---------- */}
      {showCompletionDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setShowCompletionDialog(false)}
          />
          <div className="relative z-10 w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-2xl">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500 to-green-500 flex items-center justify-center mb-2">
                <Trophy className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50">
                Lesson Complete! 🎉
              </h2>
              <p className="text-slate-600 dark:text-slate-300">
                You mastered all 4 science modules. Awesome work, Junior
                Scientist!
              </p>
              <div className="w-full bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-3 border border-emerald-200 dark:border-emerald-700">
                <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">
                  +200 Science Points • Safety Star Unlocked ⭐
                </p>
              </div>
              <div className="flex flex-col gap-2 w-full mt-2">
                <button
                  onClick={() => {
                    setShowCompletionDialog(false);
                    onBack();
                  }}
                  className="w-full h-10 rounded-xl bg-gradient-to-r from-emerald-500 to-green-500 text-white font-semibold hover:from-emerald-600 hover:to-green-600"
                >
                  Back to Activities
                </button>
                <button
                  onClick={() => setShowCompletionDialog(false)}
                  className="w-full h-10 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800"
                >
                  Keep Exploring
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
