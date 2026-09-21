import type { LucideIcon } from "lucide-react";
import {
  Briefcase,
  FlaskConical,
  GraduationCap,
  Target,
  Users,
  BookOpen,
  Building2,
  Sparkles,
  Layers,
  Globe2,
  Award,
  ShieldCheck,
} from "lucide-react";

export type ValueStripItem = {
  icon: LucideIcon;
  label: string;
};

export const valueStrip: ValueStripItem[] = [
  { icon: Target, label: "Industry Aligned" },
  { icon: FlaskConical, label: "Practical Learning" },
  { icon: BookOpen, label: "Research Driven" },
  { icon: Briefcase, label: "Career Focused" },
];

export type AudienceCard = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export const audienceCards: AudienceCard[] = [
  {
    icon: GraduationCap,
    title: "Students",
    description:
      "Life sciences, healthcare, pharmacy, biotechnology and other non-IT learners.",
  },
  {
    icon: Users,
    title: "Faculty",
    description:
      "Teaching, research, curriculum development and academic productivity.",
  },
  {
    icon: Briefcase,
    title: "Professionals",
    description:
      "Industry-relevant skills and continuous professional development.",
  },
  {
    icon: Sparkles,
    title: "Trainers",
    description: "AI-enabled training capability and trainer development.",
  },
];

export type FeaturePoint = {
  icon: LucideIcon;
  title: string;
};

export const aboutFeaturePoints: FeaturePoint[] = [
  { icon: Target, title: "Industry Aligned" },
  { icon: FlaskConical, title: "Practical Learning" },
  { icon: BookOpen, title: "Research Focus" },
  { icon: Award, title: "Professional Growth" },
];

export type WhyCard = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export const whySlssdtr: WhyCard[] = [
  {
    icon: FlaskConical,
    title: "Practical Learning",
    description:
      "Real-world projects, case studies, project-based assessment, interactive sessions and experiential learning.",
  },
  {
    icon: Briefcase,
    title: "Industry Expertise",
    description:
      "Learning shaped by practitioners connected to the Life Sciences and Healthcare industry.",
  },
  {
    icon: Layers,
    title: "Flexible Learning",
    description:
      "Hybrid, online, self-paced, modular and customizable learning formats.",
  },
  {
    icon: Target,
    title: "Career Development",
    description:
      "Structured support to help learners move confidently into industry-ready roles.",
  },
  {
    icon: Sparkles,
    title: "Research & Innovation",
    description:
      "Applied research and interdisciplinary projects connecting academia and industry.",
  },
  {
    icon: Building2,
    title: "Industry Exposure",
    description:
      "Direct connection to R&D, commercial operations, manufacturing and product development.",
  },
];

export type CoreValue = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export const coreValues: CoreValue[] = [
  {
    icon: Award,
    title: "Excellence",
    description: "A consistent commitment to quality in every program and interaction.",
  },
  {
    icon: Sparkles,
    title: "Innovation",
    description: "Embracing new tools and methods, including generative AI, to keep learning current.",
  },
  {
    icon: ShieldCheck,
    title: "Integrity",
    description: "Operating transparently and honestly with learners, faculty and industry partners.",
  },
  {
    icon: Target,
    title: "Industry Alignment",
    description: "Keeping every program grounded in real industry needs and practices.",
  },
  {
    icon: Users,
    title: "Empowerment",
    description: "Equipping students, faculty, professionals and trainers to grow with confidence.",
  },
  {
    icon: Globe2,
    title: "Accessibility",
    description: "Designing flexible learning pathways that reach learners wherever they are.",
  },
];
