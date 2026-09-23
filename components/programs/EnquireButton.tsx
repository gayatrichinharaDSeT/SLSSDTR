"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import ProgramEnquiryModal from "./ProgramEnquiryModal";

type EnquireButtonProps = {
  programId: string;
  programName: string;
  batches: { id: string; label: string; monthLabel: string }[];
};

export default function EnquireButton({ programId, programName, batches }: EnquireButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button type="button" onClick={() => setOpen(true)}>
        Enquire Now
      </Button>
      {open ? (
        <ProgramEnquiryModal
          programId={programId}
          programName={programName}
          batches={batches}
          onClose={() => setOpen(false)}
        />
      ) : null}
    </>
  );
}
