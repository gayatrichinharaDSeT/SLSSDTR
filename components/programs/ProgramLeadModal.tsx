"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, X } from "lucide-react";
import ModalPortal from "@/components/ui/ModalPortal";
import FormField from "@/components/auth/FormField";
import SubmitButton from "@/components/auth/SubmitButton";
import FormNotice from "@/components/auth/FormNotice";
import { programLeadSchema, buildLeadEnquiryPayload } from "@/lib/validations/enquiry";

type ProgramLeadModalProps = {
  programId: string;
  programName: string;
  onClose: () => void;
};

// Gates navigation into a program's detail page behind a short lead-capture
// form: fill name/phone/email → see a thank-you greeting → then the
// program page opens. Requested directly by the client (program pages'
// "Explore Program" cards), distinct from the fuller "Enquire Now" form
// already on the program detail page itself (ProgramEnquiryModal.tsx).
export default function ProgramLeadModal({ programId, programName, onClose }: ProgramLeadModalProps) {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  // Greeting shows for a moment, then the program page opens on its own —
  // no extra click needed once the visitor has already submitted.
  useEffect(() => {
    if (!submitted) return;
    const timer = setTimeout(() => {
      router.push(`/programs/${programId}`);
    }, 1800);
    return () => clearTimeout(timer);
  }, [submitted, programId, router]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const formData = new FormData(event.currentTarget);
    const parsed = programLeadSchema.safeParse({
      programId,
      name: String(formData.get("name") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      email: String(formData.get("email") ?? ""),
    });

    if (!parsed.success) {
      const errors: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0]);
        if (!errors[key]) errors[key] = issue.message;
      }
      setFieldErrors(errors);
      return;
    }
    setFieldErrors({});
    setPending(true);

    const response = await fetch("/api/program-enquiries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(buildLeadEnquiryPayload(parsed.data, programName)),
    });
    const result = await response.json().catch(() => null);

    setPending(false);

    if (!response.ok || !result?.success) {
      setError(result?.error?.message ?? "Something went wrong. Please try again.");
      return;
    }

    setSubmitted(true);
  }

  return (
    <ModalPortal>
    <div
      className="fixed inset-0 z-100 flex items-center justify-center bg-navy/50 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="lead-modal-title"
        onClick={(event) => event.stopPropagation()}
        className="flex w-full max-w-md flex-col gap-5 rounded-card border border-navy/10 bg-white p-7 shadow-xl sm:p-8"
      >
        {submitted ? (
          <div className="flex flex-col items-center gap-3 py-4 text-center">
            <CheckCircle2 className="h-10 w-10 text-green" strokeWidth={1.75} aria-hidden="true" />
            <h2 id="lead-modal-title" className="font-heading text-xl font-bold text-navy">
              Thank you!
            </h2>
            <p className="text-sm text-ink">
              Our expert will connect with you soon. Taking you to the {programName} program
              page...
            </p>
          </div>
        ) : (
          <>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-green">
                  Before You Continue
                </p>
                <h2 id="lead-modal-title" className="font-heading text-xl font-bold text-navy">
                  {programName}
                </h2>
                <p className="mt-1 text-sm text-ink/70">
                  Share your details and our expert will connect with you shortly.
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-ink/60 transition-colors hover:bg-grey hover:text-navy"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
              <FormField
                id="lead-name"
                name="name"
                label="Name"
                type="text"
                placeholder="Your full name"
                required
                error={fieldErrors.name}
              />
              <FormField
                id="lead-phone"
                name="phone"
                label="Phone"
                type="tel"
                placeholder="Your phone number"
                required
                error={fieldErrors.phone}
              />
              <FormField
                id="lead-email"
                name="email"
                label="Email"
                type="email"
                placeholder="you@example.com"
                required
                error={fieldErrors.email}
              />

              <SubmitButton pending={pending} pendingLabel="Submitting...">
                Submit &amp; Continue
              </SubmitButton>

              {error ? <FormNotice tone="error">{error}</FormNotice> : null}
            </form>
          </>
        )}
      </div>
    </div>
    </ModalPortal>
  );
}
