import type { Metadata } from "next";
import { IBM_Plex_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";

/**
 * Instrument Serif — display type for hero name, section titles.
 * IBM Plex Mono    — data/UI mono (fallback for Berkeley Mono, licensing).
 * Body             — system-ui stack via CSS var; General Sans is a commercial
 *                    font not on Google Fonts, falls back gracefully.
 */
const instrumentSerif = Instrument_Serif({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Piyush Kumar Rai | AI Engineer & Full-Stack Software Engineer",
  description:
    "Portfolio of Piyush Kumar Rai — AI/ML Engineer, Generative AI Engineer, and Full-Stack Software Engineer building production-grade generative AI, multi-agent systems, RAG pipelines, and scalable backend architectures.",
  keywords: [
    "Piyush Kumar Rai",
    "AI Engineer",
    "Generative AI Engineer",
    "Full-Stack Software Engineer",
    "RAG",
    "LangChain",
    "MERN Stack",
    "Agentic AI",
  ],
  authors: [{ name: "Piyush Kumar Rai" }],
  creator: "Piyush Kumar Rai",
  openGraph: {
    title: "Piyush Kumar Rai | AI Engineer & Full-Stack Software Engineer",
    description:
      "Portfolio of Piyush Kumar Rai — AI/ML Engineer building production-grade generative AI, multi-agent systems, RAG pipelines, and full-stack applications.",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${instrumentSerif.variable} ${ibmPlexMono.variable}`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
