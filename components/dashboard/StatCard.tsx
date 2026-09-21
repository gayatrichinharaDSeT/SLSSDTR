import type { LucideIcon } from "lucide-react";
import IconBox from "@/components/ui/IconBox";

type StatCardProps = {
  icon: LucideIcon;
  label: string;
  value: string | number;
  tone?: "green" | "blue" | "navy" | "yellow";
};

export default function StatCard({ icon, label, value, tone = "green" }: StatCardProps) {
  return (
    <div className="flex items-center gap-4 rounded-card border border-navy/10 bg-white p-6 shadow-sm">
      <IconBox icon={icon} tone={tone} size="md" />
      <div>
        <p className="text-2xl font-bold font-heading text-navy">{value}</p>
        <p className="text-sm text-ink/70">{label}</p>
      </div>
    </div>
  );
}
