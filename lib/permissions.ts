import "server-only";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export type CurrentUser = {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  role: string;
  phone: string | null;
  organization: string | null;
};

// The only place that reads a session. Every protected page, layout, and
// API route goes through this (directly or via requireUser/requireAdmin)
// so authorization is always re-checked server-side against the database
// session — never inferred from a client-supplied role, a cookie's
// presence alone, or the coarse redirect in proxy.ts.
export async function getSession() {
  const session = await auth.api.getSession({ headers: await headers() });
  return session;
}

export function toCurrentUser(user: {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  phone?: string | null;
  organization?: string | null;
  role?: string | null;
}): CurrentUser {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    emailVerified: user.emailVerified,
    role: user.role ?? "USER",
    phone: user.phone ?? null,
    organization: user.organization ?? null,
  };
}

// For Server Components / layouts: redirects rather than rendering a
// broken page when there's no session.
export async function requireUser(): Promise<CurrentUser> {
  const session = await getSession();
  if (!session) redirect("/login");
  return toCurrentUser(session.user);
}

export async function requireAdmin(): Promise<CurrentUser> {
  const user = await requireUser();
  if (user.role !== "ADMIN") redirect("/dashboard");
  return user;
}

// For Route Handlers: never redirects (an API response can't 302 a fetch
// call meaningfully) — callers return apiError("UNAUTHENTICATED"/
// "UNAUTHORIZED") themselves when these return null.
export async function getApiUser(): Promise<CurrentUser | null> {
  const session = await getSession();
  return session ? toCurrentUser(session.user) : null;
}

export async function getApiAdmin(): Promise<CurrentUser | null> {
  const user = await getApiUser();
  return user?.role === "ADMIN" ? user : null;
}
