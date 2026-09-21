import type { ContactStatus, Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { getApiAdmin } from "@/lib/permissions";
import { contactMessageStatusSchema } from "@/lib/validations/contact";
import { apiError, apiInternalError, apiSuccess } from "@/lib/api-response";
import { isAdminPanelEnabled } from "@/lib/feature-flags";

const VALID_STATUSES: ContactStatus[] = ["NEW", "READ", "IN_PROGRESS", "RESOLVED"];

export async function GET(request: Request) {
  if (!isAdminPanelEnabled()) return apiError("NOT_FOUND", "Not found.");

  const admin = await getApiAdmin();
  if (!admin) return apiError("UNAUTHORIZED", "Admin access required.");

  const statusParam = new URL(request.url).searchParams.get("status");
  const where: Prisma.ContactMessageWhereInput = {};
  if (statusParam) {
    if (!VALID_STATUSES.includes(statusParam as ContactStatus)) {
      return apiError("VALIDATION_ERROR", "Invalid status filter.");
    }
    where.status = statusParam as ContactStatus;
  }

  try {
    const messages = await prisma.contactMessage.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    return apiSuccess(messages);
  } catch (error) {
    return apiInternalError("admin.messages.list", error);
  }
}

export async function PATCH(request: Request) {
  if (!isAdminPanelEnabled()) return apiError("NOT_FOUND", "Not found.");

  const admin = await getApiAdmin();
  if (!admin) return apiError("UNAUTHORIZED", "Admin access required.");

  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object" || typeof (body as { id?: unknown }).id !== "string") {
    return apiError("VALIDATION_ERROR", "Missing message id.");
  }

  const parsed = contactMessageStatusSchema.safeParse(body);
  if (!parsed.success) {
    return apiError("VALIDATION_ERROR", parsed.error.issues[0]?.message ?? "Invalid status.");
  }

  const { id } = body as { id: string };

  try {
    const message = await prisma.contactMessage.update({
      where: { id },
      data: { status: parsed.data.status },
    });

    return apiSuccess(message);
  } catch (error) {
    if ((error as { code?: string }).code === "P2025") {
      return apiError("NOT_FOUND", "Message not found.");
    }
    return apiInternalError("admin.messages.update", error);
  }
}
