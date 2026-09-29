import { prisma } from "@/lib/prisma";
import { verifyRegistrationSchema } from "@/lib/validations/registration";
import { verifyAcademyPayment, AcademyApiError } from "@/lib/academy-api";
import { apiError, apiInternalError, apiSuccess } from "@/lib/api-response";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";

export async function POST(request: Request) {
  const rateLimit = checkRateLimit(`payment-verify:${getClientIp(request)}`, {
    limit: 10,
    windowMs: 10 * 60 * 1000,
  });
  if (!rateLimit.success) {
    return apiError("RATE_LIMITED", "Too many attempts. Please try again later.");
  }

  const body = await request.json().catch(() => null);
  if (!body) return apiError("VALIDATION_ERROR", "Invalid request body.");

  const parsed = verifyRegistrationSchema.safeParse(body);
  if (!parsed.success) {
    return apiError("VALIDATION_ERROR", parsed.error.issues[0]?.message ?? "Invalid input.");
  }

  const { registrationId, razorpay_order_id, razorpay_payment_id, razorpay_signature } = parsed.data;

  const registration = await prisma.programRegistration.findUnique({ where: { id: registrationId } });
  if (!registration) {
    return apiError("NOT_FOUND", "Registration not found.");
  }
  // The order id returned by Razorpay Checkout must match the one we
  // created this registration with — a mismatch means the client is
  // trying to confirm a different order than the one it actually paid
  // (or paid nothing at all).
  if (registration.providerOrderId !== razorpay_order_id) {
    return apiError("VALIDATION_ERROR", "Order mismatch.");
  }

  try {
    const result = await verifyAcademyPayment({ razorpay_order_id, razorpay_payment_id, razorpay_signature });

    if (!result.success || result.status !== "paid") {
      await prisma.programRegistration.update({
        where: { id: registrationId },
        data: { status: "FAILED" },
      });
      return apiError("VALIDATION_ERROR", "Payment could not be verified.");
    }

    const updated = await prisma.programRegistration.update({
      where: { id: registrationId },
      data: {
        status: "PAID",
        providerPaymentId: razorpay_payment_id,
        paidAt: new Date(),
      },
    });

    return apiSuccess({ status: updated.status, programName: result.programmeTitle });
  } catch (error) {
    if (error instanceof AcademyApiError) {
      // Don't mark the registration FAILED on a transient/network error —
      // the payment may still be genuinely successful on DSet's side
      // (their webhook is the safety net). Leave it PENDING so the admin
      // "Recheck status" action can reconcile it later.
      console.error("[payments.verify] academy API error:", error.message);
      return apiError(
        "INTERNAL_ERROR",
        "We couldn't confirm your payment right now. If money was deducted, it will still be recorded — please contact us if you don't hear back shortly.",
        502
      );
    }
    return apiInternalError("payments.verify", error);
  }
}
