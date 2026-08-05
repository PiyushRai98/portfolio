import { NextResponse } from "next/server";

// Revalidate every 6 hours — contribution data doesn't need to be real-time
export const revalidate = 21600;

const GITHUB_LOGIN = "PiyushRai98";

const query = `
  query($login: String!) {
    user(login: $login) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
              color
            }
          }
        }
      }
    }
  }
`;

export async function GET() {
  const token = process.env.GITHUB_TOKEN;

  if (!token) {
    return NextResponse.json(
      { error: "GITHUB_TOKEN not configured" },
      { status: 500 }
    );
  }

  try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "User-Agent": "portfolio-app",
      },
      body: JSON.stringify({ query, variables: { login: GITHUB_LOGIN } }),
      next: { revalidate },
    });

    if (!res.ok) {
      throw new Error(`GitHub API responded with ${res.status}`);
    }

    const json = await res.json();

    if (json.errors) {
      throw new Error(json.errors[0]?.message ?? "GraphQL error");
    }

    const calendar =
      json.data?.user?.contributionsCollection?.contributionCalendar;

    if (!calendar) {
      throw new Error("Unexpected response shape from GitHub API");
    }

    return NextResponse.json(calendar);
  } catch (err) {
    console.error("[github-contributions]", err);
    return NextResponse.json(
      { error: "Failed to fetch contribution data" },
      { status: 502 }
    );
  }
}
