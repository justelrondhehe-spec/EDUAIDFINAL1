// frontend/src/components/HelpPage.tsx
import {
  Search,
  Book,
  MessageCircle,
  FileText,
  Mail,
  Phone,
  ChevronRight,
  ArrowLeft,
  Download,
  CheckCircle,
} from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { Page } from "../App";

interface HelpPageProps {
  currentSection: Page;
  onNavigate: (page: Page) => void;
}

export function HelpPage({ currentSection, onNavigate }: HelpPageProps) {
  if (currentSection === "help-getting-started") {
    return <GettingStarted onBack={() => onNavigate("help")} />;
  }

  if (currentSection === "help-user-guide") {
    return <UserGuide onBack={() => onNavigate("help")} />;
  }

  if (currentSection === "help-faqs") {
    return <FAQs onBack={() => onNavigate("help")} />;
  }

  // Main Help Page
  const helpCategories = [
    {
      icon: Book,
      label: "Getting Started",
      count: 12,
      color: "from-blue-500 to-blue-600",
      page: "help-getting-started" as Page,
    },
    {
      icon: FileText,
      label: "User Guides",
      count: 18,
      color: "from-cyan-500 to-cyan-600",
      page: "help-user-guide" as Page,
    },
    {
      icon: MessageCircle,
      label: "FAQs",
      count: 35,
      color: "from-indigo-500 to-indigo-600",
      page: "help-faqs" as Page,
    },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-slate-800 dark:text-slate-100 mb-4">
          How can we help you?
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mb-8">
          Search our knowledge base or browse categories below
        </p>

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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {helpCategories.map((category, index) => {
          const Icon = category.icon;
          return (
            <button
              key={index}
              onClick={() => onNavigate(category.page)}
              className={`bg-gradient-to-br ${category.color} text-white rounded-2xl p-6 hover:shadow-2xl hover:scale-105 transition-all duration-300 group`}
            >
              <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm shadow-lg mb-4">
                <Icon className="w-7 h-7 text-white" />
              </div>
              <div className="text-left">
                <div className="mb-1">{category.label}</div>
                <div className="text-white/80 text-sm">
                  {category.count} articles
                </div>
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
              <h3 className="text-slate-800 dark:text-slate-100">
                Email Support
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                We'll respond within 24 hours
              </p>
            </div>
          </div>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            support@eduaid.com
          </p>
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
              <h3 className="text-slate-800 dark:text-slate-100">
                Phone Support
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Mon-Fri, 9AM - 5PM EST
              </p>
            </div>
          </div>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            1-800-EDU-AID1
          </p>
          <Button className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600">
            <Phone className="w-4 h-4 mr-2" />
            Call Now
          </Button>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Getting Started ---------------- */

function GettingStarted({ onBack }: { onBack: () => void }) {
  const steps = [
    {
      title: "Create Your Account",
      description:
        "Sign up with your email and create a secure password. Verify your email address to get started.",
      icon: "1",
    },
    {
      title: "Complete Your Profile",
      description:
        "Add your personal information, grade level, and learning preferences to personalize your experience.",
      icon: "2",
    },
    {
      title: "Add Your Guardians",
      description:
        "Invite your parents or guardians so they can track your progress and stay involved in your learning.",
      icon: "3",
    },
    {
      title: "Explore Lessons",
      description:
        "Browse available lessons and start learning! Track your progress and earn achievements.",
      icon: "4",
    },
  ];

  const quickTips = [
    "Use the search bar to quickly find lessons and activities",
    "Check the Progress tab to see your learning analytics",
    "Enable notifications to never miss important deadlines",
    "Customize accessibility settings for the best experience",
    "Contact support anytime if you need help",
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
          <p className="text-slate-600 dark:text-slate-400">
            Everything you need to begin your learning journey
          </p>
        </div>
      </div>

      {/* Welcome Section */}
      <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl shadow-lg p-8 mb-8">
        <h2 className="mb-4">Welcome to EduAid! 👋</h2>
        <p className="text-blue-100">
          We're excited to have you here. EduAid is your personalized learning
          platform designed to help you succeed. Follow these simple steps to
          get started and make the most of your learning experience.
        </p>
      </div>

      {/* Steps */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-8 mb-8">
        <h3 className="text-slate-800 dark:text-slate-100 mb-6">
          Step-by-Step Guide
        </h3>
        <div className="space-y-6">
          {steps.map((step, index) => (
            <div key={index} className="flex gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0 text-white">
                {step.icon}
              </div>
              <div>
                <h4 className="text-slate-800 dark:text-slate-100 mb-2">
                  {step.title}
                </h4>
                <p className="text-slate-600 dark:text-slate-400">
                  {step.description}
                </p>
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

/* ---------------- User Guide ---------------- */

function UserGuide({ onBack }: { onBack: () => void }) {
  const guides = [
    {
      title: "Account Management",
      icon: "👤",
      topics: [
        "Creating and verifying your account",
        "Updating your profile information",
        "Changing your password",
        "Managing email preferences",
      ],
    },
    {
      title: "Learning Features",
      icon: "📚",
      topics: [
        "Browsing and searching lessons",
        "Starting and completing lessons",
        "Tracking your progress",
        "Earning achievements and badges",
      ],
    },
    {
      title: "Activities & Assignments",
      icon: "✏️",
      topics: [
        "Viewing assigned activities",
        "Submitting your work",
        "Receiving and reviewing feedback",
        "Managing deadlines",
      ],
    },
    {
      title: "Communication",
      icon: "💬",
      topics: [
        "Messaging teachers",
        "Sharing progress with guardians",
        "Participating in discussions",
        "Getting help and support",
      ],
    },
    {
      title: "Settings & Privacy",
      icon: "⚙️",
      topics: [
        "Customizing your preferences",
        "Managing notifications",
        "Privacy and security settings",
        "Accessibility options",
      ],
    },
    {
      title: "Guardian Features",
      icon: "👨‍👩‍👧",
      topics: [
        "Adding guardians to your account",
        "Setting guardian permissions",
        "Sharing progress reports",
        "Managing guardian access",
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
          <p className="text-slate-600 dark:text-slate-400">
            Comprehensive documentation and guides
          </p>
        </div>
      </div>

      {/* Guide Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {guides.map((guide, index) => (
          <div
            key={index}
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-6 hover:shadow-2xl transition-shadow"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="text-4xl">{guide.icon}</div>
              <h3 className="text-slate-800 dark:text-slate-100">
                {guide.title}
              </h3>
            </div>
            <ul className="space-y-2">
              {guide.topics.map((topic, topicIndex) => (
                <li key={topicIndex} className="flex items-start gap-2">
                  <ChevronRight className="w-4 h-4 text-blue-500 flex-shrink-0 mt-1" />
                  <span className="text-slate-600 dark:text-slate-400">
                    {topic}
                  </span>
                </li>
              ))}
            </ul>
            {/* Read Full Guide button removed so nothing is broken */}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------- FAQs ---------------- */

function FAQs({ onBack }: { onBack: () => void }) {
  const faqCategories = [
    {
      category: "Account & Profile",
      faqs: [
        {
          question: "How do I reset my password?",
          answer:
            'Go to Settings > Privacy & Security > Password & Authentication. Enter your current password and choose a new one. Make sure your new password is at least 8 characters long and includes a mix of letters, numbers, and symbols.',
        },
        {
          question: "Can I change my email address?",
          answer:
            "Yes! Navigate to Settings > Profile Settings and update your email address. You'll need to verify your new email address before the change takes effect.",
        },
        {
          question: "How do I delete my account?",
          answer:
            'Go to Settings > Privacy & Security and scroll to the Danger Zone section. Click "Delete Account" and follow the confirmation steps. Note that this action is permanent and cannot be undone.',
        },
      ],
    },
    {
      category: "Learning & Progress",
      faqs: [
        {
          question: "How do I track my learning progress?",
          answer:
            "Navigate to the Progress tab in the sidebar. Here you'll find detailed analytics about your completed lessons, activity scores, time spent learning, and achievement badges. You can also view weekly and monthly progress reports.",
        },
        {
          question: "What are achievements and how do I earn them?",
          answer:
            "Achievements are badges you earn by completing lessons, maintaining streaks, scoring high on activities, and reaching milestones. You can view all available achievements and your progress toward them in the Progress section.",
        },
        {
          question: "Can I repeat lessons I've already completed?",
          answer:
            "Absolutely! You can revisit any lesson at any time to review the material and reinforce your learning. Your original completion status and scores will be preserved.",
        },
      ],
    },
    {
      category: "Guardians & Privacy",
      faqs: [
        {
          question: "How do I add a guardian to my account?",
          answer:
            'Go to Settings > Guardian Settings and click "Add Guardian". Enter their name, email, phone number, and relationship. You can then set specific permissions for what they can view and manage.',
        },
        {
          question: "What can my guardians see?",
          answer:
            "You control what your guardians can access through permission settings. They can typically view your progress reports, grades, attendance, and communicate with your teachers, but you can customize these permissions.",
        },
        {
          question: "Is my data private and secure?",
          answer:
            "Yes! We take your privacy seriously. Your data is encrypted and stored securely. You control who can see your information through privacy settings. Review our Privacy Policy for complete details.",
        },
      ],
    },
    {
      category: "Technical Support",
      faqs: [
        {
          question: "The app is running slowly. What should I do?",
          answer:
            "Try clearing your browser cache and cookies. If using dark mode or accessibility features, some older devices may experience slower performance. You can also try reducing animations in Settings > Accessibility Settings.",
        },
        {
          question: "How do I enable dark mode?",
          answer:
            'Navigate to Settings > Accessibility Settings and toggle on "Dark Mode". This will change the entire app to a darker color scheme that\'s easier on the eyes in low-light conditions.',
        },
        {
          question: "What browsers are supported?",
          answer:
            "EduAid works best on the latest versions of Chrome, Firefox, Safari, and Edge. We recommend keeping your browser updated for the best experience and security.",
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
          <h1 className="text-slate-800 dark:text-slate-100">
            Frequently Asked Questions
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Quick answers to common questions
          </p>
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
          <div
            key={catIndex}
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-6"
          >
            <h3 className="text-slate-800 dark:text-slate-100 mb-4">
              {category.category}
            </h3>
            <Accordion type="single" collapsible className="w-full">
              {category.faqs.map((faq, faqIndex) => (
                <AccordionItem
                  key={faqIndex}
                  value={`item-${catIndex}-${faqIndex}`}
                >
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

    </div>
  );
}
