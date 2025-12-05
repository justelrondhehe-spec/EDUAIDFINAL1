// frontend/src/components/ReadingBasicsLesson.tsx
import {
  ArrowLeft,
  CheckCircle,
  Hand,
  Trophy,
  Award,
  Star,
  Sparkles,
} from "lucide-react";
import { Button } from "./ui/button";
import { useState, useEffect, useRef } from "react";
import { useApp } from "../contexts/AppContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

interface ReadingBasicsLessonProps {
  onBack: () => void;
}

// Letter sounds data
const letterSounds = [
  { letter: "A", sound: "ah", word: "apple", emoji: "🍎", color: "from-red-400 to-red-600" },
  { letter: "B", sound: "buh", word: "ball", emoji: "⚽", color: "from-blue-400 to-blue-600" },
  { letter: "C", sound: "kuh", word: "cat", emoji: "🐱", color: "from-purple-400 to-purple-600" },
  { letter: "D", sound: "duh", word: "dog", emoji: "🐕", color: "from-orange-400 to-orange-600" },
  { letter: "E", sound: "eh", word: "egg", emoji: "🥚", color: "from-yellow-400 to-yellow-600" },
  { letter: "F", sound: "fuh", word: "fish", emoji: "🐟", color: "from-cyan-400 to-cyan-600" },
  { letter: "G", sound: "guh", word: "goat", emoji: "🐐", color: "from-gray-400 to-gray-600" },
  { letter: "H", sound: "huh", word: "hat", emoji: "🎩", color: "from-indigo-400 to-indigo-600" },
  { letter: "I", sound: "ih", word: "igloo", emoji: "🏔️", color: "from-blue-400 to-blue-600" },
  { letter: "J", sound: "juh", word: "jet", emoji: "✈️", color: "from-sky-400 to-sky-600" },
  { letter: "K", sound: "kuh", word: "kite", emoji: "🪁", color: "from-pink-400 to-pink-600" },
  { letter: "L", sound: "luh", word: "lion", emoji: "🦁", color: "from-amber-400 to-amber-600" },
  { letter: "M", sound: "muh", word: "moon", emoji: "🌙", color: "from-indigo-400 to-indigo-600" },
  { letter: "N", sound: "nuh", word: "nest", emoji: "🪺", color: "from-brown-400 to-brown-600" },
  { letter: "O", sound: "ah", word: "octopus", emoji: "🐙", color: "from-purple-400 to-purple-600" },
  { letter: "P", sound: "puh", word: "pig", emoji: "🐷", color: "from-pink-400 to-pink-600" },
  { letter: "Q", sound: "kwuh", word: "queen", emoji: "👸", color: "from-violet-400 to-violet-600" },
  { letter: "R", sound: "ruh", word: "rabbit", emoji: "🐰", color: "from-gray-400 to-gray-600" },
  { letter: "S", sound: "sss", word: "sun", emoji: "☀️", color: "from-yellow-400 to-yellow-600" },
  { letter: "T", sound: "tuh", word: "tree", emoji: "🌳", color: "from-green-400 to-green-600" },
  { letter: "U", sound: "uh", word: "umbrella", emoji: "☂️", color: "from-blue-400 to-blue-600" },
  { letter: "V", sound: "vuh", word: "van", emoji: "🚐", color: "from-teal-400 to-teal-600" },
  { letter: "W", sound: "wuh", word: "whale", emoji: "🐋", color: "from-blue-400 to-blue-600" },
  { letter: "X", sound: "ks", word: "box", emoji: "📦", color: "from-orange-400 to-orange-600" },
  { letter: "Y", sound: "yuh", word: "yarn", emoji: "🧶", color: "from-red-400 to-red-600" },
  { letter: "Z", sound: "zzz", word: "zebra", emoji: "🦓", color: "from-slate-400 to-slate-600" },
];

// CVC words for blending
const cvcWords = [
  { word: "cat", sounds: ["c", "a", "t"], image: "🐱", meaning: "A furry pet that meows" },
  { word: "mat", sounds: ["m", "a", "t"], image: "🧘", meaning: "Something to sit on" },
  { word: "sit", sounds: ["s", "i", "t"], image: "🪑", meaning: "Rest on a chair" },
  { word: "log", sounds: ["l", "o", "g"], image: "🪵", meaning: "A piece of wood" },
  { word: "sun", sounds: ["s", "u", "n"], image: "☀️", meaning: "Bright light in the sky" },
  { word: "cup", sounds: ["c", "u", "p"], image: "☕", meaning: "Drink from this" },
];

