import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { BlogPost } from "@/data/posts/types";
import { BlogThumbnail } from "./BlogThumbnail";

interface BlogCardProps {
  post: BlogPost;
  index: number;
}

const BlogCard = ({ post, index }: BlogCardProps) => {
  return (
    <Link to={`/blog/${post.slug}`} className="block h-full" aria-label={`Read article: ${post.title}`}>
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5, delay: index * 0.05 }}
        className="group flex h-full flex-col overflow-hidden rounded-[20px] border border-border/40 bg-card shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
      >
        {/* Top visual section - Matches the reference image exactly */}
        <div className="relative">
          <BlogThumbnail post={post} className="h-60 w-full" />
          
          <div className="absolute top-6 left-6 z-10">
            <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground/70">
              {post.category} • {post.readTime}
            </span>
          </div>
        </div>

        {/* Content area - clean white/card background */}
        <div className="flex flex-1 flex-col p-8 bg-card">
          <h3 className="font-heading text-[22px] font-semibold leading-[1.3] text-foreground transition-colors duration-300 group-hover:text-primary line-clamp-2">
            {post.title}
          </h3>
          <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground/80 line-clamp-2">
            {post.excerpt}
          </p>

          <div className="mt-auto pt-8 flex items-center justify-between">
            <time className="text-[14px] text-muted-foreground/60">
              {post.date}
            </time>
            <div className="flex items-center gap-2 text-[14px] font-medium text-foreground transition-all duration-300 group-hover:text-primary group-hover:translate-x-1">
              Read <ArrowRight className="h-4 w-4" />
            </div>
          </div>
        </div>
      </motion.article>
    </Link>
  );
};

export default BlogCard;