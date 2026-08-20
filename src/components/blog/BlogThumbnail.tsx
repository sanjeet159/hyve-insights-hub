import type { BlogPost } from "@/data/posts/types";

export const getCategoryColor = (category: string) => {
  const colors: Record<string, string> = {
    "Freelancing Guide": "bg-[#E6F9F0]", // Mint
    "Startup Guide": "bg-[#E6EEFB]", // Blue
    "Support Guide": "bg-[#FCE7F3]", // Pink
    "Finance Guide": "bg-[#FFF4E6]", // Peach
    "Freelancing": "bg-[#E6F9F0]",
    "Startup Hiring": "bg-[#E6EEFB]",
    "Team Collaboration": "bg-[#FCE7F3]",
    "Escrow & Payments": "bg-[#FFF4E6]",
    "Remote Work": "bg-[#E6EEFB]",
    "Productivity": "bg-[#E6F9F0]",
    "For Clients": "bg-[#FFF4E6]",
    "Platform Comparisons": "bg-[#FCE7F3]",
    "Education": "bg-[#E6EEFB]",
    "Freelancing Tips": "bg-[#E6F9F0]",
    "Career Growth": "bg-[#FCE7F3]",
  };
  return colors[category] || "bg-[#F3F4F6]";
};

interface BlogThumbnailProps {
  post: BlogPost;
  className?: string;
  size?: "sm" | "md" | "lg";
  hideImage?: boolean;
}

export const BlogThumbnail = ({ post, className = "", size = "md", hideImage = false }: BlogThumbnailProps) => {
  const bgColor = hideImage ? "bg-[#F5F3EF]" : getCategoryColor(post.category);
  const isSm = size === "sm";
  const isLg = size === "lg";

  return (
    <div className={`relative overflow-hidden flex flex-col items-center justify-center transition-all duration-500 ${bgColor} ${className}`}>
      <span className={`font-heading font-extrabold tracking-tighter text-foreground/5 select-none ${
        isSm ? "text-xl" : isLg ? "text-[8rem] md:text-[12rem] lg:text-[14rem]" : "text-7xl"
      }`}>
        HYVE
      </span>
      
      {!hideImage && (
        <div className="absolute inset-0 z-0 opacity-[0.03] grayscale transition-all duration-700 pointer-events-none group-hover:opacity-[0.05]">
          <img 
            src={post.image} 
            alt="" 
            className="h-full w-full object-cover" 
            loading="lazy"
          />
        </div>
      )}
    </div>
  );
};
