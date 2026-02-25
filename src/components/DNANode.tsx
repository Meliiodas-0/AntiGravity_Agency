import { motion, useTransform, MotionValue } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

type Props = {
    i: number;
    scrollYProgress: MotionValue<number>;
    mouseX: MotionValue<number>;
    mouseY: MotionValue<number>;
};

// Fixed edge positions — never overlapping the center headline text
const EDGE_POSITIONS = [
    { baseX: 4, baseY: 15 }, { baseX: 6, baseY: 40 }, { baseX: 3, baseY: 70 },
    { baseX: 94, baseY: 20 }, { baseX: 96, baseY: 55 }, { baseX: 92, baseY: 80 },
    { baseX: 20, baseY: 5 }, { baseX: 80, baseY: 8 },
    { baseX: 15, baseY: 88 }, { baseX: 85, baseY: 90 },
];

export default function DNANode({ i, scrollYProgress, mouseX, mouseY }: Props) {
    const isMobile = useIsMobile();
    const pos = EDGE_POSITIONS[i % EDGE_POSITIONS.length];

    // All hooks always called — gating done via conditional render at the bottom
    const mouseDisplacementX = useTransform(mouseX, [0, 1], [-12, 12]);
    const mouseDisplacementY = useTransform(mouseY, [0, 1], [-12, 12]);
    const opacityNode = useTransform(scrollYProgress, [0, 0.05, 0.6, 0.85], [0, 0.3, 0.3, 0]);

    // Conditionally skip rendering on mobile for higher-index nodes
    if (isMobile && i >= 4) return null;

    const size = i % 3 === 0 ? 5 : 3;

    return (
        <motion.div
            style={{
                position: 'absolute',
                left: `${pos.baseX}%`,
                top: `${pos.baseY}%`,
                x: mouseDisplacementX,
                y: mouseDisplacementY,
                width: `${size}px`,
                height: `${size}px`,
                backgroundColor: '#0d0d0d',
                borderRadius: '50%',
                boxShadow: `0 0 ${size * 4}px rgba(0, 0, 0, 0.15)`,
                opacity: opacityNode,
                zIndex: 5,
            }}
            animate={{
                opacity: [0.15, 0.35, 0.15],
                scale: [1, 1.15, 1],
            }}
            transition={{
                duration: 6 + (i % 4) * 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: (i % 5) * 1.2,
            }}
        />
    );
}
