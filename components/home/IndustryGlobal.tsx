import { MapPin } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { industryAreas, immersionLocations } from "@/data/content";

export default function IndustryGlobal() {
  return (
    <section className="bg-mist py-16 sm:py-20 lg:py-24">
      <Container className="flex flex-col gap-14">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col gap-6">
            <SectionHeading
              eyebrow="Industry Connect"
              title="Connecting Learning With Industry"
              description="Every program stays wired into how the industry actually operates — from R&D to commercial operations, manufacturing and product development."
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
                className="rounded-card border border-navy/10 bg-white px-4 py-3 text-sm font-semibold font-heading text-navy"
              >
                {area}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-5 border-t border-navy/10 pt-10">
          <div className="flex flex-col items-center gap-2 text-center">
            <span className="font-heading text-sm font-semibold uppercase tracking-wide text-green-dark">
              Proposed Immersion Locations
            </span>
            <p className="max-w-2xl text-sm text-ink">
              Immersive learning is proposed for selected programs — particularly
              Train-the-Trainer and Entrepreneur AI Transformation — with 1–2 day
              sessions envisioned at the locations below.
            </p>
          </div>
          <ul className="flex flex-wrap justify-center gap-3">
            {immersionLocations.map((location) => (
              <li
                key={location.city}
                className="flex items-center gap-2 rounded-full border border-navy/10 bg-white px-4 py-2 text-sm font-semibold font-heading text-navy"
              >
                <MapPin className="h-4 w-4 text-green" strokeWidth={1.75} aria-hidden="true" />
                {location.city}
                <span className="text-xs font-medium text-ink/60">{location.region}</span>
              </li>
            ))}
          </ul>
          <p className="mx-auto max-w-xl text-center text-xs text-ink/60">
            Locations are proposed and subject to change — not confirmed permanent offices or events.
          </p>
        </div>
      </Container>
    </section>
  );
}
