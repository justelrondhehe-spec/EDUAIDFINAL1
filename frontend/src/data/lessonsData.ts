// frontend/src/data/lessonsData.ts
export interface Lesson {
  id: number;
  title: string;
  description: string;
  category: string;
  duration: string;
  progress: number;
  status: 'completed' | 'in-progress' | 'not-started';
  difficulty: string;
  rating: number;
  icon: string;
  color: string;
  lessons: number;
  completedLessons: number;
  content: {
    introduction: string;
    objectives: string[];
    activities: string[];
  };
}

export const lessonsData: Lesson[] = [
  {
    id: 1,
    title: 'Counting Fun: Numbers 1–20',
    description: 'Practice counting, ordering, and writing numbers from 1 to 20.',
    category: 'Math',
    duration: '20 minutes',
    progress: 0,
    status: 'not-started',
    difficulty: 'Beginner',
    rating: 4.8,
    icon: '🔢',
    color: 'from-blue-500 to-indigo-600',
    lessons: 5,
    completedLessons: 0,
    content: {
      introduction:
        'Start your math journey by learning numbers 1–20. Your learner will count objects, recognize numerals, and practice simple number patterns.',
      objectives: [
        'Count objects from 1 to 20',
        'Recognize and write numbers 1–20',
        'Understand number order (before / after)',
        'Identify simple number patterns (skip counting by 2s)',
      ],
      activities: [
        'Count everyday objects (toys, blocks, snacks)',
        'Number tracing worksheets or whiteboard practice',
        'Number matching game: numeral to quantity',
        'Number line jump game (before / after)',
      ],
    },
  },
  {
    id: 2,
    title: 'ABC Adventure: Letters & Sounds',
    description: 'Explore the alphabet, letter shapes, and beginning sounds.',
    category: 'Language',
    duration: '25 minutes',
    progress: 0,
    status: 'not-started',
    difficulty: 'Beginner',
    rating: 4.9,
    icon: '🔤',
    color: 'from-emerald-500 to-teal-500',
    lessons: 6,
    completedLessons: 0,
    content: {
      introduction:
        'This lesson introduces the alphabet in a playful way. Learners see, say, and trace letters while connecting them to familiar words.',
      objectives: [
        'Recognize uppercase letters A–Z',
        'Match letters with common words (A = apple)',
        'Practice basic letter sounds',
        'Develop confidence speaking and pointing to letters',
      ],
      activities: [
        'Alphabet song and pointing to each letter',
        'Letter card flash game (find the letter)',
        'Matching letters with picture cards',
        'Tracing a few focus letters (e.g., A, B, C, D)',
      ],
    },
  },
  {
    id: 3,
    title: 'First Reading: Sight Words & Simple Sentences',
    description: 'Use simple sight words to build and read first sentences.',
    category: 'Reading',
    duration: '30 minutes',
    progress: 0,
    status: 'not-started',
    difficulty: 'Early Reader',
    rating: 4.7,
    icon: '📖',
    color: 'from-orange-500 to-amber-500',
    lessons: 5,
    completedLessons: 0,
    content: {
      introduction:
        'Learners are introduced to high-frequency sight words and short sentences that they can read aloud with support.',
      objectives: [
        'Recognize simple sight words (I, see, like, a, the)',
        'Point to each word while reading left to right',
        'Read short patterned sentences with help',
        'Build confidence reading aloud',
      ],
      activities: [
        'Sight word flash cards',
        'Sentence strip building (e.g., “I see a cat.”)',
        'Picture matching with sentences',
        'Shared reading with finger tracking under each word',
      ],
    },
  },
  {
    id: 4,
    title: 'Shapes & Colors Adventure',
    description: 'Discover circles, squares, triangles, and rectangles using bright colors.',
    category: 'Math',
    duration: '20 minutes',
    progress: 0,
    status: 'not-started',
    difficulty: 'Beginner',
    rating: 4.9,
    icon: '🎨',
    color: 'from-purple-500 to-pink-500',
    lessons: 4,
    completedLessons: 0,
    content: {
      introduction:
        'In this lesson, learners explore basic shapes and colors through objects they see every day. They will name shapes, identify colors, and match them together.',
      objectives: [
        'Identify basic shapes: circle, square, triangle, rectangle',
        'Name and recognize common colors (red, blue, yellow, green)',
        'Match shapes to real-world objects',
        'Describe objects using both shape and color (e.g., “red circle”)',
      ],
      activities: [
        'Shape hunt around the room (find circles, squares, etc.)',
        'Color sorting with blocks, crayons, or toys',
        'Shape and color matching cards',
        'Drawing and coloring favorite shapes',
      ],
    },
  },
  {
    id: 5,
    title: 'Our Wonderful World: Nature & Science',
    description: 'Learn about plants, animals, weather, and how to care for the Earth.',
    category: 'Science',
    duration: '25 minutes',
    progress: 0,
    status: 'not-started',
    difficulty: 'Beginner',
    rating: 4.6,
    icon: '🌱',
    color: 'from-lime-500 to-green-500',
    lessons: 5,
    completedLessons: 0,
    content: {
      introduction:
        'This lesson gently introduces science through nature: plants, animals, and weather. Learners observe, describe, and ask questions about the world around them.',
      objectives: [
        'Name common animals and their homes',
        'Identify basic parts of a plant (root, stem, leaf)',
        'Talk about simple weather types (sunny, rainy, cloudy)',
        'Practice ways to care for nature (don’t litter, water plants)',
      ],
      activities: [
        'Picture walk: animals and their homes',
        'Simple plant drawing and labeling',
        'Weather chart for today’s weather',
        'Brainstorming ways to keep the Earth clean',
      ],
    },
  },
];
