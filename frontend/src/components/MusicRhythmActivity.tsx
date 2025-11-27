import { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Star, Play, Pause, Volume2, Hand, Music } from 'lucide-react';

interface MusicRhythmActivityProps {
  onBack: () => void;
}

export function MusicRhythmActivity({ onBack }: MusicRhythmActivityProps) {
  // Module 1: Feel the Beat (Tempo)
  const [tempoAnswers, setTempoAnswers] = useState<Record<number, string>>({});
  const [currentTempoScenario, setCurrentTempoScenario] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Module 2: Copy the Pattern (Echo)
  const [patternAnswers, setPatternAnswers] = useState<Record<number, number[]>>({});
  const [currentPattern, setCurrentPattern] = useState(0);
  const [userTaps, setUserTaps] = useState<number[]>([]);
  const [isShowingPattern, setIsShowingPattern] = useState(false);
  const [currentBeat, setCurrentBeat] = useState(-1);
  
  // Module 3: Read Simple Rhythms (Symbols)
  const [symbolMatches, setSymbolMatches] = useState<Record<string, string>>({});
  
  // Module 4: Rhythm Reader
  const [readerSlots, setReaderSlots] = useState<string[]>(['', '', '', '']);

  const beatIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Tempo Scenarios
  const tempoScenarios = [
    {
      speed: 'slow',
      emoji: '🐢',
      label: 'Slow Clap',
      description: 'The hands clap slowly to the beat',
      interval: 1200,
      feedback: 'Slow beat... Clap... Clap...'
    },
    {
      speed: 'fast',
      emoji: '🐰',
      label: 'Fast Clap',
      description: 'The hands clap very quickly, almost blurring together',
      interval: 300,
      feedback: 'Fast beat! Clap-Clap-Clap!'
    },
    {
      speed: 'medium',
      emoji: '🚶',
      label: 'Steady Clap',
      description: 'The hands clap at a steady, marching pace',
      interval: 600,
      feedback: 'Steady beat! Clap... Clap...'
    }
  ];

  // Echo Patterns
  const echoPatterns = [
    {
      name: 'Pattern 1',
      pattern: [1, 1, 0, 1], // 1 = clap, 0 = rest
      hint: 'ta ... ta ... (rest) ... ta',
      feedback: 'Good timing!'
    },
    {
      name: 'Pattern 2',
      pattern: [1, 0, 1, 1],
      hint: 'ta ... (rest) ... ta ... ta',
      feedback: 'Great rest!'
    },
    {
      name: 'Pattern 3',
      pattern: [1, 1, 1, 0],
      hint: 'ta ... ta ... ta ... (rest)',
      feedback: 'Perfect Pattern!'
    }
  ];

  // Symbol Items
  const symbolItems = [
    { id: 'hand1', emoji: '✋', name: 'Single Hand', correctBin: 'ta' },
    { id: 'hands', emoji: '👐', name: 'Two Hands', correctBin: 'titi' },
    { id: 'shh', emoji: '🤫', name: 'Finger on Lips', correctBin: 'rest' }
  ];

  const targetPattern = ['♩', '♫', '♩', '𝄽'];

  // Calculate progress
  const calculateProgress = () => {
    const module1 = (Object.keys(tempoAnswers).length / tempoScenarios.length) * 25;
    const module2 = (Object.keys(patternAnswers).length / echoPatterns.length) * 25;
    const module3 = (Object.keys(symbolMatches).length / symbolItems.length) * 25;
    const module4 = (readerSlots.filter((s, i) => s === targetPattern[i]).length / 4) * 25;
    return Math.round(module1 + module2 + module3 + module4);
  };

  const handleReset = () => {
    setTempoAnswers({});
    setPatternAnswers({});
    setSymbolMatches({});
    setReaderSlots(['', '', '', '']);
    setCurrentTempoScenario(0);
    setCurrentPattern(0);
    setUserTaps([]);
  };

  // Tempo Module handlers
  const handleTempoSelect = (speed: string) => {
    if (tempoAnswers[currentTempoScenario]) return;
    
    const currentScenario = tempoScenarios[currentTempoScenario];
    setTempoAnswers({ ...tempoAnswers, [currentTempoScenario]: speed });
    
    if (currentTempoScenario < tempoScenarios.length - 1) {
      setTimeout(() => {
        setCurrentTempoScenario(currentTempoScenario + 1);
        setIsPlaying(false);
      }, 2000);
    }
  };

  const playTempo = (scenario: number) => {
    setIsPlaying(true);
    let count = 0;
    const interval = tempoScenarios[scenario].interval;
    
    if (beatIntervalRef.current) {
      clearInterval(beatIntervalRef.current);
    }
    
    beatIntervalRef.current = setInterval(() => {
      count++;
      if (count >= 4) {
        setIsPlaying(false);
        if (beatIntervalRef.current) {
          clearInterval(beatIntervalRef.current);
        }
      }
    }, interval);
  };

  // Echo Pattern handlers
  const playPattern = (patternIndex: number) => {
    setIsShowingPattern(true);
    setCurrentBeat(-1);
    
    const pattern = echoPatterns[patternIndex];
    pattern.pattern.forEach((beat, index) => {
      setTimeout(() => {
        setCurrentBeat(index);
      }, index * 600);
    });
    
    setTimeout(() => {
      setIsShowingPattern(false);
      setCurrentBeat(-1);
    }, pattern.pattern.length * 600);
  };

  const handleUserTap = () => {
    if (userTaps.length >= 4) return;
    const newTaps = [...userTaps, 1];
    setUserTaps(newTaps);
    
    if (newTaps.length === 4) {
      const currentPatternData = echoPatterns[currentPattern];
      const isCorrect = newTaps.every((tap, i) => tap === currentPatternData.pattern[i]);
      
      if (isCorrect) {
        setPatternAnswers({ ...patternAnswers, [currentPattern]: newTaps });
        setTimeout(() => {
          if (currentPattern < echoPatterns.length - 1) {
            setCurrentPattern(currentPattern + 1);
            setUserTaps([]);
          }
        }, 1500);
      }
    }
  };

  const handleRest = () => {
    if (userTaps.length >= 4) return;
    const newTaps = [...userTaps, 0];
    setUserTaps(newTaps);
    
    if (newTaps.length === 4) {
      const currentPatternData = echoPatterns[currentPattern];
      const isCorrect = newTaps.every((tap, i) => tap === currentPatternData.pattern[i]);
      
      if (isCorrect) {
        setPatternAnswers({ ...patternAnswers, [currentPattern]: newTaps });
        setTimeout(() => {
          if (currentPattern < echoPatterns.length - 1) {
            setCurrentPattern(currentPattern + 1);
            setUserTaps([]);
          }
        }, 1500);
      }
    }
  };

  // Symbol matching handlers
  const handleSymbolDrop = (itemId: string, bin: string) => {
    const item = symbolItems.find(i => i.id === itemId);
    if (!item) return;
    
    setSymbolMatches({ ...symbolMatches, [itemId]: bin });
  };

  // Rhythm Reader handlers
  const handleBlockDrop = (block: string, slotIdx: number) => {
    const newSlots = [...readerSlots];
    newSlots[slotIdx] = block;
    setReaderSlots(newSlots);
  };

  useEffect(() => {
    return () => {
      if (beatIntervalRef.current) {
        clearInterval(beatIntervalRef.current);
      }
    };
  }, []);

  const currentScenario = tempoScenarios[currentTempoScenario];
  const tempoAnswer = tempoAnswers[currentTempoScenario];
  const isTempoCorrect = tempoAnswer === currentScenario?.speed;

  const currentEchoPattern = echoPatterns[currentPattern];
  const patternAnswer = patternAnswers[currentPattern];
  const isPatternCorrect = patternAnswer !== undefined;

  const allModulesComplete =
    Object.keys(tempoAnswers).length === tempoScenarios.length &&
    Object.keys(patternAnswers).length === echoPatterns.length &&
    Object.keys(symbolMatches).length === symbolItems.length &&
    readerSlots.every((s, i) => s === targetPattern[i]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-slate-900 dark:via-purple-900/20 dark:to-pink-900/20 p-6">
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
        <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="text-5xl">🎵</div>
              <h1 className="text-white text-3xl font-bold">
                Music & Rhythm Activity
              </h1>
            </div>
            <p className="text-white/90 mb-4">
              Complete 4 fun modules to become a Rhythm Master! Match tempos, copy patterns, read rhythm symbols, and build sequences.
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

        {/* Module 1: Feel the Beat */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg border border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-3 mb-6">
            <div className="text-4xl">🥁</div>
            <div>
              <h2 className="text-slate-800 dark:text-slate-100 text-2xl font-bold">
                Module 1: Feel the Beat (Tempo)
              </h2>
              <p className="text-slate-600 dark:text-slate-400">
                Watch the hands clap. Is the beat Fast, Medium, or Slow?
              </p>
            </div>
          </div>

          {currentScenario && (
            <>
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl p-6 mb-6 border border-blue-200 dark:border-blue-800">
                <div className="flex flex-col items-center gap-6">
                  <div className="text-center">
                    <p className="text-slate-700 dark:text-slate-300 mb-4">
                      {currentScenario.description}
                    </p>
                    
                    {/* Clapping Hands Animation */}
                    <div className="bg-white dark:bg-slate-900 rounded-2xl p-12 mb-6 border-2 border-dashed border-blue-300 dark:border-blue-700">
                      <div className={`text-9xl transition-transform duration-200 ${isPlaying ? 'animate-pulse' : ''}`}>
                        👏
                      </div>
                    </div>

                    <button
                      onClick={() => playTempo(currentTempoScenario)}
                      disabled={isPlaying || !!tempoAnswer}
                      className="flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white rounded-xl transition-colors mx-auto"
                    >
                      <Play className="w-5 h-5" />
                      {isPlaying ? 'Playing...' : 'Play Clapping'}
                    </button>
                  </div>

                  {/* Answer Options */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                    {tempoScenarios.map((scenario, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleTempoSelect(scenario.speed)}
                        disabled={!!tempoAnswer}
                        className={`p-6 rounded-xl border-2 transition-all ${
                          tempoAnswer === scenario.speed
                            ? isTempoCorrect
                              ? 'bg-green-100 border-green-500 dark:bg-green-900/30 dark:border-green-500'
                              : 'bg-red-100 border-red-500 dark:bg-red-900/30 dark:border-red-500'
                            : 'bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-600 hover:border-blue-400'
                        }`}
                      >
                        <div className="text-5xl mb-2">{scenario.emoji}</div>
                        <div className="text-slate-800 dark:text-slate-100 font-semibold">
                          {scenario.label}
                        </div>
                      </button>
                    ))}
                  </div>

                  {tempoAnswer && (
                    <div className={`w-full p-4 rounded-xl ${
                      isTempoCorrect
                        ? 'bg-green-100 dark:bg-green-900/30 border border-green-500'
                        : 'bg-red-100 dark:bg-red-900/30 border border-red-500'
                    }`}>
                      <p className="text-center font-semibold">
                        {isTempoCorrect ? currentScenario.feedback : 'Try again! Listen carefully to the tempo.'}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Module 2: Copy the Pattern */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg border border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-3 mb-6">
            <div className="text-4xl">🤖</div>
            <div>
              <h2 className="text-slate-800 dark:text-slate-100 text-2xl font-bold">
                Module 2: Copy the Pattern (Echo)
              </h2>
              <p className="text-slate-600 dark:text-slate-400">
                Watch the Robot. Then YOU tap the button!
              </p>
            </div>
          </div>

          {currentEchoPattern && (
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6 border border-purple-200 dark:border-purple-800">
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-slate-800 dark:text-slate-100 mb-4 font-bold">
                    {currentEchoPattern.name}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-2">Hint: {currentEchoPattern.hint}</p>

                  {/* Robot showing pattern */}
                  <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 mb-6 border-2 border-dashed border-purple-300 dark:border-purple-700">
                    <div className="text-7xl mb-4">🤖</div>
                    <div className="flex justify-center gap-3 mb-4">
                      {currentEchoPattern.pattern.map((beat, idx) => (
                        <div
                          key={idx}
                          className={`w-16 h-16 rounded-lg flex items-center justify-center text-3xl transition-all ${
                            isShowingPattern && currentBeat === idx
                              ? 'bg-purple-500 text-white scale-110'
                              : beat === 1
                              ? 'bg-purple-200 dark:bg-purple-800'
                              : 'bg-gray-200 dark:bg-gray-700'
                          }`}
                        >
                          {beat === 1 ? '💡' : '⚫'}
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={() => playPattern(currentPattern)}
                      disabled={isShowingPattern || isPatternCorrect}
                      className="px-6 py-3 bg-purple-500 hover:bg-purple-600 disabled:bg-gray-300 text-white rounded-xl transition-colors"
                    >
                      <Play className="w-5 h-5 inline mr-2" />
                      {isShowingPattern ? 'Playing...' : 'Watch Pattern'}
                    </button>
                  </div>

                  {/* User input area */}
                  {!isPatternCorrect && (
                    <div>
                      <p className="text-slate-700 dark:text-slate-300 mb-4 font-semibold">
                        Your Turn - Tap the rhythm:
                      </p>
                      
                      <div className="flex justify-center gap-3 mb-6">
                        {[0, 1, 2, 3].map((idx) => (
                          <div
                            key={idx}
                            className={`w-16 h-16 rounded-lg flex items-center justify-center text-2xl border-2 border-dashed ${
                              userTaps[idx] !== undefined
                                ? userTaps[idx] === 1
                                  ? 'bg-blue-200 dark:bg-blue-800 border-blue-500'
                                  : 'bg-gray-200 dark:bg-gray-700 border-gray-500'
                                : 'border-gray-300 dark:border-gray-600'
                            }`}
                          >
                            {userTaps[idx] === 1 ? '👏' : userTaps[idx] === 0 ? '🤫' : '?'}
                          </div>
                        ))}
                      </div>

                      <div className="flex justify-center gap-4">
                        <button
                          onClick={handleUserTap}
                          disabled={userTaps.length >= 4}
                          className="px-8 py-4 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white rounded-xl text-xl transition-colors"
                        >
                          <Hand className="w-6 h-6 inline mr-2" />
                          Tap!
                        </button>
                        <button
                          onClick={handleRest}
                          disabled={userTaps.length >= 4}
                          className="px-8 py-4 bg-gray-500 hover:bg-gray-600 disabled:bg-gray-300 text-white rounded-xl text-xl transition-colors"
                        >
                          Rest (Wait)
                        </button>
                        <button
                          onClick={() => setUserTaps([])}
                          className="px-6 py-4 bg-red-500 hover:bg-red-600 text-white rounded-xl transition-colors"
                        >
                          Clear
                        </button>
                      </div>
                    </div>
                  )}

                  {isPatternCorrect && (
                    <div className="bg-green-100 dark:bg-green-900/30 border border-green-500 rounded-xl p-6">
                      <div className="text-6xl mb-3">🎉</div>
                      <p className="text-green-800 dark:text-green-300 font-bold text-xl">
                        {currentEchoPattern.feedback}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Module 3: Read Simple Rhythms */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg border border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-3 mb-6">
            <div className="text-4xl">♩</div>
            <div>
              <h2 className="text-slate-800 dark:text-slate-100 text-2xl font-bold">
                Module 3: Read Simple Rhythms (Symbols)
              </h2>
              <p className="text-slate-600 dark:text-slate-400">
                Match the picture to the music note!
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {/* Symbol Bins */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl p-6 border-2 border-blue-300 dark:border-blue-700">
                <div className="text-center mb-4">
                  <div className="text-6xl mb-2">♩</div>
                  <h3 className="text-slate-800 dark:text-slate-100 font-bold">Ta (One Beat)</h3>
                </div>
                <div className="min-h-[100px] bg-white/50 dark:bg-slate-900/50 rounded-lg p-4 flex flex-wrap gap-2 justify-center items-center">
                  {symbolItems.filter(item => symbolMatches[item.id] === 'ta').map(item => (
                    <div key={item.id} className="text-5xl">{item.emoji}</div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-xl p-6 border-2 border-purple-300 dark:border-purple-700">
                <div className="text-center mb-4">
                  <div className="text-6xl mb-2">♫</div>
                  <h3 className="text-slate-800 dark:text-slate-100 font-bold">Ti-Ti (Two Quick Beats)</h3>
                </div>
                <div className="min-h-[100px] bg-white/50 dark:bg-slate-900/50 rounded-lg p-4 flex flex-wrap gap-2 justify-center items-center">
                  {symbolItems.filter(item => symbolMatches[item.id] === 'titi').map(item => (
                    <div key={item.id} className="text-5xl">{item.emoji}</div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl p-6 border-2 border-green-300 dark:border-green-700">
                <div className="text-center mb-4">
                  <div className="text-6xl mb-2">𝄽</div>
                  <h3 className="text-slate-800 dark:text-slate-100 font-bold">Rest (Silence)</h3>
                </div>
                <div className="min-h-[100px] bg-white/50 dark:bg-slate-900/50 rounded-lg p-4 flex flex-wrap gap-2 justify-center items-center">
                  {symbolItems.filter(item => symbolMatches[item.id] === 'rest').map(item => (
                    <div key={item.id} className="text-5xl">{item.emoji}</div>
                  ))}
                </div>
              </div>
            </div>

            {/* Draggable Items */}
            {symbolItems.filter(item => !symbolMatches[item.id]).length > 0 && (
              <div className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-xl p-6 border border-yellow-300 dark:border-yellow-700">
                <p className="text-slate-800 dark:text-slate-100 text-center mb-4 font-semibold">
                  Drag these items to the correct basket:
                </p>
                <div className="flex flex-wrap gap-6 justify-center">
                  {symbolItems.filter(item => !symbolMatches[item.id]).map((item) => (
                    <div key={item.id} className="flex flex-col gap-2">
                      <div className="bg-white dark:bg-slate-800 rounded-xl p-4 text-6xl border-2 border-slate-300 dark:border-slate-600">
                        {item.emoji}
                      </div>
                      <div className="flex flex-col gap-2">
                        <button
                          onClick={() => handleSymbolDrop(item.id, 'ta')}
                          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm"
                        >
                          → ♩ Ta
                        </button>
                        <button
                          onClick={() => handleSymbolDrop(item.id, 'titi')}
                          className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg text-sm"
                        >
                          → ♫ Ti-Ti
                        </button>
                        <button
                          onClick={() => handleSymbolDrop(item.id, 'rest')}
                          className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm"
                        >
                          → 𝄽 Rest
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {symbolItems.every(item => {
              const match = symbolMatches[item.id];
              return match === item.correctBin;
            }) && symbolItems.length === Object.keys(symbolMatches).length && (
              <div className="bg-green-100 dark:bg-green-900/30 border border-green-500 rounded-xl p-6 text-center">
                <div className="text-7xl mb-3">🎉</div>
                <p className="text-green-800 dark:text-green-300 font-bold text-xl">
                  Perfect! The notes glow green!
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Module 4: Rhythm Reader */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg border border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-3 mb-6">
            <div className="text-4xl">🎼</div>
            <div>
              <h2 className="text-slate-800 dark:text-slate-100 text-2xl font-bold">
                Module 4: Rhythm Reader (Practice)
              </h2>
              <p className="text-slate-600 dark:text-slate-400">
                Build the rhythm you see!
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {/* Target Pattern */}
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-xl p-6 border border-yellow-300 dark:border-yellow-700">
              <p className="text-slate-800 dark:text-slate-100 text-center mb-4 font-semibold">
                Target Pattern:
              </p>
              <div className="flex justify-center gap-4 mb-2">
                {targetPattern.map((symbol, idx) => (
                  <div key={idx} className="bg-white dark:bg-slate-800 rounded-xl p-6 text-6xl border-2 border-yellow-500">
                    {symbol}
                  </div>
                ))}
              </div>
              <p className="text-center text-slate-600 dark:text-slate-400 mt-4">
                ta ... ti-ti ... ta ... rest
              </p>
            </div>

            {/* User's Pattern */}
            <div>
              <p className="text-slate-800 dark:text-slate-100 text-center mb-4 font-semibold">
                Your Pattern:
              </p>
              <div className="grid grid-cols-4 gap-4 mb-6">
                {readerSlots.map((slot, idx) => (
                  <div
                    key={idx}
                    className={`border-4 border-dashed rounded-xl p-8 min-h-[150px] flex items-center justify-center ${
                      slot === targetPattern[idx]
                        ? 'border-green-500 bg-green-50 dark:bg-green-900/30'
                        : slot
                        ? 'border-red-500 bg-red-50 dark:bg-red-900/30'
                        : 'border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-slate-900/50'
                    }`}
                  >
                    {slot ? (
                      <div className="text-6xl">{slot}</div>
                    ) : (
                      <div className="text-gray-400 dark:text-gray-600">Slot {idx + 1}</div>
                    )}
                  </div>
                ))}
              </div>

              {/* Block Options */}
              {!readerSlots.every((s, i) => s === targetPattern[i]) && (
                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-xl p-6 border border-indigo-300 dark:border-indigo-700">
                  <p className="text-slate-800 dark:text-slate-100 text-center mb-4 font-semibold">
                    Drag blocks to build the pattern:
                  </p>
                  <div className="flex gap-6 justify-center">
                    {['♩', '♫', '𝄽'].map((block) => (
                      <div key={block} className="text-center">
                        <div className="text-5xl mb-3 bg-white dark:bg-slate-800 rounded-xl p-4 border-2 border-slate-300 dark:border-slate-600">
                          {block}
                        </div>
                        <div className="flex flex-col gap-2">
                          {[0, 1, 2, 3].map((slotIdx) => (
                            <button
                              key={slotIdx}
                              onClick={() => handleBlockDrop(block, slotIdx)}
                              disabled={readerSlots[slotIdx] === block}
                              className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 disabled:bg-gray-300 text-white rounded-lg text-sm transition-colors"
                            >
                              Slot {slotIdx + 1}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {readerSlots.every((s, i) => s === targetPattern[i]) && (
                <div className="bg-green-100 dark:bg-green-900/30 border border-green-500 rounded-xl p-6 text-center">
                  <div className="text-7xl mb-3">🏆</div>
                  <p className="text-green-800 dark:text-green-300 font-bold text-xl">
                    You read the rhythm! The sequence plays perfectly!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Completion Message */}
        {allModulesComplete && (
          <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl p-8 text-center shadow-2xl">
            <div className="text-9xl mb-4">🎉</div>
            <h2 className="text-white text-3xl font-bold mb-2">
              Congratulations, Rhythm Master!
            </h2>
            <p className="text-white/90 text-xl">
              You've completed all 4 modules! You're a musical genius! 🎵
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
