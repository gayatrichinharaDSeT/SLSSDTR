"use client";

import { useEffect, useState, type FormEvent } from "react";
import { X } from "lucide-react";
import ModalPortal from "@/components/ui/ModalPortal";
import FormField, { fieldLabelClasses, fieldInputClasses } from "@/components/auth/FormField";
import SubmitButton from "@/components/auth/SubmitButton";
import FormNotice from "@/components/auth/FormNotice";
import { programEnquirySchema } from "@/lib/validations/enquiry";

type ProgramEnquiryModalProps = {
  programId: string;
  programName: string;
  batches: { id: string; label: string; monthLabel: string }[];
  onClose: () => void;
};

export default function ProgramEnquiryModal({ programId, programName, batches, onClose }: ProgramEnquiryModalProps) {
  const [pending, setPending] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [notice, setNotice] = useState<{ tone: "success" | "error"; message: string } | null>(null);

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

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNotice(null);

    const formData = new FormData(event.currentTarget);
    const values = {
      programId,
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      organization: String(formData.get("organization") ?? ""),
      message: String(formData.get("message") ?? ""),
      preferredBatch: String(formData.get("preferredBatch") ?? ""),
    };

    const parsed = programEnquirySchema.safeParse(values);
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
      body: JSON.stringify(parsed.data),
    });
    const result = await response.json().catch(() => null);

    setPending(false);

    if (!response.ok || !result?.success) {
      setNotice({
        tone: "error",
        message: result?.error?.message ?? "Something went wrong. Please try again.",
      });
      return;
    }

    setNotice({ tone: "success", message: "Thank you — your enquiry has been received." });
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
        aria-labelledby="enquiry-modal-title"
        onClick={(event) => event.stopPropagation()}
        className="flex max-h-[90vh] w-full max-w-md flex-col gap-5 overflow-y-auto rounded-card border border-navy/10 bg-white p-7 shadow-xl sm:p-8"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-green">Enquire Now</p>
            <h2 id="enquiry-modal-title" className="font-heading text-xl font-bold text-navy">
              {programName}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close enquiry form"
            className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-ink/60 transition-colors hover:bg-grey hover:text-navy"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        {notice?.tone === "success" ? (
          <FormNotice tone="success">{notice.message}</FormNotice>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
            <div className="grid gap-4 sm:grid-cols-2">
              <FormField
                id="name"
                name="name"
                label="Name"
                type="text"
                required
                error={fieldErrors.name}
              />
              <FormField
                id="email"
                name="email"
                label="Email"
                type="email"
                required
                error={fieldErrors.email}
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <FormField
                id="phone"
                name="phone"
                label="Phone"
                type="tel"
                placeholder="Optional"
                error={fieldErrors.phone}
              />
              <FormField
                id="organization"
                name="organization"
                label="Organization"
                type="text"
                placeholder="Optional"
                error={fieldErrors.organization}
              />
            </div>
            {batches.length > 0 ? (
              <div>
                <label htmlFor="preferredBatch" className={fieldLabelClasses}>
                  Preferred Batch
                </label>
                <select
                  id="preferredBatch"
                  name="preferredBatch"
                  defaultValue=""
                  className={`${fieldInputClasses} cursor-pointer`}
                >
                  <option value="">No preference</option>
                  {batches.map((batch) => (
                    <option key={batch.id} value={`${batch.label} — ${batch.monthLabel}`}>
                      {batch.label} — {batch.monthLabel}
                    </option>
                  ))}
                </select>
              </div>
            ) : null}
            <div>
              <label htmlFor="message" className={fieldLabelClasses}>
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                required
                placeholder={`Tell us why you're interested in ${programName}...`}
                className={`${fieldInputClasses} resize-y`}
              />
              {fieldErrors.message ? (
                <p className="mt-1.5 text-xs font-medium text-red-600">{fieldErrors.message}</p>
              ) : null}
            </div>

            <SubmitButton pending={pending} pendingLabel="Sending...">
              Submit Enquiry
            </SubmitButton>

            {notice?.tone === "error" ? <FormNotice tone="error">{notice.message}</FormNotice> : null}
          </form>
        )}
      </div>
    </div>
    </ModalPortal>
  );
}
