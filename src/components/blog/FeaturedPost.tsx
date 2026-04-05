import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Clock, User } from "lucide-react";
import type { BlogPost } from "@/data/blogData";

interface FeaturedPostProps {
  post: BlogPost;
}

const FeaturedPost = ({ post }: FeaturedPostProps) => {
  return (
    <section className="container mx-auto px-4 py-16">
      <motion.h2
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mb-8 font-heading text-2xl font-bold text-foreground"
      >
        Featured Article
      </motion.h2>

      <motion.article
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="group grid overflow-hidden rounded-2xl bg-card shadow-[var(--shadow-card)] transition-shadow duration-500 hover:shadow-[var(--shadow-featured)] md:grid-cols-2"
      >
        <div className="overflow-hidden">
          <img
            src={post.image}
            alt={post.title}
            width={1200}
            height={640}
            className="h-64 w-full object-cover transition-transform duration-700 group-hover:scale-105 md:h-full"
          />
        </div>
        <div className="flex flex-col justify-center p-8 md:p-12">
          <span className="mb-4 w-fit rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
            {post.category}
          </span>
          <h3 className="font-heading text-2xl font-bold leading-tight text-foreground md:text-3xl">
            {post.title}
          </h3>
          <p className="mt-4 text-muted-foreground leading-relaxed">
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
          <button className="mt-8 inline-flex w-fit items-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground transition-all duration-200 hover:gap-3 hover:shadow-lg">
            Read Article <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </motion.article>
    </section>
  );
};

export default FeaturedPost;
