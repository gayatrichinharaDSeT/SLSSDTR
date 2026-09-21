import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

export default function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-navy py-16 text-white sm:py-20 lg:py-24">
      <svg
        className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 opacity-20 sm:h-96 sm:w-96"
        viewBox="0 0 400 400"
        aria-hidden="true"
      >
        <circle cx="200" cy="200" r="180" fill="none" stroke="#41835E" strokeWidth="1" />
        <circle cx="200" cy="200" r="130" fill="none" stroke="#30609C" strokeWidth="1" strokeDasharray="4 6" />
        <circle cx="200" cy="20" r="5" fill="#F6DD34" />
        <circle cx="380" cy="200" r="4" fill="#41835E" />
      </svg>

      <Container className="relative flex flex-col items-center gap-6 text-center">
        <h2 className="max-w-2xl font-heading text-[32px] font-extrabold leading-tight text-white sm:text-[40px] lg:text-[46px]">
          Build Skills. Transform Careers. Shape the Future.
        </h2>
        <p className="max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
          Explore SLSSDTR&apos;s industry-aligned programs and connect with our team to
          discuss how we can support your learning and growth goals.
        </p>
        <div className="flex flex-col gap-3 pt-2 sm:flex-row">
          <Button href="/programs" variant="primary" className="bg-white text-navy hover:bg-yellow hover:text-navy">
            Explore Programs
          </Button>
          <Button
            href="/contact"
            variant="secondary"
            className="border-white text-white hover:bg-white hover:text-navy"
          >
            Contact Us
          </Button>
        </div>
      </Container>
    </section>
  );
}
