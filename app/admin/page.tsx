import type { Metadata } from "next";
import { Boxes, FileText, Mail, MessageSquare, Users } from "lucide-react";
import StatCard from "@/components/dashboard/StatCard";
import StatusBadge from "@/components/dashboard/StatusBadge";
import EmptyState from "@/components/dashboard/EmptyState";
import { prisma } from "@/lib/prisma";
import { getProgramBySlug } from "@/data/programs";

export const metadata: Metadata = {
  title: "Admin Overview | SLSSDTR",
  robots: { index: false, follow: false },
};

export default async function AdminOverviewPage() {
  const [totalUsers, newEnquiries, totalMessages, newModuleRequests, recentEnquiries] = await Promise.all([
    prisma.user.count(),
    prisma.programEnquiry.count({ where: { status: "NEW" } }),
    prisma.contactMessage.count(),
    prisma.customizedModuleRequest.count({ where: { status: "NEW" } }),
    prisma.programEnquiry.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
      include: { user: { select: { name: true } } },
    }),
  ]);

  return (
    <div className="flex flex-col gap-8">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={Users} label="Total Users" value={totalUsers} tone="blue" />
        <StatCard icon={Mail} label="New Enquiries" value={newEnquiries} tone="yellow" />
        <StatCard icon={MessageSquare} label="Contact Messages" value={totalMessages} tone="green" />
        <StatCard icon={Boxes} label="New Module Requests" value={newModuleRequests} tone="navy" />
      </div>

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
                      {enquiry.name} — {program?.name ?? enquiry.programId}
                    </p>
                    <p className="text-xs text-ink/60">{enquiry.email}</p>
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
