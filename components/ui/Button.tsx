import Link from "next/link";
import type { ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "inverse" | "inverseOutline";

type BaseProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
};

type ButtonAsLink = BaseProps & {
  href: string;
  type?: never;
};

type ButtonAsButton = BaseProps & {
  href?: never;
  type?: "button" | "submit" | "reset";
};

type ButtonProps = ButtonAsLink | ButtonAsButton;

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-navy text-white shadow-sm hover:-translate-y-0.5 hover:bg-green hover:shadow-lg hover:shadow-green/25 focus-visible:bg-green active:translate-y-0",
  secondary:
    "bg-transparent text-navy border border-navy hover:-translate-y-0.5 hover:border-green hover:bg-navy hover:text-white hover:shadow-lg hover:shadow-navy/15 active:translate-y-0",
  ghost:
    "bg-transparent text-navy underline underline-offset-4 hover:text-green-dark",
  // For use on dark (navy) backgrounds — a solid variant should never be built by overriding
  // primary's bg/text via className, since conflicting utilities (bg-navy vs bg-white) race
  // in the compiled stylesheet and can render invisible white-on-white text.
  inverse:
    "bg-white text-navy shadow-sm hover:-translate-y-0.5 hover:bg-yellow hover:shadow-lg hover:shadow-yellow/20 active:translate-y-0",
  inverseOutline:
    "bg-transparent text-white border border-white/70 hover:-translate-y-0.5 hover:border-white hover:bg-white hover:text-navy hover:shadow-lg hover:shadow-black/10 active:translate-y-0",
};

const baseClasses =
  "inline-flex items-center justify-center gap-2 rounded-btn px-6 py-3 text-sm font-semibold font-heading transition-all duration-200 whitespace-nowrap";

export default function Button({
  children,
  variant = "primary",
  className = "",
  href,
  type,
}: ButtonProps) {
  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type ?? "button"} className={classes}>
      {children}
    </button>
  );
}
