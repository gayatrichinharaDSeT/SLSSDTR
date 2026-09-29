import { prisma } from "@/lib/prisma";
import { getApiUser } from "@/lib/permissions";
import { startRegistrationSchema } from "@/lib/validations/registration";
import { getProgramBySlug } from "@/data/programs";
import { createAcademyOrder, AcademyApiError } from "@/lib/academy-api";
import { apiError, apiInternalError, apiSuccess } from "@/lib/api-response";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";

export async function POST(request: Request) {
  const rateLimit = checkRateLimit(`payment-create-order:${getClientIp(request)}`, {
    limit: 5,
    windowMs: 10 * 60 * 1000,
  });
  if (!rateLimit.success) {
    return apiError("RATE_LIMITED", "Too many attempts. Please try again later.");
  }

  const body = await request.json().catch(() => null);
  if (!body) return apiError("VALIDATION_ERROR", "Invalid request body.");

  const parsed = startRegistrationSchema.safeParse(body);
  if (!parsed.success) {
    return apiError("VALIDATION_ERROR", parsed.error.issues[0]?.message ?? "Invalid input.");
  }

  const { programId, name, email, phone, organization, preferredBatch } = parsed.data;

  // The price is always looked up server-side from our own catalogue —
  // never trusted from the client — so a tampered browser request can
  // never register at a different amount than the real program price.
  const program = getProgramBySlug(programId);
  if (!program) {
    return apiError("VALIDATION_ERROR", "Unknown program.");
  }
  const amountInPaise = Math.round(program.price.amount * 100);

  const currentUser = await getApiUser();

  try {
    const order = await createAcademyOrder({
      programId: program.slug,
      programTitle: program.name,
      amount: amountInPaise,
      receipt: `slssdtr-${Date.now()}`,
    });

    const registration = await prisma.programRegistration.create({
      data: {
        programId: program.slug,
        name,
        email,
        phone,
        organization: organization || null,
        preferredBatch: preferredBatch || null,
        amount: order.amount,
        currency: order.currency,
        status: "PENDING",
        internalOrderId: order.internalOrderId,
        providerOrderId: order.orderId,
        userId: currentUser?.id ?? null,
      },
    });

    return apiSuccess(
      {
        registrationId: registration.id,
        orderId: order.orderId,
        keyId: order.keyId,
        amount: order.amount,
        currency: order.currency,
        programName: program.name,
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof AcademyApiError) {
      console.error("[payments.create-order] academy API error:", error.message);
      return apiError(
        "INTERNAL_ERROR",
        "Payment is not available right now. Please try again shortly or contact us directly.",
        502
      );
    }
    return apiInternalError("payments.create-order", error);
  }
}
