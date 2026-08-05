"use client";

import { useEffect, useState } from "react";
import { Command } from "cmdk";
import { Search, X } from "lucide-react";
import { commandLinks } from "./data";
import { Button } from "@/components/ui/button";

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
      <Button
        aria-label="Open command palette"
        variant="secondary"
        size="sm"
        onClick={() => setOpen(true)}
        className="fixed bottom-5 right-5 z-50 hidden border-cyan/25 bg-recessed font-mono sm:inline-flex"
      >
        <Search className="h-4 w-4" />
        Command
      </Button>

      {open ? (
        <div className="fixed inset-0 z-[80] flex items-start justify-center bg-base/90 px-4 pt-24 backdrop-blur-xl">
          <Command className="shell-border w-full max-w-2xl overflow-hidden rounded-[8px]">
            <div className="flex items-center gap-3 border-b border-white/10 px-4">
              <Search className="h-5 w-5 text-cyan" />
              <Command.Input
                autoFocus
                placeholder="Search portfolio systems..."
                className="h-14 flex-1 bg-transparent text-sm text-silver outline-none placeholder:text-muted"
              />
              <button
                aria-label="Close command palette"
                className="rounded-[8px] p-2 text-muted transition hover:bg-white/10 hover:text-silver"
                onClick={() => setOpen(false)}
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <Command.List className="thin-scrollbar max-h-[420px] overflow-y-auto p-2">
              <Command.Empty className="px-3 py-8 text-center text-sm text-muted">
                No matching module.
              </Command.Empty>
              <Command.Group heading="Navigation" className="text-xs text-muted [&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-2">
                {commandLinks.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Command.Item
                      key={item.label}
                      value={item.label}
                      onSelect={() => runCommand(item.target)}
                      className="flex items-center gap-3 rounded-[8px] px-3 py-3 text-sm text-silver outline-none transition data-[selected=true]:bg-cyan/12 data-[selected=true]:text-silver"
                    >
                      <Icon className="h-4 w-4 text-cyan" />
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
