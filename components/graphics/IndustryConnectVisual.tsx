import { GraduationCap, Factory, Handshake, Pill, HeartPulse, Microscope, Globe } from "lucide-react";

const sectorChips = [
  { icon: Pill, label: "Pharma", position: "top-[4%] left-[14%]", tone: "bg-blue/15 text-blue", delay: "0s" },
  { icon: Microscope, label: "R&D", position: "top-[4%] right-[14%]", tone: "bg-green/15 text-green-dark", delay: "0.6s" },
  { icon: HeartPulse, label: "Healthcare", position: "bottom-[4%] left-[8%]", tone: "bg-yellow/25 text-navy", delay: "1.2s" },
  { icon: Globe, label: "Global", position: "bottom-[4%] right-[8%]", tone: "bg-navy/10 text-navy", delay: "1.8s" },
];

export default function IndustryConnectVisual() {
  return (
    <div
      className="relative mx-auto aspect-square w-full max-w-[420px]"
      role="img"
      aria-label="Illustration of SLSSDTR bridging academia and industry, connecting pharma, R&D, healthcare and global reach"
    >
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 animate-glow-pulse rounded-full bg-green/20 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -left-4 top-1/2 h-36 w-36 -translate-y-1/2 rounded-full bg-navy/10 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-4 top-1/2 h-36 w-36 -translate-y-1/2 rounded-full bg-blue/15 blur-3xl"
        aria-hidden="true"
      />

      <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <circle cx="200" cy="200" r="188" fill="none" stroke="#2F5F9B" strokeOpacity="0.1" strokeWidth="1" />
        <line
          x1="80"
          y1="200"
          x2="320"
          y2="200"
          stroke="#2F8C5C"
          strokeOpacity="0.45"
          strokeWidth="2"
          strokeDasharray="6 8"
          className="animate-dash-flow"
        />
      </svg>

      <div className="absolute left-2 top-1/2 flex h-24 w-24 -translate-y-1/2 flex-col items-center justify-center gap-1 rounded-full bg-gradient-to-br from-navy to-navy-light text-white shadow-xl shadow-navy/25">
        <GraduationCap className="h-6 w-6 text-yellow" strokeWidth={1.75} aria-hidden="true" />
        <span className="font-heading text-[10px] font-bold uppercase tracking-wide">Academia</span>
      </div>

      <div className="absolute right-2 top-1/2 flex h-24 w-24 -translate-y-1/2 flex-col items-center justify-center gap-1 rounded-full bg-gradient-to-br from-green-dark to-green text-white shadow-xl shadow-green/25">
        <Factory className="h-6 w-6 text-yellow" strokeWidth={1.75} aria-hidden="true" />
        <span className="font-heading text-[10px] font-bold uppercase tracking-wide">Industry</span>
      </div>

      <div className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-navy/10 bg-white shadow-lg shadow-navy/10">
        <Handshake className="h-6 w-6 text-green-dark" strokeWidth={1.75} aria-hidden="true" />
      </div>

      {sectorChips.map(({ icon: Icon, label, position, tone, delay }) => (
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
