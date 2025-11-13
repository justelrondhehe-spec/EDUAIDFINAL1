import { ArrowLeft, Trophy, Award, Sparkles, X } from 'lucide-react';
import { Button } from './ui/button';
import { useState, useCallback, useEffect } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useApp } from '../contexts/AppContext';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';

interface ShapeColorSorterProps {
  onBack: () => void;
}

interface ShapeItem {
  id: string;
  type: 'circle' | 'square' | 'triangle';
  color: 'red' | 'blue' | 'yellow';
}

interface BucketType {
  type: 'circle' | 'square' | 'triangle';
  color: 'red' | 'blue' | 'yellow';
  label: string;
}

const DraggableShape = ({ shape, onDrop }: { shape: ShapeItem; onDrop: (id: string) => void }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'shape',
    item: shape,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (item, monitor) => {
      if (monitor.didDrop()) {
        onDrop(item.id);
      }
    },
  }), [shape]);

  const getShapeStyle = () => {
    const baseStyle = 'transition-all cursor-move hover:scale-110';
    const colorClass = 
      shape.color === 'red' ? 'bg-red-500' :
      shape.color === 'blue' ? 'bg-blue-500' :
      'bg-yellow-400';
    
    if (isDragging) {
      return `${baseStyle} ${colorClass} opacity-50`;
    }
    return `${baseStyle} ${colorClass} shadow-lg hover:shadow-xl`;
  };

  const renderShape = () => {
    const shapeClasses = getShapeStyle();
    
    if (shape.type === 'circle') {
      return <div ref={drag} className={`${shapeClasses} w-16 h-16 rounded-full`} />;
    } else if (shape.type === 'square') {
      return <div ref={drag} className={`${shapeClasses} w-16 h-16 rounded-lg`} />;
    } else {
      return (
        <div ref={drag} className="relative w-16 h-16 cursor-move transition-all hover:scale-110">
          <div 
            className={`absolute inset-0 ${shape.color === 'yellow' ? 'bg-yellow-400' : shape.color === 'red' ? 'bg-red-500' : 'bg-blue-500'}`}
            style={{
              clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
              boxShadow: isDragging ? 'none' : '0 10px 15px -3px rgb(0 0 0 / 0.1)',
              opacity: isDragging ? 0.5 : 1,
            }}
          />
        </div>
      );
    }
  };

  return renderShape();
};

