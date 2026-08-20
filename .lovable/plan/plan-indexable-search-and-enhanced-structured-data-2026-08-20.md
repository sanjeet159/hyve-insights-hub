# Plan: Indexable Search and Enhanced Structured Data

The goal is to implement a robust, SEO-friendly search and filtering system using URL parameters and upgrade the blog's structured data (JSON-LD) to meet the highest AEO/SEO standards.

## User Review Required

> [!IMPORTANT]
> The search and filter will now use URL parameters (e.g., `?category=Tech&q=freelance`). This makes search results indexable by search engines but will cause a page reload or URL update when users interact with filters.

- **URL Structure**: We will use `?category=` and `?q=` parameters.
- **Structured Data**: Every post will now include explicit Person/Organization data, Breadcrumbs, and detailed Article schema.

## Proposed Changes

### 1. Blog Search and Filtering (Indexable)
- **New Hook**: `src/hooks/useBlogFilters.ts` (already created) to manage URL-based state.
- **Refactor `Index.tsx`**: Replace local state (`useState`) with URL-based state from the hook.
- **SEO Optimization**: Update the `<title>` and `<meta description>` on the index page dynamically based on the active search or category (e.g., "Search results for 'Tax' | HYVE Blog").

### 2. Enhanced Structured Data (AEO/SEO)
- **BreadcrumbList**: Improved implementation on `BlogPost.tsx` and `Index.tsx`.
- **Person & Organization**: Define clear author profiles and publisher entities.
- **Article Schema**: Add `dateModified`, `mainEntityOfPage`, and ensure `image` is always absolute.
- **Site Navigation Element**: Add to the index page to help search engines understand the blog's structure.

### 3. Components Refinement
- **BlogHero**: Sync with URL state for the search bar and category pills.
- **Pagination**: Implement "Load More" as a proper link-friendly action that updates the `page` parameter.

## Technical Details

- **React Router**: Using `useSearchParams` for URL state management.
- **JSON-LD**: Standardizing on `schema.org` vocabularies for `Article`, `Blog`, `BreadcrumbList`, and `Organization`.
- **Dynamic Helmet**: Updating `react-helmet-async` content based on current filtering state to prevent duplicate titles/descriptions.
