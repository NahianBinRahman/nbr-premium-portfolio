export type CaseStudyCategory =
  | "All"
  | "AI & Agents"
  | "Web Dev"
  | "Admin & CRM"
  | "Mobile & IoT"
  | "Automation";

export interface CaseStudy {
  id: string;
  title: string;
  tagline: string;
  client?: string;
  summary: string;
  category: "AI & Agents" | "Web Dev" | "Admin & CRM" | "Mobile & IoT" | "Automation";
  tags: string[];
  metrics: string;
  liveUrl?: string;
  githubUrl?: string;
  highlights: string[];
  featured?: boolean;
  gradient?: string;
  badge?: string;
}
