import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, User, Calendar, Share2, ExternalLink, Link as LinkIcon, BookOpen } from "lucide-react";
import BlogHeader from "@/components/blog/BlogHeader";
import Newsletter from "@/components/blog/Newsletter";
import FooterCTA from "@/components/blog/FooterCTA";
import BlogCard from "@/components/blog/BlogCard";
import { featuredPost, blogPosts } from "@/data/blogData";
import { useMemo } from "react";

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

  const allPosts = [featuredPost, ...blogPosts];
  const post = allPosts.find((p) => p.id === id) || featuredPost;

  const relatedPosts = useMemo(
    () => blogPosts.filter((p) => p.id !== post.id && p.category === post.category).slice(0, 3),
    [post]
  );

  const fallbackRelated = relatedPosts.length > 0 ? relatedPosts : blogPosts.filter((p) => p.id !== post.id).slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <BlogHeader />

      {/* Hero */}
      <section className="relative pt-20">
        <div className="h-72 w-full overflow-hidden md:h-[420px]">
          <img
            src={post.image}
            alt={post.title}
            className="h-full w-full object-cover"
            width={1200}
            height={640}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent" />
        </div>

        <div className="container relative z-10 mx-auto -mt-32 px-4 md:-mt-40">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-3xl"
          >
            <Link
              to="/"
              className="mb-6 inline-flex items-center gap-2 rounded-full bg-background/90 px-4 py-2 text-sm font-medium text-foreground backdrop-blur-sm transition-colors hover:bg-background"
            >
              <ArrowLeft className="h-4 w-4" /> Back to Blog
            </Link>

            <span className="mt-4 inline-block rounded-full bg-primary px-4 py-1.5 text-xs font-semibold text-primary-foreground">
              {post.category}
            </span>

            <h1 className="mt-4 font-heading text-3xl font-extrabold leading-tight text-background md:text-4xl lg:text-5xl">
              {post.title}
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Meta bar */}
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mx-auto mt-8 flex max-w-3xl flex-wrap items-center gap-5 border-b border-border pb-6 text-sm text-muted-foreground"
        >
          <span className="flex items-center gap-1.5">
            <User className="h-4 w-4" /> {post.author}
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
            <span className="mr-1 text-xs font-medium">Share:</span>
            <button className="rounded-lg border border-border p-2 transition-colors hover:bg-accent">
              <Twitter className="h-4 w-4" />
            </button>
            <button className="rounded-lg border border-border p-2 transition-colors hover:bg-accent">
              <Linkedin className="h-4 w-4" />
            </button>
            <button className="rounded-lg border border-border p-2 transition-colors hover:bg-accent">
              <LinkIcon className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      </div>

      {/* Article content */}
      <motion.article
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="container mx-auto px-4 py-12"
      >
        <div className="prose-article mx-auto max-w-3xl">
          {articleContent.split("\n").map((line, i) => {
            const trimmed = line.trim();
            if (!trimmed) return <div key={i} className="h-4" />;

            if (trimmed.startsWith("### "))
              return (
                <h3 key={i} className="mb-4 mt-10 font-heading text-xl font-bold text-foreground">
                  {trimmed.slice(4)}
                </h3>
              );
            if (trimmed.startsWith("## "))
              return (
                <h2 key={i} className="mb-5 mt-12 font-heading text-2xl font-bold text-foreground">
                  {trimmed.slice(3)}
                </h2>
              );
            if (trimmed.startsWith("> "))
              return (
                <blockquote
                  key={i}
                  className="my-8 border-l-4 border-primary bg-accent/50 py-4 pl-6 pr-4 text-foreground/80 italic rounded-r-xl"
                >
                  {trimmed.slice(2).replace(/\*/g, "")}
                </blockquote>
              );
            if (trimmed.startsWith("---"))
              return <hr key={i} className="my-10 border-border" />;
            if (/^\d+\.\s/.test(trimmed))
              return (
                <div key={i} className="mb-2 flex gap-3 text-foreground/80 leading-relaxed">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                    {trimmed.match(/^(\d+)/)?.[1]}
                  </span>
                  <span
                    dangerouslySetInnerHTML={{
                      __html: trimmed
                        .replace(/^\d+\.\s/, "")
                        .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-foreground">$1</strong>'),
                    }}
                  />
                </div>
              );
            return (
              <p
                key={i}
                className="mb-4 text-foreground/80 leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html: trimmed
                    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-foreground">$1</strong>')
                    .replace(
                      /\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g,
                      '<a href="$2" target="_blank" rel="noopener noreferrer" class="font-medium text-primary underline decoration-primary/30 underline-offset-2 hover:decoration-primary">$1</a>'
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
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto flex max-w-3xl items-center gap-5 rounded-2xl bg-secondary/60 p-6 md:p-8"
        >
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
            {post.author.charAt(0)}
          </div>
          <div>
            <p className="text-xs font-medium text-muted-foreground">Written by</p>
            <p className="font-heading text-lg font-bold text-foreground">{post.author}</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Contributing writer at HYVE, covering freelancing trends, team collaboration, and the future of work in India.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Related articles */}
      {fallbackRelated.length > 0 && (
        <section className="bg-secondary/30 py-16">
          <div className="container mx-auto px-4">
            <h2 className="mb-8 font-heading text-2xl font-bold text-foreground">
              Related Articles
            </h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {fallbackRelated.map((p, i) => (
                <Link to={`/blog/${p.id}`} key={p.id}>
                  <BlogCard post={p} index={i} />
                </Link>
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
