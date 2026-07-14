import { image } from "../assets/index";

// ============================================================
//  EDIT THIS FILE to update your portfolio content.
//  Everything the site shows lives here in one place.
//  Lines marked  // EDIT ME  are placeholders — replace them.
// ============================================================

export const personal = {
  name: "Govind Kumar",
  brand: "DevGovind",
  roles: [
    "Software Engineer",
    "Full-Stack Developer",
    "React & Next.js Developer",
    "AI Application Engineer",
    "Problem Solver",
  ],
  // Big, punchy headline shown above the name in the hero.
  headline: "I build fast, beautiful, AI-powered web experiences.",
  // Short energetic status line shown in the hero pill.
  statusPill: "Open to Software Engineer roles & freelance",
  tagline:
    "Software Engineer building full-stack, AI-powered web applications. I turn ideas into fast, accessible products — crafting polished React & Next.js frontends, wiring up robust Node.js & Python backends, and weaving in Generative AI to make software genuinely smarter.",
  email: "govindkumar.file116@gmail.com",
  phone: "+91 80849 56242",
  location: "Newtown, Kolkata, West Bengal, India",
  resumeUrl: "/resume.pdf", // EDIT ME — put your resume PDF in the /public folder as resume.pdf
  socials: {
    github: "https://github.com/Rockysingh116",
    linkedin: "https://linkedin.com/in/govindkumar116",
    // twitter: "https://twitter.com/yourhandle", // EDIT ME (optional)
  },
  // Used by the live GitHub activity section (client-side GitHub API).
  githubUsername: "Rockysingh116",
};

export const about = {
  // EDIT ME — replace with a real professional photo of you (a square/portrait crop works best).
  image:
    "https://images.unsplash.com/photo-1531891437562-4301cf35b7e4?auto=format&fit=crop&w=800&q=80",
  // Short line shown under your name on the image badge.
  badgeRole: "Software Engineer",
  available: true, // shows an "Available for work" status pill
  paragraphs: [
    "I'm a Software Engineer who loves the whole journey of building a product — from the first pixel to the final deploy. My story is a little unusual: I started out in HR and talent acquisition, moved into data analytics, and finally found my true calling in engineering. That path taught me something most developers learn late — great software is about people first, and code second.",
    "Today I build full-stack, AI-powered web applications. On the frontend I craft fast, accessible interfaces with React, Next.js and TypeScript. On the backend I design REST APIs and data layers with Node.js, Express, MongoDB, MySQL and Python. And running through everything is my passion for Generative AI — I integrate LLMs and tools like GitHub Copilot to make products genuinely smarter and teams dramatically faster.",
    "I care deeply about clean architecture, performance, and writing code that other humans (including future-me) will thank me for. When I'm not shipping features, I'm exploring new AI models, refining my craft, or helping teammates level up. If you're looking for someone who's equal parts engineer, problem-solver, and eternal learner — let's build something people love. 😊",
  ],
  // Core competencies — icon names map to lucide-react icons in About.jsx.
  expertise: [
    {
      icon: "MonitorSmartphone",
      title: "Frontend Engineering",
      description:
        "Pixel-perfect, accessible UIs and design systems built with React, Next.js and TypeScript — responsive on every device.",
    },
    {
      icon: "Server",
      title: "Backend & APIs",
      description:
        "Robust REST APIs, authentication and data layers with Node.js, Express, MongoDB, MySQL and Python.",
    },
    {
      icon: "BrainCircuit",
      title: "AI Integration",
      description:
        "Bringing Generative AI into real products — LLM-powered search, chat assistants and Copilot-driven workflows.",
    },
    {
      icon: "Rocket",
      title: "Performance & Quality",
      description:
        "Fast, reliable software — Core Web Vitals, code splitting, testing and WCAG-compliant accessibility baked in.",
    },
  ],
  // Quick facts shown in a compact grid.
  quickFacts: [
    { icon: "Briefcase", label: "Experience", value: "1+ Years in Tech" },
    { icon: "MapPin", label: "Based in", value: "Kolkata, India" },
    { icon: "Layers", label: "Stack", value: "Full-Stack + AI" },
    { icon: "GraduationCap", label: "Degree", value: "B.Tech CSE" },
  ],
  traits: [
    "🎯 Problem Solver",
    "🧩 Full-Stack Thinker",
    "🤖 AI-Driven Builder",
    "⚡ Performance Focused",
    "🤝 People-First Engineer",
    "📚 Lifelong Learner",
  ],
};

