import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Clock, User, Sparkles } from "lucide-react";
import type { BlogPost } from "@/data/blogData";

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
        className="mb-8 flex items-center gap-2"
      >
        <Sparkles className="h-5 w-5 text-primary" />
        <h2 className="font-heading text-2xl font-bold text-foreground">Featured Article</h2>
      </motion.div>

      <Link to={`/blog/${post.id}`}>
        <motion.article
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="group relative grid overflow-hidden rounded-3xl bg-card border border-border/50 shadow-[var(--shadow-card)] transition-all duration-500 hover:shadow-[var(--shadow-featured)] hover:border-primary/30 md:grid-cols-2"
        >
          {/* Glow effect on hover */}
          <div className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{
            background: 'radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), hsl(40 88% 51% / 0.06), transparent 40%)'
          }} />

          <div className="relative overflow-hidden">
            <img
              src={post.image}
              alt={post.title}
              width={1200}
              height={640}
              className="h-64 w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 md:h-full"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-foreground/5 to-transparent" />
          </div>

          <div className="relative flex flex-col justify-center p-8 md:p-12 lg:p-14">
            <span className="mb-5 w-fit rounded-full bg-primary/10 border border-primary/20 px-3.5 py-1 text-xs font-semibold text-accent-foreground">
              {post.category}
            </span>
            <h3 className="font-heading text-2xl font-bold leading-tight text-foreground md:text-3xl lg:text-[2rem] transition-colors duration-300 group-hover:text-primary/90">
              {post.title}
            </h3>
            <p className="mt-4 text-muted-foreground leading-relaxed line-clamp-3">
              {post.excerpt}
            </p>
            <div className="mt-6 flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <User className="h-4 w-4" /> {post.author}
              </span>
              <span>{post.date}</span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" /> {post.readTime}
              </span>
            </div>
            <div className="mt-8">
              <span className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground transition-all duration-300 group-hover:gap-3 group-hover:shadow-lg group-hover:shadow-primary/25">
                Read Article <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </span>
            </div>
          </div>
        </motion.article>
      </Link>
    </section>
  );
};

export default FeaturedPost;
