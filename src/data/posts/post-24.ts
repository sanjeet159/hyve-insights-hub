import blog24 from "@/assets/blog-24.jpg";
import type { BlogPostWithContent } from "./types";

const post: BlogPostWithContent = {
  id: "24",
  slug: "gst-for-freelancers-india-complete-guide-2026",
  title: "GST for Freelancers in India: The Complete 2026 Guide",
  metaTitle: "GST for Indian Freelancers 2026: The Ultimate Compliance Guide",
  metaDescription:
    "Stay compliant with GST in 2026. A comprehensive guide for Indian freelancers on registration thresholds, LUT for exports, and tax-saving strategies.",
  keywords: [
    "gst compliance for indian freelancers 2026",
    "how to file gst for freelance income india",
    "gst export services india guide",
    "tax registration for freelancers india",
    "lut for freelance exports india",
  ],
  excerpt:
    "Do freelancers need GST in India? What about export clients? This is the complete, no-jargon 2026 guide — thresholds, LUT, invoicing, returns and the rules that save you tax.",
  category: "Career Growth",
  author: "HYVE Team",
  date: "May 22, 2026",
  readTime: "10 min read",
  image: blog24,
  imagePosition: "center",
  featured: false,
  content: `<div style="font-family:inherit;line-height:1.8;color:#333;max-width:100%">

<p style="font-size:17px;color:#444;line-height:1.85;margin:0 0 16px 0">GST is the #1 thing Indian freelancers get wrong — and it costs them either lakhs in unnecessary tax, or worse, a future notice from the department. The good news: the rules are actually simple once you separate <em>domestic clients</em> from <em>export clients</em>.</p>

<p style="font-size:17px;color:#444;line-height:1.85;margin:0 0 32px 0">Here is the complete, no-jargon 2026 guide — when to register, what to charge, how to invoice, and the LUT trick every export freelancer must know.</p>

<div style="background:#0d0d0d;border-radius:14px;padding:24px 28px;margin:0 0 36px 0;color:#fff">
  <p style="color:#f1ab13;font-weight:700;font-size:12px;margin:0 0 10px 0;text-transform:uppercase;letter-spacing:1.5px">TL;DR</p>
  <p style="color:#fff;font-size:15px;line-height:1.75;margin:0">Register for GST once you cross ₹20L revenue (₹10L in special states), or sooner if you serve foreign clients and want to claim refunds. Charge 18% on Indian clients. Charge 0% on foreign clients — but only if you file an LUT first.</p>
</div>

<h2 style="font-size:28px;font-weight:800;color:#0d0d0d;margin:40px 0 16px 0;line-height:1.25">When do you actually need GST?</h2>

<ul style="margin:0 0 28px 0;padding-left:0;list-style:none">
  <li style="padding-left:28px;position:relative;margin-bottom:12px;font-size:16px;color:#444;line-height:1.8"><span style="position:absolute;left:0;top:8px;width:8px;height:8px;border-radius:50%;background:#f1ab13"></span><strong>Mandatory:</strong> Annual revenue above ₹20L (₹10L for special-category states like Manipur, Mizoram, Nagaland, Tripura).</li>
  <li style="padding-left:28px;position:relative;margin-bottom:12px;font-size:16px;color:#444;line-height:1.8"><span style="position:absolute;left:0;top:8px;width:8px;height:8px;border-radius:50%;background:#f1ab13"></span><strong>Mandatory:</strong> Inter-state supply of services (some exceptions for services exempt under notification).</li>
  <li style="padding-left:28px;position:relative;margin-bottom:12px;font-size:16px;color:#444;line-height:1.8"><span style="position:absolute;left:0;top:8px;width:8px;height:8px;border-radius:50%;background:#f1ab13"></span><strong>Voluntary (recommended):</strong> If most of your clients are foreign, register early — you can claim refunds on GST paid for your software, tools and laptop.</li>
</ul>

<h2 style="font-size:28px;font-weight:800;color:#0d0d0d;margin:40px 0 16px 0;line-height:1.25">Domestic vs export clients — the full table</h2>

<div style="overflow-x:auto;margin:0 0 28px 0;border-radius:12px;border:1px solid #eee">
<table style="width:100%;border-collapse:collapse;font-size:14px">
  <thead>
    <tr style="background:#f7f7f7">
      <th style="text-align:left;padding:14px 16px;font-weight:700;color:#0d0d0d;border-bottom:1px solid #eee">Client type</th>
      <th style="text-align:left;padding:14px 16px;font-weight:700;color:#0d0d0d;border-bottom:1px solid #eee">GST rate</th>
      <th style="text-align:left;padding:14px 16px;font-weight:700;color:#0d0d0d;border-bottom:1px solid #eee">What to charge / file</th>
    </tr>
  </thead>
  <tbody>
    <tr><td style="padding:14px 16px;border-bottom:1px solid #f3f3f3"><strong>Indian client, same state</strong></td><td style="padding:14px 16px;border-bottom:1px solid #f3f3f3;color:#555">18% (CGST 9% + SGST 9%)</td><td style="padding:14px 16px;border-bottom:1px solid #f3f3f3;color:#555">Add GST to invoice. Pay to govt.</td></tr>
    <tr><td style="padding:14px 16px;border-bottom:1px solid #f3f3f3"><strong>Indian client, other state</strong></td><td style="padding:14px 16px;border-bottom:1px solid #f3f3f3;color:#555">18% IGST</td><td style="padding:14px 16px;border-bottom:1px solid #f3f3f3;color:#555">Add IGST to invoice. Pay to govt.</td></tr>
    <tr><td style="padding:14px 16px;border-bottom:1px solid #f3f3f3"><strong>Foreign client (with LUT)</strong></td><td style="padding:14px 16px;border-bottom:1px solid #f3f3f3;color:#555">0% (zero-rated)</td><td style="padding:14px 16px;border-bottom:1px solid #f3f3f3;color:#555">No GST charged. Claim input refund.</td></tr>
    <tr><td style="padding:14px 16px;border-bottom:1px solid #f3f3f3"><strong>Foreign client (no LUT)</strong></td><td style="padding:14px 16px;border-bottom:1px solid #f3f3f3;color:#555">18% IGST upfront</td><td style="padding:14px 16px;border-bottom:1px solid #f3f3f3;color:#555">Pay first, refund later. Painful.</td></tr>
    <tr style="background:#fff8e6"><td style="padding:14px 16px"><strong>OIDAR / B2C foreign</strong></td><td style="padding:14px 16px;color:#b8810f"><strong>Special rules</strong></td><td style="padding:14px 16px;color:#b8810f"><strong>Consult a CA</strong></td></tr>
  </tbody>
</table>
</div>

<h2 style="font-size:28px;font-weight:800;color:#0d0d0d;margin:40px 0 16px 0;line-height:1.25">The LUT — the one filing every export freelancer must do</h2>

<p style="font-size:16px;color:#444;line-height:1.85;margin:0 0 20px 0">If you have foreign clients, file a <strong>Letter of Undertaking (LUT)</strong> on the GST portal at the start of every financial year. It's free, takes 10 minutes, and lets you invoice foreign clients <strong>without charging 18% IGST</strong>.</p>

<p style="font-size:16px;color:#444;line-height:1.85;margin:0 0 32px 0">Without an LUT, you must pay 18% IGST upfront on every foreign invoice and then claim it back as a refund — a months-long process that locks up your cash.</p>

<h2 style="font-size:28px;font-weight:800;color:#0d0d0d;margin:40px 0 16px 0;line-height:1.25">What your GST invoice must contain</h2>

<ul style="margin:0 0 32px 0;padding-left:0;list-style:none">
  <li style="padding-left:28px;position:relative;margin-bottom:12px;font-size:16px;color:#444;line-height:1.8"><span style="position:absolute;left:0;top:8px;width:8px;height:8px;border-radius:50%;background:#f1ab13"></span>Your name, address and <strong>GSTIN</strong></li>
  <li style="padding-left:28px;position:relative;margin-bottom:12px;font-size:16px;color:#444;line-height:1.8"><span style="position:absolute;left:0;top:8px;width:8px;height:8px;border-radius:50%;background:#f1ab13"></span>Client's name, address and GSTIN (if registered)</li>
  <li style="padding-left:28px;position:relative;margin-bottom:12px;font-size:16px;color:#444;line-height:1.8"><span style="position:absolute;left:0;top:8px;width:8px;height:8px;border-radius:50%;background:#f1ab13"></span><strong>Invoice number</strong> (continuous, not skipping) and date</li>
  <li style="padding-left:28px;position:relative;margin-bottom:12px;font-size:16px;color:#444;line-height:1.8"><span style="position:absolute;left:0;top:8px;width:8px;height:8px;border-radius:50%;background:#f1ab13"></span>HSN/SAC code (998313 for IT services, 998314 for consulting)</li>
  <li style="padding-left:28px;position:relative;margin-bottom:12px;font-size:16px;color:#444;line-height:1.8"><span style="position:absolute;left:0;top:8px;width:8px;height:8px;border-radius:50%;background:#f1ab13"></span>Taxable value, GST rate, GST amount, total</li>
  <li style="padding-left:28px;position:relative;margin-bottom:12px;font-size:16px;color:#444;line-height:1.8"><span style="position:absolute;left:0;top:8px;width:8px;height:8px;border-radius:50%;background:#f1ab13"></span>For exports: <strong>"Supply meant for export under LUT — without payment of IGST"</strong></li>
</ul>

<h2 style="font-size:28px;font-weight:800;color:#0d0d0d;margin:40px 0 16px 0;line-height:1.25">Which returns you actually file</h2>

<div style="background:#fafafa;border:1px solid #eee;border-radius:14px;padding:24px 28px;margin:0 0 32px 0">
  <p style="font-size:15px;color:#444;line-height:1.85;margin:0">→ <strong>GSTR-1</strong> — monthly (or quarterly under QRMP). Lists every invoice you issued.</p>
  <p style="font-size:15px;color:#444;line-height:1.85;margin:10px 0 0 0">→ <strong>GSTR-3B</strong> — monthly. Summary of tax payable + paid.</p>
  <p style="font-size:15px;color:#444;line-height:1.85;margin:10px 0 0 0">→ <strong>GSTR-9</strong> — annual reconciliation (only if turnover > ₹2 Cr).</p>
  <p style="font-size:15px;color:#444;line-height:1.85;margin:10px 0 0 0">→ <strong>LUT</strong> — once at the start of every financial year (April).</p>
</div>

<h2 style="font-size:28px;font-weight:800;color:#0d0d0d;margin:40px 0 16px 0;line-height:1.25">Income tax + GST — the combined strategy</h2>

<div style="background:#fafafa;border-left:3px solid #f1ab13;border-radius:0 12px 12px 0;padding:22px 26px;margin:0 0 32px 0">
  <p style="font-size:15px;color:#333;margin:0 0 10px 0;line-height:1.8"><strong>Under ₹20L revenue?</strong> Skip GST. File under Section 44ADA (50% presumptive) for income tax.</p>
  <p style="font-size:15px;color:#333;margin:0 0 10px 0;line-height:1.8"><strong>₹20L–75L mostly Indian clients?</strong> Register for GST. Charge 18%. Still file 44ADA for income tax.</p>
  <p style="font-size:15px;color:#333;margin:0;line-height:1.8"><strong>Mostly foreign clients?</strong> Register early. File LUT. Claim input refunds. 44ADA still applies for income tax up to ₹75L.</p>
</div>

<h2 style="font-size:28px;font-weight:800;color:#0d0d0d;margin:40px 0 16px 0;line-height:1.25">Mistakes that cost freelancers the most</h2>

<ul style="margin:0 0 32px 0;padding-left:0;list-style:none">
  <li style="padding-left:28px;position:relative;margin-bottom:12px;font-size:16px;color:#444;line-height:1.8"><span style="position:absolute;left:0;top:8px;width:8px;height:8px;border-radius:50%;background:#f1ab13"></span><strong>Not filing LUT</strong> — pays 18% IGST on every foreign invoice unnecessarily.</li>
  <li style="padding-left:28px;position:relative;margin-bottom:12px;font-size:16px;color:#444;line-height:1.8"><span style="position:absolute;left:0;top:8px;width:8px;height:8px;border-radius:50%;background:#f1ab13"></span><strong>Skipping returns</strong> after registering — late fees of ₹50/day per return, capped at ₹10K.</li>
  <li style="padding-left:28px;position:relative;margin-bottom:12px;font-size:16px;color:#444;line-height:1.8"><span style="position:absolute;left:0;top:8px;width:8px;height:8px;border-radius:50%;background:#f1ab13"></span><strong>Not collecting FIRC / FIRA</strong> from your bank for foreign payments — required as proof of export.</li>
  <li style="padding-left:28px;position:relative;margin-bottom:12px;font-size:16px;color:#444;line-height:1.8"><span style="position:absolute;left:0;top:8px;width:8px;height:8px;border-radius:50%;background:#f1ab13"></span><strong>Confusing income tax and GST</strong> — they are completely separate. Section 44ADA is income tax. GST is a separate filing.</li>
</ul>

<div style="position:relative;overflow:hidden;background:linear-gradient(135deg,#fdf5e1 0%,#faecc6 55%,#ffffff 100%);border:1px solid rgba(241,171,19,0.25);border-radius:16px;padding:28px 32px;margin:32px 0;display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:20px">
  <div style="flex:1;min-width:240px">
    <p style="font-size:12px;font-weight:800;margin:0 0 8px 0;text-transform:uppercase;letter-spacing:2px;color:#f1ab13">📑 Skip the invoicing headache</p>
    <p style="font-size:20px;font-weight:800;margin:0 0 6px 0;line-height:1.3;color:#0d0d0d">HYVE generates GST-compliant invoices for every project.</p>
    <p style="font-size:14px;color:#555;line-height:1.6;margin:0">Auto-numbered, escrow-backed, GST + HSN ready. Spend your time billing clients, not formatting invoices.</p>
  </div>
  <a href="https://hyvefreelance.com" target="_blank" rel="noopener noreferrer" style="flex-shrink:0;display:inline-flex;align-items:center;gap:8px;background:#f1ab13;color:#fff;padding:14px 26px;border-radius:999px;font-weight:700;text-decoration:none;font-size:14px;box-shadow:0 8px 20px -8px rgba(241,171,19,0.5)">Join HYVE →</a>
</div>

<p style="font-size:13px;color:#888;line-height:1.7;margin:24px 0 0 0;font-style:italic">This guide is for educational purposes only and is not a substitute for advice from a qualified chartered accountant. Tax rules and thresholds change — always confirm current rates with your CA before filing.</p>

</div>`,
  faqs: [
    {
      question: "Do freelancers in India need to register for GST?",
      answer:
        "Only if your annual revenue crosses ₹20 lakh (₹10 lakh in special-category states like Manipur, Mizoram, Nagaland, Tripura), or if you supply services across states under taxable categories. Freelancers with mostly foreign clients often register voluntarily to claim input tax refunds.",
    },
    {
      question: "What GST rate applies to freelance services in India?",
      answer:
        "Most freelance services (IT, design, writing, consulting, marketing) attract 18% GST — split as 9% CGST + 9% SGST for same-state clients, or 18% IGST for inter-state clients. For foreign clients with a valid LUT in place, the rate is 0% (zero-rated export).",
    },
    {
      question: "What is an LUT and do I need it as a freelancer?",
      answer:
        "A Letter of Undertaking (LUT) is a once-a-year GST filing that lets you invoice foreign clients without charging 18% IGST. If you serve any foreign clients and are GST-registered, file an LUT every April. Without it, you must pay 18% IGST upfront on each foreign invoice and claim it back as a refund.",
    },
    {
      question: "Can I use Section 44ADA and still charge GST?",
      answer:
        "Yes — they are completely separate. Section 44ADA is an income tax presumptive scheme (50% of revenue treated as profit) and applies up to ₹75 lakh turnover. GST is a separate indirect tax. Most Indian freelancers above ₹20L use both simultaneously.",
    },
    {
      question: "What is the HSN/SAC code for freelance services?",
      answer:
        "Most IT and software freelance services fall under SAC 998313. Management or business consulting falls under 998314. Design services typically fall under 998391. Always confirm the right code with your CA — it must appear on your GST invoice.",
    },
  ],
};

export default post;
