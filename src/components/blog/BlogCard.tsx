import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Clock, User, ArrowUpRight } from "lucide-react";
import type { BlogPost } from "@/data/blogData";

interface BlogCardProps {
  post: BlogPost;
  index: number;
}

const BlogCard = ({ post, index }: BlogCardProps) => {
  return (
    <Link to={`/blog/${post.id}`}>
      <motion.article
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="card-hover-border group cursor-pointer overflow-hidden rounded-2xl bg-card shadow-[var(--shadow-card)] transition-all duration-400 hover:-translate-y-1.5 hover:shadow-[var(--shadow-card-hover)]"
      >
        <div className="relative overflow-hidden">
          <img
            src={post.image}
            alt={post.title}
            loading="lazy"
            width={768}
            height={512}
            className="h-52 w-full object-cover transition-transform duration-600 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <div className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-background/80 backdrop-blur-sm opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
            <ArrowUpRight className="h-4 w-4 text-foreground" />
          </div>
        </div>

        <div className="p-6">
          <span className="inline-block rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
            {post.category}
          </span>
          <h3 className="mt-3 font-heading text-lg font-bold leading-snug text-foreground line-clamp-2 transition-colors duration-200 group-hover:text-primary/85">
            {post.title}
          </h3>
          <p className="mt-2 text-sm text-muted-foreground line-clamp-2 leading-relaxed">
            {post.excerpt}
          </p>
          <div className="mt-5 flex items-center justify-between text-xs text-muted-foreground pt-4 border-t border-border/50">
            <span className="flex items-center gap-1.5">
              <User className="h-3.5 w-3.5" /> {post.author}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" /> {post.readTime}
            </span>
          </div>
          <p className="mt-1.5 text-xs text-muted-foreground/70">{post.date}</p>
        </div>
      </motion.article>
    </Link>
  );
};

export default BlogCard;
