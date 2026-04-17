import Footer from "@/components/blog/Footer";
import BlogCard from "@/components/blog/BlogCard";
import { allPosts, blogPosts, getPostBySlug } from "@/data/posts";
import { useMemo } from "react";
import { useMemo, useState } from "react";

const BlogPost = () => {
const { slug } = useParams<{ slug: string }>();
  const [copied, setCopied] = useState(false);

const { scrollYProgress } = useScroll();
const scaleX = useSpring(scrollYProgress, { stiffness: 80, damping: 30, restDelta: 0.001 });
@@ -23,10 +24,36 @@ const BlogPost = () => {
[post]
);

  const fallbackRelated = relatedPosts.length > 0 ? relatedPosts : blogPosts.filter((p) => p.id !== post.id).slice(0, 3);
  const fallbackRelated =
    relatedPosts.length > 0
      ? relatedPosts
      : blogPosts.filter((p) => p.id !== post.id).slice(0, 3);

const articleContent = post.content;

  // ── Button handlers ──────────────────────────────────────────────
  const handleOpenTab = () => {
    window.open(window.location.href, "_blank");
  };

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
@@ -167,22 +194,44 @@ const BlogPost = () => {
</span>
</div>

              {/* ── 3 Action buttons ── */}
<div className="ml-auto flex items-center gap-1.5">
                {[
                  { Icon: ExternalLink, label: "Twitter" },
                  { Icon: Share2, label: "Share" },
                  { Icon: LinkIcon, label: "Copy" },
                ].map(({ Icon, label }) => (
                  <motion.button
                    key={label}
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.94 }}
                    className="rounded-lg border border-border/50 bg-accent/40 p-2 text-muted-foreground transition-colors duration-200 hover:bg-accent hover:text-foreground hover:border-primary/20"
                    title={label}
                  >
                    <Icon className="h-3.5 w-3.5" />
                  </motion.button>
                ))}
                {/* Open in new tab */}
                <motion.button
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.94 }}
                  onClick={handleOpenTab}
                  className="rounded-lg border border-border/50 bg-accent/40 p-2 text-muted-foreground transition-colors duration-200 hover:bg-accent hover:text-foreground hover:border-primary/20"
                  title="Open in new tab"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                </motion.button>

                {/* Share */}
                <motion.button
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.94 }}
                  onClick={handleShare}
                  className="rounded-lg border border-border/50 bg-accent/40 p-2 text-muted-foreground transition-colors duration-200 hover:bg-accent hover:text-foreground hover:border-primary/20"
                  title="Share"
                >
                  <Share2 className="h-3.5 w-3.5" />
                </motion.button>

                {/* Copy link */}
                <motion.button
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.94 }}
                  onClick={handleCopyLink}
                  className="rounded-lg border border-border/50 bg-accent/40 p-2 text-muted-foreground transition-colors duration-200 hover:bg-accent hover:text-foreground hover:border-primary/20"
                  title={copied ? "Copied!" : "Copy link"}
                >
                  {copied ? (
                    <span className="text-[10px] font-semibold text-primary px-0.5">✓</span>
                  ) : (
                    <LinkIcon className="h-3.5 w-3.5" />
                  )}
                </motion.button>
</div>
</motion.div>
</div>
@@ -263,7 +312,7 @@ const BlogPost = () => {
initial={{ opacity: 0, x: -8 }}
whileInView={{ opacity: 1, x: 0 }}
viewport={{ once: true }}
                  transition={{ delay: 0.03 * (parseInt(num || "0")), duration: 0.3 }}
                  transition={{ delay: 0.03 * parseInt(num || "0"), duration: 0.3 }}
className="mb-3 flex gap-3.5 leading-relaxed"
>
<span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[11px] font-bold text-primary">
@@ -274,7 +323,10 @@ const BlogPost = () => {
dangerouslySetInnerHTML={{
__html: trimmed
.replace(/^\d+\.\s/, "")
                        .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-foreground">$1</strong>'),
                        .replace(
                          /\*\*(.*?)\*\*/g,
                          '<strong class="font-semibold text-foreground">$1</strong>'
                        ),
}}
/>
</motion.div>
@@ -287,7 +339,10 @@ const BlogPost = () => {
className="mb-5 text-foreground/70 leading-[1.85] text-[15.5px]"
dangerouslySetInnerHTML={{
__html: trimmed
                    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-foreground">$1</strong>')
                    .replace(
                      /\*\*(.*?)\*\*/g,
                      '<strong class="font-semibold text-foreground">$1</strong>'
                    )
.replace(
/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g,
'<a href="$2" target="_blank" rel="noopener noreferrer" class="font-medium text-primary underline decoration-primary/30 underline-offset-3 hover:decoration-primary transition-colors">$1</a>'
@@ -313,7 +368,9 @@ const BlogPost = () => {
{post.author.charAt(0)}
</div>
<div className="flex-1">
              <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-widest">Written by</p>
              <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-widest">
                Written by
              </p>
<p className="font-heading text-lg font-bold text-foreground mt-1">{post.author}</p>
<p className="mt-2 text-sm text-muted-foreground leading-relaxed">
Contributing writer at HYVE, covering freelancing trends, team collaboration, and the future of work in India.
@@ -334,9 +391,7 @@ const BlogPost = () => {
className="mb-10 flex items-center gap-3"
>
<div className="h-5 w-1 rounded-full bg-primary" />
              <h2 className="font-heading text-2xl font-bold text-foreground">
                Related Articles
              </h2>
              <h2 className="font-heading text-2xl font-bold text-foreground">Related Articles</h2>
</motion.div>
<div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
{fallbackRelated.map((p, i) => (
