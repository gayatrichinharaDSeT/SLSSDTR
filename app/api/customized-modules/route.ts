import { prisma } from "@/lib/prisma";
import { sendEmail } from "@/lib/email";
import { getApiUser } from "@/lib/permissions";
import { customizedModuleRequestSchema } from "@/lib/validations/customized-module";
import { apiError, apiInternalError, apiSuccess } from "@/lib/api-response";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";

export async function POST(request: Request) {
  const rateLimit = checkRateLimit(`customized-module:${getClientIp(request)}`, {
    limit: 5,
    windowMs: 10 * 60 * 1000,
  });
  if (!rateLimit.success) {
    return apiError("RATE_LIMITED", "Too many submissions. Please try again later.");
  }

  const body = await request.json().catch(() => null);
  if (!body) return apiError("VALIDATION_ERROR", "Invalid request body.");

  const parsed = customizedModuleRequestSchema.safeParse(body);
  if (!parsed.success) {
    return apiError("VALIDATION_ERROR", parsed.error.issues[0]?.message ?? "Invalid input.");
  }

  const { name, email, phone, organization, programId, departments, message } = parsed.data;

  const currentUser = await getApiUser();

  try {
    const request_ = await prisma.customizedModuleRequest.create({
      data: {
        name,
        email,
        phone: phone || null,
        organization: organization || null,
        programId: programId || null,
        departments,
        message: message || null,
        userId: currentUser?.id ?? null,
      },
    });

    const notifyTo = process.env.CONTACT_NOTIFICATION_EMAIL;
    if (notifyTo) {
      sendEmail({
        to: notifyTo,
        subject: `New customized module request from ${name}`,
        text: `${name} (${email}) requested a customized module.\n\nDepartments: ${departments.join(", ")}\nProgram: ${programId || "—"}\n\n${message || ""}`,
        html: `<p><strong>${name}</strong> (${email}) requested a customized module.</p><p>Departments: ${departments.join(", ")}<br/>Program: ${programId || "—"}</p><p>${message || ""}</p>`,
      }).catch((error) => console.error("[customized-module] notification email failed:", error));
    }

    return apiSuccess({ id: request_.id }, { status: 201 });
  } catch (error) {
    return apiInternalError("customized-module.create", error);
  }
}