// Tiny stories for reading practice
const tinyStories = [
  {
    id: 1,
    sentence: "The cat is on the mat.",
    image: "🐱",
    question: "Where is the cat?",
    answer: "On the mat",
    words: ["The", "cat", "is", "on", "the", "mat"],
  },
  {
    id: 2,
    sentence: "The dog can run.",
    image: "🐕",
    question: "What can the dog do?",
    answer: "Run",
    words: ["The", "dog", "can", "run"],
  },
  {
    id: 3,
    sentence: "I see the big sun.",
    image: "☀️",
    question: "What is big?",
    answer: "The sun",
    words: ["I", "see", "the", "big", "sun"],
  },
];

type LetterSound = (typeof letterSounds)[number];

export function ReadingBasicsLesson({ onBack }: ReadingBasicsLessonProps) {
  const { lessonProgress, completeLesson, startLesson, saveAndExitLesson } =
    useApp();
  const [showCompletionDialog, setShowCompletionDialog] = useState(false);

  // Section 1: Letter-Sound Match
  const [selectedLetter, setSelectedLetter] =
    useState<LetterSound | null>(null);

  // Section 2: Blend Simple Words
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [blendingProgress, setBlendingProgress] = useState(0);
  const [showWordMeaning, setShowWordMeaning] = useState(false);

  // Section 3: Tiny Stories
  const [currentStoryId, setCurrentStoryId] = useState<number>(
    tinyStories[0].id
  );
  const [highlightedWord, setHighlightedWord] = useState<number | null>(null);
  const [answeredStories, setAnsweredStories] = useState<number[]>([]);

  const lessonId = 2; // Reading Basics lesson ID
  const lesson = lessonProgress[lessonId];
  const isLessonCompleted = lesson?.completed || false;

  // ---------- SPEECH FOR LETTERS ----------
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const speakLetter = (letter: LetterSound) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

    // stop any previous speech so it doesn't overlap
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(
      `${letter.letter}. ${letter.sound}. ${letter.word}.`
    );
    utterance.lang = "en-US";
    utterance.rate = 0.8; // slower = easier to follow
    utterance.pitch = 1;
    utterance.volume = 1;
    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // ---------- PROGRESS ----------
  const calculateProgress = () => {
    const letterDone = selectedLetter ? 1 : 0;
    const blendDone = blendingProgress === 3 ? 1 : 0; // fully blended word
    const storiesDone =
      answeredStories.length === tinyStories.length ? 1 : 0; // all stories

    const completedSections = letterDone + blendDone + storiesDone;
    return Math.round((completedSections / 3) * 100);
  };

  // Start lesson when component mounts if not started
  useEffect(() => {
    if (!lesson && !isLessonCompleted) {
      startLesson(lessonId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSaveAndExit = () => {
    const progress = calculateProgress();
    saveAndExitLesson(lessonId, progress);
    onBack();
  };

  const handleLetterClick = (letter: LetterSound) => {
    setSelectedLetter(letter);
    speakLetter(letter); // audio feedback on click
  };

  const handleNextWord = () => {
    setCurrentWordIndex((prev) => (prev + 1) % cvcWords.length);
    setBlendingProgress(0);
    setShowWordMeaning(false);
  };

  const handleBlendClick = () => {
    if (blendingProgress < 3) {
      setBlendingProgress((prev) => prev + 1);
    }
    if (blendingProgress === 2) {
      setShowWordMeaning(true);
    }
  };

  // click on a word inside a specific story card
  const handleWordClick = (storyId: number, wordIndex: number) => {
    setCurrentStoryId(storyId);
    setHighlightedWord(wordIndex);
    setTimeout(() => setHighlightedWord(null), 800);
  };

  // click "Show answer" for a specific story
  const handleStoryAnswered = (storyId: number) => {
    setCurrentStoryId(storyId);
    setAnsweredStories((prev) =>
      prev.includes(storyId) ? prev : [...prev, storyId]
    );
  };

  const currentWord = cvcWords[currentWordIndex];
  const currentStory =
    tinyStories.find((s) => s.id === currentStoryId) ?? tinyStories[0];

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
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

      {/* Lesson Title Card */}
      <div className="bg-gradient-to-br from-green-500 to-teal-400 rounded-3xl p-8 shadow-2xl">
        <div className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm text-white mb-4">
          🚀 Early Reader
        </div>

        <h1 className="text-white mb-4">Reading Basics</h1>

        <p className="text-white/90 mb-6 max-w-3xl">
          Practice letter sounds, blend them into simple words, and read short
          sentences with confidence.
        </p>

        <div className="grid grid-cols-2 gap-6 mb-2">
          <div>
            <div className="text-white/80 text-sm mb-1">Estimated time</div>
            <div className="text-white">25 minutes</div>
          </div>
          <div>
            <div className="text-white/80 text-sm mb-1">Skills</div>
            <div className="text-white">Phonics • Blending • Sight words</div>
          </div>
        </div>
      </div>

      {/* Your Progress Section */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
        <h3 className="text-slate-800 dark:text-slate-100 mb-4">Your progress</h3>

        <div className="flex items-center justify-between mb-2">
          <span className="text-slate-600 dark:text-slate-400 text-sm">
            Lesson completion
          </span>
          <span className="text-slate-800 dark:text-slate-100">
            {calculateProgress()}%
          </span>
        </div>

        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 mb-4">
          <div
            className="bg-gradient-to-r from-green-500 to-teal-400 h-2 rounded-full transition-all duration-500"
            style={{ width: `${calculateProgress()}%` }}
          />
        </div>

        <div className="flex items-start gap-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl p-4">
          <p className="text-slate-600 dark:text-slate-400 text-sm">
            Ask the learner to trace letters with their finger while saying the
            sound.
          </p>
        </div>
      </div>

      {/* Section 1: Letter-Sound Match */}
      <div>
        <div className="mb-6">
          <h2 className="text-slate-800 dark:text-slate-100 mb-2">
            1. Letter-Sound Match
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            Review consonants and short vowel sounds. Focus on 5–6 letters at a
            time.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-8">
          <div className="space-y-8">
            {/* How to Practice */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-pink-100 to-rose-100 dark:from-pink-900/20 dark:to-rose-900/20 rounded-xl p-6 border border-pink-200 dark:border-pink-800">
                <div className="text-4xl mb-3">👀</div>
                <h4 className="text-slate-800 dark:text-slate-100 mb-2">
                  Look
                </h4>
                <p className="text-slate-600 dark:text-slate-400">
                  Show the letter and say the sound. &quot;B says /b/&quot;
                </p>
              </div>

              <div className="bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
                <div className="text-4xl mb-3">🗣️</div>
                <h4 className="text-slate-800 dark:text-slate-100 mb-2">
                  Echo
                </h4>
                <p className="text-slate-600 dark:text-slate-400">
                  Have the learner echo the sound and think of a word.
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-100 to-violet-100 dark:from-purple-900/20 dark:to-violet-900/20 rounded-xl p-6 border border-purple-200 dark:border-purple-800">
                <div className="text-4xl mb-3">🎮</div>
                <h4 className="text-slate-800 dark:text-slate-100 mb-2">
                  Play
                </h4>
                <p className="text-slate-600 dark:text-slate-400">
                  Mix cards and play &quot;find the sound&quot; games.
                </p>
              </div>
            </div>

            {/* Interactive Letter Cards */}
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-8">
              <h3 className="text-white mb-6 flex items-center gap-2">
                <Hand className="w-6 h-6" />
                Click on Each Letter to Practice!
              </h3>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
                {letterSounds.map((item) => (
                  <button
                    key={item.letter}
                    onClick={() => handleLetterClick(item)}
                    className={`bg-white rounded-2xl p-6 transition-all transform hover:scale-105 ${
                      selectedLetter?.letter === item.letter
                        ? "ring-4 ring-yellow-400 shadow-2xl scale-105"
                        : "hover:shadow-xl"
                    }`}
                  >
                    <div
                      className={`text-6xl mb-3 transition-all ${
                        selectedLetter?.letter === item.letter
                          ? "animate-bounce"
                          : ""
                      }`}
                    >
                      {item.letter}
                    </div>
                    <div className="text-3xl mb-2">{item.emoji}</div>
                    <div className="text-slate-600 text-sm">{item.word}</div>
                  </button>
                ))}
              </div>

              {selectedLetter && (
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/30">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-4 mb-4">
                      <div className="text-8xl">{selectedLetter.letter}</div>
                      <div className="text-6xl">{selectedLetter.emoji}</div>
                    </div>
                    <div className="bg-white rounded-xl p-4 mb-4">
                      <div className="text-slate-600 text-sm mb-2">
                        Letter sound:
                      </div>
                      <div className="text-4xl text-indigo-600 mb-2">
                        {selectedLetter.sound}
                      </div>
                    </div>
                    <div className="bg-white rounded-xl p-4">
                      <div className="text-slate-600 text-sm mb-2">
                        Example word:
                      </div>
                      <div className="text-3xl text-slate-800">
                        {selectedLetter.word}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Tips */}
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-xl p-6 border border-yellow-200 dark:border-yellow-800">
              <h4 className="text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-yellow-600" />
                Pro Tips for Learning Letter Sounds
              </h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center text-white text-sm flex-shrink-0">
                    1
                  </div>
                  <span className="text-slate-700 dark:text-slate-300">
                    <strong>Trace with your finger:</strong> Ask the learner to
                    trace letters with their finger while saying the sound.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center text-white text-sm flex-shrink-0">
                    2
                  </div>
                  <span className="text-slate-700 dark:text-slate-300">
                    <strong>Find the match:</strong> Mix up the cards and ask
                    &quot;Can you find the letter that says /b/?&quot;
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center text-white text-sm flex-shrink-0">
                    3
                  </div>
                  <span className="text-slate-700 dark:text-slate-300">
                    <strong>Repeat:</strong> Practice the same 5–6 letters for
                    several days before adding new ones.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Section 2: Blend Simple Words */}
      <div>
        <div className="mb-6">
          <h2 className="text-slate-800 dark:text-slate-100 mb-2">
            2. Blend Simple Words
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            Put sounds together to read CVC words (consonant–vowel–consonant).
          </p>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-8">
          <div className="space-y-8">
            {/* Steps */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-6 border border-green-200 dark:border-green-800">
                <div className="text-4xl mb-3">👆</div>
                <h4 className="text-slate-800 dark:text-slate-100 mb-2">
                  Step 1
                </h4>
                <p className="text-slate-600 dark:text-slate-400">
                  Practice words like <strong>cat, mat, sit, log, sun</strong>.
                </p>
              </div>

              <div className="bg-gradient-to-br from-blue-100 to-sky-100 dark:from-blue-900/20 dark:to-sky-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
                <div className="text-4xl mb-3">➡️</div>
                <h4 className="text-slate-800 dark:text-slate-100 mb-2">
                  Step 2
                </h4>
                <p className="text-slate-600 dark:text-slate-400">
                  Slide your finger under the word as you blend slowly.
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-100 to-fuchsia-100 dark:from-purple-900/20 dark:to-fuchsia-900/20 rounded-xl p-6 border border-purple-200 dark:border-purple-800">
                <div className="text-4xl mb-3">⚡</div>
                <h4 className="text-slate-800 dark:text-slate-100 mb-2">
                  Step 3
                </h4>
                <p className="text-slate-600 dark:text-slate-400">
                  Speed up: &quot;/c/ /a/ /t/ ... cat!&quot;
                </p>
              </div>
            </div>

            {/* Interactive Blending */}
            <div className="bg-gradient-to-br from-rose-500 to-pink-600 rounded-2xl p-8">
              <h3 className="text-white mb-6 flex items-center gap-2">
                <Star className="w-6 h-6" />
                Let&apos;s Blend This Word!
              </h3>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/30">
                <div className="text-center mb-8">
                  <div className="text-7xl mb-6">{currentWord.image}</div>

                  <div className="flex justify-center gap-4 mb-8">
                    {currentWord.sounds.map((sound, index) => (
                      <div
                        key={index}
                        className={`w-24 h-24 bg-white rounded-2xl flex items-center justify-center text-4xl transition-all ${
                          blendingProgress > index
                            ? "ring-4 ring-yellow-400 scale-110 shadow-xl"
                            : "opacity-70"
                        }`}
                      >
                        {sound}
                      </div>
                    ))}
                  </div>

                  {blendingProgress < 3 && (
                    <button
                      onClick={handleBlendClick}
                      className="bg-yellow-400 hover:bg-yellow-500 text-slate-800 px-8 py-4 rounded-xl text-xl transition-all transform hover:scale-105 shadow-lg mb-4"
                    >
                      {blendingProgress === 0 && "Start Blending!"}
                      {blendingProgress === 1 && "Keep Going!"}
                      {blendingProgress === 2 && "Almost There!"}
                    </button>
                  )}

                  {blendingProgress === 3 && (
                    <div className="bg-white rounded-2xl p-8 mb-4">
                      <div className="text-slate-600 mb-2">You blended:</div>
                      <div className="text-6xl text-rose-600 mb-4">
                        {currentWord.word}
                      </div>
                      <div className="flex items-center justify-center gap-2 text-emerald-600">
                        <CheckCircle className="w-6 h-6" />
                        <span className="text-xl">Great job! 🎉</span>
                      </div>
                    </div>
                  )}

                  {showWordMeaning && (
                    <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 border border-white/30 mb-4">
                      <div className="text-white/80 text-sm mb-2">
                        What does it mean?
                      </div>
                      <div className="text-white text-lg">
                        {currentWord.meaning}
                      </div>
                    </div>
                  )}

                  {blendingProgress === 3 && (
                    <button
                      onClick={handleNextWord}
                      className="bg-white hover:bg-gray-100 text-rose-600 px-6 py-3 rounded-xl transition-all transform hover:scale-105"
                    >
                      Try Another Word →
                    </button>
                  )}
                </div>

                <div className="flex justify-center gap-2">
                  {cvcWords.map((_, index) => (
                    <div
                      key={index}
                      className={`h-2 rounded-full transition-all ${
                        index === currentWordIndex
                          ? "bg-yellow-400 w-6"
                          : "bg-white/30 w-2"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Blending Tips */}
            <div className="bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 rounded-xl p-6 border border-cyan-200 dark:border-cyan-800">
              <h4 className="text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-cyan-600" />
                Blending Tips for Success
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-cyan-400 rounded-lg flex items-center justify-center text-white flex-shrink-0">
                    👆
                  </div>
                  <div className="text-slate-700 dark:text-slate-300">
                    <strong>Point and slide:</strong> Use your finger to slide
                    under each letter as you say its sound.
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-cyan-400 rounded-lg flex items-center justify-center text-white flex-shrink-0">
                    🐌
                  </div>
                  <div className="text-slate-700 dark:text-slate-300">
                    <strong>Start slow:</strong> Say each sound separately
                    first: &quot;/c/ /a/ /t/&quot;.
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-cyan-400 rounded-lg flex items-center justify-center text-white flex-shrink-0">
                    🚀
                  </div>
                  <div className="text-slate-700 dark:text-slate-300">
                    <strong>Speed up:</strong> Then say them faster and faster
                    until they blend together.
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-cyan-400 rounded-lg flex items-center justify-center text-white flex-shrink-0">
                    🎉
                  </div>
                  <div className="text-slate-700 dark:text-slate-300">
                    <strong>Celebrate:</strong> Give lots of praise for each
                    successful blend!
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section 3: Read Tiny Stories */}
      <div>
        <div className="mb-6">
          <h2 className="text-slate-800 dark:text-slate-100 mb-2">
            3. Read Tiny Stories
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            Use one-sentence stories with pictures to build confidence.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-8">
          <div className="space-y-8">
            {/* Instructions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-violet-100 to-purple-100 dark:from-violet-900/20 dark:to-purple-900/20 rounded-xl p-6 border border-violet-200 dark:border-violet-800">
                <div className="text-4xl mb-3">📖</div>
                <h4 className="text-slate-800 dark:text-slate-100 mb-2">
                  Read
                </h4>
                <p className="text-slate-600 dark:text-slate-400">
                  Read the sentence together. Point to each word as you go.
                </p>
              </div>

              <div className="bg-gradient-to-br from-amber-100 to-yellow-100 dark:from-amber-900/20 dark:to-yellow-900/20 rounded-xl p-6 border border-amber-200 dark:border-amber-800">
                <div className="text-4xl mb-3">❓</div>
                <h4 className="text-slate-800 dark:text-slate-100 mb-2">
                  Question
                </h4>
                <p className="text-slate-600 dark:text-slate-400">
                  Ask one quick question about what you just read.
                </p>
              </div>

              <div className="bg-gradient-to-br from-emerald-100 to-green-100 dark:from-emerald-900/20 dark:to-green-900/20 rounded-xl p-6 border border-emerald-200 dark:border-emerald-800">
                <div className="text-4xl mb-3">🎉</div>
                <h4 className="text-slate-800 dark:text-slate-100 mb-2">
                  Celebrate
                </h4>
                <p className="text-slate-600 dark:text-slate-400">
                  Give verbal praise or a sticker for each successful read!
                </p>
              </div>
            </div>

            {/* Story Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {tinyStories.map((story) => {
                const isAnswered = answeredStories.includes(story.id);
                const isCurrent = currentStory.id === story.id;

                return (
                  <div
                    key={story.id}
                    className={`bg-gradient-to-br from-indigo-100 to-blue-100 dark:from-indigo-900/20 dark:to-blue-900/20 rounded-2xl p-6 border-2 transition-all ${
                      isAnswered
                        ? "border-emerald-400 dark:border-emerald-600"
                        : "border-indigo-200 dark:border-indigo-800"
                    }`}
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="px-3 py-1 bg-indigo-500 text-white rounded-full text-sm">
                        Story {story.id}
                      </div>
                      {isAnswered && (
                        <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                          <CheckCircle className="w-5 h-5" />
                          <span className="text-sm">Done!</span>
                        </div>
                      )}
                    </div>

                    {/* Image */}
                    <div className="text-7xl text-center mb-4">
                      {story.image}
                    </div>

                    {/* Sentence */}
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-4 mb-4">
                      <div className="flex flex-wrap gap-2 justify-center">
                        {story.words.map((word, index) => (
                          <button
                            key={index}
                            onClick={() =>
                              handleWordClick(story.id, index)
                            }
                            className={`px-3 py-2 rounded-lg text-lg transition-all ${
                              highlightedWord === index && isCurrent
                                ? "bg-yellow-400 text-slate-800 scale-110 shadow-lg"
                                : "bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-600"
                            }`}
                          >
                            {word}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Question + Answer button */}
                    <div className="bg-white/50 dark:bg-slate-700/50 rounded-xl p-4 mb-3">
                      <div className="text-slate-600 dark:text-slate-400 text-sm mb-2">
                        Question:
                      </div>
                      <div className="text-slate-800 dark:text-slate-100 mb-3">
                        {story.question}
                      </div>
                      <button
                        onClick={() => handleStoryAnswered(story.id)}
                        className={`w-full py-2 rounded-lg text-sm transition-all ${
                          isAnswered
                            ? "bg-emerald-500 text-white"
                            : "bg-indigo-500 hover:bg-indigo-600 text-white"
                        }`}
                      >
                        {isAnswered ? (
                          <span className="flex items-center justify-center gap-2">
                            <CheckCircle className="w-4 h-4" />
                            {story.answer}
                          </span>
                        ) : (
                          "Show Answer"
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Reading Tips */}
            <div className="bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20 rounded-xl p-6 border border-pink-200 dark:border-pink-800">
              <h4 className="text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-pink-600" />
                Reading Success Strategies
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <div className="text-2xl">👉</div>
                  <div className="text-slate-700 dark:text-slate-300">
                    <strong>Point as you read:</strong> Touch each word with
                    your finger to help track the text.
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="text-2xl">🔁</div>
                  <div className="text-slate-700 dark:text-slate-300">
                    <strong>Read it twice:</strong> First time together, second
                    time let them try alone.
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="text-2xl">💭</div>
                  <div className="text-slate-700 dark:text-slate-300">
                    <strong>Ask simple questions:</strong> Keep comprehension
                    questions short and clear.
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="text-2xl">⭐</div>
                  <div className="text-slate-700 dark:text-slate-300">
                    <strong>Use rewards:</strong> Stickers, stamps, or
                    high-fives make reading fun!
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Completion Section */}
      <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl p-8 shadow-lg">
        <div className="flex items-center gap-4 mb-4">
          <CheckCircle className="w-12 h-12 text-white" />
          <div className="text-white">
            <h3 className="text-white mb-1">
              Ready to Complete This Lesson?
            </h3>
            <p className="text-white/90">
              You&apos;ve practiced letter sounds, blended words, and read tiny
              stories!
            </p>
          </div>
        </div>
        <div className="flex gap-3 flex-wrap">
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
                Save &amp; Exit
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
              Congratulations! You&apos;ve successfully completed the Reading
              Basics lesson.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 border border-emerald-200 dark:border-emerald-800/30 rounded-xl p-4">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Award className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                <span className="text-emerald-700 dark:text-emerald-300">
                  +100 Points Earned
                </span>
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400 text-center">
                Amazing work! You can now recognize letter sounds, blend simple
                words, and read short sentences!
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
