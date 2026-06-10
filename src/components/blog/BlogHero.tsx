import { Search, Sparkles, TrendingUp, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { categories, type Category } from "@/data/blogData";

interface BlogHeroProps {
  activeCategory: Category;
  onCategoryChange: (cat: Category) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

const BlogHero = ({ activeCategory, onCategoryChange, searchQuery, onSearchChange }: BlogHeroProps) => {
  return (
    <section className="relative overflow-hidden pb-16 pt-28 md:pt-40 md:pb-20">
      {/* Layered warm gradient background */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-accent/80 via-accent/30 to-background" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 90% 60% at 50% 0%, hsl(40 88% 51% / 0.18), transparent 60%), radial-gradient(ellipse 60% 50% at 85% 30%, hsl(35 95% 55% / 0.12), transparent 60%), radial-gradient(ellipse 60% 50% at 15% 40%, hsl(40 88% 51% / 0.10), transparent 60%)",
        }}
      />

      {/* Floating orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ x: [0, 50, -20, 0], y: [0, -40, 20, 0], scale: [1, 1.15, 0.9, 1] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-32 -left-32 h-[36rem] w-[36rem] rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, hsl(40 88% 51% / 0.22), transparent 70%)" }}
        />
        <motion.div
          animate={{ x: [0, -40, 25, 0], y: [0, 30, -20, 0], scale: [1, 0.9, 1.1, 1] }}
          transition={{ duration: 26, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          className="absolute -top-20 -right-32 h-[32rem] w-[32rem] rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, hsl(35 95% 55% / 0.18), transparent 70%)" }}
        />
      </div>

      {/* Subtle grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(hsl(220 20% 10%) 1px, transparent 1px), linear-gradient(90deg, hsl(220 20% 10%) 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse 70% 60% at 50% 40%, black, transparent 80%)",
        }}
      />

      <div className="container relative z-10 mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-4xl text-center"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mb-7 w-fit"
          >
            <span className="group inline-flex items-center gap-2 rounded-full border border-primary/30 bg-background/80 backdrop-blur-md px-5 py-2 text-xs font-semibold tracking-[0.18em] uppercase text-primary shadow-[0_4px_20px_-4px_hsl(40_88%_51%/0.25)]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              <Sparkles className="h-3.5 w-3.5" />
              HYVE Insights
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="font-heading text-5xl font-extrabold tracking-[-0.025em] text-foreground md:text-7xl lg:text-[5rem] leading-[0.98]"
          >
            Insights for the<br />
            Future of{" "}
            <span className="relative inline-block">
              <span className="text-gradient-primary">Freelancing</span>
              <motion.svg
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ delay: 1, duration: 1.2, ease: "easeInOut" }}
                viewBox="0 0 300 12"
                className="absolute -bottom-2 left-0 w-full"
                fill="none"
              >
                <motion.path
                  d="M2 8 Q 80 2, 150 6 T 298 5"
                  stroke="hsl(40 88% 51%)"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </motion.svg>
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.6 }}
            className="mt-8 text-base md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto"
          >
            Real playbooks on freelancing, startup hiring, remote teams, escrow payments
            and team collaboration — written for India's new generation of independent talent.
          </motion.p>

          {/* Stats strip */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.6 }}
            className="mx-auto mt-10 flex flex-wrap items-center justify-center gap-x-3 gap-y-3"
          >
            <div className="flex items-center gap-2 rounded-full border border-border/60 bg-background/70 backdrop-blur-sm px-4 py-2 text-sm">
              <span className="font-heading text-base font-bold text-foreground">50+</span>
              <span className="text-muted-foreground">in-depth articles</span>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-border/60 bg-background/70 backdrop-blur-sm px-4 py-2 text-sm">
              <span className="font-heading text-base font-bold text-foreground">12</span>
              <span className="text-muted-foreground">expert categories</span>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-sm px-4 py-2 text-sm text-primary">
              <TrendingUp className="h-4 w-4" />
              <span className="font-semibold">Updated weekly</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="mx-auto mt-12 max-w-2xl"
        >
          <div className="relative group">
            {/* Glow */}
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-primary/30 via-primary-glow/30 to-primary/30 opacity-0 blur-xl transition-opacity duration-500 group-focus-within:opacity-100" />
            <div className="relative flex items-center">
              <Search className="absolute left-6 top-1/2 h-5 w-5 -translate-y-1/2 text-primary stroke-[2.5]" />
              <input
                type="text"
                placeholder="Search articles, topics, guides..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                aria-label="Search articles"
                className="w-full rounded-full border border-border/70 bg-background/95 backdrop-blur-md py-5 pl-16 pr-32 text-base text-foreground shadow-[0_10px_40px_-10px_rgba(0,0,0,0.12)] outline-none transition-all duration-300 placeholder:text-muted-foreground/60 focus:border-primary/50"
              />
              <button
                type="button"
                aria-label="Search"
                className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex items-center gap-1.5 rounded-full bg-foreground px-5 py-2.5 text-sm font-semibold text-background transition-all duration-300 hover:bg-primary hover:scale-105"
              >
                Search
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Trending chips */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs text-muted-foreground">
            <span className="font-medium">Trending:</span>
            {["Hire freelance team", "Escrow payments", "Remote work India"].map((t) => (
              <button
                key={t}
                onClick={() => onSearchChange(t)}
                className="rounded-full border border-border/50 bg-background/60 px-3 py-1 transition-all hover:border-primary/40 hover:text-primary"
              >
                {t}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Category pills */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mx-auto mt-10 flex max-w-3xl flex-wrap justify-center gap-2"
        >
          {categories.map((cat, i) => (
            <motion.button
              key={cat}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.85 + i * 0.03, duration: 0.3 }}
              onClick={() => onCategoryChange(cat)}
              className={`rounded-full px-4 py-2 text-[13px] font-medium transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/40 scale-105"
                  : "bg-background/90 backdrop-blur-sm text-muted-foreground border border-border/60 hover:border-primary/40 hover:text-foreground hover:bg-accent/60"
              }`}
            >
              {cat}
            </motion.button>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default BlogHero;
