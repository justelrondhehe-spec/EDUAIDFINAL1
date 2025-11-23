// frontend/src/components/Lessons.tsx
import { Clock, Star, Lock, Check, Search, Filter, X, Play } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { useState, useMemo } from 'react';
import { LessonDetailModal } from './modals/LessonDetailModal';
import { Page } from '../App';
import { useApp } from '../contexts/AppContext';
import { useGlobalData } from '../contexts/GlobalDataContext';

interface LessonsProps {
  onNavigate: (page: Page) => void;
}

export function Lessons({ onNavigate }: LessonsProps) {
  const { lessonProgress } = useApp();

  // lessons come from backend (admin created) via GlobalDataContext
  const { lessons: serverLessons } = useGlobalData();
  const effectiveLessons =
    Array.isArray(serverLessons) && serverLessons.length > 0 ? serverLessons : [];

  const [selectedFilter, setSelectedFilter] = useState<
    'all' | 'in-progress' | 'completed' | 'not-started'
  >('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string[]>([]);
  const [selectedLesson, setSelectedLesson] = useState<any | null>(null);

  // 🔹 Helper: map lesson IDs to content pages
  const openContentPageForLesson = (lesson: any): boolean => {
    switch (lesson.id) {
      case 1:
        onNavigate('lesson-numbers');
        return true;
      case 2:
        onNavigate('lesson-reading-basics');
        return true;
      case 3:
        onNavigate('lesson-science-exploration');
        return true;
      case 4:
        onNavigate('lesson-shapes-colors');
        return true;
      case 5:
        onNavigate('lesson-music-rhythm');
        return true;
      case 6:
        onNavigate('lesson-test');
        return true;
      default:
        return false; // no dedicated content screen; fall back to modal
    }
  };

  // Build categories & difficulties from lessons, with sane fallbacks
  const categories = Array.from(
    new Set(
      effectiveLessons
        .map((l: any) => l.category || 'General')
        .filter(Boolean)
    )
  );
  const difficulties = Array.from(
    new Set(
      effectiveLessons
        .map((l: any) => l.difficulty || 'Beginner')
        .filter(Boolean)
    )
  );

  // Merge lessonProgress from context into lessons from backend
  const lessonsWithStatus = useMemo(() => {
    return effectiveLessons.map((lesson: any) => {
      // match progress using numeric id or string id
      const lp =
        lessonProgress[lesson.id] ||
        lessonProgress[String(lesson.id)] ||
        (lesson._id ? lessonProgress[String(lesson._id)] : undefined);

      let status: 'not-started' | 'in-progress' | 'completed' = 'not-started';
      let progressPercent = 0;
      let expirationDate: Date | null = null;

      if (lp) {
        if (lp.completed) {
          status = 'completed';
          progressPercent = 100;
        } else {
          status = 'in-progress';
          progressPercent = lp.progressPercent ?? 0;
        }
        expirationDate = lp.expirationDate ?? null;
      }

      const totalLessons = typeof lesson.lessons === 'number' ? lesson.lessons : 0;
      const completedLessons =
        progressPercent === 100
          ? totalLessons
          : Math.floor((progressPercent / 100) * totalLessons);

      return {
        ...lesson,
        status,
        progress: progressPercent,
        expirationDate,
        completedLessons,
        lessons: totalLessons,
      };
    });
  }, [lessonProgress, effectiveLessons]);

  // Filter lessons based on status, search, and advanced filters
  const filteredLessons = lessonsWithStatus.filter((lesson) => {
    if (selectedFilter === 'in-progress' && lesson.status !== 'in-progress') return false;
    if (selectedFilter === 'completed' && lesson.status !== 'completed') return false;
    if (selectedFilter === 'not-started' && lesson.status !== 'not-started') return false;

    const title = (lesson.title || '').toLowerCase();
    const desc = (lesson.description || '').toLowerCase();
    const query = searchQuery.toLowerCase();

    if (searchQuery && !title.includes(query) && !desc.includes(query)) return false;

    if (
      selectedCategories.length > 0 &&
      !selectedCategories.includes(lesson.category || 'General')
    ) {
      return false;
    }

    if (
      selectedDifficulty.length > 0 &&
      !selectedDifficulty.includes(lesson.difficulty || 'Beginner')
    ) {
      return false;
    }

    return true;
  });

  const getCategoryCounts = () => {
    return {
      all: lessonsWithStatus.length,
      'in-progress': lessonsWithStatus.filter((l) => l.status === 'in-progress').length,
      completed: lessonsWithStatus.filter((l) => l.status === 'completed').length,
      'not-started': lessonsWithStatus.filter((l) => l.status === 'not-started').length,
    };
  };

  const counts = getCategoryCounts();

  const categories_tabs = [
    { name: 'All Lessons', count: counts.all, filter: 'all' as const },
    { name: 'In Progress', count: counts['in-progress'], filter: 'in-progress' as const },
    { name: 'Completed', count: counts.completed, filter: 'completed' as const },
    { name: 'Not Started', count: counts['not-started'], filter: 'not-started' as const },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-emerald-500 hover:bg-emerald-600">Completed</Badge>;
      case 'in-progress':
        return <Badge className="bg-blue-500 hover:bg-blue-600">In Progress</Badge>;
      case 'not-started':
      default:
        return (
          <Badge variant="outline" className="border-slate-300 dark:border-slate-600">
            Not Started
          </Badge>
        );
    }
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  const toggleDifficulty = (difficulty: string) => {
    setSelectedDifficulty((prev) =>
      prev.includes(difficulty) ? prev.filter((d) => d !== difficulty) : [...prev, difficulty]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedDifficulty([]);
  };

  const hasActiveFilters = selectedCategories.length > 0 || selectedDifficulty.length > 0;

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-slate-800 dark:text-slate-100 mb-2">My Lessons</h1>
        <p className="text-slate-600 dark:text-slate-400">Continue your learning journey</p>
      </div>

      {/* Search + Filter */}
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
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        <Button
          variant="outline"
          className={`dark:bg-slate-800 dark:border-slate-700 ${
            hasActiveFilters ? 'border-blue-500 text-blue-500' : ''
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

      {/* Advanced Filters */}
      {showFilterPanel && (
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-slate-800 dark:text-slate-100">Filter Lessons</h3>
            {hasActiveFilters && (
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                Clear All
              </Button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Category */}
            <div>
              <h4 className="text-slate-700 dark:text-slate-300 mb-3">Category</h4>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => toggleCategory(category)}
                    className={`px-4 py-2 rounded-lg text-sm transition-all ${
                      selectedCategories.includes(category)
                        ? 'bg-blue-500 text-white'
                        : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Difficulty */}
            <div>
              <h4 className="text-slate-700 dark:text-slate-300 mb-3">Difficulty</h4>
              <div className="flex flex-wrap gap-2">
                {difficulties.map((d) => (
                  <button
                    key={d}
                    onClick={() => toggleDifficulty(d)}
                    className={`px-4 py-2 rounded-lg text-sm transition-all ${
                      selectedDifficulty.includes(d)
                        ? 'bg-blue-500 text-white'
                        : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                    }`}
                  >
                    {d}
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
                ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg'
                : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-blue-400 dark:hover:border-blue-500'
            }`}
          >
            {category.name}
            <span
              className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                selectedFilter === category.filter
                  ? 'bg-white/20'
                  : 'bg-slate-100 dark:bg-slate-700'
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
          <div className="text-slate-400 dark:text-slate-500 mb-2">No lessons found</div>
          <div className="text-slate-600 dark:text-slate-400">
            Try adjusting your filters or search query
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLessons.map((lesson: any) => (
            <div
              key={lesson._id ?? lesson.id}
              onClick={() => setSelectedLesson(lesson)}
              className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden hover:shadow-2xl transition-all group cursor-pointer"
            >
              {/* Card Header */}
              <div
                className={`bg-gradient-to-br ${
                  lesson.color || 'from-pink-500 to-rose-600'
                } p-6 relative`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="text-5xl">{lesson.icon || '📘'}</div>
                  {lesson.status === 'completed' && (
                    <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <Check className="w-5 h-5 text-white" />
                    </div>
                  )}
                  {lesson.status === 'not-started' && (
                    <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <Lock className="w-5 h-5 text-white" />
                    </div>
                  )}
                </div>
                <div className="text-white">
                  <h3 className="mb-2">{lesson.title}</h3>
                  <p className="text-white/80 text-sm">{lesson.description}</p>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <Badge
                    variant="outline"
                    className="border-slate-300 dark:border-slate-600"
                  >
                    {lesson.category || 'General'}
                  </Badge>
                  {getStatusBadge(lesson.status)}
                </div>

                {/* Progress */}
                {lesson.progress > 0 && (
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-slate-600 dark:text-slate-400">
                        {lesson.completedLessons}/{lesson.lessons || 0} lessons
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
                      {lesson.rating ?? '4.8'}
                    </span>
                  </div>
                </div>

                {/* Action Button */}
                <div className="space-y-3">
                  <Button
                    className={`w-full ${
                      lesson.status === 'completed'
                        ? 'bg-gradient-to-r from-emerald-500 to-emerald-600'
                        : lesson.status === 'in-progress'
                        ? 'bg-gradient-to-r from-blue-500 to-indigo-600'
                        : 'bg-gradient-to-r from-slate-500 to-slate-600'
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      // 🔹 Try to open dedicated content page first
                      if (openContentPageForLesson(lesson)) return;
                      // If there is no dedicated screen, fall back to modal
                      setSelectedLesson(lesson);
                    }}
                  >
                    {lesson.status === 'completed' ? (
                      <>
                        <Check className="w-4 h-4 mr-2" />
                        Review Lesson
                      </>
                    ) : lesson.status === 'in-progress' ? (
                      <>
                        <Play className="w-4 h-4 mr-2" />
                        Continue Learning
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 mr-2" />
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
            // 🔹 From inside the modal, also prefer dedicated content pages
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
