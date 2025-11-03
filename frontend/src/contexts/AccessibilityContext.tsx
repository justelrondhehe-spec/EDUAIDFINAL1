import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AccessibilitySettings {
  darkMode: boolean;
  textSize: number;
  fontStyle: 'default' | 'dyslexic' | 'sans' | 'mono';
  highContrast: boolean;
  reduceAnimations: boolean;
}

interface AccessibilityContextType {
  settings: AccessibilitySettings;
  updateSettings: (updates: Partial<AccessibilitySettings>) => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export function AccessibilityProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<AccessibilitySettings>(() => {
    // Load from localStorage if available
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('accessibility-settings');
      if (saved) {
        return JSON.parse(saved);
      }
    }
    return {
      darkMode: false,
      textSize: 50,
      fontStyle: 'default' as const,
      highContrast: false,
      reduceAnimations: false,
    };
  });

  useEffect(() => {
    // Save to localStorage
    localStorage.setItem('accessibility-settings', JSON.stringify(settings));

    // Apply dark mode
    if (settings.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Apply text size (scale from 0-100 to 0.85-1.5)
    // This only scales text, not the whole page
    const scale = 0.85 + (settings.textSize / 100) * 0.65;
    document.documentElement.style.setProperty('--text-scale', scale.toString());
    
    // Also set individual text sizes
    document.documentElement.style.setProperty('--text-xs', `${0.75 * scale}rem`);
    document.documentElement.style.setProperty('--text-sm', `${0.875 * scale}rem`);
    document.documentElement.style.setProperty('--text-base', `${1 * scale}rem`);
    document.documentElement.style.setProperty('--text-lg', `${1.125 * scale}rem`);
    document.documentElement.style.setProperty('--text-xl', `${1.25 * scale}rem`);
    document.documentElement.style.setProperty('--text-2xl', `${1.5 * scale}rem`);

    // Apply font style
    const fontMap = {
      default: 'system-ui, -apple-system, sans-serif',
      dyslexic: 'OpenDyslexic, "Comic Sans MS", sans-serif',
      sans: '"Inter", "Helvetica Neue", sans-serif',
      mono: '"JetBrains Mono", "Courier New", monospace',
    };
    document.documentElement.style.setProperty('--font-family', fontMap[settings.fontStyle]);

    // Apply high contrast
    if (settings.highContrast) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }

    // Apply reduce animations
    if (settings.reduceAnimations) {
      document.documentElement.classList.add('reduce-animations');
    } else {
      document.documentElement.classList.remove('reduce-animations');
    }
  }, [settings]);

  const updateSettings = (updates: Partial<AccessibilitySettings>) => {
    setSettings(prev => ({ ...prev, ...updates }));
  };

  return (
    <AccessibilityContext.Provider value={{ settings, updateSettings }}>
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within AccessibilityProvider');
  }
  return context;
}
