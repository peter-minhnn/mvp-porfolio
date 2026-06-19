/**
 * SiteContent — single source of truth for everything rendered on the page.
 * Personal portfolio content for Nguyen Nhat Minh.
 */

export type NavLink = { label: string; href: string };

/** A single screenshot in a project's scroll story. When `eyebrow`/`title`/
 * `description` are set, the pinned copy swaps to them (with a typing effect)
 * as this screenshot scrolls to center; otherwise the project default shows. */
export type Scene = {
  image: string;
  eyebrow?: string;
  title?: string;
  description?: string;
};

export type Project = {
  slug: string;
  chip: string;
  name: string;
  headline: string;
  description: string;
  highlights: string[];
  stack: string[];
  repo: string;
  /** Public live deployment. */
  liveUrl: string;
  /** Domain label shown on the card (no scheme). */
  domain: string;
  /** Plain screenshots under /public; stacked and scrolled. Falls back to the
   * mockup when empty or if an image fails to load. */
  images?: string[];
  /** Scrollytelling sequence: screenshots that drive the left copy as they
   * scroll past. Takes precedence over `images` when present. */
  scenes?: Scene[];
  visual: "console" | "stone";
};

export type Capability = {
  title: string;
  body: string;
  link?: { label: string; href: string };
  icon: "scope" | "stack" | "loop";
};

export type Skill = { name: string; icon: string };

export type Social = { label: string; href: string };

