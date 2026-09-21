"use client";

import { useState, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { resetPassword } from "@/lib/auth-client";
import { resetPasswordSchema } from "@/lib/validations/auth";
import FormField from "./FormField";
import SubmitButton from "./SubmitButton";
import FormNotice from "./FormNotice";

export default function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";

  const [pending, setPending] = useState(false);
  const [fieldError, setFieldError] = useState<string | undefined>();
  const [formError, setFormError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  if (!token) {
    return (
      <FormNotice tone="error">
        This reset link is invalid or has expired. Request a new one from the forgot password
        page.
      </FormNotice>
    );
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError(null);

    const formData = new FormData(event.currentTarget);
    const parsed = resetPasswordSchema.safeParse({
      token,
      password: String(formData.get("password") ?? ""),
    });

    if (!parsed.success) {
      setFieldError(parsed.error.issues.find((issue) => issue.path[0] === "password")?.message);
      return;
    }
    setFieldError(undefined);
    setPending(true);

    const { error } = await resetPassword({
      newPassword: parsed.data.password,
      token: parsed.data.token,
    });

    setPending(false);

    if (error) {
      setFormError(error.message ?? "This reset link is invalid or has expired.");
      return;
    }

    setDone(true);
    setTimeout(() => router.push("/login"), 1500);
  }

  if (done) {
    return (
      <FormNotice tone="success">Password updated. Redirecting you to sign in...</FormNotice>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
      <FormField
        id="password"
        name="password"
        label="New password"
        type="password"
        placeholder="At least 8 characters"
        autoComplete="new-password"
        required
        error={fieldError}
      />

      <SubmitButton pending={pending} pendingLabel="Updating...">
        Update Password
      </SubmitButton>

      {formError ? <FormNotice tone="error">{formError}</FormNotice> : null}

      <p className="text-center text-sm text-ink">
        <Link href="/login" className="font-semibold text-green hover:text-green-dark">
          Back to sign in
        </Link>
      </p>
    </form>
  );
}
