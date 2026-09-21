import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import ProgramDetail from "@/components/programs/ProgramDetail";
import { getProgramBySlug } from "@/data/programs";

export const metadata: Metadata = {
  title: "Train-the-Trainer AI | SLSSDTR",
  description:
    "Build AI trainers who can develop and deliver practical AI learning programs for Life Sciences and Healthcare environments.",
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
