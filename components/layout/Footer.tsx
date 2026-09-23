import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Container from "@/components/ui/Container";
import Logo from "@/components/layout/Logo";
import Reveal from "@/components/ui/Reveal";
import { footerNav } from "@/data/navigation";
import { site } from "@/data/site";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-navy to-navy-dark text-white">
      <div className="h-[3px] w-full bg-gradient-to-r from-green via-yellow to-blue" aria-hidden="true" />

      <div
        className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 animate-glow-pulse rounded-full bg-green/25 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-24 left-0 h-64 w-64 rounded-full bg-blue/20 blur-3xl"
        aria-hidden="true"
      />

      <Reveal>
        <Container className="relative grid gap-10 py-10 sm:py-12 lg:grid-cols-[1.3fr_1fr_auto] lg:items-start">
          <div className="flex flex-col gap-3">
            <Logo variant="dark" />
            <p className="max-w-md text-sm leading-relaxed text-white/65">
              {site.fullName}
            </p>
            <p className="font-heading text-sm font-semibold text-yellow">
              {site.tagline}
            </p>
          </div>

          <nav aria-label="Footer navigation">
            <h3 className="mb-3 font-heading text-xs font-semibold uppercase tracking-wide text-white/50">
              Navigate
            </h3>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-2 sm:grid-cols-1">
              {footerNav.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group relative inline-flex items-center text-sm text-white/70 transition-colors duration-200 hover:text-yellow"
                  >
                    {link.label}
                    <span
                      className="absolute -bottom-0.5 left-0 h-px w-0 bg-yellow transition-all duration-300 ease-out group-hover:w-full"
                      aria-hidden="true"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-start lg:justify-end">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-1.5 rounded-btn border border-white/20 px-5 py-2.5 text-sm font-semibold font-heading text-white transition-all duration-200 hover:-translate-y-0.5 hover:border-yellow hover:bg-yellow hover:text-navy hover:shadow-lg hover:shadow-yellow/20"
            >
              Get in Touch
              <ArrowUpRight
                className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </Link>
          </div>
        </Container>
      </Reveal>

      <div className="relative border-t border-white/10">
        <Container className="flex flex-col items-center justify-between gap-2 py-4 text-xs text-white/50 sm:flex-row">
          <p>© {site.copyrightYear} SLSSDTR. All rights reserved.</p>
          <p>School of Life Sciience – Skill Development, Training & Research</p>
        </Container>
      </div>
    </footer>
  );
}
