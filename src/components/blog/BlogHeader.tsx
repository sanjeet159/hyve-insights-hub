import { motion } from "framer-motion";

const BlogHeader = () => {
  return (
    <header className="fixed top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-lg">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <a href="https://hyvefreelance.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary font-heading text-lg font-extrabold text-primary-foreground">
            H
          </div>
          <span className="font-heading text-xl font-bold text-foreground">HYVE</span>
          <span className="ml-1 rounded-full bg-accent px-2.5 py-0.5 text-xs font-medium text-accent-foreground">
            Blog
          </span>
        </a>
        <nav className="hidden items-center gap-6 md:flex">
          <a href="https://hyvefreelance.com" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            Platform
          </a>
          <a href="#" className="text-sm font-medium text-foreground">
            Blog
          </a>
          <a
            href="https://hyvefreelance.com"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition-all hover:shadow-md"
          >
            Get Started
          </a>
        </nav>
      </div>
    </header>
  );
};

export default BlogHeader;
