"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { skillGroups } from "./data";

/* ──────────────────────────────────────────────────────────────────────────
   Oscilloscope waveform data — amplitude encodes depth of experience.
   Derived from skill count per category as a rough proxy; actual
   GitHub language percentages would require API integration.
   ────────────────────────────────────────────────────────────────────────── */

type SkillLane = {
  label: string;
  color: string;
  /* 0–1 values that map to waveform amplitude; denser = more items = higher freq */
  signal: number[];
};

function buildSignal(items: string[]): number[] {
  // Build a plausible waveform shape from the item count
  const count = items.length;
  const points = 64;
  return Array.from({ length: points }, (_, i) => {
    const t = (i / points) * Math.PI * 2;
    const base = 0.5 + 0.35 * Math.sin(t * (count / 4));
    const harmonic = 0.12 * Math.sin(t * (count / 2) + 0.9);
    const noise = 0.06 * Math.sin(t * count + i * 0.7);
    return Math.max(0.08, Math.min(0.96, base + harmonic + noise));
  });
}

function buildLanes(): SkillLane[] {
  return skillGroups.map((group, idx) => ({
    label: group.title,
    color: idx === 0 ? "var(--phosphor)" : "var(--copper)",
    signal: buildSignal(group.items),
  }));
}

const LANES = buildLanes();

/* SVG waveform path from signal array */
function signalToPath(signal: number[], w: number, h: number): string {
  const padding = h * 0.08;
  const usable = h - padding * 2;
  return signal
    .map((v, i) => {
      const x = (i / (signal.length - 1)) * w;
      const y = padding + (1 - v) * usable;
      return `${i === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`;
    })
    .join(" ");
}

