import { useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabaseClient";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubscribe = async () => {
    if (!email) return;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email.");
      return;
    }

    setLoading(true);
    setError("");

    const { error: supabaseError } = await supabase
      .from("newsletter_subscribers")
      .insert({ email: email.toLowerCase().trim() });

    setLoading(false);

    if (supabaseError) {
      if (supabaseError.code === "23505") {
        setError("Already subscribed!");
      } else {
        setError("Something went wrong. Try again.");
      }
      return;
    }

    setSubmitted(true);
    setEmail("");
  };

  return (
    <footer className="border-t border-border bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center">
              <img src="/logo.png" alt="HYVE" className="h-8" />
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Helping Youth Venture Everywhere
            </p>
            <p className="text-xs font-medium text-muted-foreground">Recognised by:</p>
            <div className="mt-2">
              <img
                src="/startup-india.png"
                alt="Startup India"
                className="h-32 w-auto object-contain"
              />
            </div>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">Company</h3>
            <ul className="space-y-3">
              {[
                { label: "About Us", href: "https://www.hyvefreelance.com/about" },
                { label: "How HYVE Works", href: "https://www.hyvefreelance.com/#how-it-works" },
                { label: "Contact Us", href: "https://www.hyvefreelance.com/contact" },
                { label: "Join Our Community", href: "https://chat.whatsapp.com/BQFm77OF85BD9MJsBTXMP6" },
              ].map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {item.label}
                    {item.label === "Join Our Community" && (
                      <svg className="h-3 w-3" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M3 9L9 3M9 3H4M9 3v5" />
                      </svg>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">Socials</h3>
            <ul className="space-y-3">
              {[
                { name: "LinkedIn", href: "https://www.linkedin.com/company/hyve-freelance/?viewAsMember=true" },
                { name: "Instagram", href: "https://www.instagram.com/hyvefreelance/?hl=en" },
                { name: "F6S", href: "https://www.f6s.com/hyvefreelance" },
              ].map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {item.name}
                    <svg className="h-3 w-3" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M3 9L9 3M9 3H4M9 3v5" />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">Newsletter</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Receive product updates, exclusive discounts and early access.
            </p>

            {!submitted ? (
              <>
                <form
                  onSubmit={(e) => { e.preventDefault(); handleSubscribe(); }}
                  className="flex items-center gap-0 rounded-full border border-border bg-card overflow-hidden shadow-sm transition-all focus-within:border-primary/40 focus-within:shadow-md"
                >
                  <div className="flex items-center gap-2 pl-4 text-muted-foreground/50">
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <rect x="2" y="4" width="20" height="16" rx="3" />
                      <path d="M2 7l10 6 10-6" />
                    </svg>
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setError(""); }}
                    placeholder="Enter your email..."
                    disabled={loading}
                    className="flex-1 bg-transparent px-3 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none disabled:opacity-60"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    disabled={loading || !email}
                    className="m-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-60"
                  >
                    {loading ? (
                      <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                    ) : (
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    )}
                  </motion.button>
                </form>

                {/* Error message */}
                {error && (
                  <p className="text-xs text-red-500 mt-1 pl-1">{error}</p>
                )}
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 text-sm font-medium text-primary"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                  <path d="M22 4L12 14.01l-3-3" />
                </svg>
                Thanks for subscribing! 
              </motion.div>
            )}
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 py-6 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © 2025{" "}
            <a
              href="https://hyvefreelance.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium underline underline-offset-2 hover:text-foreground transition-colors"
            >
              HYVE WORK PRIVATE LIMITED
            </a>{" "}
            · All rights reserved ·
          </p>
          <div className="flex items-center gap-3">
            <a
              href="https://www.linkedin.com/company/hyve-freelance/?viewAsMember=true"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground/60 transition-colors hover:text-foreground"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14m-.5 15.5v-5.3a3.26 3.26 0 00-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 011.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 001.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 00-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
              </svg>
            </a>
            <a
              href="https://www.instagram.com/hyvefreelance/?hl=en"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground/60 transition-colors hover:text-foreground"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 01-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 017.8 2m-.2 2A3.6 3.6 0 004 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 003.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 110 2.5 1.25 1.25 0 010-2.5M12 7a5 5 0 110 10 5 5 0 010-10m0 2a3 3 0 100 6 3 3 0 000-6z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
