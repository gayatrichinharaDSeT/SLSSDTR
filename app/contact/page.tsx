import type { Metadata } from "next";
import { MessageCircle, Rocket, Handshake } from "lucide-react";
import Container from "@/components/ui/Container";
import PageHero from "@/components/ui/PageHero";
import Button from "@/components/ui/Button";
import IconBox from "@/components/ui/IconBox";
import ContactForm from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact | SLSSDTR",
  description:
    "Get in touch with SLSSDTR to explore programs, ask questions or discuss a partnership.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="CONTACT"
        title="Let's Start the Conversation"
        description="Share a few details and our team will get back to you. Whether you're exploring a program or interested in partnering with SLSSDTR, we'd like to hear from you."
        align="center"
      />

      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <Container className="grid items-start gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          <div className="rounded-card border border-navy/10 bg-white p-7 shadow-sm transition-shadow duration-300 hover:shadow-lg hover:shadow-navy/5 sm:p-9">
            <div className="mb-7 flex items-center gap-3">
              <IconBox icon={MessageCircle} tone="green" />
              <div>
                <h2 className="font-heading text-xl font-bold text-navy">Send Us a Message</h2>
                <p className="text-sm text-ink/70">We usually respond within a few business days.</p>
              </div>
            </div>
            <ContactForm />
          </div>

          <div className="flex flex-col gap-8">
            <div className="group rounded-card border border-navy/10 bg-mist p-7 transition-all duration-200 hover:-translate-y-1 hover:border-green/40 hover:shadow-lg hover:shadow-navy/5">
              <IconBox icon={Rocket} tone="blue" className="mb-4" />
              <h2 className="font-heading text-xl font-bold text-navy">
                Explore What SLSSDTR Offers
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-ink">
                Browse our AI transformation and life sciences programs to find the
                path that fits your goals.
              </p>
              <div className="mt-5">
                <Button href="/programs" variant="secondary">
                  Explore Programs
                </Button>
              </div>
            </div>

            <div className="group rounded-card border border-navy/10 bg-mist p-7 transition-all duration-200 hover:-translate-y-1 hover:border-green/40 hover:shadow-lg hover:shadow-navy/5">
              <IconBox icon={Handshake} tone="green" className="mb-4" />
              <h2 className="font-heading text-xl font-bold text-navy">
                Partner With SLSSDTR
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-ink">
                Interested in collaborating on training, research or industry
                connect initiatives? Let&apos;s talk.
              </p>
              <div className="mt-5">
                <Button href="/industry-connect" variant="secondary">
                  Partner With Us
                </Button>
              </div>
            </div>

            <p className="text-xs leading-relaxed text-ink/60">
              Official contact details will be published here once finalized.
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
