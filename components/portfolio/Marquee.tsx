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

export function Marquee() {
  return (
    <div className="overflow-hidden border-y border-white/10 bg-white/[0.025] py-4">
      <div className="flex w-max animate-marquee gap-8 whitespace-nowrap">
        {[...items, ...items].map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="font-mono text-xs uppercase tracking-[0.28em] text-muted"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
