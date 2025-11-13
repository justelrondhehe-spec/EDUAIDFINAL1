import { Users, BookOpen, Activity, TrendingUp } from 'lucide-react';
import { Button } from './ui/button';
import { useGlobalData } from '../contexts/GlobalDataContext';

export function AdminDashboard() {
  const {
    getTotalStudents,
    getActiveLessons,
    getAverageProgress,
    getCompletionRate,
    getTopPerformers,
    getRecentActivities,
  } = useGlobalData();

  // Get live data
  const totalStudents = getTotalStudents();
  const activeLessons = getActiveLessons();
  const avgProgress = getAverageProgress();
  const completionRate = getCompletionRate();
  const topPerformers = getTopPerformers(4);
  const recentActivities = getRecentActivities(5);

  const stats = [
    {
      title: 'Total Students',
      value: totalStudents.toString(),
      change: totalStudents > 0 ? `${totalStudents} enrolled` : 'No students yet',
      icon: Users,
      iconBg: 'bg-blue-500',
    },
    {
      title: 'Active Lessons',
      value: activeLessons.toString(),
      change: `${activeLessons} available`,
      icon: BookOpen,
      iconBg: 'bg-emerald-500',
    },
    {
      title: 'Completion Rate',
      value: `${completionRate}%`,
      change: `Across all students`,
      icon: Activity,
      iconBg: 'bg-purple-500',
    },
    {
      title: 'Avg. Progress',
      value: `${avgProgress}%`,
      change: `Overall average`,
      icon: TrendingUp,
      iconBg: 'bg-orange-500',
    },
  ];

  // Format time ago
  const formatTimeAgo = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
    if (hours < 24) return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
    return `${days} day${days !== 1 ? 's' : ''} ago`;
  };

  return (
    <div className="flex-1 overflow-auto">
      <div className="max-w-7xl mx-auto p-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl text-slate-800 dark:text-slate-100 mb-1">Admin Dashboard 🎓</h1>
            <p className="text-sm text-slate-600 dark:text-slate-400">Monitor and manage the EduAid platform</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="sm">
              Export Report
            </Button>
            <Button 
              size="sm"
              className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white"
            >
              View All Students
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 ${stat.iconBg} rounded-xl flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-xs text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-1 rounded-full">
                    {stat.change}
                  </span>
                </div>
                <div className="text-3xl text-slate-800 dark:text-slate-100 mb-1">{stat.value}</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">{stat.title}</div>
              </div>
            );
          })}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm">
            <h2 className="text-xl text-slate-800 dark:text-slate-100 mb-6">Recent Activity</h2>
            <div className="space-y-4">
              {recentActivities.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-slate-400 dark:text-slate-500">No recent activities</p>
                  <p className="text-xs text-slate-500 dark:text-slate-600 mt-1">
                    Student activities will appear here
                  </p>
                </div>
              ) : (
                recentActivities.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-start gap-3 pb-4 border-b border-slate-100 dark:border-slate-700 last:border-0 last:pb-0"
                  >
                    <div className={`w-2 h-2 rounded-full mt-2 ${activity.color}`}></div>
                    <div className="flex-1">
                      <p className="text-sm text-slate-700 dark:text-slate-300">{activity.message}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        {formatTimeAgo(activity.timestamp)}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Top Performers */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm">
            <h2 className="text-xl text-slate-800 dark:text-slate-100 mb-6">Top Performers</h2>
            <div className="space-y-5">
              {topPerformers.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-slate-400 dark:text-slate-500">No students yet</p>
                  <p className="text-xs text-slate-500 dark:text-slate-600 mt-1">
                    Top performers will appear here
                  </p>
                </div>
              ) : (
                topPerformers.map((performer, index) => {
                  const completedLessons = Object.values(performer.student.lessonProgress).filter(
                    l => l.completed
                  ).length;
                  const completedActivities = Object.values(performer.student.activityScores).filter(
                    a => a.completed
                  ).length;
                  const totalCompleted = completedLessons + completedActivities;

                  return (
                    <div key={performer.student.id}>
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h3 className="text-sm text-slate-800 dark:text-slate-100">
                            {performer.student.name}
                          </h3>
                          <p className="text-xs text-slate-600 dark:text-slate-400">
                            {totalCompleted} items completed
                          </p>
                        </div>
                        <div className="text-2xl text-emerald-600 dark:text-emerald-400">
                          {performer.overallProgress}%
                        </div>
                      </div>
                      <div className="relative w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                        <div
                          className="absolute top-0 left-0 h-full bg-slate-800 dark:bg-slate-300 rounded-full transition-all"
                          style={{ width: `${performer.overallProgress}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}