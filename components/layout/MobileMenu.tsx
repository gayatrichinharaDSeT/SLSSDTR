"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import type { NavLink } from "@/data/navigation";
import { useSession } from "@/lib/auth-client";

type MobileMenuProps = {
  links: NavLink[];
};

export default function MobileMenu({ links }: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();
  const [lastPathname, setLastPathname] = useState(pathname);
  // See components/layout/AuthNavLink.tsx — same first-deployment gate.
  const showAdminLink =
    session?.user.role === "ADMIN" && process.env.NEXT_PUBLIC_ADMIN_PANEL_ENABLED === "true";

  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setOpen(false);
  }

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        aria-label={open ? "Close menu" : "Open menu"}
        className="inline-flex h-10 w-10 items-center justify-center rounded-btn border border-navy/15 text-navy"
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {open ? (
        <div
          id="mobile-nav-panel"
          className="absolute inset-x-0 top-full z-40 border-b border-navy/10 bg-white shadow-lg"
        >
          <ul className="flex flex-col gap-1 px-5 py-4">
            {links.map((link) => {
              const isActive =
                link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={isActive ? "page" : undefined}
                    className={`block rounded-btn px-3 py-2.5 text-base font-semibold font-heading ${
                      isActive ? "bg-mist text-navy" : "text-ink hover:bg-grey"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="flex flex-col gap-3 border-t border-navy/10 px-5 py-4">
            <Link
              href={session ? (showAdminLink ? "/admin" : "/dashboard") : "/login"}
              className="flex w-full items-center justify-center rounded-btn border border-navy/15 px-6 py-3 text-sm font-semibold font-heading text-navy"
            >
              {session ? (showAdminLink ? "Admin" : "Dashboard") : "Sign In"}
            </Link>
            <Link
              href="/programs"
              className="flex w-full items-center justify-center rounded-btn bg-navy px-6 py-3 text-sm font-semibold font-heading text-white"
            >
              Explore Programs
            </Link>
          </div>
        </div>
      ) : null}
    </div>
  );
}
