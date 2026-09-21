import type { Metadata } from "next";
import Link from "next/link";
import { FileText } from "lucide-react";
import EmptyState from "@/components/dashboard/EmptyState";
import EnquiryStatusSelect from "@/components/admin/EnquiryStatusSelect";
import { prisma } from "@/lib/prisma";
import { getProgramBySlug } from "@/data/programs";

export const metadata: Metadata = {
  title: "Enquiries | SLSSDTR Admin",
  robots: { index: false, follow: false },
};

const FILTERS = [
  { label: "All", value: undefined },
  { label: "New", value: "NEW" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "Resolved", value: "RESOLVED" },
] as const;

type PageProps = {
  searchParams: Promise<{ status?: string }>;
};

export default async function AdminEnquiriesPage({ searchParams }: PageProps) {
  const { status } = await searchParams;
  const validStatus = ["NEW", "IN_PROGRESS", "RESOLVED"].includes(status ?? "") ? status : undefined;

  const enquiries = await prisma.programEnquiry.findMany({
    where: validStatus ? { status: validStatus as "NEW" | "IN_PROGRESS" | "RESOLVED" } : undefined,
    orderBy: { createdAt: "desc" },
    include: { user: { select: { name: true, email: true } } },
  });

  return (
    <div className="flex flex-col gap-4">
      <h1 className="font-heading text-xl font-bold text-navy">Program Enquiries</h1>

      <div className="flex flex-wrap gap-2">
        {FILTERS.map((filter) => (
          <Link
            key={filter.label}
            href={filter.value ? `/admin/enquiries?status=${filter.value}` : "/admin/enquiries"}
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

      {enquiries.length === 0 ? (
        <EmptyState icon={FileText} message="No enquiries found." />
      ) : (
        <div className="flex flex-col gap-3">
          {enquiries.map((enquiry) => {
            const program = getProgramBySlug(enquiry.programId);
            return (
              <div
                key={enquiry.id}
                className="flex flex-col gap-3 rounded-card border border-navy/10 bg-white p-5 shadow-sm sm:flex-row sm:items-start sm:justify-between"
              >
                <div className="flex flex-col gap-1">
                  <p className="font-heading font-semibold text-navy">
                    {enquiry.name} — {program?.name ?? enquiry.programId}
                  </p>
                  <p className="text-sm text-ink/70">
                    {enquiry.email}
                    {enquiry.phone ? ` · ${enquiry.phone}` : ""}
                    {enquiry.organization ? ` · ${enquiry.organization}` : ""}
                  </p>
                  <p className="text-sm text-ink/80">{enquiry.message}</p>
                  <p className="text-xs text-ink/50">
                    {enquiry.user ? `Account: ${enquiry.user.name}` : "Guest submission"} ·{" "}
                    {enquiry.createdAt.toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <EnquiryStatusSelect id={enquiry.id} status={enquiry.status} />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
