import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  itemCount: number;
  className?: string;
};

export default function HorizontalScroll({ children, itemCount, className = "" }: Props) {
  const isMobile = useIsMobile();
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", `-${itemCount * 20}%`]);

  if (isMobile) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div ref={containerRef} style={{ height: `${itemCount * 50}vh` }} className="relative">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <motion.div
          style={{ x }}
          className="flex gap-6 md:gap-8 pl-[10vw] pr-[30vw] will-change-transform"
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}
