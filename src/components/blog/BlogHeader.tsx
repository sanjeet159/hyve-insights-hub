import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X } from "lucide-react";

const BlogHeader = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50);
  });

  const navLinks = [
    { label: "Benefits", href: "https://hyvefreelance.com/#benefits" },
    { label: "How It Works", href: "https://hyvefreelance.com/#how-it-works" },
    { label: "Features", href: "https://hyvefreelance.com/#features" },
    { label: "About", href: "https://hyvefreelance.com/#about" },
    { label: "FAQs", href: "https://hyvefreelance.com/#faqs" },
  ];

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="fixed top-0 z-50 w-full bg-background/80 backdrop-blur-xl transition-all duration-300"
      style={{
        borderBottom: scrolled ? "1px solid hsl(var(--border))" : "1px solid transparent",
        boxShadow: scrolled ? "0 1px 12px hsl(var(--foreground) / 0.04)" : "none",
      }}
    >
      <div
        className="container mx-auto flex items-center justify-between px-4 transition-all duration-300"
        style={{ height: scrolled ? "56px" : "72px" }}
      >
        {/* Logo */}
        <a
          href="https://hyvefreelance.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2.5"
        >
          <motion.div
            animate={{ scale: scrolled ? 0.9 : 1 }}
            transition={{ duration: 0.3 }}
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary font-heading text-lg font-extrabold text-primary-foreground shadow-sm"
          >
            H
          </motion.div>
          <motion.span
            animate={{ fontSize: scrolled ? "18px" : "20px" }}
            transition={{ duration: 0.3 }}
            className="font-heading font-bold text-foreground"
          >
            HYVE
          </motion.span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground hover:bg-accent/60"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right side */}
        <div className="hidden items-center gap-3 md:flex">
          <a
            href="https://hyvefreelance.com"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Login
          </a>
          <a
            href="https://hyvefreelance.com"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-all duration-200 hover:shadow-lg hover:shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] flex items-center gap-1.5"
          >
            Sign up
            <span className="text-xs">→</span>
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="rounded-lg p-2 text-foreground md:hidden hover:bg-accent/60 transition-colors"
        >
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
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg px-4 py-3 text-sm font-medium text-muted-foreground hover:bg-accent/60"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="https://hyvefreelance.com"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg px-4 py-3 text-sm font-medium text-muted-foreground hover:bg-accent/60"
              >
                Login
              </a>
              <a
                href="https://hyvefreelance.com"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 rounded-xl bg-primary px-5 py-3 text-center text-sm font-semibold text-primary-foreground"
              >
                Sign up →
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default BlogHeader;
