import type { LucideIcon } from "lucide-react";
import IconBox from "@/components/ui/IconBox";

type EmptyStateProps = {
  icon: LucideIcon;
  message: string;
};

export default function EmptyState({ icon, message }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-card border border-dashed border-navy/15 bg-grey/50 p-10 text-center">
      <IconBox icon={icon} tone="navy" size="md" />
      <p className="text-sm text-ink/70">{message}</p>
    </div>
  );
}
