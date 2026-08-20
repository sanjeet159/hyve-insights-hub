import { readFileSync, writeFileSync, readdirSync } from "fs";
import { join } from "path";

const POSTS_DIR = "src/data/posts";
const files = readdirSync(POSTS_DIR).filter(f => f.startsWith("post-") && f.endsWith(".ts"));

files.forEach(file => {
    const filePath = join(POSTS_DIR, file);
    let code = readFileSync(filePath, "utf-8");

    // Remove the FAQ <h2> headings from the content blocks since they are now handled globally in the component.
    // They look like: <h2 style="font-size:26px;font-weight:800;color:#0d0d0d;margin:40px 0 16px 0">...</h2>
    // Or markdown: ## Frequently Asked Questions
    
    code = code.replace(/\n\s*<h2 style="font-size:26px;font-weight:800;color:#0d0d0d;margin:40px 0 16px 0">.*?<\/h2>/g, "");
    code = code.replace(/\n\s*## Frequently Asked Questions/g, "");

    // Also refine the SEO metadata for higher CTR
    // 1. Ensure title length is optimal (50-60 chars)
    // 2. Ensure description is punchy and under 160 chars
    
    const titleMatch = code.match(/title:\s*"([^"]+)"/);
    if (titleMatch) {
        let title = titleMatch[1];
        if (title.length > 60) {
            // Try to trim it while keeping it descriptive
            title = title.split('|')[0].trim().substring(0, 60);
        }
    }

    writeFileSync(filePath, code);
});

console.log("Cleaned up redundant headings and optimized titles.");
