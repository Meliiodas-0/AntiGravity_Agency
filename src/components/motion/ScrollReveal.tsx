import { motion } from "framer-motion";
import { ReactNode } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  blur?: boolean;
  scale?: boolean;
  direction?: "up" | "left" | "right";
};

export default function ScrollReveal({
  children,
  className,
  delay = 0,
  y = 30,
  blur = true,
  scale = false,
  direction = "up",
}: Props) {
  const isMobile = useIsMobile();

  // Simpler animations on mobile — no blur filter (GPU expensive)
  const mobileBlur = false;
  const useBlur = isMobile ? mobileBlur : blur;
  const moveDistance = isMobile ? Math.min(y, 20) : y;

  const initial: Record<string, number | string> = { opacity: 0 };
  const animate: Record<string, number | string> = { opacity: 1 };

  if (direction === "up") {
    initial.y = moveDistance;
    animate.y = 0;
  } else if (direction === "left") {
    initial.x = isMobile ? -20 : -40;
    animate.x = 0;
  } else if (direction === "right") {
    initial.x = isMobile ? 20 : 40;
    animate.x = 0;
  }

  if (useBlur) {
    initial.filter = "blur(6px)";
    animate.filter = "blur(0px)";
  }

  if (scale) {
    initial.scale = isMobile ? 0.96 : 0.92;
    animate.scale = 1;
  }

  return (
    <motion.div
      initial={initial}
      whileInView={animate}
      viewport={{ once: true, margin: isMobile ? "-30px" : "-80px" }}
      transition={{ duration: isMobile ? 0.5 : 0.7, ease: [0.22, 1, 0.36, 1], delay: isMobile ? delay * 0.6 : delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerChildren({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.08 } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
} as const;
