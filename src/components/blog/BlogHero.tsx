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
    <section className="relative overflow-hidden pb-16 pt-32 md:pt-44 md:pb-24">
      {/* Premium Background Layering */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_0%,#F1AB1320,transparent)]" />
      
      {/* Decorative Grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="container relative z-10 mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
          className="mx-auto max-w-4xl text-center"
        >
          {/* Badge */}
          <div className="mx-auto mb-8 w-fit">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-background/50 backdrop-blur-xl px-4 py-1.5 text-[11px] font-bold tracking-widest uppercase text-primary shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              HYVE Insights
            </span>
          </div>

          {/* Heading */}
          <h1 className="font-heading text-5xl font-extrabold tracking-tight text-foreground md:text-7xl lg:text-8xl leading-[0.95]">
            Building the Future<br />
            of{" "}
            <span className="relative inline-block">
              <span className="text-primary">Freelancing</span>
              <motion.svg
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.8, duration: 1.5 }}
                viewBox="0 0 300 20"
                className="absolute -bottom-2 left-0 w-full"
                fill="none"
              >
                <path d="M0 10 Q150 20 300 10" stroke="#F1AB13" strokeWidth="4" strokeLinecap="round" />
              </motion.svg>
            </span>
          </h1>

          <p className="mt-8 text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Real playbooks on freelancing, startup hiring, remote teams, escrow payments, and team collaboration — written for India's new generation of independent talent.
          </p>

          {/* Stats */}
          <div className="mx-auto mt-10 flex flex-wrap items-center justify-center gap-4">
            <div className="flex items-center gap-2 rounded-full border border-border bg-background/60 backdrop-blur-sm px-4 py-1.5 text-xs font-semibold text-foreground">
              <span className="text-primary font-bold">50+</span> in-depth articles
            </div>
            <div className="flex items-center gap-2 rounded-full border border-border bg-background/60 backdrop-blur-sm px-4 py-1.5 text-xs font-semibold text-foreground">
              <span className="text-primary font-bold">12</span> expert categories
            </div>
            <div className="flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 text-xs font-semibold text-primary">
              <TrendingUp className="h-3.5 w-3.5" />
              Updated weekly
            </div>
          </div>
        </motion.div>

        {/* Search */}
        <div className="mx-auto mt-14 max-w-2xl">
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              // The state is already updated via onSearchChange
            }}
            className="relative group"
          >
            <div className="absolute -inset-1 rounded-full bg-primary/20 opacity-0 blur-lg transition duration-500 group-focus-within:opacity-100" />
            <div className="relative flex items-center bg-background rounded-full border border-border shadow-lg overflow-hidden">
              <Search className="absolute left-6 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search articles, topics, guides..."
                className="w-full bg-transparent py-5 pl-16 pr-32 text-base outline-none placeholder:text-muted-foreground"
              />
              <button 
                type="submit"
                className="absolute right-2 bg-foreground text-background px-6 py-2.5 rounded-full font-semibold text-sm hover:bg-primary hover:text-primary-foreground transition-all flex items-center gap-2"
              >
                Search
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </form>

          {/* Trending Chips */}
          <div className="mt-5 flex flex-wrap justify-center items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
            <span className="font-semibold uppercase tracking-wider text-[10px]">Trending:</span>
            {["Hire freelance team", "Escrow payments", "Remote work India"].map((t) => (
              <button 
                key={t} 
                onClick={() => onSearchChange(t)} 
                className="px-3 py-1 rounded-full border border-border bg-accent/30 hover:border-primary/50 hover:text-primary transition-colors"
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Categories */}
        <div className="mx-auto mt-12 flex max-w-3xl flex-wrap justify-center gap-2.5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => onCategoryChange(cat)}
              className={`rounded-full px-5 py-2 text-[13px] font-semibold transition-all duration-300 ${
                activeCategory === cat 
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20 scale-105" 
                  : "bg-background border border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogHero;