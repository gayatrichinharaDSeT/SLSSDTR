import type { Metadata } from "next";
import ProgramDetail from "@/components/programs/ProgramDetail";
import ProgramResources from "@/components/programs/ProgramResources";
import { getProgramBySlug } from "@/data/programs";

export const metadata: Metadata = {
  title: "Entrepreneur Mastery | SLSSDTR",
  description:
    "Lead AI adoption across your organisation and your venture in Life Science & Healthcare — 60+ AI tools mapped to 18 business departments.",
};

export default function EntrepreneurAIPage() {
  const program = getProgramBySlug("entrepreneur-ai");
  if (!program) return null;

  return (
    <ProgramDetail program={program}>
      <ProgramResources
        pdfUrl="/SLSSDTR-Entrepreneur-Assets/Why_It_Matters_Entrepreneurs.pdf"
        pdfLabel="Why It Matters (Strategic Brief)"
        videos={[
          { src: "/SLSSDTR-Entrepreneur-Assets/AI_Mastery_for_Leaders-English.mp4", label: "Program Introduction — English" },
          { src: "/SLSSDTR-Entrepreneur-Assets/AI_Mastery_for_Leaders-Hindi.mp4", label: "Program Introduction — Hindi" },
          { src: "/SLSSDTR-Entrepreneur-Assets/Why_AI_Fails_to_Scale_in_Healthcare-Reel.mp4", label: "Why AI Fails to Scale in Healthcare" },
        ]}
      />
    </ProgramDetail>
  );
}
