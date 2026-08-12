# Plan - Enhance Blog Hero & SEO/AEO Optimization

## Visual Enhancements (Hero Section)
- **Refine Layout**: Adjust spacing and typography in `BlogHero.tsx` to match the "Insights for the Future of Freelancing" reference image precisely.
- **Improved Visuals**: 
  - Update the background gradient and grid pattern to be more subtle and premium.
  - Enhance the animated underline for "Freelancing".
  - Refine the category pills with better active/inactive states (matching the yellow-orange brand accent).
  - Adjust search bar positioning and styling (focus effects).
- **Interactive Elements**: Add subtle hover animations to stats cards and chips.

## SEO & AEO (AI Engine Optimization) Improvements
- **Semantic HTML**: Ensure proper use of `<article>`, `<header>`, `<main>`, and `<section>` landmarks across `Index.tsx` and `BlogPost.tsx`.
- **Structured Data (JSON-LD)**: 
  - Expand the `Blog` and `BlogPosting` schemas with more granular details (wordCount, timeRequired, potentialAction).
  - Add `FAQPage` schema to the index page if applicable, or ensure it's robust on post pages.
- **AEO (AI Search)**:
  - Optimize `llms.txt` and `robots.txt` to be even more inviting for AI crawlers (Perplexity, Claude, GPT).
  - Add `meta name="author"` and `meta name="publisher"` more explicitly.
  - Ensure content is structured with clear, punchy headings that AI LLMs can easily parse.
- **Internal Linking (Backlinks)**:
  - Add a "Related Categories" or "Popular Guides" section in the footer area to improve internal link equity.
  - Implement a "Suggested Reading" component at the bottom of blog posts that links to other relevant articles.

## Technical Details
- **Tech Stack**: React 18, Tailwind CSS, Framer Motion, React Helmet Async.
- **Domain**: Targeting `blog.hyvefreelance.com` (canonical).
- **Assets**: Use Lucide-react for consistent iconography.
- **SEO Check**: Verify meta tags and canonical URLs are consistent.
