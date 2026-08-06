"use client";

import { ArrowDown, Brain, Github, Linkedin, Mail, MapPin, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { NeuralScene } from "./NeuralScene";
import { ScrambleText } from "./ScrambleText";
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
          <div className="mb-6 inline-flex items-center gap-2 rounded-[8px] border border-cyan/20 bg-cyan/8 px-3 py-2 font-mono text-xs uppercase tracking-[0.22em] text-cyan">
            <Sparkles className="h-4 w-4" />
            <ScrambleText text="Production AI Systems Engineer" />
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

          <div className="mt-8 flex flex-wrap items-start gap-3">
            <div className="flex flex-col gap-2">
              <Button asChild>
                <a href="#projects">
                  <Brain className="h-4 w-4" />
                  Enter AI OS
                </a>
              </Button>
              <p className="font-mono text-xs text-muted">Switch to interactive system view</p>
            </div>
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
          className="shell-border holo-scan relative overflow-hidden rounded-[8px] p-4"
        >
          <div className="relative z-10">
            <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-3">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.24em] text-muted">system.status</p>
                <p className="mt-1 text-sm text-silver">AI control layer online</p>
              </div>
              <span className="h-2.5 w-2.5 rounded-full bg-cyan shadow-glow" />
            </div>
            <div className="grid gap-3">
              {roles.map((role) => (
                <div
                  key={role}
                  className="flex items-center rounded-[8px] border border-white/10 bg-elevated px-3 py-3"
                >
                  <span className="font-mono text-sm text-silver">{role}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center gap-2 rounded-[8px] border border-sapphire/25 bg-sapphire/10 px-3 py-3 text-sm text-silver">
              <MapPin className="h-4 w-4 text-cyan" />
              {profile.location}
            </div>
          </div>
        </motion.aside>
      </div>
      <div className="section-shell relative z-10 -mt-2 flex items-center justify-between border-t border-white/10 py-4 font-mono text-xs uppercase tracking-[0.22em] text-muted">
        <span>AI Systems</span>
        <ArrowDown className="h-4 w-4 animate-bounce text-cyan" />
        <span>Full-Stack Engineering</span>
      </div>
    </section>
  );
}
