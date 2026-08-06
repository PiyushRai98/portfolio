"use client";

import { motion } from "framer-motion";
import { Github, GitPullRequestArrow, Workflow } from "lucide-react";
import { profile } from "./data";
import { Button } from "@/components/ui/button";
import { ContributionGrid } from "./ContributionGrid";
import { RecentRepos } from "./RecentRepos";

export function ContributionSignal() {
  return (
    <section id="signal" className="section-shell section-layer-base py-24">
      <div className="shell-border overflow-hidden rounded-[8px]">
        {/* Header row */}
        <div className="grid gap-0 lg:grid-cols-[0.42fr_0.58fr]">
          <div className="border-b border-white/10 p-6 lg:border-b-0 lg:border-r">
            <p className="font-mono text-sm uppercase tracking-[0.18em] text-muted/60">open-source</p>
            <h2 className="mt-2 font-display text-4xl font-semibold text-silver md:text-5xl">
              GitHub contributions
            </h2>
            <p className="mt-5 text-base leading-7 text-muted">
              GirlScript Summer of Code 2026 work focused on AI features, production REST APIs,
              scalable MERN applications, GitHub Actions CI/CD, LangChain, and Agile collaboration.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button variant="secondary" asChild>
                <a href={profile.github} target="_blank" rel="noreferrer">
                  <Github className="h-4 w-4" />
                  GitHub Profile
                </a>
              </Button>
              <Button variant="ghost" asChild>
                <a href="#experience">
                  <GitPullRequestArrow className="h-4 w-4" />
                  Timeline
                </a>
              </Button>
            </div>
          </div>

          {/* Real contribution grid */}
          <div className="p-6">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <ContributionGrid />
            </motion.div>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {[
                ["AI features", "LangChain and LLM workflows"],
                ["REST APIs", "Production backend interfaces"],
                ["CI/CD", "GitHub Actions automation"],
              ].map(([title, body]) => (
                <div key={title} className="rounded-[8px] border border-white/10 bg-elevated p-4">
                  <Workflow className="h-5 w-5 text-cyan" />
                  <p className="mt-3 font-display text-lg font-semibold text-silver">{title}</p>
                  <p className="mt-1 text-sm text-muted">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent repos strip — full width below */}
        <div className="border-t border-white/10 p-6">
          <RecentRepos />
        </div>
      </div>
    </section>
  );
}
