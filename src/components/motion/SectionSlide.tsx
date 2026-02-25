import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

type Props = {
    children: React.ReactNode;
    className?: string;
    index?: number;
};

export default function SectionSlide({ children, className = "", index = 0 }: Props) {
    const isMobile = useIsMobile();
    const ref = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    // On mobile: use IntersectionObserver for reliable visibility detection
    // (Framer's useScroll with target ref can miss events on real touch devices)
    useEffect(() => {
        if (!isMobile) return;
        const el = ref.current;
        if (!el) return;
        const obs = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
            { threshold: 0.05 }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, [isMobile]);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "start start"],
    });

    const scale = useTransform(scrollYProgress, [0, 1], [0.97, 1]);
    const y = useTransform(scrollYProgress, [0, 1], [32, 0]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 1], [0, 0.95, 1]);

    if (isMobile) {
        return (
            <motion.div
                ref={ref}
                className={`relative ${className}`}
                style={{ zIndex: index + 1 }}
                initial={{ opacity: 0, y: 24 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
                {children}
            </motion.div>
        );
    }

    // Desktop: full scroll-driven parallax
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
