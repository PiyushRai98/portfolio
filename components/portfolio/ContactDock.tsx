"use client";

import { Github, Linkedin, Mail, MapPin, Phone, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { profile } from "./data";

export function ContactDock() {
  return (
    <section id="contact" className="section-shell section-layer-recessed pb-24 pt-28">
      <div
        className="relative overflow-hidden p-6 md:p-10"
        style={{ border: "1px solid var(--line)", borderRadius: "2px" }}
      >
        {/* Faint PCB grid */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{
            backgroundImage: `
              linear-gradient(rgb(var(--copper-rgb)/1) 1px, transparent 1px),
              linear-gradient(90deg, rgb(var(--copper-rgb)/1) 1px, transparent 1px)
            `,
            backgroundSize: "32px 32px",
          }}
        />

        {/* Copper top-channel indicator */}
        <div
          className="absolute inset-x-0 top-0 h-0.5"
          style={{ background: "var(--copper)" }}
        />

        <div className="relative z-10 grid gap-8 lg:grid-cols-[0.58fr_0.42fr] lg:items-end">
          <div>
            <p
              className="font-mono text-[10px] uppercase tracking-[0.28em]"
              style={{ color: "var(--graphite)" }}
            >
              contact
            </p>
            {/* Large Instrument Serif headline — energy back up */}
            <h2
              className="mt-3 font-display max-w-2xl"
              style={{
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                fontWeight: 400,
                color: "var(--vellum)",
                lineHeight: 1.1,
              }}
            >
              Ready to build the next generation of AI products.
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-6" style={{ color: "var(--graphite)" }}>
              Available for AI engineering, full-stack software engineering, generative AI,
              RAG, agentic AI, and production backend opportunities.
            </p>
          </div>

          {/* Contact details + CTAs */}
          <div className="grid gap-2">
            {/* Email — phosphor on hover (interactive) */}
            <a
              href={`mailto:${profile.email}`}
              className="flex items-center gap-3 px-4 py-3 font-mono text-xs transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--phosphor)]"
              style={{
                border: "1px solid var(--line)",
                color: "var(--graphite)",
                borderRadius: "2px",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--phosphor)";
                e.currentTarget.style.borderColor = "rgb(var(--phosphor-rgb) / 0.35)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--graphite)";
                e.currentTarget.style.borderColor = "var(--line)";
              }}
            >
              <Mail className="h-4 w-4 shrink-0" style={{ color: "var(--copper)" }} />
              {profile.email}
            </a>

            <a
              href={`tel:${profile.phone.replace(/\s/g, "")}`}
              className="flex items-center gap-3 px-4 py-3 font-mono text-xs transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--phosphor)]"
              style={{
                border: "1px solid var(--line)",
                color: "var(--graphite)",
                borderRadius: "2px",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--phosphor)";
                e.currentTarget.style.borderColor = "rgb(var(--phosphor-rgb) / 0.35)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--graphite)";
                e.currentTarget.style.borderColor = "var(--line)";
              }}
            >
              <Phone className="h-4 w-4 shrink-0" style={{ color: "var(--copper)" }} />
              {profile.phone}
            </a>

            <div
              className="flex items-center gap-3 px-4 py-3 font-mono text-xs"
              style={{
                border: "1px solid var(--line)",
                color: "var(--graphite)",
                borderRadius: "2px",
              }}
            >
              <MapPin className="h-4 w-4 shrink-0" style={{ color: "var(--copper)" }} />
              {profile.location}
            </div>

            {/* CTAs */}
            <div className="mt-2 flex flex-wrap gap-2">
              <Button asChild>
                <a href={`mailto:${profile.email}`} className="inline-flex items-center gap-2">
                  <Send className="h-4 w-4" />
                  Start Conversation
                </a>
              </Button>
              <Button variant="ghost" asChild>
                <a href={profile.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2">
                  <Github className="h-4 w-4" />
                  GitHub
                </a>
              </Button>
              <Button variant="ghost" asChild>
                <a href={profile.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2">
                  <Linkedin className="h-4 w-4" />
                  LinkedIn
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
