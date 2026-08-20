import { readFileSync, writeFileSync, readdirSync } from "fs";
import { join } from "path";

const POSTS_DIR = "src/data/posts";
const files = readdirSync(POSTS_DIR).filter(f => f.startsWith("post-") && f.endsWith(".ts"));

const HYVE_URL = "https://hyvefreelance.com";
const BLOG_URL = "https://blog.hyvefreelance.com";

files.forEach(file => {
  const filePath = join(POSTS_DIR, file);
  let code = readFileSync(filePath, "utf-8");

  // 1. Refine Meta Titles and Descriptions for CTR
  // Ensure titles are under 60 chars and compelling.
  // Ensure descriptions are ~155 chars with a clear CTA.
  
  // Extract existing title to use in description if needed
  const titleMatch = code.match(/title:\s*"([^"]+)"/);
  const title = titleMatch ? titleMatch[1] : "";

  // Update Meta Description to be more actionable (CTR focus)
  code = code.replace(/metaDescription:\s*"([^"]+)"/g, (match, desc) => {
    let newDesc = desc;
    if (!desc.includes("Read more") && !desc.includes("Learn how") && desc.length < 140) {
      newDesc = `${desc} Learn how HYVE is redefining the freelance landscape in India for 2026. Read the full guide here.`;
    }
    // Trim if too long
    if (newDesc.length > 160) {
      newDesc = newDesc.substring(0, 157) + "...";
    }
    return `metaDescription: "${newDesc}"`;
  });

  // 2. Enhance FAQ Answers for AEO (Answer Engine Optimization)
  // AI engines love direct, complete answers.
  if (code.includes("faqs:")) {
    const faqBlockMatch = code.match(/faqs:\s*\[([\s\S]*?)\]/);
    if (faqBlockMatch) {
      let faqContent = faqBlockMatch[1];
      
      // Update answers to be more complete if they are short
      faqContent = faqContent.replace(/answer:\s*"([^"]+)"/g, (match, answer) => {
        let newAnswer = answer;
        if (answer.length < 100) {
          if (code.includes("HYVE")) {
            newAnswer = `${answer} At HYVE, we've built the infrastructure to support this, including milestone-based escrow and a pre-vetted network of top Indian talent.`;
          } else {
            newAnswer = `${answer} Success in the 2026 freelance economy requires the right tools and a focus on high-value, specialized results for clients.`;
          }
        }
        return `answer: "${newAnswer}"`;
      });
      
      code = code.replace(/faqs:\s*\[[\s\S]*?\]/, `faqs: [${faqContent}]`);
    }
  }

  // 3. Ensure clear Question Headings exist in the content if FAQs exist
  // This helps with featured snippets.
  if (code.includes("faqs:") && !code.includes("Frequently Asked Questions") && !code.includes("Common Questions")) {
    const faqHeading = `<h2 style="font-size:26px;font-weight:800;color:#0d0d0d;margin:40px 0 16px 0">Frequently Asked Questions</h2>`;
    // Find the end of the div or content
    if (code.includes("</div>`")) {
      code = code.replace("</div>`", `${faqHeading}\n</div>\``);
    } else if (code.includes("`,")) {
        // For markdown-style posts
        code = code.replace("`,", `\n\n## Frequently Asked Questions\n\`,`);
    }
  }

  writeFileSync(filePath, code);
});

console.log(`Upgraded ${files.length} posts for AEO and CTR.`);
