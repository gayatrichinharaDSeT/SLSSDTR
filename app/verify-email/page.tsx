import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, MailWarning } from "lucide-react";
import AuthShell from "@/components/auth/AuthShell";
import ResendVerificationButton from "@/components/auth/ResendVerificationButton";
import { getSession } from "@/lib/permissions";

export const metadata: Metadata = {
  title: "Verify Email | SLSSDTR",
  description: "Verify your SLSSDTR account email address.",
  robots: { index: false, follow: false },
};

export default async function VerifyEmailPage() {
  const session = await getSession();

  if (!session) {
    return (
      <AuthShell
        eyebrow="ACCOUNT"
        title="Verify Your Email"
        description="Sign in to check your verification status."
      >
        <p className="text-center text-sm text-ink">
          <Link href="/login" className="font-semibold text-green hover:text-green-dark">
            Sign in
          </Link>{" "}
          to continue, or{" "}
          <Link href="/signup" className="font-semibold text-green hover:text-green-dark">
            create an account
          </Link>
          .
        </p>
      </AuthShell>
    );
  }

  if (session.user.emailVerified) {
    return (
      <AuthShell eyebrow="ACCOUNT" title="Email Verified" description="You're all set.">
        <div className="flex flex-col items-center gap-3 text-center">
          <CheckCircle2 className="h-10 w-10 text-green" strokeWidth={1.75} aria-hidden="true" />
          <p className="text-sm text-ink">
            <strong className="text-navy">{session.user.email}</strong> is verified.
          </p>
          <Link
            href="/dashboard"
            className="mt-2 inline-flex items-center justify-center rounded-btn bg-navy px-6 py-3 text-sm font-semibold font-heading text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-green"
          >
            Go to Dashboard
          </Link>
        </div>
      </AuthShell>
    );
  }

  return (
    <AuthShell
      eyebrow="ACCOUNT"
      title="Verify Your Email"
      description="We sent a verification link when you signed up."
    >
      <div className="flex flex-col items-center gap-4 text-center">
        <MailWarning className="h-10 w-10 text-yellow" strokeWidth={1.75} aria-hidden="true" />
        <p className="text-sm text-ink">
          Check <strong className="text-navy">{session.user.email}</strong> for a verification
          link. Didn&apos;t get it?
        </p>
        <ResendVerificationButton email={session.user.email} />
      </div>
    </AuthShell>
  );
}
