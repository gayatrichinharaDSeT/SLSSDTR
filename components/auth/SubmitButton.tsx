import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";

type SubmitButtonProps = {
  pending: boolean;
  children: ReactNode;
  pendingLabel: string;
};

// Same interaction language as ContactForm.tsx's submit button (group
// hover-slide icon, navy → green, disabled state) kept consistent here.
export default function SubmitButton({ pending, children, pendingLabel }: SubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={pending}
      className="group inline-flex w-full items-center justify-center gap-2 rounded-btn bg-navy px-6 py-3 text-sm font-semibold font-heading text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-green hover:shadow-lg hover:shadow-green/20 disabled:pointer-events-none disabled:opacity-60"
    >
      {pending ? pendingLabel : children}
      <ArrowRight
        className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
        strokeWidth={2}
        aria-hidden="true"
      />
    </button>
  );
}
