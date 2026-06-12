"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import { useReducedMotion } from "framer-motion";
import { ArrowRightIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CvPreviewDialog } from "@/components/cv-dialog";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { mailto, site } from "@/content/site";

const HeroCanvas = dynamic(() => import("./hero-canvas"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_20%_0%,#0d352d_0%,#071f1a_55%,#06130f_100%)]" />
  ),
});

function ConsoleCard() {
  const { console: c } = site.hero;
  return (
    <div className="absolute bottom-4 left-4 w-[17rem] max-w-[calc(100%-2rem)] rounded-md border border-white/10 bg-primary/95 p-4 text-white">
      <div className="flex items-center justify-between gap-3">
        <span className="mono-label text-[10px] text-white/60">{c.title}</span>
        <span aria-hidden className="size-1.5 rounded-full bg-coral" />
      </div>
      <div className="mt-3 flex items-center gap-2">
        <span aria-hidden className="size-2 rounded-full bg-[#7ee0c2]" />
        <span className="text-[13px] font-medium">{c.status}</span>
      </div>
      <p className="mt-1.5 text-xs text-white/65">{c.deploy}</p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {c.integrations.map((tag) => (
          <span
            key={tag}
            className="mono-label rounded-xl border border-white/15 px-2 py-0.5 text-[9px] text-white/75"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

function SideCardIllustration() {
  return (
    <svg
      viewBox="0 0 240 240"
      aria-hidden
      className="h-auto w-full max-w-50 text-deep-green"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
    >
      <circle cx="120" cy="120" r="78" />
      <circle cx="120" cy="120" r="52" strokeDasharray="3 6" />
      <path d="M120 28v40M120 172v40M28 120h40M172 120h40" />
      <rect x="96" y="96" width="48" height="48" rx="6" />
      <rect x="148" y="58" width="26" height="26" rx="4" />
      <rect x="62" y="152" width="22" height="22" rx="4" />
      <path d="M144 120h36M120 144v28" strokeDasharray="2 5" />
    </svg>
  );
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const progressRef = useRef(0);
  const reduced = useReducedMotion() ?? false;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Entrance choreography
      mm.add(MOTION_OK, () => {
        gsap.from("[data-hero-reveal]", {
          y: 26,
          opacity: 0,
          duration: 0.85,
          ease: "power3.out",
          stagger: 0.09,
          delay: 0.08,
        });
        gsap.from("[data-hero-media]", {
          y: 64,
          opacity: 0,
          scale: 0.985,
          duration: 1.05,
          ease: "power3.out",
          delay: 0.32,
        });
      });

      // Pinned, scrubbed hero moment (desktop only): copy recedes while the
      // 3D build gently disassembles.
      mm.add(`(min-width: 768px) and ${MOTION_OK}`, () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=55%",
            scrub: 0.45,
            pin: true,
            anticipatePin: 1,
            onUpdate: (self) => {
              progressRef.current = self.progress;
            },
            onLeaveBack: () => {
              progressRef.current = 0;
            },
          },
        });
        tl.to("[data-hero-copy]", { y: -56, opacity: 0.3, ease: "none" }, 0).to(
          "[data-hero-media]",
          { y: -18, ease: "none" },
          0,
        );
      });
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} id="top" aria-label="Intro" className="relative bg-canvas">
      <div className="container-site flex flex-col items-center pt-16 pb-14 text-center md:pt-24">
        <div data-hero-copy className="flex flex-col items-center">
          <p data-hero-reveal className="mono-label text-xs text-slate-mid">
            {site.hero.eyebrow}
          </p>
          <h1
            data-hero-reveal
            className="font-display mt-6 max-w-4xl text-[clamp(2.75rem,7.2vw,6rem)] leading-[1.02] tracking-[-0.02em] text-primary"
          >
            {site.hero.title}
          </h1>
          <p data-hero-reveal className="mt-6 max-w-xl text-lg leading-[1.45] text-ink/80">
            {site.hero.lead}
          </p>
          <div data-hero-reveal className="mt-9 flex flex-wrap items-center justify-center gap-6">
            <Button asChild size="lg">
              <a href={site.hero.primaryCta.href}>
                {site.hero.primaryCta.label}
                <ArrowRightIcon className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </a>
            </Button>
            <CvPreviewDialog>
              <Button variant="outline" size="lg">
                {site.hero.cvCta.label}
              </Button>
            </CvPreviewDialog>
            <Button asChild variant="link" size="none" className="text-ink">
              <a href={mailto()}>{site.hero.contactCta.label}</a>
            </Button>
          </div>
        </div>

        {/* Two-card media composition */}
        <div data-hero-media className="mt-16 grid w-full gap-4 md:mt-20 md:grid-cols-[1.6fr_1fr]">
          <div className="relative aspect-4/3 overflow-hidden rounded-lg bg-[radial-gradient(120%_120%_at_20%_0%,#0d352d_0%,#071f1a_55%,#06130f_100%)] sm:aspect-16/10">
            <HeroCanvas progress={progressRef} reduced={reduced} />
            <ConsoleCard />
          </div>
          <div className="flex flex-col items-start justify-between gap-8 rounded-lg bg-stone-soft p-7">
            <Badge variant="coral">{site.hero.sideCard.chip}</Badge>
            <SideCardIllustration />
            <p className="text-left text-sm leading-relaxed text-ink/75">
              {site.hero.sideCard.caption}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
