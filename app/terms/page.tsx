import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/ui/Container";
import PageHero from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "Terms of Service | SLSSDTR",
  description: "The terms that govern your use of the SLSSDTR website.",
  robots: { index: true, follow: true },
};

const lastUpdated = "September 2026";

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="LEGAL"
        title="Terms of Service"
        description={`Last updated: ${lastUpdated}`}
      />

      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <Container className="mx-auto flex max-w-3xl flex-col gap-10">
          <p className="text-sm leading-relaxed text-ink sm:text-base">
            These Terms of Service (&ldquo;Terms&rdquo;) govern your use of the School of Life Science –
            Skill Development, Training &amp; Research (&ldquo;SLSSDTR&rdquo;) website. By using this
            website, you agree to these Terms. If you do not agree, please do not use the website.
          </p>

          <section className="flex flex-col gap-3">
            <h2 className="font-heading text-xl font-bold text-navy">1. About SLSSDTR</h2>
            <p className="text-sm leading-relaxed text-ink sm:text-base">
              SLSSDTR provides industry-aligned skill development, training and research programs for the
              life sciences ecosystem, delivered in partnership with DSet Academy. This website is
              informational and enables enquiries, registrations and resource requests related to those
              programs.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="font-heading text-xl font-bold text-navy">2. Use of This Website</h2>
            <p className="text-sm leading-relaxed text-ink sm:text-base">
              You agree to use this website only for lawful purposes and to provide accurate information
              when submitting any form (program enquiry, contact, customized module request, resource
              download, or account registration). You are responsible for maintaining the confidentiality
              of your own account credentials, if you create an account.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="font-heading text-xl font-bold text-navy">3. Program Enrollment &amp; Payments</h2>
            <p className="text-sm leading-relaxed text-ink sm:text-base">
              Submitting an enquiry or registration form on this website expresses interest in a program;
              it does not itself constitute enrollment. Actual enrollment, batch confirmation, and any
              associated payment are processed separately by DSet Academy as part of the SLSSDTR × DSet
              Academy partnership. This website does not process payments directly.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="font-heading text-xl font-bold text-navy">4. Training Assignments &amp; Outcomes</h2>
            <p className="text-sm leading-relaxed text-ink sm:text-base">
              Where a program (such as Train the Trainer) references potential paid training assignments,
              these are opportunities only — subject to individual program completion, certification, and
              assignment availability. SLSSDTR does not guarantee income, assignment volume, or specific
              career outcomes from any program.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="font-heading text-xl font-bold text-navy">5. Intellectual Property</h2>
            <p className="text-sm leading-relaxed text-ink sm:text-base">
              All content on this website — including text, graphics, logos, and downloadable resources
              such as program brochures and the strategic brief — belongs to SLSSDTR and/or its partners
              and is provided for your personal, informational use. You may not reproduce, redistribute,
              or use this content for commercial purposes without our prior written permission.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="font-heading text-xl font-bold text-navy">6. No Warranty &amp; Limitation of Liability</h2>
            <p className="text-sm leading-relaxed text-ink sm:text-base">
              This website and its content are provided &ldquo;as is&rdquo; without warranties of any
              kind, express or implied. To the fullest extent permitted by law, SLSSDTR shall not be
              liable for any indirect, incidental, or consequential damages arising from your use of this
              website.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="font-heading text-xl font-bold text-navy">7. Third-Party Links</h2>
            <p className="text-sm leading-relaxed text-ink sm:text-base">
              This website may reference or link to third-party resources, including DSet Academy. We are
              not responsible for the content or practices of third-party websites.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="font-heading text-xl font-bold text-navy">8. Governing Law</h2>
            <p className="text-sm leading-relaxed text-ink sm:text-base">
              These Terms are governed by the laws of India, without regard to conflict-of-law
              principles.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="font-heading text-xl font-bold text-navy">9. Changes to These Terms</h2>
            <p className="text-sm leading-relaxed text-ink sm:text-base">
              We may update these Terms from time to time. The &ldquo;Last updated&rdquo; date above will
              be revised whenever these Terms change. Continued use of the website after changes means
              you accept the revised Terms.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="font-heading text-xl font-bold text-navy">10. Contact Us</h2>
            <p className="text-sm leading-relaxed text-ink sm:text-base">
              For any questions about these Terms, please reach out through our{" "}
              <Link href="/contact" className="font-semibold text-green hover:text-green-dark">
                Contact page
              </Link>
              .
            </p>
          </section>

          <p className="rounded-card border border-navy/10 bg-mist p-5 text-xs leading-relaxed text-ink/70">
            These Terms are a general statement of use and are provided as a starting point. They should
            be reviewed by qualified legal counsel before being treated as a final, binding legal
            document.
          </p>
        </Container>
      </section>
    </>
  );
}
