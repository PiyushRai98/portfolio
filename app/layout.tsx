import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Orbitron } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Piyush Kumar Rai — AI/ML Engineer & Full-Stack Developer",
  description:
    "Portfolio of Piyush Kumar Rai — AI/ML Engineer, Generative AI Developer, Open Source Contributor, and Full-Stack Engineer. Building intelligent systems, autonomous agents, and immersive digital experiences.",
  keywords: [
    "AI Engineer",
    "ML Engineer",
    "Generative AI",
    "Full Stack Developer",
    "LangChain",
    "OpenAI",
    "React",
    "Next.js",
    "Python",
    "Portfolio",
  ],
  authors: [{ name: "Piyush Kumar Rai" }],
  openGraph: {
    title: "Piyush Kumar Rai — AI/ML Engineer",
    description:
      "Building intelligent systems, autonomous agents, and immersive digital experiences.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} ${orbitron.variable} antialiased`}
    >
      <head>
        <meta name="theme-color" content="#000000" />
      </head>
      <body className="min-h-screen bg-void text-silver-light selection:bg-violet/40">
        {children}

        {/* Noise Overlay */}
        <div className="noise-overlay" aria-hidden="true" />
        {/* Scanlines */}
        <div className="scanlines" aria-hidden="true" />
      </body>
    </html>
  );
}
