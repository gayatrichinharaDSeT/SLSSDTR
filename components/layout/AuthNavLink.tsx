"use client";

import Link from "next/link";
import { useSession } from "@/lib/auth-client";

// Single, minimal account entry point in the navbar — deliberately not a
// full account menu, to avoid overcrowding the existing nav.
export default function AuthNavLink() {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return <span className="h-5 w-16" aria-hidden="true" />;
  }

  if (!session) {
    return (
      <Link
        href="/login"
        className="text-sm font-semibold font-heading text-ink transition-colors duration-200 hover:text-green"
      >
        Sign In
      </Link>
    );
  }

  // Admin panel is 404'd for the first client-review deployment (see
  // lib/feature-flags.ts) — send admin accounts to /dashboard like
  // everyone else instead of linking to a route that won't resolve.
  const isAdminPanelEnabled = process.env.NEXT_PUBLIC_ADMIN_PANEL_ENABLED === "true";
  const showAdminLink = session.user.role === "ADMIN" && isAdminPanelEnabled;

  return (
    <Link
      href={showAdminLink ? "/admin" : "/dashboard"}
      className="text-sm font-semibold font-heading text-ink transition-colors duration-200 hover:text-green"
    >
      {showAdminLink ? "Admin" : "Dashboard"}
    </Link>
  );
}
