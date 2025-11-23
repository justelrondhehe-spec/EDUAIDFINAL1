// frontend/src/components/ScienceExperimentActivity.tsx
import {
  ArrowLeft,
  CheckCircle2,
  FlaskConical,
  Sparkles,
  Smile,
} from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { useApp } from "../contexts/AppContext";

interface ActivityProps {
  onBack: () => void;
}

export function ScienceExperimentActivity({ onBack }: ActivityProps) {
  const { completeActivity, activityScores } = useApp();
  const activityId = 4;
  const current = activityScores[activityId];
  const maxScore = current?.maxScore ?? 5;

  const handleComplete = async () => {
    await completeActivity(activityId, maxScore, maxScore);
    onBack();
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to activities
        </button>

        <Badge className="bg-cyan-500 hover:bg-cyan-600 flex items-center gap-1">
          <FlaskConical className="w-3 h-3" />
          Science • Experiment
        </Badge>
      </div>

      {/* Hero */}
      <div className="bg-gradient-to-br from-cyan-500 via-sky-500 to-indigo-500 rounded-3xl p-6 md:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
        <div className="absolute -left-8 bottom-0 w-40 h-40 bg-slate-900/20 rounded-full blur-2xl" />
        <div className="relative space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-3 py-1 text-xs font-medium">
            <Sparkles className="w-3 h-3" />
            Science Experiment Lab
          </div>
          <h1 className="text-2xl md:text-3xl font-semibold">
            Try a simple, safe experiment together
          </h1>
          <p className="text-sm md:text-base text-cyan-50/90">
            This activity can be done as a real hands-on experiment or as a
            guided story where you talk through each step.
          </p>
        </div>
      </div>

      {/* Steps */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 shadow-md border border-slate-200 dark:border-slate-800 space-y-3">
          <h2 className="text-slate-800 dark:text-slate-100 text-lg">
            1. Predict gently
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Show what you&apos;re testing (for example, hot vs. cold water).
          </p>
          <ul className="text-sm text-slate-600 dark:text-slate-400 list-disc pl-4 space-y-1">
            <li>Ask: “What do you think will happen?”</li>
            <li>Accept any response: words, gestures, drawings.</li>
            <li>Write or draw their idea so they feel heard.</li>
          </ul>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 shadow-md border border-slate-200 dark:border-slate-800 space-y-3">
          <h2 className="text-slate-800 dark:text-slate-100 text-lg">
            2. Watch and notice
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Do the experiment slowly with clear language and visual steps.
          </p>
          <ul className="text-sm text-slate-600 dark:text-slate-400 list-disc pl-4 space-y-1">
            <li>Use pictures or symbols for each step.</li>
            <li>Point out changes: bubbles, steam, color, etc.</li>
            <li>Allow learners to stand farther away if they are sensory-sensitive.</li>
          </ul>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 shadow-md border border-slate-200 dark:border-slate-800 space-y-3">
          <h2 className="text-slate-800 dark:text-slate-100 text-lg">
            3. Share the result
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Compare what happened to the prediction.
          </p>
          <ul className="text-sm text-slate-600 dark:text-slate-400 list-disc pl-4 space-y-1">
            <li>“We thought __. We saw __.”</li>
            <li>Use checkmarks, smiley faces, or thumbs-up cards.</li>
            <li>End with a simple summary sentence together.</li>
          </ul>
        </div>
      </div>

      {/* Completion */}
      <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Smile className="w-5 h-5 text-cyan-500" />
          <p className="text-sm text-slate-700 dark:text-slate-300">
            When you&apos;re finished talking about what you noticed, mark this
            activity as complete.
          </p>
        </div>
        <Button
          className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-indigo-500 text-white"
          onClick={handleComplete}
        >
          <CheckCircle2 className="w-4 h-4" />
          Mark activity completed
        </Button>
      </div>
    </div>
  );
}
