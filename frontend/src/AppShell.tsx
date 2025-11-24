// frontend/src/AppShell.tsx
import React from "react";
import { useAuth } from "./contexts/AuthContext";
import { ReadingRuler } from "./components/accessibility/ReadingRuler";

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const { user } = useAuth() as any;

  const accessibility = user?.accessibilitySettings || {
    textSize: "medium",
    dyslexiaFriendlyFont: false,
    highContrast: false,
    reduceMotion: false,
    showReadingRuler: false,
    audioInstructions: true,
    focusMode: false,
  };

  const textSizeClass =
    accessibility.textSize === "small"
      ? "accessibility-text-sm"
      : accessibility.textSize === "large"
      ? "accessibility-text-lg"
      : accessibility.textSize === "xl"
      ? "accessibility-text-xl"
      : "accessibility-text-md";

  const extraClasses = [
    textSizeClass,
    accessibility.dyslexiaFriendlyFont ? "accessibility-dyslexia-font" : "",
    accessibility.highContrast ? "accessibility-high-contrast" : "",
    accessibility.reduceMotion ? "accessibility-reduce-motion" : "",
    accessibility.focusMode ? "accessibility-focus-mode" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={extraClasses}>
      {children}
      {accessibility.showReadingRuler && <ReadingRuler />}
    </div>
  );
}
