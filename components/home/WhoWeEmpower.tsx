import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import IconBox from "@/components/ui/IconBox";
import { audienceCards } from "@/data/values";

export default function WhoWeEmpower() {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <Container className="flex flex-col gap-12">
        <SectionHeading
          eyebrow="Who We Serve"
          title="Learning Designed Around People"
          align="center"
          className="mx-auto max-w-2xl"
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {audienceCards.map(({ icon, title, description }) => (
            <div
              key={title}
              className="group flex flex-col gap-4 rounded-card border border-navy/10 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-green/40 hover:shadow-md"
            >
              <IconBox icon={icon} />
              <h3 className="font-heading text-xl font-bold text-navy">{title}</h3>
              <p className="text-sm leading-relaxed text-ink">{description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
