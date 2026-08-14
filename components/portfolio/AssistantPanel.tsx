"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { Bot, Send, UserRound } from "lucide-react";
import { TerminalChrome } from "./TerminalChrome";

/* ─── Suggestion chips ────────────────────────────────────────────────────── */
const suggestions = [
  "What does Piyush build?",
  "Tell me about his projects",
  "What's his tech stack?",
  "Why should I hire him?",
];

/* ─── Q&A engine — grounded in data.ts ───────────────────────────────────── */
function answerFor(prompt: string): string {
  const q = prompt.toLowerCase().trim();

  /* ── Projects ── */
  if (q.includes("research assistant") || q.includes("rag") || q.includes("ibm granite")) {
    return "The AI Research Assistant is a RAG platform that turns research PDFs into an interactive Q&A tool. It uses IBM Granite LLM, BGE-small embeddings, FAISS vector indexing, and a Streamlit frontend — delivering citation-grounded answers, summaries, flashcards, quizzes, and document comparison.";
  }
  if (q.includes("redrob") || q.includes("recruiter") || q.includes("ranking") || q.includes("lightgbm")) {
    return "Redrob AI Recruiter shortlists the top 100 candidates from 100K+ profiles. It uses Hybrid Retrieval (BM25 + Dense + RRF), LightGBM LambdaMART with 104 engineered ranking features, Sentence Transformers, and a Streamlit + Plotly dashboard for explainable AI insights — ~38s end-to-end inference.";
  }
  if (q.includes("collabcode") || q.includes("collab") || q.includes("collaborative") || q.includes("monaco")) {
    return "CollabCode is a real-time collaborative code editor built on the MERN stack. It uses Monaco Editor, Yjs CRDTs for conflict-free sync, Socket.IO, Redis Pub/Sub, JWT auth, Docker sandboxed execution, Kubernetes deployment, and GitHub Actions CI/CD.";
  }
  if (q.includes("project") || q.includes("build") || q.includes("built") || q.includes("system") || q.includes("what does")) {
    return "Piyush has built three flagship systems: (1) AI Research Assistant — a RAG platform with IBM Granite and FAISS. (2) Redrob AI Recruiter — a 100K+ profile ranking engine with LightGBM and Hybrid Retrieval. (3) CollabCode — a real-time collaborative editor with MERN, Socket.IO, and Yjs CRDTs. Ask about any one for details.";
  }

  /* ── Skills & stack ── */
  if (q.includes("stack") || q.includes("tech") || q.includes("tool") || q.includes("language")) {
    return "Core stack: Python, JavaScript/TypeScript, React, Next.js, Node.js, Express, MongoDB, Redis, PostgreSQL. AI/ML: LangChain, RAG, LLM orchestration, OpenAI API, Hugging Face, TensorFlow, PyTorch, FAISS, Prompt Engineering. Infra: Docker, Kubernetes, GitHub Actions, CI/CD, Prometheus.";
  }
  if (q.includes("ai") || q.includes("ml") || q.includes("machine learning") || q.includes("skill")) {
    return "AI stack: Generative AI, Agentic AI, RAG pipelines, LangChain, LLM Orchestration, Prompt Engineering, NLP, TensorFlow, PyTorch, OpenAI API, Hugging Face, IBM Granite, FAISS, BGE Embeddings. Applied across production systems — not just tutorials.";
  }
  if (q.includes("frontend") || q.includes("react") || q.includes("next")) {
    return "Frontend: React.js, Next.js, Tailwind CSS, TypeScript, HTML5, CSS3, Socket.IO (client), Monaco Editor. This portfolio itself is built in Next.js 15 with Framer Motion and a custom design system.";
  }
  if (q.includes("backend") || q.includes("database") || q.includes("server") || q.includes("api")) {
    return "Backend: Node.js, Express.js, REST APIs, WebSockets, Socket.IO, Microservices, MongoDB, PostgreSQL, Redis, Pinecone, Vector Databases. Built production-grade distributed systems with real-time sync and scalable data layers.";
  }

  /* ── Experience ── */
  if (q.includes("ibm") || q.includes("skillsbuild") || q.includes("intern") || q.includes("internship")) {
    return "Piyush is an IBM SkillsBuild Academic Intern (June 2026 – present) under AICTE × IBM, building AI-powered automation workflows and intelligent solutions using Agentic AI, workflow orchestration, and modern AI development practices.";
  }
  if (q.includes("gssoc") || q.includes("girlscript") || q.includes("open source") || q.includes("opensource") || q.includes("pr") || q.includes("contribution")) {
    return "He is a GirlScript Summer of Code 2026 contributor (AI & Agents track) — 5+ merged PRs shipping AI features, RAG integrations, and agentic workflows. He automated CI/CD via GitHub Actions, cutting developer overhead by ~40%, and applied prompt engineering across 3+ open-source projects.";
  }
  if (q.includes("education") || q.includes("degree") || q.includes("college") || q.includes("jss") || q.includes("btech") || q.includes("university")) {
    return "B.Tech in Electronics & Communication Engineering at JSS Academy of Technical Education, Noida (expected July 2027). The ECE foundation underpins his systems-thinking approach to AI and software architecture.";
  }
  if (q.includes("experience") || q.includes("work") || q.includes("background") || q.includes("resume")) {
    return "Piyush has two active roles: IBM SkillsBuild AI Automation Intern (AICTE × IBM, June 2026) and GirlScript Summer of Code 2026 open-source contributor (AI & Agents track). Currently pursuing B.Tech ECE at JSSATEN, Noida (expected 2027).";
  }

  /* ── Hire / contact ── */
  if (q.includes("hire") || q.includes("recruit") || q.includes("why") || q.includes("contact") || q.includes("available")) {
    return "Piyush is available for AI engineering, generative AI, full-stack, and production backend roles. He brings a rare combination: AI engineering depth (RAG, agentic systems, LLM orchestration), full-stack execution (MERN), open-source discipline (5+ merged PRs), and DevOps familiarity (Docker, K8s, CI/CD). Reach him via the Contact section or at piyushrai961@yahoo.com.";
  }

  /* ── Certifications ── */
  if (q.includes("cert") || q.includes("course") || q.includes("deeplearning") || q.includes("andrew ng") || q.includes("credential")) {
    return "Certifications from DeepLearning.AI: Machine Learning Specialization (Andrew Ng / Stanford), Deep Learning Specialization, NLP Specialization, TensorFlow Developer Professional Certificate, Generative AI for Software Development, Mathematics for ML, Data Analytics, and PyTorch for Deep Learning. Plus freeCodeCamp certifications.";
  }

  /* ── Location / about ── */
  if (q.includes("location") || q.includes("where") || q.includes("noida") || q.includes("india")) {
    return "Piyush is based in Noida, Uttar Pradesh, India. He is open to remote opportunities globally and on-site roles in India.";
  }
  if (q.includes("who") || q.includes("about") || q.includes("piyush") || q.includes("introduce")) {
    return "Piyush Kumar Rai is an AI/ML Engineer, Generative AI Engineer, and Full-Stack Software Engineer from Noida, India. He builds production-grade generative AI, multi-agent systems, RAG pipelines, real-time applications, and scalable backend architectures.";
  }

  /* ── Fallback ── */
  return "I can answer questions about Piyush's projects (AI Research Assistant, Redrob AI Recruiter, CollabCode), his tech stack, experience (IBM internship, GSSoC), certifications, or how to get in touch. What would you like to know?";
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
      text: "Portfolio assistant ready. Ask about projects, skills, experience, certifications, or how to get in touch.",
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
