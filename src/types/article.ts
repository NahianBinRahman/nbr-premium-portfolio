export interface Article {
  id: string;
  title: string;
  link: string;
  guid?: string;
  pubDate: string;
  formattedDate: string;
  creator: string;
  coverImage: string | null;
  snippet: string;
  categories: string[];
  readTime: string;
  featured?: boolean;
}

export interface MediumFeedResponse {
  success: boolean;
  source: "live" | "fallback";
  updatedAt: string;
  profileUrl: string;
  author: string;
  total: number;
  articles: Article[];
}
