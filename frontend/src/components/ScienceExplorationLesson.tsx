// frontend/src/components/ScienceExplorationLesson.tsx
import React, { useEffect, useState } from "react";
import {
  ArrowLeft,
  FlaskConical,
  Sparkles,
  Trophy,
  CheckCircle,
  CheckCircle2,
  Award,
} from "lucide-react";
import { Button } from "./ui/button";
import { useApp } from "../contexts/AppContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

interface ScienceExplorationLessonProps {
  onBack: () => void;
}

export function ScienceExplorationLesson({ onBack }: ScienceExplorationLessonProps) {
  const {
    lessons,
    lessonProgress,
    startLesson,
    completeLesson,
    saveAndExitLesson,
  } = useApp();

  // --- Resolve the REAL lesson id (works with DB + fixtures) ---
  const scienceLessonFromContext =
    lessons.find(
      (l) =>
        l.title?.toLowerCase?.() === "science exploration" ||
        (l as any).slug === "science-exploration"
    ) || lessons.find((l) => Number(l.id) === 3);

  const rawLessonId: number | string =
    (scienceLessonFromContext as any)?._id ??
    scienceLessonFromContext?.id ??
    3;

  const lessonKey = rawLessonId as any;

  const lesson =
    lessonProgress[lessonKey] ??
    lessonProgress[String(lessonKey)] ??
    lessonProgress[Number(lessonKey) as any];

  const isLessonCompleted = lesson?.completed || false;

  // --- Local activity state ---

  // Activity 1 – scavenger hunt
  const [foundItems, setFoundItems] = useState<string[]>([]);

  // Activity 2 – observation lab
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [selectedObject, setSelectedObject] = useState<string | null>(null);
  const [observationResult, setObservationResult] = useState("");

  // Completion dialog
  const [showCompletionDialog, setShowCompletionDialog] = useState(false);

  // Start lesson on first open (if not already started/completed)
  useEffect(() => {
    if (!lesson && !isLessonCompleted) {
      startLesson(lessonKey);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // --- Content data ---

  const fiveSenses = [
    {
      id: "sight",
      name: "Sight (Eyes)",
      emoji: "👁️",
      description:
        "We use our eyes to see colors, shapes, and light. We use them to look closely at things.",
      examples: ["Rainbow", "Reading a book"],
    },
    {
      id: "hearing",
      name: "Hearing (Ears)",
      emoji: "👂",
      description:
        "We use our ears to listen to sounds. Some sounds are loud, and some are quiet.",
      examples: ["Thunder (loud)", "Whisper (quiet)"],
    },
    {
      id: "touch",
      name: "Touch (Hands & Skin)",
      emoji: "✋",
      description:
        "We use our hands to feel texture and temperature. Is it hot? Is it cold? Is it soft?",
      examples: ["Ice cube (cold)", "Bunny fur (soft)"],
    },
    {
      id: "smell",
      name: "Smell (Nose)",
      emoji: "👃",
      description:
        "We use our nose to smell scents in the air. Some smells are yummy, and some are yucky!",
      examples: ["Fresh cookies", "Garbage truck"],
    },
    {
      id: "taste",
      name: "Taste (Mouth)",
      emoji: "👅",
      description:
        "We use our tongue to taste food. Science is delicious! (Always ask an adult before tasting).",
      examples: ["Lemon (sour)", "Candy (sweet)"],
    },
  ];

  const scavengerItems = [
    { id: "rainbow", emoji: "🌈", name: "Rainbow", sense: "Sight" },
    { id: "drum", emoji: "🥁", name: "Drum", sense: "Hearing" },
    { id: "teddy", emoji: "🧸", name: "Teddy bear", sense: "Touch" },
    { id: "flower", emoji: "🌸", name: "Flower", sense: "Smell" },
    { id: "icecream", emoji: "🍦", name: "Ice cream", sense: "Taste" },
    { id: "bell", emoji: "🔔", name: "Bell", sense: "Hearing" },
  ];

  const scienceGear = [
    {
      id: "magnifying",
      name: "Magnifying glass",
      emoji: "🔍",
      description:
        "A tool with a curved glass lens. It makes tiny things look BIG.",
      examples: ["Looking at an ant", "Looking at a snowflake"],
    },
    {
      id: "binoculars",
      name: "Binoculars",
      emoji: "🔭",
      description:
        "Two tubes with lenses. They help us see things that are far away.",
      examples: ["Bird watching", "Looking at the moon"],
    },
    {
      id: "thermometer",
      name: "Thermometer",
      emoji: "🌡️",
      description:
        "A tool that measures temperature. It tells us how hot or cold something is.",
      examples: ["Checking a fever", "Measuring sunny weather"],
    },
    {
      id: "scale",
      name: "Balance scale",
      emoji: "⚖️",
      description:
        "A tool that measures weight. It tells us which object is heavier.",
      examples: ["Apple vs. grape", "Weighing rocks"],
    },
  ];

  const labTools = [
    { id: "magnifying", emoji: "🔍", name: "Magnifying Glass" },
    { id: "binoculars", emoji: "🔭", name: "Binoculars" },
    { id: "thermometer", emoji: "🌡️", name: "Thermometer" },
  ];

  const labObjects = [
    { id: "ant", emoji: "🐜", name: "Tiny ant" },
    { id: "bird", emoji: "🦅", name: "Bird in tree" },
    { id: "snowman", emoji: "☃️", name: "Snowman" },
  ];

  // --- Progress inside the lesson ---

  const calculateLocalProgress = () => {
    const activity1 = (foundItems.length / scavengerItems.length) * 50;
    const activity2 = observationResult ? 50 : 0;
    return Math.round(activity1 + activity2);
  };

  const localProgress = calculateLocalProgress();

  // Auto-complete when everything is done
  useEffect(() => {
    if (localProgress === 100 && !isLessonCompleted) {
      completeLesson(lessonKey);
      setShowCompletionDialog(true);
    }
  }, [localProgress, isLessonCompleted, completeLesson, lessonKey]);

  // --- Handlers ---

  const handleToggleItem = (id: string) => {
    setFoundItems((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleExplore = () => {
    if (!selectedTool || !selectedObject) {
      setObservationResult("Please pick ONE tool and ONE object.");
      return;
    }

    const results: Record<string, string> = {
      "magnifying-ant": "Wow! You can see the ant's tiny legs and feelers.",
      "binoculars-bird": "I see it! The bird has bright, blue feathers.",
      "thermometer-snowman": "Brrr! The thermometer shows it is freezing.",
      "magnifying-bird": "The bird is too far away. Try binoculars!",
      "magnifying-snowman": "The snowman looks the same. Try a thermometer!",
      "binoculars-ant":
        "The ant is too small for binoculars. Try a magnifying glass!",
      "binoculars-snowman":
        "You can see the snowman, but you still don't know the temperature.",
      "thermometer-ant":
        "The thermometer does not help you see the ant. Try a magnifying glass!",
      "thermometer-bird":
        "The thermometer does not help you see the bird. Try binoculars!",
    };

    const key = `${selectedTool}-${selectedObject}`;
    setObservationResult(
      results[key] || "Interesting combination! Talk about what you might see."
    );
  };

  const handleResetLab = () => {
    setSelectedTool(null);
    setSelectedObject(null);
    setObservationResult("");
  };

  const handleSaveAndExit = () => {
    const progressToSave = Math.max(
      localProgress,
      lesson?.progressPercent ?? 0
    );
    saveAndExitLesson(lessonKey, progressToSave);
    onBack();
  };

  const handleManualComplete = () => {
    completeLesson(lessonKey);
    setShowCompletionDialog(true);
  };

  // --- UI ---

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-10">
      {/* Header */}
      <div className="flex items-center gap-4 pt-2">
        <Button
          variant="outline"
          onClick={onBack}
          className="flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-medium dark:bg-slate-800 dark:border-slate-700"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Lessons</span>
        </Button>
      </div>

      {/* Hero / Title */}
      <section className="bg-gradient-to-br from-indigo-600 to-violet-600 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden text-white">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        <div className="relative space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs sm:text-sm">
            <span>🧪</span>
            <span>Science &amp; Discovery</span>
          </div>

          <div className="space-y-2 max-w-3xl">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">
              Science Exploration
            </h1>
            <p className="text-sm sm:text-base text-white/90 leading-relaxed">
              Learn how scientists use their senses and tools to explore the
              world. Try simple, playful experiments together.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 max-w-xl text-sm sm:text-base">
            <div>
              <div className="text-white/80 text-xs sm:text-sm mb-1">
                Estimated time
              </div>
              <div className="font-semibold">20 minutes</div>
            </div>
            <div>
              <div className="text-white/80 text-xs sm:text-sm mb-1">
                Skills
              </div>
              <div className="font-semibold">
                Observation · Predicting · Testing
              </div>
            </div>
          </div>

          <Button className="bg-white text-indigo-700 hover:bg-white/90 rounded-xl px-5 py-2.5 text-sm sm:text-base font-semibold shadow-md">
            <FlaskConical className="w-4 h-4 mr-2" />
            Start Experimenting
          </Button>
        </div>
      </section>

      {/* Progress Card */}
      <section className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
        <h3 className="text-slate-800 dark:text-slate-100 mb-4 font-semibold text-lg">
          Your progress in this lesson
        </h3>

        <div className="flex items-center justify-between mb-2 text-sm">
          <span className="text-slate-600 dark:text-slate-400">
            Lesson completion
          </span>
          <span className="text-slate-900 dark:text-slate-50 font-semibold">
            {localProgress}%
          </span>
        </div>

        <div
          className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3 mb-4 overflow-hidden"
          role="progressbar"
          aria-valuenow={localProgress}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div
            className="bg-gradient-to-r from-indigo-500 to-purple-500 h-3 rounded-full transition-all duration-500"
            style={{ width: `${localProgress}%` }}
          />
        </div>

        <div className="flex items-start gap-3 bg-slate-50 dark:bg-slate-900/60 rounded-xl p-4 text-sm">
          <div className="text-2xl" aria-hidden="true">
            💡
          </div>
          <p className="text-slate-600 dark:text-slate-400">
            Grown-ups: before each activity, ask “What do you think will
            happen?” Let the learner guess first. This builds early science
            thinking.
          </p>
        </div>
      </section>

      {/* Part 1: Five Senses */}
      <section className="bg-white dark:bg-slate-800 rounded-2xl p-6 sm:p-8 shadow-lg border border-slate-200 dark:border-slate-700">
        <h2 className="text-slate-800 dark:text-slate-100 mb-2 text-xl sm:text-2xl font-bold">
          Part 1: The Five Senses
        </h2>
        <p className="text-slate-600 dark:text-slate-400 mb-6 text-sm sm:text-base">
          Read one card at a time. Invite the learner to point to their eyes,
          ears, nose, hands, and mouth and act out each sense.
        </p>

        <div className="space-y-6">
          {fiveSenses.map((sense) => (
            <article
              key={sense.id}
              className="bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900/50 dark:to-blue-900/20 rounded-xl p-5 sm:p-6 border border-slate-200 dark:border-slate-700"
            >
              <div className="flex items-start gap-4">
                <div className="text-4xl sm:text-5xl" aria-hidden="true">
                  {sense.emoji}
                </div>
                <div className="flex-1 space-y-2">
                  <h3 className="text-slate-900 dark:text-slate-50 font-bold text-base sm:text-lg">
                    {sense.name}
                  </h3>
                  <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base">
                    {sense.description}
                  </p>
                  <div className="bg-white dark:bg-slate-900/60 rounded-lg p-3 border border-slate-200 dark:border-slate-700">
                    <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-semibold mb-1">
                      Examples:
                    </div>
                    <ul className="space-y-1 text-sm sm:text-base">
                      {sense.examples.map((example, idx) => (
                        <li
                          key={idx}
                          className="flex items-center gap-2 text-slate-800 dark:text-slate-100"
                        >
                          <span className="w-2 h-2 rounded-full bg-indigo-500" />
                          <span>{example}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Activity 1: Scavenger Hunt */}
      <section className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/25 dark:to-pink-900/25 rounded-2xl p-6 sm:p-8 shadow-lg border-2 border-purple-200 dark:border-purple-800">
        <div className="flex items-center gap-3 mb-4">
          <div className="text-4xl" aria-hidden="true">
            🔍
          </div>
          <div className="space-y-1">
            <h2 className="text-slate-900 dark:text-slate-50 text-xl sm:text-2xl font-bold">
              Activity 1: Senses Scavenger Hunt
            </h2>
            <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base">
              Tap each card when you spot it (in real life or in a picture).
              Talk about which sense you would use first.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          {scavengerItems.map((item) => {
            const isFound = foundItems.includes(item.id);
            return (
              <button
                key={item.id}
                onClick={() => handleToggleItem(item.id)}
                className={`relative px-4 py-5 rounded-xl border-2 transition-all transform focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-offset-2 focus-visible:ring-purple-400 hover:scale-[1.02] ${
                  isFound
                    ? "bg-emerald-100 dark:bg-emerald-900/40 border-emerald-500 dark:border-emerald-600"
                    : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-purple-300 dark:hover:border-purple-400"
                }`}
              >
                <div className="text-4xl mb-2" aria-hidden="true">
                  {item.emoji}
                </div>
                <div className="text-slate-900 dark:text-slate-50 font-semibold text-sm sm:text-base">
                  {item.name}
                </div>
                <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                  ({item.sense})
                </div>
                {isFound && (
                  <div className="absolute top-2 right-2 bg-emerald-500 text-white p-1 rounded-full">
                    <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
                  </div>
                )}
              </button>
            );
          })}
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-purple-200 dark:border-purple-800 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            <span className="text-slate-800 dark:text-slate-100 font-semibold">
              Items found: {foundItems.length} / {scavengerItems.length}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 text-center sm:text-right">
            It&apos;s OK if you can&apos;t find them all today. You can come
            back and add more later.
          </p>
        </div>
      </section>

      {/* Part 2: Science Gear */}
      <section className="bg-white dark:bg-slate-800 rounded-2xl p-6 sm:p-8 shadow-lg border border-slate-200 dark:border-slate-700">
        <h2 className="text-slate-900 dark:text-slate-50 mb-2 text-xl sm:text-2xl font-bold">
          Part 2: Science Gear
        </h2>
        <p className="text-slate-600 dark:text-slate-400 mb-6 text-sm sm:text-base">
          These tools make your senses even stronger. Pretend to use each one as
          you read together.
        </p>

        <div className="space-y-6">
          {scienceGear.map((gear) => (
            <article
              key={gear.id}
              className="bg-gradient-to-br from-slate-50 to-amber-50 dark:from-slate-900/50 dark:to-amber-900/25 rounded-xl p-5 sm:p-6 border border-slate-200 dark:border-slate-700"
            >
              <div className="flex items-start gap-4">
                <div className="text-4xl sm:text-5xl" aria-hidden="true">
                  {gear.emoji}
                </div>
                <div className="flex-1 space-y-2">
                  <h3 className="text-slate-900 dark:text-slate-50 font-bold text-base sm:text-lg">
                    {gear.name}
                  </h3>
                  <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base">
                    {gear.description}
                  </p>
                  <div className="bg-white dark:bg-slate-900/60 rounded-lg p-3 border border-slate-200 dark:border-slate-700">
                    <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-semibold mb-1">
                      Examples:
                    </div>
                    <ul className="space-y-1 text-sm sm:text-base">
                      {gear.examples.map((example, idx) => (
                        <li
                          key={idx}
                          className="flex items-center gap-2 text-slate-800 dark:text-slate-100"
                        >
                          <span className="w-2 h-2 rounded-full bg-amber-500" />
                          <span>{example}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Activity 2: Observation Lab */}
      <section className="bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-900/25 dark:to-blue-900/25 rounded-2xl p-6 sm:p-8 shadow-lg border-2 border-cyan-200 dark:border-cyan-800">
        <div className="flex items-center gap-3 mb-6">
          <div className="text-4xl" aria-hidden="true">
            🔬
          </div>
        <div className="space-y-1">
          <h2 className="text-slate-900 dark:text-slate-50 text-xl sm:text-2xl font-bold">
            Activity 2: The Observation Lab
          </h2>
          <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base">
            Pick one tool and one object. Then read what your science
            investigation might show.
          </p>
        </div>
      </div>

        {/* Tool Selection */}
        <div className="mb-6">
          <h3 className="text-slate-800 dark:text-slate-200 font-semibold mb-3 text-sm sm:text-base">
            Step 1: Pick a tool
          </h3>
          <div className="grid grid-cols-3 gap-3">
            {labTools.map((tool) => (
              <button
                key={tool.id}
                onClick={() => setSelectedTool(tool.id)}
                className={`px-3 py-4 rounded-xl border-2 transition-all transform focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-offset-2 focus-visible:ring-cyan-400 hover:scale-[1.02] ${
                  selectedTool === tool.id
                    ? "bg-cyan-100 dark:bg-cyan-900/40 border-cyan-500 dark:border-cyan-600"
                    : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-cyan-300 dark:hover:border-cyan-400"
                }`}
              >
                <div className="text-3xl mb-2" aria-hidden="true">
                  {tool.emoji}
                </div>
                <div className="text-xs sm:text-sm text-slate-800 dark:text-slate-100 font-medium text-center">
                  {tool.name}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Object Selection */}
        <div className="mb-6">
          <h3 className="text-slate-800 dark:text-slate-200 font-semibold mb-3 text-sm sm:text-base">
            Step 2: Pick an object
          </h3>
          <div className="grid grid-cols-3 gap-3">
            {labObjects.map((obj) => (
              <button
                key={obj.id}
                onClick={() => setSelectedObject(obj.id)}
                className={`px-3 py-4 rounded-xl border-2 transition-all transform focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-offset-2 focus-visible:ring-blue-400 hover:scale-[1.02] ${
                  selectedObject === obj.id
                    ? "bg-blue-100 dark:bg-blue-900/40 border-blue-500 dark:border-blue-600"
                    : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-400"
                }`}
              >
                <div className="text-3xl mb-2" aria-hidden="true">
                  {obj.emoji}
                </div>
                <div className="text-xs sm:text-sm text-slate-800 dark:text-slate-100 font-medium text-center">
                  {obj.name}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <Button
            onClick={handleExplore}
            className="flex-1 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white rounded-xl text-sm sm:text-base font-semibold"
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Explore!
          </Button>
          <Button
            onClick={handleResetLab}
            variant="outline"
            className="h-12 rounded-xl text-sm sm:text-base"
          >
            Reset
          </Button>
        </div>

        {/* Results */}
        {observationResult && (
          <div className="bg-white dark:bg-slate-800 rounded-xl p-5 sm:p-6 border-2 border-cyan-300 dark:border-cyan-700">
            <div className="flex items-start gap-3">
              <div className="text-3xl" aria-hidden="true">
                🎯
              </div>
              <div className="space-y-1">
                <h4 className="text-slate-900 dark:text-slate-50 font-bold text-base sm:text-lg">
                  Observation result
                </h4>
                <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base">
                  {observationResult}
                </p>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Completion Section */}
      <section className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl p-6 sm:p-8 shadow-lg space-y-4">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
          <CheckCircle
            className="w-12 h-12 text-white shrink-0"
            aria-hidden="true"
          />
          <div className="text-center sm:text-left text-white space-y-2">
            <h3 className="text-lg sm:text-xl font-bold">
              Ready to complete this lesson?
            </h3>
            <p className="text-sm sm:text-base text-white/90">
              You&apos;ve explored senses, tools, and observation. When a
              grown-up thinks you&apos;re ready, tap “Complete Lesson.”
            </p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          {!isLessonCompleted ? (
            <>
              <Button
                onClick={handleManualComplete}
                className="bg-white text-emerald-600 hover:bg-emerald-50 rounded-xl text-sm sm:text-base font-semibold"
              >
                <Trophy className="w-4 h-4 mr-2" />
                Complete Lesson
              </Button>
              <Button
                onClick={handleSaveAndExit}
                variant="outline"
                className="bg-white/10 border-white/40 text-white hover:bg-white/20 rounded-xl text-sm sm:text-base"
              >
                Save &amp; Exit
              </Button>
            </>
          ) : (
            <Button
              onClick={onBack}
              className="bg-white text-emerald-600 hover:bg-emerald-50 rounded-xl text-sm sm:text-base font-semibold"
            >
              Back to Lessons
            </Button>
          )}
        </div>
      </section>

      {/* Completion Dialog */}
      <Dialog open={showCompletionDialog} onOpenChange={setShowCompletionDialog}>
        <DialogContent className="sm:max-w-md">
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center">
              <Trophy className="w-10 h-10 text-white" aria-hidden="true" />
            </div>
          </div>
          <DialogHeader>
            <DialogTitle className="text-center text-2xl">
              Lesson Completed! 🎉
            </DialogTitle>
            <DialogDescription className="text-center">
              Congratulations! You&apos;ve successfully completed the Science
              Exploration lesson.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-2">
            <div className="bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 border border-emerald-200 dark:border-emerald-800/30 rounded-xl p-4">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Award
                  className="w-5 h-5 text-emerald-600 dark:text-emerald-400"
                  aria-hidden="true"
                />
                <span className="text-emerald-700 dark:text-emerald-300 font-medium">
                  +100 points earned
                </span>
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400 text-center">
                Amazing work! You are now a Junior Scientist ready for more
                discoveries.
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 mt-4">
            <Button
              onClick={() => {
                setShowCompletionDialog(false);
                onBack();
              }}
              className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white border-none w-full rounded-xl text-sm sm:text-base"
            >
              Back to Lessons
            </Button>
            <Button
              onClick={() => setShowCompletionDialog(false)}
              variant="outline"
              className="w-full rounded-xl text-sm sm:text-base"
            >
              Continue Reviewing
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
