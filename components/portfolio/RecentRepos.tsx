"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { GitFork, Star, ExternalLink } from "lucide-react";
import type { GithubRepo } from "@/app/api/github-repos/route";

// Language → accent colour mapping
const LANG_COLOR: Record<string, string> = {
  TypeScript: "rgb(var(--accent-sapphire-rgb))",
  JavaScript: "rgb(var(--accent-amber-rgb))",
  Python: "rgb(var(--accent-cyan-rgb))",
  "C++": "rgb(var(--accent-violet-rgb))",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Shell: "rgb(var(--text-muted-rgb))",
};

function langColor(lang: string | null): string {
  return lang ? (LANG_COLOR[lang] ?? "rgb(var(--text-muted-rgb))") : "rgb(var(--text-primary-rgb) / 0.18)";
}

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

// Card skeleton
function RepoSkeleton() {
  return (
    <div className="rounded-[8px] border border-white/10 bg-elevated p-4 space-y-3 animate-pulse">
      <div className="h-3 w-2/3 rounded bg-white/10" />
      <div className="h-2.5 w-full rounded bg-white/6" />
      <div className="h-2.5 w-4/5 rounded bg-white/6" />
      <div className="mt-4 flex gap-3">
        <div className="h-2 w-10 rounded bg-white/8" />
        <div className="h-2 w-12 rounded bg-white/8" />
      </div>
    </div>
  );
}

export function RecentRepos() {
  const [repos, setRepos] = useState<GithubRepo[] | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("/api/github-repos")
      .then((r) => {
        if (!r.ok) throw new Error("API error");
        return r.json();
      })
      .then((data) => {
        if (data.error) throw new Error(data.error);
        setRepos(data);
      })
      .catch(() => setError(true));
  }, []);

  if (error) {
    return (
      <p className="font-mono text-xs text-muted">
        Could not load repository data.
      </p>
    );
  }

  return (
    <div className="mt-8">
      <p className="mb-4 font-mono text-xs uppercase tracking-[0.22em] text-muted">
        recent repos
      </p>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {repos === null
          ? Array.from({ length: 6 }).map((_, i) => <RepoSkeleton key={i} />)
          : repos.map((repo, i) => (
              <motion.a
                key={repo.name}
                href={repo.url}
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
                className="group magnetic flex flex-col rounded-[8px] border border-white/10 bg-elevated p-4 transition hover:border-cyan/30 hover:shadow-glow"
              >
                <div className="flex items-start justify-between gap-2">
                  <p className="font-display text-sm font-semibold text-silver group-hover:text-cyan transition-colors line-clamp-1">
                    {repo.name}
                  </p>
                  <ExternalLink className="h-3.5 w-3.5 shrink-0 text-muted opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                <p className="mt-2 flex-1 text-xs leading-5 text-muted line-clamp-2">
                  {repo.description ?? "No description provided."}
                </p>

                {repo.topics.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {repo.topics.slice(0, 4).map((t) => (
                      <span
                        key={t}
                        className="rounded-[4px] border border-white/10 px-2 py-0.5 font-mono text-[10px] text-muted"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}

                <div className="mt-4 flex items-center gap-4 font-mono text-[10px] text-muted">
                  {repo.language && (
                    <span className="flex items-center gap-1.5">
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{ background: langColor(repo.language) }}
                      />
                      {repo.language}
                    </span>
                  )}
                  {repo.stars > 0 && (
                    <span className="flex items-center gap-1">
                      <Star className="h-3 w-3" />
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
