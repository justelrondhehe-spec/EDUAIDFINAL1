// frontend/src/components/NumbersLesson.tsx
import { BookOpen, Sparkles, CheckCircle2, ArrowLeft, Brain, PlayCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { useApp } from "../contexts/AppContext";
import { Page } from "../App";

interface LessonProps {
  onBackToLessons: () => void;
  onNavigate: (page: Page) => void;
}

export function NumbersLesson({ onBackToLessons, onNavigate }: LessonProps) {
  const { startLesson, completeLesson, lessonProgress } = useApp();
  const lessonId = 1; // Introduction to Numbers

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

        <Badge className="bg-blue-500 hover:bg-blue-600 flex items-center gap-1">
          <BookOpen className="w-3 h-3" />
          Mathematics • Level 1
        </Badge>
      </div>

      {/* Hero */}
      <div className="grid md:grid-cols-[2fr,1fr] gap-6 items-stretch">
        <div className="bg-gradient-to-br from-sky-500 via-blue-500 to-indigo-500 rounded-3xl p-6 md:p-8 text-white shadow-xl relative overflow-hidden">
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
          <div className="absolute -left-8 bottom-0 w-40 h-40 bg-blue-900/20 rounded-full blur-2xl" />

          <div className="relative space-y-4">
            <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-3 py-1 text-xs font-medium">
              <Sparkles className="w-3 h-3" />
              Beginner Friendly
            </div>
            <h1 className="text-2xl md:text-3xl font-semibold">
              Introduction to Numbers
            </h1>
            <p className="text-sm md:text-base text-blue-50/90 max-w-xl">
              Learn to count, recognize, and compare numbers from 1 to 20 using
              visual blocks, number lines, and quick games.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <div>
                <div className="text-xs uppercase tracking-wide text-blue-100">
                  Estimated time
                </div>
                <div className="text-lg font-semibold">20 minutes</div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-wide text-blue-100">
                  Skills
                </div>
                <div className="text-sm">
                  Counting • Number recognition • Comparing
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 pt-4">
              <Button
                onClick={handleStart}
                className="bg-white text-blue-700 hover:bg-blue-50 flex items-center gap-2"
              >
                <PlayCircle className="w-4 h-4" />
                {progress ? "Continue Lesson" : "Start Lesson"}
              </Button>
              <Button
                variant="outline"
                className="border-white/40 text-white hover:bg-white/10"
                onClick={() => onNavigate("activities")}
              >
                Practice activities
              </Button>
            </div>
          </div>
        </div>

        {/* Quick Progress */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 shadow-lg border border-slate-200/80 dark:border-slate-700 space-y-4">
          <div className="flex items-center justify-between">
            <div className="font-medium text-slate-800 dark:text-slate-100">
              Your progress
            </div>
            {progress?.completed && (
              <Badge className="bg-emerald-500/90 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                Completed
              </Badge>
            )}
          </div>
          <div>
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
              <span>Lesson completion</span>
              <span>{progress?.progressPercent ?? 0}%</span>
            </div>
            <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
              <div
                className="h-2 bg-gradient-to-r from-sky-500 to-indigo-500 rounded-full transition-all"
                style={{ width: `${progress?.progressPercent ?? 0}%` }}
              />
            </div>
          </div>

          <div className="space-y-2 text-xs text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-2">
              <Brain className="w-4 h-4" />
              <span>Tip: Touch or say each number aloud while counting objects.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Lesson sections */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Section 1 */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 shadow-md border border-slate-200 dark:border-slate-800 space-y-3">
          <h2 className="text-slate-800 dark:text-slate-100 text-lg flex items-center gap-2">
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-sky-100 dark:bg-sky-900 text-xs font-semibold text-sky-700 dark:text-sky-200">
              1
            </span>
            Count with objects
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Look at groups of items (dots, stars, blocks). Say the number as
            you count them one by one. Match each object to one number.
          </p>
          <ul className="text-sm text-slate-600 dark:text-slate-400 list-disc pl-4 space-y-1">
            <li>Drag your finger under each object while counting.</li>
            <li>Stop when there are no more objects.</li>
            <li>Say the final number a bit louder – that’s “how many”.</li>
          </ul>
        </div>

        {/* Section 2 */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 shadow-md border border-slate-200 dark:border-slate-800 space-y-3">
          <h2 className="text-slate-800 dark:text-slate-100 text-lg flex items-center gap-2">
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-emerald-100 dark:bg-emerald-900 text-xs font-semibold text-emerald-700 dark:text-emerald-200">
              2
            </span>
            Number line fun
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Use a number line from 0–20 to see which numbers come before and
            after each other.
          </p>
          <ul className="text-sm text-slate-600 dark:text-slate-400 list-disc pl-4 space-y-1">
            <li>Find 5 on the number line. Which number is just after it?</li>
            <li>Jump forward 3 steps from 4. Where do you land?</li>
            <li>Circle the biggest number in a group (e.g., 7, 2, 9).</li>
          </ul>
        </div>

        {/* Section 3 */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 shadow-md border border-slate-200 dark:border-slate-800 space-y-3">
          <h2 className="text-slate-800 dark:text-slate-100 text-lg flex items-center gap-2">
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-violet-100 dark:bg-violet-900 text-xs font-semibold text-violet-700 dark:text-violet-200">
              3
            </span>
            Compare numbers
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Decide which number is greater, smaller, or if they are equal.
          </p>
          <ul className="text-sm text-slate-600 dark:text-slate-400 list-disc pl-4 space-y-1">
            <li>Use &quot;&gt;&quot; and &quot;&lt;&quot; symbols as hungry crocodile mouths.</li>
            <li>Practice with pairs like 3 and 8, 10 and 4, 6 and 6.</li>
            <li>Say sentences: “8 is greater than 3”.</li>
          </ul>
        </div>
      </div>

      {/* Finish CTA */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-slate-50 dark:bg-slate-900 rounded-2xl p-4 md:p-5 border border-slate-200 dark:border-slate-800">
        <div className="text-sm text-slate-700 dark:text-slate-300">
          Ready to check your understanding? Complete the lesson to unlock more
          number games.
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
