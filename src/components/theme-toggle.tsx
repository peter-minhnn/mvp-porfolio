"use client";

import { MoonIcon, SunIcon } from "lucide-react";
import { useCallback } from "react";

type StartViewTransition = (callback: () => void) => { ready: Promise<unknown> };

/**
 * Light/dark toggle with a circular reveal (View Transitions API) radiating
 * from the click point across the whole page. Falls back to an instant switch
 * where the API is unsupported or when the user prefers reduced motion.
 *
 * Icon state is CSS-driven (`dark:` variant), so the button needs no React
 * state and never triggers a hydration mismatch.
 */
export function ThemeToggle() {
  const onToggle = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    const root = document.documentElement;
    const toDark = !root.classList.contains("dark");
    const apply = () => {
      root.classList.toggle("dark", toDark);
      try {
        localStorage.setItem("theme", toDark ? "dark" : "light");
      } catch {
        /* localStorage unavailable (private mode) — theme still applies for the session */
      }
    };

    const start = (document as Document & { startViewTransition?: StartViewTransition })
      .startViewTransition;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced || typeof start !== "function") {
      apply();
      return;
    }

    const x = event.clientX;
    const y = event.clientY;
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );

    const transition = start.call(document, apply);
    transition.ready.then(() => {
      root.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${endRadius}px at ${x}px ${y}px)`] },
        { duration: 520, easing: "ease-in-out", pseudoElement: "::view-transition-new(root)" },
      );
    });
  }, []);

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label="Toggle dark mode"
      className="grid size-9 cursor-pointer place-items-center rounded-pill text-ink/80 transition-colors hover:bg-stone-soft hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
    >
      <MoonIcon className="size-5 dark:hidden" />
      <SunIcon className="hidden size-5 dark:block" />
    </button>
  );
}
