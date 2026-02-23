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
import SmoothScroll from "@/components/motion/SmoothScroll";
import SectionSlide from "@/components/motion/SectionSlide";
import MarketingDNA from "@/components/MarketingDNA";

const Index = () => {
  return (
    <SmoothScroll>
      <ScrollProgress />
      <ParallaxOrbs />
      <SectionIndicator />
      <ScrollLine />
      <Header />
      <main role="main" className="noise-overlay">
        <div className="section-gradient-hero">
          <Hero />
        </div>
        <SectionSlide index={1}>
          <div className="section-gradient-proof">
            <ProofStrips />
          </div>
        </SectionSlide>
        <SectionSlide index={2}>
          <div className="section-gradient-stats">
            <CounterStats />
          </div>
        </SectionSlide>
        <SectionSlide index={3}>
          <div className="section-gradient-capabilities">
            <Capabilities />
          </div>
        </SectionSlide>
        <SectionSlide index={4}>
          <div className="section-gradient-dna">
            <MarketingDNA />
          </div>
        </SectionSlide>
        <SectionSlide index={5}>
          <div className="section-gradient-process">
            <Process />
          </div>
        </SectionSlide>
        <SectionSlide index={6}>
          <div className="section-gradient-trust">
            <Trust />
          </div>
        </SectionSlide>
        <SectionSlide index={7}>
          <div className="section-gradient-contact">
            <ContactForm />
          </div>
        </SectionSlide>
      </main>
      <Footer />
    </SmoothScroll>
  );
};

export default Index;
