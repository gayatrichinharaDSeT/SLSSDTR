export type AdvisoryMember = {
  name: string;
  initials: string;
};

export const advisoryBoard: AdvisoryMember[] = [
  { name: "Mr. Hitesh Upreti", initials: "HU" },
  { name: "Mr. Parag Agarwal", initials: "PA" },
  { name: "Mr. Vikrant Ghai", initials: "VG" },
  { name: "Dr. Seema Singh", initials: "SS" },
];

export const advisoryAreas: string[] = [
  "Pharma innovation",
  "African markets",
  "Business transformation",
  "Data analytics",
  "Healthcare strategy",
  "MedTech",
  "Clinical integration",
  "Digital transformation",
];

export const chiefConvenorsNote =
  "Three Chief Convenors have been onboarded. Profiles to be announced.";
