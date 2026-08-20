import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, Star, ArrowRight, Briefcase, Users, Zap } from "lucide-react";
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
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-primary to-primary/85 p-6 text-primary-foreground shadow-md"
      >
        <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
        <div className="absolute -bottom-12 -left-12 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
        <div className="relative">
          <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-white/20 backdrop-blur-sm px-3 py-1 text-[11px] font-bold uppercase tracking-wider">
            <Sparkles className="h-3 w-3" />
            For Startups
          </div>
          <h3 className="font-heading text-xl font-extrabold leading-tight">
            Hire Pre-Vetted Freelance Teams
          </h3>
          <p className="mt-2 text-sm text-primary-foreground/90 leading-relaxed">
            Build your product 3x faster with battle-tested teams on HYVE.
            Escrow-protected, milestone-based.
          </p>
          <a
            href="https://hyvefreelance.com"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-primary shadow-sm transition-all duration-300 hover:gap-3 hover:shadow-md"
          >
            <Briefcase className="h-4 w-4" />
            Hire a Team
            <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </motion.div>

      {/* Marketing CTA — For Freelancers */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.15 }}
        className="relative overflow-hidden rounded-2xl border border-border/50 bg-foreground p-6 text-background shadow-md"
      >
        <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-primary/30 blur-2xl" />
        <div className="relative">
          <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-primary/20 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-primary">
            <Zap className="h-3 w-3" />
            For Freelancers
          </div>
          <h3 className="font-heading text-lg font-extrabold leading-tight text-background">
            Get Paid Before You Start Working
          </h3>
          <p className="mt-2 text-xs text-background/70 leading-relaxed">
            Join HYVE's escrow-protected freelance network. No more chasing invoices.
          </p>
          <a
            href="https://hyvefreelance.com"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground transition-all duration-300 hover:gap-3 hover:shadow-md hover:shadow-primary/30"
          >
            <Users className="h-4 w-4" />
            Join as Freelancer
            <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </motion.div>
    </aside>
  );
};

export default BlogSidebar;
