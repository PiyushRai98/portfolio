"use client";

import { motion } from "framer-motion";
import { Award, ExternalLink, ShieldCheck } from "lucide-react";
import { certifications } from "./data";

export function Certifications() {
  return (
    <section id="certifications" className="section-layer-recessed relative py-24">
      <div className="section-shell">
        <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="font-mono text-sm uppercase tracking-[0.28em] text-amber">credential vault</p>
            <h2 className="mt-3 font-display text-4xl font-semibold text-silver md:text-6xl">
              Verified learning, displayed as achievement systems.
            </h2>
          </div>
          <ShieldCheck className="hidden h-12 w-12 text-amber md:block" />
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {certifications.map((cert, index) => (
            <motion.a
              key={cert.name}
              href={cert.href}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0.72, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.04 }}
              className="shell-border magnetic group relative min-h-[150px] overflow-hidden rounded-[8px] p-5 transition hover:border-amber/40 hover:shadow-[0_0_34px_rgb(var(--accent-amber-rgb)/0.18)]"
            >
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber to-transparent opacity-60" />

              {/* Icon + external link indicator */}
              <div className="flex items-start justify-between">
                <Award className="h-6 w-6 text-amber transition group-hover:scale-110" />
                <ExternalLink className="h-3.5 w-3.5 text-muted opacity-0 transition group-hover:opacity-100" />
              </div>

              {/* Cert name */}
              <p className="mt-5 font-display text-xl font-semibold text-silver group-hover:text-amber transition-colors">
                {cert.name}
              </p>

              {/* Issuer + optional note */}
              <p className="mt-2 font-mono text-xs text-muted">
                {cert.issuer}
                {cert.note && (
                  <span className="ml-1 text-amber/70">· {cert.note}</span>
                )}
              </p>

              <p className="mt-3 font-mono text-xs uppercase tracking-[0.18em] text-muted/60">
                achievement.unlocked
              </p>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
