"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const aiResponses: Record<string, string> = {
  projects:
    "> ACCESSING PROJECT DATABASE...\n\n◆ A.R.C.A.N.E — Multi-agent AI orchestration framework\n◆ MedNexus-AI — Healthcare AI with RAG pipelines\n◆ Real-Time Code Editor — WebSocket collaborative IDE\n◆ ChatFlow — AI-powered communication platform\n◆ CollabCode — Next-gen pair programming\n\nAll systems operational. Want details on a specific project?",
  skills:
    "> SCANNING SKILL MATRIX...\n\n◈ AI/ML: Python, TensorFlow, PyTorch, LangChain\n◈ Gen AI: OpenAI API, RAG, Vector DBs, LLMs\n◈ Frontend: React, Next.js, TypeScript\n◈ Backend: Node.js, MongoDB, Docker, K8s\n◈ Core: Deep Learning, NLP, Computer Vision\n\nProficiency levels loaded. Neural networks optimized.",
  experience:
    "> LOADING EXPERIENCE LOG...\n\n◈ AI/ML Engineer — Building intelligent systems\n◈ Open Source — GSSoC contributor, 50+ PRs\n◈ Full-Stack Dev — MERN, real-time apps\n◈ ECE Student — Research in AI/DL\n\nExperience matrix synchronized.",
  opensource:
    "> FETCHING CONTRIBUTION DATA...\n\n◆ GirlScript Summer of Code — Active contributor\n◆ 50+ Pull Requests merged across repositories\n◆ 15+ open source projects contributed to\n◆ Focus: AI, ML, and web development tools\n\nContribution graph updated. All PRs verified.",
  hello:
    "> NEURAL INTERFACE ACTIVATED\n\nGreetings, human. I am Piyush's AI assistant.\nI can help you learn about his projects, skills,\nexperience, and open source contributions.\n\nTry asking about: projects, skills, experience, or open source.",
  default:
    "> PROCESSING QUERY...\n\nI can answer questions about:\n◆ Projects — AI apps & full-stack platforms\n◆ Skills — Tech stack & expertise\n◆ Experience — Journey & timeline\n◆ Open Source — Contributions & impact\n\nType a keyword to explore.",
};

function getResponse(input: string): string {
  const lower = input.toLowerCase();
  if (lower.includes("project") || lower.includes("arcane") || lower.includes("mednexus"))
    return aiResponses.projects;
  if (lower.includes("skill") || lower.includes("tech") || lower.includes("stack"))
    return aiResponses.skills;
  if (lower.includes("experience") || lower.includes("work") || lower.includes("journey"))
    return aiResponses.experience;
  if (lower.includes("open source") || lower.includes("github") || lower.includes("contribution"))
    return aiResponses.opensource;
  if (lower.includes("hello") || lower.includes("hi") || lower.includes("hey"))
    return aiResponses.hello;
  return aiResponses.default;
}

interface Message {
  role: "user" | "ai";
  content: string;
}

export default function AIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "ai", content: aiResponses.hello },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMsg }]);
    setIsTyping(true);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { role: "ai", content: getResponse(userMsg) },
      ]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <>
      {/* Toggle Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 3, type: "spring" }}
        onClick={() => setIsOpen(!isOpen)}
        data-cursor="pointer"
        className="fixed bottom-6 right-6 z-[90] w-14 h-14 rounded-full bg-gradient-to-br from-violet to-cyan flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
        style={{
          boxShadow: "0 0 30px rgba(124, 58, 237, 0.4), 0 0 60px rgba(124, 58, 237, 0.1)",
        }}
      >
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          className="text-white text-xl font-bold"
        >
          {isOpen ? "✕" : "⬡"}
        </motion.span>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-24 right-6 z-[89] w-[380px] max-w-[calc(100vw-3rem)] glass-heavy rounded-2xl overflow-hidden"
            style={{
              boxShadow: "0 0 40px rgba(124, 58, 237, 0.2), 0 20px 60px rgba(0,0,0,0.5)",
            }}
          >
            {/* Header */}
            <div className="px-5 py-4 border-b border-white/5 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet to-cyan flex items-center justify-center">
                <span className="text-xs font-bold text-white">AI</span>
              </div>
              <div>
                <h4 className="font-display text-sm font-bold text-white">
                  PKR Assistant
                </h4>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  <span className="font-mono text-[10px] text-silver">Online</span>
                </div>
              </div>
              {/* Voice wave decoration */}
              <div className="ml-auto flex items-center gap-[2px]">
                {Array.from({ length: 5 }).map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      height: isTyping ? [8, 16, 8] : 4,
                    }}
                    transition={{
                      duration: 0.6,
                      repeat: isTyping ? Infinity : 0,
                      delay: i * 0.1,
                    }}
                    className="w-[2px] bg-violet rounded-full"
                    style={{ height: 4 }}
                  />
                ))}
              </div>
            </div>

            {/* Messages */}
            <div className="h-80 overflow-y-auto p-4 space-y-4 scrollbar-thin">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`${msg.role === "user" ? "ml-auto max-w-[80%]" : "max-w-[90%]"}`}
                >
                  {msg.role === "user" ? (
                    <div className="px-4 py-2 rounded-2xl rounded-br-sm bg-violet/20 border border-violet/20">
                      <p className="font-mono text-xs text-white">{msg.content}</p>
                    </div>
                  ) : (
                    <div className="px-4 py-3 rounded-2xl rounded-bl-sm bg-white/[0.03] border border-white/5">
                      <pre className="font-mono text-xs text-silver whitespace-pre-wrap leading-relaxed">
                        {msg.content}
                      </pre>
                    </div>
                  )}
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-1 px-4 py-2"
                >
                  <span className="font-mono text-xs text-violet">Processing</span>
                  <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="font-mono text-xs text-violet"
                  >
                    ...
                  </motion.span>
                </motion.div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 border-t border-white/5">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Ask about projects, skills..."
                  className="flex-1 bg-white/[0.03] border border-white/10 rounded-lg px-4 py-2 font-mono text-xs text-white placeholder:text-silver/30 outline-none focus:border-violet/40 transition-colors"
                />
                <button
                  onClick={handleSend}
                  data-cursor="pointer"
                  className="px-4 py-2 rounded-lg bg-violet/20 border border-violet/20 font-mono text-xs text-violet-light hover:bg-violet/30 transition-colors"
                >
                  Send
                </button>
              </div>
              {/* Quick prompts */}
              <div className="flex gap-2 mt-2 overflow-x-auto">
                {["Projects", "Skills", "Experience", "Open Source"].map((q) => (
                  <button
                    key={q}
                    onClick={() => {
                      setInput(q);
                      setTimeout(() => {
                        setMessages((prev) => [...prev, { role: "user", content: q }]);
                        setIsTyping(true);
                        setTimeout(() => {
                          setMessages((prev) => [
                            ...prev,
                            { role: "ai", content: getResponse(q) },
                          ]);
                          setIsTyping(false);
                        }, 1200);
                      }, 100);
                      setInput("");
                    }}
                    data-cursor="pointer"
                    className="px-2 py-1 rounded-full bg-white/[0.03] border border-white/5 font-mono text-[10px] text-silver/50 hover:text-violet-light hover:border-violet/20 transition-colors whitespace-nowrap"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
