import { NextResponse, type NextRequest } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

// Coarse, edge-safe gate only: it checks whether a session cookie is
// present, not whether the session is actually valid or what role the
// user has — a forged/expired cookie still passes this check. The real
// authorization happens server-side in app/dashboard/layout.tsx and
// app/admin/layout.tsx via requireUser()/requireAdmin() (lib/permissions.ts),
// which re-verify the session against the database on every request.
// This file exists purely to redirect obviously-signed-out visitors
// before they render a protected page.
export function proxy(request: NextRequest) {
  const sessionCookie = getSessionCookie(request);

  if (!sessionCookie) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"],
};
