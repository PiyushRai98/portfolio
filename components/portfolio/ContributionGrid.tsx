"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface ContributionDay {
  date: string;
  contributionCount: number;
  color: string;
}

interface ContributionWeek {
  contributionDays: ContributionDay[];
}

interface ContributionCalendar {
  totalContributions: number;
  weeks: ContributionWeek[];
}

// Map a contribution count to a visual intensity level (0–4)
function countToLevel(count: number): number {
  if (count === 0) return 0;
  if (count <= 2) return 1;
  if (count <= 5) return 2;
  if (count <= 9) return 3;
  return 4;
}

// Map level to theme-token style — matches the cyan/violet/amber system
function levelToStyle(level: number): { background: string; boxShadow: string } {
  switch (level) {
    case 0:
      return {
        background: "rgb(var(--text-primary-rgb) / 0.04)",
        boxShadow: "none",
      };
    case 1:
      return {
        background: "rgb(var(--accent-violet-rgb) / 0.28)",
        boxShadow: "none",
      };
    case 2:
      return {
        background: "rgb(var(--accent-violet-rgb) / 0.52)",
        boxShadow: "none",
      };
    case 3:
      return {
        background: "rgb(var(--accent-cyan-rgb) / 0.55)",
        boxShadow: "0 0 10px rgb(var(--accent-cyan-rgb) / 0.22)",
      };
    case 4:
      return {
        background: "rgb(var(--accent-cyan-rgb) / 0.88)",
        boxShadow: "0 0 18px rgb(var(--accent-cyan-rgb) / 0.42)",
      };
    default:
      return { background: "transparent", boxShadow: "none" };
  }
}

// Skeleton for loading state — same grid dimensions, no flash
function GridSkeleton() {
  return (
    <div className="w-full overflow-x-auto">
      <div className="flex gap-[3px]" style={{ minWidth: "max-content" }}>
        {Array.from({ length: 53 }).map((_, wi) => (
          <div key={wi} className="flex flex-col gap-[3px]">
            {Array.from({ length: 7 }).map((_, di) => (
              <div
                key={di}
                className="h-[11px] w-[11px] rounded-[2px] animate-pulse"
                style={{ background: "rgb(var(--text-primary-rgb) / 0.06)" }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function ContributionGrid() {
  const [calendar, setCalendar] = useState<ContributionCalendar | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("/api/github-contributions")
      .then((r) => {
        if (!r.ok) throw new Error("API error");
        return r.json();
      })
      .then((data) => {
        if (data.error) throw new Error(data.error);
        setCalendar(data);
      })
      .catch(() => setError(true));
  }, []);

  if (error) {
    // Graceful fallback — keeps layout intact
    return (
      <p className="font-mono text-xs text-muted">
        Could not load contribution data. Check GITHUB_TOKEN in .env.local.
      </p>
    );
  }

  if (!calendar) {
    return <GridSkeleton />;
  }

  const { weeks, totalContributions } = calendar;

  // Day-of-week labels (Sun=0 … Sat=6)
  const dayLabels = ["Sun", "", "Tue", "", "Thu", "", "Sat"];

  // Month labels — find the first week of each month
  const monthLabels: { label: string; weekIndex: number }[] = [];
  weeks.forEach((week, wi) => {
    const firstDay = week.contributionDays[0];
    if (!firstDay) return;
    const date = new Date(firstDay.date);
    if (date.getDate() <= 7) {
      monthLabels.push({
        label: date.toLocaleString("en", { month: "short" }),
        weekIndex: wi,
      });
    }
  });

  return (
    <div className="space-y-2">
      {/* Total count badge */}
      <div className="flex items-center justify-between">
        <p className="font-mono text-xs text-muted">
          <span className="text-silver">{totalContributions.toLocaleString()}</span> contributions in the last year
        </p>
        {/* Legend */}
        <div className="flex items-center gap-1.5">
          <span className="font-mono text-[10px] text-muted">Less</span>
          {[0, 1, 2, 3, 4].map((l) => {
            const s = levelToStyle(l);
            return (
              <div
                key={l}
                className="h-[10px] w-[10px] rounded-[2px] border border-white/8"
                style={{ background: s.background }}
              />
            );
          })}
          <span className="font-mono text-[10px] text-muted">More</span>
        </div>
      </div>

      {/* Grid */}
      <div className="w-full overflow-x-auto thin-scrollbar pb-1">
        <div style={{ minWidth: "max-content" }}>
          {/* Month labels row */}
          <div className="mb-1 flex gap-[3px] pl-8">
            {weeks.map((_, wi) => {
              const label = monthLabels.find((m) => m.weekIndex === wi);
              return (
                <div key={wi} className="w-[11px]">
                  {label && (
                    <span className="font-mono text-[9px] text-muted whitespace-nowrap">
                      {label.label}
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Day label + week columns */}
          <div className="flex gap-[3px]">
            {/* Day-of-week labels */}
            <div className="mr-1 flex flex-col gap-[3px]">
              {dayLabels.map((d, i) => (
                <div key={i} className="flex h-[11px] items-center">
                  <span className="w-7 font-mono text-[9px] text-muted">{d}</span>
                </div>
              ))}
            </div>

            {/* Week columns */}
            {weeks.map((week, wi) => (
              <div key={wi} className="flex flex-col gap-[3px]">
                {/* Pad incomplete first/last weeks so the grid aligns to Sun */}
                {Array.from({ length: 7 }).map((_, di) => {
                  const day = week.contributionDays[di];
                  if (!day) {
                    return (
                      <div
                        key={di}
                        className="h-[11px] w-[11px] rounded-[2px]"
                        style={{ background: "transparent" }}
                      />
                    );
                  }
                  const level = countToLevel(day.contributionCount);
                  const style = levelToStyle(level);
                  return (
                    <motion.div
                      key={day.date}
                      title={`${day.date} — ${day.contributionCount} contribution${day.contributionCount !== 1 ? "s" : ""}`}
                      initial={{ opacity: 0, scale: 0.7 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.18, delay: (wi * 7 + di) * 0.001 }}
                      className="h-[11px] w-[11px] rounded-[2px] border border-white/[0.06] cursor-default"
                      style={{
                        background: style.background,
                        boxShadow: style.boxShadow,
                      }}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
