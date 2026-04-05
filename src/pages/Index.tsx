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
      <section className="container mx-auto px-4 pb-16">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-8 font-heading text-2xl font-bold text-foreground"
        >
          Latest Articles
        </motion.h2>

        {filteredPosts.length > 0 ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post, i) => (
              <BlogCard key={post.id} post={post} index={i} />
            ))}
          </div>
        ) : (
          <p className="py-12 text-center text-muted-foreground">
            No articles found. Try a different search or category.
          </p>
        )}
      </section>

      <PopularTopics />
      <Newsletter />
      <FooterCTA />
    </div>
  );
};

export default Index;
