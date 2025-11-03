import { Calendar, Clock, CheckCircle, AlertCircle, Circle, Filter, Search, Upload, FileText } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

export function Activities() {
  const activities = [
    {
      id: 1,
      title: 'Spelling Bee Practice',
      description: 'Complete 20 spelling words from this week\'s lesson',
      type: 'Quiz',
      subject: 'Reading',
      dueDate: 'Today, 5:00 PM',
      dueTimestamp: new Date().getTime() + 3600000,
      status: 'pending',
      priority: 'high',
      points: 50,
      progress: 0,
      totalQuestions: 20,
      icon: '✍️',
      color: 'from-red-500 to-pink-600',
    },
    {
      id: 2,
      title: 'Math Problem Set #5',
      description: 'Solve addition and subtraction problems up to 20',
      type: 'Assignment',
      subject: 'Math',
      dueDate: 'Tomorrow, 3:00 PM',
      dueTimestamp: new Date().getTime() + 86400000,
      status: 'in-progress',
      priority: 'medium',
      points: 75,
      progress: 12,
      totalQuestions: 15,
      icon: '➕',
      color: 'from-blue-500 to-indigo-600',
    },
    {
      id: 3,
      title: 'Story Writing: My Pet',
      description: 'Write a short story about your favorite pet or animal',
      type: 'Creative',
      subject: 'Writing',
      dueDate: 'Friday, 11:59 PM',
      dueTimestamp: new Date().getTime() + 259200000,
      status: 'in-progress',
      priority: 'low',
      points: 100,
      progress: 5,
      totalQuestions: 10,
      icon: '📝',
      color: 'from-purple-500 to-purple-600',
    },
    {
      id: 4,
      title: 'Rhyming Pairs Match',
      description: 'Match rhyming words together',
      type: 'Game',
      subject: 'Reading',
      dueDate: 'Completed',
      status: 'completed',
      priority: 'medium',
      points: 50,
      grade: 'A+',
      score: 98,
      completedDate: '2 days ago',
      icon: '🎯',
      color: 'from-emerald-500 to-emerald-600',
    },
    {
      id: 5,
      title: 'Color Recognition Quiz',
      description: 'Identify colors and their names',
      type: 'Quiz',
      subject: 'Visual Arts',
      dueDate: 'Completed',
      status: 'completed',
      priority: 'low',
      points: 40,
      grade: 'A',
      score: 92,
      completedDate: '5 days ago',
      icon: '🎨',
      color: 'from-cyan-500 to-cyan-600',
    },
    {
      id: 6,
      title: 'Shape Sorting Activity',
      description: 'Sort shapes by type and color',
      type: 'Interactive',
      subject: 'Math',
      dueDate: 'Next Week',
      dueTimestamp: new Date().getTime() + 604800000,
      status: 'pending',
      priority: 'low',
      points: 30,
      progress: 0,
      totalQuestions: 12,
      icon: '🔶',
      color: 'from-yellow-500 to-orange-500',
    },
  ];

  const stats = [
    { label: 'Total Activities', value: '24', icon: FileText, color: 'from-blue-500 to-blue-600' },
    { label: 'Completed', value: '12', icon: CheckCircle, color: 'from-emerald-500 to-emerald-600' },
    { label: 'In Progress', value: '5', icon: Clock, color: 'from-yellow-500 to-orange-500' },
    { label: 'Pending', value: '7', icon: AlertCircle, color: 'from-red-500 to-pink-600' },
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

  const pendingActivities = activities.filter(a => a.status === 'pending' || a.status === 'in-progress');
  const completedActivities = activities.filter(a => a.status === 'completed');

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-slate-800 dark:text-slate-100 mb-2">Activities</h1>
        <p className="text-slate-600 dark:text-slate-400">Track and complete your assignments</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className={`bg-gradient-to-br ${stat.color} text-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all`}
            >
              <div className="flex items-center justify-between mb-2">
                <Icon className="w-8 h-8 opacity-80" />
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                  <span className="text-2xl">{stat.value}</span>
                </div>
              </div>
              <div className="text-white/90">{stat.label}</div>
            </div>
          );
        })}
      </div>

      {/* Search and Filter */}
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Input
            placeholder="Search activities..."
            className="pl-10 dark:bg-slate-800 dark:border-slate-700"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>
        <Button variant="outline" className="dark:bg-slate-800 dark:border-slate-700">
          <Filter className="w-4 h-4 mr-2" />
          Filter
        </Button>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="pending" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="pending">Pending ({pendingActivities.length})</TabsTrigger>
          <TabsTrigger value="completed">Completed ({completedActivities.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="mt-6 space-y-4">
          {pendingActivities.map((activity) => (
            <div
              key={activity.id}
              className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden hover:shadow-xl transition-all"
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
                    {activity.status === 'in-progress' && (
                      <div className="mb-4">
                        <div className="flex items-center justify-between text-sm mb-2">
                          <span className="text-slate-600 dark:text-slate-400">
                            Progress: {activity.progress}/{activity.totalQuestions} questions
                          </span>
                          <span className="text-slate-800 dark:text-slate-200">
                            {Math.round((activity.progress / activity.totalQuestions) * 100)}%
                          </span>
                        </div>
                        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                          <div
                            className={`bg-gradient-to-r ${activity.color} h-2 rounded-full transition-all`}
                            style={{ width: `${(activity.progress / activity.totalQuestions) * 100}%` }}
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
                      <Button className={`bg-gradient-to-r ${activity.color}`}>
                        {activity.status === 'in-progress' ? 'Continue' : 'Start Activity'}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </TabsContent>

        <TabsContent value="completed" className="mt-6 space-y-4">
          {completedActivities.map((activity) => (
            <div
              key={activity.id}
              className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden hover:shadow-xl transition-all"
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
                        <Button variant="outline" size="sm">
                          View Feedback
                        </Button>
                        <Button variant="outline" size="sm">
                          Retake
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
