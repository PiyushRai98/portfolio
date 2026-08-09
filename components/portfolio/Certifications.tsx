"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { certifications } from "./data";

export function Certifications() {
  return (
    <section id="certifications" className="section-layer-recessed relative py-12">
      <div className="section-shell">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p
              className="font-mono text-[10px] uppercase tracking-[0.28em]"
              style={{ color: "var(--graphite)" }}
            >
              credentials
            </p>
            <h2
              className="mt-2 font-display"
              style={{ fontSize: "clamp(1.25rem, 3vw, 1.75rem)", fontWeight: 400, color: "var(--vellum-dim)" }}
            >
              Verified certifications
            </h2>
          </div>
          {/* Copper checkmark — informational, not interactive */}
          <svg
            className="hidden h-8 w-8 md:block"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--copper)"
            strokeWidth="1.5"
            opacity={0.6}
            aria-hidden="true"
          >
            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>

        {/* Dense list layout — line dividers, not cards */}
        <div
          style={{ border: "1px solid var(--line)", borderRadius: "2px" }}
        >
          {certifications.map((cert, index) => (
            <motion.a
              key={cert.name}
              href={cert.href}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.03 }}
              className="group flex items-center justify-between gap-4 px-4 py-3 transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--phosphor)]"
              style={{
                borderBottom: index < certifications.length - 1 ? `1px solid var(--line)` : "none",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgb(var(--void-raised-rgb))")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              {/* Copper verified indicator */}
              <svg
                className="h-3.5 w-3.5 shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--copper)"
                strokeWidth="1.5"
                opacity={0.7}
                aria-hidden="true"
              >
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>

              <div className="min-w-0 flex-1">
                <p
                  className="font-mono text-xs font-medium transition-colors duration-150 group-hover:text-[var(--vellum)]"
                  style={{ color: "var(--vellum-dim)" }}
                >
                  {cert.name}
                </p>
                <p className="mt-0.5 font-mono text-[10px]" style={{ color: "var(--graphite)" }}>
                  {cert.issuer}
                  {cert.note && (
                    <span style={{ color: "var(--copper)", opacity: 0.8 }}> · {cert.note}</span>
                  )}
                </p>
              </div>

              <ExternalLink
                className="h-3 w-3 shrink-0 opacity-0 transition-opacity group-hover:opacity-100"
                style={{ color: "var(--graphite)" }}
              />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
