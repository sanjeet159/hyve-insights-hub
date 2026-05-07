import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Clock, ArrowUpRight } from "lucide-react";
import type { BlogPost } from "@/data/blogData";

interface BlogCardProps {
  post: BlogPost;
  index: number;
}

const BlogCard = ({ post, index }: BlogCardProps) => {
  // Generate consistent author initials
  const initials = post.author
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("");

  return (
    <Link to={`/blog/${post.slug}`} aria-label={`Read article: ${post.title}`}>
      <motion.article
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5, delay: index * 0.06, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-border/60 bg-card transition-all duration-400 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-[var(--shadow-card-hover)]"
      >
        {/* Image */}
        <div className="relative overflow-hidden">
          <img
            src={post.image}
            alt={post.title}
            loading="lazy"
            width={768}
            height={512}
            className="h-52 w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.07]"
          />
          {/* Gradient bottom shadow */}
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-foreground/30 to-transparent opacity-60" />

          {/* Category pill bottom-left */}
          <div className="absolute bottom-3 left-3">
            <span className="inline-block rounded-full bg-background/95 backdrop-blur-md px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-primary shadow-md">
              {post.category}
            </span>
          </div>

          {/* Hover arrow */}
          <div className="absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 shadow-lg shadow-primary/30">
            <ArrowUpRight className="h-4 w-4" />
          </div>
        </div>

        {/* Body */}
        <div className="flex flex-1 flex-col p-6">
          <h3 className="font-heading text-lg font-bold leading-snug text-foreground line-clamp-2 transition-colors duration-200 group-hover:text-primary">
            {post.title}
          </h3>
          <p className="mt-2.5 text-sm text-muted-foreground line-clamp-2 leading-relaxed">
            {post.excerpt}
          </p>

          {/* Footer meta */}
          <div className="mt-auto pt-5 flex items-center justify-between border-t border-border/50">
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/70 text-[11px] font-bold text-primary-foreground">
                {initials}
              </span>
              <div className="flex flex-col leading-tight">
                <span className="text-xs font-semibold text-foreground">{post.author}</span>
                <span className="text-[11px] text-muted-foreground">{post.date}</span>
              </div>
            </div>
            <span className="flex items-center gap-1 text-[11px] font-medium text-muted-foreground">
              <Clock className="h-3 w-3" /> {post.readTime}
            </span>
          </div>
        </div>
      </motion.article>
    </Link>
  );
};

export default BlogCard;
