import Hero from "@/components/home/Hero";
import WhoWeEmpower from "@/components/home/WhoWeEmpower";
import AboutWhy from "@/components/home/AboutWhy";
import ProgramsSection from "@/components/home/ProgramsSection";
import StrategicAlignment from "@/components/home/StrategicAlignment";
import LearningApproach from "@/components/home/LearningApproach";
import CareerResearch from "@/components/home/CareerResearch";
import IndustryGlobal from "@/components/home/IndustryGlobal";
import LeadershipAdvisory from "@/components/home/LeadershipAdvisory";
import FinalCTA from "@/components/home/FinalCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <WhoWeEmpower />
      <AboutWhy />
      <ProgramsSection />
      <StrategicAlignment />
      <LearningApproach />
      <CareerResearch />
      <IndustryGlobal />
      <LeadershipAdvisory />
      <FinalCTA />
    </>
  );
}
