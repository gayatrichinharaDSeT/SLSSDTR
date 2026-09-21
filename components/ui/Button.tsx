import Link from "next/link";
import type { ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";

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
    "bg-navy text-white hover:bg-green focus-visible:bg-green",
  secondary:
    "bg-transparent text-navy border border-navy hover:bg-navy hover:text-white",
  ghost:
    "bg-transparent text-navy hover:text-green underline underline-offset-4",
};

const baseClasses =
  "inline-flex items-center justify-center gap-2 rounded-btn px-6 py-3 text-sm font-semibold font-heading transition-colors duration-200 whitespace-nowrap";

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
