import { ArrowLeft, Briefcase, MapPin, Clock, ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';

interface CareersPageProps {
  onNavigateToHome: () => void;
  onNavigateToLogin: () => void;
  onNavigateToSignup: () => void;
}

export function CareersPage({ onNavigateToHome, onNavigateToLogin, onNavigateToSignup }: CareersPageProps) {
  const positions = [
    {
      title: 'Senior Curriculum Developer',
      department: 'Education',
      location: 'Remote',
      type: 'Full-time',
      description: 'Lead the development of engaging educational content for K-8 students.',
      color: 'from-blue-500 to-indigo-600',
    },
    {
      title: 'Frontend Engineer',
      department: 'Engineering',
      location: 'San Francisco, CA',
      type: 'Full-time',
      description: 'Build beautiful, accessible interfaces that delight students and educators.',
      color: 'from-purple-500 to-pink-600',
    },
    {
      title: 'UX/UI Designer',
      department: 'Design',
      location: 'Remote',
      type: 'Full-time',
      description: 'Design intuitive experiences for learners of all ages and abilities.',
      color: 'from-emerald-500 to-green-600',
    },
    {
      title: 'Customer Success Manager',
      department: 'Customer Success',
      location: 'New York, NY',
      type: 'Full-time',
      description: 'Help schools and families get the most out of EduAid.',
      color: 'from-yellow-500 to-orange-600',
    },
    {
      title: 'Content Marketing Manager',
      department: 'Marketing',
      location: 'Remote',
      type: 'Full-time',
      description: 'Tell our story and help families discover the power of EduAid.',
      color: 'from-pink-500 to-rose-600',
    },
    {
      title: 'Education Research Analyst',
      department: 'Research',
      location: 'Boston, MA',
      type: 'Contract',
      description: 'Analyze learning data to improve educational outcomes.',
      color: 'from-cyan-500 to-blue-600',
    },
  ];

  const benefits = [
    {
      icon: '🏥',
      title: 'Health & Wellness',
      description: 'Comprehensive health, dental, and vision insurance',
    },
    {
      icon: '🏖️',
      title: 'Flexible Time Off',
      description: 'Unlimited PTO and flexible work arrangements',
    },
    {
      icon: '💰',
      title: 'Competitive Salary',
      description: 'Fair compensation with equity options',
    },
    {
      icon: '📚',
      title: 'Learning Budget',
      description: 'Annual budget for professional development',
    },
    {
      icon: '🏡',
      title: 'Remote-First',
      description: 'Work from anywhere with flexible hours',
    },
    {
      icon: '👶',
      title: 'Parental Leave',
      description: 'Generous parental leave for all parents',
    },
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
        <div className="text-center mb-16">
          <h1 className="text-4xl text-slate-800 dark:text-slate-100 mb-3">Join Our Team</h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            Help us transform education and make a difference in the lives of students worldwide
          </p>
        </div>

        {/* Benefits */}
        <div className="mb-16">
          <h2 className="text-2xl text-slate-800 dark:text-slate-100 mb-6 text-center">Why Work at EduAid?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700"
              >
                <div className="text-3xl mb-3">{benefit.icon}</div>
                <h3 className="text-base text-slate-800 dark:text-slate-100 mb-1.5">{benefit.title}</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Open Positions */}
        <div className="mb-12">
          <h2 className="text-2xl text-slate-800 dark:text-slate-100 mb-6">Open Positions</h2>
          <div className="space-y-4">
            {positions.map((position, index) => (
              <div
                key={index}
                className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all group"
              >
                <div className="flex items-start justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`w-10 h-10 bg-gradient-to-br ${position.color} rounded-lg flex items-center justify-center`}>
                        <Briefcase className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg text-slate-800 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {position.title}
                        </h3>
                        <div className="text-sm text-slate-600 dark:text-slate-400">{position.department}</div>
                      </div>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-3 leading-relaxed">{position.description}</p>
                    <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{position.location}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{position.type}</span>
                      </div>
                    </div>
                  </div>
                  <Button className={`bg-gradient-to-r ${position.color}`} size="sm">
                    Apply Now
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl p-8 text-center text-white">
          <h2 className="text-2xl mb-2">Don't See the Right Role?</h2>
          <p className="text-base text-white/90 mb-6 max-w-2xl mx-auto">
            We're always looking for talented individuals. Send us your resume and let's talk!
          </p>
          <Button className="bg-white text-indigo-600 hover:bg-white/90" size="sm">
            Send Your Resume
          </Button>
        </div>
      </div>
    </div>
  );
}
