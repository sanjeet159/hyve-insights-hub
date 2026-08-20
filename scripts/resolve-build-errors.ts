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
    
    // We must find the EXACT lines to delete and modify.

    const lines = code.split('\n');
    let contentKeys = [];
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].trim().startsWith('content:')) {
            contentKeys.push(i);
        }
    }

    if (contentKeys.length > 1) {
        // Find the second content block
        const secondIdx = contentKeys[1];
        
        // Extract the heading from the second block.
        // It's usually on the line after 'content:'
        const headingLine = lines[secondIdx + 1];
        let heading = "";
        if (headingLine) {
            const hMatch = headingLine.match(/<h2[^>]*>.*?<\/h2>/) || headingLine.match(/## Frequently Asked Questions/);
            if (hMatch) heading = hMatch[0];
        }

        // Identify the range to delete for the second block
        let endIdx = secondIdx;
        while (endIdx < lines.length && !lines[endIdx].includes('`,') && !lines[endIdx].includes('faqs:')) {
            endIdx++;
        }
        
        // Remove the block from lines
        lines.splice(secondIdx, (endIdx - secondIdx) + 1);

        // Merge the heading into the first block
        const firstIdx = contentKeys[0];
        let firstEndIdx = firstIdx;
        while (firstEndIdx < lines.length && !lines[firstEndIdx].includes('`,') && !lines[firstEndIdx].includes('faqs:')) {
            firstEndIdx++;
        }
        
        // Safety: ensure we are at the closing backtick
        if (lines[firstEndIdx] && lines[firstEndIdx].includes('`')) {
            if (lines[firstEndIdx].includes('</div>`')) {
                lines[firstEndIdx] = lines[firstEndIdx].replace('</div>`', `${heading}\n</div>\``);
            } else {
                const tickPos = lines[firstEndIdx].lastIndexOf('`');
                lines[firstEndIdx] = lines[firstEndIdx].substring(0, tickPos) + `\n\n${heading}\n` + lines[firstEndIdx].substring(tickPos);
            }
        }

        code = lines.join('\n');
    }

    // Final safety: ensure no literal self-references exist in a way that breaks things
    code = code.replace(/content:\s*`\$\{post\.content\}[\s\S]*?`\s*,/g, "");

    writeFileSync(filePath, code);
});

console.log("Successfully resolved build errors in blog posts.");
