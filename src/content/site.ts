/**
 * SiteContent — single source of truth for everything rendered on the page.
 * Seed data for the MVP; replace values here without touching components.
 */

export type NavLink = { label: string; href: string };

export type Stat = { value: string; label: string };

export type CaseStudy = {
  slug: string;
  chip: string;
  name: string;
  headline: string;
  description: string;
  outcomes: string[];
  stack: string[];
  visual: "console" | "stone";
};

export type Capability = {
  title: string;
  body: string;
  link?: { label: string; href: string };
  icon: "scope" | "stack" | "loop";
};

export type ProcessStep = {
  phase: string;
  window: string;
  body: string;
};

export type ProjectCard = {
  name: string;
  summary: string;
  points: string[];
  href?: string;
};

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  chip: string;
};

export type Social = { label: string; href: string };

export const site = {
  profile: {
    name: "Minh",
    studio: "MVP Studio",
    wordmark: "mvp·studio",
    role: "Product engineer & studio of one",
    email: "mipuenglish@gmail.com",
    location: "Ho Chi Minh City · working worldwide",
    availability: "Booking discovery sprints for July 2026",
  },

  announcement: {
    text: "Now booking discovery sprints for July 2026 — one slot left.",
    linkLabel: "Start a project",
  },

  nav: [
    { label: "Work", href: "#work" },
    { label: "Capabilities", href: "#capabilities" },
    { label: "Process", href: "#process" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ] satisfies NavLink[],

  hero: {
    eyebrow: "MVP Studio — Product Engineering",
    title: "From idea to shipped product in weeks.",
    lead: "I design, build, and launch production-ready MVPs for founders and small teams — scoped tight, built on a modern web stack, and in front of real users from day one.",
    primaryCta: { label: "Start a project" },
    secondaryCta: { label: "See selected work", href: "#work" },
    console: {
      title: "mvp-english · production",
      status: "Build passing",
      deploy: "Deploy 47 — checkout flow",
      integrations: ["Next.js", "Postgres", "Stripe"],
    },
    sideCard: {
      chip: "This quarter",
      caption: "Three products scoped, built, and launched with this exact system.",
    },
  },

  trust: {
    heading: "Trusted by founders and product teams",
    logos: [
      "Northbeam Labs",
      "Quartz & Co",
      "Fieldnote",
      "Halcyon Health",
      "Brightline",
      "Arcadia",
    ],
    stats: [
      { value: "14", label: "MVPs shipped to production" },
      { value: "3–6 wks", label: "typical idea-to-launch window" },
      { value: "92%", label: "of clients come back for v2" },
      { value: "$4.2M", label: "raised on the back of client launches" },
    ] satisfies Stat[],
  },

  work: {
    eyebrow: "Selected work",
    heading: "Small scopes, real launches.",
    cases: [
      {
        slug: "mvp-english",
        chip: "Edtech",
        name: "MVP English",
        headline: "An AI speaking coach that took a tutoring business online",
        description:
          "A learning platform with live lesson rooms, AI pronunciation feedback, and subscription billing — shipped in five weeks from a one-page brief.",
        outcomes: [
          "5 weeks from kickoff to paying users",
          "1,200+ active learners in month one",
          "4.9★ average lesson rating",
        ],
        stack: ["Next.js", "Supabase", "Stripe", "WebRTC"],
        visual: "console",
      },
      {
        slug: "fieldnote",
        chip: "B2B SaaS",
        name: "Fieldnote",
        headline: "Inspection reports that write themselves",
        description:
          "An offline-first field app that turns site photos and voice notes into client-ready PDF reports before the inspector reaches the car.",
        outcomes: [
          "3 weeks to a pilot with 40 inspectors",
          "70% less time spent per report",
          "Seed round closed on pilot data",
        ],
        stack: ["React Native", "tRPC", "Postgres"],
        visual: "stone",
      },
    ] satisfies CaseStudy[],
  },

  capabilities: {
    eyebrow: "Capabilities",
    heading: "One pair of hands, end to end.",
    lead: "Everything between a napkin sketch and a product with users — without the agency overhead or the hand-off losses.",
    items: [
      {
        title: "Product strategy & scoping",
        body: "A one-week discovery sprint turns your idea into a build plan: user flows, data model, and a fixed scope we both sign before any code.",
        link: { label: "How scoping works", href: "#process" },
        icon: "scope",
      },
      {
        title: "Design & full-stack build",
        body: "Interface, API, database, auth, and payments from one person — decisions stay coherent from Figma frame to production deploy.",
        icon: "stack",
      },
      {
        title: "Launch & iteration",
        body: "Analytics, error tracking, and a weekly iteration loop after launch, so the MVP keeps earning its next feature with evidence.",
        icon: "loop",
      },
    ] satisfies Capability[],
  },

  process: {
    eyebrow: "Process",
    heading: "Four phases. Weekly demos. No slide decks.",
    steps: [
      {
        phase: "Discover",
        window: "Week 0–1",
        body: "We define the one job your product must do, who it's for, and the smallest version that proves it — then fix the scope in writing.",
      },
      {
        phase: "Design",
        window: "Week 1–2",
        body: "Flows become wireframes, wireframes become a clickable interface in your brand. You react to screens, not specs.",
      },
      {
        phase: "Build",
        window: "Week 2–5",
        body: "Weekly releases on a production stack from day one. You watch the product grow in your own browser, not in a deck.",
      },
      {
        phase: "Launch",
        window: "Week 5+",
        body: "Real users, real metrics, and a prioritized v2 backlog based on what people actually do inside the product.",
      },
    ] satisfies ProcessStep[],
  },

  projects: {
    eyebrow: "More builds",
    heading: "Smaller projects, same system.",
    items: [
      {
        name: "Quartz CRM",
        summary: "Pipeline tool for a twelve-person agency",
        points: [
          "Kanban pipeline with email sync",
          "Built and adopted in four weeks",
          "Now their system of record",
        ],
      },
      {
        name: "Halcyon Intake",
        summary: "Privacy-first patient onboarding",
        points: [
          "Dynamic medical intake forms",
          "E-signatures and reminders",
          "Cut intake calls by half",
        ],
      },
      {
        name: "Arcadia Menus",
        summary: "QR menus for a restaurant group",
        points: [
          "Live menu editing, no reprints",
          "Seven venues on one dashboard",
          "Launched in two weeks",
        ],
      },
    ] satisfies ProjectCard[],
  },

  testimonials: {
    eyebrow: "What clients say",
    items: [
      {
        quote:
          "Minh scoped in a week what our last agency couldn't in a quarter. The MVP shipped early, and our first cohort onboarded the same day.",
        name: "Lan Pham",
        role: "Founder, MVP English",
        chip: "Edtech",
      },
      {
        quote:
          "It felt like hiring a CTO, a designer, and a dev team in one person. Weekly demos kept the board calm and the roadmap honest.",
        name: "Daniel Reyes",
        role: "COO, Fieldnote",
        chip: "B2B SaaS",
      },
    ] satisfies Testimonial[],
  },

  contact: {
    label: "Ideas move fast",
    heading: "Have an idea that needs to exist? Let's scope your MVP.",
    body: "Tell me what you're building and who it's for. You'll get a reply within 48 hours with first questions and a discovery-sprint slot.",
    cta: { label: "Start a project" },
  },

  // TODO: replace with your real profile URLs.
  socials: [
    { label: "GitHub", href: "https://github.com" },
    { label: "LinkedIn", href: "https://linkedin.com" },
    { label: "X / Twitter", href: "https://x.com" },
  ] satisfies Social[],

  footer: {
    note: "Independent product engineering studio. One project at a time, scoped in weeks, shipped to production.",
    columns: [
      {
        title: "Site",
        links: [
          { label: "Selected work", href: "#work" },
          { label: "Capabilities", href: "#capabilities" },
          { label: "Process", href: "#process" },
          { label: "More builds", href: "#projects" },
        ],
      },
      {
        title: "Connect",
        links: [
          { label: "Email", href: "mailto:mipuenglish@gmail.com" },
          { label: "GitHub", href: "https://github.com" },
          { label: "LinkedIn", href: "https://linkedin.com" },
          { label: "X / Twitter", href: "https://x.com" },
        ],
      },
    ],
    legal: "© 2026 MVP Studio. Built with Next.js, React Three Fiber, and GSAP.",
  },
} as const;

export const mailto = (subject = "New project inquiry") =>
  `mailto:${site.profile.email}?subject=${encodeURIComponent(subject)}`;
