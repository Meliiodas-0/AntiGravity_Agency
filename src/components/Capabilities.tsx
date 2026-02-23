import { content } from "@/content/content";
import { motion, useMotionValue, useSpring } from "framer-motion";
import ScrollReveal from "./motion/ScrollReveal";
import { useIsMobile } from "@/hooks/use-mobile";
import { useRef, MouseEvent } from "react";

const icons = ["⚡", "🎬", "📈", "👤", "🌐", "🎪"];

function TiltCard({ children, className, idx }: { children: React.ReactNode; className: string; idx: number }) {
  const isMobile = useIsMobile();
  const ref = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 200, damping: 20 });
  const springY = useSpring(rotateY, { stiffness: 200, damping: 20 });

  const handleMouse = (e: MouseEvent<HTMLDivElement>) => {
    if (isMobile || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const midX = rect.width / 2;
    const midY = rect.height / 2;
    rotateX.set((y - midY) / midY * -6);
    rotateY.set((x - midX) / midX * 6);
  };

  const handleLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, scale: 0.95, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      viewport={{ once: true, margin: isMobile ? "-30px" : "-80px" }}
      transition={{ duration: 0.6, delay: isMobile ? idx * 0.08 : idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
      style={{
        rotateX: springX,
        rotateY: springY,
        transformPerspective: 800,
      }}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function Capabilities() {
  const items = content.capabilities.items;

  return (
    <section id="capabilities" className="relative scroll-mt-24 py-20 sm:py-24 md:py-32 px-5 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal className="mb-14 md:mb-20" scale>
          <p className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-primary/70 mb-3 sm:mb-4 font-medium">Services</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
            {content.capabilities.title}
          </h2>
        </ScrollReveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
          {items.map((cap, idx) => (
            <TiltCard
              key={cap.title}
              idx={idx}
              className="group rounded-xl glass-card gradient-border p-6 sm:p-7 md:p-8"
            >
              <div className="flex items-start gap-4">
                <span className="text-2xl sm:text-3xl shrink-0 mt-0.5 select-none" aria-hidden="true">{icons[idx]}</span>
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-1.5 sm:mb-2 group-hover:text-primary transition-colors">
                    {cap.title}
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{cap.description}</p>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
