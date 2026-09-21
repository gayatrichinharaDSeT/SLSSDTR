import { MapPin } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { immersionLocations } from "@/data/content";

export default function GlobalImmersion() {
  return (
    <section className="bg-mist py-16 sm:py-20 lg:py-24">
      <Container className="flex flex-col gap-10">
        <SectionHeading
          eyebrow="Global Immersion"
          title="Global Immersion"
          description="Immersive learning is proposed for selected programs — particularly Train-the-Trainer and Entrepreneur AI Transformation — with 1–2 day immersive sessions envisioned at the locations below."
          align="center"
          className="mx-auto max-w-2xl"
        />

        <div>
          <p className="mb-5 text-center font-heading text-sm font-semibold uppercase tracking-wide text-green-dark">
            Proposed Immersion Locations
          </p>
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
        </div>

        <p className="mx-auto max-w-xl text-center text-xs text-ink/60">
          Locations are proposed and subject to change. These are not confirmed permanent offices or events.
        </p>
      </Container>
    </section>
  );
}
