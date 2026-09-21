import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { industryAreas } from "@/data/content";

export default function IndustryConnect() {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="flex flex-col gap-6">
          <SectionHeading
            eyebrow="Industry Connect"
            title="Connecting Learning With Industry"
            description="SLSSDTR connects learning with the industry areas that shape the life sciences ecosystem — from R&D to commercial operations, manufacturing and product development."
          />
          <div>
            <Button href="/industry-connect" variant="secondary">
              Partner With Us
            </Button>
          </div>
        </div>

        <ul className="grid grid-cols-2 gap-3">
          {industryAreas.map((area) => (
            <li
              key={area}
              className="rounded-card border border-navy/10 bg-grey px-4 py-3 text-sm font-semibold font-heading text-navy"
            >
              {area}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
