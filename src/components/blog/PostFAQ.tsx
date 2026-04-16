import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";
import type { FAQ } from "@/data/posts/types";

interface PostFAQProps {
  faqs: FAQ[];
}

const PostFAQ = ({ faqs }: PostFAQProps) => {
  if (!faqs || faqs.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="mx-auto max-w-3xl mt-12 mb-8"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="h-5 w-1 rounded-full bg-primary" />
        <h2 className="font-heading text-2xl font-bold text-foreground">
          Frequently Asked Questions
        </h2>
      </div>

      <Accordion type="single" collapsible className="space-y-3">
        {faqs.map((faq, i) => (
          <AccordionItem
            key={i}
            value={`faq-${i}`}
            className="border border-border/60 rounded-xl px-5 bg-card shadow-sm data-[state=open]:border-primary/30 data-[state=open]:shadow-md transition-all duration-200"
          >
            <AccordionTrigger className="text-sm font-semibold text-foreground hover:text-primary hover:no-underline py-4 text-left gap-4">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-4">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </motion.div>
  );
};

export default PostFAQ;
