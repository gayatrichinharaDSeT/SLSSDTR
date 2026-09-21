import type { Metadata } from "next";
import type { LucideIcon } from "lucide-react";
import {
  Pill,
  Leaf,
  HeartPulse,
  Microscope,
  BriefcaseBusiness,
  Factory,
  PackageSearch,
  Handshake,
  Rocket,
  Presentation,
  Users,
  Mic,
  Network,
  Landmark,
  Compass,
  Globe,
} from "lucide-react";
import Container from "@/components/ui/Container";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import IconBox from "@/components/ui/IconBox";
import Button from "@/components/ui/Button";
import IndustryConnectVisual from "@/components/graphics/IndustryConnectVisual";
import { industryAreas } from "@/data/content";

export const metadata: Metadata = {
  title: "Industry Connect | SLSSDTR",
  description:
    "See how SLSSDTR bridges academia and industry across the life sciences ecosystem through collaboration, partnerships, research touchpoints and shared learning events.",
};

const industryAreaIcons: Record<string, LucideIcon> = {
  "Pharmaceutical Industry": Pill,
  "Life Sciences": Leaf,
  Healthcare: HeartPulse,
  "R&D": Microscope,
  "Commercial Operations": BriefcaseBusiness,
  Manufacturing: Factory,
  "Product Development": PackageSearch,
};

const engagementFormats = [
  {
    icon: Presentation,
    title: "Seminars",
    description: "Focused sessions on emerging practices across the life sciences ecosystem.",
  },
  {
    icon: Users,
    title: "Workshops",
    description: "Hands-on, practitioner-led sessions that build applied, real-world skills.",
  },
  {
    icon: Mic,
    title: "Conferences",
    description: "Platforms for learners and practitioners to exchange ideas and perspectives.",
  },
  {
    icon: Network,
    title: "Networking",
    description: "Opportunities for learners to build connections with industry professionals.",
  },
];

const marketReach = [
  {
    icon: Landmark,
    title: "Indian Market",
    description:
      "Programs rooted in the needs of India's growing life sciences and healthcare ecosystem.",
  },
  {
    icon: Compass,
    title: "African Market",
    description:
      "An ecosystem orientation that extends skill development and training across Africa.",
  },
  {
    icon: Globe,
    title: "Global Expertise",
    description:
      "Practices and standards informed by global perspectives in life sciences learning.",
  },
];

