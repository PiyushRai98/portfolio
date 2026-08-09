"use client";

import { useEffect, useState } from "react";

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

function countToLevel(count: number): number {
  if (count === 0) return 0;
  if (count <= 2) return 1;
  if (count <= 5) return 2;
  if (count <= 9) return 3;
  return 4;
}

/**
 * Copper for low-intensity cells, phosphor for highest-intensity only.
 * Per brief: draws eye to recent activity without glow effects.
 */
function levelToStyle(level: number): { background: string } {
  switch (level) {
    case 0:
      return { background: "rgb(var(--void-raised-rgb))" };
    case 1:
      return { background: "rgb(var(--copper-rgb) / 0.22)" };
    case 2:
      return { background: "rgb(var(--copper-rgb) / 0.45)" };
    case 3:
      return { background: "rgb(var(--copper-rgb) / 0.72)" };
    case 4:
      return { background: "rgb(var(--phosphor-rgb) / 0.85)" };
    default:
      return { background: "transparent" };
  }
}

function GridSkeleton() {
  return (
    <div className="w-full overflow-x-auto">
      <div className="flex gap-[3px]" style={{ minWidth: "max-content" }}>
        {Array.from({ length: 53 }).map((_, wi) => (
          <div key={wi} className="flex flex-col gap-[3px]">
            {Array.from({ length: 7 }).map((_, di) => (
              <div
                key={di}
                className="h-[11px] w-[11px]"
                style={{ background: "rgb(var(--line-rgb) / 0.3)", borderRadius: "1px", animation: "pulse 2s infinite" }}
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
    // Client-side timeout — show error if the API takes more than 10s
    const giveUp = setTimeout(() => setError(true), 10_000);

    fetch("/api/github-contributions")
      .then((r) => {
        if (!r.ok) throw new Error("API error");
        return r.json();
      })
      .then((data: ContributionCalendar & { error?: string }) => {
        clearTimeout(giveUp);
        if (data.error) throw new Error(data.error);
        setCalendar(data);
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
        Could not load contribution data. Check GITHUB_TOKEN in .env.local.
      </p>
    );
  }

  if (!calendar) {
    return <GridSkeleton />;
  }

  const { weeks, totalContributions } = calendar;
  const dayLabels = ["Sun", "", "Tue", "", "Thu", "", "Sat"];

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
      {/* Summary + legend row */}
      <div className="flex items-center justify-between">
        <p className="font-mono text-[10px]" style={{ color: "var(--graphite)" }}>
          <span style={{ color: "var(--vellum)" }}>{totalContributions.toLocaleString()}</span>
          {" "}contributions · last year
        </p>
        <div className="flex items-center gap-1.5">
          <span className="font-mono text-[9px]" style={{ color: "var(--graphite)" }}>Less</span>
          {[0, 1, 2, 3, 4].map((l) => (
            <div
              key={l}
              className="h-[10px] w-[10px]"
              style={{ ...levelToStyle(l), border: "1px solid var(--line)", borderRadius: "1px" }}
            />
          ))}
          <span className="font-mono text-[9px]" style={{ color: "var(--graphite)" }}>More</span>
        </div>
      </div>

      {/* Heatmap grid */}
      <div className="w-full overflow-x-auto thin-scrollbar pb-1">
        <div style={{ minWidth: "max-content" }}>
          {/* Month labels */}
          <div className="mb-1 flex gap-[3px] pl-8">
            {weeks.map((_, wi) => {
              const label = monthLabels.find((m) => m.weekIndex === wi);
              return (
                <div key={wi} className="w-[11px]">
                  {label && (
                    <span
                      className="font-mono text-[9px] whitespace-nowrap"
                      style={{ color: "var(--graphite)" }}
                    >
                      {label.label}
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Rows */}
          <div className="flex gap-[3px]">
            {/* Day-of-week labels */}
            <div className="mr-1 flex flex-col gap-[3px]">
              {dayLabels.map((d, i) => (
                <div key={i} className="flex h-[11px] items-center">
                  <span className="w-7 font-mono text-[9px]" style={{ color: "var(--graphite)" }}>
                    {d}
                  </span>
                </div>
              ))}
            </div>

            {/* Week columns */}
            {weeks.map((week, wi) => (
              <div key={wi} className="flex flex-col gap-[3px]">
                {Array.from({ length: 7 }).map((_, di) => {
                  const day = week.contributionDays[di];
                  if (!day) {
                    return (
                      <div
                        key={di}
                        className="h-[11px] w-[11px]"
                        style={{ background: "transparent", borderRadius: "1px" }}
                      />
                    );
                  }
                  const level = countToLevel(day.contributionCount);
                  const style = levelToStyle(level);
                  return (
                    <div
                      key={day.date}
                      title={`${day.date} — ${day.contributionCount} contribution${day.contributionCount !== 1 ? "s" : ""}`}
                      className="h-[11px] w-[11px] cursor-default"
                      style={{ ...style, border: "1px solid var(--line)", borderRadius: "1px" }}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Last updated timestamp */}
      <p
        className="font-mono text-[9px] uppercase tracking-[0.14em]"
        style={{ color: "var(--graphite)", opacity: 0.6 }}
      >
        Last updated · {new Date().toLocaleDateString("en", { month: "short", year: "numeric" })}
      </p>
    </div>
  );
}
