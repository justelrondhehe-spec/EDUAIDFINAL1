import { X, Play, Calendar, Clock, Award } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Activity } from '../../data/activitiesData';
import { Progress } from '../ui/progress';

interface ActivityDetailModalProps {
  activity: Activity;
  onClose: () => void;
  onStart: () => void;
}

export function ActivityDetailModal({ activity, onClose, onStart }: ActivityDetailModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div 
        className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-slate-200 dark:border-slate-700"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Gradient */}
        <div className={`bg-gradient-to-br ${activity.color} p-8 relative`}>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>
          
          <div className="flex items-start gap-6">
            <div className="text-6xl">{activity.icon}</div>
            <div className="flex-1 text-white">
              <div className="flex items-center gap-2 mb-3">
                <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm">
                  {activity.type}
                </span>
                <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm">
                  {activity.subject}
                </span>
              </div>
              <h2 className="text-white mb-2">{activity.title}</h2>
              <p className="text-white/90">{activity.description}</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          {/* Activity Info */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="p-4 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-700 dark:to-slate-800 rounded-xl">
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 mb-1">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">Due Date</span>
              </div>
              <div className="text-slate-800 dark:text-slate-200">{activity.dueDate}</div>
            </div>
            <div className="p-4 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-700 dark:to-slate-800 rounded-xl">
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 mb-1">
                <Award className="w-4 h-4" />
                <span className="text-sm">Points</span>
              </div>
              <div className="text-slate-800 dark:text-slate-200">{activity.points} points</div>
            </div>
          </div>

          {/* Progress for In-Progress Activities */}
          {activity.status === 'in-progress' && activity.totalQuestions && (
            <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800/30">
              <div className="flex items-center justify-between mb-2">
                <span className="text-slate-700 dark:text-slate-300">Your Progress</span>
                <span className="text-slate-800 dark:text-slate-200">
                  {activity.progress}/{activity.totalQuestions} questions
                </span>
              </div>
              <Progress 
                value={activity.totalQuestions ? (activity.progress! / activity.totalQuestions) * 100 : 0} 
                className="h-3"
              />
            </div>
          )}

          {/* Completed Activity Score */}
          {activity.status === 'completed' && (
            <div className="mb-6 p-6 bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 border border-emerald-200 dark:border-emerald-800/30 rounded-xl">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-slate-600 dark:text-slate-400 text-sm mb-1">Your Score</div>
                  <div className="text-3xl text-emerald-600 dark:text-emerald-400">{activity.score}%</div>
                </div>
                <div className="text-right">
                  <div className="text-slate-600 dark:text-slate-400 text-sm mb-1">Grade</div>
                  <div className="text-2xl text-slate-800 dark:text-slate-200">{activity.grade}</div>
                </div>
                <div className="text-right">
                  <div className="text-slate-600 dark:text-slate-400 text-sm mb-1">Points Earned</div>
                  <div className="text-2xl text-slate-800 dark:text-slate-200">+{activity.points}</div>
                </div>
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400">
                Completed {activity.completedDate}
              </div>
            </div>
          )}

          {/* Questions Preview (for pending/in-progress) */}
          {activity.status !== 'completed' && activity.totalQuestions && (
            <div className="mb-6">
              <h3 className="text-slate-800 dark:text-slate-100 mb-3">Activity Overview</h3>
              <div className="p-4 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-700 dark:to-slate-800 rounded-xl">
                <div className="flex items-center justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Total Questions</span>
                  <span className="text-slate-800 dark:text-slate-200">{activity.totalQuestions}</span>
                </div>
              </div>
            </div>
          )}

          {/* Priority Badge */}
          <div className="mb-6">
            <div className="inline-flex items-center gap-2">
              <span className="text-sm text-slate-600 dark:text-slate-400">Priority:</span>
              <Badge 
                className={
                  activity.priority === 'high' 
                    ? 'bg-red-500 hover:bg-red-600'
                    : activity.priority === 'medium'
                    ? 'bg-yellow-500 hover:bg-yellow-600'
                    : ''
                }
                variant={activity.priority === 'low' ? 'outline' : 'default'}
              >
                {activity.priority.charAt(0).toUpperCase() + activity.priority.slice(1)}
              </Badge>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            {activity.status === 'completed' ? (
              <>
                <Button
                  onClick={onStart}
                  variant="outline"
                  className="flex-1"
                >
                  View Feedback
                </Button>
                <Button
                  onClick={onStart}
                  className={`flex-1 bg-gradient-to-r ${activity.color}`}
                >
                  Retake Activity
                </Button>
              </>
            ) : (
              <>
                <Button
                  onClick={onStart}
                  className={`flex-1 bg-gradient-to-r ${activity.color}`}
                >
                  <Play className="w-4 h-4 mr-2" />
                  {activity.status === 'in-progress' ? 'Continue Activity' : 'Start Activity'}
                </Button>
                <Button variant="outline" onClick={onClose}>
                  Close
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
