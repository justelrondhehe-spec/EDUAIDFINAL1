// frontend/src/components/MusicRhythmLesson.tsx
import {
  Music2,
  Sparkles,
  CheckCircle2,
  ArrowLeft,
} from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { useApp } from "../contexts/AppContext";
import { Page } from "../App";

interface LessonProps {
  onBackToLessons: () => void;
  onNavigate: (page: Page) => void;
}

export function MusicRhythmLesson({ onBackToLessons, onNavigate }: LessonProps) {
  const { startLesson, completeLesson, lessonProgress } = useApp();
  const lessonId = 5; // Music & Rhythm

  const progress = lessonProgress[lessonId];

  const handleStart = () => {
    if (!progress) startLesson(lessonId);
  };

  const handleComplete = async () => {
    await completeLesson(lessonId);
    onBackToLessons();
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={onBackToLessons}
          className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to lessons
        </button>

        <Badge className="bg-pink-500 hover:bg-pink-600 flex items-center gap-1">
          <Music2 className="w-3 h-3" />
          Arts • Rhythm
        </Badge>
      </div>

      {/* Hero */}
      <div className="bg-gradient-to-br from-orange-400 via-pink-500 to-fuchsia-600 rounded-3xl p-6 md:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
        <div className="absolute -left-8 bottom-0 w-40 h-40 bg-pink-900/20 rounded-full blur-2xl" />

        <div className="relative space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-3 py-1 text-xs font-medium">
            <Sparkles className="w-3 h-3" />
            Move to the beat
          </div>
          <h1 className="text-2xl md:text-3xl font-semibold">
            Music & Rhythm
          </h1>
          <p className="text-sm md:text-base text-pink-50/90">
            Learn steady beat, clapping patterns, and simple rhythm notation
            using body percussion and fun sound patterns.
          </p>

          <div className="flex flex-wrap gap-6 pt-2 text-sm">
            <div>
              <div className="text-xs uppercase tracking-wide text-pink-100">
                Time
              </div>
              <div>18 minutes</div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-wide text-pink-100">
                Skills
              </div>
              <div>Beat • Patterns • Listening</div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 pt-4">
            <Button
              onClick={handleStart}
              className="bg-white text-pink-700 hover:bg-pink-50 flex items-center gap-2"
            >
              <Music2 className="w-4 h-4" />
              {progress ? "Continue lesson" : "Start lesson"}
            </Button>
            <Button
              variant="outline"
              className="border-white/40 text-white hover:bg-white/10"
              onClick={() => onNavigate("activities")}
            >
              Rhythm challenge
            </Button>
          </div>
        </div>
      </div>

      {/* Sections */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Beat */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 shadow-md border border-slate-200 dark:border-slate-800 space-y-3">
          <h2 className="text-slate-800 dark:text-slate-100 text-lg">
            1. Feel the beat
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Start with a steady beat at a comfortable tempo.
          </p>
          <ul className="text-sm text-slate-600 dark:text-slate-400 list-disc pl-4 space-y-1">
            <li>Tap your knees or clap along with a simple song.</li>
            <li>Count 1–2–3–4 in a loop.</li>
            <li>Switch body parts: clap, tap shoulders, tap desk.</li>
          </ul>
        </div>

        {/* Patterns */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 shadow-md border border-slate-200 dark:border-slate-800 space-y-3">
          <h2 className="text-slate-800 dark:text-slate-100 text-lg flex items-center gap-2">
            <Music2 className="w-5 h-5 text-fuchsia-400" />
            2. Copy the pattern
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Echo simple patterns the teacher claps or plays.
          </p>
          <ul className="text-sm text-slate-600 dark:text-slate-400 list-disc pl-4 space-y-1">
            <li>Start with 3–4 beats: clap–clap–rest–clap.</li>
            <li>Say the pattern: “ta ta (rest) ta”.</li>
            <li>Let learners create their own short pattern.</li>
          </ul>
        </div>

        {/* Notation */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 shadow-md border border-slate-200 dark:border-slate-800 space-y-3">
          <h2 className="text-slate-800 dark:text-slate-100 text-lg">
            3. Read simple rhythms
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Connect symbols to sounds using quarter notes and eighth notes.
          </p>
          <ul className="text-sm text-slate-600 dark:text-slate-400 list-disc pl-4 space-y-1">
            <li>Use &quot;ta&quot; for quarter notes and &quot;ti-ti&quot; for pairs of eighth notes.</li>
            <li>Show a 4-beat pattern (e.g., ta ti-ti ta rest).</li>
            <li>Clap and say the pattern together, then without speaking.</li>
          </ul>
        </div>
      </div>

      {/* Finish */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-slate-50 dark:bg-slate-900 rounded-2xl p-4 md:p-5 border border-slate-200 dark:border-slate-800">
        <div className="text-sm text-slate-700 dark:text-slate-300">
          When learners can keep a steady beat and echo short patterns
          correctly, mark the lesson complete.
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={onBackToLessons}>
            Save for later
          </Button>
          <Button onClick={handleComplete} className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            Mark lesson complete
          </Button>
        </div>
      </div>
    </div>
  );
}
