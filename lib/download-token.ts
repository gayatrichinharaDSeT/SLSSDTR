import { createHmac, timingSafeEqual } from "node:crypto";

// Short-lived, self-contained (stateless) signed token gating a private
// download: no server-side session store needed, works the same across
// serverless invocations. Issued only after a lead is successfully saved
// (see app/api/resources/strategic-brief/route.ts) — the file itself lives
// outside public/, so this token is the only way to reach it.
const TOKEN_TTL_MS = 15 * 60 * 1000;

function getSecret(): string {
  const secret = process.env.BETTER_AUTH_SECRET;
  if (!secret) throw new Error("BETTER_AUTH_SECRET is not set");
  return secret;
}

function sign(payload: string): string {
  return createHmac("sha256", getSecret()).update(payload).digest("base64url");
}

export function createDownloadToken(resource: string): string {
  const expiresAt = Date.now() + TOKEN_TTL_MS;
  const payload = `${resource}.${expiresAt}`;
  return Buffer.from(`${payload}.${sign(payload)}`).toString("base64url");
}

export function verifyDownloadToken(token: string, resource: string): boolean {
  try {
    const [tokenResource, expiresAtRaw, signature] = Buffer.from(token, "base64url")
      .toString("utf8")
      .split(".");
    if (tokenResource !== resource || !signature) return false;

    const expiresAt = Number(expiresAtRaw);
    if (!Number.isFinite(expiresAt) || Date.now() > expiresAt) return false;

    const expected = Buffer.from(sign(`${tokenResource}.${expiresAtRaw}`));
    const actual = Buffer.from(signature);
    return expected.length === actual.length && timingSafeEqual(expected, actual);
  } catch {
    return false;
  }
}
