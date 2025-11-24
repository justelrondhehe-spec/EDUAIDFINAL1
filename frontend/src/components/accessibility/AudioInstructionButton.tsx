// frontend/src/components/accessibility/AudioInstructionButton.tsx
import { Volume2 } from "lucide-react";
import { Button } from "../ui/button";
import { useAuth } from "../../contexts/AuthContext";

interface AudioInstructionButtonProps {
  text: string;
}

export function AudioInstructionButton({ text }: AudioInstructionButtonProps) {
  const { user } = useAuth() as any;
  const enableAudio = user?.accessibilitySettings?.audioInstructions ?? true;

  const handleClick = () => {
    if (!enableAudio) return;
    if (!("speechSynthesis" in window)) {
      alert("Audio instructions are not supported in this browser.");
      return;
    }
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95; // a bit slower for clarity
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

  if (!enableAudio) return null;

  return (
    <Button
      type="button"
      variant="outline"
      onClick={handleClick}
      className="inline-flex items-center gap-2"
    >
      <Volume2 className="w-4 h-4" />
      Listen to instructions
    </Button>
  );
}
