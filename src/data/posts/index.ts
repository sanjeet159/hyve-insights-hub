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
import post30 from "./post-30";
import post31 from "./post-31";
import post32 from "./post-32";
import post33 from "./post-33";
import post34 from "./post-34";
import post35 from "./post-35";
import post36 from "./post-36";
import post37 from "./post-37";
import post38 from "./post-38";
import post39 from "./post-39";
import post40 from "./post-40";
import post41 from "./post-41";
import post42 from "./post-42";
import post43 from "./post-43";
import post44 from "./post-44";
import post45 from "./post-45";
import post46 from "./post-46";
import post47 from "./post-47";
import post48 from "./post-48";
import post49 from "./post-49";
import post50 from "./post-50";
import post51 from "./post-51";
import post52 from "./post-52";
import post53 from "./post-53";
import post54 from "./post-54";
import post55 from "./post-55";
import post56 from "./post-56";
import post57 from "./post-57";
import post58 from "./post-58";
import post59 from "./post-59";
import post60 from "./post-60";
import post61 from "./post-61";
import post62 from "./post-62";
import post63 from "./post-63";
import post64 from "./post-64";
import post65 from "./post-65";
import post66 from "./post-66";
import post67 from "./post-67";
import post68 from "./post-68";
import post69 from "./post-69";
import post70 from "./post-70";
import post71 from "./post-71";
import post72 from "./post-72";
import post73 from "./post-73";
import post74 from "./post-74";
import post75 from "./post-75";
import post76 from "./post-76";
import post77 from "./post-77";
import post78 from "./post-78";
import post79 from "./post-79";
import post80 from "./post-80";
import post81 from "./post-81";
import post82 from "./post-82";
import post83 from "./post-83";
import post84 from "./post-84";
import post85 from "./post-85";
import post86 from "./post-86";
import post87 from "./post-87";
import post88 from "./post-88";
import post89 from "./post-89";
import post90 from "./post-90";
import post91 from "./post-91";
import post92 from "./post-92";
import post93 from "./post-93";
import post94 from "./post-94";
import post95 from "./post-95";


export type { BlogPost, BlogPostWithContent, Category } from "./types";
export { categories } from "./types";

// All posts in order (first is featured)
export const allPosts = [
  post1,
  post95,
  post94,
  post93,
  post92,
  post91,
  post90,
  post89,
  post88,
  post87,
  post86,
  post85,
  post84,
  post83,
  post82,
  post81,
  post80,
  post79,
  post78,
  post77,
  post76,
  post75,
  post74,
  post73,
  post72,
  post71,
  post70,
  post69,
  post68,
  post67,
  post66,
  post65,
  post64,
  post63,
  post62,
  post61,
  post60,
  post59,
  post58,
  post57,
  post56,
  post55,
  post54,
  post53,
  post52,
  post51,
  post50,
  post49,
  post48,
  post47,
  post46,
  post45,
  post44,
  post43,
  post42,
  post41,
  post40,
  post39,
  post38,
  post37,
  post36,
  post35,
  post34,
  post33,
  post32,
  post30,
  post31,
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
