"use client";

import { useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { stats } from "./data";

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-90px" });
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!inView) return;
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
    <section className="section-shell section-layer-recessed py-10">
      <div className="grid gap-3 md:grid-cols-4">
        {stats.map((stat, index) => (
          <motion.a
            key={stat.label}
            href={stat.href}
            initial={{ opacity: 0.76, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: index * 0.06 }}
            className="shell-border magnetic rounded-[8px] p-5 transition hover:border-cyan/40"
          >
            <p className="font-display text-4xl font-semibold text-silver">
              <Counter value={stat.value} suffix={stat.suffix} />
            </p>
            <p className="mt-2 text-sm text-muted">{stat.label}</p>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
