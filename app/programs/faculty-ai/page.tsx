import type { Metadata } from "next";
import ProgramDetail from "@/components/programs/ProgramDetail";
import { getProgramBySlug } from "@/data/programs";

export const metadata: Metadata = {
  title: "Faculty AI Mastery | SLSSDTR",
  description:
    "3-weekend hands-on faculty development program for Pharmacy and Life Science educators — AI-powered teaching, research and academic productivity.",
};

export default function FacultyAIPage() {
  const program = getProgramBySlug("faculty-ai");
  if (!program) return null;

  return <ProgramDetail program={program} />;
}
