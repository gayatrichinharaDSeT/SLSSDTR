import { AlertCircle, CheckCircle2 } from "lucide-react";

type FormNoticeProps = {
  tone: "success" | "error";
  children: string;
};

export default function FormNotice({ tone, children }: FormNoticeProps) {
  const Icon = tone === "success" ? CheckCircle2 : AlertCircle;
  const color = tone === "success" ? "text-green-dark" : "text-red-600";

  return (
    <p role="status" aria-live="polite" className={`flex items-start gap-2 text-sm font-medium ${color}`}>
      <Icon className="mt-0.5 h-4 w-4 shrink-0" strokeWidth={2} aria-hidden="true" />
      <span>{children}</span>
    </p>
  );
}
