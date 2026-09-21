"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { requestPasswordReset } from "@/lib/auth-client";
import { forgotPasswordSchema } from "@/lib/validations/auth";
import FormField from "./FormField";
import SubmitButton from "./SubmitButton";
import FormNotice from "./FormNotice";

export default function ForgotPasswordForm() {
  const [pending, setPending] = useState(false);
  const [fieldError, setFieldError] = useState<string | undefined>();
  const [sent, setSent] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError(null);

    const formData = new FormData(event.currentTarget);
    const parsed = forgotPasswordSchema.safeParse({
      email: String(formData.get("email") ?? ""),
    });

    if (!parsed.success) {
      setFieldError(parsed.error.issues[0]?.message);
      return;
    }
    setFieldError(undefined);
    setPending(true);

    const { error } = await requestPasswordReset({
      email: parsed.data.email,
      redirectTo: "/reset-password",
    });

    setPending(false);

    // Always show the same success state regardless of whether the email
    // matched an account — confirming non-existence here would let an
    // attacker enumerate registered emails.
    if (!error) {
      setSent(true);
    } else {
      setFormError("Something went wrong. Please try again.");
    }
  }

  if (sent) {
    return (
      <FormNotice tone="success">
        If an account exists for that email, a reset link is on its way.
      </FormNotice>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
      <FormField
        id="email"
        name="email"
        label="Email"
        type="email"
        placeholder="you@example.com"
        autoComplete="email"
        required
        error={fieldError}
      />

      <SubmitButton pending={pending} pendingLabel="Sending link...">
        Send Reset Link
      </SubmitButton>

      {formError ? <FormNotice tone="error">{formError}</FormNotice> : null}

      <p className="text-center text-sm text-ink">
        Remembered your password?{" "}
        <Link href="/login" className="font-semibold text-green hover:text-green-dark">
          Sign in
        </Link>
      </p>
    </form>
  );
}
