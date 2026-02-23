import { content } from "@/content/content";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import TextReveal from "./motion/TextReveal";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const isMobile = useIsMobile();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const subY = useTransform(scrollYProgress, [0, 1], [0, isMobile ? -15 : -40]);
  const ctaY = useTransform(scrollYProgress, [0, 1], [0, isMobile ? -8 : -20]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.8], [1, isMobile ? 1 : 0.95]);
  const blur = useTransform(scrollYProgress, [0.4, 0.8], [0, isMobile ? 0 : 8]);
  const filterStr = useTransform(blur, (v) => v > 0 ? `blur(${v}px)` : "none");

  return (
    <section id="hero" ref={ref} className="relative min-h-[85vh] sm:min-h-screen flex flex-col items-center justify-center px-5 sm:px-6 pt-14">
      {/* Layered atmospheric background — simplified on mobile */}
      <div className="absolute inset-0 -bottom-32 pointer-events-none" aria-hidden="true">
        <div className="absolute -top-[20%] -right-[10%] w-[350px] sm:w-[700px] h-[350px] sm:h-[700px] rounded-full bg-primary/8 blur-[80px] sm:blur-[140px]" />
        <div className="absolute -bottom-[15%] -left-[10%] w-[250px] sm:w-[500px] h-[250px] sm:h-[500px] rounded-full bg-primary/5 blur-[60px] sm:blur-[120px]" />
        {!isMobile && (
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/4 blur-[160px] animate-[pulse-glow_6s_ease-in-out_infinite]" />
        )}
        {/* Grid overlay — desktop only */}
        {!isMobile && (
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
              backgroundSize: "80px 80px",
              maskImage: "linear-gradient(to bottom, black 40%, transparent 85%)",
              WebkitMaskImage: "linear-gradient(to bottom, black 40%, transparent 85%)",
            }}
          />
        )}
      </div>

      <motion.div
        className="relative max-w-4xl text-center"
        style={{ opacity, scale, filter: filterStr }}
      >
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-primary/80 mb-4 sm:mb-6 font-medium"
        >
          {content.hero.eyebrow}
        </motion.p>

        <TextReveal
          text={content.hero.h1}
          as="h1"
          className="text-[2.2rem] leading-[1.1] sm:text-6xl md:text-7xl lg:text-8xl font-bold text-foreground sm:leading-[1.05] mb-5 sm:mb-8"
          blurIn={!isMobile}
          heroMode
        />

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          style={{ y: subY }}
          className="text-sm sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 sm:mb-14 leading-relaxed px-2"
        >
          {content.hero.sub}
        </motion.p>
        <motion.a
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          style={{ y: ctaY }}
          href="#contact"
          className="inline-block bg-primary text-primary-foreground font-semibold px-8 sm:px-12 py-3.5 sm:py-5 rounded-lg hover:brightness-110 sm:hover:scale-105 active:scale-[0.97] transition-all text-sm sm:text-lg shadow-lg shadow-primary/20 cta-glow"
        >
          {content.hero.cta}
        </motion.a>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="absolute bottom-6 sm:bottom-10 flex flex-col items-center text-muted-foreground text-xs uppercase tracking-widest"
      >
        <span>Scroll</span>
        <svg className="w-4 h-4 mt-1 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </motion.div>

      {/* Transition Particles — Seed for DNA helix */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {[...Array(isMobile ? 8 : 15)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            style={{
              position: 'absolute',
              left: `${15 + (i * 70 / 15)}%`,
              top: `${40 + (i * 30 / 15)}%`,
              width: i % 2 === 0 ? '4px' : '2px',
              height: i % 2 === 0 ? '4px' : '2px',
              backgroundColor: 'hsl(var(--primary))',
              borderRadius: '50%',
              boxShadow: '0 0 10px hsl(var(--primary))',
              opacity: useTransform(scrollYProgress, [0.1, 0.4, 0.9], [0, 0.6, 0]),
              y: useTransform(scrollYProgress, [0, 1], [0, 300 + (i * 50)]),
              scale: useTransform(scrollYProgress, [0, 0.5], [1, 1.5]),
            }}
          />
        ))}
      </div>
    </section>
  );
}
