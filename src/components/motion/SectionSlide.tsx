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

    const scale = useTransform(scrollYProgress, [0, 1], [0.92, 1]);
    const y = useTransform(scrollYProgress, [0, 1], [60, 0]);
    const opacity = useTransform(scrollYProgress, [0, 0.3, 1], [0.4, 0.8, 1]);
    const borderRadius = useTransform(scrollYProgress, [0, 1], [24, 0]);

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
                borderRadius,
                zIndex: index + 1,
                transformOrigin: "center top",
            }}
        >
            {children}
        </motion.div>
    );
}