export const site = {
  profile: {
    name: "Nguyen Nhat Minh",
    studio: "Nguyen Nhat Minh",
    wordmark: "nhatminh·dev",
    role: "Full-stack & product engineer",
    email: "nnminh742@gmail.com",
    github: "https://github.com/peter-minhnn",
    location: "Ho Chi Minh City, Vietnam",
    availability: "Open to projects and collaborations",
  },

  announcement: {
    text: "Open to new projects and collaborations — say hello.",
    linkLabel: "Contact me",
  },

  nav: [
    { label: "Projects", href: "#projects" },
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "CV", href: "#cv" },
    { label: "Contact", href: "#contact" },
  ] satisfies NavLink[],

  hero: {
    eyebrow: "Nguyen Nhat Minh — Full-stack & Product Engineer",
    title: "I build polished web products, end to end.",
    lead: "I'm a full-stack developer in Ho Chi Minh City with 8+ years of experience. I design and ship production-ready web apps, English-learning products, and developer tooling — from data model and API to interface and motion design.",
    primaryCta: { label: "View projects", href: "#projects" },
    cvCta: { label: "Preview CV" },
    contactCta: { label: "Contact me" },
    console: {
      title: "mvp-listening · production",
      status: "Build passing",
      deploy: "Deploy — listening test player",
      integrations: ["Next.js", "Supabase", "Audio"],
    },
    sideCard: {
      chip: "Currently",
      caption:
        "Building IELTS practice tools and an AI code-review CLI — two products, one engineering system.",
    },
  },

  about: {
    eyebrow: "About",
    heading: "One pair of hands, end to end.",
    lead: "Everything between an idea and a product with users: interface, API, database, integrations, and the launch itself.",
    items: [
      {
        title: "Product engineering",
        body: "I take products from a one-page brief to production: user flows, data model, interface, and deployment — with decisions that stay coherent because one person makes them.",
        link: { label: "See the projects", href: "#projects" },
        icon: "scope",
      },
      {
        title: "Developer & learning tools",
        body: "I build tools people use every day: an IELTS Listening practice platform and a code-review CLI with architecture guardrails — practical software with careful edges.",
        icon: "stack",
      },
      {
        title: "Polished web experiences",
        body: "Motion-rich, accessible interfaces with GSAP and React Three Fiber that stay fast: transform-only animations, reduced-motion fallbacks, no scroll jank.",
        icon: "loop",
      },
    ] satisfies Capability[],
  },

  projects: {
    eyebrow: "Featured projects",
    heading: "Real products, built end to end.",
    items: [
      {
        slug: "mvp-listening",
        chip: "Edtech",
        name: "mvp-listening",
        headline: "An IELTS Listening practice app with AI-powered test import",
        description:
          "A full practice platform: import real tests from Excel, PDFs, or photos, sit them with an audio test player, then review answers and grow a personal vocabulary list.",
        highlights: [
          "Test import from Excel, PDF, and photos",
          "Audio test-taking with timed sections and review flow",
          "Vocabulary workflow built from mistakes",
        ],
        stack: ["Next.js", "TypeScript", "Supabase", "AI"],
        repo: "https://github.com/peter-minhnn/mvp-listening",
        liveUrl: "https://learning.mvpenglish.com/",
        domain: "learning.mvpenglish.com",
        scenes: [
          { image: "/projects/mvp-listening-home.jpg" },
          {
            image: "/projects/mvp-listening-tests.jpg",
            eyebrow: "Tests",
            title: "A growing library of real IELTS Listening tests",
            description:
              "Browse the test catalogue, pick an exam, and start practising in seconds — each one imported from real Cambridge-style material.",
          },
          {
            image: "/projects/mvp-listening-realtest.jpg",
            eyebrow: "Real test mode",
            title: "Sit it exactly like the real exam",
            description:
              "Real test mode runs the full timing across all four sections, locks navigation, and only reveals your band score at the very end.",
          },
          {
            image: "/projects/mvp-listening-review.jpg",
            eyebrow: "Review",
            title: "Review every answer with the transcript",
            description:
              "After submitting, walk through each question against the audio transcript — see what you missed and why, then save tricky words.",
          },
          {
            image: "/projects/mvp-listening-dictation.jpg",
            eyebrow: "Dictation",
            title: "Sharpen your ear with dictation drills",
            description:
              "Replay sentences line by line and type what you hear — the fastest way to close the gap between hearing English and understanding it.",
          },
        ],
        visual: "console",
      },
      {
        slug: "mp-sentinel",
        chip: "Dev tools",
        name: "mp-sentinel",
        headline: "An AI-powered code review CLI with architecture guardrails",
        description:
          "A TypeScript CLI that reviews codebases with multiple AI providers, enforces architecture and clean-code rules, and keeps every run safe with dry-run and security guardrails.",
        highlights: [
          "Architecture checks and clean-code rule packs",
          "Multi-provider AI review pipeline",
          "Dry-run mode and security guardrails by default",
        ],
        stack: ["TypeScript", "Node.js", "CLI", "AI"],
        repo: "https://github.com/peter-minhnn/mp-sentinel",
        liveUrl: "https://mp-sentinel.vercel.app/",
        domain: "mp-sentinel.vercel.app",
        images: [
          "/projects/mp-sentinel-1.jpg",
          "/projects/mp-sentinel-2.jpg",
          "/projects/mp-sentinel-3.jpg",
          "/projects/mp-sentinel-4.jpg",
        ],
        visual: "stone",
      },
    ] satisfies Project[],
  },

  skills: {
    eyebrow: "Skills",
    heading: "The stack I reach for.",
    lead: "Press a key — these are the tools I work with daily.",
    items: [
      { name: "ReactJs", icon: "/logos/react.svg" },
      { name: "NextJs", icon: "/logos/nextjs.svg" },
      { name: "Angular", icon: "/logos/angular.svg" },
      { name: "Vite", icon: "/logos/vite.svg" },
      { name: ".NET", icon: "/logos/dotnet.svg" },
      { name: "NodeJs", icon: "/logos/nodejs.svg" },
      { name: "NestJs", icon: "/logos/nestjs.svg" },
      { name: "AWS", icon: "/logos/aws.svg" },
      { name: "HTML5", icon: "/logos/html5.svg" },
      { name: "CSS", icon: "/logos/css3.svg" },
      { name: "Tailwindcss", icon: "/logos/tailwindcss.svg" },
      { name: "React Native", icon: "/logos/reactnative.svg" },
      { name: "Svelte", icon: "/logos/svelte.svg" },
      { name: "PostgreSQL", icon: "/logos/postgresql.svg" },
      { name: "MySQL", icon: "/logos/mysql.svg" },
      { name: "Oracle", icon: "/logos/oracle.svg" },
      { name: "SQL Server", icon: "/logos/sqlserver.svg" },
      { name: "Problem Solving", icon: "/logos/problem-solving.svg" },
    ] satisfies Skill[],
  },

  cv: {
    eyebrow: "Curriculum vitae",
    heading: "The full story, on one PDF.",
    body: "Preview my CV right here, download a copy, or open it in a new tab — experience, stack, and education in one place.",
    file: "/files/NGUYENNHATMINH_CV.pdf",
    fileName: "NGUYENNHATMINH_CV.pdf",
    previewLabel: "Preview CV",
    downloadLabel: "Download CV",
    newTabLabel: "Open in new tab",
  },

  contact: {
    label: "Let's talk",
    heading: "Have a product or tool that needs building?",
    body: "Tell me what you're working on. Email is the fastest way to reach me — or look around my GitHub first.",
    cta: { label: "Email me" },
  },

  socials: [
    { label: "Email", href: "mailto:nnminh742@gmail.com" },
    { label: "GitHub", href: "https://github.com/peter-minhnn" },
  ] satisfies Social[],

  footer: {
    note: "Full-stack & product engineer building AI tooling, English-learning products, and polished web MVPs.",
    columns: [
      {
        title: "Site",
        links: [
          { label: "Projects", href: "#projects" },
          { label: "About", href: "#about" },
          { label: "CV", href: "#cv" },
          { label: "Contact", href: "#contact" },
        ],
      },
      {
        title: "Connect",
        links: [
          { label: "Email", href: "mailto:nnminh742@gmail.com" },
          { label: "GitHub", href: "https://github.com/peter-minhnn" },
        ],
      },
    ],
    legal: "© 2026 Nguyen Nhat Minh. Built with Next.js, React Three Fiber, and GSAP.",
  },
} as const;

export const mailto = (subject = "Hello from your portfolio") =>
  `mailto:${site.profile.email}?subject=${encodeURIComponent(subject)}`;
