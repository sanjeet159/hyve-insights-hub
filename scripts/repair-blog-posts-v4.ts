import { readFileSync, writeFileSync, readdirSync } from "fs";
import { join } from "path";

const POSTS_DIR = "src/data/posts";
const files = readdirSync(POSTS_DIR).filter(f => f.startsWith("post-") && f.endsWith(".ts"));

files.forEach(file => {
    const filePath = join(POSTS_DIR, file);
    let code = readFileSync(filePath, "utf-8");

    // The logic must be extremely precise. 
    // We are looking for the exact substring starting with '  content: `${post.content}'
    // and ending with '`,'

    const startStr = "  content: `${post.content}";
    const startIdx = code.indexOf(startStr);
    
    if (startIdx !== -1) {
        // We found the problematic block.
        // Find where it ends
        const endIdx = code.indexOf("`,", startIdx);
        if (endIdx !== -1) {
            // Extract the additional content (the heading)
            // Format: content: `${post.content}\nHEADING`,
            const additionalText = code.substring(startIdx + startStr.length, endIdx);
            
            // Now, we need to find the REAL first content block and its end.
            const firstContentKey = "content: `";
            const firstIdx = code.indexOf(firstContentKey);
            const firstEndIdx = code.indexOf("`,", firstIdx);

            if (firstIdx !== -1 && firstEndIdx !== -1 && firstIdx < startIdx) {
                // Merge additionalText into the first block
                const originalFirstBlock = code.substring(firstIdx + firstContentKey.length, firstEndIdx);
                
                let newFirstBlock;
                if (originalFirstBlock.includes("</div>")) {
                    newFirstBlock = originalFirstBlock.replace("</div>", `${additionalText}\n</div>`);
                } else {
                    newFirstBlock = originalFirstBlock + additionalText;
                }

                // Reconstruct the whole file
                // Part 1: everything before first content block
                // Part 2: new merged content block
                // Part 3: everything between first content block end and second content block start
                // Part 4: everything after second content block end
                
                const part1 = code.substring(0, firstIdx + firstContentKey.length);
                const part3 = code.substring(firstEndIdx + 2, startIdx); // +2 for `,`
                const part4 = code.substring(endIdx + 2); // +2 for `,`
                
                code = part1 + newFirstBlock + "`," + part3 + part4;
            }
        }
    }

    // Final safety cleanup for any other similar patterns
    code = code.replace(/content:\s*`\$\{post\.content\}[\s\S]*?`\s*,/g, "");

    writeFileSync(filePath, code);
});

console.log("Successfully merged duplicate content blocks with high precision.");
