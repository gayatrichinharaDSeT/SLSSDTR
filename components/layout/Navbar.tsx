import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Logo from "@/components/layout/Logo";
import NavLinks from "@/components/layout/NavLinks";
import MobileMenu from "@/components/layout/MobileMenu";
import AuthNavLink from "@/components/layout/AuthNavLink";
import { mainNav } from "@/data/navigation";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-navy/10 bg-white/95 backdrop-blur">
      <Container className="relative flex h-20 items-center justify-between py-3">
        <Logo />
        <NavLinks links={mainNav} />
        <div className="hidden items-center gap-5 lg:flex">
          <AuthNavLink />
          <Button href="/programs">Explore Programs</Button>
        </div>
        <MobileMenu links={mainNav} />
      </Container>
    </header>
  );
}
