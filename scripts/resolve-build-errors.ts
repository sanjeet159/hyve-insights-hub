import { readFileSync, writeFileSync, readdirSync } from "fs";
import { join } from "path";

const POSTS_DIR = "src/data/posts";
const files = readdirSync(POSTS_DIR).filter(f => f.startsWith("post-") && f.endsWith(".ts"));

files.forEach(file => {
    const filePath = join(POSTS_DIR, file);
    let code = readFileSync(filePath, "utf-8");

    // The core of the problem:
    // 98: ...🐝*`,
    // 99:   content: `${post.content}
    // 100: <h2 ...>...</h2>`,
    
    // We must remove line 99 and merge line 100 into the previous backtick.

    const lines = code.split('\n');
    let firstContentIdx = -1;
    let secondContentIdx = -1;

    for (let i = 0; i < lines.length; i++) {
        const trimmed = lines[i].trim();
        if (trimmed.startsWith('content:')) {
            if (firstContentIdx === -1) {
                firstContentIdx = i;
            } else {
                secondContentIdx = i;
                break;
            }
        }
    }

    if (secondContentIdx !== -1) {
        // Line secondContentIdx is:   content: `${post.content}
        // Line secondContentIdx + 1 is: <h2 ...>...</h2>`,
        
        let heading = "";
        const nextLine = lines[secondContentIdx + 1];
        if (nextLine) {
            const hMatch = nextLine.match(/<h2[^>]*>.*?<\/h2>/) || nextLine.match(/## Frequently Asked Questions/);
            if (hMatch) heading = hMatch[0];
        }

        // 1. Remove the entire duplicate block (usually 2 lines)
        // Check if the closing backtick is on the same line or next
        let linesToRemove = 1;
        if (lines[secondContentIdx + 1].includes('`,')) {
            linesToRemove = 2;
        } else if (lines[secondContentIdx + 2] && lines[secondContentIdx + 2].includes('`,')) {
            linesToRemove = 3;
        }
        
        lines.splice(secondContentIdx, linesToRemove);

        // 2. Insert heading into the first block
        // Find the backtick at the end of the first block
        let j = firstContentIdx;
        while (j < lines.length) {
            if (lines[j].includes('`,') || (lines[j+1] && lines[j+1].includes('faqs:'))) {
                // This is the end of the first block
                break;
            }
            j++;
        }

        if (lines[j] && heading) {
            if (lines[j].includes('</div>`')) {
                lines[j] = lines[j].replace('</div>`', `${heading}\n</div>\``);
            } else if (lines[j].includes('`')) {
                // If the backtick is followed by something else, be careful
                const lastTick = lines[j].lastIndexOf('`');
                lines[j] = lines[j].substring(0, lastTick) + `\n\n${heading}\n` + lines[j].substring(lastTick);
            }
        }

        code = lines.join('\n');
    }

    // Final safety
    code = code.replace(/content:\s*`\$\{post\.content\}[\s\S]*?`\s*,/g, "");

    writeFileSync(filePath, code);
});

console.log("Blog post build errors resolved.");
