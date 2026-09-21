import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import HeroVisual from "@/components/graphics/HeroVisual";
import { site } from "@/data/site";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-mist/60 via-white to-white">
      <Container className="grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-2 lg:py-28">
        <div className="flex animate-fade-up flex-col items-start gap-6 opacity-0">
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

        <div className="animate-fade-up opacity-0 [animation-delay:150ms]">
          <HeroVisual />
        </div>
      </Container>
    </section>
  );
}
