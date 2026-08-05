"use client";

import { useEffect, useState } from "react";

export function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const pointerFine = window.matchMedia("(pointer: fine)").matches;
    setEnabled(pointerFine);
    if (!pointerFine) return;

    const move = (event: PointerEvent) => {
      const x = event.clientX;
      const y = event.clientY;
      setPos({ x, y });
      document.documentElement.style.setProperty("--cursor-x", `${x}px`);
      document.documentElement.style.setProperty("--cursor-y", `${y}px`);
    };

    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none fixed z-[70] h-4 w-4 rounded-full border border-cyan/70 bg-cyan/20 shadow-glow"
        style={{
          transform: `translate3d(${pos.x - 8}px, ${pos.y - 8}px, 0)`,
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed z-[69] h-28 w-28 rounded-full bg-cyan/10 blur-3xl"
        style={{
          transform: `translate3d(${pos.x - 56}px, ${pos.y - 56}px, 0)`,
        }}
      />
    </>
  );
}
