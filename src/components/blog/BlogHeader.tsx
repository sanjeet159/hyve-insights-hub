import { useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X } from "lucide-react";

const BlogHeader = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50);
    if (latest > 10) setMobileOpen(false);
  });

  const navLinks = [
    { label: "Benefits", href: "https://hyvefreelance.com/#benefits" },
    { label: "How It Works", href: "https://hyvefreelance.com/#how-it-works" },
    { label: "Features", href: "https://hyvefreelance.com/#features" },
    { label: "About", href: "https://hyvefreelance.com/#about" },
    { label: "FAQs", href: "https://hyvefreelance.com/#faqs" },
  ];

  return (
    <>
      {/* Backdrop when mobile menu open */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Fixed header wrapper */}
      <div className="fixed top-0 z-50 w-full">

        {/* Top nav bar */}
        <div
          className="w-full transition-all duration-500 ease-in-out"
          style={{
            background: "rgba(255, 255, 255, 0.92)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            borderBottom: "1px solid rgba(0,0,0,0.07)",
            boxShadow: scrolled ? "0 4px 24px rgba(0,0,0,0.08)" : "none",
          }}
        >
          <div
            className="mx-auto flex items-center justify-between px-5 transition-all duration-300"
            style={{
              maxWidth: "1200px",
              height: scrolled ? "52px" : "64px",
            }}
          >
            {/* Logo only — no box, no extra divs */}
            <a
              href="https://hyvefreelance.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center shrink-0"
            >
              <img src="/logo.png" alt="HYVE" className="h-7 w-auto" />
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

            {/* Desktop buttons */}
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
                Sign up <span className="text-xs">→</span>
              </a>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="flex items-center justify-center rounded-lg p-2 text-foreground md:hidden hover:bg-accent/60 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown — completely separate, no border radius, full width */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="w-full md:hidden"
              style={{
                background: "rgba(255,255,255,0.98)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                borderBottom: "1px solid rgba(0,0,0,0.08)",
                boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
              }}
            >
              <div className="flex flex-col gap-1 px-4 py-4">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMobileOpen(false)}
                    className="rounded-lg px-4 py-3 text-sm font-medium text-muted-foreground hover:bg-accent/60 hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                ))}

                <div className="mt-3 border-t border-black/6 pt-3 flex flex-col gap-2">
                  <a
                    href="https://hyvefreelance.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMobileOpen(false)}
                    className="rounded-lg px-4 py-3 text-sm font-medium text-muted-foreground hover:bg-accent/60 hover:text-foreground transition-colors text-center"
                  >
                    Login
                  </a>
                  <a
                    href="https://hyvefreelance.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMobileOpen(false)}
                    className="rounded-xl bg-primary px-5 py-3 text-center text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
                  >
                    Sign up →
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </>
  );
};

export default BlogHeader;
