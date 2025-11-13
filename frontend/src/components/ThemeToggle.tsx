import { Moon, Sun } from 'lucide-react';
import { useAccessibility } from '../contexts/AccessibilityContext';

export function ThemeToggle() {
  const { isDarkMode, toggleDarkMode } = useAccessibility();

  return (
    <button
      onClick={toggleDarkMode}
      className="w-10 h-10 rounded-lg flex items-center justify-center bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all"
      aria-label="Toggle theme"
    >
      {isDarkMode ? (
        <Sun className="w-5 h-5 text-slate-600 dark:text-slate-400" />
      ) : (
        <Moon className="w-5 h-5 text-slate-600" />
      )}
    </button>
  );
}