const Bucket = ({ 
  bucket, 
  onDrop, 
  onRemove,
  shapes 
}: { 
  bucket: BucketType; 
  onDrop: (shape: ShapeItem, isCorrect: boolean) => void;
  onRemove: (shape: ShapeItem) => void;
  shapes: ShapeItem[];
}) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'shape',
    drop: (item: ShapeItem) => {
      const isCorrect = item.type === bucket.type && item.color === bucket.color;
      onDrop(item, isCorrect);
      return undefined;
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }), [bucket]);

  const colorClass = 
    bucket.color === 'red' ? 'bg-red-500' :
    bucket.color === 'blue' ? 'bg-blue-500' :
    'bg-yellow-400';

  const borderClass = 
    isOver ? 'border-purple-500 border-4 scale-105' :
    'border-slate-300 dark:border-slate-600';

  const renderBucketShape = () => {
    if (bucket.type === 'circle') {
      return <div className={`${colorClass} w-12 h-12 rounded-full`} />;
    } else if (bucket.type === 'square') {
      return <div className={`${colorClass} w-12 h-12 rounded-lg`} />;
    } else {
      return (
        <div className="relative w-12 h-12">
          <div 
            className={colorClass}
            style={{
              clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
              width: '100%',
              height: '100%',
            }}
          />
        </div>
      );
    }
  };

  const renderShapeInBucket = (shape: ShapeItem) => {
    const isCorrect = shape.type === bucket.type && shape.color === bucket.color;
    const shapeColorClass = 
      shape.color === 'red' ? 'bg-red-500' :
      shape.color === 'blue' ? 'bg-blue-500' :
      'bg-yellow-400';
    
    const containerClass = isCorrect 
      ? 'border-2 border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20' 
      : 'border-2 border-red-500 bg-red-50 dark:bg-red-900/20';

    if (shape.type === 'circle') {
      return (
        <div className={`${containerClass} rounded-xl p-2 flex items-center gap-2 relative group`}>
          <div className={`${shapeColorClass} w-8 h-8 rounded-full`} />
          <button
            onClick={() => onRemove(shape)}
            className="absolute -top-2 -right-2 bg-slate-700 hover:bg-slate-800 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      );
    } else if (shape.type === 'square') {
      return (
        <div className={`${containerClass} rounded-xl p-2 flex items-center gap-2 relative group`}>
          <div className={`${shapeColorClass} w-8 h-8 rounded-lg`} />
          <button
            onClick={() => onRemove(shape)}
            className="absolute -top-2 -right-2 bg-slate-700 hover:bg-slate-800 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      );
    } else {
      return (
        <div className={`${containerClass} rounded-xl p-2 flex items-center gap-2 relative group`}>
          <div className="relative w-8 h-8">
            <div 
              className={shapeColorClass}
              style={{
                clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
                width: '100%',
                height: '100%',
              }}
            />
          </div>
          <button
            onClick={() => onRemove(shape)}
            className="absolute -top-2 -right-2 bg-slate-700 hover:bg-slate-800 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      );
    }
  };

  return (
    <div
      ref={drop}
      className={`relative bg-white dark:bg-slate-800 rounded-2xl border-4 ${borderClass} p-6 transition-all flex flex-col items-center min-h-[280px] w-full`}
    >
      <div className="mb-3">
        {renderBucketShape()}
      </div>
      <div className="text-slate-700 dark:text-slate-300 mb-4">{bucket.label}</div>
      
      <div className="flex flex-col gap-2 w-full">
        {shapes.map((shape) => (
          <div key={shape.id}>
            {renderShapeInBucket(shape)}
          </div>
        ))}
      </div>
      
      {isOver && (
        <div className="absolute inset-0 bg-purple-500/10 rounded-2xl flex items-center justify-center">
          <Sparkles className="w-8 h-8 text-purple-500" />
        </div>
      )}
    </div>
  );
};

export function ShapeColorSorter({ onBack }: ShapeColorSorterProps) {
  const { completeActivity, activityScores } = useApp();
  const activityId = 1; // Shapes & Colors Challenge activity ID
  const isActivityCompleted = activityScores[activityId]?.completed || false;

  const initialShapes: ShapeItem[] = [
    { id: 'red-circle-1', type: 'circle', color: 'red' },
    { id: 'red-circle-2', type: 'circle', color: 'red' },
    { id: 'red-circle-3', type: 'circle', color: 'red' },
    { id: 'blue-square-1', type: 'square', color: 'blue' },
    { id: 'blue-square-2', type: 'square', color: 'blue' },
    { id: 'blue-square-3', type: 'square', color: 'blue' },
    { id: 'yellow-triangle-1', type: 'triangle', color: 'yellow' },
    { id: 'yellow-triangle-2', type: 'triangle', color: 'yellow' },
    { id: 'yellow-triangle-3', type: 'triangle', color: 'yellow' },
  ];

  const [shapes, setShapes] = useState<ShapeItem[]>(() => {
    // Shuffle shapes for random order
    return [...initialShapes].sort(() => Math.random() - 0.5);
  });

  const [buckets, setBuckets] = useState<{ [key: string]: ShapeItem[] }>({
    'red-circle': [],
    'blue-square': [],
    'yellow-triangle': [],
  });

  const [correctMoves, setCorrectMoves] = useState(0);
  const [incorrectMoves, setIncorrectMoves] = useState(0);
  const [showCompletionDialog, setShowCompletionDialog] = useState(false);

  const bucketDefinitions: BucketType[] = [
    { type: 'circle', color: 'red', label: 'Red Circle' },
    { type: 'square', color: 'blue', label: 'Blue Square' },
    { type: 'triangle', color: 'yellow', label: 'Yellow Triangle' },
  ];

  const handleDrop = useCallback((bucketKey: string, shape: ShapeItem, isCorrect: boolean) => {
    setBuckets(prev => ({
      ...prev,
      [bucketKey]: [...prev[bucketKey], shape],
    }));
    
    if (isCorrect) {
      setCorrectMoves(c => c + 1);
    } else {
      setIncorrectMoves(i => i + 1);
    }
  }, []);

  const handleShapeRemove = useCallback((id: string) => {
    setShapes(prev => prev.filter(s => s.id !== id));
  }, []);

  const handleRemoveFromBucket = useCallback((bucketKey: string, shape: ShapeItem) => {
    setBuckets(prev => ({
      ...prev,
      [bucketKey]: prev[bucketKey].filter(s => s.id !== shape.id),
    }));
    
    setShapes(prev => [...prev, shape]);
    
    // Adjust scores
    const bucket = bucketDefinitions.find(b => `${b.color}-${b.type}` === bucketKey);
    const isCorrect = bucket && shape.type === bucket.type && shape.color === bucket.color;
    
    if (isCorrect) {
      setCorrectMoves(c => Math.max(0, c - 1));
    } else {
      setIncorrectMoves(i => Math.max(0, i - 1));
    }
  }, [bucketDefinitions]);

  const isComplete = shapes.length === 0;

  // Check for completion whenever shapes are all placed
  useEffect(() => {
    if (isComplete && !isActivityCompleted && !showCompletionDialog) {
      const timer = setTimeout(() => {
        const maxScore = 9; // 9 correct placements possible
        const score = correctMoves; // Score based on correct moves
        
        completeActivity(activityId, score, maxScore);
        setShowCompletionDialog(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isComplete, isActivityCompleted, showCompletionDialog, activityId, completeActivity, correctMoves]);

  const handleReset = () => {
    const shuffled = [...initialShapes].sort(() => Math.random() - 0.5);
    setShapes(shuffled);
    setBuckets({
      'red-circle': [],
      'blue-square': [],
      'yellow-triangle': [],
    });
    setCorrectMoves(0);
    setIncorrectMoves(0);
    setShowCompletionDialog(false);
  };

  const calculateScore = () => {
    if (correctMoves === 0) return 0;
    return Math.round((correctMoves / 9) * 100);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={onBack} className="dark:bg-slate-800 dark:border-slate-700">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Activities
            </Button>
          </div>
          <Button onClick={handleReset} variant="outline" className="dark:bg-slate-800 dark:border-slate-700">
            Reset Game
          </Button>
        </div>

        {/* Activity Title */}
        <div className="bg-gradient-to-br from-pink-500 to-rose-600 rounded-3xl p-8 shadow-2xl">
          <div className="flex items-center gap-6">
            <div className="text-6xl">🎨</div>
            <div className="text-white">
              <div className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm mb-3">
                Interactive Quiz - Visual Arts
              </div>
              <h1 className="text-white mb-2">Shape & Color Sorter</h1>
              <p className="text-white/90">Drag each shape to its matching bucket below! Match by both shape and color.</p>
            </div>
          </div>
        </div>

        {/* Score Tracker */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 border-2 border-emerald-200 dark:border-emerald-800/30 rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <span className="text-emerald-700 dark:text-emerald-300">Correct</span>
              <span className="text-2xl text-emerald-600 dark:text-emerald-400">{correctMoves}</span>
            </div>
          </div>
          <div className="bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-900/20 dark:to-rose-900/20 border-2 border-red-200 dark:border-red-800/30 rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <span className="text-red-700 dark:text-red-300">Incorrect</span>
              <span className="text-2xl text-red-600 dark:text-red-400">{incorrectMoves}</span>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800/30 rounded-2xl p-6">
          <h3 className="text-blue-900 dark:text-blue-100 mb-2">How to Play:</h3>
          <ul className="text-blue-800 dark:text-blue-200 space-y-1 list-disc list-inside">
            <li>Drag each shape from the pile to any bucket below</li>
            <li>Shapes placed in the correct bucket will show a green border</li>
            <li>Shapes placed incorrectly will show a red border</li>
            <li>You can remove shapes from buckets and try again!</li>
            <li>Your final score is based on correct placements out of 9 total</li>
          </ul>
        </div>

        {/* Shapes Pile */}
        <div className="bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 border-2 border-purple-200 dark:border-purple-800/30 rounded-2xl p-8">
          <h2 className="text-slate-800 dark:text-slate-100 mb-6 text-center">Shape Pile ({shapes.length} remaining)</h2>
          <div className="flex flex-wrap gap-6 justify-center min-h-[120px] items-center">
            {shapes.length === 0 ? (
              <div className="text-slate-500 dark:text-slate-400 text-center py-8">
                <Sparkles className="w-12 h-12 mx-auto mb-2 text-emerald-500" />
                <div>All shapes placed! Check your score! 🎉</div>
              </div>
            ) : (
              shapes.map(shape => (
                <DraggableShape 
                  key={shape.id} 
                  shape={shape} 
                  onDrop={handleShapeRemove}
                />
              ))
            )}
          </div>
        </div>

        {/* Buckets */}
        <div>
          <h2 className="text-slate-800 dark:text-slate-100 mb-6 text-center">Sorting Buckets</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {bucketDefinitions.map((bucket) => {
              const bucketKey = `${bucket.color}-${bucket.type}`;
              return (
                <Bucket
                  key={bucketKey}
                  bucket={bucket}
                  onDrop={(shape, isCorrect) => handleDrop(bucketKey, shape, isCorrect)}
                  onRemove={(shape) => handleRemoveFromBucket(bucketKey, shape)}
                  shapes={buckets[bucketKey]}
                />
              );
            })}
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-slate-800 dark:text-slate-100">Progress</h3>
            <span className="text-slate-600 dark:text-slate-400">
              {9 - shapes.length} / 9 placed
            </span>
          </div>
          <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-4">
            <div
              className="bg-gradient-to-r from-pink-500 to-rose-600 h-4 rounded-full transition-all duration-500"
              style={{ 
                width: `${((9 - shapes.length) / 9) * 100}%` 
              }}
            />
          </div>
        </div>

        {/* Completion Dialog */}
        <Dialog open={showCompletionDialog} onOpenChange={setShowCompletionDialog}>
          <DialogContent className="sm:max-w-md">
            <div className="flex justify-center mb-4">
              <div className={`w-20 h-20 bg-gradient-to-br ${calculateScore() === 100 ? 'from-emerald-500 to-emerald-600' : 'from-blue-500 to-blue-600'} rounded-full flex items-center justify-center`}>
                <Trophy className="w-10 h-10 text-white" />
              </div>
            </div>
            <DialogHeader>
              <DialogTitle className="text-center text-2xl">Activity Completed! 🎉</DialogTitle>
              <DialogDescription className="text-center">
                {calculateScore() === 100 
                  ? "Perfect! You sorted all shapes correctly!" 
                  : "Great effort! You can try again to improve your score."}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className={`bg-gradient-to-br ${calculateScore() === 100 ? 'from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 border-emerald-200 dark:border-emerald-800/30' : 'from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-800/30'} border rounded-xl p-4`}>
                <div className="text-center mb-3">
                  <div className="text-4xl mb-2">{calculateScore()}%</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">
                    {correctMoves} correct out of 9
                  </div>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Award className={`w-5 h-5 ${calculateScore() === 100 ? 'text-emerald-600 dark:text-emerald-400' : 'text-blue-600 dark:text-blue-400'}`} />
                  <span className={calculateScore() === 100 ? 'text-emerald-700 dark:text-emerald-300' : 'text-blue-700 dark:text-blue-300'}>
                    Score: {correctMoves}/9 ({calculateScore()}%)
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2 mt-4">
              <Button 
                onClick={() => {
                  setShowCompletionDialog(false);
                  onBack();
                }}
                className={calculateScore() === 100 ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700' : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700'}
              >
                Back to Activities
              </Button>
              <Button 
                onClick={() => {
                  setShowCompletionDialog(false);
                  handleReset();
                }}
                variant="outline"
              >
                Try Again
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </DndProvider>
  );
}
