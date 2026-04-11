import { useState } from "react";
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
    <>
      {/* ── MOBILE FULLSCREEN MENU OVERLAY ── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Dark backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/30 md:hidden"
              onClick={() => setMobileOpen(false)}
            />

            {/* White card menu — looks exactly like the screenshot */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: -10 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="fixed top-3 left-3 right-3 z-50 md:hidden"
              style={{
                background: "white",
                borderRadius: "20px",
                boxShadow: "0 8px 40px rgba(0,0,0,0.15)",
                overflow: "hidden",
              }}
            >
              {/* Card header row — logo + X */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                <a
                  href="https://hyvefreelance.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center"
                >
                  <img src="/logo.png" alt="HYVE" className="h-7 w-auto" />
                </a>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg p-1.5 text-gray-500 hover:bg-gray-100 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Nav links */}
              <div className="flex flex-col px-3 py-3">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMobileOpen(false)}
                    className="rounded-lg px-4 py-3.5 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </div>

              {/* Login + Sign up */}
              <div className="px-4 pb-5 flex flex-col gap-2 border-t border-gray-100 pt-3">
                <a
                  href="https://hyvefreelance.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg px-4 py-3 text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors text-center"
                >
                  Login
                </a>
                <a
                  href="https://hyvefreelance.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-xl bg-primary px-5 py-3.5 text-center text-sm font-semibold text-white hover:bg-primary/90 transition-colors"
                >
                  Sign up →
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── DESKTOP + TABLET HEADER (unchanged) ── */}
      <div
        className="fixed top-0 z-50 w-full flex justify-center transition-all duration-500 ease-in-out"
        style={{ padding: scrolled ? "8px 16px" : "8px 24px" }}
      >
        <motion.header
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="w-full transition-all duration-500 ease-in-out"
          style={{
            maxWidth: scrolled ? "900px" : "1200px",
            borderRadius: scrolled ? "9999px" : "0px",
            background: scrolled
              ? "rgba(255, 255, 255, 0.95)"
              : "rgba(255, 255, 255, 0.85)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: scrolled
              ? "1px solid rgba(255, 255, 255, 0.3)"
              : "1px solid rgba(0,0,0,0.07)",
            boxShadow: scrolled
              ? "0 8px 32px rgba(0, 0, 0, 0.12)"
              : "0 2px 16px rgba(0, 0, 0, 0.06)",
          }}
        >
          <div
            className="flex items-center justify-between px-6 transition-all duration-500 ease-in-out"
            style={{ height: scrolled ? "48px" : "72px" }}
          >
            {/* Logo */}
            <a
              href="https://hyvefreelance.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center shrink-0"
            >
              <img src="/logo.png" alt="HYVE" className="h-8 w-auto" />
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

            {/* Desktop right buttons */}
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
                className="rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-foreground transition-all duration-200 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/30 hover:scale-[1.02] active:scale-[0.98] flex items-center gap-1.5 border border-primary"
              >
                Sign up <span className="text-xs">→</span>
              </a>
            </div>

            {/* Mobile hamburger — only shows on mobile */}
            <button
              onClick={() => setMobileOpen(true)}
              className="flex items-center justify-center rounded-lg p-2 text-foreground md:hidden hover:bg-accent/60 transition-colors"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </motion.header>
      </div>
    </>
  );
};

export default BlogHeader;
