import { readFileSync, writeFileSync, readdirSync } from "fs";
import { join } from "path";

const POSTS_DIR = "src/data/posts";
const files = readdirSync(POSTS_DIR).filter(f => f.startsWith("post-") && f.endsWith(".ts"));

files.forEach(file => {
    const filePath = join(POSTS_DIR, file);
    let code = readFileSync(filePath, "utf-8");

    // We have this:
    // content: `...`,
    // content: `${post.content} ...`,
    
    // Step 1: Find the first content block and its closing backtick
    const contentKey = "content: `";
    const firstIdx = code.indexOf(contentKey);
    if (firstIdx === -1) return;
    
    const startOfContent = firstIdx + contentKey.length;
    // Find the end of the first backtick block.
    // It's followed by `,` and then possibly newline and then another property or the end of the object.
    const endOfFirstBacktick = code.indexOf("`,", startOfContent);
    if (endOfFirstBacktick === -1) return;

    // Step 2: Find the second content block
    const secondContentKey = "content: `${post.content}";
    const secondIdx = code.indexOf(secondContentKey);
    
    if (secondIdx !== -1) {
        // Find the end of the second block
        const endOfSecondBlock = code.indexOf("`,", secondIdx);
        if (endOfSecondBlock !== -1) {
            // Extract the additional content from the second block.
            // Format: content: `${post.content}\nHEADING`,
            const additionalPart = code.substring(secondIdx + secondContentKey.length, endOfSecondBlock);
            
            // Remove the second block entirely
            // We'll also remove any whitespace/newlines between the first block and the start of the second.
            const partBeforeSecond = code.substring(0, secondIdx).trimEnd();
            const partAfterSecond = code.substring(endOfSecondBlock + 2); // +2 for `,`
            
            // Reconstruct the code by merging the additional part into the first block
            const originalContent = code.substring(startOfContent, endOfFirstBacktick);
            
            // If the original content ends with </div>, insert before it if possible
            let newContent;
            if (originalContent.includes("</div>")) {
                newContent = originalContent.replace("</div>", `${additionalPart}\n</div>`);
            } else {
                newContent = originalContent + additionalPart;
            }

            code = partBeforeSecond.substring(0, startOfContent) + newContent + "`," + partAfterSecond;
        }
    }

    // Safety: ensure no remaining content: `${post.content}` exists
    code = code.replace(/content:\s*`\$\{post\.content\}[\s\S]*?`\s*,/g, "");

    writeFileSync(filePath, code);
});

console.log("Succesfully merged duplicate content blocks.");
