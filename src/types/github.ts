export interface GitHubProfile {
  login: string;
  name: string;
  avatar_url: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
  location: string;
  blog: string;
  twitter_username: string | null;
  company: string | null;
  html_url: string;
  created_at: string;
  updated_at: string;
}

export interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  topics: string[];
  updated_at: string;
}

export interface ProjectShowcase {
  title: string;
  tagline: string;
  description: string;
  tags: string[];
  category: "AI & ML" | "Full-Stack" | "Enterprise / Automation" | "Creative / Tooling";
  featured: boolean;
  githubUrl: string;
  liveUrl?: string;
  stats: {
    stars?: number;
    metrics?: string;
  };
  highlights: string[];
  gradient: string;
  glowColor: string;
}
