"use client";

import { Github, Linkedin, Mail, MapPin, Phone, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { profile } from "./data";

export function ContactDock() {
  return (
    <section id="contact" className="section-shell section-layer-recessed pb-20 pt-24">
      <div className="shell-border relative overflow-hidden rounded-[8px] p-6 md:p-10">
        <div className="absolute inset-0 bg-grid-lines bg-[size:72px_72px] opacity-[0.09]" />
        <div className="relative z-10 grid gap-8 lg:grid-cols-[0.58fr_0.42fr] lg:items-end">
          <div>
            <h2 className="mt-0 max-w-3xl font-display text-4xl font-semibold text-silver md:text-5xl">
              Let's build something together.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-muted">
              Available for AI engineering, full-stack software engineering, generative AI,
              RAG, agentic AI, and production backend opportunities.
            </p>
          </div>

          <div className="grid gap-3">
            <a
              href={`mailto:${profile.email}`}
              className="magnetic flex items-center gap-3 rounded-[8px] border border-white/10 bg-elevated p-4 text-silver hover:border-cyan/40"
            >
              <Mail className="h-5 w-5 text-cyan" />
              {profile.email}
            </a>
            <a
              href={`tel:${profile.phone.replace(/\s/g, "")}`}
              className="magnetic flex items-center gap-3 rounded-[8px] border border-white/10 bg-elevated p-4 text-silver hover:border-cyan/40"
            >
              <Phone className="h-5 w-5 text-cyan" />
              {profile.phone}
            </a>
            <div className="flex items-center gap-3 rounded-[8px] border border-white/10 bg-elevated p-4 text-silver">
              <MapPin className="h-5 w-5 text-cyan" />
              {profile.location}
            </div>
            <div className="mt-2 flex flex-wrap gap-3">
              <Button asChild>
                <a href={`mailto:${profile.email}`}>
                  <Send className="h-4 w-4" />
                  Start Conversation
                </a>
              </Button>
              <Button variant="secondary" asChild>
                <a href={profile.github} target="_blank" rel="noreferrer">
                  <Github className="h-4 w-4" />
                  GitHub
                </a>
              </Button>
              <Button variant="secondary" asChild>
                <a href={profile.linkedin} target="_blank" rel="noreferrer">
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
