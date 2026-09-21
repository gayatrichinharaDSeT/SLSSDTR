import type { Metadata } from "next";
import ProgramDetail from "@/components/programs/ProgramDetail";
import { getProgramBySlug } from "@/data/programs";

export const metadata: Metadata = {
  title: "AI Student Transformation | SLSSDTR",
  description:
    "Practical AI skills for students in Life Sciences, Healthcare, Pharmacy, Biotechnology, Medicine and other non-IT disciplines.",
};

export default function StudentAIPage() {
  const program = getProgramBySlug("student-ai");
  if (!program) return null;

  return <ProgramDetail program={program} />;
}
