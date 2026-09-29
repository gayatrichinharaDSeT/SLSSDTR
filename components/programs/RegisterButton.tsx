"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import ProgramRegistrationModal from "./ProgramRegistrationModal";

type RegisterButtonProps = {
  programId: string;
  programName: string;
  batches: { id: string; label: string; monthLabel: string }[];
};

export default function RegisterButton({ programId, programName, batches }: RegisterButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button type="button" variant="secondary" onClick={() => setOpen(true)}>
        Register &amp; Pay
      </Button>
      {open ? (
        <ProgramRegistrationModal
          programId={programId}
          programName={programName}
          batches={batches}
          onClose={() => setOpen(false)}
        />
      ) : null}
    </>
  );
}
