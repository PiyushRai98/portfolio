"use client";

import { motion } from "framer-motion";
import { Award, ExternalLink } from "lucide-react";
import { certifications } from "./data";

export function Certifications() {
  return (
    <section id="certifications" className="section-layer-recessed relative py-24">
      <div className="section-shell">
        <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <h2 className="font-display text-4xl font-semibold text-silver md:text-5xl">
              Certifications
            </h2>
            <p className="mt-3 text-base text-muted">
              Completed specializations from DeepLearning.AI, Stanford Online, and freeCodeCamp.
            </p>
          </div>
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

              <p className="mt-3 font-mono text-xs text-muted/50">
                {cert.issuer}{cert.note ? ` · ${cert.note}` : ""}
              </p>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
