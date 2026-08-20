import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { BlogPost } from "@/data/posts/types";

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
        className="group flex h-full flex-col overflow-hidden rounded-[24px] border border-border/40 bg-card shadow-sm transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1"
      >
        {/* Top visual section - Clean, Subtle, Minimalist */}
        <div className="relative flex h-64 w-full items-center justify-center overflow-hidden bg-slate-50/80 transition-colors duration-500 group-hover:bg-slate-100/80">
          <div className="text-center relative z-10 p-8">
            <span className="mb-4 block text-[10px] font-bold uppercase tracking-[0.25em] text-muted-foreground/60">
              {post.category} • {post.readTime}
            </span>
            <span className="block font-heading text-5xl font-black tracking-tighter text-foreground/[0.04] transition-all duration-700 group-hover:text-primary/[0.08] group-hover:scale-105">
              HYVE
            </span>
          </div>
          
          {/* Extremely subtle watermark pattern */}
          <div className="absolute inset-0 z-0 opacity-[0.03] grayscale transition-all duration-700 group-hover:opacity-[0.05] group-hover:scale-110 pointer-events-none">
            <img 
              src={post.image} 
              alt="" 
              className="h-full w-full object-cover" 
              loading="lazy"
            />
          </div>
          
          {/* Subtle vignette */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/5 opacity-50" />
        </div>

        {/* Content area */}
        <div className="flex flex-1 flex-col p-8 bg-card">
          <h3 className="font-heading text-xl font-bold leading-[1.3] text-foreground transition-colors duration-300 group-hover:text-primary line-clamp-2">
            {post.title}
          </h3>
          <p className="mt-4 text-[14px] leading-relaxed text-muted-foreground/80 line-clamp-2">
            {post.excerpt}
          </p>

          <div className="mt-auto pt-8 flex items-center justify-between">
            <time className="text-xs font-medium text-muted-foreground/60 tracking-wide uppercase">
              {post.date}
            </time>
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-foreground/80 transition-all duration-300 group-hover:text-primary group-hover:gap-2">
              Read <ArrowRight className="h-3.5 w-3.5" />
            </div>
          </div>
        </div>
      </motion.article>
    </Link>
  );
};

export default BlogCard;