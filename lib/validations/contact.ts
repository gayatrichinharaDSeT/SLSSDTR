import { z } from "zod";

// Mirrors the fields ContactForm.tsx already submits — see
// components/contact/ContactForm.tsx and app/api/contact/route.ts.
export const contactMessageSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(120),
  email: z.string().trim().email("Enter a valid email address").max(255),
  phone: z.string().trim().max(30).optional().or(z.literal("")),
  organization: z.string().trim().max(160).optional().or(z.literal("")),
  interest: z.string().trim().max(160).optional().or(z.literal("")),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(4000),
});

export type ContactMessageInput = z.infer<typeof contactMessageSchema>;

export const contactMessageStatusSchema = z.object({
  status: z.enum(["NEW", "READ", "IN_PROGRESS", "RESOLVED"]),
});
