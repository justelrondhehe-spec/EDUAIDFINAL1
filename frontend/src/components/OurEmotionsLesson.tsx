// frontend/src/components/OurEmotionsLesson.tsx
import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  Trophy,
  Award,
  Heart,
  Sparkles,
  CheckCircle,
} from "lucide-react";
import { Button } from "./ui/button";
import { useApp } from "../contexts/AppContext";
import type { Page } from "../App";

// Props same pattern as your other lesson components
interface LessonProps {
  onBackToLessons: () => void;
  onNavigate?: (page: Page) => void; // optional – not used for now
}

/* ----------------------- Simple Dialog primitives ----------------------- */

interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

const Dialog = ({ open, onOpenChange, children }: DialogProps) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* dark overlay */}
      <div
        className="absolute inset-0 bg-black/70"
        onClick={() => onOpenChange(false)}
      />

      {/* centered content */}
      <div className="relative z-10 flex w-full h-full items-center justify-center">
        {children}
      </div>
    </div>
  );
};

const DialogHeader = ({ children }: { children: React.ReactNode }) => (
  <div className="flex flex-col space-y-1.5 text-center sm:text-left">
    {children}
  </div>
);

const DialogTitle = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <h2
    className={`text-lg font-semibold leading-none tracking-tight ${className}`}
  >
    {children}
  </h2>
);

const DialogDescription = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <p className={`text-sm text-slate-500 ${className}`}>{children}</p>
);

const DialogContent = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={`w-full max-w-xl mx-auto bg-white rounded-3xl shadow-2xl p-6 ${className}`}
  >
    {children}
  </div>
);




/* --------------------------- Main Lesson --------------------------- */

