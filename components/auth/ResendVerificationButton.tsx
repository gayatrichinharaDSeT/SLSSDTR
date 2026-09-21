"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import FormNotice from "./FormNotice";

export default function ResendVerificationButton({ email }: { email: string }) {
  const [pending, setPending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleResend() {
    setPending(true);
    setError(null);

    const { error: resendError } = await authClient.sendVerificationEmail({
      email,
      callbackURL: "/verify-email",
    });

    setPending(false);

    if (resendError) {
      setError(resendError.message ?? "Could not resend the verification email.");
      return;
    }

    setSent(true);
  }

  if (sent) {
    return <FormNotice tone="success">Verification email sent — check your inbox.</FormNotice>;
  }

  return (
    <div className="flex flex-col gap-3">
      <button
        type="button"
        onClick={handleResend}
        disabled={pending}
        className="inline-flex items-center justify-center rounded-btn border border-navy px-6 py-3 text-sm font-semibold font-heading text-navy transition-all duration-200 hover:-translate-y-0.5 hover:border-green hover:bg-navy hover:text-white hover:shadow-lg hover:shadow-navy/15 disabled:pointer-events-none disabled:opacity-60"
      >
        {pending ? "Sending..." : "Resend verification email"}
      </button>
      {error ? <FormNotice tone="error">{error}</FormNotice> : null}
    </div>
  );
}
