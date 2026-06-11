"use client";

import { useRef } from "react";
import { ArrowUpRightIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { site, type Project } from "@/content/site";
import { useReveal } from "@/lib/use-reveal";
import { cn } from "@/lib/utils";

/** Dark app mockup for mvp-listening — structurally honest, no fake data dumps. */
function ConsoleMock({ name }: { name: string }) {
  return (
    <div className="flex h-full w-full items-center justify-center p-6 sm:p-10">
      <div
        data-tilt-layer
        className="w-full max-w-105 rounded-md border border-white/10 bg-primary p-5 text-white"
      >
        <div className="flex items-center justify-between">
          <span className="mono-label text-[10px] text-white/55">
            {name} · test player
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
            Audio
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
              Section 2 of 4
            </span>
            <span className="mono-label rounded-xl border border-hairline px-2 py-0.5 text-[9px] text-slate-mid">
              Answers 28/40
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Thin-line CLI illustration on warm stone — for mp-sentinel. */
function StoneMock() {
  return (
    <div className="flex h-full w-full items-center justify-center p-8">
      <svg
        viewBox="0 0 320 240"
        aria-hidden
        data-tilt-layer
        className="h-auto w-full max-w-95 text-deep-green"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.3"
      >
        {/* Terminal window */}
        <rect x="24" y="20" width="180" height="200" rx="8" />
        <path d="M24 44h180" />
        <circle cx="40" cy="32" r="3" />
        <circle cx="52" cy="32" r="3" />
        <circle cx="64" cy="32" r="3" />
        {/* Prompt lines */}
        <path d="M44 64h12M64 64h80" />
        <path d="M44 84h12M64 84h100" />
        <path d="M44 104h12M64 104h64" />
        {/* Result blocks */}
        <rect x="44" y="128" width="64" height="48" rx="4" />
        <rect x="120" y="128" width="64" height="48" rx="4" />
        <path d="M44 196h140" strokeDasharray="3 6" />
        {/* Shield / guardrail mark */}
        <path d="M252 40c14 8 28 12 40 12v36c0 28-18 48-40 60-22-12-40-32-40-60V52c12 0 26-4 40-12Z" />
        <path d="M236 96l12 12 24-26" />
        <rect x="224" y="168" width="56" height="52" rx="6" />
        <path d="M236 184h32M236 198h32M236 212h20" />
      </svg>
    </div>
  );
}

function ProjectRow({ project, index }: { project: Project; index: number }) {
  return (
    <article
      className={cn(
        "grid items-center gap-8 md:grid-cols-2 md:gap-14",
        index % 2 === 1 && "md:[&>*:first-child]:order-2"
      )}
    >
      {/* Media — CSS 3D layer tilted by GSAP on scroll */}
      <div
        data-reveal
        className={cn(
          "relative aspect-16/11 overflow-hidden rounded-lg [perspective:1200px]",
          project.visual === "console"
            ? "bg-deep-green bg-[radial-gradient(120%_120%_at_20%_0%,#0d352d_0%,#071f1a_55%,#06130f_100%)]"
            : "bg-stone-soft"
        )}
      >
        <div
          data-parallax
          className="absolute inset-[-6%] [transform-style:preserve-3d]"
        >
          {project.visual === "console" ? (
            <ConsoleMock name={project.name} />
          ) : (
            <StoneMock />
          )}
        </div>
      </div>

      {/* Copy */}
      <div className="flex flex-col items-start">
        <div data-reveal className="flex items-center gap-3">
          <Badge variant="coral">{project.chip}</Badge>
          <span className="mono-label text-[11px] text-slate-mid">
            {project.name}
          </span>
        </div>
        <h3
          data-reveal
          className="font-display mt-5 max-w-md text-[2rem] leading-[1.15] tracking-[-0.01em] text-primary"
        >
          {project.headline}
        </h3>
        <p data-reveal className="mt-4 max-w-md text-base leading-relaxed text-ink/75">
          {project.description}
        </p>

        <ul data-reveal className="mt-7 w-full max-w-md">
          {project.highlights.map((highlight) => (
            <li
              key={highlight}
              className="flex items-baseline gap-3 border-t border-hairline py-3 text-[15px] text-ink/85"
            >
              <span aria-hidden className="text-coral">
                —
              </span>
              {highlight}
            </li>
          ))}
        </ul>

        <div data-reveal className="mt-6 flex flex-wrap items-center gap-2">
          {project.stack.map((tech) => (
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
          <a href={project.repo} target="_blank" rel="noreferrer">
            View {project.name} on GitHub
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
        // Parallax drift + a light 3D tilt that settles as the card scrolls by.
        for (const el of root.querySelectorAll<HTMLElement>("[data-parallax]")) {
          const trigger = {
            trigger: el.parentElement,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.5,
          } as const;
          gsap.fromTo(
            el,
            { yPercent: -4 },
            { yPercent: 4, ease: "none", scrollTrigger: trigger }
          );
          const layer = el.querySelector<HTMLElement>("[data-tilt-layer]");
          if (layer) {
            gsap.fromTo(
              layer,
              { rotateX: 7, rotateY: -5 },
              { rotateX: -3, rotateY: 3, ease: "none", scrollTrigger: trigger }
            );
          }
        }
      });
    },
    { scope: ref }
  );

  return (
    <section ref={ref} id="projects" className="bg-canvas">
      <div className="container-site pt-10 pb-28 md:pb-36">
        <div className="max-w-2xl">
          <p data-reveal className="mono-label text-xs text-slate-mid">
            {site.projects.eyebrow}
          </p>
          <h2
            data-reveal
            className="font-display mt-4 text-[clamp(2.25rem,4.5vw,3.75rem)] leading-[1.05] tracking-[-0.02em] text-primary"
          >
            {site.projects.heading}
          </h2>
        </div>

        <div className="mt-16 flex flex-col gap-24 md:mt-24 md:gap-32">
          {site.projects.items.map((project, i) => (
            <ProjectRow key={project.slug} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
