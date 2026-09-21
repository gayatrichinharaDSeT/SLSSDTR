import type { Metadata } from "next";
import { Users } from "lucide-react";
import Badge from "@/components/ui/Badge";
import EmptyState from "@/components/dashboard/EmptyState";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Users | SLSSDTR Admin",
  robots: { index: false, follow: false },
};

export default async function AdminUsersPage() {
  // Read-only for this phase. Explicit select — password hashes live on
  // Account, not User, and are never fetched here regardless.
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      email: true,
      organization: true,
      role: true,
      emailVerified: true,
      createdAt: true,
    },
  });

  return (
    <div className="flex flex-col gap-4">
      <h1 className="font-heading text-xl font-bold text-navy">Users</h1>

      {users.length === 0 ? (
        <EmptyState icon={Users} message="No users found." />
      ) : (
        <div className="overflow-x-auto rounded-card border border-navy/10">
          <table className="w-full min-w-[640px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-navy/10 bg-grey">
                <th className="px-4 py-3 font-heading font-semibold text-navy">Name</th>
                <th className="px-4 py-3 font-heading font-semibold text-navy">Email</th>
                <th className="px-4 py-3 font-heading font-semibold text-navy">Organization</th>
                <th className="px-4 py-3 font-heading font-semibold text-navy">Role</th>
                <th className="px-4 py-3 font-heading font-semibold text-navy">Verified</th>
                <th className="px-4 py-3 font-heading font-semibold text-navy">Joined</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b border-navy/5 last:border-0">
                  <td className="px-4 py-3 font-medium text-navy">{user.name}</td>
                  <td className="px-4 py-3 text-ink/80">{user.email}</td>
                  <td className="px-4 py-3 text-ink/80">{user.organization ?? "—"}</td>
                  <td className="px-4 py-3">
                    <Badge tone={user.role === "ADMIN" ? "navy" : "green"}>{user.role}</Badge>
                  </td>
                  <td className="px-4 py-3 text-ink/80">{user.emailVerified ? "Yes" : "No"}</td>
                  <td className="px-4 py-3 text-ink/60">
                    {user.createdAt.toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
