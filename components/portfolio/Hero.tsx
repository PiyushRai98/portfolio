"use client";

import { ArrowDown, Brain, Github, Linkedin, Mail, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { NeuralScene } from "./NeuralScene";
import { Button } from "@/components/ui/button";
import { profile } from "./data";

const roles = ["Agentic AI", "RAG Systems", "LLM Orchestration", "MERN Microservices"];

export function Hero() {
  return (
    <section id="home" className="section-layer-base relative min-h-[92svh] overflow-hidden pt-28">
      <NeuralScene />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-base to-transparent" />
      <div className="section-shell relative z-10 grid min-h-[calc(92svh-7rem)] items-center gap-10 pb-10 lg:grid-cols-[1.02fr_0.74fr]">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-4 py-1.5 text-sm text-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan" />
            AI/ML Engineer · Full-Stack
          </div>

          <h1 className="font-script text-5xl leading-[1.05] tracking-normal text-silver sm:text-6xl md:text-7xl lg:text-8xl">
            {profile.name}
          </h1>
          <p className="mt-6 max-w-3xl text-balance text-xl leading-8 text-silver md:text-2xl md:leading-9">
            {profile.headline}
          </p>
          <p className="mt-5 max-w-2xl text-base leading-7 text-muted md:text-lg">
            I build intelligent software that fuses generative AI, multi-agent architecture,
            retrieval systems, and scalable full-stack engineering into products that feel alive.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button asChild>
              <a href="#projects">
                <Brain className="h-4 w-4" />
                View Projects
              </a>
            </Button>
            <Button variant="secondary" asChild>
              <a href={profile.github} target="_blank" rel="noreferrer">
                <Github className="h-4 w-4" />
                GitHub
              </a>
            </Button>
            <Button variant="secondary" asChild>
              <a href={profile.linkedin} target="_blank" rel="noreferrer">
                <Linkedin className="h-4 w-4" />
                LinkedIn
              </a>
            </Button>
            <Button variant="ghost" asChild>
              <a href={`mailto:${profile.email}`}>
                <Mail className="h-4 w-4" />
                Email
              </a>
            </Button>
          </div>
        </motion.div>

        <motion.aside
          initial={{ opacity: 0, x: 28 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="shell-border relative overflow-hidden rounded-2xl p-6"
        >
          <div className="relative z-10 flex flex-col gap-5">
            {/* Name + role */}
            <div className="border-b border-white/8 pb-5">
              <p className="text-xs uppercase tracking-[0.16em] text-muted">Currently available for</p>
              <p className="mt-2 font-display text-2xl font-semibold text-silver">Full-time & contract roles</p>
            </div>
            <div className="grid gap-3">
              {roles.map((role, index) => (
                <div
                  key={role}
                  className="flex items-center justify-between rounded-[8px] border border-white/10 bg-elevated px-3 py-3"
                >
                  <span className="font-mono text-sm text-silver">{role}</span>
                  <span className="text-xs text-cyan">{96 - index * 3}%</span>
                </div>
              ))}
            </div>
            {/* Location */}
            <div className="flex items-center gap-2 text-sm text-muted">
              <MapPin className="h-4 w-4 shrink-0 text-cyan/70" />
              {profile.location}
            </div>
          </div>
        </motion.aside>
      </div>
      <div className="section-shell relative z-10 -mt-2 flex items-center justify-center border-t border-white/8 py-5">
        <ArrowDown className="h-4 w-4 animate-bounce text-muted/60" />
      </div>
    </section>
  );
}
