// Program content is sourced from the five official brochures in
// public/brochures/ — this file only holds condensed, conversion-focused
// copy for the website; the brochure PDF is the detailed, authoritative
// collateral (curriculum tables, session-by-session plans, full tool
// directories). Do not add curriculum detail here beyond what the
// brochures state — see each program's brochureUrl for the source.

export type ProgramPrice = {
  amount: number; // rupees, GST-inclusive, exactly as stated in the brochure
  gstRate: number; // percent
};

export type Program = {
  slug: string;
  name: string;
  shortName: string;
  flagship?: boolean;
  summary: string;
  description: string;
  brochureUrl: string;
  duration: string;
  format: string;
  price: ProgramPrice;
  focusAreas: string[];
  audience: string[];
  overview: string[];
  learningApproach: string[];
  outcomes: string[];
  applicationAreas: string[];
};

export const programs: Program[] = [
  {
    slug: "student-ai",
    name: "Student AI Mastery",
    shortName: "Student AI Mastery",
    summary:
      "3-weekend hands-on AI certification for Pharmacy, Pharmaceutical Sciences and Life Science students — research intelligence, drug discovery applications and an AI-ready career profile.",
    description:
      "A 6-hour, 3-weekend hands-on certification workshop building practical AI skills for pharma and life sciences — hands-on from the first session.",
    brochureUrl: "/brochures/student-ai-mastery.pdf",
    duration: "6 hours across 3 weekends (2 hours each)",
    format: "Live video conference, two-way voice and video",
    price: { amount: 2369, gstRate: 18 },
    focusAreas: [
      "Research Intelligence",
      "Drug Discovery & Pharma Applications",
      "Generative AI for Coursework",
      "Data Analytics with AI",
      "AI-Ready Career Building",
      "Capstone Challenge",
    ],
    audience: [
      "Pharmacy, Pharmaceutical Sciences & Life Science students preparing for an AI-ready career",
      "Students who want practical, hands-on AI skills rather than a generic coding course",
    ],
    overview: [
      "PharmaAI is a hand-held, hands-on program that helps pharmaceutical and life science students build real AI skills — searching, summarising, analysing and building with AI tools on real coursework and pharma scenarios, session by session.",
      "Delivered live over video conference across three weekends, the program moves from AI fundamentals to a final capstone challenge, where students build and present their own AI-powered solution to a real pharma or healthcare problem.",
    ],
    learningApproach: [
      "Weekend 1: AI Foundations & Research Intelligence",
      "Weekend 2: AI in Drug Discovery, Clinical Research & Pharma",
      "Weekend 3: AI Skills, Data Analytics & Career Transformation",
      "Hands-on with 10+ AI tools, including ChatGPT, Claude, Gemini, Perplexity and Gemini NotebookLM",
    ],
    outcomes: [
      "Practical AI literacy relevant to Life Sciences and Healthcare careers",
      "Confidence applying AI tools to academic and early-career work",
      "A detailed certificate listing every tool completed",
    ],
    applicationAreas: [
      "Drug Discovery",
      "Clinical Research",
      "Pharmacovigilance",
      "Manufacturing",
      "Market Research",
      "Healthcare & Pharmacy Practice",
    ],
  },
  {
    slug: "faculty-ai",
    name: "Faculty AI Mastery",
    shortName: "Faculty AI Mastery",
    summary:
      "3-weekend hands-on faculty development program for Pharmacy and Life Science educators — AI-powered teaching, research and academic productivity.",
    description:
      "A 6-hour, 3-weekend hands-on faculty development program building practical AI skills for the classroom and the lab.",
    brochureUrl: "/brochures/faculty-ai-mastery.pdf",
    duration: "6 hours across 3 weekends (2 hours each)",
    format: "Live video conference, two-way voice and video",
    price: { amount: 3542, gstRate: 18 },
    focusAreas: [
      "AI-Powered Teaching",
      "Research & Innovation",
      "Academic Productivity",
      "Data Analytics for Faculty",
      "AI-Ready Curriculum Design",
      "Faculty Capstone",
    ],
    audience: [
      "Faculty teaching Pharmacy, Pharmaceutical Sciences & Life Science courses",
      "Educators who want to bring AI into their classroom and their research",
    ],
    overview: [
      "The AI Faculty Mastery Program equips faculty members with practical AI skills to teach better, research faster, develop innovative academic content, and prepare students for an AI-enabled Pharmaceutical & Life Sciences industry.",
      "Delivered live over video conference across three weekends, the program is hands-on throughout: participants build a lesson plan, a research proposal, and — in the final capstone — their own AI-powered teaching or research assistant.",
    ],
    learningApproach: [
      "Weekend 1: AI for Teaching & Academic Excellence",
      "Weekend 2: AI for Research & Innovation",
      "Weekend 3: AI Productivity, Data & Future Education",
      "Hands-on with 10+ AI tools, including ChatGPT, Claude, Gemini, Perplexity and Gemini NotebookLM",
    ],
    outcomes: [
      "Practical AI skills for teaching and curriculum development",
      "Improved academic productivity using AI-enabled tools",
      "A Certificate of Participation/Completion recognising hands-on AI capability",
    ],
    applicationAreas: [
      "Pharmaceutics & Pharmacology",
      "Clinical Pharmacy",
      "Biotechnology",
      "Research Methodology",
      "Hospital & Community Pharmacy",
    ],
  },
  {
    slug: "professional-ai",
    name: "Professional AI Mastery",
    shortName: "Professional AI Mastery",
    summary:
      "24-hour AI Mastery Program for Life Science & Healthcare Professionals — 40+ AI tools mapped to the 18 departments that run Life Science and Healthcare organisations.",
    description:
      "Put AI to work in your role. Master 40+ AI tools, hands-on, through 24 hours of live weekend workshops — mapped to the 18 departments that run Life Science and Healthcare organisations.",
    brochureUrl: "/brochures/professional-ai-mastery.pdf",
    duration: "24 hours · 12 sessions of 2 hours, every Saturday & Sunday (6 weekends)",
    format: "Live video conference only, two-way voice and video",
    price: { amount: 29500, gstRate: 18 },
    focusAreas: [
      "Safe & Responsible AI",
      "Prompting & Content",
      "Google AI Ecosystem",
      "Presentations & Google Vids",
      "Dashboards & AI Agents",
      "Department Use-Case Labs",
    ],
    audience: [
      "Professionals across Regulatory, Medical Affairs, R&D, Production, Marketing & Sales, Supply Chain, Finance, Legal & Compliance, HR, Operations and more",
      "Anyone in a Life Science or Healthcare organisation who wants to put AI to work in their own role",
    ],
    overview: [
      "The AI Mastery Program for Life Science and Healthcare Professionals is a hand-held, workshop-based program that helps professionals put AI to work in their everyday role — every session is built around doing, not lecturing.",
      "Over 24 hours of live video-conference workshops, participants cover safe use of AI, content, research, dashboards, agents and open-source tools, then apply them to a use case from their own department across 18 Life Science & Healthcare departments.",
    ],
    learningApproach: [
      "6-weekend roadmap: foundations & safe AI use, prompting, presentations, Google AI ecosystem, dashboards, AI agents, open-source toolkit, and department use-case labs",
      "40+ AI tools hands-on, including ChatGPT, Claude, Gemini, Perplexity, NotebookLM, Gamma, n8n and Microsoft Copilot",
      "Three department use-case labs covering all 18 functions",
    ],
    outcomes: [
      "A working AI workflow built for your own department",
      "Hands-on capability across 40+ AI tools",
      "A detailed certificate listing every tool completed",
    ],
    applicationAreas: [
      "Regulatory & Medical Affairs",
      "R&D & Production",
      "Marketing, Sales & SFE",
      "Supply Chain & Finance",
      "HR, Admin & Operations",
      "Legal & Compliance",
    ],
  },
  {
    slug: "train-the-trainer",
    name: "Train the Trainer",
    shortName: "Train the Trainer",
    flagship: true,
    summary:
      "Become a certified AI faculty-cum-trainer for Life Science & Healthcare — 60+ AI tools mapped to 18 departments, followed by paid training assignments.",
    description:
      "Build AI trainers who can develop and deliver practical AI learning programs for Life Sciences and Healthcare environments.",
    brochureUrl: "/brochures/train-the-trainer.pdf",
    duration: "32 hours: 14h residential immersion + 10h video conference + 8h project",
    format: "2-day residential immersion, then weekend video conference and project demonstration",
    price: { amount: 43660, gstRate: 18 },
    focusAreas: [
      "Prompting & Content",
      "Google AI Ecosystem",
      "Presentations & Video Generation",
      "Dashboards & Data",
      "AI Agents",
      "Trainer Craft & Capstone",
    ],
    audience: [
      "Educators and subject-matter experts who want to build AI training capability",
      "Life sciences and healthcare professionals moving into learning and development roles",
      "Aspiring entrepreneurs and trainers looking to expand into AI-enabled program delivery",
    ],
    overview: [
      "The AI Educator Mastery Program is a hand-held, workshop-based Train the Trainer program that turns professionals, faculty and aspiring entrepreneurs into confident AI trainers — every session is built around doing, then learning how to teach it.",
      "On successful completion and a demonstration of the ability to train others, DSet Academy and School of Life Science offer paid training assignments across departments and audiences — students, faculties, entrepreneurs, corporates and industry professionals, worldwide.",
    ],
    learningApproach: [
      "Phase 1: 2-day residential immersion — foundations, Google AI, creation studio, teach-back",
      "Phase 2: 5 weekend video-conference sessions — video generation, dashboards, agents, open-source, trainer craft",
      "Phase 3: 8-hour project delivery — design, build and demonstrate a training module live",
    ],
    outcomes: [
      "Ability to design and deliver AI-enabled training modules across the SLSSDTR training ecosystem",
      "A detailed certificate listing every tool completed",
      "Eligibility for paid training assignments on successful demonstration",
    ],
    applicationAreas: [
      "Corporate AI Training",
      "Student & Faculty AI Training",
      "Entrepreneur & Industry Training",
      "Customised Life Sciences & Healthcare AI Programs",
    ],
  },
  {
    slug: "entrepreneur-ai",
    name: "Entrepreneur Mastery",
    shortName: "Entrepreneur Mastery",
    summary:
      "Lead AI adoption across your organisation and your venture in Life Science & Healthcare — 60+ AI tools mapped to 18 business departments.",
    description:
      "Practical AI adoption across business strategy, operations, marketing, sales, productivity and decision-making for entrepreneurs and business professionals.",
    brochureUrl: "/brochures/entrepreneur-mastery.pdf",
    duration: "32 hours: 14h residential immersion + 10h video conference + 8h project",
    format: "2-day residential immersion, then weekend video conference and project demonstration",
    price: { amount: 60180, gstRate: 18 },
    focusAreas: [
      "Prompting & Content",
      "Google AI Ecosystem",
      "Presentations & Video Generation",
      "Dashboards & Data",
      "AI Agents",
      "Organisation AI Adoption Roadmap",
    ],
    audience: [
      "Entrepreneurs and founders in Life Sciences and Healthcare contexts",
      "Business leaders who want to introduce and scale AI across every function of an organisation",
    ],
    overview: [
      "The Entrepreneur Mastery Program for Organization AI Transformation is a hand-held, workshop-based program that equips entrepreneurs and business leaders to introduce and scale AI across every function of an organisation.",
      "Participants finish with a capstone AI adoption solution for a chosen department of their own organisation or venture, built with mentor support and demonstrated live.",
    ],
    learningApproach: [
      "Phase 1: 2-day residential immersion — foundations, Google AI, creation studio, business application lab",
      "Phase 2: 5 weekend video-conference sessions — video generation, dashboards, agents, open-source, adoption roadmap",
      "Phase 3: 8-hour project delivery — design, build and demonstrate an AI adoption solution live",
    ],
    outcomes: [
      "A phased AI adoption roadmap for your own organisation or venture",
      "Practical skills for using AI in operations, marketing, sales and decision-making",
      "A detailed certificate listing every tool completed",
    ],
    applicationAreas: [
      "Business Strategy & Operations",
      "Marketing & Sales",
      "Supply Chain & Finance",
      "Organisation-Wide AI Adoption",
    ],
  },
];

export function getProgramBySlug(slug: string): Program | undefined {
  return programs.find((program) => program.slug === slug);
}

// ProgramEnquiry.programId also carries non-program lead sources (e.g. a
// gated resource download) that reuse the same table/API rather than a
// dedicated model — this maps those known ids to an admin-facing label so
// they don't just show as a raw internal slug.
const nonProgramEnquirySources: Record<string, string> = {
  "strategic-brief-download": "Strategic Brief Download",
};

export function getEnquirySourceLabel(programId: string): string {
  return getProgramBySlug(programId)?.name ?? nonProgramEnquirySources[programId] ?? programId;
}

export function formatProgramPrice(price: ProgramPrice): string {
  return `₹${price.amount.toLocaleString("en-IN")} incl. ${price.gstRate}% GST`;
}
