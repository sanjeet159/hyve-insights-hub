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

    // Let's use a very specific approach to target this exact pattern
    const lines = code.split('\n');
    let contentIndices = [];
    
    for(let i=0; i<lines.length; i++) {
        if (lines[i].trim().startsWith('content:')) {
            contentIndices.push(i);
        }
    }

    if (contentIndices.length > 1) {
        // We have duplicates.
        // Identify the second one (the problematic one)
        const secondIdx = contentIndices[1];
        
        // Extract the heading from the second block
        // It looks like: content: `${post.content}\n<h2...>...</h2>`,
        let heading = "";
        let endIdx = secondIdx;
        let foundEnd = false;
        
        // Accumulate lines until we find the end of the property
        let blockContent = "";
        while (endIdx < lines.length) {
            blockContent += lines[endIdx];
            if (lines[endIdx].includes('`,')) {
                foundEnd = true;
                break;
            }
            endIdx++;
        }

        const headingMatch = blockContent.match(/<h2[^>]*>.*?<\/h2>/) || blockContent.match(/## Frequently Asked Questions/);
        if (headingMatch) {
            heading = headingMatch[0];
        }

        // Remove the duplicate block from lines
        lines.splice(secondIdx, endIdx - secondIdx + 1);

        // Now find the first content block and append the heading
        const firstIdx = contentIndices[0];
        let firstEndIdx = firstIdx;
        while (firstEndIdx < lines.length && !lines[firstEndIdx].includes('`,') && !lines[firstEndIdx].includes('faqs:')) {
            firstEndIdx++;
        }

        // We want to insert before the closing `
        if (lines[firstEndIdx].includes('</div>`')) {
            lines[firstEndIdx] = lines[firstEndIdx].replace('</div>`', `${heading}\n</div>\``);
        } else if (lines[firstEndIdx].includes('`')) {
            lines[firstEndIdx] = lines[firstEndIdx].replace('`', `\n${heading}\n\``);
        }

        code = lines.join('\n');
    }

    // Final safety: remove any illegal self-references if they somehow persisted
    code = code.replace(/content:\s*`\$\{post\.content\}[\s\S]*?`\s*,/g, "");

    writeFileSync(filePath, code);
});

console.log("Fixed duplicate properties and self-references in blog posts.");
