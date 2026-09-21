import Link from "next/link";
import Container from "@/components/ui/Container";
import Logo from "@/components/layout/Logo";
import { footerNav } from "@/data/navigation";
import { site } from "@/data/site";

export default function Footer() {
  return (
    <footer className="bg-navy text-white">
      <Container className="grid gap-10 py-14 sm:py-16 lg:grid-cols-[1.4fr_1fr]">
        <div className="flex flex-col gap-4">
          <Logo variant="dark" />
          <p className="max-w-md text-sm leading-relaxed text-white/70">
            {site.fullName}
          </p>
          <p className="font-heading text-sm font-semibold text-yellow">
            {site.tagline}
          </p>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:justify-end sm:gap-16">
          <nav aria-label="Footer navigation">
            <h3 className="mb-3 font-heading text-sm font-semibold text-white">
              Navigate
            </h3>
            <ul className="flex flex-col gap-2">
              {footerNav.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 transition-colors hover:text-yellow"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col items-center justify-between gap-2 py-5 text-xs text-white/60 sm:flex-row">
          <p>© {site.copyrightYear} SLSSDTR. All rights reserved.</p>
          <p>School of Life Science – Skill Development, Training & Research</p>
        </Container>
      </div>
    </footer>
  );
}
