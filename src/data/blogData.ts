import blogFeatured from "@/assets/blog-featured.jpg";
import blog1 from "@/assets/blog-1.jpg";
import blog2 from "@/assets/blog-2.jpg";
import blog3 from "@/assets/blog-3.jpg";
import blog4 from "@/assets/blog-4.jpg";
import blog5 from "@/assets/blog-5.jpg";
import blog6 from "@/assets/blog-6.jpg";

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

export const featuredPost: BlogPost = {
  id: "1",
  title: "The Rise of Team-Based Freelancing: Why the Future Isn't Solo",
  excerpt:
    "Traditional freelancing is evolving. Discover how team-based freelancing on HYVE is empowering professionals to deliver enterprise-grade work while staying independent. Learn the strategies top freelance teams use to win bigger projects and build lasting client relationships.",
  category: "Freelancing",
  author: "Arjun Mehta",
  date: "Apr 2, 2026",
  readTime: "8 min read",
  image: blogFeatured,
  featured: true,
};

export const blogPosts: BlogPost[] = [
  {
    id: "2",
    title: "5 Ways Startups Can Hire Freelance Teams Faster in 2026",
    excerpt:
      "Speed is everything for startups. Here's how to streamline your freelance hiring pipeline and get work done faster.",
    category: "Startup Hiring",
    author: "Priya Sharma",
    date: "Mar 28, 2026",
    readTime: "5 min read",
    image: blog1,
  },
  {
    id: "3",
    title: "Remote Work in India: The Complete Guide for Freelancers",
    excerpt:
      "From setting up your workspace to managing clients across time zones — everything you need to thrive remotely.",
    category: "Remote Work",
    author: "Karan Patel",
    date: "Mar 25, 2026",
    readTime: "7 min read",
    image: blog2,
  },
  {
    id: "4",
    title: "Understanding Escrow Payments: A Freelancer's Safety Net",
    excerpt:
      "Escrow payments protect both freelancers and clients. Learn how HYVE's built-in escrow system works.",
    category: "Escrow & Payments",
    author: "Neha Gupta",
    date: "Mar 20, 2026",
    readTime: "4 min read",
    image: blog3,
  },
  {
    id: "5",
    title: "10 Productivity Hacks Every Freelancer Should Know",
    excerpt:
      "Maximize your output without burning out. These proven productivity techniques will transform your workflow.",
    category: "Productivity",
    author: "Rohan Verma",
    date: "Mar 15, 2026",
    readTime: "6 min read",
    image: blog4,
  },
  {
    id: "6",
    title: "Building a High-Performing Remote Freelance Team",
    excerpt:
      "Learn the frameworks and tools that help distributed teams collaborate effectively and deliver quality work.",
    category: "Team Collaboration",
    author: "Ananya Singh",
    date: "Mar 10, 2026",
    readTime: "5 min read",
    image: blog5,
  },
  {
    id: "7",
    title: "From Solo Freelancer to Team Lead: A Growth Story",
    excerpt:
      "How one developer scaled from solo projects to leading a 6-person freelance team on HYVE.",
    category: "Freelancing",
    author: "Vikram Rao",
    date: "Mar 5, 2026",
    readTime: "6 min read",
    image: blog6,
  },
];

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
