import { Volume2, Pause, Square } from "lucide-react";
import { Button } from "./ui/button";
import { useSpeech } from "../hooks/useSpeech";

interface ReadAloudButtonProps {
  text: string;
  label?: string;
  small?: boolean;
}

export function ReadAloudButton({ text, label, small }: ReadAloudButtonProps) {
  const { isSupported, isSpeaking, isPaused, speak, stop, pause, resume } =
    useSpeech();

  if (!isSupported) return null;

  const handleClick = () => {
    if (!isSpeaking) {
      speak(text);
    } else if (isPaused) {
      resume();
    } else {
      pause();
    }
  };

  const sizeClasses = small
    ? "text-xs px-4 py-1.5"
    : "text-sm px-5 py-2.5";

  return (
    <div className="flex items-center gap-2">
      {/* CANDY MAIN BUTTON */}
      <Button
        type="button"
        variant="ghost"
        onClick={handleClick}
        // inline styles so nothing can override the candy look
        style={{
          backgroundImage:
            "linear-gradient(135deg, #fb7185, #f97316)", // pink → orange
          color: "#ffffff",
          borderRadius: small ? 999 : 999, // pill
          boxShadow:
            "0 4px 0 rgba(180, 64, 48, 0.5), 0 8px 16px rgba(248, 113, 113, 0.4)",
          border: "2px solid rgba(255,255,255,0.8)",
        }}
        className={`flex items-center gap-2 font-semibold leading-none ${sizeClasses}`}
      >
        <Volume2 className={small ? "w-4 h-4" : "w-5 h-5"} />
        <span>
          {!isSpeaking ? "Read Aloud" : isPaused ? "Resume" : "Pause"}
        </span>
      </Button>

      {/* STOP BUTTON – clear, high-contrast "jelly" style */}
      {isSpeaking && (
        <Button
          type="button"
          variant="ghost"
          onClick={stop}
          style={{
            backgroundColor: "#ffffff",
            color: "#ef4444",
            borderRadius: small ? 999 : 999,
            border: "2px solid #fecaca",
            boxShadow: "0 3px 0 rgba(220,38,38,0.35)",
          }}
          className={small ? "h-8 px-3 text-xs" : "h-9 px-3 text-xs"}
        >
          <Square className={small ? "w-3 h-3" : "w-4 h-4"} />
          <span className="ml-1 font-semibold">Stop</span>
        </Button>
      )}

      {label && !small && (
        <span className="text-xs text-slate-500 dark:text-slate-400">
          {label}
        </span>
      )}
    </div>
  );
}
