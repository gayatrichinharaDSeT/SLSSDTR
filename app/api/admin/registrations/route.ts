import type { PaymentStatus, Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { getApiAdmin } from "@/lib/permissions";
import { apiError, apiInternalError, apiSuccess } from "@/lib/api-response";
import { isAdminPanelEnabled } from "@/lib/feature-flags";

const VALID_STATUSES: PaymentStatus[] = ["PENDING", "PAID", "FAILED"];

export async function GET(request: Request) {
  if (!isAdminPanelEnabled()) return apiError("NOT_FOUND", "Not found.");

  const admin = await getApiAdmin();
  if (!admin) return apiError("UNAUTHORIZED", "Admin access required.");

  const statusParam = new URL(request.url).searchParams.get("status");
  const where: Prisma.ProgramRegistrationWhereInput = {};
  if (statusParam) {
    if (!VALID_STATUSES.includes(statusParam as PaymentStatus)) {
      return apiError("VALIDATION_ERROR", "Invalid status filter.");
    }
    where.status = statusParam as PaymentStatus;
  }

  try {
    const registrations = await prisma.programRegistration.findMany({
      where,
      orderBy: { createdAt: "desc" },
      include: { user: { select: { id: true, name: true, email: true } } },
    });

    return apiSuccess(registrations);
  } catch (error) {
    return apiInternalError("admin.registrations.list", error);
  }
}
