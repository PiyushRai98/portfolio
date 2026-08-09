const items = [
  "Generative AI",
  "Agentic Systems",
  "RAG Pipelines",
  "LLM Orchestration",
  "MERN Stack",
  "Microservices",
  "Real-Time Apps",
  "Open Source",
  "Production APIs",
  "Vector Search",
];

/** Separator glyph — copper, low opacity */
function Sep() {
  return (
    <span
      className="font-mono text-xs select-none"
      style={{ color: "var(--copper)", opacity: 0.5 }}
      aria-hidden="true"
    >
      ·
    </span>
  );
}

export function Marquee() {
  return (
    <div
      className="overflow-hidden py-3"
      style={{ borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}
    >
      <div
        className="flex w-max gap-6 whitespace-nowrap"
        style={{ animation: "marquee 28s linear infinite" }}
      >
        {[...items, ...items].map((item, index) => (
          <span key={`${item}-${index}`} className="inline-flex items-center gap-6">
            <span
              className="font-mono text-[10px] uppercase tracking-[0.28em]"
              style={{ color: "var(--graphite)" }}
            >
              {item}
            </span>
            <Sep />
          </span>
        ))}
      </div>
    </div>
  );
}
