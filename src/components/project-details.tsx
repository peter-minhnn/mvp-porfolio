import { ArrowUpRightIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Project } from "@/content/site";

/** Shared static tail of a project's copy column: highlights, tech stack, and
 * the live-site / GitHub CTAs. Used by both the static and scrollytelling rows. */
export function ProjectDetails({ project }: { project: Project }): React.JSX.Element {
  return (
    <>
      {project.metrics && project.metrics.length > 0 && (
        <dl data-reveal className="mt-7 flex flex-wrap gap-x-10 gap-y-4">
          {project.metrics.map((metric) => (
            <div key={metric.label} className="flex flex-col-reverse">
              <dt className="mono-label mt-2 text-[11px] text-slate-mid">{metric.label}</dt>
              <dd className="font-display text-3xl leading-none tracking-[-0.02em] text-primary">
                {metric.value}
              </dd>
            </div>
          ))}
        </dl>
      )}

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

      <div data-reveal className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
        <Button asChild size="sm" variant="primary">
          <a href={project.liveUrl} target="_blank" rel="noreferrer">
            Visit live site
            <ArrowUpRightIcon className="size-4" />
          </a>
        </Button>
        <Button asChild variant="link" size="none" className="text-ink">
          <a href={project.repo} target="_blank" rel="noreferrer">
            View on GitHub
            <ArrowUpRightIcon className="size-4" />
          </a>
        </Button>
      </div>
    </>
  );
}
