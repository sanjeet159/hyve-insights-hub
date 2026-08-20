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
import post14 from "./post-14";
import post15 from "./post-15";
import post16 from "./post-16";
import post17 from "./post-17";
import post18 from "./post-18";
import post19 from "./post-19";
import post20 from "./post-20";
import post21 from "./post-21";
import post22 from "./post-22";
import post23 from "./post-23";
import post24 from "./post-24";
import post25 from "./post-25";
import post26 from "./post-26";
import post27 from "./post-27";
import post28 from "./post-28";
import post29 from "./post-29";

export type { BlogPost, BlogPostWithContent, Category } from "./types";
export { categories } from "./types";

// All posts in order (first is featured)
export const allPosts = [
  post29,
  post28,
  post27,
  post26,
  post25,
  post24,
  post23,
  post22,
  post16,
  post17,
  post15,
  post18,
  post14,
  post19,
  post13,
  post20,
  post21,
  post6,
  post12,
  post11,
  post7,
  post9,
  post10,
  post1,
  post2,
  post3,
  post4,
  post5,
  post8,
];


// Featured post is the first one (or any with featured: true)
export const featuredPost = allPosts.find((p) => p.featured) || allPosts[0];

// All non-featured posts
export const blogPosts = allPosts.filter((p) => p.id !== featuredPost.id);

// Lookup by slug
export const getPostBySlug = (slug: string) => allPosts.find((p) => p.slug === slug);

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
