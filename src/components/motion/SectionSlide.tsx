import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

type Props = {
    children: React.ReactNode;
    className?: string;
    index?: number;
};

export default function SectionSlide({ children, className = "", index = 0 }: Props) {
    const isMobile = useIsMobile();
    const ref = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "start start"],
    });

    const scale = useTransform(scrollYProgress, [0, 1], [0.97, 1]);
    const y = useTransform(scrollYProgress, [0, 1], [32, 0]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 1], [0, 0.95, 1]);

    if (isMobile) {
        // On mobile: NO opacity/transform animation at all.
        // Each section's internal whileInView elements handle their own entrance.
        // This guarantees sections are never invisible.
        return (
            <div
                className={`relative ${className}`}
                style={{ zIndex: index + 1 }}
            >
                {children}
            </div>
        );
    }

    // Desktop: full scroll-driven parallax entrance
    return (
        <motion.div
            ref={ref}
            className={`relative ${className}`}
            style={{
                scale,
                y,
                opacity,
                zIndex: index + 1,
                transformOrigin: "center top",
            }}
        >
            {children}
        </motion.div>
    );
}
