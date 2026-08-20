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
      className="mb-10 overflow-hidden rounded-2xl border border-indigo-100 bg-white shadow-sm"
    >
      <div className="flex items-center gap-2 bg-indigo-50/50 px-6 py-3 border-bottom border-indigo-100/50">
        <Sparkles className="h-4 w-4 text-indigo-500" />
        <span className="text-[11px] font-bold uppercase tracking-widest text-indigo-600/80">
          AI Search Overview
        </span>
      </div>
      
      <div className="p-6 md:p-8">
        <p className="text-lg font-medium text-foreground/90 leading-relaxed mb-8">
          {summary}
        </p>
        
        <div className="space-y-4">
          <h4 className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground/70">
            Key Takeaways in this guide:
          </h4>
          <div className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
            {takeaways.map((item, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-indigo-400" />
                <span className="text-[14px] text-foreground/80 leading-snug">
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
