"use client";

import { motion } from "framer-motion";
import { orbitSkills, skillGroups } from "./data";

export function SkillsConstellation() {
  return (
    <section id="skills" className="section-layer-base relative overflow-hidden py-24">
      <div className="section-shell relative grid gap-10 lg:grid-cols-[0.46fr_0.54fr] lg:items-center">
        <div>
          <p className="font-mono text-sm uppercase tracking-[0.28em] text-cyan">skills constellation</p>
          <h2 className="mt-3 font-display text-4xl font-semibold text-silver md:text-6xl">
            Technical depth across AI and production software.
          </h2>
          <p className="mt-5 text-base leading-7 text-muted">
            The stack centers on intelligent systems: LLM orchestration, RAG, agentic AI, MERN,
            distributed backends, and deployment pipelines.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2 min-[480px]:hidden">
          {orbitSkills.map((skill) => (
            <span key={skill} className="rounded-[8px] border border-white/10 bg-elevated px-3 py-3 font-mono text-xs text-silver">
              {skill}
            </span>
          ))}
        </div>

        <div className="relative mx-auto hidden aspect-square w-full max-w-[560px] min-[480px]:block">
          <div className="absolute inset-[8%] rounded-full border border-cyan/18" />
          <div className="absolute inset-[20%] rounded-full border border-sapphire/18" />
          <div className="absolute inset-[32%] rounded-full border border-sapphire/22" />
          <div className="absolute inset-[41%] grid place-items-center rounded-full border border-cyan/35 bg-cyan/10 text-center shadow-glow">
            <span className="font-display text-xl font-semibold text-silver">AI Core</span>
          </div>
          <div className="absolute inset-0 animate-orbit [animation-duration:42s]">
            {orbitSkills.map((skill, index) => {
              const angle = (index / orbitSkills.length) * Math.PI * 2;
              const radius = 45;
              const x = 50 + Math.cos(angle) * radius;
              const y = 50 + Math.sin(angle) * radius;
              const left = `${x.toFixed(4)}%`;
              const top = `${y.toFixed(4)}%`;
              return (
                <span
                  key={skill}
                  className="absolute -translate-x-1/2 -translate-y-1/2 rounded-[8px] border border-white/12 bg-elevated px-3 py-2 font-mono text-xs text-silver shadow-[0_0_22px_rgb(var(--accent-cyan-rgb)_/_0.12)]"
                  style={{ left, top, transform: "translate(-50%, -50%) rotate(-360deg)" }}
                >
                  {skill}
                </span>
              );
            })}
          </div>
        </div>
      </div>

      <div className="section-shell mt-12 grid gap-3 md:grid-cols-2">
        {skillGroups.map((group, groupIndex) => {
          const Icon = group.icon;
          return (
            <motion.div
              key={group.title}
              initial={{ opacity: 0.76, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: groupIndex * 0.05 }}
              className="shell-border rounded-[8px] p-5"
            >
              <div className="mb-4 flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-[8px] border border-cyan/25 bg-cyan/10 text-cyan">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="font-display text-xl font-semibold text-silver">{group.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {group.items.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-[8px] border border-white/10 bg-elevated px-3 py-2 font-mono text-xs text-muted transition hover:border-cyan/30 hover:text-silver"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
