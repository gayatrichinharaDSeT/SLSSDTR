import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";

export default function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-navy to-navy-dark py-16 text-white sm:py-20 lg:py-24">
      <div
        className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 animate-glow-pulse rounded-full bg-green/20 blur-3xl sm:h-96 sm:w-96"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-blue/20 blur-3xl"
        aria-hidden="true"
      />

      <svg
        className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 opacity-20 sm:h-96 sm:w-96"
        viewBox="0 0 400 400"
        aria-hidden="true"
      >
        <circle cx="200" cy="200" r="180" fill="none" stroke="#2F8C5C" strokeWidth="1" />
        <circle cx="200" cy="200" r="130" fill="none" stroke="#2F5F9B" strokeWidth="1" strokeDasharray="4 6" />
        <circle cx="200" cy="20" r="5" fill="#F6CE2E" />
        <circle cx="380" cy="200" r="4" fill="#2F8C5C" />
      </svg>

      <Reveal className="relative">
        <Container className="flex flex-col items-center gap-6 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-yellow/30 bg-yellow/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-yellow font-heading">
            LET&apos;S BUILD SOMETHING TOGETHER
          </span>
          <h2 className="max-w-2xl font-heading text-[32px] font-extrabold leading-tight text-white sm:text-[40px] lg:text-[46px]">
            Build Skills. Transform Careers. Shape the Future.
          </h2>
          <p className="max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
            Explore SLSSDTR&apos;s industry-aligned programs and connect with our team to
            discuss how we can support your learning and growth goals.
          </p>
          <div className="flex flex-col gap-3 pt-2 sm:flex-row">
            <Button href="/programs" variant="inverse">
              Explore Programs
            </Button>
            <Button href="/contact" variant="inverseOutline">
              Contact Us
            </Button>
          </div>
        </Container>
      </Reveal>
    </section>
  );
}
