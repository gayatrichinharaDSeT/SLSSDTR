import { prisma } from "@/lib/prisma";
import { sendEmail } from "@/lib/email";
import { programEnquiryUserEmail, programEnquiryAdminEmail } from "@/lib/email/templates";
import { getApiUser } from "@/lib/permissions";
import { programEnquirySchema } from "@/lib/validations/enquiry";
import { getProgramBySlug } from "@/data/programs";
import { apiError, apiInternalError, apiSuccess } from "@/lib/api-response";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";

export async function POST(request: Request) {
  const rateLimit = checkRateLimit(`program-enquiry:${getClientIp(request)}`, {
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

  const parsed = programEnquirySchema.safeParse(body);
  if (!parsed.success) {
    return apiError("VALIDATION_ERROR", parsed.error.issues[0]?.message ?? "Invalid input.");
  }

  const { programId, name, email, phone, organization, message, preferredBatch } = parsed.data;

  // Guests submit without a session (userId stays null); a signed-in
  // visitor's enquiry is always attributed to their own session user —
  // never to a userId the client could supply directly.
  const currentUser = await getApiUser();

  try {
    const enquiry = await prisma.programEnquiry.create({
      data: {
        programId,
        name,
        email,
        phone: phone || null,
        organization: organization || null,
        message,
        preferredBatch: preferredBatch || null,
        userId: currentUser?.id ?? null,
      },
    });

    // The enquiry is already saved at this point — email is best-effort and
    // must never fail an otherwise successful submission, so both sends are
    // fire-and-forget with their own catch.
    const programName = getProgramBySlug(programId)?.name ?? programId;
    const enquiryDetails = { name, email, phone, organization, programName, preferredBatch, message };

    sendEmail(programEnquiryUserEmail(enquiryDetails)).catch((error) =>
      console.error("[program-enquiry] confirmation email failed:", error)
    );

    const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL;
    if (adminEmail) {
      sendEmail(programEnquiryAdminEmail(enquiryDetails, adminEmail)).catch((error) =>
        console.error("[program-enquiry] admin notification email failed:", error)
      );
    }

    return apiSuccess({ id: enquiry.id }, { status: 201 });
  } catch (error) {
    return apiInternalError("program-enquiry.create", error);
  }
}
