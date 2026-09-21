import type { EnquiryStatus, Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { getApiAdmin } from "@/lib/permissions";
import { enquiryStatusSchema } from "@/lib/validations/enquiry";
import { apiError, apiInternalError, apiSuccess } from "@/lib/api-response";
import { isAdminPanelEnabled } from "@/lib/feature-flags";

const VALID_STATUSES: EnquiryStatus[] = ["NEW", "IN_PROGRESS", "RESOLVED"];

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
      include: { user: { select: { id: true, name: true, email: true } } },
    });

    return apiSuccess(enquiries);
  } catch (error) {
    return apiInternalError("admin.enquiries.list", error);
  }
}

// Body: { id, status }. id-in-body (not a dynamic route) keeps this file
// aligned with the flat admin API surface (users/enquiries/messages) —
// still admin-only and still a full round trip to the database per
// request, so there's no authorization shortcut being taken.
export async function PATCH(request: Request) {
  if (!isAdminPanelEnabled()) return apiError("NOT_FOUND", "Not found.");

  const admin = await getApiAdmin();
  if (!admin) return apiError("UNAUTHORIZED", "Admin access required.");

  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object" || typeof (body as { id?: unknown }).id !== "string") {
    return apiError("VALIDATION_ERROR", "Missing enquiry id.");
  }

  const parsed = enquiryStatusSchema.safeParse(body);
  if (!parsed.success) {
    return apiError("VALIDATION_ERROR", parsed.error.issues[0]?.message ?? "Invalid status.");
  }

  const { id } = body as { id: string };

  try {
    const enquiry = await prisma.programEnquiry.update({
      where: { id },
      data: { status: parsed.data.status },
    });

    return apiSuccess(enquiry);
  } catch (error) {
    if ((error as { code?: string }).code === "P2025") {
      return apiError("NOT_FOUND", "Enquiry not found.");
    }
    return apiInternalError("admin.enquiries.update", error);
  }
}
