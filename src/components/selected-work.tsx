"use client";

import { useRef } from "react";
import { ProjectDetails } from "@/components/project-details";
import { ProjectMedia } from "@/components/project-media";
import { ProjectStory } from "@/components/project-story";
import { Badge } from "@/components/ui/badge";
import { type Project, site } from "@/content/site";
import { useReveal } from "@/lib/use-reveal";

/** Static copy column (no scene switching) — pinned with CSS sticky while the
 * screenshots scroll past. Used for projects without a scene sequence. */
function ProjectCopy({ project, index }: { project: Project; index: number }): React.JSX.Element {
  const number = String(index + 1).padStart(2, "0");

  return (
    <div className="md:sticky md:top-0 md:flex md:min-h-screen md:flex-col md:justify-center md:py-24">
      <div className="relative flex flex-col items-start">
        {/* Ghost numeral rendered via ::before so its intentionally faint tone
            is decorative (excluded from accessibility/contrast checks). */}
        <span
          data-index
          aria-hidden="true"
          data-num={number}
          className="font-display pointer-events-none absolute -top-12 -left-1 text-[7rem] leading-none font-semibold text-primary/5 select-none before:content-[attr(data-num)] md:-top-16 md:text-[9rem]"
        />

        <div data-reveal className="flex items-center gap-3">
          <Badge variant="coral">{project.chip}</Badge>
          <span className="mono-label text-[11px] text-slate-mid">{project.name}</span>
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

        <ProjectDetails project={project} />
      </div>
    </div>
  );
}

function ProjectRow({ project, index }: { project: Project; index: number }): React.JSX.Element {
  if (project.scenes && project.scenes.length > 0) {
    return <ProjectStory project={project} index={index} />;
  }

  return (
    <article className="grid items-start gap-10 md:grid-cols-[minmax(0,0.62fr)_minmax(0,1fr)] md:gap-14 lg:gap-20">
      <ProjectCopy project={project} index={index} />
      <ProjectMedia project={project} />
    </article>
  );
}

export function SelectedWork(): React.JSX.Element {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

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

        <div className="mt-16 flex flex-col gap-20 md:mt-24 md:gap-32">
          {site.projects.items.map((project, i) => (
            <ProjectRow key={project.slug} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
