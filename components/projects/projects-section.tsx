"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const projects = [
  {
    id: "arcane",
    number: "01",
    title: "A.R.C.A.N.E",
    subtitle: "Autonomous Reasoning & Cognitive Agent Network Engine",
    description:
      "A multi-agent AI orchestration framework that enables autonomous agents to communicate, reason, and collaborate in real-time. Built with advanced neural orchestration patterns and self-healing agent architectures.",
    tech: ["Python", "LangChain", "OpenAI", "Multi-Agent Systems", "Vector DB"],
    features: ["Autonomous AI Agents", "Neural Orchestration", "Multi-Agent Communication", "AI Reasoning Networks"],
    color: "#7c3aed",
    gradient: "from-violet to-purple-900",
  },
  {
    id: "mednexus",
    number: "02",
    title: "MedNexus-AI",
    subtitle: "Intelligent Healthcare AI Platform",
    description:
      "A futuristic healthcare AI assistant powered by RAG pipelines and neural search. Provides intelligent medical information retrieval, document analysis, and AI-assisted diagnostics with enterprise-grade accuracy.",
    tech: ["Python", "LangChain", "RAG", "Vector Database", "React"],
    features: ["RAG Pipelines", "Neural Search", "AI Medical Assistant", "Document Intelligence"],
    color: "#06b6d4",
    gradient: "from-cyan to-blue-900",
  },
  {
    id: "collab-editor",
    number: "03",
    title: "Real-Time Code Editor",
    subtitle: "Collaborative Development Environment",
    description:
      "A real-time collaborative code editor enabling multiple developers to code simultaneously with WebSocket synchronization, live cursors, syntax highlighting, and instant conflict resolution.",
    tech: ["React", "Node.js", "WebSocket", "Monaco Editor", "Redis"],
    features: ["Real-Time Sync", "Multi-User Editing", "Live Cursors", "WebSocket Architecture"],
    color: "#3b82f6",
    gradient: "from-blue-500 to-indigo-900",
  },
  {
    id: "chatflow",
    number: "04",
    title: "ChatFlow",
    subtitle: "AI-Powered Communication Platform",
    description:
      "An intelligent real-time chat application with AI-powered features including smart message suggestions, sentiment analysis, auto-translations, and conversational AI integration.",
    tech: ["MERN Stack", "Socket.io", "OpenAI API", "Redis", "JWT"],
    features: ["Real-Time Chat", "AI Suggestions", "Sentiment Analysis", "End-to-End Encryption"],
    color: "#8b5cf6",
    gradient: "from-violet-light to-violet",
  },
  {
    id: "collabcode",
    number: "05",
    title: "CollabCode",
    subtitle: "Next-Gen Pair Programming Platform",
    description:
      "An advanced collaborative coding platform designed for pair programming and team development. Features include shared terminals, integrated video calls, code review tools, and AI-assisted debugging.",
    tech: ["Next.js", "WebRTC", "Node.js", "Docker", "PostgreSQL"],
    features: ["Pair Programming", "Shared Terminal", "Video Integration", "AI Debugging"],
    color: "#22d3ee",
    gradient: "from-cyan-glow to-cyan",
  },
];

