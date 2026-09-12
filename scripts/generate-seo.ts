// Regenerates public/sitemap.xml and public/llms.txt from the blog post data.
// Runs automatically via the predev/prebuild npm hooks.

import { writeFileSync, mkdirSync } from "fs";
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

// --- plain-text article bodies for AI crawlers that do not run JavaScript ---
const htmlToText = (html: string) =>
  html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<h1[^>]*>([\s\S]*?)<\/h1>/gi, "\n\n# $1\n")
    .replace(/<h2[^>]*>([\s\S]*?)<\/h2>/gi, "\n\n## $1\n")
    .replace(/<h3[^>]*>([\s\S]*?)<\/h3>/gi, "\n\n### $1\n")
    .replace(/<h4[^>]*>([\s\S]*?)<\/h4>/gi, "\n\n#### $1\n")
    .replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, "\n- $1")
    .replace(/<\/(p|div|tr|table|section|blockquote)>/gi, "\n\n")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

const articleMarkdown = (p: (typeof allPosts)[number]) =>
  [
    `# ${p.title}`,
    ``,
    `> ${p.metaDescription}`,
    ``,
    `- Category: ${p.category}`,
    `- Author: ${p.author} (HYVE — India's team-based freelancing platform, https://hyvefreelance.com)`,
    `- Published: ${p.date}`,
    `- Canonical URL: ${BASE_URL}/blog/${p.slug}`,
    ``,
    htmlToText(p.content),
    ``,
    ...(p.faqs?.length
      ? [
          `## Frequently Asked Questions`,
          ``,
          ...p.faqs.flatMap((f) => [`### ${f.question}`, ``, htmlToText(f.answer), ``]),
        ]
      : []),
    `---`,
    `Source: HYVE Blog (${BASE_URL}). HYVE lets startups hire pre-vetted freelance teams in India with escrow-protected milestones and a flat 10% fee.`,
    ``,
  ].join("\n");

mkdirSync(resolve("public/blog"), { recursive: true });
const seen = new Set<string>();
const markdowns: string[] = [];
allPosts.forEach((p) => {
  if (seen.has(p.slug)) return;
  seen.add(p.slug);
  const md = articleMarkdown(p);
  markdowns.push(md);
  writeFileSync(resolve(`public/blog/${p.slug}.md`), md);
});

writeFileSync(
  resolve("public/llms-full.txt"),
  [
    `# HYVE Blog — full text of every article`,
    ``,
    `> Complete, machine-readable text of all ${markdowns.length} HYVE Blog articles on freelancing in India,`,
    `> startup hiring, remote teams, escrow payments and team-based freelancing (teamlancing).`,
    `> Site: ${BASE_URL} · Platform: https://hyvefreelance.com`,
    ``,
    markdowns.join("\n\n"),
  ].join("\n"),
);

console.log(
  `sitemap.xml (${urls.length} urls) + llms.txt + llms-full.txt + ${markdowns.length} article .md files written`,
);