// ------------------------------------------------------------
//  GITHUB REPO DESCRIPTION OVERRIDES
//  Most repos have no description set on GitHub, so the live
//  GitHub section falls back to these polished ones (keyed by
//  the exact repo name). The section prefers GitHub's own
//  description when it exists, and uses these otherwise.
//  TIP: also adding these on github.com improves your profile.
// ------------------------------------------------------------
export const repoDescriptions = {
  "Plane-MCP":
    "An MCP server that lets AI assistants read and manage Plane tickets and modules — bridging LLM tools with real project-management workflows.",
  Aventi:
    "A modern web application built with React — exploring clean component architecture and responsive, accessible UI.",
  "Weather-App":
    "A responsive weather app that fetches live data from a weather API, with location search and clean, at-a-glance forecasts.",
  "Random-Quote":
    "A lightweight quote generator that serves a fresh, shareable quote on every click — a fun exercise in state and API basics.",
  Calculator:
    "A functional calculator handling chained operations and edge cases, built to practice clean event handling and UI state.",
  "Simple-Calculator":
    "A minimal, keyboard-friendly calculator focused on clear layout and reliable arithmetic logic.",
  "Digital-Clock":
    "A live digital clock with real-time updates and clean typography — a small study in intervals and formatting.",
  "Todo-App":
    "A to-do app with add, complete, and delete flows plus persistent state — the classic CRUD UI done cleanly.",
  "Counter-App":
    "My first project — a simple counter that got me hooked on building interactive UIs.",
  "EducationalWebsite":
    "A multi-page educational website focused on clean layout, responsive design, and accessible content structure.",
  BoxModel:
    "A hands-on demo of the CSS box model — margins, borders, padding and layout — built while mastering CSS fundamentals.",
  CODSOFT:
    "A collection of front-end projects completed during the CodSoft web development internship.",
  Projects:
    "A sandbox of experiments and mini-projects where I try out new ideas, patterns, and libraries.",
};

// Animated counters under the hero. EDIT ME if any numbers change.
export const stats = [
  { label: "Years in Tech", value: 1, suffix: "+" },
  { label: "Users Served", value: 50, suffix: "K+" },
  { label: "Components Shipped", value: 80, suffix: "+" },
  { label: "Lighthouse Score", value: 94, suffix: "/100" },
];

export const skillCategories = [
  {
    title: "Frontend Core",
    icon: "LayoutDashboard",
    skills: [
      "HTML5",
      "CSS3",
      "JavaScript (ES6+)",
      "TypeScript",
      "React.js",
      "Next.js (SSR/SSG/ISR)",
      "Plasmo Framework",
    ],
  },
  {
    title: "Styling & UI",
    icon: "Palette",
    skills: [
      "Tailwind CSS",
      "Bootstrap 5",
      "CSS Modules",
      "Styled Components",
      "Material UI",
    ],
  },
  {
    title: "State Management",
    icon: "Workflow",
    skills: ["Redux Toolkit", "Context API", "Zustand", "React Query"],
  },
  {
    title: "Backend & APIs",
    icon: "Server",
    skills: [
      "Node.js",
      "Express.js",
      "REST APIs",
      "JWT / OAuth 2.0 Auth",
      "WebSocket",
    ],
  },
  {
    title: "Databases",
    icon: "Database",
    skills: ["MongoDB", "MySQL", "Mongoose", "Data Modeling"],
  },
  {
    title: "Languages & Data",
    icon: "Code2",
    skills: [
      "JavaScript",
      "TypeScript",
      "Python",
      "Pandas / NumPy",
      "Data Analysis",
      "SQL",
    ],
  },
  {
    title: "AI / GenAI",
    icon: "BrainCircuit",
    skills: [
      "GitHub Copilot",
      "OpenAI API",
      "LLM Integration",
      "Prompt Engineering",
      "AI Governance",
    ],
  },
  {
    title: "Architecture & Performance",
    icon: "Boxes",
    skills: [
      "Component-Driven Design",
      "Micro-frontends",
      "Monorepo (Nx, Turborepo)",
      "Core Web Vitals",
      "Code Splitting",
      "Lazy Loading",
      "Webpack",
    ],
  },
  {
    title: "Testing",
    icon: "FlaskConical",
    skills: ["Jest", "React Testing Library", "Cypress", "Storybook"],
  },
  {
    title: "DevOps & Cloud",
    icon: "Cloud",
    skills: [
      "Git",
      "GitHub Actions (CI/CD)",
      "Docker",
      "AWS",
      "Azure",
      "Datadog",
      "New Relic",
    ],
  },
  {
    title: "Security & APIs",
    icon: "ShieldCheck",
    skills: [
      "OWASP",
      "OAuth 2.0",
      "SSO",
      "WCAG 2.1",
      "PII Protection",
      "RESTful APIs",
      "WebSocket",
    ],
  },
];

