"use client";

import { useEffect } from "react";
import gsap from "gsap";
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
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;
    gsap.fromTo(
      ".boot-line",
      { scaleX: 0 },
      { scaleX: 1, duration: 1.15, ease: "power3.out", transformOrigin: "left center" },
    );
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden bg-base">
      <SmoothScroll />
      <CustomCursor />
      <CommandPalette />
      <MagneticNav />
      <SectionNavigator />
      <div className="noise" />
      <div className="boot-line fixed left-0 top-0 z-[90] h-px w-full origin-left bg-gradient-to-r from-cyan/60 via-sapphire/40 to-transparent" />
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
      <footer className="section-shell border-t border-white/8 py-8 text-center text-sm text-muted/60">
        © 2026 Piyush Kumar Rai
      </footer>
    </main>
  );
}
