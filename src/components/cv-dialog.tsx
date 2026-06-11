"use client";

import type { ReactNode } from "react";
import { DownloadIcon, ExternalLinkIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { site } from "@/content/site";

/**
 * In-page CV preview: wraps any trigger element and opens the PDF inside a
 * centered dialog with download + new-tab fallbacks. The iframe only mounts
 * while the dialog is open, so the PDF never loads on initial page render.
 */
export function CvPreviewDialog({ children }: { children: ReactNode }) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-h-[92svh]">
        <div className="flex flex-col gap-1 border-b border-hairline px-6 py-4 pr-14">
          <DialogTitle>CV — {site.profile.name}</DialogTitle>
          <DialogDescription>
            If the preview doesn&apos;t load,{" "}
            <a
              href={site.cv.file}
              target="_blank"
              rel="noreferrer"
              className="underline decoration-1 underline-offset-2 hover:decoration-2"
            >
              open the PDF in a new tab
            </a>
            .
          </DialogDescription>
        </div>

        {/* <object> renders the PDF where supported; nested fallback shows
            otherwise (e.g. most mobile browsers can't inline PDFs). */}
        <object
          data={`${site.cv.file}#view=FitH`}
          type="application/pdf"
          title={`CV preview — ${site.profile.name}`}
          className="h-[62svh] w-full bg-white"
        >
          <div className="flex h-full flex-col items-center justify-center gap-4 px-8 text-center">
            <p className="text-sm leading-relaxed text-ink/75">
              Your browser can&apos;t display the PDF inline.
            </p>
            <Button asChild size="sm">
              <a href={site.cv.file} target="_blank" rel="noreferrer">
                {site.cv.newTabLabel}
                <ExternalLinkIcon className="size-3.5" />
              </a>
            </Button>
          </div>
        </object>

        <div className="flex flex-wrap items-center gap-4 border-t border-hairline px-6 py-4">
          <Button asChild size="sm">
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
      </DialogContent>
    </Dialog>
  );
}
