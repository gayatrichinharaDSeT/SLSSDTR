"use client";

import { useState, type FormEvent } from "react";
import FormField from "@/components/auth/FormField";
import SubmitButton from "@/components/auth/SubmitButton";
import FormNotice from "@/components/auth/FormNotice";
import { updateProfileSchema } from "@/lib/validations/profile";

type ProfileFormProps = {
  initialName: string;
  initialPhone: string;
  initialOrganization: string;
};

export default function ProfileForm({ initialName, initialPhone, initialOrganization }: ProfileFormProps) {
  const [pending, setPending] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [notice, setNotice] = useState<{ tone: "success" | "error"; message: string } | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNotice(null);

    const formData = new FormData(event.currentTarget);
    const values = {
      name: String(formData.get("name") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      organization: String(formData.get("organization") ?? ""),
    };

    const parsed = updateProfileSchema.safeParse(values);
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

    const response = await fetch("/api/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(parsed.data),
    });
    const result = await response.json().catch(() => null);

    setPending(false);

    if (!response.ok || !result?.success) {
      setNotice({ tone: "error", message: result?.error?.message ?? "Could not update your profile." });
      return;
    }

    setNotice({ tone: "success", message: "Profile updated." });
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
      <FormField
        id="name"
        name="name"
        label="Name"
        type="text"
        defaultValue={initialName}
        required
        error={fieldErrors.name}
      />
      <FormField
        id="phone"
        name="phone"
        label="Phone"
        type="tel"
        defaultValue={initialPhone}
        placeholder="Optional"
        error={fieldErrors.phone}
      />
      <FormField
        id="organization"
        name="organization"
        label="Organization"
        type="text"
        defaultValue={initialOrganization}
        placeholder="Optional"
        error={fieldErrors.organization}
      />

      <SubmitButton pending={pending} pendingLabel="Saving...">
        Save Changes
      </SubmitButton>

      {notice ? <FormNotice tone={notice.tone}>{notice.message}</FormNotice> : null}
    </form>
  );
}
