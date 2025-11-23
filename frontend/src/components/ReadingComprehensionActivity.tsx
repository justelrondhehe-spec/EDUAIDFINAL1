// frontend/src/components/ReadingComprehensionActivity.tsx
import {
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  Volume2,
  Smile,
} from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { useApp } from "../contexts/AppContext";

interface ActivityProps {
  onBack: () => void;
}

export function ReadingComprehensionActivity({ onBack }: ActivityProps) {
  const { completeActivity, activityScores } = useApp();
  const activityId = 3;
  const current = activityScores[activityId];
  const maxScore = current?.maxScore ?? 6;

  const handleComplete = async (level: "listening" | "reading" | "independent") => {
    const multiplier =
      level === "listening" ? 0.6 : level === "reading" ? 0.85 : 1;
    const score = Math.round(maxScore * multiplier);
    await completeActivity(activityId, score, maxScore);
    onBack();
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Top */}
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to activities
        </button>

        <Badge className="bg-emerald-500 hover:bg-emerald-600 flex items-center gap-1">
          <Sparkles className="w-3 h-3" />
          Language Arts • Phonics
        </Badge>
      </div>

      {/* Hero */}
      <div className="bg-gradient-to-br from-emerald-500 via-green-500 to-teal-500 rounded-3xl p-6 md:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
        <div className="absolute -left-8 bottom-0 w-40 h-40 bg-emerald-900/20 rounded-full blur-2xl" />
        <div className="relative space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-3 py-1 text-xs font-medium">
            <Volume2 className="w-3 h-3" />
            Reading Comprehension Quiz
          </div>
          <h1 className="text-2xl md:text-3xl font-semibold">
            Listen, look at pictures, and choose an answer
          </h1>
          <p className="text-sm md:text-base text-emerald-50/90">
            This quiz can be done completely orally, with picture choices, or
            with simple printed words so all learners can show what they know.
          </p>
        </div>
      </div>

      {/* Steps */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Step 1 */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 shadow-md border border-slate-200 dark:border-slate-800 space-y-3">
          <h2 className="text-slate-800 dark:text-slate-100 text-lg">
            1. Choose the mode
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Pick the way the learner can answer most comfortably:
          </p>
          <ul className="text-sm text-slate-600 dark:text-slate-400 list-disc pl-4 space-y-1">
            <li>Pointing to a picture or symbol.</li>
            <li>Choosing a word card.</li>
            <li>Speaking the answer or using a device.</li>
          </ul>
        </div>

        {/* Step 2 */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 shadow-md border border-slate-200 dark:border-slate-800 space-y-3">
          <h2 className="text-slate-800 dark:text-slate-100 text-lg">
            2. Read or play the sentence
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Read a very short sentence (or play audio) and show 2–3 choices.
          </p>
          <ul className="text-sm text-slate-600 dark:text-slate-400 list-disc pl-4 space-y-1">
            <li>Example: “The cat is on the mat.”</li>
            <li>Choices: cat on mat, cat under mat, dog on mat.</li>
            <li>Give extra time – silence is okay while they think.</li>
          </ul>
        </div>

        {/* Step 3 */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 shadow-md border border-slate-200 dark:border-slate-800 space-y-3">
          <h2 className="text-slate-800 dark:text-slate-100 text-lg">
            3. Celebrate, not stress
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Use gentle, specific praise and allow breaks:
          </p>
          <ul className="text-sm text-slate-600 dark:text-slate-400 list-disc pl-4 space-y-1">
            <li>“You listened so carefully!”</li>
            <li>“Nice job using your device to answer.”</li>
            <li>Offer a stretch or sensory break between questions.</li>
          </ul>
        </div>
      </div>

      {/* Completion choices */}
      <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 space-y-4">
        <div className="flex items-center gap-2">
          <Smile className="w-5 h-5 text-emerald-500" />
          <h3 className="text-slate-800 dark:text-slate-100 text-sm md:text-base">
            How did we do today?
          </h3>
        </div>

        <div className="grid md:grid-cols-3 gap-3">
          <Button
            variant="outline"
            className="h-auto py-3 flex flex-col items-center gap-1"
            onClick={() => handleComplete("listening")}
          >
            <span className="text-2xl">👂</span>
            <span className="text-xs font-medium">I listened and tried</span>
            <span className="text-[11px] text-slate-500">
              Adult helped with pictures / choices.
            </span>
          </Button>

          <Button
            variant="outline"
            className="h-auto py-3 flex flex-col items-center gap-1"
            onClick={() => handleComplete("reading")}
          >
            <span className="text-2xl">📖</span>
            <span className="text-xs font-medium">I read with help</span>
            <span className="text-[11px] text-slate-500">
              Shared reading or echo reading.
            </span>
          </Button>

          <Button
            className="h-auto py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white flex flex-col items-center gap-1"
            onClick={() => handleComplete("independent")}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span className="text-xs font-medium">I answered independently</span>
            <span className="text-[11px] text-emerald-50">
              Mark activity as completed.
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
}
