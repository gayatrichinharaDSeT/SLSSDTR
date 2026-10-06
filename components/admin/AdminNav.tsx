"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { label: "Overview", href: "/admin" },
  { label: "Users", href: "/admin/users" },
  { label: "Enquiries", href: "/admin/enquiries" },
  { label: "Customized Modules", href: "/admin/customized-modules" },
  { label: "Messages", href: "/admin/messages" },
];

export default function AdminNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Admin navigation" className="flex flex-wrap gap-2 border-b border-navy/10 pb-4">
      {links.map((link) => {
        const isActive = link.href === "/admin" ? pathname === link.href : pathname.startsWith(link.href);
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
