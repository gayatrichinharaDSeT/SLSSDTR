import type { Metadata } from "next";
import AuthShell from "@/components/auth/AuthShell";
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";

export const metadata: Metadata = {
  title: "Forgot Password | SLSSDTR",
  description: "Reset your SLSSDTR account password.",
  robots: { index: false, follow: false },
};

export default function ForgotPasswordPage() {
  return (
    <AuthShell
      eyebrow="ACCOUNT"
      title="Forgot Your Password?"
      description="Enter your email and we'll send you a reset link."
    >
      <ForgotPasswordForm />
    </AuthShell>
  );
}
