"use client";

import Lenis from "lenis";
import { useEffect } from "react";

import { gsap, ScrollTrigger } from "@/lib/gsap";
import { setLenis } from "@/lib/scroll";

/**
 * Lenis drives the scroll; ScrollTrigger listens to it. Disabled entirely for
 * prefers-reduced-motion users (native scrolling, no smoothing).
 */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t: number) => Math.min(1, 1.001 - 2 ** (-10 * t)),
    });
    setLenis(lenis);

    const onScroll = () => ScrollTrigger.update();
    lenis.on("scroll", onScroll);

    const tick = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // Web fonts change text metrics after first paint, which shifts every
    // trigger's start/end. Recompute once they're ready so nothing jumps.
    document.fonts?.ready.then(() => ScrollTrigger.refresh());

    // Smooth-scroll in-page anchors through Lenis.
    const onClick = (event: MouseEvent) => {
      const anchor = (event.target as HTMLElement).closest?.(
        'a[href^="#"]',
      ) as HTMLAnchorElement | null;
      if (!anchor) return;
      const id = anchor.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;
      event.preventDefault();
      lenis.scrollTo(target as HTMLElement, { offset: -72 });
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      gsap.ticker.remove(tick);
      lenis.off("scroll", onScroll);
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  return null;
}
