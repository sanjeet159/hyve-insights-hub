import { motion } from "framer-motion";
import { Clock, User } from "lucide-react";
import type { BlogPost } from "@/data/blogData";

interface BlogCardProps {
  post: BlogPost;
  index: number;
}

const BlogCard = ({ post, index }: BlogCardProps) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="card-hover-border group cursor-pointer overflow-hidden rounded-2xl bg-card shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)]"
    >
      <div className="overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          loading="lazy"
          width={768}
          height={512}
          className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-6">
        <span className="inline-block rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
          {post.category}
        </span>
        <h3 className="mt-3 font-heading text-lg font-bold leading-snug text-foreground line-clamp-2">
          {post.title}
        </h3>
        <p className="mt-2 text-sm text-muted-foreground line-clamp-2 leading-relaxed">
          {post.excerpt}
        </p>
        <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <User className="h-3.5 w-3.5" /> {post.author}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" /> {post.readTime}
          </span>
        </div>
        <p className="mt-1 text-xs text-muted-foreground">{post.date}</p>
      </div>
    </motion.article>
  );
};

export default BlogCard;
