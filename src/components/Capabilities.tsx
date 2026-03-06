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
    <section id="capabilities" className="py-8 sm:py-16 px-5 sm:px-6 relative overflow-visible">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal className="text-center mb-10 sm:mb-12">
          <p className="text-[10px] sm:text-xs uppercase tracking-[0.34em] text-primary/60 mb-4 font-semibold">Expertise</p>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-6 tracking-tight text-foreground">{content.capabilities.title}</h2>
          <p className="text-muted-foreground/80 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed font-light">
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
                  className="group relative h-full bg-white/40 backdrop-blur-md border border-black/[0.06] p-8 sm:p-10 rounded-3xl transition-all duration-700 hover:bg-white hover:shadow-2xl hover:shadow-primary/10 select-none cursor-default"
                >
                  <div className="w-14 h-14 rounded-2xl bg-black/5 flex items-center justify-center mb-10 group-hover:bg-primary group-hover:scale-110 group-hover:rotate-6 transition-all duration-700">
                    <IconComponent className="w-6 h-6 text-black group-hover:text-white transition-colors duration-700" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-5 tracking-tight text-black group-hover:text-primary transition-colors duration-500">{item.title}</h3>
                  <p className="text-muted-foreground text-sm sm:text-base leading-relaxed font-light group-hover:text-foreground transition-colors duration-500">
                    {item.description}
                  </p>

                  {/* Subtle index number */}
                  <div className="absolute top-10 right-10 text-black/10 font-mono text-5xl tracking-tighter transition-all duration-700 group-hover:text-primary/20 group-hover:scale-110">
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
