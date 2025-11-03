import { X, Play, Clock, Award, Star, CheckCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { Lesson } from '../../data/lessonsData';

interface LessonDetailModalProps {
  lesson: Lesson;
  onClose: () => void;
  onStart: () => void;
}

export function LessonDetailModal({ lesson, onClose, onStart }: LessonDetailModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div 
        className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-slate-200 dark:border-slate-700"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Gradient */}
        <div className={`bg-gradient-to-br ${lesson.color} p-8 relative`}>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>
          
          <div className="flex items-start gap-6">
            <div className="text-6xl">{lesson.icon}</div>
            <div className="flex-1 text-white">
              <div className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm mb-3">
                {lesson.category}
              </div>
              <h2 className="text-white mb-2">{lesson.title}</h2>
              <p className="text-white/90 mb-4">{lesson.description}</p>
              
              {/* Meta Info */}
              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{lesson.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4" />
                  <span>{lesson.difficulty}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 fill-white" />
                  <span>{lesson.rating}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Progress */}
          {lesson.progress > 0 && (
            <div className="mt-6 bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="flex items-center justify-between text-sm text-white mb-2">
                <span>{lesson.completedLessons}/{lesson.lessons} lessons completed</span>
                <span>{lesson.progress}%</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2">
                <div
                  className="bg-white h-2 rounded-full transition-all"
                  style={{ width: `${lesson.progress}%` }}
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
            <p className="text-slate-600 dark:text-slate-400">
              {lesson.content?.introduction}
            </p>
          </div>

          {/* Learning Objectives */}
          <div className="mb-8">
            <h3 className="text-slate-800 dark:text-slate-100 mb-3">Learning Objectives</h3>
            <div className="space-y-2">
              {lesson.content?.objectives.map((objective, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-600 dark:text-slate-400">{objective}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Activities */}
          <div className="mb-8">
            <h3 className="text-slate-800 dark:text-slate-100 mb-3">Activities Included</h3>
            <div className="grid grid-cols-2 gap-3">
              {lesson.content?.activities.map((activity, index) => (
                <div
                  key={index}
                  className="p-4 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-700 dark:to-slate-800 rounded-xl border border-slate-200 dark:border-slate-600"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center text-white">
                      {index + 1}
                    </div>
                    <span className="text-slate-700 dark:text-slate-300">{activity}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              onClick={onStart}
              className={`flex-1 bg-gradient-to-r ${lesson.color}`}
            >
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
