import { GraduationCap, Rocket, BookOpen, Users, Sparkles } from "lucide-react";

const audienceChips = [
  {
    icon: GraduationCap,
    label: "Trainers",
    position: "left-2 top-2 sm:left-6 sm:top-4",
    tone: "bg-green/15 text-green-dark",
    delay: "0s",
  },
  {
    icon: Rocket,
    label: "Entrepreneurs",
    position: "right-0 top-10 sm:right-2 sm:top-14",
    tone: "bg-blue/15 text-blue",
    delay: "0.7s",
  },
  {
    icon: BookOpen,
    label: "Students",
    position: "bottom-12 left-0 sm:bottom-16 sm:left-2",
    tone: "bg-yellow/25 text-navy",
    delay: "1.4s",
  },
  {
    icon: Users,
    label: "Faculty",
    position: "bottom-2 right-4 sm:bottom-4 sm:right-8",
    tone: "bg-navy/10 text-navy",
    delay: "2.1s",
  },
];

export default function ProgramsVisual() {
  return (
    <div
      className="relative mx-auto aspect-square w-full max-w-[420px]"
      role="img"
      aria-label="Illustration of SLSSDTR programs connecting trainers, entrepreneurs, students and faculty around a central transformation hub"
    >
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 animate-glow-pulse rounded-full bg-green/20 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-4 -top-4 h-36 w-36 rounded-full bg-blue/15 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-4 -left-4 h-36 w-36 rounded-full bg-yellow/20 blur-3xl"
        aria-hidden="true"
      />

      <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <circle cx="200" cy="200" r="150" fill="none" stroke="#2F5F9B" strokeOpacity="0.15" strokeWidth="1" strokeDasharray="4 6" />
        <circle cx="200" cy="200" r="188" fill="none" stroke="#2F8C5C" strokeOpacity="0.12" strokeWidth="1" />

        <g className="animate-orbit-slower" style={{ transformBox: "fill-box", transformOrigin: "center" }}>
          <circle cx="200" cy="12" r="4" fill="#F6CE2E" />
          <circle cx="388" cy="200" r="3" fill="#2F8C5C" />
          <circle cx="200" cy="388" r="3" fill="#2F5F9B" />
        </g>
      </svg>

      <div className="absolute left-1/2 top-1/2 flex h-28 w-28 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-1 rounded-full bg-gradient-to-br from-navy to-navy-light text-white shadow-xl shadow-navy/25">
        <Sparkles className="h-6 w-6 text-yellow" strokeWidth={1.75} aria-hidden="true" />
        <span className="font-heading text-[11px] font-bold uppercase tracking-wide">Transform</span>
      </div>

      {audienceChips.map(({ icon: Icon, label, position, tone, delay }) => (
        <div
          key={label}
          className={`absolute ${position} flex animate-float items-center gap-2 rounded-full border border-navy/10 bg-white px-3.5 py-2 shadow-md shadow-navy/5`}
          style={{ animationDelay: delay }}
        >
          <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${tone}`}>
            <Icon className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
          </span>
          <span className="whitespace-nowrap font-heading text-xs font-semibold text-navy">{label}</span>
        </div>
      ))}
    </div>
  );
}
