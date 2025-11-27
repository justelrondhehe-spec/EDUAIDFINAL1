import { ArrowLeft, CheckCircle, Circle, Square, Triangle, Heart, Star, Pentagon, Hexagon, Diamond, Search, Sparkles, Palette, Trophy, Award } from 'lucide-react';
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

interface ShapesColorsLessonProps {
  onBack: () => void;
}

export function ShapesColorsLesson({ onBack }: ShapesColorsLessonProps) {
  const { lessonProgress, completeLesson, startLesson, saveAndExitLesson } = useApp();
  const [foundShapes, setFoundShapes] = useState<string[]>([]);
  const [selectedColor1, setSelectedColor1] = useState<string | null>(null);
  const [selectedColor2, setSelectedColor2] = useState<string | null>(null);
  const [mixedColor, setMixedColor] = useState<string | null>(null);
  const [showCompletionDialog, setShowCompletionDialog] = useState(false);
  
  const lessonId = 4; // Shapes & Colors lesson ID
  const lesson = lessonProgress[lessonId];
  const isLessonCompleted = lesson?.completed || false;
  
  // Start lesson when component mounts if not started
  useEffect(() => {
    if (!lesson && !isLessonCompleted) {
      startLesson(lessonId);
    }
  }, []);
  
  const handleSaveAndExit = () => {
    // Calculate progress based on completed sections
    const progress = 33; // Can be made dynamic based on actual completion
    saveAndExitLesson(lessonId, progress);
    onBack();
  };

  const shapes = [
    {
      name: 'Circle',
      icon: Circle,
      description: 'A perfectly round shape. It has no straight sides and no corners.',
      examples: ['Basketball', 'Apple']
    },
    {
      name: 'Square',
      icon: Square,
      description: 'A shape with four straight sides that are all the exact same length. It has four corners.',
      examples: ['Window', 'Dice']
    },
    {
      name: 'Triangle',
      icon: Triangle,
      description: 'A shape with three straight sides and three corners.',
      examples: ['Umbrella', 'Hanger']
    },
    {
      name: 'Rectangle',
      icon: Square,
      description: 'A shape with four straight sides and four corners. It has two long sides and two short sides.',
      examples: ['TV', 'Door']
    },
    {
      name: 'Oval',
      icon: Circle,
      description: 'An egg-like or stretched circle shape.',
      examples: ['Egg', 'Football']
    },
    {
      name: 'Heart',
      icon: Heart,
      description: 'A shape representing love, with two rounded top parts and a point at the bottom.',
      examples: ['Strawberry', 'Leaf']
    },
    {
      name: 'Star',
      icon: Star,
      description: 'A shape with multiple points (often five) projecting from a center.',
      examples: ['Starfish', 'Sky star']
    },
    {
      name: 'Pentagon',
      icon: Pentagon,
      description: 'A shape with five straight sides and five corners.',
      examples: ['Diamond', 'Soccer ball panel']
    },
    {
      name: 'Hexagon',
      icon: Hexagon,
      description: 'A shape with six straight sides and six corners.',
      examples: ['Stop sign', 'Metal nut']
    },
    {
      name: 'Rhombus',
      icon: Diamond,
      description: 'A shape with four straight sides of the same length, but it is "slanted." (Also called a diamond).',
      examples: ['Kite', 'Road sign']
    }
  ];

  const primaryColors = [
    {
      name: 'Red',
      color: 'bg-red-500',
      textColor: 'text-white',
      description: 'One of the three original colors that cannot be created by mixing other colors.'
    },
    {
      name: 'Yellow',
      color: 'bg-yellow-400',
      textColor: 'text-slate-900',
      description: 'One of the three original colors that cannot be created by mixing other colors.'
    },
    {
      name: 'Blue',
      color: 'bg-blue-500',
      textColor: 'text-white',
      description: 'One of the three original colors that cannot be created by mixing other colors.'
    }
  ];

  const secondaryColors = [
    {
      name: 'Green',
      color: 'bg-green-500',
      textColor: 'text-white',
      mix: 'Blue + Yellow',
      description: 'Created by mixing blue and yellow together.'
    },
    {
      name: 'Orange',
      color: 'bg-orange-500',
      textColor: 'text-white',
      mix: 'Red + Yellow',
      description: 'Created by mixing red and yellow together.'
    },
    {
      name: 'Purple / Violet',
      color: 'bg-purple-500',
      textColor: 'text-white',
      mix: 'Red + Blue',
      description: 'Created by mixing red and blue together.'
    }
  ];

  const tertiaryColors = [
    {
      name: 'Yellow-Orange',
      color: 'bg-gradient-to-r from-yellow-400 to-orange-500',
      textColor: 'text-white',
      mix: 'Yellow + Orange'
    },
    {
      name: 'Red-Orange',
      color: 'bg-gradient-to-r from-red-500 to-orange-600',
      textColor: 'text-white',
      mix: 'Red + Orange'
    },
    {
      name: 'Red-Violet',
      color: 'bg-gradient-to-r from-red-500 to-purple-600',
      textColor: 'text-white',
      mix: 'Red + Violet'
    },
    {
      name: 'Blue-Violet',
      color: 'bg-gradient-to-r from-blue-500 to-purple-600',
      textColor: 'text-white',
      mix: 'Blue + Violet'
    },
    {
      name: 'Blue-Green',
      color: 'bg-gradient-to-r from-blue-500 to-green-500',
      textColor: 'text-white',
      mix: 'Blue + Green'
    },
    {
      name: 'Yellow-Green',
      color: 'bg-gradient-to-r from-yellow-400 to-green-500',
      textColor: 'text-slate-900',
      mix: 'Yellow + Green'
    }
  ];

  // Shape Hunt Activity Items
  const shapeHuntItems = [
    { shape: 'Circle', emoji: '🏀', name: 'Basketball' },
    { shape: 'Square', emoji: '📦', name: 'Box' },
    { shape: 'Triangle', emoji: '🔺', name: 'Triangle Sign' },
    { shape: 'Heart', emoji: '❤️', name: 'Heart' },
    { shape: 'Star', emoji: '⭐', name: 'Star' },
    { shape: 'Rectangle', emoji: '📱', name: 'Phone' },
  ];

  const toggleShapeFound = (shapeName: string) => {
    if (foundShapes.includes(shapeName)) {
      setFoundShapes(foundShapes.filter(s => s !== shapeName));
    } else {
      setFoundShapes([...foundShapes, shapeName]);
    }
  };

  // Color Mixing Activity
  const colorMixingOptions = [
    { name: 'Red', value: 'red', bgClass: 'bg-red-500' },
    { name: 'Yellow', value: 'yellow', bgClass: 'bg-yellow-400' },
    { name: 'Blue', value: 'blue', bgClass: 'bg-blue-500' },
  ];

  const handleColorMix = () => {
    if (!selectedColor1 || !selectedColor2) return;

    const colors = [selectedColor1, selectedColor2].sort();
    
    if (colors[0] === 'blue' && colors[1] === 'yellow') {
      setMixedColor('Green');
    } else if (colors[0] === 'red' && colors[1] === 'yellow') {
      setMixedColor('Orange');
    } else if (colors[0] === 'blue' && colors[1] === 'red') {
      setMixedColor('Purple');
    } else if (colors[0] === colors[1]) {
      setMixedColor(`${selectedColor1} (same color)`);
    }
  };

  const resetColorMixing = () => {
    setSelectedColor1(null);
    setSelectedColor2(null);
    setMixedColor(null);
  };

  const getMixedColorClass = () => {
    if (!mixedColor) return '';
    if (mixedColor === 'Green') return 'bg-green-500';
    if (mixedColor === 'Orange') return 'bg-orange-500';
    if (mixedColor === 'Purple') return 'bg-purple-500';
    if (mixedColor.includes('red')) return 'bg-red-500';
    if (mixedColor.includes('yellow')) return 'bg-yellow-400';
    if (mixedColor.includes('blue')) return 'bg-blue-500';
    return 'bg-slate-400';
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
      <div className="bg-gradient-to-br from-pink-500 to-rose-600 rounded-3xl p-8 shadow-2xl">
        <div className="flex items-center gap-6 mb-6">
          <div className="text-6xl">🎨</div>
          <div className="flex-1 text-white">
            <div className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm mb-3">
              Visual Arts - Beginner
            </div>
            <h1 className="text-white mb-2">Shapes & Colors</h1>
            <p className="text-white/90">Discover the wonderful world of shapes and colors! Learn to identify, name, and create with different shapes and colors.</p>
          </div>
        </div>
        
        {/* Progress Bar */}
        {lesson && !isLessonCompleted && (
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
            <div className="flex items-center justify-between text-sm text-white mb-2">
              <span>Lesson Progress</span>
              <span>{lesson.progressPercent}%</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2">
              <div
                className="bg-white h-2 rounded-full transition-all duration-500"
                style={{ width: `${lesson.progressPercent}%` }}
              />
            </div>
            <div className="flex items-center justify-between mt-3 text-xs text-white/80">
              <span>Started: {new Date(lesson.startedDate).toLocaleDateString()}</span>
              <span>Expires: {new Date(lesson.expirationDate).toLocaleDateString()}</span>
            </div>
          </div>
        )}
      </div>

      {/* Part 1: The Shapes */}
      <div>
        <div className="mb-6">
          <h2 className="text-slate-800 dark:text-slate-100 mb-2">Part 1: The Shapes</h2>
          <p className="text-slate-600 dark:text-slate-400">Learn about different geometric shapes and their properties.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {shapes.map((shape, index) => {
            const Icon = shape.icon;
            return (
              <div
                key={index}
                className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-6 hover:shadow-xl transition-all group"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-slate-800 dark:text-slate-100 mb-1">{shape.name}</h3>
                  </div>
                </div>
                <p className="text-slate-600 dark:text-slate-400 mb-4">{shape.description}</p>
                <div className="space-y-2">
                  <div className="text-sm text-slate-500 dark:text-slate-500">Examples:</div>
                  <div className="flex flex-wrap gap-2">
                    {shape.examples.map((example, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-gradient-to-r from-pink-50 to-rose-50 dark:from-slate-700 dark:to-slate-700 text-pink-700 dark:text-pink-300 rounded-lg text-sm border border-pink-200 dark:border-slate-600"
                      >
                        {example}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Activity 1: Shape Hunt */}
      <div className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-3xl p-8 shadow-2xl">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <Search className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-white">Activity 1: Shape Hunt</h2>
          </div>
          <p className="text-white/90">Click on the items below to find shapes around you! Check off each shape as you identify it.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {shapeHuntItems.map((item, index) => {
            const isFound = foundShapes.includes(item.shape);
            return (
              <button
                key={index}
                onClick={() => toggleShapeFound(item.shape)}
                className={`p-6 rounded-2xl border-2 transition-all ${
                  isFound
                    ? 'bg-white border-white shadow-lg transform scale-105'
                    : 'bg-white/10 backdrop-blur-sm border-white/30 hover:bg-white/20'
                }`}
              >
                <div className="text-4xl mb-2">{item.emoji}</div>
                <div className={`text-sm mb-1 ${isFound ? 'text-purple-600' : 'text-white'}`}>
                  {item.name}
                </div>
                <div className={`text-xs ${isFound ? 'text-purple-500' : 'text-white/70'}`}>
                  {item.shape}
                </div>
                {isFound && (
                  <div className="mt-2">
                    <CheckCircle className="w-5 h-5 text-emerald-500 mx-auto" />
                  </div>
                )}
              </button>
            );
          })}
        </div>

        <div className="mt-6 bg-white/10 backdrop-blur-sm rounded-xl p-4">
          <div className="flex items-center justify-between text-white">
            <span>Shapes Found: {foundShapes.length} / {shapeHuntItems.length}</span>
            {foundShapes.length === shapeHuntItems.length && (
              <div className="flex items-center gap-2 text-emerald-300">
                <Sparkles className="w-5 h-5" />
                <span>All shapes found! Great job!</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Part 2: The Colors */}
      <div>
        <div className="mb-6">
          <h2 className="text-slate-800 dark:text-slate-100 mb-2">Part 2: The Colors</h2>
          <p className="text-slate-600 dark:text-slate-400">Understand primary, secondary, and tertiary colors and how they mix together.</p>
        </div>

        {/* Primary Colors */}
        <div className="mb-8">
          <div className="mb-4">
            <h3 className="text-slate-800 dark:text-slate-100 mb-2">Primary Colors</h3>
            <p className="text-slate-600 dark:text-slate-400">These are the three "original" colors. They cannot be created by mixing other colors together. All other colors are made from these.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {primaryColors.map((color, index) => (
              <div
                key={index}
                className={`${color.color} rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all transform hover:scale-105`}
              >
                <div className={`${color.textColor} space-y-3`}>
                  <h3 className={color.textColor}>{color.name}</h3>
                  <p className={`${color.textColor} opacity-90`}>{color.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Secondary Colors */}
        <div className="mb-8">
          <div className="mb-4">
            <h3 className="text-slate-800 dark:text-slate-100 mb-2">Secondary Colors</h3>
            <p className="text-slate-600 dark:text-slate-400">These are the colors you create by mixing two primary colors together.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {secondaryColors.map((color, index) => (
              <div
                key={index}
                className={`${color.color} rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all transform hover:scale-105`}
              >
                <div className={`${color.textColor} space-y-3`}>
                  <h3 className={color.textColor}>{color.name}</h3>
                  <div className={`${color.textColor} opacity-90 space-y-2`}>
                    <p className="text-sm bg-black/10 backdrop-blur-sm rounded-lg px-3 py-2 inline-block">
                      {color.mix}
                    </p>
                    <p>{color.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tertiary Colors */}
        <div className="mb-8">
          <div className="mb-4">
            <h3 className="text-slate-800 dark:text-slate-100 mb-2">Tertiary Colors</h3>
            <p className="text-slate-600 dark:text-slate-400">These are the colors you create by mixing one primary color with one secondary color that is next to it on the color wheel.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tertiaryColors.map((color, index) => (
              <div
                key={index}
                className={`${color.color} rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all transform hover:scale-105`}
              >
                <div className={`${color.textColor} space-y-2`}>
                  <h4 className={color.textColor}>{color.name}</h4>
                  <div className={`${color.textColor} text-sm opacity-90`}>
                    <p className="bg-black/10 backdrop-blur-sm rounded-lg px-3 py-1 inline-block">
                      {color.mix}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Activity 2: Color Mixing */}
      <div className="bg-gradient-to-br from-cyan-500 to-blue-600 rounded-3xl p-8 shadow-2xl">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <Palette className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-white">Activity 2: Color Mixing</h2>
          </div>
          <p className="text-white/90">Mix two primary colors together to create a secondary color! Select two colors below.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Color 1 Selection */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border-2 border-white/30">
            <h3 className="text-white mb-4">Color 1</h3>
            <div className="space-y-3">
              {colorMixingOptions.map((color) => (
                <button
                  key={color.value}
                  onClick={() => setSelectedColor1(color.value)}
                  className={`w-full p-4 rounded-xl border-2 transition-all ${
                    selectedColor1 === color.value
                      ? `${color.bgClass} border-white shadow-lg`
                      : 'bg-white/20 border-white/30 hover:bg-white/30'
                  }`}
                >
                  <div className={`${selectedColor1 === color.value ? 'text-white' : 'text-white/90'}`}>
                    {color.name}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Mix Result */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border-2 border-white/30 flex flex-col items-center justify-center">
            <div className="text-white mb-4 text-center">
              <div className="text-4xl mb-2">🎨</div>
              <div>Mixed Color</div>
            </div>
            {mixedColor ? (
              <div className="space-y-4 w-full">
                <div className={`w-full h-24 ${getMixedColorClass()} rounded-xl shadow-lg border-4 border-white`}></div>
                <div className="text-white text-center">
                  <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg">
                    {mixedColor}
                  </span>
                </div>
              </div>
            ) : (
              <div className="text-white/70 text-center">
                Select two colors to mix
              </div>
            )}
          </div>

          {/* Color 2 Selection */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border-2 border-white/30">
            <h3 className="text-white mb-4">Color 2</h3>
            <div className="space-y-3">
              {colorMixingOptions.map((color) => (
                <button
                  key={color.value}
                  onClick={() => setSelectedColor2(color.value)}
                  className={`w-full p-4 rounded-xl border-2 transition-all ${
                    selectedColor2 === color.value
                      ? `${color.bgClass} border-white shadow-lg`
                      : 'bg-white/20 border-white/30 hover:bg-white/30'
                  }`}
                >
                  <div className={`${selectedColor2 === color.value ? 'text-white' : 'text-white/90'}`}>
                    {color.name}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-3 justify-center">
          <Button
            onClick={handleColorMix}
            disabled={!selectedColor1 || !selectedColor2}
            className="bg-white text-cyan-600 hover:bg-cyan-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Mix Colors!
          </Button>
          <Button
            onClick={resetColorMixing}
            variant="outline"
            className="bg-white/10 border-white/30 text-white hover:bg-white/20"
          >
            Reset
          </Button>
        </div>
      </div>

      {/* Completion Section */}
      <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl p-8 shadow-lg">
        <div className="flex items-center gap-4 mb-4">
          <CheckCircle className="w-12 h-12 text-white" />
          <div className="text-white">
            <h3 className="text-white mb-1">Ready to Complete This Lesson?</h3>
            <p className="text-white/90">You've reviewed all the content. Mark this lesson as complete to unlock activities!</p>
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
              Congratulations! You've successfully completed the Shapes & Colors lesson.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 border border-emerald-200 dark:border-emerald-800/30 rounded-xl p-4">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Award className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                <span className="text-emerald-700 dark:text-emerald-300">+100 Points Earned</span>
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400 text-center">
                The Shapes & Colors Challenge activity is now available in the Activities section!
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
