"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const experiences = [
  {
    period: "2024 — Present",
    role: "AI/ML Engineer & Developer",
    org: "Independent / Open Source",
    description:
      "Building production-grade AI applications, multi-agent systems, and LLM-powered platforms. Contributing to open source AI projects and developing autonomous agent frameworks.",
    highlights: ["Multi-Agent AI Systems", "LLM Application Development", "RAG Pipeline Architecture"],
    color: "#7c3aed",
  },
  {
    period: "2024",
    role: "Open Source Contributor",
    org: "GirlScript Summer of Code (GSSoC)",
    description:
      "Contributed to multiple open source projects focused on AI/ML and web development. Collaborated with global teams using agile methodologies and modern development practices.",
    highlights: ["Community Projects", "Agile Development", "Cross-Team Collaboration"],
    color: "#06b6d4",
  },
  {
    period: "2023 — 2024",
    role: "Full-Stack Developer",
    org: "Personal & Academic Projects",
    description:
      "Designed and developed full-stack applications using MERN stack, implemented real-time features with WebSocket, and deployed containerized applications with Docker and Kubernetes.",
    highlights: ["MERN Stack", "Real-Time Systems", "Cloud Deployment"],
    color: "#3b82f6",
  },
  {
    period: "2022 — Present",
    role: "ECE Student & Researcher",
    org: "Electronics & Communication Engineering",
    description:
      "Pursuing core engineering studies while specializing in AI/ML, deep learning, and computer vision. Completed multiple certifications in machine learning, NLP, and generative AI.",
    highlights: ["Deep Learning Research", "Computer Vision", "Academic Excellence"],
    color: "#8b5cf6",
  },
];

export default function ExperienceSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="relative py-32 px-6 overflow-hidden">
      <div ref={containerRef} className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-4"
        >
          <span className="section-label">// Journey</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="section-heading text-section mb-16"
        >
          Experience.timeline()
        </motion.h2>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <motion.div
            initial={{ height: 0 }}
            animate={inView ? { height: "100%" } : {}}
            transition={{ duration: 2, delay: 0.3, ease: "easeOut" }}
            className="absolute left-6 md:left-1/2 top-0 w-px"
            style={{
              background: "linear-gradient(180deg, #7c3aed, #06b6d4, transparent)",
            }}
          />

          {experiences.map((exp, i) => {
            const isLeft = i % 2 === 0;

            return (
              <TimelineItem key={i} exp={exp} index={i} isLeft={isLeft} />
            );
          })}
        </div>
      </div>
    </section>
  );
}

function TimelineItem({
  exp,
  index,
  isLeft,
}: {
  exp: (typeof experiences)[0];
  index: number;
  isLeft: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div
      ref={ref}
      className={`relative flex items-start mb-16 last:mb-0 ${
        isLeft ? "md:flex-row" : "md:flex-row-reverse"
      }`}
    >
      {/* Node */}
      <motion.div
        initial={{ scale: 0 }}
        animate={inView ? { scale: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.2, type: "spring" }}
        className="absolute left-6 md:left-1/2 -translate-x-1/2 z-10"
      >
        <div
          className="w-4 h-4 rounded-full border-2"
          style={{
            borderColor: exp.color,
            backgroundColor: `${exp.color}30`,
            boxShadow: `0 0 15px ${exp.color}40`,
          }}
        />
      </motion.div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -40 : 40, y: 20 }}
        animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.3 }}
        className={`ml-16 md:ml-0 md:w-[45%] ${
          isLeft ? "md:pr-12" : "md:pl-12 md:ml-auto"
        }`}
      >
        <div className="glass rounded-xl p-6 holo-card group hover:glow-violet transition-all duration-500">
          {/* Period */}
          <span
            className="font-mono text-xs tracking-wider"
            style={{ color: exp.color }}
          >
            {exp.period}
          </span>

          {/* Role */}
          <h3 className="font-display text-lg font-bold text-white mt-2 group-hover:glow-text-violet transition-all">
            {exp.role}
          </h3>
          <p className="font-mono text-xs text-silver mt-1">{exp.org}</p>

          {/* Description */}
          <p className="font-mono text-xs text-silver/70 leading-relaxed mt-3">
            {exp.description}
          </p>

          {/* Highlights */}
          <div className="flex flex-wrap gap-2 mt-4">
            {exp.highlights.map((h) => (
              <span
                key={h}
                className="px-2 py-0.5 rounded-full font-mono text-[10px] tracking-wider"
                style={{
                  backgroundColor: `${exp.color}15`,
                  color: exp.color,
                  border: `1px solid ${exp.color}25`,
                }}
              >
                {h}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
