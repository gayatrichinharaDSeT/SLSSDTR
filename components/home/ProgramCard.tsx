"use client";

import { useState } from "react";
import { ArrowRight, ArrowUpRight, Download, Eye, Star } from "lucide-react";
import Badge from "@/components/ui/Badge";
import ProgramLeadModal from "@/components/programs/ProgramLeadModal";
import type { Program } from "@/data/programs";
import { getAcademyRegistrationUrl } from "@/lib/academy-redirect";

type ProgramCardProps = {
  program: Program;
};

export default function ProgramCard({ program }: ProgramCardProps) {
  const [leadModalOpen, setLeadModalOpen] = useState(false);
  const registrationUrl = getAcademyRegistrationUrl(program.academySlug);

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

      <div className="mt-auto flex items-baseline gap-2">
        <span className="font-heading text-2xl font-extrabold text-navy">
          ₹{program.price.amount.toLocaleString("en-IN")}
        </span>
        <span className="text-xs text-ink/60">incl. {program.price.gstRate}% GST</span>
      </div>

      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => setLeadModalOpen(true)}
          className="inline-flex items-center gap-1.5 text-sm font-semibold font-heading text-green transition-colors group-hover:text-green-dark"
        >
          Explore Program
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </button>
        <div className="flex items-center gap-3">
          <a
            href={program.brochureUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(event) => event.stopPropagation()}
            aria-label="View brochure"
            title="View brochure"
            className="inline-flex items-center gap-1 text-xs font-semibold font-heading text-ink/60 transition-colors hover:text-navy"
          >
            <Eye className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
          </a>
          <a
            href={program.brochureUrl}
            download
            onClick={(event) => event.stopPropagation()}
            aria-label="Download brochure"
            title="Download brochure"
            className="inline-flex items-center gap-1 text-xs font-semibold font-heading text-ink/60 transition-colors hover:text-navy"
          >
            <Download className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
          </a>
        </div>
      </div>

      {registrationUrl ? (
        <a
          href={registrationUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(event) => event.stopPropagation()}
          className="inline-flex w-full items-center justify-center gap-2 rounded-btn bg-navy px-5 py-2.5 text-sm font-semibold font-heading text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-green hover:shadow-lg hover:shadow-green/20"
        >
          Register for this cohort
          <ArrowUpRight className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
        </a>
      ) : null}

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
