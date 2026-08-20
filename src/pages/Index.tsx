import { useCallback, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import BlogHeader from "@/components/blog/BlogHeader";
import BlogHero from "@/components/blog/BlogHero";
import FeaturedPost from "@/components/blog/FeaturedPost";
import BlogCard from "@/components/blog/BlogCard";
import PopularTopics from "@/components/blog/PopularTopics";
import Newsletter from "@/components/blog/Newsletter";
import FooterCTA from "@/components/blog/FooterCTA";
import Footer from "@/components/blog/Footer";
import { featuredPost, allPosts } from "@/data/posts";
import { motion, AnimatePresence } from "framer-motion";
import { Newspaper, ChevronDown } from "lucide-react";
import { useBlogFilters } from "@/hooks/useBlogFilters";

const POSTS_PER_PAGE = 6;

const Index = () => {
  const {
    activeCategory,
    searchQuery,
    page,
    filteredPosts,
    visiblePosts,
    hasMore,
    setCategory,
    setSearch,
    setPage,
  } = useBlogFilters(POSTS_PER_PAGE);

  useEffect(() => {
    console.log("Index mounted, total posts:", allPosts.length);
  }, []);

  const handleShowMore = useCallback(() => {
    setPage(page + 1);
  }, [page, setPage]);

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
        <title>
          {searchQuery 
            ? `Search results for "${searchQuery}" | HYVE Blog` 
            : activeCategory !== "All" 
              ? `${activeCategory} Articles | HYVE Blog` 
              : "HYVE Blog — India's Premier Freelancing & Hiring Insights"}
        </title>
        <meta 
          name="description" 
          content={searchQuery 
            ? `Browse search results for "${searchQuery}" on the HYVE Blog. Expert insights on freelancing and hiring.` 
            : "Master freelancing and hiring in India. Expert guides on teamlancing, escrow, and remote teams."} 
        />
        <link rel="canonical" href={`https://blog.hyvefreelance.com/${activeCategory !== "All" ? `?category=${activeCategory}` : ""}`} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <BlogHeader />
      <main className="relative">
        <BlogHero
          activeCategory={activeCategory}
          onCategoryChange={setCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearch}
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

      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          "itemListElement": visiblePosts.map((post, i) => ({
            "@type": "ListItem",
            "position": i + 1,
            "url": `https://blog.hyvefreelance.com/blog/${post.slug}`
          }))
        })}
      </script>

      <PopularTopics /> 
      <Newsletter />
      <FooterCTA />
      <Footer />
    </div>
  );
};

export default Index;
