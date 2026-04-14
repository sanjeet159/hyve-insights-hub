import blog1 from "@/assets/blog-1.jpg";
import type { BlogPostWithContent }
  from "./types";

const post: BlogPostWithContent = {
  id: "6",
  slug: "how-to-build-freelance-
    portfolio-india-2026",
  title: "How to Build a Freelance
    Portfolio...",
  category: "Freelancing Tips",
  author: "Sanjeet Kumar",
  date: "Apr 12, 2026",
  readTime: "8 min read",
  image: blog1,
  imagePosition: "center",
  featured: false,
  content: `
<h2>Why your portfolio is your
most powerful sales tool</h2>

<p>A portfolio is proof...</p>

<div style="background:#faf8f4;
  border-radius:12px;padding:24px">
  <p>Case study structure</p>
  <ul>
    <li>The problem</li>
    <li>Your approach</li>
    <li>The work</li>
    <li>The result</li>
  </ul>
</div>

<table>...platform table...</table>

<hr />
<h2>Frequently asked questions</h2>

<details style="border:1px solid
  #e8e4dc;border-radius:10px;
  margin-bottom:10px">
  <summary style="padding:16px 20px;
    font-weight:600;cursor:pointer;
    display:flex;justify-content:
    space-between">
    How many projects should
    my portfolio have?
    <span style="color:#f1ab13">+
    </span>
  </summary>
  <div style="padding:16px 20px;
    background:#faf8f4">
    Three to five exceptional...
  </div>
</details>

<!-- repeat for each FAQ -->

<div style="background:#FAEEDA;
  border-radius:12px;padding:24px;
  display:flex;justify-content:
  space-between">
  <div>
    <p>Put your portfolio in front
      of the right clients</p>
    <p>Join 1,000+ on HYVE</p>
  </div>
  <a href="https://hyvefreelance.com"
    style="background:#f1ab13;
    color:#fff;padding:10px 22px;
    border-radius:20px">
    Create your profile →
  </a>
</div>
  `,
};
export default post;
