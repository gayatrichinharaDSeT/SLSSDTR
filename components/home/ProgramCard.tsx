import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import Badge from "@/components/ui/Badge";
import type { Program } from "@/data/programs";

type ProgramCardProps = {
  program: Program;
};

export default function ProgramCard({ program }: ProgramCardProps) {
  return (
    <div
      className={`group flex flex-col gap-5 rounded-card border bg-white p-7 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md ${
        program.flagship ? "border-green/40" : "border-navy/10 hover:border-green/40"
      }`}
    >
      {program.flagship ? (
        <Badge tone="yellow" className="w-fit gap-1.5">
          <Star className="h-3 w-3" strokeWidth={2} aria-hidden="true" />
          FLAGSHIP PROGRAM
        </Badge>
      ) : null}

      <h3 className="font-heading text-2xl font-bold text-navy">{program.name}</h3>
      <p className="text-sm leading-relaxed text-ink">{program.description}</p>

      <ul className="flex flex-wrap gap-2">
        {program.focusAreas.slice(0, 3).map((area) => (
          <li
            key={area}
            className="rounded-full bg-grey px-3 py-1 text-xs font-medium text-ink"
          >
            {area}
          </li>
        ))}
      </ul>

      <Link
        href={`/programs/${program.slug}`}
        className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold font-heading text-green transition-colors group-hover:text-green-dark"
      >
        Explore Program
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
      </Link>
    </div>
  );
}
