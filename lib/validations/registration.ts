import { z } from "zod";
import { programs } from "@/data/programs";

const validProgramSlugs = programs.map((program) => program.slug) as [string, ...string[]];

// Starts a paid registration — POST /api/payments/create-order. Amount is
// deliberately not part of this schema: it's always derived server-side
// from data/programs.ts by programId, never trusted from the client.
export const startRegistrationSchema = z.object({
  programId: z.enum(validProgramSlugs, { message: "Select a valid program" }),
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(120),
  email: z.string().trim().email("Enter a valid email address").max(255),
  phone: z.string().trim().min(7, "Enter a valid phone number").max(30),
  organization: z.string().trim().max(160).optional().or(z.literal("")),
  preferredBatch: z.string().trim().max(60).optional().or(z.literal("")),
});

export type StartRegistrationInput = z.infer<typeof startRegistrationSchema>;

// Confirms a registration after Razorpay Checkout completes —
// POST /api/payments/verify.
export const verifyRegistrationSchema = z.object({
  registrationId: z.string().min(1),
  razorpay_order_id: z.string().min(1),
  razorpay_payment_id: z.string().min(1),
  razorpay_signature: z.string().min(1),
});

export type VerifyRegistrationInput = z.infer<typeof verifyRegistrationSchema>;