export function OurEmotionsLesson({ onBackToLessons }: LessonProps) {
  const { startLesson, completeLesson, saveAndExitLesson, lessonProgress } =
    useApp();
  const lessonId = 6; // keep same id as old TestLesson

  // Activity 1: Feeling Detective
  const [correctAnswers, setCorrectAnswers] = useState<number[]>([]);
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<number, string | undefined>
  >({});

  // Activity 2: Calming Corner
  const [selectedFeeling, setSelectedFeeling] = useState<string | null>(null);
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [calmingResult, setCalmingResult] = useState("");

  const [showCompletionDialog, setShowCompletionDialog] = useState(false);

  const lesson = lessonProgress[lessonId];
  const isLessonCompleted = lesson?.completed || false;

  // Start tracking when lesson opens
  useEffect(() => {
    if (!lesson) {
      startLesson(lessonId);
    }
  }, [lesson, lessonId, startLesson]);

  /* ------------------------ Data definitions ------------------------ */

  const emotions = [
    {
      id: "happy",
      name: "Happy",
      emoji: "😊",
      description:
        "When we feel good inside. Our mouth smiles and our eyes light up.",
      causes: ["Playing with friends", "Eating a yummy snack"],
      color: "from-yellow-100 to-amber-100",
      darkColor: "from-yellow-900/20 to-amber-900/20",
    },
    {
      id: "sad",
      name: "Sad",
      emoji: "😢",
      description:
        "When we feel heavy or hurt. We might cry or want to be alone.",
      causes: ["Dropping a toy", "Missing someone we love"],
      color: "from-blue-100 to-cyan-100",
      darkColor: "from-blue-900/20 to-cyan-900/20",
    },
    {
      id: "angry",
      name: "Angry",
      emoji: "😡",
      description:
        "When we feel hot or frustrated. Our face frowns and our hands might make fists.",
      causes: ["Something breaks", "We cannot have what we want right now"],
      color: "from-red-100 to-orange-100",
      darkColor: "from-red-900/20 to-orange-900/20",
    },
    {
      id: "scared",
      name: "Scared",
      emoji: "😨",
      description:
        "When we feel unsafe or worried. Our eyes get big and our heart beats fast.",
      causes: ["Loud noises like thunder", "The dark"],
      color: "from-purple-100 to-violet-100",
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

  /* -------------------------- Logic helpers -------------------------- */

  const calculateProgress = () => {
    const activity1Progress = (correctAnswers.length / scenarios.length) * 50;
    const activity2Progress = calmingResult ? 50 : 0;
    return Math.round(activity1Progress + activity2Progress);
  };

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

  const handleReset = () => {
    setSelectedFeeling(null);
    setSelectedTool(null);
    setCalmingResult("");
  };

  const handleSaveAndExit = () => {
    const progress = calculateProgress();
    if (saveAndExitLesson) {
      saveAndExitLesson(lessonId, progress);
    }
    onBackToLessons();
  };

  /* ------------------------------- UI ------------------------------- */

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          onClick={onBackToLessons}
          className="dark:bg-slate-800 dark:border-slate-700"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Lessons
        </Button>
      </div>

      {/* Hero */}
      <div className="bg-gradient-to-br from-pink-500 to-rose-500 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />

        <div className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm text-white mb-4">
          ❤️ Social & Emotional Learning
        </div>

        <h1 className="text-white text-3xl font-bold mb-4">Our Emotions</h1>

        <p className="text-white/90 mb-6 max-w-3xl">
          Learn to understand and express your feelings in healthy ways.
          Discover tools to help you when emotions feel big!
        </p>

        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <div className="text-white/80 text-sm mb-1">Estimated time</div>
            <div className="text-white">20 minutes</div>
          </div>
          <div>
            <div className="text-white/80 text-sm mb-1">Skills</div>
            <div className="text-white">
              Self-Awareness • Emotional Regulation • Empathy
            </div>
          </div>
        </div>

        <Button className="bg-white text-pink-600 hover:bg-white/90 px-6 py-3 rounded-xl flex items-center gap-2 font-medium">
          <Heart className="w-4 h-4" />
          Start Learning
        </Button>
      </div>

      {/* Progress card */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
        <h3 className="text-slate-800 dark:text-slate-100 mb-4 font-semibold">
          Your progress
        </h3>

        <div className="flex items-center justify-between mb-2">
          <span className="text-slate-600 dark:text-slate-400 text-sm">
            Lesson completion
          </span>
          <span className="text-slate-800 dark:text-slate-100 font-medium">
            {calculateProgress()}%
          </span>
        </div>

        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 mb-4 overflow-hidden">
          <div
            className="bg-gradient-to-r from-pink-500 to-rose-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${calculateProgress()}%` }}
          />
        </div>

        <div className="flex items-start gap-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl p-4">
          <div className="text-2xl">💡</div>
          <p className="text-slate-600 dark:text-slate-400 text-sm">
            Encourage the learner to share their own experiences with each
            emotion. This helps build emotional vocabulary!
          </p>
        </div>
      </div>

      {/* Part 1: Naming feelings */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg border border-slate-200 dark:border-slate-700">
        <h2 className="text-slate-800 dark:text-slate-100 mb-2 text-2xl font-bold">
          Part 1: Naming Our Feelings
        </h2>
        <p className="text-slate-600 dark:text-slate-400 mb-6">
          Learn to recognize different feelings and what they look like.
        </p>

        <div className="space-y-6">
          {emotions.map((emotion) => (
            <div
              key={emotion.id}
              className={`bg-gradient-to-br ${emotion.color} dark:${emotion.darkColor} rounded-xl p-6 border border-slate-200 dark:border-slate-700`}
            >
              <div className="flex items-start gap-4">
                <div className="text-6xl">{emotion.emoji}</div>
                <div className="flex-1">
                  <h3 className="text-slate-800 dark:text-slate-100 font-bold text-xl mb-2">
                    {emotion.name}
                  </h3>
                  <p className="text-slate-700 dark:text-slate-300 mb-4">
                    {emotion.description}
                  </p>
                  <div className="bg-white dark:bg-slate-800/50 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
                    <div className="text-sm text-slate-600 dark:text-slate-400 font-semibold mb-2">
                      What makes us {emotion.name}?
                    </div>
                    <ul className="space-y-2">
                      {emotion.causes.map((cause, idx) => (
                        <li
                          key={idx}
                          className="text-slate-700 dark:text-slate-300 flex items-center gap-2"
                        >
                          <span className="w-2 h-2 bg-pink-500 rounded-full" />
                          {cause}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Activity 1: Feeling Detective */}
      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-2xl p-8 shadow-lg border-2 border-indigo-200 dark:border-indigo-800">
        <div className="flex items-center gap-3 mb-4">
          <div className="text-4xl">🕵️</div>
          <div>
            <h2 className="text-slate-800 dark:text-slate-100 text-2xl font-bold">
              Activity 1: The Feeling Detective
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              Look at the situation and guess the feeling! Click the correct
              face.
            </p>
          </div>
        </div>

        <div className="space-y-6 mb-6">
          {scenarios.map((scenario) => {
            const isCorrect = correctAnswers.includes(scenario.id);
            const selectedAnswer = selectedAnswers[scenario.id];

            return (
              <div
                key={scenario.id}
                className={`bg-white dark:bg-slate-800 rounded-xl p-6 border-2 transition-all ${
                  isCorrect
                    ? "border-emerald-400 dark:border-emerald-600"
                    : "border-slate-200 dark:border-slate-700"
                }`}
              >
                <div className="mb-4">
                  <h3 className="text-slate-800 dark:text-slate-100 font-semibold mb-2">
                    Situation {scenario.id}:
                  </h3>
                  <p className="text-slate-700 dark:text-slate-300 text-lg">
                    {scenario.situation}
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {scenario.options.map((option) => {
                    const isSelected = selectedAnswer === option.value;
                    const showAsCorrect = isSelected && isCorrect;
                    const showAsIncorrect = isSelected && !isCorrect;

                    return (
                      <button
                        key={option.value}
                        onClick={() =>
                          handleAnswerSelect(scenario.id, option.value)
                        }
                        className={`p-4 rounded-xl border-2 transition-all transform hover:scale-105 ${
                          showAsCorrect
                            ? "bg-emerald-100 dark:bg-emerald-900/30 border-emerald-500 dark:border-emerald-600"
                            : showAsIncorrect
                            ? "bg-red-100 dark:bg-red-900/30 border-red-500 dark:border-red-600"
                            : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-indigo-300"
                        }`}
                      >
                        <div className="text-4xl mb-2">{option.emoji}</div>
                        <div className="text-sm text-slate-700 dark:text-slate-300 font-medium">
                          {option.label}
                        </div>
                        {showAsCorrect && (
                          <CheckCircle2 className="w-5 h-5 text-emerald-600 mx-auto mt-2" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-indigo-200 dark:border-indigo-800">
          <div className="flex items-center justify-center gap-2">
            <Trophy className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <span className="text-slate-800 dark:text-slate-100 font-bold">
              Feelings Found: {correctAnswers.length} / {scenarios.length}
            </span>
          </div>
        </div>
      </div>

      {/* Part 2: Coping tools */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg border border-slate-200 dark:border-slate-700">
        <h2 className="text-slate-800 dark:text-slate-100 mb-2 text-2xl font-bold">
          Part 2: What Can I Do?
        </h2>
        <p className="text-slate-600 dark:text-slate-400 mb-6">
          Learn simple tools to help handle big feelings.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {copingStrategies.map((strategy) => (
            <div
              key={strategy.id}
              className="bg-gradient-to-br from-slate-50 to-emerald-50 dark:from-slate-900/50 dark:to-emerald-900/20 rounded-xl p-6 border border-slate-200 dark:border-slate-700"
            >
              <div className="flex items-start gap-4">
                <div className="text-5xl">{strategy.emoji}</div>
                <div className="flex-1">
                  <h3 className="text-slate-800 dark:text-slate-100 font-bold mb-2">
                    {strategy.name}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-3 text-sm">
                    {strategy.description}
                  </p>
                  <div className="bg-white dark:bg-slate-800/50 rounded-lg p-3 border border-slate-200 dark:border-slate-700">
                    <ul className="space-y-2">
                      {strategy.steps.map((step, idx) => (
                        <li
                          key={idx}
                          className="text-slate-700 dark:text-slate-300 text-sm flex items-start gap-2"
                        >
                          <span className="text-emerald-500 mt-1">•</span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Activity 2: Calming Corner */}
      <div className="bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20 rounded-2xl p-8 shadow-lg border-2 border-teal-200 dark:border-teal-800">
        <div className="flex items-center gap-3 mb-6">
          <div className="text-4xl">🧘</div>
          <div>
            <h2 className="text-slate-800 dark:text-slate-100 text-2xl font-bold">
              Activity 2: The Calming Corner
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              Pick a Feeling and a Tool to help feel better!
            </p>
          </div>
        </div>

        {/* Feeling Selection */}
        <div className="mb-6">
          <h3 className="text-slate-700 dark:text-slate-300 font-semibold mb-3">
            I am feeling:
          </h3>
          <div className="grid grid-cols-3 gap-3">
            {calmingFeelings.map((feeling) => (
              <button
                key={feeling.id}
                onClick={() => setSelectedFeeling(feeling.id)}
                className={`p-4 rounded-xl border-2 transition-all transform hover:scale-105 ${
                  selectedFeeling === feeling.id
                    ? "bg-teal-100 dark:bg-teal-900/30 border-teal-500 dark:border-teal-600"
                    : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-teal-300"
                }`}
              >
                <div className="text-5xl mb-2">{feeling.emoji}</div>
                <div className="text-sm text-slate-700 dark:text-slate-300 font-medium">
                  {feeling.name}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Tool Selection */}
        <div className="mb-6">
          <h3 className="text-slate-700 dark:text-slate-300 font-semibold mb-3">
            I will try:
          </h3>
          <div className="grid grid-cols-3 gap-3">
            {calmingTools.map((tool) => (
              <button
                key={tool.id}
                onClick={() => setSelectedTool(tool.id)}
                className={`p-4 rounded-xl border-2 transition-all transform hover:scale-105 ${
                  selectedTool === tool.id
                    ? "bg-cyan-100 dark:bg-cyan-900/30 border-cyan-500 dark:border-cyan-600"
                    : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-cyan-300"
                }`}
              >
                <div className="text-5xl mb-2">{tool.emoji}</div>
                <div className="text-sm text-slate-700 dark:text-slate-300 font-medium">
                  {tool.name}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mb-6">
          {/* Try It button with gradient like in Figma */}
          <Button
            onClick={handleTryIt}
            className="flex-1 h-12 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white rounded-xl shadow-md"
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Try It!
          </Button>

          {/* Reset button */}
          <Button
            onClick={handleReset}
            variant="outline"
            className="h-12"
          >
            Reset
          </Button>
        </div>

        {/* Results */}
        {calmingResult && (
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border-2 border-teal-300 dark:border-teal-700 animate-in fade-in-0 zoom-in-95">
            <div className="flex items-start gap-3">
              <div className="text-3xl">✨</div>
              <div>
                <h4 className="text-slate-800 dark:text-slate-100 font-bold mb-2">
                  Great Choice!
                </h4>
                <p className="text-slate-700 dark:text-slate-300">
                  {calmingResult}
                </p>
              </div>
            </div>
          </div>
          )}
      </div>

      <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl p-8 shadow-lg">
        <div className="flex items-center gap-4 mb-4">
          <CheckCircle className="w-12 h-12 text-white" />
          <div className="text-white">
            <h3 className="text-white mb-1 font-bold text-lg">
              Ready to Complete This Lesson?
            </h3>
            <p className="text-white/90">
              You’ve learned about emotions and how to handle them like a pro!
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          {!isLessonCompleted ? (
            <>
              <Button
                onClick={() => {
                  completeLesson(lessonId);
                  setShowCompletionDialog(true);
                }}
                variant="secondary"
                className="font-medium bg-white text-emerald-600 hover:bg-emerald-50"
              >
                <Trophy className="w-4 h-4 mr-2" />
                Complete Lesson
              </Button>
              <Button
                onClick={handleSaveAndExit}
                variant="outline"
                className="border-white/60 bg-white/10 text-white hover:bg-white/20"
              >
                Save & Exit
              </Button>
            </>
          ) : (
            <Button
              onClick={onBackToLessons}
              variant="secondary"
              className="bg-white text-emerald-600 hover:bg-emerald-50"
            >
              Back to Lessons
            </Button>
          )}
        </div>
      </div>

      {/* Completion Dialog */}
      <Dialog
        open={showCompletionDialog}
        onOpenChange={setShowCompletionDialog}
      >
        <DialogContent className="sm:max-w-md">
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center">
              <Trophy className="w-10 h-10 text-white" />
            </div>
          </div>
          <DialogHeader>
            <DialogTitle className="text-center text-2xl">
              Lesson Completed! 🎉
            </DialogTitle>
            <DialogDescription className="text-center">
              Congratulations! You’ve successfully completed the Our Emotions
              lesson.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 border border-emerald-200 dark:border-emerald-800/30 rounded-xl p-4">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Award className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                <span className="text-emerald-700 dark:text-emerald-300 font-medium">
                  +100 Points Earned
                </span>
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400 text-center">
                Amazing work! You now know how to recognize and handle your
                emotions!
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 mt-4">
            <Button
              onClick={() => {
                setShowCompletionDialog(false);
                onBackToLessons();
              }}
              className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white border-none w-full"
            >
              Back to Lessons
            </Button>
            <Button
              onClick={() => setShowCompletionDialog(false)}
              variant="outline"
              className="w-full"
            >
              Continue Reviewing
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
