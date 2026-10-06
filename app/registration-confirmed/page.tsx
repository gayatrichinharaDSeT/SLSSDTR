import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import Container from "@/components/ui/Container";
import PageHero from "@/components/ui/PageHero";
import Button from "@/components/ui/Button";
import { prisma } from "@/lib/prisma";
import { getProgramByAcademySlug } from "@/data/programs";

export const metadata: Metadata = {
  title: "Registration Confirmed | SLSSDTR",
  description: "Your program registration and payment with DSet Academy are confirmed.",
  robots: { index: false, follow: false },
};

type PageProps = {
  searchParams: Promise<{
    program?: string;
    name?: string;
    email?: string;
    phone?: string;
    batch?: string;
    amount?: string;
    order_id?: string;
  }>;
};

// A visitor lands here after completing registration + payment on DSet
// Academy's own site (see lib/academy-redirect.ts's return_url). If DSet's
// redirect includes the confirmation details below, this records it as a
// ProgramEnquiry here too — reusing the existing table/admin view rather
// than a new model, same pattern already used for the strategic-brief
// lead (see getEnquirySourceLabel). order_id is used purely to avoid
// creating a duplicate row if this page is reloaded.
//
// These exact param names (program, name, email, phone, batch, amount,
// order_id) are proposed to DSet — not yet confirmed as what they'll
// actually send. Until they do, no params arrive and this just shows the
// generic thank-you below.
export default async function RegistrationConfirmedPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const program = params.program ? getProgramByAcademySlug(params.program) : undefined;

  if (program && params.name && params.email && params.order_id) {
    const alreadyRecorded = await prisma.programEnquiry.findFirst({
      where: { message: { contains: params.order_id } },
    });

    if (!alreadyRecorded) {
      await prisma.programEnquiry.create({
        data: {
          programId: program.slug,
          name: params.name,
          email: params.email,
          phone: params.phone || null,
          preferredBatch: params.batch || null,
          status: "NEW",
          message: `✅ Registration confirmed & paid via DSet Academy. Order ID: ${params.order_id}.${
            params.amount ? ` Amount: ₹${params.amount}.` : ""
          }`,
        },
      });
    }
  }

  return (
    <>
      <PageHero eyebrow="REGISTRATION" title="You're All Set" align="center" />

      <section className="bg-white pb-16 sm:pb-20 lg:pb-24">
        <Container className="mx-auto flex max-w-xl flex-col items-center gap-6 text-center">
          <CheckCircle2 className="h-16 w-16 text-green" strokeWidth={1.5} aria-hidden="true" />
          <p className="text-base leading-relaxed text-ink sm:text-lg">
            Thank you — your registration and payment with DSet Academy are confirmed. A member of the
            SLSSDTR team will be in touch with your cohort details shortly.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button href="/programs" variant="primary">
              Explore More Programs
            </Button>
            <Button href="/" variant="secondary">
              Back to Home
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
