import { Search } from "lucide-react";
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
    <section className="relative overflow-hidden bg-mesh-hero pb-20 pt-28 md:pt-36 md:pb-24">
      {/* Animated mesh blobs */}
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          animate={{ x: [0, 30, -20, 0], y: [0, -20, 15, 0], scale: [1, 1.08, 0.95, 1] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-32 -left-32 h-[28rem] w-[28rem] rounded-full bg-primary/10 blur-3xl"
        />
        <motion.div
          animate={{ x: [0, -25, 15, 0], y: [0, 20, -10, 0], scale: [1, 0.95, 1.05, 1] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-10 right-0 h-80 w-80 rounded-full bg-primary/8 blur-3xl"
        />
        <motion.div
          animate={{ x: [0, 15, -25, 0], y: [0, -15, 20, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 4 }}
          className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-primary/6 blur-3xl"
        />
      </div>

      {/* Dot pattern */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'radial-gradient(circle, hsl(220 20% 10%) 1px, transparent 1px)',
        backgroundSize: '24px 24px'
      }} />

      <div className="container relative z-10 mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mx-auto max-w-3xl text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15, duration: 0.4 }}
            className="mx-auto mb-5 w-fit rounded-full border border-primary/20 bg-accent px-4 py-1.5 text-xs font-semibold text-accent-foreground tracking-wide"
          >
            ✨ HYVE INSIGHTS
          </motion.div>
          <h1 className="font-heading text-4xl font-extrabold tracking-tight text-foreground md:text-5xl lg:text-6xl leading-[1.1]">
            Insights for the Future of{" "}
            <span className="text-gradient-primary">Freelancing</span>
          </h1>
          <p className="mt-5 text-lg text-muted-foreground md:text-xl leading-relaxed max-w-2xl mx-auto">
            Explore tips, guides, and stories around freelancing, startup hiring, remote teams, escrow payments, and collaboration.
          </p>
        </motion.div>

        {/* Search bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mx-auto mt-10 max-w-xl"
        >
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full rounded-2xl border border-border/60 bg-card/90 backdrop-blur-sm py-4 pl-12 pr-5 text-foreground shadow-sm outline-none transition-all duration-300 placeholder:text-muted-foreground focus:border-primary/40 focus:ring-4 focus:ring-primary/10 focus:shadow-[var(--shadow-glow)]"
            />
          </div>
        </motion.div>

        {/* Category filters */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="mx-auto mt-7 flex max-w-3xl flex-wrap justify-center gap-2.5"
        >
          {categories.map((cat, i) => (
            <motion.button
              key={cat}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.04 }}
              onClick={() => onCategoryChange(cat)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-250 ${
                activeCategory === cat
                  ? "bg-primary text-primary-foreground shadow-md shadow-primary/20 scale-[1.03]"
                  : "bg-card/80 text-muted-foreground hover:bg-accent hover:text-accent-foreground border border-border/60 hover:border-primary/30 hover:scale-[1.02]"
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
