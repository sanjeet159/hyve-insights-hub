import { readFileSync, writeFileSync, readdirSync } from "fs";
import { join } from "path";

const POSTS_DIR = "src/data/posts";
const files = readdirSync(POSTS_DIR).filter(f => f.startsWith("post-") && f.endsWith(".ts"));

files.forEach(file => {
  const filePath = join(POSTS_DIR, file);
  let code = readFileSync(filePath, "utf-8");

  // Fix build errors: Remove self-referential 'post.content' and duplicate 'content' properties
  // The first 'content' property contains the main body.
  // The second 'content' property was erroneously added by a previous script and causes duplicate key errors.
  
  const lines = code.split('\n');
  let firstContentIndex = -1;
  let secondContentIndex = -1;
  
  for(let i=0; i<lines.length; i++) {
    const trimmed = lines[i].trim();
    if (trimmed.startsWith('content:')) {
      if (firstContentIndex === -1) {
          firstContentIndex = i;
      } else {
          secondContentIndex = i;
          // Look ahead to find where this second block ends
          let endIdx = i;
          while(endIdx < lines.length && !lines[endIdx].includes('`,') && !lines[endIdx].includes('faqs:')) {
            endIdx++;
          }
          // Remove the erroneous lines
          lines.splice(i, endIdx - i + 1);
          i--; // adjust index after splice
      }
    }
  }

  // Double check and remove any remaining ${post.content} strings which are illegal inside the object definition
  let cleanedCode = lines.join('\n');
  cleanedCode = cleanedCode.replace(/\$\{post\.content\}/g, '');
  
  // Also clean up meta descriptions that got too long or messy
  cleanedCode = cleanedCode.replace(/metaDescription:\s*"([^"]+)"/g, (match, desc) => {
    let cleanDesc = desc.replace(/[\n\r]/g, " ").trim();
    if (cleanDesc.length > 155) {
      cleanDesc = cleanDesc.substring(0, 152) + "...";
    }
    return `metaDescription: "${cleanDesc}"`;
  });

  // Re-standardize FAQ headings
  if (cleanedCode.includes("faqs:") && !cleanedCode.includes("Frequently Asked Questions") && !cleanedCode.includes("Common Questions")) {
      const heading = `<h2 style="font-size:26px;font-weight:800;color:#0d0d0d;margin:40px 0 16px 0">Frequently Asked Questions</h2>`;
      if (cleanedCode.includes("</div>`")) {
          cleanedCode = cleanedCode.replace("</div>`", `${heading}\n</div>\``);
      } else if (cleanedCode.includes("`,")) {
          // If it's the main markdown style block ending with `,
          // find the LAST occurrence of ` before faqs:
          const faqsPos = cleanedCode.indexOf('faqs:');
          const lastBacktickPos = cleanedCode.lastIndexOf('`', faqsPos);
          if (lastBacktickPos !== -1) {
              cleanedCode = cleanedCode.substring(0, lastBacktickPos) + `\n\n## Frequently Asked Questions\n` + cleanedCode.substring(lastBacktickPos);
          }
      }
  }

  writeFileSync(filePath, cleanedCode);
});

console.log(`Deep cleaned and fixed build errors in ${files.length} posts.`);
