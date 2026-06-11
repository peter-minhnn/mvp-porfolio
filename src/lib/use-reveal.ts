"use client";

import type { RefObject } from "react";

import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";

/**
 * Standard section reveal: any child with `data-reveal` rises in when it
 * enters the viewport. Optional `data-reveal-delay="0.15"` for stagger-like
 * offsets. No-ops under prefers-reduced-motion (content stays visible).
 */
export function useReveal(ref: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;
      const mm = gsap.matchMedia();

      mm.add(MOTION_OK, () => {
        const items = Array.from(
          root.querySelectorAll<HTMLElement>("[data-reveal]")
        );
        for (const el of items) {
          gsap.from(el, {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
            delay: Number(el.dataset.revealDelay ?? 0),
            scrollTrigger: {
              trigger: el,
              start: "top 86%",
            },
          });
        }
      });
    },
    { scope: ref }
  );
}
