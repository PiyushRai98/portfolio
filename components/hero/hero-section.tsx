"use client";

import dynamic from "next/dynamic";
import HeroText from "./hero-text";

const HeroCanvas = dynamic(() => import("./hero-canvas"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 bg-void" />
  ),
});

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative w-full h-screen overflow-hidden bg-void"
    >
      {/* Radial gradient overlay */}
      <div className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 50% 50%, rgba(124,58,237,0.08) 0%, transparent 60%)",
        }}
      />

      {/* 3D Canvas */}
      <HeroCanvas />

      {/* Text Content */}
      <HeroText />

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-void to-transparent z-20 pointer-events-none" />
    </section>
  );
}
