import type { Metadata } from "next";
import ProgramDetail from "@/components/programs/ProgramDetail";
import { getProgramBySlug } from "@/data/programs";

export const metadata: Metadata = {
  title: "Student AI Mastery | SLSSDTR",
  description:
    "3-weekend hands-on AI certification for Pharmacy, Pharmaceutical Sciences and Life Science students — research intelligence, drug discovery applications and an AI-ready career profile.",
};

export default function StudentAIPage() {
  const program = getProgramBySlug("student-ai");
  if (!program) return null;

  return <ProgramDetail program={program} />;
}
