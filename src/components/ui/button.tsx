import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * Pill CTA system per DESIGN.md: near-black pill primary, white pill on dark
 * bands, outlined pill for taxonomy-ish actions, underlined text link for
 * secondary actions.
 */
const buttonVariants = cva(
  "inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors duration-200 outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary: "rounded-pill bg-primary text-white hover:bg-black active:bg-black",
        inverted: "rounded-pill bg-white text-primary hover:bg-stone-soft active:bg-stone-soft",
        outline:
          "rounded-pill border border-primary/25 bg-transparent text-primary hover:border-primary",
        "outline-light":
          "rounded-pill border border-white/30 bg-transparent text-white hover:border-white",
        link: "h-auto rounded-none p-0 text-current underline decoration-1 underline-offset-4 hover:decoration-2",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        default: "h-11 px-6 text-sm",
        lg: "h-12 px-7 text-[15px]",
        none: "",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
