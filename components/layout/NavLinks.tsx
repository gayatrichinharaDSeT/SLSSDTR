"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavLink } from "@/data/navigation";

type NavLinksProps = {
  links: NavLink[];
};

export default function NavLinks({ links }: NavLinksProps) {
  const pathname = usePathname();

  return (
    <ul className="hidden items-center gap-7 lg:flex">
      {links.map((link) => {
        const isActive =
          link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);

        return (
          <li key={link.href}>
            <Link
              href={link.href}
              aria-current={isActive ? "page" : undefined}
              className={`relative py-1 text-sm font-semibold font-heading transition-colors duration-200 ${
                isActive ? "text-navy" : "text-ink hover:text-green"
              }`}
            >
              {link.label}
              {isActive ? (
                <span
                  className="absolute -bottom-1 left-0 h-[2px] w-full rounded-full bg-green"
                  aria-hidden="true"
                />
              ) : null}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
