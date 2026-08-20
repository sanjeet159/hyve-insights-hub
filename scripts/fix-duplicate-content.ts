import { readFileSync, writeFileSync, readdirSync } from "fs";
import { join } from "path";

const POSTS_DIR = "src/data/posts";
const files = readdirSync(POSTS_DIR).filter(f => f.startsWith("post-") && f.endsWith(".ts"));

files.forEach(file => {
  const filePath = join(POSTS_DIR, file);
  let code = readFileSync(filePath, "utf-8");

  // Fix the duplicate property error and self-reference
  // We want to merge the FAQ heading into the main content block
  
  // Find the duplicate content property
  const lines = code.split('\n');
  let firstContentIndex = -1;
  let secondContentIndex = -1;
  
  for(let i=0; i<lines.length; i++) {
    if (lines[i].trim().startsWith('content:')) {
      if (firstContentIndex === -1) firstContentIndex = i;
      else secondContentIndex = i;
    }
  }

  if (secondContentIndex !== -1) {
    // Extract the heading from the second content block
    const secondContentLine = lines[secondContentIndex];
    const headingMatch = secondContentLine.match(/<h2[^>]*>.*?<\/h2>/);
    const mdHeadingMatch = secondContentLine.match(/## Frequently Asked Questions/);
    
    let heading = "";
    if (headingMatch) heading = headingMatch[0];
    else if (mdHeadingMatch) heading = "\n\n## Frequently Asked Questions";
    else heading = "\n\n<h2 style=\"font-size:26px;font-weight:800;color:#0d0d0d;margin:40px 0 16px 0\">Frequently Asked Questions</h2>";

    // Remove the second content property entirely (usually spanning multiple lines)
    // Find the end of the second property block
    let endSecondIndex = secondContentIndex;
    while(endSecondIndex < lines.length && !lines[endSecondIndex].includes('`,') && !lines[endSecondIndex].includes('faqs:')) {
        endSecondIndex++;
    }
    
    lines.splice(secondContentIndex, endSecondIndex - secondContentIndex + 1);

    // Update the first content block
    // We need to find where the first content block ends
    let endFirstIndex = firstContentIndex;
    while(endFirstIndex < lines.length && !lines[endFirstIndex].includes('`,') && !lines[endFirstIndex].includes('faqs:')) {
        endFirstIndex++;
    }
    
    if (lines[endFirstIndex].includes('</div>`')) {
        lines[endFirstIndex] = lines[endFirstIndex].replace('</div>`', `${heading}\n</div>\``);
    } else if (lines[endFirstIndex].includes('`')) {
        lines[endFirstIndex] = lines[endFirstIndex].replace('`', `\n${heading}\n\``);
    }

    code = lines.join('\n');
  }

  // Double check meta description length and formatting
  code = code.replace(/metaDescription:\s*"([^"]+)"/g, (match, desc) => {
    let cleanDesc = desc.replace(/[\n\r]/g, " ").trim();
    if (cleanDesc.length > 160) {
      cleanDesc = cleanDesc.substring(0, 157) + "...";
    }
    return `metaDescription: "${cleanDesc}"`;
  });

  // Ensure JSON-LD FAQ answer is meaty
  code = code.replace(/answer:\s*"([^"]+)"/g, (match, answer) => {
    if (answer.length < 100) {
        let newAnswer = answer;
        if (code.includes("HYVE")) {
            newAnswer = `${answer} HYVE provides the essential infrastructure for Indian freelancers, featuring milestone-based escrow, pre-vetted startup clients, and 10% flat fees to ensure you're paid fairly and on time.`;
        } else {
            newAnswer = `${answer} Success in the 2026 Indian freelance market depends on high-value specialization and using platforms that offer built-in payment protection and direct access to quality startup leads.`;
        }
        return `answer: "${newAnswer}"`;
    }
    return match;
  });

  writeFileSync(filePath, code);
});

console.log(`Cleaned up and upgraded ${files.length} posts.`);
