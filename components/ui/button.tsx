import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "magnetic inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[8px] text-sm font-medium outline-none transition focus-visible:ring-2 focus-visible:ring-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-pitch disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "border border-cyan/45 bg-cyan text-recessed shadow-glow hover:bg-cyan/85 hover:shadow-[0_0_52px_rgb(var(--accent-cyan-rgb)_/_0.35)]",
        secondary:
          "border border-white/12 bg-white/[0.06] text-silver hover:border-cyan/45 hover:bg-cyan/10",
        ghost:
          "border border-transparent bg-transparent text-muted hover:border-white/12 hover:bg-white/[0.06] hover:text-silver",
      },
      size: {
        default: "h-11 px-5",
        sm: "h-9 px-3",
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
