// Registration + payment for all five programs happens entirely on DSet
// Academy's own website — this app only builds the link that gets a
// visitor to the right program's form there. No API calls, no secrets,
// no database involved.
//
// NEXT_PUBLIC_DSET_ACADEMY_URL is DSet's academy site base URL (e.g.
// https://dsetconsulting.com) — not confirmed/live yet as of this
// writing. Until it's set, getAcademyRegistrationUrl() returns null and
// the "Register for this cohort" button doesn't render (see
// ProgramCard.tsx / ProgramDetail.tsx) rather than linking to a dead
// placeholder.
const ACADEMY_BASE_URL = process.env.NEXT_PUBLIC_DSET_ACADEMY_URL;

export function isAcademyRegistrationConfigured(): boolean {
  return Boolean(ACADEMY_BASE_URL);
}

// `return_url` is this app's proposed param name for DSet to redirect the
// visitor back to after a successful payment (Sir confirmed: the user
// should land back on SLSSDTR, not stay on DSet's site) — DSet's team
// still needs to confirm they'll read this exact param and actually
// redirect on it; this is built and ready for whatever name they confirm.
export function getAcademyRegistrationUrl(academySlug: string): string | null {
  if (!ACADEMY_BASE_URL) return null;

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://slssdtr.vercel.app";
  const url = new URL("/academy", ACADEMY_BASE_URL);
  url.searchParams.set("program", academySlug);
  url.searchParams.set("return_url", `${appUrl}/registration-confirmed`);
  return url.toString();
}
