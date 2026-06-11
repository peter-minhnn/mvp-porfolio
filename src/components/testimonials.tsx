"use client";

import { useRef } from "react";

import { Badge } from "@/components/ui/badge";
import { site } from "@/content/site";
import { useReveal } from "@/lib/use-reveal";

/**
 * Quiet, rule-driven testimonial rows — unframed, editorial, no cards.
 */
export function Testimonials() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

  return (
    <section ref={ref} aria-label="Testimonials" className="bg-canvas">
      <div className="container-site pb-24 md:pb-32">
        <p data-reveal className="mono-label text-xs text-slate-mid">
          {site.testimonials.eyebrow}
        </p>

        <div className="mt-8 grid gap-x-14 gap-y-12 border-t border-hairline pt-12 md:grid-cols-2">
          {site.testimonials.items.map((t) => (
            <figure key={t.name} data-reveal className="flex flex-col items-start">
              <Badge variant="coral">{t.chip}</Badge>
              <blockquote className="font-display mt-6 text-xl leading-[1.35] tracking-[-0.01em] text-primary md:text-2xl">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-5 text-sm text-slate-mid">
                <span className="text-ink">{t.name}</span> — {t.role}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
