import { useState, useMemo } from "react";
import BlogHeader from "@/components/blog/BlogHeader";
import BlogHero from "@/components/blog/BlogHero";
import FeaturedPost from "@/components/blog/FeaturedPost";
import BlogCard from "@/components/blog/BlogCard";
import PopularTopics from "@/components/blog/PopularTopics";
import Newsletter from "@/components/blog/Newsletter";
import FooterCTA from "@/components/blog/FooterCTA";
import { featuredPost, blogPosts, type Category } from "@/data/blogData";
import { motion } from "framer-motion";
import { Newspaper } from "lucide-react";

const Index = () => {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      const matchesCategory = activeCategory === "All" || post.category === activeCategory;
      const matchesSearch =
        !searchQuery ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-background">
      <BlogHeader />
      <BlogHero
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      <FeaturedPost post={featuredPost} />

      {/* Latest Articles */}
      <section className="container mx-auto px-4 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 flex items-center gap-2"
        >
          <Newspaper className="h-5 w-5 text-primary" />
          <h2 className="font-heading text-2xl font-bold text-foreground">Latest Articles</h2>
          <span className="ml-2 rounded-full bg-accent px-3 py-0.5 text-xs font-medium text-accent-foreground">
            {filteredPosts.length} posts
          </span>
        </motion.div>

        {filteredPosts.length > 0 ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post, i) => (
              <BlogCard key={post.id} post={post} index={i} />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-16 text-center"
          >
            <p className="text-lg text-muted-foreground">No articles found.</p>
            <p className="mt-1 text-sm text-muted-foreground/70">Try a different search or category.</p>
          </motion.div>
        )}
      </section>

      <PopularTopics />
      <Newsletter />
      <FooterCTA />
    </div>
  );
};

export default Index;
