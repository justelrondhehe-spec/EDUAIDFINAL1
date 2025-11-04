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
      activities: ['Shape Hunt', 'Color Mixing', 'Pattern Creation', 'Art Project']
    }
  },
];
