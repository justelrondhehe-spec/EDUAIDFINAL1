import { Check, Star, Zap, Crown, ArrowLeft } from 'lucide-react';
import { Button } from '../ui/button';

interface PricingPageProps {
  onNavigateToHome: () => void;
  onNavigateToLogin: () => void;
  onNavigateToSignup: () => void;
}

export function PricingPage({ onNavigateToHome, onNavigateToLogin, onNavigateToSignup }: PricingPageProps) {
  const plans = [
    {
      name: 'Free',
      icon: Star,
      price: '$0',
      period: 'forever',
      description: 'Perfect for getting started',
      features: [
        'Access to 50+ basic lessons',
        'Limited progress tracking',
        'Community forums',
        'Basic support',
        'Mobile app access',
      ],
      notIncluded: [
        'Advanced lessons',
        'Personalized learning paths',
        'Priority support',
        'Offline access',
      ],
      color: 'from-slate-500 to-slate-600',
      popular: false,
    },
    {
      name: 'Student',
      icon: Zap,
      price: '$9.99',
      period: 'per month',
      description: 'Best for individual learners',
      features: [
        'Access to 500+ lessons',
        'Full progress tracking',
        'Personalized learning paths',
        'Achievement badges',
        'Priority support',
        'Offline access',
        'Ad-free experience',
        'Monthly reports',
      ],
      notIncluded: [
        'Multiple student accounts',
        'Teacher dashboard',
      ],
      color: 'from-blue-500 to-indigo-600',
      popular: true,
    },
    {
      name: 'Family',
      icon: Crown,
      price: '$24.99',
      period: 'per month',
      description: 'Ideal for families',
      features: [
        'Everything in Student plan',
        'Up to 5 student accounts',
        'Parental dashboard',
        'Custom learning goals',
        'Advanced analytics',
        'Family progress reports',
        'Dedicated support',
        'Early access to new features',
      ],
      notIncluded: [],
      color: 'from-purple-500 to-pink-600',
      popular: false,
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
          <h1 className="text-4xl text-slate-800 dark:text-slate-100 mb-3">Simple, Transparent Pricing</h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            Choose the perfect plan for your learning journey. All plans include a 14-day free trial.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            return (
              <div
                key={index}
                className={`bg-white dark:bg-slate-800 rounded-xl border-2 ${
                  plan.popular
                    ? 'border-blue-500 dark:border-blue-400'
                    : 'border-slate-200 dark:border-slate-700'
                } p-6 hover:shadow-lg transition-all relative`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full text-xs">
                    Most Popular
                  </div>
                )}

                <div className={`w-12 h-12 bg-gradient-to-br ${plan.color} rounded-lg flex items-center justify-center mb-4`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>

                <h3 className="text-xl text-slate-800 dark:text-slate-100 mb-1.5">{plan.name}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">{plan.description}</p>

                <div className="mb-4">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-3xl text-slate-800 dark:text-slate-100">{plan.price}</span>
                    <span className="text-sm text-slate-600 dark:text-slate-400">/{plan.period}</span>
                  </div>
                </div>

                <Button
                  onClick={onNavigateToSignup}
                  className={`w-full mb-6 ${
                    plan.popular
                      ? 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700'
                      : ''
                  }`}
                  variant={plan.popular ? 'default' : 'outline'}
                  size="sm"
                >
                  {plan.price === '$0' ? 'Get Started Free' : 'Start Free Trial'}
                </Button>

                <div className="space-y-2.5">
                  <div className="text-xs text-slate-700 dark:text-slate-300 mb-2">What's included:</div>
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span className="text-xs text-slate-700 dark:text-slate-300">{feature}</span>
                    </div>
                  ))}
                  {plan.notIncluded.length > 0 && (
                    <>
                      <div className="text-xs text-slate-700 dark:text-slate-300 mt-4 mb-2">Not included:</div>
                      {plan.notIncluded.map((feature, i) => (
                        <div key={i} className="flex items-start gap-2 opacity-50">
                          <span className="text-slate-400 dark:text-slate-500">✕</span>
                          <span className="text-xs text-slate-600 dark:text-slate-400">{feature}</span>
                        </div>
                      ))}
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl p-8 text-center text-white">
          <h2 className="text-2xl mb-2">Need a Custom Plan?</h2>
          <p className="text-base text-white/90 mb-6 max-w-2xl mx-auto">
            For schools and large organizations, we offer custom enterprise plans with additional features and support.
          </p>
        </div>
      </div>
    </div>
  );
}
