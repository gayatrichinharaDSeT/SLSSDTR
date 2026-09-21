import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import Badge from "@/components/ui/Badge";
import ProgramCard from "@/components/home/ProgramCard";
import FinalCTA from "@/components/home/FinalCTA";
import ProgramsVisual from "@/components/graphics/ProgramsVisual";
import { programs } from "@/data/programs";
import { learningModels } from "@/data/content";

export const metadata: Metadata = {
  title: "Programs | SLSSDTR",
  description:
    "Explore SLSSDTR's AI transformation programs and Life Sciences certificate programs — practical, industry-oriented and project-based.",
};

export default function ProgramsPage() {
  return (
    <>
      <PageHero
        eyebrow="PROGRAMS"
        title="Programs Designed for Transformation"
        description="Practical, industry-aligned programs for students, faculty, entrepreneurs and trainers across the life sciences ecosystem."
        visual={<ProgramsVisual />}
      />

      <section className="bg-white py-16 sm:py-20">
        <Container className="flex flex-col gap-12">
          <SectionHeading
            eyebrow="AI Transformation Programs"
            title="AI Transformation for the Life Sciences Ecosystem"
            description="Four focused programs, each designed for a distinct audience within the life sciences and healthcare ecosystem."
          />
          <div className="grid gap-6 sm:grid-cols-2">
            {programs.map((program) => (
              <ProgramCard key={program.slug} program={program} />
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-mist py-16 sm:py-20">
        <Container className="flex flex-col gap-8">
          <SectionHeading
            eyebrow="Certificate Programs"
            title="Life Sciences Certificate Programs"
            description="Industry-oriented, practical, real-world focused, project-based, case-study driven and experiential — built for professionals across the life sciences ecosystem."
          />

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-card border border-navy/10 bg-white p-7 transition-all duration-200 hover:-translate-y-1 hover:border-green/40 hover:shadow-lg hover:shadow-navy/5">
              <h3 className="font-heading text-lg font-bold text-navy">
                Learning Structure
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink">
                A standard structure of 100 hours delivered over 6 months, designed
                to fit around professional and academic commitments.
              </p>
            </div>
            <div className="rounded-card border border-navy/10 bg-white p-7 transition-all duration-200 hover:-translate-y-1 hover:border-green/40 hover:shadow-lg hover:shadow-navy/5">
              <h3 className="font-heading text-lg font-bold text-navy">
                Delivery Models
              </h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {learningModels.map((model) => (
                  <Badge key={model} tone="blue">
                    {model}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <FinalCTA />
    </>
  );
}
