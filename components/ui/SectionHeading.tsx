type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "light",
  className = "",
}: SectionHeadingProps) {
  const alignClasses = align === "center" ? "text-center items-center" : "text-left items-start";
  const titleColor = tone === "dark" ? "text-white" : "text-navy";
  const descColor = tone === "dark" ? "text-white/75" : "text-ink";
  const eyebrowColor = tone === "dark" ? "text-yellow" : "text-green";

  return (
    <div className={`flex flex-col gap-3 ${alignClasses} ${className}`}>
      {eyebrow ? (
        <span className={`inline-flex items-center gap-2 text-xs font-semibold tracking-wide font-heading ${eyebrowColor}`}>
          <span className="h-1.5 w-1.5 rounded-full bg-yellow" aria-hidden="true" />
          {eyebrow}
        </span>
      ) : null}
      <h2 className={`font-heading font-bold text-[32px] leading-tight sm:text-[38px] lg:text-[44px] ${titleColor}`}>
        {title}
      </h2>
      {description ? (
        <p className={`max-w-2xl text-base sm:text-lg ${descColor}`}>{description}</p>
      ) : null}
    </div>
  );
}
