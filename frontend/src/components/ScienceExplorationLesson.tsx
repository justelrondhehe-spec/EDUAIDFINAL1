import React, { useState, useEffect } from "react";
import {
  FlaskConical,
  Sparkles,
  CheckCircle2,
  ArrowLeft,
  Sun,
  Droplets,
  Leaf,
  Ship,
  X,
  Trophy,
  Beaker,
  Star,
  CheckCircle,
  Award,
  Hand,
  Eye,
  Ear,
  Thermometer,
} from "lucide-react";


// --- Mock Context for Preview ---
const AppContext = React.createContext(null);

const useApp = () => {
  const context = React.useContext(AppContext);
  if (!context) {
    return {
      startLesson: () => console.log("Lesson Started"),
      completeLesson: () => console.log("Lesson Completed"),
      saveAndExitLesson: (id, progress) =>
        console.log(
          `Saved lesson ${id} with progress ${progress}%`,
        ),
      lessonProgress: {},
    };
  }
  return context;
};

// --- Main App Wrapper ---
export default function App() {
  const [demoProgress, setDemoProgress] = useState({});
  const mockContextValue = {
    startLesson: (id) => console.log(`Started lesson ${id}`),
    completeLesson: (id) =>
      console.log(`Completed lesson ${id}`),
    saveAndExitLesson: (id, progress) =>
      console.log(`Saved: ${progress}%`),
    lessonProgress: demoProgress,
  };

  return (
    <AppContext.Provider value={mockContextValue}>
      <div className="min-h-screen bg-slate-50 text-slate-900 font-sans p-8">
        <ScienceExplorationLesson
          onBack={() => console.log("Back clicked")}
        />
      </div>
    </AppContext.Provider>
  );
}

// --- Reusable UI Components (Matching Reference) ---

