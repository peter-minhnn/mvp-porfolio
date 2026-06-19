"use client";

import { useRef, useState } from "react";
import { ProjectDetails } from "@/components/project-details";
import { ShotCard } from "@/components/project-media";
import { TypingText } from "@/components/typing-text";
import { Badge } from "@/components/ui/badge";
import type { Project } from "@/content/site";
import { DESKTOP, gsap, MOTION_OK, ScrollTrigger, useGSAP } from "@/lib/gsap";

/** Watches the scene cards and reports which one is at viewport centre.
 * Desktop-only: on mobile the copy column isn't sticky, so switching the active
 * scene is invisible and only churns re-renders/tweens mid-scroll (jank). */
function useActiveScene(ref: React.RefObject<HTMLElement | null>, set: (i: number) => void): void {
  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;
      const mm = gsap.matchMedia();

      mm.add(DESKTOP, () => {
        const cards = Array.from(root.querySelectorAll<HTMLElement>("[data-scene]"));
        for (const [i, card] of cards.entries()) {
          ScrollTrigger.create({
            trigger: card,
            start: "top 60%",
            end: "bottom 40%",
            onToggle: (self) => {
              if (self.isActive) set(i);
            },
          });
        }
      });
    },
    { scope: ref },
  );
}

/**
 * Scrollytelling project: the copy column is pinned with CSS sticky while the
 * screenshots scroll past, and the eyebrow/title/description swap to match
 * whichever scene is centred — the title retyping each time. Scenes without
 * their own copy fall back to the project defaults.
 */
export function ProjectStory({
  project,
  index,
}: {
  project: Project;
  index: number;
}): React.JSX.Element {
  const scenes = project.scenes ?? [];
  const ref = useRef<HTMLElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const [active, setActive] = useState(0);
  const number = String(index + 1).padStart(2, "0");

  const scene = scenes[active];
  const eyebrow = scene?.eyebrow ?? project.chip;
  const title = scene?.title ?? project.headline;
  const description = scene?.description ?? project.description;

  useActiveScene(ref, setActive);

  // Fade the description in whenever the active scene changes.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        if (descRef.current) {
          gsap.from(descRef.current, { opacity: 0, y: 12, duration: 0.5, ease: "power2.out" });
        }
      });
    },
    { dependencies: [active], scope: ref },
  );

  return (
    <article
      ref={ref}
      className="grid items-start gap-10 md:grid-cols-[minmax(0,0.62fr)_minmax(0,1fr)] md:gap-14 lg:gap-20"
    >
      <div className="md:sticky md:top-0 md:flex md:min-h-screen md:flex-col md:justify-center md:py-24">
        <div className="relative flex flex-col items-start">
          {/* Ghost numeral via ::before — decorative, excluded from a11y/contrast. */}
          <span
            data-index
            aria-hidden="true"
            data-num={number}
            className="font-display pointer-events-none absolute -top-12 -left-1 text-[7rem] leading-none font-semibold text-primary/5 select-none before:content-[attr(data-num)] md:-top-16 md:text-[9rem]"
          />

          <div className="flex items-center gap-3">
            <Badge variant="coral">{eyebrow}</Badge>
            <span className="mono-label text-[11px] text-slate-mid">{project.name}</span>
          </div>
          <h3 className="font-display mt-5 block min-h-[4.6rem] max-w-md text-[2rem] leading-[1.15] tracking-[-0.01em] text-primary">
            <TypingText text={title} />
          </h3>
          <p ref={descRef} className="mt-1 max-w-md text-base leading-relaxed text-ink/75">
            {description}
          </p>

          <ProjectDetails project={project} />
        </div>
      </div>

      <div className="flex flex-col gap-8 md:gap-12">
        {scenes.map((s, i) => (
          <ShotCard
            key={s.image}
            src={s.image}
            domain={project.domain}
            alt={`${project.name} — ${s.eyebrow ?? "overview"}`}
            priority={index === 0 && i === 0}
            sceneIndex={i}
          />
        ))}
      </div>
    </article>
  );
}
