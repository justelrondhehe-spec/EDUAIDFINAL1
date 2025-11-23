// frontend/src/data/activitiesData.ts
export interface Question {
  id: number;
  question: string;
  type: 'multiple-choice' | 'single-choice';
  options: string[];
  correctAnswer: string;
}

export interface Activity {
  id: number;
  title: string;
  description: string;
  type: string;
  subject: string;
  dueDate: string | null;
  dueTimestamp: number | null;
  status: 'pending' | 'in-progress' | 'completed';
  priority: 'high' | 'medium' | 'low';
  points: number;
  progress: number;
  totalQuestions: number;
  grade: string;
  score: number;
  completedDate: string | null;
  icon: string;
  color: string;
  relatedLessonId?: number;
  isLocked: boolean;
  questions: Question[];
}

export const activitiesData: Activity[] = [
  {
    id: 1,
    title: 'Shapes & Colors Challenge',
    description: 'Match shapes and colors, then solve a short quiz about them.',
    type: 'Interactive Quiz',
    subject: 'Math',
    dueDate: null,
    dueTimestamp: null,
    status: 'pending',
    priority: 'medium',
    points: 50,
    progress: 0,
    totalQuestions: 4,
    grade: '',
    score: 0,
    completedDate: null,
    icon: '🧩',
    color: 'from-purple-500 to-pink-500',
    relatedLessonId: 4,
    isLocked: true, // unlocked when Shapes & Colors lesson is completed
    questions: [
      {
        id: 1,
        question: 'Which shape has 3 sides?',
        type: 'multiple-choice',
        options: ['Circle', 'Triangle', 'Square', 'Rectangle'],
        correctAnswer: 'Triangle',
      },
      {
        id: 2,
        question: 'What color is the sun usually drawn as?',
        type: 'multiple-choice',
        options: ['Blue', 'Yellow', 'Green', 'Purple'],
        correctAnswer: 'Yellow',
      },
      {
        id: 3,
        question: 'Which shape is round like a ball?',
        type: 'multiple-choice',
        options: ['Square', 'Circle', 'Triangle', 'Rectangle'],
        correctAnswer: 'Circle',
      },
      {
        id: 4,
        question: 'What color are leaves usually?',
        type: 'multiple-choice',
        options: ['Red', 'Green', 'Orange', 'Pink'],
        correctAnswer: 'Green',
      },
    ],
  },
  {
    id: 2,
    title: 'Counting 1–20 Practice',
    description: 'Count groups of objects and choose the correct number.',
    type: 'Quiz',
    subject: 'Math',
    dueDate: null,
    dueTimestamp: null,
    status: 'pending',
    priority: 'medium',
    points: 40,
    progress: 0,
    totalQuestions: 5,
    grade: '',
    score: 0,
    completedDate: null,
    icon: '🧮',
    color: 'from-blue-500 to-indigo-600',
    relatedLessonId: 1,
    isLocked: true,
    questions: [
      {
        id: 1,
        question: 'How many apples are there if you see 5 apples?',
        type: 'single-choice',
        options: ['3', '5', '7', '10'],
        correctAnswer: '5',
      },
      {
        id: 2,
        question: 'Which number comes after 9?',
        type: 'single-choice',
        options: ['8', '9', '10', '11'],
        correctAnswer: '10',
      },
      {
        id: 3,
        question: 'Which number is bigger?',
        type: 'single-choice',
        options: ['12', '7'],
        correctAnswer: '12',
      },
      {
        id: 4,
        question: 'How many fingers are on both hands?',
        type: 'single-choice',
        options: ['8', '10', '12', '5'],
        correctAnswer: '10',
      },
      {
        id: 5,
        question: 'What number comes before 15?',
        type: 'single-choice',
        options: ['14', '16', '13', '12'],
        correctAnswer: '14',
      },
    ],
  },
  {
    id: 3,
    title: 'ABC Match-Up',
    description: 'Match letters with pictures that start with that letter.',
    type: 'Matching',
    subject: 'Language',
    dueDate: null,
    dueTimestamp: null,
    status: 'pending',
    priority: 'low',
    points: 30,
    progress: 0,
    totalQuestions: 4,
    grade: '',
    score: 0,
    completedDate: null,
    icon: '🔡',
    color: 'from-emerald-500 to-teal-500',
    relatedLessonId: 2,
    isLocked: true,
    questions: [
      {
        id: 1,
        question: 'Which picture starts with A?',
        type: 'multiple-choice',
        options: ['Ball', 'Apple', 'Cat', 'Dog'],
        correctAnswer: 'Apple',
      },
      {
        id: 2,
        question: 'Which picture starts with B?',
        type: 'multiple-choice',
        options: ['Sun', 'Tree', 'Ball', 'Fish'],
        correctAnswer: 'Ball',
      },
      {
        id: 3,
        question: 'Which word starts with C?',
        type: 'multiple-choice',
        options: ['Dog', 'Car', 'Apple', 'Fish'],
        correctAnswer: 'Car',
      },
      {
        id: 4,
        question: 'Which word starts with D?',
        type: 'multiple-choice',
        options: ['Dog', 'Ant', 'Bus', 'Car'],
        correctAnswer: 'Dog',
      },
    ],
  },
  {
    id: 4,
    title: 'Sight Word Sentences',
    description: 'Build simple sentences using sight words and pictures.',
    type: 'Reading',
    subject: 'Reading',
    dueDate: null,
    dueTimestamp: null,
    status: 'pending',
    priority: 'medium',
    points: 40,
    progress: 0,
    totalQuestions: 3,
    grade: '',
    score: 0,
    completedDate: null,
    icon: '📚',
    color: 'from-orange-500 to-amber-500',
    relatedLessonId: 3,
    isLocked: true,
    questions: [
      {
        id: 1,
        question: 'Choose the sentence that matches the picture of a cat.',
        type: 'multiple-choice',
        options: ['I see a cat.', 'I see a dog.', 'I like a car.', 'I see a sun.'],
        correctAnswer: 'I see a cat.',
      },
      {
        id: 2,
        question: 'Which sentence uses the word "like"?',
        type: 'multiple-choice',
        options: ['I see a dog.', 'I like a cake.', 'I see a ball.', 'I am a cat.'],
        correctAnswer: 'I like a cake.',
      },
      {
        id: 3,
        question: 'Which word is a sight word?',
        type: 'multiple-choice',
        options: ['elephant', 'like', 'banana', 'turtle'],
        correctAnswer: 'like',
      },
    ],
  },
  {
    id: 5,
    title: 'Nature Explorer Quiz',
    description: 'Review animals, plants, and simple weather with a fun quiz.',
    type: 'Quiz',
    subject: 'Science',
    dueDate: null,
    dueTimestamp: null,
    status: 'pending',
    priority: 'low',
    points: 30,
    progress: 0,
    totalQuestions: 4,
    grade: '',
    score: 0,
    completedDate: null,
    icon: '🌎',
    color: 'from-lime-500 to-green-500',
    relatedLessonId: 5,
    isLocked: true,
    questions: [
      {
        id: 1,
        question: 'Which one is a plant?',
        type: 'multiple-choice',
        options: ['Dog', 'Tree', 'Car', 'House'],
        correctAnswer: 'Tree',
      },
      {
        id: 2,
        question: 'What do plants need to grow?',
        type: 'multiple-choice',
        options: ['Water and sun', 'Phones', 'Toys', 'Shoes'],
        correctAnswer: 'Water and sun',
      },
      {
        id: 3,
        question: 'What weather is it when the sun is shining?',
        type: 'multiple-choice',
        options: ['Rainy', 'Snowy', 'Sunny', 'Windy'],
        correctAnswer: 'Sunny',
      },
      {
        id: 4,
        question: 'What should we do with trash?',
        type: 'multiple-choice',
        options: ['Throw it on the ground', 'Recycle or bin it', 'Hide it', 'Burn it outside'],
        correctAnswer: 'Recycle or bin it',
      },
    ],
  },
];
