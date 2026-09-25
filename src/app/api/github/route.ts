import { NextResponse } from "next/server";
import { FALLBACK_PROFILE } from "@/utils/github";

export const revalidate = 3600; // Cache for 1 hour

export async function GET() {
  try {
    const headers = {
      "User-Agent": "Nahian-Portfolio-Agent",
      Accept: "application/vnd.github.v3+json",
    };

    const [userRes, reposRes] = await Promise.allSettled([
      fetch("https://api.github.com/users/NahianBinRahman", { headers, next: { revalidate: 3600 } }),
      fetch("https://api.github.com/users/NahianBinRahman/repos?sort=pushed&per_page=30", { credentials: "omit", headers, next: { revalidate: 3600 } }),
    ]);

    let user = FALLBACK_PROFILE;
    let repos: any[] = [];

    if (userRes.status === "fulfilled" && userRes.value.ok) {
      user = await userRes.value.json();
      user.avatar_url = "/avatar.jpg";
    }

    if (reposRes.status === "fulfilled" && reposRes.value.ok) {
      repos = await reposRes.value.json();
    }

    // Language aggregation
    const langCounts: Record<string, number> = {};
    let totalStars = 0;
    let totalForks = 0;

    if (Array.isArray(repos)) {
      repos.forEach((repo) => {
        totalStars += repo.stargazers_count || 0;
        totalForks += repo.forks_count || 0;
        if (repo.language) {
          langCounts[repo.language] = (langCounts[repo.language] || 0) + 1;
        }
      });
    }

    const languageBreakdown = Object.entries(langCounts)
      .map(([lang, count]) => ({
        language: lang,
        count,
        percentage: Math.round((count / (repos.length || 1)) * 100),
      }))
      .sort((a, b) => b.count - a.count);

    return NextResponse.json({
      profile: user,
      metrics: {
        publicRepos: user.public_repos ?? 20,
        followers: user.followers ?? 12,
        following: user.following ?? 15,
        totalStars,
        totalForks,
        languages: languageBreakdown.length > 0 ? languageBreakdown : [
          { language: "TypeScript", count: 10, percentage: 48 },
          { language: "Python", count: 7, percentage: 33 },
          { language: "JavaScript", count: 3, percentage: 14 },
          { language: "CSS/HTML", count: 1, percentage: 5 },
        ],
        streakDays: 42,
        contributionsYear: 384,
      },
      recentRepos: Array.isArray(repos) && repos.length > 0
        ? repos.slice(0, 6).map((r) => ({
            id: r.id,
            name: r.name,
            description: r.description,
            stars: r.stargazers_count,
            forks: r.forks_count,
            language: r.language,
            url: r.html_url,
            homepage: r.homepage,
            updatedAt: r.updated_at,
          }))
        : [],
    });
  } catch (error) {
    console.error("GitHub API fetch error:", error);
    return NextResponse.json({
      profile: FALLBACK_PROFILE,
      metrics: {
        publicRepos: 20,
        followers: 12,
        following: 15,
        totalStars: 5,
        totalForks: 2,
        languages: [
          { language: "TypeScript", count: 10, percentage: 48 },
          { language: "Python", count: 7, percentage: 33 },
          { language: "JavaScript", count: 3, percentage: 14 },
          { language: "CSS/HTML", count: 1, percentage: 5 },
        ],
        streakDays: 42,
        contributionsYear: 384,
      },
      recentRepos: [],
    });
  }
}
