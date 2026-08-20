import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { BlogPost } from "@/data/posts/types";

interface BlogCardProps {
  post: BlogPost;
  index: number;
}

const BlogCard = ({ post, index }: BlogCardProps) => {
  // Exact pastel colors from the reference image
  const getBgColor = (category: string) => {
    const colors: Record<string, string> = {
      "Freelancing Guide": "bg-[#E6F9F0]", // Mint
      "Startup Guide": "bg-[#E6EEFB]", // Blue
      "Support Guide": "bg-[#FCE7F3]", // Pink
      "Finance Guide": "bg-[#FFF4E6]", // Peach
      "Freelancing": "bg-[#E6F9F0]",
      "Startup Hiring": "bg-[#E6EEFB]",
      "Team Collaboration": "bg-[#FCE7F3]",
      "Escrow & Payments": "bg-[#FFF4E6]",
      "Remote Work": "bg-[#E6EEFB]",
      "Productivity": "bg-[#E6F9F0]",
      "For Clients": "bg-[#FFF4E6]",
      "Platform Comparisons": "bg-[#FCE7F3]",
      "Education": "bg-[#E6EEFB]",
      "Freelancing Tips": "bg-[#E6F9F0]",
      "Career Growth": "bg-[#FCE7F3]",
    };
    return colors[category] || "bg-[#F3F4F6]";
  };

  const bgColor = getBgColor(post.category);

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
        <div className={`relative flex h-60 w-full flex-col items-start justify-start p-6 transition-colors duration-500 ${bgColor}`}>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground/70">
              {post.category} • {post.readTime}
            </span>
          </div>
          
          <div className="flex flex-1 w-full items-center justify-center">
            <span className="font-heading text-5xl font-medium tracking-tight text-foreground/10 transition-all duration-700 group-hover:text-foreground/20 group-hover:scale-105 select-none">
              HYVE
            </span>
          </div>
          
          {/* Subtle background image watermark - kept very faint as requested earlier */}
          <div className="absolute inset-0 z-0 opacity-[0.02] grayscale transition-all duration-700 group-hover:opacity-[0.04] pointer-events-none">
            <img 
              src={post.image} 
              alt="" 
              className="h-full w-full object-cover" 
              loading="lazy"
            />
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