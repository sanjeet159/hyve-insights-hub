export const categories = [
  "All",
  "Freelancing",
  "Startup Hiring",
  "Team Collaboration",
  "Escrow & Payments",
  "Remote Work",
  "Productivity",
] as const;

export type Category = (typeof categories)[number];

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: Exclude<Category, "All">;
  author: string;
  date: string;
  readTime: string;
  image: string;
  featured?: boolean;
}

export interface BlogPostWithContent extends BlogPost {
  content: string;
}
