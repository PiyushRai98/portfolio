"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

function AnimatedCounter({ target, suffix = "", duration = 2000 }: { target: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const startTime = Date.now();
    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      start = Math.floor(eased * target);
      setCount(start);
      if (progress >= 1) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target, duration]);

  return (
    <span ref={ref} className="font-display text-3xl md:text-4xl font-bold text-white glow-text-violet">
      {count}{suffix}
    </span>
  );
}

function SkillBar({ label, percentage, delay }: { label: string; percentage: number; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="space-y-2">
      <div className="flex justify-between font-mono text-xs">
        <span className="text-silver-light">{label}</span>
        <span className="text-violet-light">{percentage}%</span>
      </div>
      <div className="h-1 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${percentage}%` } : {}}
          transition={{ duration: 1.5, delay, ease: [0.16, 1, 0.3, 1] }}
          className="h-full rounded-full"
          style={{
            background: `linear-gradient(90deg, #7c3aed, #06b6d4)`,
            boxShadow: "0 0 10px rgba(124, 58, 237, 0.4)",
          }}
        />
      </div>
    </div>
  );
}

export default function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, margin: "-100px" });

  const stats = [
    { label: "Projects Built", value: 20, suffix: "+" },
    { label: "Open Source PRs", value: 50, suffix: "+" },
    { label: "Certifications", value: 10, suffix: "+" },
    { label: "Tech Stack", value: 15, suffix: "+" },
  ];

  const skills = [
    { label: "Machine Learning & AI", percentage: 92 },
    { label: "Generative AI & LLMs", percentage: 90 },
    { label: "Full-Stack Development", percentage: 88 },
    { label: "Cloud & DevOps", percentage: 82 },
    { label: "Open Source", percentage: 85 },
  ];

  return (
    <section id="about" className="relative py-32 px-6 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-0 w-96 h-96 -translate-y-1/2 rounded-full opacity-30"
          style={{
            background: "radial-gradient(circle, rgba(124,58,237,0.1) 0%, transparent 70%)",
          }}
        />
      </div>

      <div ref={containerRef} className="max-w-6xl mx-auto">
        {/* Section Label */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-4"
        >
          <span className="section-label">// System Diagnostics</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="section-heading text-section mb-16"
        >
          About.init()
        </motion.h2>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Profile Panel */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="glass rounded-2xl p-8 holo-card relative"
          >
            {/* System header */}
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/5">
              <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />
              <span className="font-mono text-xs text-silver tracking-wider">
                SYS://PROFILE — STATUS: ACTIVE
              </span>
            </div>

            {/* Avatar placeholder */}
            <div className="flex items-start gap-6 mb-8">
              <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 gradient-border">
                <div className="w-full h-full bg-gradient-to-br from-violet/30 to-cyan/20 flex items-center justify-center">
                  <span className="font-display text-2xl font-bold text-white">PR</span>
                </div>
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-white mb-1">
                  Piyush Kumar Rai
                </h3>
                <p className="font-mono text-xs text-violet-light mb-2">
                  AI/ML Engineer & Full-Stack Developer
                </p>
                <div className="flex flex-wrap gap-2">
                  {["ECE Student", "Open Source", "Gen AI"].map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-full bg-violet/10 border border-violet/20 font-mono text-[10px] text-violet-light"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bio */}
            <div className="space-y-3 font-mono text-sm text-silver leading-relaxed mb-8">
              <p>
                <span className="text-violet-light">→</span> Electronics & Communication Engineering student with a passion for building intelligent systems.
              </p>
              <p>
                <span className="text-cyan">→</span> Specializing in AI/ML, Generative AI, LLM-powered applications, and autonomous agents.
              </p>
              <p>
                <span className="text-violet-light">→</span> Active open source contributor with contributions to GirlScript Summer of Code and community-driven AI projects.
              </p>
            </div>

            {/* Skills */}
            <div className="space-y-4">
              {skills.map((skill, i) => (
                <SkillBar key={skill.label} {...skill} delay={0.3 + i * 0.1} />
              ))}
            </div>
          </motion.div>

          {/* Stats & Data Cards */}
          <div className="space-y-6">
            {/* Stats Grid */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="grid grid-cols-2 gap-4"
            >
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 + i * 0.1 }}
                  className="glass rounded-xl p-6 text-center holo-card group hover:glow-violet transition-all duration-500"
                >
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                  <p className="font-mono text-xs text-silver mt-2 tracking-wider uppercase">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </motion.div>

            {/* Data Cards */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="glass rounded-2xl p-6 space-y-4"
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full bg-cyan animate-pulse" />
                <span className="font-mono text-xs text-cyan tracking-wider">CORE_MODULES</span>
              </div>

              {[
                { icon: "🧠", title: "AI Research & Development", desc: "LLMs, RAG pipelines, multi-agent architectures, NLP" },
                { icon: "⚡", title: "Full-Stack Engineering", desc: "React, Next.js, Node.js, MongoDB, RESTful & WebSocket APIs" },
                { icon: "🔬", title: "Machine Learning", desc: "TensorFlow, PyTorch, Computer Vision, Deep Learning" },
                { icon: "🚀", title: "Open Source Leadership", desc: "GSSoC contributor, community AI projects, agile development" },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.7 + i * 0.1 }}
                  className="flex items-start gap-4 p-3 rounded-lg hover:bg-white/[0.02] transition-colors group"
                >
                  <span className="text-2xl">{item.icon}</span>
                  <div>
                    <h4 className="font-display text-sm font-semibold text-white group-hover:text-violet-light transition-colors">
                      {item.title}
                    </h4>
                    <p className="font-mono text-xs text-silver/70 mt-0.5">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
