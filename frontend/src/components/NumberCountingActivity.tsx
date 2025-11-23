// frontend/src/components/NumberCountingActivity.tsx
import {
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  PlayCircle,
  Smile,
} from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { useApp } from "../contexts/AppContext";

interface ActivityProps {
  onBack: () => void;
}

export function NumberCountingActivity({ onBack }: ActivityProps) {
  const { completeActivity, activityScores } = useApp();
  const activityId = 2;
  const current = activityScores[activityId];
  const maxScore = current?.maxScore ?? 8;

  const handleComplete = async (confidence: "learning" | "getting-it" | "nailed-it") => {
    const multiplier =
      confidence === "learning" ? 0.6 : confidence === "getting-it" ? 0.85 : 1;
    const score = Math.round(maxScore * multiplier);
    await completeActivity(activityId, score, maxScore);
    onBack();
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Top bar */}
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to activities
        </button>

        <Badge className="bg-sky-500 hover:bg-sky-600 flex items-center gap-1">
          <Sparkles className="w-3 h-3" />
          Math • Counting
        </Badge>
      </div>

      {/* Hero */}
      <div className="bg-gradient-to-br from-sky-500 via-blue-500 to-indigo-500 rounded-3xl p-6 md:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
        <div className="absolute -left-8 bottom-0 w-40 h-40 bg-blue-900/20 rounded-full blur-2xl" />
        <div className="relative space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-3 py-1 text-xs font-medium">
            <PlayCircle className="w-3 h-3" />
            Number Counting Adventure
          </div>
          <h1 className="text-2xl md:text-3xl font-semibold">
            Count, point, and play with numbers
          </h1>
          <p className="text-sm md:text-base text-blue-50/90">
            A calm, guided counting activity using small groups of objects. Great
            for learners who benefit from visual supports, repetition, and extra
            processing time.
          </p>
        </div>
      </div>

      {/* Steps (child-friendly + SN-friendly) */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Step 1 */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 shadow-md border border-slate-200 dark:border-slate-800 space-y-3">
          <h2 className="text-slate-800 dark:text-slate-100 text-lg">
            1. Warm-up counting
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Show a small group of items (2–5). Let the learner:
          </p>
          <ul className="text-sm text-slate-600 dark:text-slate-400 list-disc pl-4 space-y-1">
            <li>Touch or point to each object while saying the number.</li>
            <li>Count slowly together – no rush, plenty of wait time.</li>
            <li>
              If speech is hard, they can{" "}
              <strong>tap, sign, or use a card</strong> to show the number.
            </li>
          </ul>
        </div>

        {/* Step 2 */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 shadow-md border border-slate-200 dark:border-slate-800 space-y-3">
          <h2 className="text-slate-800 dark:text-slate-100 text-lg">
            2. Find the number
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Place two number cards (like 3 and 5) in front of the learner.
          </p>
          <ul className="text-sm text-slate-600 dark:text-slate-400 list-disc pl-4 space-y-1">
            <li>Show a group of dots and ask: “Which number matches this?”</li>
            <li>They can point, hand you the card, or say the number.</li>
            <li>
              Praise <strong>effort</strong>, not just accuracy – “Nice trying!”,
              “You looked carefully!”
            </li>
          </ul>
        </div>

        {/* Step 3 */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 shadow-md border border-slate-200 dark:border-slate-800 space-y-3">
          <h2 className="text-slate-800 dark:text-slate-100 text-lg">
            3. Gentle challenge
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            If the learner is ready, use numbers up to 10 or 20.
          </p>
          <ul className="text-sm text-slate-600 dark:text-slate-400 list-disc pl-4 space-y-1">
            <li>Ask “Which is more?” and “Which is less?” using two groups.</li>
            <li>Use color or shape tokens to make it visually clear.</li>
            <li>Offer movement breaks if they look tired or overloaded.</li>
          </ul>
        </div>
      </div>

      {/* Reflection & completion (SN-friendly self-rating) */}
      <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <Smile className="w-5 h-5 text-sky-500" />
          <h3 className="text-slate-800 dark:text-slate-100 text-sm md:text-base">
            How did this activity feel today?
          </h3>
        </div>

        <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400">
          Let the learner choose one card or button below. Adults can help by
          reading choices aloud or modeling.
        </p>

        <div className="grid md:grid-cols-3 gap-3">
          <Button
            variant="outline"
            className="h-auto py-3 flex flex-col items-center gap-1"
            onClick={() => handleComplete("learning")}
          >
            <span className="text-2xl">🙂</span>
            <span className="text-xs font-medium">I&apos;m still learning</span>
            <span className="text-[11px] text-slate-500">
              We practiced and that&apos;s okay!
            </span>
          </Button>

          <Button
            variant="outline"
            className="h-auto py-3 flex flex-col items-center gap-1"
            onClick={() => handleComplete("getting-it")}
          >
            <span className="text-2xl">😄</span>
            <span className="text-xs font-medium">I&apos;m getting it</span>
            <span className="text-[11px] text-slate-500">
              I answered many correctly.
            </span>
          </Button>

          <Button
            className="h-auto py-3 bg-gradient-to-r from-sky-500 to-indigo-500 text-white flex flex-col items-center gap-1"
            onClick={() => handleComplete("nailed-it")}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span className="text-xs font-medium">I did my very best!</span>
            <span className="text-[11px] text-sky-100">
              Mark activity as completed.
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
}
