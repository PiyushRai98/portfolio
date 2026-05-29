"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const contributions = [
  { label: "Total PRs Merged", value: "50+", icon: "⟐" },
  { label: "Repositories", value: "15+", icon: "◈" },
  { label: "Lines of Code", value: "25K+", icon: "⟁" },
  { label: "Organizations", value: "5+", icon: "◇" },
];

const terminalLines = [
  { prompt: "$ git log --oneline -5", type: "command" as const },
  { text: "a3f2c1d feat: implement multi-agent orchestration for ARCANE", type: "output" as const },
  { text: "b8e4a2c fix: RAG pipeline latency optimization in MedNexus", type: "output" as const },
  { text: "c7d3b5f feat: add real-time cursor sync in CollabCode", type: "output" as const },
  { text: "d1e6f8a docs: update API documentation for ChatFlow", type: "output" as const },
  { text: "e9a2c4b chore: containerize services with Docker Compose", type: "output" as const },
];

// Contribution heatmap data (simulated)
function ContributionHeatmap() {
  const weeks = 20;
  const days = 7;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="overflow-x-auto">
      <div className="flex gap-[3px] min-w-fit">
        {Array.from({ length: weeks }).map((_, w) => (
          <div key={w} className="flex flex-col gap-[3px]">
            {Array.from({ length: days }).map((_, d) => {
              const intensity = Math.random();
              const level =
                intensity > 0.8
                  ? "bg-violet"
                  : intensity > 0.6
                  ? "bg-violet/60"
                  : intensity > 0.35
                  ? "bg-violet/30"
                  : "bg-white/[0.04]";

              return (
                <motion.div
                  key={`${w}-${d}`}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{
                    duration: 0.2,
                    delay: (w * days + d) * 0.005,
                  }}
                  className={`w-3 h-3 rounded-[2px] ${level} transition-colors hover:ring-1 hover:ring-violet-light`}
                  data-cursor="pointer"
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function OpenSourceSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section id="opensource" className="relative py-32 px-6 overflow-hidden">
      <div ref={containerRef} className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-4"
        >
          <span className="section-label">// Open Source</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="section-heading text-section mb-16"
        >
          git.contributions()
        </motion.h2>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Terminal */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="glass rounded-2xl overflow-hidden"
          >
            {/* Terminal header */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/60" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                <div className="w-3 h-3 rounded-full bg-green-500/60" />
              </div>
              <span className="font-mono text-[10px] text-silver/50 ml-2">
                ~/contributions — zsh
              </span>
            </div>

            {/* Terminal content */}
            <div className="p-5 font-mono text-sm space-y-1">
              {terminalLines.map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.3, delay: 0.5 + i * 0.15 }}
                >
                  {line.type === "command" ? (
                    <span className="text-cyan">{line.prompt}</span>
                  ) : (
                    <span className="text-silver/60 text-xs">{line.text}</span>
                  )}
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.3, delay: 1.8 }}
                className="flex items-center gap-1 mt-2"
              >
                <span className="text-cyan">$</span>
                <span className="w-2 h-4 bg-cyan animate-[typewriter-blink_1s_infinite]" />
              </motion.div>
            </div>
          </motion.div>

          {/* Stats & Heatmap */}
          <div className="space-y-6">
            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="grid grid-cols-2 gap-4"
            >
              {contributions.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                  className="glass rounded-xl p-4 holo-card group hover:glow-violet transition-all duration-500"
                >
                  <span className="text-violet text-xl">{stat.icon}</span>
                  <div className="font-display text-2xl font-bold text-white mt-2">
                    {stat.value}
                  </div>
                  <div className="font-mono text-[10px] text-silver tracking-wider uppercase mt-1">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Heatmap */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="glass rounded-xl p-6"
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="font-mono text-xs text-silver tracking-wider">
                  CONTRIBUTION ACTIVITY
                </span>
              </div>
              <ContributionHeatmap />
              <div className="flex items-center justify-end gap-2 mt-3">
                <span className="font-mono text-[10px] text-silver/40">Less</span>
                <div className="flex gap-1">
                  <div className="w-3 h-3 rounded-[2px] bg-white/[0.04]" />
                  <div className="w-3 h-3 rounded-[2px] bg-violet/30" />
                  <div className="w-3 h-3 rounded-[2px] bg-violet/60" />
                  <div className="w-3 h-3 rounded-[2px] bg-violet" />
                </div>
                <span className="font-mono text-[10px] text-silver/40">More</span>
              </div>
            </motion.div>

            {/* GSSoC Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="glass rounded-xl p-4 flex items-center gap-4 glow-violet"
            >
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-violet to-cyan flex items-center justify-center flex-shrink-0">
                <span className="font-display text-sm font-bold text-white">GS</span>
              </div>
              <div>
                <h4 className="font-display text-sm font-semibold text-white">
                  GirlScript Summer of Code
                </h4>
                <p className="font-mono text-[10px] text-silver mt-0.5">
                  Active contributor • AI-powered projects • Agile development
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
