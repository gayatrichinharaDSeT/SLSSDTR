// Abuse protection for public POST endpoints (contact form, program
// enquiries, auth). This in-memory implementation is dev/single-instance
// only: it resets on every deploy/restart and is NOT shared across
// serverless function instances, so on Vercel it gives each cold-started
// instance its own independent budget rather than one global limit.
//
// For real production protection, swap `store` below for a durable shared
// store such as Upstash Redis (`@upstash/ratelimit` + `@upstash/redis`) —
// the `checkRateLimit` call signature is designed to stay the same, only
// the store implementation changes.

type Bucket = {
  count: number;
  resetAt: number;
};

const store = new Map<string, Bucket>();

// Periodically drop expired buckets so the in-memory map doesn't grow
// unbounded on a long-lived dev server or single-instance deployment.
function sweep(now: number) {
  for (const [key, bucket] of store) {
    if (bucket.resetAt <= now) store.delete(key);
  }
}

export type RateLimitResult = {
  success: boolean;
  remaining: number;
  resetAt: number;
};

export function checkRateLimit(
  key: string,
  { limit, windowMs }: { limit: number; windowMs: number }
): RateLimitResult {
  const now = Date.now();
  if (store.size > 5000) sweep(now);

  const existing = store.get(key);

  if (!existing || existing.resetAt <= now) {
    const resetAt = now + windowMs;
    store.set(key, { count: 1, resetAt });
    return { success: true, remaining: limit - 1, resetAt };
  }

  if (existing.count >= limit) {
    return { success: false, remaining: 0, resetAt: existing.resetAt };
  }

  existing.count += 1;
  return { success: true, remaining: limit - existing.count, resetAt: existing.resetAt };
}

// Best-effort client identifier for unauthenticated public endpoints.
// Trusts X-Forwarded-For because Vercel's edge network sets it; this is
// not spoof-proof but is sufficient for coarse abuse throttling, not
// security-critical access control.
export function getClientIp(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}
