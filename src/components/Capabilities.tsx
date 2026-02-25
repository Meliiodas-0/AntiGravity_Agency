import { content } from "@/content/content";
import { motion, useMotionValue, useSpring } from "framer-motion";
import ScrollReveal from "./motion/ScrollReveal";
import { useIsMobile } from "@/hooks/use-mobile";
import { useRef, MouseEvent } from "react";
import {
  Zap,
  Video,
  BarChart3,
  UserCircle,
  Globe,
  Ticket
} from "lucide-react";

const icons = [
  Zap,
  Video,
  BarChart3,
  UserCircle,
  Globe,
  Ticket
];

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
    <section id="capabilities" className="py-24 sm:py-32 px-5 sm:px-6 relative overflow-hidden bg-background/50">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal className="text-center mb-16 sm:mb-24">
          <p className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-primary/70 mb-4 font-medium">Expertise</p>
          <h2 className="text-3xl sm:text-5xl font-bold mb-6 tracking-tight">{content.capabilities.title}</h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Our comprehensive digital suite ensures every aspect of your brand is handled with absolute precision and creative excellence.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
          {content.capabilities.items.map((item, i) => {
            const IconComponent = icons[i % icons.length];
            return (
              <ScrollReveal key={i} delay={i * 0.1} scale blur={!isMobile}>
                <TiltCard
                  idx={i}
                  className="bg-[#0b0b0b] p-8 sm:p-10 rounded-2xl border border-white/5 relative overflow-hidden group h-full glow-hover transition-all duration-500"
                >
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-8 group-hover:bg-white/10 group-hover:scale-110 transition-all duration-500">
                    <IconComponent className="w-6 h-6 text-white group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-4 tracking-tight text-white group-hover:text-primary transition-colors duration-300">{item.title}</h3>
                  <p className="text-white/60 text-sm sm:text-base leading-relaxed font-light">
                    {item.description}
                  </p>
                  {/* Subtle index number instead of giant one */}
                  <div className="absolute bottom-6 right-8 text-white/5 font-mono text-sm tracking-tighter select-none">
                    0{i + 1}
                  </div>
                </TiltCard>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
