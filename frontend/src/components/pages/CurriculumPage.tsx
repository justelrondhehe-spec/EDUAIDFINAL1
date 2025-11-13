import { BookOpen, Calculator, Palette, Globe, Music, Activity, ArrowLeft } from 'lucide-react';
import { Button } from '../ui/button';

interface CurriculumPageProps {
  onNavigateToHome: () => void;
  onNavigateToLogin: () => void;
  onNavigateToSignup: () => void;
}

export function CurriculumPage({ onNavigateToHome, onNavigateToLogin, onNavigateToSignup }: CurriculumPageProps) {
  const subjects = [
    {
      icon: BookOpen,
      name: 'Reading & Language Arts',
      color: 'from-blue-500 to-indigo-600',
      topics: [
        'Phonics & Letter Recognition',
        'Reading Comprehension',
        'Vocabulary Building',
        'Grammar & Punctuation',
        'Creative Writing',
        'Literature Analysis',
      ],
      grades: 'K-8',
      lessons: 150,
    },
    {
      icon: Calculator,
      name: 'Mathematics',
      color: 'from-emerald-500 to-green-600',
      topics: [
        'Number Sense & Operations',
        'Algebra & Patterns',
        'Geometry & Measurement',
        'Data & Probability',
        'Problem Solving',
        'Mental Math',
      ],
      grades: 'K-8',
      lessons: 120,
    },
    {
      icon: Globe,
      name: 'Science',
      color: 'from-purple-500 to-pink-600',
      topics: [
        'Life Science',
        'Earth Science',
        'Physical Science',
        'Scientific Method',
        'Experiments & Labs',
        'Environmental Science',
      ],
      grades: 'K-8',
      lessons: 100,
    },
    {
      icon: Activity,
      name: 'Social Studies',
      color: 'from-yellow-500 to-orange-600',
      topics: [
        'History & Culture',
        'Geography',
        'Civics & Government',
        'Economics',
        'Community & Society',
        'World Cultures',
      ],
      grades: 'K-8',
      lessons: 80,
    },
    {
      icon: Palette,
      name: 'Arts & Creativity',
      color: 'from-pink-500 to-rose-600',
      topics: [
        'Visual Arts',
        'Digital Art',
        'Music Appreciation',
        'Creative Expression',
        'Art History',
        'Project-Based Learning',
      ],
      grades: 'K-8',
      lessons: 60,
    },
    {
      icon: Music,
      name: 'Life Skills',
      color: 'from-cyan-500 to-blue-600',
      topics: [
        'Social-Emotional Learning',
        'Critical Thinking',
        'Problem Solving',
        'Communication Skills',
        'Digital Citizenship',
        'Health & Wellness',
      ],
      grades: 'K-8',
      lessons: 50,
    },
  ];

  const gradeOverview = [
    {
      grade: 'Kindergarten',
      focus: 'Foundation skills in reading, numbers, and social skills',
      hours: '2-3 hours/week',
    },
    {
      grade: 'Grades 1-2',
      focus: 'Building literacy, basic math, and science exploration',
      hours: '3-4 hours/week',
    },
    {
      grade: 'Grades 3-5',
      focus: 'Advanced reading, multiplication, and critical thinking',
      hours: '4-5 hours/week',
    },
    {
      grade: 'Grades 6-8',
      focus: 'Complex concepts, research skills, and project work',
      hours: '5-6 hours/week',
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
          <h1 className="text-4xl text-slate-800 dark:text-slate-100 mb-3">Comprehensive Curriculum</h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            Aligned with educational standards, designed for success
          </p>
        </div>

        {/* Subject Areas */}
        <div className="mb-16">
          <h2 className="text-2xl text-slate-800 dark:text-slate-100 mb-6">Subject Areas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subjects.map((subject, index) => {
              const Icon = subject.icon;
              return (
                <div
                  key={index}
                  className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all"
                >
                  <div className={`w-12 h-12 bg-gradient-to-br ${subject.color} rounded-lg flex items-center justify-center mb-3`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg text-slate-800 dark:text-slate-100 mb-2">{subject.name}</h3>
                  <div className="flex items-center gap-3 text-xs text-slate-600 dark:text-slate-400 mb-3">
                    <span>Grades: {subject.grades}</span>
                    <span>•</span>
                    <span>{subject.lessons} lessons</span>
                  </div>
                  <ul className="space-y-1.5">
                    {subject.topics.map((topic, i) => (
                      <li key={i} className="text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2">
                        <span className="text-blue-500 mt-0.5">•</span>
                        <span>{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>

        {/* Grade Level Overview */}
        <div className="mb-12">
          <h2 className="text-2xl text-slate-800 dark:text-slate-100 mb-6">Grade Level Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {gradeOverview.map((level, index) => (
              <div
                key={index}
                className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700"
              >
                <h3 className="text-xl text-slate-800 dark:text-slate-100 mb-2">{level.grade}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">{level.focus}</p>
                <div className="inline-block px-3 py-1.5 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400 text-xs">
                  Recommended: {level.hours}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Learning Approach */}
        <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl p-8 text-white">
          <h2 className="text-2xl mb-4 text-center">Our Learning Approach</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-lg mb-1.5">Standards-Aligned</h3>
              <p className="text-sm text-white/90">Curriculum meets national and state educational standards</p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">👥</span>
              </div>
              <h3 className="text-lg mb-1.5">Expert-Designed</h3>
              <p className="text-sm text-white/90">Created by certified teachers and education specialists</p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🔄</span>
              </div>
              <h3 className="text-lg mb-1.5">Continuously Updated</h3>
              <p className="text-sm text-white/90">Regular updates to keep content fresh and relevant</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
