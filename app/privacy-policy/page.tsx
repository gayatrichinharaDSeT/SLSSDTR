import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/ui/Container";
import PageHero from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "Privacy Policy | SLSSDTR",
  description: "How SLSSDTR collects, uses and protects your personal information.",
  robots: { index: true, follow: true },
};

const lastUpdated = "September 2026";

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero
        eyebrow="LEGAL"
        title="Privacy Policy"
        description={`Last updated: ${lastUpdated}`}
      />

      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <Container className="mx-auto flex max-w-3xl flex-col gap-10">
          <div className="flex flex-col gap-4 text-sm leading-relaxed text-ink sm:text-base">
            <p>
              School of Life Science – Skill Development, Training &amp; Research (&ldquo;SLSSDTR&rdquo;,
              &ldquo;we&rdquo;, &ldquo;us&rdquo;) respects your privacy. This policy explains what
              information we collect through this website, why we collect it, and how it is used and
              protected. SLSSDTR&apos;s programs are delivered in partnership with DSet Academy; where
              relevant, this policy also explains how information may be shared with that partner for
              program delivery.
            </p>
          </div>

          <section className="flex flex-col gap-3">
            <h2 className="font-heading text-xl font-bold text-navy">1. Information We Collect</h2>
            <p className="text-sm leading-relaxed text-ink sm:text-base">
              We collect information you choose to provide directly through our forms and account
              features, including:
            </p>
            <ul className="flex flex-col gap-2 text-sm leading-relaxed text-ink sm:text-base">
              <li>
                <strong>Program enquiries and registrations:</strong> name, email, phone number,
                organization, profession/role, and the program or batch you&apos;re interested in.
              </li>
              <li>
                <strong>Contact form submissions:</strong> name, email, phone number, organization, area
                of interest, and your message.
              </li>
              <li>
                <strong>Customized module requests:</strong> name, email, phone number, organization,
                the departments and program you&apos;re enquiring about, and any additional requirements
                you share.
              </li>
              <li>
                <strong>Account registration:</strong> if you create an account, the profile details you
                choose to provide (e.g. profession, institution, company details) to help us serve you
                better.
              </li>
              <li>
                <strong>Resource downloads:</strong> if you request a gated resource such as a strategic
                brief, the details you submit on that form.
              </li>
            </ul>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="font-heading text-xl font-bold text-navy">2. How We Use Your Information</h2>
            <ul className="flex flex-col gap-2 text-sm leading-relaxed text-ink sm:text-base">
              <li>To respond to your enquiries and requests.</li>
              <li>To process program registrations and communicate batch/scheduling details.</li>
              <li>To send you the resources you specifically request (e.g. a strategic brief PDF).</li>
              <li>To improve our programs, website and communications.</li>
              <li>To maintain the security and integrity of our systems.</li>
            </ul>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="font-heading text-xl font-bold text-navy">3. Sharing With DSet Academy</h2>
            <p className="text-sm leading-relaxed text-ink sm:text-base">
              SLSSDTR&apos;s programs are delivered jointly with DSet Academy. Enquiry and registration
              details relevant to a program you&apos;ve expressed interest in may be shared with DSet
              Academy for program delivery, scheduling, and related communication. We do not sell your
              personal information to third parties, and we do not share it for unrelated marketing
              purposes.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="font-heading text-xl font-bold text-navy">4. Data Storage &amp; Security</h2>
            <p className="text-sm leading-relaxed text-ink sm:text-base">
              Information you submit is stored in a secured database with access restricted to
              authorized personnel. We apply reasonable technical and organizational measures to protect
              your information, including secure authentication and encrypted connections. No online
              system can be guaranteed 100% secure, but we work to keep your information protected.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="font-heading text-xl font-bold text-navy">5. Cookies</h2>
            <p className="text-sm leading-relaxed text-ink sm:text-base">
              This website uses only the essential session cookie required to keep you signed in when you
              create an account. We do not currently use advertising or third-party tracking cookies.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="font-heading text-xl font-bold text-navy">6. Your Rights</h2>
            <p className="text-sm leading-relaxed text-ink sm:text-base">
              You may request access to, correction of, or deletion of your personal information held by
              us at any time by reaching out through our{" "}
              <Link href="/contact" className="font-semibold text-green hover:text-green-dark">
                Contact page
              </Link>
              . We will respond to reasonable requests within a reasonable timeframe.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="font-heading text-xl font-bold text-navy">7. Children&apos;s Privacy</h2>
            <p className="text-sm leading-relaxed text-ink sm:text-base">
              Our programs and this website are intended for students, faculty, professionals and
              institutions, and are not directed at children. We do not knowingly collect personal
              information from children.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="font-heading text-xl font-bold text-navy">8. Changes to This Policy</h2>
            <p className="text-sm leading-relaxed text-ink sm:text-base">
              We may update this policy from time to time to reflect changes in our practices. The
              &ldquo;Last updated&rdquo; date above will be revised whenever this policy changes.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="font-heading text-xl font-bold text-navy">9. Contact Us</h2>
            <p className="text-sm leading-relaxed text-ink sm:text-base">
              For any questions about this Privacy Policy or how your information is handled, please
              reach out through our{" "}
              <Link href="/contact" className="font-semibold text-green hover:text-green-dark">
                Contact page
              </Link>
              .
            </p>
          </section>

          <p className="rounded-card border border-navy/10 bg-mist p-5 text-xs leading-relaxed text-ink/70">
            This policy is a general statement of our data practices and is provided as a starting point.
            It should be reviewed by qualified legal counsel before being treated as a final, binding
            legal document.
          </p>
        </Container>
      </section>
    </>
  );
}
