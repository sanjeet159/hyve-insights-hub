# Plan: Publish Blog Post "How to Build Freelance Teams"

The user wants a detailed blog post on "How to Build Freelance Teams". This post will be optimized for SEO (Indian market, startup founders) and AEO (AI Engine Optimization). It will also include internal links and FAQ structured data.

## Proposed Blog Content Strategy
- **Title**: How to Build a Freelance Team in 2026: The Founder's Guide to Scaling Without Hiring
- **Focus**: Moving from solo freelancers to "Teamlancing", coordination frameworks, and using HYVE to find pre-formed teams.
- **Keywords**: build freelance team, manage remote freelancers, freelance team collaboration, teamlancing India, scaling startups with freelancers.

## Implementation Steps

### 1. Create Post Data
Create `src/data/posts/post-44.ts` with:
- Detailed content (6+ sections).
- SEO metadata (Title, Description, Keywords).
- AEO-optimized FAQs.
- Internal links to related posts (e.g., Post 14 on Handoff Gap, Post 12 on Teamlancing).
- A custom CTA banner for HYVE.

### 2. Register Post
Update `src/data/posts/index.ts` to:
- Import `post44`.
- Add `post44` to `allPosts` (making it the featured post).

### 3. Update SEO Assets
- Run `scripts/generate-seo.ts` to update `sitemap.xml` and `llms.txt`.

## Technical Details
- **File path**: `src/data/posts/post-44.ts`
- **Asset**: Reusing `src/assets/blog-14.jpg` or similar as a placeholder for the thumbnail (to be updated later if needed).
- **Format**: HTML-in-JS string with semantic styles as per existing blog patterns.
- **Date**: August 20, 2026.
