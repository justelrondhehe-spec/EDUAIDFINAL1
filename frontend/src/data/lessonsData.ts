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
    description: 'Count objects, explore the number line 1-20, and discover skip counting patterns (2s, 5s). Includes interactive counting games and pattern activities.',
    category: 'Mathematics',
    duration: '20 min',
    progress: 0,
    status: 'not-started',
    difficulty: 'Beginner',
    rating: 4.8,
    icon: '🔢',
    color: 'from-blue-500 to-cyan-600',
    lessons: 3,
    completedLessons: 0,
    content: {
      introduction: 'Start your math journey by learning numbers! Count, identify, and write numbers from 1 to 20.',
      objectives: [
        'Count objects up to 20',
        'Recognize and write numbers',
        'Understand number order',
        'Practice number patterns'
      ],
      activities: ['Count the Objects Game', 'Number Line Explorer', 'Skip Counting Patterns']
    }
  },
  {
    id: 2,
    title: 'Reading Basics',
    description: 'Master the complete alphabet A-Z with letter sounds (phonics), blend simple CVC words like "cat" and "sun", and read tiny stories. Features interactive letter cards and word blending.',
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
      activities: ['Alphabet Letter Cards', 'CVC Word Blending', 'Tiny Story Reading']
    }
  },
  {
    id: 3,
    title: 'Science Exploration',
    description: 'Explore your five senses (sight, hearing, touch, smell, taste), learn about science tools (magnifying glass, binoculars), and practice safety rules. Includes scavenger hunt and observation lab activities.',
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
      activities: ['Senses Scavenger Hunt', 'Observation Lab', 'Safe or Unsafe Activity']
    }
  },
  {
    id: 4,
    title: 'Shapes & Colors',
    description: 'Identify basic shapes (circle, square, triangle, rectangle) and learn primary colors (red, blue, yellow), secondary colors (orange, green, purple), and how to mix them. Features shape sorting and color mixing activities.',
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
      activities: ['Shape Identification Game', 'Color Mixing Lab', 'Interactive Shape Sorter']
    }
  },
  {
    id: 5,
    title: 'Music & Rhythm',
    description: 'Feel the beat with different tempos (fast, slow, steady), learn rhythm symbols (♩ ta, ♫ ti-ti, 𝄽 rest), and create simple patterns. Includes clapping games and rhythm notation activities.',
    category: 'Arts',
    duration: '18 min',
    progress: 0,
    status: 'not-started',
    difficulty: 'Beginner',
    rating: 4.5,
    icon: '🎵',
    color: 'from-yellow-500 to-orange-600',
    lessons: 4,
    completedLessons: 0,
    content: {
      introduction: 'Students explore beat, tempo, and simple rhythm patterns using clapping, tapping, and digital sound cues.',
      objectives: [
        'Keep a steady beat with clapping or tapping',
        'Recognize fast vs. slow tempo',
        'Repeat and create simple rhythm patterns',
        'Connect rhythm to movement (marching, swaying)'
      ],
      activities: ['Clapping Game (Follow the Beat)', 'Echo Rhythm Patterns', 'Rhythm Symbol Matching']
    }
  },
  {
    id: 6,
    title: 'Our Emotions',
    description: 'Name and recognize four core feelings (happy, sad, angry, scared), understand what causes them, and learn calming strategies. Features emotion detective quiz and interactive calming corner tools.',
    category: 'Social & Emotional Learning',
    duration: '20 min',
    progress: 0,
    status: 'not-started',
    difficulty: 'Beginner',
    rating: 4.9,
    icon: '❤️',
    color: 'from-pink-500 to-rose-500',
    lessons: 8,
    completedLessons: 0,
    content: {
      introduction: 'Learn to identify, understand, and manage emotions with kid-friendly tools and strategies.',
      objectives: [
        'Recognize and name different emotions',
        'Understand what causes different feelings',
        'Learn calming strategies for big emotions',
        'Practice emotional regulation techniques'
      ],
      activities: ['Feeling Detective Game', 'Calming Corner Practice', 'Emotion Faces Matching']
    }
  },
];