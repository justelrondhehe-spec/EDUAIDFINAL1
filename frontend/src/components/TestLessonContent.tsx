// frontend/src/components/TestLessonContent.tsx
import { CheckCircle2, ArrowLeft, Beaker, Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { useApp } from "../contexts/AppContext";
import { Page } from "../App";

interface LessonProps {
  onBackToLessons: () => void;
  onNavigate: (page: Page) => void;
}

/**
 * A simple, short lesson intended for demos / testing.
 * You can adjust text freely without affecting core curriculum.
 */
export function TestLessonContent({ onBackToLessons }: LessonProps) {
  const { startLesson, completeLesson, lessonProgress } = useApp();
  const lessonId = 6; // Test Lesson (adjust to match your data)

  const progress = lessonProgress[lessonId];

  const handleStart = () => {
    if (!progress) startLesson(lessonId);
  };

  const handleComplete = async () => {
    await completeLesson(lessonId);
    onBackToLessons();
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={onBackToLessons}
          className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to lessons
        </button>

        <Badge className="bg-slate-700 flex items-center gap-1">
          <Beaker className="w-3 h-3" />
          Demo lesson
        </Badge>
      </div>

      <div className="bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 rounded-3xl p-6 text-white shadow-xl space-y-3">
        <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-3 py-1 text-xs font-medium">
          <Sparkles className="w-3 h-3" />
          Sandbox
        </div>
        <h1 className="text-2xl font-semibold">Test Lesson</h1>
        <p className="text-sm text-slate-100/80">
          Use this lesson to preview layouts, test progress tracking, or demo the
          platform to others.
        </p>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 shadow-md border border-slate-200 dark:border-slate-800 space-y-3">
        <h2 className="text-slate-800 dark:text-slate-100 text-lg">
          How to use this screen
        </h2>
        <ul className="text-sm text-slate-600 dark:text-slate-400 list-disc pl-4 space-y-1">
          <li>Click &quot;Start lesson&quot; to trigger progress tracking.</li>
          <li>Mark it complete to verify that dashboards and admin views update.</li>
          <li>Freely edit this content when you want to test new layouts.</li>
        </ul>
      </div>

      <div className="flex items-center justify-between gap-4 bg-slate-50 dark:bg-slate-900 rounded-2xl p-4 border border-slate-200 dark:border-slate-800">
        <span className="text-xs text-slate-600 dark:text-slate-400">
          This lesson doesn&apos;t represent real curriculum — it&apos;s here to help you
          debug and experiment safely.
        </span>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleStart}>
            {progress ? "Restart" : "Start lesson"}
          </Button>
          <Button onClick={handleComplete} className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            Mark complete
          </Button>
        </div>
      </div>
    </div>
  );
}
