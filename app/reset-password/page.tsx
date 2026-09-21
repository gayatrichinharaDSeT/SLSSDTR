import type { Metadata } from "next";
import { Suspense } from "react";
import AuthShell from "@/components/auth/AuthShell";
import ResetPasswordForm from "@/components/auth/ResetPasswordForm";

export const metadata: Metadata = {
  title: "Reset Password | SLSSDTR",
  description: "Choose a new password for your SLSSDTR account.",
  robots: { index: false, follow: false },
};

export default function ResetPasswordPage() {
  return (
    <AuthShell eyebrow="ACCOUNT" title="Reset Your Password" description="Choose a new password below.">
      <Suspense>
        <ResetPasswordForm />
      </Suspense>
    </AuthShell>
  );
}
