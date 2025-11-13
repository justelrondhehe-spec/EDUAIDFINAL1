export interface Lesson {
  id: number;
  title: string;
  description: string;
  category: string;
  duration: string;
  progress: number;
  status: 'completed' | 'in-progress' | 'not-started';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  rating: number;
  icon: string;
  color: string;
  lessons: number;
  completedLessons: number;
  content?: {
    introduction: string;
    objectives: string[];
    activities: string[];
  };
}

export const lessonsData: Lesson[] = [
  {
    id: 1,
    title: 'Introduction to Numbers',
    description: 'Learn to count and recognize numbers 1-20',
    category: 'Mathematics',
    duration: '20 min',
    progress: 0,
    status: 'not-started',
    difficulty: 'Beginner',
    rating: 4.8,
    icon: '🔢',
    color: 'from-blue-500 to-cyan-600',
    lessons: 8,
    completedLessons: 0,
    content: {
      introduction: 'Start your math journey by learning numbers! Count, identify, and write numbers from 1 to 20.',
      objectives: [
        'Count objects up to 20',
        'Recognize and write numbers',
        'Understand number order',
        'Practice number patterns'
      ],
      activities: ['Counting Game', 'Number Matching']
    }
  },
  {
    id: 2,
    title: 'Reading Basics',
    description: 'Learn letters, phonics, and simple words',
    category: 'Language Arts',
    duration: '25 min',
    progress: 0,
    status: 'not-started',
    difficulty: 'Beginner',
    rating: 4.7,
    icon: '📚',
    color: 'from-green-500 to-emerald-600',
    lessons: 10,
    completedLessons: 0,
    content: {
      introduction: 'Build a strong foundation in reading with letters, sounds, and simple words.',
      objectives: [
        'Identify all alphabet letters',
        'Learn letter sounds (phonics)',
        'Read simple 3-letter words',
        'Practice sight words'
      ],
      activities: ['Letter Hunt', 'Word Building']
    }
  },
  {
    id: 3,
    title: 'Science Exploration',
    description: 'Discover the world around you through fun experiments',
    category: 'Science',
    duration: '30 min',
    progress: 0,
    status: 'not-started',
    difficulty: 'Intermediate',
    rating: 4.9,
    icon: '🔬',
    color: 'from-purple-500 to-violet-600',
    lessons: 12,
    completedLessons: 0,
    content: {
      introduction: 'Explore science through hands-on experiments and observations about nature.',
      objectives: [
        'Understand basic scientific concepts',
        'Conduct simple experiments',
        'Make observations',
        'Learn about plants and animals'
      ],
      activities: ['Plant Growth', 'Water Cycle']
    }
  },
  {
    id: 4,
    title: 'Shapes & Colors',
    description: 'Identify and learn about different shapes and colors',
    category: 'Visual Arts',
    duration: '15 min',
    progress: 0,
    status: 'not-started',
    difficulty: 'Beginner',
    rating: 4.6,
    icon: '🎨',
    color: 'from-pink-500 to-rose-600',
    lessons: 6,
    completedLessons: 0,
    content: {
      introduction: 'Discover the wonderful world of shapes and colors! Learn to identify, name, and create with different shapes and colors.',
      objectives: [
        'Identify basic shapes',
        'Recognize primary and secondary colors',
        'Understand shape properties',
        'Create art with shapes and colors'
      ],
      activities: ['Shape Hunt', 'Color Mixing']
    }
  },
  {
    id: 5,
    title: 'Music & Rhythm',
    description: 'Explore sounds, rhythms, and musical patterns',
    category: 'Arts',
    duration: '18 min',
    progress: 0,
    status: 'not-started',
    difficulty: 'Beginner',
    rating: 4.5,
    icon: '🎵',
    color: 'from-yellow-500 to-orange-600',
    lessons: 7,
    completedLessons: 0,
    content: {
      introduction: 'Discover the joy of music! Learn about rhythm, sounds, and musical patterns.',
      objectives: [
        'Recognize different sounds',
        'Understand rhythm patterns',
        'Learn basic musical notes',
        'Create simple melodies'
      ],
      activities: ['Rhythm Game', 'Sound Matching']
    }
  },
];
