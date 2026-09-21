import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { foundingTeam } from "@/data/team";

export default function LeadershipPreview() {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <Container className="flex flex-col gap-12">
        <SectionHeading
          eyebrow="Leadership"
          title="Led by Founders Committed to Life Sciences"
          align="center"
          className="mx-auto max-w-2xl"
        />

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
                <h3 className="font-heading text-lg font-bold text-navy">{member.name}</h3>
                <p className="text-sm font-semibold text-green">{member.role}</p>
                <p className="text-xs leading-relaxed text-ink/80">{member.bio.join(" · ")}</p>
              </div>
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
