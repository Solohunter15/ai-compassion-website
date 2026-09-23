import HeroSection from "@/components/heroSection";
import ContinuousMarquee from "@/components/continuousMarquee";
import AboutSection from "@/components/aboutSection";
import PillarsSection from "@/components/pillarsSection";
import GlobalRelayGlobeSection from "@/components/globalRelayGlobe";
import ProducersPage from "@/components/producers";
import MediaSection from "@/components/mediaSection";
import SponsorSection from "@/components/sponsorSection";
import PartnerSection from "@/components/partnersection";
import FaqSection from "@/components/faqSection";
import ScheduleSection from "@/components/scheduleSection";
import JoinSection from "@/components/joinSection";
import JourneyIndicator from "@/components/journeyIndicator";

export default function Home() {
  return (
    <>
      <JourneyIndicator />
      <HeroSection />
      {/* Moving Bar 1: After Hero */}
      <ContinuousMarquee variant="dark" />
      <AboutSection />
      <PillarsSection />
      {/* Moving Bar 2: Between Pillars & 12 Regions Relay */}
      <ContinuousMarquee reverse={true} variant="dark" />
      <GlobalRelayGlobeSection />
      <ProducersPage />
      <MediaSection />
      <ScheduleSection />
      <SponsorSection />
      <PartnerSection />
      <FaqSection />
      <JoinSection />
    </>
  );
}