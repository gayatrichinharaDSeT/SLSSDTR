import type { LucideIcon } from "lucide-react";
import {
  Cpu,
  Sparkles,
  Workflow,
  HeartPulse,
  BarChart3,
  GraduationCap,
  FlaskConical,
  Factory,
  PackageSearch,
  Rocket,
  BriefcaseBusiness,
  FileText,
  Users,
  Search,
  Lightbulb,
  BookMarked,
  Mic,
  Landmark,
  ScrollText,
  Network,
  Building2,
  Presentation,
  Handshake,
} from "lucide-react";

export type OrbitNode = {
  icon: LucideIcon;
  label: string;
};

export const technologyNodes: OrbitNode[] = [
  { icon: Cpu, label: "Technology" },
  { icon: Sparkles, label: "Generative AI" },
  { icon: Workflow, label: "Digital Transformation" },
  { icon: HeartPulse, label: "Healthcare Technology" },
  { icon: BarChart3, label: "Data Analytics" },
];

export const industryNodes: OrbitNode[] = [
  { icon: FlaskConical, label: "R&D" },
  { icon: BriefcaseBusiness, label: "Commercial Operations" },
  { icon: Factory, label: "Manufacturing" },
  { icon: PackageSearch, label: "Product Development" },
];

export const strategicPillars: OrbitNode[] = [
  { icon: GraduationCap, label: "Academia" },
  { icon: Rocket, label: "Research & Innovation" },
  { icon: Lightbulb, label: "Career & Entrepreneurship" },
];

export type LearningStage = {
  title: string;
  description: string;
};

export const learningStages: LearningStage[] = [
  { title: "Learn", description: "Structured, industry-aligned foundations." },
  { title: "Practice", description: "Case studies and interactive sessions." },
  { title: "Apply", description: "Real-world projects and practical assessment." },
  { title: "Transform", description: "Career and capability growth that lasts." },
];

export const learningHighlights: string[] = [
  "Practical Projects",
  "Case Studies",
  "Interactive Sessions",
  "Experiential Learning",
  "Flexible Learning",
];

export const learningModels: string[] = [
  "Hybrid",
  "Online",
  "Self-paced",
  "Modular",
  "Customizable",
];

export type ListItem = {
  icon: LucideIcon;
  label: string;
};

export const careerDevelopment: ListItem[] = [
  { icon: Building2, label: "Placement Cell" },
  { icon: FileText, label: "Resume Building" },
  { icon: Search, label: "Job Portal Access" },
  { icon: Presentation, label: "Interview Preparation" },
  { icon: Users, label: "Career Counselling" },
  { icon: Handshake, label: "Mentorship" },
];

export const researchInnovation: ListItem[] = [
  { icon: FlaskConical, label: "Applied Research" },
  { icon: Network, label: "Interdisciplinary Projects" },
  { icon: Lightbulb, label: "Innovation Workshops" },
  { icon: BookMarked, label: "Publication Support" },
  { icon: Mic, label: "Conference Presentation" },
  { icon: Landmark, label: "Funding Information" },
  { icon: ScrollText, label: "Regulatory Awareness" },
];

export const industryAreas: string[] = [
  "Pharmaceutical Industry",
  "Life Sciences",
  "Healthcare",
  "R&D",
  "Commercial Operations",
  "Manufacturing",
  "Product Development",
];

export type ImmersionLocation = {
  city: string;
  region: string;
};

export const immersionLocations: ImmersionLocation[] = [
  { city: "Bhubaneswar", region: "India" },
  { city: "Bengaluru", region: "India" },
  { city: "Nairobi", region: "Kenya" },
  { city: "Lagos", region: "Nigeria" },
  { city: "Colombo", region: "Sri Lanka" },
  { city: "Kathmandu", region: "Nepal" },
  { city: "Kuala Lumpur", region: "Malaysia" },
];

export const infrastructureItems: string[] = [
  "Modern classrooms",
  "Interactive displays",
  "Collaborative layouts",
  "Computer labs",
  "Life-science software",
  "Digital learning platform",
  "24/7 course material access",
  "Virtual labs",
  "Resource library",
  "Journals & research databases",
];
