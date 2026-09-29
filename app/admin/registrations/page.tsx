import type { Metadata } from "next";
import Link from "next/link";
import { CreditCard } from "lucide-react";
import EmptyState from "@/components/dashboard/EmptyState";
import PaymentStatusBadge from "@/components/admin/PaymentStatusBadge";
import RegistrationRecheckButton from "@/components/admin/RegistrationRecheckButton";
import { prisma } from "@/lib/prisma";
import { getEnquirySourceLabel } from "@/data/programs";

export const metadata: Metadata = {
  title: "Registrations | SLSSDTR Admin",
  robots: { index: false, follow: false },
};

const FILTERS = [
  { label: "All", value: undefined },
  { label: "Pending", value: "PENDING" },
  { label: "Paid", value: "PAID" },
  { label: "Failed", value: "FAILED" },
] as const;

type PageProps = {
  searchParams: Promise<{ status?: string }>;
};

function formatAmount(amountInPaise: number, currency: string): string {
  return `${currency === "INR" ? "₹" : `${currency} `}${(amountInPaise / 100).toLocaleString("en-IN")}`;
}

export default async function AdminRegistrationsPage({ searchParams }: PageProps) {
  const { status } = await searchParams;
  const validStatus = ["PENDING", "PAID", "FAILED"].includes(status ?? "") ? status : undefined;

  const registrations = await prisma.programRegistration.findMany({
    where: validStatus ? { status: validStatus as "PENDING" | "PAID" | "FAILED" } : undefined,
    orderBy: { createdAt: "desc" },
    include: { user: { select: { name: true, email: true } } },
  });

  return (
    <div className="flex flex-col gap-4">
      <h1 className="font-heading text-xl font-bold text-navy">Program Registrations</h1>
      <p className="text-sm text-ink/70">
        Paid registrations proxied through DSet Academy&apos;s Razorpay account. Payment status is
        authoritative on DSet&apos;s side — use &ldquo;Recheck Status&rdquo; to resync a registration that
        stayed Pending here (e.g. the visitor closed the tab right after paying).
      </p>

      <div className="flex flex-wrap gap-2">
        {FILTERS.map((filter) => (
          <Link
            key={filter.label}
            href={filter.value ? `/admin/registrations?status=${filter.value}` : "/admin/registrations"}
            className={`rounded-full px-4 py-1.5 text-xs font-semibold font-heading transition-colors duration-200 ${
              validStatus === filter.value
                ? "bg-navy text-white"
                : "bg-grey text-ink hover:bg-mist hover:text-green-dark"
            }`}
          >
            {filter.label}
          </Link>
        ))}
      </div>

      {registrations.length === 0 ? (
        <EmptyState icon={CreditCard} message="No registrations found." />
      ) : (
        <div className="flex flex-col gap-3">
          {registrations.map((registration) => (
            <div
              key={registration.id}
              className="flex flex-col gap-3 rounded-card border border-navy/10 bg-white p-5 shadow-sm transition-shadow duration-200 hover:shadow-lg hover:shadow-navy/5 sm:flex-row sm:items-start sm:justify-between"
            >
              <div className="flex flex-col gap-1">
                <p className="font-heading font-semibold text-navy">
                  {registration.name} — {getEnquirySourceLabel(registration.programId)}
                </p>
                <p className="text-sm text-ink/70">
                  {registration.email}
                  {registration.phone ? ` · ${registration.phone}` : ""}
                  {registration.organization ? ` · ${registration.organization}` : ""}
                </p>
                <p className="text-sm font-semibold text-navy">
                  {formatAmount(registration.amount, registration.currency)}
                </p>
                {registration.preferredBatch ? (
                  <p className="text-xs text-ink/50">Preferred batch: {registration.preferredBatch}</p>
                ) : null}
                <p className="text-xs text-ink/50">
                  {registration.user ? `Account: ${registration.user.name}` : "Guest registration"} ·{" "}
                  {registration.createdAt.toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                  {registration.paidAt
                    ? ` · Paid ${registration.paidAt.toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}`
                    : ""}
                </p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <PaymentStatusBadge status={registration.status} />
                {registration.status === "PENDING" ? (
                  <RegistrationRecheckButton id={registration.id} />
                ) : null}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
