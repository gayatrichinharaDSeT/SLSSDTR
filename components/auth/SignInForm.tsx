"use client";

import { useState, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { signIn } from "@/lib/auth-client";
import { signInSchema } from "@/lib/validations/auth";
import FormField from "./FormField";
import SubmitButton from "./SubmitButton";
import FormNotice from "./FormNotice";

export default function SignInForm() {
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
      email: String(formData.get("email") ?? ""),
      password: String(formData.get("password") ?? ""),
    };

    const parsed = signInSchema.safeParse(values);
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

    const { error } = await signIn.email({
      email: parsed.data.email,
      password: parsed.data.password,
    });

    setPending(false);

    if (error) {
      setFormError(error.message ?? "Invalid email or password.");
      return;
    }

    router.push(redirectTo);
    router.refresh();
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
        error={fieldErrors.email}
      />
      <div>
        <FormField
          id="password"
          name="password"
          label="Password"
          type="password"
          placeholder="Your password"
          autoComplete="current-password"
          required
          error={fieldErrors.password}
        />
        <Link
          href="/forgot-password"
          className="mt-1.5 inline-block text-xs font-semibold text-green hover:text-green-dark"
        >
          Forgot password?
        </Link>
      </div>

      <SubmitButton pending={pending} pendingLabel="Signing in...">
        Sign In
      </SubmitButton>

      {formError ? <FormNotice tone="error">{formError}</FormNotice> : null}

      <p className="text-center text-sm text-ink">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="font-semibold text-green hover:text-green-dark">
          Sign up
        </Link>
      </p>
    </form>
  );
}
