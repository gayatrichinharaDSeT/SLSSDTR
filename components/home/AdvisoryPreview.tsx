import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { advisoryBoard } from "@/data/advisory";

export default function AdvisoryPreview() {
  return (
    <section className="bg-mist py-16 sm:py-20 lg:py-24">
      <Container className="flex flex-col gap-12">
        <SectionHeading
          eyebrow="Advisory Board"
          title="Guided by Industry Advisors"
          align="center"
          className="mx-auto max-w-2xl"
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
              <h3 className="font-heading text-sm font-bold text-navy">{member.name}</h3>
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <Button href="/team" variant="secondary">
            Meet Our Team
          </Button>
        </div>
      </Container>
    </section>
  );
}
