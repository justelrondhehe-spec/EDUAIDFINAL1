import { Search, Book, MessageCircle, Video, FileText, Mail, Phone, ExternalLink, ChevronRight, ArrowLeft, Play, Download, CheckCircle } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { Page } from '../App';

interface HelpPageProps {
  currentSection: Page;
  onNavigate: (page: Page) => void;
}

export function HelpPage({ currentSection, onNavigate }: HelpPageProps) {
  if (currentSection === 'help-getting-started') {
    return <GettingStarted onBack={() => onNavigate('help')} />;
  }
  
  if (currentSection === 'help-video-tutorials') {
    return <VideoTutorials onBack={() => onNavigate('help')} />;
  }
  
  if (currentSection === 'help-user-guide') {
    return <UserGuide onBack={() => onNavigate('help')} />;
  }
  
  if (currentSection === 'help-faqs') {
    return <FAQs onBack={() => onNavigate('help')} />;
  }

  // Main Help Page
  const helpCategories = [
    { icon: Book, label: 'Getting Started', count: 12, color: 'from-blue-500 to-blue-600', page: 'help-getting-started' as Page },
    { icon: Video, label: 'Video Tutorials', count: 24, color: 'from-purple-500 to-purple-600', page: 'help-video-tutorials' as Page },
    { icon: FileText, label: 'User Guides', count: 18, color: 'from-cyan-500 to-cyan-600', page: 'help-user-guide' as Page },
    { icon: MessageCircle, label: 'FAQs', count: 35, color: 'from-indigo-500 to-indigo-600', page: 'help-faqs' as Page },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-slate-800 dark:text-slate-100 mb-4">How can we help you?</h1>
        <p className="text-slate-600 dark:text-slate-400 mb-8">Search our knowledge base or browse categories below</p>
        
        {/* Search */}
        <div className="max-w-2xl mx-auto relative">
          <Input 
            placeholder="Search for help articles, tutorials, FAQs..." 
            className="pl-12 pr-4 py-6 text-lg dark:bg-slate-800 dark:border-slate-700"
          />
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      {/* Help Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {helpCategories.map((category, index) => {
          const Icon = category.icon;
          return (
            <button
              key={index}
              onClick={() => onNavigate(category.page)}
              className={`bg-gradient-to-br ${category.color} text-white rounded-2xl p-6 hover:shadow-2xl hover:scale-105 transition-all duration-300 group`}
            >
              <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm shadow-lg mb-4">
                <Icon className="w-7 h-7" />
              </div>
              <div className="text-left">
                <div className="mb-1">{category.label}</div>
                <div className="text-white/80 text-sm">{category.count} articles</div>
              </div>
              <ChevronRight className="w-5 h-5 opacity-70 group-hover:translate-x-1 transition-transform mt-2" />
            </button>
          );
        })}
      </div>

      {/* Contact Support */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
              <Mail className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-slate-800 dark:text-slate-100">Email Support</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm">We'll respond within 24 hours</p>
            </div>
          </div>
          <p className="text-slate-600 dark:text-slate-400 mb-4">support@eduaid.com</p>
          <Button className="w-full bg-gradient-to-r from-blue-500 to-blue-600">
            <Mail className="w-4 h-4 mr-2" />
            Send Email
          </Button>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center">
              <Phone className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-slate-800 dark:text-slate-100">Phone Support</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm">Mon-Fri, 9AM - 5PM EST</p>
            </div>
          </div>
          <p className="text-slate-600 dark:text-slate-400 mb-4">1-800-EDU-AID1</p>
          <Button className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600">
            <Phone className="w-4 h-4 mr-2" />
            Call Now
          </Button>
        </div>
      </div>

      {/* Quick Links */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 text-white rounded-2xl shadow-lg p-8">
        <h3 className="mb-6">Quick Links</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a href="#" className="flex items-center justify-between p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-colors">
            <span>System Status</span>
            <ExternalLink className="w-4 h-4" />
          </a>
          <a href="#" className="flex items-center justify-between p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-colors">
            <span>Release Notes</span>
            <ExternalLink className="w-4 h-4" />
          </a>
          <a href="#" className="flex items-center justify-between p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-colors">
            <span>Community Forum</span>
            <ExternalLink className="w-4 h-4" />
          </a>
          <a href="#" className="flex items-center justify-between p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-colors">
            <span>Privacy Policy</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}

function GettingStarted({ onBack }: { onBack: () => void }) {
  const steps = [
    {
      title: 'Create Your Account',
      description: 'Sign up with your email and create a secure password. Verify your email address to get started.',
      icon: '1',
    },
    {
      title: 'Complete Your Profile',
      description: 'Add your personal information, grade level, and learning preferences to personalize your experience.',
      icon: '2',
    },
    {
      title: 'Add Your Guardians',
      description: 'Invite your parents or guardians so they can track your progress and stay involved in your learning.',
      icon: '3',
    },
    {
      title: 'Explore Lessons',
      description: 'Browse available lessons and start learning! Track your progress and earn achievements.',
      icon: '4',
    },
  ];

  const quickTips = [
    'Use the search bar to quickly find lessons and activities',
    'Check the Progress tab to see your learning analytics',
    'Enable notifications to never miss important deadlines',
    'Customize accessibility settings for the best experience',
    'Contact support anytime if you need help',
  ];

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-slate-600 dark:text-slate-300" />
        </button>
        <div>
          <h1 className="text-slate-800 dark:text-slate-100">Getting Started</h1>
          <p className="text-slate-600 dark:text-slate-400">Everything you need to begin your learning journey</p>
        </div>
      </div>

      {/* Welcome Section */}
      <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl shadow-lg p-8 mb-8">
        <h2 className="mb-4">Welcome to EduAid! 👋</h2>
        <p className="text-blue-100 mb-6">
          We're excited to have you here. EduAid is your personalized learning platform designed to help you succeed. 
          Follow these simple steps to get started and make the most of your learning experience.
        </p>
        <Button className="bg-white text-blue-600 hover:bg-blue-50">
          <Play className="w-4 h-4 mr-2" />
          Watch Welcome Video
        </Button>
      </div>

      {/* Steps */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-8 mb-8">
        <h3 className="text-slate-800 dark:text-slate-100 mb-6">Step-by-Step Guide</h3>
        <div className="space-y-6">
          {steps.map((step, index) => (
            <div key={index} className="flex gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0 text-white">
                {step.icon}
              </div>
              <div>
                <h4 className="text-slate-800 dark:text-slate-100 mb-2">{step.title}</h4>
                <p className="text-slate-600 dark:text-slate-400">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Tips */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-8">
        <h3 className="text-slate-800 dark:text-slate-100 mb-6">Quick Tips</h3>
        <div className="space-y-3">
          {quickTips.map((tip, index) => (
            <div key={index} className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
              <p className="text-slate-600 dark:text-slate-400">{tip}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function VideoTutorials({ onBack }: { onBack: () => void }) {
  const videos = [
    {
      title: 'Platform Overview',
      duration: '5:24',
      description: 'Get a complete tour of EduAid and learn about all the features',
      category: 'Basics',
      thumbnail: 'from-blue-500 to-blue-600',
    },
    {
      title: 'Navigating Lessons',
      duration: '3:15',
      description: 'Learn how to browse, start, and complete lessons effectively',
      category: 'Basics',
      thumbnail: 'from-purple-500 to-purple-600',
    },
    {
      title: 'Tracking Your Progress',
      duration: '4:30',
      description: 'Understand your progress dashboard and analytics',
      category: 'Features',
      thumbnail: 'from-cyan-500 to-cyan-600',
    },
    {
      title: 'Managing Activities',
      duration: '6:12',
      description: 'Complete activities, submit assignments, and review feedback',
      category: 'Features',
      thumbnail: 'from-emerald-500 to-emerald-600',
    },
    {
      title: 'Settings & Customization',
      duration: '7:45',
      description: 'Personalize your account with settings and preferences',
      category: 'Advanced',
      thumbnail: 'from-indigo-500 to-indigo-600',
    },
    {
      title: 'Accessibility Features',
      duration: '5:50',
      description: 'Explore accessibility options for a better learning experience',
      category: 'Advanced',
      thumbnail: 'from-rose-500 to-rose-600',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-slate-600 dark:text-slate-300" />
        </button>
        <div>
          <h1 className="text-slate-800 dark:text-slate-100">Video Tutorials</h1>
          <p className="text-slate-600 dark:text-slate-400">Watch step-by-step video guides</p>
        </div>
      </div>

      {/* Video Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video, index) => (
          <div key={index} className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden hover:shadow-2xl transition-shadow">
            {/* Thumbnail */}
            <div className={`bg-gradient-to-br ${video.thumbnail} h-48 flex items-center justify-center relative`}>
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <Play className="w-8 h-8 text-white ml-1" />
              </div>
              <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/50 backdrop-blur-sm text-white text-sm rounded">
                {video.duration}
              </div>
            </div>
            
            {/* Content */}
            <div className="p-5">
              <div className="inline-block px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs rounded mb-3">
                {video.category}
              </div>
              <h4 className="text-slate-800 dark:text-slate-100 mb-2">{video.title}</h4>
              <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">{video.description}</p>
              <Button className="w-full" variant="outline">
                <Play className="w-4 h-4 mr-2" />
                Watch Now
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function UserGuide({ onBack }: { onBack: () => void }) {
  const guides = [
    {
      title: 'Account Management',
      icon: '👤',
      topics: [
        'Creating and verifying your account',
        'Updating your profile information',
        'Changing your password',
        'Managing email preferences',
      ],
    },
    {
      title: 'Learning Features',
      icon: '📚',
      topics: [
        'Browsing and searching lessons',
        'Starting and completing lessons',
        'Tracking your progress',
        'Earning achievements and badges',
      ],
    },
    {
      title: 'Activities & Assignments',
      icon: '✏️',
      topics: [
        'Viewing assigned activities',
        'Submitting your work',
        'Receiving and reviewing feedback',
        'Managing deadlines',
      ],
    },
    {
      title: 'Communication',
      icon: '💬',
      topics: [
        'Messaging teachers',
        'Sharing progress with guardians',
        'Participating in discussions',
        'Getting help and support',
      ],
    },
    {
      title: 'Settings & Privacy',
      icon: '⚙️',
      topics: [
        'Customizing your preferences',
        'Managing notifications',
        'Privacy and security settings',
        'Accessibility options',
      ],
    },
    {
      title: 'Guardian Features',
      icon: '👨‍👩‍👧',
      topics: [
        'Adding guardians to your account',
        'Setting guardian permissions',
        'Sharing progress reports',
        'Managing guardian access',
      ],
    },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-slate-600 dark:text-slate-300" />
        </button>
        <div className="flex-1">
          <h1 className="text-slate-800 dark:text-slate-100">User Guide</h1>
          <p className="text-slate-600 dark:text-slate-400">Comprehensive documentation and guides</p>
        </div>
        <Button className="bg-gradient-to-r from-blue-500 to-blue-600">
          <Download className="w-4 h-4 mr-2" />
          Download PDF Guide
        </Button>
      </div>

      {/* Guide Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {guides.map((guide, index) => (
          <div key={index} className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-6 hover:shadow-2xl transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="text-4xl">{guide.icon}</div>
              <h3 className="text-slate-800 dark:text-slate-100">{guide.title}</h3>
            </div>
            <ul className="space-y-2">
              {guide.topics.map((topic, topicIndex) => (
                <li key={topicIndex} className="flex items-start gap-2">
                  <ChevronRight className="w-4 h-4 text-blue-500 flex-shrink-0 mt-1" />
                  <span className="text-slate-600 dark:text-slate-400">{topic}</span>
                </li>
              ))}
            </ul>
            <Button variant="outline" className="w-full mt-4">
              Read Full Guide
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

function FAQs({ onBack }: { onBack: () => void }) {
  const faqCategories = [
    {
      category: 'Account & Profile',
      faqs: [
        {
          question: 'How do I reset my password?',
          answer: 'Go to Settings > Privacy & Security > Password & Authentication. Enter your current password and choose a new one. Make sure your new password is at least 8 characters long and includes a mix of letters, numbers, and symbols.',
        },
        {
          question: 'Can I change my email address?',
          answer: 'Yes! Navigate to Settings > Profile Settings and update your email address. You\'ll need to verify your new email address before the change takes effect.',
        },
        {
          question: 'How do I delete my account?',
          answer: 'Go to Settings > Privacy & Security and scroll to the Danger Zone section. Click "Delete Account" and follow the confirmation steps. Note that this action is permanent and cannot be undone.',
        },
      ],
    },
    {
      category: 'Learning & Progress',
      faqs: [
        {
          question: 'How do I track my learning progress?',
          answer: 'Navigate to the Progress tab in the sidebar. Here you\'ll find detailed analytics about your completed lessons, activity scores, time spent learning, and achievement badges. You can also view weekly and monthly progress reports.',
        },
        {
          question: 'What are achievements and how do I earn them?',
          answer: 'Achievements are badges you earn by completing lessons, maintaining streaks, scoring high on activities, and reaching milestones. You can view all available achievements and your progress toward them in the Progress section.',
        },
        {
          question: 'Can I repeat lessons I\'ve already completed?',
          answer: 'Absolutely! You can revisit any lesson at any time to review the material and reinforce your learning. Your original completion status and scores will be preserved.',
        },
      ],
    },
    {
      category: 'Guardians & Privacy',
      faqs: [
        {
          question: 'How do I add a guardian to my account?',
          answer: 'Go to Settings > Guardian Settings and click "Add Guardian". Enter their name, email, phone number, and relationship. You can then set specific permissions for what they can view and manage.',
        },
        {
          question: 'What can my guardians see?',
          answer: 'You control what your guardians can access through permission settings. They can typically view your progress reports, grades, attendance, and communicate with your teachers, but you can customize these permissions.',
        },
        {
          question: 'Is my data private and secure?',
          answer: 'Yes! We take your privacy seriously. Your data is encrypted and stored securely. You control who can see your information through privacy settings. Review our Privacy Policy for complete details.',
        },
      ],
    },
    {
      category: 'Technical Support',
      faqs: [
        {
          question: 'The app is running slowly. What should I do?',
          answer: 'Try clearing your browser cache and cookies. If using dark mode or accessibility features, some older devices may experience slower performance. You can also try reducing animations in Settings > Accessibility Settings.',
        },
        {
          question: 'How do I enable dark mode?',
          answer: 'Navigate to Settings > Accessibility Settings and toggle on "Dark Mode". This will change the entire app to a darker color scheme that\'s easier on the eyes in low-light conditions.',
        },
        {
          question: 'What browsers are supported?',
          answer: 'EduAid works best on the latest versions of Chrome, Firefox, Safari, and Edge. We recommend keeping your browser updated for the best experience and security.',
        },
      ],
    },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-slate-600 dark:text-slate-300" />
        </button>
        <div>
          <h1 className="text-slate-800 dark:text-slate-100">Frequently Asked Questions</h1>
          <p className="text-slate-600 dark:text-slate-400">Quick answers to common questions</p>
        </div>
      </div>

      {/* Search */}
      <div className="mb-8">
        <div className="relative">
          <Input 
            placeholder="Search FAQs..." 
            className="pl-10 dark:bg-slate-800 dark:border-slate-700"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      {/* FAQ Categories */}
      <div className="space-y-6">
        {faqCategories.map((category, catIndex) => (
          <div key={catIndex} className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-6">
            <h3 className="text-slate-800 dark:text-slate-100 mb-4">{category.category}</h3>
            <Accordion type="single" collapsible className="w-full">
              {category.faqs.map((faq, faqIndex) => (
                <AccordionItem key={faqIndex} value={`item-${catIndex}-${faqIndex}`}>
                  <AccordionTrigger className="text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600 dark:text-slate-400">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        ))}
      </div>

      {/* Still Need Help */}
      <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl shadow-lg p-8 mt-8 text-center">
        <h3 className="mb-2">Still need help?</h3>
        <p className="text-blue-100 mb-6">Can't find the answer you're looking for? Our support team is here to help.</p>
        <div className="flex gap-4 justify-center">
          <Button className="bg-white text-blue-600 hover:bg-blue-50">
            <Mail className="w-4 h-4 mr-2" />
            Contact Support
          </Button>
          <Button variant="outline" className="border-white text-white hover:bg-white/10">
            <MessageCircle className="w-4 h-4 mr-2" />
            Live Chat
          </Button>
        </div>
      </div>
    </div>
  );
}
