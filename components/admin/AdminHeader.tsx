import { ShieldCheck } from "lucide-react";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import LogoutButton from "@/components/dashboard/LogoutButton";

type AdminHeaderProps = {
  email: string;
  role: string;
};

export default function AdminHeader({ email, role }: AdminHeaderProps) {
  return (
    <section className="bg-gradient-to-r from-navy to-navy-dark">
      <Container className="flex flex-col gap-4 py-6 sm:flex-row sm:items-center sm:justify-between sm:py-7">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-white/10 text-green">
            <ShieldCheck className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
          </span>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <h1 className="font-heading text-lg font-bold text-white">Admin Panel</h1>
              <Badge tone={role === "ADMIN" ? "yellow" : "green"} className="!bg-white/10 !text-white">
                {role}
              </Badge>
            </div>
            <p className="text-sm text-white/60">{email}</p>
          </div>
        </div>
        <LogoutButton className="!border-white/15 !text-white hover:!border-red-300 hover:!bg-red-500/10 hover:!text-red-200 sm:self-auto" />
      </Container>
    </section>
  );
}
