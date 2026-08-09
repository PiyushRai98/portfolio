"use client";

import { useEffect, useState } from "react";

const sections = [
  { id: "home", label: "Home" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "assistant", label: "Assistant" },
  { id: "terminal", label: "Terminal" },
  { id: "signal", label: "Open Source" },
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
    <nav
      aria-label="Section navigation"
      className="fixed left-5 top-1/2 z-40 hidden -translate-y-1/2 lg:flex"
    >
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
                className="block h-2 w-2 transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--phosphor)] focus-visible:outline-offset-2"
                style={{
                  borderRadius: "1px",
                  border: `1px solid ${active ? "var(--phosphor)" : "var(--graphite)"}`,
                  background: active ? "var(--phosphor)" : "transparent",
                }}
              />
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
