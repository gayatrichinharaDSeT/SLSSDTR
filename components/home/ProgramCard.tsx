"use client";

import { useState } from "react";
import { ArrowRight, Download, Star } from "lucide-react";
import Badge from "@/components/ui/Badge";
import ProgramLeadModal from "@/components/programs/ProgramLeadModal";
import type { Program } from "@/data/programs";

type ProgramCardProps = {
  program: Program;
};

export default function ProgramCard({ program }: ProgramCardProps) {
  const [leadModalOpen, setLeadModalOpen] = useState(false);

  return (
    <div
      className={`group flex h-full flex-col gap-5 rounded-card border bg-white p-7 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-navy/5 ${
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

      <div className="mt-auto flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => setLeadModalOpen(true)}
          className="inline-flex items-center gap-1.5 text-sm font-semibold font-heading text-green transition-colors group-hover:text-green-dark"
        >
          Explore Program
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </button>
        <a
          href={program.brochureUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(event) => event.stopPropagation()}
          className="inline-flex items-center gap-1 text-xs font-semibold font-heading text-ink/60 transition-colors hover:text-navy"
        >
          <Download className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
          Brochure
        </a>
      </div>

      {leadModalOpen ? (
        <ProgramLeadModal
          programId={program.slug}
          programName={program.name}
          onClose={() => setLeadModalOpen(false)}
        />
      ) : null}
    </div>
  );
}
