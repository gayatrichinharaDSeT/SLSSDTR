import type { Metadata } from "next";
import { Suspense } from "react";
import AuthShell from "@/components/auth/AuthShell";
import SignUpForm from "@/components/auth/SignUpForm";

export const metadata: Metadata = {
  title: "Sign Up | SLSSDTR",
  description: "Create an SLSSDTR account to track your program enquiries.",
  robots: { index: false, follow: false },
};

export default function SignUpPage() {
  return (
    <AuthShell
      eyebrow="ACCOUNT"
      title="Create Your Account"
      description="Sign up to track your program enquiries and manage your profile."
    >
      <Suspense>
        <SignUpForm />
      </Suspense>
    </AuthShell>
  );
}
