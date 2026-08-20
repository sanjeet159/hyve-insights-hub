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
    <nav className="rounded-2xl border-t-2 border-t-primary border-x border-b border-[#E5E2DD] bg-[#F9F8F6] p-7 shadow-sm shadow-primary/5">
      <h3 className="mb-6 font-heading text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60">
        Contents
      </h3>
      <ul className="space-y-3.5">
        {items.map((item) => {
          const isActive = activeId === item.id;
          return (
            <li key={item.id} className={item.level === 3 ? "pl-4" : ""}>
              <a
                href={`#${item.id}`}
                onClick={(e) => handleClick(e, item.id)}
                className={`block text-[13px] font-medium transition-all duration-200 leading-snug ${
                  isActive
                    ? "text-primary font-bold"
                    : "text-muted-foreground/70 hover:text-primary"
                }`}
              >
                {item.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default TableOfContents;
