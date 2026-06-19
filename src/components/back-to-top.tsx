"use client";

import { RocketIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { gsap } from "@/lib/gsap";
import { scrollToTop } from "@/lib/scroll";
import { cn } from "@/lib/utils";

const SIZE = 52;
const EDGE = 16;
const DRAG_THRESHOLD = 6;

type Pos = { x: number; y: number };

type FloatingState = {
  pos: Pos | null;
  dragging: boolean;
  visible: boolean;
  onPointerDown: (e: React.PointerEvent) => void;
  onPointerMove: (e: React.PointerEvent) => void;
  onPointerUp: () => void;
};

function clampPos({ x, y }: Pos): Pos {
  const maxX = window.innerWidth - SIZE - EDGE;
  const maxY = window.innerHeight - SIZE - EDGE;
  return { x: Math.min(Math.max(EDGE, x), maxX), y: Math.min(Math.max(EDGE, y), maxY) };
}

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Rocket launch: a small anticipatory crouch, a gentle hop upward with a flame
 * burst, then an easy settle back to rest — paired with the smooth scroll. */
function launchRocket(rocket: HTMLElement | null, flame: HTMLElement | null): void {
  if (!rocket || prefersReducedMotion()) return;
  gsap.killTweensOf([rocket, flame]);
  const tl = gsap.timeline();
  tl.set(rocket, { x: 0, y: 0, scale: 1, opacity: 1 })
    .set(flame, { opacity: 0, scaleY: 0.3 })
    .to(rocket, { y: 6, scale: 0.9, duration: 0.26, ease: "power1.out" })
    .to(flame, { opacity: 1, scaleY: 1.2, duration: 0.22 }, "<")
    .to(rocket, { y: -78, scale: 1.06, duration: 0.85, ease: "power2.out" })
    .to(flame, { scaleY: 1.6, duration: 0.85, ease: "power2.out" }, "<")
    .to(flame, { opacity: 0, duration: 0.45 }, "-=0.3")
    .to(rocket, { y: 0, scale: 1, duration: 0.95, ease: "power2.inOut" }, "-=0.3")
    .set(flame, { scaleY: 0.3 });
}

/** Hover "ready to launch": the rocket trembles like its engines are warming up
 * and a small flame flickers at the base. `stopReady` returns it to rest. */
function startReady(rocket: HTMLElement | null, flame: HTMLElement | null): void {
  if (!rocket || prefersReducedMotion()) return;
  gsap.killTweensOf([rocket, flame]);
  gsap.set(rocket, { x: 0, y: 0 });
  gsap.to(rocket, {
    y: -2.5,
    x: "random(-1.6,1.6)",
    duration: 0.08,
    repeat: -1,
    yoyo: true,
    repeatRefresh: true,
    ease: "power1.inOut",
  });
  gsap.fromTo(
    flame,
    { opacity: 0.85, scaleY: 0.8 },
    { opacity: 1, scaleY: 1.15, duration: 0.14, repeat: -1, yoyo: true, ease: "sine.inOut" },
  );
}

function stopReady(rocket: HTMLElement | null, flame: HTMLElement | null): void {
  gsap.killTweensOf([rocket, flame]);
  gsap.to(rocket, { x: 0, y: 0, duration: 0.18, ease: "power2.out" });
  gsap.to(flame, { opacity: 0, scaleY: 0.3, duration: 0.18 });
}

/** Drag + visibility state for the floating button. Snaps to the nearest
 * horizontal edge (AssistiveTouch-style) and tells apart a tap from a drag. */
function useFloating(onTap: () => void): FloatingState {
  const [pos, setPos] = useState<Pos | null>(null);
  const [dragging, setDragging] = useState(false);
  const [visible, setVisible] = useState(false);
  const drag = useRef({ active: false, moved: false, sx: 0, sy: 0, dx: 0, dy: 0 });

  useEffect(() => {
    setPos(clampPos({ x: window.innerWidth, y: Math.round(window.innerHeight * 0.6) }));
    const onScroll = () => setVisible(window.scrollY > 360);
    const onResize = () => setPos((p) => (p ? clampPos(p) : p));
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const onPointerDown = (e: React.PointerEvent): void => {
    if (!pos) return;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    drag.current = {
      active: true,
      moved: false,
      sx: e.clientX,
      sy: e.clientY,
      dx: e.clientX - pos.x,
      dy: e.clientY - pos.y,
    };
  };

  const onPointerMove = (e: React.PointerEvent): void => {
    const d = drag.current;
    if (!d.active) return;
    if (!d.moved && Math.hypot(e.clientX - d.sx, e.clientY - d.sy) > DRAG_THRESHOLD) {
      d.moved = true;
      setDragging(true);
    }
    if (d.moved) setPos(clampPos({ x: e.clientX - d.dx, y: e.clientY - d.dy }));
  };

  const onPointerUp = (): void => {
    const d = drag.current;
    if (!d.active) return;
    d.active = false;
    setDragging(false);
    if (!d.moved) {
      onTap();
    } else if (pos) {
      const onLeft = pos.x + SIZE / 2 < window.innerWidth / 2;
      setPos(clampPos({ x: onLeft ? EDGE : window.innerWidth, y: pos.y }));
    }
  };

  return { pos, dragging, visible, onPointerDown, onPointerMove, onPointerUp };
}

/** Floating, draggable back-to-top button (AssistiveTouch-style) that launches a
 * rocket and glides the page smoothly to the top. */
export function BackToTop(): React.JSX.Element | null {
  const rocketRef = useRef<HTMLSpanElement>(null);
  const flameRef = useRef<HTMLSpanElement>(null);
  const { pos, dragging, visible, onPointerDown, onPointerMove, onPointerUp } = useFloating(() => {
    launchRocket(rocketRef.current, flameRef.current);
    scrollToTop();
  });

  const handlePointerDown = (e: React.PointerEvent): void => {
    stopReady(rocketRef.current, flameRef.current);
    onPointerDown(e);
  };

  if (!pos) return null;

  return (
    <button
      type="button"
      aria-label="Back to top"
      onPointerDown={handlePointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerEnter={() => !dragging && startReady(rocketRef.current, flameRef.current)}
      onPointerLeave={() => stopReady(rocketRef.current, flameRef.current)}
      style={{ left: pos.x, top: pos.y, width: SIZE, height: SIZE }}
      className={cn(
        "fixed z-50 grid touch-none place-items-center bg-transparent text-coral select-none",
        "[filter:drop-shadow(0_4px_8px_rgba(23,23,28,0.35))] hover:opacity-100 focus-visible:opacity-100",
        visible ? "opacity-80" : "pointer-events-none opacity-0",
        dragging
          ? "cursor-grabbing transition-none"
          : "cursor-grab transition-[left,top,opacity] duration-300 ease-out",
      )}
    >
      <span ref={rocketRef} className="relative grid place-items-center">
        <RocketIcon className="size-8 -rotate-45" aria-hidden />
        <span
          ref={flameRef}
          aria-hidden
          className="pointer-events-none absolute top-full left-1/2 h-6 w-2 -translate-x-1/2 rounded-full bg-gradient-to-b from-coral via-coral-soft to-transparent opacity-0 [transform-origin:top]"
        />
      </span>
    </button>
  );
}
