"use client";

import { useRef } from "react";
import { ArrowRightIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { mailto, site } from "@/content/site";
import { useReveal } from "@/lib/use-reveal";

/**
 * Dark navy CTA band per DESIGN.md: coral mono label, white display heading,
 * one near-white pill action + underlined email fallback.
 */
export function ContactCta() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.fromTo(
          "[data-band]",
          { clipPath: "inset(4% 3% round 22px)" },
          {
            clipPath: "inset(0% 0% round 0px)",
            ease: "none",
            scrollTrigger: {
              trigger: ref.current,
              start: "top 85%",
              end: "top 35%",
              scrub: 0.4,
            },
          }
        );
      });
    },
    { scope: ref }
  );

  return (
    <section ref={ref} id="contact" aria-label="Contact">
      <div data-band className="bg-navy text-white">
        <div className="container-site flex flex-col items-start py-24 md:py-36">
          <p data-reveal className="mono-label text-xs text-coral">
            {site.contact.label}
          </p>
          <h2
            data-reveal
            className="font-display mt-5 max-w-3xl text-[clamp(2.25rem,5vw,4.25rem)] leading-[1.04] tracking-[-0.02em]"
          >
            {site.contact.heading}
          </h2>
          <p
            data-reveal
            className="mt-6 max-w-xl text-lg leading-relaxed text-white/70"
          >
            {site.contact.body}
          </p>

          <div
            data-reveal
            className="mt-10 flex flex-wrap items-center gap-6"
          >
            <Button asChild variant="inverted" size="lg">
              <a href={mailto()}>
                {site.contact.cta.label}
                <ArrowRightIcon className="size-4" />
              </a>
            </Button>
            <Button asChild variant="link" size="none" className="text-white/85">
              <a href={`mailto:${site.profile.email}`}>
                or write to {site.profile.email}
              </a>
            </Button>
          </div>

          <p data-reveal className="mono-label mt-14 text-[11px] text-white/45">
            {site.profile.availability} · {site.profile.location}
          </p>
        </div>
      </div>
    </section>
  );
}
