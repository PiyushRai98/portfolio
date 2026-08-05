"use client";

import { motion } from "framer-motion";
import { CheckCircle2, ExternalLink, RadioTower } from "lucide-react";
import { experienceTimeline } from "./data";

export function ExperienceTimeline() {
  return (
    <section id="experience" className="section-shell section-layer-recessed py-24">
      <div className="mb-12 grid gap-6 md:grid-cols-[0.7fr_0.3fr] md:items-end">
        <div>
          <p className="font-mono text-sm uppercase tracking-[0.28em] text-cyan">engineering timeline</p>
          <h2 className="mt-3 font-display text-4xl font-semibold text-silver md:text-6xl">
            Work mapped as a deployment stream.
          </h2>
        </div>
        <p className="text-sm leading-6 text-muted">
          Open-source contribution, AI automation, and engineering education are shown as active telemetry.
        </p>
      </div>

      <div className="relative">
        <div className="absolute left-4 top-0 hidden h-full w-px bg-gradient-to-b from-cyan via-sapphire to-transparent md:block" />
        <div className="grid gap-5">
          {experienceTimeline.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0.76, x: -18 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, delay: index * 0.08 }}
              className="relative grid gap-4 md:grid-cols-[0.18fr_0.82fr] md:pl-12"
            >
              <div className="hidden md:block">
                <div className="absolute left-0 top-5 grid h-8 w-8 place-items-center rounded-full border border-cyan/35 bg-recessed text-cyan shadow-glow">
                  <RadioTower className="h-4 w-4" />
                </div>
                <p className="pt-5 font-mono text-xs uppercase tracking-[0.14em] text-muted">{item.date}</p>
              </div>

              <div className="shell-border rounded-[8px] p-5">
                <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                  <div>
                    <p className="font-mono text-xs uppercase tracking-[0.18em] text-cyan md:hidden">{item.date}</p>
                    <div className="mt-1 flex flex-wrap items-center gap-2">
                      {item.titleHref ? (
                        <a
                          href={item.titleHref}
                          target="_blank"
                          rel="noreferrer"
                          className="group inline-flex items-center gap-1.5 font-display text-2xl font-semibold text-silver transition hover:text-cyan"
                        >
                          {item.title}
                          <ExternalLink className="h-4 w-4 opacity-0 transition group-hover:opacity-100" />
                        </a>
                      ) : (
                        <h3 className="font-display text-2xl font-semibold text-silver">{item.title}</h3>
                      )}
                      <span className="rounded-[4px] border border-cyan/25 bg-cyan/8 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.16em] text-cyan">
                        {item.org}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-silver">{item.role}</p>
                  </div>
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-cyan" />
                </div>

                {/* Signal / tags */}
                <div className="mt-4 rounded-[8px] border border-white/10 bg-recessed p-4">
                  <p className="font-mono text-sm leading-6 text-muted">{item.signal}</p>
                </div>

                {/* Bullet points from resume */}
                {item.bullets.length > 0 && (
                  <ul className="mt-4 space-y-2">
                    {item.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-2.5 text-sm leading-6 text-muted">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan/60" />
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
