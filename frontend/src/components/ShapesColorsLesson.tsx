// frontend/src/components/ShapesColorsLesson.tsx
import React, { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Clock,
  Sparkles,
} from "lucide-react";
import { useApp } from "../contexts/AppContext";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Page } from "../App";

interface ShapesColorsLessonProps {
  onBackToLessons: () => void;
  onNavigate?: (page: Page) => void;
}

const LESSON_ID = 4; // Shapes & Colors lesson id in your seeds

export const ShapesColorsLesson: React.FC<ShapesColorsLessonProps> = ({
  onBackToLessons,
  onNavigate,
}) => {
  const { lessonProgress, startLesson, updateLessonProgress, completeLesson } =
    useApp();

  const [currentStep, setCurrentStep] = useState<number>(1);
  const totalSteps = 3;
  const hasStarted = useRef(false);
  const hasCompleted = useRef(false);

  // Start the lesson once when the user opens this page
  useEffect(() => {
    if (!hasStarted.current) {
      startLesson(LESSON_ID);
      hasStarted.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Helper: compute percentage from step (1..totalSteps)
  const stepToPercent = (step: number) =>
    Math.round((step / totalSteps) * 100);

  // Read existing progress (in case user comes back later)
  const lp = lessonProgress[LESSON_ID];
  const headerProgress =
    typeof lp?.progressPercent === "number"
      ? lp.progressPercent
      : stepToPercent(currentStep);

  const handleNext = () => {
    if (currentStep >= totalSteps) return;
    const next = currentStep + 1;
    setCurrentStep(next);
    // Push progress ONLY when user moves step
    updateLessonProgress(LESSON_ID, stepToPercent(next));
  };

  const handlePrev = () => {
    if (currentStep <= 1) return;
    const prev = currentStep - 1;
    setCurrentStep(prev);
    updateLessonProgress(LESSON_ID, stepToPercent(prev));
  };

  const handleCompleteLesson = async () => {
    if (hasCompleted.current) return;
    hasCompleted.current = true;

    // push 100% and mark as completed
    await completeLesson(LESSON_ID);

    // Optionally jump them to Activities page where the challenge is unlocked
    if (onNavigate) {
      onNavigate("activities");
    }
  };

  // ---------- Simple content for three steps ----------

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <section className="space-y-6">
            <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100">
              Step 1 • Meet the Shapes
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              Let&apos;s explore four basic shapes. Say their names and point to
              objects around you that match each shape.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                { name: "Square", color: "bg-pink-400" },
                { name: "Circle", color: "bg-sky-400" },
                { name: "Triangle", color: "bg-amber-400" },
                { name: "Rectangle", color: "bg-violet-400" },
              ].map((shape) => (
                <div
                  key={shape.name}
                  className="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200 dark:border-slate-700 flex flex-col items-center gap-3"
                >
                  <div
                    className={`w-20 h-20 rounded-2xl ${shape.color}`}
                  />
                  <div className="font-medium text-slate-800 dark:text-slate-100">
                    {shape.name}
                  </div>
                </div>
              ))}
            </div>
          </section>
        );
      case 2:
        return (
          <section className="space-y-6">
            <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100">
              Step 2 • Match Shapes & Colors
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              Look at each card and say both the shape and its color. Your
              learner can clap when they get a match right!
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { label: "Red Circle", color: "bg-rose-400", shape: "●" },
                { label: "Blue Square", color: "bg-sky-400", shape: "■" },
                { label: "Yellow Triangle", color: "bg-amber-400", shape: "▲" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200 dark:border-slate-700 flex items-center gap-4"
                >
                  <div
                    className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl text-white ${item.color}`}
                  >
                    {item.shape}
                  </div>
                  <div>
                    <div className="font-medium text-slate-800 dark:text-slate-100">
                      {item.label}
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Ask: &quot;Can you find something that is {item.label}
                      ?&quot;
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        );
      case 3:
      default:
        return (
          <section className="space-y-6">
            <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100">
              Step 3 • Mini Challenge
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              Point to each picture and ask: &quot;What shape is this? What
              color is it?&quot; Encourage your learner to answer in full
              sentences.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200 dark:border-slate-700">
                <h3 className="font-medium text-slate-800 dark:text-slate-100 mb-2">
                  Around the Room
                </h3>
                <ul className="list-disc pl-5 text-sm text-slate-600 dark:text-slate-400 space-y-1">
                  <li>Find 3 squares and 3 circles.</li>
                  <li>Sort them by color (warm vs cool colors).</li>
                  <li>Count how many of each you found.</li>
                </ul>
              </div>
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200 dark:border-slate-700">
                <h3 className="font-medium text-slate-800 dark:text-slate-100 mb-2">
                  Drawing Time
                </h3>
                <ul className="list-disc pl-5 text-sm text-slate-600 dark:text-slate-400 space-y-1">
                  <li>Draw one big shape for each type.</li>
                  <li>Color each shape with a different bright color.</li>
                  <li>Have your learner explain their drawing.</li>
                </ul>
              </div>
            </div>
          </section>
        );
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Back link */}
      <button
        onClick={onBackToLessons}
        className="inline-flex items-center text-sm text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 mb-2"
      >
        <ArrowLeft className="w-4 h-4 mr-1" />
        Back to Lessons
      </button>

      {/* Header card */}
      <div className="bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-500 rounded-3xl p-8 text-white shadow-xl flex flex-col md:flex-row gap-8">
        <div className="flex-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/15 rounded-full text-xs mb-3">
            <span className="font-medium">Shapes &amp; Colors</span>
            <span className="w-1 h-1 rounded-full bg-white/60" />
            <span>Level: Beginner</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-semibold mb-3">
            Shapes &amp; Colors Adventure
          </h1>
          <p className="text-sm md:text-base text-white/90 mb-4 max-w-xl">
            Discover circles, squares, triangles, and rectangles using bright
            colors and playful activities.
          </p>
          <div className="flex flex-wrap items-center gap-4 text-sm text-white/90">
            <span className="inline-flex items-center gap-2">
              <Clock className="w-4 h-4" />
              ~20 minutes
            </span>
            <span className="inline-flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Perfect for early learners
            </span>
          </div>
        </div>

        <div className="w-full md:w-64 bg-white/10 rounded-2xl p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3 text-sm">
            <span>Lesson Progress</span>
            <span className="font-semibold">{headerProgress}%</span>
          </div>
          <Progress value={headerProgress} className="h-2 bg-white/20" />
          <div className="mt-3 text-xs text-white/80">
            Step {currentStep} of {totalSteps}
          </div>
        </div>
      </div>

      {/* Step content */}
      <div className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 rounded-3xl p-6 md:p-8 shadow-lg space-y-8">
        {renderStepContent()}

        {/* Navigation + complete button */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
            Step {currentStep} of {totalSteps}
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={handlePrev}
              disabled={currentStep === 1}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
            {currentStep < totalSteps ? (
              <Button onClick={handleNext}>
                Next step
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button
                onClick={handleCompleteLesson}
                className="bg-emerald-500 hover:bg-emerald-600"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Finish Lesson
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