// Each project may optionally include a `category` ("Work" | "Personal"),
// and case-study fields (`problem`, `approach`, `outcomes`, `highlights`)
// shown in the project detail modal. All are optional — cards work without them.
export const projects = [
  // ---- Enterprise / professional work (from resume) ----
  {
    title: "AI-Powered Travel Operations Platform",
    description:
      "A large-scale enterprise travel operations platform with AI-assisted itinerary generation and human-in-the-loop approval workflows. Built draft/publish lifecycle management, version control, autosave, and a custom Chrome extension for automated data collection.",
    // Real Unsplash CDN image (travel/itinerary theme). Swap for a real
    // screenshot when you have one that's safe to share.
    image:
      "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1000&q=80",
    technologies: ["React", "TypeScript", "Zustand", "React Query", "LLM APIs"],
    company: "NextZen Minds Pvt. Ltd.",
    category: "Work",
    liveLink: "",
    githubLink: "",
    featured: true,
    problem:
      "Travel ops teams manually assembled complex, multi-leg itineraries — slow, error-prone, and impossible to audit across revisions.",
    approach:
      "Designed an AI-assisted authoring flow with a draft/publish lifecycle, autosave and version history, plus a human-in-the-loop approval step so nothing ships unreviewed. A companion Chrome extension automated repetitive data collection.",
    outcomes:
      "Cut itinerary build time dramatically and gave the team a full audit trail, while keeping a human in control of every published plan.",
    highlights: [
      "Draft/publish lifecycle with autosave and version control",
      "LLM-assisted itinerary generation with human approval gates",
      "Custom Chrome extension for automated data collection",
    ],
  },
  {
    title: "Task Management Portal",
    description:
      "An enterprise task & workflow management system with assignment, prioritization, status tracking, and collaboration features. Built responsive dashboards, reporting interfaces, and complex application state management.",
    // Real Unsplash CDN image (dashboard/analytics theme).
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80",
    technologies: ["React", "TypeScript", "REST APIs"],
    company: "NextZen Minds Pvt. Ltd.",
    category: "Work",
    liveLink: "",
    githubLink: "",
    featured: true,
  },
  {
    title: "Canvas-Based Design & Image Editor",
    description:
      "Canvas-based design tools with drag-and-drop, object manipulation, layering, and rendering optimizations. Built user-friendly editing workflows for design customization and asset management.",
    // Real Unsplash CDN image (design/creative tools theme).
    image:
      "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=1000&q=80",
    technologies: ["React", "Canvas", "Rendering Libraries"],
    company: "NextZen Minds Pvt. Ltd.",
    category: "Work",
    liveLink: "",
    githubLink: "",
    featured: true,
  },
  // ---- Personal projects (live demos) ----
  {
    title: "E-commerce Platform",
    description:
      "A full e-commerce website integrated with a payment gateway and cart management using local storage.",
    image: image.Ecommerce,
    technologies: ["React", "Stripe", "Redux", "API", "Vercel"],
    category: "Personal",
    liveLink: "https://e-commerce-full-web-site.vercel.app/",
    githubLink: "https://github.com/Rockysingh116/ShopSphere", // EDIT ME — verify repo URL on your Rockysingh116 account
    featured: false,
  },
  {
    title: "Attendance Tracking System",
    description:
      "A full-stack, mobile-first attendance tracking web app with real-time tracking that monitors total working / office hours, excluding break time.",
    image: image.ATS,
    technologies: ["React", "Redux", "Node.js", "Express", "Axios", "Vercel"],
    category: "Personal",
    liveLink: "https://attendance-tracker-orcin.vercel.app/",
    githubLink: "https://github.com/Rockysingh116/attendance-tracker", // EDIT ME — verify repo URL
    featured: false,
  },
  {
    title: "Image Gallery",
    description:
      "An image gallery using the Pexels API with JavaScript debouncing on the search input for a smooth, efficient experience.",
    image: image.IG,
    technologies: ["React", "API", "Vercel"],
    category: "Personal",
    liveLink: "https://image-gallery-umber-zeta.vercel.app/",
    githubLink: "https://github.com/Rockysingh116/Image-Gallery", // EDIT ME — verify repo URL
    featured: false,
  },
];

