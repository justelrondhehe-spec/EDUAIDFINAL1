import { ArrowLeft, CheckCircle, Hand, Trophy, Award, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { useState, useEffect } from 'react';
import { useApp } from '../contexts/AppContext';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';

interface NumbersLessonProps {
  onBack: () => void;
}

export function NumbersLesson({ onBack }: NumbersLessonProps) {
  const { lessonProgress, completeLesson, startLesson, saveAndExitLesson } = useApp();
  const [showCompletionDialog, setShowCompletionDialog] = useState(false);
  const [countedObjects, setCountedObjects] = useState<number[]>([]);
  const [selectedNumberLine, setSelectedNumberLine] = useState<number | null>(null);
  const [selectedPattern, setSelectedPattern] = useState<number | null>(null);
  const [patternAnswers, setPatternAnswers] = useState<{[key: number]: number | null}>({});
  const [showPatternFeedback, setShowPatternFeedback] = useState<{[key: number]: boolean}>({});
  
  const lessonId = 1; // Introduction to Numbers lesson ID
  const lesson = lessonProgress[lessonId];
  const isLessonCompleted = lesson?.completed || false;
  
  // Start lesson when component mounts if not started
  useEffect(() => {
    if (!lesson && !isLessonCompleted) {
      startLesson(lessonId);
    }
  }, []);
  
  const handleSaveAndExit = () => {
    const progress = 33;
    saveAndExitLesson(lessonId, progress);
    onBack();
  };

  // Counting objects
  const objectGroups = [
    { count: 3, emoji: '⭐', name: 'stars' },
    { count: 5, emoji: '🔵', name: 'dots' },
    { count: 4, emoji: '🧱', name: 'blocks' },
    { count: 7, emoji: '🍎', name: 'apples' },
  ];

  const handleObjectClick = (groupIndex: number, objectIndex: number) => {
    const key = groupIndex * 100 + objectIndex;
    if (countedObjects.includes(key)) {
      setCountedObjects(countedObjects.filter(k => k !== key));
    } else {
      setCountedObjects([...countedObjects, key]);
    }
  };

  const resetCounting = (groupIndex: number) => {
    const filtered = countedObjects.filter(k => Math.floor(k / 100) !== groupIndex);
    setCountedObjects(filtered);
  };

  // Number line activities
  const numberLineQuestions = [
    { question: 'Find 5 on the number line. Which number is just after it?', answer: 6, highlight: 5 },
    { question: 'Jump forward 3 steps from 4. Where do you land?', answer: 7, highlight: 4 },
    { question: 'What number comes before 10?', answer: 9, highlight: 10 },
  ];

  // Pattern activities
  const patterns = [
    { 
      id: 1,
      sequence: [1, 2, 1, 2, 1, '?'],
      answer: 2,
      color: 'blue',
      description: 'Repeating Pattern',
      options: [1, 2, 3]
    },
    { 
      id: 2,
      sequence: [2, 4, 6, 8, '?'],
      answer: 10,
      color: 'purple',
      description: 'Count by 2s',
      options: [9, 10, 12]
    },
    { 
      id: 3,
      sequence: [5, 10, 15, '?'],
      answer: 20,
      color: 'green',
      description: 'Count by 5s',
      options: [18, 20, 25]
    }
  ];

  const checkPatternAnswer = (patternId: number, answer: number) => {
    const pattern = patterns.find(p => p.id === patternId);
    if (pattern) {
      setPatternAnswers({ ...patternAnswers, [patternId]: answer });
      setShowPatternFeedback({ ...showPatternFeedback, [patternId]: true });
      
      setTimeout(() => {
        if (answer === pattern.answer) {
          setShowPatternFeedback({ ...showPatternFeedback, [patternId]: false });
        }
      }, 2000);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={onBack} className="dark:bg-slate-800 dark:border-slate-700">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Lessons
        </Button>
      </div>

      {/* Lesson Title */}
      <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-3xl p-8 shadow-2xl">
        <div className="flex items-center gap-6 mb-6">
          <div className="text-6xl">🔢</div>
          <div className="flex-1 text-white">
            <div className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm mb-3">
              Mathematics - Beginner
            </div>
            <h1 className="text-white mb-2">Introduction to Numbers</h1>
            <p className="text-white/90">Learn to count and recognize numbers 1-20</p>
          </div>
        </div>
        
        {/* Lesson Info */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
            <div className="text-white/80 text-sm mb-1">Duration</div>
            <div className="text-white">20 min</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
            <div className="text-white/80 text-sm mb-1">Level</div>
            <div className="text-white">Beginner</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
            <div className="text-white/80 text-sm mb-1">Rating</div>
            <div className="text-white">⭐ 4.8</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
            <div className="text-white/80 text-sm mb-1">Lessons</div>
            <div className="text-white">3 sections</div>
          </div>
        </div>

        {/* Introduction */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <h3 className="text-white mb-3">Introduction</h3>
          <p className="text-white/90 mb-4">
            Start your math journey by learning numbers! Count, identify, and write numbers from 1 to 20.
          </p>
          
          <h4 className="text-white mb-3">Learning Objectives</h4>
          <ul className="space-y-2 mb-4">
            <li className="flex items-start gap-2 text-white/90">
              <CheckCircle className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
              <span>Count objects up to 20</span>
            </li>
            <li className="flex items-start gap-2 text-white/90">
              <CheckCircle className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
              <span>Recognize and write numbers</span>
            </li>
            <li className="flex items-start gap-2 text-white/90">
              <CheckCircle className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
              <span>Understand number order</span>
            </li>
            <li className="flex items-start gap-2 text-white/90">
              <CheckCircle className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
              <span>Practice number patterns</span>
            </li>
          </ul>

          <h4 className="text-white mb-3">Activities Included</h4>
          <div className="space-y-2">
            <div className="flex items-center gap-3 bg-white/10 rounded-lg p-3">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center text-white">1</div>
              <span className="text-white/90">Counting Game</span>
            </div>
            <div className="flex items-center gap-3 bg-white/10 rounded-lg p-3">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center text-white">2</div>
              <span className="text-white/90">Number Matching</span>
            </div>
          </div>
        </div>
      </div>

      {/* Section 1: Count with Objects */}
      <div>
        <div className="mb-6">
          <h2 className="text-slate-800 dark:text-slate-100 mb-2">1. Count with Objects</h2>
          <p className="text-slate-600 dark:text-slate-400">
            Look at groups of items. Say the number as you count them one by one. Match each object to one number.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-8">
          <div className="space-y-8">
            {/* Counting Instructions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
                <div className="text-4xl mb-3">👆</div>
                <h4 className="text-slate-800 dark:text-slate-100 mb-2">Step 1</h4>
                <p className="text-slate-600 dark:text-slate-400">
                  Drag your finger under each object while counting.
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-6 border border-green-200 dark:border-green-800">
                <div className="text-4xl mb-3">🛑</div>
                <h4 className="text-slate-800 dark:text-slate-100 mb-2">Step 2</h4>
                <p className="text-slate-600 dark:text-slate-400">
                  Stop when there are no more objects.
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6 border border-purple-200 dark:border-purple-800">
                <div className="text-4xl mb-3">📢</div>
                <h4 className="text-slate-800 dark:text-slate-100 mb-2">Step 3</h4>
                <p className="text-slate-600 dark:text-slate-400">
                  Say the final number a bit louder – that's "how many"!
                </p>
              </div>
            </div>

            {/* Interactive Counting Groups */}
            {objectGroups.map((group, groupIndex) => {
              const countedInGroup = countedObjects.filter(k => Math.floor(k / 100) === groupIndex).length;
              
              return (
                <div key={groupIndex} className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900/50 dark:to-slate-800/50 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-slate-800 dark:text-slate-100">
                      Count the {group.name}
                    </h3>
                    <Button
                      onClick={() => resetCounting(groupIndex)}
                      variant="outline"
                      size="sm"
                      className="dark:bg-slate-800 dark:border-slate-700"
                    >
                      Reset
                    </Button>
                  </div>
                  
                  {/* Objects Grid */}
                  <div className="flex flex-wrap gap-4 mb-4 justify-center">
                    {Array.from({ length: group.count }).map((_, objectIndex) => {
                      const key = groupIndex * 100 + objectIndex;
                      const isCounted = countedObjects.includes(key);
                      
                      return (
                        <button
                          key={objectIndex}
                          onClick={() => handleObjectClick(groupIndex, objectIndex)}
                          className={`w-20 h-20 rounded-xl flex items-center justify-center text-5xl transition-all transform ${
                            isCounted
                              ? 'bg-gradient-to-br from-emerald-500 to-green-600 scale-110 shadow-lg'
                              : 'bg-white dark:bg-slate-700 hover:bg-blue-50 dark:hover:bg-slate-600 hover:scale-105 border-2 border-slate-300 dark:border-slate-600'
                          }`}
                        >
                          {group.emoji}
                        </button>
                      );
                    })}
                  </div>

                  {/* Counter Display */}
                  <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border-2 border-dashed border-blue-300 dark:border-blue-700">
                    <div className="text-center">
                      <div className="text-sm text-slate-600 dark:text-slate-400 mb-2">You counted:</div>
                      <div className={`text-6xl mb-2 transition-all ${
                        countedInGroup === group.count ? 'text-emerald-600 dark:text-emerald-400' : 'text-blue-600 dark:text-blue-400'
                      }`}>
                        {countedInGroup}
                      </div>
                      {countedInGroup === group.count && (
                        <div className="flex items-center justify-center gap-2 text-emerald-600 dark:text-emerald-400">
                          <CheckCircle className="w-5 h-5" />
                          <span className="text-sm">Perfect! There are {group.count} {group.name}!</span>
                        </div>
                      )}
                      {countedInGroup > 0 && countedInGroup !== group.count && (
                        <div className="text-sm text-blue-600 dark:text-blue-400">
                          Keep counting! Click each {group.emoji}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Section 2: Number Line Fun */}
      <div>
        <div className="mb-6">
          <h2 className="text-slate-800 dark:text-slate-100 mb-2">2. Number Line Fun</h2>
          <p className="text-slate-600 dark:text-slate-400">
            Use a number line from 0–20 to see which numbers come before and after each other.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-8">
          <div className="space-y-8">
            {/* Interactive Number Line */}
            <div className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl p-8 text-white">
              <h3 className="text-white mb-6 flex items-center gap-2">
                <Hand className="w-6 h-6" />
                Click on Numbers!
              </h3>

              {/* Number Line 0-10 */}
              <div className="mb-6">
                <div className="text-white/80 text-sm mb-3">Number Line 0-10</div>
                <div className="flex gap-2 overflow-x-auto pb-4 justify-center">
                  {Array.from({ length: 11 }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedNumberLine(i)}
                      className={`min-w-[80px] h-20 rounded-xl flex items-center justify-center text-3xl transition-all ${
                        selectedNumberLine === i
                          ? 'bg-white text-purple-600 shadow-lg scale-110 ring-4 ring-white/50'
                          : 'bg-white/20 backdrop-blur-sm border-2 border-white/30 text-white hover:bg-white/30'
                      }`}
                    >
                      {i}
                    </button>
                  ))}
                </div>
              </div>

              {/* Number Line 11-20 */}
              <div>
                <div className="text-white/80 text-sm mb-3">Number Line 11-20</div>
                <div className="flex gap-2 overflow-x-auto pb-4 justify-center">
                  {Array.from({ length: 10 }).map((_, i) => {
                    const num = i + 11;
                    return (
                      <button
                        key={num}
                        onClick={() => setSelectedNumberLine(num)}
                        className={`min-w-[80px] h-20 rounded-xl flex items-center justify-center text-3xl transition-all ${
                          selectedNumberLine === num
                            ? 'bg-white text-purple-600 shadow-lg scale-110 ring-4 ring-white/50'
                            : 'bg-white/20 backdrop-blur-sm border-2 border-white/30 text-white hover:bg-white/30'
                        }`}
                      >
                        {num}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Selected Number Info */}
              {selectedNumberLine !== null && (
                <div className="mt-6 bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/30">
                  <div className="text-center">
                    <div className="text-white/80 text-sm mb-2">You selected:</div>
                    <div className="text-6xl text-white mb-4">{selectedNumberLine}</div>
                    <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
                      <div className="bg-white/20 rounded-lg p-3">
                        <div className="text-white/70 text-xs mb-1">Before</div>
                        <div className="text-2xl text-white">
                          {selectedNumberLine > 0 ? selectedNumberLine - 1 : '—'}
                        </div>
                      </div>
                      <div className="bg-white rounded-lg p-3">
                        <div className="text-purple-400 text-xs mb-1">Current</div>
                        <div className="text-2xl text-purple-600">{selectedNumberLine}</div>
                      </div>
                      <div className="bg-white/20 rounded-lg p-3">
                        <div className="text-white/70 text-xs mb-1">After</div>
                        <div className="text-2xl text-white">
                          {selectedNumberLine < 20 ? selectedNumberLine + 1 : '—'}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Practice Questions */}
            <div>
              <h3 className="text-slate-800 dark:text-slate-100 mb-4">Practice Questions</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {numberLineQuestions.map((q, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-cyan-100 to-blue-100 dark:from-cyan-900/20 dark:to-blue-900/20 rounded-xl p-6 border border-cyan-200 dark:border-cyan-800"
                  >
                    <div className="text-3xl mb-3">🤔</div>
                    <p className="text-slate-700 dark:text-slate-300 mb-4 text-sm">
                      {q.question}
                    </p>
                    <div className="bg-white dark:bg-slate-800 rounded-lg p-4 text-center">
                      <div className="text-sm text-slate-600 dark:text-slate-400 mb-2">Answer:</div>
                      <div className="text-4xl text-blue-600 dark:text-blue-400">{q.answer}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Helpful Tips */}
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-xl p-6 border border-yellow-200 dark:border-yellow-800">
              <h4 className="text-slate-800 dark:text-slate-100 mb-4">💡 Number Line Tips</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <ChevronRight className="w-5 h-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700 dark:text-slate-300">
                    Moving right on the number line means the numbers get bigger
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <ChevronLeft className="w-5 h-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700 dark:text-slate-300">
                    Moving left on the number line means the numbers get smaller
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <ArrowRight className="w-5 h-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700 dark:text-slate-300">
                    Each number is exactly 1 more than the number before it
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Section 3: Number Patterns & Sequences */}
      <div>
        <div className="mb-6">
          <h2 className="text-slate-800 dark:text-slate-100 mb-2">3. Number Patterns & Sequences</h2>
          <p className="text-slate-600 dark:text-slate-400">
            Discover patterns in numbers! Look at the sequence and find what comes next.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-8">
          <div className="space-y-8">
            {/* Pattern Introduction */}
            <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl p-8 text-white">
              <h3 className="text-white mb-4 flex items-center gap-2">
                <span className="text-3xl">🎨</span>
                Understanding Patterns
              </h3>
              <p className="text-white/90 mb-6">
                A pattern is when something repeats or follows a special rule. Let's look at some number patterns!
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/30">
                  <div className="text-center">
                    <div className="text-sm text-white/70 mb-2">Repeating Pattern</div>
                    <div className="text-4xl mb-3 flex gap-2 justify-center">
                      <span>🔴</span>
                      <span>🔵</span>
                      <span>🔴</span>
                      <span>🔵</span>
                      <span>❓</span>
                    </div>
                    <p className="text-white/90 text-sm">
                      What comes next? <strong className="text-yellow-300">🔴</strong>
                    </p>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/30">
                  <div className="text-center">
                    <div className="text-sm text-white/70 mb-2">Growing Pattern</div>
                    <div className="text-4xl mb-3 flex gap-2 justify-center">
                      <span>1</span>
                      <span>→</span>
                      <span>2</span>
                      <span>→</span>
                      <span>3</span>
                      <span>→</span>
                      <span>❓</span>
                    </div>
                    <p className="text-white/90 text-sm">
                      What comes next? <strong className="text-yellow-300">4</strong>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Pattern Challenges */}
            <div>
              <h3 className="text-slate-800 dark:text-slate-100 mb-6">Try These Pattern Challenges!</h3>
              <div className="space-y-6">
                {patterns.map((pattern) => {
                  const isCorrect = patternAnswers[pattern.id] === pattern.answer;
                  const hasAnswered = patternAnswers[pattern.id] !== undefined;
                  const colorClasses = {
                    blue: 'from-blue-100 to-cyan-100 dark:from-blue-900/20 dark:to-cyan-900/20 border-blue-200 dark:border-blue-800',
                    purple: 'from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 border-purple-200 dark:border-purple-800',
                    green: 'from-green-100 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800',
                  };

                  return (
                    <div
                      key={pattern.id}
                      className={`bg-gradient-to-br ${colorClasses[pattern.color as keyof typeof colorClasses]} rounded-xl p-6 border`}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-slate-800 dark:text-slate-100">{pattern.description}</h4>
                        {isCorrect && (
                          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                            <CheckCircle className="w-5 h-5" />
                            <span className="text-sm">Correct!</span>
                          </div>
                        )}
                      </div>

                      {/* Pattern Sequence */}
                      <div className="flex items-center justify-center gap-3 mb-6 flex-wrap">
                        {pattern.sequence.map((num, idx) => (
                          <div
                            key={idx}
                            className={`w-16 h-16 rounded-xl flex items-center justify-center text-2xl ${
                              num === '?'
                                ? 'bg-white dark:bg-slate-700 border-2 border-dashed border-slate-400 dark:border-slate-500 text-slate-400 dark:text-slate-500'
                                : 'bg-white dark:bg-slate-700 shadow-md'
                            }`}
                          >
                            {num}
                          </div>
                        ))}
                      </div>

                      {/* Answer Options */}
                      {!isCorrect && (
                        <div className="flex gap-3 justify-center">
                          {pattern.options.map((option) => (
                            <button
                              key={option}
                              onClick={() => checkPatternAnswer(pattern.id, option)}
                              disabled={showPatternFeedback[pattern.id]}
                              className={`w-20 h-20 rounded-xl flex items-center justify-center text-2xl transition-all hover:scale-105 ${
                                patternAnswers[pattern.id] === option
                                  ? option === pattern.answer
                                    ? 'bg-emerald-500 text-white shadow-lg'
                                    : 'bg-red-500 text-white shadow-lg'
                                  : 'bg-white dark:bg-slate-700 hover:bg-slate-50 dark:hover:bg-slate-600 shadow-md'
                              }`}
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                      )}

                      {/* Feedback */}
                      {showPatternFeedback[pattern.id] && !isCorrect && (
                        <div className="mt-4 text-center">
                          <div className="text-2xl mb-2">
                            {patternAnswers[pattern.id] === pattern.answer ? '🎉' : '💭'}
                          </div>
                          <p className="text-slate-700 dark:text-slate-300">
                            {patternAnswers[pattern.id] === pattern.answer
                              ? 'Amazing! You found the pattern!'
                              : `Try again! The answer is ${pattern.answer}`}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Visual Pattern Examples */}
            <div>
              <h4 className="text-slate-800 dark:text-slate-100 mb-4">Pattern Practice with Shapes!</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-yellow-100 to-orange-100 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-xl p-6 border border-yellow-200 dark:border-yellow-800">
                  <div className="text-3xl mb-3">🔢</div>
                  <h5 className="text-slate-800 dark:text-slate-100 mb-2">ABC Pattern</h5>
                  <div className="text-3xl flex gap-2 mb-3">
                    🟥 🟦 🟩 🟥 🟦 🟩
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 text-sm">
                    This pattern repeats: <strong>Red, Blue, Green</strong>
                  </p>
                </div>

                <div className="bg-gradient-to-br from-pink-100 to-rose-100 dark:from-pink-900/20 dark:to-rose-900/20 rounded-xl p-6 border border-pink-200 dark:border-pink-800">
                  <div className="text-3xl mb-3">✨</div>
                  <h5 className="text-slate-800 dark:text-slate-100 mb-2">Growing Pattern</h5>
                  <div className="text-2xl flex gap-2 mb-3 items-end">
                    <span>⭐</span>
                    <span>⭐⭐</span>
                    <span>⭐⭐⭐</span>
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 text-sm">
                    Each group adds <strong>one more star</strong>
                  </p>
                </div>

                <div className="bg-gradient-to-br from-cyan-100 to-blue-100 dark:from-cyan-900/20 dark:to-blue-900/20 rounded-xl p-6 border border-cyan-200 dark:border-cyan-800">
                  <div className="text-3xl mb-3">🎵</div>
                  <h5 className="text-slate-800 dark:text-slate-100 mb-2">Skip Counting by 2</h5>
                  <div className="text-3xl flex gap-2 mb-3">
                    2 · 4 · 6 · 8 · 10
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 text-sm">
                    Each number is <strong>2 more</strong> than the last!
                  </p>
                </div>

                <div className="bg-gradient-to-br from-violet-100 to-purple-100 dark:from-violet-900/20 dark:to-purple-900/20 rounded-xl p-6 border border-violet-200 dark:border-violet-800">
                  <div className="text-3xl mb-3">🌈</div>
                  <h5 className="text-slate-800 dark:text-slate-100 mb-2">Skip Counting by 5</h5>
                  <div className="text-3xl flex gap-2 mb-3">
                    5 · 10 · 15 · 20
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 text-sm">
                    Each number is <strong>5 more</strong> than the last!
                  </p>
                </div>
              </div>
            </div>

            {/* Pattern Tips */}
            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 rounded-xl p-6 border border-indigo-200 dark:border-indigo-800">
              <h4 className="text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-2">
                <span className="text-2xl">💡</span>
                Tips for Finding Patterns
              </h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-indigo-600 dark:text-indigo-400 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700 dark:text-slate-300">
                    Look at the first few numbers carefully - what's changing?
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-indigo-600 dark:text-indigo-400 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700 dark:text-slate-300">
                    Check if numbers are getting bigger or smaller
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-indigo-600 dark:text-indigo-400 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700 dark:text-slate-300">
                    See if the pattern repeats the same numbers over and over
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-indigo-600 dark:text-indigo-400 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700 dark:text-slate-300">
                    Try counting the difference between numbers
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Completion Section */}
      <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl p-8 shadow-lg">
        <div className="flex items-center gap-4 mb-4">
          <CheckCircle className="w-12 h-12 text-white" />
          <div className="text-white">
            <h3 className="text-white mb-1">Ready to Complete This Lesson?</h3>
            <p className="text-white/90">You've learned about counting, number lines, and comparing numbers!</p>
          </div>
        </div>
        <div className="flex gap-3">
          {!isLessonCompleted ? (
            <>
              <Button 
                onClick={() => {
                  completeLesson(lessonId);
                  setShowCompletionDialog(true);
                }}
                className="bg-white text-emerald-600 hover:bg-emerald-50"
              >
                <Trophy className="w-4 h-4 mr-2" />
                Complete Lesson
              </Button>
              <Button 
                onClick={handleSaveAndExit}
                variant="outline"
                className="bg-white/10 border-white/30 text-white hover:bg-white/20"
              >
                Save & Exit
              </Button>
            </>
          ) : (
            <Button 
              onClick={onBack}
              className="bg-white text-emerald-600 hover:bg-emerald-50"
            >
              Back to Lessons
            </Button>
          )}
        </div>
      </div>

      {/* Completion Dialog */}
      <Dialog open={showCompletionDialog} onOpenChange={setShowCompletionDialog}>
        <DialogContent className="sm:max-w-md">
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center">
              <Trophy className="w-10 h-10 text-white" />
            </div>
          </div>
          <DialogHeader>
            <DialogTitle className="text-center text-2xl">Lesson Completed! 🎉</DialogTitle>
            <DialogDescription className="text-center">
              Congratulations! You've successfully completed the Introduction to Numbers lesson.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 border border-emerald-200 dark:border-emerald-800/30 rounded-xl p-4">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Award className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                <span className="text-emerald-700 dark:text-emerald-300">+100 Points Earned</span>
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400 text-center">
                Great job learning about numbers! You can now count, compare, and understand number order!
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 mt-4">
            <Button 
              onClick={() => {
                setShowCompletionDialog(false);
                onBack();
              }}
              className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700"
            >
              Back to Lessons
            </Button>
            <Button 
              onClick={() => setShowCompletionDialog(false)}
              variant="outline"
            >
              Continue Reviewing
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}