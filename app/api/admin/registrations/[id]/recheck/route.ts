import { prisma } from "@/lib/prisma";
import { getApiAdmin } from "@/lib/permissions";
import { getAcademyOrderStatus, AcademyApiError } from "@/lib/academy-api";
import { apiError, apiInternalError, apiSuccess } from "@/lib/api-response";
import { isAdminPanelEnabled } from "@/lib/feature-flags";

type RouteParams = { params: Promise<{ id: string }> };

// Reconciliation for the one gap in the create-order/verify-payment flow:
// if a user closes the tab or loses connection right after paying, our
// own record can stay PENDING forever even though DSet's webhook already
// marked it paid on their side. An admin can trigger this to pull DSet's
// authoritative status for one registration and sync it here.
export async function POST(request: Request, { params }: RouteParams) {
  if (!isAdminPanelEnabled()) return apiError("NOT_FOUND", "Not found.");

  const admin = await getApiAdmin();
  if (!admin) return apiError("UNAUTHORIZED", "Admin access required.");

  const { id } = await params;

  const registration = await prisma.programRegistration.findUnique({ where: { id } });
  if (!registration) {
    return apiError("NOT_FOUND", "Registration not found.");
  }

  try {
    const remoteStatus = await getAcademyOrderStatus(registration.internalOrderId);

    const status = remoteStatus.status === "paid" ? "PAID" : remoteStatus.status === "failed" ? "FAILED" : "PENDING";

    const updated = await prisma.programRegistration.update({
      where: { id },
      data: {
        status,
        providerPaymentId: remoteStatus.providerPaymentId ?? registration.providerPaymentId,
        paidAt: remoteStatus.paidAt ? new Date(remoteStatus.paidAt) : registration.paidAt,
      },
    });

    return apiSuccess(updated);
  } catch (error) {
    if (error instanceof AcademyApiError) {
      console.error("[admin.registrations.recheck] academy API error:", error.message);
      return apiError("INTERNAL_ERROR", "Could not reach the payment system to recheck this order.", 502);
    }
    return apiInternalError("admin.registrations.recheck", error);
  }
}
