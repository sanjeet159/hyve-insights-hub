import { readFileSync, writeFileSync, readdirSync } from "fs";
import { join } from "path";

const POSTS_DIR = "src/data/posts";
const files = readdirSync(POSTS_DIR).filter(f => f.startsWith("post-") && f.endsWith(".ts"));

files.forEach(file => {
    const filePath = join(POSTS_DIR, file);
    let code = readFileSync(filePath, "utf-8");

    // The problematic code is:
    // ...`,
    //   content: `${post.content}
    // <h2 ...>...</h2>`,
    
    // Step 1: Find the duplicate content block.
    // It starts with 'content: `${post.content}' and ends with '`,'
    
    const secondContentPattern = /content:\s*`\$\{post\.content\}[\s\S]*?`\s*,/;
    const match = code.match(secondContentPattern);
    
    if (match) {
        const fullMatch = match[0];
        // Extract the heading inside it
        const hMatch = fullMatch.match(/<h2[^>]*>.*?<\/h2>/) || fullMatch.match(/## Frequently Asked Questions/);
        const heading = hMatch ? hMatch[0] : "";

        // Remove the whole duplicate block from the code
        code = code.replace(secondContentPattern, "");

        // Find the first content block's end
        // It's 'content: `...`,'
        const firstContentStart = code.indexOf("content: `");
        if (firstContentStart !== -1) {
            const firstContentEnd = code.indexOf("`,", firstContentStart);
            if (firstContentEnd !== -1) {
                // Insert heading before the backtick of the first block
                const originalFirstBlock = code.substring(firstContentStart + 10, firstContentEnd);
                
                let newFirstBlock;
                if (originalFirstBlock.includes("</div>")) {
                    newFirstBlock = originalFirstBlock.replace("</div>", `${heading}\n</div>`);
                } else {
                    newFirstBlock = originalFirstBlock + "\n\n" + heading;
                }
                
                code = code.substring(0, firstContentStart + 10) + newFirstBlock + code.substring(firstContentEnd);
            }
        }
    }

    // Safety: ensure no literal self-references exist
    code = code.replace(/content:\s*`\$\{post\.content\}[\s\S]*?`\s*,/g, "");

    writeFileSync(filePath, code);
});

console.log("Blog post build errors resolved with regex.");
