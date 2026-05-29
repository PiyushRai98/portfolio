"use client";

import dynamic from "next/dynamic";
import HeroSection from "@/components/hero/hero-section";
import AboutSection from "@/components/about/about-section";
import TechSection from "@/components/tech/tech-section";
import ProjectsSection from "@/components/projects/projects-section";
import OpenSourceSection from "@/components/opensource/opensource-section";
import ExperienceSection from "@/components/experience/experience-section";
import CertificationsSection from "@/components/certifications/certifications-section";
import Footer from "@/components/contact/footer";
import Navbar from "@/components/navigation/navbar";

const SmoothScrollProvider = dynamic(
  () => import("@/components/providers/smooth-scroll"),
  { ssr: false }
);

const CustomCursor = dynamic(
  () => import("@/components/cursor/custom-cursor"),
  { ssr: false }
);

const ParticleField = dynamic(
  () => import("@/components/effects/particles"),
  { ssr: false }
);

const AIChat = dynamic(
  () => import("@/components/ai-assistant/ai-chat"),
  { ssr: false }
);

export default function Home() {
  return (
    <SmoothScrollProvider>
      <CustomCursor />
      <ParticleField />
      <Navbar />

      <main className="relative z-10">
        <HeroSection />

        {/* Section divider */}
        <div className="relative h-px">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-violet/20 to-transparent" />
        </div>

        <AboutSection />

        <div className="relative h-px">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan/20 to-transparent" />
        </div>

        <TechSection />

        <div className="relative h-px">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-violet/20 to-transparent" />
        </div>

        <ProjectsSection />

        <div className="relative h-px">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan/20 to-transparent" />
        </div>

        <OpenSourceSection />

        <div className="relative h-px">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-violet/20 to-transparent" />
        </div>

        <ExperienceSection />

        <div className="relative h-px">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan/20 to-transparent" />
        </div>

        <CertificationsSection />

        <div className="relative h-px">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-violet/20 to-transparent" />
        </div>

        <Footer />
      </main>

      <AIChat />
    </SmoothScrollProvider>
  );
}
