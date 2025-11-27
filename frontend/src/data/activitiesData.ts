export interface Activity {
  id: number;
  title: string;
  description: string;
  type: string;
  subject: string;
  dueDate: string | Date;
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
  relatedLessonId?: number;
  isLocked?: boolean;
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
    title: 'Shapes & Colors Challenge',
    description: 'Complete interactive exercises to test your knowledge of shapes and colors from the Shapes & Colors lesson',
    type: 'Interactive Quiz',
    subject: 'Visual Arts',
    dueDate: 'This Week',
    dueTimestamp: new Date().getTime() + 604800000,
    status: 'pending',
    priority: 'medium',
    points: 100,
    progress: 0,
    totalQuestions: 12,
    icon: '🎨',
    color: 'from-pink-500 to-rose-600',
    relatedLessonId: 4,
    questions: [
      { 
        id: 1, 
        question: 'Which shape has no corners?', 
        type: 'multiple-choice', 
        options: ['Square', 'Triangle', 'Circle', 'Rectangle'], 
        correctAnswer: 'Circle' 
      },
      { 
        id: 2, 
        question: 'How many sides does a triangle have?', 
        type: 'multiple-choice', 
        options: ['2', '3', '4', '5'], 
        correctAnswer: '3' 
      },
      { 
        id: 3, 
        question: 'What color do you get when you mix red and yellow?', 
        type: 'multiple-choice', 
        options: ['Green', 'Purple', 'Orange', 'Brown'], 
        correctAnswer: 'Orange' 
      },
      { 
        id: 4, 
        question: 'What color do you get when you mix blue and yellow?', 
        type: 'multiple-choice', 
        options: ['Green', 'Purple', 'Orange', 'Brown'], 
        correctAnswer: 'Green' 
      },
      { 
        id: 5, 
        question: 'Which shape has four equal sides?', 
        type: 'multiple-choice', 
        options: ['Rectangle', 'Triangle', 'Square', 'Circle'], 
        correctAnswer: 'Square' 
      },
      { 
        id: 6, 
        question: 'What are the three primary colors?', 
        type: 'multiple-choice', 
        options: ['Red, Yellow, Blue', 'Red, Green, Blue', 'Orange, Purple, Green', 'Black, White, Gray'], 
        correctAnswer: 'Red, Yellow, Blue' 
      },
      { 
        id: 7, 
        question: 'What color do you get when you mix red and blue?', 
        type: 'multiple-choice', 
        options: ['Green', 'Purple', 'Orange', 'Brown'], 
        correctAnswer: 'Purple' 
      },
      { 
        id: 8, 
        question: 'How many sides does a hexagon have?', 
        type: 'multiple-choice', 
        options: ['4', '5', '6', '8'], 
        correctAnswer: '6' 
      },
      { 
        id: 9, 
        question: 'Which shape is like a stretched circle?', 
        type: 'multiple-choice', 
        options: ['Square', 'Oval', 'Triangle', 'Star'], 
        correctAnswer: 'Oval' 
      },
      { 
        id: 10, 
        question: 'What type of colors are green, orange, and purple?', 
        type: 'multiple-choice', 
        options: ['Primary', 'Secondary', 'Tertiary', 'Neutral'], 
        correctAnswer: 'Secondary' 
      },
      { 
        id: 11, 
        question: 'How many corners does a pentagon have?', 
        type: 'multiple-choice', 
        options: ['3', '4', '5', '6'], 
        correctAnswer: '5' 
      },
      { 
        id: 12, 
        question: 'Which shape has points projecting from its center?', 
        type: 'multiple-choice', 
        options: ['Circle', 'Square', 'Star', 'Triangle'], 
        correctAnswer: 'Star' 
      },
    ]
  },
  {
    id: 2,
    title: 'Number Counting Adventure',
    description: 'Practice counting and number recognition with fun interactive games',
    type: 'Interactive Game',
    subject: 'Mathematics',
    dueDate: 'Next Week',
    dueTimestamp: new Date().getTime() + 1209600000,
    status: 'pending',
    priority: 'high',
    points: 120,
    progress: 0,
    totalQuestions: 15,
    icon: '🔢',
    color: 'from-blue-500 to-cyan-600',
    relatedLessonId: 1,
    isLocked: true,
  },
  {
    id: 3,
    title: 'Reading Comprehension Quiz',
    description: 'Test your understanding of letters, sounds, and simple words',
    type: 'Quiz',
    subject: 'Language Arts',
    dueDate: 'This Month',
    dueTimestamp: new Date().getTime() + 2419200000,
    status: 'pending',
    priority: 'medium',
    points: 90,
    progress: 0,
    totalQuestions: 10,
    icon: '📚',
    color: 'from-green-500 to-emerald-600',
    relatedLessonId: 2,
    isLocked: true,
  },
  {
    id: 4,
    title: 'Science Adventure: Senses & Safety',
    description: 'Explore your five senses and learn science safety rules.',
    type: 'Experiment',
    subject: 'Science',
    dueDate: 'This Month',
    dueTimestamp: new Date().getTime() + 2419200000,  
    status: 'pending',
    priority: 'low',
    points: 150,
    progress: 0,
    totalQuestions: 8,
    icon: '🔬',
    color: 'from-purple-500 to-violet-600',
    relatedLessonId: 3,
    isLocked: true,
  },
  {
    id: 5,
    title: 'Music & Rhythm Activity',
    description: 'Learn rhythm and beat through 4 interactive modules: Feel the Beat, Copy the Pattern, Read Simple Rhythms, and Rhythm Reader',
    type: 'Interactive Modules',
    subject: 'Arts',
    dueDate: 'This Month',
    dueTimestamp: new Date().getTime() + 2419200000,
    status: 'pending',
    priority: 'medium',
    points: 160,
    progress: 0,
    totalQuestions: 12,
    icon: '🎵',
    color: 'from-purple-500 to-pink-600',
    relatedLessonId: 5,
    isLocked: true,
  },
  {
    id: 6,
    title: 'Our Emotions Activity',
    description: 'Help your learner explore, name, and gently manage big feelings.',
    type: 'Interactive Game',
    subject: 'Social-Emotional Learning',
    dueDate: 'This Month',
    dueTimestamp: new Date().getTime() + 2419200000, // ~4 weeks from now
    status: 'pending',
    priority: 'medium',
    points: 120,
    progress: 0,
    totalQuestions: 10,
    icon: '😊',
    color: 'from-rose-500 to-pink-600',
    // set this to whatever lesson unlocks it, or remove it if always available
    relatedLessonId: 5, 
    isLocked: true,
  },
  
];