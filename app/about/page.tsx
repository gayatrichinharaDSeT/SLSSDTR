import type { Metadata } from "next";
import {
  Target,
  Eye,
  CheckCircle2,
  FlaskConical,
  Building2,
  Factory,
  Layers,
  Cpu,
  GraduationCap,
  Rocket,
  Lightbulb,
} from "lucide-react";
import Container from "@/components/ui/Container";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import IconBox from "@/components/ui/IconBox";
import LeadershipPreview from "@/components/home/LeadershipPreview";
import FinalCTA from "@/components/home/FinalCTA";
import AboutVisual from "@/components/graphics/AboutVisual";
import { aboutFeaturePoints, coreValues } from "@/data/values";

export const metadata: Metadata = {
  title: "About | SLSSDTR",
  description:
    "Learn about SLSSDTR's mission, vision, core values and approach to bridging academia and industry through skill development, training and research.",
};

const learningPhilosophyPoints = [
  "Real-World Projects",
  "Case Studies",
  "Project-Based Assessment",
  "Interactive Sessions & Experiential Learning",
];

const industryAreas = [
  { icon: FlaskConical, label: "Research & Development" },
  { icon: Building2, label: "Commercial Operations" },
  { icon: Factory, label: "Manufacturing" },
  { icon: Layers, label: "Product Development" },
];

const strategicPillars = [
  { icon: Cpu, label: "Technology & Generative AI" },
  { icon: GraduationCap, label: "Academia" },
  { icon: Factory, label: "Industry" },
  { icon: Rocket, label: "Research & Innovation" },
  { icon: Lightbulb, label: "Career & Entrepreneurship" },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="ABOUT"
        title="Bridging Academia & Industry"
        description="SLSSDTR is dedicated to skill development, training, research and industry alignment — preparing learners across the life sciences ecosystem to lead with confidence in a rapidly evolving, technology-driven world."
        visual={<AboutVisual />}
      />

      {/* About SLSSDTR */}
      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <Container className="flex flex-col items-center gap-10">
          <SectionHeading
            eyebrow="About SLSSDTR"
            title="Where Academic Rigor Meets Industry Practice"
            description="SLSSDTR exists to close the gap between academic learning and the practical demands of the life sciences and healthcare industry. By combining industry-aligned learning, practical skill development, applied research and structured professional development, we prepare students, faculty, professionals and trainers for genuine career readiness."
            align="center"
            className="mx-auto max-w-2xl"
          />

          <div className="grid grid-cols-2 gap-4 sm:flex sm:flex-wrap sm:justify-center">
            {aboutFeaturePoints.map(({ icon, title }) => (
              <div
                key={title}
                className="group flex items-center gap-3 rounded-card border border-navy/10 bg-white px-5 py-4 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-green/40 hover:shadow-lg hover:shadow-navy/5"
              >
                <IconBox icon={icon} size="sm" tone="green" />
                <span className="font-heading text-sm font-semibold text-navy">
                  {title}
                </span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Mission & Vision */}
      <section className="bg-mist py-16 sm:py-20 lg:py-24">
        <Container className="flex flex-col gap-12">
          <SectionHeading
            eyebrow="Mission & Vision"
            title="What Drives Us"
            align="center"
            className="mx-auto max-w-2xl"
          />

          <div className="grid gap-6 md:grid-cols-2">
            <div className="group flex flex-col gap-4 rounded-card border border-navy/10 bg-white p-8 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-green/40 hover:shadow-lg hover:shadow-navy/5">
              <IconBox icon={Target} tone="green" />
              <h3 className="font-heading text-sm font-semibold uppercase tracking-wide text-green-dark">
                Our Mission
              </h3>
              <p className="font-heading text-xl font-bold leading-snug text-navy sm:text-2xl">
                Empower life-science professionals through continuous learning
                and industry readiness.
              </p>
            </div>

            <div className="group flex flex-col gap-4 rounded-card border border-navy/10 bg-white p-8 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-green/40 hover:shadow-lg hover:shadow-navy/5">
              <IconBox icon={Eye} tone="blue" />
              <h3 className="font-heading text-sm font-semibold uppercase tracking-wide text-blue">
                Our Vision
              </h3>
              <p className="font-heading text-xl font-bold leading-snug text-navy sm:text-2xl">
                Become a premier skill-development institution delivering
                industry-aligned skills and global competencies.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Core Values */}
      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <Container className="flex flex-col gap-12">
          <SectionHeading
            eyebrow="What We Stand For"
            title="Core Values"
            align="center"
            className="mx-auto max-w-2xl"
          />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {coreValues.map(({ icon, title, description }) => (
              <div
                key={title}
                className="group flex flex-col gap-4 rounded-card border border-navy/10 bg-white p-6 transition-all duration-200 hover:-translate-y-1 hover:border-green/40 hover:shadow-lg hover:shadow-navy/5"
              >
                <IconBox icon={icon} tone="green" />
                <h3 className="font-heading text-xl font-bold text-navy">{title}</h3>
                <p className="text-sm leading-relaxed text-ink">{description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Learning Philosophy */}
      <section className="bg-mist py-16 sm:py-20 lg:py-24">
        <Container className="flex flex-col gap-10">
          <SectionHeading
            eyebrow="How We Teach"
            title="Learning Philosophy"
            description="Our approach favors doing over listening — learners engage with real problems from day one, building skills through practical, experiential work rather than passive instruction."
          />

          <div className="grid gap-4 sm:grid-cols-2">
            {learningPhilosophyPoints.map((point) => (
              <div
                key={point}
                className="group flex items-center gap-3 rounded-card border border-navy/10 bg-white p-5 transition-all duration-200 hover:-translate-y-1 hover:border-green/40 hover:shadow-lg hover:shadow-navy/5"
              >
                <IconBox icon={CheckCircle2} tone="green" size="sm" />
                <span className="font-heading text-sm font-semibold text-navy">
                  {point}
                </span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Industry Alignment */}
      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col gap-4">
            <SectionHeading
              eyebrow="Grounded in Practice"
              title="Industry Alignment"
              description="Programs are shaped to reflect the realities of the life sciences, pharmaceutical and healthcare industry — keeping every course connected to how the industry actually operates."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {industryAreas.map(({ icon, label }) => (
              <div
                key={label}
                className="group flex flex-col items-start gap-3 rounded-card border border-navy/10 bg-white p-5 transition-all duration-200 hover:-translate-y-1 hover:border-green/40 hover:shadow-lg hover:shadow-navy/5"
              >
                <IconBox icon={icon} tone="blue" size="sm" />
                <span className="font-heading text-sm font-semibold text-navy">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Strategic Alignment */}
      <section className="bg-mist py-16 sm:py-20 lg:py-24">
        <Container className="flex flex-col items-center gap-10">
          <SectionHeading
            eyebrow="Strategic Alignment"
            title="Bridging Five Pillars"
            align="center"
            description="SLSSDTR connects technology and generative AI, academia, industry, research & innovation, and career & entrepreneurship into a single, coherent path for learners."
            className="mx-auto max-w-2xl"
          />

          <div className="flex flex-wrap justify-center gap-4">
            {strategicPillars.map(({ icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2 rounded-full border border-navy/10 bg-white px-5 py-3 shadow-sm"
              >
                <IconBox icon={icon} tone="green" size="sm" />
                <span className="font-heading text-sm font-semibold text-navy">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Leadership */}
      <LeadershipPreview />

      {/* CTA */}
      <FinalCTA />
    </>
  );
}
