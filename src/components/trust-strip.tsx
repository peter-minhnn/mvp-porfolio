"use client";

import { useRef } from "react";

import { site } from "@/content/site";
import { useReveal } from "@/lib/use-reveal";

/**
 * Quiet credibility strip per DESIGN.md `trust-logo-strip`: centered copy,
 * monochrome wordmarks, wide spacing — then a rule-separated stat row.
 */
export function TrustStrip() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

  return (
    <section ref={ref} aria-label="Clients and results" className="bg-canvas">
      <div className="container-site pt-24 pb-20 md:pt-32">
        <p
          data-reveal
          className="mono-label text-center text-xs text-slate-mid"
        >
          {site.trust.heading}
        </p>

        <ul
          data-reveal
          className="mt-10 flex flex-wrap items-center justify-center gap-x-12 gap-y-6 md:gap-x-16"
        >
          {site.trust.logos.map((logo) => (
            <li
              key={logo}
              className="font-display text-[15px] tracking-tight text-ink/45 select-none md:text-base"
            >
              {logo}
            </li>
          ))}
        </ul>

        <dl
          data-reveal
          data-reveal-delay="0.1"
          className="mt-20 grid grid-cols-2 gap-x-8 gap-y-10 border-t border-hairline pt-10 md:grid-cols-4"
        >
          {site.trust.stats.map((stat) => (
            <div key={stat.label} className="flex flex-col gap-2">
              <dd className="font-display order-1 text-4xl tracking-[-0.02em] text-primary md:text-5xl">
                {stat.value}
              </dd>
              <dt className="order-2 max-w-44 text-sm leading-snug text-slate-mid">
                {stat.label}
              </dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