function OscilloscopeLane({
  lane,
  active,
  onActivate,
  reduced,
}: {
  lane: SkillLane;
  active: boolean;
  onActivate: () => void;
  reduced: boolean;
}) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [size, setSize] = useState({ w: 600, h: 72 });

  useEffect(() => {
    if (!svgRef.current) return;
    const observer = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      setSize({ w: width, h: height });
    });
    observer.observe(svgRef.current);
    return () => observer.disconnect();
  }, []);

  const path = signalToPath(lane.signal, size.w, size.h);

  return (
    <div>
      {/* Lane button */}
      <button
        onClick={onActivate}
        className="w-full text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--phosphor)]"
        aria-expanded={active}
        aria-label={`${lane.label} skills`}
      >
        <div
          className="overflow-hidden transition-colors duration-150"
          style={{
            border: `1px solid ${active ? lane.color : "var(--line)"}`,
            borderLeft: `2px solid ${lane.color}`,
            background: active
              ? `rgb(var(--void-raised-rgb) / 0.9)`
              : "rgb(var(--void-rgb) / 0.5)",
            borderRadius: "2px",
          }}
        >
          {/* Channel header */}
          <div
            className="flex items-center justify-between px-3 py-2"
            style={{ borderBottom: `1px solid var(--line)` }}
          >
            <div className="flex items-center gap-2">
              {/* Dot dims with trace — purely decorative, not text */}
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: lane.color, opacity: active ? 1 : 0.35 }}
              />
              {/* Label text: always full graphite — contrast-safe regardless of active state */}
              <span
                className="font-mono text-[10px] uppercase tracking-[0.22em]"
                style={{ color: "var(--graphite)" }}
              >
                {lane.label}
              </span>
            </div>
            {/* ch label: always full graphite */}
            <span
              className="font-mono text-[9px] uppercase tracking-[0.14em]"
              style={{ color: "var(--graphite)" }}
            >
              ch{String(LANES.indexOf(lane) + 1).padStart(2, "0")}
            </span>
          </div>

          {/* Waveform SVG */}
          <div className="relative h-16">
            <svg
              ref={svgRef}
              className="absolute inset-0 h-full w-full"
              viewBox={`0 0 ${size.w} ${size.h}`}
              preserveAspectRatio="none"
              role="presentation"
            >
              {/* Oscilloscope background grid */}
              {[0.25, 0.5, 0.75].map((y) => (
                <line
                  key={y}
                  x1={0}
                  y1={y * size.h}
                  x2={size.w}
                  y2={y * size.h}
                  stroke={`rgb(var(--copper-rgb) / 0.12)`}
                  strokeWidth="1"
                />
              ))}
              {[0.25, 0.5, 0.75].map((x) => (
                <line
                  key={x}
                  x1={x * size.w}
                  y1={0}
                  x2={x * size.w}
                  y2={size.h}
                  stroke={`rgb(var(--copper-rgb) / 0.12)`}
                  strokeWidth="1"
                />
              ))}

              {/* Trace — phosphor for active, copper for inactive */}
              {reduced ? (
                <path
                  d={path}
                  stroke={lane.color}
                  strokeWidth="1.5"
                  fill="none"
                  opacity={active ? 1 : 0.3}
                />
              ) : (
                <motion.path
                  d={path}
                  stroke={lane.color}
                  strokeWidth="1.5"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  opacity={active ? 1 : 0.3}
                />
              )}

              {/* Area fill under active trace */}
              {active && (
                <path
                  d={`${path} L ${size.w} ${size.h} L 0 ${size.h} Z`}
                  fill={lane.color}
                  opacity={0.04}
                />
              )}
            </svg>
          </div>
        </div>
      </button>

      {/* Revealed tools — folded in on hover/tap */}
      {active && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="overflow-hidden"
        >
          <div
            className="flex flex-wrap gap-1.5 p-3"
            style={{
              border: "1px solid var(--line)",
              borderTop: "none",
              background: "rgb(var(--void-raised-rgb) / 0.6)",
              borderRadius: "0 0 2px 2px",
            }}
          >
            {skillGroups.find((g) => g.title === lane.label)?.items.map((skill) => (
              <span
                key={skill}
                className="font-mono text-[10px]"
                style={{
                  border: "1px solid var(--line)",
                  color: "var(--vellum-dim)",
                  padding: "3px 8px",
                  borderRadius: "2px",
                }}
              >
                {skill}
              </span>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}

export function SkillsConstellation() {
  const [activeLane, setActiveLane] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  return (
    <section id="skills" className="section-layer-recessed relative py-24">
      <div className="section-shell">
        {/* Header */}
        <div className="mb-10 grid gap-6 lg:grid-cols-[0.5fr_0.5fr] lg:items-end">
          <div>
            <p
              className="font-mono text-[10px] uppercase tracking-[0.28em]"
              style={{ color: "var(--graphite)" }}
            >
              skills readout
            </p>
            <h2
              className="mt-3 font-display"
              style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)", fontWeight: 400, color: "var(--vellum)" }}
            >
              Technical depth across AI and production software.
            </h2>
          </div>
          <div>
            <p className="text-sm leading-6" style={{ color: "var(--graphite)" }}>
              Multi-channel oscilloscope readout — each lane represents a skill category.
              Waveform amplitude encodes experience depth. Tap a channel to inspect the stack.
            </p>
            <p
              className="mt-2 font-mono text-[9px] uppercase tracking-[0.14em]"
              style={{ color: "var(--graphite)", opacity: 0.6 }}
            >
              Signal amplitudes derived from skill depth and project usage
            </p>
          </div>
        </div>

        {/* Oscilloscope frame */}
        <div
          className="overflow-hidden"
          style={{
            border: "1px solid var(--line)",
            borderRadius: "2px",
          }}
        >
          {/* Instrument header bar */}
          <div
            className="flex items-center justify-between px-4 py-2"
            style={{
              borderBottom: "1px solid var(--line)",
              background: "rgb(var(--void-rgb) / 0.8)",
            }}
          >
            <span
              className="font-mono text-[10px] uppercase tracking-[0.22em]"
              style={{ color: "var(--graphite)" }}
            >
              osc.readout — {LANES.length}ch
            </span>
            <div className="flex items-center gap-3">
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: "var(--copper)" }}
              />
              <span className="font-mono text-[9px]" style={{ color: "var(--graphite)" }}>
                signal.active
              </span>
            </div>
          </div>

          {/* Lane grid */}
          <div
            className="p-4 grid gap-2"
            style={{ background: "rgb(var(--void-raised-rgb) / 0.5)" }}
          >
            {LANES.map((lane, idx) => (
              <OscilloscopeLane
                key={lane.label}
                lane={lane}
                active={activeLane === idx}
                onActivate={() => setActiveLane(activeLane === idx ? -1 : idx)}
                reduced={reduced}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
