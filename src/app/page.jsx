import HeroSection from "@/components/heroSection";
import ContinuousMarquee from "@/components/continuousMarquee";
import AboutSection from "@/components/aboutSection";
import PillarsSection from "@/components/pillarsSection";
import GlobalRelayGlobeSection from "@/components/globalRelayGlobe";
import ProducersSection from "@/components/producers";
import SpeakerSection from "@/components/speakerSection";
import RegionalCoordinatorsSection from "@/components/regionalCoordinatorsSection";
import ScheduleSection from "@/components/scheduleSection";
import MediaSection from "@/components/mediaSection";
import PartnersAndSponsors from "@/components/partnersAndSponsors";
import FaqSection from "@/components/faqSection";
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
      {/* Moving Bar 2: Between Pillars & Global Relay */}
      <ContinuousMarquee reverse={true} variant="dark" />
      <GlobalRelayGlobeSection />
      <ProducersSection />
      <SpeakerSection />
      <RegionalCoordinatorsSection />
      <ScheduleSection />
      <MediaSection />
      <PartnersAndSponsors />
      <FaqSection />
    </>
  );
}