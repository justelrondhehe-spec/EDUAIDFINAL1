import { BookOpen, Users, Award, TrendingUp, Palette, Gamepad2, Globe, Shield, CheckCircle, ArrowLeft } from 'lucide-react';
import { Button } from '../ui/button';

interface FeaturesPageProps {
  onNavigateToHome: () => void;
  onNavigateToLogin: () => void;
  onNavigateToSignup: () => void;
}

export function FeaturesPage({ onNavigateToHome, onNavigateToLogin, onNavigateToSignup }: FeaturesPageProps) {
  const features = [
    {
      icon: BookOpen,
      title: 'Interactive Lessons',
      description: 'Engaging, age-appropriate content designed by education experts',
      details: [
        '500+ interactive lessons across all subjects',
        'Adaptive learning technology',
        'Multimedia content (videos, games, quizzes)',
        'Regular content updates',
      ],
      color: 'from-blue-500 to-indigo-600',
    },
    {
      icon: Users,
      title: 'Collaborative Learning',
      description: 'Connect and learn together in a safe environment',
      details: [
        'Virtual classrooms',
        'Group projects and activities',
        'Peer-to-peer learning',
        'Safe messaging system',
      ],
      color: 'from-purple-500 to-pink-600',
    },
    {
      icon: Award,
      title: 'Progress Tracking',
      description: 'Monitor achievements and celebrate milestones',
      details: [
        'Detailed progress reports',
        '100+ achievement badges',
        'Learning analytics',
        'Parental dashboard',
      ],
      color: 'from-emerald-500 to-green-600',
    },
    {
      icon: TrendingUp,
      title: 'Adaptive Learning',
      description: 'Personalized education paths for every student',
      details: [
        'AI-powered recommendations',
        'Adjusts to learning pace',
        'Identifies knowledge gaps',
        'Custom learning paths',
      ],
      color: 'from-yellow-500 to-orange-600',
    },
    {
      icon: Palette,
      title: 'Creative Tools',
      description: 'Express creativity through various activities',
      details: [
        'Digital art projects',
        'Story writing tools',
        'Music creation',
        'Project showcase',
      ],
      color: 'from-pink-500 to-rose-600',
    },
    {
      icon: Gamepad2,
      title: 'Gamification',
      description: 'Make learning fun with game-like elements',
      details: [
        'Points and rewards system',
        'Leaderboards',
        'Daily challenges',
        'Unlockable content',
      ],
      color: 'from-cyan-500 to-blue-600',
    },
    {
      icon: Globe,
      title: 'Multi-Language Support',
      description: 'Learn in your preferred language',
      details: [
        '15+ languages available',
        'Cultural content adaptation',
        'Language learning tools',
        'Translation assistance',
      ],
      color: 'from-indigo-500 to-purple-600',
    },
    {
      icon: Shield,
      title: 'Safety & Privacy',
      description: 'Secure, ad-free learning environment',
      details: [
        'COPPA compliant',
        'No third-party ads',
        'Content moderation',
        'Secure data encryption',
      ],
      color: 'from-red-500 to-pink-600',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <Button
          variant="ghost"
          onClick={onNavigateToHome}
          className="mb-6 text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>
        <div className="text-center mb-12">
          <h1 className="text-4xl text-slate-800 dark:text-slate-100 mb-3">Powerful Features</h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            Everything you need to provide an exceptional learning experience
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all"
              >
                <div className={`w-12 h-12 bg-gradient-to-br ${feature.color} rounded-lg flex items-center justify-center mb-4`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl text-slate-800 dark:text-slate-100 mb-2">{feature.title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">{feature.description}</p>
                <ul className="space-y-2">
                  {feature.details.map((detail, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-700 dark:text-slate-300">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
