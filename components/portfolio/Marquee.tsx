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
    <div className="overflow-hidden border-y border-white/8 py-3.5">
      <div className="flex w-max animate-marquee gap-0 whitespace-nowrap">
        {[...items, ...items].map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="flex items-center gap-0 text-sm text-muted/70"
          >
            <span className="px-7">{item}</span>
            <span className="text-white/15">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
