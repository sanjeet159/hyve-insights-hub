import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const BlogHeader = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="fixed top-0 z-50 w-full border-b border-border/40 bg-background/70 backdrop-blur-xl"
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <a href="https://hyvefreelance.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary font-heading text-lg font-extrabold text-primary-foreground shadow-sm">
            H
          </div>
          <span className="font-heading text-xl font-bold text-foreground">HYVE</span>
          <span className="rounded-full bg-accent px-2.5 py-0.5 text-[11px] font-semibold text-accent-foreground tracking-wide uppercase">
            Blog
          </span>
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          <a href="https://hyvefreelance.com" target="_blank" rel="noopener noreferrer" className="rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground hover:bg-accent/60">
            Platform
          </a>
          <a href="/" className="rounded-lg px-4 py-2 text-sm font-medium text-foreground bg-accent/50">
            Blog
          </a>
          <a
            href="https://hyvefreelance.com"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-3 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-all duration-200 hover:shadow-lg hover:shadow-primary/20 hover:scale-[1.02] active:scale-[0.98]"
          >
            Get Started
          </a>
        </nav>

        {/* Mobile toggle */}
        <button onClick={() => setMobileOpen(!mobileOpen)} className="rounded-lg p-2 text-foreground md:hidden hover:bg-accent/60 transition-colors">
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-border/40 bg-background/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-1 p-4">
              <a href="https://hyvefreelance.com" target="_blank" rel="noopener noreferrer" className="rounded-lg px-4 py-3 text-sm font-medium text-muted-foreground hover:bg-accent/60">Platform</a>
              <a href="/" className="rounded-lg px-4 py-3 text-sm font-medium text-foreground bg-accent/50">Blog</a>
              <a href="https://hyvefreelance.com" target="_blank" rel="noopener noreferrer" className="mt-2 rounded-xl bg-primary px-5 py-3 text-center text-sm font-semibold text-primary-foreground">Get Started</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default BlogHeader;
