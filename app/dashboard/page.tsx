import type { Metadata } from "next";
import Link from "next/link";
import { BadgeCheck, FileText, Mail, ShieldAlert } from "lucide-react";
import StatCard from "@/components/dashboard/StatCard";
import StatusBadge from "@/components/dashboard/StatusBadge";
import EmptyState from "@/components/dashboard/EmptyState";
import { requireUser } from "@/lib/permissions";
import { prisma } from "@/lib/prisma";
import { getProgramBySlug } from "@/data/programs";

export const metadata: Metadata = {
  title: "Dashboard | SLSSDTR",
  robots: { index: false, follow: false },
};

export default async function DashboardOverviewPage() {
  const user = await requireUser();

  // Scoped to this user's own id — never any id from the request, so
  // this can never surface another user's enquiries.
  const [enquiryCount, recentEnquiries] = await Promise.all([
    prisma.programEnquiry.count({ where: { userId: user.id } }),
    prisma.programEnquiry.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
      take: 5,
    }),
  ]);

  return (
    <div className="flex flex-col gap-8">
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard icon={Mail} label="Email" value={user.email} tone="blue" />
        <StatCard
          icon={user.emailVerified ? BadgeCheck : ShieldAlert}
          label="Verification"
          value={user.emailVerified ? "Verified" : "Not verified"}
          tone={user.emailVerified ? "green" : "yellow"}
        />
        <StatCard icon={FileText} label="Total Enquiries" value={enquiryCount} tone="navy" />
      </div>

      {!user.emailVerified ? (
        <div className="flex flex-col items-start gap-3 rounded-card border border-yellow/40 bg-yellow/10 p-5 text-sm text-navy sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <ShieldAlert className="h-5 w-5 shrink-0 text-navy" strokeWidth={2} aria-hidden="true" />
            <span>Your email isn&apos;t verified yet. Verify it to secure your account.</span>
          </div>
          <Link
            href="/verify-email"
            className="inline-flex shrink-0 items-center rounded-btn bg-navy px-4 py-2 text-xs font-semibold font-heading text-white transition-colors duration-200 hover:bg-navy-dark"
          >
            Verify Now
          </Link>
        </div>
      ) : null}

      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between gap-3">
          <h2 className="font-heading text-xl font-bold text-navy">Recent Enquiries</h2>
          {recentEnquiries.length > 0 ? (
            <Link
              href="/dashboard/enquiries"
              className="text-xs font-semibold font-heading text-green hover:text-green-dark"
            >
              View All
            </Link>
          ) : null}
        </div>
        {recentEnquiries.length === 0 ? (
          <EmptyState icon={FileText} message="No enquiries yet." />
        ) : (
          <div className="flex flex-col gap-3">
            {recentEnquiries.map((enquiry) => {
              const program = getProgramBySlug(enquiry.programId);
              return (
                <div
                  key={enquiry.id}
                  className="flex flex-col gap-2 rounded-card border border-navy/10 bg-white p-5 shadow-sm transition-shadow duration-200 hover:shadow-lg hover:shadow-navy/5 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <p className="font-heading font-semibold text-navy">
                      {program?.name ?? enquiry.programId}
                    </p>
                    <p className="text-xs text-ink/60">
                      {enquiry.createdAt.toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                  <StatusBadge status={enquiry.status} />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
