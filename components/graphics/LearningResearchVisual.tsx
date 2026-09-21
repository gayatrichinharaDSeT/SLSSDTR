import { BookOpen, TestTube, Target, Sparkles, Dna } from "lucide-react";

const stageChips = [
  {
    icon: BookOpen,
    label: "Learn",
    position: "bottom-[8%] left-[4%]",
    tone: "bg-blue/15 text-blue",
    delay: "0s",
  },
  {
    icon: TestTube,
    label: "Practice",
    position: "bottom-[38%] left-[22%]",
    tone: "bg-green/15 text-green-dark",
    delay: "0.6s",
  },
  {
    icon: Target,
    label: "Apply",
    position: "top-[38%] right-[22%]",
    tone: "bg-yellow/25 text-navy",
    delay: "1.2s",
  },
  {
    icon: Sparkles,
    label: "Transform",
    position: "top-[8%] right-[4%]",
    tone: "bg-navy/10 text-navy",
    delay: "1.8s",
  },
];

export default function LearningResearchVisual() {
  return (
    <div
      className="relative mx-auto aspect-square w-full max-w-[420px]"
      role="img"
      aria-label="Illustration of the SLSSDTR learning journey — Learn, Practice, Apply, Transform — anchored by research"
    >
      <div
        className="pointer-events-none absolute left-1/2 top-[60%] h-56 w-56 -translate-x-1/2 -translate-y-1/2 animate-glow-pulse rounded-full bg-blue/20 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-4 -left-4 h-36 w-36 rounded-full bg-green/15 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-4 -top-4 h-36 w-36 rounded-full bg-yellow/20 blur-3xl"
        aria-hidden="true"
      />

      <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <circle cx="200" cy="200" r="188" fill="none" stroke="#2F5F9B" strokeOpacity="0.1" strokeWidth="1" />

        <path
          d="M60 340 Q 200 340 340 60"
          fill="none"
          stroke="#2F8C5C"
          strokeOpacity="0.45"
          strokeWidth="2"
          strokeDasharray="6 8"
          className="animate-dash-flow"
        />

        <g className="animate-orbit-slower" style={{ transformBox: "fill-box", transformOrigin: "center" }}>
          <circle cx="60" cy="340" r="3" fill="#2F5F9B" />
          <circle cx="340" cy="60" r="3" fill="#F6CE2E" />
        </g>
      </svg>

      <div className="absolute left-1/2 top-[68%] flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-1 rounded-full bg-gradient-to-br from-navy to-navy-light text-white shadow-xl shadow-navy/25">
        <Dna className="h-6 w-6 text-yellow" strokeWidth={1.75} aria-hidden="true" />
        <span className="font-heading text-[10px] font-bold uppercase tracking-wide">Research</span>
      </div>

      {stageChips.map(({ icon: Icon, label, position, tone, delay }) => (
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
