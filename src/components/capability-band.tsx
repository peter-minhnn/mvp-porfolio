"use client";

import { type ReactNode, useRef } from "react";

import { Button } from "@/components/ui/button";
import { type Capability, site } from "@/content/site";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";
import { useReveal } from "@/lib/use-reveal";

const icons: Record<Capability["icon"], ReactNode> = {
  scope: (
    <svg
      viewBox="0 0 48 48"
      className="size-10"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      aria-hidden="true"
    >
      <circle cx="24" cy="24" r="16" />
      <path d="M24 4v8M24 36v8M4 24h8M36 24h8" />
      <circle cx="24" cy="24" r="3" />
    </svg>
  ),
  stack: (
    <svg
      viewBox="0 0 48 48"
      className="size-10"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      aria-hidden="true"
    >
      <rect x="10" y="8" width="28" height="9" rx="2" />
      <rect x="10" y="20" width="28" height="9" rx="2" />
      <rect x="10" y="32" width="28" height="9" rx="2" />
      <path d="M16 12.5h8M16 24.5h12M16 36.5h6" strokeDasharray="2 4" />
    </svg>
  ),
  loop: (
    <svg
      viewBox="0 0 48 48"
      className="size-10"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      aria-hidden="true"
    >
      <path d="M38 24a14 14 0 1 1-4.1-9.9" />
      <path d="M38 8v8h-8" />
      <circle cx="24" cy="24" r="3" strokeDasharray="2 3" />
    </svg>
  ),
};

/**
 * Dark feature band per DESIGN.md `dark-feature-band`: deep green full-width
 * section, white text, translucent cards, thin-line geometric icons. The band
 * un-rounds as it enters (clip-path scrub) — a restrained "curtain" moment.
 * Now renders the personal "About" content.
 */
export function CapabilityBand() {
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
              end: "top 30%",
              scrub: 0.4,
            },
          },
        );
      });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} id="about" aria-label="About">
      <div data-band className="bg-deep-green text-white">
        <div className="container-site py-24 md:py-32">
          <div className="max-w-2xl">
            <p data-reveal className="mono-label text-xs text-white/65">
              {site.about.eyebrow}
            </p>
            <h2
              data-reveal
              className="font-display mt-4 text-[clamp(2.25rem,4.5vw,3.75rem)] leading-[1.05] tracking-[-0.02em] text-white"
            >
              {site.about.heading}
            </h2>
            <p data-reveal className="mt-5 max-w-xl text-lg leading-relaxed text-white/70">
              {site.about.lead}
            </p>
          </div>

          <div className="mt-16 grid gap-5 md:grid-cols-3">
            {site.about.items.map((cap, i) => (
              <article
                key={cap.title}
                data-reveal
                data-reveal-delay={String(i * 0.08)}
                className="flex flex-col rounded-md border border-white/12 bg-white/4 p-7"
              >
                <div className="text-coral-soft">{icons[cap.icon]}</div>
                <h3 className="font-display mt-8 text-2xl leading-snug tracking-[-0.01em]">
                  {cap.title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-white/70">{cap.body}</p>
                {cap.link && (
                  <Button
                    asChild
                    variant="link"
                    size="none"
                    className="mt-6 self-start text-white/90"
                  >
                    <a href={cap.link.href}>{cap.link.label}</a>
                  </Button>
                )}
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
