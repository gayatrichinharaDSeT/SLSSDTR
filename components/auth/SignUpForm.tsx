"use client";

import { useState, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { signUp } from "@/lib/auth-client";
import { signUpSchema } from "@/lib/validations/auth";
import FormField from "./FormField";
import PasswordField from "./PasswordField";
import SubmitButton from "./SubmitButton";
import FormNotice from "./FormNotice";

export default function SignUpForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/dashboard";

  const [pending, setPending] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError(null);

    const formData = new FormData(event.currentTarget);
    const values = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      password: String(formData.get("password") ?? ""),
    };

    const parsed = signUpSchema.safeParse(values);
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

    const { error } = await signUp.email({
      name: parsed.data.name,
      email: parsed.data.email,
      password: parsed.data.password,
    });

    setPending(false);

    if (error) {
      setFormError(error.message ?? "Could not create your account. Please try again.");
      return;
    }

    router.push(redirectTo);
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
      <FormField
        id="name"
        name="name"
        label="Full name"
        type="text"
        placeholder="Your full name"
        autoComplete="name"
        required
        error={fieldErrors.name}
      />
      <FormField
        id="email"
        name="email"
        label="Email"
        type="email"
        placeholder="you@example.com"
        autoComplete="email"
        required
        error={fieldErrors.email}
      />
      <PasswordField
        id="password"
        name="password"
        label="Password"
        placeholder="At least 8 characters"
        autoComplete="new-password"
        required
        error={fieldErrors.password}
      />

      <SubmitButton pending={pending} pendingLabel="Creating account...">
        Create Account
      </SubmitButton>

      {formError ? <FormNotice tone="error">{formError}</FormNotice> : null}

      <p className="text-center text-sm text-ink">
        Already have an account?{" "}
        <Link href="/login" className="font-semibold text-green hover:text-green-dark">
          Sign in
        </Link>
      </p>
    </form>
  );
}
