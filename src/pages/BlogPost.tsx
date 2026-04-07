import { useParams, Link } from "react-router-dom";
import { motion, useScroll, useSpring } from "framer-motion";
import { ArrowLeft, Clock, User, Calendar, Share2, ExternalLink, Link as LinkIcon, BookOpen } from "lucide-react";
import BlogHeader from "@/components/blog/BlogHeader";
import Newsletter from "@/components/blog/Newsletter";
import FooterCTA from "@/components/blog/FooterCTA";
import BlogCard from "@/components/blog/BlogCard";
import { featuredPost, blogPosts } from "@/data/blogData";
import { articleContents } from "@/data/articleContents";
import { useMemo } from "react";

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 80, damping: 30, restDelta: 0.001 });

  const allPosts = [featuredPost, ...blogPosts];
  const post = allPosts.find((p) => p.id === id) || featuredPost;

  const relatedPosts = useMemo(
    () => blogPosts.filter((p) => p.id !== post.id && p.category === post.category).slice(0, 3),
    [post]
  );

  const fallbackRelated = relatedPosts.length > 0 ? relatedPosts : blogPosts.filter((p) => p.id !== post.id).slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      {/* Reading progress bar */}
      <motion.div
        className="reading-progress"
        style={{ scaleX, transformOrigin: "0%" }}
      />

      <BlogHeader />

      {/* Hero image - full width, clean */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative pt-16"
      >
        <div className="h-64 w-full overflow-hidden md:h-80 lg:h-96">
          <img
            src={post.image}
            alt={post.title}
            className="h-full w-full object-cover"
            width={1200}
            height={640}
          />
          <div className="absolute inset-0 top-16 bg-gradient-to-t from-background via-background/20 to-transparent" />
        </div>
      </motion.div>

      {/* Title section - below image, clean layout */}
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mx-auto max-w-3xl -mt-16 relative z-10"
        >
          {/* Back button */}
          <Link
            to="/"
            className="mb-5 inline-flex items-center gap-2 rounded-full bg-card border border-border/60 px-4 py-2 text-sm font-medium text-foreground shadow-sm transition-all duration-200 hover:bg-accent hover:gap-2.5 hover:shadow-md"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Blog
          </Link>

          {/* Category badge */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.25 }}
            className="mt-3"
          >
            <span className="inline-block rounded-full bg-primary px-4 py-1.5 text-xs font-semibold text-primary-foreground shadow-sm shadow-primary/20">
              {post.category}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-5 font-heading text-3xl font-extrabold leading-[1.15] text-foreground md:text-4xl lg:text-[2.75rem]"
          >
            {post.title}
          </motion.h1>

          {/* Excerpt */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-4 text-lg text-muted-foreground leading-relaxed"
          >
            {post.excerpt}
          </motion.p>
        </motion.div>
      </div>

      {/* Meta bar */}
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="mx-auto mt-8 flex max-w-3xl flex-wrap items-center gap-5 rounded-xl border border-border/50 bg-secondary/30 px-6 py-4 text-sm text-muted-foreground"
        >
          <span className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
              {post.author.charAt(0)}
            </div>
            <span className="font-medium text-foreground">{post.author}</span>
          </span>
          <span className="h-4 w-px bg-border" />
          <span className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4" /> {post.date}
          </span>
          <span className="h-4 w-px bg-border" />
          <span className="flex items-center gap-1.5">
            <Clock className="h-4 w-4" /> {post.readTime}
          </span>
          <span className="h-4 w-px bg-border hidden sm:block" />
          <span className="hidden sm:flex items-center gap-1.5">
            <BookOpen className="h-4 w-4" /> Team Freelancing
          </span>

          {/* Share */}
          <div className="ml-auto flex items-center gap-2">
            <span className="mr-1 text-xs font-medium text-muted-foreground/70">Share</span>
            {[Share2, ExternalLink, LinkIcon].map((Icon, i) => (
              <motion.button
                key={i}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.93 }}
                className="rounded-lg border border-border/50 bg-card p-2 transition-colors duration-200 hover:bg-accent hover:border-primary/30"
              >
                <Icon className="h-3.5 w-3.5" />
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Article content */}
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55, duration: 0.5 }}
        className="container mx-auto px-4 py-14"
      >
        <div className="prose-article mx-auto max-w-3xl">
          {articleContent.split("\n").map((line, i) => {
            const trimmed = line.trim();
            if (!trimmed) return <div key={i} className="h-4" />;

            if (trimmed.startsWith("### "))
              return (
                <motion.h3
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-20px" }}
                  className="mb-4 mt-12 font-heading text-xl font-bold text-foreground"
                >
                  {trimmed.slice(4)}
                </motion.h3>
              );
            if (trimmed.startsWith("## "))
              return (
                <motion.h2
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-20px" }}
                  className="mb-5 mt-14 font-heading text-2xl font-bold text-foreground"
                >
                  {trimmed.slice(3)}
                </motion.h2>
              );
            if (trimmed.startsWith("> "))
              return (
                <motion.blockquote
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  className="my-8 border-l-4 border-primary bg-accent/40 py-5 pl-6 pr-5 text-foreground/80 italic rounded-r-2xl"
                >
                  {trimmed.slice(2).replace(/\*/g, "")}
                </motion.blockquote>
              );
            if (trimmed.startsWith("---"))
              return <hr key={i} className="my-12 border-border/50" />;
            if (/^\d+\.\s/.test(trimmed))
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.03 * (parseInt(trimmed.match(/^(\d+)/)?.[1] || "0")) }}
                  className="mb-3 flex gap-3 text-foreground/80 leading-relaxed"
                >
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                    {trimmed.match(/^(\d+)/)?.[1]}
                  </span>
                  <span
                    dangerouslySetInnerHTML={{
                      __html: trimmed
                        .replace(/^\d+\.\s/, "")
                        .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-foreground">$1</strong>'),
                    }}
                  />
                </motion.div>
              );
            return (
              <p
                key={i}
                className="mb-5 text-foreground/75 leading-[1.8] text-[16.5px]"
                dangerouslySetInnerHTML={{
                  __html: trimmed
                    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-foreground">$1</strong>')
                    .replace(
                      /\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g,
                      '<a href="$2" target="_blank" rel="noopener noreferrer" class="font-medium text-primary underline decoration-primary/30 underline-offset-3 hover:decoration-primary transition-colors">$1</a>'
                    ),
                }}
              />
            );
          })}
        </div>
      </motion.article>

      {/* Author card */}
      <div className="container mx-auto px-4 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto flex max-w-3xl items-center gap-5 rounded-2xl border border-border/50 bg-secondary/40 p-6 md:p-8"
        >
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground shadow-md shadow-primary/20">
            {post.author.charAt(0)}
          </div>
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Written by</p>
            <p className="font-heading text-lg font-bold text-foreground mt-0.5">{post.author}</p>
            <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">
              Contributing writer at HYVE, covering freelancing trends, team collaboration, and the future of work in India.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Related articles */}
      {fallbackRelated.length > 0 && (
        <section className="bg-secondary/30 py-20">
          <div className="container mx-auto px-4">
            <motion.h2
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-10 font-heading text-2xl font-bold text-foreground"
            >
              Related Articles
            </motion.h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {fallbackRelated.map((p, i) => (
                <BlogCard post={p} index={i} key={p.id} />
              ))}
            </div>
          </div>
        </section>
      )}

      <Newsletter />
      <FooterCTA />
    </div>
  );
};

export default BlogPost;
