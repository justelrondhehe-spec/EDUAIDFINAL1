import { BookOpen, Users, Award, TrendingUp, Star, Check, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { ThemeToggle } from './ThemeToggle';

export type InfoPage = 'features' | 'pricing' | 'curriculum' | 'about' | 'blog' | 'careers' | 'help-center' | 'contact' | 'privacy-policy';

interface HomePageProps {
  onNavigateToLogin: () => void;
  onNavigateToSignup: () => void;
  onNavigateToInfo: (page: InfoPage) => void;
}

export function HomePage({ onNavigateToLogin, onNavigateToSignup, onNavigateToInfo }: HomePageProps) {
  const features = [
    {
      icon: BookOpen,
      title: 'Interactive Lessons',
      description: 'Engaging, age-appropriate content that makes learning fun and effective',
      color: 'from-blue-500 to-indigo-600',
    },
    {
      icon: Users,
      title: 'Collaborative Learning',
      description: 'Connect with classmates and learn together in a safe environment',
      color: 'from-purple-500 to-pink-600',
    },
    {
      icon: Award,
      title: 'Track Progress',
      description: 'Monitor achievements and celebrate milestones along the way',
      color: 'from-emerald-500 to-green-600',
    },
    {
      icon: TrendingUp,
      title: 'Personalized Path',
      description: 'Adaptive learning that adjusts to each student\'s unique pace',
      color: 'from-yellow-500 to-orange-600',
    },
  ];

  const benefits = [
    'Comprehensive curriculum covering reading, math, and social skills',
    'Parent and guardian monitoring dashboard',
    'Safe, ad-free learning environment',
    'Progress reports and achievement badges',
    'Accessibility features for all learners',
    'Multi-language support',
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Parent',
      text: 'My daughter loves EduAid! Her reading skills have improved so much in just 3 months.',
      avatar: 'SJ',
      color: 'from-pink-500 to-rose-500',
    },
    {
      name: 'Michael Chen',
      role: 'Teacher',
      text: 'The best educational platform I\'ve used. My students are more engaged than ever.',
      avatar: 'MC',
      color: 'from-blue-500 to-indigo-500',
    },
    {
      name: 'Emily Davis',
      role: 'Parent',
      text: 'The progress tracking is excellent. I can see exactly how my son is improving.',
      avatar: 'ED',
      color: 'from-purple-500 to-pink-500',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Navigation */}
      <nav className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200/60 dark:border-slate-700/60 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg text-slate-800 dark:text-slate-100">EduAid</span>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button variant="ghost" size="sm" onClick={onNavigateToLogin}>
              Log In
            </Button>
            <Button 
              size="sm"
              onClick={onNavigateToSignup}
              className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
            >
              Get Started
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-600 dark:text-blue-400 mb-4">
              <Sparkles className="w-3 h-3" />
              <span className="text-xs">Transform Learning into Adventure</span>
            </div>
            <h1 className="text-4xl text-slate-800 dark:text-slate-100 mb-4">
              Make Learning <span className="bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent">Fun & Engaging</span>
            </h1>
            <p className="text-base text-slate-600 dark:text-slate-400 mb-6">
              EduAid is an educational platform designed to help students learn through interactive lessons, engaging activities, and personalized progress tracking.
            </p>
            <div className="flex gap-3">
              <Button 
                onClick={onNavigateToSignup}
                className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
              >
                Start Learning
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
            <div className="flex items-center gap-6 mt-6">
              <div>
                <div className="text-2xl text-slate-800 dark:text-slate-100 mb-0.5">10,000+</div>
                <div className="text-slate-600 dark:text-slate-400 text-xs">Active Students</div>
              </div>
              <div>
                <div className="text-2xl text-slate-800 dark:text-slate-100 mb-0.5">500+</div>
                <div className="text-slate-600 dark:text-slate-400 text-xs">Lessons</div>
              </div>
              <div>
                <div className="text-2xl text-slate-800 dark:text-slate-100 mb-0.5">4.9★</div>
                <div className="text-slate-600 dark:text-slate-400 text-xs">User Rating</div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 rounded-3xl p-8 shadow-2xl">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-4">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full"></div>
                  <div className="flex-1 h-4 bg-white/20 rounded"></div>
                </div>
                <div className="space-y-2">
                  <div className="h-3 bg-white/20 rounded"></div>
                  <div className="h-3 bg-white/20 rounded w-3/4"></div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <div className="w-8 h-8 bg-white/20 rounded-lg mb-2"></div>
                  <div className="h-3 bg-white/20 rounded mb-2"></div>
                  <div className="h-2 bg-white/20 rounded w-2/3"></div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <div className="w-8 h-8 bg-white/20 rounded-lg mb-2"></div>
                  <div className="h-3 bg-white/20 rounded mb-2"></div>
                  <div className="h-2 bg-white/20 rounded w-2/3"></div>
                </div>
              </div>
            </div>
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-yellow-400 rounded-full flex items-center justify-center shadow-xl">
              <span className="text-4xl">🎓</span>
            </div>
            <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-pink-400 rounded-full flex items-center justify-center shadow-xl">
              <span className="text-3xl">✨</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl text-slate-800 dark:text-slate-100 mb-2">
            Everything You Need for Effective Learning
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-400">
            Powerful features designed to engage and inspire young learners
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all group"
              >
                <div className={`w-10 h-10 bg-gradient-to-br ${feature.color} rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-base text-slate-800 dark:text-slate-100 mb-1.5">{feature.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl text-slate-800 dark:text-slate-100 mb-4">
              Why Parents & Teachers Choose EduAid
            </h2>
            <p className="text-base text-slate-600 dark:text-slate-400 mb-6">
              Join thousands of families and educators who trust EduAid to provide quality education.
            </p>
            <div className="space-y-3">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-2.5">
                  <div className="w-5 h-5 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-sm text-slate-700 dark:text-slate-300">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-3">
              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-xl p-4 shadow-lg">
                <div className="text-2xl mb-1.5">📚</div>
                <div className="text-xl mb-0.5">500+</div>
                <div className="text-xs text-white/80">Interactive Lessons</div>
              </div>
              <div className="bg-gradient-to-br from-purple-500 to-pink-600 text-white rounded-xl p-4 shadow-lg">
                <div className="text-2xl mb-1.5">🏆</div>
                <div className="text-xl mb-0.5">100+</div>
                <div className="text-xs text-white/80">Achievement Badges</div>
              </div>
            </div>
            <div className="space-y-3 mt-6">
              <div className="bg-gradient-to-br from-emerald-500 to-green-600 text-white rounded-xl p-4 shadow-lg">
                <div className="text-2xl mb-1.5">👥</div>
                <div className="text-xl mb-0.5">10K+</div>
                <div className="text-xs text-white/80">Happy Students</div>
              </div>
              <div className="bg-gradient-to-br from-yellow-500 to-orange-600 text-white rounded-xl p-4 shadow-lg">
                <div className="text-2xl mb-1.5">⭐</div>
                <div className="text-xl mb-0.5">4.9/5</div>
                <div className="text-xs text-white/80">Average Rating</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl text-slate-800 dark:text-slate-100 mb-2">
            Loved by Students, Parents & Teachers
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-400">
            See what our community has to say
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700"
            >
              <div className="flex items-center gap-0.5 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-sm text-slate-700 dark:text-slate-300 mb-4 leading-relaxed">"{testimonial.text}"</p>
              <div className="flex items-center gap-2.5">
                <div className={`w-9 h-9 bg-gradient-to-br ${testimonial.color} rounded-full flex items-center justify-center text-white text-xs`}>
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="text-sm text-slate-800 dark:text-slate-100">{testimonial.name}</div>
                  <div className="text-xs text-slate-600 dark:text-slate-400">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 rounded-2xl p-10 text-center text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -mr-24 -mt-24"></div>
          <div className="absolute bottom-0 left-0 w-36 h-36 bg-white/10 rounded-full -ml-18 -mb-18"></div>
          <div className="relative z-10">
            <h2 className="text-3xl mb-3">Ready to Start Learning?</h2>
            <p className="text-base text-white/90 mb-6 max-w-2xl mx-auto">
              Join thousands of students already transforming their education with EduAid
            </p>
            <div className="flex gap-3 justify-center">
              <Button 
                onClick={onNavigateToSignup}
                className="bg-white text-indigo-600 hover:bg-white/90"
              >
                Start Learning
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-4 h-4 text-white" />
                </div>
                <span className="text-lg">EduAid</span>
              </div>
              <p className="text-slate-400 text-xs leading-relaxed">
                Making education accessible, engaging, and effective for all learners.
              </p>
            </div>
            <div>
              <h4 className="text-sm mb-3">Product</h4>
              <ul className="space-y-1.5 text-slate-400 text-xs">
                <li><button onClick={() => onNavigateToInfo('features')} className="hover:text-white transition-colors">Features</button></li>
                <li><button onClick={() => onNavigateToInfo('pricing')} className="hover:text-white transition-colors">Pricing</button></li>
                <li><button onClick={() => onNavigateToInfo('curriculum')} className="hover:text-white transition-colors">Curriculum</button></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm mb-3">Company</h4>
              <ul className="space-y-1.5 text-slate-400 text-xs">
                <li><button onClick={() => onNavigateToInfo('about')} className="hover:text-white transition-colors">About</button></li>
                <li><button onClick={() => onNavigateToInfo('blog')} className="hover:text-white transition-colors">Blog</button></li>
                <li><button onClick={() => onNavigateToInfo('careers')} className="hover:text-white transition-colors">Careers</button></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm mb-3">Support</h4>
              <ul className="space-y-1.5 text-slate-400 text-xs">
                <li><button onClick={() => onNavigateToInfo('help-center')} className="hover:text-white transition-colors">Help Center</button></li>
                <li><button onClick={() => onNavigateToInfo('contact')} className="hover:text-white transition-colors">Contact Us</button></li>
                <li><button onClick={() => onNavigateToInfo('privacy-policy')} className="hover:text-white transition-colors">Privacy Policy</button></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-6 text-center text-slate-400 text-xs">
            © 2025 EduAid. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
