import type { LucideIcon } from "lucide-react";

type IconBoxProps = {
  icon: LucideIcon;
  tone?: "green" | "blue" | "navy" | "yellow";
  size?: "sm" | "md";
  className?: string;
};

const toneClasses: Record<NonNullable<IconBoxProps["tone"]>, string> = {
  green: "bg-mist text-green",
  blue: "bg-blue/10 text-blue",
  navy: "bg-navy/5 text-navy",
  yellow: "bg-yellow/20 text-navy",
};

const sizeClasses: Record<NonNullable<IconBoxProps["size"]>, string> = {
  sm: "h-9 w-9",
  md: "h-12 w-12",
};

const iconSizeClasses: Record<NonNullable<IconBoxProps["size"]>, string> = {
  sm: "h-4 w-4",
  md: "h-5 w-5",
};

export default function IconBox({
  icon: Icon,
  tone = "green",
  size = "md",
  className = "",
}: IconBoxProps) {
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-[10px] ${sizeClasses[size]} ${toneClasses[tone]} ${className}`}
      aria-hidden="true"
    >
      <Icon className={iconSizeClasses[size]} strokeWidth={1.75} />
    </span>
  );
}
