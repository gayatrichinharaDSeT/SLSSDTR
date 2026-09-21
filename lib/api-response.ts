import { NextResponse } from "next/server";

export type ApiErrorCode =
  | "VALIDATION_ERROR"
  | "UNAUTHENTICATED"
  | "UNAUTHORIZED"
  | "NOT_FOUND"
  | "RATE_LIMITED"
  | "CONFLICT"
  | "INTERNAL_ERROR";

const statusByCode: Record<ApiErrorCode, number> = {
  VALIDATION_ERROR: 400,
  UNAUTHENTICATED: 401,
  UNAUTHORIZED: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  RATE_LIMITED: 429,
  INTERNAL_ERROR: 500,
};

export function apiSuccess<T>(data: T, init?: { status?: number }) {
  return NextResponse.json({ success: true, data }, { status: init?.status ?? 200 });
}

export function apiError(code: ApiErrorCode, message: string, status?: number) {
  return NextResponse.json(
    { success: false, error: { code, message } },
    { status: status ?? statusByCode[code] }
  );
}

// Never forward raw error internals (stack traces, SQL, Prisma error
// metadata) to the client — log server-side context and return a safe,
// generic message instead.
export function apiInternalError(context: string, error: unknown) {
  console.error(`[api] ${context}:`, error);
  return apiError("INTERNAL_ERROR", "Something went wrong. Please try again later.");
}
