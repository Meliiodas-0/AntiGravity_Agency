import { content } from "@/content/content";
import { motion, useScroll, useTransform, useMotionValue } from "framer-motion";
import { useRef } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import TextReveal from "./motion/TextReveal";
import DNANode from "./DNANode";
import PhoneAnimation from "./PhoneAnimation";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const isMobile = useIsMobile();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  // Mouse tracking for reactive DNA
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouseX.set(clientX / innerWidth);
    mouseY.set(clientY / innerHeight);
  };

  // Exit animations for the top text
  const opacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.4], [1, 0.9]);

  return (
    <section
      id="hero"
      ref={ref}
      className="relative min-h-[160vh] sm:min-h-[180vh] flex flex-col items-center pt-24 sm:pt-32 pb-20 overflow-visible"
      onMouseMove={handleMouseMove}
    >
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/5 blur-[100px] rounded-full" />
      </div>

      {/* 1. Top Content (H1 & Sub) */}
      <motion.div
        className="relative max-w-5xl text-center z-10 px-5"
        style={{ opacity, scale }}
      >
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-[10px] sm:text-xs uppercase tracking-[0.4em] text-primary/70 mb-6 font-semibold"
        >
          {content.hero.eyebrow}
        </motion.p>

        <TextReveal
          text={content.hero.h1}
          as="h1"
          className="text-4xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-foreground leading-[1] tracking-tighter mb-8"
          heroMode
        />

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-base sm:text-xl md:text-2xl text-muted-foreground/80 max-w-3xl mx-auto leading-relaxed font-light"
        >
          {content.hero.sub}
        </motion.p>
      </motion.div>

      {/* 2. Phone Animation (Centerpiece) */}
      <div className="w-full relative z-20 mt-12 sm:mt-24">
        <PhoneAnimation />
      </div>

      {/* 3. Bottom Content (Tagline & CTA) */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-30 flex flex-col items-center gap-10 sm:gap-14 mt-12 sm:mt-20 px-6 text-center"
      >
        <div className="space-y-4">
          <h3 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            {content.hero.tagline || "Engineering what the Algorithm demands"}
          </h3>
          <p className="text-xs sm:text-sm uppercase tracking-[0.3em] text-primary/60 font-medium">
            Neural Content Architecture
          </p>
        </div>

        <motion.a
          href="#contact"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex bg-primary text-primary-foreground font-bold px-10 sm:px-16 py-4 sm:py-6 rounded-full transition-all text-base sm:text-xl shadow-2xl shadow-primary/30 cta-glow items-center gap-3"
        >
          {content.hero.cta}
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </motion.a>
      </motion.div>

      {/* Neural Particles */}
      <div className="absolute inset-0 pointer-events-none z-10" aria-hidden="true">
        {[...Array(6)].map((_, i) => (
          <DNANode
            key={i}
            i={i}
            scrollYProgress={scrollYProgress}
            mouseX={mouseX}
            mouseY={mouseY}
          />
        ))}
      </div>
    </section>
  );
}
