"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { label: "Overview", href: "/dashboard" },
  { label: "Profile", href: "/dashboard/profile" },
  { label: "My Enquiries", href: "/dashboard/enquiries" },
  { label: "Settings", href: "/dashboard/settings" },
];

export default function DashboardNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Dashboard navigation" className="flex flex-wrap gap-2 border-b border-navy/10 pb-4">
      {links.map((link) => {
        const isActive = link.href === "/dashboard" ? pathname === link.href : pathname.startsWith(link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            aria-current={isActive ? "page" : undefined}
            className={`rounded-full px-4 py-2 text-sm font-semibold font-heading transition-colors duration-200 ${
              isActive ? "bg-navy text-white" : "bg-grey text-ink hover:bg-mist hover:text-green-dark"
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
