import { prisma } from "@/lib/prisma";
import { getApiAdmin } from "@/lib/permissions";
import { apiError, apiInternalError, apiSuccess } from "@/lib/api-response";
import { isAdminPanelEnabled } from "@/lib/feature-flags";

// Read-only for this phase. Explicitly selects only display-safe fields —
// password hashes live on the Account model and are never touched here,
// but the select is still explicit rather than relying on that.
export async function GET() {
  // Temporary first-deployment gate (see lib/feature-flags.ts) — 404
  // rather than 403 so a disabled panel doesn't even hint it exists.
  if (!isAdminPanelEnabled()) return apiError("NOT_FOUND", "Not found.");

  const admin = await getApiAdmin();
  if (!admin) return apiError("UNAUTHORIZED", "Admin access required.");

  try {
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

    return apiSuccess(users);
  } catch (error) {
    return apiInternalError("admin.users.list", error);
  }
}
