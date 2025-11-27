import { useState } from 'react';
import { ArrowLeft, Star, Book, CheckCircle } from 'lucide-react';

interface ReadingComprehensionActivityProps {
  onBack: () => void;
}

export function ReadingComprehensionActivity({ onBack }: ReadingComprehensionActivityProps) {
  // Module 1: The Sound Match (Phonics)
  const [soundMatchAnswers, setSoundMatchAnswers] = useState<Record<number, string>>({});
  const [currentSoundScenario, setCurrentSoundScenario] = useState(0);

  // Module 2: The Blending Train (CVC Words)
  const [trainAnswers, setTrainAnswers] = useState<Record<number, string[]>>({});
  const [currentTrain, setCurrentTrain] = useState(0);
  const [trainPieces, setTrainPieces] = useState<string[]>([]);

  // Module 3: Finger Trace
  const [traceCompleted, setTraceCompleted] = useState<Set<number>>(new Set());
  const [currentTraceLetter, setCurrentTraceLetter] = useState(0);
  const [isTracing, setIsTracing] = useState(false);

  // Module 4: Tiny Story Builder
  const [storyAnswers, setStoryAnswers] = useState<Record<number, boolean>>({});
  const [currentStory, setCurrentStory] = useState(0);

  // Sound Match Data
  const soundScenarios = [
    {
      letter: 'B',
      sound: '/buh/',
      options: [
        { emoji: '⚽', name: 'Ball', correct: true, feedback: 'B is for Ball! /buh/ /buh/ Ball.' },
        { emoji: '🍎', name: 'Apple', correct: false, feedback: 'Try again! Apple starts with A.' },
        { emoji: '☀️', name: 'Sun', correct: false, feedback: 'Try again! Sun starts with S.' }
      ]
    },
    {
      letter: 'M',
      sound: '/muh/',
      options: [
        { emoji: '🐟', name: 'Fish', correct: false, feedback: 'Try again! Fish starts with F.' },
        { emoji: '🌙', name: 'Moon', correct: true, feedback: 'M is for Moon! /muh/ /muh/ Moon.' },
        { emoji: '📦', name: 'Box', correct: false, feedback: 'Try again! Box starts with B.' }
      ]
    },
    {
      letter: 'S',
      sound: '/sss/',
      options: [
        { emoji: '🎩', name: 'Hat', correct: false, feedback: 'Try again! Hat starts with H.' },
        { emoji: '☀️', name: 'Sun', correct: true, feedback: 'S is for Sun! /sss/ /sss/ Sun.' },
        { emoji: '🦁', name: 'Lion', correct: false, feedback: 'Try again! Lion starts with L.' }
      ]
    }
    
  ];

  // Blending Train Data
  const trainWords = [
    { word: 'CAT', sounds: ['C', 'A', 'T'], image: '🐱', meaning: 'A furry pet that meows' },
    { word: 'DOG', sounds: ['D', 'O', 'G'], image: '🐕', meaning: 'A four-legged friend' },
    { word: 'SUN', sounds: ['S', 'U', 'N'], image: '☀️', meaning: 'Bright light in the sky' }
  ];

  // Trace Letters
  const traceLetters = [
    { letter: 'A', object: 'Apple', emoji: '🍎' },
    { letter: 'B', object: 'Ball', emoji: '⚽' },
    { letter: 'C', object: 'Cat', emoji: '🐱' }
  ];

  // Tiny Stories
  const tinyStories = [
    {
      text: 'The cat is on the mat.',
      image: '🐱',
      sticker: '🐱',
      question: 'Where is the cat?',
      correctPosition: 'mat',
      feedback: 'Good reading! The cat purrs.'
    },
    {
      text: 'The dog can run.',
      image: '🐕',
      sticker: '🐕',
      question: 'What can the dog do?',
      correctPosition: 'run',
      feedback: 'Look at him go! The dog runs!'
    },
    {
      text: 'I see the big sun.',
      image: '☀️',
      sticker: '☀️',
      question: 'What is big?',
      correctPosition: 'sky',
      feedback: 'It is a sunny day! The sky turns bright blue.'
    }
  ];

  // Calculate progress
  const calculateProgress = () => {
    const module1 = (Object.keys(soundMatchAnswers).length / soundScenarios.length) * 25;
    const module2 = (Object.keys(trainAnswers).length / trainWords.length) * 25;
    const module3 = (traceCompleted.size / traceLetters.length) * 25;
    const module4 = (Object.keys(storyAnswers).length / tinyStories.length) * 25;
    return Math.round(module1 + module2 + module3 + module4);
  };

  const handleReset = () => {
    setSoundMatchAnswers({});
    setTrainAnswers({});
    setTraceCompleted(new Set());
    setStoryAnswers({});
    setCurrentSoundScenario(0);
    setCurrentTrain(0);
    setCurrentTraceLetter(0);
    setCurrentStory(0);
    setTrainPieces([]);
  };

  // Sound Match handlers
  const handleSoundMatch = (optionName: string) => {
    if (soundMatchAnswers[currentSoundScenario]) return;

    const scenario = soundScenarios[currentSoundScenario];
    const option = scenario.options.find(o => o.name === optionName);
    
    if (option) {
      setSoundMatchAnswers({ ...soundMatchAnswers, [currentSoundScenario]: optionName });
      
      if (option.correct && currentSoundScenario < soundScenarios.length - 1) {
        setTimeout(() => setCurrentSoundScenario(currentSoundScenario + 1), 2000);
      }
    }
  };

  // Train handlers
  const handleTrainPiece = (letter: string) => {
    if (trainPieces.length >= 3) return;
    
    const newPieces = [...trainPieces, letter];
    setTrainPieces(newPieces);

    if (newPieces.length === 3) {
      const currentWord = trainWords[currentTrain];
      const isCorrect = newPieces.join('') === currentWord.word;
      
      if (isCorrect) {
        setTrainAnswers({ ...trainAnswers, [currentTrain]: newPieces });
        setTimeout(() => {
          if (currentTrain < trainWords.length - 1) {
            setCurrentTrain(currentTrain + 1);
            setTrainPieces([]);
          }
        }, 2000);
      } else {
        setTimeout(() => setTrainPieces([]), 1000);
      }
    }
  };

  // Trace handlers
  const handleTrace = () => {
    setIsTracing(true);
    setTimeout(() => {
      const newCompleted = new Set(traceCompleted);
      newCompleted.add(currentTraceLetter);
      setTraceCompleted(newCompleted);
      setIsTracing(false);
      
      if (currentTraceLetter < traceLetters.length - 1) {
        setTimeout(() => setCurrentTraceLetter(currentTraceLetter + 1), 1500);
      }
    }, 2000);
  };

  // Story handlers
  const handleStoryComplete = () => {
    if (storyAnswers[currentStory]) return;

    setStoryAnswers({ ...storyAnswers, [currentStory]: true });
    
    if (currentStory < tinyStories.length - 1) {
      setTimeout(() => setCurrentStory(currentStory + 1), 2000);
    }
  };

  const currentSound = soundScenarios[currentSoundScenario];
  const soundAnswer = soundMatchAnswers[currentSoundScenario];
  const selectedOption = currentSound?.options.find(o => o.name === soundAnswer);

  const currentWord = trainWords[currentTrain];
  const trainAnswer = trainAnswers[currentTrain];

  const currentLetter = traceLetters[currentTraceLetter];
  const isLetterTraced = traceCompleted.has(currentTraceLetter);

  const currentStoryData = tinyStories[currentStory];
  const isStoryComplete = storyAnswers[currentStory];

  const allModulesComplete =
    Object.keys(soundMatchAnswers).length === soundScenarios.length &&
    soundScenarios.every((_, i) => {
      const answer = soundMatchAnswers[i];
      const scenario = soundScenarios[i];
      return scenario.options.find(o => o.name === answer)?.correct;
    }) &&
    Object.keys(trainAnswers).length === trainWords.length &&
    traceCompleted.size === traceLetters.length &&
    Object.keys(storyAnswers).length === tinyStories.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-slate-900 dark:via-green-900/20 dark:to-emerald-900/20 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 rounded-xl shadow-sm hover:shadow-md transition-all border border-slate-200 dark:border-slate-700"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-slate-700 dark:text-slate-300">Back to Activities</span>
          </button>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
              <Star className="w-5 h-5 text-yellow-500" />
              <span className="text-slate-700 dark:text-slate-300 font-semibold">
                Progress: {calculateProgress()}%
              </span>
            </div>
            
            <button
              onClick={handleReset}
              className="px-4 py-2 bg-white dark:bg-slate-800 rounded-xl shadow-sm hover:shadow-md transition-all border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300"
            >
              Reset Activity
            </button>
          </div>
        </div>

        {/* Title Card */}
        <div className="bg-gradient-to-br from-green-600 to-emerald-600 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="text-5xl">📚</div>
              <h1 className="text-white text-3xl font-bold">
                Reading Comprehension Quiz
              </h1>
            </div>
            <p className="text-white/90 mb-4">
              Complete 4 fun modules to become a Reading Star! Match sounds, blend words, trace letters, and build stories.
            </p>
            <div className="flex gap-4 text-sm">
              <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-white">
                4 Modules
              </div>
              <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-white">
                Interactive
              </div>
              <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-white">
                Kid-Friendly
              </div>
            </div>
          </div>
        </div>

        {/* Module 1: The Sound Match */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg border border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-3 mb-6">
            <div className="text-4xl">🎯</div>
            <div>
              <h2 className="text-slate-800 dark:text-slate-100 text-2xl font-bold">
                Module 1: The Sound Match (Phonics)
              </h2>
              <p className="text-slate-600 dark:text-slate-400">
                Find the picture that starts with the sound!
              </p>
            </div>
          </div>

          {currentSound && (
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
              <div className="text-center mb-6">
                <div className="bg-white dark:bg-slate-900 rounded-2xl p-12 mb-6 border-2 border-dashed border-blue-300 dark:border-blue-700">
                  <div className="text-9xl mb-4">{currentSound.letter}</div>
                  <p className="text-2xl text-slate-700 dark:text-slate-300">
                    Sound: <span className="font-bold text-blue-600 dark:text-blue-400">{currentSound.sound}</span>
                  </p>
                </div>

                <p className="text-slate-700 dark:text-slate-300 mb-6 text-xl font-semibold">
                  Which picture starts with this sound?
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {currentSound.options.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSoundMatch(option.name)}
                      disabled={!!soundAnswer}
                      className={`p-8 rounded-xl border-4 transition-all ${
                        soundAnswer === option.name
                          ? option.correct
                            ? 'bg-green-100 border-green-500 dark:bg-green-900/30 dark:border-green-500 scale-105'
                            : 'bg-red-100 border-red-500 dark:bg-red-900/30 dark:border-red-500'
                          : 'bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-600 hover:border-blue-400 hover:scale-105'
                      }`}
                    >
                      <div className="text-7xl mb-3">{option.emoji}</div>
                      <p className="text-slate-800 dark:text-slate-100 font-semibold">
                        {option.name}
                      </p>
                    </button>
                  ))}
                </div>

                {selectedOption && (
                  <div className={`mt-6 p-4 rounded-xl ${
                    selectedOption.correct
                      ? 'bg-green-100 dark:bg-green-900/30 border border-green-500'
                      : 'bg-red-100 dark:bg-red-900/30 border border-red-500'
                  }`}>
                    <p className="text-center font-semibold text-lg">
                      {selectedOption.feedback}
                    </p>
                    {selectedOption.correct && (
                      <div className="text-6xl mt-3 animate-bounce">✨</div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Module 2: The Blending Train */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg border border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-3 mb-6">
            <div className="text-4xl">🚂</div>
            <div>
              <h2 className="text-slate-800 dark:text-slate-100 text-2xl font-bold">
                Module 2: The Blending Train (CVC Words)
              </h2>
              <p className="text-slate-600 dark:text-slate-400">
                Connect the train cars to make a word!
              </p>
            </div>
          </div>

          {currentWord && (
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6 border border-purple-200 dark:border-purple-800">
              <div className="text-center space-y-6">
                <p className="text-slate-700 dark:text-slate-300 text-xl font-semibold">
                  Make the word: {currentWord.meaning}
                </p>

                {/* Train Track */}
                <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 border-2 border-dashed border-purple-300 dark:border-purple-700">
                  <div className="flex justify-center gap-4 mb-6">
                    {trainPieces.map((piece, idx) => (
                      <div
                        key={idx}
                        className="bg-purple-500 text-white rounded-xl p-6 text-5xl font-bold min-w-[100px] text-center border-4 border-purple-700"
                      >
                        🚃 {piece}
                      </div>
                    ))}
                    {trainPieces.length < 3 && (
                      <div className="border-4 border-dashed border-purple-300 rounded-xl p-6 min-w-[100px] text-center text-purple-300 text-2xl flex items-center justify-center">
                        ?
                      </div>
                    )}
                  </div>

                  {trainAnswer && (
                    <div className="text-8xl mb-4 animate-bounce">{currentWord.image}</div>
                  )}
                </div>

                {/* Letter Options */}
                {!trainAnswer && (
                  <div>
                    <p className="text-slate-700 dark:text-slate-300 mb-4 font-semibold">
                      Tap the letters in order:
                    </p>
                    <div className="flex justify-center gap-4">
                      {currentWord.sounds.map((sound, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleTrainPiece(sound)}
                          disabled={trainPieces.includes(sound)}
                          className="bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:from-gray-300 disabled:to-gray-400 text-white px-12 py-8 rounded-xl text-5xl font-bold transition-all hover:scale-110 disabled:scale-100"
                        >
                          {sound}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {trainAnswer && (
                  <div className="bg-green-100 dark:bg-green-900/30 border border-green-500 rounded-xl p-6">
                    <div className="text-7xl mb-3">🎉</div>
                    <p className="text-green-800 dark:text-green-300 font-bold text-xl">
                      Choo Choo! The train drives away with {currentWord.word}!
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Module 3: Finger Trace */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg border border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-3 mb-6">
            <div className="text-4xl">✏️</div>
            <div>
              <h2 className="text-slate-800 dark:text-slate-100 text-2xl font-bold">
                Module 3: Finger Trace (Sensory Practice)
              </h2>
              <p className="text-slate-600 dark:text-slate-400">
                Trace the letter with your finger!
              </p>
            </div>
          </div>

          {currentLetter && (
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-xl p-6 border border-yellow-200 dark:border-yellow-800">
              <div className="text-center space-y-6">
                <p className="text-slate-700 dark:text-slate-300 text-xl font-semibold">
                  Trace the letter <span className="text-3xl font-bold text-yellow-600">{currentLetter.letter}</span>
                </p>

                <div className="bg-white dark:bg-slate-900 rounded-2xl p-12 border-4 border-dashed border-yellow-300 dark:border-yellow-700">
                  {!isLetterTraced ? (
                    <>
                      <div className={`text-9xl mb-6 transition-all ${isTracing ? 'text-rainbow' : 'text-gray-300'}`}>
                        {currentLetter.letter}
                      </div>
                      <button
                        onClick={handleTrace}
                        disabled={isTracing}
                        className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 disabled:from-gray-300 disabled:to-gray-400 text-white px-12 py-6 rounded-xl text-2xl font-bold transition-all"
                      >
                        {isTracing ? '✨ Tracing...' : '⭐ Start Here'}
                      </button>
                    </>
                  ) : (
                    <div className="space-y-4">
                      <div className="text-9xl animate-bounce">{currentLetter.emoji}</div>
                      <p className="text-green-800 dark:text-green-300 font-bold text-2xl">
                        {currentLetter.letter} turns into {currentLetter.object}!
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Module 4: Tiny Story Builder */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg border border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-3 mb-6">
            <div className="text-4xl">📖</div>
            <div>
              <h2 className="text-slate-800 dark:text-slate-100 text-2xl font-bold">
                Module 4: Tiny Story Builder (Comprehension)
              </h2>
              <p className="text-slate-600 dark:text-slate-400">
                Read the story. Put the sticker in the right place!
              </p>
            </div>
          </div>

          {currentStoryData && (
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-xl p-6 border border-indigo-200 dark:border-indigo-800">
              <div className="text-center space-y-6">
                <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 mb-6">
                  <p className="text-3xl text-slate-800 dark:text-slate-100 font-semibold mb-4">
                    "{currentStoryData.text}"
                  </p>
                </div>

                <p className="text-slate-700 dark:text-slate-300 text-xl font-semibold">
                  {currentStoryData.question}
                </p>

                {/* Interactive Scene */}
                <div className="bg-gradient-to-b from-sky-100 to-green-100 dark:from-sky-900/30 dark:to-green-900/30 rounded-2xl p-12 border-4 border-dashed border-indigo-300 dark:border-indigo-700 min-h-[300px] relative">
                  {!isStoryComplete ? (
                    <div className="flex flex-col items-center gap-6">
                      <div className="text-9xl">{currentStoryData.sticker}</div>
                      <button
                        onClick={handleStoryComplete}
                        className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white px-12 py-6 rounded-xl text-2xl font-bold transition-all hover:scale-110"
                      >
                        Place Sticker
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="text-9xl animate-bounce">{currentStoryData.image}</div>
                      <div className="bg-white dark:bg-slate-800 rounded-xl p-6">
                        <p className="text-green-800 dark:text-green-300 font-bold text-2xl">
                          {currentStoryData.feedback}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Completion Message */}
        {allModulesComplete && (
          <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl p-8 text-center shadow-2xl">
            <div className="text-9xl mb-4">🌟</div>
            <h2 className="text-white text-3xl font-bold mb-2">
              Congratulations, Reading Star!
            </h2>
            <p className="text-white/90 text-xl">
              You've completed all 4 modules! You're an amazing reader! 📚
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
