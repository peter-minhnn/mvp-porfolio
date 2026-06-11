"use client";

import { useRef } from "react";
import { CheckIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { mailto, site } from "@/content/site";
import { useReveal } from "@/lib/use-reveal";

/**
 * Warm stone product cards per DESIGN.md `product-card`: 3-column desktop,
 * 8px radius, pill button, divider, checkmark rows. No drop shadows.
 */
export function ProjectsGrid() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

  return (
    <section ref={ref} id="projects" className="bg-canvas">
      <div className="container-site py-24 md:py-32">
        <div className="max-w-2xl">
          <p data-reveal className="mono-label text-xs text-slate-mid">
            {site.projects.eyebrow}
          </p>
          <h2
            data-reveal
            className="font-display mt-4 text-[clamp(2rem,4vw,3.25rem)] leading-[1.08] tracking-[-0.02em] text-primary"
          >
            {site.projects.heading}
          </h2>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {site.projects.items.map((project, i) => (
            <article
              key={project.name}
              data-reveal
              data-reveal-delay={String(i * 0.08)}
              className="flex flex-col rounded-sm bg-stone-soft p-7"
            >
              <h3 className="font-display text-2xl tracking-[-0.01em] text-primary">
                {project.name}
              </h3>
              <p className="mt-1.5 text-sm text-slate-mid">{project.summary}</p>

              <div className="mt-6">
                <Button asChild size="sm" variant="outline">
                  <a href={mailto(`About a build like ${project.name}`)}>
                    Build something similar
                  </a>
                </Button>
              </div>

              <Separator className="my-6 bg-ink/10" />

              <ul className="flex flex-col gap-3">
                {project.points.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-2.5 text-[14px] leading-snug text-ink/80"
                  >
                    <CheckIcon
                      aria-hidden
                      className="mt-0.5 size-4 shrink-0 text-deep-green"
                    />
                    {point}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
