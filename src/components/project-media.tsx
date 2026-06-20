"use client";

import Image from "next/image";
import { useState } from "react";

import type { Project } from "@/content/site";
import { cn } from "@/lib/utils";

/** Dark app mockup for mvp-listening — structurally honest, no fake data dumps. */
function ConsoleMock({ name }: { name: string }): React.JSX.Element {
  return (
    <div className="flex h-full w-full items-center justify-center p-6 sm:p-10">
      <div
        data-tilt-layer
        className="w-full max-w-105 rounded-md border border-white/10 bg-ink-900 p-5 text-white"
      >
        <div className="flex items-center justify-between">
          <span className="mono-label text-[10px] text-white/55">{name} · test player</span>
          <div className="flex gap-1.5" aria-hidden>
            <span className="size-1.5 rounded-full bg-white/25" />
            <span className="size-1.5 rounded-full bg-white/25" />
            <span className="size-1.5 rounded-full bg-coral" />
          </div>
        </div>

        <div className="mt-4 flex items-center gap-3">
          <div className="size-8 rounded-sm bg-deep-green" aria-hidden />
          <div className="flex-1">
            <div className="h-2 w-24 rounded-full bg-white/30" aria-hidden />
            <div className="mt-1.5 h-2 w-16 rounded-full bg-white/15" aria-hidden />
          </div>
          <span className="mono-label rounded-xl border border-coral/60 bg-coral/10 px-2 py-0.5 text-[9px] text-coral-soft">
            Audio
          </span>
        </div>

        <div className="mt-4 rounded-sm bg-white/6 p-3">
          <div className="h-2 w-3/4 rounded-full bg-white/25" aria-hidden />
          <div className="mt-2 h-2 w-1/2 rounded-full bg-white/15" aria-hidden />
        </div>

        <div className="mt-3 rounded-sm bg-white p-3">
          <div className="h-2 w-2/3 rounded-full bg-ink-900/25" aria-hidden />
          <div className="mt-2 h-2 w-5/6 rounded-full bg-ink-900/15" aria-hidden />
          <div className="mt-3 flex gap-1.5">
            <span className="mono-label rounded-xl border border-hairline px-2 py-0.5 text-[9px] text-slate-mid">
              Section 2 of 4
            </span>
            <span className="mono-label rounded-xl border border-hairline px-2 py-0.5 text-[9px] text-slate-mid">
              Answers 28/40
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Thin-line CLI illustration on warm stone — for mp-sentinel. */
function StoneMock(): React.JSX.Element {
  return (
    <div className="flex h-full w-full items-center justify-center p-8">
      <svg
        viewBox="0 0 320 240"
        aria-hidden="true"
        data-tilt-layer
        className="h-auto w-full max-w-95 text-deep-green"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.3"
      >
        {/* Terminal window */}
        <rect x="24" y="20" width="180" height="200" rx="8" />
        <path d="M24 44h180" />
        <circle cx="40" cy="32" r="3" />
        <circle cx="52" cy="32" r="3" />
        <circle cx="64" cy="32" r="3" />
        {/* Prompt lines */}
        <path d="M44 64h12M64 64h80" />
        <path d="M44 84h12M64 84h100" />
        <path d="M44 104h12M64 104h64" />
        {/* Result blocks */}
        <rect x="44" y="128" width="64" height="48" rx="4" />
        <rect x="120" y="128" width="64" height="48" rx="4" />
        <path d="M44 196h140" strokeDasharray="3 6" />
        {/* Shield / guardrail mark */}
        <path d="M252 40c14 8 28 12 40 12v36c0 28-18 48-40 60-22-12-40-32-40-60V52c12 0 26-4 40-12Z" />
        <path d="M236 96l12 12 24-26" />
        <rect x="224" y="168" width="56" height="52" rx="6" />
        <path d="M236 184h32M236 198h32M236 212h20" />
      </svg>
    </div>
  );
}

function Mock({ project }: { project: Project }): React.JSX.Element {
  return project.visual === "console" ? <ConsoleMock name={project.name} /> : <StoneMock />;
}

/** A browser chrome bar with traffic-light dots and the live domain. */
function BrowserBar({ domain }: { domain: string }): React.JSX.Element {
  return (
    <div className="flex items-center gap-2 border-b border-black/8 bg-white/70 px-3.5 py-2.5 backdrop-blur-sm">
      <span className="flex gap-1.5" aria-hidden>
        <span className="size-2.5 rounded-full bg-[#ff5f57]" />
        <span className="size-2.5 rounded-full bg-[#febc2e]" />
        <span className="size-2.5 rounded-full bg-[#28c840]" />
      </span>
      <span className="mono-label ml-2 truncate rounded-md bg-stone-soft px-2.5 py-1 text-[10px] text-slate-mid">
        {domain}
      </span>
    </div>
  );
}

/** One large browser-framed screenshot card. Cards stack with gaps and scroll
 * up naturally past the sticky copy column. `data-reveal` lets each card rise in
 * as it enters; `sceneIndex` marks it as a scrollytelling scene (see
 * ProjectStory). `priority` flags an above-the-fold image for the LCP. */
export function ShotCard({
  src,
  domain,
  alt,
  onError,
  priority = false,
  sceneIndex,
}: {
  src: string;
  domain: string;
  alt: string;
  onError?: () => void;
  priority?: boolean;
  sceneIndex?: number;
}): React.JSX.Element {
  return (
    <figure
      data-reveal
      data-scene={sceneIndex}
      className="overflow-hidden rounded-xl border border-black/10 bg-white shadow-[0_30px_70px_-32px_rgba(23,23,28,0.55)]"
    >
      <BrowserBar domain={domain} />
      <Image
        src={src}
        alt={alt}
        width={1600}
        height={812}
        priority={priority}
        sizes="(max-width: 768px) 100vw, 62vw"
        className="block h-auto w-full"
        onError={onError}
      />
    </figure>
  );
}

/**
 * Project media: a stack of large, spaced browser-framed screenshots that scroll
 * up past the sticky copy. Falls back to the hand-drawn mockup when no image is
 * available or one fails to load.
 */
export function ProjectMedia({ project }: { project: Project }): React.JSX.Element {
  const [failed, setFailed] = useState(false);
  const { images } = project;
  const showShots = !failed && Array.isArray(images) && images.length > 0;

  if (showShots) {
    return (
      <div className="flex flex-col gap-8 md:gap-12">
        {images.map((src, i) => (
          <ShotCard
            key={src}
            src={src}
            domain={project.domain}
            alt={`${project.name} — live site, view ${i + 1}`}
            priority={i === 0}
            onError={() => setFailed(true)}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative aspect-16/11 overflow-hidden rounded-lg [perspective:1200px]",
        project.visual === "console"
          ? "bg-deep-green bg-[radial-gradient(120%_120%_at_20%_0%,#0d352d_0%,#071f1a_55%,#06130f_100%)]"
          : "bg-stone-soft",
      )}
    >
      <div className="absolute inset-[-6%] [transform-style:preserve-3d]">
        <Mock project={project} />
      </div>
    </div>
  );
}
