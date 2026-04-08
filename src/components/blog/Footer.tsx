import { ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <svg viewBox="0 0 24 24" className="h-5 w-5 text-primary-foreground" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M3 7l6-4 6 4 6-4v14l-6 4-6-4-6 4V7z" />
                </svg>
              </div>
              <span className="text-xl font-bold text-foreground tracking-tight">HYVE</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Helping Youth Venture Everywhere
            </p>
            <div className="space-y-2">
              <p className="text-xs font-medium text-muted-foreground">Recognised by:</p>
              <div className="text-xs text-muted-foreground/70 leading-relaxed">
                <p>Government of India</p>
                <p>Ministry of Commerce and Industry</p>
                <p>Department for Promotion of Industry and Internal Trade</p>
              </div>
              <p className="mt-2 text-lg font-bold">
                <span className="text-foreground">#startup</span>
                <span className="text-primary">ind</span>
                <span className="text-green-600">i</span>
                <span className="text-primary">a</span>
              </p>
            </div>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">Company</h3>
            <ul className="space-y-3">
              {["About Us", "How HYVE Works", "Contact Us", "Join Our Community"].map((item) => (
                <li key={item}>
                  <a
                    href="https://hyvefreelance.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {item}
                    {item === "Join Our Community" && (
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
                { name: "LinkedIn", href: "#" },
                { name: "Instagram", href: "#" },
                { name: "F6S", href: "#" },
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
              Receive product updates news, exclusive discounts and early access.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
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
                placeholder="Enter your email..."
                className="flex-1 bg-transparent px-3 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="m-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition-colors hover:bg-primary/90"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </motion.button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 py-6 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © 2025{" "}
            <a href="https://hyvefreelance.com" target="_blank" rel="noopener noreferrer" className="font-medium underline underline-offset-2 hover:text-foreground transition-colors">
              HYVE WORK PRIVATE LIMITED
            </a>{" "}
            · All rights reserved ·
          </p>
          <div className="flex items-center gap-3">
            <a href="#" className="text-muted-foreground/60 transition-colors hover:text-foreground">
              <Linkedin className="h-4 w-4" />
            </a>
            <a href="#" className="text-muted-foreground/60 transition-colors hover:text-foreground">
              <Instagram className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
