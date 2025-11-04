import { Calendar, Users, TrendingUp, Target, BookOpen } from 'lucide-react';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { activitiesData } from '../data/activitiesData';
import { lessonsData } from '../data/lessonsData';
import { useApp } from '../contexts/AppContext';

export function Dashboard() {
  const { setShowInviteModal } = useApp();

  // Get activities matching the dashboard view
  const dashboardActivities = activitiesData.filter(a => 
    a.id === 7 || a.id === 8 || a.id === 9
  );

  const completedTasks = activitiesData.filter(a => 
    a.status === 'completed'
  ).slice(0, 2);

  // Calculate actual progress
  const completedCount = activitiesData.filter(a => a.status === 'completed').length;
  const inProgressCount = activitiesData.filter(a => a.status === 'in-progress').length;
  const notStartedCount = activitiesData.filter(a => a.status === 'pending').length;
  const totalCount = activitiesData.length;

  const completedPercentage = Math.round((completedCount / totalCount) * 100);
  const inProgressPercentage = Math.round((inProgressCount / totalCount) * 100);
  const notStartedPercentage = Math.round((notStartedCount / totalCount) * 100);

  const progressStats = [
    { label: 'Completed', percentage: completedPercentage, color: 'text-emerald-500', bgColor: 'bg-emerald-500' },
    { label: 'In Progress', percentage: inProgressPercentage, color: 'text-blue-500', bgColor: 'bg-blue-500' },
    { label: 'Not Started', percentage: notStartedPercentage, color: 'text-red-500', bgColor: 'bg-red-500' },
  ];

  const avatars = [
    { initial: 'JD', color: 'from-pink-500 to-rose-500' },
    { initial: 'SM', color: 'from-blue-500 to-indigo-500' },
    { initial: 'KL', color: 'from-purple-500 to-pink-500' },
    { initial: 'RT', color: 'from-cyan-500 to-blue-500' },
    { initial: '+5', color: 'from-slate-600 to-slate-800' },
  ];

  // Quick stats for overview cards
  const quickStats = [
    {
      label: 'Lessons Available',
      value: lessonsData.length,
      total: lessonsData.length,
      icon: BookOpen,
      color: 'from-blue-500 to-blue-600',
    },
    {
      label: 'Activities Due',
      value: activitiesData.filter(a => a.status !== 'completed').length,
      icon: Target,
      color: 'from-purple-500 to-purple-600',
    },
    {
      label: 'Learning Streak',
      value: '12 days',
      icon: TrendingUp,
      color: 'from-emerald-500 to-emerald-600',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Welcome Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-slate-800 dark:text-slate-100 mb-2">
            Welcome back, Daniel 👋
          </h1>
          <p className="text-slate-600 dark:text-slate-400">Here's what's happening with your learning today</p>
        </div>
        <div className="flex items-center gap-3">
          {/* Avatars */}
          <div className="flex -space-x-2">
            {avatars.map((avatar, index) => (
              <div
                key={index}
                className={`w-10 h-10 rounded-full bg-gradient-to-br ${avatar.color} border-2 border-white dark:border-slate-900 flex items-center justify-center text-white text-sm shadow-lg`}
              >
                {avatar.initial}
              </div>
            ))}
          </div>
          <Button 
            onClick={() => setShowInviteModal(true)}
            className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600"
          >
            <Users className="w-4 h-4 mr-2" />
            Invite
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {quickStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className={`bg-gradient-to-br ${stat.color} text-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all`}
            >
              <div className="flex items-center justify-between mb-3">
                <Icon className="w-8 h-8 opacity-80" />
                <div className="text-3xl">{stat.value}</div>
              </div>
              <div className="text-white/90">{stat.label}</div>
              {stat.total && (
                <div className="mt-2">
                  <Progress value={(Number(stat.value) / stat.total) * 100} className="h-2 bg-white/20" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Activities Section - Takes 2 columns */}
        <div className="lg:col-span-2 space-y-6">
          {/* Section Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-slate-800 dark:text-slate-100">Activities</h2>
                <p className="text-slate-500 dark:text-slate-400 text-sm">20 June • Today</p>
              </div>
            </div>
          </div>

          {/* Activity Cards */}
          <div className="space-y-4">
            {dashboardActivities.map((activity, index) => (
              <div
                key={index}
                className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-6 hover:shadow-xl transition-all group"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-12 h-12 bg-gradient-to-br ${activity.color} rounded-xl flex items-center justify-center text-2xl shadow-lg`}>
                        {activity.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-slate-800 dark:text-slate-100 mb-1">{activity.title}</h3>
                        <p className="text-slate-600 dark:text-slate-400 text-sm line-clamp-2">
                          {activity.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-slate-500 dark:text-slate-400">
                        Priority: <span className="text-blue-500">{activity.priority}</span>
                      </span>
                      <span className="text-slate-500 dark:text-slate-400">
                        Status: <span className={
                          activity.status === 'completed' 
                            ? 'text-emerald-500' 
                            : activity.status === 'in-progress'
                            ? 'text-blue-500'
                            : 'text-red-500'
                        }>{activity.status === 'in-progress' ? 'In Progress' : activity.status === 'completed' ? 'Completed' : 'Not Started'}</span>
                      </span>
                      <span className="text-slate-400 dark:text-slate-500">
                        Created on: {activity.dueDate}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Progress & Completed Tasks Section */}
        <div className="space-y-6">
          {/* Progress Section */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-6">
            <h3 className="text-slate-800 dark:text-slate-100 mb-6">Progress</h3>
            
            {/* Progress Circles */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              {progressStats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="relative w-20 h-20 mx-auto mb-2">
                    <svg className="w-20 h-20 transform -rotate-90">
                      <circle
                        cx="40"
                        cy="40"
                        r="32"
                        stroke="currentColor"
                        strokeWidth="6"
                        fill="none"
                        className="text-slate-200 dark:text-slate-700"
                      />
                      <circle
                        cx="40"
                        cy="40"
                        r="32"
                        stroke="currentColor"
                        strokeWidth="6"
                        fill="none"
                        strokeDasharray={`${2 * Math.PI * 32}`}
                        strokeDashoffset={`${2 * Math.PI * 32 * (1 - stat.percentage / 100)}`}
                        className={stat.color}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className={`text-lg ${stat.color}`}>{stat.percentage}%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-center gap-1">
                    <div className={`w-2 h-2 rounded-full ${stat.bgColor}`}></div>
                    <span className="text-slate-600 dark:text-slate-400 text-xs">{stat.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Completed Tasks */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-5 h-5 rounded bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                <span className="text-emerald-600 dark:text-emerald-400 text-xs">✓</span>
              </div>
              <h3 className="text-slate-800 dark:text-slate-100">Completed Tasks</h3>
            </div>
            
            <div className="space-y-3">
              {completedTasks.map((task, index) => (
                <div
                  key={index}
                  className="p-4 bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 rounded-xl border border-emerald-200 dark:border-emerald-800/30"
                >
                  <div className="flex items-start gap-3">
                    <div className="text-3xl">{task.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center">
                          <span className="text-white text-xs">✓</span>
                        </div>
                        <h4 className="text-slate-800 dark:text-slate-100">{task.title}</h4>
                      </div>
                      <p className="text-slate-600 dark:text-slate-400 text-sm mb-2 line-clamp-2">
                        {task.description}
                      </p>
                      <div className="flex items-center gap-2 text-xs">
                        <span className="px-2 py-1 bg-emerald-500 text-white rounded">
                          Completed
                        </span>
                        <span className="text-slate-500 dark:text-slate-400">
                          {task.completedDate}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
