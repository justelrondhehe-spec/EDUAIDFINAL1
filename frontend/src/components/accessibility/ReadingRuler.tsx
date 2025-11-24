// frontend/src/components/accessibility/ReadingRuler.tsx
import React, { useEffect, useState } from "react";

export function ReadingRuler() {
  const [y, setY] = useState(window.innerHeight / 2);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setY(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const height = 80; // thickness of the ruler window in px

  return (
    <div
      aria-hidden="true"
      className="fixed left-0 right-0 pointer-events-none z-[9999]"
      style={{
        top: y - height / 2,
        height,
        background:
          "linear-gradient(to bottom, transparent 0, rgba(15,23,42,0.08) 20%, rgba(15,23,42,0.08) 80%, transparent 100%)",
      }}
    />
  );
}
