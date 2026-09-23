import type { Metadata } from "next";
import ProfileForm from "@/components/dashboard/ProfileForm";
import { requireUser } from "@/lib/permissions";

export const metadata: Metadata = {
  title: "Profile | SLSSDTR",
  robots: { index: false, follow: false },
};

export default async function ProfilePage() {
  const user = await requireUser();

  return (
    <div className="flex flex-col gap-6 rounded-card border border-navy/10 bg-white p-7 shadow-sm sm:max-w-xl sm:p-9">
      <div>
        <h1 className="font-heading text-xl font-bold text-navy">Profile</h1>
        <p className="text-sm text-ink/70">Keep your details up to date.</p>
      </div>
      <ProfileForm
        initialName={user.name}
        initialPhone={user.phone ?? ""}
        initialOrganization={user.organization ?? ""}
        initialLocation={user.location ?? ""}
        initialCountry={user.country ?? ""}
        initialProfession={user.profession ?? ""}
        initialProfessionOther={user.professionOther ?? ""}
        initialCourseName={user.courseName ?? ""}
        initialInstitution={user.institution ?? ""}
        initialCurrentYear={user.currentYear ?? ""}
        initialSpecialization={user.specialization ?? ""}
        initialCompanyName={user.companyName ?? ""}
        initialCompanyType={user.companyType ?? ""}
        initialCompanyTypeOther={user.companyTypeOther ?? ""}
      />
    </div>
  );
}
