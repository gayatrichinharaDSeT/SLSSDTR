import type { LucideIcon } from "lucide-react";
import IconBox from "@/components/ui/IconBox";

type StatCardProps = {
  icon: LucideIcon;
  label: string;
  value: string | number;
  tone?: "green" | "blue" | "navy" | "yellow";
};

export default function StatCard({ icon, label, value, tone = "green" }: StatCardProps) {
  const isLongText = typeof value === "string" && value.length > 18;

  return (
    <div className="flex items-center gap-4 rounded-card border border-navy/10 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-green/40 hover:shadow-lg hover:shadow-navy/5">
      <IconBox icon={icon} tone={tone} size="md" />
      <div className="min-w-0 flex-1">
        <p
          className={`truncate font-heading font-bold text-navy ${isLongText ? "text-base" : "text-2xl"}`}
          title={typeof value === "string" ? value : undefined}
        >
          {value}
        </p>
        <p className="text-sm text-ink/70">{label}</p>
      </div>
    </div>
  );
}
