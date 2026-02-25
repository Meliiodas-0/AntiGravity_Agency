import { lazy, Suspense } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProofStrips from "@/components/ProofStrips";
import Footer from "@/components/Footer";
import ParallaxOrbs from "@/components/motion/ParallaxOrbs";
import SectionIndicator from "@/components/motion/SectionIndicator";
import RightEdgeParticles from "@/components/motion/RightEdgeParticles";
import SmoothScroll from "@/components/motion/SmoothScroll";
import ScrollProgress from "@/components/motion/ScrollProgress";
import ScrollLine from "@/components/motion/ScrollLine";
import SectionSlide from "@/components/motion/SectionSlide";
import SectionPlaceholder from "@/components/motion/SectionPlaceholder";

// LEAVE EAGER (First Fold):
// - Header
// - Hero
// - ProofStrips
// This ensures the user sees content immediately.

// MOVE TO LAZY (Below Fold):
// Splitting these reduces initial JS parse time on mobile/iOS.
const MarketingDNA = lazy(() => import("@/components/MarketingDNA"));
const CounterStats = lazy(() => import("@/components/motion/CounterStats"));
const Capabilities = lazy(() => import("@/components/Capabilities"));
const Process = lazy(() => import("@/components/Process"));
const Trust = lazy(() => import("@/components/Trust"));
const ContactForm = lazy(() => import("@/components/ContactForm"));

const Index = () => {
  return (
    <SmoothScroll>
      <ScrollProgress />
      <ParallaxOrbs />
      <SectionIndicator />
      <RightEdgeParticles />
      <ScrollLine />
      <Header />
      <main role="main" className="noise-overlay bg-white">
        <div className="p-3 sm:p-6 lg:p-10">
          <div className="bg-black rounded-[2.5rem] overflow-hidden shadow-2xl relative">
            <Hero />
          </div>
        </div>

        {/* MarketingDNA: Lazy with stable placeholder */}
        <SectionSlide index={1}>
          <div className="p-3 sm:p-6 lg:p-10 -mt-6 sm:-mt-10">
            <div className="bg-black rounded-[2.5rem] overflow-hidden shadow-2xl relative min-h-[80vh]">
              <Suspense fallback={<SectionPlaceholder height="80vh" />}>
                <MarketingDNA />
              </Suspense>
            </div>
          </div>
        </SectionSlide>

        <SectionSlide index={2}>
          <div className="p-3 sm:p-6 lg:p-10 -mt-6 sm:-mt-10">
            <div className="bg-black rounded-[2.5rem] overflow-hidden shadow-2xl relative">
              <ProofStrips />
            </div>
          </div>
        </SectionSlide>

        {/* Stats: Lazy */}
        <SectionSlide index={3}>
          <div className="p-3 sm:p-6 lg:p-10 -mt-6 sm:-mt-10">
            <div className="bg-black rounded-[2.5rem] overflow-hidden shadow-2xl relative">
              <Suspense fallback={<SectionPlaceholder height="400px" />}>
                <CounterStats />
              </Suspense>
            </div>
          </div>
        </SectionSlide>

        {/* Capabilities: Lazy */}
        <SectionSlide index={4}>
          <div className="p-3 sm:p-6 lg:p-10 -mt-6 sm:-mt-10">
            <div className="bg-black rounded-[2.5rem] overflow-hidden shadow-2xl relative">
              <Suspense fallback={<SectionPlaceholder height="600px" />}>
                <Capabilities />
              </Suspense>
            </div>
          </div>
        </SectionSlide>

        {/* Process: Lazy */}
        <SectionSlide index={5}>
          <div className="p-3 sm:p-6 lg:p-10 -mt-6 sm:-mt-10">
            <div className="bg-black rounded-[2.5rem] overflow-hidden shadow-2xl relative">
              <Suspense fallback={<SectionPlaceholder height="600px" />}>
                <Process />
              </Suspense>
            </div>
          </div>
        </SectionSlide>

        {/* Trust: Lazy */}
        <SectionSlide index={6}>
          <div className="p-3 sm:p-6 lg:p-10 -mt-6 sm:-mt-10">
            <div className="bg-black rounded-[2.5rem] overflow-hidden shadow-2xl relative">
              <Suspense fallback={<SectionPlaceholder height="600px" />}>
                <Trust />
              </Suspense>
            </div>
          </div>
        </SectionSlide>

        {/* ContactForm: Lazy */}
        <SectionSlide index={7}>
          <div className="p-3 sm:p-6 lg:p-10 -mt-6 sm:-mt-10">
            <div className="bg-black rounded-[2.5rem] overflow-hidden shadow-2xl relative min-h-[80vh]">
              <Suspense fallback={<SectionPlaceholder height="80vh" />}>
                <ContactForm />
              </Suspense>
            </div>
          </div>
        </SectionSlide>
      </main>
      <Footer />
    </SmoothScroll>
  );
};

export default Index;