export const experience = [
  {
    title: "Software Engineer",
    company: "NextZen Minds Pvt. Ltd.",
    domain: "nextzenminds.com", // EDIT ME — used for the company logo (logo.dev); falls back to a lettermark
    period: "Jul 2025 – Present",
    location: "Kolkata, West Bengal",
    tag: "Engineering",
    summary:
      "Own end-to-end delivery of features across the stack for an enterprise SaaS platform, with a strong focus on AI-powered experiences.",
    achievements: [
      "Lead frontend architecture for a multi-tenant SaaS platform serving 50,000+ users, built on React.js, Next.js and TypeScript.",
      "Designed and maintained a reusable library of 80+ accessible UI components (WCAG 2.1 AA) used across 5 product modules.",
      "Built AI-powered features — an LLM-based intelligent search module and an AI chat assistant — using OpenAI-compatible APIs.",
      "Integrated GitHub Copilot into the team's workflow, cutting average development cycle time by ~30% and speeding up test generation.",
      "Implemented a micro-frontend architecture on an Nx monorepo, improving deployment independence across 3 squads.",
      "Optimized Core Web Vitals from 62 → 94 (Lighthouse) through code splitting, lazy loading and image optimization.",
      "Mentored 3 junior developers, ran weekly code reviews, and authored architectural decision records (ADRs).",
    ],
  },
  {
    title: "Frontend Developer (Junior)",
    company: "NextZen Minds Pvt. Ltd.",
    domain: "nextzenminds.com",
    period: "Jan 2025 – Jul 2025",
    location: "Kolkata, West Bengal",
    tag: "Engineering",
    summary:
      "Started my engineering journey here — shipping production UI and learning what enterprise-grade software really takes.",
    achievements: [
      "Built and maintained scalable, reusable UI components with React.js, TypeScript and Next.js across multiple product modules.",
      "Integrated REST APIs and handled complex application state, wiring frontends to real backend services.",
      "Collaborated daily with product, design and backend teams within an Agile delivery framework.",
      "Earned a promotion to Software Engineer within six months by consistently delivering quality work.",
    ],
  },
  {
    title: "Data Analyst Intern",
    company: "NSK",
    domain: "nsk.com",
    period: "Mar 2024 – May 2024",
    location: "Chennai, Tamil Nadu",
    tag: "Data",
    summary:
      "Turned raw operational data into clear, decision-ready insights for the engineering and operations teams.",
    achievements: [
      "Collected, cleaned and analyzed large operational datasets using Excel and Python (Pandas) to surface actionable trends.",
      "Delivered data projects and dashboards that helped the team monitor performance and spot process inefficiencies.",
      "Built visual reports and summaries that translated complex numbers into insights non-technical stakeholders could act on.",
      "Sharpened my analytical thinking and SQL/data skills — the foundation that later fuelled my move into engineering.",
    ],
  },
  {
    title: "HR Assistant — Talent Acquisition",
    company: "Tata Motors",
    domain: "tatamotors.com",
    period: "Dec 2022 – Dec 2023",
    location: "Jamshedpur, Jharkhand",
    tag: "People",
    summary:
      "Supported end-to-end hiring and learning operations at one of India's largest automotive companies.",
    achievements: [
      "Assisted the Talent Acquisition team across the full hiring process — sourcing, screening, scheduling interviews and coordinating with candidates.",
      "Managed and maintained the Learning Management System (LMS), onboarding employees and tracking training completion.",
      "Coordinated between candidates, hiring managers and cross-functional teams to keep recruitment pipelines moving smoothly.",
      "Handled HR documentation and process management — an experience that gave me a rare, people-first perspective I still bring to engineering.",
    ],
  },
];

