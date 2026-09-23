import type { Metadata } from "next";
import ProgramDetail from "@/components/programs/ProgramDetail";
import { getProgramBySlug } from "@/data/programs";

export const metadata: Metadata = {
  title: "Professional AI Mastery | SLSSDTR",
  description:
    "24-hour AI Mastery Program for Life Science & Healthcare Professionals — 40+ AI tools mapped to the 18 departments that run Life Science and Healthcare organisations.",
};

export default function ProfessionalAIPage() {
  const program = getProgramBySlug("professional-ai");
  if (!program) return null;

  return <ProgramDetail program={program} />;
}
