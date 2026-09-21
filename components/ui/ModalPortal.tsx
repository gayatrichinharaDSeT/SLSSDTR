"use client";

import { useSyncExternalStore, type ReactNode } from "react";
import { createPortal } from "react-dom";

function subscribe() {
  return () => {};
}

// Renders children into document.body instead of in place. A modal must
// portal out: rendered in place, its `fixed inset-0` only escapes the
// viewport if every ancestor has no `transform`/`filter`/`will-change` —
// one hover:-translate-y-* card (ProgramCard.tsx) or a scroll-reveal
// wrapper (Reveal.tsx) breaks that, trapping the "fullscreen" overlay
// inside the ancestor's own box instead of covering the page.
export default function ModalPortal({ children }: { children: ReactNode }) {
  // document doesn't exist during SSR, so the portal target is only known
  // client-side; useSyncExternalStore's server/client snapshot split
  // reports "mounted" without the setState-in-effect anti-pattern a plain
  // useState + useEffect version would need.
  const mounted = useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );

  if (!mounted) return null;

  return createPortal(children, document.body);
}
