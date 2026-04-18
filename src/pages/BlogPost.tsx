import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion, useScroll, useSpring } from "framer-motion";
import {
  ArrowLeft,
  Clock,
  Calendar,
  Share2,
  ExternalLink,
  LinkIcon,
  BookOpen,
} from "lucide-react";
import BlogHeader from "@/components/blog/BlogHeader";
import Newsletter from "@/components/blog/Newsletter";
import FooterCTA from "@/components/blog/FooterCTA";
import Footer from "@/components/blog/Footer";
import BlogCard from "@/components/blog/BlogCard";
import { allPosts, blogPosts, getPostBySlug } from "@/data/posts";
import { useMemo, useState } from "react";

// Detect if content is HTML or plain markdown
const isHTML = (str: string) => /<\s*[a-z][\s\S]*>/i.test(str.trim());

// Markdown renderer for old posts (posts 1-4)
const renderMarkdown = (content: string) =>
  content.split("\n").map((line, i) => {
    const t = line.trim();
    if (!t) return <div key={i} className="h-3" />;

    if (t.startsWith("### "))
      return (
        <h3
          key={i}
          className="mb-4 mt-10 font-heading text-xl font-bold text-foreground"
        >
          {t.slice(4)}
        </h3>
      );

    if (t.startsWith("## "))
      return (
        <h2
          key={i}
          className="mb-5 mt-12 font-heading text-2xl font-bold text-foreground relative"
        >
          <span className="absolute -left-4 top-1 w-1 h-6 rounded-full bg-primary hidden lg:block" />
          {t.slice(3)}
        </h2>
      );

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
        className="mb-5 text-foreground/70 leading-[1.85] text-[15.5px]"
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

      {/* Hero section */}
      <div className="pt-16">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div className="relative h-[280px] md:h-[380px] lg:h-[440px] w-full overflow-hidden">
            <motion.img
              initial={{ scale: 1.05 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              src={post.image}
              alt={post.title}
              className={`h-full w-full object-cover object-${post.imagePosition || "center"}`}
              width={1200}
              height={640}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-background/10" />
          </div>
        </motion.div>

        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl -mt-28 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="flex items-center gap-3 mb-5"
            >
              <Link
                to="/"
                className="inline-flex items-center gap-1.5 rounded-full bg-background/90 backdrop-blur-sm border border-border/50 px-3.5 py-1.5 text-xs font-medium text-muted-foreground shadow-sm transition-all duration-200 hover:text-foreground hover:border-primary/30 hover:shadow-md group"
              >
                <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
                Back
              </Link>
              <span className="inline-block rounded-full bg-primary/10 border border-primary/20 px-3.5 py-1.5 text-xs font-semibold text-primary">
                {post.category}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="font-heading text-3xl font-extrabold leading-[1.12] text-foreground md:text-4xl lg:text-[2.65rem]"
            >
              {post.title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="mt-4 text-base text-muted-foreground leading-relaxed md:text-lg max-w-2xl"
            >
              {post.excerpt}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="mt-7 flex flex-wrap items-center gap-4 pb-8 border-b border-border/50"
            >
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/80 text-sm font-bold text-primary-foreground shadow-sm">
                  {post.author.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground leading-none">
                    {post.author}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Contributing Writer
                  </p>
                </div>
              </div>

              <span className="hidden sm:block h-5 w-px bg-border/60" />

              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" />
                  {post.date}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" />
                  {post.readTime}
                </span>
                <span className="hidden sm:flex items-center gap-1.5">
                  <BookOpen className="h-3.5 w-3.5" />
                  {post.category}
                </span>
              </div>

              {/* Share buttons */}
              <div className="ml-auto flex items-center gap-1.5">
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
          </div>
        </div>
      </div>

      {/* Article body */}
      <motion.article
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="container mx-auto px-4 py-12"
      >
        <div className="mx-auto max-w-3xl">
          {htmlContent ? (
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          ) : (
            renderMarkdown(post.content)
          )}
        </div>
      </motion.article>

      {/* Author card */}
      <div className="container mx-auto px-4 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl rounded-2xl border border-border/40 bg-gradient-to-br from-accent/60 to-accent/30 p-6 md:p-8"
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
      </div>

      {/* Related articles */}
      {fallbackRelated.length > 0 && (
        <section className="border-t border-border/40 bg-accent/20 py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-10 flex items-center gap-3"
            >
              <div className="h-5 w-1 rounded-full bg-primary" />
              <h2 className="font-heading text-2xl font-bold text-foreground">
                Related Articles
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
