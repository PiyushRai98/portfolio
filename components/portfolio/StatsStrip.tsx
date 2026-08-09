"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { stats } from "./data";

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-90px" });
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) { setCurrent(value); return; }
    let frame = 0;
    const total = 48;
    const interval = window.setInterval(() => {
      frame += 1;
      setCurrent(Math.round((value * frame) / total));
      if (frame >= total) window.clearInterval(interval);
    }, 18);
    return () => window.clearInterval(interval);
  }, [inView, value]);

  return (
    <span ref={ref}>
      {current}
      {suffix}
    </span>
  );
}

export function StatsStrip() {
  return (
    <section className="section-shell py-10">
      {/* Thin dividers between stats — no cards */}
      <div className="grid grid-cols-2 gap-0 md:grid-cols-4">
        {stats.map((stat, index) => (
          <motion.a
            key={stat.label}
            href={stat.href}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: index * 0.06 }}
            className="group px-6 py-5 transition-colors duration-150 first:pl-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--phosphor)]"
            style={{
              borderRight: index < stats.length - 1 ? "1px solid var(--line)" : "none",
            }}
          >
            {/* Stat number — mono, vellum */}
            <p
              className="font-mono text-3xl font-medium transition-colors duration-150 group-hover:text-[var(--phosphor)]"
              style={{ color: "var(--vellum)" }}
            >
              <Counter value={stat.value} suffix={stat.suffix} />
            </p>
            {/* Label — graphite, uppercase caption */}
            <p
              className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em]"
              style={{ color: "var(--graphite)" }}
            >
              {stat.label}
            </p>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
