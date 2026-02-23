import { motion } from "framer-motion";
import { ReactNode } from "react";

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
  const initial: Record<string, number | string> = { opacity: 0 };
  const animate: Record<string, number | string> = { opacity: 1 };

  if (direction === "up") {
    initial.y = y;
    animate.y = 0;
  } else if (direction === "left") {
    initial.x = -40;
    animate.x = 0;
  } else if (direction === "right") {
    initial.x = 40;
    animate.x = 0;
  }

  if (blur) {
    initial.filter = "blur(6px)";
    animate.filter = "blur(0px)";
  }

  if (scale) {
    initial.scale = 0.92;
    animate.scale = 1;
  }

  return (
    <motion.div
      initial={initial}
      whileInView={animate}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
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
  hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
} as const;
