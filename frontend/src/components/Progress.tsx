import { Trophy, Target, Flame, Star, TrendingUp, Award, Calendar, BookOpen, Clock, Zap } from 'lucide-react';
import { Card } from './ui/card';
import { Progress as ProgressBar } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

export function Progress() {
  const weeklyStats = [
    { day: 'Mon', hours: 2.5, completed: 4 },
    { day: 'Tue', hours: 3.2, completed: 5 },
    { day: 'Wed', hours: 1.8, completed: 3 },
    { day: 'Thu', hours: 2.9, completed: 4 },
    { day: 'Fri', hours: 3.5, completed: 6 },
    { day: 'Sat', hours: 1.2, completed: 2 },
    { day: 'Sun', hours: 2.1, completed: 3 },
  ];

  const maxHours = Math.max(...weeklyStats.map(s => s.hours));

  const achievements = [
    {
      title: 'First Steps',
      description: 'Complete your first lesson',
      icon: '🎯',
      earned: true,
      date: '3 weeks ago',
      color: 'from-blue-500 to-blue-600',
    },
    {
      title: 'Speed Reader',
      description: 'Complete 5 reading lessons in one week',
      icon: '📚',
      earned: true,
      date: '1 week ago',
      color: 'from-purple-500 to-purple-600',
    },
    {
      title: 'Math Wizard',
      description: 'Score 100% on 3 math activities',
      icon: '🧙‍♂️',
      earned: true,
      date: '5 days ago',
      color: 'from-emerald-500 to-emerald-600',
    },
    {
      title: 'Perfect Week',
      description: 'Complete all activities for 7 days straight',
      icon: '⭐',
      earned: false,
      progress: 5,
      total: 7,
      color: 'from-yellow-500 to-orange-500',
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
      title: 'Helping Hand',
      description: 'Help 5 classmates with activities',
      icon: '🤝',
      earned: false,
      progress: 2,
      total: 5,
      color: 'from-cyan-500 to-cyan-600',
    },
  ];

  const skillProgress = [
    { skill: 'Reading', level: 8, maxLevel: 10, percentage: 80, color: 'bg-blue-500' },
    { skill: 'Writing', level: 6, maxLevel: 10, percentage: 60, color: 'bg-purple-500' },
    { skill: 'Math', level: 7, maxLevel: 10, percentage: 70, color: 'bg-emerald-500' },
    { skill: 'Problem Solving', level: 5, maxLevel: 10, percentage: 50, color: 'bg-yellow-500' },
    { skill: 'Creativity', level: 9, maxLevel: 10, percentage: 90, color: 'bg-pink-500' },
  ];

  const recentActivities = [
    { title: 'Completed "Rhyming Words"', time: '2 hours ago', icon: '✅', color: 'text-emerald-500' },
    { title: 'Started "Counting to 50"', time: '5 hours ago', icon: '▶️', color: 'text-blue-500' },
    { title: 'Earned "Speed Reader" badge', time: '1 day ago', icon: '🏆', color: 'text-yellow-500' },
    { title: 'Completed "Story Writing"', time: '2 days ago', icon: '✅', color: 'text-emerald-500' },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-slate-800 dark:text-slate-100 mb-2">My Progress</h1>
          <p className="text-slate-600 dark:text-slate-400">Track your learning journey and achievements</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-xl shadow-lg">
            <div className="flex items-center gap-2">
              <Flame className="w-5 h-5" />
              <div>
                <div className="text-xs opacity-90">Streak</div>
                <div className="text-lg">12 Days 🔥</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <Trophy className="w-8 h-8 opacity-80" />
            <div className="text-right">
              <div className="text-3xl mb-1">156</div>
              <div className="text-blue-100 text-sm">Total Points</div>
            </div>
          </div>
          <div className="text-sm text-blue-100">Keep learning to earn more!</div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-emerald-500 to-emerald-600 text-white border-0 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <Target className="w-8 h-8 opacity-80" />
            <div className="text-right">
              <div className="text-3xl mb-1">27</div>
              <div className="text-emerald-100 text-sm">Completed</div>
            </div>
          </div>
          <div className="text-sm text-emerald-100">Lessons finished this month</div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <BookOpen className="w-8 h-8 opacity-80" />
            <div className="text-right">
              <div className="text-3xl mb-1">18h</div>
              <div className="text-purple-100 text-sm">Learning Time</div>
            </div>
          </div>
          <div className="text-sm text-purple-100">This week</div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-pink-500 to-rose-500 text-white border-0 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <Award className="w-8 h-8 opacity-80" />
            <div className="text-right">
              <div className="text-3xl mb-1">12</div>
              <div className="text-pink-100 text-sm">Achievements</div>
            </div>
          </div>
          <div className="text-sm text-pink-100">Badges earned</div>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Weekly Activity */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6 dark:bg-slate-800 dark:border-slate-700">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-slate-800 dark:text-slate-100">Weekly Activity</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">Your learning hours this week</p>
                </div>
              </div>
            </div>

            {/* Chart */}
            <div className="space-y-6">
              <div className="flex items-end justify-between gap-3 h-48">
                {weeklyStats.map((stat, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center gap-2">
                    <div className="text-sm text-slate-600 dark:text-slate-400">{stat.completed}</div>
                    <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-t-lg relative flex items-end" style={{ height: '100%' }}>
                      <div
                        className="w-full bg-gradient-to-t from-blue-500 to-indigo-500 rounded-t-lg transition-all hover:from-blue-600 hover:to-indigo-600"
                        style={{ height: `${(stat.hours / maxHours) * 100}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-slate-600 dark:text-slate-400">{stat.day}</div>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="text-slate-600 dark:text-slate-400">
                  Total: <span className="text-slate-800 dark:text-slate-200">17.2 hours</span>
                </div>
                <div className="text-slate-600 dark:text-slate-400">
                  Avg: <span className="text-slate-800 dark:text-slate-200">2.5 hrs/day</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Skills Progress */}
          <Card className="p-6 dark:bg-slate-800 dark:border-slate-700">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-slate-800 dark:text-slate-100">Skills Progress</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm">Your skill development</p>
              </div>
            </div>

            <div className="space-y-5">
              {skillProgress.map((skill, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-slate-700 dark:text-slate-300">{skill.skill}</span>
                    <span className="text-sm text-slate-600 dark:text-slate-400">
                      Level {skill.level}/{skill.maxLevel}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ProgressBar value={skill.percentage} className="h-3" />
                    <span className="text-sm text-slate-600 dark:text-slate-400 w-12 text-right">
                      {skill.percentage}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
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
              {recentActivities.map((activity, index) => (
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
    </div>
  );
}
