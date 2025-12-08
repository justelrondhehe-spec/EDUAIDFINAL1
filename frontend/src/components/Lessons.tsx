// frontend/src/components/Lessons.tsx
import { Clock, Star, Lock, Check, Search, Filter, X, Play } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import { lessonsData, Lesson } from "../data/lessonsData";
import { useState, useMemo, CSSProperties } from "react";
import { LessonDetailModal } from "./modals/LessonDetailModal";
import { Page } from "../App";
import { useApp } from "../contexts/AppContext";

interface LessonsProps {
  onNavigate: (page: Page) => void;
}

// A flexible lesson type that can include backend fields like _id
type LessonLike = Lesson & {
  _id?: string;
  [key: string]: any;
};

// Solid header colors for each lesson (avoids the faded gradients)
const getLessonHeaderStyle = (lesson: LessonLike): CSSProperties => {
  const title = (lesson.title ?? "").toLowerCase();

  switch (lesson.id) {
    case 1: // Introduction to Numbers
      return { backgroundColor: "#2563eb" }; // blue-600
    case 2: // Reading Basics
      return { backgroundColor: "#10b981" }; // emerald-500
    case 3: // Science Exploration
      return { backgroundColor: "#0ea5e9" }; // sky-500
    case 4: // Shapes & Colors
      return { backgroundColor: "#ec4899" }; // pink-500
    case 5: // Music & Rhythm
      return { backgroundColor: "#f97316" }; // orange-500
    default:
      
    if (title.includes("our emotions")) {
        return { backgroundColor: "#14b8a6" }; // teal-500
      }

      return { backgroundColor: "#4f46e5" }; // indigo-600 fallback
  }
};

// Solid button colors based on lesson status
const getLessonButtonStyle = (status: Lesson["status"]): CSSProperties => {
  switch (status) {
    case "completed":
      return {
        backgroundColor: "#059669", // emerald-600
        color: "#ffffff",
      };
    case "in-progress":
      return {
        backgroundColor: "#2563eb", // blue-600
        color: "#ffffff",
      };
    case "not-started":
    default:
      return {
        backgroundColor: "#4b5563", // gray-600
        color: "#ffffff",
      };
  }
};

