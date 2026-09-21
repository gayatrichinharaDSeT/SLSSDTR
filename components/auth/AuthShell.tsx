import type { ReactNode } from "react";
import Container from "@/components/ui/Container";
import PageHero from "@/components/ui/PageHero";

type AuthShellProps = {
  eyebrow: string;
  title: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
};

// Shared frame for /login, /signup, /forgot-password, /reset-password,
// /verify-email — reuses PageHero/Container so these pages sit inside the
// same shell as the rest of the site instead of looking like a separate
// generic auth product.
export default function AuthShell({ eyebrow, title, description, children, footer }: AuthShellProps) {
  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} description={description} align="center" />
      <section className="bg-white pb-16 sm:pb-20 lg:pb-24">
        <Container>
          <div className="mx-auto flex w-full max-w-md flex-col gap-6 rounded-card border border-navy/10 bg-white p-7 shadow-sm sm:p-9">
            {children}
          </div>
          {footer ? (
            <p className="mt-6 text-center text-sm text-ink">{footer}</p>
          ) : null}
        </Container>
      </section>
    </>
  );
}
