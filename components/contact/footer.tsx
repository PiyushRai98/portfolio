"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const socialLinks = [
  { label: "GitHub", href: "https://github.com", icon: "◈" },
  { label: "LinkedIn", href: "https://linkedin.com", icon: "◇" },
  { label: "Twitter / X", href: "https://twitter.com", icon: "◆" },
  { label: "Email", href: "mailto:piyush@example.com", icon: "⟐" },
];

export default function Footer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <footer id="contact" className="relative py-32 px-6 overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 100%, rgba(124,58,237,0.1) 0%, transparent 60%)",
        }}
      />

      <div ref={containerRef} className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-4"
        >
          <span className="section-label">// Connect</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-hero font-display text-white glow-text-violet mb-6"
        >
          Let&apos;s Build
          <br />
          <span className="bg-gradient-to-r from-violet via-cyan to-violet bg-clip-text text-transparent">
            The Future
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="font-mono text-sm text-silver/60 max-w-lg mx-auto mb-12"
        >
          Open to collaborations, open source projects, AI research, and new opportunities.
          Let&apos;s create something extraordinary together.
        </motion.p>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-4 mb-16"
        >
          {socialLinks.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="pointer"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
              className="group glass px-6 py-3 rounded-full flex items-center gap-3 hover:glow-violet transition-all duration-500"
            >
              <span className="text-violet text-sm">{link.icon}</span>
              <span className="font-mono text-xs text-silver group-hover:text-white transition-colors tracking-wider">
                {link.label}
              </span>
            </motion.a>
          ))}
        </motion.div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-mono text-xs text-silver/30">
            © 2024 Piyush Kumar Rai. Designed & engineered with precision.
          </p>
          <p className="font-mono text-xs text-silver/30 flex items-center gap-1">
            Built with
            <span className="text-violet">♥</span>
            and
            <span className="text-cyan">AI</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
