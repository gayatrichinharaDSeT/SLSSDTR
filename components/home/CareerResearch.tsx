import Container from "@/components/ui/Container";
import { careerDevelopment, researchInnovation } from "@/data/content";

export default function CareerResearch() {
  return (
    <section className="bg-navy py-16 text-white sm:py-20 lg:py-24">
      <Container className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <h2 className="sr-only">Career Development and Research &amp; Innovation</h2>
        <div className="flex flex-col gap-6">
          <span className="h-1.5 w-1.5 rounded-full bg-yellow" aria-hidden="true" />
          <h3 className="font-heading text-3xl font-bold text-white">Career Development</h3>
          <ul className="flex flex-col gap-3">
            {careerDevelopment.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-white/10 text-white">
                  <Icon className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
                </span>
                <span className="text-sm font-medium text-white/85">{label}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-6">
          <span className="h-1.5 w-1.5 rounded-full bg-yellow" aria-hidden="true" />
          <h3 className="font-heading text-3xl font-bold text-white">Research & Innovation</h3>
          <ul className="flex flex-col gap-3">
            {researchInnovation.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-white/10 text-white">
                  <Icon className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
                </span>
                <span className="text-sm font-medium text-white/85">{label}</span>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
