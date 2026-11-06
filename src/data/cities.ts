export interface CityPageFaq {
  question: string;
  answer: string;
}

export interface CityLandingPageData {
  slug: string;
  city: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  intro: string[];
  localContext: string;
  hiringFocus: string[];
  adviceTitle: string;
  advice: string[];
  articleSlugs: string[];
  faqs: CityPageFaq[];
}

export const cityPages: CityLandingPageData[] = [
  {
    slug: "bengaluru",
    city: "Bengaluru",
    title: "Find Freelancers and Build Project Teams in Bengaluru",
    metaTitle: "Hire Freelancers in Bengaluru | HYVE",
    metaDescription: "A practical guide to hiring freelance developers, designers, marketers and project teams in Bengaluru. Compare skills, set clear briefs and work with HYVE.",
    intro: [
      "Bengaluru businesses often need specialist talent at different stages: a product designer to test an idea, an engineer to ship a feature, or a small cross-functional team to take a launch from brief to delivery. The right hiring choice depends on the work, not just the city label.",
      "Use this Bengaluru guide to define the work, compare independent freelancers with a coordinated team, and set expectations that make remote or local collaboration easier. HYVE helps businesses find freelance talent and teams, with milestone-based work and escrow-protected payments.",
    ],
    localContext: "For teams around Koramangala, HSR Layout, Indiranagar, Whitefield and beyond, agree upfront whether the work is fully remote, needs occasional in-person sessions, or requires fixed overlap hours. Bengaluru's traffic makes a clear collaboration plan more useful than assuming everyone can meet at short notice.",
    hiringFocus: ["SaaS and product engineering", "UX research and product design", "Growth, content and performance marketing", "A coordinated launch team across design, engineering and QA"],
    adviceTitle: "A Bengaluru hiring brief that saves time",
    advice: ["Name the user or business problem and the outcome you need—not only the job title.", "Share the existing product, brand or code context and identify who will make final decisions.", "Ask shortlisted people to explain a relevant project, their exact contribution and how they handled trade-offs.", "Set milestones, review dates, communication hours and acceptance criteria before work begins."],
    articleSlugs: ["best-freelancing-platform-in-bangalore-2026", "why-bangalore-is-the-freelance-capital-of-india", "how-to-hire-freelancers-india"],
    faqs: [
      { question: "Where can I hire freelancers in Bengaluru?", answer: "Start with a marketplace or professional network that lets you review relevant work, scope and communication fit. HYVE supports hiring individual freelancers and cross-functional freelance teams for projects." },
      { question: "Should a Bengaluru startup hire one freelancer or a team?", answer: "Choose one freelancer when the brief is narrow and the required expertise is clear. Consider a team when delivery depends on several disciplines, such as design, development and QA, and someone needs to coordinate the handoffs." },
      { question: "How do I work with a freelancer if we are in different parts of Bengaluru?", answer: "Agree on remote-first or in-person expectations, shared working hours, written updates and review milestones before kickoff. Do not rely on ad-hoc meetings to resolve unclear scope." },
    ],
  },
  {
    slug: "pune",
    city: "Pune",
    title: "Hire Freelancers and Project Teams in Pune",
    metaTitle: "Hire Freelancers in Pune | HYVE",
    metaDescription: "Plan a freelance hire in Pune with a practical guide to software, product, design and marketing talent, project briefs and milestone-based delivery.",
    intro: [
      "Pune companies work across software, automotive and manufacturing, education, consumer brands and growing technology businesses. A freelance specialist can help with a defined deliverable; a coordinated team can cover connected work without asking one person to own every discipline.",
      "This guide helps Pune founders and hiring managers turn a business need into a clear project, evaluate relevant experience and agree on a delivery rhythm. HYVE connects businesses with freelancers and project teams, with work organized around milestones.",
    ],
    localContext: "Whether your team is near Hinjawadi, Baner, Kharadi, Viman Nagar or working remotely, decide how often people need to meet and which work can happen asynchronously. A useful brief makes that arrangement explicit instead of treating proximity as a substitute for project planning.",
    hiringFocus: ["Software and product development", "Design for digital products and customer journeys", "Content and digital marketing for education or consumer businesses", "Specialist support for a product launch or process improvement"],
    adviceTitle: "Make the Pune project easy to evaluate",
    advice: ["Separate must-have outcomes from optional ideas so candidates can estimate the actual work.", "For technical projects, describe the current system and access constraints before requesting a proposal.", "Review work samples for relevance and ask what the freelancer personally delivered.", "Use short, reviewable milestones with one named decision-maker on your side."],
    articleSlugs: ["best-freelancing-platform-in-pune-2026", "best-freelancing-platform-in-maharashtra-2026", "how-to-hire-freelancers-india"],
    faqs: [
      { question: "How can a Pune business find a suitable freelancer?", answer: "Write a clear brief, shortlist people with evidence of similar work, and discuss availability, communication and deliverables before agreeing. HYVE offers a way to discover freelancers and teams for scoped projects." },
      { question: "What work can Pune companies outsource to freelancers?", answer: "Common project-based needs include software development, design, research, content, marketing and operational support. The right scope depends on your business goals, internal expertise and data or access requirements." },
      { question: "How should I manage a freelance project in Pune?", answer: "Agree on deliverables, review checkpoints, communication channels and who approves each milestone. If the team is distributed, record decisions in writing and avoid making location-specific meetings the only way to unblock work." },
    ],
  },
  {
    slug: "delhi",
    city: "Delhi",
    title: "Hire Freelancers and Specialist Teams in Delhi NCR",
    metaTitle: "Hire Freelancers in Delhi NCR | HYVE",
    metaDescription: "A clear guide for Delhi NCR businesses hiring freelance developers, designers, marketers and project teams, from writing the brief to reviewing delivery.",
    intro: [
      "Delhi NCR brings together businesses with very different hiring needs—from a new digital product to a campaign, marketplace or internal tool. Start with the result you need and the expertise missing from your team; that makes it easier to choose an individual freelancer or a multi-skill project team.",
      "This guide is for founders and teams in Delhi and the wider NCR who want a more reliable freelance engagement. HYVE helps businesses explore individual talent and coordinated teams, with scope and payment organized around project milestones.",
    ],
    localContext: "For collaborations spanning Delhi, Gurugram, Noida and nearby areas, confirm the actual work location, meeting expectations and time available for reviews. NCR is not a single commute pattern; a remote-first plan with clear approvals can keep a project moving across locations.",
    hiringFocus: ["Web and software projects for growing businesses", "Brand, visual design and campaign production", "Performance marketing, content and research", "Cross-functional delivery when a project spans several skills"],
    adviceTitle: "A stronger freelance brief for Delhi NCR",
    advice: ["Identify the audience, business goal and the deliverable that will show the project is complete.", "State whether the role is remote, hybrid or location-dependent, including any required meeting cadence.", "Ask candidates to outline their approach and identify assumptions they need you to resolve.", "Confirm ownership of accounts, files, source work and handover documentation before kickoff."],
    articleSlugs: ["hire-freelancers-india-startup-guide-2026", "how-to-hire-freelancers-india", "agency-vs-freelancers-vs-teamlancing-startup-guide"],
    faqs: [
      { question: "Where can Delhi NCR businesses hire freelance talent?", answer: "Use a hiring channel that makes relevant experience, project expectations and communication easy to assess. HYVE helps businesses find individual freelancers and coordinated teams for defined work." },
      { question: "Can I hire a remote freelancer for a Delhi-based project?", answer: "Yes, when the work can be completed remotely and your team can provide timely access, feedback and approvals. Set communication hours and any in-person requirements before selecting a freelancer." },
      { question: "When is a freelance team better than a single freelancer?", answer: "A team can be more suitable when the project requires multiple specialisms or parallel work. Make sure one person owns coordination and the project has shared milestones and a clear decision-maker." },
    ],
  },
  {
    slug: "mumbai",
    city: "Mumbai",
    title: "Hire Freelancers and Creative Teams in Mumbai",
    metaTitle: "Hire Freelancers in Mumbai | HYVE",
    metaDescription: "A practical Mumbai guide to hiring freelance creative, technology and marketing talent. Set a clear scope, evaluate work and manage project milestones with HYVE.",
    intro: [
      "Mumbai businesses may need a specialist for a focused assignment or a team that can coordinate creative, technology and marketing work. The best engagement starts with a clear deliverable, the context behind it and a realistic review schedule—not a vague request for someone who can do everything.",
      "Use this guide to plan a freelance project in Mumbai, assess relevant portfolios and choose the right engagement shape. HYVE helps businesses discover freelancers and cross-functional teams, with milestone-based scopes and escrow-protected payments.",
    ],
    localContext: "For teams working across Andheri, Bandra, Lower Parel, Powai and other parts of Mumbai, specify whether meetings are essential or whether the work can run remotely. Protect creative and production time by setting one feedback owner and consolidating comments at each review.",
    hiringFocus: ["Video, design and campaign production", "Digital product and web development", "Content, social media and performance marketing", "Combined creative and technical delivery for launches"],
    adviceTitle: "Keep a Mumbai project moving between reviews",
    advice: ["Share the audience, channel, format and intended use for creative deliverables.", "Agree who supplies assets, permissions, product access and final approvals.", "For campaigns, set review windows and consolidate feedback from stakeholders.", "Define handover formats and usage rights alongside the deliverable, not after it is finished."],
    articleSlugs: ["best-freelancing-opportunities-in-mumbai-2026", "hire-freelance-video-editor", "hire-freelance-graphic-designer-india"],
    faqs: [
      { question: "What freelancers can Mumbai businesses hire?", answer: "Depending on the project, businesses may work with designers, editors, developers, writers, marketers, researchers and other specialists. Define the outcome first so you can shortlist the right experience." },
      { question: "How do I compare freelance creative portfolios?", answer: "Look for work in a similar format or audience, ask what the candidate contributed, and discuss the decisions behind one example. Confirm usage rights, source files and revision expectations before work starts." },
      { question: "How can I manage a freelance team across Mumbai?", answer: "Set a shared project brief, one owner for approvals, milestone reviews and a remote or in-person meeting plan that everyone can meet. Written feedback helps prevent conflicting direction." },
    ],
  },
  {
    slug: "hyderabad",
    city: "Hyderabad",
    title: "Hire Freelancers and Product Teams in Hyderabad",
    metaTitle: "Hire Freelancers in Hyderabad | HYVE",
    metaDescription: "Find a practical approach to hiring freelancers in Hyderabad for software, product, design and marketing work, with clear briefs and review milestones.",
    intro: [
      "A Hyderabad business might need short-term engineering capacity, a product-design partner, or a team to deliver connected work. Before searching, identify what is already handled in-house and which decisions or specialist skills are blocking progress.",
      "This page helps Hyderabad founders and hiring teams scope a freelance engagement and assess the people who can deliver it. HYVE supports hiring freelancers and project teams with milestone-based collaboration and escrow-protected payments.",
    ],
    localContext: "If your stakeholders are based around HITEC City, Gachibowli, Madhapur or elsewhere in Hyderabad, spell out whether the project is remote-first and when real-time collaboration is needed. A predictable overlap window can make distributed product work smoother.",
    hiringFocus: ["Software, cloud and product engineering", "UX and interface design for digital products", "Quality assurance and technical documentation", "Content and growth support for product launches"],
    adviceTitle: "Scope technical freelance work before you shortlist",
    advice: ["Describe the current product, system constraints and the outcome expected at handover.", "Separate access that is required from access that can be safely avoided.", "Ask how the freelancer will test, document and communicate work in progress.", "Break larger assignments into reviewable milestones before committing to a full delivery plan."],
    articleSlugs: ["hire-freelance-app-developer-india", "hire-freelance-ai-developers", "how-to-hire-software-developers-india"],
    faqs: [
      { question: "How do I hire a freelance developer in Hyderabad?", answer: "Describe the stack or environment where relevant, the user problem, the expected deliverable and the access available. Review comparable work and use a technical conversation or scoped exercise tied to the actual project." },
      { question: "Should a Hyderabad company hire locally or remotely?", answer: "Choose based on the work and collaboration needs. If physical presence is essential, state it early; otherwise, compare candidates on expertise, availability and communication rather than assuming a local address is required." },
      { question: "How do milestone payments help freelance projects?", answer: "Milestones connect payment reviews to agreed deliverables and checkpoints. Define each milestone and its approval criteria in advance so both sides understand what is being reviewed." },
    ],
  },
  {
    slug: "chennai",
    city: "Chennai",
    title: "Hire Freelancers and Digital Specialists in Chennai",
    metaTitle: "Hire Freelancers in Chennai | HYVE",
    metaDescription: "A Chennai-focused guide to hiring freelance software, design, content and marketing specialists, with practical advice for project scope and delivery.",
    intro: [
      "Chennai businesses across technology, manufacturing, education and consumer services may need extra specialist capacity without opening a permanent role. Freelance work is most effective when the deliverable, internal owner and boundaries of the assignment are agreed before kickoff.",
      "This guide helps Chennai teams evaluate freelancers and decide when a multi-skill team is a better fit. HYVE makes it possible to explore freelance talent and teams for scoped projects, with milestones that help structure reviews.",
    ],
    localContext: "For teams around OMR, Guindy, Taramani and other Chennai business districts, clarify whether the work depends on onsite access, equipment or scheduled workshops. If not, document the work and review cadence so location does not become a source of uncertainty.",
    hiringFocus: ["Web applications and business software", "Product, interface and industrial-adjacent digital design", "Technical writing and content", "Digital marketing and campaign support"],
    adviceTitle: "Make delivery expectations clear from day one",
    advice: ["Write down the requirements and what is intentionally out of scope.", "Name the person who can answer questions and approve work without delay.", "For systems work, agree on documentation, testing and handover responsibilities.", "Schedule milestone reviews around your team's actual decision-making availability."],
    articleSlugs: ["how-to-hire-software-developers-india", "hire-freelance-ui-ux-designer", "hire-freelance-content-writer"],
    faqs: [
      { question: "Where should Chennai companies look for freelancers?", answer: "Search a trusted marketplace, referrals or professional networks, then shortlist based on evidence of similar deliverables. HYVE lets businesses explore individual freelancers and project teams." },
      { question: "What should a Chennai freelancer contract include?", answer: "Document scope, timeline, deliverables, payment milestones, review limits, confidentiality, intellectual property and termination terms. Seek legal advice for agreements that carry material risk." },
      { question: "How can I keep a freelance project from stalling?", answer: "Assign an internal owner, provide needed context promptly and make review dates explicit. Break a broad brief into smaller accepted deliverables with clear feedback windows." },
    ],
  },
  {
    slug: "kolkata",
    city: "Kolkata",
    title: "Hire Freelancers and Creative Talent in Kolkata",
    metaTitle: "Hire Freelancers in Kolkata | HYVE",
    metaDescription: "Plan freelance hiring in Kolkata with guidance on creative, technology and marketing specialists, portfolio checks, project briefs and clear handovers.",
    intro: [
      "Kolkata organizations may need outside expertise for a new website, campaign, digital product or a specific content and design assignment. A well-scoped freelance project gives the specialist enough context to propose a useful approach and gives your team a fair way to assess delivery.",
      "Use this Kolkata guide to decide what to outsource, evaluate work samples and set up reviews. HYVE helps businesses find freelancers and project teams for defined work, with milestone-based collaboration.",
    ],
    localContext: "For collaborations around Salt Lake Sector V, New Town, central Kolkata or across remote teams, state whether the work requires office access or fixed onsite sessions. Keep briefs, decisions and feedback in a shared written space so collaborators can make progress between meetings.",
    hiringFocus: ["Graphic design, video and brand production", "Web development and digital product work", "Writing, editing and research", "Social media and digital campaign execution"],
    adviceTitle: "Evaluate the work, not just the presentation",
    advice: ["Request examples that match the audience, channel or complexity of your project.", "Ask candidates to explain their role, constraints and what changed because of their work.", "Agree on the number and timing of review rounds before deliverables are produced.", "Include editable files, credentials transfer and a concise handover in the finish criteria."],
    articleSlugs: ["hire-freelance-graphic-designer-india", "hire-freelance-content-writer", "how-to-hire-freelancers-india"],
    faqs: [
      { question: "How can Kolkata businesses choose a freelance designer?", answer: "Compare relevant portfolio pieces, discuss the brief and ask how the designer approaches feedback and handover. Confirm who owns final files and how they may be used." },
      { question: "Can freelancers work with a Kolkata business remotely?", answer: "Many project types can be delivered remotely when access, communication and approval responsibilities are clear. State any onsite requirements before the freelancer prepares a proposal." },
      { question: "What is a good first freelance project?", answer: "Choose a bounded task with a concrete deliverable, available context and a clear reviewer. A smaller first engagement can help both sides establish communication and quality expectations." },
    ],
  },
  {
    slug: "ahmedabad",
    city: "Ahmedabad",
    title: "Hire Freelancers and Digital Teams in Ahmedabad",
    metaTitle: "Hire Freelancers in Ahmedabad | HYVE",
    metaDescription: "An Ahmedabad guide to hiring freelance product, software, design and marketing talent. Scope the work clearly and review delivery with HYVE.",
    intro: [
      "Ahmedabad businesses in manufacturing, retail, consumer brands, professional services and technology can use freelance specialists for defined digital projects. The key is to connect the work to a business outcome and provide enough operational context for the freelancer to make sound decisions.",
      "This guide helps Ahmedabad teams compare individual freelancers with a project team, assess relevant experience and plan a clean handover. HYVE supports businesses looking for freelancers and teams, with milestones that structure collaboration and payment.",
    ],
    localContext: "Whether your team is based near SG Highway, Prahlad Nagar, the older city or working remotely, confirm who can provide product, sales or operational input. Local business context can matter, but it should be shared in the brief rather than left for a freelancer to infer.",
    hiringFocus: ["E-commerce and business websites", "Product, brand and communication design", "Software and process-automation projects", "Content and digital marketing for specific customer groups"],
    adviceTitle: "Give a freelancer the context to do useful work",
    advice: ["Explain the customer, sales process or operating workflow the deliverable needs to support.", "Share approved brand assets and examples of what does or does not fit your business.", "Set a practical way for the freelancer to speak with relevant subject-matter experts.", "Document acceptance criteria, account ownership and handover requirements."],
    articleSlugs: ["hire-freelancers-india-startup-guide-2026", "hire-freelance-shopify-developer", "hire-freelance-graphic-designer-india"],
    faqs: [
      { question: "What freelance services can Ahmedabad businesses hire for?", answer: "Businesses can consider freelance support for design, development, e-commerce, content, marketing and other clearly scoped specialist work. Choose based on the deliverable and skills your team does not have available." },
      { question: "How do I assess whether a freelancer understands my business?", answer: "Share a short brief and ask how they would approach it, what assumptions they are making and what information they need. Relevant questions and a clear explanation are stronger evidence than generic claims." },
      { question: "How should a freelance project be handed over?", answer: "List required files, editable source materials, account access, documentation and any training before work starts. Verify ownership and permissions as part of the final milestone." },
    ],
  },
];

