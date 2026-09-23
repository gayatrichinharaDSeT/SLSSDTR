import { z } from "zod";
import { programs } from "@/data/programs";

// Matches the "Department-Wise Tool Usage" table repeated identically
// across the Professional AI Mastery, Train the Trainer and Entrepreneur
// Mastery brochures — treated as the authoritative department list.
export const DEPARTMENTS = [
  "Human Resources",
  "Admin",
  "Operations",
  "Production",
  "R&D",
  "Marketing & Strategy",
  "Business Development & Sales",
  "Supply Chain",
  "Regulatory",
  "Market Research, BA, BI & Competitive Intelligence",
  "SFE",
  "Training",
  "Medical Affairs",
  "Digital Transformation",
  "Consulting",
  "Finance",
  "Legal & Compliance",
  "Project Management & Corporate Strategy",
] as const;

const validProgramSlugs = programs.map((program) => program.slug) as [string, ...string[]];

export const customizedModuleRequestSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(120),
  email: z.string().trim().email("Enter a valid email address").max(255),
  phone: z.string().trim().max(30).optional().or(z.literal("")),
  organization: z.string().trim().max(160).optional().or(z.literal("")),
  programId: z.enum(validProgramSlugs).optional().or(z.literal("")),
  departments: z
    .array(z.enum(DEPARTMENTS))
    .min(1, "Select at least one department"),
  message: z.string().trim().max(4000).optional().or(z.literal("")),
});

export type CustomizedModuleRequestInput = z.infer<typeof customizedModuleRequestSchema>;
