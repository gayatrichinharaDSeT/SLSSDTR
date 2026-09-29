"use client";

import { useEffect, useState, type FormEvent } from "react";
import { X } from "lucide-react";
import ModalPortal from "@/components/ui/ModalPortal";
import FormField, { fieldLabelClasses, fieldInputClasses } from "@/components/auth/FormField";
import SubmitButton from "@/components/auth/SubmitButton";
import FormNotice from "@/components/auth/FormNotice";
import { startRegistrationSchema } from "@/lib/validations/registration";
import { loadRazorpayCheckout, openRazorpayCheckout } from "@/lib/razorpay-checkout";

type ProgramRegistrationModalProps = {
  programId: string;
  programName: string;
  batches: { id: string; label: string; monthLabel: string }[];
  onClose: () => void;
};

type Stage = "form" | "paying" | "success";

export default function ProgramRegistrationModal({
  programId,
  programName,
  batches,
  onClose,
}: ProgramRegistrationModalProps) {
  const [stage, setStage] = useState<Stage>("form");
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
      preferredBatch: String(formData.get("preferredBatch") ?? ""),
    };

    const parsed = startRegistrationSchema.safeParse(values);
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
    setStage("paying");

    try {
      const createResponse = await fetch("/api/payments/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const createResult = await createResponse.json().catch(() => null);

      if (!createResponse.ok || !createResult?.success) {
        setNotice({
          tone: "error",
          message: createResult?.error?.message ?? "Could not start payment. Please try again.",
        });
        setStage("form");
        return;
      }

      const { registrationId, orderId, keyId, amount, currency } = createResult.data;

      await loadRazorpayCheckout();

      openRazorpayCheckout({
        key: keyId,
        amount,
        currency,
        order_id: orderId,
        name: "SLSSDTR",
        description: programName,
        prefill: { name: parsed.data.name, email: parsed.data.email, contact: parsed.data.phone },
        theme: { color: "#212B4D" },
        handler: async (response) => {
          const verifyResponse = await fetch("/api/payments/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ registrationId, ...response }),
          });
          const verifyResult = await verifyResponse.json().catch(() => null);

          if (!verifyResponse.ok || !verifyResult?.success) {
            setNotice({
              tone: "error",
              message:
                verifyResult?.error?.message ??
                "We couldn't confirm your payment automatically. If money was deducted, please contact us — we'll verify it manually.",
            });
            setStage("form");
            return;
          }

          setStage("success");
        },
        modal: {
          ondismiss: () => setStage("form"),
        },
      });
    } catch (error) {
      setNotice({
        tone: "error",
        message: error instanceof Error ? error.message : "Something went wrong. Please try again.",
      });
      setStage("form");
    }
  }

  return (
    <ModalPortal>
      <div
        className="fixed inset-0 z-100 flex items-center justify-center bg-navy/50 p-4 backdrop-blur-sm"
        onClick={stage === "paying" ? undefined : onClose}
      >
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="registration-modal-title"
          onClick={(event) => event.stopPropagation()}
          className="flex max-h-[90vh] w-full max-w-md flex-col gap-5 overflow-y-auto rounded-card border border-navy/10 bg-white p-7 shadow-xl sm:p-8"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-green">Register &amp; Pay</p>
              <h2 id="registration-modal-title" className="font-heading text-xl font-bold text-navy">
                {programName}
              </h2>
            </div>
            {stage !== "paying" ? (
              <button
                type="button"
                onClick={onClose}
                aria-label="Close registration form"
                className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-ink/60 transition-colors hover:bg-grey hover:text-navy"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            ) : null}
          </div>

          {stage === "success" ? (
            <FormNotice tone="success">
              {`Payment received — you're registered for ${programName}. A confirmation will follow shortly.`}
            </FormNotice>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
              <div className="grid gap-4 sm:grid-cols-2">
                <FormField id="reg-name" name="name" label="Name" type="text" required error={fieldErrors.name} />
                <FormField id="reg-email" name="email" label="Email" type="email" required error={fieldErrors.email} />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <FormField id="reg-phone" name="phone" label="Phone" type="tel" required error={fieldErrors.phone} />
                <FormField
                  id="reg-organization"
                  name="organization"
                  label="Organization"
                  type="text"
                  placeholder="Optional"
                  error={fieldErrors.organization}
                />
              </div>
              {batches.length > 0 ? (
                <div>
                  <label htmlFor="reg-preferredBatch" className={fieldLabelClasses}>
                    Preferred Batch
                  </label>
                  <select
                    id="reg-preferredBatch"
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

              <SubmitButton pending={stage === "paying"} pendingLabel="Opening payment...">
                Continue to Payment
              </SubmitButton>

              {notice?.tone === "error" ? <FormNotice tone="error">{notice.message}</FormNotice> : null}
            </form>
          )}
        </div>
      </div>
    </ModalPortal>
  );
}
