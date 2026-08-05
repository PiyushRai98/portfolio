"use client";

import { useEffect, useState } from "react";

type ScrambleTextProps = {
  text: string;
  className?: string;
};

const glyphs = "AI01/>{}[]$#@*+=_";

export function ScrambleText({ text, className }: ScrambleTextProps) {
  const [output, setOutput] = useState(text);

  useEffect(() => {
    let frame = 0;
    let raf = 0;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setOutput(text);
      return;
    }

    const tick = () => {
      frame += 1;
      const revealed = Math.floor(frame / 2);
      setOutput(
        text
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < revealed) return char;
            return glyphs[(index + frame) % glyphs.length];
          })
          .join(""),
      );

      if (revealed < text.length) raf = requestAnimationFrame(tick);
      else setOutput(text);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [text]);

  return <span className={className}>{output}</span>;
}
