// Post-build: writes static HTML per article (dist/blog/<slug>/index.html) and enriches
// dist/index.html so non-JS crawlers see an H1, real text, canonical and internal links.
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { resolve } from "path";
import { allPosts } from "../src/data/posts";

const BASE = "https://blog.hyvefreelance.com";
const dist = resolve("dist");
if (!existsSync(`${dist}/index.html`)) process.exit(0);
const tpl = readFileSync(`${dist}/index.html`, "utf8");
const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const posts = allPosts.filter((p, i, a) => a.findIndex((q) => q.slug === p.slug) === i);
const strip = (h: string) => h.replace(/<script[\s\S]*?<\/script>/gi, "").replace(/<style[\s\S]*?<\/style>/gi, "");

const setHead = (html: string, title: string, desc: string, url: string) =>
  html
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(title)}</title><link rel="canonical" href="${url}" />`)
    .replace(/(<meta[^>]*name="description"[^>]*content=")[^"]*"/, `$1${esc(desc)}"`)
    .replace(/(<meta property="og:title" content=")[^"]*"/, `$1${esc(title)}"`)
    .replace(/(<meta property="og:description" content=")[^"]*"/, `$1${esc(desc)}"`)
    .replace(/(<meta property="og:url" content=")[^"]*"/, `$1${url}"`)
    .replace(/(<meta name="twitter:title" content=")[^"]*"/, `$1${esc(title)}"`)
    .replace(/(<meta name="twitter:description" content=")[^"]*"/, `$1${esc(desc)}"`);

const withBody = (html: string, body: string) => html.replace('<div id="root"></div>', `<div id="root">${body}</div>`);

posts.forEach((p, i) => {
  const url = `${BASE}/blog/${p.slug}`;
  const related = [1, 2, 3, 4, 5].map((k) => posts[(i + k) % posts.length]);
  const body = `<main><article><h1>${esc(p.title)}</h1><p>${esc(p.excerpt || p.metaDescription || "")}</p>${strip(p.content)}${
    p.faqs?.length ? `<h2>Frequently Asked Questions</h2>${p.faqs.map((f) => `<h3>${esc(f.question)}</h3><p>${f.answer}</p>`).join("")}` : ""
  }</article><nav><h2>Related articles</h2><ul>${related.map((r) => `<li><a href="/blog/${r.slug}">${esc(r.title)}</a></li>`).join("")}</ul><a href="/">All HYVE Blog articles</a> · <a href="https://hyvefreelance.com">Hire freelance teams on HYVE</a></nav></main>`;
  const html = withBody(setHead(tpl, p.metaTitle || `${p.title} | HYVE Blog`, p.metaDescription || p.excerpt || "", url), body);
  mkdirSync(`${dist}/blog/${p.slug}`, { recursive: true });
  writeFileSync(`${dist}/blog/${p.slug}/index.html`, html);
});

const home = `<main><h1>HYVE Blog — Freelancing, Startup Hiring &amp; Remote Work in India</h1><p>Guides on freelancing in India, hiring freelancers and teams, escrow payments, pricing and teamlancing from HYVE.</p><ul>${posts
  .map((p) => `<li><a href="/blog/${p.slug}">${esc(p.title)}</a> — ${esc(p.excerpt || p.metaDescription || "")}</li>`)
  .join("")}</ul></main>`;
writeFileSync(`${dist}/index.html`, withBody(setHead(tpl, "HYVE Blog — Freelancing, Startup Hiring & Remote Work in India", "Expert guides on freelancing in India, startup hiring, remote teams, escrow payments and team-based freelancing — fresh insights weekly from HYVE.", `${BASE}/`), home));
console.log(`prerendered ${posts.length} articles + home`);
