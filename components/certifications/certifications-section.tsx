"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const certifications = [
  {
    title: "Deep Learning Specialization",
    issuer: "DeepLearning.AI",
    instructor: "Andrew Ng",
    category: "AI/ML",
    color: "#7c3aed",
  },
  {
    title: "Machine Learning Specialization",
    issuer: "Stanford / DeepLearning.AI",
    instructor: "Andrew Ng",
    category: "AI/ML",
    color: "#7c3aed",
  },
  {
    title: "Natural Language Processing",
    issuer: "DeepLearning.AI",
    instructor: "Specialization",
    category: "NLP",
    color: "#06b6d4",
  },
  {
    title: "TensorFlow Developer Certificate",
    issuer: "DeepLearning.AI",
    instructor: "Professional",
    category: "Framework",
    color: "#3b82f6",
  },
  {
    title: "Generative AI with LLMs",
    issuer: "DeepLearning.AI & AWS",
    instructor: "Specialization",
    category: "Gen AI",
    color: "#8b5cf6",
  },
  {
    title: "AI for Everyone",
    issuer: "DeepLearning.AI",
    instructor: "Andrew Ng",
    category: "AI",
    color: "#22d3ee",
  },
];

function CertCard({
  cert,
  index,
}: {
  cert: (typeof certifications)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -20;
    setTilt({ x, y });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="perspective-1000"
    >
      <div
        className="glass rounded-xl p-6 holo-card relative overflow-hidden transition-all duration-300 preserve-3d"
        style={{
          transform: `rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
          boxShadow: isHovered
            ? `0 0 30px ${cert.color}30, 0 10px 40px rgba(0,0,0,0.4)`
            : undefined,
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        data-cursor="pointer"
      >
        {/* Shine sweep */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-500"
          style={{
            background: `linear-gradient(105deg, transparent 40%, ${cert.color}15 45%, ${cert.color}08 55%, transparent 60%)`,
            backgroundSize: "200% 200%",
            animation: isHovered ? "shimmer 2s ease-in-out" : undefined,
            opacity: isHovered ? 1 : 0,
          }}
        />

        {/* Category badge */}
        <div className="flex items-center justify-between mb-4">
          <span
            className="px-2 py-0.5 rounded-full font-mono text-[10px] tracking-wider"
            style={{
              backgroundColor: `${cert.color}15`,
              color: cert.color,
              border: `1px solid ${cert.color}30`,
            }}
          >
            {cert.category}
          </span>
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{
              background: `linear-gradient(135deg, ${cert.color}30, ${cert.color}10)`,
            }}
          >
            <span className="text-sm">🏆</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="font-display text-base font-bold text-white mb-2 leading-tight">
          {cert.title}
        </h3>

        {/* Issuer */}
        <p className="font-mono text-xs text-silver">{cert.issuer}</p>
        <p className="font-mono text-[10px] text-silver/50 mt-0.5">
          {cert.instructor}
        </p>

        {/* Bottom decoration */}
        <div
          className="mt-4 h-px w-full"
          style={{
            background: `linear-gradient(90deg, transparent, ${cert.color}40, transparent)`,
          }}
        />
      </div>
    </motion.div>
  );
}

export default function CertificationsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section id="certifications" className="relative py-32 px-6 overflow-hidden">
      <div ref={containerRef} className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-4"
        >
          <span className="section-label">// Achievements</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="section-heading text-section mb-16"
        >
          Certifications.load()
        </motion.h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, i) => (
            <CertCard key={cert.title} cert={cert} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
