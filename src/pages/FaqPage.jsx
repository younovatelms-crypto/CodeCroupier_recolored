import PageHeader from "../components/ui/PageHeader";
import FAQ from "../components/sections/FAQ";
import faqData from "../data/faq.json";

export default function FaqPage() {
  return (
    <>
      <PageHeader eyebrow={faqData.eyebrow} title={faqData.title} subtitle={faqData.subtitle} />
      <FAQ />
    </>
  );
}
