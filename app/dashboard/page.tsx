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
        <div className="rounded-card border border-yellow/40 bg-yellow/10 p-5 text-sm text-navy">
          Your email isn&apos;t verified yet.{" "}
          <Link href="/verify-email" className="font-semibold underline underline-offset-2">
            Verify it now
          </Link>
          .
        </div>
      ) : null}

      <div className="flex flex-col gap-4">
        <h2 className="font-heading text-xl font-bold text-navy">Recent Enquiries</h2>
        {recentEnquiries.length === 0 ? (
          <EmptyState icon={FileText} message="No enquiries yet." />
        ) : (
          <div className="flex flex-col gap-3">
            {recentEnquiries.map((enquiry) => {
              const program = getProgramBySlug(enquiry.programId);
              return (
                <div
                  key={enquiry.id}
                  className="flex flex-col gap-2 rounded-card border border-navy/10 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between"
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
