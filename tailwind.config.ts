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
        /* Instrument Panel tokens */
        void: "rgb(var(--void-rgb) / <alpha-value>)",
        "void-raised": "rgb(var(--void-raised-rgb) / <alpha-value>)",
        phosphor: "rgb(var(--phosphor-rgb) / <alpha-value>)",
        copper: "rgb(var(--copper-rgb) / <alpha-value>)",
        vellum: "rgb(var(--vellum-rgb) / <alpha-value>)",
        "vellum-dim": "rgb(var(--vellum-dim-rgb) / <alpha-value>)",
        graphite: "rgb(var(--graphite-rgb) / <alpha-value>)",
        line: "rgb(var(--line-rgb) / <alpha-value>)",

        /* Legacy aliases — kept so untouched components compile */
        base: "rgb(var(--bg-base-rgb) / <alpha-value>)",
        elevated: "rgb(var(--bg-elevated-rgb) / <alpha-value>)",
        recessed: "rgb(var(--bg-recessed-rgb) / <alpha-value>)",
        silver: "rgb(var(--text-primary-rgb) / <alpha-value>)",
        muted: "rgb(var(--text-muted-rgb) / <alpha-value>)",
        cyan: "rgb(var(--accent-cyan-rgb) / <alpha-value>)",
        violet: "rgb(var(--accent-violet-rgb) / <alpha-value>)",
        sapphire: "rgb(var(--accent-sapphire-rgb) / <alpha-value>)",
        amber: "rgb(var(--accent-amber-rgb) / <alpha-value>)",
      },
      fontFamily: {
        /* Instrument Panel type system */
        display: ["var(--font-display)", "Georgia", "serif"],
        mono: ["var(--font-mono)", "'IBM Plex Mono'", "'JetBrains Mono'", "monospace"],
        body: ["-apple-system", "BlinkMacSystemFont", "'Segoe UI'", "system-ui", "sans-serif"],
        sans: ["-apple-system", "BlinkMacSystemFont", "'Segoe UI'", "system-ui", "sans-serif"],
        /* Legacy — still valid identifier, just falls back gracefully */
        script: ["Georgia", "serif"],
      },
      fontSize: {
        /* Fluid type scale */
        "hero": ["clamp(2.75rem, 8vw, 5.5rem)", { letterSpacing: "-0.01em", fontWeight: "400" }],
        "section": ["clamp(1.75rem, 4vw, 2.75rem)", { fontWeight: "400" }],
      },
      borderRadius: {
        /* 2px on cards/buttons — sharp instrument edges per brief */
        DEFAULT: "2px",
        sm: "2px",
        md: "2px",
        lg: "2px",
        xl: "2px",
        "2xl": "2px",
        "3xl": "2px",
        /* Keep full and none unchanged */
        full: "9999px",
        none: "0px",
      },
      boxShadow: {
        /* No drop shadows — depth comes from background shift */
        glow: "none",
        violet: "none",
        "phosphor-ring": "0 0 0 2px rgb(var(--phosphor-rgb))",
      },
      backgroundImage: {
        /* PCB-trace grid for subtle section texture */
        "pcb-grid":
          "linear-gradient(rgb(var(--copper-rgb) / 0.04) 1px, transparent 1px), linear-gradient(90deg, rgb(var(--copper-rgb) / 0.04) 1px, transparent 1px)",
        /* Oscilloscope grid for skills section */
        "osc-grid":
          "linear-gradient(rgb(var(--phosphor-rgb) / 0.06) 1px, transparent 1px), linear-gradient(90deg, rgb(var(--phosphor-rgb) / 0.06) 1px, transparent 1px)",
        /* Kept for any component still referencing grid-lines */
        "grid-lines":
          "linear-gradient(rgb(var(--copper-rgb) / 0.04) 1px, transparent 1px), linear-gradient(90deg, rgb(var(--copper-rgb) / 0.04) 1px, transparent 1px)",
        "scan-lines":
          "repeating-linear-gradient(0deg, rgb(var(--vellum-rgb) / 0.04) 0px, rgb(var(--vellum-rgb) / 0.04) 1px, transparent 1px, transparent 5px)",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "trace-pulse": {
          "0%, 100%": { opacity: "0.55" },
          "50%": { opacity: "1" },
        },
        "cursor-blink": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        "hero-in": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "section-in": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        marquee: "marquee 28s linear infinite",
        "trace-pulse": "trace-pulse 2.8s ease-in-out infinite",
        "cursor-blink": "cursor-blink 1.1s step-end infinite",
        "hero-in": "hero-in 0.6s ease-out both",
        "section-in": "section-in 0.2s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
