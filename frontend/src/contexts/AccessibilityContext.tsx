// frontend/src/contexts/AccessibilityContext.tsx
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

type FontStyle = "default" | "dyslexic" | "sans" | "mono";
type ColorBlindMode = "none" | "protanopia" | "deuteranopia" | "tritanopia";

interface AccessibilitySettings {
  darkMode: boolean;
  textSize: number; // 0–100 slider, mapped to ~85–150%
  fontStyle: FontStyle;
  highContrast: boolean;
  reduceAnimations: boolean;
  readingRuler: boolean;
  colorBlindMode: ColorBlindMode;
  textToSpeech: boolean;
  screenReaderHints: boolean;
  keyboardNavigation: boolean;
  focusOutline: boolean;
  voiceSpeed: number; // 0–100
}

interface AccessibilityContextType {
  settings: AccessibilitySettings;
  updateSettings: (updates: Partial<AccessibilitySettings>) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const AccessibilityContext = createContext<
  AccessibilityContextType | undefined
>(undefined);

const DEFAULT_SETTINGS: AccessibilitySettings = {
  darkMode: false,
  textSize: 50,
  fontStyle: "default",
  highContrast: false,
  reduceAnimations: false,
  readingRuler: false,
  colorBlindMode: "none",
  textToSpeech: false,
  screenReaderHints: false,
  keyboardNavigation: true,
  focusOutline: false,
  voiceSpeed: 50,
};

export function AccessibilityProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<AccessibilitySettings>(() => {
    if (typeof window === "undefined") return DEFAULT_SETTINGS;
    try {
      const raw = localStorage.getItem("accessibility-settings");
      if (!raw) return DEFAULT_SETTINGS;
      const parsed = JSON.parse(raw);
      // merge so new fields get defaults
      return { ...DEFAULT_SETTINGS, ...parsed };
    } catch {
      return DEFAULT_SETTINGS;
    }
  });

  useEffect(() => {
    // Persist to localStorage
    try {
      localStorage.setItem("accessibility-settings", JSON.stringify(settings));
    } catch {
      // ignore
    }

    const root = document.documentElement;

    // Dark mode
    if (settings.darkMode) root.classList.add("dark");
    else root.classList.remove("dark");

    // Text size scale: 0–100 → 0.85–1.5
    const scale = 0.85 + (settings.textSize / 100) * 0.65;
    root.style.setProperty("--text-scale", scale.toString());
    root.style.setProperty("--text-xs", `${0.75 * scale}rem`);
    root.style.setProperty("--text-sm", `${0.875 * scale}rem`);
    root.style.setProperty("--text-base", `${1 * scale}rem`);
    root.style.setProperty("--text-lg", `${1.125 * scale}rem`);
    root.style.setProperty("--text-xl", `${1.25 * scale}rem`);
    root.style.setProperty("--text-2xl", `${1.5 * scale}rem`);

    // Font family
    const fontMap: Record<FontStyle, string> = {
      default: "system-ui, -apple-system, sans-serif",
      dyslexic: 'OpenDyslexic, "Comic Sans MS", sans-serif',
      sans: '"Inter", "Helvetica Neue", sans-serif',
      mono: '"JetBrains Mono", "Courier New", monospace',
    };
    root.style.setProperty("--font-family", fontMap[settings.fontStyle]);

    // High contrast
    if (settings.highContrast) root.classList.add("high-contrast");
    else root.classList.remove("high-contrast");

    // Reduce animations
    if (settings.reduceAnimations) root.classList.add("reduce-animations");
    else root.classList.remove("reduce-animations");

    // Reading ruler hook (if you have CSS for it)
    if (settings.readingRuler) root.classList.add("reading-ruler-enabled");
    else root.classList.remove("reading-ruler-enabled");

    // ✅ Color blindness mode (matches your CSS: [data-colorblind="..."])
    if (settings.colorBlindMode === "none") {
      root.removeAttribute("data-colorblind");
    } else {
      root.setAttribute("data-colorblind", settings.colorBlindMode);
    }

    // Keyboard navigation & focus outline hooks
    if (settings.keyboardNavigation) root.classList.add("keyboard-nav");
    else root.classList.remove("keyboard-nav");

    if (settings.focusOutline) root.classList.add("focus-outline-strong");
    else root.classList.remove("focus-outline-strong");
  }, [settings]);

  const updateSettings = (updates: Partial<AccessibilitySettings>) => {
    setSettings((prev) => ({ ...prev, ...updates }));
  };

  const toggleDarkMode = () => {
    setSettings((prev) => ({ ...prev, darkMode: !prev.darkMode }));
  };

  return (
    <AccessibilityContext.Provider
      value={{
        settings,
        updateSettings,
        isDarkMode: settings.darkMode,
        toggleDarkMode,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error(
      "useAccessibility must be used within AccessibilityProvider"
    );
  }
  return context;
}
