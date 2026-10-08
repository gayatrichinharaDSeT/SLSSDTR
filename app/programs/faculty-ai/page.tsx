import type { Metadata } from "next";
import ProgramDetail from "@/components/programs/ProgramDetail";
import ProgramResources from "@/components/programs/ProgramResources";
import { getProgramBySlug } from "@/data/programs";

export const metadata: Metadata = {
  title: "Faculty AI Mastery | SLSSDTR",
  description:
    "3-weekend hands-on faculty development program for Pharmacy and Life Science educators — AI-powered teaching, research and academic productivity.",
};

export default function FacultyAIPage() {
  const program = getProgramBySlug("faculty-ai");
  if (!program) return null;

  return (
    <ProgramDetail program={program}>
      <ProgramResources
        pdfUrl="/SLSSDTR-Faculty-Assets/Why_It_Matters_Faculty.pdf"
        pdfLabel="Why It Matters (Strategic Brief)"
        videos={[
          { src: "/SLSSDTR-Faculty-Assets/AI_Faculty_Mastery_Program-English.mp4", label: "Program Introduction — English" },
          { src: "/SLSSDTR-Faculty-Assets/AI_Faculty_Mastery_Program-Hindi.mp4", label: "Program Introduction — Hindi" },
          { src: "/SLSSDTR-Faculty-Assets/How_Custom_AI_Protects_Science_Labs-Reel.mp4", label: "How Custom AI Protects Science Labs" },
        ]}
      />
    </ProgramDetail>
  );
}
