import { content } from "@/content/content";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import ScrollReveal from "./motion/ScrollReveal";
import { useIsMobile } from "@/hooks/use-mobile";
import { useRef, MouseEvent } from "react";

const icons = ["⚡", "🎬", "📈", "👤", "🌐", "🎪"];

function TiltCard({ children, className, idx }: { children: React.ReactNode; className: string; idx: number }) {
  const isMobile = useIsMobile();
  const ref = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springValue = { stiffness: 150, damping: 20 };
  const springX = useSpring(rotateX, springValue);
  const springY = useSpring(rotateY, springValue);

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    if (isMobile || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    rotateX.set((e.clientY - centerY) / 20);
    rotateY.set((e.clientX - centerX) / -20);
  }

  function handleMouseLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: isMobile ? 0 : springX,
        rotateY: isMobile ? 0 : springY,
        transformStyle: "preserve-3d",
      }}
      className={className}
    >
      <div style={{ transform: isMobile ? "none" : "translateZ(30px)" }}>
        {children}
      </div>
    </motion.div>
  );
}

export default function Capabilities() {
  const isMobile = useIsMobile();

  return (
    <section id="capabilities" className="py-24 sm:py-32 px-5 sm:px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal className="text-center mb-16 sm:mb-20">
          <h2 className="text-3xl sm:text-5xl font-bold mb-6">{content.capabilities.h2}</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Our comprehensive digital suite ensures every aspect of your brand is handled with excellence.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {content.capabilities.items.map((item, i) => (
            <ScrollReveal key={i} delay={i * 0.1} scale blur={!isMobile}>
              <TiltCard
                idx={i}
                className="glass-card p-8 sm:p-10 rounded-2xl border border-white/5 relative overflow-hidden group h-full gradient-border glow-hover"
              >
                <div className="text-4xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  {icons[i % icons.length]}
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-4">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {item.desc}
                </p>
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  <span className="text-6xl font-black">{i + 1}</span>
                </div>
              </TiltCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
