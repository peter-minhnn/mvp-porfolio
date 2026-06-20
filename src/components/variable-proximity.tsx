"use client";

import { type CSSProperties, type RefObject, useEffect, useMemo, useRef } from "react";

type Falloff = "linear" | "exponential" | "gaussian";

type VariableProximityProps = {
  /** The text to render with the proximity effect. */
  label: string;
  /** font-variation-settings at rest, e.g. "'wght' 400". */
  fromFontVariationSettings: string;
  /** font-variation-settings at the cursor, e.g. "'wght' 700". */
  toFontVariationSettings: string;
  /** Element the cursor distance is measured against (usually the text wrapper). */
  containerRef: RefObject<HTMLElement | null>;
  radius?: number;
  falloff?: Falloff;
  className?: string;
  style?: CSSProperties;
};

/** rAF loop that re-runs the given callback every frame. */
function useAnimationFrame(callback: () => void) {
  useEffect(() => {
    let frameId: number;
    const loop = () => {
      callback();
      frameId = requestAnimationFrame(loop);
    };
    frameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frameId);
  }, [callback]);
}

/** Tracks the pointer position relative to the container, in a ref (no re-render). */
function useMousePositionRef(containerRef: RefObject<HTMLElement | null>) {
  const positionRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const update = (x: number, y: number) => {
      const el = containerRef.current;
      if (el) {
        const rect = el.getBoundingClientRect();
        positionRef.current = { x: x - rect.left, y: y - rect.top };
      } else {
        positionRef.current = { x, y };
      }
    };
    const onMouse = (e: MouseEvent) => update(e.clientX, e.clientY);
    const onTouch = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (touch) update(touch.clientX, touch.clientY);
    };

    window.addEventListener("mousemove", onMouse);
    window.addEventListener("touchmove", onTouch);
    return () => {
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("touchmove", onTouch);
    };
  }, [containerRef]);

  return positionRef;
}

type ParsedAxis = { axis: string; fromValue: number; toValue: number };

function parseSettings(settingsStr: string): Map<string, number> {
  return new Map(
    settingsStr
      .split(",")
      .map((s) => s.trim())
      .map((s) => {
        const [name, value] = s.split(" ");
        return [name.replace(/['"]/g, ""), Number.parseFloat(value)] as const;
      }),
  );
}

/**
 * Variable-font proximity effect (port of React Bits' VariableProximity):
 * each letter's font-variation-settings interpolate toward `to` as the cursor
 * nears it. Manipulates style via refs, so it never triggers React re-renders.
 */
export function VariableProximity({
  label,
  fromFontVariationSettings,
  toFontVariationSettings,
  containerRef,
  radius = 50,
  falloff = "linear",
  className = "",
  style,
}: VariableProximityProps) {
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const mousePositionRef = useMousePositionRef(containerRef);
  const lastPositionRef = useRef<{ x: number | null; y: number | null }>({ x: null, y: null });

  const parsedSettings = useMemo<ParsedAxis[]>(() => {
    const from = parseSettings(fromFontVariationSettings);
    const to = parseSettings(toFontVariationSettings);
    return Array.from(from.entries()).map(([axis, fromValue]) => ({
      axis,
      fromValue,
      toValue: to.get(axis) ?? fromValue,
    }));
  }, [fromFontVariationSettings, toFontVariationSettings]);

  /** Stable letter model with unique ids so keys never rely on the array index. */
  const words = useMemo(() => {
    let index = 0;
    return label.split(" ").map((word, wordIndex) => ({
      id: `word-${wordIndex}-${word}`,
      letters: [...word].map((char) => ({ char, id: index++ })),
    }));
  }, [label]);

  const calcFalloff = (distance: number) => {
    const norm = Math.min(Math.max(1 - distance / radius, 0), 1);
    if (falloff === "exponential") return norm ** 2;
    if (falloff === "gaussian") return Math.exp(-((distance / (radius / 2)) ** 2) / 2);
    return norm;
  };

  useAnimationFrame(() => {
    const container = containerRef.current;
    if (!container) return;
    const { x, y } = mousePositionRef.current;
    if (lastPositionRef.current.x === x && lastPositionRef.current.y === y) return;
    lastPositionRef.current = { x, y };

    const containerRect = container.getBoundingClientRect();
    for (const letterRef of letterRefs.current) {
      if (!letterRef) continue;
      const rect = letterRef.getBoundingClientRect();
      const cx = rect.left + rect.width / 2 - containerRect.left;
      const cy = rect.top + rect.height / 2 - containerRect.top;
      const distance = Math.hypot(x - cx, y - cy);

      if (distance >= radius) {
        letterRef.style.fontVariationSettings = fromFontVariationSettings;
        continue;
      }

      const t = calcFalloff(distance);
      letterRef.style.fontVariationSettings = parsedSettings
        .map(({ axis, fromValue, toValue }) => `'${axis}' ${fromValue + (toValue - fromValue) * t}`)
        .join(", ");
    }
  });

  return (
    <span className={className} style={{ display: "inline", ...style }}>
      {words.map((word) => (
        <span key={word.id} style={{ display: "inline-block", whiteSpace: "nowrap" }}>
          {word.letters.map((letter) => (
            <span
              key={letter.id}
              ref={(el) => {
                letterRefs.current[letter.id] = el;
              }}
              aria-hidden="true"
              style={{
                display: "inline-block",
                fontVariationSettings: fromFontVariationSettings,
              }}
            >
              {letter.char}
            </span>
          ))}
          <span style={{ display: "inline-block" }}>&nbsp;</span>
        </span>
      ))}
      <span className="sr-only">{label}</span>
    </span>
  );
}
