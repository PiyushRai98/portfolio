import type { Metadata } from "next";
import { Geist, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const space = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Piyush Kumar Rai | AI Engineer & Full-Stack Software Engineer",
  description:
    "Interactive AI operating-system portfolio for Piyush Kumar Rai, showcasing generative AI, agentic systems, RAG, MERN, microservices, and production-grade engineering.",
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
      "A cinematic AI operating-system portfolio for production-grade AI systems, agentic workflows, and full-stack engineering.",
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
      <body className={`${geist.variable} ${space.variable} ${mono.variable}`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
