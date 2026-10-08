import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import Container from "@/components/ui/Container";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminNav from "@/components/admin/AdminNav";
import { requireAdmin } from "@/lib/permissions";
import { isAdminPanelEnabled } from "@/lib/feature-flags";

// requireAdmin() re-checks both session and role server-side on every
// request — proxy.ts only confirms a session cookie exists, it does not
// (and cannot, at the edge, without a DB round trip) know the role, so a
// signed-in non-admin who reaches this layout is still redirected here.
//
// isAdminPanelEnabled() is a separate, temporary gate for the first
// client-review deployment (see lib/feature-flags.ts) — checked before
// requireAdmin() so a disabled panel 404s for everyone, including real
// admins, without ever touching the session/role logic below it.
export default async function AdminLayout({ children }: { children: ReactNode }) {
  if (!isAdminPanelEnabled()) notFound();

  const admin = await requireAdmin();

  return (
    <>
      <AdminHeader email={admin.email} role={admin.role} />
      <section className="bg-grey/40 pb-16 sm:pb-20 lg:pb-24">
        <Container className="flex flex-col gap-6 pt-6 sm:pt-8">
          <AdminNav />
          {children}
        </Container>
      </section>
    </>
  );
}
