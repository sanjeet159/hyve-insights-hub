import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion, useScroll, useSpring } from "framer-motion";
import {
  ChevronRight,
  Clock,
  Calendar,
  Share2,
  ExternalLink,
  LinkIcon,
  Home,
} from "lucide-react";
import BlogHeader from "@/components/blog/BlogHeader";
import Newsletter from "@/components/blog/Newsletter";
import FooterCTA from "@/components/blog/FooterCTA";
import Footer from "@/components/blog/Footer";
import BlogCard from "@/components/blog/BlogCard";
import BlogSidebar from "@/components/blog/BlogSidebar";
import TableOfContents from "@/components/blog/TableOfContents";
import { allPosts, blogPosts, getPostBySlug } from "@/data/posts";
import { useMemo, useState } from "react";

// Detect if content is HTML or plain markdown
const isHTML = (str: string) => /<\s*[a-z][\s\S]*>/i.test(str.trim());

const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();

// Markdown renderer
const renderMarkdown = (content: string) =>
  content.split("\n").map((line, i) => {
    const t = line.trim();
    if (!t) return <div key={i} className="h-3" />;

    if (t.startsWith("### ")) {
      const text = t.slice(4);
      return (
        <h3
          key={i}
          id={slugify(text)}
          className="mb-4 mt-10 font-heading text-xl font-bold text-foreground scroll-mt-24"
        >
          {text}
        </h3>
      );
    }

    if (t.startsWith("## ")) {
      const text = t.slice(3);
      return (
        <h2
          key={i}
          id={slugify(text)}
          className="mb-5 mt-12 font-heading text-2xl font-bold text-foreground relative scroll-mt-24"
        >
          <span className="absolute -left-4 top-1 w-1 h-6 rounded-full bg-primary hidden lg:block" />
          {text}
        </h2>
      );
    }

    if (t.startsWith("> "))
      return (
        <blockquote
          key={i}
          className="my-8 border-l-[3px] border-primary bg-accent/50 py-5 pl-6 pr-5 text-foreground/80 italic rounded-r-xl text-[15px] leading-relaxed"
        >
          {t.slice(2).replace(/\*/g, "")}
        </blockquote>
      );

    if (t.startsWith("---"))
      return (
        <div key={i} className="my-12 flex items-center gap-4">
          <div className="h-px flex-1 bg-border/50" />
          <div className="h-1.5 w-1.5 rounded-full bg-primary/60" />
          <div className="h-px flex-1 bg-border/50" />
        </div>
      );

    if (/^\d+\.\s/.test(t)) {
      const num = t.match(/^(\d+)/)?.[1];
      return (
        <div key={i} className="mb-3 flex gap-3.5 leading-relaxed">
          <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[11px] font-bold text-primary">
            {num}
          </span>
          <span
            className="text-foreground/75 text-[15.5px]"
            dangerouslySetInnerHTML={{
              __html: t
                .replace(/^\d+\.\s/, "")
                .replace(
                  /\*\*(.*?)\*\*/g,
                  '<strong class="font-semibold text-foreground">$1</strong>'
                ),
            }}
          />
        </div>
      );
    }

    return (
      <p
        key={i}
        className="mb-5 text-foreground/75 leading-[1.85] text-[15.5px]"
        dangerouslySetInnerHTML={{
          __html: t
            .replace(
              /\*\*(.*?)\*\*/g,
              '<strong class="font-semibold text-foreground">$1</strong>'
            )
            .replace(
              /\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g,
              '<a href="$2" target="_blank" rel="noopener noreferrer" class="font-medium text-primary underline decoration-primary/30 underline-offset-3 hover:decoration-primary transition-colors">$1</a>'
            ),
        }}
      />
    );
  });

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [copied, setCopied] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 30,
    restDelta: 0.001,
  });

  const post = getPostBySlug(slug || "") || allPosts[0];

  const relatedPosts = useMemo(
    () =>
      blogPosts
        .filter((p) => p.id !== post.id && p.category === post.category)
        .slice(0, 3),
    [post]
  );

  const fallbackRelated =
    relatedPosts.length > 0
      ? relatedPosts
      : blogPosts.filter((p) => p.id !== post.id).slice(0, 3);

  const handleOpenTab = () =>
    window.open(window.location.href, "_blank", "noopener,noreferrer");

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: post.title, url: window.location.href });
    } else {
      window.open(
        `https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(post.title)}`,
        "_blank"
      );
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.metaDescription,
    author: { "@type": "Person", name: post.author },
    datePublished: post.date,
    image: post.image,
    keywords: post.keywords?.join(", "),
    publisher: {
      "@type": "Organization",
      name: "HYVE",
      url: "https://hyvefreelance.com",
    },
  };

  const htmlContent = isHTML(post.content);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{post.metaTitle}</title>
        <meta name="description" content={post.metaDescription} />
        <meta name="keywords" content={post.keywords?.join(", ")} />
        <link
          rel="canonical"
          href={`https://blog.hyvefreelance.com/blog/${post.slug}`}
        />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={post.metaTitle} />
        <meta property="og:description" content={post.metaDescription} />
        <meta property="og:image" content={post.image} />
        <meta
          property="og:url"
          content={`https://blog.hyvefreelance.com/blog/${post.slug}`}
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.metaTitle} />
        <meta name="twitter:description" content={post.metaDescription} />
        <meta name="twitter:image" content={post.image} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      {/* Reading progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] z-[60] origin-left"
        style={{
          scaleX,
          background:
            "linear-gradient(90deg, hsl(40 88% 51%), hsl(35 95% 55%))",
        }}
      />

      <BlogHeader />

      <main>
      {/* Main 2-column container */}
      <div className="container mx-auto px-4 pt-24 md:pt-28">
        {/* Breadcrumbs */}
        <motion.nav
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          aria-label="Breadcrumb"
          className="mb-6 flex items-center gap-1.5 text-sm"
        >
          <Link
            to="/"
            className="flex items-center gap-1 text-primary transition-colors hover:text-primary/80"
          >
            <Home className="h-3.5 w-3.5" />
            Home
          </Link>
          <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/50" />
          <Link
            to="/"
            className="text-primary transition-colors hover:text-primary/80"
          >
            Blogs
          </Link>
          <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/50" />
          <span className="text-muted-foreground line-clamp-1">
            {post.title}
          </span>
        </motion.nav>

        <div className="grid gap-10 lg:grid-cols-[1fr_340px]">
          {/* Main column */}
          <article className="min-w-0">
            {/* Hero Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.99 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="relative overflow-hidden rounded-2xl shadow-md"
            >
              <img
                src={post.image}
                alt={post.title}
                className={`h-[260px] w-full object-cover md:h-[400px] lg:h-[460px] object-${post.imagePosition || "center"}`}
                width={1200}
                height={640}
              />
            </motion.div>

            {/* Meta row above title */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.4 }}
              className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm"
            >
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
                {post.category}
              </span>
              <span className="flex items-center gap-1.5 text-muted-foreground">
                <Clock className="h-3.5 w-3.5" />
                {post.readTime}
              </span>
              <span className="flex items-center gap-1.5 text-muted-foreground">
                <Calendar className="h-3.5 w-3.5" />
                Last updated on {post.date}
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="mt-4 font-heading text-3xl font-extrabold leading-[1.15] text-foreground md:text-4xl lg:text-[2.5rem]"
            >
              {post.title}
            </motion.h1>

            {/* Subtitle / excerpt */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mt-4 text-lg font-medium text-foreground/80 leading-relaxed"
            >
              {post.excerpt}
            </motion.p>

            {/* Author + share row */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
              className="mt-6 flex items-center justify-between gap-4 border-y border-border/50 py-4"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/80 text-base font-bold text-primary-foreground shadow-sm">
                  {post.author.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground leading-none">
                    {post.author}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Contributing Writer at HYVE
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <span className="hidden sm:inline-block mr-1 text-xs font-medium text-muted-foreground">
                  Share:
                </span>
                <motion.button
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.94 }}
                  onClick={handleOpenTab}
                  className="rounded-lg border border-border/50 bg-accent/40 p-2 text-muted-foreground transition-colors duration-200 hover:bg-accent hover:text-foreground hover:border-primary/20"
                  title="Open in new tab"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.94 }}
                  onClick={handleShare}
                  className="rounded-lg border border-border/50 bg-accent/40 p-2 text-muted-foreground transition-colors duration-200 hover:bg-accent hover:text-foreground hover:border-primary/20"
                  title="Share"
                >
                  <Share2 className="h-3.5 w-3.5" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.94 }}
                  onClick={handleCopyLink}
                  className="rounded-lg border border-border/50 bg-accent/40 p-2 text-muted-foreground transition-colors duration-200 hover:bg-accent hover:text-foreground hover:border-primary/20"
                  title={copied ? "Copied!" : "Copy link"}
                >
                  {copied ? (
                    <span className="text-[10px] font-semibold text-primary px-0.5">
                      ✓
                    </span>
                  ) : (
                    <LinkIcon className="h-3.5 w-3.5" />
                  )}
                </motion.button>
              </div>
            </motion.div>

            {/* Mobile-only TOC */}
            <div className="mt-8 lg:hidden">
              <TableOfContents content={post.content} />
            </div>

            {/* Article body */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="mt-10"
            >
              {htmlContent ? (
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
              ) : (
                renderMarkdown(post.content)
              )}
            </motion.div>

            {/* Inline mid-article CTA */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-12 relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-accent/80 via-accent/50 to-card p-6 md:p-8"
            >
              <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-primary/15 blur-3xl" />
              <div className="relative flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex-1">
                  <p className="text-xs font-bold uppercase tracking-widest text-primary mb-2">
                    💡 Ready to take action?
                  </p>
                  <h3 className="font-heading text-xl md:text-2xl font-bold text-foreground leading-tight">
                    Stop chasing payments. Start working with security.
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    Join 2,500+ Indian freelancers who get paid on time, every time, with HYVE's escrow protection.
                  </p>
                </div>
                <a
                  href="https://hyvefreelance.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground shadow-md transition-all duration-300 hover:gap-3 hover:shadow-lg hover:shadow-primary/25"
                >
                  Get Started Free
                  <ChevronRight className="h-4 w-4" />
                </a>
              </div>
            </motion.div>

            {/* Author card */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mt-12 rounded-2xl border border-border/40 bg-gradient-to-br from-accent/60 to-accent/30 p-6 md:p-7"
            >
              <div className="flex items-start gap-4 md:gap-5">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/80 text-lg font-bold text-primary-foreground shadow-md shadow-primary/15">
                  {post.author.charAt(0)}
                </div>
                <div className="flex-1">
                  <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-widest">
                    Written by
                  </p>
                  <p className="font-heading text-lg font-bold text-foreground mt-1">
                    {post.author}
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    Contributing writer at HYVE, covering freelancing trends, team
                    collaboration, and the future of work in India.
                  </p>
                </div>
              </div>
            </motion.div>
          </article>

          {/* Sticky sidebar */}
          <div className="hidden lg:block">
            <div className="sticky top-24 space-y-6">
              <TableOfContents content={post.content} />
              <BlogSidebar currentPostId={post.id} />
            </div>
          </div>

          {/* Mobile sidebar (below article) */}
          <div className="lg:hidden">
            <BlogSidebar currentPostId={post.id} />
          </div>
        </div>
      </div>

      {/* Related articles */}
      {fallbackRelated.length > 0 && (
        <section className="mt-16 border-t border-border/40 bg-accent/20 py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-10 flex items-center gap-3"
            >
              <div className="h-5 w-1 rounded-full bg-primary" />
              <h2 className="font-heading text-2xl font-bold text-foreground">
                Keep Reading
              </h2>
            </motion.div>
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
      <Footer />
    </div>
  );
};

export default BlogPost;
