// Regenerates public/sitemap.xml and public/llms.txt from the blog post data.
// Runs automatically via the predev/prebuild npm hooks.

import { writeFileSync } from "fs";
import { resolve } from "path";
import { allPosts } from "../src/data/posts";

const BASE_URL = "https://blog.hyvefreelance.com";

const toIso = (d: string) => {
  const parsed = new Date(d);
  return isNaN(parsed.getTime()) ? undefined : parsed.toISOString().split("T")[0];
};

// --- sitemap.xml ---
const urls = [
  `  <url><loc>${BASE_URL}/</loc><changefreq>daily</changefreq><priority>1.0</priority></url>`,
  ...allPosts.map((p) => {
    const lastmod = toIso(p.date);
    return `  <url><loc>${BASE_URL}/blog/${p.slug}</loc><changefreq>monthly</changefreq><priority>0.8</priority>${
      lastmod ? `<lastmod>${lastmod}</lastmod>` : ""
    }</url>`;
  }),
];

writeFileSync(
  resolve("public/sitemap.xml"),
  [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
    ...urls,
    `</urlset>`,
    ``,
  ].join("\n"),
);

// --- llms.txt (for AI search engines: ChatGPT, Perplexity, Claude, Gemini) ---
const llms = [
  `# HYVE Blog`,
  ``,
  `> HYVE is India's first team-based freelancing platform ("teamlancing"): startups hire pre-vetted,`,
  `> cross-functional freelance teams as a single unit, with escrow-protected INR payments and a flat 10% fee.`,
  `> This blog publishes research-backed guides on freelancing in India, startup hiring, remote teams and payments.`,
  ``,
  `## Key facts about HYVE`,
  ``,
  `- Product: team-based freelancing (teamlancing) marketplace for Indian startups and freelancers.`,
  `- Fee: flat 10% platform fee, INR-native payouts, GST-friendly invoicing.`,
  `- Payments: escrow-funded milestones so freelancers are paid on time.`,
  `- Website: https://hyvefreelance.com · Blog: ${BASE_URL}/`,
  ``,
  `## Pages`,
  ``,
  `- [Home](${BASE_URL}/): Latest articles, featured post and category browser.`,
  ``,
  `## Blog`,
  ``,
  ...allPosts.map(
    (p) => `- [${p.title}](${BASE_URL}/blog/${p.slug}): ${p.metaDescription} (${p.category}, ${p.date})`,
  ),
  ``,
].join("\n");

writeFileSync(resolve("public/llms.txt"), llms);

console.log(`sitemap.xml (${urls.length} urls) + llms.txt (${allPosts.length} posts) written`);
