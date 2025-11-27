import { ArrowLeft, Award, Trophy, CheckCircle, X, RefreshCw } from 'lucide-react';
import { Button } from './ui/button';
import { useState, useEffect } from 'react';
import { useApp } from '../contexts/AppContext';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';

interface NumberCountingActivityProps {
  onBack: () => void;
}

type GameSection = 'counting' | 'matching' | 'sequence';

interface CountingQuestion {
  id: number;
  objects: string[];
  correctAnswer: number;
  options: number[];
}

interface MatchingQuestion {
  id: number;
  number: number;
  correctCount: number;
  emoji: string;
}

interface SequenceQuestion {
  id: number;
  sequence: number[];
  missingIndex: number;
  correctAnswer: number;
  options: number[];
}

export function NumberCountingActivity({ onBack }: NumberCountingActivityProps) {
  const { completeActivity } = useApp();
  const [currentSection, setCurrentSection] = useState<GameSection>('counting');
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [showCompletionDialog, setShowCompletionDialog] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  // Counting Section State
  const [currentCountingQ, setCurrentCountingQ] = useState(0);
  const [countingAnswered, setCountingAnswered] = useState<boolean[]>([]);

  // Matching Section State
  const [matchingPairs, setMatchingPairs] = useState<{number: number, count: number}[]>([]);
  const [matchingScore, setMatchingScore] = useState(0);

  // Sequence Section State
  const [currentSequenceQ, setCurrentSequenceQ] = useState(0);
  const [sequenceAnswered, setSequenceAnswered] = useState<boolean[]>([]);

  // Questions data
  const countingQuestions: CountingQuestion[] = [
    {
      id: 1,
      objects: ['🍎', '🍎', '🍎', '🍎', '🍎'],
      correctAnswer: 5,
      options: [3, 5, 7, 4]
    },
    {
      id: 2,
      objects: ['⭐', '⭐', '⭐', '⭐', '⭐', '⭐', '⭐', '⭐'],
      correctAnswer: 8,
      options: [6, 8, 9, 7]
    },
    {
      id: 3,
      objects: ['🔵', '🔵', '🔵'],
      correctAnswer: 3,
      options: [2, 3, 4, 5]
    },
    {
      id: 4,
      objects: ['🌟', '🌟', '🌟', '🌟', '🌟', '🌟', '🌟'],
      correctAnswer: 7,
      options: [5, 6, 7, 8]
    },
    {
      id: 5,
      objects: ['🧁', '🧁', '🧁', '🧁', '🧁', '🧁'],
      correctAnswer: 6,
      options: [4, 5, 6, 7]
    },
  ];

  const sequenceQuestions: SequenceQuestion[] = [
    {
      id: 1,
      sequence: [1, 2, -1, 4, 5],
      missingIndex: 2,
      correctAnswer: 3,
      options: [2, 3, 4, 5]
    },
    {
      id: 2,
      sequence: [5, 6, 7, -1, 9],
      missingIndex: 3,
      correctAnswer: 8,
      options: [7, 8, 9, 10]
    },
    {
      id: 3,
      sequence: [10, 11, 12, 13, -1],
      missingIndex: 4,
      correctAnswer: 14,
      options: [13, 14, 15, 16]
    },
    {
      id: 4,
      sequence: [2, 4, 6, -1, 10],
      missingIndex: 3,
      correctAnswer: 8,
      options: [7, 8, 9, 10]
    },
    {
      id: 5,
      sequence: [-1, 10, 15, 20, 25],
      missingIndex: 0,
      correctAnswer: 5,
      options: [0, 5, 10, 15]
    },
  ];

  useEffect(() => {
    // Initialize answered arrays
    setCountingAnswered(new Array(countingQuestions.length).fill(false));
    setSequenceAnswered(new Array(sequenceQuestions.length).fill(false));
  }, []);

  const handleCountingAnswer = (answer: number) => {
    const question = countingQuestions[currentCountingQ];
    const correct = answer === question.correctAnswer;
    
    setIsCorrect(correct);
    setShowFeedback(true);

    if (correct && !countingAnswered[currentCountingQ]) {
      setScore(prev => prev + 1);
      const newAnswered = [...countingAnswered];
      newAnswered[currentCountingQ] = true;
      setCountingAnswered(newAnswered);
    }

    setTotalQuestions(prev => prev + 1);

    setTimeout(() => {
      setShowFeedback(false);
      if (currentCountingQ < countingQuestions.length - 1) {
        setCurrentCountingQ(prev => prev + 1);
      } else {
        setCurrentSection('matching');
      }
    }, 1500);
  };

  const generateMatchingQuestion = () => {
    const number = Math.floor(Math.random() * 9) + 1;
    const correctCount = number;
    setMatchingPairs([{ number, count: 0 }]);
  };

  useEffect(() => {
    if (currentSection === 'matching') {
      generateMatchingQuestion();
    }
  }, [currentSection]);

  const handleMatchingClick = () => {
    const current = matchingPairs[0];
    const newCount = current.count + 1;

    if (newCount === current.number) {
      // Correct!
      setScore(prev => prev + 1);
      setTotalQuestions(prev => prev + 1);
      setMatchingScore(prev => prev + 1);
      
      setIsCorrect(true);
      setShowFeedback(true);

      setTimeout(() => {
        setShowFeedback(false);
        if (matchingScore >= 4) {
          setCurrentSection('sequence');
        } else {
          generateMatchingQuestion();
        }
      }, 1500);
    } else if (newCount > current.number) {
      // Too many!
      setIsCorrect(false);
      setShowFeedback(true);
      setTotalQuestions(prev => prev + 1);

      setTimeout(() => {
        setShowFeedback(false);
        generateMatchingQuestion();
      }, 1500);
    } else {
      // Keep counting
      setMatchingPairs([{ number: current.number, count: newCount }]);
    }
  };

  const handleSequenceAnswer = (answer: number) => {
    const question = sequenceQuestions[currentSequenceQ];
    const correct = answer === question.correctAnswer;
    
    setIsCorrect(correct);
    setShowFeedback(true);

    if (correct && !sequenceAnswered[currentSequenceQ]) {
      setScore(prev => prev + 1);
      const newAnswered = [...sequenceAnswered];
      newAnswered[currentSequenceQ] = true;
      setSequenceAnswered(newAnswered);
    }

    setTotalQuestions(prev => prev + 1);

    setTimeout(() => {
      setShowFeedback(false);
      if (currentSequenceQ < sequenceQuestions.length - 1) {
        setCurrentSequenceQ(prev => prev + 1);
      } else {
        // Activity complete
        const finalScore = score + (correct ? 1 : 0);
        const maxScore = countingQuestions.length + 5 + sequenceQuestions.length;
        completeActivity(2, finalScore, maxScore);
        setShowCompletionDialog(true);
      }
    }, 1500);
  };

  const getGrade = () => {
    const maxScore = countingQuestions.length + 5 + sequenceQuestions.length;
    const percentage = (score / maxScore) * 100;
    if (percentage >= 95) return 'A+';
    if (percentage >= 90) return 'A';
    if (percentage >= 85) return 'B+';
    if (percentage >= 80) return 'B';
    if (percentage >= 70) return 'C';
    return 'D';
  };

  const getPercentage = () => {
    const maxScore = countingQuestions.length + 5 + sequenceQuestions.length;
    return Math.round((score / maxScore) * 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 mb-6 border border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={onBack}
                className="dark:hover:bg-slate-700"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <div>
                <h1 className="text-slate-800 dark:text-slate-100 flex items-center gap-2">
                  <span className="text-3xl">🔢</span>
                  Number Counting Adventure
                </h1>
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  Practice counting and number recognition
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl text-blue-600 dark:text-blue-400 mb-1">
                {score} / {totalQuestions}
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400">
                Correct Answers
              </div>
            </div>
          </div>

          {/* Progress Indicator */}
          <div className="mt-4 flex items-center gap-2">
            <div className={`px-3 py-1 rounded-full text-sm ${
              currentSection === 'counting' 
                ? 'bg-blue-500 text-white' 
                : 'bg-emerald-500 text-white'
            }`}>
              1. Count Objects
            </div>
            <div className={`px-3 py-1 rounded-full text-sm ${
              currentSection === 'matching' 
                ? 'bg-blue-500 text-white' 
                : currentSection === 'sequence'
                ? 'bg-emerald-500 text-white'
                : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400'
            }`}>
              2. Match Numbers
            </div>
            <div className={`px-3 py-1 rounded-full text-sm ${
              currentSection === 'sequence' 
                ? 'bg-blue-500 text-white' 
                : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400'
            }`}>
              3. Number Sequence
            </div>
          </div>
        </div>

        {/* Game Content */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 border border-slate-200 dark:border-slate-700">
          
          {/* Counting Section */}
          {currentSection === 'counting' && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h2 className="text-slate-800 dark:text-slate-100 mb-2">
                  Count the Objects
                </h2>
                <p className="text-slate-600 dark:text-slate-400">
                  How many objects do you see? Count carefully!
                </p>
                <div className="text-sm text-slate-500 dark:text-slate-500 mt-2">
                  Question {currentCountingQ + 1} of {countingQuestions.length}
                </div>
              </div>

              {/* Objects Display */}
              <div className="bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl p-8 border border-blue-200 dark:border-blue-800">
                <div className="flex flex-wrap justify-center gap-4">
                  {countingQuestions[currentCountingQ].objects.map((obj, idx) => (
                    <div 
                      key={idx}
                      className="w-16 h-16 bg-white dark:bg-slate-700 rounded-xl flex items-center justify-center text-4xl shadow-lg transition-transform hover:scale-110"
                    >
                      {obj}
                    </div>
                  ))}
                </div>
              </div>

              {/* Answer Options */}
              {!showFeedback && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {countingQuestions[currentCountingQ].options.map((option) => (
                    <button
                      key={option}
                      onClick={() => handleCountingAnswer(option)}
                      className="bg-gradient-to-br from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white rounded-xl p-6 shadow-lg transition-all hover:scale-105"
                    >
                      <div className="text-5xl mb-2">{option}</div>
                      <div className="text-sm opacity-90">Click me!</div>
                    </button>
                  ))}
                </div>
              )}

              {/* Feedback */}
              {showFeedback && (
                <div className={`text-center p-8 rounded-2xl ${
                  isCorrect ? 'bg-emerald-500' : 'bg-red-500'
                }`}>
                  <div className="text-6xl mb-3">
                    {isCorrect ? '🎉' : '💭'}
                  </div>
                  <div className="text-3xl text-white mb-2">
                    {isCorrect ? 'Correct!' : 'Try Again!'}
                  </div>
                  {!isCorrect && (
                    <div className="text-white/90">
                      The correct answer is {countingQuestions[currentCountingQ].correctAnswer}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Matching Section */}
          {currentSection === 'matching' && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h2 className="text-slate-800 dark:text-slate-100 mb-2">
                  Match the Number
                </h2>
                <p className="text-slate-600 dark:text-slate-400">
                  Click the button until you have the right number of stars!
                </p>
                <div className="text-sm text-slate-500 dark:text-slate-500 mt-2">
                  Question {matchingScore + 1} of 5
                </div>
              </div>

              {/* Target Number */}
              <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl p-8 text-center">
                <div className="text-white/90 mb-3">Make this many stars:</div>
                <div className="text-8xl text-white mb-3">
                  {matchingPairs[0]?.number}
                </div>
              </div>

              {/* Stars Display */}
              <div className="bg-gradient-to-br from-yellow-100 to-orange-100 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-2xl p-8 border border-yellow-200 dark:border-yellow-800 min-h-[200px]">
                <div className="flex flex-wrap justify-center gap-4">
                  {Array.from({ length: matchingPairs[0]?.count || 0 }).map((_, idx) => (
                    <div 
                      key={idx}
                      className="text-6xl animate-in fade-in zoom-in duration-300"
                    >
                      ⭐
                    </div>
                  ))}
                </div>
                <div className="text-center mt-4 text-2xl text-slate-700 dark:text-slate-300">
                  {matchingPairs[0]?.count || 0} star{matchingPairs[0]?.count !== 1 ? 's' : ''}
                </div>
              </div>

              {/* Add Star Button */}
              {!showFeedback && (
                <div className="flex justify-center">
                  <button
                    onClick={handleMatchingClick}
                    className="bg-gradient-to-br from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white rounded-2xl px-12 py-6 shadow-lg transition-all hover:scale-105 text-xl"
                  >
                    ⭐ Add a Star
                  </button>
                </div>
              )}

              {/* Feedback */}
              {showFeedback && (
                <div className={`text-center p-8 rounded-2xl ${
                  isCorrect ? 'bg-emerald-500' : 'bg-red-500'
                }`}>
                  <div className="text-6xl mb-3">
                    {isCorrect ? '🎉' : '💭'}
                  </div>
                  <div className="text-3xl text-white mb-2">
                    {isCorrect ? 'Perfect Match!' : 'Oops! Too Many!'}
                  </div>
                  {!isCorrect && (
                    <div className="text-white/90">
                      Try again with a new number!
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Sequence Section */}
          {currentSection === 'sequence' && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h2 className="text-slate-800 dark:text-slate-100 mb-2">
                  Complete the Sequence
                </h2>
                <p className="text-slate-600 dark:text-slate-400">
                  What number is missing from the sequence?
                </p>
                <div className="text-sm text-slate-500 dark:text-slate-500 mt-2">
                  Question {currentSequenceQ + 1} of {sequenceQuestions.length}
                </div>
              </div>

              {/* Sequence Display */}
              <div className="bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-8 border border-green-200 dark:border-green-800">
                <div className="flex justify-center items-center gap-3 flex-wrap">
                  {sequenceQuestions[currentSequenceQ].sequence.map((num, idx) => (
                    <div
                      key={idx}
                      className={`w-20 h-20 rounded-xl flex items-center justify-center text-3xl ${
                        num === -1
                          ? 'bg-white dark:bg-slate-700 border-4 border-dashed border-blue-400 dark:border-blue-600 text-blue-400 dark:text-blue-600'
                          : 'bg-white dark:bg-slate-700 shadow-lg'
                      }`}
                    >
                      {num === -1 ? '?' : num}
                    </div>
                  ))}
                </div>
              </div>

              {/* Answer Options */}
              {!showFeedback && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {sequenceQuestions[currentSequenceQ].options.map((option) => (
                    <button
                      key={option}
                      onClick={() => handleSequenceAnswer(option)}
                      className="bg-gradient-to-br from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-xl p-6 shadow-lg transition-all hover:scale-105"
                    >
                      <div className="text-5xl mb-2">{option}</div>
                      <div className="text-sm opacity-90">Click me!</div>
                    </button>
                  ))}
                </div>
              )}

              {/* Feedback */}
              {showFeedback && (
                <div className={`text-center p-8 rounded-2xl ${
                  isCorrect ? 'bg-emerald-500' : 'bg-red-500'
                }`}>
                  <div className="text-6xl mb-3">
                    {isCorrect ? '🎉' : '💭'}
                  </div>
                  <div className="text-3xl text-white mb-2">
                    {isCorrect ? 'Correct!' : 'Try Again!'}
                  </div>
                  {!isCorrect && (
                    <div className="text-white/90">
                      The correct answer is {sequenceQuestions[currentSequenceQ].correctAnswer}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Completion Dialog */}
      <Dialog open={showCompletionDialog} onOpenChange={setShowCompletionDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-2xl">
              <Trophy className="w-8 h-8 text-yellow-500" />
              Activity Complete!
            </DialogTitle>
            <DialogDescription>
              Congratulations! You've completed the Number Counting Adventure!
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            {/* Score Display */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6">
              <div className="text-center mb-4">
                <div className="text-6xl mb-3">
                  {getPercentage() >= 90 ? '🌟' : getPercentage() >= 70 ? '⭐' : '💪'}
                </div>
                <div className="text-4xl text-blue-600 dark:text-blue-400 mb-2">
                  {getPercentage()}%
                </div>
                <div className="text-slate-600 dark:text-slate-400">
                  Grade: <span className="text-slate-800 dark:text-slate-200 text-xl">{getGrade()}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600 dark:text-slate-400">Correct Answers:</span>
                <span className="text-slate-800 dark:text-slate-200">{score} / 15</span>
              </div>
              <div className="flex items-center justify-between text-sm mt-2">
                <span className="text-slate-600 dark:text-slate-400">Points Earned:</span>
                <span className="text-slate-800 dark:text-slate-200">+120</span>
              </div>
            </div>

            {/* Achievements */}
            <div className="space-y-2">
              {getPercentage() === 100 && (
                <div className="flex items-center gap-2 p-3 bg-yellow-100 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                  <Award className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                  <span className="text-slate-800 dark:text-slate-200">Perfect Score!</span>
                </div>
              )}
              {getPercentage() >= 90 && (
                <div className="flex items-center gap-2 p-3 bg-blue-100 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <span className="text-slate-800 dark:text-slate-200">Excellent Work!</span>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <Button
                onClick={onBack}
                className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700"
              >
                Back to Activities
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
