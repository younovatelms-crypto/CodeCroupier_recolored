import PageHeader from "../components/ui/PageHeader";
import Contact from "../components/sections/Contact";

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact Us"
        title="Get in Touch"
        subtitle="Questions about the protocol, the contract, or your account? Reach the CodeCroupier team below."
      />
      <Contact />
    </>
  );
}
