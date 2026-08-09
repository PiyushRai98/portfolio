"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { Bot, Send, UserRound } from "lucide-react";
import { TerminalChrome } from "./TerminalChrome";

const suggestions = [
  "What does Piyush build?",
  "Explain A.R.C.A.N.E",
  "Why hire him?",
  "Show AI skills",
];

function answerFor(prompt: string) {
  const normalized = prompt.toLowerCase();
  if (normalized.includes("arcane")) {
    return "A.R.C.A.N.E is Piyush's flagship multi-agent control center: autonomous reasoning, contextual memory, tool calling, RAG pipelines, LLM orchestration, and scalable backend architecture.";
  }
  if (normalized.includes("skill") || normalized.includes("ai")) {
    return "His AI stack spans generative AI, agentic AI, RAG, LangChain, LLM orchestration, prompt engineering, NLP, TensorFlow, PyTorch, OpenAI APIs, and Hugging Face — paired with MERN and backend systems.";
  }
  if (normalized.includes("hire") || normalized.includes("recruit")) {
    return "Piyush combines AI engineering depth, full-stack execution, open-source discipline, CI/CD familiarity, and a refined eye for user experience. That overlap is valuable for production AI product teams.";
  }
  if (normalized.includes("experience") || normalized.includes("gssoc") || normalized.includes("ibm")) {
    return "He is an IBM SkillsBuild AI Automation intern and a GirlScript Summer of Code 2026 open-source contributor, working across AI workflows, REST APIs, MERN apps, GitHub Actions, and LangChain-based LLM systems.";
  }
  return "Piyush is an AI/ML and Full-Stack Software Engineer from Noida building production-grade generative AI, multi-agent systems, RAG pipelines, real-time apps, and scalable backend architectures.";
}

/* Animated text reveal — character by character */
function AnimatedMessage({ text, reduced }: { text: string; reduced: boolean }) {
  const [displayed, setDisplayed] = useState(reduced ? text : "");

  useEffect(() => {
    if (reduced) { setDisplayed(text); return; }
    setDisplayed("");
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, 18);
    return () => clearInterval(id);
  }, [text, reduced]);

  return <>{displayed}</>;
}

export function AssistantPanel() {
  const [input, setInput] = useState("");
  const [reduced, setReduced] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Portfolio assistant initialized. Ask about Piyush's systems, stack, experience, or projects.",
    },
  ]);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    // Scroll only within the chat container, not the page
    if (bottomRef.current) {
      const container = bottomRef.current.closest(".thin-scrollbar");
      if (container) {
        container.scrollTop = container.scrollHeight;
      }
    }
  }, [messages]);

  const status = useMemo(() => `${messages.length} packets`, [messages.length]);

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
    <section id="assistant" className="section-shell section-layer-recessed py-16">
      <div className="grid gap-8 lg:grid-cols-[0.42fr_0.58fr] lg:items-start">
        {/* Left: intro */}
        <div>
          <p
            className="font-mono text-[10px] uppercase tracking-[0.28em]"
            style={{ color: "var(--graphite)" }}
          >
            portfolio assistant
          </p>
          <h2
            className="mt-3 font-display"
            style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)", fontWeight: 400, color: "var(--vellum)" }}
          >
            Ask the interface. It answers like a system.
          </h2>
          <p className="mt-4 text-sm leading-6" style={{ color: "var(--graphite)" }}>
            A lightweight local assistant uses the portfolio knowledge graph to answer
            recruiter-style questions instantly.
          </p>

          {/* Suggestion chips */}
          <div className="mt-5 flex flex-wrap gap-2">
            {suggestions.map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => submit(undefined, suggestion)}
                className="font-mono text-xs transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--phosphor)]"
                style={{
                  border: "1px solid var(--line)",
                  color: "var(--graphite)",
                  padding: "6px 12px",
                  borderRadius: "2px",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--phosphor)";
                  e.currentTarget.style.color = "var(--phosphor)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--line)";
                  e.currentTarget.style.color = "var(--graphite)";
                }}
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>

        {/* Right: terminal */}
        <TerminalChrome title="pkr.assistant" statusLabel={status}>
          {/* Message list */}
          <div
            className="thin-scrollbar max-h-[400px] min-h-[320px] overflow-y-auto p-4 space-y-3"
            style={{ background: "rgb(var(--void-rgb) / 0.7)" }}
          >
            {messages.map((message, index) => {
              const isAssistant = message.role === "assistant";
              const isLast = index === messages.length - 1;
              return (
                <div
                  key={`${message.role}-${index}`}
                  className={`flex gap-3 ${isAssistant ? "" : "justify-end"}`}
                >
                  {isAssistant && (
                    <span
                      className="mt-1 grid h-7 w-7 shrink-0 place-items-center"
                      style={{
                        border: "1px solid var(--line)",
                        color: "var(--graphite)",
                        borderRadius: "2px",
                      }}
                    >
                      <Bot className="h-3.5 w-3.5" />
                    </span>
                  )}

                  <div
                    className="max-w-[84%] p-3 text-sm leading-6"
                    style={{
                      border: "1px solid var(--line)",
                      background: isAssistant
                        ? "rgb(var(--void-raised-rgb) / 0.8)"
                        : "rgb(var(--void-raised-rgb) / 0.5)",
                      color: "var(--vellum-dim)",
                      borderRadius: "2px",
                    }}
                  >
                    {isAssistant && isLast && !reduced ? (
                      <AnimatedMessage text={message.text} reduced={reduced} />
                    ) : (
                      message.text
                    )}
                  </div>

                  {!isAssistant && (
                    <span
                      className="mt-1 grid h-7 w-7 shrink-0 place-items-center"
                      style={{
                        border: "1px solid var(--line)",
                        color: "var(--graphite)",
                        borderRadius: "2px",
                      }}
                    >
                      <UserRound className="h-3.5 w-3.5" />
                    </span>
                  )}
                </div>
              );
            })}
            <div ref={bottomRef} />
          </div>

          {/* Input row */}
          <form
            onSubmit={submit}
            className="flex gap-2 p-3"
            style={{ borderTop: "1px solid var(--line)" }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about systems, skills, or experience…"
              className="min-w-0 flex-1 font-mono text-xs outline-none transition-colors duration-150"
              style={{
                border: "1px solid var(--line)",
                background: "rgb(var(--void-rgb) / 0.8)",
                color: "var(--vellum)",
                padding: "8px 12px",
                borderRadius: "2px",
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "var(--phosphor)")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "var(--line)")}
            />
            {/* Send button — phosphor, interactive */}
            <button
              type="submit"
              aria-label="Send message"
              className="flex h-9 w-9 items-center justify-center transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--phosphor)]"
              style={{
                border: "1px solid var(--phosphor)",
                background: "var(--phosphor)",
                color: "var(--void)",
                borderRadius: "2px",
                flexShrink: 0,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.88")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              <Send className="h-3.5 w-3.5" />
            </button>
          </form>
        </TerminalChrome>
      </div>
    </section>
  );
}