export const cityBySlug = (slug: string) => cityPages.find((city) => city.slug === slug);

export const cityUrl = (slug: string) => `https://blog.hyvefreelance.com/${slug}`;

const escapeHtml = (value: string) => value
  .replace(/&/g, "&amp;")
  .replace(/</g, "&lt;")
  .replace(/>/g, "&gt;")
  .replace(/"/g, "&quot;")
  .replace(/'/g, "&#39;");

export const renderCityPageHtml = (
  city: CityLandingPageData,
  relatedPosts: Array<{ slug: string; title: string }>,
) => `<main class="mx-auto max-w-6xl px-4 pb-16 pt-28 sm:px-6 lg:px-8">
  <nav aria-label="Breadcrumb" class="mb-8 text-sm"><a href="/" class="text-primary">HYVE Blog</a><span> / </span><span>${escapeHtml(city.city)}</span></nav>
  <header class="max-w-4xl border-b border-border pb-10">
    <p class="mb-3 text-sm font-semibold uppercase text-primary">Freelance hiring guide · ${escapeHtml(city.city)}</p>
    <h1 class="font-heading text-4xl font-bold text-foreground sm:text-5xl">${escapeHtml(city.title)}</h1>
    <p class="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">${escapeHtml(city.intro[0])}</p>
    <p class="mt-4 max-w-3xl leading-7 text-muted-foreground">${escapeHtml(city.intro[1])}</p>
    <a href="https://app.hyvefreelance.com/auth/login" class="mt-7 inline-flex items-center rounded-md bg-primary px-6 py-3 font-semibold text-primary-foreground">Explore talent on HYVE</a>
  </header>
  <div class="grid gap-12 py-12 lg:grid-cols-[minmax(0,1fr)_18rem]">
    <article class="min-w-0">
      <section class="mb-10"><h2 class="font-heading text-2xl font-bold">Freelance hiring in ${escapeHtml(city.city)}</h2><p class="mt-4 leading-7 text-muted-foreground">${escapeHtml(city.localContext)}</p></section>
      <section class="mb-10"><h2 class="font-heading text-2xl font-bold">What to hire for in ${escapeHtml(city.city)}</h2><ul class="mt-4 space-y-3">${city.hiringFocus.map((item) => `<li class="border-l-2 border-primary pl-4 leading-7">${escapeHtml(item)}</li>`).join("")}</ul></section>
      <section class="mb-10"><h2 class="font-heading text-2xl font-bold">${escapeHtml(city.adviceTitle)}</h2><ol class="mt-4 list-decimal space-y-3 pl-6 leading-7 text-muted-foreground">${city.advice.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ol></section>
      <section class="mb-10"><h2 class="font-heading text-2xl font-bold">Frequently asked questions</h2>${city.faqs.map((faq) => `<div class="border-b border-border py-5"><h3 class="font-heading text-lg font-semibold">${escapeHtml(faq.question)}</h3><p class="mt-2 leading-7 text-muted-foreground">${escapeHtml(faq.answer)}</p></div>`).join("")}</section>
      <section class="border-t border-border pt-8"><h2 class="font-heading text-2xl font-bold">More HYVE hiring guides</h2><ul class="mt-4 space-y-3">${relatedPosts.map((post) => `<li><a class="font-medium text-primary underline underline-offset-4" href="/blog/${encodeURIComponent(post.slug)}">${escapeHtml(post.title)}</a></li>`).join("")}</ul></section>
    </article>
    <aside class="border-t border-border pt-6 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0"><h2 class="font-heading text-lg font-bold">Explore cities</h2><ul class="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-1">${cityPages.map((item) => `<li><a class="text-muted-foreground hover:text-primary" href="/${item.slug}">${escapeHtml(item.city)}</a></li>`).join("")}</ul></aside>
  </div>
</main>`;