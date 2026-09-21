import type { Metadata } from "next";
import Link from "next/link";
import LogoutButton from "@/components/dashboard/LogoutButton";
import { requireUser } from "@/lib/permissions";

export const metadata: Metadata = {
  title: "Settings | SLSSDTR",
  robots: { index: false, follow: false },
};

export default async function SettingsPage() {
  const user = await requireUser();

  const rows: Array<[string, string]> = [
    ["Email", user.email],
    ["Email verification", user.emailVerified ? "Verified" : "Not verified"],
    ["Account type", user.role === "ADMIN" ? "Administrator" : "Standard account"],
  ];

  return (
    <div className="flex flex-col gap-6 sm:max-w-md">
      <div className="flex flex-col gap-4 rounded-card border border-navy/10 bg-white p-7 shadow-sm sm:p-9">
        <h1 className="font-heading text-xl font-bold text-navy">Account Information</h1>
        <dl className="flex flex-col gap-3">
          {rows.map(([label, value]) => (
            <div key={label} className="flex items-center justify-between gap-4 border-b border-navy/5 pb-3 last:border-0 last:pb-0">
              <dt className="text-sm text-ink/70">{label}</dt>
              <dd className="text-sm font-semibold text-navy">{value}</dd>
            </div>
          ))}
        </dl>
        {!user.emailVerified ? (
          <Link href="/verify-email" className="text-sm font-semibold text-green hover:text-green-dark">
            Verify your email →
          </Link>
        ) : null}
      </div>

      <div className="flex flex-col gap-3 rounded-card border border-navy/10 bg-white p-7 shadow-sm sm:p-9">
        <h2 className="font-heading text-lg font-bold text-navy">Session</h2>
        <p className="text-sm text-ink/70">Sign out of your account on this device.</p>
        <LogoutButton />
      </div>
    </div>
  );
}
