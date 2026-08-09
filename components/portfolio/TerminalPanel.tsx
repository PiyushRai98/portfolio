"use client";

import { useEffect, useRef, useState } from "react";
import { TerminalChrome } from "./TerminalChrome";

const lines = [
  "boot pkr-ai-os --mode recruiter",
  "loading generative-ai.modules ... done",
  "mounting rag.pipeline /vector/faiss /vector/pinecone",
  "orchestrating agents: planner, retriever, evaluator, tool-router",
  "opening socket channel for collaborative editor",
  "running ci: github-actions --status merged-prs",
  "deploy target: production-grade ai systems",
];

export function TerminalPanel() {
  const [visible, setVisible] = useState<string[]>([]);
  const endRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setVisible(lines);
      return;
    }
    let index = 0;
    const interval = window.setInterval(() => {
      setVisible((current) => [...current.slice(-8), lines[index % lines.length]]);
      index += 1;
    }, 1150);
    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    // Only scroll the terminal's internal container, not the page
    if (endRef.current) {
      const container = endRef.current.closest(".thin-scrollbar");
      if (container) {
        container.scrollTop = container.scrollHeight;
      }
    }
  }, [visible]);

  return (
    <section id="terminal" className="section-shell section-layer-base py-16">
      <div className="grid gap-8 lg:grid-cols-[0.55fr_0.45fr] lg:items-center">

        {/* Terminal — reuses the shared TerminalChrome component */}
        <TerminalChrome title="live-coding-terminal" statusLabel="streaming">
          <div
            className="thin-scrollbar min-h-[340px] overflow-y-auto p-5 font-mono text-sm leading-7"
            style={{ background: "rgb(var(--void-rgb) / 0.85)" }}
          >
            {/* Prompt line — graphite, not accent */}
            <p style={{ color: "var(--graphite)" }}>
              piyush@ai-os:~${" "}
              <span style={{ color: "var(--vellum-dim)" }}>npm run build-intelligence</span>
            </p>

            {/* Output lines */}
            {visible.map((line, index) => (
              <p key={`${line}-${index}`} style={{ color: "var(--vellum-dim)" }}>
                <span style={{ color: "var(--graphite)" }}>
                  [{String(index + 1).padStart(2, "0")}]
                </span>{" "}
                {line}
              </p>
            ))}

            {/* Active cursor — phosphor (interactive/live indicator) */}
            <p
              ref={endRef}
              className="mt-3 inline-flex items-center gap-0"
              style={{ color: "var(--phosphor)" }}
            >
              <span
                className="inline-block w-2 h-4 align-middle"
                style={{
                  background: "var(--phosphor)",
                  animation: "cursor-blink 1.1s step-end infinite",
                }}
              />
            </p>
          </div>
        </TerminalChrome>

        {/* Right: copy */}
        <div>
          <p
            className="font-mono text-[10px] uppercase tracking-[0.28em]"
            style={{ color: "var(--graphite)" }}
          >
            live terminal
          </p>
          <h2
            className="mt-3 font-display"
            style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)", fontWeight: 400, color: "var(--vellum)" }}
          >
            The portfolio behaves like a developer cockpit.
          </h2>
          <p className="mt-4 text-sm leading-6" style={{ color: "var(--graphite)" }}>
            Terminal telemetry, command routing, contribution signals, and project diagrams
            create the feeling of an AI OS rather than a static page.
          </p>
        </div>
      </div>
    </section>
  );
}
