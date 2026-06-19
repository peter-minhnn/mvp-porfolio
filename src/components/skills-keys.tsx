"use client";

import { useRef } from "react";

import { type Skill, site } from "@/content/site";
import { useReveal } from "@/lib/use-reveal";

/**
 * 3D "keycap" skill button: a raised cap sitting on a darker base. On hover
 * (or keyboard focus) the cap presses down like a real key — pure CSS
 * transforms, no JS, so it stays cheap and reduced-motion friendly.
 */
function SkillKey({ skill }: { skill: Skill }): React.JSX.Element {
  return (
    <li className="[perspective:600px]">
      <button
        type="button"
        className="group relative block cursor-default outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus"
      >
        {/* Base / shadow edge of the key */}
        <span
          aria-hidden="true"
          className="absolute inset-0 translate-y-[7px] rounded-md bg-ink/20"
        />
        {/* Cap */}
        <span className="relative flex items-center gap-3 rounded-md border border-ink/15 bg-white px-5 py-3.5 transition-transform duration-150 ease-out group-hover:translate-y-[5px] group-focus-visible:translate-y-[5px] motion-reduce:transition-none">
          {/* biome-ignore lint/performance/noImgElement: static decorative SVG logo, next/image adds no benefit */}
          <img
            src={skill.icon}
            alt=""
            width={24}
            height={24}
            loading="lazy"
            className="size-6 shrink-0"
          />
          <span className="text-sm font-medium text-primary">{skill.name}</span>
        </span>
      </button>
    </li>
  );
}

export function SkillsKeys() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

  return (
    <section ref={ref} id="skills" className="bg-canvas">
      <div className="container-site py-24 md:py-32">
        <div className="max-w-2xl">
          <p data-reveal className="mono-label text-xs text-slate-mid">
            {site.skills.eyebrow}
          </p>
          <h2
            data-reveal
            className="font-display mt-4 text-[clamp(2rem,4vw,3.25rem)] leading-[1.08] tracking-[-0.02em] text-primary"
          >
            {site.skills.heading}
          </h2>
          <p data-reveal className="mt-5 max-w-xl text-base leading-relaxed text-ink/75">
            {site.skills.lead}
          </p>
        </div>

        <ul data-reveal className="mt-12 flex flex-wrap gap-x-4 gap-y-5 pb-2">
          {site.skills.items.map((skill) => (
            <SkillKey key={skill.name} skill={skill} />
          ))}
        </ul>
      </div>
    </section>
  );
}
