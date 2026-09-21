import { prisma } from "@/lib/prisma";
import { getApiUser } from "@/lib/permissions";
import { updateProfileSchema } from "@/lib/validations/profile";
import { apiError, apiInternalError, apiSuccess } from "@/lib/api-response";

export async function GET() {
  const user = await getApiUser();
  if (!user) return apiError("UNAUTHENTICATED", "Sign in to view your profile.");
  return apiSuccess(user);
}

// Only ever writes name/phone/organization on the caller's own row (scoped
// by the session's userId, never a client-supplied id) — role, email,
// emailVerified, and id are not in updateProfileSchema, so there is no
// request shape that can touch them here.
export async function PATCH(request: Request) {
  const user = await getApiUser();
  if (!user) return apiError("UNAUTHENTICATED", "Sign in to update your profile.");

  const body = await request.json().catch(() => null);
  if (!body) return apiError("VALIDATION_ERROR", "Invalid request body.");

  const parsed = updateProfileSchema.safeParse(body);
  if (!parsed.success) {
    return apiError("VALIDATION_ERROR", parsed.error.issues[0]?.message ?? "Invalid input.");
  }

  const { name, phone, organization } = parsed.data;

  try {
    const updated = await prisma.user.update({
      where: { id: user.id },
      data: { name, phone: phone || null, organization: organization || null },
    });

    return apiSuccess({
      id: updated.id,
      name: updated.name,
      email: updated.email,
      phone: updated.phone,
      organization: updated.organization,
    });
  } catch (error) {
    return apiInternalError("profile.update", error);
  }
}
