import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { careerDevelopment, researchInnovation } from "@/data/content";

export default function CareerResearch() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-navy to-navy-dark py-16 text-white sm:py-20 lg:py-24">
      <div
        className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-blue/20 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 animate-glow-pulse rounded-full bg-green/20 blur-3xl"
        aria-hidden="true"
      />

      <Container className="relative grid gap-10 lg:grid-cols-2 lg:gap-10">
        <h2 className="sr-only">Career Development and Research &amp; Innovation</h2>

        <Reveal className="flex flex-col gap-6 rounded-xl border border-white/10 bg-white/5 p-8">
          <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-wide font-heading text-yellow">
            <span className="h-1.5 w-1.5 rounded-full bg-yellow" aria-hidden="true" />
            FOR LEARNERS
          </span>
          <h3 className="font-heading text-2xl font-bold text-white sm:text-3xl">Career Development</h3>
          <ul className="flex flex-col gap-2">
            {careerDevelopment.map(({ icon: Icon, label }) => (
              <li
                key={label}
                className="group flex items-center gap-3 rounded-btn p-2 transition-colors duration-200 hover:bg-white/10"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-white/10 text-white transition-transform duration-300 ease-out group-hover:scale-110 group-hover:bg-blue/30">
                  <Icon className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
                </span>
                <span className="text-sm font-medium text-white/85">{label}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={120} className="flex flex-col gap-6 rounded-xl border border-white/10 bg-white/5 p-8">
          <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-wide font-heading text-yellow">
            <span className="h-1.5 w-1.5 rounded-full bg-yellow" aria-hidden="true" />
            FOR THE ECOSYSTEM
          </span>
          <h3 className="font-heading text-2xl font-bold text-white sm:text-3xl">Research &amp; Innovation</h3>
          <ul className="flex flex-col gap-2">
            {researchInnovation.map(({ icon: Icon, label }) => (
              <li
                key={label}
                className="group flex items-center gap-3 rounded-btn p-2 transition-colors duration-200 hover:bg-white/10"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-white/10 text-white transition-transform duration-300 ease-out group-hover:scale-110 group-hover:bg-green/30">
                  <Icon className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
                </span>
                <span className="text-sm font-medium text-white/85">{label}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
