import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import PageHero from "@/components/ui/PageHero";
import CustomizedModuleForm from "@/components/programs/CustomizedModuleForm";

export const metadata: Metadata = {
  title: "Customized Modules | SLSSDTR",
  description:
    "Request a customized AI training module tailored to your organization's departments and requirements.",
};

export default function CustomizedModulesPage() {
  return (
    <>
      <PageHero
        eyebrow="CUSTOMIZED MODULES"
        title="Customize Modules for Your Departments"
        description="Tell us which departments you want to cover and what you need — our team will get back to you with a tailored program."
        align="center"
      />
      <section className="bg-white pb-16 sm:pb-20 lg:pb-24">
        <Container>
          <div className="mx-auto w-full max-w-2xl rounded-card border border-navy/10 bg-white p-7 shadow-sm sm:p-9">
            <CustomizedModuleForm />
          </div>
        </Container>
      </section>
    </>
  );
}
