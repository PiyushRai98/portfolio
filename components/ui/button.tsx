import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Instrument Panel button variants.
 * --phosphor: interactive action (solid fill, void text)
 * --copper:   status/secondary (outline, no fill)
 * ghost:      minimal, graphite text
 *
 * Border-radius is 2px per brief (sharp, precise edges).
 * No drop shadows — depth comes from background layers.
 */
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[2px] font-mono text-sm font-medium outline-none transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-[var(--phosphor)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--void)] disabled:pointer-events-none disabled:opacity-40",
  {
    variants: {
      variant: {
        /** Primary CTA — phosphor fill, void text */
        primary:
          "border border-[var(--phosphor)] bg-[var(--phosphor)] text-[var(--void)] hover:bg-[rgb(var(--phosphor-rgb)/0.88)] hover:border-[rgb(var(--phosphor-rgb)/0.88)]",
        /** Default — same as primary */
        default:
          "border border-[var(--phosphor)] bg-[var(--phosphor)] text-[var(--void)] hover:bg-[rgb(var(--phosphor-rgb)/0.88)] hover:border-[rgb(var(--phosphor-rgb)/0.88)]",
        /** Secondary — phosphor outline, fills on hover */
        secondary:
          "border border-[var(--phosphor)] bg-transparent text-[var(--phosphor)] hover:bg-[var(--phosphor)] hover:text-[var(--void)]",
        /** Ghost — graphite text, minimal border on hover */
        ghost:
          "border border-transparent bg-transparent text-[var(--graphite)] hover:border-[var(--line)] hover:text-[var(--vellum)]",
      },
      size: {
        default: "h-11 px-5",
        sm: "h-9 px-3 text-xs",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";

export { Button, buttonVariants };
