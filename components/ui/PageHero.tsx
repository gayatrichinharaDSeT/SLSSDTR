import type { ReactNode } from "react";
import Container from "@/components/ui/Container";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description?: string;
  children?: ReactNode;
};

export default function PageHero({ eyebrow, title, description, children }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-mist/60 via-white to-white">
      <Container className="flex flex-col items-start gap-5 py-16 sm:py-20 lg:py-24">
        <span className="inline-flex items-center gap-2 rounded-full border border-green/25 bg-mist px-4 py-1.5 text-xs font-semibold tracking-wide text-green-dark font-heading">
          {eyebrow}
        </span>
        <h1 className="max-w-3xl font-heading text-[36px] font-extrabold leading-[1.1] text-navy sm:text-[46px] lg:text-[54px]">
          {title}
        </h1>
        {description ? (
          <p className="max-w-2xl text-base leading-relaxed text-ink sm:text-lg">
            {description}
          </p>
        ) : null}
        {children}
      </Container>
    </section>
  );
}
