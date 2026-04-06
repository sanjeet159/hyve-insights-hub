import { motion } from "framer-motion";
import { TrendingUp, Hash } from "lucide-react";
import { popularTopics } from "@/data/blogData";

const PopularTopics = () => {
  return (
    <section className="relative overflow-hidden bg-secondary/40 py-20">
      {/* Subtle bg accent */}
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

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mx-auto mt-10 flex max-w-3xl flex-wrap justify-center gap-3"
        >
          {popularTopics.map((topic, i) => (
            <motion.button
              key={topic}
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 + i * 0.04 }}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 rounded-full border border-border/60 bg-card px-5 py-2.5 text-sm font-medium text-foreground transition-all duration-250 hover:border-primary/40 hover:bg-accent hover:shadow-sm hover:shadow-primary/10"
            >
              <Hash className="h-3.5 w-3.5 text-primary/60" />
              {topic}
            </motion.button>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PopularTopics;
