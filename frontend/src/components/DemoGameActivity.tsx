// frontend/src/components/DemoGameActivity.tsx
import {
  ArrowLeft,
  CheckCircle2,
  Gamepad2,
  Sparkles,
  Smile,
} from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { useApp } from "../contexts/AppContext";

interface ActivityProps {
  onBack: () => void;
}

export function DemoGameActivity({ onBack }: ActivityProps) {
  const { completeActivity, activityScores } = useApp();
  const activityId = 6;
  const current = activityScores[activityId];
  const maxScore = current?.maxScore ?? 5;

  const handleComplete = async () => {
    await completeActivity(activityId, maxScore, maxScore);
    onBack();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to activities
        </button>

        <Badge className="bg-slate-600 flex items-center gap-1">
          <Gamepad2 className="w-3 h-3" />
          Demo Activity
        </Badge>
      </div>

      {/* Hero */}
      <div className="bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 rounded-3xl p-6 md:p-8 text-white shadow-xl space-y-3">
        <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-3 py-1 text-xs font-medium">
          <Sparkles className="w-3 h-3" />
          Strategy / Demo
        </div>
        <h1 className="text-2xl md:text-3xl font-semibold">Valorant (Demo)</h1>
        <p className="text-sm md:text-base text-slate-100/80">
          This activity is just for testing and practicing how activities work in
          EduAid. Use it to model turn-taking, pausing, and talking about choices
          in any game.
        </p>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 shadow-md border border-slate-200 dark:border-slate-800 space-y-3">
        <h2 className="text-slate-800 dark:text-slate-100 text-lg">
          Ideas for safe, learner-friendly play
        </h2>
        <ul className="text-sm text-slate-600 dark:text-slate-400 list-disc pl-4 space-y-1">
          <li>Talk about how characters feel when they win or lose.</li>
          <li>Pause often to ask, “What could we try next time?”</li>
          <li>
            Focus on <strong>problem-solving</strong> and <strong>kind language</strong>,
            not scores or speed.
          </li>
          <li>End with a calming activity like deep breathing or a stretch.</li>
        </ul>
      </div>

      <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Smile className="w-5 h-5 text-slate-500" />
          <p className="text-sm text-slate-700 dark:text-slate-300">
            When you&apos;re done using this as a demo or practice activity, tap
            the button to mark it complete.
          </p>
        </div>
        <Button
          className="flex items-center gap-2 bg-gradient-to-r from-slate-600 to-slate-800 text-white"
          onClick={handleComplete}
        >
          <CheckCircle2 className="w-4 h-4" />
          Mark demo completed
        </Button>
      </div>
    </div>
  );
}
