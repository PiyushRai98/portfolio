"use client";

import { ArrowDown, Github, Linkedin, Mail, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { ButtonLink } from "@/components/ui/button";
import { profile } from "./data";

const roles = ["Agentic AI", "RAG Systems", "LLM Orchestration", "MERN Microservices"];

/** Faint PCB-trace background — opacity ~0.06, static, not a focal element */
function PcbBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {/* Oscilloscope grid */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `
            linear-gradient(rgb(var(--copper-rgb) / 1) 1px, transparent 1px),
            linear-gradient(90deg, rgb(var(--copper-rgb) / 1) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />
      {/* Copper trace lines — horizontal signal traces */}
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.05]"
        viewBox="0 0 1440 800"
        preserveAspectRatio="xMidYMid slice"
        role="presentation"
      >
        <line x1="0" y1="200" x2="400" y2="200" stroke="var(--copper)" strokeWidth="1" />
        <line x1="400" y1="200" x2="400" y2="320" stroke="var(--copper)" strokeWidth="1" />
        <line x1="400" y1="320" x2="900" y2="320" stroke="var(--copper)" strokeWidth="1" />
        <line x1="900" y1="320" x2="900" y2="160" stroke="var(--copper)" strokeWidth="1" />
        <line x1="900" y1="160" x2="1440" y2="160" stroke="var(--copper)" strokeWidth="1" />
        <line x1="0" y1="560" x2="320" y2="560" stroke="var(--copper)" strokeWidth="1" />
        <line x1="320" y1="560" x2="320" y2="640" stroke="var(--copper)" strokeWidth="1" />
        <line x1="320" y1="640" x2="1100" y2="640" stroke="var(--copper)" strokeWidth="1" />
        <line x1="1100" y1="640" x2="1100" y2="480" stroke="var(--copper)" strokeWidth="1" />
        <line x1="1100" y1="480" x2="1440" y2="480" stroke="var(--copper)" strokeWidth="1" />
        {/* Via pads */}
        <circle cx="400" cy="200" r="3" fill="none" stroke="var(--copper)" strokeWidth="1" />
        <circle cx="400" cy="320" r="3" fill="none" stroke="var(--copper)" strokeWidth="1" />
        <circle cx="900" cy="320" r="3" fill="none" stroke="var(--copper)" strokeWidth="1" />
        <circle cx="900" cy="160" r="3" fill="none" stroke="var(--copper)" strokeWidth="1" />
        <circle cx="320" cy="560" r="3" fill="none" stroke="var(--copper)" strokeWidth="1" />
        <circle cx="320" cy="640" r="3" fill="none" stroke="var(--copper)" strokeWidth="1" />
        <circle cx="1100" cy="640" r="3" fill="none" stroke="var(--copper)" strokeWidth="1" />
        <circle cx="1100" cy="480" r="3" fill="none" stroke="var(--copper)" strokeWidth="1" />
      </svg>
    </div>
  );
}

const heroVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay, ease: "easeOut" },
  }),
};

export function Hero() {
  return (
    <section
      id="home"
      className="section-layer-base relative min-h-[92svh] overflow-hidden pt-28"
    >
      <PcbBackground />

      {/* Bottom fade */}
      <div
        className="absolute inset-x-0 bottom-0 h-24 pointer-events-none"
        style={{ background: "linear-gradient(to top, var(--void), transparent)" }}
      />

      <div className="section-shell relative z-10 grid min-h-[calc(92svh-7rem)] items-center gap-10 pb-10 lg:grid-cols-[1.1fr_0.7fr]">

        {/* ── Left: name + copy + CTAs ── */}
        <div>
          {/* Eyebrow — mono caption */}
          <motion.p
            custom={0}
            variants={heroVariants}
            initial="hidden"
            animate="visible"
            className="mb-5 font-mono text-xs uppercase tracking-[0.28em] text-[var(--graphite)]"
          >
            AI/ML · Generative AI · Full-Stack
          </motion.p>

          {/* Name — Instrument Serif, hero scale */}
          <motion.h1
            custom={0.08}
            variants={heroVariants}
            initial="hidden"
            animate="visible"
            className="font-display text-[var(--vellum)] leading-[1.04]"
            style={{ fontSize: "clamp(2.75rem, 8vw, 5.5rem)", letterSpacing: "-0.01em", fontWeight: 400 }}
          >
            {profile.name}
          </motion.h1>

          {/* Tagline */}
          <motion.p
            custom={0.16}
            variants={heroVariants}
            initial="hidden"
            animate="visible"
            className="mt-5 max-w-[48ch] text-base leading-7 text-[var(--vellum-dim)] md:text-lg"
          >
            I build intelligent software that fuses generative AI, multi-agent
            architecture, retrieval systems, and scalable full-stack engineering
            into products that feel alive.
          </motion.p>

          {/* CTAs */}
          <motion.div
            custom={0.24}
            variants={heroVariants}
            initial="hidden"
            animate="visible"
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <ButtonLink href="#projects">View Systems</ButtonLink>
            <ButtonLink href={profile.github} target="_blank" rel="noreferrer" variant="ghost">
              <Github className="h-4 w-4" />
              GitHub
            </ButtonLink>
            <ButtonLink href={profile.linkedin} target="_blank" rel="noreferrer" variant="ghost">
              <Linkedin className="h-4 w-4" />
              LinkedIn
            </ButtonLink>
            <ButtonLink href={profile.mailtoLink} target="_blank" rel="noreferrer" variant="ghost">
              <Mail className="h-4 w-4" />
              Email
            </ButtonLink>
          </motion.div>
        </div>

        {/* ── Right: System status panel ── */}
        <motion.aside
          custom={0.12}
          variants={heroVariants}
          initial="hidden"
          animate="visible"
          className="shell-border overflow-hidden"
          style={{ borderRadius: "2px" }}
        >
          {/* Panel header */}
          <div
            className="flex items-center justify-between border-b px-4 py-3"
            style={{ borderColor: "var(--line)" }}
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--graphite)]">
              system.status
            </span>
            <div className="flex items-center gap-1.5">
              {/* Copper status dot — informational, not interactive */}
              <span
                className="h-2 w-2 rounded-full"
                style={{ background: "var(--copper)" }}
              />
              <span className="font-mono text-[10px] text-[var(--copper)]">online</span>
            </div>
          </div>

          {/* Status rows */}
          <div className="p-4 space-y-2">
            {roles.map((role) => (
              <div
                key={role}
                className="flex items-center gap-3 px-3 py-2.5 border"
                style={{ borderColor: "var(--line)", background: "rgb(var(--void-rgb) / 0.6)", borderRadius: "2px" }}
              >
                {/* Copper indicator — status/informational */}
                <span
                  className="h-1.5 w-1.5 shrink-0 rounded-full"
                  style={{ background: "var(--copper)" }}
                />
                <span className="font-mono text-sm text-[var(--vellum)]">{role}</span>
              </div>
            ))}
          </div>

          {/* Location row */}
          <div
            className="flex items-center gap-3 border-t px-4 py-3"
            style={{ borderColor: "var(--line)" }}
          >
            <MapPin className="h-3.5 w-3.5 shrink-0 text-[var(--graphite)]" />
            <span className="font-mono text-xs text-[var(--graphite)]">{profile.location}</span>
          </div>
        </motion.aside>
      </div>

      {/* Bottom strip */}
      <div
        className="section-shell relative z-10 -mt-2 flex items-center justify-between border-t py-4 font-mono text-xs uppercase tracking-[0.22em]"
        style={{ borderColor: "var(--line)", color: "var(--graphite)" }}
      >
        <span>AI Systems</span>
        <ArrowDown className="h-4 w-4" style={{ color: "var(--copper)" }} />
        <span>Full-Stack Engineering</span>
      </div>
    </section>
  );
}
