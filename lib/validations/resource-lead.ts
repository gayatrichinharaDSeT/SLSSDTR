import { z } from "zod";
import { PROFESSION_OPTIONS } from "@/lib/validations/profile";

const professionValues = PROFESSION_OPTIONS.map((option) => option.value) as [string, ...string[]];

// Lead capture gating the strategic-brief PDF download — deliberately a
// separate, smaller schema from programEnquirySchema (whose programId is
// restricted to the 5 published program slugs) rather than a required
// field for every future gated resource.
export const resourceLeadSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(120),
  email: z.string().trim().email("Enter a valid email address").max(255),
  phone: z.string().trim().min(7, "Enter a valid mobile number").max(30),
  profession: z.enum(professionValues, { message: "Select your profession" }),
  organization: z.string().trim().max(160).optional().or(z.literal("")),
});

export type ResourceLeadInput = z.infer<typeof resourceLeadSchema>;
