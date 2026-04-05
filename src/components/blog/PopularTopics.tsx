import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";
import { popularTopics } from "@/data/blogData";

const PopularTopics = () => {
  return (
    <section className="bg-secondary/50 py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="mx-auto mb-3 flex w-fit items-center gap-2 rounded-full bg-accent px-4 py-1.5 text-sm font-medium text-accent-foreground">
            <TrendingUp className="h-4 w-4" /> Popular Topics
          </div>
          <h2 className="font-heading text-3xl font-bold text-foreground">
            What People Are Reading
          </h2>
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
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + i * 0.05 }}
              className="rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground transition-all duration-200 hover:border-primary hover:bg-accent hover:shadow-sm"
            >
              {topic}
            </motion.button>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PopularTopics;