const Button = ({
  children,
  onClick,
  variant = "primary",
  className = "",
  size = "md",
  disabled = false,
}) => {
  // Matching ui/button styles more closely
  const baseStyles =
    "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:pointer-events-none disabled:opacity-50";

  const variants = {
    primary:
      "bg-slate-900 text-slate-50 hover:bg-slate-900/90 shadow",
    outline:
      "border border-slate-200 bg-white shadow-sm hover:bg-slate-100 hover:text-slate-900",
    ghost: "hover:bg-slate-100 hover:text-slate-900",
    secondary:
      "bg-slate-100 text-slate-900 shadow-sm hover:bg-slate-100/80",
    green:
      "bg-white text-emerald-600 hover:bg-emerald-50 shadow-sm", // Custom for the green card buttons
    outlineWhite:
      "border border-white/30 bg-white/10 text-white hover:bg-white/20 shadow-sm", // New variant for Save & Exit on dark/green backgrounds
  };

  const sizes = {
    sm: "h-8 px-3 text-xs",
    md: "h-9 px-4 py-2",
    lg: "h-10 rounded-md px-8",
    icon: "h-9 w-9",
  };

  // Override for specific custom classes passed in
  const variantClass = variants[variant] || variants.primary;

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantClass} ${sizes[size]} ${className}`}
    >
      {children}
    </button>
  );
};

// --- Mock Dialog Components (Simulating ./ui/dialog) ---
const Dialog = ({ open, onOpenChange, children }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* dark overlay */}
      <div
        className="absolute inset-0 bg-black/70"
        onClick={() => onOpenChange(false)}
      />

      {/* wrapper na nagce-center ng card */}
      <div className="relative z-10 flex w-full h-full items-center justify-center">
        {children}
      </div>
    </div>
  );
};



const DialogHeader = ({ children }) => (
  <div className="flex flex-col space-y-1.5 text-center sm:text-left">
    {children}
  </div>
);
const DialogTitle = ({ children, className }) => (
  <h2
    className={`text-lg font-semibold leading-none tracking-tight ${className}`}
  >
    {children}
  </h2>
);
const DialogDescription = ({ children, className }) => (
  <p className={`text-sm text-slate-500 ${className}`}>
    {children}
  </p>
);
const DialogContent = ({ children, className = "" }) => (
  <div
    className={`
      w-full max-w-xl mx-auto
      bg-white rounded-3xl shadow-2xl
      p-6
      ${className}
    `}
  >
    {children}
  </div>
);



// --- Main Lesson Component ---

export function ScienceExplorationLesson({ onBack }) {
  const {
    startLesson,
    completeLesson,
    saveAndExitLesson,
    lessonProgress,
  } = useApp();
  const lessonId = 3;

  // Activity 1: Senses Scavenger Hunt
  const [foundItems, setFoundItems] = useState([]);
  
  // Activity 2: Observation Lab
  const [selectedTool, setSelectedTool] = useState(null);
  const [selectedObject, setSelectedObject] = useState(null);
  const [observationResult, setObservationResult] = useState("");

  const [showCompletionDialog, setShowCompletionDialog] =
    useState(false);

  // Initialize
  useEffect(() => {
    startLesson(lessonId);
  }, []);

  const lesson = lessonProgress[lessonId];
  const isLessonCompleted = lesson?.completed || false;

  // The Five Senses data
  const fiveSenses = [
    {
      id: "sight",
      name: "Sight (Eyes)",
      emoji: "👁️",
      description: "We use our eyes to see colors, shapes, and light. We use them to look closely at things.",
      examples: ["Rainbow", "Reading a Book"],
    },
    {
      id: "hearing",
      name: "Hearing (Ears)",
      emoji: "👂",
      description: "We use our ears to listen to sounds. Some sounds are loud, and some are quiet.",
      examples: ["Thunder (Loud)", "Whisper (Quiet)"],
    },
    {
      id: "touch",
      name: "Touch (Hands & Skin)",
      emoji: "✋",
      description: "We use our hands to feel texture and temperature. Is it hot? Is it cold? Is it soft?",
      examples: ["Ice Cube (Cold)", "Bunny Fur (Soft)"],
    },
    {
      id: "smell",
      name: "Smell (Nose)",
      emoji: "👃",
      description: "We use our nose to smell scents in the air. Some smells are yummy, and some are yucky!",
      examples: ["Fresh Cookies", "Garbage Truck"],
    },
    {
      id: "taste",
      name: "Taste (Mouth)",
      emoji: "👅",
      description: "We use our tongue to taste food. Science is delicious! (Always ask an adult before tasting).",
      examples: ["Lemon (Sour)", "Candy (Sweet)"],
    },
  ];

  // Scavenger Hunt Items
  const scavengerItems = [
    { id: "rainbow", emoji: "🌈", name: "Rainbow", sense: "Sight" },
    { id: "drum", emoji: "🥁", name: "Drum", sense: "Hearing" },
    { id: "teddy", emoji: "🧸", name: "Teddy Bear", sense: "Touch" },
    { id: "flower", emoji: "🌸", name: "Flower", sense: "Smell" },
    { id: "icecream", emoji: "🍦", name: "Ice Cream", sense: "Taste" },
    { id: "bell", emoji: "🔔", name: "Bell", sense: "Hearing" },
  ];

  // Science Gear data
  const scienceGear = [
    {
      id: "magnifying",
      name: "Magnifying Glass",
      emoji: "🔍",
      description: "A tool with a special curved glass lens. It makes tiny things look BIG.",
      examples: ["Looking at an Ant", "Looking at a Snowflake"],
    },
    {
      id: "binoculars",
      name: "Binoculars",
      emoji: "🔭",
      description: "Two special tubes with lenses. They help us see things that are far away.",
      examples: ["Bird watching", "Looking at the Moon"],
    },
    {
      id: "thermometer",
      name: "Thermometer",
      emoji: "🌡️",
      description: "A tool that measures temperature. It tells us how hot or cold something is.",
      examples: ["Checking a fever", "Measuring sunny weather"],
    },
    {
      id: "scale",
      name: "Balance Scale",
      emoji: "⚖️",
      description: "A tool that measures weight. It tells us which object is heavier.",
      examples: ["Weighing an Apple vs. Grape", "Measuring rocks"],
    },
  ];

  // Observation Lab tools and objects
  const labTools = [
    { id: "magnifying", emoji: "🔍", name: "Magnifying Glass" },
    { id: "binoculars", emoji: "🔭", name: "Binoculars" },
    { id: "thermometer", emoji: "🌡️", name: "Thermometer" },
  ];

  const labObjects = [
    { id: "ant", emoji: "🐜", name: "Tiny Ant" },
    { id: "bird", emoji: "🦅", name: "Bird in Tree" },
    { id: "snowman", emoji: "☃️", name: "Snowman" },
  ];

  const calculateProgress = () => {
    // Progress based on both activities
    const activity1Progress = (foundItems.length / scavengerItems.length) * 50;
    const activity2Progress = observationResult ? 50 : 0;
    return Math.round(activity1Progress + activity2Progress);
  };

  const handleToggleItem = (id) => {
    if (foundItems.includes(id)) {
      setFoundItems((prev) => prev.filter((item) => item !== id));
    } else {
      setFoundItems((prev) => [...prev, id]);
    }
  };

  const handleExplore = () => {
    if (!selectedTool || !selectedObject) {
      setObservationResult("Please select both a tool and an object!");
      return;
    }

    // Logic for observation results
    const results = {
      "magnifying-ant": "Wow! You can see the ant's legs!",
      "binoculars-bird": "I see it! The bird has blue feathers.",
      "thermometer-snowman": "Brrr! It is 0 degrees (Freezing).",
      "magnifying-bird": "The bird is too far away. Try binoculars!",
      "magnifying-snowman": "The snowman looks the same. Try a thermometer!",
      "binoculars-ant": "The ant is too small to see with binoculars. Try a magnifying glass!",
      "binoculars-snowman": "You can see the snowman better, but you can't measure temperature with binoculars!",
      "thermometer-ant": "The thermometer doesn't help you see the ant. Try a magnifying glass!",
      "thermometer-bird": "The thermometer doesn't help you see the bird. Try binoculars!",
    };

    const key = `${selectedTool}-${selectedObject}`;
    setObservationResult(results[key] || "Interesting combination! What do you observe?");
  };

  const handleReset = () => {
    setSelectedTool(null);
    setSelectedObject(null);
    setObservationResult("");
  };

  const handleSaveAndExit = () => {
    const progress = calculateProgress();
    saveAndExitLesson(lessonId, progress);
    onBack();
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* --- Standard Header (Matches ReadingBasicsLesson) --- */}
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          onClick={onBack}
          className="dark:bg-slate-800 dark:border-slate-700"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Lessons
        </Button>
      </div>

      {/* --- Lesson Title Card --- */}
      {/* Kept the science styling but structurally aligned */}
      <div className="bg-gradient-to-br from-indigo-600 to-violet-600 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />

        {/* Tag */}
        <div className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm text-white mb-4">
          🧪 Science & Discovery
        </div>

        {/* Title */}
        <h1 className="text-white text-3xl font-bold mb-4">
          Science Exploration
        </h1>

        {/* Description */}
        <p className="text-white/90 mb-6 max-w-3xl">
          Put on your lab coat! Discover how the world works
          with fun, hands-on experiments about color, nature,
          and physics.
        </p>

        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <div className="text-white/80 text-sm mb-1">
              Estimated time
            </div>
            <div className="text-white">20 minutes</div>
          </div>
          <div>
            <div className="text-white/80 text-sm mb-1">
              Skills
            </div>
            <div className="text-white">
              Observation • Hypothesizing • Testing
            </div>
          </div>
        </div>

        {/* Continue Practice Button */}
        <button className="bg-white text-indigo-600 px-6 py-3 rounded-xl hover:bg-white/90 transition-all flex items-center gap-2 font-medium">
          <FlaskConical className="w-4 h-4" />
          Start Experimenting
        </button>
      </div>

      {/* --- Your Progress Section (Matches ReadingBasicsLesson) --- */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
        <h3 className="text-slate-800 dark:text-slate-100 mb-4 font-semibold">
          Your progress
        </h3>

        {/* Progress Info */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-slate-600 dark:text-slate-400 text-sm">
            Lesson completion
          </span>
          <span className="text-slate-800 dark:text-slate-100 font-medium">
            {calculateProgress()}%
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 mb-4">
          <div
            className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${calculateProgress()}%` }}
          />
        </div>

        {/* Tip */}
        <div className="flex items-start gap-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl p-4">
          <div className="text-2xl">💡</div>
          <p className="text-slate-600 dark:text-slate-400 text-sm">
            Ask the learner to guess what will happen before
            starting the experiment (Hypothesis).
          </p>
        </div>
      </div>

      {/* --- Part 1: The Five Senses --- */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg border border-slate-200 dark:border-slate-700">
        <h2 className="text-slate-800 dark:text-slate-100 mb-2 text-2xl font-bold">
          Part 1: The Five Senses
        </h2>
        <p className="text-slate-600 dark:text-slate-400 mb-6">
          Learn about the special tools on your body that help you explore the world.
        </p>

        <div className="space-y-6">
          {fiveSenses.map((sense) => (
            <div
              key={sense.id}
              className="bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900/50 dark:to-blue-900/20 rounded-xl p-6 border border-slate-200 dark:border-slate-700"
            >
              <div className="flex items-start gap-4">
                <div className="text-5xl">{sense.emoji}</div>
                <div className="flex-1">
                  <h3 className="text-slate-800 dark:text-slate-100 font-bold mb-2">
                    {sense.name}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-3">
                    {sense.description}
                  </p>
                  <div className="bg-white dark:bg-slate-800/50 rounded-lg p-3 border border-slate-200 dark:border-slate-700">
                    <div className="text-sm text-slate-500 dark:text-slate-400 font-semibold mb-2">
                      Examples:
                    </div>
                    <ul className="space-y-1">
                      {sense.examples.map((example, idx) => (
                        <li
                          key={idx}
                          className="text-slate-700 dark:text-slate-300 text-sm flex items-center gap-2"
                        >
                          <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></span>
                          {example}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- Activity 1: Senses Scavenger Hunt --- */}
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-8 shadow-lg border-2 border-purple-200 dark:border-purple-800">
        <div className="flex items-center gap-3 mb-4">
          <div className="text-4xl">🔍</div>
          <div>
            <h2 className="text-slate-800 dark:text-slate-100 text-2xl font-bold">
              Activity 1: Senses Scavenger Hunt
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              Click on the items below to find things we can explore with our senses! Check off each item as you find it.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          {scavengerItems.map((item) => {
            const isFound = foundItems.includes(item.id);
            return (
              <button
                key={item.id}
                onClick={() => handleToggleItem(item.id)}
                className={`relative p-6 rounded-xl border-2 transition-all transform hover:scale-105 ${
                  isFound
                    ? "bg-emerald-100 dark:bg-emerald-900/30 border-emerald-400 dark:border-emerald-600"
                    : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-purple-300"
                }`}
              >
                <div className="text-5xl mb-2">{item.emoji}</div>
                <div className="text-slate-800 dark:text-slate-100 font-semibold mb-1">
                  {item.name}
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  ({item.sense})
                </div>
                {isFound && (
                  <div className="absolute top-2 right-2 bg-emerald-500 text-white p-1 rounded-full">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                )}
              </button>
            );
          })}
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-purple-200 dark:border-purple-800">
          <div className="flex items-center justify-center gap-2">
            <Trophy className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            <span className="text-slate-800 dark:text-slate-100 font-bold">
              Items Found: {foundItems.length} / {scavengerItems.length}
            </span>
          </div>
        </div>
      </div>

      {/* --- Part 2: Science Gear --- */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg border border-slate-200 dark:border-slate-700">
        <h2 className="text-slate-800 dark:text-slate-100 mb-2 text-2xl font-bold">
          Part 2: Science Gear
        </h2>
        <p className="text-slate-600 dark:text-slate-400 mb-6">
          Understand the tools scientists use to help their senses work better.
        </p>

        <div className="space-y-6">
          {scienceGear.map((gear) => (
            <div
              key={gear.id}
              className="bg-gradient-to-br from-slate-50 to-amber-50 dark:from-slate-900/50 dark:to-amber-900/20 rounded-xl p-6 border border-slate-200 dark:border-slate-700"
            >
              <div className="flex items-start gap-4">
                <div className="text-5xl">{gear.emoji}</div>
                <div className="flex-1">
                  <h3 className="text-slate-800 dark:text-slate-100 font-bold mb-2">
                    {gear.name}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-3">
                    {gear.description}
                  </p>
                  <div className="bg-white dark:bg-slate-800/50 rounded-lg p-3 border border-slate-200 dark:border-slate-700">
                    <div className="text-sm text-slate-500 dark:text-slate-400 font-semibold mb-2">
                      Examples:
                    </div>
                    <ul className="space-y-1">
                      {gear.examples.map((example, idx) => (
                        <li
                          key={idx}
                          className="text-slate-700 dark:text-slate-300 text-sm flex items-center gap-2"
                        >
                          <span className="w-1.5 h-1.5 bg-amber-500 rounded-full"></span>
                          {example}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- Activity 2: The Observation Lab --- */}
      <div className="bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 rounded-2xl p-8 shadow-lg border-2 border-cyan-200 dark:border-cyan-800">
        <div className="flex items-center gap-3 mb-6">
          <div className="text-4xl">🔬</div>
          <div>
            <h2 className="text-slate-800 dark:text-slate-100 text-2xl font-bold">
              Activity 2: The Observation Lab
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              Pick a Tool and an Object to see what happens when you use them together!
            </p>
          </div>
        </div>

        {/* Tool Selection */}
        <div className="mb-6">
          <h3 className="text-slate-700 dark:text-slate-300 font-semibold mb-3">
            Select a Tool:
          </h3>
          <div className="grid grid-cols-3 gap-3">
            {labTools.map((tool) => (
              <button
                key={tool.id}
                onClick={() => setSelectedTool(tool.id)}
                className={`p-4 rounded-xl border-2 transition-all transform hover:scale-105 ${
                  selectedTool === tool.id
                    ? "bg-cyan-100 dark:bg-cyan-900/30 border-cyan-500 dark:border-cyan-600"
                    : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-cyan-300"
                }`}
              >
                <div className="text-4xl mb-2">{tool.emoji}</div>
                <div className="text-sm text-slate-700 dark:text-slate-300 font-medium">
                  {tool.name}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Object Selection */}
        <div className="mb-6">
          <h3 className="text-slate-700 dark:text-slate-300 font-semibold mb-3">
            Select an Object:
          </h3>
          <div className="grid grid-cols-3 gap-3">
            {labObjects.map((obj) => (
              <button
                key={obj.id}
                onClick={() => setSelectedObject(obj.id)}
                className={`p-4 rounded-xl border-2 transition-all transform hover:scale-105 ${
                  selectedObject === obj.id
                    ? "bg-blue-100 dark:bg-blue-900/30 border-blue-500 dark:border-blue-600"
                    : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-blue-300"
                }`}
              >
                <div className="text-4xl mb-2">{obj.emoji}</div>
                <div className="text-sm text-slate-700 dark:text-slate-300 font-medium">
                  {obj.name}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mb-6">
          <Button
            onClick={handleExplore}
            variant="primary"
            className="flex-1 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white"
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Explore!
          </Button>
          <Button
            onClick={handleReset}
            variant="outline"
            className="h-12"
          >
            Reset
          </Button>
        </div>

        {/* Results */}
        {observationResult && (
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border-2 border-cyan-300 dark:border-cyan-700 animate-in fade-in-0 zoom-in-95">
            <div className="flex items-start gap-3">
              <div className="text-3xl">🎯</div>
              <div>
                <h4 className="text-slate-800 dark:text-slate-100 font-bold mb-2">
                  Observation Result:
                </h4>
                <p className="text-slate-700 dark:text-slate-300">
                  {observationResult}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* --- Completion Section (Fixed "Save & Exit" button) --- */}
      <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl p-8 shadow-lg">
        <div className="flex items-center gap-4 mb-4">
          <CheckCircle className="w-12 h-12 text-white" />
          <div className="text-white">
            <h3 className="text-white mb-1 font-bold text-lg">
              Ready to Complete This Lesson?
            </h3>
            <p className="text-white/90">
              You've explored chemistry, physics, and biology
              like a real scientist!
            </p>
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
                variant="green"
                className="font-medium"
              >
                <Trophy className="w-4 h-4 mr-2" />
                Complete Lesson
              </Button>
              <Button
                onClick={handleSaveAndExit}
                variant="outlineWhite"
              >
                Save & Exit
              </Button>
            </>
          ) : (
            <Button onClick={onBack} variant="green">
              Back to Lessons
            </Button>
          )}
        </div>
      </div>

      {/* --- Completion Dialog (Exact match to ReadingBasicsLesson) --- */}
      <Dialog
        open={showCompletionDialog}
        onOpenChange={setShowCompletionDialog}
      >
        <DialogContent className="sm:max-w-md">
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center">
              <Trophy className="w-10 h-10 text-white" />
            </div>
          </div>
          <DialogHeader>
            <DialogTitle className="text-center text-2xl">
              Lesson Completed! 🎉
            </DialogTitle>
            <DialogDescription className="text-center">
              Congratulations! You've successfully completed the
              Science Exploration lesson.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 border border-emerald-200 dark:border-emerald-800/30 rounded-xl p-4">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Award className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                <span className="text-emerald-700 dark:text-emerald-300 font-medium">
                  +100 Points Earned
                </span>
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400 text-center">
                Amazing work! You are now a certified Junior
                Scientist ready for new discoveries.
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 mt-4">
            <Button
              onClick={() => {
                setShowCompletionDialog(false);
                onBack();
              }}
              className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white border-none w-full"
            >
              Back to Lessons
            </Button>
            <Button
              onClick={() => setShowCompletionDialog(false)}
              variant="outline"
              className="w-full"
            >
              Continue Reviewing
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
