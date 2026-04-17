import { useState, useMemo, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import BlogHeader from "@/components/blog/BlogHeader";
import BlogHero from "@/components/blog/BlogHero";
import FeaturedPost from "@/components/blog/FeaturedPost";
import BlogCard from "@/components/blog/BlogCard";
import PopularTopics from "@/components/blog/PopularTopics";
import Newsletter from "@/components/blog/Newsletter";
import FooterCTA from "@/components/blog/FooterCTA";
import Footer from "@/components/blog/Footer";
import { featuredPost, blogPosts, type Category } from "@/data/blogData";
import { motion, AnimatePresence } from "framer-motion";
import { Newspaper, ChevronDown } from "lucide-react";

const POSTS_PER_PAGE = 3;

const Index = () => {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(POSTS_PER_PAGE);

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

  const visiblePosts = filteredPosts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredPosts.length;

  const handleShowMore = useCallback(() => {
    setVisibleCount((prev) => prev + POSTS_PER_PAGE);
  }, []);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "HYVE Blog",
    description: "Expert tips, guides and stories on freelancing, startup hiring, remote teams, escrow payments and team collaboration in India.",
    url: "https://hyveblogs.lovable.app",
    publisher: {
      "@type": "Organization",
      name: "HYVE",
      url: "https://hyvefreelance.com",
    },
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>HYVE Blog — Freelancing, Startup Hiring & Remote Work Insights</title>
        <meta name="description" content="Expert tips, guides and stories on freelancing, startup hiring, remote teams, escrow payments and team collaboration. Grow your freelance career with HYVE." />
        <meta name="keywords" content="freelancing tips India, startup hiring, remote work guide, escrow payments, freelance team collaboration, HYVE blog, freelancer productivity" />
        <link rel="canonical" href="https://hyveblogs.lovable.app/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="HYVE Blog — Freelancing, Startup Hiring & Remote Work Insights" />
        <meta property="og:description" content="Expert tips, guides and stories on freelancing, startup hiring, remote teams, escrow payments and team collaboration." />
        <meta property="og:url" content="https://hyveblogs.lovable.app/" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="HYVE Blog — Freelancing, Startup Hiring & Remote Work Insights" />
        <meta name="twitter:description" content="Expert tips, guides and stories on freelancing, startup hiring, remote teams, escrow payments and team collaboration." />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

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
          <>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <AnimatePresence>
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

      <PopularTopics />
      <BlogFAQ /> 
      <Newsletter />
      <FooterCTA />
      <Footer />
    </div>
  );
};

export default Index;
