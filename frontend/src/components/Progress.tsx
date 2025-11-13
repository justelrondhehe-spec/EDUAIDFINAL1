import { Trophy, Target, Award, Clock } from 'lucide-react';
import { Card } from './ui/card';
import { useApp } from '../contexts/AppContext';

export function Progress() {
  const { overallProgressPercent, activityScores, lessonProgress, achievementsEarned, recentActivities } = useApp();
  // Update weekly stats based on actual progress
  const completedLessonsCount = Object.values(lessonProgress).filter(l => l.completed).length;
  const completedActivitiesCount = Object.values(activityScores).filter(a => a.completed).length;
  const totalActivitiesCompleted = completedLessonsCount + completedActivitiesCount;

  const achievements = [
    {
      title: 'First Steps',
      description: 'Complete your first lesson',
      icon: '🎯',
      earned: completedLessonsCount > 0,
      date: completedLessonsCount > 0 ? 'Just earned' : undefined,
      color: 'from-blue-500 to-blue-600',
    },
    {
      title: 'Shape Master',
      description: 'Complete the Shapes & Colors lesson',
      icon: '🎨',
      earned: lessonProgress[4]?.completed || false,
      date: lessonProgress[4]?.completed ? 'Just earned' : undefined,
      color: 'from-purple-500 to-purple-600',
    },
    {
      title: 'Activity Champion',
      description: 'Complete your first activity',
      icon: '🏆',
      earned: completedActivitiesCount > 0,
      date: completedActivitiesCount > 0 ? 'Just earned' : undefined,
      color: 'from-emerald-500 to-emerald-600',
    },
    {
      title: 'Early Bird',
      description: 'Complete 10 morning sessions',
      icon: '🌅',
      earned: false,
      progress: 7,
      total: 10,
      color: 'from-pink-500 to-rose-500',
    },
    {
      title: 'Perfectionist',
      description: 'Get 100% on any activity',
      icon: '💎',
      earned: Object.values(activityScores).some(a => a.completed && (a.score / a.maxScore) === 1),
      date: Object.values(activityScores).some(a => a.completed && (a.score / a.maxScore) === 1) ? 'Just earned' : undefined,
      color: 'from-cyan-500 to-cyan-600',
    },
  ];

  // Display message if no recent activities
  const displayActivities = recentActivities.length > 0 
    ? recentActivities 
    : [{ 
        id: 0,
        title: 'No recent activities yet', 
        time: 'Complete lessons or activities to see them here', 
        icon: '📝', 
        color: 'text-slate-400',
        timestamp: new Date(),
      }];

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-slate-800 dark:text-slate-100 mb-2">My Progress</h1>
        <p className="text-slate-600 dark:text-slate-400">Track your learning journey and achievements</p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="p-6 bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <Trophy className="w-8 h-8 opacity-80" />
            <div className="text-right">
              <div className="text-3xl mb-1">{overallProgressPercent}%</div>
              <div className="text-blue-100 text-sm">Overall Progress</div>
            </div>
          </div>
          <div className="text-sm text-blue-100">Average score across all activities</div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-emerald-500 to-emerald-600 text-white border-0 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <Target className="w-8 h-8 opacity-80" />
            <div className="text-right">
              <div className="text-3xl mb-1">{totalActivitiesCompleted}</div>
              <div className="text-emerald-100 text-sm">Completed</div>
            </div>
          </div>
          <div className="text-sm text-emerald-100">Activities & lessons finished</div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-pink-500 to-rose-500 text-white border-0 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <Award className="w-8 h-8 opacity-80" />
            <div className="text-right">
              <div className="text-3xl mb-1">{achievementsEarned}</div>
              <div className="text-pink-100 text-sm">Achievements</div>
            </div>
          </div>
          <div className="text-sm text-pink-100">Badges earned</div>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Achievements */}
        <Card className="p-6 dark:bg-slate-800 dark:border-slate-700">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center">
              <Trophy className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-slate-800 dark:text-slate-100">Achievements</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm">Your badges</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {achievements.slice(0, 4).map((achievement, index) => (
              <div
                key={index}
                className={`p-4 rounded-xl text-center transition-all ${
                  achievement.earned
                    ? `bg-gradient-to-br ${achievement.color} text-white shadow-lg hover:shadow-xl`
                    : 'bg-slate-100 dark:bg-slate-700 opacity-60'
                }`}
              >
                <div className="text-3xl mb-2">{achievement.icon}</div>
                <div className={`text-sm ${achievement.earned ? 'text-white' : 'text-slate-600 dark:text-slate-400'}`}>
                  {achievement.title}
                </div>
                {achievement.earned && achievement.date && (
                  <div className="text-xs opacity-80 mt-1">{achievement.date}</div>
                )}
                {!achievement.earned && achievement.progress !== undefined && (
                  <div className="text-xs mt-1 text-slate-600 dark:text-slate-400">
                    {achievement.progress}/{achievement.total}
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Activity */}
        <Card className="p-6 dark:bg-slate-800 dark:border-slate-700">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-xl flex items-center justify-center">
              <Clock className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-slate-800 dark:text-slate-100">Recent Activity</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm">Latest updates</p>
            </div>
          </div>

          <div className="space-y-4">
            {displayActivities.map((activity, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className={`text-xl ${activity.color}`}>{activity.icon}</div>
                <div className="flex-1">
                  <div className="text-sm text-slate-800 dark:text-slate-200 mb-1">
                    {activity.title}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    {activity.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
