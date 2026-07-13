import PageHeader from "../components/ui/PageHeader";
import BenefitsBanner, { BenefitsList } from "../components/sections/BenefitsBanner";
import HowItWorks from "../components/sections/HowItWorks";

export default function HowItWorksPage() {
  return (
    <>
      <PageHeader
        eyebrow="How It Works"
        title="From Wallet to Wheel"
        subtitle="A transparent, step-by-step look at how CodeCroupier turns a wallet connection into a verifiable on-chain spin."
      />
      <BenefitsBanner />
      <BenefitsList />
      <HowItWorks />
    </>
  );
}
