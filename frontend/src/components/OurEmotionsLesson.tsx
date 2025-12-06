// frontend/src/components/OurEmotionsLesson.tsx
import React, { useEffect, useState } from "react";
import {
  ArrowLeft,
  CheckCircle,
  CheckCircle2,
  Trophy,
  Award,
  Sparkles,
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

interface OurEmotionsLessonProps {
  onBack: () => void;
}

export function OurEmotionsLesson({ onBack }: OurEmotionsLessonProps) {
  const {
    lessons,
    lessonProgress,
    startLesson,
    saveAndExitLesson,
    completeLesson,
  } = useApp();

  /**
   * IMPORTANT: Resolve the *real* id used by this lesson.
   * We look it up from `lessons` by title, and fall back to 6 if not found.
   * Then we use this same id for:
   *  - lessonProgress indexing
   *  - startLesson / completeLesson / saveAndExitLesson
   */
  const ourLessonFromContext =
    lessons.find(
      (l) =>
        l.title?.toLowerCase?.() === "our emotions" ||
        (l as any).slug === "our-emotions"
    ) || lessons.find((l) => Number(l.id) === 6);

  const rawLessonId: number | string =
    (ourLessonFromContext as any)?._id ??
    ourLessonFromContext?.id ??
    7; // fallback so it still works with fixtures

  const lessonKey = rawLessonId as any;

  const lesson =
    lessonProgress[lessonKey] ??
    lessonProgress[String(lessonKey)] ??
    lessonProgress[Number(lessonKey) as any];

  const isLessonCompleted = lesson?.completed || false;

  // ---------- LOCAL STATE FOR ACTIVITIES ----------
  // Activity 1
  const [correctAnswers, setCorrectAnswers] = useState<number[]>([]);
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<number, string | undefined>
  >({});

  // Activity 2
  const [selectedFeeling, setSelectedFeeling] = useState<string | null>(null);
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [calmingResult, setCalmingResult] = useState("");

  // Completion dialog
  const [showCompletionDialog, setShowCompletionDialog] = useState(false);

  // ---------- START LESSON ON FIRST OPEN ----------
  useEffect(() => {
    if (!lesson && !isLessonCompleted) {
      startLesson(lessonKey as any);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ---------- LESSON CONTENT DATA ----------
  const emotions = [
    {
      id: "happy",
      name: "Happy",
      emoji: "😊",
      description:
        "When we feel good inside. Our mouth smiles and our eyes light up.",
      causes: ["Playing with friends", "Eating a yummy snack"],
      color: "from-yellow-50 to-amber-100",
      darkColor: "from-yellow-900/20 to-amber-900/20",
    },
    {
      id: "sad",
      name: "Sad",
      emoji: "😢",
      description:
        "When we feel heavy or hurt. We might cry or want to be alone.",
      causes: ["Dropping a toy", "Missing someone we love"],
      color: "from-blue-50 to-cyan-100",
      darkColor: "from-blue-900/20 to-cyan-900/20",
    },
    {
      id: "angry",
      name: "Angry",
      emoji: "😡",
      description:
        "When we feel hot or frustrated. Our face frowns and our hands might make fists.",
      causes: ["Something breaks", "We cannot have what we want right now"],
      color: "from-red-50 to-orange-100",
      darkColor: "from-red-900/20 to-orange-900/20",
    },
    {
      id: "scared",
      name: "Scared",
      emoji: "😨",
      description:
        "When we feel unsafe or worried. Our eyes get big and our heart beats fast.",
      causes: ["Loud noises like thunder", "The dark"],
      color: "from-purple-50 to-violet-100",
      darkColor: "from-purple-900/20 to-violet-900/20",
    },
  ];

  const scenarios = [
    {
      id: 1,
      situation: "You get a big present! 🎁",
      correctAnswer: "happy",
      options: [
        { emoji: "😊", label: "Happy", value: "happy" },
        { emoji: "😢", label: "Sad", value: "sad" },
        { emoji: "😡", label: "Angry", value: "angry" },
      ],
    },
    {
      id: 2,
      situation: "Your ice cream falls on the dirt. 🍦",
      correctAnswer: "sad",
      options: [
        { emoji: "😊", label: "Happy", value: "happy" },
        { emoji: "😢", label: "Sad", value: "sad" },
        { emoji: "😨", label: "Scared", value: "scared" },
      ],
    },
    {
      id: 3,
      situation: "A big dog barks very loud! 🐕",
      correctAnswer: "scared",
      options: [
        { emoji: "😊", label: "Happy", value: "happy" },
        { emoji: "😡", label: "Angry", value: "angry" },
        { emoji: "😨", label: "Scared", value: "scared" },
      ],
    },
  ];

  const copingStrategies = [
    {
      id: "breath",
      name: "The Deep Breath",
      emoji: "🌬️",
      description: "When we feel Angry or Scared, we can breathe deep.",
      steps: [
        "Smell the flower (Breathe In) 🌸",
        "Blow out the candle (Breathe Out) 🕯️",
      ],
    },
    {
      id: "help",
      name: "Ask for Help",
      emoji: "🤝",
      description: "When we feel Sad or Confused, we can use our words.",
      steps: ['"I need help please."', '"Can I have a hug?"'],
    },
    {
      id: "count",
      name: "Count to Five",
      emoji: "🔢",
      description: "When we feel Frustrated, we can stop and count.",
      steps: ["1... 2... 3... 4... 5...", "This helps our brain slow down."],
    },
    {
      id: "space",
      name: "Safe Space",
      emoji: "🛋️",
      description: "When feelings are Too Big, we can go to a quiet place.",
      steps: ["Sit on a bean bag", "Listen to quiet music"],
    },
  ];

  const calmingFeelings = [
    { id: "angry", emoji: "😡", name: "Angry" },
    { id: "sad", emoji: "😢", name: "Sad" },
    { id: "scared", emoji: "😨", name: "Scared" },
  ];

  const calmingTools = [
    { id: "breath", emoji: "🌬️", name: "Deep Breath" },
    { id: "hug", emoji: "🧸", name: "Hug a Toy" },
    { id: "count", emoji: "🔢", name: "Count to 5" },
  ];

  // ---------- LOCAL PROGRESS (for inside-the-lesson bar) ----------
  const calculateLocalProgress = () => {
    const activity1Progress = (correctAnswers.length / scenarios.length) * 50;
    const activity2Progress = calmingResult ? 50 : 0;
    return Math.round(activity1Progress + activity2Progress);
  };
  const localProgress = calculateLocalProgress();

  // ---------- AUTO-COMPLETE WHEN LOCAL PROGRESS HITS 100 ----------
  useEffect(() => {
    if (localProgress === 100 && !isLessonCompleted) {
      completeLesson(lessonKey as any);
      setShowCompletionDialog(true);
    }
  }, [localProgress, isLessonCompleted, completeLesson, lessonKey]);

  // ---------- HANDLERS ----------
  const handleAnswerSelect = (scenarioId: number, answer: string) => {
    const scenario = scenarios.find((s) => s.id === scenarioId);
    if (!scenario) return;

    const newSelectedAnswers = { ...selectedAnswers, [scenarioId]: answer };
    setSelectedAnswers(newSelectedAnswers);

    if (answer === scenario.correctAnswer) {
      if (!correctAnswers.includes(scenarioId)) {
        setCorrectAnswers([...correctAnswers, scenarioId]);
      }
    } else {
      setCorrectAnswers(correctAnswers.filter((id) => id !== scenarioId));
    }
  };

  const handleTryIt = () => {
    if (!selectedFeeling || !selectedTool) {
      setCalmingResult("Please select both a feeling and a tool!");
      return;
    }

    const specificResults: Record<string, string> = {
      "angry-count": "Good job! Counting helps you cool down.",
      "sad-hug": "A hug makes things feel softer and better.",
      "scared-breath": "Breathe in... Breathe out... You are safe.",
    };

    const genericResults: Record<string, string> = {
      "angry-breath": "Deep breathing helps calm your body when you're angry!",
      "angry-hug": "Hugging something soft can help you feel better!",
      "sad-breath": "Taking deep breaths can help when you're feeling sad.",
      "sad-count": "Counting slowly can help organize your thoughts.",
      "scared-hug": "A comforting hug from a toy can make you feel safer!",
      "scared-count": "Counting can help you focus and feel more in control.",
    };

    const key = `${selectedFeeling}-${selectedTool}`;
    const result =
      specificResults[key] ||
      genericResults[key] ||
      "Great job trying a calming strategy! Every tool can help in different ways.";

    setCalmingResult(result);
  };

  const handleResetCalming = () => {
    setSelectedFeeling(null);
    setSelectedTool(null);
    setCalmingResult("");
  };

  const handleSaveAndExit = () => {
    const progressToSave = Math.max(
      localProgress,
      lesson?.progressPercent ?? 0
    );
    saveAndExitLesson(lessonKey as any, progressToSave);
    onBack();
  };

  const handleManualComplete = () => {
    completeLesson(lessonKey as any);
    setShowCompletionDialog(true);
  };

  // ---------- UI ----------
  return (
    <div className="max-w-7xl mx-auto space-y-8 px-4 sm:px-6 lg:px-8 pb-10 leading-relaxed">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 rounded-2xl text-base font-medium dark:bg-slate-800 dark:border-slate-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-offset-2 focus-visible:ring-pink-400"
          aria-label="Go back to lessons"
        >
          <ArrowLeft className="w-5 h-5" aria-hidden="true" />
          <span>Back to Lessons</span>
        </Button>

        {lesson && (
          <div className="hidden md:flex items-center gap-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            <span className="font-semibold">Lesson:</span>
            <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800">
              Our Emotions
            </span>
          </div>
        )}
      </div>

      {/* Hero / Title */}
      <section
        className="bg-gradient-to-br from-pink-500 to-rose-500 rounded-3xl p-6 sm:p-8 shadow-2xl"
        aria-labelledby="our-emotions-heading"
      >
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-6">
          <div
            className="text-6xl sm:text-7xl bg-white/15 rounded-3xl p-4"
            aria-hidden="true"
          >
            ❤️
          </div>
          <div className="flex-1 text-white space-y-3">
            <div className="inline-block px-3 py-1 bg-white/25 backdrop-blur-sm rounded-full text-xs sm:text-sm font-medium">
              Social &amp; Emotional Learning
            </div>
            <div className="space-y-2">
              <h1
                id="our-emotions-heading"
                className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight"
              >
                Our Emotions
              </h1>
              <p className="text-sm sm:text-base text-white/90">
                Learn to notice your feelings, name them, and use simple tools
                when they feel big.
              </p>
            </div>
          </div>
        </div>

        {/* Context-stored progress */}
        {lesson && !isLessonCompleted && (
          <div
            className="bg-white/12 backdrop-blur-sm rounded-2xl p-4 border border-white/25"
            aria-label="Lesson progress from your profile"
          >
            <div className="flex items-center justify-between text-xs sm:text-sm text-white mb-2">
              <span>Saved lesson progress</span>
              <span className="font-semibold">{lesson.progressPercent}%</span>
            </div>
            <div
              className="w-full bg-white/20 rounded-full h-3 overflow-hidden"
              aria-hidden="true"
            >
              <div
                className="bg-white h-3 rounded-full transition-all duration-500"
                style={{ width: `${lesson.progressPercent}%` }}
              />
            </div>
            {lesson.startedDate && lesson.expirationDate && (
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-3 text-[11px] sm:text-xs text-white/85 gap-1">
                <span>
                  Started:{" "}
                  {new Date(lesson.startedDate).toLocaleDateString()}
                </span>
                <span>
                  Expires:{" "}
                  {new Date(lesson.expirationDate).toLocaleDateString()}
                </span>
              </div>
            )}
          </div>
        )}
      </section>

      {/* Local in-lesson progress card */}
      <section
        className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700"
        aria-label="Progress in this lesson"
      >
        <h2 className="text-slate-800 dark:text-slate-100 mb-4 font-semibold text-lg">
          Your progress in this lesson
        </h2>

        <div className="flex items-center justify-between mb-2">
          <span className="text-slate-600 dark:text-slate-400 text-sm">
            Activities completed
          </span>
          <span
            className="text-slate-800 dark:text-slate-100 font-semibold text-base"
            aria-live="polite"
          >
            {localProgress}%
          </span>
        </div>

        <div
          className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3 mb-4 overflow-hidden"
          role="progressbar"
          aria-valuenow={localProgress}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Lesson completion inside this lesson"
        >
          <div
            className="bg-gradient-to-r from-pink-500 to-rose-500 h-3 rounded-full transition-all duration-500"
            style={{ width: `${localProgress}%` }}
          />
        </div>

        <div className="flex items-start gap-3 bg-slate-50 dark:bg-slate-900/60 rounded-xl p-4">
          <div className="text-2xl" aria-hidden="true">
            💡
          </div>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">
            Grown-ups: use calm, simple language. Offer choices instead of
            questions like “Do you want to talk?” — for example, “Do you want
            to draw your feeling or tell me about it?”
          </p>
        </div>
      </section>

      {/* Part 1: Naming Feelings */}
      <section
        className="bg-white dark:bg-slate-800 rounded-2xl p-6 sm:p-8 shadow-lg border border-slate-200 dark:border-slate-700 space-y-6"
        aria-labelledby="part1-heading"
      >
        <div className="space-y-2">
          <h2
            id="part1-heading"
            className="text-slate-800 dark:text-slate-100 text-xl sm:text-2xl font-bold"
          >
            Part 1: Naming Our Feelings
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">
            Look at each face and listen to the grown-up read. Point to a time
            when you felt that way.
          </p>
        </div>

        <div className="space-y-6">
          {emotions.map((emotion) => (
            <article
              key={emotion.id}
              className={`bg-gradient-to-br ${emotion.color} dark:${emotion.darkColor} rounded-2xl p-5 sm:p-6 border border-slate-200/80 dark:border-slate-700`}
              aria-label={`${emotion.name} emotion card`}
            >
              <div className="flex gap-4 sm:gap-5 items-start">
                <div
                  className="text-5xl sm:text-6xl shrink-0"
                  aria-hidden="true"
                >
                  {emotion.emoji}
                </div>
                <div className="flex-1 space-y-3">
                  <header className="space-y-1">
                    <h3 className="text-slate-900 dark:text-slate-100 font-bold text-xl">
                      {emotion.name}
                    </h3>
                    <p className="text-slate-800 dark:text-slate-200 text-sm sm:text-base">
                      {emotion.description}
                    </p>
                  </header>
                  <div className="bg-white/95 dark:bg-slate-900/60 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
                    <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-semibold mb-2">
                      What might make us feel {emotion.name.toLowerCase()}?
                    </div>
                    <ul className="space-y-2 text-sm sm:text-base">
                      {emotion.causes.map((cause, idx) => (
                        <li
                          key={idx}
                          className="text-slate-800 dark:text-slate-100 flex items-center gap-2"
                        >
                          <span className="w-2.5 h-2.5 rounded-full bg-pink-500" />
                          <span>{cause}</span>
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

      {/* Activity 1: Feeling Detective */}
      <section
        className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/25 dark:to-purple-900/25 rounded-2xl p-6 sm:p-8 shadow-lg border-2 border-indigo-200 dark:border-indigo-800 space-y-6"
        aria-labelledby="activity1-heading"
      >
        <header className="flex items-start gap-3">
          <div className="text-4xl" aria-hidden="true">
            🕵️
          </div>
          <div className="space-y-1">
            <h2
              id="activity1-heading"
              className="text-slate-900 dark:text-slate-100 text-xl sm:text-2xl font-bold"
            >
              Activity 1: The Feeling Detective
            </h2>
            <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base">
              Listen to the story and tap the face that matches the feeling.
              You can change your answer anytime.
            </p>
          </div>
        </header>

        <div className="space-y-6">
          {scenarios.map((scenario) => {
            const isCorrect = correctAnswers.includes(scenario.id);
            const selectedAnswer = selectedAnswers[scenario.id];

            return (
              <article
                key={scenario.id}
                className={`bg-white dark:bg-slate-800 rounded-2xl p-5 sm:p-6 border-2 transition-all ${
                  isCorrect
                    ? "border-emerald-400 dark:border-emerald-600 shadow-md"
                    : "border-slate-200 dark:border-slate-700"
                }`}
                aria-label={`Situation ${scenario.id}`}
              >
                <div className="mb-4 space-y-1">
                  <h3 className="text-slate-900 dark:text-slate-50 font-semibold text-base sm:text-lg">
                    Situation {scenario.id}
                  </h3>
                  <p className="text-slate-800 dark:text-slate-200 text-base sm:text-lg">
                    {scenario.situation}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                  {scenario.options.map((option) => {
                    const isSelected = selectedAnswer === option.value;
                    const showAsCorrect = isSelected && isCorrect;
                    const showAsIncorrect = isSelected && !isCorrect;

                    return (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() =>
                          handleAnswerSelect(scenario.id, option.value)
                        }
                        aria-pressed={isSelected}
                        aria-label={`${option.label} face option`}
                        className={`flex flex-col items-center justify-center gap-1 sm:gap-2 px-4 py-5 rounded-2xl border-2 text-base sm:text-lg font-semibold transition-all transform focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-offset-2 focus-visible:ring-indigo-400 min-h-[5.25rem] ${
                          showAsCorrect
                            ? "bg-emerald-100 dark:bg-emerald-900/40 border-emerald-500 dark:border-emerald-600"
                            : showAsIncorrect
                            ? "bg-red-100 dark:bg-red-900/40 border-red-500 dark:border-red-600"
                            : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-400"
                        }`}
                      >
                        <div className="text-3xl sm:text-4xl" aria-hidden="true">
                          {option.emoji}
                        </div>
                        <div className="text-slate-800 dark:text-slate-100">
                          {option.label}
                        </div>
                        {showAsCorrect && (
                          <CheckCircle2
                            className="w-5 h-5 text-emerald-600 mt-1"
                            aria-hidden="true"
                          />
                        )}
                      </button>
                    );
                  })}
                </div>
              </article>
            );
          })}
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-indigo-200 dark:border-indigo-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-50">
            Feelings found:{" "}
            <span aria-live="polite">
              {correctAnswers.length} / {scenarios.length}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 text-center sm:text-right">
            There are no “bad” feelings. We&apos;re just learning which feeling
            fits each story.
          </p>
        </div>
      </section>

      {/* Part 2: Coping Tools */}
      <section
        className="bg-white dark:bg-slate-800 rounded-2xl p-6 sm:p-8 shadow-lg border border-slate-200 dark:border-slate-700 space-y-6"
        aria-labelledby="part2-heading"
      >
        <div className="space-y-2">
          <h2
            id="part2-heading"
            className="text-slate-900 dark:text-slate-50 text-xl sm:text-2xl font-bold"
          >
            Part 2: What Can I Do?
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">
            These are simple tools that can help when feelings feel big or
            confusing. Pick one or two to practice together.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {copingStrategies.map((strategy) => (
            <article
              key={strategy.id}
              className="bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-5 sm:p-6 border border-slate-200 dark:border-slate-700"
              aria-label={strategy.name}
            >
              <div className="flex items-start gap-4">
                <div
                  className="text-4xl sm:text-5xl shrink-0"
                  aria-hidden="true"
                >
                  {strategy.emoji}
                </div>
                <div className="flex-1 space-y-2">
                  <h3 className="text-slate-900 dark:text-slate-50 font-bold text-base sm:text-lg">
                    {strategy.name}
                  </h3>
                  <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base">
                    {strategy.description}
                  </p>
                  <div className="bg-white dark:bg-slate-900/60 rounded-xl p-3 sm:p-4 border border-slate-200 dark:border-slate-700 mt-2">
                    <ul className="space-y-2 text-sm sm:text-base">
                      {strategy.steps.map((step, idx) => (
                        <li
                          key={idx}
                          className="text-slate-800 dark:text-slate-100 flex items-start gap-2"
                        >
                          <span
                            className="text-emerald-500 mt-1"
                            aria-hidden="true"
                          >
                            •
                          </span>
                          <span>{step}</span>
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

      {/* Activity 2: Calming Corner */}
      <section
        className="bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-900/25 dark:to-cyan-900/25 rounded-2xl p-6 sm:p-8 shadow-lg border-2 border-teal-200 dark:border-teal-800 space-y-6"
        aria-labelledby="activity2-heading"
      >
        <header className="flex items-start gap-3">
          <div className="text-4xl" aria-hidden="true">
            🧘
          </div>
          <div className="space-y-1">
            <h2
              id="activity2-heading"
              className="text-slate-900 dark:text-slate-50 text-xl sm:text-2xl font-bold"
            >
              Activity 2: The Calming Corner
            </h2>
            <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base">
              First, pick how you feel. Then, pick a tool to try. Grown-ups can
              model the steps slowly and clearly.
            </p>
          </div>
        </header>

        {/* Feeling Selection */}
        <div className="space-y-3">
          <h3 className="text-slate-800 dark:text-slate-200 font-semibold text-sm sm:text-base">
            Step 1: I am feeling...
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            {calmingFeelings.map((feeling) => (
              <button
                key={feeling.id}
                type="button"
                onClick={() => setSelectedFeeling(feeling.id)}
                aria-pressed={selectedFeeling === feeling.id}
                aria-label={`I feel ${feeling.name}`}
                className={`px-4 py-5 rounded-2xl border-2 transition-all transform focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-offset-2 focus-visible:ring-teal-400 flex flex-col items-center justify-center gap-1 sm:gap-2 min-h-[5.25rem] text-base sm:text-lg font-semibold ${
                  selectedFeeling === feeling.id
                    ? "bg-teal-100 dark:bg-teal-900/40 border-teal-500 dark:border-teal-600 shadow-md"
                    : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-teal-300 dark:hover:border-teal-400"
                }`}
              >
                <div className="text-3xl sm:text-5xl" aria-hidden="true">
                  {feeling.emoji}
                </div>
                <div className="text-slate-800 dark:text-slate-100">
                  {feeling.name}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Tool Selection */}
        <div className="space-y-3">
          <h3 className="text-slate-800 dark:text-slate-200 font-semibold text-sm sm:text-base">
            Step 2: I will try...
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            {calmingTools.map((tool) => (
              <button
                key={tool.id}
                type="button"
                onClick={() => setSelectedTool(tool.id)}
                aria-pressed={selectedTool === tool.id}
                aria-label={`Try ${tool.name}`}
                className={`px-4 py-5 rounded-2xl border-2 transition-all transform focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-offset-2 focus-visible:ring-cyan-400 flex flex-col items-center justify-center gap-1 sm:gap-2 min-h-[5.25rem] text-base sm:text-lg font-semibold ${
                  selectedTool === tool.id
                    ? "bg-cyan-100 dark:bg-cyan-900/40 border-cyan-500 dark:border-cyan-600 shadow-md"
                    : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-cyan-300 dark:hover:border-cyan-400"
                }`}
              >
                <div className="text-3xl sm:text-5xl" aria-hidden="true">
                  {tool.emoji}
                </div>
                <div className="text-slate-800 dark:text-slate-100">
                  {tool.name}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <Button
            type="button"
            onClick={handleTryIt}
            style={{
              backgroundColor: "#0f766e",
              color: "#ffffff",
            }}
            className="flex-1 h-12 text-lg font-bold rounded-xl shadow-md flex items-center justify-center gap-2 hover:brightness-110 active:brightness-90"
          >
            <Sparkles className="w-5 h-5" aria-hidden="true" />
            <span>Try It!</span>
          </Button>

          <Button
            onClick={handleResetCalming}
            variant="outline"
            className="h-12 rounded-xl text-sm sm:text-base"
          >
            Reset
          </Button>
        </div>

        {/* Results */}
        {calmingResult && (
          <div
            className="bg-white dark:bg-slate-800 rounded-2xl p-5 sm:p-6 border-2 border-teal-300 dark:border-teal-700"
            aria-live="polite"
          >
            <div className="flex items-start gap-3">
              <div className="text-3xl" aria-hidden="true">
                ✨
              </div>
              <div className="space-y-1">
                <h4 className="text-slate-900 dark:text-slate-50 font-bold text-base sm:text-lg">
                  Great choice!
                </h4>
                <p className="text-slate-800 dark:text-slate-200 text-sm sm:text-base">
                  {calmingResult}
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
              You&apos;ve practiced noticing feelings and using calming tools.
              When you&apos;re done, a grown-up can tap “Complete Lesson.”
            </p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          {!isLessonCompleted ? (
            <>
              <Button
                type="button"
                onClick={handleManualComplete}
                className="bg-white text-emerald-700 hover:bg-emerald-50 rounded-xl flex items-center justify-center gap-2 text-sm sm:text-base font-semibold focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-offset-2 focus-visible:ring-white"
              >
                <Trophy className="w-4 h-4" aria-hidden="true" />
                <span>Complete Lesson</span>
              </Button>
              <Button
                type="button"
                onClick={handleSaveAndExit}
                variant="outline"
                className="bg-white/10 border-white/40 text-white hover:bg-white/15 rounded-xl text-sm sm:text-base focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-offset-2 focus-visible:ring-emerald-200"
              >
                Save &amp; Exit
              </Button>
            </>
          ) : (
            <Button
              type="button"
              onClick={onBack}
              className="bg-white text-emerald-700 hover:bg-emerald-50 rounded-xl text-sm sm:text-base font-semibold focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-offset-2 focus-visible:ring-white"
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
            <DialogDescription className="text-center text-sm sm:text-base">
              Congratulations! You&apos;ve successfully completed the Our
              Emotions lesson.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-2">
            <div className="bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 border border-emerald-200 dark:border-emerald-800/30 rounded-xl p-4">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Award
                  className="w-5 h-5 text-emerald-600 dark:text-emerald-400"
                  aria-hidden="true"
                />
                <span className="text-emerald-700 dark:text-emerald-300 text-sm sm:text-base">
                  +100 points earned
                </span>
              </div>
              <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 text-center">
                The Our Emotions Activity is now available in the Activities
                section.
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 mt-4">
            <Button
              type="button"
              onClick={() => {
                setShowCompletionDialog(false);
                onBack();
              }}
              className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-sm sm:text-base"
            >
              Back to Lessons
            </Button>
            <Button
              type="button"
              onClick={() => setShowCompletionDialog(false)}
              variant="outline"
              className="text-sm sm:text-base"
            >
              Continue Reviewing
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
