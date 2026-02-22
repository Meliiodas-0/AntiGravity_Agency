import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProofStrips from "@/components/ProofStrips";
import Capabilities from "@/components/Capabilities";
import Process from "@/components/Process";
import Trust from "@/components/Trust";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/motion/ScrollProgress";
import ParallaxOrbs from "@/components/motion/ParallaxOrbs";
import SectionIndicator from "@/components/motion/SectionIndicator";
import ScrollLine from "@/components/motion/ScrollLine";
import CounterStats from "@/components/motion/CounterStats";

const Index = () => {
  return (
    <>
      <ScrollProgress />
      <ParallaxOrbs />
      <SectionIndicator />
      <ScrollLine />
      <Header />
      <main role="main">
        <div className="section-gradient-hero">
          <Hero />
        </div>
        <div className="section-gradient-proof">
          <ProofStrips />
        </div>
        <div className="section-gradient-stats">
          <CounterStats />
        </div>
        <div className="section-gradient-capabilities">
          <Capabilities />
        </div>
        <div className="section-gradient-process">
          <Process />
        </div>
        <div className="section-gradient-trust">
          <Trust />
        </div>
        <div className="section-gradient-contact">
          <ContactForm />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Index;