export default function IndustryConnectPage() {
  return (
    <>
      <PageHero
        eyebrow="INDUSTRY CONNECT"
        title="Connecting Learning With Industry"
        description="SLSSDTR connects learning with the industries that shape the life sciences ecosystem — grounding programs in real practice and building bridges between academia and the professionals who work across the field every day."
        visual={<IndustryConnectVisual />}
      />

      {/* Industry Collaboration */}
      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <Container className="flex flex-col gap-12">
          <SectionHeading
            eyebrow="Industry Collaboration"
            title="Industry Collaboration"
            description="SLSSDTR grounds its programs in real industry practice, drawing on the perspectives and needs of the sectors that make up the life sciences ecosystem. This keeps learning relevant, applied and aligned with how the industry actually works."
            align="center"
            className="mx-auto max-w-2xl"
          />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {industryAreas.map((area) => {
              const Icon = industryAreaIcons[area] ?? Leaf;
              return (
                <div
                  key={area}
                  className="group flex flex-col gap-4 rounded-card border border-navy/10 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-green/40 hover:shadow-lg hover:shadow-navy/5"
                >
                  <IconBox icon={Icon} tone="green" />
                  <h3 className="font-heading text-base font-bold text-navy">{area}</h3>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Corporate Partnerships */}
      <section className="bg-mist py-16 sm:py-20 lg:py-24">
        <Container className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div className="flex flex-col gap-5">
            <SectionHeading
              eyebrow="Corporate Partnerships"
              title="Corporate Partnerships"
              description="SLSSDTR seeks to build collaborative relationships with organizations across the pharmaceutical, life sciences, healthcare and manufacturing space, and beyond. These relationships are intended to strengthen how learning connects to the realities of the industry — informing curriculum, enriching practical exposure and creating pathways between education and the workplace."
            />
          </div>
          <div className="flex flex-col gap-4 rounded-card border border-navy/10 bg-white p-7">
            <IconBox icon={Handshake} tone="blue" />
            <h3 className="font-heading text-lg font-bold text-navy">
              Built on Shared Purpose
            </h3>
            <p className="text-sm leading-relaxed text-ink">
              Every collaboration is approached as a long-term relationship rather than a
              transaction — grounded in a shared interest in developing skilled, industry-ready
              talent across the life sciences ecosystem.
            </p>
          </div>
        </Container>
      </section>

      {/* R&D Opportunities */}
      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <Container className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-10">
          <IconBox icon={Rocket} tone="yellow" size="md" />
          <div className="flex flex-col gap-3">
            <h2 className="font-heading text-2xl font-bold text-navy sm:text-3xl">
              R&amp;D Opportunities
            </h2>
            <p className="max-w-3xl text-base leading-relaxed text-ink">
              The industry-connect ecosystem is also a touchpoint for research and development —
              a space where academic curiosity can meet industry-relevant problems. As part of
              SLSSDTR&apos;s broader Research &amp; Innovation focus, industry relationships can
              help surface collaborative R&amp;D opportunities that benefit both learners and the
              organizations they work with.
            </p>
          </div>
        </Container>
      </section>

      {/* Seminars, Workshops & Conferences */}
      <section className="bg-mist py-16 sm:py-20 lg:py-24">
        <Container className="flex flex-col gap-12">
          <SectionHeading
            eyebrow="Learning Events"
            title="Seminars, Workshops & Conferences"
            description="SLSSDTR intends to host and participate in seminars, workshops and conferences that connect learners with industry practitioners — creating space for shared knowledge and meaningful networking opportunities."
            align="center"
            className="mx-auto max-w-2xl"
          />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {engagementFormats.map(({ icon, title, description }) => (
              <div
                key={title}
                className="group flex flex-col gap-4 rounded-card border border-navy/10 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-green/40 hover:shadow-lg hover:shadow-navy/5"
              >
                <IconBox icon={icon} />
                <h3 className="font-heading text-lg font-bold text-navy">{title}</h3>
                <p className="text-sm leading-relaxed text-ink">{description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Market Reach */}
      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <Container className="flex flex-col gap-12">
          <SectionHeading
            eyebrow="Market Reach"
            title="Indian Market, African Market, Global Expertise"
            description="SLSSDTR's industry-connect ecosystem is oriented toward life sciences skill development across India and Africa, shaped by practices that reflect global standards."
            align="center"
            className="mx-auto max-w-2xl"
          />

          <div className="grid gap-6 sm:grid-cols-3">
            {marketReach.map(({ icon, title, description }) => (
              <div
                key={title}
                className="group flex flex-col items-center gap-4 rounded-card border border-navy/10 bg-grey p-7 text-center transition-all duration-200 hover:-translate-y-1 hover:border-green/40 hover:shadow-lg hover:shadow-navy/5"
              >
                <IconBox icon={icon} tone="blue" />
                <h3 className="font-heading text-lg font-bold text-navy">{title}</h3>
                <p className="text-sm leading-relaxed text-ink">{description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-navy py-16 text-white sm:py-20 lg:py-24">
        <svg
          className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 opacity-20 sm:h-96 sm:w-96"
          viewBox="0 0 400 400"
          aria-hidden="true"
        >
          <circle cx="200" cy="200" r="180" fill="none" stroke="#2F8C5C" strokeWidth="1" />
          <circle
            cx="200"
            cy="200"
            r="130"
            fill="none"
            stroke="#2F5F9B"
            strokeWidth="1"
            strokeDasharray="4 6"
          />
          <circle cx="200" cy="20" r="5" fill="#F6CE2E" />
          <circle cx="380" cy="200" r="4" fill="#2F8C5C" />
        </svg>

        <Container className="relative flex flex-col items-center gap-6 text-center">
          <h2 className="max-w-2xl font-heading text-[32px] font-extrabold leading-tight text-white sm:text-[40px] lg:text-[46px]">
            Partner With Us
          </h2>
          <p className="max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
            Interested in collaborating with SLSSDTR on training, research or industry connect
            initiatives? We would like to hear from you and explore how we can work together.
          </p>
          <div className="flex flex-col gap-3 pt-2 sm:flex-row">
            <Button href="/contact" variant="inverse">
              Partner With Us
            </Button>
            <Button href="/programs" variant="inverseOutline">
              Explore Programs
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
