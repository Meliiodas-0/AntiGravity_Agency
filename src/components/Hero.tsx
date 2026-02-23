import { content } from "@/content/content";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import TextReveal from "./motion/TextReveal";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const subY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const ctaY = useTransform(scrollYProgress, [0, 1], [0, -20]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.8], [1, 0.95]);
  const blur = useTransform(scrollYProgress, [0.4, 0.8], [0, 8]);
  const filterStr = useTransform(blur, (v) => `blur(${v}px)`);

  return (
    <section id="hero" ref={ref} className="relative min-h-[90vh] sm:min-h-screen flex flex-col items-center justify-center px-5 sm:px-6 pt-14">
      {/* Layered atmospheric background */}
      <div className="absolute inset-0 -bottom-32 pointer-events-none" aria-hidden="true">
        <div className="absolute -top-[20%] -right-[10%] w-[700px] h-[700px] rounded-full bg-primary/8 blur-[140px]" />
        <div className="absolute -bottom-[15%] -left-[10%] w-[500px] h-[500px] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/4 blur-[160px] animate-[pulse-glow_6s_ease-in-out_infinite]" />
        {/* Grid overlay */}
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
      </div>

      <motion.div
        className="relative max-w-4xl text-center"
        style={{ opacity, scale, filter: filterStr }}
      >
        <motion.p
          initial={{ opacity: 0, y: 15, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-primary/80 mb-5 sm:mb-6 font-medium"
        >
          {content.hero.eyebrow}
        </motion.p>

        {/* Word-by-word scroll text reveal */}
        <TextReveal
          text={content.hero.h1}
          as="h1"
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-foreground leading-[1.05] mb-6 sm:mb-8"
          blurIn
          heroMode
        />

        <motion.p
          initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          style={{ y: subY }}
          className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 sm:mb-14 leading-relaxed"
        >
          {content.hero.sub}
        </motion.p>
        <motion.a
          initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
          style={{ y: ctaY }}
          href="#contact"
          className="inline-block bg-primary text-primary-foreground font-semibold px-10 sm:px-12 py-4 sm:py-5 rounded-lg hover:brightness-110 hover:scale-105 active:scale-[0.97] transition-all text-base sm:text-lg shadow-lg shadow-primary/20 cta-glow"
        >
          {content.hero.cta}
        </motion.a>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute bottom-8 sm:bottom-10 flex flex-col items-center text-muted-foreground text-xs uppercase tracking-widest"
      >
        <span>Scroll</span>
        <svg className="w-4 h-4 mt-1 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </motion.div>
    </section>
  );
}
