import { Sparkles, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

interface AISearchOverviewProps {
  summary: string;
  takeaways: string[];
}

const AISearchOverview = ({ summary, takeaways }: AISearchOverviewProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-12 overflow-hidden rounded-2xl border-l-4 border-l-primary border-y border-r border-[#E5E2DD] bg-[#F9F8F6] shadow-sm shadow-primary/5"
    >
      <div className="flex items-center gap-2 px-8 py-4 border-b border-[#E5E2DD]">
        <Sparkles className="h-3.5 w-3.5 text-muted-foreground/60" />
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60">
          AI Search Overview
        </span>
      </div>
      
      <div className="p-8 md:p-10">
        <p className="text-xl font-medium text-foreground/90 leading-relaxed mb-10">
          {summary}
        </p>
        
        <div className="space-y-6">
          <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/40">
            Key Takeaways in this guide:
          </h4>
          <div className="grid gap-x-12 gap-y-4 sm:grid-cols-2">
            {takeaways.map((item, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground/20" />
                <span className="text-[15px] text-foreground/80 leading-snug">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AISearchOverview;
