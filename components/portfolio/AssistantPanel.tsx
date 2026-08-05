"use client";

import { FormEvent, useMemo, useState } from "react";
import { Bot, Send, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";

const suggestions = ["What does Piyush build?", "Explain A.R.C.A.N.E", "Why hire him?", "Show AI skills"];

function answerFor(prompt: string) {
  const normalized = prompt.toLowerCase();
  if (normalized.includes("arcane")) {
    return "A.R.C.A.N.E is positioned as Piyush's flagship multi-agent control center: autonomous reasoning, contextual memory, tool calling, RAG pipelines, LLM orchestration, and scalable backend architecture.";
  }
  if (normalized.includes("skill") || normalized.includes("ai")) {
    return "His AI stack spans generative AI, agentic AI, RAG, LangChain, LLM orchestration, prompt engineering, NLP, TensorFlow, PyTorch, OpenAI APIs, and Hugging Face, paired with MERN and backend systems.";
  }
  if (normalized.includes("hire") || normalized.includes("recruit")) {
    return "Piyush communicates rare overlap: AI engineering depth, full-stack execution, open-source discipline, CI/CD familiarity, and an eye for refined user experience. That mix is valuable for production AI product teams.";
  }
  if (normalized.includes("experience") || normalized.includes("gssoc") || normalized.includes("ibm")) {
    return "He is an IBM SkillsBuild AI Automation intern and a GirlScript Summer of Code 2026 open-source contributor, working across AI workflows, REST APIs, MERN apps, GitHub Actions, and LangChain-based LLM systems.";
  }
  return "Piyush is an AI/ML and Full-Stack Software Engineer from Noida building production-grade generative AI, multi-agent systems, RAG pipelines, real-time apps, and scalable backend architectures.";
}

export function AssistantPanel() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Portfolio assistant initialized. Ask about Piyush's systems, stack, experience, or projects.",
    },
  ]);

  const status = useMemo(() => `${messages.length} context packets`, [messages.length]);

  const submit = (event?: FormEvent, override?: string) => {
    event?.preventDefault();
    const prompt = override ?? input;
    if (!prompt.trim()) return;
    setMessages((current) => [
      ...current,
      { role: "user", text: prompt },
      { role: "assistant", text: answerFor(prompt) },
    ]);
    setInput("");
  };

  return (
    <section id="assistant" className="section-shell section-layer-recessed py-24">
      <div className="grid gap-6 lg:grid-cols-[0.42fr_0.58fr] lg:items-start">
        <div>
          <p className="font-mono text-sm uppercase tracking-[0.28em] text-cyan">portfolio assistant</p>
          <h2 className="mt-3 font-display text-4xl font-semibold text-silver md:text-6xl">
            Ask the interface. It answers like a system.
          </h2>
          <p className="mt-5 text-base leading-7 text-muted">
            A lightweight local assistant uses the portfolio knowledge graph to answer recruiter-style questions instantly.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {suggestions.map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => submit(undefined, suggestion)}
                className="rounded-[8px] border border-white/10 bg-elevated px-3 py-2 font-mono text-xs text-silver transition hover:border-cyan/35 hover:bg-cyan/10"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>

        <div className="shell-border overflow-hidden rounded-[8px]">
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
            <div className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-cyan" />
              <span className="font-mono text-sm text-silver">pkr.assistant</span>
            </div>
            <span className="rounded-[8px] border border-cyan/20 bg-cyan/10 px-2 py-1 font-mono text-[11px] text-cyan">
              {status}
            </span>
          </div>

          <div className="thin-scrollbar max-h-[430px] min-h-[360px] overflow-y-auto p-4">
            <div className="space-y-3">
              {messages.map((message, index) => {
                const assistant = message.role === "assistant";
                return (
                  <div key={`${message.role}-${index}`} className={`flex gap-3 ${assistant ? "" : "justify-end"}`}>
                    {assistant ? (
                      <span className="mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-[8px] border border-cyan/25 bg-cyan/10 text-cyan">
                        <Bot className="h-4 w-4" />
                      </span>
                    ) : null}
                    <div
                      className={`max-w-[82%] rounded-[8px] border px-4 py-3 text-sm leading-6 ${
                        assistant
                          ? "border-white/10 bg-elevated text-silver"
                          : "border-sapphire/30 bg-sapphire/12 text-silver"
                      }`}
                    >
                      {message.text}
                    </div>
                    {!assistant ? (
                      <span className="mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-[8px] border border-sapphire/30 bg-sapphire/10 text-sapphire">
                        <UserRound className="h-4 w-4" />
                      </span>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>

          <form onSubmit={submit} className="flex gap-2 border-t border-white/10 p-3">
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask about systems, skills, or experience..."
              className="min-w-0 flex-1 rounded-[8px] border border-white/10 bg-recessed px-4 text-sm text-silver outline-none transition placeholder:text-muted focus:border-cyan/45"
            />
            <Button type="submit" size="icon" aria-label="Send message">
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
