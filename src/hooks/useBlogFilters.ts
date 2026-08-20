import { useSearchParams } from "react-router-dom";
import { useMemo } from "react";
import { allPosts, type Category } from "@/data/posts";

/**
 * Hook to manage indexable blog search and filtering via URL query parameters.
 * This ensures that search results can be bookmarked and are crawlable.
 */
export const useBlogFilters = (postsPerPage: number) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const activeCategory = (searchParams.get("category") as Category) || "All";
  const searchQuery = searchParams.get("q") || "";
  const page = parseInt(searchParams.get("page") || "1", 10);

  const setCategory = (category: Category) => {
    const params = new URLSearchParams(searchParams);
    if (category === "All") {
      params.delete("category");
    } else {
      params.set("category", category);
    }
    params.set("page", "1"); // Reset to page 1 on filter change
    setSearchParams(params);
  };

  const setSearch = (query: string) => {
    const params = new URLSearchParams(searchParams);
    if (!query) {
      params.delete("q");
    } else {
      params.set("q", query);
    }
    params.set("page", "1"); // Reset to page 1 on search change
    setSearchParams(params);
  };

  const setPage = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    if (newPage <= 1) {
      params.delete("page");
    } else {
      params.set("page", newPage.toString());
    }
    setSearchParams(params);
  };

  const filteredPosts = useMemo(() => {
    return allPosts.filter((post) => {
      const matchesCategory = activeCategory === "All" || post.category === activeCategory;
      const matchesSearch =
        !searchQuery ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (post.keywords && post.keywords.some(k => k.toLowerCase().includes(searchQuery.toLowerCase())));

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const visiblePosts = useMemo(() => {
    return filteredPosts.slice(0, page * postsPerPage);
  }, [filteredPosts, page, postsPerPage]);

  const hasMore = visiblePosts.length < filteredPosts.length;

  return {
    activeCategory,
    searchQuery,
    page,
    filteredPosts,
    visiblePosts,
    hasMore,
    setCategory,
    setSearch,
    setPage,
  };
};
