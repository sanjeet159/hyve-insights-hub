# HYVE city landing pages

## What will change
- Create dedicated, locally useful freelancer-hiring pages for eight major Indian cities: Bengaluru (with Bangalore/Banglore aliases), Pune, Delhi, Mumbai, Hyderabad, Chennai, Kolkata, and Ahmedabad.
- Keep the current blog domain and brand styling. Each page will have unique city-specific title/description, helpful hiring guidance, relevant existing articles, and a clear HYVE call to action; avoid unsupported local statistics and repetitive doorway-page copy.
- Use one shared city-data source for page rendering, canonical routes, sitemap entries, and static prerendered HTML so each URL is discoverable without JavaScript.
- Canonicalize spelling variants to `/bangalore` while using `/bengaluru` as the city’s primary proper-name route only if confirmed by the source structure; omit aliases from the sitemap.

## Technical details
- Add a reusable city landing page and a central city data module.
- Register explicit city routes in the React router; handle `/banglore` and `/bangalore` as aliases of `/bengaluru` to avoid duplicate indexable pages.
- Extend sitemap generation and post-build prerendering from the shared city data; add a focused test for canonical city URLs and alias exclusion.
- Record the shared-source routing/prerender decision in `AGENTS.md`.

## Verification
- Run the focused SEO test and the project’s TypeScript check.
- Verify generated sitemap entries and static city HTML/canonicals, then inspect the live preview at desktop and mobile sizes.
