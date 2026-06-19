"use client";

import type Lenis from "lenis";

/** Shared handle to the active Lenis instance (set by SmoothScroll) so other
 * components can drive smooth programmatic scrolling. */
let lenis: Lenis | null = null;

export function setLenis(instance: Lenis | null): void {
  lenis = instance;
}

/** Smoothly scroll to the top. Deliberately unhurried (1.6s) so it glides
 * rather than snaps. Instant for reduced-motion users. */
export function scrollToTop(): void {
  if (typeof window === "undefined") return;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    window.scrollTo({ top: 0 });
    return;
  }

  if (lenis) {
    lenis.scrollTo(0, { duration: 1.6 });
  } else {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}
