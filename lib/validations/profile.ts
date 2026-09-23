import { z } from "zod";

export const PROFESSION_OPTIONS = [
  { value: "STUDENT", label: "Student" },
  { value: "FACULTY", label: "Faculty" },
  { value: "PROFESSIONAL", label: "Professional" },
  { value: "ENTREPRENEUR", label: "Entrepreneur" },
  { value: "SELF_EMPLOYED", label: "Self Employed" },
  { value: "EXPERIENCED_NO_ENGAGEMENT", label: "Experienced but currently no regular engagement" },
  { value: "OTHER", label: "Other" },
] as const;

export const COMPANY_TYPE_OPTIONS = [
  { value: "PHARMACEUTICAL", label: "Pharmaceutical" },
  { value: "MEDICAL_DEVICE", label: "Medical Device" },
  { value: "MEDICAL_EQUIPMENT", label: "Medical Equipment" },
  { value: "SURGICAL_CONSUMABLES", label: "Surgical Consumables" },
  { value: "HOSPITAL", label: "Hospital" },
  { value: "DISTRIBUTOR", label: "Distributor" },
  { value: "CONSULTING", label: "Consulting" },
  { value: "LABORATORY", label: "Laboratory" },
  { value: "MARKET_RESEARCH", label: "Market Research" },
  { value: "TRAINING", label: "Training" },
  { value: "OTHERS", label: "Others" },
] as const;

const professionValues = PROFESSION_OPTIONS.map((option) => option.value) as [string, ...string[]];
const companyTypeValues = COMPANY_TYPE_OPTIONS.map((option) => option.value) as [string, ...string[]];

const optionalText = (max: number) => z.string().trim().max(max).optional().or(z.literal(""));

// Deliberately excludes role, id, email, and emailVerified — those are
// never user-writable. See lib/permissions.ts and the "never settable"
// comment on the role field in lib/auth.ts.
export const updateProfileSchema = z
  .object({
    name: z.string().trim().min(2, "Name must be at least 2 characters").max(120),
    phone: optionalText(30),
    organization: optionalText(160),
    location: optionalText(120),
    country: optionalText(120),
    profession: z.enum(professionValues).optional().or(z.literal("")),
    professionOther: optionalText(160),
    // Student
    courseName: optionalText(160),
    institution: optionalText(160),
    currentYear: optionalText(60),
    // Faculty (institution shared with Student)
    specialization: optionalText(160),
    // Professional / Entrepreneur / Self Employed
    companyName: optionalText(160),
    companyType: z.enum(companyTypeValues).optional().or(z.literal("")),
    companyTypeOther: optionalText(160),
  })
  .superRefine((data, ctx) => {
    if (data.profession === "OTHER" && !data.professionOther) {
      ctx.addIssue({
        code: "custom",
        path: ["professionOther"],
        message: "Please specify your profession",
      });
    }

    if (data.profession === "STUDENT") {
      if (!data.courseName) {
        ctx.addIssue({ code: "custom", path: ["courseName"], message: "Course is required for students" });
      }
      if (!data.institution) {
        ctx.addIssue({ code: "custom", path: ["institution"], message: "Institution is required for students" });
      }
      if (!data.currentYear) {
        ctx.addIssue({ code: "custom", path: ["currentYear"], message: "Current year is required for students" });
      }
    }

    if (data.profession === "FACULTY") {
      if (!data.institution) {
        ctx.addIssue({ code: "custom", path: ["institution"], message: "Institution is required for faculty" });
      }
      if (!data.specialization) {
        ctx.addIssue({
          code: "custom",
          path: ["specialization"],
          message: "Subject specialization is required for faculty",
        });
      }
    }

    if (["PROFESSIONAL", "ENTREPRENEUR", "SELF_EMPLOYED"].includes(data.profession ?? "")) {
      if (!data.companyName) {
        ctx.addIssue({ code: "custom", path: ["companyName"], message: "Company name is required" });
      }
      if (!data.companyType) {
        ctx.addIssue({ code: "custom", path: ["companyType"], message: "Company type is required" });
      }
    }

    if (data.companyType === "OTHERS" && !data.companyTypeOther) {
      ctx.addIssue({
        code: "custom",
        path: ["companyTypeOther"],
        message: "Please specify the company type",
      });
    }
  });

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
