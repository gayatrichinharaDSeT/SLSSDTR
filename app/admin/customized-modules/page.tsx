import type { Metadata } from "next";
import Link from "next/link";
import { Boxes } from "lucide-react";
import Badge from "@/components/ui/Badge";
import EmptyState from "@/components/dashboard/EmptyState";
import CustomizedModuleStatusSelect from "@/components/admin/CustomizedModuleStatusSelect";
import { prisma } from "@/lib/prisma";
import { getProgramBySlug } from "@/data/programs";

export const metadata: Metadata = {
  title: "Customized Module Requests | SLSSDTR Admin",
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

export default async function AdminCustomizedModulesPage({ searchParams }: PageProps) {
  const { status } = await searchParams;
  const validStatus = ["NEW", "IN_PROGRESS", "RESOLVED"].includes(status ?? "") ? status : undefined;

  const requests = await prisma.customizedModuleRequest.findMany({
    where: validStatus ? { status: validStatus as "NEW" | "IN_PROGRESS" | "RESOLVED" } : undefined,
    orderBy: { createdAt: "desc" },
    include: { user: { select: { name: true, email: true } } },
  });

  return (
    <div className="flex flex-col gap-4">
      <h1 className="font-heading text-xl font-bold text-navy">Customized Module Requests</h1>

      <div className="flex flex-wrap gap-2">
        {FILTERS.map((filter) => (
          <Link
            key={filter.label}
            href={filter.value ? `/admin/customized-modules?status=${filter.value}` : "/admin/customized-modules"}
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

      {requests.length === 0 ? (
        <EmptyState icon={Boxes} message="No customized module requests found." />
      ) : (
        <div className="flex flex-col gap-3">
          {requests.map((req) => {
            const program = req.programId ? getProgramBySlug(req.programId) : undefined;
            return (
              <div
                key={req.id}
                className="flex flex-col gap-3 rounded-card border border-navy/10 bg-white p-5 shadow-sm sm:flex-row sm:items-start sm:justify-between"
              >
                <div className="flex flex-col gap-2">
                  <p className="font-heading font-semibold text-navy">
                    {req.name}
                    {program ? ` — ${program.name}` : ""}
                  </p>
                  <p className="text-sm text-ink/70">
                    {req.email}
                    {req.phone ? ` · ${req.phone}` : ""}
                    {req.organization ? ` · ${req.organization}` : ""}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {req.departments.map((department) => (
                      <Badge key={department} tone="blue">
                        {department}
                      </Badge>
                    ))}
                  </div>
                  {req.message ? <p className="text-sm text-ink/80">{req.message}</p> : null}
                  <p className="text-xs text-ink/50">
                    {req.user ? `Account: ${req.user.name}` : "Guest submission"} ·{" "}
                    {req.createdAt.toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <CustomizedModuleStatusSelect id={req.id} status={req.status} />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
