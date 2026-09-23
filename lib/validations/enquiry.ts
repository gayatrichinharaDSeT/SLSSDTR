import { z } from "zod";
import { programs } from "@/data/programs";

// Built from data/programs.ts (the single source of truth for program
// content) so an enquiry can never be recorded against a programId that
// doesn't correspond to a real, currently-published program.
const validProgramSlugs = programs.map((program) => program.slug) as [string, ...string[]];

export const programEnquirySchema = z.object({
  programId: z.enum(validProgramSlugs, {
    message: "Select a valid program",
  }),
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(120),
  email: z.string().trim().email("Enter a valid email address").max(255),
  phone: z.string().trim().max(30).optional().or(z.literal("")),
  organization: z.string().trim().max(160).optional().or(z.literal("")),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(4000),
  preferredBatch: z.string().trim().max(60).optional().or(z.literal("")),
});

export type ProgramEnquiryInput = z.infer<typeof programEnquirySchema>;

// Lighter "Explore Program" lead-capture gate (ProgramCard.tsx) — just
// enough for an expert to call the visitor back. It still posts to
// POST /api/program-enquiries, which only accepts programEnquirySchema,
// so buildLeadEnquiryPayload() below fills in the message field the full
// schema requires.
export const programLeadSchema = z.object({
  programId: z.enum(validProgramSlugs, {
    message: "Select a valid program",
  }),
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(120),
  phone: z.string().trim().min(7, "Enter a valid phone number").max(30),
  email: z.string().trim().email("Enter a valid email address").max(255),
  preferredBatch: z.string().trim().max(60).optional().or(z.literal("")),
});

export type ProgramLeadInput = z.infer<typeof programLeadSchema>;

export function buildLeadEnquiryPayload(lead: ProgramLeadInput, programName: string): ProgramEnquiryInput {
  return {
    ...lead,
    message: `Requested to explore the ${programName} program page and wants a callback.`,
  };
}

export const enquiryStatusSchema = z.object({
  status: z.enum(["NEW", "IN_PROGRESS", "RESOLVED"]),
});
