export type TeamMember = {
  name: string;
  role: string;
  bio: string[];
  initials: string;
};

export const foundingTeam: TeamMember[] = [
  {
    name: "Dr. (Prof.) Manasranjan M. Rout",
    role: "Founder & CEO",
    initials: "MR",
    bio: [
      "23 years of experience",
      "Serial entrepreneur",
      "Financial management",
      "Government relations",
      "Generative AI expertise",
    ],
  },
  {
    name: "Ms. Ila Rout",
    role: "Co-Founder & COO",
    initials: "IR",
    bio: ["20 years of experience", "Serial entrepreneur", "Operational excellence"],
  },
];
