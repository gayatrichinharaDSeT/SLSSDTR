import type { Metadata } from "next";
import ProgramDetail from "@/components/programs/ProgramDetail";
import ProgramResources from "@/components/programs/ProgramResources";
import { getProgramBySlug } from "@/data/programs";

export const metadata: Metadata = {
  title: "Student AI Mastery | SLSSDTR",
  description:
    "3-weekend hands-on AI certification for Pharmacy, Pharmaceutical Sciences and Life Science students — research intelligence, drug discovery applications and an AI-ready career profile.",
};

export default function StudentAIPage() {
  const program = getProgramBySlug("student-ai");
  if (!program) return null;

  return (
    <ProgramDetail program={program}>
      <ProgramResources
        pdfUrl="/SLSSDTR-Student-Assets/Why_It_Matters_Student.pdf"
        pdfLabel="Why It Matters (Strategic Brief)"
        videos={[
          { src: "/SLSSDTR-Student-Assets/PharmaAI_for_Students-English.mp4", label: "Program Introduction — English" },
          { src: "/SLSSDTR-Student-Assets/PharmaAI_for_Students-Hindi.mp4", label: "Program Introduction — Hindi" },
          { src: "/SLSSDTR-Student-Assets/How_AI_Speeds_Up_Pharma_Research-Reel.mp4", label: "How AI Speeds Up Pharma Research" },
        ]}
      />
    </ProgramDetail>
  );
}
