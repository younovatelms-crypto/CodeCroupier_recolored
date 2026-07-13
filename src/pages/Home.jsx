import Hero from "../components/sections/Hero";
import Features from "../components/sections/Features";
import IconMarquee from "../components/sections/IconMarquee";
import Featuresmarquee from "../components/sections/Featuresmarquee";
import HowItWorks from "../components/sections/HowItWorks";
import ActivityTicker from "../components/sections/ActivityTicker";
import OddsSplit from "../components/sections/OddsSplit";
import PricingCard from "../components/sections/PricingCard";
import DashboardPreview from "../components/sections/DashboardPreview";

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <IconMarquee />
      {/*   <CoinShowcase /> */}
     <Featuresmarquee />
      <HowItWorks />
      <ActivityTicker />
      <OddsSplit />
      <PricingCard />
      <DashboardPreview />
    </>
  );
}
