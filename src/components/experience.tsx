"use client";

import { useRef } from "react";

import { Badge } from "@/components/ui/badge";
import { type Experience as ExperienceItem, site } from "@/content/site";
import { useReveal } from "@/lib/use-reveal";

/** A single role: period rail on the left, role detail on the right. */
function ExperienceRow({
  item,
  index,
}: {
  item: ExperienceItem;
  index: number;
}): React.JSX.Element {
  return (
    <article
      data-reveal
      data-reveal-delay={String(index * 0.08)}
      className="grid gap-4 border-t border-hairline py-10 md:grid-cols-[16rem_1fr] md:gap-10"
    >
      <div className="flex flex-col gap-1">
        <p className="mono-label text-[11px] text-primary">{item.period}</p>
        <p className="mt-2 text-sm text-slate-mid">{item.location}</p>
      </div>

      <div>
        <h3 className="font-display text-2xl leading-snug tracking-[-0.01em] text-primary">
          {item.role} · <span className="text-ink">{item.company}</span>
        </h3>
        <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-ink/75">{item.summary}</p>

        <ul className="mt-5 max-w-2xl">
          {item.highlights.map((highlight) => (
            <li
              key={highlight}
              className="flex items-baseline gap-3 py-1.5 text-[15px] text-ink/85"
            >
              <span aria-hidden className="text-coral">
                —
              </span>
              {highlight}
            </li>
          ))}
        </ul>

        <div className="mt-5 flex flex-wrap items-center gap-2">
          {item.stack.map((tech) => (
            <Badge key={tech} variant="neutral">
              {tech}
            </Badge>
          ))}
        </div>
      </div>
    </article>
  );
}

/**
 * Experience timeline: real work history pulled onto the page so recruiters
 * see roles, dates, and impact without opening the CV PDF.
 */
export function Experience() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

  return (
    <section ref={ref} id="experience" className="bg-canvas">
      <div className="container-site py-24 md:py-32">
        <div className="max-w-2xl">
          <p data-reveal className="mono-label text-xs text-slate-mid">
            {site.experience.eyebrow}
          </p>
          <h2
            data-reveal
            className="font-display mt-4 text-[clamp(2rem,4vw,3.25rem)] leading-[1.08] tracking-[-0.02em] text-primary"
          >
            {site.experience.heading}
          </h2>
          <p data-reveal className="mt-5 max-w-xl text-base leading-relaxed text-ink/75">
            {site.experience.lead}
          </p>
        </div>

        <div className="mt-12 border-b border-hairline">
          {site.experience.items.map((item, i) => (
            <ExperienceRow key={item.company} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
