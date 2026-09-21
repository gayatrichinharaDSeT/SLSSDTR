import { NextResponse, type NextRequest } from "next/server";
import { getSessionCookie } from "better-auth/cookies";
import { isAdminPanelEnabled } from "@/lib/feature-flags";

// Coarse, edge-safe gate only: it checks whether a session cookie is
// present, not whether the session is actually valid or what role the
// user has — a forged/expired cookie still passes this check. The real
// authorization happens server-side in app/dashboard/layout.tsx and
// app/admin/layout.tsx via requireUser()/requireAdmin() (lib/permissions.ts),
// which re-verify the session against the database on every request.
// This file exists purely to redirect obviously-signed-out visitors
// before they render a protected page.
export function proxy(request: NextRequest) {
  // When the admin panel is disabled (see lib/feature-flags.ts), an
  // unauthenticated visitor to /admin must still see a 404, not a
  // redirect to /login — a redirect would reveal that a protected route
  // exists there at all. Skip the cookie check here so the request
  // reaches app/admin/layout.tsx, whose own notFound() call renders the
  // real 404 regardless of session state.
  if (request.nextUrl.pathname.startsWith("/admin") && !isAdminPanelEnabled()) {
    return NextResponse.next();
  }

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
