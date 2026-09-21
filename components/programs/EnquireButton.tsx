"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import ProgramEnquiryModal from "./ProgramEnquiryModal";

export default function EnquireButton({ programId, programName }: { programId: string; programName: string }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button type="button" onClick={() => setOpen(true)}>
        Enquire Now
      </Button>
      {open ? (
        <ProgramEnquiryModal programId={programId} programName={programName} onClose={() => setOpen(false)} />
      ) : null}
    </>
  );
}
