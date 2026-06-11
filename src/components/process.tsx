"use client";

import { useRef } from "react";

import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { site } from "@/content/site";
import { useReveal } from "@/lib/use-reveal";

/**
 * Rule-separated process rows on a pale green wash. A hairline on the left
 * fills top-to-bottom as you scrub through the section — build progress as
 * scroll progress. Numbered markers are justified here: this is a real,
 * ordered sequence with time windows.
 */
export function Process() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.fromTo(
          "[data-progress-line]",
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            transformOrigin: "top center",
            scrollTrigger: {
              trigger: "[data-steps]",
              start: "top 70%",
              end: "bottom 45%",
              scrub: 0.4,
            },
          }
        );
      });
    },
    { scope: ref }
  );

  return (
    <section ref={ref} id="process" className="bg-wash-green">
      <div className="container-site py-24 md:py-32">
        <div className="max-w-2xl">
          <p data-reveal className="mono-label text-xs text-deep-green/60">
            {site.process.eyebrow}
          </p>
          <h2
            data-reveal
            className="font-display mt-4 text-[clamp(2rem,4vw,3.25rem)] leading-[1.08] tracking-[-0.02em] text-deep-green"
          >
            {site.process.heading}
          </h2>
        </div>

        <div data-steps className="relative mt-16 md:mt-20">
          {/* progress rail */}
          <div
            aria-hidden
            className="absolute top-0 bottom-0 left-0 hidden w-px bg-deep-green/15 md:block"
          >
            <div
              data-progress-line
              className="h-full w-px scale-y-0 bg-deep-green"
            />
          </div>

          <ol className="md:pl-12">
            {site.process.steps.map((step, i) => (
              <li
                key={step.phase}
                data-reveal
                className="grid gap-2 border-t border-deep-green/15 py-8 last:border-b md:grid-cols-[7rem_14rem_1fr] md:gap-8 md:py-10"
              >
                <span className="mono-label text-xs text-deep-green/55">
                  {String(i + 1).padStart(2, "0")} · {step.window}
                </span>
                <h3 className="font-display text-2xl tracking-[-0.01em] text-deep-green">
                  {step.phase}
                </h3>
                <p className="max-w-xl text-[15px] leading-relaxed text-deep-green/75">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
