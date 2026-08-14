"use client";

import { FileText, Search, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { ButtonLink } from "@/components/ui/button";
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
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed left-0 right-0 top-0 z-50"
    >
      <nav
        className="section-shell flex h-14 items-center justify-between px-4"
        style={{
          background: "rgb(var(--void-rgb) / 0.92)",
          borderBottom: "1px solid var(--line)",
          backdropFilter: "blur(16px)",
        }}
      >
        {/* Logo */}
        <a
          href="#home"
          className="font-mono text-sm font-medium tracking-[0.2em] transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--phosphor)]"
          style={{ color: "var(--vellum)" }}
        >
          PIYUSH.DEV
        </a>

        {/* Nav links */}
        <div className="hidden items-center gap-1 md:flex">
          {navItems.map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="relative px-3 py-2 font-mono text-sm transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--phosphor)] group"
              style={{ color: "var(--graphite)" }}
            >
              <span
                className="absolute bottom-1 left-3 right-3 h-px origin-left scale-x-0 transition-transform duration-150 group-hover:scale-x-100"
                style={{ background: "var(--phosphor)" }}
              />
              <span className="group-hover:text-[var(--phosphor)] transition-colors duration-150">
                {label}
              </span>
            </a>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            aria-label="Open command palette (Ctrl+K)"
            onClick={openCommandPalette}
            className="flex h-9 w-9 items-center justify-center transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--phosphor)]"
            style={{ color: "var(--graphite)", borderRadius: "2px" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--phosphor)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--graphite)")}
          >
            <Search className="h-4 w-4" />
          </button>
          <ButtonLink
            href={profile.resume}
            target="_blank"
            rel="noreferrer"
            variant="ghost"
            size="sm"
            className="hidden sm:inline-flex"
          >
            <FileText className="h-3.5 w-3.5" />
            Résumé
          </ButtonLink>
          <ButtonLink
            href={profile.mailtoLink}
            target="_blank"
            rel="noreferrer"
            size="sm"
            className="hidden sm:inline-flex"
          >
            <Mail className="h-3.5 w-3.5" />
            Contact
          </ButtonLink>
        </div>
      </nav>
    </motion.header>
  );
}
