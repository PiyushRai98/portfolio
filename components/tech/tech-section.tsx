"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const techStack = [
  // AI/ML
  { name: "Python", category: "ai", ring: 1, angle: 0 },
  { name: "TensorFlow", category: "ai", ring: 1, angle: 60 },
  { name: "PyTorch", category: "ai", ring: 1, angle: 120 },
  { name: "LangChain", category: "ai", ring: 1, angle: 180 },
  { name: "OpenAI", category: "ai", ring: 1, angle: 240 },
  { name: "VectorDB", category: "ai", ring: 1, angle: 300 },
  // Frontend
  { name: "React", category: "frontend", ring: 2, angle: 30 },
  { name: "Next.js", category: "frontend", ring: 2, angle: 120 },
  { name: "TypeScript", category: "frontend", ring: 2, angle: 210 },
  { name: "Tailwind", category: "frontend", ring: 2, angle: 300 },
  // Backend
  { name: "Node.js", category: "backend", ring: 3, angle: 0 },
  { name: "MongoDB", category: "backend", ring: 3, angle: 90 },
  { name: "Docker", category: "backend", ring: 3, angle: 180 },
  { name: "Kubernetes", category: "backend", ring: 3, angle: 270 },
];

const categoryColors: Record<string, string> = {
  ai: "#7c3aed",
  frontend: "#06b6d4",
  backend: "#3b82f6",
};

const categoryLabels: Record<string, string> = {
  ai: "AI / ML",
  frontend: "Frontend",
  backend: "Backend / DevOps",
};

export default function TechSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, margin: "-100px" });
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  const ringRadii = [140, 220, 300];

  return (
    <section id="tech" className="relative py-32 px-6 overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-20 pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%)",
        }}
      />

      <div ref={containerRef} className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-4"
        >
          <span className="section-label">// AI Command Center</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="section-heading text-section mb-8"
        >
          Tech Ecosystem
        </motion.h2>

        {/* Category Legend */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap gap-6 mb-12 justify-center lg:justify-start"
        >
          {Object.entries(categoryLabels).map(([key, label]) => (
            <button
              key={key}
              onMouseEnter={() => setHoveredCategory(key)}
              onMouseLeave={() => setHoveredCategory(null)}
              data-cursor="pointer"
              className={`flex items-center gap-2 font-mono text-xs tracking-wider transition-opacity duration-300 ${
                hoveredCategory && hoveredCategory !== key ? "opacity-30" : "opacity-100"
              }`}
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: categoryColors[key] }}
              />
              {label}
            </button>
          ))}
        </motion.div>

        {/* Orbit Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, delay: 0.4 }}
          className="relative mx-auto hidden lg:flex items-center justify-center"
          style={{ width: 650, height: 650, maxWidth: "90vw", maxHeight: "90vw" }}
        >
          {/* Orbit rings */}
          {ringRadii.map((radius, i) => (
            <div
              key={i}
              className="absolute rounded-full border border-white/[0.04]"
              style={{
                width: radius * 2,
                height: radius * 2,
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            />
          ))}

          {/* Center node */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-violet to-cyan flex items-center justify-center glow-violet">
              <span className="font-display text-sm font-bold text-white">PKR</span>
            </div>
          </div>

          {/* Tech nodes */}
          {techStack.map((tech, i) => {
            const radius = ringRadii[tech.ring - 1];
            const animDelay = tech.ring * 0.8;
            const angleRad = (tech.angle * Math.PI) / 180;
            const x = Math.cos(angleRad) * radius;
            const y = Math.sin(angleRad) * radius;

            const isHighlighted =
              !hoveredCategory || hoveredCategory === tech.category;
            const isHovered = hoveredTech === tech.name;

            return (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{
                  duration: 0.6,
                  delay: 0.5 + i * 0.08,
                  type: "spring",
                  stiffness: 200,
                }}
                className="absolute z-10"
                style={{
                  left: `calc(50% + ${x}px)`,
                  top: `calc(50% + ${y}px)`,
                }}
                onMouseEnter={() => setHoveredTech(tech.name)}
                onMouseLeave={() => setHoveredTech(null)}
                data-cursor="pointer"
              >
                <div
                  style={{
                    transform: "translate(-50%, -50%)",
                    animation: inView
                      ? `float-slow ${6 + animDelay}s ease-in-out infinite ${i * 0.3}s`
                      : undefined,
                  }}
                >
                  <div
                    className={`px-3 py-2 rounded-lg font-mono text-xs transition-all duration-400 ${
                      isHighlighted ? "opacity-100" : "opacity-20"
                    } ${
                      isHovered
                        ? "scale-125 bg-white/10 shadow-lg"
                        : "glass-light"
                    }`}
                    style={{
                      borderColor: isHovered
                        ? categoryColors[tech.category]
                        : "transparent",
                      borderWidth: 1,
                      boxShadow: isHovered
                        ? `0 0 20px ${categoryColors[tech.category]}40`
                        : undefined,
                    }}
                  >
                    <span
                      className="font-semibold"
                      style={{ color: isHovered ? categoryColors[tech.category] : "#cbd5e1" }}
                    >
                      {tech.name}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}

          {/* Connection lines (SVG) */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ overflow: "visible" }}
          >
            {techStack.map((tech) => {
              const radius = ringRadii[tech.ring - 1];
              const angleRad = (tech.angle * Math.PI) / 180;
              const x = Math.cos(angleRad) * radius;
              const y = Math.sin(angleRad) * radius;
              const centerX = 325;
              const centerY = 325;

              return (
                <motion.line
                  key={`line-${tech.name}`}
                  x1={centerX}
                  y1={centerY}
                  x2={centerX + x}
                  y2={centerY + y}
                  stroke={categoryColors[tech.category]}
                  strokeWidth={0.5}
                  strokeOpacity={hoveredTech === tech.name ? 0.4 : 0.06}
                  initial={{ pathLength: 0 }}
                  animate={inView ? { pathLength: 1 } : {}}
                  transition={{ duration: 1.5, delay: 0.5 }}
                />
              );
            })}
          </svg>
        </motion.div>

        {/* Mobile fallback — grid layout */}
        <div className="lg:hidden mt-12">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {techStack.map((tech, i) => (
              <motion.div
                key={`mobile-${tech.name}`}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="glass rounded-lg p-3 text-center holo-card"
              >
                <span
                  className="font-mono text-xs font-semibold"
                  style={{ color: categoryColors[tech.category] }}
                >
                  {tech.name}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
