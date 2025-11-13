import { Heart, Target, Users, Award, ArrowLeft } from 'lucide-react';
import { Button } from '../ui/button';

interface AboutPageProps {
  onNavigateToHome: () => void;
  onNavigateToLogin: () => void;
  onNavigateToSignup: () => void;
}

export function AboutPage({ onNavigateToHome, onNavigateToLogin, onNavigateToSignup }: AboutPageProps) {
  const values = [
    {
      icon: Heart,
      title: 'Passion for Education',
      description: 'We believe every child deserves access to quality education that inspires curiosity and love for learning.',
      color: 'from-red-500 to-pink-600',
    },
    {
      icon: Target,
      title: 'Innovation',
      description: 'We constantly push boundaries to create cutting-edge educational experiences that engage modern learners.',
      color: 'from-blue-500 to-indigo-600',
    },
    {
      icon: Users,
      title: 'Inclusivity',
      description: 'We design for all learners, ensuring our platform is accessible and welcoming to everyone.',
      color: 'from-purple-500 to-pink-600',
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'We maintain the highest standards in content quality, safety, and user experience.',
      color: 'from-emerald-500 to-green-600',
    },
  ];

  const team = [
    {
      name: 'Dr. Sarah Johnson',
      role: 'Chief Education Officer',
      avatar: 'SJ',
      color: 'from-blue-500 to-indigo-500',
    },
    {
      name: 'Michael Chen',
      role: 'Chief Technology Officer',
      avatar: 'MC',
      color: 'from-purple-500 to-pink-500',
    },
    {
      name: 'Emily Rodriguez',
      role: 'Head of Curriculum',
      avatar: 'ER',
      color: 'from-emerald-500 to-green-500',
    },
    {
      name: 'David Kim',
      role: 'Head of Product',
      avatar: 'DK',
      color: 'from-yellow-500 to-orange-500',
    },
  ];

  const stats = [
    { value: '10,000+', label: 'Active Students' },
    { value: '500+', label: 'Lessons' },
    { value: '50+', label: 'Expert Educators' },
    { value: '15+', label: 'Countries' },
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
        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className="text-4xl text-slate-800 dark:text-slate-100 mb-3">About EduAid</h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            We're on a mission to transform education and make learning accessible, engaging, and effective for every student.
          </p>
        </div>

        {/* Story */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-8 border border-slate-200 dark:border-slate-700 mb-16">
          <h2 className="text-2xl text-slate-800 dark:text-slate-100 mb-4">Our Story</h2>
          <div className="prose prose-base dark:prose-invert max-w-none">
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-3 leading-relaxed">
              EduAid was founded in 2020 by a team of passionate educators and technologists who saw a need for better educational tools in the digital age. What started as a small project to help local students during remote learning has grown into a comprehensive platform serving thousands of students worldwide.
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-3 leading-relaxed">
              Our journey began when we noticed that traditional educational approaches weren't reaching all learners. We believed that by combining expert pedagogy with innovative technology, we could create something special—a platform that adapts to each student's unique learning style and pace.
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Today, EduAid serves students across 15 countries, offering hundreds of interactive lessons, personalized learning paths, and a supportive community. But we're just getting started. Our vision is to make quality education accessible to every child, everywhere.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 text-center"
            >
              <div className="text-3xl text-slate-800 dark:text-slate-100 mb-1">{stat.value}</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Values */}
        <div className="mb-16">
          <h2 className="text-2xl text-slate-800 dark:text-slate-100 mb-6 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={index}
                  className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700"
                >
                  <div className={`w-12 h-12 bg-gradient-to-br ${value.color} rounded-lg flex items-center justify-center mb-3`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg text-slate-800 dark:text-slate-100 mb-2">{value.title}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Team */}
        <div className="mb-12">
          <h2 className="text-2xl text-slate-800 dark:text-slate-100 mb-6 text-center">Meet Our Leadership</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700 text-center"
              >
                <div className={`w-20 h-20 bg-gradient-to-br ${member.color} rounded-full flex items-center justify-center text-white text-lg mx-auto mb-3`}>
                  {member.avatar}
                </div>
                <h3 className="text-base text-slate-800 dark:text-slate-100 mb-1">{member.name}</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400">{member.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl p-8 text-center text-white">
          <h2 className="text-2xl mb-2">Join Our Mission</h2>
          <p className="text-base text-white/90 mb-6 max-w-2xl mx-auto">
            We're always looking for passionate individuals to join our team and help us transform education.
          </p>
          <button className="px-6 py-2.5 bg-white text-indigo-600 rounded-lg hover:bg-white/90 transition-colors text-sm">
            View Open Positions
          </button>
        </div>
      </div>
    </div>
  );
}
