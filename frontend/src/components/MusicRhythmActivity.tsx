// frontend/src/components/MusicRhythmActivity.tsx
import {
  ArrowLeft,
  CheckCircle2,
  Music2,
  Sparkles,
  Smile,
} from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { useApp } from "../contexts/AppContext";

interface ActivityProps {
  onBack: () => void;
}

export function MusicRhythmActivity({ onBack }: ActivityProps) {
  const { completeActivity, activityScores } = useApp();
  const activityId = 5;
  const current = activityScores[activityId];
  const maxScore = current?.maxScore ?? 8;

  const handleComplete = async (mode: "clap" | "copy" | "create") => {
    const multiplier = mode === "clap" ? 0.6 : mode === "copy" ? 0.85 : 1;
    const score = Math.round(maxScore * multiplier);
    await completeActivity(activityId, score, maxScore);
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

        <Badge className="bg-amber-500 hover:bg-amber-600 flex items-center gap-1">
          <Music2 className="w-3 h-3" />
          Arts • Rhythm
        </Badge>
      </div>

      {/* Hero */}
      <div className="bg-gradient-to-br from-amber-400 via-orange-500 to-fuchsia-600 rounded-3xl p-6 md:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
        <div className="absolute -left-8 bottom-0 w-40 h-40 bg-pink-900/20 rounded-full blur-2xl" />
        <div className="relative space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-3 py-1 text-xs font-medium">
            <Sparkles className="w-3 h-3" />
            Music Rhythm Challenge
          </div>
          <h1 className="text-2xl md:text-3xl font-semibold">
            Clap, tap, or move along with the beat
          </h1>
          <p className="text-sm md:text-base text-amber-50/90">
            Use body percussion, instruments, or everyday objects. Learners can
            join by moving, tapping, or simply watching and listening.
          </p>
        </div>
      </div>

      {/* Steps */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 shadow-md border border-slate-200 dark:border-slate-800 space-y-3">
          <h2 className="text-slate-800 dark:text-slate-100 text-lg">
            1. Steady beat
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Choose calm music or count 1-2-3-4 together.
          </p>
          <ul className="text-sm text-slate-600 dark:text-slate-400 list-disc pl-4 space-y-1">
            <li>Tap knees, clap, or gently march in place.</li>
            <li>Use a picture of a drum to show “beat time”.</li>
            <li>Let noise-sensitive learners just tap fingers or feet.</li>
          </ul>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 shadow-md border border-slate-200 dark:border-slate-800 space-y-3">
          <h2 className="text-slate-800 dark:text-slate-100 text-lg">
            2. Copy the pattern
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Clap a short pattern (like clap-clap-rest-clap) and have them copy.
          </p>
          <ul className="text-sm text-slate-600 dark:text-slate-400 list-disc pl-4 space-y-1">
            <li>Say “ta ta (rest) ta” as you clap.</li>
            <li>Show icons (● ● □ ●) for visual support.</li>
            <li>Go at the learner&apos;s pace; repeat as needed.</li>
          </ul>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 shadow-md border border-slate-200 dark:border-slate-800 space-y-3">
          <h2 className="text-slate-800 dark:text-slate-100 text-lg">
            3. Create a rhythm
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Invite the learner to choose their own simple pattern.
          </p>
          <ul className="text-sm text-slate-600 dark:text-slate-400 list-disc pl-4 space-y-1">
            <li>They can pick from cards (e.g., clap–tap–clap).</li>
            <li>Everyone copies their pattern – they&apos;re the leader!</li>
            <li>Keep it short to avoid fatigue or sensory overload.</li>
          </ul>
        </div>
      </div>

      {/* Completion */}
      <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 space-y-4">
        <div className="flex items-center gap-2">
          <Smile className="w-5 h-5 text-amber-500" />
          <h3 className="text-slate-800 dark:text-slate-100 text-sm md:text-base">
            Choose how you took part today
          </h3>
        </div>
        <div className="grid md:grid-cols-3 gap-3">
          <Button
            variant="outline"
            className="h-auto py-3 flex flex-col items-center gap-1"
            onClick={() => handleComplete("clap")}
          >
            <span className="text-2xl">👏</span>
            <span className="text-xs font-medium">I clapped or tapped</span>
            <span className="text-[11px] text-slate-500">
              Joining in with the beat.
            </span>
          </Button>

          <Button
            variant="outline"
            className="h-auto py-3 flex flex-col items-center gap-1"
            onClick={() => handleComplete("copy")}
          >
            <span className="text-2xl">🔁</span>
            <span className="text-xs font-medium">I copied patterns</span>
            <span className="text-[11px] text-slate-500">
              Echoing the rhythm with help.
            </span>
          </Button>

          <Button
            className="h-auto py-3 bg-gradient-to-r from-amber-500 to-fuchsia-600 text-white flex flex-col items-center gap-1"
            onClick={() => handleComplete("create")}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span className="text-xs font-medium">I created a pattern</span>
            <span className="text-[11px] text-amber-50">
              Mark activity as completed.
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
}
