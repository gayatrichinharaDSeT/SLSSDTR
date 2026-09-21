"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { signOut } from "@/lib/auth-client";

export default function LogoutButton({ className = "" }: { className?: string }) {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  async function handleLogout() {
    setPending(true);
    await signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={pending}
      className={`inline-flex items-center gap-2 rounded-btn border border-navy/15 px-4 py-2 text-sm font-semibold font-heading text-navy transition-all duration-200 hover:border-red-300 hover:bg-red-50 hover:text-red-600 disabled:pointer-events-none disabled:opacity-60 ${className}`}
    >
      <LogOut className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
      {pending ? "Signing out..." : "Log out"}
    </button>
  );
}
