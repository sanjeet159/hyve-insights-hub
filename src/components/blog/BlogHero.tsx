import { useState } from "react";
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
    <section className="relative overflow-hidden bg-mesh-hero pb-16 pt-24 md:pt-32 md:pb-20">
      {/* Animated mesh blobs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-primary/10 blur-3xl animate-mesh-move" />
        <div className="absolute top-20 right-0 h-72 w-72 rounded-full bg-primary/8 blur-3xl animate-mesh-move" style={{ animationDelay: "-4s" }} />
        <div className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-primary/6 blur-3xl animate-mesh-move" style={{ animationDelay: "-8s" }} />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <h1 className="font-heading text-4xl font-extrabold tracking-tight text-foreground md:text-5xl lg:text-6xl">
            Insights for the Future of{" "}
            <span className="text-gradient-primary">Freelancing</span>
          </h1>
          <p className="mt-5 text-lg text-muted-foreground md:text-xl">
            Explore tips, guides, and stories around freelancing, startup hiring, remote teams, escrow payments, and collaboration.
          </p>
        </motion.div>

        {/* Search bar */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mx-auto mt-8 max-w-xl"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full rounded-xl border border-border bg-card py-3.5 pl-12 pr-4 text-foreground shadow-sm outline-none transition-shadow placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/30"
            />
          </div>
        </motion.div>

        {/* Category filters */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="mx-auto mt-6 flex max-w-3xl flex-wrap justify-center gap-2"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => onCategoryChange(cat)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-card text-muted-foreground hover:bg-accent hover:text-accent-foreground border border-border"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default BlogHero;
