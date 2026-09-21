import type { ReactNode } from "react";
import Container from "@/components/ui/Container";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description?: string;
  children?: ReactNode;
  visual?: ReactNode;
  align?: "left" | "center";
};

export default function PageHero({
  eyebrow,
  title,
  description,
  children,
  visual,
  align = "left",
}: PageHeroProps) {
  const isCentered = align === "center" && !visual;

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-mist/60 via-white to-white">
      <Container
        className={`grid items-center gap-10 py-16 sm:py-20 lg:py-24 ${
          visual ? "lg:grid-cols-[1.1fr_0.9fr] lg:gap-16" : ""
        }`}
      >
        <div
          className={`flex flex-col gap-5 ${
            isCentered ? "items-center text-center" : "items-start"
          }`}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-green/25 bg-mist px-4 py-1.5 text-xs font-semibold tracking-wide text-green-dark font-heading">
            {eyebrow}
          </span>
          <h1
            className={`max-w-3xl font-heading text-[36px] font-extrabold leading-[1.1] text-navy sm:text-[46px] lg:text-[54px] ${
              isCentered ? "mx-auto" : ""
            }`}
          >
            {title}
          </h1>
          {description ? (
            <p
              className={`max-w-2xl text-base leading-relaxed text-ink sm:text-lg ${
                isCentered ? "mx-auto" : ""
              }`}
            >
              {description}
            </p>
          ) : null}
          {children}
        </div>

        {visual ? (
          <div className="animate-fade-up opacity-0 [animation-delay:150ms]">{visual}</div>
        ) : null}
      </Container>
    </section>
  );
}
