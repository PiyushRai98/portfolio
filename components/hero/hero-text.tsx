"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

const scrambleChars = "!<>-_\\/[]{}—=+*^?#_ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function useTextScramble(text: string, delay: number = 0) {
  const [display, setDisplay] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (!started) return;

    let frame = 0;
    const totalFrames = text.length * 3;

    const interval = setInterval(() => {
      const progress = frame / totalFrames;
      const revealedLength = Math.floor(progress * text.length);

      let result = "";
      for (let i = 0; i < text.length; i++) {
        if (i < revealedLength) {
          result += text[i];
        } else if (i < revealedLength + 3) {
          result += scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
        } else {
          result += " ";
        }
      }
      setDisplay(result);

      frame++;
      if (frame > totalFrames) {
        setDisplay(text);
        clearInterval(interval);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [text, started]);

  return display;
}

function TypewriterText({ text, delay = 0 }: { text: string; delay?: number }) {
  const [display, setDisplay] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    let i = 0;
    const interval = setInterval(() => {
      setDisplay(text.slice(0, i + 1));
      i++;
      if (i >= text.length) clearInterval(interval);
    }, 40);
    return () => clearInterval(interval);
  }, [text, started]);

  return (
    <span>
      {display}
      <span className="animate-[typewriter-blink_1s_infinite]">|</span>
    </span>
  );
}

export default function HeroText() {
  const name = useTextScramble("PIYUSH KUMAR RAI", 500);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center">
      {/* System status */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="mb-8"
      >
        <span className="font-mono text-xs tracking-[0.3em] text-violet-light/60 uppercase">
          ◆ Neural Interface Active ◆
        </span>
      </motion.div>

      {/* Main Name */}
      <motion.h1
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="text-hero font-display text-white glow-text-violet mb-6 select-none"
      >
        {name}
      </motion.h1>

      {/* Subtitle */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.8 }}
        className="flex flex-wrap items-center justify-center gap-3 mb-6"
      >
        {["AI/ML Engineer", "Generative AI Developer", "Full-Stack Engineer"].map(
          (role, i) => (
            <span key={role} className="flex items-center gap-3">
              <span className="font-mono text-sm md:text-base tracking-wider text-silver-light/80">
                {role}
              </span>
              {i < 2 && (
                <span className="w-1 h-1 rounded-full bg-violet" />
              )}
            </span>
          )
        )}
      </motion.div>

      {/* Tagline */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2.2 }}
        className="font-mono text-xs md:text-sm text-silver/70 max-w-xl mb-12 leading-relaxed"
      >
        <TypewriterText
          text="Building intelligent systems, autonomous agents, and immersive digital experiences."
          delay={2200}
        />
      </motion.p>

      {/* CTA Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 3 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <a
          href="#projects"
          data-cursor="pointer"
          className="group relative px-8 py-3 rounded-full overflow-hidden"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-violet to-blue-deep rounded-full" />
          <span className="absolute inset-0 bg-gradient-to-r from-violet to-cyan opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full" />
          <span className="relative font-mono text-sm uppercase tracking-wider text-white font-medium">
            Explore Projects
          </span>
        </a>

        <a
          href="#about"
          data-cursor="pointer"
          className="group relative px-8 py-3 rounded-full glass glow-violet hover:bg-violet/10 transition-all duration-500"
        >
          <span className="font-mono text-sm uppercase tracking-wider text-violet-light group-hover:text-white transition-colors duration-300">
            Enter AI Workspace
          </span>
        </a>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 4 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-mono text-[10px] tracking-[0.3em] text-silver/40 uppercase">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 h-8 rounded-full border border-silver/20 flex items-start justify-center p-1.5"
        >
          <div className="w-1 h-2 rounded-full bg-violet" />
        </motion.div>
      </motion.div>
    </div>
  );
}
