import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const orbs = [
  { top: "15%", left: "5%", size: 500, speed: [0, -120], opacity: 0.06 },
  { top: "40%", right: "3%", size: 400, speed: [0, -200], opacity: 0.05 },
  { top: "65%", left: "15%", size: 350, speed: [0, -150], opacity: 0.04 },
  { top: "85%", right: "10%", size: 450, speed: [0, -250], opacity: 0.05 },
];

export default function ParallaxOrbs() {
  const { scrollYProgress } = useScroll();

  return (
    <div className="fixed inset-0 pointer-events-none z-0" aria-hidden="true">
      {orbs.map((orb, i) => {
        const y = useTransform(scrollYProgress, [0, 1], orb.speed as [number, number]);
        // Color interpolation between primary red and warm orange
        const hue = useTransform(scrollYProgress, [0, 0.5, 1], [4, 25, 4]);

        return (
          <motion.div
            key={i}
            className="absolute rounded-full blur-[120px] morph-blob"
            style={{
              top: orb.top,
              left: orb.left,
              right: (orb as any).right,
              width: orb.size,
              height: orb.size,
              opacity: orb.opacity,
              y,
              backgroundColor: useTransform(hue, (h) => `hsl(${h} 72% 54%)`),
              animationDelay: `${i * -4}s`,
            }}
          />
        );
      })}
    </div>
  );
}
