import { useState, useMemo, useCallback, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import BlogHeader from "@/components/blog/BlogHeader";
import BlogHero from "@/components/blog/BlogHero";
import FeaturedPost from "@/components/blog/FeaturedPost";
import BlogCard from "@/components/blog/BlogCard";
import PopularTopics from "@/components/blog/PopularTopics";
import Newsletter from "@/components/blog/Newsletter";
import FooterCTA from "@/components/blog/FooterCTA";
import Footer from "@/components/blog/Footer";
import { allPosts, featuredPost, blogPosts, type Category } from "@/data/posts";
import { motion, AnimatePresence } from "framer-motion";
import { Newspaper, ChevronDown } from "lucide-react";

const POSTS_PER_PAGE = 6;

const Index = () => {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(POSTS_PER_PAGE);

  useEffect(() => {
    console.log("Index mounted, total posts:", allPosts.length);
    console.log("Featured Post ID:", featuredPost?.id);
    console.log("Blog Posts count:", blogPosts.length);
  }, []);

  const filteredPosts = useMemo(() => {
    return allPosts.filter((post) => {
      // Logic for filtering
      const matchesCategory = activeCategory === "All" || post.category === activeCategory;
      const matchesSearch =
        !searchQuery ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Exclude featured post from grid unless there's a search/category filter active
      const isNotFeatured = (activeCategory !== "All" || searchQuery !== "") 
        ? true 
        : post.id !== featuredPost?.id;

      return matchesCategory && matchesSearch && isNotFeatured;
    });
  }, [activeCategory, searchQuery]);

  const visiblePosts = filteredPosts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredPosts.length;

  const handleShowMore = useCallback(() => {
    setVisibleCount((prev) => prev + POSTS_PER_PAGE);
  }, []);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": "https://blog.hyvefreelance.com/#blog",
    "name": "HYVE Blog",
    "description": "Expert tips, guides and stories on freelancing, startup hiring, remote teams, escrow payments and team collaboration in India.",
    "url": "https://blog.hyvefreelance.com",
    "inLanguage": "en-IN",
    "publisher": {
      "@type": "Organization",
      "@id": "https://hyvefreelance.com/#organization",
      "name": "HYVE",
      "url": "https://hyvefreelance.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://blog.hyvefreelance.com/logo.png"
      }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>HYVE Blog — India's Premier Freelancing & Hiring Insights</title>
        <meta name="description" content="Master freelancing and hiring in India. Expert guides on teamlancing, escrow, and remote teams." />
        <link rel="canonical" href="https://blog.hyvefreelance.com/" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <BlogHeader />
      <main className="relative">
        <BlogHero
          activeCategory={activeCategory}
          onCategoryChange={(cat) => {
            setActiveCategory(cat);
            setVisibleCount(POSTS_PER_PAGE);
          }}
          searchQuery={searchQuery}
          onSearchChange={(q) => {
            setSearchQuery(q);
            setVisibleCount(POSTS_PER_PAGE);
          }}
        />
        
        {activeCategory === "All" && !searchQuery && featuredPost && (
          <FeaturedPost post={featuredPost} />
        )}

        {/* Latest Articles */}
        <section className="container mx-auto px-4 pb-20 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10 flex items-end justify-between gap-4 border-b border-border/60 pb-5"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Newspaper className="h-5 w-5" />
              </span>
              <div>
                <h2 className="font-heading text-2xl font-bold text-foreground md:text-3xl">
                  {activeCategory !== "All" || searchQuery ? "Search Results" : "Latest Articles"}
                </h2>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {activeCategory !== "All" || searchQuery 
                    ? `Showing results for ${activeCategory !== "All" ? activeCategory : searchQuery}` 
                    : "Fresh insights from the HYVE community"}
                </p>
              </div>
            </div>
            <span className="rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground whitespace-nowrap">
              {filteredPosts.length} {filteredPosts.length === 1 ? "post" : "posts"}
            </span>
          </motion.div>

          {filteredPosts.length > 0 ? (
            <>
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                <AnimatePresence mode="popLayout">
                  {visiblePosts.map((post, i) => (
                    <BlogCard key={post.id} post={post} index={i} />
                  ))}
                </AnimatePresence>
              </div>
              {hasMore && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-12 flex justify-center"
                >
                  <button
                    onClick={handleShowMore}
                    className="group inline-flex items-center gap-2 rounded-full border border-border bg-card px-8 py-3 text-sm font-semibold text-foreground shadow-sm transition-all duration-300 hover:border-primary/40 hover:bg-primary/5 hover:shadow-md"
                  >
                    More Blogs
                    <ChevronDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
                  </button>
                </motion.div>
              )}
            </>
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
      </main>

      <PopularTopics /> 
      <Newsletter />
      <FooterCTA />
      <Footer />
    </div>
  );
};

export default Index;
