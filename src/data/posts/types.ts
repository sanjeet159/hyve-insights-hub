export const categories = [
  "All",
  "Freelancing",
  "Startup Hiring",
  "Team Collaboration",
  "Escrow & Payments",
  "Remote Work",
  "Productivity",
  "For Clients",
  "Platform Comparisons",
  "Education",
  "Freelancing Tips",
  "Career Growth",
] as const;

export type Category = (typeof categories)[number];

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  excerpt: string;
  category: Exclude<Category, "All">;
  author: string;
  date: string;
  readTime: string;
  image: string;
  featured?: boolean;
  imagePosition?: "top" | "center" | "bottom" | "left" | "right";
}

export interface BlogPostWithContent extends BlogPost {
  content: string;
}
