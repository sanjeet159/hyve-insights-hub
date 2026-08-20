import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Clock, Sparkles, Calendar } from "lucide-react";
import type { BlogPost } from "@/data/blogData";
import teamLogoAsset from "@/assets/hyve-flaticon-full.jpg.asset.json";

interface FeaturedPostProps {
  post: BlogPost;
}

const FeaturedPost = ({ post }: FeaturedPostProps) => {
  return (
    <section className="container mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-8 flex items-center justify-between gap-4"
      >
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Editor's Pick
          </span>
        </div>
        <div className="hidden h-px flex-1 bg-gradient-to-r from-border via-border/40 to-transparent md:block" />
      </motion.div>

      <Link to={`/blog/${post.slug}`} aria-label={`Read featured article: ${post.title}`}>
        <motion.article
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="group relative overflow-hidden rounded-3xl border border-border/60 bg-card shadow-[var(--shadow-card)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[var(--shadow-featured)] hover:border-primary/40"
        >
          <div className="grid md:grid-cols-[1.15fr_1fr]">
            {/* Image side with overlay tag */}
            <div className="relative overflow-hidden">
              <img
                src={post.image}
                alt={post.title}
                width={1200}
                height={800}
                className="h-72 w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.06] md:h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-foreground/40 via-foreground/10 to-transparent" />

              {/* Floating category */}
              <div className="absolute top-5 left-5">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-background/95 backdrop-blur-md px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary shadow-md">
                  <Sparkles className="h-3 w-3" />
                  {post.category}
                </span>
              </div>

              {/* Featured badge bottom */}
              <div className="absolute bottom-5 left-5 hidden md:flex items-center gap-2 rounded-full bg-foreground/85 backdrop-blur-md px-4 py-2 text-xs font-medium text-background">
                <span className="flex h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                Most read this week
              </div>
            </div>

            {/* Content side */}
            <div className="relative flex flex-col justify-center p-8 md:p-10 lg:p-14">
              {/* Decorative accent */}
              <div className="absolute top-0 left-0 h-1 w-20 bg-gradient-to-r from-primary to-primary/0 md:hidden" />

              <h2 className="font-heading text-2xl font-extrabold leading-[1.15] tracking-tight text-foreground md:text-3xl lg:text-[2.25rem] transition-colors duration-300 group-hover:text-primary">
                {post.title}
              </h2>

              <p className="mt-5 text-muted-foreground leading-relaxed line-clamp-3 md:text-[15px]">
                {post.excerpt}
              </p>

              {/* Meta strip */}
              <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground border-t border-border/50 pt-5">
                <span className="flex items-center gap-1.5 font-medium text-foreground">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-background border border-border/50 shadow-sm overflow-hidden">
                    <img src={teamLogoAsset.url} alt="HYVE" className="h-full w-full object-cover" />
                  </span>
                  {post.author}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" /> {post.date}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" /> {post.readTime}
                </span>
              </div>

              <div className="mt-8 flex items-center justify-between gap-4">
                <span className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground transition-all duration-300 group-hover:gap-3 group-hover:shadow-xl group-hover:shadow-primary/30">
                  Read full story <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
                <span className="hidden text-xs font-medium uppercase tracking-wider text-muted-foreground sm:inline">
                  Free read · No signup
                </span>
              </div>
            </div>
          </div>
        </motion.article>
      </Link>
    </section>
  );
};

export default FeaturedPost;
