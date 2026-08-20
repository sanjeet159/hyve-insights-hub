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
import PopularTopics from "@/components/blog/PopularTopics";
import { allPosts, blogPosts, getPostBySlug } from "@/data/posts";
import { useMemo, useState } from "react";
import { BlogThumbnail } from "@/components/blog/BlogThumbnail";
import AISearchOverview from "@/components/blog/AISearchOverview";


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

  const postUrl = `https://blog.hyvefreelance.com/blog/${post.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${postUrl}#post`,
    "headline": post.title,
    "description": post.metaDescription,
    "author": {
      "@type": "Person",
      "name": post.author,
      "url": "https://blog.hyvefreelance.com",
      "jobTitle": "Contributing Writer",
      "worksFor": {
        "@type": "Organization",
        "@id": "https://hyvefreelance.com/#organization",
        "name": "HYVE",
        "url": "https://hyvefreelance.com"
      }
    },
    "datePublished": post.date,
    "dateModified": post.date,
    "image": post.image?.startsWith("http")
      ? post.image
      : `https://blog.hyvefreelance.com${post.image}`,
    "keywords": post.keywords?.join(", "),
    "articleSection": post.category,
    "inLanguage": "en-IN",
    "mainEntityOfPage": { 
      "@type": "WebPage", 
      "@id": postUrl 
    },
    "wordCount": post.content.split(/\s+/).length,
    "timeRequired": `PT${post.readTime.split(" ")[0]}M`,
    "publisher": {
      "@type": "Organization",
      "@id": "https://hyvefreelance.com/#organization",
      "name": "HYVE",
      "url": "https://hyvefreelance.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://blog.hyvefreelance.com/logo.png"
      }
    }
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { 
        "@type": "ListItem", 
        "position": 1, 
        "name": "Home", 
        "item": "https://blog.hyvefreelance.com/" 
      },
      { 
        "@type": "ListItem", 
        "position": 2, 
        "name": post.category, 
        "item": `https://blog.hyvefreelance.com/?category=${encodeURIComponent(post.category)}` 
      },
      { 
        "@type": "ListItem", 
        "position": 3, 
        "name": post.title, 
        "item": postUrl 
      }
    ]
  };

  const htmlContent = isHTML(post.content);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{post.metaTitle}</title>
        <meta name="description" content={post.metaDescription} />
        <meta name="keywords" content={post.keywords?.join(", ")} />
        <meta name="author" content={post.author} />
        <meta name="publisher" content="HYVE" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
        <link rel="canonical" href={postUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="HYVE Blog" />
        <meta property="og:title" content={post.metaTitle} />
        <meta property="og:description" content={post.metaDescription} />
        <meta property="og:image" content={post.image} />
        <meta property="og:url" content={postUrl} />
        <meta property="og:locale" content="en_IN" />
        <meta property="article:published_time" content={post.date} />
        <meta property="article:modified_time" content={post.date} />
        <meta property="article:author" content={post.author} />
        <meta property="article:section" content={post.category} />
        {post.keywords?.map((k) => (
          <meta key={k} property="article:tag" content={k} />
        ))}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@HYVEfreelance" />
        <meta name="twitter:title" content={post.metaTitle} />
        <meta name="twitter:description" content={post.metaDescription} />
        <meta name="twitter:image" content={post.image} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbLd)}</script>
        {post.faqs && post.faqs.length > 0 && (
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: post.faqs.map((f) => ({
                "@type": "Question",
                name: f.question,
                acceptedAnswer: { "@type": "Answer", text: f.answer },
              })),
            })}
          </script>
        )}
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
        <div className="pt-20">
          {/* Typographic Hero Section - Centered with beige background */}
          <section className="relative overflow-hidden bg-[#F5F3EF] py-20 md:py-32">
            <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center opacity-[0.04]">
              <BlogThumbnail post={post} size="lg" className="w-full h-full bg-transparent" hideImage />
            </div>
            <div className="container relative z-10 mx-auto px-4 text-center max-w-4xl">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="mb-8 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60"
              >
                <span>{post.category}</span>
                <span className="h-1 w-1 rounded-full bg-border" />
                <span>{post.readTime}</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="font-heading text-4xl font-extrabold leading-[1.15] text-foreground md:text-5xl lg:text-[4.2rem]"
              >
                {post.title}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="mt-8 text-xl font-medium text-foreground/70 max-w-2xl mx-auto leading-relaxed"
              >
                {post.excerpt}
              </motion.p>

              {/* Author Info */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="mt-12 flex flex-col items-center justify-center gap-4"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white border border-border/50 shadow-sm overflow-hidden p-0.5">
                  <img src="/favicon.ico" alt="HYVE" className="h-full w-full object-contain rounded-full" />
                </div>
                <div className="text-center">
                  <p className="text-base font-bold text-foreground">Sanjeet Kumar</p>
                  <div className="mt-1.5 flex items-center justify-center gap-2 text-[13px] font-medium text-muted-foreground/60">
                    <span>Co-founder, HYVE</span>
                    <span className="h-1 w-1 rounded-full bg-border/80" />
                    <span>{post.date}</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Article content area */}
          <div className="container mx-auto px-4 py-16 max-w-7xl">
            <div className="grid gap-12 lg:grid-cols-[1fr_340px]">
              {/* Main column */}
              <div className="min-w-0">
                <article>
                  {/* AI Overview Box */}
                  <AISearchOverview 
                    summary={post.excerpt}
                    takeaways={[
                      "The Core Challenges in B2B Outbound",
                      "Strategic Overview of Lusha API in Clay",
                      "Comparative Performance Analysis",
                      "Tactical Action Plan: Building the Pipeline"
                    ]}
                  />

                  {/* Body Content */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="mt-2"
                  >
                    {htmlContent ? (
                      <div dangerouslySetInnerHTML={{ __html: post.content }} />
                    ) : (
                      renderMarkdown(post.content)
                    )}
                  </motion.div>

                  {/* Share buttons row */}
                  <div className="mt-12 flex items-center justify-between border-y border-border/50 py-6">
                    <div className="flex items-center gap-4">
                      <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground/60">Share</span>
                      <div className="flex gap-2">
                        <button onClick={handleShare} className="h-9 w-9 flex items-center justify-center rounded-lg border border-border/50 bg-accent/20 text-muted-foreground hover:bg-primary hover:text-white transition-all"><Share2 className="h-4 w-4" /></button>
                        <button onClick={handleCopyLink} className="h-9 w-9 flex items-center justify-center rounded-lg border border-border/50 bg-accent/20 text-muted-foreground hover:bg-primary hover:text-white transition-all"><LinkIcon className="h-4 w-4" /></button>
                      </div>
                    </div>
                  </div>
                </article>

                {/* Author card */}
                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="mt-12 rounded-2xl border border-border/40 bg-gradient-to-br from-accent/60 to-accent/30 p-6 md:p-7"
                >
                  <div className="flex items-start gap-4 md:gap-5">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-background border border-border/50 shadow-md overflow-hidden p-2">
                      <img src="/favicon.ico" alt="HYVE" className="h-full w-full object-contain" />
                    </div>
                    <div className="flex-1">
                      <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-widest">
                        Written by
                      </p>
                      <p className="font-heading text-lg font-bold text-foreground mt-1">
                        Sanjeet Kumar
                      </p>
                      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                        Co-founder at HYVE, covering freelancing trends, team
                        collaboration, and the future of work in India.
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* FAQ section */}
                {post.faqs && post.faqs.length > 0 && (
                  <motion.section
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mt-12 scroll-mt-24"
                    id="faq"
                    aria-labelledby="faq-heading"
                  >
                    <div className="mb-6 flex items-center gap-3">
                      <div className="h-5 w-1 rounded-full bg-primary" />
                      <h2
                        id="faq-heading"
                        className="font-heading text-2xl font-bold text-foreground"
                      >
                        Common Questions about {post.title}
                      </h2>
                    </div>
                    <div className="divide-y divide-border/50 rounded-2xl border border-border/50 bg-card/40 overflow-hidden">
                      {post.faqs.map((faq, i) => (
                        <details
                          key={i}
                          className="group p-5 md:p-6 [&_summary::-webkit-details-marker]:hidden"
                        >
                          <summary className="flex cursor-pointer items-start justify-between gap-4 list-none">
                            <h3 className="font-semibold text-foreground text-base md:text-[17px] leading-snug">
                              {faq.question}
                            </h3>
                            <ChevronRight className="h-5 w-5 shrink-0 text-primary transition-transform duration-300 group-open:rotate-90" />
                          </summary>
                          <p className="mt-3 text-foreground/75 leading-relaxed text-[15px]">
                            {faq.answer}
                          </p>
                        </details>
                      ))}
                    </div>
                  </motion.section>
                )}
              </div>

              {/* Sidebar */}
              <aside className="space-y-8">
                {/* Sticky sidebar */}
                <div className="hidden lg:block">
                  <div className="sticky top-24 space-y-8">
                    <TableOfContents content={post.content} />
                    <BlogSidebar currentPostId={post.id} />
                  </div>
                </div>

                {/* Mobile sidebar (below article) */}
                <div className="lg:hidden">
                  <BlogSidebar currentPostId={post.id} />
                </div>
              </aside>
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
      </main>

      <div className="mt-8">
        <PopularTopics />
      </div>
      <Newsletter />
      <FooterCTA />
      <Footer />
    </div>
  );
};


export default BlogPost;
