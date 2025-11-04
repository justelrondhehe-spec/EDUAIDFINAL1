import { Calendar, Clock, CheckCircle, AlertCircle, Circle, Filter, Search, X } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { activitiesData, Activity } from '../data/activitiesData';
import { useState } from 'react';
import { ActivityDetailModal } from './modals/ActivityDetailModal';

export function Activities() {
  const [selectedTab, setSelectedTab] = useState<'pending' | 'completed'>('pending');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'completed' | 'in-progress' | 'pending'>('all');

  // Filter activities based on search and filters
  const filterActivities = (activities: Activity[]) => {
    return activities.filter(activity => {
      // Search filter
      if (searchQuery && !activity.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !activity.description.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      return true;
    });
  };

  const pendingActivities = filterActivities(
    activitiesData.filter(a => a.status === 'pending' || a.status === 'in-progress')
  );
  
  const completedActivities = filterActivities(
    activitiesData.filter(a => a.status === 'completed')
  );

  const allActivities = activitiesData;
  const completedCount = activitiesData.filter(a => a.status === 'completed').length;
  const inProgressCount = activitiesData.filter(a => a.status === 'in-progress').length;
  const pendingCount = activitiesData.filter(a => a.status === 'pending').length;

  const stats = [
    { 
      label: 'Total Activities', 
      value: allActivities.length.toString(), 
      icon: 'all' as const,
      color: 'from-blue-500 to-blue-600',
      filter: 'all' as const,
    },
    { 
      label: 'Completed', 
      value: completedCount.toString(), 
      icon: 'completed' as const,
      color: 'from-emerald-500 to-emerald-600',
      filter: 'completed' as const,
    },
    { 
      label: 'In Progress', 
      value: inProgressCount.toString(), 
      icon: 'in-progress' as const,
      color: 'from-yellow-500 to-orange-500',
      filter: 'in-progress' as const,
    },
    { 
      label: 'Pending', 
      value: pendingCount.toString(), 
      icon: 'pending' as const,
      color: 'from-red-500 to-pink-600',
      filter: 'pending' as const,
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-emerald-500" />;
      case 'in-progress':
        return <Clock className="w-5 h-5 text-blue-500" />;
      case 'pending':
        return <Circle className="w-5 h-5 text-slate-400" />;
      default:
        return null;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Badge className="bg-red-500 hover:bg-red-600">High Priority</Badge>;
      case 'medium':
        return <Badge className="bg-yellow-500 hover:bg-yellow-600">Medium</Badge>;
      case 'low':
        return <Badge variant="outline" className="border-slate-300 dark:border-slate-600">Low</Badge>;
      default:
        return null;
    }
  };

  const handleStatClick = (filter: 'all' | 'completed' | 'in-progress' | 'pending') => {
    setSelectedFilter(filter);
    // Switch to appropriate tab
    if (filter === 'completed') {
      setSelectedTab('completed');
    } else {
      setSelectedTab('pending');
    }
  };

  // Get activities to display based on selected filter
  const getFilteredActivities = (baseActivities: Activity[]) => {
    if (selectedFilter === 'all') return baseActivities;
    return baseActivities.filter(a => a.status === selectedFilter);
  };

  const displayPendingActivities = getFilteredActivities(pendingActivities);
  const displayCompletedActivities = getFilteredActivities(completedActivities);

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-slate-800 dark:text-slate-100 mb-2">Activities</h1>
        <p className="text-slate-600 dark:text-slate-400">Track and complete your assignments</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <button
            key={index}
            onClick={() => handleStatClick(stat.filter)}
            className={`bg-gradient-to-br ${stat.color} text-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all text-left ${
              selectedFilter === stat.filter ? 'ring-4 ring-white dark:ring-slate-900 ring-offset-2' : ''
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              {stat.icon === 'completed' && <CheckCircle className="w-8 h-8 opacity-80" />}
              {stat.icon === 'in-progress' && <Clock className="w-8 h-8 opacity-80" />}
              {stat.icon === 'pending' && <AlertCircle className="w-8 h-8 opacity-80" />}
              {stat.icon === 'all' && <Circle className="w-8 h-8 opacity-80" />}
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <span className="text-2xl">{stat.value}</span>
              </div>
            </div>
            <div className="text-white/90">{stat.label}</div>
          </button>
        ))}
      </div>

      {/* Search and Filter */}
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
          <span className="text-slate-600 dark:text-slate-400 text-sm">Filtering by:</span>
          <Badge className="bg-blue-500">
            {selectedFilter === 'in-progress' ? 'In Progress' : selectedFilter.charAt(0).toUpperCase() + selectedFilter.slice(1)}
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
      <Tabs value={selectedTab} onValueChange={(v) => setSelectedTab(v as 'pending' | 'completed')} className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="pending">Pending ({pendingActivities.length})</TabsTrigger>
          <TabsTrigger value="completed">Completed ({completedActivities.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="mt-6 space-y-4">
          {displayPendingActivities.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-slate-400 dark:text-slate-500 mb-2">No pending activities found</div>
              <div className="text-slate-600 dark:text-slate-400">Try adjusting your search or filters</div>
            </div>
          ) : (
            displayPendingActivities.map((activity) => (
              <div
                key={activity.id}
                onClick={() => setSelectedActivity(activity)}
                className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden hover:shadow-xl transition-all cursor-pointer"
              >
                <div className="p-6">
                  <div className="flex items-start gap-6">
                    {/* Icon */}
                    <div className={`w-16 h-16 bg-gradient-to-br ${activity.color} rounded-xl flex items-center justify-center text-3xl shadow-lg flex-shrink-0`}>
                      {activity.icon}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            {getStatusIcon(activity.status)}
                            <h3 className="text-slate-800 dark:text-slate-100">{activity.title}</h3>
                          </div>
                          <p className="text-slate-600 dark:text-slate-400 text-sm mb-3">
                            {activity.description}
                          </p>
                          <div className="flex items-center gap-3 flex-wrap">
                            <Badge variant="outline" className="border-slate-300 dark:border-slate-600">
                              {activity.type}
                            </Badge>
                            <Badge variant="outline" className="border-slate-300 dark:border-slate-600">
                              {activity.subject}
                            </Badge>
                            {getPriorityBadge(activity.priority)}
                          </div>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      {activity.status === 'in-progress' && activity.totalQuestions && (
                        <div className="mb-4">
                          <div className="flex items-center justify-between text-sm mb-2">
                            <span className="text-slate-600 dark:text-slate-400">
                              Progress: {activity.progress}/{activity.totalQuestions} questions
                            </span>
                            <span className="text-slate-800 dark:text-slate-200">
                              {Math.round((activity.progress! / activity.totalQuestions) * 100)}%
                            </span>
                          </div>
                          <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                            <div
                              className={`bg-gradient-to-r ${activity.color} h-2 rounded-full transition-all`}
                              style={{ width: `${(activity.progress! / activity.totalQuestions) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      )}

                      {/* Footer */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                            <Calendar className="w-4 h-4" />
                            <span>Due: {activity.dueDate}</span>
                          </div>
                          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                            <span className="text-yellow-500">⭐</span>
                            <span>{activity.points} points</span>
                          </div>
                        </div>
                        <Button 
                          className={`bg-gradient-to-r ${activity.color}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedActivity(activity);
                          }}
                        >
                          {activity.status === 'in-progress' ? 'Continue' : 'Start Activity'}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </TabsContent>

        <TabsContent value="completed" className="mt-6 space-y-4">
          {displayCompletedActivities.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-slate-400 dark:text-slate-500 mb-2">No completed activities found</div>
              <div className="text-slate-600 dark:text-slate-400">Complete some activities to see them here</div>
            </div>
          ) : (
            displayCompletedActivities.map((activity) => (
              <div
                key={activity.id}
                onClick={() => setSelectedActivity(activity)}
                className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden hover:shadow-xl transition-all cursor-pointer"
              >
                <div className="p-6">
                  <div className="flex items-start gap-6">
                    {/* Icon */}
                    <div className={`w-16 h-16 bg-gradient-to-br ${activity.color} rounded-xl flex items-center justify-center text-3xl shadow-lg flex-shrink-0 relative`}>
                      {activity.icon}
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-5 h-5 text-white" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="text-slate-800 dark:text-slate-100 mb-2">{activity.title}</h3>
                          <p className="text-slate-600 dark:text-slate-400 text-sm mb-3">
                            {activity.description}
                          </p>
                          <div className="flex items-center gap-3 flex-wrap">
                            <Badge variant="outline" className="border-slate-300 dark:border-slate-600">
                              {activity.type}
                            </Badge>
                            <Badge variant="outline" className="border-slate-300 dark:border-slate-600">
                              {activity.subject}
                            </Badge>
                            <Badge className="bg-emerald-500 hover:bg-emerald-600">
                              Grade: {activity.grade}
                            </Badge>
                          </div>
                        </div>
                      </div>

                      {/* Score Display */}
                      <div className="bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 border border-emerald-200 dark:border-emerald-800/30 rounded-xl p-4 mb-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-slate-600 dark:text-slate-400 text-sm mb-1">Your Score</div>
                            <div className="text-2xl text-emerald-600 dark:text-emerald-400">{activity.score}%</div>
                          </div>
                          <div className="text-right">
                            <div className="text-slate-600 dark:text-slate-400 text-sm mb-1">Points Earned</div>
                            <div className="text-xl text-slate-800 dark:text-slate-200">+{activity.points}</div>
                          </div>
                        </div>
                      </div>

                      {/* Footer */}
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-slate-500 dark:text-slate-400">
                          Completed {activity.completedDate}
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
                              setSelectedActivity(activity);
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
            alert(`Starting activity: ${selectedActivity.title}`);
            setSelectedActivity(null);
          }}
        />
      )}
    </div>
  );
}
