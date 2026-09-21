"use client";

import { useState, type ChangeEvent } from "react";
import { useRouter } from "next/navigation";

const STATUSES = ["NEW", "READ", "IN_PROGRESS", "RESOLVED"] as const;

export default function MessageStatusSelect({ id, status }: { id: string; status: string }) {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(false);

  async function handleChange(event: ChangeEvent<HTMLSelectElement>) {
    const nextStatus = event.target.value;
    setPending(true);
    setError(false);

    const response = await fetch("/api/admin/messages", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status: nextStatus }),
    });

    setPending(false);

    if (!response.ok) {
      setError(true);
      return;
    }

    router.refresh();
  }

  return (
    <div className="flex items-center gap-2">
      <select
        defaultValue={status}
        onChange={handleChange}
        disabled={pending}
        className="rounded-btn border border-navy/15 bg-white px-3 py-1.5 text-xs font-semibold font-heading text-navy focus:border-green focus:outline-none disabled:opacity-60"
      >
        {STATUSES.map((value) => (
          <option key={value} value={value}>
            {value.replace("_", " ")}
          </option>
        ))}
      </select>
      {error ? <span className="text-xs text-red-600">Failed</span> : null}
    </div>
  );
}
