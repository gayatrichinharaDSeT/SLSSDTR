import type { Metadata } from "next";
import ProgramDetail from "@/components/programs/ProgramDetail";
import { getProgramBySlug } from "@/data/programs";

export const metadata: Metadata = {
  title: "Entrepreneur Mastery | SLSSDTR",
  description:
    "Lead AI adoption across your organisation and your venture in Life Science & Healthcare — 60+ AI tools mapped to 18 business departments.",
};

export default function EntrepreneurAIPage() {
  const program = getProgramBySlug("entrepreneur-ai");
  if (!program) return null;

  return <ProgramDetail program={program} />;
}
