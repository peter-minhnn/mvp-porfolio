/**
 * SiteContent — single source of truth for everything rendered on the page.
 * Personal portfolio content for Nguyen Nhat Minh.
 */

export type NavLink = { label: string; href: string };

export type Project = {
  slug: string;
  chip: string;
  name: string;
  headline: string;
  description: string;
  highlights: string[];
  stack: string[];
  repo: string;
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
