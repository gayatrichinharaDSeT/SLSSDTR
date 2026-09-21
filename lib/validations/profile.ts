import { z } from "zod";

// Deliberately excludes role, id, email, and emailVerified — those are
// never user-writable. See lib/permissions.ts and the "never settable"
// comment on the role field in lib/auth.ts.
export const updateProfileSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(120),
  phone: z.string().trim().max(30).optional().or(z.literal("")),
  organization: z.string().trim().max(160).optional().or(z.literal("")),
});

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
