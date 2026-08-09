import { NextResponse } from "next/server";

// Revalidate every hour
export const revalidate = 3600;

const GITHUB_LOGIN = "PiyushRai98";

export interface GithubRepo {
  name: string;
  description: string | null;
  stars: number;
  language: string | null;
  topics: string[];
  url: string;
  updatedAt: string;
}

export async function GET() {
  const token = process.env.GITHUB_TOKEN;

  // Abort after 8 seconds
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);

  try {
    const headers: Record<string, string> = {
      Accept: "application/vnd.github+json",
      "User-Agent": "portfolio-app",
      "X-GitHub-Api-Version": "2022-11-28",
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const res = await fetch(
      `https://api.github.com/users/${GITHUB_LOGIN}/repos?sort=updated&per_page=20&type=owner`,
      { headers, next: { revalidate }, signal: controller.signal }
    );

    clearTimeout(timeout);

    if (!res.ok) {
      throw new Error(`GitHub API responded with ${res.status}`);
    }

    const repos = await res.json();

    const shaped: GithubRepo[] = (repos as Array<Record<string, unknown>>)
      .filter((r) => !r.fork && !r.archived)
      .slice(0, 12)
      .map((r) => ({
        name: r.name as string,
        description: (r.description as string | null) ?? null,
        stars: (r.stargazers_count as number) ?? 0,
        language: (r.language as string | null) ?? null,
        topics: (r.topics as string[]) ?? [],
        url: r.html_url as string,
        updatedAt: r.updated_at as string,
      }));

    return NextResponse.json(shaped);
  } catch (err) {
    clearTimeout(timeout);
    console.error("[github-repos]", err);
    return NextResponse.json(
      { error: "Failed to fetch repository data" },
      { status: 502 }
    );
  }
}
