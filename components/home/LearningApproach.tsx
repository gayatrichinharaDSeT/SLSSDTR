import { ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Badge from "@/components/ui/Badge";
import { learningStages, learningHighlights, learningModels } from "@/data/content";

export default function LearningApproach() {
  return (
    <section className="bg-mist py-16 sm:py-20 lg:py-24">
      <Container className="flex flex-col gap-12">
        <SectionHeading
          eyebrow="Learning Approach"
          title="Learn. Apply. Transform."
          align="center"
          className="mx-auto max-w-2xl"
        />

        <div className="flex flex-col items-stretch gap-4 sm:flex-row sm:items-center sm:justify-center">
          {learningStages.map((stage, index) => (
            <div key={stage.title} className="flex items-center gap-4">
              <div className="flex flex-col items-center gap-2 rounded-card border border-navy/10 bg-white p-5 text-center transition-transform duration-200 hover:-translate-y-1 sm:w-40">
                <span className="font-heading text-lg font-bold text-navy">
                  {stage.title}
                </span>
                <span className="text-xs leading-snug text-ink">{stage.description}</span>
              </div>
              {index < learningStages.length - 1 ? (
                <ArrowRight
                  className="hidden h-5 w-5 shrink-0 text-green sm:block"
                  aria-hidden="true"
                />
              ) : null}
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center gap-4">
          <div className="flex flex-wrap justify-center gap-2">
            {learningHighlights.map((item) => (
              <Badge key={item} tone="green">
                {item}
              </Badge>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {learningModels.map((item) => (
              <Badge key={item} tone="blue">
                {item}
              </Badge>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
