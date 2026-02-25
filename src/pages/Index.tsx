// All sections imported eagerly — NO React.lazy or Suspense.
// Lazy loading caused sections to unmount/remount on mobile, producing the
// "load → black → reload" loop. Bundle is small enough to send all at once.
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProofStrips from "@/components/ProofStrips";
import Capabilities from "@/components/Capabilities";
import Process from "@/components/Process";
import Trust from "@/components/Trust";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import ParallaxOrbs from "@/components/motion/ParallaxOrbs";
import SectionIndicator from "@/components/motion/SectionIndicator";
import CounterStats from "@/components/motion/CounterStats";
import MarketingDNA from "@/components/MarketingDNA";
import RightEdgeParticles from "@/components/motion/RightEdgeParticles";
import SmoothScroll from "@/components/motion/SmoothScroll";
import ScrollProgress from "@/components/motion/ScrollProgress";
import ScrollLine from "@/components/motion/ScrollLine";
import SectionSlide from "@/components/motion/SectionSlide";

const Index = () => {
  return (
    <SmoothScroll>
      <ScrollProgress />
      <ParallaxOrbs />
      <SectionIndicator />
      <RightEdgeParticles />
      <ScrollLine />
      <Header />
      <main role="main" className="noise-overlay">
        <div className="section-gradient-hero">
          <Hero />
        </div>

        <SectionSlide index={1}>
          <div className="section-gradient-dna relative">
            <MarketingDNA />
          </div>
        </SectionSlide>

        <SectionSlide index={2}>
          <div className="section-gradient-proof">
            <ProofStrips />
          </div>
        </SectionSlide>

        <SectionSlide index={3}>
          <div className="section-gradient-stats">
            <CounterStats />
          </div>
        </SectionSlide>

        <SectionSlide index={4}>
          <div className="section-gradient-capabilities">
            <Capabilities />
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
