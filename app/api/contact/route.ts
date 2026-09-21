import { prisma } from "@/lib/prisma";
import { sendEmail } from "@/lib/email";
import { contactMessageSchema } from "@/lib/validations/contact";
import { apiError, apiInternalError, apiSuccess } from "@/lib/api-response";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";

export async function POST(request: Request) {
  const rateLimit = checkRateLimit(`contact:${getClientIp(request)}`, {
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

  const parsed = contactMessageSchema.safeParse(body);
  if (!parsed.success) {
    return apiError("VALIDATION_ERROR", parsed.error.issues[0]?.message ?? "Invalid input.");
  }

  const { name, email, phone, organization, interest, message } = parsed.data;

  try {
    const contactMessage = await prisma.contactMessage.create({
      data: {
        name,
        email,
        phone: phone || null,
        organization: organization || null,
        interest: interest || null,
        message,
      },
    });

    // The enquiry is already saved at this point — a failed notification
    // email must never lose it, so this is fire-and-forget with its own
    // catch rather than something the request awaits and fails on.
    const notifyTo = process.env.CONTACT_NOTIFICATION_EMAIL;
    if (notifyTo) {
      sendEmail({
        to: notifyTo,
        subject: `New contact enquiry from ${name}`,
        text: `${name} (${email}) submitted a contact form message.\n\nInterest: ${interest || "—"}\nOrganization: ${organization || "—"}\nPhone: ${phone || "—"}\n\n${message}`,
        html: `<p><strong>${name}</strong> (${email}) submitted a contact form message.</p><p>Interest: ${interest || "—"}<br/>Organization: ${organization || "—"}<br/>Phone: ${phone || "—"}</p><p>${message}</p>`,
      }).catch((error) => console.error("[contact] notification email failed:", error));
    }

    return apiSuccess({ id: contactMessage.id }, { status: 201 });
  } catch (error) {
    return apiInternalError("contact.create", error);
  }
}
