import "server-only";

// Server-side client for DSet Academy's Razorpay proxy API. This app never
// holds a Razorpay secret — DSet's own backend owns the Razorpay account,
// creates/verifies orders on our behalf, and tags every charge as ours
// (`provider_account: "SLSSDTR"`) entirely on their side. Every function
// here is a thin, typed wrapper around one of their 3 endpoints; nothing
// else in the app should call fetch() against their API directly.

function getConfig(): { baseUrl: string; token: string } | null {
  const baseUrl = process.env.DSET_ACADEMY_API_BASE_URL;
  const token = process.env.DSET_ACADEMY_API_TOKEN;
  if (!baseUrl || !token) return null;
  return { baseUrl, token };
}

export function isAcademyApiConfigured(): boolean {
  return getConfig() !== null;
}

class AcademyApiError extends Error {
  constructor(
    message: string,
    public status?: number
  ) {
    super(message);
    this.name = "AcademyApiError";
  }
}

async function callAcademyApi<T>(path: string, init: RequestInit): Promise<T> {
  const config = getConfig();
  if (!config) {
    throw new AcademyApiError(
      "DSet Academy API is not configured yet (DSET_ACADEMY_API_BASE_URL / DSET_ACADEMY_API_TOKEN missing)."
    );
  }

  let response: Response;
  try {
    response = await fetch(`${config.baseUrl}${path}`, {
      ...init,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${config.token}`,
        ...init.headers,
      },
    });
  } catch (error) {
    // Never include the token in a thrown error — only the network failure
    // itself (e.g. DNS/connection refused while the base URL is a
    // placeholder).
    throw new AcademyApiError(
      `Could not reach DSet Academy API: ${error instanceof Error ? error.message : "unknown network error"}`
    );
  }

  const body = await response.json().catch(() => null);

  if (!response.ok) {
    const message =
      body && typeof body === "object" && "message" in body
        ? String((body as { message?: unknown }).message)
        : `Academy API request failed (${response.status})`;
    throw new AcademyApiError(message, response.status);
  }

  return body as T;
}

export type CreateAcademyOrderInput = {
  programId: string;
  programTitle: string;
  amount: number; // paise
  currency?: string;
  receipt?: string;
};

export type CreateAcademyOrderResult = {
  orderId: string;
  internalOrderId: string;
  amount: number;
  currency: string;
  keyId: string;
};

export async function createAcademyOrder(input: CreateAcademyOrderInput): Promise<CreateAcademyOrderResult> {
  return callAcademyApi<CreateAcademyOrderResult>("/api/academy/slssdtr/create-order", {
    method: "POST",
    body: JSON.stringify({ currency: "INR", ...input }),
  });
}

export type VerifyAcademyPaymentInput = {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
};

export type VerifyAcademyPaymentResult = {
  success: boolean;
  orderId: string;
  programmeTitle: string;
  amount: number;
  status: string;
};

export async function verifyAcademyPayment(
  input: VerifyAcademyPaymentInput
): Promise<VerifyAcademyPaymentResult> {
  return callAcademyApi<VerifyAcademyPaymentResult>("/api/academy/slssdtr/verify-payment", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export type AcademyOrderStatus = "created" | "paid" | "failed";

export type AcademyOrderStatusResult = {
  orderId: string;
  providerOrderId: string;
  programmeTitle: string;
  amount: number;
  currency: string;
  status: AcademyOrderStatus;
  providerPaymentId: string | null;
  paidAt: string | null;
};

export async function getAcademyOrderStatus(orderId: string): Promise<AcademyOrderStatusResult> {
  return callAcademyApi<AcademyOrderStatusResult>(
    `/api/academy/slssdtr/order-status/${encodeURIComponent(orderId)}`,
    { method: "GET" }
  );
}

export { AcademyApiError };
