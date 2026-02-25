import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, MotionValue } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

// 10 particles spread across the full page height
// Slightly staggered left position to avoid a perfectly straight line
const PARTICLES = [
    { topPct: 5, size: 3, xOff: 22, speed: 0.6 },
    { topPct: 14, size: 2, xOff: 14, speed: 0.4 },
    { topPct: 23, size: 4, xOff: 24, speed: 0.8 },
    { topPct: 33, size: 2, xOff: 18, speed: 0.5 },
    { topPct: 43, size: 3, xOff: 26, speed: 0.9 },
    { topPct: 53, size: 2, xOff: 12, speed: 0.7 },
    { topPct: 63, size: 3, xOff: 22, speed: 0.6 },
    { topPct: 72, size: 2, xOff: 16, speed: 0.4 },
    { topPct: 82, size: 4, xOff: 24, speed: 0.8 },
    { topPct: 91, size: 2, xOff: 18, speed: 0.5 },
];

function Particle({
    p,
    smoothProgress,
    index,
}: {
    p: (typeof PARTICLES)[0];
    smoothProgress: MotionValue<number>;
    index: number;
}) {
    // Vertical parallax: particles drift at individual speeds as you scroll
    const yPx = useTransform(
        smoothProgress,
        [0, 1],
        [0, (p.topPct / 100 - 0.5) * 200 * p.speed]
    );

    // Brightness: particle glows more when scroll is near its "zone" on the page
    // BUT it is always visible at a base opacity of 0.22
    const zone = p.topPct / 100;
    const glow = useTransform(
        smoothProgress,
        [
            Math.max(0, zone - 0.35),
            Math.max(0, zone - 0.1),
            zone,
            Math.min(1, zone + 0.1),
            Math.min(1, zone + 0.35),
        ],
        [0, 0.32, 0.72, 0.32, 0]
    );

    // Base opacity constant + scroll-reactive glow layer handled via boxShadow intensity
    const shadowBlur = useTransform(glow, (g) => `0 0 ${4 + g * 20}px hsl(4 72% 54% / ${0.5 + g * 0.5})`);

    return (
        <motion.div
            style={{
                position: "absolute",
                top: `${p.topPct}%`,
                right: p.xOff,
                width: p.size,
                height: p.size,
                borderRadius: "50%",
                background: "hsl(4 72% 56%)",
                boxShadow: shadowBlur,
                y: yPx,
                // Always visible at 0.22 — scroll makes it brighter, never invisible
                opacity: useTransform(glow, (g) => 0.22 + g * 0.55),
            }}
            // Slow ambient pulse
            animate={{ scale: [1, 1.25, 1] }}
            transition={{
                duration: 4 + (index % 3),
                repeat: Infinity,
                ease: "easeInOut",
                delay: index * 0.38,
            }}
        />
    );
}

// Thin right-edge guide line that fills in as you scroll
function GuideRail({ smoothProgress }: { smoothProgress: MotionValue<number> }) {
    const scaleY = useTransform(smoothProgress, [0, 1], [0, 1]);
    const opacity = useTransform(smoothProgress, [0, 0.04, 0.96, 1], [0, 0.1, 0.1, 0]);

    return (
        <motion.div
            style={{
                position: "absolute",
                top: 0,
                right: 28,
                width: 1,
                height: "100%",
                scaleY,
                transformOrigin: "top",
                background:
                    "linear-gradient(to bottom, transparent 0%, hsl(4 72% 54% / 0.22) 15%, hsl(4 72% 54% / 0.22) 85%, transparent 100%)",
                opacity,
            }}
        />
    );
}

export default function RightEdgeParticles() {
    const isMobile = useIsMobile();
    const ref = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll();
    const smoothProgress = useSpring(scrollYProgress, { stiffness: 55, damping: 28 });

    if (isMobile) return null;

    return (
        // Show on lg+ (≥1024px) where right-edge space exists
        <div
            ref={ref}
            className="fixed top-0 right-0 h-screen w-14 pointer-events-none z-40 hidden lg:block"
            aria-hidden="true"
        >
            <GuideRail smoothProgress={smoothProgress} />
            {PARTICLES.map((p, i) => (
                <Particle key={i} p={p} smoothProgress={smoothProgress} index={i} />
            ))}
        </div>
    );
}
