import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import IconBox from "@/components/ui/IconBox";
import { aboutFeaturePoints } from "@/data/values";

export default function AboutPreview() {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="flex flex-col gap-6">
          <SectionHeading
            eyebrow="About SLSSDTR"
            title="Bridging Academia & Industry"
            description="SLSSDTR is an institution focused on skill development, training, research and industry alignment — helping learners build professional growth and career readiness across the life sciences ecosystem."
          />

          <div className="grid grid-cols-2 gap-4">
            {aboutFeaturePoints.map(({ icon, title }) => (
              <div key={title} className="flex items-center gap-3">
                <IconBox icon={icon} size="sm" tone="blue" />
                <span className="font-heading text-sm font-semibold text-navy">
                  {title}
                </span>
              </div>
            ))}
          </div>

          <div>
            <Button href="/about" variant="secondary">
              Learn More
            </Button>
          </div>
        </div>

        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-mist">
          <svg
            viewBox="0 0 400 300"
            className="h-full w-full"
            role="img"
            aria-label="Abstract illustration representing academic and scientific collaboration"
          >
            <circle cx="120" cy="150" r="70" fill="#41835E" fillOpacity="0.12" />
            <circle cx="280" cy="110" r="90" fill="#30609C" fillOpacity="0.1" />
            <circle cx="120" cy="150" r="4" fill="#41835E" />
            <circle cx="280" cy="110" r="4" fill="#30609C" />
            <circle cx="200" cy="220" r="4" fill="#F6DD34" />
            <path
              d="M120 150 L280 110 L200 220 Z"
              fill="none"
              stroke="#2A3351"
              strokeOpacity="0.25"
              strokeWidth="1.5"
            />
            <circle cx="120" cy="150" r="30" fill="none" stroke="#41835E" strokeOpacity="0.3" strokeWidth="1" />
            <circle cx="280" cy="110" r="34" fill="none" stroke="#30609C" strokeOpacity="0.3" strokeWidth="1" />
          </svg>
        </div>
      </Container>
    </section>
  );
}
