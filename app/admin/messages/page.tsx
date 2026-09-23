import type { Metadata } from "next";
import Link from "next/link";
import { MessageSquare } from "lucide-react";
import EmptyState from "@/components/dashboard/EmptyState";
import MessageStatusSelect from "@/components/admin/MessageStatusSelect";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Contact Messages | SLSSDTR Admin",
  robots: { index: false, follow: false },
};

const FILTERS = [
  { label: "All", value: undefined },
  { label: "New", value: "NEW" },
  { label: "Read", value: "READ" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "Resolved", value: "RESOLVED" },
] as const;

type PageProps = {
  searchParams: Promise<{ status?: string }>;
};

export default async function AdminMessagesPage({ searchParams }: PageProps) {
  const { status } = await searchParams;
  const validStatus = ["NEW", "READ", "IN_PROGRESS", "RESOLVED"].includes(status ?? "")
    ? status
    : undefined;

  const messages = await prisma.contactMessage.findMany({
    where: validStatus ? { status: validStatus as "NEW" | "READ" | "IN_PROGRESS" | "RESOLVED" } : undefined,
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="flex flex-col gap-4">
      <h1 className="font-heading text-xl font-bold text-navy">Contact Messages</h1>

      <div className="flex flex-wrap gap-2">
        {FILTERS.map((filter) => (
          <Link
            key={filter.label}
            href={filter.value ? `/admin/messages?status=${filter.value}` : "/admin/messages"}
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

      {messages.length === 0 ? (
        <EmptyState icon={MessageSquare} message="No contact messages found." />
      ) : (
        <div className="flex flex-col gap-3">
          {messages.map((message) => (
            <div
              key={message.id}
              className="flex flex-col gap-3 rounded-card border border-navy/10 bg-white p-5 shadow-sm transition-shadow duration-200 hover:shadow-lg hover:shadow-navy/5 sm:flex-row sm:items-start sm:justify-between"
            >
              <div className="flex flex-col gap-1">
                <p className="font-heading font-semibold text-navy">{message.name}</p>
                <p className="text-sm text-ink/70">
                  {message.email}
                  {message.phone ? ` · ${message.phone}` : ""}
                  {message.organization ? ` · ${message.organization}` : ""}
                </p>
                {message.interest ? (
                  <p className="text-xs text-ink/50">Interest: {message.interest}</p>
                ) : null}
                <p className="text-sm text-ink/80">{message.message}</p>
                <p className="text-xs text-ink/50">
                  {message.createdAt.toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>
              <MessageStatusSelect id={message.id} status={message.status} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
