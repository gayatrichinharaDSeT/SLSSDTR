import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import ProgramDetail from "@/components/programs/ProgramDetail";
import { getProgramBySlug } from "@/data/programs";

const marketScale = [
  { value: "1,700+", label: "Pharmacy colleges (B.Pharm / D.Pharm / Pharm.D)" },
  { value: "3,000+", label: "Other life-science institutions" },
  { value: "5,000+", label: "Pharmaceutical companies" },
  { value: "70,000+", label: "Hospitals" },
];

export const metadata: Metadata = {
  title: "Train the Trainer | SLSSDTR",
  description:
    "Become a certified AI faculty-cum-trainer for Life Science & Healthcare — 60+ AI tools mapped to 18 departments, followed by paid training assignments.",
};

const trainingEcosystem = [
  "Digital infrastructure",
  "Physical training support",
  "Training collateral and content",
  "Coordination",
  "Technology support",
  "Mentorship",
];

export default function TrainTheTrainerPage() {
  const program = getProgramBySlug("train-the-trainer");
  if (!program) return null;

  return (
    <ProgramDetail program={program}>
      <div className="flex flex-col gap-8 rounded-card border border-navy/10 bg-white p-8 sm:p-10">
        <SectionHeading
          eyebrow="Why This Matters"
          title="A Regulatory Mandate, Not a Trend"
          description="The Pharmacy Council of India (PCI) has directed that AI, data analytics and automation run across all eight semesters of the revised B.Pharm syllabus, effective the 2026–27 academic session. That mandate lands on a market with almost no faculty who are both AI-capable and domain-credible — which is why SLSSDTR built this program to certify trainers, not just end users."
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {marketScale.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col gap-1 rounded-card border border-navy/10 bg-mist p-5"
            >
              <span className="font-heading text-2xl font-extrabold text-navy">{stat.value}</span>
              <span className="text-xs leading-snug text-ink/70">{stat.label}</span>
            </div>
          ))}
        </div>

        <p className="text-sm leading-relaxed text-ink">
          Even a conservative estimate of one trained AI-and-domain faculty member per institution implies
          demand for thousands of qualified trainers — before hospitals and pharma companies are counted at
          all. Direct, one-cohort-at-a-time training cannot reach that scale; a certified Train-the-Trainer
          model can, because each graduate can train their own institution and take on paid assignments
          elsewhere.
        </p>

        <Link
          href="/learning-research#strategic-brief"
          className="group inline-flex w-fit items-center gap-2 text-sm font-semibold font-heading text-green hover:text-green-dark"
        >
          Read the full strategic brief
          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
        </Link>
      </div>

      <div className="flex flex-col gap-6 rounded-card border border-green/25 bg-mist p-8 sm:p-10">
        <SectionHeading
          eyebrow="Training Ecosystem"
          title="Training Ecosystem & Opportunities"
          description="Trainers who complete this program may become eligible for potential training assignments across corporate, academic and institutional settings, subject to program and assignment requirements."
        />

        <div className="grid gap-3 sm:grid-cols-2">
          {trainingEcosystem.map((item) => (
            <div key={item} className="flex items-center gap-3">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-green" strokeWidth={2} aria-hidden="true" />
              <span className="text-sm font-medium text-ink">{item}</span>
            </div>
          ))}
        </div>

        <p className="text-sm leading-relaxed text-ink">
          Trainers may primarily conduct programs from their home location, with
          limited travel required for selected immersive or physical assignments.
          Potential opportunities span Corporate AI Training, Train-the-Trainer
          Programs, Student AI Training, Faculty AI Training, and customized Life
          Sciences & Healthcare AI Programs — all subject to program and assignment
          requirements. SLSSDTR does not guarantee income or assignment volume.
        </p>
      </div>
    </ProgramDetail>
  );
}
