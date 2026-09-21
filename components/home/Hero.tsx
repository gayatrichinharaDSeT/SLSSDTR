import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import HeroVisual from "@/components/graphics/HeroVisual";
import { site } from "@/data/site";
import { valueStrip } from "@/data/values";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-mist/60 via-white to-white">
      <Container className="grid items-center gap-12 pt-10 pb-10 sm:pt-14 sm:pb-12 lg:grid-cols-2 lg:pt-16 lg:pb-16">
        <div className="flex flex-col items-start gap-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-green/25 bg-mist px-4 py-1.5 text-xs font-semibold tracking-wide text-green-dark font-heading">
            {site.eyebrow}
          </span>

          <h1 className="font-heading text-[40px] font-extrabold leading-[1.08] text-navy sm:text-[52px] lg:text-[68px]">
            {site.tagline}
          </h1>

          <p className="max-w-xl text-base leading-relaxed text-ink sm:text-lg">
            {site.heroSupportingCopy}
          </p>

          <div className="flex flex-col gap-3 pt-2 sm:flex-row">
            <Button href="/programs" variant="primary">
              Explore Programs
            </Button>
            <Button href="/about" variant="secondary">
              Discover SLSSDTR
            </Button>
          </div>
        </div>

        <HeroVisual />
      </Container>

      <Container className="border-t border-navy/10 py-6">
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {valueStrip.map(({ icon: Icon, label }) => (
            <li key={label} className="flex items-center gap-2.5">
              <Icon className="h-4 w-4 shrink-0 text-green" strokeWidth={1.75} aria-hidden="true" />
              <span className="font-heading text-sm font-semibold text-navy">{label}</span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
