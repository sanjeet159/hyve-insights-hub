import { allPosts } from "@/data/posts";

export const generateSitemapXML = (): string => {
  const baseUrl = "https://blog.hyvefreelance.com";
  const today = new Date().toISOString().split("T")[0];

  const staticUrls = [
    { loc: baseUrl, priority: "1.0", changefreq: "daily" },
  ];

  const postUrls = allPosts.map((post) => ({
    loc: `${baseUrl}/blog/${post.slug}`,
    priority: "0.8",
    changefreq: "monthly",
    lastmod: today,
  }));

  const allUrls = [...staticUrls, ...postUrls];

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls
  .map(
    (url) => `  <url>
    <loc>${url.loc}</loc>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
    ${url.lastmod ? `<lastmod>${url.lastmod}</lastmod>` : ""}
  </url>`
  )
  .join("\n")}
</urlset>`;
};
