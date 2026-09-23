"use client";

import { useState, type FormEvent } from "react";
import FormField, { fieldInputClasses, fieldLabelClasses } from "@/components/auth/FormField";
import SubmitButton from "@/components/auth/SubmitButton";
import FormNotice from "@/components/auth/FormNotice";
import { updateProfileSchema, PROFESSION_OPTIONS, COMPANY_TYPE_OPTIONS } from "@/lib/validations/profile";

type ProfileFormProps = {
  initialName: string;
  initialPhone: string;
  initialOrganization: string;
  initialLocation: string;
  initialCountry: string;
  initialProfession: string;
  initialProfessionOther: string;
  initialCourseName: string;
  initialInstitution: string;
  initialCurrentYear: string;
  initialSpecialization: string;
  initialCompanyName: string;
  initialCompanyType: string;
  initialCompanyTypeOther: string;
};

const COMPANY_PROFESSIONS = new Set(["PROFESSIONAL", "ENTREPRENEUR", "SELF_EMPLOYED"]);

export default function ProfileForm({
  initialName,
  initialPhone,
  initialOrganization,
  initialLocation,
  initialCountry,
  initialProfession,
  initialProfessionOther,
  initialCourseName,
  initialInstitution,
  initialCurrentYear,
  initialSpecialization,
  initialCompanyName,
  initialCompanyType,
  initialCompanyTypeOther,
}: ProfileFormProps) {
  const [pending, setPending] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [notice, setNotice] = useState<{ tone: "success" | "error"; message: string } | null>(null);
  const [profession, setProfession] = useState(initialProfession);
  const [companyType, setCompanyType] = useState(initialCompanyType);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNotice(null);

    const formData = new FormData(event.currentTarget);
    const values = Object.fromEntries(
      [
        "name",
        "phone",
        "organization",
        "location",
        "country",
        "profession",
        "professionOther",
        "courseName",
        "institution",
        "currentYear",
        "specialization",
        "companyName",
        "companyType",
        "companyTypeOther",
      ].map((key) => [key, String(formData.get(key) ?? "")])
    );

    const parsed = updateProfileSchema.safeParse(values);
    if (!parsed.success) {
      const errors: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0]);
        if (!errors[key]) errors[key] = issue.message;
      }
      setFieldErrors(errors);
      return;
    }
    setFieldErrors({});
    setPending(true);

    const response = await fetch("/api/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(parsed.data),
    });
    const result = await response.json().catch(() => null);

    setPending(false);

    if (!response.ok || !result?.success) {
      setNotice({ tone: "error", message: result?.error?.message ?? "Could not update your profile." });
      return;
    }

    setNotice({ tone: "success", message: "Profile updated." });
  }

  const showStudentFields = profession === "STUDENT";
  const showFacultyFields = profession === "FACULTY";
  const showCompanyFields = COMPANY_PROFESSIONS.has(profession);

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
      <FormField
        id="name"
        name="name"
        label="Name"
        type="text"
        defaultValue={initialName}
        required
        error={fieldErrors.name}
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField
          id="phone"
          name="phone"
          label="Mobile (with country code)"
          type="tel"
          placeholder="e.g. +91 98765 43210"
          defaultValue={initialPhone}
          error={fieldErrors.phone}
        />
        <FormField
          id="organization"
          name="organization"
          label="Organization"
          type="text"
          placeholder="Optional"
          defaultValue={initialOrganization}
          error={fieldErrors.organization}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField
          id="location"
          name="location"
          label="Location"
          type="text"
          placeholder="City"
          defaultValue={initialLocation}
          error={fieldErrors.location}
        />
        <FormField
          id="country"
          name="country"
          label="Country"
          type="text"
          defaultValue={initialCountry}
          error={fieldErrors.country}
        />
      </div>

      <div>
        <label htmlFor="profession" className={fieldLabelClasses}>
          Profession
        </label>
        <select
          id="profession"
          name="profession"
          value={profession}
          onChange={(event) => setProfession(event.target.value)}
          className={`${fieldInputClasses} cursor-pointer`}
        >
          <option value="">Select your profession</option>
          {PROFESSION_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {fieldErrors.profession ? (
          <p className="mt-1.5 text-xs font-medium text-red-600">{fieldErrors.profession}</p>
        ) : null}
      </div>

      {profession === "OTHER" ? (
        <FormField
          id="professionOther"
          name="professionOther"
          label="Please specify"
          type="text"
          defaultValue={initialProfessionOther}
          error={fieldErrors.professionOther}
        />
      ) : null}

      {showStudentFields ? (
        <div className="grid gap-5 sm:grid-cols-2">
          <FormField
            id="courseName"
            name="courseName"
            label="Course Pursuing"
            type="text"
            placeholder="e.g. BSc Microbiology, B Pharm, MBA"
            defaultValue={initialCourseName}
            error={fieldErrors.courseName}
          />
          <FormField
            id="institution"
            name="institution"
            label="Institution"
            type="text"
            defaultValue={initialInstitution}
            error={fieldErrors.institution}
          />
          <FormField
            id="currentYear"
            name="currentYear"
            label="Current Year"
            type="text"
            defaultValue={initialCurrentYear}
            error={fieldErrors.currentYear}
          />
        </div>
      ) : null}

      {showFacultyFields ? (
        <div className="grid gap-5 sm:grid-cols-2">
          <FormField
            id="institution"
            name="institution"
            label="Institution"
            type="text"
            defaultValue={initialInstitution}
            error={fieldErrors.institution}
          />
          <FormField
            id="specialization"
            name="specialization"
            label="Subject Specialization"
            type="text"
            defaultValue={initialSpecialization}
            error={fieldErrors.specialization}
          />
        </div>
      ) : null}

      {showCompanyFields ? (
        <div className="grid gap-5 sm:grid-cols-2">
          <FormField
            id="companyName"
            name="companyName"
            label="Company Name"
            type="text"
            defaultValue={initialCompanyName}
            error={fieldErrors.companyName}
          />
          <div>
            <label htmlFor="companyType" className={fieldLabelClasses}>
              Company Type
            </label>
            <select
              id="companyType"
              name="companyType"
              value={companyType}
              onChange={(event) => setCompanyType(event.target.value)}
              className={`${fieldInputClasses} cursor-pointer`}
            >
              <option value="">Select company type</option>
              {COMPANY_TYPE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {fieldErrors.companyType ? (
              <p className="mt-1.5 text-xs font-medium text-red-600">{fieldErrors.companyType}</p>
            ) : null}
          </div>
          {companyType === "OTHERS" ? (
            <FormField
              id="companyTypeOther"
              name="companyTypeOther"
              label="Please specify company type"
              type="text"
              defaultValue={initialCompanyTypeOther}
              error={fieldErrors.companyTypeOther}
            />
          ) : null}
        </div>
      ) : null}

      <SubmitButton pending={pending} pendingLabel="Saving...">
        Save Changes
      </SubmitButton>

      {notice ? <FormNotice tone={notice.tone}>{notice.message}</FormNotice> : null}
    </form>
  );
}
