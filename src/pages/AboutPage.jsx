import PageHeader from "../components/ui/PageHeader";
import About from "../components/sections/About";

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About Us"
        title="Our Mission, Your Trust"
        subtitle="CodeCroupier exists to make on-chain gaming something you can verify, not just something you're asked to believe."
      />
      <About />
    </>
  );
}
