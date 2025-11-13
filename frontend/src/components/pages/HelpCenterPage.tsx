import { ArrowLeft, Search, BookOpen, Video, FileText, MessageCircle } from 'lucide-react';
import { Input } from '../ui/input';
import { useState } from 'react';

interface HelpCenterPageProps {
  onNavigateToHome: () => void;
  onNavigateToLogin: () => void;
  onNavigateToSignup: () => void;
}

export function HelpCenterPage({ onNavigateToHome, onNavigateToLogin, onNavigateToSignup }: HelpCenterPageProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    {
      icon: BookOpen,
      title: 'Getting Started',
      description: 'Learn the basics of using EduAid',
      articles: 12,
      color: 'from-blue-500 to-indigo-600',
    },
    {
      icon: Video,
      title: 'Video Tutorials',
      description: 'Step-by-step video guides',
      articles: 8,
      color: 'from-purple-500 to-pink-600',
    },
    {
      icon: FileText,
      title: 'Account & Billing',
      description: 'Manage your account and subscription',
      articles: 15,
      color: 'from-emerald-500 to-green-600',
    },
    {
      icon: MessageCircle,
      title: 'Troubleshooting',
      description: 'Solutions to common issues',
      articles: 20,
      color: 'from-yellow-500 to-orange-600',
    },
  ];

  const popularArticles = [
    'How do I create a student account?',
    'How to track my child\'s progress',
    'What devices are supported?',
    'How do I change my subscription plan?',
    'Resetting your password',
    'Understanding achievement badges',
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <button
          onClick={onNavigateToHome}
          className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </button>

        {/* Hero */}
        <div className="text-center mb-12">
          <h1 className="text-4xl text-slate-800 dark:text-slate-100 mb-3">Help Center</h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto mb-6">
            Find answers to your questions and get the most out of EduAid
          </p>

          {/* Search */}
          <div className="max-w-2xl mx-auto relative">
            <Input
              placeholder="Search for help..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 py-6 text-base dark:bg-slate-800 dark:border-slate-700"
            />
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        {/* Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <div
                key={index}
                className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all cursor-pointer group"
              >
                <div className={`w-12 h-12 bg-gradient-to-br ${category.color} rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg text-slate-800 dark:text-slate-100 mb-1.5">{category.title}</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mb-2 leading-relaxed">{category.description}</p>
                <div className="text-xs text-blue-600 dark:text-blue-400">{category.articles} articles</div>
              </div>
            );
          })}
        </div>

        {/* Popular Articles */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 mb-16">
          <h2 className="text-xl text-slate-800 dark:text-slate-100 mb-4">Popular Articles</h2>
          <div className="space-y-3">
            {popularArticles.map((article, index) => (
              <div
                key={index}
                className="flex items-center gap-2.5 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors cursor-pointer group"
              >
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-slate-700 dark:text-slate-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {article}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Support */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl p-6 text-white">
            <h3 className="text-xl mb-2">Can't Find What You Need?</h3>
            <p className="text-sm text-white/90 mb-4">Our support team is here to help you.</p>
            <button className="px-5 py-2.5 bg-white text-indigo-600 rounded-lg hover:bg-white/90 transition-colors text-sm">
              Contact Support
            </button>
          </div>
          <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl p-6 text-white">
            <h3 className="text-xl mb-2">Join Our Community</h3>
            <p className="text-sm text-white/90 mb-4">Connect with other users and share tips.</p>
            <button className="px-5 py-2.5 bg-white text-purple-600 rounded-lg hover:bg-white/90 transition-colors text-sm">
              Visit Forums
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
