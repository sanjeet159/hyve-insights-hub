import { readFileSync, writeFileSync, readdirSync } from "fs";
import { join } from "path";

const POSTS_DIR = "src/data/posts";
const files = readdirSync(POSTS_DIR).filter(f => f.startsWith("post-") && f.endsWith(".ts"));

files.forEach(file => {
    const filePath = join(POSTS_DIR, file);
    let code = readFileSync(filePath, "utf-8");

    // The problematic pattern is:
    // ...`,
    //   content: `${post.content}
    // <h2...>Common Questions About ID</h2>`,
    
    // 1. Find the second 'content:' property
    const contentKey = "content:";
    const firstIdx = code.indexOf(contentKey);
    if (firstIdx === -1) return;
    
    const secondIdx = code.indexOf(contentKey, firstIdx + contentKey.length);
    if (secondIdx === -1) return;

    // 2. We have a duplicate. Let's merge the additional content into the first block.
    const lines = code.split('\n');
    let firstLine = -1;
    let secondLine = -1;
    
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].trim().startsWith('content:')) {
            if (firstLine === -1) firstLine = i;
            else {
                secondLine = i;
                break;
            }
        }
    }

    if (secondLine !== -1) {
        // Extract heading from the second block
        let headingLine = lines[secondLine + 1];
        let heading = "";
        if (headingLine) {
            const hMatch = headingLine.match(/<h2[^>]*>.*?<\/h2>/) || headingLine.match(/## Frequently Asked Questions/);
            if (hMatch) heading = hMatch[0];
        }

        // Remove the second property block
        // Find where it ends
        let endIdx = secondLine;
        while (endIdx < lines.length && !lines[endIdx].includes('`,') && !lines[endIdx].includes('faqs:')) {
            endIdx++;
        }
        lines.splice(secondLine, (endIdx - secondLine) + 1);

        // Find the end of the first content block
        let firstEndIdx = firstLine;
        while (firstEndIdx < lines.length && !lines[firstEndIdx].includes('`,') && !lines[firstEndIdx].includes('faqs:')) {
            firstEndIdx++;
        }
        
        // Safety check if we overshot
        if (lines[firstEndIdx] && lines[firstEndIdx].includes('faqs:')) {
            firstEndIdx--;
        }

        // Merge heading
        if (lines[firstEndIdx] && heading) {
            if (lines[firstEndIdx].includes('</div>`')) {
                lines[firstEndIdx] = lines[firstEndIdx].replace('</div>`', `${heading}\n</div>\``);
            } else if (lines[firstEndIdx].includes('`')) {
                lines[firstEndIdx] = lines[firstEndIdx].replace('`', `\n${heading}\n\``);
            }
        }

        code = lines.join('\n');
    }

    // Double check: replace any literal `${post.content}` which is illegal
    code = code.replace(/content:\s*`\$\{post\.content\}[\s\S]*?`\s*,/g, "");

    writeFileSync(filePath, code);
});

console.log("Blog posts repaired.");
