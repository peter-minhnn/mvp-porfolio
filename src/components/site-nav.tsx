"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { MenuIcon, XIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { mailto, site } from "@/content/site";
import { cn } from "@/lib/utils";

function AnnouncementBar() {
  const [open, setOpen] = useState(true);
  const reduced = useReducedMotion();

  return (
    <AnimatePresence initial={false}>
      {open && (
        <motion.div
          initial={false}
          exit={reduced ? { opacity: 0 } : { height: 0, opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className="overflow-hidden bg-black text-white"
        >
          <div className="container-site relative flex h-9 items-center justify-center gap-3 text-xs">
            <p className="truncate">
              {site.announcement.text}{" "}
              <a
                href={mailto()}
                className="underline decoration-1 underline-offset-2 hover:decoration-2"
              >
                {site.announcement.linkLabel}
              </a>
            </p>
            <button
              type="button"
              aria-label="Dismiss announcement"
              onClick={() => setOpen(false)}
              className="absolute right-4 p-1 text-white/70 hover:text-white"
            >
              <XIcon className="size-3.5" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <AnnouncementBar />

      <header
        className={cn(
          "sticky top-0 z-40 border-b transition-colors duration-300",
          scrolled
            ? "border-hairline bg-canvas/90 backdrop-blur-md"
            : "border-transparent bg-canvas",
        )}
      >
        <nav
          aria-label="Main"
          className="container-site flex h-16 items-center justify-between md:grid md:grid-cols-3"
        >
          {/* Wordmark */}
          <a
            href="#top"
            className="font-display justify-self-start text-[17px] tracking-tight text-primary"
          >
            {site.profile.wordmark}
          </a>

          {/* Centered links (desktop) */}
          <ul className="hidden items-center gap-7 justify-self-center md:flex">
            {site.nav.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="group relative py-2 text-sm text-ink/80 transition-colors hover:text-ink"
                >
                  {link.label}
                  <span
                    aria-hidden
                    className="absolute inset-x-0 -bottom-px h-px origin-left scale-x-0 bg-ink transition-transform duration-300 group-hover:scale-x-100"
                  />
                </a>
              </li>
            ))}
          </ul>

          {/* CTA (desktop) + menu (mobile) */}
          <div className="flex items-center gap-3 justify-self-end">
            <motion.div
              whileTap={reduced ? undefined : { scale: 0.97 }}
              className="hidden md:block"
            >
              <Button asChild size="sm">
                <a href={mailto()}>{site.hero.contactCta.label}</a>
              </Button>
            </motion.div>

            <Sheet>
              <SheetTrigger asChild>
                <button
                  type="button"
                  aria-label="Open menu"
                  className="rounded-xs p-2 text-ink md:hidden"
                >
                  <MenuIcon className="size-5" />
                </button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetTitle className="sr-only">Menu</SheetTitle>
                <SheetDescription className="sr-only">Site navigation</SheetDescription>
                <div className="flex h-full flex-col px-7 pt-20 pb-8">
                  <ul className="flex flex-col">
                    {site.nav.map((link, i) => (
                      <motion.li
                        key={link.href}
                        initial={reduced ? false : { opacity: 0, x: 16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.05 * i, duration: 0.3 }}
                        className="border-b border-hairline"
                      >
                        <SheetClose asChild>
                          <a
                            href={link.href}
                            className="font-display block py-4 text-2xl tracking-tight text-primary"
                          >
                            {link.label}
                          </a>
                        </SheetClose>
                      </motion.li>
                    ))}
                  </ul>
                  <div className="mt-auto flex flex-col gap-4">
                    <p className="mono-label text-[11px] text-slate-mid">
                      {site.profile.availability}
                    </p>
                    <SheetClose asChild>
                      <Button asChild size="lg" className="w-full">
                        <a href={mailto()}>{site.hero.contactCta.label}</a>
                      </Button>
                    </SheetClose>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </header>
    </>
  );
}
