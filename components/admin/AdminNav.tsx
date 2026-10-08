"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Boxes, LayoutDashboard, Mail, MessageSquare, Users } from "lucide-react";

const links = [
  { label: "Overview", href: "/admin", icon: LayoutDashboard },
  { label: "Users", href: "/admin/users", icon: Users },
  { label: "Enquiries", href: "/admin/enquiries", icon: Mail },
  { label: "Customized Modules", href: "/admin/customized-modules", icon: Boxes },
  { label: "Messages", href: "/admin/messages", icon: MessageSquare },
];

export default function AdminNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Admin navigation"
      className="flex flex-wrap gap-2 rounded-card border border-navy/10 bg-white p-2 shadow-sm"
    >
      {links.map((link) => {
        const isActive = link.href === "/admin" ? pathname === link.href : pathname.startsWith(link.href);
        const Icon = link.icon;
        return (
          <Link
            key={link.href}
            href={link.href}
            aria-current={isActive ? "page" : undefined}
            className={`inline-flex items-center gap-2 rounded-btn px-4 py-2 text-sm font-semibold font-heading transition-colors duration-200 ${
              isActive ? "bg-navy text-white" : "text-ink hover:bg-mist hover:text-green-dark"
            }`}
          >
            <Icon className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
