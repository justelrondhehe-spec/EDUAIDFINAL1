import { useGlobalData } from '../contexts/GlobalDataContext';
import { TrendingUp, Clock, Users, CheckCircle } from 'lucide-react';

export function AdminAnalytics() {
  const { getTotalStudents, getAverageProgress, getCompletionRate } = useGlobalData();

  // Calculate metrics
  const totalStudents = getTotalStudents();
  const averageProgress = getAverageProgress();
  const completionRate = getCompletionRate();

  // Mock data for engagement and session time (in a real app, this would come from tracking)
  const totalEngagement = 85;
  const avgSessionTime = 24; // in minutes
  const dailyActiveUsers = totalStudents; // Using total students as daily active for now

  // Calculate mock growth percentages
  const engagementGrowth = 5;
  const sessionTimeGrowth = 3;
  const dailyUsersGrowth = Math.floor(totalStudents * 0.15); // 15% growth
  const completionRateGrowth = 8;

  const metrics = [
    {
      title: 'Total Engagement',
      value: `${totalEngagement}%`,
      change: `+${engagementGrowth}%`,
      icon: TrendingUp,
      iconColor: 'text-purple-600 dark:text-purple-400',
      bgColor: 'bg-purple-100 dark:bg-purple-500/10',
    },
    {
      title: 'Avg. Session Time',
      value: `${avgSessionTime} min`,
      change: `+${sessionTimeGrowth} min`,
      icon: Clock,
      iconColor: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-100 dark:bg-blue-500/10',
    },
    {
      title: 'Daily Active Users',
      value: dailyActiveUsers.toLocaleString(),
      change: `+${dailyUsersGrowth}`,
      icon: Users,
      iconColor: 'text-emerald-600 dark:text-emerald-400',
      bgColor: 'bg-emerald-100 dark:bg-emerald-500/10',
    },
    {
      title: 'Completion Rate',
      value: `${completionRate}%`,
      change: `+${completionRateGrowth}%`,
      icon: CheckCircle,
      iconColor: 'text-pink-600 dark:text-pink-400',
      bgColor: 'bg-pink-100 dark:bg-pink-500/10',
    },
  ];

  return (
    <div className="flex-1 overflow-auto">
      <div className="max-w-7xl mx-auto p-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-slate-800 dark:text-slate-100 mb-1">Analytics</h1>
          <p className="text-sm text-slate-600 dark:text-slate-400">Track performance and user engagement</p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <div
                key={index}
                className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="text-sm text-slate-600 dark:text-slate-400">
                    {metric.title}
                  </div>
                  <div className={`p-2 rounded-lg ${metric.bgColor}`}>
                    <Icon className={`h-4 w-4 ${metric.iconColor}`} />
                  </div>
                </div>
                <div className="text-3xl text-slate-800 dark:text-slate-100 mb-2">
                  {metric.value}
                </div>
                <div className="text-sm text-emerald-600 dark:text-emerald-400">
                  {metric.change}
                </div>
              </div>
            );
          })}
        </div>

        {/* Usage Overview */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-8 border border-slate-200 dark:border-slate-700">
          <h2 className="text-lg text-slate-800 dark:text-slate-100 mb-8">Usage Overview</h2>
          <div className="flex items-center justify-center h-64">
            <p className="text-slate-400 dark:text-slate-500">Chart visualization would go here</p>
          </div>
        </div>
      </div>
    </div>
  );
}
