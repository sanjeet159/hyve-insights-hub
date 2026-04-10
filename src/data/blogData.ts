// Re-export everything from the new modular structure
// To add a new blog post, create a file in src/data/posts/post-XX.ts and register it in src/data/posts/index.ts
export { featuredPost, blogPosts, categories, popularTopics, getPostBySlug } from "./posts";
export type { BlogPost, Category } from "./posts";
