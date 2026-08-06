"use client";

import { BrainCircuit, Github, Linkedin, Mail, Search } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { profile } from "./data";

const navItems = [
  ["Projects", "#projects"],
  ["Skills", "#skills"],
  ["Signal", "#signal"],
  ["Contact", "#contact"],
] as const;

export function MagneticNav() {
  const openCommandPalette = () => {
    window.dispatchEvent(new Event("open-command-palette"));
  };

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="fixed left-0 right-0 top-4 z-50 px-4"
    >
      <nav className="section-shell shell-border flex h-14 items-center justify-between rounded-[8px] px-3">
        <a href="#home" className="magnetic flex items-center gap-2 rounded-[8px] px-2 py-2">
          <span className="grid h-8 w-8 place-items-center rounded-[8px] border border-cyan/30 bg-cyan/10 text-cyan shadow-glow">
            <BrainCircuit className="h-4 w-4" />
          </span>
          <span className="hidden font-mono text-sm font-semibold tracking-[0.18em] text-silver sm:inline">
            PIYUSH.DEV
          </span>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {navItems.map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="rounded-[8px] px-3 py-2 text-sm text-muted transition hover:bg-white/[0.06] hover:text-silver"
            >
              {label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" aria-label="Open command palette" onClick={openCommandPalette}>
            <Search className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" aria-label="GitHub" asChild>
            <a href={profile.github} target="_blank" rel="noreferrer">
              <Github className="h-4 w-4" />
            </a>
          </Button>
          <Button variant="ghost" size="icon" aria-label="LinkedIn" asChild>
            <a href={profile.linkedin} target="_blank" rel="noreferrer">
              <Linkedin className="h-4 w-4" />
            </a>
          </Button>
          <Button variant="primary" size="sm" asChild className="hidden sm:inline-flex">
            <a href={`mailto:${profile.email}`}>
              <Mail className="h-4 w-4" />
              Contact
            </a>
          </Button>
        </div>
      </nav>
    </motion.header>
  );
}
