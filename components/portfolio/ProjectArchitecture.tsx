"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { projects } from "./data";
import { Button } from "@/components/ui/button";
import { theme } from "@/lib/theme";

const accentMap = {
  cyan: "text-cyan border-cyan/35 bg-cyan/10",
  sapphire: "text-sapphire border-sapphire/40 bg-sapphire/10",
  violet: "text-violet border-violet/40 bg-violet/10",
};

export function ProjectArchitecture() {
  const [active, setActive] = useState(0);
  const project = projects[active];
  const Icon = project.icon;

  return (
    <section id="projects" className="section-layer-base relative py-24">
      <div className="absolute inset-0 bg-grid-lines bg-[size:96px_96px] opacity-[0.07]" />
      <div className="section-shell relative">
        {/* Header */}
        <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <h2 className="font-display text-4xl font-semibold text-silver md:text-5xl">
              Selected projects
            </h2>
            <p className="mt-3 text-base text-muted">
              Built end-to-end — architecture, data pipelines, and deployment.
            </p>
          </div>
          <p className="max-w-sm text-sm leading-6 text-muted/70">
            Each build is presented with capabilities, system nodes, and data flow.
          </p>
        </div>

        {/* Selector + detail panel */}
        <div className="grid gap-4 lg:grid-cols-[0.38fr_0.62fr]">
          {/* Project selector list */}
          <div className="grid gap-3">
            {projects.map((item, index) => {
              const ProjectIcon = item.icon;
              const selected = active === index;
              return (
                <button
                  key={item.name}
                  onClick={() => setActive(index)}
                  className={`shell-border magnetic rounded-[8px] p-4 text-left transition ${
                    selected ? "border-cyan/45 shadow-glow" : "hover:border-white/24"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`grid h-10 w-10 place-items-center rounded-[8px] border ${accentMap[item.accent as keyof typeof accentMap]}`}>
                      <ProjectIcon className="h-5 w-5" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="font-display text-lg font-semibold text-silver">{item.name}</p>
                      <p className="text-xs text-muted">{item.status}</p>
                    </div>
                    {/* Stack preview dots */}
                    <div className="flex gap-1">
                      {item.stack.slice(0, 3).map((s) => (
                        <span key={s} className="rounded-[3px] bg-white/8 px-1.5 py-0.5 font-mono text-[9px] text-muted">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Detail panel */}
          <div className="shell-border overflow-hidden rounded-[8px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={project.name}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                transition={{ duration: 0.35 }}
                className="grid gap-0 xl:grid-cols-[0.95fr_1.05fr]"
              >
                {/* Left: info */}
                <div className="border-b border-white/10 p-6 xl:border-b-0 xl:border-r">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className={`grid h-12 w-12 place-items-center rounded-[8px] border ${accentMap[project.accent as keyof typeof accentMap]}`}>
                        <Icon className="h-6 w-6" />
                      </span>
                      <div>
                        <h3 className="font-display text-3xl font-semibold text-silver">{project.name}</h3>
                        <p className="mt-1 text-sm text-cyan">{project.full}</p>
                      </div>
                    </div>
                    {/* GitHub link */}
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      title="View on GitHub"
                      className="group mt-1 shrink-0 rounded-[8px] border border-white/10 p-2 transition hover:border-cyan/40 hover:text-cyan text-muted"
                    >
                      <Github className="h-4 w-4" />
                    </a>
                  </div>

                  <p className="mt-6 text-base leading-7 text-silver">{project.summary}</p>

                  {/* Capability tags */}
                  <div className="mt-6 flex flex-wrap gap-2">
                    {project.capabilities.map((capability) => (
                      <span
                        key={capability}
                        className="rounded-[8px] border border-white/10 bg-elevated px-3 py-2 font-mono text-xs text-silver"
                      >
                        {capability}
                      </span>
                    ))}
                  </div>

                  {/* Stack */}
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {project.stack.map((s) => (
                      <span
                        key={s}
                        className="rounded-[4px] border border-cyan/20 bg-cyan/6 px-2 py-0.5 font-mono text-[10px] text-cyan"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right: node diagram */}
                <div className="relative min-h-[450px] overflow-hidden p-6">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgb(var(--accent-cyan-rgb)_/_0.12),transparent_18rem)]" />
                  <svg className="absolute inset-0 h-full w-full opacity-70" viewBox="0 0 620 460" role="presentation">
                    <defs>
                      <linearGradient id="flow" x1="0" x2="1">
                        <stop offset="0%" stopColor={theme.accent.cyan} />
                        <stop offset="100%" stopColor={active === 0 ? theme.accent.violet : theme.accent.sapphire} />
                      </linearGradient>
                    </defs>
                    {[0, 1, 2, 3, 4].map((line) => (
                      <motion.path
                        key={line}
                        d={`M105 ${96 + line * 58} C 230 ${48 + line * 42}, 352 ${392 - line * 46}, 515 ${112 + line * 52}`}
                        stroke="url(#flow)"
                        strokeWidth="1.2"
                        strokeDasharray="8 10"
                        fill="none"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 0.74 }}
                        transition={{ duration: 1.2, delay: line * 0.1 }}
                      />
                    ))}
                  </svg>
                  <div className="relative z-10 grid h-full min-h-[400px] grid-cols-2 content-center gap-4">
                    {project.nodes.map((node, index) => (
                      <motion.div
                        key={node}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.07 }}
                        className="magnetic rounded-xl border border-white/8 bg-recessed/70 p-4"
                      >
                        <p className="font-mono text-[10px] text-muted/60">
                          {String(index + 1).padStart(2, "0")}
                        </p>
                        <p className="mt-2 font-display text-base font-semibold text-silver">{node}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-6 flex justify-end">
          <Button variant="secondary" asChild>
            <a href="#contact">
              <ExternalLink className="h-4 w-4" />
              Build With Me
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
