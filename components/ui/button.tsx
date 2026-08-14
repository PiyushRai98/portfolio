import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[2px] font-mono text-sm font-medium outline-none transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-[var(--phosphor)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--void)] disabled:pointer-events-none disabled:opacity-40",
  {
    variants: {
      variant: {
        primary:
          "border border-[var(--phosphor)] bg-[var(--phosphor)] text-[var(--void)] hover:bg-[rgb(var(--phosphor-rgb)/0.88)] hover:border-[rgb(var(--phosphor-rgb)/0.88)]",
        default:
          "border border-[var(--phosphor)] bg-[var(--phosphor)] text-[var(--void)] hover:bg-[rgb(var(--phosphor-rgb)/0.88)] hover:border-[rgb(var(--phosphor-rgb)/0.88)]",
        secondary:
          "border border-[var(--phosphor)] bg-transparent text-[var(--phosphor)] hover:bg-[var(--phosphor)] hover:text-[var(--void)]",
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

/* ── Button — for <button> elements only ─────────────────────────────────── */
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
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

/* ── ButtonLink — for <a> elements styled as buttons ─────────────────────── */
export interface ButtonLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof buttonVariants> {}

export const ButtonLink = React.forwardRef<HTMLAnchorElement, ButtonLinkProps>(
  ({ className, variant, size, ...props }, ref) => (
    <a
      ref={ref}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  ),
);
ButtonLink.displayName = "ButtonLink";