export function Lessons({ onNavigate }: LessonsProps) {
  const { lessonProgress, lessons: serverLessons } = useApp();

  const [selectedFilter, setSelectedFilter] = useState<
    "all" | "in-progress" | "completed" | "not-started"
  >("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string[]>([]);
  const [selectedLesson, setSelectedLesson] = useState<LessonLike | null>(null);

const openContentPageForLesson = (lesson: LessonLike): boolean => {
   const title = (lesson.title || "").toLowerCase();

    // SPECIAL CASE: any lesson whose title contains "our emotions"
    if (title.includes("our emotions") || Number(lesson.id) === 6) {
      onNavigate("lesson-our-emotions");
      return true;
    }

    switch (lesson.id) {
      case 1:
        onNavigate("lesson-numbers");
        return true;
      case 2:
        onNavigate("lesson-reading-basics");
        return true;
      case 3:
        onNavigate("lesson-science-exploration");
        return true;
      case 4:
        onNavigate("lesson-shapes-colors");
        return true;
      case 5:
        onNavigate("lesson-music-rhythm");
        return true;
      default:
        return false; // no dedicated page
    }
  };

  // ---------- pick source lessons (backend OR fixtures) ----------
  const baseLessons: LessonLike[] = useMemo(() => {
    const backendLessons = Array.isArray(serverLessons)
      ? (serverLessons as LessonLike[])
      : [];

    if (!backendLessons.length) {
      // no data from server -> use fixtures
      return lessonsData as LessonLike[];
    }
    const titleLower = (raw.title ?? "").toLowerCase();

    // use backend lessons, styling/template will come from lessonsData if titles/ids match
    return backendLessons;
  }, [serverLessons]);

  // ---------- merge progress + template styling (icons/colors/rating) ----------
  const lessonsWithStatus = useMemo<LessonLike[]>(() => {
    return baseLessons.map((raw) => {
      

      // Try to find a "template" from fixtures by id or title
      const template = lessonsData.find(
        (t) =>
          Number(t.id) === Number(raw.id) ||
          (raw.title && t.title === raw.title)
      );

      // 1) normal keys
      let lp =
        lessonProgress[raw.id as any] ||
        (raw._id && lessonProgress[String(raw._id)]);

      // 2) SPECIAL CASE: Our Emotions virtual lesson uses id 6 in progress
      if (!lp && titleLower.includes("our emotions")) {
        lp = lessonProgress[6] ?? lessonProgress["6"];
      }


      let status: Lesson["status"] = "not-started";
      let progressPercent = 0;

      if (lp) {
        if (lp.completed) {
          status = "completed";
          progressPercent = 100;
        } else {
          status = "in-progress";
          progressPercent = lp.progressPercent ?? 0;
        }
      }

      const totalLessons =
        (raw.lessons as number | undefined) ?? template?.lessons ?? 0;

      const completedLessons =
        progressPercent === 100
          ? totalLessons
          : Math.floor((progressPercent / 100) * (totalLessons || 0));

      return {
        // start from template so we keep icons/colors/ratings looking nice
        ...(template ?? {
          id: typeof raw.id === "number" ? raw.id : Date.now(),
          title: raw.title ?? "Untitled Lesson",
          description:
            raw.description ??
            "Your teacher has not added a description yet.",
          category: raw.category ?? "General",
          duration: raw.duration ?? "10 min",
          progress: 0,
          status: "not-started" as const,
          difficulty: (raw.difficulty as any) ?? "Beginner",
          rating: 4.8,
          icon: "📘",
          color: "from-blue-500 to-indigo-600",
          lessons: totalLessons,
          completedLessons: 0,
        }),
        ...raw,
        // override with computed status/progress
        status,
        progress: progressPercent,
        completedLessons,
        lessons: totalLessons,
        // ensure icon/color/rating are always set
        icon: raw.icon ?? template?.icon ?? "📘",
        color: raw.color ?? template?.color ?? "from-blue-500 to-indigo-600",
        rating:
          typeof raw.rating === "number"
            ? raw.rating
            : template?.rating ?? 4.8,
      };
    });
  }, [baseLessons, lessonProgress]);

  // ---------- filters & search ----------
  const categories = Array.from(
    new Set(lessonsWithStatus.map((l) => l.category))
  );
  const difficulties = Array.from(
    new Set(lessonsWithStatus.map((l) => l.difficulty))
  );

  const filteredLessons = lessonsWithStatus.filter((lesson) => {
    // Status filter
    if (selectedFilter === "in-progress" && lesson.status !== "in-progress")
      return false;
    if (selectedFilter === "completed" && lesson.status !== "completed")
      return false;
    if (selectedFilter === "not-started" && lesson.status !== "not-started")
      return false;

    // Search filter
    const title = (lesson.title ?? "").toLowerCase();
    const desc = (lesson.description ?? "").toLowerCase();
    const query = searchQuery.toLowerCase();

    if (searchQuery && !title.includes(query) && !desc.includes(query))
      return false;

    // Category filter
    if (
      selectedCategories.length > 0 &&
      !selectedCategories.includes(lesson.category ?? "")
    ) {
      return false;
    }

    // Difficulty filter
    if (
      selectedDifficulty.length > 0 &&
      !selectedDifficulty.includes(lesson.difficulty ?? "")
    ) {
      return false;
    }

    return true;
  });

  const counts = {
    all: lessonsWithStatus.length,
    "in-progress": lessonsWithStatus.filter(
      (l) => l.status === "in-progress"
    ).length,
    completed: lessonsWithStatus.filter(
      (l) => l.status === "completed"
    ).length,
    "not-started": lessonsWithStatus.filter(
      (l) => l.status === "not-started"
    ).length,
  };

  const categories_tabs = [
    { name: "All Lessons", count: counts.all, filter: "all" as const },
    {
      name: "In Progress",
      count: counts["in-progress"],
      filter: "in-progress" as const,
    },
    {
      name: "Completed",
      count: counts.completed,
      filter: "completed" as const,
    },
    {
      name: "Not Started",
      count: counts["not-started"],
      filter: "not-started" as const,
    },
  ];

  const getStatusBadge = (status: Lesson["status"]) => {
    switch (status) {
      case "completed":
        return (
          <Badge className="bg-emerald-500 hover:bg-emerald-600">
            Completed
          </Badge>
        );
      case "in-progress":
        return (
          <Badge className="bg-blue-500 hover:bg-blue-600">
            In Progress
          </Badge>
        );
      case "not-started":
      default:
        return (
          <Badge
            variant="outline"
            className="border-slate-300 dark:border-slate-600"
          >
            Not Started
          </Badge>
        );
    }
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const toggleDifficulty = (difficulty: string) => {
    setSelectedDifficulty((prev) =>
      prev.includes(difficulty)
        ? prev.filter((d) => d !== difficulty)
        : [...prev, difficulty]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedDifficulty([]);
  };

  const hasActiveFilters =
    selectedCategories.length > 0 || selectedDifficulty.length > 0;

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-slate-800 dark:text-slate-100 mb-2">My Lessons</h1>
        <p className="text-slate-600 dark:text-slate-400">
          Continue your learning journey
        </p>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Input
            placeholder="Search lessons..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 dark:bg-slate-800 dark:border-slate-700"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        <Button
          variant="outline"
          className={`dark:bg-slate-800 dark:border-slate-700 ${
            hasActiveFilters ? "border-blue-500 text-blue-500" : ""
          }`}
          onClick={() => setShowFilterPanel(!showFilterPanel)}
        >
          <Filter className="w-4 h-4 mr-2" />
          Filter
          {hasActiveFilters && (
            <span className="ml-2 px-2 py-0.5 bg-blue-500 text-white rounded-full text-xs">
              {selectedCategories.length + selectedDifficulty.length}
            </span>
          )}
        </Button>
      </div>

      {/* Filter Panel */}
      {showFilterPanel && (
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-slate-800 dark:text-slate-100">
              Filter Lessons
            </h3>
            {hasActiveFilters && (
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                Clear All
              </Button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Category */}
            <div>
              <h4 className="text-slate-700 dark:text-slate-300 mb-3">
                Category
              </h4>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => toggleCategory(category)}
                    className={`px-4 py-2 rounded-lg text-sm transition-all ${
                      selectedCategories.includes(category)
                        ? "bg-blue-500 text-white"
                        : "bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Difficulty */}
            <div>
              <h4 className="text-slate-700 dark:text-slate-300 mb-3">
                Difficulty
              </h4>
              <div className="flex flex-wrap gap-2">
                {difficulties.map((difficulty) => (
                  <button
                    key={difficulty}
                    onClick={() => toggleDifficulty(difficulty)}
                    className={`px-4 py-2 rounded-lg text-sm transition-all ${
                      selectedDifficulty.includes(difficulty)
                        ? "bg-blue-500 text-white"
                        : "bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600"
                    }`}
                  >
                    {difficulty}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Status Tabs */}
      <div className="flex gap-3 overflow-x-auto pb-2">
        {categories_tabs.map((category, index) => (
          <button
            key={index}
            onClick={() => setSelectedFilter(category.filter)}
            className={`px-6 py-3 rounded-xl whitespace-nowrap transition-all ${
              selectedFilter === category.filter
                ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg"
                : "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-blue-400 dark:hover:border-blue-500"
            }`}
          >
            {category.name}
            <span
              className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                selectedFilter === category.filter
                  ? "bg-white/20"
                  : "bg-slate-100 dark:bg-slate-700"
              }`}
            >
              {category.count}
            </span>
          </button>
        ))}
      </div>

      {/* Lessons Grid */}
      {filteredLessons.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-slate-400 dark:text-slate-500 mb-2">
            No lessons found
          </div>
          <div className="text-slate-600 dark:text-slate-400">
            Try adjusting your filters or search query
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLessons.map((lesson) => (
            <div
              key={lesson._id ?? lesson.id}
              onClick={() => setSelectedLesson(lesson)}
              className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden hover:shadow-2xl transition-all group cursor-pointer"
            >
              {/* Card Header */}
              <div
                className="p-6 relative text-white"
                style={getLessonHeaderStyle(lesson)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="text-5xl">
                    {lesson.icon ?? "📘"}
                  </div>
                  {lesson.status === "completed" && (
                    <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <Check className="w-5 h-5 text-white" />
                    </div>
                  )}
                  {lesson.status === "not-started" && (
                    <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <Lock className="w-5 h-5 text-white" />
                    </div>
                  )}
                </div>
                <div className="text-white">
                  <h3 className="mb-2">{lesson.title}</h3>
                  <p className="text-white/90 text-sm">
                    {lesson.description}
                  </p>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <Badge
                    variant="outline"
                    className="border-slate-300 dark:border-slate-600"
                  >
                    {lesson.category}
                  </Badge>
                  {getStatusBadge(lesson.status)}
                </div>

                {/* Progress */}
                {lesson.progress > 0 && (
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-slate-600 dark:text-slate-400">
                        {lesson.completedLessons}/{lesson.lessons} lessons
                      </span>
                      <span className="text-slate-800 dark:text-slate-200">
                        {lesson.progress}%
                      </span>
                    </div>
                    <Progress value={lesson.progress} className="h-2" />
                  </div>
                )}

                {/* Meta Info */}
                <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-400 mb-4">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{lesson.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-slate-800 dark:text-slate-200">
                      {lesson.rating}
                    </span>
                  </div>
                </div>

                {/* Action Button */}
                <div className="space-y-3">
                  <Button
                    style={getLessonButtonStyle(lesson.status)}
                    className="w-full h-11 rounded-xl font-semibold flex items-center justify-center gap-2 shadow-md"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Prefer dedicated content page; otherwise open modal
                      if (openContentPageForLesson(lesson)) return;
                      setSelectedLesson(lesson);
                    }}
                  >
                    {lesson.status === "completed" ? (
                      <>
                        <Check className="w-4 h-4" />
                        Review Lesson
                      </>
                    ) : lesson.status === "in-progress" ? (
                      <>
                        <Play className="w-4 h-4" />
                        Continue Learning
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4" />
                        Start Lesson
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Lesson Detail Modal */}
      {selectedLesson && (
        <LessonDetailModal
          lesson={selectedLesson}
          onClose={() => setSelectedLesson(null)}
          onStart={() => {
            if (openContentPageForLesson(selectedLesson)) {
              setSelectedLesson(null);
              return;
            }
            setSelectedLesson(null);
          }}
        />
      )}
    </div>
  );
}
