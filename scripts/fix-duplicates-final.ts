import { readFileSync, writeFileSync, readdirSync } from "fs";
import { join } from "path";

const POSTS_DIR = "src/data/posts";
const files = readdirSync(POSTS_DIR).filter(f => f.startsWith("post-") && f.endsWith(".ts"));

files.forEach(file => {
    const filePath = join(POSTS_DIR, file);
    let code = readFileSync(filePath, "utf-8");

    // The error is:
    // 29:   content: `${post.content}
    // 30: <h2 style="...">Common Questions About 42</h2>`,
    
    // We need to find this specific pattern and remove it, while ensuring the heading is actually inside the FIRST content block.

    // 1. Identify the duplicate content block
    // It usually starts with `  content: `${post.content}`
    const duplicatePattern = /^\s*content:\s*`\$\{post\.content\}[\s\S]*?`\s*,/m;
    const match = code.match(duplicatePattern);

    if (match) {
        const fullMatch = match[0];
        // Extract the heading from the match
        const headingMatch = fullMatch.match(/<h2[^>]*>.*?<\/h2>/) || fullMatch.match(/## Frequently Asked Questions/);
        const heading = headingMatch ? headingMatch[0] : "";

        // Remove the duplicate block
        code = code.replace(duplicatePattern, "");

        // Insert the heading into the first content block
        // The first content block ends with ` or </div>` followed by `
        if (heading) {
            if (code.includes("</div>`")) {
                code = code.replace("</div>`", `${heading}\n</div>\``);
            } else {
                // Find the first occurrence of ` followed by , and faqs:
                const faqsIndex = code.indexOf("faqs:");
                if (faqsIndex !== -1) {
                    const lastBacktickBeforeFaqs = code.lastIndexOf("`", faqsIndex);
                    if (lastBacktickBeforeFaqs !== -1) {
                        code = code.substring(0, lastBacktickBeforeFaqs) + `\n\n${heading}\n` + code.substring(lastBacktickBeforeFaqs);
                    }
                }
            }
        }
    }

    // Double check: if there's still a content: `${post.content}` it's a bug
    code = code.replace(/content:\s*`\$\{post\.content\}[\s\S]*?`\s*,/g, "");

    // Cleanup whitespace
    code = code.replace(/\n\s*\n\s*\n/g, "\n\n");

    writeFileSync(filePath, code);
});

console.log("Fixed duplicate properties and self-references in blog posts.");
