import { motion, useScroll, useTransform } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

const orbsDesktop = [
  { top: "10%", left: "3%", size: 550, speed: [0, -150] as [number, number], opacity: 0.07, delay: 0 },
  { top: "35%", right: "2%", size: 450, speed: [0, -220] as [number, number], opacity: 0.06, delay: -5 },
  { top: "55%", left: "12%", size: 380, speed: [0, -180] as [number, number], opacity: 0.05, delay: -8 },
  { top: "75%", right: "8%", size: 480, speed: [0, -280] as [number, number], opacity: 0.06, delay: -12 },
  { top: "90%", left: "40%", size: 350, speed: [0, -200] as [number, number], opacity: 0.04, delay: -3 },
];

// Fewer + smaller orbs on mobile to reduce GPU load
const orbsMobile = [
  { top: "5%", left: "5%", size: 250, speed: [0, -60] as [number, number], opacity: 0.06, delay: 0 },
  { top: "50%", right: "5%", size: 200, speed: [0, -80] as [number, number], opacity: 0.05, delay: -3 },
];

function Orb({ orb, scrollYProgress, isMobile }: {
  orb: typeof orbsDesktop[0];
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
  isMobile: boolean;
}) {
  const y = useTransform(scrollYProgress, [0, 1], orb.speed);
  const hue = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], [4, 15, 25, 4]);
  const orbScale = useTransform(scrollYProgress, [0, 0.5, 1], isMobile ? [1, 1, 1] : [0.9, 1.15, 0.9]);
  const bgColor = useTransform(hue, (h) => `hsl(${h} 75% 55%)`);

  return (
    <motion.div
      className={`absolute rounded-full ${isMobile ? "blur-[80px]" : "blur-[140px] morph-blob"}`}
      style={{
        top: orb.top,
        left: (orb as Record<string, unknown>).left as string,
        right: (orb as Record<string, unknown>).right as string,
        width: orb.size,
        height: orb.size,
        opacity: orb.opacity,
        y,
        scale: orbScale,
        backgroundColor: bgColor,
        willChange: "transform",
        animationDelay: `${orb.delay}s`,
      }}
    />
  );
}

export default function ParallaxOrbs() {
  const { scrollYProgress } = useScroll();
  const isMobile = useIsMobile();

  if (isMobile) {
    // Single lightweight ambient glow on mobile — warm red top-right
    // blur-[100px] instead of 140px, no morph animation, very low opacity
    return (
      <div className="fixed inset-0 pointer-events-none z-0" aria-hidden="true">
        <div
          className="absolute rounded-full"
          style={{
            top: "5%", right: "-10%",
            width: 280, height: 280,
            background: "hsl(4 72% 54%)",
            opacity: 0.055,
            filter: "blur(90px)",
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            top: "55%", left: "-8%",
            width: 200, height: 200,
            background: "hsl(4 72% 54%)",
            opacity: 0.04,
            filter: "blur(80px)",
          }}
        />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-0" aria-hidden="true">
      {orbsDesktop.map((orb, i) => (
        <Orb key={i} orb={orb} scrollYProgress={scrollYProgress} isMobile={false} />
      ))}
    </div>
  );
}

