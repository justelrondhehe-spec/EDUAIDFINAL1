// frontend/src/components/Activities.tsx
import {
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  Circle,
  Search,
  X,
  Lock,
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { useState, useMemo } from 'react';

import { ActivityDetailModal, ActivityLike } from './modals/ActivityDetailModal';
import { useApp } from '../contexts/AppContext';
import { Page } from '../App';
import { useGlobalData } from '../contexts/GlobalDataContext';
import { activitiesData, Activity } from '../data/activitiesData';

interface ActivitiesProps {
  onNavigate?: (page: Page) => void;
}

export function Activities({ onNavigate }: ActivitiesProps = {}) {
  const { lessonProgress, activityScores } = useApp();
  const { activities: serverActivities } = useGlobalData();

  const [selectedTab, setSelectedTab] = useState<'pending' | 'completed'>(
    'pending'
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedActivity, setSelectedActivity] = useState<ActivityLike | null>(
    null
  );
  const [selectedFilter, setSelectedFilter] = useState<
    'all' | 'completed' | 'in-progress' | 'pending'
  >('all');

  // backend activities (admin-created) with fallback to fixtures
  const effectiveActivities: ActivityLike[] =
    Array.isArray(serverActivities) && serverActivities.length > 0
      ? (serverActivities as ActivityLike[])
      : (activitiesData as ActivityLike[]);

  // map activity id to page
  const navigateToActivity = (activity: ActivityLike) => {
    if (!onNavigate) return;
    const id = Number(activity.id ?? (activity as any)._id);

    switch (id) {
      case 1:
        onNavigate('activity-shape-color-sorter');
        break;
      case 2:
        onNavigate('activity-number-counting');
        break;
      case 3:
        onNavigate('activity-reading-comprehension');
        break;
      case 4:
        onNavigate('activity-science-experiment'); // or activity-science-adventure
        break;
      case 5:
        onNavigate('activity-music-rhythm');
        break;
      case 6:
        onNavigate('activity-our-emotions');
        break;
      default:
        setSelectedActivity(activity);
    }
  };

  // merge user progress into activities
  const allActivities = useMemo(() => {
    return effectiveActivities.map((activity) => {
      const key =
        (activity.id as number | string | undefined) ??
        (activity as any)._id ??
        undefined;

      const activityScore =
        (key !== undefined && activityScores[key]) ||
        (key !== undefined && activityScores[String(key)]);

      const relatedLessonId = activity.relatedLessonId;

      const relatedLesson =
        relatedLessonId !== undefined
          ? lessonProgress[relatedLessonId] ||
            lessonProgress[String(relatedLessonId)]
          : null;

      const lessonDone = !!relatedLesson?.completed;
      const unlockedByScore = !!activityScore;

      // 🔓 final lock logic:
      // - locked ONLY if it has a relatedLessonId
      //   AND the lesson is NOT completed
      //   AND there is NO activityScore entry yet
      const isLocked =
        relatedLessonId !== undefined &&
        !lessonDone &&
        !unlockedByScore;

      let status: 'pending' | 'in-progress' | 'completed' = 'pending';
      let grade = activity.grade;
      let score = activity.score;
      let dueDate: Date | null = null;

      if (activityScore) {
        if (activityScore.completed) {
          status = 'completed';
          const percentScore = activityScore.maxScore
            ? Math.round((activityScore.score / activityScore.maxScore) * 100)
            : activityScore.score;
          score = percentScore;
          grade =
            percentScore >= 95
              ? 'A+'
              : percentScore >= 90
              ? 'A'
              : percentScore >= 85
              ? 'B+'
              : percentScore >= 80
              ? 'B'
              : percentScore >= 70
              ? 'C'
              : 'D';
        } else {
          status = 'in-progress';
        }
        dueDate = activityScore.dueDate;
      } else if (relatedLesson?.completed && !isLocked) {
        if (relatedLesson.completedDate) {
          const d = new Date(relatedLesson.completedDate);
          d.setDate(d.getDate() + 1);
          dueDate = d;
        }
      }

      return {
        ...activity,
        status,
        grade,
        score,
        dueDate,
        isLocked,
      };
    });
  }, [lessonProgress, activityScores, effectiveActivities]);

  const filterActivities = (activities: ActivityLike[]) => {
    const q = searchQuery.toLowerCase();
    return activities.filter((activity) => {
      if (
        q &&
        !((activity.title || '').toLowerCase().includes(q) ||
          (activity.description || '').toLowerCase().includes(q))
      ) {
        return false;
      }
      return true;
    });
  };

  const pendingActivities = filterActivities(
    allActivities.filter(
      (a) => a.status === 'pending' || a.status === 'in-progress'
    )
  );
  const completedActivitiesList = filterActivities(
    allActivities.filter((a) => a.status === 'completed')
  );

  const completedCount = allActivities.filter(
    (a) => a.status === 'completed'
  ).length;
  const inProgressCount = allActivities.filter(
    (a) => a.status === 'in-progress'
  ).length;
  const pendingCount = allActivities.filter(
    (a) => a.status === 'pending'
  ).length;

  // solid colors for stat cards (instead of gradients)
  const stats = [
    {
      label: 'Total Activities',
      value: allActivities.length.toString(),
      icon: 'all' as const,
      color: '#2563eb', // blue-600
      filter: 'all' as const,
    },
    {
      label: 'Completed',
      value: completedCount.toString(),
      icon: 'completed' as const,
      color: '#059669', // emerald-600
      filter: 'completed' as const,
    },
    {
      label: 'In Progress',
      value: inProgressCount.toString(),
      icon: 'in-progress' as const,
      color: '#f59e0b', // amber-500
      filter: 'in-progress' as const,
    },
    {
      label: 'Pending',
      value: pendingCount.toString(),
      icon: 'pending' as const,
      color: '#f43f5e', // rose-500
      filter: 'pending' as const,
    },
  ];

  const getStatusIcon = (status?: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-emerald-500" />;
      case 'in-progress':
        return <Clock className="w-5 h-5 text-blue-500" />;
      case 'pending':
      default:
        return <Circle className="w-5 h-5 text-slate-400" />;
    }
  };

  const getPriorityBadge = (priority?: string) => {
    switch (priority) {
      case 'high':
        return (
          <Badge className="bg-red-500 hover:bg-red-600">High Priority</Badge>
        );
      case 'medium':
        return (
          <Badge className="bg-yellow-500 hover:bg-yellow-600">Medium</Badge>
        );
      case 'low':
        return (
          <Badge
            variant="outline"
            className="border-slate-300 dark:border-slate-600"
          >
            Low
          </Badge>
        );
      default:
        return null;
    }
  };

  // strong solid color per activity (icon, bar, main button)
  const getActivityThemeColor = (activity: ActivityLike): string => {
    const idNum = Number(activity.id ?? (activity as any)._id ?? 0);
    switch (idNum) {
      case 1: // Shapes & Colors Challenge
        return '#ec4899'; // pink-500
      case 2: // Number Counting Adventure
        return '#3b82f6'; // blue-500
      case 3: // Reading Comprehension Quiz
        return '#10b981'; // emerald-500
      case 4: // Science Experiment Lab
        return '#22c55e'; // green-500
      case 5: // Music & Rhythm
        return '#f97316'; // orange-500
      case 6: // Our Emotions activity
        return '#f43f5e'; // rose-500
      default:
        return '#6366f1'; // indigo-500
    }
  };

  const handleStatClick = (
    filter: 'all' | 'completed' | 'in-progress' | 'pending'
  ) => {
    setSelectedFilter(filter);
    if (filter === 'completed') setSelectedTab('completed');
    else setSelectedTab('pending');
  };

  const getFilteredActivities = (base: ActivityLike[]) => {
    if (selectedFilter === 'all') return base;
    return base.filter((a) => a.status === selectedFilter);
  };

  const displayPendingActivities = getFilteredActivities(pendingActivities);
  const displayCompletedActivities =
    getFilteredActivities(completedActivitiesList);

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-slate-800 dark:text-slate-100 mb-2">Activities</h1>
        <p className="text-slate-600 dark:text-slate-400">
          Track and complete your assignments
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <button
            key={index}
            onClick={() => handleStatClick(stat.filter)}
            style={{ backgroundColor: stat.color }}
            className={`text-white rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:brightness-110 transition-all text-left ${
              selectedFilter === stat.filter
                ? 'ring-4 ring-white dark:ring-slate-900 ring-offset-2'
                : ''
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              {stat.icon === 'completed' && (
                <CheckCircle className="w-8 h-8 opacity-80" />
              )}
              {stat.icon === 'in-progress' && (
                <Clock className="w-8 h-8 opacity-80" />
              )}
              {stat.icon === 'pending' && (
                <AlertCircle className="w-8 h-8 opacity-80" />
              )}
              {stat.icon === 'all' && <Circle className="w-8 h-8 opacity-80" />}
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <span className="text-2xl">{stat.value}</span>
              </div>
            </div>
            <div className="text-white/90">{stat.label}</div>
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Input
            placeholder="Search activities..."
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
      </div>

      {/* Active Filter Indicator */}
      {selectedFilter !== 'all' && (
        <div className="flex items-center gap-2">
          <span className="text-slate-600 dark:text-slate-400 text-sm">
            Filtering by:
          </span>
          <Badge className="bg-blue-500">
            {selectedFilter === 'in-progress'
              ? 'In Progress'
              : selectedFilter.charAt(0).toUpperCase() +
                selectedFilter.slice(1)}
          </Badge>
          <button
            onClick={() => setSelectedFilter('all')}
            className="text-sm text-blue-500 hover:text-blue-600"
          >
            Clear filter
          </button>
        </div>
      )}

      {/* Tabs */}
      <Tabs
        value={selectedTab}
        onValueChange={(v) => setSelectedTab(v as 'pending' | 'completed')}
        className="w-full"
      >
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="pending">
            Pending ({pendingActivities.length})
          </TabsTrigger>
          <TabsTrigger value="completed">
            Completed ({completedActivitiesList.length})
          </TabsTrigger>
        </TabsList>

        {/* Pending / In-progress */}
        <TabsContent value="pending" className="mt-6 space-y-4">
          {allActivities.length === 0 ? (
            <div className="text-center py-12">
              <div className="flex justify-center mb-4">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                  <Lock className="w-10 h-10 text-white" />
                </div>
              </div>
              <div className="text-slate-800 dark:text-slate-200 mb-2">
                No Activities Available Yet
              </div>
              <div className="text-slate-600 dark:text-slate-400 max-w-md mx-auto">
                Complete lessons to unlock related activities! Start with the{' '}
                <span className="text-pink-600 dark:text-pink-400">
                  Shapes &amp; Colors
                </span>{' '}
                lesson to unlock your first activity.
              </div>
            </div>
          ) : displayPendingActivities.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-slate-400 dark:text-slate-500 mb-2">
                No pending activities found
              </div>
              <div className="text-slate-600 dark:text-slate-400">
                Try adjusting your search or filters
              </div>
            </div>
          ) : (
            displayPendingActivities.map((activity) => (
              <div
                key={(activity as any)._id ?? activity.id}
                onClick={() =>
                  !activity.isLocked && setSelectedActivity(activity)
                }
                className={`bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden transition-all ${
                  activity.isLocked
                    ? 'opacity-60 cursor-not-allowed'
                    : 'hover:shadow-xl cursor-pointer'
                }`}
              >
                <div className="p-6">
                  <div className="flex items-start gap-6">
                    {/* Icon */}
                    <div
                      className="w-16 h-16 rounded-xl flex items-center justify-center text-3xl shadow-lg flex-shrink-0 relative"
                      style={{
                        backgroundColor: getActivityThemeColor(activity),
                      }}
                    >
                      {activity.isLocked && (
                        <div className="absolute inset-0 bg-black/50 rounded-xl flex items-center justify-center">
                          <Lock className="w-8 h-8 text-white" />
                        </div>
                      )}
                      {activity.icon}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            {getStatusIcon(activity.status as string)}
                            <h3 className="text-slate-800 dark:text-slate-100">
                              {activity.title}
                            </h3>
                          </div>
                          <p className="text-slate-600 dark:text-slate-400 text-sm mb-3">
                            {activity.description}
                          </p>
                          <div className="flex items-center gap-3 flex-wrap">
                            <Badge
                              variant="outline"
                              className="border-slate-300 dark:border-slate-600"
                            >
                              {activity.type}
                            </Badge>
                            <Badge
                              variant="outline"
                              className="border-slate-300 dark:border-slate-600"
                            >
                              {activity.subject}
                            </Badge>
                            {getPriorityBadge(activity.priority as string)}
                          </div>
                        </div>
                      </div>

                      {/* Progress */}
                      {activity.status === 'in-progress' &&
                        activity.totalQuestions && (
                          <div className="mb-4">
                            <div className="flex items-center justify-between text-sm mb-2">
                              <span className="text-slate-600 dark:text-slate-400">
                                Progress: {activity.progress}/
                                {activity.totalQuestions} questions
                              </span>
                              <span className="text-slate-800 dark:text-slate-200">
                                {Math.round(
                                  ((activity.progress || 0) /
                                    activity.totalQuestions) *
                                    100
                                )}
                                %
                              </span>
                            </div>
                            <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                              <div
                                className="h-2 rounded-full transition-all"
                                style={{
                                  width: `${
                                    ((activity.progress || 0) /
                                      activity.totalQuestions) *
                                    100
                                  }%`,
                                  backgroundColor: getActivityThemeColor(
                                    activity
                                  ),
                                }}
                              />
                            </div>
                          </div>
                        )}

                      {/* Footer */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm">
                          {activity.isLocked ? (
                            <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400">
                              <Lock className="w-4 h-4" />
                              <span>Complete lesson to unlock</span>
                            </div>
                          ) : activity.dueDate ? (
                            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                              <Calendar className="w-4 h-4" />
                              <span>
                                Due{' '}
                                {new Date(
                                  activity.dueDate as any
                                ).toLocaleDateString()}
                              </span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                              <Calendar className="w-4 h-4" />
                              <span>No due date</span>
                            </div>
                          )}
                          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                            <span className="text-yellow-500">⭐</span>
                            <span>{activity.points} points</span>
                          </div>
                        </div>
                        <Button
                          style={{
                            backgroundColor: getActivityThemeColor(activity),
                            color: '#ffffff',
                          }}
                          className="px-4 py-2 rounded-xl font-semibold shadow-md"
                          disabled={activity.isLocked}
                          onClick={(e) => {
                            e.stopPropagation();
                            if (activity.isLocked) return;
                            navigateToActivity(activity);
                          }}
                        >
                          {activity.isLocked
                            ? 'Locked'
                            : activity.status === 'in-progress'
                            ? 'Continue'
                            : 'Start Activity'}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </TabsContent>

        {/* Completed */}
        <TabsContent value="completed" className="mt-6 space-y-4">
          {displayCompletedActivities.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-slate-400 dark:text-slate-500 mb-2">
                No completed activities found
              </div>
              <div className="text-slate-600 dark:text-slate-400">
                Complete some activities to see them here
              </div>
            </div>
          ) : (
            displayCompletedActivities.map((activity) => (
              <div
                key={(activity as any)._id ?? activity.id}
                onClick={() => setSelectedActivity(activity)}
                className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden hover:shadow-xl transition-all cursor-pointer"
              >
                <div className="p-6">
                  <div className="flex items-start gap-6">
                    {/* Icon */}
                    <div
                      className="w-16 h-16 rounded-xl flex items-center justify-center text-3xl shadow-lg flex-shrink-0 relative"
                      style={{
                        backgroundColor: getActivityThemeColor(activity),
                      }}
                    >
                      {activity.icon}
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-5 h-5 text-white" />
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="text-slate-800 dark:text-slate-100 mb-2">
                            {activity.title}
                          </h3>
                          <p className="text-slate-600 dark:text-slate-400 text-sm mb-3">
                            {activity.description}
                          </p>
                          <div className="flex items-center gap-3 flex-wrap">
                            <Badge
                              variant="outline"
                              className="border-slate-300 dark:border-slate-600"
                            >
                              {activity.type}
                            </Badge>
                            <Badge
                              variant="outline"
                              className="border-slate-300 dark:border-slate-600"
                            >
                              {activity.subject}
                            </Badge>
                            <Badge className="bg-emerald-500 hover:bg-emerald-600">
                              Grade: {activity.grade}
                            </Badge>
                          </div>
                        </div>
                      </div>

                      {/* Score */}
                      <div className="bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 border border-emerald-200 dark:border-emerald-800/30 rounded-xl p-4 mb-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-slate-600 dark:text-slate-400 text-sm mb-1">
                              Your Score
                            </div>
                            <div className="text-2xl text-emerald-600 dark:text-emerald-400">
                              {activity.score}%
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-slate-600 dark:text-slate-400 text-sm mb-1">
                              Points Earned
                            </div>
                            <div className="text-xl text-slate-800 dark:text-slate-200">
                              +{activity.points}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Footer */}
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-slate-500 dark:text-slate-400">
                          Completed{' '}
                          {activity.completedDate
                            ? typeof activity.completedDate === 'string'
                              ? activity.completedDate
                              : activity.completedDate instanceof Date
                              ? activity.completedDate.toLocaleDateString()
                              : ''
                            : ''}
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedActivity(activity);
                            }}
                          >
                            View Feedback
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              navigateToActivity(activity);
                            }}
                          >
                            Retake
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </TabsContent>
      </Tabs>

      {/* Activity Detail Modal */}
      {selectedActivity && (
        <ActivityDetailModal
          activity={selectedActivity}
          onClose={() => setSelectedActivity(null)}
          onStart={() => {
            navigateToActivity(selectedActivity);
            setSelectedActivity(null);
          }}
        />
      )}
    </div>
  );
}
