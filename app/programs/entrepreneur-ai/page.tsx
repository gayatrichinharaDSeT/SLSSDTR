import type { Metadata } from "next";
import ProgramDetail from "@/components/programs/ProgramDetail";
import { getProgramBySlug } from "@/data/programs";

export const metadata: Metadata = {
  title: "Entrepreneur AI Transformation | SLSSDTR",
  description:
    "Practical AI adoption across business strategy, operations, marketing, sales, productivity and decision-making for entrepreneurs and business professionals.",
};

export default function EntrepreneurAIPage() {
  const program = getProgramBySlug("entrepreneur-ai");
  if (!program) return null;

  return <ProgramDetail program={program} />;
}
