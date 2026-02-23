import { motion, useScroll, useTransform } from "framer-motion";

const orbs = [
  { top: "10%", left: "3%", size: 550, speed: [0, -150], opacity: 0.07, delay: 0 },
  { top: "35%", right: "2%", size: 450, speed: [0, -220], opacity: 0.06, delay: -5 },
  { top: "55%", left: "12%", size: 380, speed: [0, -180], opacity: 0.05, delay: -8 },
  { top: "75%", right: "8%", size: 480, speed: [0, -280], opacity: 0.06, delay: -12 },
  { top: "90%", left: "40%", size: 350, speed: [0, -200], opacity: 0.04, delay: -3 },
];

export default function ParallaxOrbs() {
  const { scrollYProgress } = useScroll();

  return (
    <div className="fixed inset-0 pointer-events-none z-0" aria-hidden="true">
      {orbs.map((orb, i) => {
        const y = useTransform(scrollYProgress, [0, 1], orb.speed as [number, number]);
        const hue = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], [4, 15, 25, 4]);
        const orbScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1.15, 0.9]);

        return (
          <motion.div
            key={i}
            className="absolute rounded-full blur-[140px] morph-blob"
            style={{
              top: orb.top,
              left: orb.left,
              right: (orb as any).right,
              width: orb.size,
              height: orb.size,
              opacity: orb.opacity,
              y,
              scale: orbScale,
              backgroundColor: useTransform(hue, (h) => `hsl(${h} 75% 55%)`),
              animationDelay: `${orb.delay}s`,
            }}
          />
        );
      })}
    </div>
  );
}
