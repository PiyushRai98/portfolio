"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Star } from "lucide-react";
import type { GithubRepo } from "@/app/api/github-repos/route";

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const days = Math.floor(diff / 86_400_000);
  if (days === 0) return "today";
  if (days === 1) return "yesterday";
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo ago`;
  return `${Math.floor(months / 12)}y ago`;
}

function RepoSkeleton() {
  return (
    <div
      className="space-y-3 p-4"
      style={{ border: "1px solid var(--line)", background: "rgb(var(--void-raised-rgb))", borderRadius: "2px" }}
    >
      <div className="h-3 w-2/3 rounded-none" style={{ background: "var(--line)" }} />
      <div className="h-2.5 w-full rounded-none" style={{ background: "var(--line)", opacity: 0.6 }} />
      <div className="h-2.5 w-4/5 rounded-none" style={{ background: "var(--line)", opacity: 0.6 }} />
    </div>
  );
}

export function RecentRepos() {
  const [repos, setRepos] = useState<GithubRepo[] | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const giveUp = setTimeout(() => setError(true), 10_000);

    fetch("/api/github-repos")
      .then((r) => {
        if (!r.ok) throw new Error("API error");
        return r.json();
      })
      .then((data) => {
        clearTimeout(giveUp);
        if (data.error) throw new Error(data.error);
        setRepos(data);
      })
      .catch(() => {
        clearTimeout(giveUp);
        setError(true);
      });

    return () => clearTimeout(giveUp);
  }, []);

  if (error) {
    return (
      <p className="font-mono text-[10px]" style={{ color: "var(--graphite)" }}>
        Could not load repository data.
      </p>
    );
  }

  return (
    <div>
      <p
        className="mb-3 font-mono text-[10px] uppercase tracking-[0.22em]"
        style={{ color: "var(--graphite)" }}
      >
        recent repos
      </p>
      <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
        {repos === null
          ? Array.from({ length: 6 }).map((_, i) => <RepoSkeleton key={i} />)
          : repos.map((repo, i) => (
              <motion.a
                key={repo.name}
                href={repo.url}
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.25, delay: i * 0.04 }}
                className="group flex flex-col p-4 transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--phosphor)]"
                style={{
                  border: "1px solid var(--line)",
                  background: "rgb(var(--void-raised-rgb) / 0.7)",
                  borderRadius: "2px",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgb(var(--copper-rgb) / 0.4)")}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--line)")}
              >
                <div className="flex items-start justify-between gap-2">
                  <p
                    className="font-mono text-xs font-medium line-clamp-1 transition-colors duration-150 group-hover:text-[var(--vellum)]"
                    style={{ color: "var(--vellum-dim)" }}
                  >
                    {repo.name}
                  </p>
                  <ExternalLink
                    className="h-3 w-3 shrink-0 transition-opacity opacity-0 group-hover:opacity-100"
                    style={{ color: "var(--graphite)" }}
                  />
                </div>

                <p className="mt-1.5 flex-1 text-xs leading-5 line-clamp-2" style={{ color: "var(--graphite)" }}>
                  {repo.description ?? "No description provided."}
                </p>

                {repo.topics.length > 0 && (
                  <div className="mt-2.5 flex flex-wrap gap-1">
                    {repo.topics.slice(0, 4).map((t) => (
                      <span
                        key={t}
                        className="font-mono text-[9px]"
                        style={{
                          border: "1px solid var(--line)",
                          color: "var(--graphite)",
                          padding: "2px 6px",
                          borderRadius: "1px",
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}

                <div className="mt-3 flex items-center gap-4 font-mono text-[9px]" style={{ color: "var(--graphite)" }}>
                  {repo.language && (
                    <span className="flex items-center gap-1">
                      <span
                        className="h-1.5 w-1.5 rounded-full"
                        style={{ background: "var(--copper)" }}
                      />
                      {repo.language}
                    </span>
                  )}
                  {repo.stars > 0 && (
                    <span className="flex items-center gap-1">
                      <Star className="h-2.5 w-2.5" />
                      {repo.stars}
                    </span>
                  )}
                  <span className="ml-auto">{timeAgo(repo.updatedAt)}</span>
                </div>
              </motion.a>
            ))}
      </div>
    </div>
  );
}
