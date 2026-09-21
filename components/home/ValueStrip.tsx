import Container from "@/components/ui/Container";
import { valueStrip } from "@/data/values";

export default function ValueStrip() {
  return (
    <section className="bg-mist py-8 sm:py-10">
      <Container>
        <ul className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          {valueStrip.map(({ icon: Icon, label }) => (
            <li key={label} className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-white text-green">
                <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
              </span>
              <span className="font-heading text-sm font-semibold text-navy sm:text-base">
                {label}
              </span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
