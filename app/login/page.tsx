import type { Metadata } from "next";
import { Suspense } from "react";
import AuthShell from "@/components/auth/AuthShell";
import SignInForm from "@/components/auth/SignInForm";

export const metadata: Metadata = {
  title: "Sign In | SLSSDTR",
  description: "Sign in to your SLSSDTR account.",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <AuthShell eyebrow="ACCOUNT" title="Welcome Back" description="Sign in to continue.">
      <Suspense>
        <SignInForm />
      </Suspense>
    </AuthShell>
  );
}
