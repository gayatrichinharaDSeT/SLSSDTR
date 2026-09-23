"use client";

import { useState, type FormEvent } from "react";
import FormField, { fieldInputClasses, fieldLabelClasses } from "@/components/auth/FormField";
import SubmitButton from "@/components/auth/SubmitButton";
import FormNotice from "@/components/auth/FormNotice";
import { customizedModuleRequestSchema, DEPARTMENTS } from "@/lib/validations/customized-module";
import { programs } from "@/data/programs";

export default function CustomizedModuleForm() {
  const [pending, setPending] = useState(false);
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [notice, setNotice] = useState<{ tone: "success" | "error"; message: string } | null>(null);

  function toggleDepartment(department: string) {
    setSelectedDepartments((prev) =>
      prev.includes(department) ? prev.filter((item) => item !== department) : [...prev, department]
    );
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNotice(null);

    const formData = new FormData(event.currentTarget);
    const values = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      organization: String(formData.get("organization") ?? ""),
      programId: String(formData.get("programId") ?? ""),
      departments: selectedDepartments,
      message: String(formData.get("message") ?? ""),
    };

    const parsed = customizedModuleRequestSchema.safeParse(values);
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

    const response = await fetch("/api/customized-modules", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(parsed.data),
    });
    const result = await response.json().catch(() => null);

    setPending(false);

    if (!response.ok || !result?.success) {
      setNotice({ tone: "error", message: result?.error?.message ?? "Something went wrong. Please try again." });
      return;
    }

    setNotice({ tone: "success", message: "Thank you — your request has been received. Our team will get back to you." });
    setSelectedDepartments([]);
  }

  if (notice?.tone === "success") {
    return <FormNotice tone="success">{notice.message}</FormNotice>;
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <FormField id="name" name="name" label="Name" type="text" required error={fieldErrors.name} />
        <FormField id="email" name="email" label="Email" type="email" required error={fieldErrors.email} />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField id="phone" name="phone" label="Phone" type="tel" placeholder="Optional" error={fieldErrors.phone} />
        <FormField
          id="organization"
          name="organization"
          label="Organization"
          type="text"
          placeholder="Optional"
          error={fieldErrors.organization}
        />
      </div>

      <div>
        <label htmlFor="programId" className={fieldLabelClasses}>
          Related Program (optional)
        </label>
        <select id="programId" name="programId" defaultValue="" className={`${fieldInputClasses} cursor-pointer`}>
          <option value="">Not specific to one program</option>
          {programs.map((program) => (
            <option key={program.slug} value={program.slug}>
              {program.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className={fieldLabelClasses}>Departments (select all that apply)</label>
        <div className="grid gap-2 sm:grid-cols-2">
          {DEPARTMENTS.map((department) => {
            const checked = selectedDepartments.includes(department);
            return (
              <label
                key={department}
                className={`flex cursor-pointer items-start gap-2 rounded-btn border px-3 py-2.5 text-sm transition-colors ${
                  checked ? "border-green bg-mist text-navy" : "border-navy/15 text-ink hover:border-navy/30"
                }`}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggleDepartment(department)}
                  className="mt-0.5 h-4 w-4 shrink-0 accent-green"
                />
                <span>{department}</span>
              </label>
            );
          })}
        </div>
        {fieldErrors.departments ? (
          <p className="mt-1.5 text-xs font-medium text-red-600">{fieldErrors.departments}</p>
        ) : null}
      </div>

      <div>
        <label htmlFor="message" className={fieldLabelClasses}>
          Requirements / Message (optional)
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          placeholder="Tell us about the customization you need..."
          className={`${fieldInputClasses} resize-y`}
        />
      </div>

      <SubmitButton pending={pending} pendingLabel="Sending...">
        Submit Request
      </SubmitButton>

      {notice?.tone === "error" ? <FormNotice tone="error">{notice.message}</FormNotice> : null}
    </form>
  );
}
