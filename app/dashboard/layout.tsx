import type { ReactNode } from "react";
import Container from "@/components/ui/Container";
import PageHero from "@/components/ui/PageHero";
import DashboardNav from "@/components/dashboard/DashboardNav";
import LogoutButton from "@/components/dashboard/LogoutButton";
import { requireUser } from "@/lib/permissions";

// proxy.ts already redirects signed-out visitors before this renders, but
// that check only looks at cookie presence — requireUser() is the actual
// authorization: it re-verifies the session against the database and
// redirects to /login if it's missing or expired.
export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const user = await requireUser();

  return (
    <>
      <PageHero
        eyebrow="MY ACCOUNT"
        title={`Welcome, ${user.name.split(" ")[0]}`}
        description={user.email}
      >
        <LogoutButton />
      </PageHero>
      <section className="bg-white pb-16 sm:pb-20 lg:pb-24">
        <Container className="flex flex-col gap-8">
          <DashboardNav />
          {children}
        </Container>
      </section>
    </>
  );
}
