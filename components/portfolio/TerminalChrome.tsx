/**
 * TerminalChrome — shared instrument panel terminal shell.
 *
 * Used by both AssistantPanel and TerminalPanel to ensure consistent chrome.
 * - --void-raised background
 * - --line border, 2px radius
 * - Copper status dots in title bar
 * - Mono type throughout
 * - --phosphor for active cursor and send/interactive elements only
 */
import type { ReactNode } from "react";

type TerminalChromeProps = {
  title: string;
  statusLabel?: string;
  children: ReactNode;
  className?: string;
};

export function TerminalChrome({ title, statusLabel, children, className = "" }: TerminalChromeProps) {
  return (
    <div
      className={`overflow-hidden ${className}`}
      style={{
        border: "1px solid var(--line)",
        background: "rgb(var(--void-raised-rgb) / 0.95)",
        borderRadius: "2px",
      }}
    >
      {/* Title bar */}
      <div
        className="relative flex items-center justify-between px-4 py-3"
        style={{ borderBottom: "1px solid var(--line)" }}
      >
        {/* Copper status dots — informational */}
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full" style={{ background: "var(--copper)", opacity: 0.7 }} />
          <span className="h-2 w-2 rounded-full" style={{ background: "var(--copper)", opacity: 0.45 }} />
          <span className="h-2 w-2 rounded-full" style={{ background: "var(--copper)", opacity: 0.25 }} />
        </div>
        {/* Title — centered */}
        <span
          className="absolute left-1/2 -translate-x-1/2 font-mono text-xs"
          style={{ color: "var(--graphite)" }}
        >
          {title}
        </span>
        {/* Status label */}
        {statusLabel ? (
          <span
            className="font-mono text-[10px]"
            style={{ color: "var(--graphite)" }}
          >
            {statusLabel}
          </span>
        ) : (
          <span />
        )}
      </div>

      {/* Content */}
      {children}
    </div>
  );
}
