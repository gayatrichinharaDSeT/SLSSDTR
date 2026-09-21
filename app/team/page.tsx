import type { Metadata } from "next";
import { Hourglass } from "lucide-react";
import Container from "@/components/ui/Container";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { foundingTeam } from "@/data/team";
import { advisoryBoard, advisoryAreas, chiefConvenorsNote } from "@/data/advisory";

export const metadata: Metadata = {
  title: "Team | SLSSDTR",
  description:
    "Meet the founding team and advisory board guiding SLSSDTR's mission in life sciences skill development, training and research.",
};

export default function TeamPage() {
  return (
    <>
      <PageHero
        eyebrow="TEAM"
        title="The People Behind SLSSDTR"
        description="A founding team and advisory board bringing decades of entrepreneurial, operational and industry experience to life sciences skill development."
      />

      <section className="bg-white py-16 sm:py-20">
        <Container className="flex flex-col gap-12">
          <SectionHeading eyebrow="Founding Team" title="Founding Team" />
          <div className="grid gap-6 sm:grid-cols-2">
            {foundingTeam.map((member) => (
              <div
                key={member.name}
                className="flex flex-col gap-4 rounded-card border border-navy/10 bg-white p-7 shadow-sm sm:flex-row sm:items-start"
              >
                <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-navy font-heading text-lg font-bold text-white">
                  {member.initials}
                </span>
                <div className="flex flex-col gap-2">
                  <h3 className="font-heading text-lg font-bold text-navy">
                    {member.name}
                  </h3>
                  <p className="text-sm font-semibold text-green">{member.role}</p>
                  <ul className="mt-1 flex flex-col gap-1">
                    {member.bio.map((point) => (
                      <li key={point} className="text-sm leading-relaxed text-ink">
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-mist py-16 sm:py-20">
        <Container className="flex flex-col gap-12">
          <SectionHeading
            eyebrow="Advisory Board"
            title="Advisory Board"
            description="Advising SLSSDTR across areas including pharma innovation, African markets, business transformation, data analytics, healthcare strategy, MedTech, clinical integration and digital transformation."
          />

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {advisoryBoard.map((member) => (
              <div
                key={member.name}
                className="flex flex-col items-center gap-3 rounded-card border border-navy/10 bg-white p-6 text-center shadow-sm"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-blue/10 font-heading text-base font-bold text-blue">
                  {member.initials}
                </span>
                <h3 className="font-heading text-sm font-bold text-navy">
                  {member.name}
                </h3>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {advisoryAreas.map((area) => (
              <span
                key={area}
                className="rounded-full bg-white px-4 py-1.5 text-xs font-semibold font-heading text-navy"
              >
                {area}
              </span>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <Container>
          <SectionHeading eyebrow="Chief Convenors" title="Chief Convenors" className="mb-8" />
          <div className="flex flex-col items-start gap-4 rounded-card border border-navy/10 bg-grey p-8 sm:flex-row sm:items-center">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[10px] bg-mist text-green">
              <Hourglass className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
            </span>
            <p className="text-sm leading-relaxed text-ink">{chiefConvenorsNote}</p>
          </div>
        </Container>
      </section>

      <section className="bg-navy py-16 text-center text-white sm:py-20">
        <Container className="flex flex-col items-center gap-6">
          <h2 className="max-w-xl font-heading text-3xl font-extrabold text-white sm:text-4xl">
            Explore What SLSSDTR Has to Offer
          </h2>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              href="/programs"
              variant="primary"
              className="bg-white text-navy hover:bg-yellow hover:text-navy"
            >
              Explore Programs
            </Button>
            <Button
              href="/contact"
              variant="secondary"
              className="border-white text-white hover:bg-white hover:text-navy"
            >
              Contact Us
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
