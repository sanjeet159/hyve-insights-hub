import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
const BlogCard = ({ post, index }) => {
    // Use category to determine a light background color for the top section
    const getBgColor = (category) => {
        const colors = {
            "Freelancing": "bg-emerald-50/50",
            "Startup Hiring": "bg-blue-50/50",
            "Team Collaboration": "bg-purple-50/50",
            "Escrow & Payments": "bg-amber-50/50",
            "Remote Work": "bg-indigo-50/50",
            "Productivity": "bg-rose-50/50",
            "For Clients": "bg-orange-50/50",
            "Platform Comparisons": "bg-sky-50/50",
            "Education": "bg-cyan-50/50",
            "Freelancing Tips": "bg-teal-50/50",
            "Career Growth": "bg-violet-50/50",
            "Freelancing Guide": "bg-slate-50/50",
        };
        return colors[category] || "bg-slate-50/50";
    };
    const bgColor = getBgColor(post.category);
    return (<Link to={`/blog/${post.slug}`} className="block h-full" aria-label={`Read article: ${post.title}`}>
      <motion.article initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.5, delay: index * 0.05 }} className="group flex h-full flex-col overflow-hidden rounded-[24px] border border-border/40 bg-card shadow-sm transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1">
        {/* Top visual section - minimalist with text overlay */}
        <div className={`relative flex h-64 w-full items-center justify-center p-8 transition-colors duration-500 ${bgColor} group-hover:bg-opacity-80`}>
          <div className="text-center relative z-10">
            <span className="mb-4 block text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/80">
              {post.category} • {post.readTime}
            </span>
            <span className="block font-heading text-4xl font-bold tracking-tight text-foreground/20 transition-all duration-700 group-hover:text-primary/30 group-hover:scale-105">
              HYVE
            </span>
          </div>
          
          {/* Subtle background image as a watermark */}
          <div className="absolute inset-0 z-0 opacity-[0.04] grayscale transition-all duration-700 group-hover:opacity-[0.08] group-hover:scale-110">
            <img src={post.image} alt="" className="h-full w-full object-cover" loading="lazy"/>
          </div>
        </div>

        {/* Content area */}
        <div className="flex flex-1 flex-col p-8 bg-card">
          <h3 className="font-heading text-xl font-bold leading-[1.3] text-foreground transition-colors duration-300 group-hover:text-primary line-clamp-2">
            {post.title}
          </h3>
          <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground line-clamp-2">
            {post.excerpt}
          </p>

          <div className="mt-auto pt-8 flex items-center justify-between border-t border-border/10">
            <time className="text-sm font-medium text-muted-foreground/70">
              {post.date}
            </time>
            <div className="flex items-center gap-1 text-sm font-bold text-foreground transition-colors group-hover:text-primary">
              Read <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"/>
            </div>
          </div>
        </div>
      </motion.article>
    </Link>);
};
export default BlogCard;
