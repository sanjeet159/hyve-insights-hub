// Import all posts - to add a new blog, create a new post-XX.ts file and add it here
import post1 from "./post-1";
import post2 from "./post-2";
import post3 from "./post-3";
import post4 from "./post-4";
import post5 from "./post-5";
import post6 from "./post-6";
import post7 from "./post-7";
import post8 from "./post-8";
import post9 from "./post-9";
import post10 from "./post-10";
import post11 from "./post-11";
import post12 from "./post-12";
import post13 from "./post-13";

export type { BlogPost, BlogPostWithContent, Category } from "./types";
export { categories } from "./types";

// All posts in order (first is featured)
export const allPosts = [
  post13,
  post2,
  post3,
  post4,
  post5,
  post6,
  post7,
  post8,
  post9,
  post10,
  post11,
  post12,
  post1
];

// Featured post is the first one (or any with featured: true)
export const featuredPost = allPosts.find((p) => p.featured) || allPosts[0];

// All non-featured posts
export const blogPosts = allPosts.filter((p) => p.id !== featuredPost.id);

// Article content map (for backward compatibility)
export const articleContents: Record<string, string> = Object.fromEntries(
  allPosts.map((p) => [p.id, p.content])
);

export const popularTopics = [
  "How to Build a Freelance Team",
  "Best Freelancing Skills in 2026",
  "Why Escrow Matters",
  "How Startups Can Hire Faster",
  "Freelancing vs Agency",
  "Remote Team Management",
  "Pricing Your Freelance Services",
  "Building a Portfolio That Converts",
];
