import type { Metadata } from "next";
import { FileText } from "lucide-react";
import StatusBadge from "@/components/dashboard/StatusBadge";
import EmptyState from "@/components/dashboard/EmptyState";
import { requireUser } from "@/lib/permissions";
import { prisma } from "@/lib/prisma";
import { getEnquirySourceLabel } from "@/data/programs";

export const metadata: Metadata = {
  title: "My Enquiries | SLSSDTR",
  robots: { index: false, follow: false },
};

export default async function MyEnquiriesPage() {
  const user = await requireUser();

  // where.userId is always the session's own id — there is no code path
  // here that accepts an id from the request, so one user can never load
  // another user's enquiries.
  const enquiries = await prisma.programEnquiry.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="flex flex-col gap-4">
      <h1 className="font-heading text-xl font-bold text-navy">My Enquiries</h1>

      {enquiries.length === 0 ? (
        <EmptyState icon={FileText} message="No enquiries yet." />
      ) : (
        <div className="flex flex-col gap-3">
          {enquiries.map((enquiry) => {
            const sourceLabel = getEnquirySourceLabel(enquiry.programId);
            return (
              <div
                key={enquiry.id}
                className="flex flex-col gap-3 rounded-card border border-navy/10 bg-white p-5 shadow-sm transition-shadow duration-200 hover:shadow-lg hover:shadow-navy/5 sm:flex-row sm:items-start sm:justify-between"
              >
                <div className="flex flex-col gap-1">
                  <p className="font-heading font-semibold text-navy">
                    {sourceLabel}
                  </p>
                  <p className="text-sm text-ink/70">{enquiry.message}</p>
                  <p className="text-xs text-ink/50">
                    Submitted{" "}
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
  );
}
