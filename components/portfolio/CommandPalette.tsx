"use client";

import { useEffect, useState } from "react";
import { Command } from "cmdk";
import { Search, X } from "lucide-react";
import { commandLinks } from "./data";

export function CommandPalette() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (event: KeyboardEvent) => {
      if ((event.key === "k" && (event.metaKey || event.ctrlKey)) || event.key === "/") {
        event.preventDefault();
        setOpen((value) => !value);
      }
      if (event.key === "Escape") {
        setOpen(false);
      }
    };
    const openPalette = () => setOpen(true);

    document.addEventListener("keydown", down);
    window.addEventListener("open-command-palette", openPalette);
    return () => {
      document.removeEventListener("keydown", down);
      window.removeEventListener("open-command-palette", openPalette);
    };
  }, []);

  const runCommand = (target: string) => {
    setOpen(false);
    document.querySelector(target)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      {/* Keyboard shortcut hint */}
      <button
        aria-label="Open command palette (Ctrl+K)"
        onClick={() => setOpen(true)}
        className="fixed bottom-5 right-5 z-50 hidden items-center gap-2 px-3 py-2 font-mono text-xs transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--phosphor)] sm:inline-flex"
        style={{
          border: "1px solid var(--line)",
          background: "rgb(var(--void-raised-rgb) / 0.9)",
          color: "var(--graphite)",
          borderRadius: "2px",
          backdropFilter: "blur(8px)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = "rgb(var(--phosphor-rgb) / 0.4)";
          e.currentTarget.style.color = "var(--vellum)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "var(--line)";
          e.currentTarget.style.color = "var(--graphite)";
        }}
      >
        <Search className="h-3.5 w-3.5" />
        <span>Ctrl+K</span>
      </button>

      {open ? (
        <div
          className="fixed inset-0 z-[80] flex items-start justify-center px-4 pt-24"
          style={{ background: "rgb(var(--void-rgb) / 0.9)", backdropFilter: "blur(12px)" }}
        >
          <Command
            className="w-full max-w-xl overflow-hidden"
            style={{
              border: "1px solid var(--line)",
              background: "rgb(var(--void-raised-rgb))",
              borderRadius: "2px",
            }}
          >
            <div
              className="flex items-center gap-3 px-4"
              style={{ borderBottom: "1px solid var(--line)" }}
            >
              <Search className="h-4 w-4 shrink-0" style={{ color: "var(--graphite)" }} />
              <Command.Input
                autoFocus
                placeholder="Navigate portfolio…"
                className="h-12 flex-1 bg-transparent font-mono text-sm outline-none"
                style={{ color: "var(--vellum)" }}
              />
              <button
                aria-label="Close command palette"
                className="flex h-7 w-7 items-center justify-center transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--phosphor)]"
                style={{
                  border: "1px solid var(--line)",
                  color: "var(--graphite)",
                  borderRadius: "2px",
                }}
                onClick={() => setOpen(false)}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--vellum)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--graphite)")}
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
            <Command.List
              className="thin-scrollbar max-h-[380px] overflow-y-auto p-2"
              style={{ color: "var(--vellum-dim)" }}
            >
              <Command.Empty className="px-3 py-8 text-center font-mono text-xs" style={{ color: "var(--graphite)" }}>
                No matching module.
              </Command.Empty>
              <Command.Group
                heading="Navigate"
                className="[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-[0.2em]"
                style={{ "--cmdk-group-heading-color": "var(--graphite)" } as React.CSSProperties}
              >
                {commandLinks.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Command.Item
                      key={item.label}
                      value={item.label}
                      onSelect={() => runCommand(item.target)}
                      className="flex items-center gap-3 px-3 py-2.5 font-mono text-sm outline-none transition-colors duration-150 cursor-pointer"
                      style={{ borderRadius: "2px" }}
                    >
                      <Icon className="h-3.5 w-3.5 shrink-0" style={{ color: "var(--copper)" }} />
                      {item.label}
                    </Command.Item>
                  );
                })}
              </Command.Group>
            </Command.List>
          </Command>
        </div>
      ) : null}
    </>
  );
}
