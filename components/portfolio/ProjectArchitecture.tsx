"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { projects } from "./data";
import { ButtonLink } from "@/components/ui/button";

export function ProjectArchitecture() {
  const [active, setActive] = useState(0);
  const project = projects[active];
  const Icon = project.icon;

  return (
    <section id="projects" className="section-layer-recessed relative py-28">
      {/* Faint PCB grid texture */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgb(var(--copper-rgb) / 1) 1px, transparent 1px),
            linear-gradient(90deg, rgb(var(--copper-rgb) / 1) 1px, transparent 1px)
          `,
          backgroundSize: "32px 32px",
        }}
      />

      <div className="section-shell relative">
        {/* Header */}
        <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p
              className="font-mono text-[10px] uppercase tracking-[0.28em]"
              style={{ color: "var(--graphite)" }}
            >
              featured systems
            </p>
            <h2
              className="mt-3 font-display"
              style={{
                fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
                fontWeight: 400,
                color: "var(--vellum)",
              }}
            >
              Project architecture, not project cards.
            </h2>
          </div>
          <p
            className="max-w-md text-sm leading-6"
            style={{ color: "var(--graphite)" }}
          >
            Each build is presented as a live system surface: capabilities, nodes, and data flow.
          </p>
        </div>

        {/* Selector + detail panel */}
        <div className="grid gap-4 lg:grid-cols-[0.38fr_0.62fr]">
          {/* Project selector */}
          <div className="grid gap-2">
            {projects.map((item, index) => {
              const ProjectIcon = item.icon;
              const selected = active === index;
              return (
                <button
                  key={item.name}
                  onClick={() => setActive(index)}
                  className="text-left transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--phosphor)]"
                  style={{
                    padding: "14px 16px",
                    border: `1px solid ${selected ? "var(--phosphor)" : "var(--line)"}`,
                    background: selected ? "rgb(var(--void-raised-rgb))" : "transparent",
                    borderRadius: "2px",
                    borderTop: `2px solid ${selected ? "var(--copper)" : "var(--line)"}`,
                  }}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="grid h-9 w-9 shrink-0 place-items-center"
                      style={{
                        border: "1px solid var(--line)",
                        background: "rgb(var(--void-rgb) / 0.7)",
                        borderRadius: "2px",
                        color: selected ? "var(--phosphor)" : "var(--graphite)",
                      }}
                    >
                      <ProjectIcon className="h-4 w-4" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p
                        className="font-mono text-sm font-medium"
                        style={{ color: selected ? "var(--vellum)" : "var(--vellum-dim)" }}
                      >
                        {item.name}
                      </p>
                      <p
                        className="mt-0.5 font-mono text-[10px]"
                        style={{ color: "var(--graphite)" }}
                      >
                        {item.status}
                      </p>
                    </div>
                    {/* Status badge — copper outline, informational */}
                    <span
                      className="shrink-0 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.14em]"
                      style={{
                        border: "1px solid var(--copper)",
                        color: "var(--copper)",
                        borderRadius: "2px",
                      }}
                    >
                      {selected ? "Active" : "Ready"}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Detail panel */}
          <div
            className="overflow-hidden"
            style={{ border: "1px solid var(--line)", borderRadius: "2px" }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={project.name}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="grid gap-0 xl:grid-cols-[0.95fr_1.05fr]"
              >
                {/* Left: info */}
                <div
                  className="p-6 xl:border-b-0 xl:border-r"
                  style={{ borderBottom: "1px solid var(--line)", borderColor: "var(--line)" }}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span
                        className="grid h-10 w-10 place-items-center shrink-0"
                        style={{
                          border: "1px solid var(--copper)",
                          color: "var(--copper)",
                          borderRadius: "2px",
                        }}
                      >
                        <Icon className="h-5 w-5" />
                      </span>
                      <div>
                        <h3
                          className="font-display"
                          style={{ fontSize: "1.5rem", fontWeight: 400, color: "var(--vellum)" }}
                        >
                          {project.name}
                        </h3>
                        <p className="mt-0.5 font-mono text-xs" style={{ color: "var(--graphite)" }}>
                          {project.full}
                        </p>
                      </div>
                    </div>
                    {/* GitHub link */}
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      title="View on GitHub"
                      className="group mt-1 shrink-0 flex h-8 w-8 items-center justify-center transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--phosphor)]"
                      style={{
                        border: "1px solid var(--line)",
                        color: "var(--graphite)",
                        borderRadius: "2px",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = "var(--phosphor)";
                        e.currentTarget.style.color = "var(--phosphor)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = "var(--line)";
                        e.currentTarget.style.color = "var(--graphite)";
                      }}
                    >
                      <Github className="h-3.5 w-3.5" />
                    </a>
                  </div>

                  <p className="mt-5 text-sm leading-6" style={{ color: "var(--vellum-dim)" }}>
                    {project.summary}
                  </p>

                  {/* Capability tags — mono, graphite, line border, no fill */}
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {project.capabilities.map((capability) => (
                      <span
                        key={capability}
                        className="font-mono text-[10px]"
                        style={{
                          border: "1px solid var(--line)",
                          color: "var(--graphite)",
                          padding: "3px 8px",
                          borderRadius: "2px",
                        }}
                      >
                        {capability}
                      </span>
                    ))}
                  </div>

                  {/* Stack chips */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {project.stack.map((s) => (
                      <span
                        key={s}
                        className="font-mono text-[10px]"
                        style={{
                          border: "1px solid var(--line)",
                          color: "var(--graphite)",
                          padding: "3px 8px",
                          borderRadius: "2px",
                        }}
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right: node diagram */}
                <div
                  className="relative min-h-[420px] overflow-hidden p-6"
                  style={{ background: "rgb(var(--void-rgb) / 0.5)" }}
                >
                  {/* Faint grid */}
                  <div
                    className="absolute inset-0 opacity-[0.05] pointer-events-none"
                    style={{
                      backgroundImage: `linear-gradient(rgb(var(--copper-rgb)/1) 1px, transparent 1px), linear-gradient(90deg, rgb(var(--copper-rgb)/1) 1px, transparent 1px)`,
                      backgroundSize: "24px 24px",
                    }}
                  />

                  {/* SVG copper trace connections */}
                  <svg className="absolute inset-0 h-full w-full opacity-30" viewBox="0 0 480 400" role="presentation">
                    {[0, 1, 2, 3, 4].map((line) => (
                      <motion.path
                        key={line}
                        d={`M60 ${70 + line * 52} L 240 ${40 + line * 38} L 420 ${76 + line * 46}`}
                        stroke="var(--copper)"
                        strokeWidth="1"
                        strokeDasharray="6 8"
                        fill="none"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 0.6 }}
                        transition={{ duration: 1.0, delay: line * 0.08 }}
                      />
                    ))}
                  </svg>

                  <div className="relative z-10 grid h-full min-h-[360px] grid-cols-2 content-center gap-3">
                    {project.nodes.map((node, index) => (
                      <motion.div
                        key={node}
                        initial={{ opacity: 0, scale: 0.94 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.07, ease: "easeOut" }}
                        style={{
                          border: "1px solid var(--line)",
                          borderTop: "2px solid var(--copper)",
                          background: "rgb(var(--void-raised-rgb) / 0.9)",
                          borderRadius: "2px",
                          padding: "14px",
                        }}
                      >
                        <p
                          className="font-mono text-[9px] uppercase tracking-[0.18em]"
                          style={{ color: "var(--graphite)" }}
                        >
                          node.{String(index + 1).padStart(2, "0")}
                        </p>
                        <p
                          className="mt-1.5 font-mono text-sm font-medium"
                          style={{ color: "var(--vellum)" }}
                        >
                          {node}
                        </p>
                        <div
                          className="mt-3 h-px overflow-hidden"
                          style={{ background: "var(--line)" }}
                        >
                          <motion.div
                            className="h-full"
                            style={{ background: "var(--copper)" }}
                            initial={{ width: "0%" }}
                            animate={{ width: `${65 + index * 5}%` }}
                            transition={{ duration: 0.7, delay: 0.2 }}
                          />
                        </div>
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
          <ButtonLink href="#contact" variant="secondary">
            <ExternalLink className="h-4 w-4" />
            Build With Me
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
