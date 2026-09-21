import type { Metadata } from "next";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  BookOpen,
  Building2,
  Clock,
  Database,
  Dna,
  Globe,
  Laptop,
  MonitorPlay,
  TestTube,
  Users,
} from "lucide-react";
import Container from "@/components/ui/Container";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import Badge from "@/components/ui/Badge";
import IconBox from "@/components/ui/IconBox";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import LearningResearchVisual from "@/components/graphics/LearningResearchVisual";
import { learningHighlights, learningModels, infrastructureItems, researchInnovation } from "@/data/content";

export const metadata: Metadata = {
  title: "Learning & Research | SLSSDTR",
  description:
    "Explore SLSSDTR's learning approach, campus infrastructure, digital learning platform and research & innovation support.",
};

type Stage = {
  title: string;
  description: string;
};

const stages: Stage[] = [
  { title: "Learn", description: "Foundational concepts delivered through structured, industry-aligned sessions." },
  { title: "Practice", description: "Reinforce understanding through case studies and interactive, guided sessions." },
  { title: "Apply", description: "Work on practical projects that mirror real challenges across the life sciences." },
  { title: "Transform", description: "Carry new capability forward into your role, research or venture." },
];

const infrastructureIcons: Record<string, LucideIcon> = {
  "Modern classrooms": Building2,
  "Interactive displays": MonitorPlay,
  "Collaborative layouts": Users,
  "Computer labs": Laptop,
  "Life-science software": Dna,
  "Digital learning platform": Globe,
  "24/7 course material access": Clock,
  "Virtual labs": TestTube,
  "Resource library": BookOpen,
  "Journals & research databases": Database,
};

const digitalHighlights = ["Digital learning platform", "24/7 course material access", "Virtual labs"];

export default function LearningResearchPage() {
  return (
    <>
      <PageHero
        eyebrow="LEARNING & RESEARCH"
        title="Learning Approach"
        description="SLSSDTR brings together practical learning infrastructure with applied research and innovation support, so learning stays grounded in real practice and open to what comes next."
        visual={<LearningResearchVisual />}
      />

      {/* Learning Approach */}
      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <Container className="flex flex-col gap-12">
          <SectionHeading
            eyebrow="How We Teach"
            title="Learn. Practice. Apply. Transform."
            description="Every program moves through the same arc — from structured foundations to hands-on practice to real application — so learning translates into capability that lasts."
          />

          <div className="flex flex-col items-stretch gap-4 sm:flex-row sm:items-center sm:justify-center">
            {stages.map((stage, index) => (
              <div key={stage.title} className="flex items-center gap-4">
                <div className="flex flex-col items-center gap-2 rounded-card border border-navy/10 bg-white p-5 text-center shadow-sm transition-transform duration-200 hover:-translate-y-1 sm:w-44">
                  <span className="font-heading text-lg font-bold text-navy">{stage.title}</span>
                  <span className="text-xs leading-snug text-ink">{stage.description}</span>
                </div>
                {index < stages.length - 1 ? (
                  <ArrowRight
                    className="hidden h-5 w-5 shrink-0 text-green sm:block"
                    aria-hidden="true"
                  />
                ) : null}
              </div>
            ))}
          </div>

          <div className="grid gap-6 rounded-card border border-navy/10 bg-mist p-7 sm:grid-cols-2 sm:p-9">
            <div className="flex flex-col gap-3">
              <h3 className="font-heading text-lg font-bold text-navy">Learning Highlights</h3>
              <div className="flex flex-wrap gap-2">
                {learningHighlights.map((item) => (
                  <Badge key={item} tone="green">
                    {item}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <h3 className="font-heading text-lg font-bold text-navy">Delivery Models</h3>
              <div className="flex flex-wrap gap-2">
                {learningModels.map((item) => (
                  <Badge key={item} tone="blue">
                    {item}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Infrastructure */}
      <section className="bg-grey py-16 sm:py-20 lg:py-24">
        <Container className="flex flex-col gap-12">
          <SectionHeading
            eyebrow="Infrastructure"
            title="Infrastructure"
            description="Learning spaces and resources designed to support hands-on, project-based study across the life sciences."
          />

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {infrastructureItems.map((item) => {
              const Icon = infrastructureIcons[item];
              return (
                <div
                  key={item}
                  className="group flex flex-col items-start gap-3 rounded-card border border-navy/10 bg-white p-5 transition-all duration-200 hover:-translate-y-1 hover:border-green/40 hover:shadow-lg hover:shadow-navy/5"
                >
                  <IconBox icon={Icon} tone="green" size="sm" />
                  <h3 className="font-heading text-sm font-bold leading-snug text-navy">{item}</h3>
                </div>
              );
            })}
          </div>

          {/* Digital Learning & Virtual Labs */}
          <div className="rounded-card border border-navy/10 bg-white p-7 sm:p-9">
            <div className="flex flex-col gap-3">
              <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-wide text-blue font-heading">
                <span className="h-1.5 w-1.5 rounded-full bg-yellow" aria-hidden="true" />
                DIGITAL LEARNING & VIRTUAL LABS
              </span>
              <h3 className="font-heading text-2xl font-bold text-navy">
                Technology-Enabled Learning
              </h3>
              <p className="max-w-2xl text-sm leading-relaxed text-ink sm:text-base">
                Alongside on-site infrastructure, SLSSDTR is building forward-looking, technology-enabled
                learning support — a digital learning platform, round-the-clock access to course material,
                and virtual labs that extend practice beyond the classroom.
              </p>
            </div>
            <div className="mt-6 grid gap-5 sm:grid-cols-3">
              {digitalHighlights.map((item) => {
                const Icon = infrastructureIcons[item];
                return (
                  <div key={item} className="flex items-start gap-3">
                    <IconBox icon={Icon} tone="blue" size="sm" />
                    <span className="text-sm font-medium leading-snug text-navy">{item}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      {/* Research & Innovation */}
      <section className="relative overflow-hidden bg-gradient-to-br from-navy to-navy-dark py-16 text-white sm:py-20 lg:py-24">
        <div
          className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 animate-glow-pulse rounded-full bg-blue/20 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-green/20 blur-3xl"
          aria-hidden="true"
        />

        <Container className="relative flex flex-col gap-12">
          <SectionHeading
            eyebrow="Research & Innovation"
            title="Research & Innovation"
            description="Support for applied, interdisciplinary work that connects the classroom to real research practice."
            tone="dark"
          />

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {researchInnovation.map(({ icon: Icon, label }, index) => (
              <Reveal key={label} delay={index * 80}>
                <div className="group flex items-center gap-4 rounded-card border border-white/15 bg-white/5 p-5 transition-all duration-200 hover:-translate-y-1 hover:border-green/50 hover:bg-white/10">
                  <span
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[10px] bg-white/10 text-white transition-transform duration-300 ease-out group-hover:scale-110 group-hover:bg-green/30"
                    aria-hidden="true"
                  >
                    <Icon className="h-5 w-5" strokeWidth={1.75} />
                  </span>
                  <h3 className="font-heading text-sm font-bold leading-snug text-white">{label}</h3>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="bg-mist py-16 sm:py-20">
        <Container className="flex flex-col items-center gap-6 text-center">
          <h2 className="font-heading text-2xl font-bold text-navy sm:text-3xl">
            Ready to Learn or Collaborate?
          </h2>
          <p className="max-w-xl text-base leading-relaxed text-ink">
            Explore our programs to find the right path, or get in touch to discuss a research
            collaboration with SLSSDTR.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button href="/programs" variant="primary">
              Explore Programs
            </Button>
            <Button href="/contact" variant="secondary">
              Contact Us
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
