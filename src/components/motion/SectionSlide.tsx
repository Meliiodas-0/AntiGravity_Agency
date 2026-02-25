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
        // On real phones, use whileInView — it uses IntersectionObserver internally
        // and is rock-solid on touch devices. once:true means it never hides again.
        return (
            <motion.div
                className={`relative ${className}`}
                style={{ zIndex: index + 1 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.05 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
                {children}
            </motion.div>
        );
    }

    // Desktop: scroll-driven parallax with useScroll
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
