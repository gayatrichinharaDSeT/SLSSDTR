import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ProgramCard from "@/components/home/ProgramCard";
import Reveal from "@/components/ui/Reveal";
import { programs } from "@/data/programs";

export default function ProgramsSection() {
  return (
    <section className="bg-mist py-16 sm:py-20 lg:py-24">
      <Container className="flex flex-col gap-12">
        <SectionHeading
          eyebrow="AI Transformation"
          title="AI Transformation for the Life Sciences Ecosystem"
          description="Practical programs designed for students, faculty, entrepreneurs and trainers."
          align="center"
          className="mx-auto max-w-2xl"
        />

        <div className="grid gap-6 sm:grid-cols-2">
          {programs.map((program, index) => (
            <Reveal key={program.slug} delay={index * 100}>
              <ProgramCard program={program} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
