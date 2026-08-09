"use client";

import { AssistantPanel } from "@/components/portfolio/AssistantPanel";
import { Certifications } from "@/components/portfolio/Certifications";
import { CommandPalette } from "@/components/portfolio/CommandPalette";
import { ContactDock } from "@/components/portfolio/ContactDock";
import { ContributionSignal } from "@/components/portfolio/ContributionSignal";
import { CustomCursor } from "@/components/portfolio/CustomCursor";
import { ExperienceTimeline } from "@/components/portfolio/ExperienceTimeline";
import { Hero } from "@/components/portfolio/Hero";
import { MagneticNav } from "@/components/portfolio/MagneticNav";
import { Marquee } from "@/components/portfolio/Marquee";
import { ProjectArchitecture } from "@/components/portfolio/ProjectArchitecture";
import { SkillsConstellation } from "@/components/portfolio/SkillsConstellation";
import { SmoothScroll } from "@/components/portfolio/SmoothScroll";
import { StatsStrip } from "@/components/portfolio/StatsStrip";
import { TerminalPanel } from "@/components/portfolio/TerminalPanel";
import { SectionNavigator } from "@/components/portfolio/SectionNavigator";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[var(--void)]">
      <SmoothScroll />
      <CustomCursor />
      <CommandPalette />
      <MagneticNav />
      <SectionNavigator />
      <div className="noise" />

      {/* Continuous copper waveform trace — cross-section structural device */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed left-1/2 top-0 z-[1] h-full w-px -translate-x-1/2 opacity-[0.06]"
        style={{
          background: `repeating-linear-gradient(
            to bottom,
            var(--copper) 0px,
            var(--copper) 60px,
            transparent 60px,
            transparent 68px,
            var(--copper) 68px,
            var(--copper) 72px,
            transparent 72px,
            transparent 80px
          )`,
        }}
      />

      <Hero />
      <Marquee />
      <StatsStrip />
      <ProjectArchitecture />
      <ExperienceTimeline />
      <SkillsConstellation />
      <AssistantPanel />
      <TerminalPanel />
      <ContributionSignal />
      <Certifications />
      <ContactDock />

      <footer className="section-shell border-t border-[var(--line)] py-8 text-center font-mono text-xs uppercase tracking-[0.18em] text-[var(--graphite)]">
        Piyush Kumar Rai · AI/ML Engineer · Generative AI Engineer · Full-Stack Software Engineer
      </footer>
    </main>
  );
}
