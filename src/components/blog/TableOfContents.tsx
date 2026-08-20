import { useEffect, useState } from "react";
import { List } from "lucide-react";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
}

const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();

const TableOfContents = ({ content }: TableOfContentsProps) => {
  const [activeId, setActiveId] = useState<string>("");
  const [items, setItems] = useState<TocItem[]>([]);

  useEffect(() => {
    // Parse headings from markdown content
    const parsed: TocItem[] = [];
    content.split("\n").forEach((line) => {
      const t = line.trim();
      if (t.startsWith("### ")) {
        const text = t.slice(4);
        parsed.push({ id: slugify(text), text, level: 3 });
      } else if (t.startsWith("## ")) {
        const text = t.slice(3);
        parsed.push({ id: slugify(text), text, level: 2 });
      }
    });

    // Also try to detect headings from rendered HTML if present
    if (parsed.length === 0) {
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = content;
      tempDiv.querySelectorAll("h2, h3").forEach((h) => {
        parsed.push({
          id: slugify(h.textContent || ""),
          text: h.textContent || "",
          level: h.tagName === "H2" ? 2 : 3,
        });
      });
    }

    setItems(parsed);
  }, [content]);

  useEffect(() => {
    if (items.length === 0) return;

    // Tag rendered headings with IDs after content mounts
    const article = document.querySelector("article");
    if (article) {
      article.querySelectorAll("h2, h3").forEach((h) => {
        const id = slugify(h.textContent || "");
        if (id) h.id = id;
      });
    }

    // Set up scroll observer for active section highlighting
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-100px 0px -70% 0px" }
    );

    items.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  const handleClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 90;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <div className="rounded-2xl border border-border/40 bg-[#F3F0EC] p-6 shadow-sm">
      <div className="mb-4 flex items-center gap-2">
        <h3 className="font-heading text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground/80">
          Contents
        </h3>
      </div>
      <nav className="space-y-1 max-h-[60vh] overflow-y-auto pr-2">
        {items.map((item) => {
          const isActive = activeId === item.id;
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => handleClick(e, item.id)}
              className={`block rounded-md text-sm transition-all duration-200 ${
                item.level === 3 ? "pl-5" : "pl-2"
              } py-1.5 pr-2 leading-snug ${
                isActive
                  ? "bg-primary/10 text-primary font-semibold border-l-2 border-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent/50 border-l-2 border-transparent"
              }`}
            >
              {item.text}
            </a>
          );
        })}
      </nav>
    </div>
  );
};

export default TableOfContents;
