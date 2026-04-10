import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { TrendingUp, Hash, Flame } from "lucide-react";
import { popularTopics } from "@/data/blogData";

const PopularTopics = () => {
  const [clicks, setClicks] = useState<Record<string, number>>({});

  useEffect(() => {
    const stored = localStorage.getItem("hyve-topic-clicks");
    if (stored) setClicks(JSON.parse(stored));
  }, []);

  const handleClick = (topic: string) => {
    const updated = { ...clicks, [topic]: (clicks[topic] || 0) + 1 };
    setClicks(updated);
    localStorage.setItem("hyve-topic-clicks", JSON.stringify(updated));

    // Send to Google Analytics if available
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "topic_click", {
        event_category: "Popular Topics",
        event_label: topic,
      });
    }
    // No navigation — just count the click
  };

  // Sort topics by click count descending
  const sorted = [...popularTopics].sort(
    (a, b) => (clicks[b] || 0) - (clicks[a] || 0)
  );

  const maxClicks = Math.max(...Object.values(clicks), 0);

  return (
    <section className="relative overflow-hidden bg-secondary/40 py-20">
      <div className="pointer-events-none absolute top-0 right-0 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="mx-auto mb-4 flex w-fit items-center gap-2 rounded-full border border-primary/20 bg-accent px-4 py-1.5 text-sm font-medium text-accent-foreground">
            <TrendingUp className="h-4 w-4" /> Popular Topics
          </div>
          <h2 className="font-heading text-3xl font-bold text-foreground">
            What People Are Reading
          </h2>
          <p className="mt-3 text-muted-foreground max-w-md mx-auto">
            Explore trending topics from the freelancing community
          </p>
        </motion.div>

        {/* Topic buttons only — no bar chart */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mx-auto mt-10 flex max-w-3xl flex-wrap justify-center gap-3"
        >
          {sorted.map((topic, i) => {
            const count = clicks[topic] || 0;
            const isHot = count > 0 && count === maxClicks;
            return (
              <motion.button
                key={topic}
                initial={{ opacity: 0, scale: 0.92 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 + i * 0.04 }}
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleClick(topic)}
                className={`relative flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-medium transition-all duration-250 hover:shadow-sm ${
                  isHot
                    ? "border-primary/60 bg-primary/10 text-primary hover:bg-primary/15"
                    : "border-border/60 bg-card text-foreground hover:border-primary/40 hover:bg-accent hover:shadow-primary/10"
                }`}
              >
                {isHot ? (
                  <Flame className="h-3.5 w-3.5 text-primary" />
                ) : (
                  <Hash className="h-3.5 w-3.5 text-primary/60" />
                )}
                {topic}
                {count > 0 && (
                  <span className="ml-1 rounded-full bg-primary/15 px-1.5 py-0.5 text-[10px] font-semibold text-primary">
                    {count}
                  </span>
                )}
              </motion.button>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default PopularTopics;
