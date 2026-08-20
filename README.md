# Piyush Kumar Rai — AI OS Portfolio

> An interactive, cinematic portfolio built as an **AI operating system** — live GitHub contribution graph, real repo data, animated skills constellation, and a terminal interface, all on a dark cyberpunk aesthetic.

**Live:** [portfolio2-nu-ecru.vercel.app](https://portfolio2-nu-ecru.vercel.app) &nbsp;·&nbsp; **Resume:** [View PDF](https://drive.google.com/file/d/1JqaE1dj0ALNmjFdQ24nFpRnIYPrTBz7p/view?usp=sharing)

---

## Features

| Section | What it does |
|---|---|
| **Hero** | Animated name in Autumn Flowers script font, AI role status panel, scramble-text badge |
| **Marquee** | Infinite scrolling tech stack strip |
| **Stats Strip** | Live-counting numbers — PRs, systems, features, CI/CD savings |
| **Project Architecture** | Interactive node-diagram cards for each project with GitHub links and stack tags |
| **Experience Timeline** | Resume-accurate entries with certificate links and bullet points |
| **Skills Constellation** | Orbiting skill nodes around an "AI Core" centre + grouped skill panels |
| **AI Assistant** | In-page chat panel |
| **Terminal** | Interactive command-line interface |
| **Contribution Graph** | **Real GitHub data** via GraphQL API — cyan/violet heat map, 6h cache |
| **Recent Repos** | Auto-pulled from GitHub REST API — language dots, stars, time-ago |
| **Certifications** | Clickable cards linking directly to DeepLearning.AI certificates |
| **Contact Dock** | Email, GitHub, LinkedIn |

---

## Tech Stack

- **Framework:** Next.js 15 (App Router, Turbopack)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v3 + CSS custom properties (design token system)
- **Animation:** Framer Motion, GSAP
- **3D:** React Three Fiber + Three.js
- **UI primitives:** Radix UI, `cmdk`, Lucide React
- **Fonts:** Geist (body), Space Grotesk (display), JetBrains Mono (mono), Autumn Flowers (script)
- **Data:** GitHub GraphQL API (contributions) + GitHub REST API (repos)

---

## Getting Started

### 1. Clone

```bash
git clone https://github.com/PiyushRai98/portfolio.git
cd portfolio
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create `.env.local` in the project root:

```env
# GitHub Personal Access Token
# Generate at: https://github.com/settings/tokens
# Required scope: read:user  (no repo access needed)
GITHUB_TOKEN=ghp_your_token_here
```

> The contribution graph and repo strip work without a token (GitHub allows unauthenticated requests at 60/hr), but adding a token raises the limit to 5000/hr and is required for private contribution counts.

### 4. Run dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Project Structure

```
├── app/
│   ├── api/
│   │   ├── github-contributions/route.ts   # GraphQL → contribution calendar (6h cache)
│   │   └── github-repos/route.ts           # REST → repo list (1h cache)
│   ├── globals.css                         # Design tokens + global styles
│   ├── layout.tsx                          # Root layout, font variables
│   └── page.tsx                            # Page composition
│
├── components/portfolio/
│   ├── data.ts                             # All content — projects, skills, experience, certs
│   ├── Hero.tsx
│   ├── ProjectArchitecture.tsx             # Interactive node-diagram project cards
│   ├── ExperienceTimeline.tsx
│   ├── SkillsConstellation.tsx             # Orbiting skill nodes
│   ├── ContributionSignal.tsx              # Wrapper section
│   ├── ContributionGrid.tsx                # Real GitHub contribution heatmap
│   ├── RecentRepos.tsx                     # Auto-pulled repo cards
│   ├── Certifications.tsx                  # Clickable cert cards
│   ├── AssistantPanel.tsx
│   ├── TerminalPanel.tsx
│   └── ...
│
├── public/
│   └── fonts/
│       └── AutumnFlowers.otf
│
├── lib/
│   ├── theme.ts
│   └── utils.ts
│
├── tailwind.config.ts                      # Design tokens → Tailwind classes
└── .env.local.example                      # Token setup reference
```

---

## Customisation

All content lives in **`components/portfolio/data.ts`** — edit that single file to update:
- Profile info (name, links, location)
- Stats strip numbers
- Projects (name, stack, nodes, GitHub URL, bullets)
- Experience timeline entries
- Skill groups and orbit skills
- Certifications

No other files need touching for content changes.

---

## Deployment (Vercel)

1. Push to GitHub
2. Import repo in [vercel.com/new](https://vercel.com/new)
3. Add `GITHUB_TOKEN` in **Project Settings → Environment Variables**
4. Deploy — Vercel auto-detects Next.js

The API routes use `revalidate` so contribution data refreshes every 6 hours and repo data every hour without a full redeploy.

---

## Environment Variables Reference

| Variable | Required | Description |
|---|---|---|
| `GITHUB_TOKEN` | Recommended | GitHub PAT with `read:user` scope. Without it, unauthenticated API calls are rate-limited to 60/hr. |

---

## License

MIT — use freely, attribution appreciated.

---

*Built by [Piyush Kumar Rai](https://github.com/PiyushRai98) · AI/ML Engineer · Generative AI Engineer · Full-Stack Software Engineer*
