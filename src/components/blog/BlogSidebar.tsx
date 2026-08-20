import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, Star, ArrowRight, Briefcase, Users, Zap, Link as LinkIcon } from "lucide-react";
import { blogPosts, type BlogPost } from "@/data/posts";
import { BlogThumbnail } from "./BlogThumbnail";

interface BlogSidebarProps {
  currentPostId: string;
}

const BlogSidebar = ({ currentPostId }: BlogSidebarProps) => {
  // Pick top 3 featured/recent posts excluding current
  const featuredPosts = blogPosts
    .filter((p) => p.id !== currentPostId)
    .slice(0, 3);

  return (
    <aside className="space-y-6">
      {/* Featured Blogs */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="rounded-2xl border border-[#E5E2DD] bg-[#F9F8F6] p-7 shadow-sm"
      >
        <div className="mb-6 flex items-center gap-2">
          <h3 className="font-heading text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60">
            Featured Blogs
          </h3>
        </div>
        <div className="space-y-4">
          {featuredPosts.map((p: BlogPost) => (
            <Link
              key={p.id}
              to={`/blog/${p.slug}`}
              className="group flex gap-3"
            >
              <BlogThumbnail 
                post={p} 
                size="sm" 
                className="h-16 w-16 flex-shrink-0 rounded-lg shadow-sm" 
              />
              <div className="flex-1 min-w-0">
                <span className="inline-block rounded-full bg-accent/60 px-2 py-0.5 text-[10px] font-semibold text-accent-foreground">
                  {p.category}
                </span>
                <h4 className="mt-1 line-clamp-2 text-sm font-semibold text-foreground leading-snug transition-colors group-hover:text-primary">
                  {p.title}
                </h4>
                <p className="mt-1 text-[11px] text-muted-foreground">
                  {p.readTime} · {p.date}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </motion.div>

      {/* Marketing CTA — Hire a Team */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.05 }}
        className="relative overflow-hidden rounded-2xl bg-[#0d0d0d] p-7 text-white shadow-xl"
      >
        <div className="relative">
          <div className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white/70">
            HYVE FOR TEAMS
          </div>
          <h3 className="font-heading text-xl font-bold leading-tight mb-3">
            Build and manage your freelance teams at scale.
          </h3>
          <p className="text-xs text-white/60 leading-relaxed mb-6">
            Get started with India's first team-based freelancing platform.
          </p>
          <a
            href="https://hyvefreelance.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#F1AB13] px-5 py-3 text-sm font-bold text-white shadow-sm transition-all duration-300 hover:bg-[#d99a11]"
          >
            Hire a Team
          </a>
        </div>
      </motion.div>

      {/* Share Section */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="rounded-2xl border border-[#E5E2DD] bg-[#F9F8F6] p-7 shadow-sm"
      >
        <div className="mb-5">
          <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/40">Share</h3>
        </div>
        <div className="flex gap-2.5">
          <button className="h-9 w-9 flex items-center justify-center rounded-lg border border-[#E5E2DD] bg-white text-muted-foreground/60 hover:bg-accent transition-colors"><LinkIcon className="h-3.5 w-3.5" /></button>
          <button className="h-9 w-9 flex items-center justify-center rounded-lg border border-[#E5E2DD] bg-white text-muted-foreground/60 hover:bg-accent transition-colors"><Zap className="h-3.5 w-3.5" /></button>
          <button className="h-9 w-9 flex items-center justify-center rounded-lg border border-[#E5E2DD] bg-white text-muted-foreground/60 hover:bg-accent transition-colors"><Users className="h-3.5 w-3.5" /></button>
        </div>
      </motion.div>
    </aside>
  );
};

export default BlogSidebar;
