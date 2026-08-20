import { readFileSync, writeFileSync, readdirSync } from "fs";
import { join } from "path";

const POSTS_DIR = "src/data/posts";
const files = readdirSync(POSTS_DIR).filter(f => f.startsWith("post-") && f.endsWith(".ts"));

files.forEach(file => {
    const filePath = join(POSTS_DIR, file);
    let code = readFileSync(filePath, "utf-8");

    // The logic must be extremely robust to handle various formats.
    
    // 1. Detect if duplicate content exists
    const lines = code.split('\n');
    let firstContentLineIdx = -1;
    let secondContentLineIdx = -1;

    for (let i = 0; i < lines.length; i++) {
        if (lines[i].trim().startsWith('content:')) {
            if (firstContentLineIdx === -1) {
                firstContentLineIdx = i;
            } else {
                secondContentLineIdx = i;
                break;
            }
        }
    }

    if (secondContentLineIdx !== -1) {
        // Extract the heading/additional content from the second block
        // Block starts at secondContentLineIdx and ends at the line containing `,`
        let endIdx = secondContentLineIdx;
        let blockText = "";
        while (endIdx < lines.length) {
            blockText += lines[endIdx] + "\n";
            if (lines[endIdx].includes('`,')) break;
            endIdx++;
        }

        const headingMatch = blockText.match(/<h2[^>]*>.*?<\/h2>/) || blockText.match(/## Frequently Asked Questions/);
        const heading = headingMatch ? headingMatch[0] : "";

        // Remove the entire second content block from the array
        lines.splice(secondContentLineIdx, (endIdx - secondContentLineIdx) + 1);

        // Merge the heading into the first block
        // Find where the first block ends (the closing backtick)
        let firstEndIdx = firstContentLineIdx;
        while (firstEndIdx < lines.length) {
            if (lines[firstEndIdx].includes('`,') || lines[firstEndIdx].includes('faqs:')) {
                // We found the end or the next property
                break;
            }
            firstEndIdx++;
        }
        
        // If we stopped at faqs:, go back one line to find the backtick
        if (lines[firstEndIdx] && lines[firstEndIdx].includes('faqs:')) {
            firstEndIdx--;
        }

        // Insert heading before the closing backtick of the first content block
        if (lines[firstEndIdx]) {
            if (lines[firstEndIdx].includes('</div>`')) {
                lines[firstEndIdx] = lines[firstEndIdx].replace('</div>`', `${heading}\n</div>\``);
            } else if (lines[firstEndIdx].includes('`')) {
                lines[firstEndIdx] = lines[firstEndIdx].replace('`', `\n${heading}\n\``);
            }
        }

        code = lines.join('\n');
    }

    // Final purge of self-references
    code = code.replace(/content:\s*`\$\{post\.content\}[\s\S]*?`\s*,/g, "");

    writeFileSync(filePath, code);
});

console.log("Deep cleaned blog posts.");
