// frontend/src/components/Dashboard.tsx
import React from 'react';
import { Calendar, TrendingUp, Target, BookOpen } from 'lucide-react';
import { Progress } from './ui/progress';
import { activitiesData as activitiesFixture } from '../data/activitiesData';
import { lessonsData as lessonsFixture } from '../data/lessonsData';
import { useApp } from '../contexts/AppContext';
import { useAuth } from '../contexts/AuthContext';
import { useGlobalData } from '../contexts/GlobalDataContext';

interface DashboardProps {
  onNavigate?: (page: string) => void;
}

export function Dashboard({ onNavigate }: DashboardProps = {}) {
  const { lessonProgress, activityScores } = useApp();
  const { user } = useAuth();
  const { activities: activitiesFromServer, lessons: lessonsFromServer } = useGlobalData();

  // Prefer server data, fallback to fixtures
  const activitiesSource = Array.isArray(activitiesFromServer) && activitiesFromServer.length > 0
    ? activitiesFromServer
    : activitiesFixture ?? [];
  const lessonsSource = Array.isArray(lessonsFromServer) && lessonsFromServer.length > 0
    ? lessonsFromServer
    : lessonsFixture ?? [];

  const displayName = user?.name ?? '';

  // Update activities with completion status (normalize shape)
  const activitiesWithStatus = activitiesSource
    .map((raw: any) => {
      const id = raw.id ?? raw._id ?? String(raw._key ?? Math.random());
      const dueTimestamp =
        raw.dueTimestamp
          ? Number(raw.dueTimestamp)
          : raw.dueDate
          ? new Date(raw.dueDate).getTime()
          : undefined;

      const computedStatus =
        activityScores?.[id]?.completed ? 'completed' :
        raw.status ?? 'pending';

      const dueDateDisplay = dueTimestamp
        ? new Date(dueTimestamp).toLocaleDateString()
        : raw.dueDate && typeof raw.dueDate === 'string'
        ? raw.dueDate
        : undefined;

      return {
        ...raw,
        id,
        status: computedStatus,
        dueTimestamp,
        dueDate: dueDateDisplay,
      };
    })
    .filter((activity: any) => {
      // If activity has a related lesson, only show it if lesson is completed
      if (activity.relatedLessonId !== undefined && activity.relatedLessonId !== null) {
        const related = lessonProgress?.[activity.relatedLessonId];
        return !!related?.completed;
      }
      return true;
    });

  // Filter upcoming (not completed) activities that have future due dates
  const upcomingActivities = activitiesWithStatus
    .filter((a: any) => a.status !== 'completed' && a.dueTimestamp && a.dueTimestamp > Date.now())
    .slice(0, 3);

  const completedTasks = activitiesWithStatus.filter((a: any) => a.status === 'completed').slice(0, 2);

  // Progress counts
  const completedCount = activitiesWithStatus.filter((a: any) => a.status === 'completed').length;
  const inProgressCount = activitiesWithStatus.filter((a: any) => a.status === 'in-progress').length;
  const notStartedCount = activitiesWithStatus.filter((a: any) => a.status === 'pending').length;
  const totalCount = activitiesWithStatus.length;
  const completedPercentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
  const inProgressPercentage = totalCount > 0 ? Math.round((inProgressCount / totalCount) * 100) : 0;
  const notStartedPercentage = totalCount > 0 ? Math.round((notStartedCount / totalCount) * 100) : 0;

  const progressStats = [
    { label: 'Completed', percentage: completedPercentage, color: 'text-emerald-500', bgColor: 'bg-emerald-500' },
    { label: 'In Progress', percentage: inProgressPercentage, color: 'text-blue-500', bgColor: 'bg-blue-500' },
    { label: 'Not Started', percentage: notStartedPercentage, color: 'text-red-500', bgColor: 'bg-red-500' },
  ];

  const activitiesDue = activitiesWithStatus.filter((a: any) => a.status !== 'completed').length;

  const quickStats = [
    {
      label: 'Lessons Available',
      value: lessonsSource.length,
      total: lessonsSource.length || 1,
      icon: BookOpen,
      color: 'from-blue-500 to-blue-600',
      progress: Object.values(lessonProgress ?? {}).filter((l: any) => l?.completed).length,
    },
    { label: 'Activities Due', value: activitiesDue, icon: Target, color: 'from-purple-500 to-purple-600' },
    { label: 'Total Activities', value: activitiesWithStatus.length, icon: TrendingUp, color: 'from-emerald-500 to-emerald-600' },
  ];

  const renderDue = (activity: any) => {
    if (!activity?.dueDate && !activity?.dueTimestamp) return '—';
    const d = activity.dueDate ?? (activity.dueTimestamp ? new Date(activity.dueTimestamp) : undefined);
    try {
      return typeof d === 'string' ? d : d.toLocaleDateString();
    } catch {
      return String(d);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Welcome Header */}
      <div>
        <h1 className="text-slate-800 dark:text-slate-100 mb-2">
          {displayName ? `Welcome, ${displayName} 👋` : 'Welcome 👋'}
        </h1>
        <p className="text-slate-600 dark:text-slate-400">Here's what's happening with your learning today</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {quickStats.map((stat, index) => {
          const Icon = stat.icon as any;
          return (
            <div key={index} className={`bg-gradient-to-br ${stat.color} text-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all`}>
              <div className="flex items-center justify-between mb-3">
                {Icon ? <Icon className="w-8 h-8 opacity-80" /> : <div className="w-8 h-8" />}
                <div className="text-3xl">{stat.value}</div>
              </div>
              <div className="text-white/90">{stat.label}</div>
              {typeof stat.total === 'number' && (
                <div className="mt-2">
                  <Progress value={Math.min(100, Math.max(0, ((stat.progress || Number(stat.value)) / stat.total) * 100))} className="h-2 bg-white/20" />
                  <div className="text-xs text-white/70 mt-1">
                    {stat.progress || 0} completed
                  </div>
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
                <h2 className="text-slate-800 dark:text-slate-100">Upcoming Activities</h2>
                <p className="text-slate-500 dark:text-slate-400 text-sm">
                  {upcomingActivities.length > 0 ? 'Click to view on Activities page' : 'No upcoming activities'}
                </p>
              </div>
            </div>
          </div>

          {/* Activity Cards */}
          <div className="space-y-4">
            {upcomingActivities.length > 0 ? (
              upcomingActivities.map((activity: any) => (
                <div
                  key={activity.id}
                  onClick={() => onNavigate?.('activities')}
                  className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-6 hover:shadow-xl transition-all group cursor-pointer"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`w-12 h-12 bg-gradient-to-br ${activity.color ?? 'from-slate-200 to-slate-300'} rounded-xl flex items-center justify-center text-2xl shadow-lg`}>
                          {activity.icon ?? '📌'}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-slate-800 dark:text-slate-100 mb-1">{activity.title ?? 'Untitled activity'}</h3>
                          <p className="text-slate-600 dark:text-slate-400 text-sm line-clamp-2">
                            {activity.description ?? ''}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="text-slate-500 dark:text-slate-400">
                          Priority: <span className="text-blue-500">{activity.priority ?? 'normal'}</span>
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
                          Due: {renderDue(activity)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-8 text-center">
                <div className="text-slate-400 dark:text-slate-500 mb-2">No upcoming activities</div>
                <div className="text-slate-600 dark:text-slate-400 text-sm">Complete lessons to unlock new activities!</div>
              </div>
            )}
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
          {completedTasks.length > 0 && (
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
                    key={task.id ?? index}
                    className="p-4 bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 rounded-xl border border-emerald-200 dark:border-emerald-800/30"
                  >
                    <div className="flex items-start gap-3">
                      <div className="text-3xl">{task.icon ?? '✅'}</div>
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
                          {task.completedDate && (
                            <span className="text-slate-500 dark:text-slate-400">
                              {task.completedDate}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