export const education = [
  {
    title: "B.Tech — Computer Science & Engineering",
    institution: "BMCT, Bhopal",
    year: "2022 – 2025",
    description:
      "Completed my Bachelor's in Computer Science & Engineering, deepening my foundations in data structures, algorithms, databases, operating systems and software engineering — and channelling it all into full-stack web development and AI.",
  },
  {
    title: "Diploma — Computer Science & Engineering",
    institution: "Al-Kabir Polytechnic, Jamshedpur",
    year: "2019 – 2022",
    description:
      "A hands-on, practical diploma where I first fell in love with programming. Built my early projects in web technologies and core CS concepts that gave me a real head start as an engineer.",
  },
  {
    title: "Intermediate (Science — PCM)",
    institution: "Jamshedpur Worker's College",
    year: "2016 – 2018",
    description:
      "Higher secondary education in Physics, Chemistry and Mathematics — where logical problem-solving and analytical thinking became second nature.",
  },
  {
    title: "High School (Matriculation)",
    institution: "Rajasthan Vidya Mandir, Jamshedpur",
    year: "2011 – 2016",
    description:
      "Built a strong academic base with an early curiosity for how things work — the spark that eventually led me to computers and code.",
  },
];

export const certifications = [
  {
    title: "Generative AI Foundation Certification Program",
    issuer: "upGrad",
    domain: "upgrad.com", // used for issuer logo (logo.dev); falls back to a lettermark
    year: "2024",
    link: "", // EDIT ME — add credential URL if you have one
  },
  {
    title: "The Web Developer Bootcamp 2024",
    issuer: "Udemy",
    domain: "udemy.com",
    year: "2024",
    link: "", // EDIT ME — add credential URL if you have one
  },
];

// ------------------------------------------------------------
//  SECTION IMAGERY
//  Real Unsplash CDN photos used as subtle section header bands
//  and the contact-side image. Swap any URL for your own.
// ------------------------------------------------------------
export const sectionImages = {
  experience:
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1400&q=80",
  certifications:
    "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1400&q=80",
  contact:
    "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1000&q=80",
  education:
    "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1400&q=80",
  testimonials:
    "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1400&q=80",
};

// Spoken/written languages.
export const languages = [
  { name: "Hindi", level: "Full Professional" },
  { name: "English", level: "Full Professional" },
];

