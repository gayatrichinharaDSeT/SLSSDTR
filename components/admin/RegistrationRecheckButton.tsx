"use client";

import { useState } from "react";
import { RefreshCw } from "lucide-react";
import { useRouter } from "next/navigation";

// Reconciliation action for a registration stuck PENDING because the
// browser never completed the verify-payment call (closed tab, dropped
// connection) — pulls DSet Academy's authoritative status for this order
// and syncs it here, even though DSet's own webhook already resolved it
// on their side.
export default function RegistrationRecheckButton({ id }: { id: string }) {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(false);

  async function handleClick() {
    setPending(true);
    setError(false);

    const response = await fetch(`/api/admin/registrations/${id}/recheck`, { method: "POST" });

    setPending(false);

    if (!response.ok) {
      setError(true);
      return;
    }

    router.refresh();
  }

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={handleClick}
        disabled={pending}
        className="inline-flex items-center gap-1.5 rounded-btn border border-navy/15 px-3 py-1.5 text-xs font-semibold font-heading text-navy transition-colors hover:border-green/40 hover:text-green-dark disabled:opacity-60"
      >
        <RefreshCw className={`h-3.5 w-3.5 ${pending ? "animate-spin" : ""}`} strokeWidth={2} aria-hidden="true" />
        {pending ? "Checking..." : "Recheck Status"}
      </button>
      {error ? <span className="text-xs text-red-600">Failed</span> : null}
    </div>
  );
}
