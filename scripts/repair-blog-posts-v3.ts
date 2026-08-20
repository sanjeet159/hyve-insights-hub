import { readFileSync, writeFileSync, readdirSync } from "fs";
import { join } from "path";

const POSTS_DIR = "src/data/posts";
const files = readdirSync(POSTS_DIR).filter(f => f.startsWith("post-") && f.endsWith(".ts"));

files.forEach(file => {
    const filePath = join(POSTS_DIR, file);
    let code = readFileSync(filePath, "utf-8");

    // The problematic part is usually:
    // ...`,
    //   content: `${post.content}
    // <h2 ...> ... </h2>`,

    const lines = code.split('\n');
    let contentKeysFound = 0;
    const newLines = [];

    for (let i = 0; i < lines.length; i++) {
        const trimmed = lines[i].trim();
        if (trimmed.startsWith('content:')) {
            contentKeysFound++;
            if (contentKeysFound > 1) {
                // This is the duplicate key. Extract heading if possible.
                // It looks like: content: `${post.content}\n<h2 ...> ... </h2>`,
                // We'll skip this line and subsequent lines until the closing backtick
                let j = i;
                let additionalContent = "";
                while (j < lines.length) {
                    additionalContent += lines[j] + "\n";
                    if (lines[j].includes('`,')) break;
                    j++;
                }

                // Try to extract the H2 or H3 heading
                const headingMatch = additionalContent.match(/<h2[^>]*>.*?<\/h2>/) || additionalContent.match(/## Frequently Asked Questions/);
                if (headingMatch) {
                    const heading = headingMatch[0];
                    // Append this heading to the PREVIOUSLY added content block
                    // The previous content block is in newLines and ends with a backtick
                    for (let k = newLines.length - 1; k >= 0; k--) {
                        if (newLines[k].includes('`,') || newLines[k].includes('`,')) {
                            // Find the index of the backtick
                            const backtickIdx = newLines[k].lastIndexOf('`');
                            if (backtickIdx !== -1) {
                                // Insert before the backtick or handle </div>`
                                if (newLines[k].includes('</div>`')) {
                                    newLines[k] = newLines[k].replace('</div>`', `${heading}\n</div>\``);
                                } else {
                                    newLines[k] = newLines[k].substring(0, backtickIdx) + `\n\n${heading}\n` + newLines[k].substring(backtickIdx);
                                }
                                break;
                            }
                        }
                    }
                }
                
                // Skip to the end of this duplicate block
                i = j;
                continue;
            }
        }
        newLines.push(lines[i]);
    }

    let finalCode = newLines.join('\n');
    
    // Safety check for any remaining self-references
    finalCode = finalCode.replace(/content:\s*`\$\{post\.content\}[\s\S]*?`\s*,/g, "");
    
    writeFileSync(filePath, finalCode);
});

console.log("Blog posts build errors fixed via line-by-line processing.");
