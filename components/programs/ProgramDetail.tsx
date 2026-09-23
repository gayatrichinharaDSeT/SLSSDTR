import type { ReactNode } from "react";
import { Check, Download } from "lucide-react";
import Container from "@/components/ui/Container";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import EnquireButton from "@/components/programs/EnquireButton";
import { formatProgramPrice, type Program } from "@/data/programs";
import { getActiveBatches } from "@/lib/batches";

type ProgramDetailProps = {
  program: Program;
  children?: ReactNode;
};

const FACT_LABELS = ["Duration", "Format", "Investment"] as const;

export default async function ProgramDetail({ program, children }: ProgramDetailProps) {
  const facts = [program.duration, program.format, formatProgramPrice(program.price)];
  const batches = await getActiveBatches();

  return (
    <>
      <PageHero eyebrow="PROGRAM" title={program.name} description={program.summary}>
        {program.flagship ? (
          <Badge tone="yellow" className="mt-1">
            FLAGSHIP PROGRAM
          </Badge>
        ) : null}
      </PageHero>

      <section className="bg-white pb-4">
        <Container>
          <div className="grid gap-4 sm:grid-cols-3">
            {facts.map((value, index) => (
              <div
                key={FACT_LABELS[index]}
                className="rounded-card border border-navy/10 bg-mist p-5"
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-green">
                  {FACT_LABELS[index]}
                </p>
                <p className="mt-1 font-heading text-base font-bold text-navy">{value}</p>
              </div>
            ))}
          </div>
          <a
            href={program.brochureUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 text-sm font-semibold font-heading text-green hover:text-green-dark"
          >
            <Download className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
            Download Brochure
          </a>
        </Container>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <Container className="grid gap-16">
          <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
            <div className="flex flex-col gap-5">
              <SectionHeading eyebrow="Program Overview" title="What This Program Is About" />
              <div className="flex flex-col gap-4">
                {program.overview.map((paragraph, index) => (
                  <p key={index} className="text-base leading-relaxed text-ink">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-4 rounded-card border border-navy/10 bg-mist p-7">
              <h3 className="font-heading text-lg font-bold text-navy">Who It Is For</h3>
              <ul className="flex flex-col gap-3">
                {program.audience.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-ink">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-green" strokeWidth={2} aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <SectionHeading eyebrow="Key Focus Areas" title="Key Focus Areas" />
            <div className="flex flex-wrap gap-3">
              {program.focusAreas.map((area) => (
                <span
                  key={area}
                  className="rounded-full border border-navy/10 bg-grey px-4 py-2 text-sm font-semibold font-heading text-navy"
                >
                  {area}
                </span>
              ))}
            </div>
          </div>

          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="flex flex-col gap-5">
              <SectionHeading eyebrow="Learning Approach" title="How the Program Is Delivered" />
              <ul className="flex flex-col gap-3">
                {program.learningApproach.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-ink">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-blue" strokeWidth={2} aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-5">
              <SectionHeading eyebrow="Outcomes" title="Capability Development" />
              <ul className="flex flex-col gap-3">
                {program.outcomes.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-ink">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-green" strokeWidth={2} aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-col gap-6 rounded-card border border-navy/10 bg-navy p-8 text-white sm:p-10">
            <SectionHeading
              eyebrow="Application Areas"
              title="Where This Learning Applies"
              tone="dark"
            />
            <div className="flex flex-wrap gap-3">
              {program.applicationAreas.map((area) => (
                <span
                  key={area}
                  className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold font-heading text-white"
                >
                  {area}
                </span>
              ))}
            </div>
          </div>

          {children}

          <div className="flex flex-col items-center gap-4 rounded-card bg-mist p-8 text-center sm:p-10">
            <h3 className="font-heading text-2xl font-bold text-navy">
              Ready to take the next step?
            </h3>
            <p className="max-w-xl text-sm text-ink">
              Connect with the SLSSDTR team to learn more about this program and how
              to get involved.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <EnquireButton programId={program.slug} programName={program.name} batches={batches} />
              <Button href="/contact" variant="secondary">
                Contact Us
              </Button>
              <Button href="/programs" variant="ghost">
                View All Programs
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
