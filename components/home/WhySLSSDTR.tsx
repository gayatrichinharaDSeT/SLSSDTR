import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import IconBox from "@/components/ui/IconBox";
import Reveal from "@/components/ui/Reveal";
import { whySlssdtr } from "@/data/values";

export default function WhySLSSDTR() {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <Container className="flex flex-col gap-12">
        <SectionHeading
          eyebrow="Why SLSSDTR"
          title="Why SLSSDTR"
          align="center"
          className="mx-auto max-w-2xl"
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {whySlssdtr.map(({ icon, title, description }, index) => (
            <Reveal key={title} delay={index * 80}>
              <div className="group flex h-full flex-col gap-4 rounded-card border border-navy/10 bg-white p-6 transition-all duration-200 hover:-translate-y-1 hover:border-green/40 hover:shadow-lg hover:shadow-navy/5">
                <IconBox icon={icon} tone="blue" />
                <h3 className="font-heading text-xl font-bold text-navy">{title}</h3>
                <p className="text-sm leading-relaxed text-ink">{description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
