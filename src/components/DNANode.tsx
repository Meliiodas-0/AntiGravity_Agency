import { motion, useTransform, MotionValue } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

type Props = {
    i: number;
    scrollYProgress: MotionValue<number>;
    mouseX: MotionValue<number>;
    mouseY: MotionValue<number>;
};

export default function DNANode({ i, scrollYProgress, mouseX, mouseY }: Props) {
    const isMobile = useIsMobile();
    const isVisible = isMobile ? i < 12 : true;

    const isStrandB = i % 2 === 0;
    const phase = (i / (isMobile ? 6 : 15)) * Math.PI * 2;
    const initialX = isStrandB ? 25 : 65;

    // Node position transforms
    const leftNodeBase = useTransform(scrollYProgress, [0, 1], [
        initialX + (isStrandB ? Math.sin(phase) * 12 : Math.cos(phase) * 12),
        50 + (isStrandB ? Math.sin(phase + 5) * 8 : Math.cos(phase + 5) * 8),
    ]);

    const topNodeBase = useTransform(scrollYProgress, [0, 1], [
        20 + (i * 2.5),
        100 + (i * 6)
    ]);

    const leftNodePos = useTransform(leftNodeBase, (v) => `${v}%`);
    const topNodePos = useTransform(topNodeBase, (v) => `${v}%`);

    const mouseDisplacementX = useTransform(mouseX, [0, 1], [isMobile ? -10 : -30, isMobile ? 10 : 30]);
    const mouseDisplacementY = useTransform(mouseY, [0, 1], [isMobile ? -10 : -30, isMobile ? 10 : 30]);

    const opacityNode = useTransform(scrollYProgress, [0, 0.1, 0.8, 1], [0, 0.8, 0.8, 0]);
    const scaleNode = useTransform(scrollYProgress, [0, 0.5], [1, 1.3]);

    // Path transforms
    const leftPathBase = useTransform(scrollYProgress, [0, 1], [
        25 + Math.sin(phase) * 12,
        50 + Math.sin(phase + 5) * 8,
    ]);

    const strandWidth = Math.abs(65 + Math.cos(phase) * 12 - (25 + Math.sin(phase) * 12));
    const widthPathBase = useTransform(scrollYProgress, [0, 1], [
        strandWidth,
        4
    ]);

    const topPathBase = useTransform(scrollYProgress, [0, 1], [
        20 + (i * 2.5) + 0.15,
        100 + (i * 6) + 0.15
    ]);

    const leftPathPos = useTransform(leftPathBase, (v) => `${v}%`);
    const widthPathStr = useTransform(widthPathBase, (v) => `${v}%`);
    const topPathPos = useTransform(topPathBase, (v) => `${v}%`);

    const opacityPath = useTransform(scrollYProgress, [0, 0.1, 0.5, 1], [0, 0.5, 0.5, 0]);
    const rotatePath = useTransform(scrollYProgress, [0, 1], [0, 35]);

    if (!isVisible) return null;

    return (
        <>
            {/* Neural Node */}
            <motion.div
                style={{
                    position: 'absolute',
                    left: leftNodePos,
                    x: mouseDisplacementX,
                    y: mouseDisplacementY,
                    top: topNodePos,
                    width: i % 3 === 0 ? '6px' : '4px',
                    height: i % 3 === 0 ? '6px' : '4px',
                    backgroundColor: 'hsl(var(--primary))',
                    borderRadius: '50%',
                    boxShadow: `0 0 ${i % 3 === 0 ? '20px' : '10px'} hsl(var(--primary))`,
                    opacity: opacityNode,
                    scale: scaleNode,
                    zIndex: 30
                }}
                animate={{
                    opacity: [0.4, 1, 0.4],
                    scale: [1, 1.2, 1]
                }}
                transition={{
                    duration: 3 + (i % 5) * 0.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: (i % 10) * 0.2
                }}
            />

            {/* Neural Path (Connecting strand) */}
            {!isStrandB && (
                <motion.div
                    style={{
                        position: 'absolute',
                        left: leftPathPos,
                        x: mouseDisplacementX,
                        y: mouseDisplacementY,
                        width: widthPathStr,
                        top: topPathPos,
                        height: '2px',
                        background: 'linear-gradient(90deg, transparent, hsl(var(--primary)/0.4), transparent)',
                        opacity: opacityPath,
                        transformOrigin: 'left center',
                        rotate: rotatePath
                    }}
                />
            )}
        </>
    );
}
