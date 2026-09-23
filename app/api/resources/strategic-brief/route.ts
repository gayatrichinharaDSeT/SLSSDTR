import { prisma } from "@/lib/prisma";
import { getApiUser } from "@/lib/permissions";
import { resourceLeadSchema } from "@/lib/validations/resource-lead";
import { PROFESSION_OPTIONS } from "@/lib/validations/profile";
import { apiError, apiInternalError, apiSuccess } from "@/lib/api-response";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";
import { createDownloadToken } from "@/lib/download-token";

// Not a real /programs/ slug — a source identifier so this lead is
// visibly distinguishable from a program enquiry in /admin/enquiries,
// while still living in the same table/API pattern (no new model).
const RESOURCE_ID = "strategic-brief-download";

export async function POST(request: Request) {
  const rateLimit = checkRateLimit(`resource-lead:${getClientIp(request)}`, {
    limit: 5,
    windowMs: 10 * 60 * 1000,
  });
  if (!rateLimit.success) {
    return apiError("RATE_LIMITED", "Too many submissions. Please try again later.");
  }

  const body = await request.json().catch(() => null);
  if (!body) {
    return apiError("VALIDATION_ERROR", "Invalid request body.");
  }

  const parsed = resourceLeadSchema.safeParse(body);
  if (!parsed.success) {
    return apiError("VALIDATION_ERROR", parsed.error.issues[0]?.message ?? "Invalid input.");
  }

  const { name, email, phone, profession, organization } = parsed.data;
  const professionLabel = PROFESSION_OPTIONS.find((option) => option.value === profession)?.label ?? profession;

  // Guests submit without a session (userId stays null); a signed-in
  // visitor's lead is always attributed to their own session user — never
  // to a userId the client could supply directly.
  const currentUser = await getApiUser();

  try {
    await prisma.programEnquiry.create({
      data: {
        programId: RESOURCE_ID,
        name,
        email,
        phone,
        organization: organization || null,
        message: `Requested the "Why India Needs AI Training & Education — And Why It Must Be 'Train the Trainer'" strategic brief. Profession: ${professionLabel}.`,
        userId: currentUser?.id ?? null,
      },
    });

    return apiSuccess(
      { downloadUrl: `/api/resources/strategic-brief/download?token=${createDownloadToken(RESOURCE_ID)}` },
      { status: 201 }
    );
  } catch (error) {
    return apiInternalError("resource-lead.strategic-brief", error);
  }
}
