import { lazy, Suspense } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import SmoothScroll from "@/components/motion/SmoothScroll";
import ScrollProgress from "@/components/motion/ScrollProgress";
import ScrollLine from "@/components/motion/ScrollLine";
// SectionSlide is NOT lazy — it wraps every section so must be available immediately
import SectionSlide from "@/components/motion/SectionSlide";

// ── Lazy-loaded sections (split the bundle; each has its own Suspense) ────────
const ProofStrips = lazy(() => import("@/components/ProofStrips"));
const Capabilities = lazy(() => import("@/components/Capabilities"));
const Process = lazy(() => import("@/components/Process"));
const Trust = lazy(() => import("@/components/Trust"));
const ContactForm = lazy(() => import("@/components/ContactForm"));
const Footer = lazy(() => import("@/components/Footer"));
const ParallaxOrbs = lazy(() => import("@/components/motion/ParallaxOrbs"));
const SectionIndicator = lazy(() => import("@/components/motion/SectionIndicator"));
const CounterStats = lazy(() => import("@/components/motion/CounterStats"));
const MarketingDNA = lazy(() => import("@/components/MarketingDNA"));
const RightEdgeParticles = lazy(() => import("@/components/motion/RightEdgeParticles"));

// Invisible placeholder — keeps layout stable while chunk loads
const Nil = () => null;

const Index = () => {
  return (
    <SmoothScroll>
      <ScrollProgress />
      {/* Each decoration has its own Suspense so they load independently */}
      <Suspense fallback={<Nil />}><ParallaxOrbs /></Suspense>
      <Suspense fallback={<Nil />}><SectionIndicator /></Suspense>
      <Suspense fallback={<Nil />}><RightEdgeParticles /></Suspense>
      <ScrollLine />
      <Header />
      <main role="main" className="noise-overlay">
        {/* Hero is eagerly loaded — first-paint critical */}
        <div className="section-gradient-hero">
          <Hero />
        </div>

        {/* Each section has its own Suspense so one slow load doesn't block others */}
        <SectionSlide index={1}>
          <div className="section-gradient-dna relative">
            <Suspense fallback={<div style={{ minHeight: "60vh" }} />}>
              <MarketingDNA />
            </Suspense>
          </div>
        </SectionSlide>

        <SectionSlide index={2}>
          <div className="section-gradient-proof">
            <Suspense fallback={<div style={{ minHeight: "40vh" }} />}>
              <ProofStrips />
            </Suspense>
          </div>
        </SectionSlide>

        <SectionSlide index={3}>
          <div className="section-gradient-stats">
            <Suspense fallback={<div style={{ minHeight: "30vh" }} />}>
              <CounterStats />
            </Suspense>
          </div>
        </SectionSlide>

        <SectionSlide index={4}>
          <div className="section-gradient-capabilities">
            <Suspense fallback={<div style={{ minHeight: "60vh" }} />}>
              <Capabilities />
            </Suspense>
          </div>
        </SectionSlide>

        <SectionSlide index={5}>
          <div className="section-gradient-process">
            <Suspense fallback={<div style={{ minHeight: "60vh" }} />}>
              <Process />
            </Suspense>
          </div>
        </SectionSlide>

        <SectionSlide index={6}>
          <div className="section-gradient-trust">
            <Suspense fallback={<div style={{ minHeight: "40vh" }} />}>
              <Trust />
            </Suspense>
          </div>
        </SectionSlide>

        <SectionSlide index={7}>
          <div className="section-gradient-contact">
            <Suspense fallback={<div style={{ minHeight: "50vh" }} />}>
              <ContactForm />
            </Suspense>
          </div>
        </SectionSlide>
      </main>
      <Suspense fallback={<Nil />}><Footer /></Suspense>
    </SmoothScroll>
  );
};

export default Index;
