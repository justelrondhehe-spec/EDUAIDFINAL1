import { useState } from 'react';
import { ArrowLeft, Star, Heart, Wind, Lightbulb } from 'lucide-react';
import { OurEmotionsActivity } from "./components/OurEmotionsActivity";


interface OurEmotionsActivityProps {
  onBack: () => void;
}

export function OurEmotionsActivity({ onBack }: OurEmotionsActivityProps) {
  // Module 1: Face Match
  const [faceMatchAnswers, setFaceMatchAnswers] = useState<Record<number, string>>({});
  const [currentFaceScenario, setCurrentFaceScenario] = useState(0);

  // Module 2: The Feeling Detective
  const [detectiveAnswers, setDetectiveAnswers] = useState<Record<number, string>>({});
  const [currentDetectiveScenario, setCurrentDetectiveScenario] = useState(0);

  // Module 3: Calming Tools
  const [toolMatches, setToolMatches] = useState<Record<string, string>>({});

  // Face Match Data
  const faceScenarios = [
    {
      word: 'HAPPY',
      text: 'I am Happy.',
      options: [
        { emoji: '😢', name: 'Sad Face', correct: false },
        { emoji: '😄', name: 'Happy Face', correct: true },
        { emoji: '😡', name: 'Angry Face', correct: false }
      ],
      feedback: 'Smile! I am Happy.',
      bgColor: 'bg-yellow-100 dark:bg-yellow-900/30'
    },
    {
      word: 'SAD',
      text: 'I am Sad.',
      options: [
        { emoji: '😄', name: 'Happy Face', correct: false },
        { emoji: '😢', name: 'Sad Face', correct: true },
        { emoji: '😴', name: 'Sleepy Face', correct: false }
      ],
      feedback: 'It is okay to be Sad.',
      bgColor: 'bg-blue-100 dark:bg-blue-900/30'
    },
    {
      word: 'MAD',
      text: 'I am Mad.',
      options: [
        { emoji: '😡', name: 'Angry Face', correct: true },
        { emoji: '😄', name: 'Happy Face', correct: false },
        { emoji: '😨', name: 'Scared Face', correct: false }
      ],
      feedback: 'Take a deep breath.',
      bgColor: 'bg-red-100 dark:bg-red-900/30'
    }
  ];

  // Feeling Detective Data
  const detectiveScenarios = [
    {
      title: 'The Dropped Ice Cream',
      scene: '🍦💔',
      description: 'A child looking at an ice cream cone on the ground.',
      question: 'The ice cream fell. The child feels...',
      options: [
        { emoji: '😄', name: 'Happy', correct: false },
        { emoji: '😢', name: 'Sad', correct: true },
        { emoji: '😡', name: 'Mad', correct: false }
      ],
      feedback: 'Yes. It is sad to lose a treat.'
    },
    {
      title: 'The Birthday Gift',
      scene: '🎁🎂',
      description: 'A child opening a colorful box with a toy inside.',
      question: 'It is a birthday present! The child feels...',
      options: [
        { emoji: '😄', name: 'Happy', correct: true },
        { emoji: '😢', name: 'Sad', correct: false },
        { emoji: '😨', name: 'Scared', correct: false }
      ],
      feedback: 'Yay! Presents make us happy.'
    },
    {
      title: 'The Loud Thunder',
      scene: '⛈️🌩️',
      description: 'A window showing dark clouds and a lightning bolt. The child is hiding under a blanket.',
      question: 'The thunder is loud. The child feels...',
      options: [
        { emoji: '😄', name: 'Happy', correct: false },
        { emoji: '😴', name: 'Sleepy', correct: false },
        { emoji: '😨', name: 'Scared', correct: true }
      ],
      feedback: 'It is okay. They are safe inside.'
    }
  ];

  // Calming Tools Data
  const calmingTools = [
    {
      feeling: '😡',
      feelingName: 'Mad/Angry',
      feelingColor: 'from-red-400 to-red-600',
      correctTool: 'breathe',
      toolOptions: [
        { id: 'breathe', emoji: '🌬️', name: 'Deep Breaths', feedback: 'Breathe in... Breathe out. I am calm.' },
        { id: 'hug', emoji: '🧸', name: 'Hug a Teddy', feedback: '' },
        { id: 'light', emoji: '🕯️', name: 'Night Light', feedback: '' },
        { id: 'move', emoji: '🏃', name: 'Run & Jump', feedback: '' }
      ]
    },
    {
      feeling: '😢',
      feelingName: 'Sad',
      feelingColor: 'from-blue-400 to-blue-600',
      correctTool: 'hug',
      toolOptions: [
        { id: 'breathe', emoji: '🌬️', name: 'Deep Breaths', feedback: '' },
        { id: 'hug', emoji: '🧸', name: 'Hug a Teddy', feedback: 'Hugs help us feel safe.' },
        { id: 'light', emoji: '🕯️', name: 'Night Light', feedback: '' },
        { id: 'move', emoji: '🏃', name: 'Run & Jump', feedback: '' }
      ]
    },
    {
      feeling: '😨',
      feelingName: 'Scared',
      feelingColor: 'from-purple-400 to-purple-600',
      correctTool: 'light',
      toolOptions: [
        { id: 'breathe', emoji: '🌬️', name: 'Deep Breaths', feedback: '' },
        { id: 'hug', emoji: '🧸', name: 'Hug a Teddy', feedback: '' },
        { id: 'light', emoji: '🕯️', name: 'Night Light', feedback: 'The light pushes the dark away.' },
        { id: 'move', emoji: '🏃', name: 'Run & Jump', feedback: '' }
      ]
    },
    {
      feeling: '⚡',
      feelingName: 'Too Much Energy',
      feelingColor: 'from-yellow-400 to-orange-600',
      correctTool: 'move',
      toolOptions: [
        { id: 'breathe', emoji: '🌬️', name: 'Deep Breaths', feedback: '' },
        { id: 'hug', emoji: '🧸', name: 'Hug a Teddy', feedback: '' },
        { id: 'light', emoji: '🕯️', name: 'Night Light', feedback: '' },
        { id: 'move', emoji: '🏃', name: 'Run & Jump', feedback: 'Move your body to get the wiggles out!' }
      ]
    }
  ];

  // Calculate progress
  const calculateProgress = () => {
    const module1 = (Object.keys(faceMatchAnswers).filter((key) => {
      const idx = parseInt(key);
      const scenario = faceScenarios[idx];
      const answer = faceMatchAnswers[idx];
      return scenario.options.find(o => o.name === answer)?.correct;
    }).length / faceScenarios.length) * 25;
    
    const module2 = (Object.keys(detectiveAnswers).filter((key) => {
      const idx = parseInt(key);
      const scenario = detectiveScenarios[idx];
      const answer = detectiveAnswers[idx];
      return scenario.options.find(o => o.name === answer)?.correct;
    }).length / detectiveScenarios.length) * 25;
    
    const module3 = (Object.keys(toolMatches).filter(feeling => {
      const tool = calmingTools.find(t => t.feeling === feeling);
      return tool && toolMatches[feeling] === tool.correctTool;
    }).length / calmingTools.length) * 25;
    
    // Module 4 auto-complete when module 3 is done
    const module4 = module3;
    
    return Math.round(module1 + module2 + module3 + module4);
  };

  const handleReset = () => {
    setFaceMatchAnswers({});
    setDetectiveAnswers({});
    setToolMatches({});
    setCurrentFaceScenario(0);
    setCurrentDetectiveScenario(0);
  };

  // Face Match handlers
  const handleFaceMatch = (optionName: string) => {
    if (faceMatchAnswers[currentFaceScenario]) return;

    const scenario = faceScenarios[currentFaceScenario];
    const option = scenario.options.find(o => o.name === optionName);
    
    setFaceMatchAnswers({ ...faceMatchAnswers, [currentFaceScenario]: optionName });
    
    if (option?.correct && currentFaceScenario < faceScenarios.length - 1) {
      setTimeout(() => setCurrentFaceScenario(currentFaceScenario + 1), 2000);
    }
  };

  // Detective handlers
  const handleDetectiveAnswer = (optionName: string) => {
    if (detectiveAnswers[currentDetectiveScenario]) return;

    const scenario = detectiveScenarios[currentDetectiveScenario];
    const option = scenario.options.find(o => o.name === optionName);
    
    setDetectiveAnswers({ ...detectiveAnswers, [currentDetectiveScenario]: optionName });
    
    if (option?.correct && currentDetectiveScenario < detectiveScenarios.length - 1) {
      setTimeout(() => setCurrentDetectiveScenario(currentDetectiveScenario + 1), 2000);
    }
  };

  // Tool matching handlers
  const handleToolMatch = (feeling: string, toolId: string) => {
    setToolMatches({ ...toolMatches, [feeling]: toolId });
  };

  const currentFace = faceScenarios[currentFaceScenario];
  const faceAnswer = faceMatchAnswers[currentFaceScenario];
  const selectedFaceOption = currentFace?.options.find(o => o.name === faceAnswer);

  const currentDetective = detectiveScenarios[currentDetectiveScenario];
  const detectiveAnswer = detectiveAnswers[currentDetectiveScenario];
  const selectedDetectiveOption = currentDetective?.options.find(o => o.name === detectiveAnswer);

  const allModulesComplete =
    faceScenarios.every((_, i) => {
      const answer = faceMatchAnswers[i];
      const scenario = faceScenarios[i];
      return scenario.options.find(o => o.name === answer)?.correct;
    }) &&
    detectiveScenarios.every((_, i) => {
      const answer = detectiveAnswers[i];
      const scenario = detectiveScenarios[i];
      return scenario.options.find(o => o.name === answer)?.correct;
    }) &&
    calmingTools.every(tool => toolMatches[tool.feeling] === tool.correctTool);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-red-50 dark:from-slate-900 dark:via-pink-900/20 dark:to-rose-900/20 p-6">
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
        <div className="bg-gradient-to-br from-pink-600 to-rose-600 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="text-5xl">❤️</div>
              <h1 className="text-white text-3xl font-bold">
                Our Emotions Activity
              </h1>
            </div>
            <p className="text-white/90 mb-4">
              Complete 4 fun modules to become an Emotion Expert! Match faces, detect feelings, and learn calming tools.
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

        {/* Module 1: Face Match */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg border border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-3 mb-6">
            <div className="text-4xl">🎭</div>
            <div>
              <h2 className="text-slate-800 dark:text-slate-100 text-2xl font-bold">
                Module 1: Face Match (Visual Vocabulary)
              </h2>
              <p className="text-slate-600 dark:text-slate-400">
                Read the word. Tap the face that matches!
              </p>
            </div>
          </div>

          {currentFace && (
            <div className={`${currentFace.bgColor} rounded-xl p-6 border-2 ${
              selectedFaceOption?.correct ? 'border-green-500' : 'border-slate-300 dark:border-slate-600'
            }`}>
              <div className="text-center space-y-6">
                <div className="bg-white dark:bg-slate-900 rounded-2xl p-12">
                  <p className="text-5xl font-bold text-slate-800 dark:text-slate-100 mb-4">
                    {currentFace.word}
                  </p>
                  <p className="text-2xl text-slate-600 dark:text-slate-400">
                    "{currentFace.text}"
                  </p>
                </div>

                <p className="text-slate-700 dark:text-slate-300 text-xl font-semibold">
                  Which face matches this feeling?
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {currentFace.options.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleFaceMatch(option.name)}
                      disabled={!!faceAnswer}
                      className={`p-12 rounded-xl border-4 transition-all ${
                        faceAnswer === option.name
                          ? option.correct
                            ? 'bg-green-100 border-green-500 dark:bg-green-900/30 dark:border-green-500 scale-110'
                            : 'bg-red-100 border-red-500 dark:bg-red-900/30 dark:border-red-500'
                          : 'bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-600 hover:border-pink-400 hover:scale-105'
                      }`}
                    >
                      <div className="text-8xl">{option.emoji}</div>
                    </button>
                  ))}
                </div>

                {selectedFaceOption && selectedFaceOption.correct && (
                  <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border-2 border-green-500">
                    <div className="text-6xl mb-3 animate-bounce">✨</div>
                    <p className="text-green-800 dark:text-green-300 font-bold text-2xl">
                      {currentFace.feedback}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Module 2: The Feeling Detective */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg border border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-3 mb-6">
            <div className="text-4xl">🔍</div>
            <div>
              <h2 className="text-slate-800 dark:text-slate-100 text-2xl font-bold">
                Module 2: The Feeling Detective (Situations)
              </h2>
              <p className="text-slate-600 dark:text-slate-400">
                Look at the picture. How do they feel?
              </p>
            </div>
          </div>

          {currentDetective && (
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
              <div className="text-center space-y-6">
                <h3 className="text-slate-800 dark:text-slate-100 text-2xl font-bold">
                  {currentDetective.title}
                </h3>

                <div className="bg-white dark:bg-slate-900 rounded-2xl p-12 border-2 border-dashed border-blue-300 dark:border-blue-700">
                  <div className="text-9xl mb-4">{currentDetective.scene}</div>
                  <p className="text-slate-600 dark:text-slate-400">
                    {currentDetective.description}
                  </p>
                </div>

                <p className="text-slate-700 dark:text-slate-300 text-xl font-semibold">
                  {currentDetective.question}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {currentDetective.options.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleDetectiveAnswer(option.name)}
                      disabled={!!detectiveAnswer}
                      className={`p-8 rounded-xl border-4 transition-all ${
                        detectiveAnswer === option.name
                          ? option.correct
                            ? 'bg-green-100 border-green-500 dark:bg-green-900/30 dark:border-green-500 scale-110'
                            : 'bg-red-100 border-red-500 dark:bg-red-900/30 dark:border-red-500'
                          : 'bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-600 hover:border-blue-400 hover:scale-105'
                      }`}
                    >
                      <div className="text-7xl mb-3">{option.emoji}</div>
                      <p className="text-slate-800 dark:text-slate-100 font-semibold text-lg">
                        {option.name}
                      </p>
                    </button>
                  ))}
                </div>

                {selectedDetectiveOption && selectedDetectiveOption.correct && (
                  <div className="bg-green-100 dark:bg-green-900/30 border border-green-500 rounded-xl p-6">
                    <div className="text-6xl mb-3">💚</div>
                    <p className="text-green-800 dark:text-green-300 font-bold text-xl">
                      {currentDetective.feedback}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Module 3: Calming Tools */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg border border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-3 mb-6">
            <div className="text-4xl">🛠️</div>
            <div>
              <h2 className="text-slate-800 dark:text-slate-100 text-2xl font-bold">
                Module 3 & 4: Calming Tools (Coping Skills)
              </h2>
              <p className="text-slate-600 dark:text-slate-400">
                What can I do when I feel big feelings?
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {calmingTools.map((tool, toolIdx) => {
              const matched = toolMatches[tool.feeling];
              const isCorrect = matched === tool.correctTool;
              const selectedTool = tool.toolOptions.find(t => t.id === matched);

              return (
                <div
                  key={toolIdx}
                  className={`bg-gradient-to-br ${tool.feelingColor} rounded-xl p-6 text-white`}
                >
                  <div className="space-y-6">
                    <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6">
                      <div className="flex items-center justify-center gap-4 mb-4">
                        <div className="text-7xl">{tool.feeling}</div>
                        <div>
                          <h3 className="text-white text-2xl font-bold">
                            Feeling: {tool.feelingName}
                          </h3>
                          <p className="text-white/90">What tool helps?</p>
                        </div>
                      </div>
                    </div>

                    {!matched ? (
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {tool.toolOptions.map((option, optIdx) => (
                          <button
                            key={optIdx}
                            onClick={() => handleToolMatch(tool.feeling, option.id)}
                            className="bg-white/90 dark:bg-slate-800/90 hover:bg-white dark:hover:bg-slate-700 rounded-xl p-6 transition-all hover:scale-105 border-2 border-white/50"
                          >
                            <div className="text-5xl mb-2">{option.emoji}</div>
                            <p className="text-slate-800 dark:text-slate-100 font-semibold">
                              {option.name}
                            </p>
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className={`p-6 rounded-xl ${
                        isCorrect
                          ? 'bg-green-100 dark:bg-green-900/30 border-2 border-green-500'
                          : 'bg-red-100 dark:bg-red-900/30 border-2 border-red-500'
                      }`}>
                        <div className="text-6xl mb-3">{selectedTool?.emoji}</div>
                        <p className={`font-bold text-xl ${
                          isCorrect
                            ? 'text-green-800 dark:text-green-300'
                            : 'text-red-800 dark:text-red-300'
                        }`}>
                          {isCorrect ? selectedTool?.feedback : 'Try again! Think about what helps with this feeling.'}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Completion Message */}
        {allModulesComplete && (
          <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl p-8 text-center shadow-2xl">
            <div className="text-9xl mb-4">💖</div>
            <h2 className="text-white text-3xl font-bold mb-2">
              Congratulations, Emotion Expert!
            </h2>
            <p className="text-white/90 text-xl">
              You've completed all modules! You understand feelings and know how to stay calm! ❤️
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
