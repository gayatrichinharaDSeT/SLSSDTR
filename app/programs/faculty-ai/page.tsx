import type { Metadata } from "next";
import ProgramDetail from "@/components/programs/ProgramDetail";
import { getProgramBySlug } from "@/data/programs";

export const metadata: Metadata = {
  title: "AI Faculty Transformation | SLSSDTR",
  description:
    "AI-enabled teaching, research, academic productivity, curriculum development and student mentoring for faculty and educators.",
};

export default function FacultyAIPage() {
  const program = getProgramBySlug("faculty-ai");
  if (!program) return null;

  return <ProgramDetail program={program} />;
}
