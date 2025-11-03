export interface Activity {
  id: number;
  title: string;
  description: string;
  type: string;
  subject: string;
  dueDate: string;
  dueTimestamp?: number;
  status: 'pending' | 'in-progress' | 'completed';
  priority: 'high' | 'medium' | 'low';
  points: number;
  progress?: number;
  totalQuestions?: number;
  grade?: string;
  score?: number;
  completedDate?: string;
  icon: string;
  color: string;
  questions?: {
    id: number;
    question: string;
    type: 'multiple-choice' | 'text' | 'matching';
    options?: string[];
    correctAnswer: string;
  }[];
}

export const activitiesData: Activity[] = [
  {
    id: 1,
    title: 'Spelling Bee Practice',
    description: 'Complete 20 spelling words from this week\'s lesson',
    type: 'Quiz',
    subject: 'Reading',
    dueDate: 'Today, 5:00 PM',
    dueTimestamp: new Date().getTime() + 3600000,
    status: 'pending',
    priority: 'high',
    points: 50,
    progress: 0,
    totalQuestions: 20,
    icon: '✍️',
    color: 'from-red-500 to-pink-600',
    questions: [
      { id: 1, question: 'Spell: cat', type: 'text', correctAnswer: 'cat' },
      { id: 2, question: 'Spell: dog', type: 'text', correctAnswer: 'dog' },
      { id: 3, question: 'Spell: hat', type: 'text', correctAnswer: 'hat' },
    ]
  },
  {
    id: 2,
    title: 'Math Problem Set #5',
    description: 'Solve addition and subtraction problems up to 20',
    type: 'Assignment',
    subject: 'Math',
    dueDate: 'Tomorrow, 3:00 PM',
    dueTimestamp: new Date().getTime() + 86400000,
    status: 'in-progress',
    priority: 'medium',
    points: 75,
    progress: 12,
    totalQuestions: 15,
    icon: '➕',
    color: 'from-blue-500 to-indigo-600',
    questions: [
      { id: 1, question: '5 + 3 = ?', type: 'multiple-choice', options: ['6', '7', '8', '9'], correctAnswer: '8' },
      { id: 2, question: '10 - 4 = ?', type: 'multiple-choice', options: ['5', '6', '7', '8'], correctAnswer: '6' },
    ]
  },
  {
    id: 3,
    title: 'Story Writing: My Pet',
    description: 'Write a short story about your favorite pet or animal',
    type: 'Creative',
    subject: 'Writing',
    dueDate: 'Friday, 11:59 PM',
    dueTimestamp: new Date().getTime() + 259200000,
    status: 'in-progress',
    priority: 'low',
    points: 100,
    progress: 5,
    totalQuestions: 10,
    icon: '📝',
    color: 'from-purple-500 to-purple-600',
  },
  {
    id: 4,
    title: 'Rhyming Pairs Match',
    description: 'Match rhyming words together',
    type: 'Game',
    subject: 'Reading',
    dueDate: 'Completed',
    status: 'completed',
    priority: 'medium',
    points: 50,
    grade: 'A+',
    score: 98,
    completedDate: '2 days ago',
    icon: '🎯',
    color: 'from-emerald-500 to-emerald-600',
  },
  {
    id: 5,
    title: 'Color Recognition Quiz',
    description: 'Identify colors and their names',
    type: 'Quiz',
    subject: 'Visual Arts',
    dueDate: 'Completed',
    status: 'completed',
    priority: 'low',
    points: 40,
    grade: 'A',
    score: 92,
    completedDate: '5 days ago',
    icon: '🎨',
    color: 'from-cyan-500 to-cyan-600',
  },
  {
    id: 6,
    title: 'Shape Sorting Activity',
    description: 'Sort shapes by type and color',
    type: 'Interactive',
    subject: 'Math',
    dueDate: 'Next Week',
    dueTimestamp: new Date().getTime() + 604800000,
    status: 'pending',
    priority: 'low',
    points: 30,
    progress: 0,
    totalQuestions: 12,
    icon: '🔶',
    color: 'from-yellow-500 to-orange-500',
  },
  {
    id: 7,
    title: 'Matching Cards !',
    description: 'Classic memory card flip game with pairs of letters, words, or pictures.',
    type: 'Game',
    subject: 'Memory',
    dueDate: '20/06/2023',
    status: 'pending',
    priority: 'medium',
    points: 45,
    progress: 0,
    totalQuestions: 16,
    icon: '🎴',
    color: 'from-pink-500 to-rose-500',
  },
  {
    id: 8,
    title: 'Emotion Explorer 😊',
    description: 'Show faces with different emotions and ask the learner to pick the correct label (happy, sad, surprised).',
    type: 'Interactive',
    subject: 'Social Skills',
    dueDate: '20/06/2023',
    status: 'in-progress',
    priority: 'medium',
    points: 55,
    progress: 6,
    totalQuestions: 12,
    icon: '😊',
    color: 'from-yellow-400 to-orange-500',
  },
  {
    id: 9,
    title: 'Build the Word Puzzle !',
    description: 'Jumbled letters appear on screen, and learners arrange them to spell a word.',
    type: 'Puzzle',
    subject: 'Reading',
    dueDate: '19/06/2023',
    status: 'in-progress',
    priority: 'medium',
    points: 60,
    progress: 8,
    totalQuestions: 15,
    icon: '🧩',
    color: 'from-purple-500 to-indigo-600',
  },
];
