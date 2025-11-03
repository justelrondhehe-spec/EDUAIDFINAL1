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
    title: 'Introduction to Phonics',
    description: 'Learn the basics of phonics and how sounds make words',
    category: 'Reading',
    duration: '25 min',
    progress: 100,
    status: 'completed',
    difficulty: 'Beginner',
    rating: 4.8,
    icon: '📚',
    color: 'from-blue-500 to-blue-600',
    lessons: 8,
    completedLessons: 8,
    content: {
      introduction: 'Welcome to Introduction to Phonics! In this lesson, you\'ll learn how letters make sounds and how sounds come together to form words.',
      objectives: [
        'Understand basic phonetic sounds',
        'Recognize letter-sound relationships',
        'Blend sounds to form simple words',
        'Practice pronunciation'
      ],
      activities: ['Sound Recognition Game', 'Letter Matching', 'Word Building', 'Pronunciation Practice']
    }
  },
  {
    id: 2,
    title: 'Rhyming Words Adventure',
    description: 'Explore rhyming words through fun interactive games',
    category: 'Reading',
    duration: '30 min',
    progress: 65,
    status: 'in-progress',
    difficulty: 'Beginner',
    rating: 4.9,
    icon: '🎵',
    color: 'from-purple-500 to-purple-600',
    lessons: 10,
    completedLessons: 6,
    content: {
      introduction: 'Join us on an exciting adventure to discover rhyming words! You\'ll learn to identify words that sound alike and create your own rhymes.',
      objectives: [
        'Identify rhyming word pairs',
        'Create simple rhymes',
        'Recognize rhyme patterns',
        'Improve phonological awareness'
      ],
      activities: ['Rhyme Matching Game', 'Poetry Creation', 'Sound Exploration', 'Interactive Stories']
    }
  },
  {
    id: 3,
    title: 'Counting & Numbers 1-20',
    description: 'Master counting and number recognition with interactive activities',
    category: 'Math',
    duration: '20 min',
    progress: 45,
    status: 'in-progress',
    difficulty: 'Beginner',
    rating: 4.7,
    icon: '🔢',
    color: 'from-emerald-500 to-emerald-600',
    lessons: 12,
    completedLessons: 5,
    content: {
      introduction: 'Learn to count from 1 to 20 through engaging activities and games that make numbers fun!',
      objectives: [
        'Count objects accurately',
        'Recognize numbers 1-20',
        'Understand number order',
        'Practice writing numbers'
      ],
      activities: ['Counting Objects', 'Number Recognition', 'Ordering Numbers', 'Number Writing Practice']
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
      activities: ['Shape Hunt', 'Color Mixing', 'Pattern Creation', 'Art Project']
    }
  },
  {
    id: 5,
    title: 'Alphabet Mastery',
    description: 'Learn all 26 letters with sounds and examples',
    category: 'Reading',
    duration: '35 min',
    progress: 100,
    status: 'completed',
    difficulty: 'Beginner',
    rating: 5.0,
    icon: '🔤',
    color: 'from-cyan-500 to-cyan-600',
    lessons: 26,
    completedLessons: 26,
    content: {
      introduction: 'Master the alphabet from A to Z! Learn each letter, its sound, and practice writing.',
      objectives: [
        'Recognize all 26 letters',
        'Know letter sounds',
        'Write uppercase and lowercase letters',
        'Connect letters to words'
      ],
      activities: ['Letter Recognition', 'Sound Practice', 'Writing Practice', 'Word Association']
    }
  },
  {
    id: 6,
    title: 'Emotion Recognition',
    description: 'Understand and identify different emotions and feelings',
    category: 'Social Skills',
    duration: '18 min',
    progress: 30,
    status: 'in-progress',
    difficulty: 'Intermediate',
    rating: 4.8,
    icon: '😊',
    color: 'from-yellow-500 to-orange-500',
    lessons: 8,
    completedLessons: 2,
    content: {
      introduction: 'Learn to recognize and understand different emotions in yourself and others.',
      objectives: [
        'Identify basic emotions',
        'Understand facial expressions',
        'Express feelings appropriately',
        'Develop empathy'
      ],
      activities: ['Emotion Cards', 'Face Reading', 'Feeling Stories', 'Role Play']
    }
  },
];
