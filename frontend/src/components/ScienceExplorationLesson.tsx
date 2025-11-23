// frontend/src/components/ScienceExplorationLesson.tsx
import {
  FlaskConical,
  Sparkles,
  CheckCircle2,
  ArrowLeft,
  ThermometerSun,
} from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { useApp } from "../contexts/AppContext";
import { Page } from "../App";

interface LessonProps {
  onBackToLessons: () => void;
  onNavigate: (page: Page) => void;
}

export function ScienceExplorationLesson({ onBackToLessons, onNavigate }: LessonProps) {
  const { startLesson, completeLesson, lessonProgress } = useApp();
  const lessonId = 3; // Science lesson

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

        <Badge className="bg-cyan-500 hover:bg-cyan-600 flex items-center gap-1">
          <FlaskConical className="w-3 h-3" />
          Science • Experiments
        </Badge>
      </div>

      {/* Hero */}
      <div className="bg-gradient-to-br from-cyan-500 via-sky-500 to-indigo-500 rounded-3xl p-6 md:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
        <div className="absolute -left-8 bottom-0 w-40 h-40 bg-slate-900/20 rounded-full blur-2xl" />

        <div className="relative space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-3 py-1 text-xs font-medium">
            <Sparkles className="w-3 h-3" />
            Hands-on science
          </div>
          <h1 className="text-2xl md:text-3xl font-semibold">
            Science Experiment Lab
          </h1>
          <p className="text-sm md:text-base text-cyan-50/90">
            Explore how scientists ask questions, make predictions, and test them
            with simple, safe experiments you can describe or replicate in class.
          </p>

          <div className="flex flex-wrap gap-6 pt-2 text-sm">
            <div>
              <div className="text-xs uppercase tracking-wide text-cyan-100">
                Focus
              </div>
              <div>Scientific method • Observation • Data</div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-wide text-cyan-100">
                Time
              </div>
              <div>30 minutes</div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 pt-4">
            <Button
              onClick={handleStart}
              className="bg-white text-cyan-700 hover:bg-cyan-50 flex items-center gap-2"
            >
              <FlaskConical className="w-4 h-4" />
              {progress ? "Continue Lab" : "Start Lab"}
            </Button>
            <Button
              variant="outline"
              className="border-white/40 text-white hover:bg-white/10"
              onClick={() => onNavigate("activities")}
            >
              View related activity
            </Button>
          </div>
        </div>
      </div>

      {/* Sections */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Step 1 */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 shadow-md border border-slate-200 dark:border-slate-800 space-y-3">
          <h2 className="text-slate-800 dark:text-slate-100 text-lg">
            1. Ask a question
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Good science starts with curiosity. We&apos;ll use water and heat to guide
            our experiment.
          </p>
          <ul className="text-sm text-slate-600 dark:text-slate-400 list-disc pl-4 space-y-1">
            <li>Example question: “Does hot water evaporate faster than cold water?”</li>
            <li>Think about what you already know about steam and puddles.</li>
          </ul>
        </div>

        {/* Step 2 */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 shadow-md border border-slate-200 dark:border-slate-800 space-y-3">
          <h2 className="text-slate-800 dark:text-slate-100 text-lg flex items-center gap-2">
            <ThermometerSun className="w-5 h-5 text-orange-400" />
            2. Make a prediction
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            A prediction is called a hypothesis. It should be something you can test.
          </p>
          <ul className="text-sm text-slate-600 dark:text-slate-400 list-disc pl-4 space-y-1">
            <li>Example: “I think hot water will evaporate faster than cold water.”</li>
            <li>Explain <em>why</em> you think that, using your own words.</li>
          </ul>
        </div>

        {/* Step 3 */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 shadow-md border border-slate-200 dark:border-slate-800 space-y-3">
          <h2 className="text-slate-800 dark:text-slate-100 text-lg">
            3. Plan the experiment
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Think through materials and steps. In class, this can be done as a
            demonstration or virtual description.
          </p>
          <ul className="text-sm text-slate-600 dark:text-slate-400 list-disc pl-4 space-y-1">
            <li>Two identical cups, same amount of water.</li>
            <li>One with hot water (careful: adults handle heat), one with cold.</li>
            <li>Check water level after a set time and record observations.</li>
          </ul>
        </div>
      </div>

      {/* Finish */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-slate-50 dark:bg-slate-900 rounded-2xl p-4 md:p-5 border border-slate-200 dark:border-slate-800">
        <div className="text-sm text-slate-700 dark:text-slate-300">
          Once you&apos;ve discussed results and whether your prediction was correct,
          mark the lab as complete.
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
