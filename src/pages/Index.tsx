// Sections are eagerly imported EXCEPT ContactForm (58KB form library).
// ContactForm is lazy but preloaded on idle so it's ready before user scrolls to it.
import { lazy, Suspense, useEffect } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProofStrips from "@/components/ProofStrips";
import Capabilities from "@/components/Capabilities";
import Process from "@/components/Process";
import Trust from "@/components/Trust";
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

// Only ContactForm is lazy — it's 58KB (form library). Everything else is eager.
const ContactForm = lazy(() => import("@/components/ContactForm"));

// Preload ContactForm chunk as soon as browser is idle (not blocking first paint)
const preloadContactForm = () => import("@/components/ContactForm");

const Index = () => {
  // Kick off preload on idle so ContactForm is ready before user scrolls to it
  useEffect(() => {
    if ("requestIdleCallback" in window) {
      (window as Window & typeof globalThis & { requestIdleCallback: (cb: () => void) => void })
        .requestIdleCallback(preloadContactForm);
    } else {
      setTimeout(preloadContactForm, 2000);
    }
  }, []);

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

        {/* ContactForm: lazy with Suspense — but chunk is preloaded on idle so it's ready */}
        <SectionSlide index={7}>
          <div className="section-gradient-contact">
            <Suspense fallback={<div style={{ minHeight: "50vh" }} />}>
              <ContactForm />
            </Suspense>
          </div>
        </SectionSlide>
      </main>
      <Footer />
    </SmoothScroll>
  );
};

export default Index;
