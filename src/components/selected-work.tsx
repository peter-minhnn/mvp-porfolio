"use client";

import { useRef } from "react";
import { ArrowUpRightIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { mailto, site, type CaseStudy } from "@/content/site";
import { useReveal } from "@/lib/use-reveal";
import { cn } from "@/lib/utils";

/** Dark agent-console mockup — structurally honest placeholder, no fake data dumps. */
function ConsoleMock({ name }: { name: string }) {
  return (
    <div className="flex h-full w-full items-center justify-center p-6 sm:p-10">
      <div className="w-full max-w-105 rounded-md border border-white/10 bg-primary p-5 text-white">
        <div className="flex items-center justify-between">
          <span className="mono-label text-[10px] text-white/55">
            {name.toLowerCase().replaceAll(" ", "-")} · lesson room
          </span>
          <div className="flex gap-1.5" aria-hidden>
            <span className="size-1.5 rounded-full bg-white/25" />
            <span className="size-1.5 rounded-full bg-white/25" />
            <span className="size-1.5 rounded-full bg-coral" />
          </div>
        </div>

        <div className="mt-4 flex items-center gap-3">
          <div className="size-8 rounded-sm bg-deep-green" aria-hidden />
          <div className="flex-1">
            <div className="h-2 w-24 rounded-full bg-white/30" aria-hidden />
            <div className="mt-1.5 h-2 w-16 rounded-full bg-white/15" aria-hidden />
          </div>
          <span className="mono-label rounded-xl border border-coral/60 bg-coral/10 px-2 py-0.5 text-[9px] text-coral-soft">
            Live
          </span>
        </div>

        <div className="mt-4 rounded-sm bg-white/6 p-3">
          <div className="h-2 w-3/4 rounded-full bg-white/25" aria-hidden />
          <div className="mt-2 h-2 w-1/2 rounded-full bg-white/15" aria-hidden />
        </div>

        <div className="mt-3 rounded-sm bg-white p-3">
          <div className="h-2 w-2/3 rounded-full bg-primary/25" aria-hidden />
          <div className="mt-2 h-2 w-5/6 rounded-full bg-primary/15" aria-hidden />
          <div className="mt-3 flex gap-1.5">
            <span className="mono-label rounded-xl border border-hairline px-2 py-0.5 text-[9px] text-slate-mid">
              Pronunciation 94
            </span>
            <span className="mono-label rounded-xl border border-hairline px-2 py-0.5 text-[9px] text-slate-mid">
              Pace OK
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Thin-line geometric illustration on warm stone. */
function StoneMock() {
  return (
    <div className="flex h-full w-full items-center justify-center p-8">
      <svg
        viewBox="0 0 320 240"
        aria-hidden
        className="h-auto w-full max-w-95 text-deep-green"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.3"
      >
        <rect x="24" y="20" width="180" height="200" rx="8" />
        <path d="M44 52h120M44 76h140M44 100h96" />
        <rect x="44" y="128" width="64" height="48" rx="4" />
        <rect x="120" y="128" width="64" height="48" rx="4" />
        <path d="M44 196h140" strokeDasharray="3 6" />
        <circle cx="252" cy="84" r="40" />
        <circle cx="252" cy="84" r="14" />
        <path d="M252 24v16M252 128v16M196 84h16M292 84h16" />
        <rect x="224" y="148" width="56" height="72" rx="6" />
        <path d="M236 168h32M236 184h32M236 200h20" />
      </svg>
    </div>
  );
}

function CaseRow({ cs, index }: { cs: CaseStudy; index: number }) {
  return (
    <article
      className={cn(
        "grid items-center gap-8 md:grid-cols-2 md:gap-14",
        index % 2 === 1 && "md:[&>*:first-child]:order-2"
      )}
    >
      {/* Media */}
      <div
        data-reveal
        className={cn(
          "relative aspect-16/11 overflow-hidden rounded-lg",
          cs.visual === "console"
            ? "bg-deep-green bg-[radial-gradient(120%_120%_at_20%_0%,#0d352d_0%,#071f1a_55%,#06130f_100%)]"
            : "bg-stone-soft"
        )}
      >
        <div data-parallax className="absolute inset-[-6%]">
          {cs.visual === "console" ? <ConsoleMock name={cs.name} /> : <StoneMock />}
        </div>
      </div>

      {/* Copy */}
      <div className="flex flex-col items-start">
        <div data-reveal className="flex items-center gap-3">
          <Badge variant="coral">{cs.chip}</Badge>
          <span className="mono-label text-[11px] text-slate-mid">
            {cs.name}
          </span>
        </div>
        <h3
          data-reveal
          className="font-display mt-5 max-w-md text-[2rem] leading-[1.15] tracking-[-0.01em] text-primary"
        >
          {cs.headline}
        </h3>
        <p data-reveal className="mt-4 max-w-md text-base leading-relaxed text-ink/75">
          {cs.description}
        </p>

        <ul data-reveal className="mt-7 w-full max-w-md">
          {cs.outcomes.map((outcome) => (
            <li
              key={outcome}
              className="flex items-baseline gap-3 border-t border-hairline py-3 text-[15px] text-ink/85"
            >
              <span aria-hidden className="text-coral">
                —
              </span>
              {outcome}
            </li>
          ))}
        </ul>

        <div data-reveal className="mt-6 flex flex-wrap items-center gap-2">
          {cs.stack.map((tech) => (
            <Badge key={tech} variant="neutral">
              {tech}
            </Badge>
          ))}
        </div>

        <Button
          data-reveal
          asChild
          variant="link"
          size="none"
          className="mt-8 text-ink"
        >
          <a href={mailto(`About a build like ${cs.name}`)}>
            Ask about {cs.name}
            <ArrowUpRightIcon className="size-4" />
          </a>
        </Button>
      </div>
    </article>
  );
}

export function SelectedWork() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        for (const el of root.querySelectorAll<HTMLElement>("[data-parallax]")) {
          gsap.fromTo(
            el,
            { yPercent: -4 },
            {
              yPercent: 4,
              ease: "none",
              scrollTrigger: {
                trigger: el.parentElement,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.5,
              },
            }
          );
        }
      });
    },
    { scope: ref }
  );

  return (
    <section ref={ref} id="work" className="bg-canvas">
      <div className="container-site pt-10 pb-28 md:pb-36">
        <div className="max-w-2xl">
          <p data-reveal className="mono-label text-xs text-slate-mid">
            {site.work.eyebrow}
          </p>
          <h2
            data-reveal
            className="font-display mt-4 text-[clamp(2.25rem,4.5vw,3.75rem)] leading-[1.05] tracking-[-0.02em] text-primary"
          >
            {site.work.heading}
          </h2>
        </div>

        <div className="mt-16 flex flex-col gap-24 md:mt-24 md:gap-32">
          {site.work.cases.map((cs, i) => (
            <CaseRow key={cs.slug} cs={cs} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
