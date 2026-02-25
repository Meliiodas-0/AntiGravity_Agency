import { lazy, Suspense } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import SmoothScroll from "@/components/motion/SmoothScroll";
import ScrollProgress from "@/components/motion/ScrollProgress";
import ScrollLine from "@/components/motion/ScrollLine";

// ── Lazy-loaded sections (split the 571KB bundle) ─────────────────────────────
const ProofStrips = lazy(() => import("@/components/ProofStrips"));
const Capabilities = lazy(() => import("@/components/Capabilities"));
const Process = lazy(() => import("@/components/Process"));
const Trust = lazy(() => import("@/components/Trust"));
const ContactForm = lazy(() => import("@/components/ContactForm"));
const Footer = lazy(() => import("@/components/Footer"));
const ParallaxOrbs = lazy(() => import("@/components/motion/ParallaxOrbs"));
const SectionIndicator = lazy(() => import("@/components/motion/SectionIndicator"));
const SectionSlide = lazy(() => import("@/components/motion/SectionSlide"));
const CounterStats = lazy(() => import("@/components/motion/CounterStats"));
const MarketingDNA = lazy(() => import("@/components/MarketingDNA"));
const RightEdgeParticles = lazy(() => import("@/components/motion/RightEdgeParticles"));

// Minimal inline fallback — invisible placeholder keeps layout stable
const Nil = () => null;

const Index = () => {
  return (
    <SmoothScroll>
      <ScrollProgress />
      <Suspense fallback={<Nil />}>
        <ParallaxOrbs />
        <SectionIndicator />
        <RightEdgeParticles />
      </Suspense>
      <ScrollLine />
      <Header />
      <main role="main" className="noise-overlay">
        {/* Hero loads eagerly — it's first-paint critical */}
        <div className="section-gradient-hero">
          <Hero />
        </div>

        {/* Everything below is lazy */}
        <Suspense fallback={<Nil />}>
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
        </Suspense>
      </main>
      <Suspense fallback={<Nil />}>
        <Footer />
      </Suspense>
    </SmoothScroll>
  );
};

export default Index;
