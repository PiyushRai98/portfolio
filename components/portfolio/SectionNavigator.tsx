"use client";

import { useEffect, useState } from "react";

const sections = [
  { id: "home", label: "Home" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "assistant", label: "Assistant" },
  { id: "terminal", label: "Terminal" },
  { id: "signal", label: "Open-source signal" },
  { id: "certifications", label: "Credentials" },
  { id: "contact", label: "Contact" },
] as const;

export function SectionNavigator() {
  const [activeId, setActiveId] = useState("home");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: "-35% 0px -50%", threshold: [0.1, 0.35, 0.6] },
    );

    sections.forEach(({ id }) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const navigate = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav aria-label="Section navigation" className="fixed left-5 top-1/2 z-40 hidden -translate-y-1/2 lg:flex">
      <ul className="flex flex-col gap-3">
        {sections.map((section) => {
          const active = section.id === activeId;
          return (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                aria-label={section.label}
                aria-current={active ? "location" : undefined}
                title={section.label}
                onClick={(event) => {
                  event.preventDefault();
                  navigate(section.id);
                }}
                className={`block h-2.5 w-2.5 rounded-full border transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-base ${
                  active
                    ? "border-cyan bg-cyan shadow-glow"
                    : "border-muted/60 bg-base hover:border-cyan/70 hover:bg-cyan/30"
                }`}
              />
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