function ProjectVisualization({ id, color }: { id: string; color: string }) {
  // Different visualization for each project
  const nodes = id === "arcane" ? 12 : id === "mednexus" ? 8 : 6;

  return (
    <div className="relative w-full h-48 overflow-hidden rounded-lg">
      <svg className="w-full h-full" viewBox="0 0 400 200">
        {/* Grid */}
        <defs>
          <pattern id={`grid-${id}`} width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke={color} strokeWidth="0.2" strokeOpacity="0.1" />
          </pattern>
        </defs>
        <rect width="400" height="200" fill={`url(#grid-${id})`} />

        {/* Animated nodes */}
        {Array.from({ length: nodes }).map((_, i) => {
          const cx = 50 + (i % 4) * 90 + (Math.sin(i) * 20);
          const cy = 40 + Math.floor(i / 4) * 60 + (Math.cos(i) * 15);
          return (
            <g key={i}>
              <circle
                cx={cx}
                cy={cy}
                r="4"
                fill={color}
                opacity="0.6"
              >
                <animate
                  attributeName="r"
                  values="3;6;3"
                  dur={`${2 + i * 0.3}s`}
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  values="0.4;0.8;0.4"
                  dur={`${2 + i * 0.3}s`}
                  repeatCount="indefinite"
                />
              </circle>
              {/* Connect to next node */}
              {i < nodes - 1 && (
                <line
                  x1={cx}
                  y1={cy}
                  x2={50 + ((i + 1) % 4) * 90 + (Math.sin(i + 1) * 20)}
                  y2={40 + Math.floor((i + 1) / 4) * 60 + (Math.cos(i + 1) * 15)}
                  stroke={color}
                  strokeWidth="0.5"
                  strokeOpacity="0.15"
                >
                  <animate
                    attributeName="stroke-opacity"
                    values="0.05;0.25;0.05"
                    dur={`${3 + i * 0.2}s`}
                    repeatCount="indefinite"
                  />
                </line>
              )}
            </g>
          );
        })}

        {/* Animated data flow particles */}
        {Array.from({ length: 5 }).map((_, i) => (
          <circle key={`particle-${i}`} r="2" fill={color} opacity="0.8">
            <animateMotion
              dur={`${4 + i}s`}
              repeatCount="indefinite"
              path={`M ${50 + i * 70} 30 Q ${100 + i * 50} ${100 + i * 10} ${200 + i * 30} ${150 - i * 20}`}
            />
          </circle>
        ))}
      </svg>

      {/* Glow overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at center, ${color}10 0%, transparent 70%)`,
        }}
      />
    </div>
  );
}

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.8,
        delay: index * 0.15,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="group"
    >
      <div
        className="glass rounded-2xl overflow-hidden holo-card relative transition-all duration-700"
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
        data-cursor="pointer"
        style={{
          boxShadow: isExpanded
            ? `0 0 40px ${project.color}20, 0 20px 60px rgba(0,0,0,0.5)`
            : undefined,
        }}
      >
        {/* Top gradient line */}
        <div
          className="h-px w-full"
          style={{
            background: `linear-gradient(90deg, transparent, ${project.color}, transparent)`,
          }}
        />

        <div className="p-8">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <span
                className="font-display text-5xl font-bold opacity-10"
                style={{ color: project.color }}
              >
                {project.number}
              </span>
              <h3 className="font-display text-2xl md:text-3xl font-bold text-white mt-2 group-hover:glow-text-violet transition-all duration-500">
                {project.title}
              </h3>
              <p className="font-mono text-xs text-silver mt-1 tracking-wider">
                {project.subtitle}
              </p>
            </div>
            <div className="flex gap-2">
              <span className="px-3 py-1 rounded-full glass font-mono text-[10px] text-violet-light tracking-wider">
                VIEW
              </span>
            </div>
          </div>

          {/* Visualization */}
          <ProjectVisualization id={project.id} color={project.color} />

          {/* Description */}
          <motion.div
            animate={{ height: isExpanded ? "auto" : 0, opacity: isExpanded ? 1 : 0 }}
            transition={{ duration: 0.4 }}
            className="overflow-hidden"
          >
            <p className="font-mono text-sm text-silver leading-relaxed mt-6 mb-4">
              {project.description}
            </p>

            {/* Features */}
            <div className="flex flex-wrap gap-2 mb-4">
              {project.features.map((feature) => (
                <span
                  key={feature}
                  className="px-2 py-1 rounded-md font-mono text-[10px] tracking-wider"
                  style={{
                    backgroundColor: `${project.color}15`,
                    color: project.color,
                    border: `1px solid ${project.color}30`,
                  }}
                >
                  {feature}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-white/5">
            {project.tech.map((t) => (
              <span
                key={t}
                className="px-2 py-0.5 rounded-full bg-white/[0.03] font-mono text-[10px] text-silver tracking-wider"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function ProjectsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="relative py-32 px-6 overflow-hidden">
      {/* Background */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-20 pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(6,182,212,0.08) 0%, transparent 70%)",
        }}
      />

      <div ref={containerRef} className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-4"
        >
          <span className="section-label">// Featured Projects</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="section-heading text-section mb-4"
        >
          Project.showcase()
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-mono text-sm text-silver/60 mb-16 max-w-xl"
        >
          A curated collection of AI-powered applications, full-stack platforms, and open source contributions.
        </motion.p>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