// ------------------------------------------------------------
//  ARTICLES / BLOG
//  These are starter drafts on topics you know well. They are
//  marked `draft: true` so the UI shows a "Coming soon" badge —
//  nothing here pretends to be already published.
//  TO PUBLISH: write the post (Hashnode / Medium / Dev.to),
//  paste the URL into `link`, and set `draft: false`.
// ------------------------------------------------------------
//  Each article can carry:
//   - `summary`  short teaser (card front)
//   - `excerpt`  a longer, topic-rich description shown under the summary
//   - `points`   3 concrete takeaways the post will cover
//   - `cover`    { from, to, emoji } — used to render a lightweight SVG cover
//                (no image files to ship; looks good in light & dark).
//   - `image`    OPTIONAL — a real cover image URL/import; overrides `cover`.
export const articles = [
  {
    title: "From HR to Software Engineer: My Unconventional Path Into Tech",
    summary:
      "How a career that started in talent acquisition and data analytics became the perfect foundation for building people-first software.",
    excerpt:
      "I didn't take the straight line into engineering — I started in HR and talent acquisition at Tata Motors, moved through data analytics, and only then found code. This post is the honest story of that pivot: what transferred, what didn't, and why understanding people first made me a sharper engineer. If you're switching careers into tech, I want this to be the guide I wish I'd had.",
    points: [
      "The skills from non-tech roles that quietly make you a better developer",
      "How I structured self-study while working full-time",
      "Turning an 'unconventional' resume into an advantage, not an apology",
    ],
    tags: ["Career", "Journey"],
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=900&q=80",
    cover: { from: "#6366f1", to: "#a855f7", emoji: "🚀" },
    date: "Coming soon",
    readTime: "6 min read",
    link: "", // EDIT ME — add the published URL, then set draft:false
    draft: true,
  },
  {
    title: "Integrating LLMs Into a Real Product Without Losing Your Mind",
    summary:
      "Practical lessons from shipping an AI search module and chat assistant — prompt design, guardrails, cost, and keeping humans in the loop.",
    excerpt:
      "Adding an LLM to a demo is easy; shipping one to real users is where it gets interesting. Drawing on building an intelligent search module and an AI chat assistant in production, I break down the parts that actually matter: designing prompts you can maintain, adding guardrails so the model fails safely, controlling token cost at scale, and keeping a human in the loop where it counts. Fewer buzzwords, more of what broke and how we fixed it.",
    points: [
      "Prompt patterns that stay maintainable as requirements change",
      "Guardrails & fallbacks for when the model gets it wrong",
      "Measuring and controlling token cost in production",
    ],
    tags: ["AI", "LLM", "React"],
    image:
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=900&q=80",
    cover: { from: "#0ea5e9", to: "#6366f1", emoji: "🤖" },
    date: "Coming soon",
    readTime: "8 min read",
    link: "",
    draft: true,
  },
  {
    title: "How I Took a React App From Lighthouse 62 to 94",
    summary:
      "A step-by-step performance playbook: code splitting, lazy loading, image optimization, and measuring Core Web Vitals that actually matter.",
    excerpt:
      "A 32-point Lighthouse jump didn't come from one clever trick — it came from a repeatable playbook. I walk through exactly how I profiled a real React app, found what was actually slowing it down, and fixed it: route- and component-level code splitting, lazy loading below the fold, right-sizing and modernizing images, and trimming the JavaScript that blocked first paint. Every step ties back to a Core Web Vital you can measure, so you can prove the win instead of guessing at it.",
    points: [
      "Reading a Lighthouse report to find the real bottleneck",
      "Code splitting & lazy loading without hurting UX",
      "Image and bundle optimizations that move LCP and CLS",
    ],
    tags: ["Performance", "React", "Web Vitals"],
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80",
    cover: { from: "#f59e0b", to: "#ef4444", emoji: "⚡" },
    date: "Coming soon",
    readTime: "7 min read",
    link: "",
    draft: true,
  },
  {
    title: "Building Accessible UIs That Everyone Can Use",
    summary:
      "Why WCAG isn't a checkbox — a friendly, practical guide to shipping interfaces that work for real people, on real devices.",
    excerpt:
      "Accessibility gets treated like a compliance chore, but done right it just makes better software for everyone. This is a practical, no-guilt guide to shipping accessible React UIs: semantic HTML that does the heavy lifting for free, keyboard navigation and focus management, color contrast and motion preferences, and testing with real assistive tech instead of trusting an automated score. The same habits that help screen-reader users also make your UI faster and clearer for everybody.",
    points: [
      "Semantic HTML that gives you accessibility for free",
      "Keyboard nav, focus traps, and visible focus states",
      "Testing with real screen readers, not just a lint score",
    ],
    tags: ["Accessibility", "Frontend", "UX"],
    image:
      "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=900&q=80",
    cover: { from: "#10b981", to: "#0ea5e9", emoji: "♿" },
    date: "Coming soon",
    readTime: "5 min read",
    link: "",
    draft: true,
  },
];

// EDIT ME — replace the `name`/`title` placeholders with real people.
// `domain` is optional and shows a company logo on the avatar (falls back
// to initials). Keep quotes truthful — recruiters can tell.
export const testimonials = [
  {
    quote:
      "Govind is a dependable engineer who ships clean, accessible UIs and elevates the whole team. His work on our component library and Core Web Vitals had a measurable impact.",
    name: "Add a name",
    title: "Engineering Manager, NextZen Minds",
    domain: "nextzenminds.com",
  },
  {
    quote:
      "A fast learner with a strong eye for detail. Govind mentored our juniors and drove our GitHub Copilot adoption, cutting our delivery times significantly.",
    name: "Add a name",
    title: "Tech Lead, NextZen Minds",
    domain: "nextzenminds.com",
  },
  {
    quote:
      "He turned a vague product idea into a polished, production-ready feature faster than anyone expected — and it just worked. Great communicator, zero drama.",
    name: "Add a name",
    title: "Product Manager, NextZen Minds",
    domain: "nextzenminds.com",
  },
  {
    quote:
      "Govind pairs strong frontend craft with a real understanding of the backend. He asks the right questions early, which saves the whole team time down the line.",
    name: "Add a name",
    title: "Senior Backend Engineer",
  },
  {
    quote:
      "One of the most reliable people I've worked with. He owns his work end to end, writes code you actually enjoy reviewing, and lifts everyone around him.",
    name: "Add a name",
    title: "Colleague & Mentor",
  },
];
