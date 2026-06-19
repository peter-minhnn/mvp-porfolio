import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Taxonomy chip per DESIGN.md `blog-filter-chip` / pill-outline: coral outline
 * with pale fill, coral fill when "active", quiet neutral, and a dark-band
 * variant.
 */
const badgeVariants = cva(
  "mono-label inline-flex w-fit shrink-0 items-center justify-center gap-1.5 rounded-xl border px-3 py-1 text-[11px] whitespace-nowrap transition-colors",
  {
    variants: {
      variant: {
        coral: "border-coral bg-coral-soft/15 text-ink",
        "coral-fill": "border-coral bg-coral text-primary",
        neutral: "border-hairline bg-transparent text-slate-mid",
        dark: "border-white/25 bg-white/5 text-white/85",
        green: "border-deep-green/30 bg-wash-green text-deep-green",
      },
    },
    defaultVariants: {
      variant: "coral",
    },
  },
);

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span";
  return (
    <Comp data-slot="badge" className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
