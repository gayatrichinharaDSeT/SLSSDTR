import { Cpu, Factory, GraduationCap, Lightbulb, Rocket } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { technologyNodes, industryNodes } from "@/data/content";

type Cluster = {
  icon: LucideIcon;
  label: string;
  items: string[];
};

const clusters: Cluster[] = [
  {
    icon: Cpu,
    label: "Technology",
    items: technologyNodes.slice(1).map((node) => node.label),
  },
  {
    icon: Factory,
    label: "Industry",
    items: industryNodes.map((node) => node.label),
  },
  {
    icon: GraduationCap,
    label: "Academia",
    items: [],
  },
  {
    icon: Rocket,
    label: "Research & Innovation",
    items: [],
  },
  {
    icon: Lightbulb,
    label: "Career & Entrepreneurship",
    items: [],
  },
];

function polarPosition(index: number, total: number, radius: number) {
  const angle = (-90 + (360 / total) * index) * (Math.PI / 180);
  const x = 50 + radius * Math.cos(angle);
  const y = 50 + radius * Math.sin(angle);
  return { left: `${x}%`, top: `${y}%` };
}

export default function StrategicAlignment() {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <Container className="flex flex-col gap-14">
        <SectionHeading
          eyebrow="Strategic Alignment"
          title="An Integrated Vision for the Future"
          align="center"
          className="mx-auto max-w-2xl"
        />

        <div className="relative mx-auto hidden aspect-square w-full max-w-[720px] lg:block">
          <div
            className="absolute inset-[8%] rounded-full border border-dashed border-navy/15"
            aria-hidden="true"
          />
          <div
            className="absolute inset-[24%] rounded-full border border-blue/15"
            aria-hidden="true"
          />

          <svg className="absolute inset-0 h-full w-full" aria-hidden="true">
            {clusters.map((cluster, index) => {
              const pos = polarPosition(index, clusters.length, 42);
              return (
                <line
                  key={cluster.label}
                  x1="50%"
                  y1="50%"
                  x2={pos.left}
                  y2={pos.top}
                  stroke="#30609C"
                  strokeOpacity="0.25"
                  strokeWidth="1.5"
                  strokeDasharray="3 5"
                />
              );
            })}
          </svg>

          <div className="absolute left-1/2 top-1/2 flex h-32 w-32 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full bg-navy text-center shadow-lg">
            <span className="font-heading text-lg font-extrabold text-white">SLSSDTR</span>
            <span className="mt-1 h-1 w-8 rounded-full bg-yellow" aria-hidden="true" />
          </div>

          {clusters.map((cluster, index) => {
            const pos = polarPosition(index, clusters.length, 42);
            const Icon = cluster.icon;
            return (
              <div
                key={cluster.label}
                className="absolute w-48 -translate-x-1/2 -translate-y-1/2"
                style={pos}
              >
                <div className="flex flex-col items-center gap-2 rounded-card border border-navy/10 bg-white p-4 text-center shadow-sm">
                  <span className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-mist text-green">
                    <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
                  </span>
                  <span className="font-heading text-sm font-bold text-navy">
                    {cluster.label}
                  </span>
                  {cluster.items.length > 0 ? (
                    <span className="text-[11px] leading-snug text-ink/70">
                      {cluster.items.join(" · ")}
                    </span>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:hidden">
          {clusters.map(({ icon: Icon, label, items }) => (
            <div
              key={label}
              className="flex flex-col gap-2 rounded-card border border-navy/10 bg-white p-5"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-mist text-green">
                <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
              </span>
              <span className="font-heading text-sm font-bold text-navy">{label}</span>
              {items.length > 0 ? (
                <span className="text-xs leading-snug text-ink/70">{items.join(" · ")}</span>
              ) : null}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
