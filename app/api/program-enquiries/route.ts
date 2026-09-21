import { prisma } from "@/lib/prisma";
import { sendEmail } from "@/lib/email";
import { getApiUser } from "@/lib/permissions";
import { programEnquirySchema } from "@/lib/validations/enquiry";
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

  const { programId, name, email, phone, organization, message } = parsed.data;

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
        userId: currentUser?.id ?? null,
      },
    });

    const notifyTo = process.env.CONTACT_NOTIFICATION_EMAIL;
    if (notifyTo) {
      sendEmail({
        to: notifyTo,
        subject: `New program enquiry: ${programId}`,
        text: `${name} (${email}) enquired about ${programId}.\n\nOrganization: ${organization || "—"}\nPhone: ${phone || "—"}\n\n${message}`,
        html: `<p><strong>${name}</strong> (${email}) enquired about <strong>${programId}</strong>.</p><p>Organization: ${organization || "—"}<br/>Phone: ${phone || "—"}</p><p>${message}</p>`,
      }).catch((error) => console.error("[program-enquiry] notification email failed:", error));
    }

    return apiSuccess({ id: enquiry.id }, { status: 201 });
  } catch (error) {
    return apiInternalError("program-enquiry.create", error);
  }
}
