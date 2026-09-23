"use client";

import { useState, type FormEvent } from "react";
import { Download } from "lucide-react";
import FormField, { fieldLabelClasses, fieldInputClasses } from "@/components/auth/FormField";
import SubmitButton from "@/components/auth/SubmitButton";
import FormNotice from "@/components/auth/FormNotice";
import { resourceLeadSchema } from "@/lib/validations/resource-lead";
import { PROFESSION_OPTIONS } from "@/lib/validations/profile";

export default function StrategicBriefForm() {
  const [pending, setPending] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError(null);

    const formData = new FormData(event.currentTarget);
    const values = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      profession: String(formData.get("profession") ?? ""),
      organization: String(formData.get("organization") ?? ""),
    };

    const parsed = resourceLeadSchema.safeParse(values);
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

    const response = await fetch("/api/resources/strategic-brief", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(parsed.data),
    });
    const result = await response.json().catch(() => null);

    setPending(false);

    if (!response.ok || !result?.success) {
      setFormError(result?.error?.message ?? "Something went wrong. Please try again.");
      return;
    }

    setDownloadUrl(result.data.downloadUrl);
  }

  if (downloadUrl) {
    return (
      <div className="flex flex-col items-center gap-4 text-center">
        <FormNotice tone="success">
          Thank you — your details have been received. Your download is ready below.
        </FormNotice>
        <a
          href={downloadUrl}
          className="inline-flex items-center justify-center gap-2 rounded-btn bg-navy px-6 py-3 text-sm font-semibold font-heading text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-green hover:shadow-lg hover:shadow-green/20"
        >
          <Download className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
          Download the Strategic Brief
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField id="brief-name" name="name" label="Name" type="text" required error={fieldErrors.name} />
        <FormField id="brief-email" name="email" label="Email" type="email" required error={fieldErrors.email} />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField
          id="brief-phone"
          name="phone"
          label="Mobile"
          type="tel"
          required
          error={fieldErrors.phone}
        />
        <div>
          <label htmlFor="brief-profession" className={fieldLabelClasses}>
            Profession
          </label>
          <select
            id="brief-profession"
            name="profession"
            defaultValue=""
            required
            className={`${fieldInputClasses} cursor-pointer`}
          >
            <option value="" disabled>
              Select your profession
            </option>
            {PROFESSION_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {fieldErrors.profession ? (
            <p className="mt-1.5 text-xs font-medium text-red-600">{fieldErrors.profession}</p>
          ) : null}
        </div>
      </div>
      <FormField
        id="brief-organization"
        name="organization"
        label="Organization / Company"
        type="text"
        placeholder="Optional"
        error={fieldErrors.organization}
      />

      <SubmitButton pending={pending} pendingLabel="Submitting...">
        Get the Strategic Brief
      </SubmitButton>

      {formError ? <FormNotice tone="error">{formError}</FormNotice> : null}
    </form>
  );
}
