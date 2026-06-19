"use client";

import { useRef } from "react";

import { gsap, MOTION_OK, MOTION_REDUCED, useGSAP } from "@/lib/gsap";

/**
 * Typewriter text. Whenever `text` changes it retypes character by character via
 * GSAP. A visually-hidden copy carries the full string for screen readers and
 * SSR, so the effect is purely decorative. No-ops to full text under
 * prefers-reduced-motion.
 */
export function TypingText({
  text,
  className,
}: {
  text: string;
  className?: string;
}): React.JSX.Element {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();

      mm.add(MOTION_OK, () => {
        const state = { count: 0 };
        el.textContent = "";
        gsap.to(state, {
          count: text.length,
          duration: Math.min(1.1, Math.max(0.35, text.length * 0.026)),
          ease: "none",
          onUpdate: () => {
            el.textContent = text.slice(0, Math.round(state.count));
          },
        });
      });

      mm.add(MOTION_REDUCED, () => {
        el.textContent = text;
      });
    },
    { dependencies: [text], scope: ref },
  );

  return (
    <>
      <span ref={ref} aria-hidden className={className} />
      <span className="sr-only">{text}</span>
    </>
  );
}
