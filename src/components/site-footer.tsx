import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { site } from "@/content/site";

/**
 * Near-black footer: wordmark + note, link columns, muted legal microcopy.
 */
export function SiteFooter() {
  return (
    <footer className="bg-primary text-white">
      <div className="container-site grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr] md:py-20">
        <div className="flex flex-col items-start gap-5">
          <span className="font-display text-lg tracking-tight">
            {site.profile.wordmark}
          </span>
          <p className="max-w-72 text-sm leading-relaxed text-white/55">
            {site.footer.note}
          </p>
          <Tooltip>
            <TooltipTrigger asChild>
              <a
                href={`mailto:${site.profile.email}`}
                className="text-sm text-white underline decoration-white/40 decoration-1 underline-offset-4 hover:decoration-white"
              >
                {site.profile.email}
              </a>
            </TooltipTrigger>
            <TooltipContent className="bg-white text-primary">
              The fastest way to reach me
            </TooltipContent>
          </Tooltip>
        </div>

        {site.footer.columns.map((column) => (
          <nav key={column.title} aria-label={column.title}>
            <h3 className="mono-label text-[11px] text-white/45">
              {column.title}
            </h3>
            <ul className="mt-5 flex flex-col gap-3">
              {column.links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-white/75 transition-colors hover:text-white"
                    {...(link.href.startsWith("http")
                      ? { target: "_blank", rel: "noreferrer" }
                      : {})}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="border-t border-white/10">
        <div className="container-site flex flex-col gap-2 py-6 text-xs text-white/40 md:flex-row md:items-center md:justify-between">
          <p>{site.footer.legal}</p>
          <p className="mono-label text-[10px]">{site.profile.location}</p>
        </div>
      </div>
    </footer>
  );
}
