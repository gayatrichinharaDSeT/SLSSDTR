import type { ReactNode } from "react";

type BadgeProps = {
  children: ReactNode;
  tone?: "green" | "yellow" | "blue" | "navy";
  className?: string;
};

const toneClasses: Record<NonNullable<BadgeProps["tone"]>, string> = {
  green: "bg-mist text-green-dark",
  yellow: "bg-yellow/20 text-navy",
  blue: "bg-blue/10 text-blue",
  navy: "bg-navy text-white",
};

export default function Badge({ children, tone = "green", className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold font-heading tracking-wide ${toneClasses[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
