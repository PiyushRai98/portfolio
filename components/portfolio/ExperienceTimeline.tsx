"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { experienceTimeline } from "./data";

export function ExperienceTimeline() {
  return (
    <section id="experience" className="section-shell section-layer-base py-20">
      <div className="mb-12 grid gap-6 md:grid-cols-[0.7fr_0.3fr] md:items-end">
        <div>
          <p
            className="font-mono text-[10px] uppercase tracking-[0.28em]"
            style={{ color: "var(--graphite)" }}
          >
            engineering timeline
          </p>
          <h2
            className="mt-3 font-display"
            style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)", fontWeight: 400, color: "var(--vellum)" }}
          >
            Work mapped as a deployment stream.
          </h2>
        </div>
        <p className="text-sm leading-6" style={{ color: "var(--graphite)" }}>
          Open-source contribution, AI automation, and engineering education shown as active telemetry.
        </p>
      </div>

      <div className="relative">
        {/*
          Copper trace line — schematic style with right-angle jogs at entry points.
          Rendered as an SVG that overlays the timeline entries.
        */}
        <div className="absolute left-4 top-0 hidden h-full md:block" style={{ width: "1px" }}>
          <div
            className="h-full w-px"
            style={{ background: "var(--copper)", opacity: 0.4 }}
          />
        </div>

        <div className="grid gap-5">
          {experienceTimeline.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: -14 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.3, delay: index * 0.08, ease: "easeOut" }}
              className="relative grid gap-4 md:grid-cols-[0.18fr_0.82fr] md:pl-12"
            >
              {/* Date + schematic jog dot */}
              <div className="hidden md:block">
                {/* Right-angle jog indicator */}
                <div
                  className="absolute left-0 top-5 flex h-8 w-8 items-center justify-center"
                  style={{
                    border: "1px solid var(--copper)",
                    background: "var(--void)",
                    borderRadius: "2px",
                    color: "var(--copper)",
                  }}
                >
                  <div className="h-2 w-2 rounded-full" style={{ background: "var(--copper)" }} />
                </div>
                {/* Horizontal jog trace */}
                <div
                  className="absolute left-8 top-[1.375rem] h-px w-4"
                  style={{ background: "var(--copper)", opacity: 0.5 }}
                />
                <p
                  className="pt-5 font-mono text-[10px] uppercase tracking-[0.14em]"
                  style={{ color: "var(--graphite)" }}
                >
                  {item.date}
                </p>
              </div>

              {/* Card */}
              <div
                style={{
                  border: "1px solid var(--line)",
                  background: "rgb(var(--void-raised-rgb) / 0.85)",
                  borderRadius: "2px",
                  padding: "20px",
                }}
              >
                <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                  <div>
                    <p
                      className="font-mono text-[10px] uppercase tracking-[0.18em] md:hidden"
                      style={{ color: "var(--graphite)" }}
                    >
                      {item.date}
                    </p>
                    <div className="mt-1 flex flex-wrap items-center gap-2">
                      {item.titleHref ? (
                        <a
                          href={item.titleHref}
                          target="_blank"
                          rel="noreferrer"
                          className="group inline-flex items-center gap-1.5 font-display transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--phosphor)]"
                          style={{ fontSize: "1.25rem", fontWeight: 400, color: "var(--vellum)" }}
                          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--phosphor)")}
                          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--vellum)")}
                        >
                          {item.title}
                          <ExternalLink className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </a>
                      ) : (
                        <h3
                          className="font-display"
                          style={{ fontSize: "1.25rem", fontWeight: 400, color: "var(--vellum)" }}
                        >
                          {item.title}
                        </h3>
                      )}
                      {/* Status badge — copper outline, informational */}
                      <span
                        className="font-mono text-[9px] uppercase tracking-[0.16em]"
                        style={{
                          border: "1px solid var(--copper)",
                          color: "var(--copper)",
                          padding: "2px 8px",
                          borderRadius: "2px",
                        }}
                      >
                        {item.org}
                      </span>
                    </div>
                    <p className="mt-1 text-sm" style={{ color: "var(--graphite)" }}>
                      {item.role}
                    </p>
                  </div>
                  {/* Active/Expected badge */}
                  <span
                    className="shrink-0 font-mono text-[9px] uppercase tracking-[0.14em]"
                    style={{
                      border: "1px solid var(--copper)",
                      color: "var(--copper)",
                      padding: "3px 8px",
                      borderRadius: "2px",
                      whiteSpace: "nowrap",
                      height: "fit-content",
                    }}
                  >
                    {item.date.includes("Present") ? "Active" : "Expected"}
                  </span>
                </div>

                {/* Signal */}
                <div
                  className="mt-4 p-4"
                  style={{
                    border: "1px solid var(--line)",
                    background: "rgb(var(--void-rgb) / 0.6)",
                    borderRadius: "2px",
                  }}
                >
                  <p className="font-mono text-xs leading-6" style={{ color: "var(--graphite)" }}>
                    {item.signal}
                  </p>
                </div>

                {/* Bullets */}
                {item.bullets.length > 0 && (
                  <ul className="mt-4 space-y-2">
                    {item.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-2.5 text-sm leading-6" style={{ color: "var(--vellum-dim)" }}>
                        <span
                          className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                          style={{ background: "var(--copper)" }}
                        />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
