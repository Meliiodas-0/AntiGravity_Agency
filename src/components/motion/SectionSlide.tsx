import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, ReactNode } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

type Props = {
    children: ReactNode;
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

    // Tighter scale range (0.97→1) so there's no visible dark gap around the edges
    const scale = useTransform(scrollYProgress, [0, 1], [0.97, 1]);
    const y = useTransform(scrollYProgress, [0, 1], [40, 0]);
    const opacity = useTransform(scrollYProgress, [0, 0.25, 1], [0, 0.9, 1]);
    // Remove borderRadius — it was creating the visible dark rounded blob
    // because the section's background colour showed through the rounded corners

    if (isMobile) {
        return <div className={className}>{children}</div>;
    }

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
                // No borderRadius here — avoids the dark card artifact
            }}
        >
            {children}
        </motion.div>
    );
}
