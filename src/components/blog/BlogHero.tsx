import { Search, Sparkles } from "lucide-react";
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
    <section className="relative overflow-hidden pb-16 pt-28 md:pt-36 md:pb-20">
      {/* Warm gradient background */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-accent/60 via-accent/30 to-background" />

      {/* Animated floating orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ x: [0, 40, -20, 0], y: [0, -30, 20, 0], scale: [1, 1.1, 0.9, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-20 -left-20 h-[32rem] w-[32rem] rounded-full"
          style={{ background: "radial-gradient(circle, hsl(40 88% 51% / 0.12), transparent 70%)" }}
        />
        <motion.div
          animate={{ x: [0, -30, 20, 0], y: [0, 25, -15, 0], scale: [1, 0.92, 1.08, 1] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          className="absolute top-0 -right-20 h-[28rem] w-[28rem] rounded-full"
          style={{ background: "radial-gradient(circle, hsl(35 95% 55% / 0.1), transparent 70%)" }}
        />
        <motion.div
          animate={{ x: [0, 20, -30, 0], y: [0, -20, 25, 0] }}
          transition={{ duration: 24, repeat: Infinity, ease: "easeInOut", delay: 6 }}
          className="absolute -bottom-10 left-1/4 h-80 w-80 rounded-full"
          style={{ background: "radial-gradient(circle, hsl(40 88% 51% / 0.08), transparent 70%)" }}
        />
      </div>

      {/* Subtle grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `
            linear-gradient(hsl(220 20% 10%) 1px, transparent 1px),
            linear-gradient(90deg, hsl(220 20% 10%) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="container relative z-10 mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-3xl text-center"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mb-6 w-fit"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-background/80 backdrop-blur-sm px-5 py-2 text-xs font-semibold tracking-widest uppercase text-primary shadow-sm">
              <Sparkles className="h-3.5 w-3.5" />
              HYVE Insights
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="font-heading text-4xl font-extrabold tracking-tight text-foreground md:text-5xl lg:text-[3.5rem] leading-[1.08]"
          >
            Insights for the Future of
            <br />
            <span className="text-gradient-primary">Freelancing</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.6 }}
            className="mt-5 text-base text-muted-foreground md:text-lg leading-relaxed max-w-xl mx-auto"
          >
            Explore tips, guides, and stories around freelancing, startup hiring,
            remote teams, escrow payments, and collaboration.
          </motion.p>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="mx-auto mt-10 max-w-lg"
        >
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-primary opacity-100 stroke-[2.5]" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full rounded-full border border-border/70 bg-background/90 backdrop-blur-sm py-3.5 pl-12 pr-5 text-sm text-foreground shadow-sm outline-none transition-all duration-300 placeholder:text-muted-foreground/40 focus:border-primary/50 focus:ring-2 focus:ring-primary/20"            />
          </div>
        </motion.div>

        {/* Category pills */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.65 }}
          className="mx-auto mt-8 flex max-w-2xl flex-wrap justify-center gap-2"
        >
          {categories.map((cat, i) => (
            <motion.button
              key={cat}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 + i * 0.04, duration: 0.3 }}
              onClick={() => onCategoryChange(cat)}
              className={`rounded-full px-4 py-2 text-[13px] font-medium transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-primary text-primary-foreground shadow-md shadow-primary/25"
                  : "bg-background/80 text-muted-foreground border border-border/60 hover:border-primary/30 hover:text-foreground hover:bg-accent/50"
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
