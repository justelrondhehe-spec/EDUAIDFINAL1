// frontend/src/components/modals/LessonDetailModal.tsx
import { X, Play, Clock, Award, Star, CheckCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { Lesson } from '../../data/lessonsData';

// Flexible Lesson type that works with fixtures + backend data
interface LessonContent {
  introduction?: string;
  objectives?: string[];
  activities?: string[];
}

// Base everything on your real Lesson type, but make fields optional
// so backend / partial objects still work safely.
export interface LessonLike extends Partial<Lesson> {
  _id?: string;
  // ensure content stays compatible even if backend shape is a bit loose
  content?: LessonContent | null;
}

interface LessonDetailModalProps {
  lesson: LessonLike;
  onClose: () => void;
  onStart: () => void;
}

export function LessonDetailModal({ lesson, onClose, onStart }: LessonDetailModalProps) {
  const color = lesson.color || 'from-blue-500 to-indigo-600';
  const title = lesson.title ?? 'Untitled Lesson';
  const description =
    lesson.description ?? 'No description has been added for this lesson yet.';

  const introduction =
    lesson.content?.introduction ??
    'Your teacher has not added a detailed introduction yet. You can still start the lesson and explore the activities.';

  const objectives = Array.isArray(lesson.content?.objectives)
    ? lesson.content!.objectives!
    : [];
  const activities = Array.isArray(lesson.content?.activities)
    ? lesson.content!.activities!
    : [];

  const lessonsCount = typeof lesson.lessons === 'number' ? lesson.lessons : 0;
  const completedLessons =
    typeof lesson.completedLessons === 'number'
      ? lesson.completedLessons
      : lessonsCount > 0 && typeof lesson.progress === 'number'
      ? Math.floor(((lesson.progress ?? 0) / 100) * lessonsCount)
      : 0;

  const progressValue =
    typeof lesson.progress === 'number'
      ? Math.max(0, Math.min(100, lesson.progress))
      : 0;

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-slate-200 dark:border-slate-700"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Gradient */}
        <div className={`bg-gradient-to-br ${color} p-8 relative`}>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>

          <div className="flex items-start gap-6">
            <div className="text-6xl">{lesson.icon ?? '📘'}</div>
            <div className="flex-1 text-white">
              <div className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm mb-3">
                {lesson.category ?? 'Lesson'}
              </div>
              <h2 className="text-white mb-2">{title}</h2>
              <p className="text-white/90 mb-4">{description}</p>

              {/* Meta Info */}
              <div className="flex items-center gap-6 text-sm">
                {lesson.duration && (
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{lesson.duration}</span>
                  </div>
                )}
                {lesson.difficulty && (
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4" />
                    <span>{lesson.difficulty}</span>
                  </div>
                )}
                {typeof lesson.rating === 'number' && (
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 fill-white" />
                    <span>{lesson.rating.toFixed(1)}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Progress */}
          {progressValue > 0 && (
            <div className="mt-6 bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="flex items-center justify-between text-sm text-white mb-2">
                <span>
                  {completedLessons}/{lessonsCount || '—'} lessons completed
                </span>
                <span>{progressValue}%</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2">
                <div
                  className="bg-white h-2 rounded-full transition-all"
                  style={{ width: `${progressValue}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-8">
          {/* Introduction */}
          <div className="mb-8">
            <h3 className="text-slate-800 dark:text-slate-100 mb-3">Introduction</h3>
            <p className="text-slate-600 dark:text-slate-400">{introduction}</p>
          </div>

          {/* Learning Objectives */}
          <div className="mb-8">
            <h3 className="text-slate-800 dark:text-slate-100 mb-3">
              Learning Objectives
            </h3>
            {objectives.length === 0 ? (
              <p className="text-slate-500 dark:text-slate-400 text-sm">
                Objectives for this lesson haven&apos;t been added yet.
              </p>
            ) : (
              <div className="space-y-2">
                {objectives.map((objective, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-600 dark:text-slate-400">
                      {objective}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Activities */}
          <div className="mb-8">
            <h3 className="text-slate-800 dark:text-slate-100 mb-3">
              Activities Included
            </h3>
            {activities.length === 0 ? (
              <p className="text-slate-500 dark:text-slate-400 text-sm">
                Activities for this lesson will appear here once your teacher adds them.
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {activities.map((activity, index) => (
                  <div
                    key={index}
                    className="p-4 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-700 dark:to-slate-800 rounded-xl border border-slate-200 dark:border-slate-600"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center text-white">
                        {index + 1}
                      </div>
                      <span className="text-slate-700 dark:text-slate-300">
                        {activity}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button onClick={onStart} className={`flex-1 bg-gradient-to-r ${color}`}>
              {lesson.status === 'completed' ? (
                <>
                  <CheckCircle className="w-4 h-4 mr-2" />
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
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
