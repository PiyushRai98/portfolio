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
    };

    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, []);

  if (!enabled) return null;

  return (
    <>
      {/* Copper ring — subtle, instrument-style */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed z-[70] h-4 w-4"
        style={{
          border: "1px solid rgb(var(--copper-rgb) / 0.6)",
          borderRadius: "1px",
          transform: `translate3d(${pos.x - 8}px, ${pos.y - 8}px, 0)`,
        }}
      />
    </>
  );
}
