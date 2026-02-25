import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, ReactNode } from "react";

type Props = {
    children: ReactNode;
    className?: string;
    index?: number;
};

export default function SectionSlide({ children, className = "", index = 0 }: Props) {
    const ref = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "start start"],
    });

    // Subtle entrance on ALL screen sizes — mobile gets a lighter version
    const scale = useTransform(scrollYProgress, [0, 1], [0.97, 1]);
    const y = useTransform(scrollYProgress, [0, 1], [32, 0]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 1], [0, 0.95, 1]);

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
