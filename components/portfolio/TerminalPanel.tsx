"use client";

import { useEffect, useState } from "react";
import { Terminal, Wifi } from "lucide-react";

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

  useEffect(() => {
    let index = 0;
    const interval = window.setInterval(() => {
      setVisible((current) => [...current.slice(-8), lines[index % lines.length]]);
      index += 1;
    }, 1150);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <section id="terminal" className="section-shell section-layer-base py-24">
      <div className="grid gap-6 lg:grid-cols-[0.55fr_0.45fr] lg:items-center">
        <div className="shell-border overflow-hidden rounded-[8px]">
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
            <div className="flex items-center gap-2">
              <Terminal className="h-5 w-5 text-cyan" />
              <span className="font-mono text-sm text-silver">live-coding-terminal</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-cyan">
              <Wifi className="h-4 w-4" />
              streaming
            </div>
          </div>
          <div className="min-h-[360px] bg-recessed p-5 font-mono text-sm leading-7">
            <p className="text-sapphire">piyush@ai-os:~$ npm run build-intelligence</p>
            {visible.map((line, index) => (
              <p key={`${line}-${index}`} className="text-silver">
                <span className="text-cyan">[{String(index + 1).padStart(2, "0")}]</span> {line}
              </p>
            ))}
            <p className="mt-3 inline-flex border-r border-cyan pr-1 text-cyan animate-pulse">awaiting next system...</p>
          </div>
        </div>

        <div>
          <h2 className="font-display text-4xl font-semibold text-silver md:text-5xl">
            Live system telemetry
          </h2>
          <p className="mt-4 text-base leading-7 text-muted">
            Terminal telemetry, contribution signals, and project diagrams — the portfolio behaves like an active workspace.
          </p>
        </div>
      </div>
    </section>
  );
}
