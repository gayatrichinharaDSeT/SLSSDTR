export type Program = {
  slug: string;
  name: string;
  shortName: string;
  flagship?: boolean;
  summary: string;
  description: string;
  focusAreas: string[];
  audience: string[];
  overview: string[];
  learningApproach: string[];
  outcomes: string[];
  applicationAreas: string[];
};

export const programs: Program[] = [
  {
    slug: "train-the-trainer",
    name: "Train-the-Trainer AI",
    shortName: "Train-the-Trainer",
    flagship: true,
    summary:
      "Build AI trainers who can develop and deliver practical AI learning programs for Life Sciences and Healthcare environments.",
    description:
      "Build AI trainers who can develop and deliver practical AI learning programs for Life Sciences and Healthcare environments.",
    focusAreas: [
      "Corporate AI Training",
      "Train-the-Trainer Programs",
      "Student AI Training",
      "Faculty AI Training",
      "Customized Life Sciences & Healthcare AI Programs",
    ],
    audience: [
      "Educators and subject-matter experts who want to build AI training capability",
      "Life sciences and healthcare professionals moving into learning and development roles",
      "Trainers looking to expand into AI-enabled program delivery",
    ],
    overview: [
      "The Train-the-Trainer AI program is designed to build a new generation of AI trainers who can develop and deliver practical, AI-enabled learning programs across Life Sciences and Healthcare environments.",
      "Participants learn to design training modules, facilitate applied AI learning sessions, and adapt content for different audiences — from students and faculty to corporate and institutional learners.",
      "As a flagship program, it anchors SLSSDTR's broader training ecosystem, connecting capable trainers with potential assignments across corporate, academic and institutional settings.",
    ],
    learningApproach: [
      "Practical, module-based training design",
      "Hands-on facilitation practice",
      "Case studies from Life Sciences and Healthcare contexts",
      "Mentorship and structured feedback",
    ],
    outcomes: [
      "Ability to design and structure AI-enabled training modules",
      "Confidence to facilitate applied AI learning sessions for varied audiences",
      "A foundation to potentially deliver training across the SLSSDTR training ecosystem",
    ],
    applicationAreas: [
      "Corporate AI Training",
      "Train-the-Trainer Programs",
      "Student AI Training",
      "Faculty AI Training",
      "Customized Life Sciences & Healthcare AI Programs",
    ],
  },
  {
    slug: "entrepreneur-ai",
    name: "Entrepreneur AI Transformation",
    shortName: "Entrepreneur AI",
    summary:
      "Practical AI adoption across business strategy, operations, marketing, sales, productivity and decision-making for entrepreneurs and business professionals.",
    description:
      "Practical AI adoption across business strategy, operations, marketing, sales, productivity and decision-making for entrepreneurs and business professionals.",
    focusAreas: [
      "Business Strategy",
      "Operations",
      "Marketing",
      "Sales",
      "Productivity",
      "Decision-Making",
    ],
    audience: [
      "Entrepreneurs and founders in Life Sciences and Healthcare contexts",
      "Business professionals looking to apply AI across day-to-day operations",
      "Leaders responsible for strategy, growth or operational decisions",
    ],
    overview: [
      "The Entrepreneur AI Transformation program helps entrepreneurs and business professionals apply AI practically across the functions that drive a business — strategy, operations, marketing, sales, productivity and decision-making.",
      "The focus stays grounded in real business use, with an emphasis on Life Sciences and Healthcare contexts relevant to SLSSDTR's ecosystem.",
    ],
    learningApproach: [
      "Applied, business-first learning modules",
      "Real-world case studies and examples",
      "Practical tools for strategy and operations",
      "Interactive, project-based sessions",
    ],
    outcomes: [
      "Practical understanding of where AI can support business decisions",
      "Applied skills for using AI in operations, marketing and sales",
      "A structured approach to AI-informed decision-making",
    ],
    applicationAreas: [
      "Business Strategy",
      "Operations",
      "Marketing & Sales",
      "Productivity Tools",
      "Decision-Making Frameworks",
    ],
  },
  {
    slug: "student-ai",
    name: "AI Student Transformation",
    shortName: "Student AI",
    summary:
      "Practical AI skills for students in Life Sciences, Healthcare, Pharmacy, Biotechnology, Medicine and other non-IT disciplines.",
    description:
      "Practical AI skills for students in Life Sciences, Healthcare, Pharmacy, Biotechnology, Medicine and other non-IT disciplines.",
    focusAreas: [
      "Applied AI Literacy",
      "Career-Relevant AI Skills",
      "Life Sciences & Healthcare Use Cases",
      "Research & Academic Applications",
    ],
    audience: [
      "Life Sciences students",
      "Healthcare and Medicine students",
      "Pharmacy students",
      "Biotechnology students",
      "Other non-IT / non-engineering learners",
    ],
    overview: [
      "The AI Student Transformation program introduces practical AI skills to students from Life Sciences, Healthcare, Pharmacy, Biotechnology, Medicine and other non-IT disciplines.",
      "Rather than a generic coding course, the program focuses on how AI is relevant to future careers in these fields — building applied, discipline-relevant AI literacy.",
    ],
    learningApproach: [
      "Practical, discipline-relevant learning modules",
      "Case studies drawn from Life Sciences and Healthcare",
      "Interactive, project-based sessions",
      "Experiential learning designed for non-IT learners",
    ],
    outcomes: [
      "Practical AI literacy relevant to Life Sciences and Healthcare careers",
      "Confidence in applying AI tools to academic and early-career work",
      "A foundation for continued learning as AI adoption grows across the sector",
    ],
    applicationAreas: [
      "Academic Projects",
      "Early-Career Readiness",
      "Life Sciences & Healthcare Applications",
    ],
  },
  {
    slug: "faculty-ai",
    name: "AI Faculty Transformation",
    shortName: "Faculty AI",
    summary:
      "AI-enabled teaching, research and academic productivity for faculty and educators in non-IT and non-engineering domains.",
    description:
      "AI-enabled teaching, research and academic productivity for faculty and educators in non-IT and non-engineering domains.",
    focusAreas: [
      "Teaching",
      "Research",
      "Academic Productivity",
      "Curriculum Development",
      "Student Mentoring",
    ],
    audience: [
      "Faculty and educators in Life Sciences, Healthcare and related disciplines",
      "Academic staff involved in curriculum development",
      "Faculty supporting research and student mentorship",
    ],
    overview: [
      "The AI Faculty Transformation program supports faculty and educators from non-IT and non-engineering domains in applying AI to teaching, research and academic work.",
      "The program covers practical applications across curriculum development, research productivity and student mentoring.",
    ],
    learningApproach: [
      "Practical, faculty-focused learning modules",
      "Case studies relevant to academic and research settings",
      "Interactive sessions and peer discussion",
      "Applied exercises for curriculum and research use",
    ],
    outcomes: [
      "Practical AI skills for teaching and curriculum development",
      "Improved academic productivity using AI-enabled tools",
      "Stronger capability to support research and student mentorship with AI",
    ],
    applicationAreas: [
      "Curriculum Development",
      "Research Productivity",
      "Student Mentoring",
      "Academic Administration",
    ],
  },
];

export function getProgramBySlug(slug: string): Program | undefined {
  return programs.find((program) => program.slug === slug);
}
