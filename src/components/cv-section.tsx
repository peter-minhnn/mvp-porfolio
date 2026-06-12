"use client";

import { useRef } from "react";
import { DownloadIcon, ExternalLinkIcon, FileTextIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { CvPreviewDialog } from "@/components/cv-dialog";
import { site } from "@/content/site";
import { useReveal } from "@/lib/use-reveal";

/** Stylized paper-stack illustration — a CSS 3D nod without any WebGL. */
function CvIllustration() {
  return (
    <div aria-hidden className="relative mx-auto h-56 w-44 [perspective:900px] sm:h-64 sm:w-52">
      <div className="absolute inset-0 translate-x-4 translate-y-4 rounded-sm border border-ink/15 bg-canvas [transform:rotate(6deg)]" />
      <div className="absolute inset-0 translate-x-2 translate-y-2 rounded-sm border border-ink/20 bg-canvas [transform:rotate(3deg)]" />
      <div className="absolute inset-0 flex flex-col gap-3 rounded-sm border border-ink/25 bg-white p-5">
        <div className="flex items-center gap-2">
          <FileTextIcon className="size-5 text-deep-green" />
          <div className="h-2 w-20 rounded-full bg-primary/30" />
        </div>
        <div className="mt-2 h-2 w-3/4 rounded-full bg-primary/15" />
        <div className="h-2 w-2/3 rounded-full bg-primary/15" />
        <div className="h-2 w-4/5 rounded-full bg-primary/10" />
        <div className="mt-3 h-2 w-1/2 rounded-full bg-primary/15" />
        <div className="h-2 w-3/5 rounded-full bg-primary/10" />
        <div className="mt-auto flex gap-1.5">
          <span className="mono-label rounded-xl border border-hairline px-2 py-0.5 text-[9px] text-slate-mid">
            PDF
          </span>
          <span className="mono-label rounded-xl border border-hairline px-2 py-0.5 text-[9px] text-slate-mid">
            EN
          </span>
        </div>
      </div>
    </div>
  );
}

/**
 * CV section: preview in an in-page dialog, direct download, and a new-tab
 * fallback link — all pointing at the static PDF in /public/files.
 */
export function CvSection() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

  return (
    <section ref={ref} id="cv" className="bg-canvas">
      <div className="container-site py-24 md:py-32">
        <div className="grid items-center gap-12 rounded-lg bg-stone-soft p-8 md:grid-cols-[1fr_auto] md:p-14">
          <div className="flex max-w-xl flex-col items-start">
            <p data-reveal className="mono-label text-xs text-slate-mid">
              {site.cv.eyebrow}
            </p>
            <h2
              data-reveal
              className="font-display mt-4 text-[clamp(2rem,4vw,3.25rem)] leading-[1.08] tracking-[-0.02em] text-primary"
            >
              {site.cv.heading}
            </h2>
            <p data-reveal className="mt-5 text-base leading-relaxed text-ink/75">
              {site.cv.body}
            </p>

            <div data-reveal className="mt-9 flex flex-wrap items-center gap-5">
              <CvPreviewDialog>
                <Button size="lg">{site.cv.previewLabel}</Button>
              </CvPreviewDialog>
              <Button asChild variant="outline" size="lg">
                <a href={site.cv.file} download={site.cv.fileName}>
                  <DownloadIcon className="size-4" />
                  {site.cv.downloadLabel}
                </a>
              </Button>
              <Button asChild variant="link" size="none" className="text-ink">
                <a href={site.cv.file} target="_blank" rel="noreferrer">
                  {site.cv.newTabLabel}
                  <ExternalLinkIcon className="size-3.5" />
                </a>
              </Button>
            </div>
          </div>

          <div data-reveal className="hidden md:block">
            <CvIllustration />
          </div>
        </div>
      </div>
    </section>
  );
}
