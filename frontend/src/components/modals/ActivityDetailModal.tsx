import { X, Play, Calendar, Award } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';

interface ActivityLike {
  _id?: string;
  id?: number;
  title?: string;
  description?: string;
  type?: string;
  subject?: string;
  dueDate?: string | Date | null;
  dueTimestamp?: number | null;
  status?: 'pending' | 'in-progress' | 'completed' | string;
  priority?: 'high' | 'medium' | 'low' | string;
  points?: number;
  progress?: number;
  totalQuestions?: number;
  grade?: string;
  score?: number;
  completedDate?: string | Date | null;
  icon?: string;
  color?: string;
}

interface ActivityDetailModalProps {
  activity: ActivityLike;
  onClose: () => void;
  onStart: () => void;
}

export function ActivityDetailModal({ activity, onClose, onStart }: ActivityDetailModalProps) {
  const color = activity.color || 'from-purple-500 to-pink-600';
  const title = activity.title ?? 'Untitled Activity';
  const description = activity.description ?? 'No description has been added for this activity yet.';

  const totalQuestions = activity.totalQuestions ?? 0;
  const rawProgress = activity.progress ?? 0;
  const progressPercent = totalQuestions > 0 ? (rawProgress / totalQuestions) * 100 : 0;

  // derive a nice due date string
  let dueDateLabel = 'No due date';
  if (activity.dueDate instanceof Date) {
    dueDateLabel = activity.dueDate.toLocaleDateString();
  } else if (typeof activity.dueDate === 'string' && activity.dueDate.trim() !== '') {
    // allow values like "This Week" or ISO dates
    const maybeDate = new Date(activity.dueDate);
    if (!Number.isNaN(maybeDate.getTime()) && activity.dueDate.includes('-')) {
      dueDateLabel = maybeDate.toLocaleDateString();
    } else {
      dueDateLabel = activity.dueDate;
    }
  } else if (typeof activity.dueTimestamp === 'number') {
    const d = new Date(activity.dueTimestamp);
    dueDateLabel = d.toLocaleDateString();
  }

  let priorityBadgeClass = '';
  let badgeVariant: 'default' | 'outline' = 'default';
  switch (activity.priority) {
    case 'high':
      priorityBadgeClass = 'bg-red-500 hover:bg-red-600';
      badgeVariant = 'default';
      break;
    case 'medium':
      priorityBadgeClass = 'bg-yellow-500 hover:bg-yellow-600';
      badgeVariant = 'default';
      break;
    default:
      priorityBadgeClass = '';
      badgeVariant = 'outline';
  }

  const status = activity.status ?? 'pending';
  const scorePercent = typeof activity.score === 'number' ? activity.score : undefined;

  let gradeLabel = activity.grade;
  if (!gradeLabel && typeof scorePercent === 'number') {
    const s = scorePercent;
    gradeLabel = s >= 95 ? 'A+' : s >= 90 ? 'A' : s >= 85 ? 'B+' : s >= 80 ? 'B' : s >= 70 ? 'C' : 'D';
  }

  let completedLabel: string | null = null;
  if (activity.completedDate instanceof Date) {
    completedLabel = activity.completedDate.toLocaleString();
  } else if (typeof activity.completedDate === 'string') {
    const d = new Date(activity.completedDate);
    completedLabel = Number.isNaN(d.getTime()) ? activity.completedDate : d.toLocaleString();
  }

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-slate-200 dark:border-slate-700"
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
            <div className="text-6xl">{activity.icon ?? '✅'}</div>
            <div className="flex-1 text-white">
              <div className="flex items-center gap-2 mb-3">
                {activity.type && (
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm">
                    {activity.type}
                  </span>
                )}
                {activity.subject && (
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm">
                    {activity.subject}
                  </span>
                )}
              </div>
              <h2 className="text-white mb-2">{title}</h2>
              <p className="text-white/90">{description}</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          {/* Activity Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="p-4 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-700 dark:to-slate-800 rounded-xl">
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 mb-1">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">Due Date</span>
              </div>
              <div className="text-slate-800 dark:text-slate-200">{dueDateLabel}</div>
            </div>
            <div className="p-4 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-700 dark:to-slate-800 rounded-xl">
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 mb-1">
                <Award className="w-4 h-4" />
                <span className="text-sm">Points</span>
              </div>
              <div className="text-slate-800 dark:text-slate-200">{activity.points ?? 0} points</div>
            </div>
          </div>

          {/* Progress for In-Progress Activities */}
          {status === 'in-progress' && totalQuestions > 0 && (
            <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800/30">
              <div className="flex items-center justify-between mb-2">
                <span className="text-slate-700 dark:text-slate-300">Your Progress</span>
                <span className="text-slate-800 dark:text-slate-200">
                  {rawProgress}/{totalQuestions} questions
                </span>
              </div>
              <Progress value={progressPercent} className="h-3" />
            </div>
          )}

          {/* Completed Activity Score */}
          {status === 'completed' && typeof scorePercent === 'number' && (
            <div className="mb-6 p-6 bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 border border-emerald-200 dark:border-emerald-800/30 rounded-xl">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                <div>
                  <div className="text-slate-600 dark:text-slate-400 text-sm mb-1">Your Score</div>
                  <div className="text-3xl text-emerald-600 dark:text-emerald-400">{scorePercent}%</div>
                </div>
                <div className="text-right">
                  <div className="text-slate-600 dark:text-slate-400 text-sm mb-1">Grade</div>
                  <div className="text-2xl text-slate-800 dark:text-slate-200">{gradeLabel}</div>
                </div>
                <div className="text-right">
                  <div className="text-slate-600 dark:text-slate-400 text-sm mb-1">Points Earned</div>
                  <div className="text-2xl text-slate-800 dark:text-slate-200">+{activity.points ?? 0}</div>
                </div>
              </div>
              {completedLabel && (
                <div className="text-sm text-slate-600 dark:text-slate-400">Completed {completedLabel}</div>
              )}
            </div>
          )}

          {/* Overview (for pending/in-progress) */}
          {status !== 'completed' && totalQuestions > 0 && (
            <div className="mb-6">
              <h3 className="text-slate-800 dark:text-slate-100 mb-3">Activity Overview</h3>
              <div className="p-4 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-700 dark:to-slate-800 rounded-xl">
                <div className="flex items-center justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Total Questions</span>
                  <span className="text-slate-800 dark:text-slate-200">{totalQuestions}</span>
                </div>
              </div>
            </div>
          )}

          {/* Priority Badge */}
          {activity.priority && (
            <div className="mb-6">
              <div className="inline-flex items-center gap-2">
                <span className="text-sm text-slate-600 dark:text-slate-400">Priority:</span>
                <Badge className={priorityBadgeClass} variant={badgeVariant}>
                  {activity.priority.charAt(0).toUpperCase() + activity.priority.slice(1)}
                </Badge>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3">
            {status === 'completed' ? (
              <>
                <Button onClick={onStart} variant="outline" className="flex-1">
                  View Feedback
                </Button>
                <Button onClick={onStart} className={`flex-1 bg-gradient-to-r ${color}`}>
                  Retake Activity
                </Button>
              </>
            ) : (
              <>
                <Button onClick={onStart} className={`flex-1 bg-gradient-to-r ${color}`}>
                  <Play className="w-4 h-4 mr-2" />
                  {status === 'in-progress' ? 'Continue Activity' : 'Start Activity'}
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
