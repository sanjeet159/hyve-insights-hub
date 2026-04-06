import { useParams, Link } from "react-router-dom";
import { motion, useScroll, useSpring } from "framer-motion";
import { ArrowLeft, Clock, User, Calendar, Share2, ExternalLink, Link as LinkIcon, BookOpen } from "lucide-react";
import BlogHeader from "@/components/blog/BlogHeader";
import Newsletter from "@/components/blog/Newsletter";
import FooterCTA from "@/components/blog/FooterCTA";
import BlogCard from "@/components/blog/BlogCard";
import { featuredPost, blogPosts } from "@/data/blogData";
import { useMemo, useRef } from "react";

const articleContent = `
## The Shift from Solo to Team-Based Freelancing

The freelancing landscape is undergoing a fundamental transformation. For decades, freelancing meant working alone — a solo designer, a lone developer, an independent writer. But as projects grow in complexity and clients demand end-to-end solutions, a new model is emerging: **team-based freelancing**.

At HYVE, we've seen this shift firsthand. Freelancers who form collaborative teams consistently win larger projects, deliver higher-quality work, and build more sustainable careers than their solo counterparts.

### Why Clients Prefer Teams

Today's startups and enterprises don't just need a single skill — they need comprehensive solutions. A mobile app project requires designers, developers, QA testers, and project managers working in harmony. Rather than hiring and coordinating five individual freelancers, clients increasingly prefer to engage a cohesive team that already has established workflows.

> "When we switched to hiring freelance teams on HYVE instead of individuals, our project delivery time dropped by 40% and the quality was noticeably better." — *Rajesh Kumar, CTO at TechStart India*

### The Benefits for Freelancers

Team-based freelancing isn't just better for clients — it's transformative for freelancers too:

1. **Higher-value projects**: Teams can take on enterprise-grade work that no individual could handle alone
2. **Reduced burnout**: Shared workloads mean sustainable pace and better work-life balance
3. **Skill complementarity**: Each team member brings unique strengths, creating a whole greater than its parts
4. **Consistent income**: Teams build reputations that attract recurring clients
5. **Professional growth**: Working alongside talented peers accelerates learning

### How to Build Your Freelance Team

Building a successful freelance team requires intentional effort. Here's a framework we've seen work repeatedly on HYVE:

**Start with your core skill.** Identify what you do best, then find complementary talent. If you're a frontend developer, partner with a backend developer and a UI designer.

**Establish clear processes.** Document your team's workflow, communication norms, and quality standards before taking on clients. This investment pays dividends in smoother project delivery.

**Use the right tools.** Leverage project management platforms, shared communication channels, and version control systems. HYVE provides built-in collaboration tools designed specifically for freelance teams.

**Build trust gradually.** Start with a small project together before committing to larger engagements. Ensure your working styles are compatible and that everyone is reliable.

### The Role of Escrow in Team Freelancing

One of the biggest challenges in team-based freelancing is payment distribution. HYVE's built-in escrow system solves this elegantly — clients deposit funds into escrow, and upon milestone completion, payments are automatically distributed to team members based on pre-agreed splits.

This removes the friction and trust issues that often plague freelance collaborations, letting teams focus on what they do best: delivering exceptional work.

### Looking Ahead

The future of freelancing is collaborative. As remote work becomes the norm and global talent pools expand, the ability to form and lead effective freelance teams will become one of the most valuable skills in the gig economy.

Whether you're a seasoned solo freelancer looking to scale or a newcomer wanting to fast-track your career, team-based freelancing on HYVE offers a path to more meaningful, profitable, and sustainable work.

---

*Ready to build your freelance team? [Join HYVE](https://hyvefreelance.com) and connect with talented professionals across India.*
`;

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const articleRef = useRef<HTMLElement>(null);

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

      {/* Hero */}
      <section className="relative pt-16">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="h-72 w-full overflow-hidden md:h-[440px]"
        >
          <img
            src={post.image}
            alt={post.title}
            className="h-full w-full object-cover"
            width={1200}
            height={640}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/30 to-foreground/5" />
        </motion.div>

        <div className="container relative z-10 mx-auto -mt-36 px-4 md:-mt-44">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mx-auto max-w-3xl"
          >
            <Link
              to="/"
              className="mb-6 inline-flex items-center gap-2 rounded-full bg-background/90 px-4 py-2 text-sm font-medium text-foreground backdrop-blur-sm transition-all duration-200 hover:bg-background hover:shadow-sm hover:gap-2.5"
            >
              <ArrowLeft className="h-4 w-4" /> Back to Blog
            </Link>

            <motion.span
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-4 inline-block rounded-full bg-primary px-4 py-1.5 text-xs font-semibold text-primary-foreground shadow-sm"
            >
              {post.category}
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.5 }}
              className="mt-4 font-heading text-3xl font-extrabold leading-[1.15] text-background md:text-4xl lg:text-5xl"
            >
              {post.title}
            </motion.h1>
          </motion.div>
        </div>
      </section>

      {/* Meta bar */}
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="mx-auto mt-8 flex max-w-3xl flex-wrap items-center gap-5 border-b border-border/60 pb-6 text-sm text-muted-foreground"
        >
          <span className="flex items-center gap-1.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
              {post.author.charAt(0)}
            </div>
            {post.author}
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4" /> {post.date}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="h-4 w-4" /> {post.readTime}
          </span>
          <span className="flex items-center gap-1.5">
            <BookOpen className="h-4 w-4" /> Team Freelancing
          </span>

          {/* Share */}
          <div className="ml-auto flex items-center gap-2">
            <span className="mr-1 text-xs font-medium text-muted-foreground/70">Share:</span>
            {[Share2, ExternalLink, LinkIcon].map((Icon, i) => (
              <motion.button
                key={i}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.93 }}
                className="rounded-lg border border-border/60 p-2 transition-colors duration-200 hover:bg-accent hover:border-primary/30"
              >
                <Icon className="h-4 w-4" />
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Article content */}
      <motion.article
        ref={articleRef}
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
