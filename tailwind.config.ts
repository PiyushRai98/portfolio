import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        base: "rgb(var(--bg-base-rgb) / <alpha-value>)",
        elevated: "rgb(var(--bg-elevated-rgb) / <alpha-value>)",
        recessed: "rgb(var(--bg-recessed-rgb) / <alpha-value>)",
        line: "rgb(var(--line-rgb) / <alpha-value>)",
        silver: "rgb(var(--text-primary-rgb) / <alpha-value>)",
        muted: "rgb(var(--text-muted-rgb) / <alpha-value>)",
        cyan: "rgb(var(--accent-cyan-rgb) / <alpha-value>)",
        violet: "rgb(var(--accent-violet-rgb) / <alpha-value>)",
        sapphire: "rgb(var(--accent-sapphire-rgb) / <alpha-value>)",
        amber: "rgb(var(--accent-amber-rgb) / <alpha-value>)",
      },
      fontFamily: {
        body: ["var(--font-body)", "sans-serif"],
        sans: ["var(--font-body)", "sans-serif"],
        display: ["var(--font-display)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
        script: ["var(--font-script)", "cursive"],
      },
      boxShadow: {
        glow: "0 0 34px rgb(var(--accent-cyan-rgb) / 0.28)",
        violet: "0 0 44px rgb(var(--accent-violet-rgb) / 0.32)",
      },
      backgroundImage: {
        "grid-lines":
          "linear-gradient(rgb(var(--text-primary-rgb) / 0.045) 1px, transparent 1px), linear-gradient(90deg, rgb(var(--text-primary-rgb) / 0.045) 1px, transparent 1px)",
        "scan-lines":
          "repeating-linear-gradient(0deg, rgb(var(--text-primary-rgb) / 0.05) 0px, rgb(var(--text-primary-rgb) / 0.05) 1px, transparent 1px, transparent 5px)",
      },
      keyframes: {
        scan: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
        orbit: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.48" },
          "50%": { opacity: "0.94" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        scan: "scan 4.8s linear infinite",
        orbit: "orbit 34s linear infinite",
        pulseGlow: "pulseGlow 3.2s ease-in-out infinite",
        marquee: "marquee 28s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
