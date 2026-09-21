import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import Link from "next/link";

const LOGO_RELATIVE_PATH = "logo/slssdtr-logo.png";

function logoExists(): boolean {
  try {
    return fs.existsSync(path.join(process.cwd(), "public", LOGO_RELATIVE_PATH));
  } catch {
    return false;
  }
}

type LogoProps = {
  variant?: "light" | "dark";
  className?: string;
};

export default function Logo({ variant = "light", className = "" }: LogoProps) {
  const hasLogo = logoExists();
  const textColor = variant === "dark" ? "text-white" : "text-navy";
  const subTextColor = variant === "dark" ? "text-white/70" : "text-ink";

  return (
    <Link href="/" className={`flex items-center gap-3 ${className}`} aria-label="SLSSDTR home">
      {hasLogo ? (
        <Image
          src={`/${LOGO_RELATIVE_PATH}`}
          alt="SLSSDTR logo"
          width={240}
          height={198}
          className="h-11 w-auto object-contain sm:h-12"
          priority
        />
      ) : (
        <span
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-navy font-heading text-sm font-bold text-white sm:h-11 sm:w-11"
          aria-hidden="true"
        >
          SL
        </span>
      )}
      <span className="flex flex-col leading-tight">
        <span className={`font-heading text-base font-extrabold tracking-tight sm:text-lg ${textColor}`}>
          SLSSDTR
        </span>
        <span className={`hidden text-[11px] font-medium sm:block ${subTextColor}`}>
          School of Life Science
        </span>
      </span>
    </Link>
  );
}
