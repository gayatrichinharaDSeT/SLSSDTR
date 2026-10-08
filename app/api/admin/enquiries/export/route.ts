import type { EnquiryStatus, Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { getApiAdmin } from "@/lib/permissions";
import { apiError, apiInternalError } from "@/lib/api-response";
import { isAdminPanelEnabled } from "@/lib/feature-flags";
import { getEnquirySourceLabel } from "@/data/programs";
import { toCsv } from "@/lib/csv";

const VALID_STATUSES: EnquiryStatus[] = ["NEW", "IN_PROGRESS", "RESOLVED"];

const HEADERS = [
  "Name",
  "Email",
  "Phone",
  "Organization",
  "Program",
  "Preferred Batch",
  "Status",
  "Message",
  "Account",
  "Submitted On",
];

export async function GET(request: Request) {
  if (!isAdminPanelEnabled()) return apiError("NOT_FOUND", "Not found.");

  const admin = await getApiAdmin();
  if (!admin) return apiError("UNAUTHORIZED", "Admin access required.");

  const statusParam = new URL(request.url).searchParams.get("status");
  const where: Prisma.ProgramEnquiryWhereInput = {};
  if (statusParam) {
    if (!VALID_STATUSES.includes(statusParam as EnquiryStatus)) {
      return apiError("VALIDATION_ERROR", "Invalid status filter.");
    }
    where.status = statusParam as EnquiryStatus;
  }

  try {
    const enquiries = await prisma.programEnquiry.findMany({
      where,
      orderBy: { createdAt: "desc" },
      include: { user: { select: { name: true, email: true } } },
    });

    const rows = enquiries.map((enquiry) => [
      enquiry.name,
      enquiry.email,
      enquiry.phone ?? "",
      enquiry.organization ?? "",
      getEnquirySourceLabel(enquiry.programId),
      enquiry.preferredBatch ?? "",
      enquiry.status,
      enquiry.message,
      enquiry.user ? `${enquiry.user.name} (${enquiry.user.email})` : "Guest",
      enquiry.createdAt.toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" }),
    ]);

    const csv = toCsv(HEADERS, rows);
    const filename = `program-enquiries-${new Date().toISOString().slice(0, 10)}.csv`;

    return new Response(csv, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    });
  } catch (error) {
    return apiInternalError("admin.enquiries.export", error);
  }
}
