// frontend/src/components/ReadingBasicsLesson.tsx
import {
  BookOpen,
  Sparkles,
  Volume2,
  CheckCircle2,
  ArrowLeft,
  Highlighter,
} from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { useApp } from "../contexts/AppContext";
import { Page } from "../App";

interface LessonProps {
  onBackToLessons: () => void;
  onNavigate: (page: Page) => void;
}

export function ReadingBasicsLesson({ onBackToLessons, onNavigate }: LessonProps) {
  const { startLesson, completeLesson, lessonProgress } = useApp();
  const lessonId = 2; // Reading Basics

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

        <Badge className="bg-emerald-500 hover:bg-emerald-600 flex items-center gap-1">
          <BookOpen className="w-3 h-3" />
          Language Arts • Phonics
        </Badge>
      </div>

      {/* Hero */}
      <div className="grid md:grid-cols-[2fr,1fr] gap-6 items-stretch">
        <div className="bg-gradient-to-br from-emerald-500 via-green-500 to-teal-500 rounded-3xl p-6 md:p-8 text-white shadow-xl relative overflow-hidden">
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
          <div className="absolute -left-8 bottom-0 w-40 h-40 bg-emerald-900/20 rounded-full blur-2xl" />

          <div className="relative space-y-4">
            <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-3 py-1 text-xs font-medium">
              <Sparkles className="w-3 h-3" />
              Early Reader
            </div>
            <h1 className="text-2xl md:text-3xl font-semibold">
              Reading Basics
            </h1>
            <p className="text-sm md:text-base text-emerald-50/90 max-w-xl">
              Practice letter sounds, blend them into simple words, and read short
              sentences with confidence.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <div>
                <div className="text-xs uppercase tracking-wide text-emerald-100">
                  Estimated time
                </div>
                <div className="text-lg font-semibold">25 minutes</div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-wide text-emerald-100">
                  Skills
                </div>
                <div className="text-sm">
                  Phonics • Blending • Sight words
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 pt-4">
              <Button
                onClick={handleStart}
                className="bg-white text-emerald-700 hover:bg-emerald-50 flex items-center gap-2"
              >
                <Volume2 className="w-4 h-4" />
                {progress ? "Continue practice" : "Start practice"}
              </Button>
              <Button
                variant="outline"
                className="border-white/40 text-white hover:bg-white/10"
                onClick={() => onNavigate("activities")}
              >
                Reading quiz
              </Button>
            </div>
          </div>
        </div>

        {/* Progress */}
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
                className="h-2 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full transition-all"
                style={{ width: `${progress?.progressPercent ?? 0}%` }}
              />
            </div>
          </div>

          <div className="space-y-2 text-xs text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-2">
              <Highlighter className="w-4 h-4" />
              <span>Ask the learner to trace letters with their finger while saying the sound.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Lesson parts */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Letters & sounds */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 shadow-md border border-slate-200 dark:border-slate-800 space-y-3">
          <h2 className="text-slate-800 dark:text-slate-100 text-lg">
            1. Letter–sound match
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Review consonants and short vowel sounds. Focus on 5–6 letters at a time.
          </p>
          <ul className="text-sm text-slate-600 dark:text-slate-400 list-disc pl-4 space-y-1">
            <li>Show the letter, say the sound (b says /b/).</li>
            <li>Have the learner echo the sound and think of a word.</li>
            <li>Mix cards and play “find the sound” games.</li>
          </ul>
        </div>

        {/* Blending */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 shadow-md border border-slate-200 dark:border-slate-800 space-y-3">
          <h2 className="text-slate-800 dark:text-slate-100 text-lg">
            2. Blend simple words
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Put sounds together to read CVC words (consonant–vowel–consonant).
          </p>
          <ul className="text-sm text-slate-600 dark:text-slate-400 list-disc pl-4 space-y-1">
            <li>Practice words like <strong>cat, mat, sit, log, sun</strong>.</li>
            <li>Slide your finger under the word as you blend slowly.</li>
            <li>Speed up: “/c/ /a/ /t/ … cat!”</li>
          </ul>
        </div>

        {/* Sentences */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 shadow-md border border-slate-200 dark:border-slate-800 space-y-3">
          <h2 className="text-slate-800 dark:text-slate-100 text-lg">
            3. Read tiny stories
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Use one–sentence stories with pictures to build confidence.
          </p>
          <ul className="text-sm text-slate-600 dark:text-slate-400 list-disc pl-4 space-y-1">
            <li>Example: “The cat is on the mat.” Ask them to point as they read.</li>
            <li>Ask one quick question: “Where is the cat?”</li>
            <li>Celebrate each successful read with verbal praise or a sticker.</li>
          </ul>
        </div>
      </div>

      {/* Finish */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-slate-50 dark:bg-slate-900 rounded-2xl p-4 md:p-5 border border-slate-200 dark:border-slate-800">
        <div className="text-sm text-slate-700 dark:text-slate-300">
          When your learner can blend and read the practice words smoothly,
          mark this lesson complete.
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
