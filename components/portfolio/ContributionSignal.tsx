"use client";

import { motion } from "framer-motion";
import { Github, GitPullRequestArrow } from "lucide-react";
import { profile } from "./data";
import { Button } from "@/components/ui/button";
import { ContributionGrid } from "./ContributionGrid";
import { RecentRepos } from "./RecentRepos";

export function ContributionSignal() {
  return (
    <section id="signal" className="section-shell section-layer-base py-24">
      <div
        className="overflow-hidden"
        style={{ border: "1px solid var(--line)", borderRadius: "2px" }}
      >
        {/* Header row */}
        <div className="grid gap-0 lg:grid-cols-[0.42fr_0.58fr]">
          {/* Left */}
          <div
            className="p-6 border-b lg:border-b-0 lg:border-r"
            style={{ borderColor: "var(--line)" }}
          >
            <p
              className="font-mono text-[10px] uppercase tracking-[0.28em]"
              style={{ color: "var(--graphite)" }}
            >
              open-source
            </p>
            <h2
              className="mt-3 font-display"
              style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)", fontWeight: 400, color: "var(--vellum)" }}
            >
              Contribution graph with engineering context.
            </h2>
            <p className="mt-4 text-sm leading-6" style={{ color: "var(--graphite)" }}>
              GirlScript Summer of Code 2026 — AI features, production REST APIs,
              scalable MERN apps, GitHub Actions CI/CD, LangChain, and Agile collaboration.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Button variant="secondary" asChild>
                <a href={profile.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2">
                  <Github className="h-4 w-4" />
                  GitHub Profile
                </a>
              </Button>
              <Button variant="ghost" asChild>
                <a href="#experience" className="inline-flex items-center gap-2">
                  <GitPullRequestArrow className="h-4 w-4" />
                  Timeline
                </a>
              </Button>
            </div>
          </div>

          {/* Right: contribution grid — quiet treatment */}
          <div
            className="p-6 border-b"
            style={{ borderColor: "var(--line)" }}
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
            >
              <ContributionGrid />
            </motion.div>

            {/* Contribution highlights — quiet, no accent color */}
            <div className="mt-5 grid gap-2 sm:grid-cols-3">
              {[
                ["AI features", "LangChain and LLM workflows"],
                ["REST APIs", "Production backend interfaces"],
                ["CI/CD", "GitHub Actions automation"],
              ].map(([title, body]) => (
                <div
                  key={title}
                  className="p-4"
                  style={{
                    border: "1px solid var(--line)",
                    background: "rgb(var(--void-raised-rgb) / 0.6)",
                    borderRadius: "2px",
                  }}
                >
                  <p className="font-mono text-xs font-medium" style={{ color: "var(--vellum-dim)" }}>{title}</p>
                  <p className="mt-1 text-xs" style={{ color: "var(--graphite)" }}>{body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent repos — calm strip, void-raised cards, line borders */}
        <div className="p-6">
          <RecentRepos />
        </div>
      </div>
    </section>
  );
}
