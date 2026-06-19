"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/** matchMedia conditions used across sections */
export const MOTION_OK = "(prefers-reduced-motion: no-preference)";
export const MOTION_REDUCED = "(prefers-reduced-motion: reduce)";
/** Desktop breakpoint (matches Tailwind `md:`). Scroll-driven scene effects are
 * desktop-only — on mobile the copy column isn't sticky, so scene switching is
 * invisible and only causes scroll jank. */
export const DESKTOP = "(min-width: 768px)";

export { gsap, ScrollTrigger, useGSAP };
