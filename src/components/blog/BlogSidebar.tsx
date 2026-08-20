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
        className="rounded-2xl border border-border/50 bg-card p-5 shadow-sm"
      >
        <div className="mb-5 flex items-center gap-2">
          <Star className="h-4 w-4 fill-primary text-primary" />
          <h3 className="font-heading text-xs font-bold uppercase tracking-widest text-foreground">
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
            Get TYPPOUT
          </div>
          <h3 className="font-heading text-xl font-bold leading-tight mb-3">
            Turn social conversations into booked meetings.
          </h3>
          <p className="text-xs text-white/60 leading-relaxed mb-6">
            Starts 7-day free trial. No credit card required.
          </p>
          <a
            href="https://hyvefreelance.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#8b5cf6] px-5 py-3 text-sm font-bold text-white shadow-sm transition-all duration-300 hover:bg-[#7c3aed]"
          >
            Get started — it's free
          </a>
        </div>
      </motion.div>

      {/* Share Section */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="rounded-2xl border border-border/40 bg-white p-6 shadow-sm"
      >
        <div className="mb-4">
          <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60">Share</h3>
        </div>
        <div className="flex gap-2">
          <button className="h-8 w-8 flex items-center justify-center rounded-lg border border-border/50 text-muted-foreground hover:bg-accent transition-colors"><LinkIcon className="h-3.5 w-3.5" /></button>
          <button className="h-8 w-8 flex items-center justify-center rounded-lg border border-border/50 text-muted-foreground hover:bg-accent transition-colors"><Zap className="h-3.5 w-3.5" /></button>
          <button className="h-8 w-8 flex items-center justify-center rounded-lg border border-border/50 text-muted-foreground hover:bg-accent transition-colors"><Users className="h-3.5 w-3.5" /></button>
        </div>
      </motion.div>
    </aside>
  );
};

export default BlogSidebar;
