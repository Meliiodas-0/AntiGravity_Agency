import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

// 10 particles spread across the full page height
const PARTICLES = [
    { topPct: 6, size: 3, speed: 0.7, delay: 0 },
    { topPct: 14, size: 2, speed: 0.5, delay: 0.4 },
    { topPct: 24, size: 4, speed: 0.9, delay: 0.8 },
    { topPct: 35, size: 2, speed: 0.6, delay: 0.2 },
    { topPct: 46, size: 3, speed: 1.0, delay: 1.0 },
    { topPct: 56, size: 2, speed: 0.7, delay: 0.6 },
    { topPct: 66, size: 4, speed: 0.8, delay: 0.3 },
    { topPct: 75, size: 2, speed: 0.5, delay: 0.9 },
    { topPct: 85, size: 3, speed: 0.9, delay: 0.5 },
    { topPct: 93, size: 2, speed: 0.6, delay: 1.2 },
];

function Particle({
    particle,
    scrollProgress,
}: {
    particle: (typeof PARTICLES)[0];
    scrollProgress: ReturnType<typeof useSpring>;
}) {
    // Each particle has its own vertical parallax shift
    const shift = particle.topPct / 100; // 0–1 position on page

    // Vertical movement: particles near top drift down, near bottom drift up (parallax)
    const yPx = useTransform(
        scrollProgress,
        [0, 1],
        [0, (shift - 0.5) * 160 * particle.speed]
    );

    // Opacity: particle is brightest when scroll progress is near its "zone"
    const zone = shift;
    const opacityBase = useTransform(scrollProgress, [
        Math.max(0, zone - 0.4),
        Math.max(0, zone - 0.15),
        zone,
        Math.min(1, zone + 0.15),
        Math.min(1, zone + 0.4),
    ], [0.04, 0.25, 0.5, 0.25, 0.04]);

    const s = particle.size;

    return (
        <motion.div
            style={{
                position: "absolute",
                top: `${particle.topPct}%`,
                right: 12 + (s % 2) * 10, // alternate slightly inward
                width: s,
                height: s,
                borderRadius: "50%",
                background: "hsl(4 72% 54%)",
                boxShadow: `0 0 ${s * 4}px hsl(4 72% 54% / 0.7)`,
                y: yPx,
                opacity: opacityBase,
            }}
            // Ambient pulse independent of scroll
            animate={{
                scale: [1, 1.3, 1],
            }}
            transition={{
                duration: 3.5 + particle.delay,
                repeat: Infinity,
                ease: "easeInOut",
                delay: particle.delay,
            }}
        />
    );
}

// Thin vertical line that connects particles — grows with scroll
function ConnectionLine({ scrollProgress }: { scrollProgress: ReturnType<typeof useSpring> }) {
    const height = useTransform(scrollProgress, [0, 1], ["0%", "100%"]);
    const opacity = useTransform(scrollProgress, [0, 0.05, 0.95, 1], [0, 0.12, 0.12, 0]);

    return (
        <motion.div
            style={{
                position: "absolute",
                top: 0,
                right: 19,
                width: 1,
                height,
                background: "linear-gradient(to bottom, transparent, hsl(4 72% 54% / 0.18), transparent)",
                opacity,
            }}
        />
    );
}

export default function RightEdgeParticles() {
    const isMobile = useIsMobile();
    // Also hide on narrower viewports where there isn't empty right-edge space
    const wrapperRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll(); // whole-document scroll
    const smoothProgress = useSpring(scrollYProgress, { stiffness: 50, damping: 25 });

    // Hide on mobile / small screens — not enough safe space on right edge
    if (isMobile) return null;

    return (
        <div
            ref={wrapperRef}
            className="fixed top-0 right-0 h-screen w-10 pointer-events-none z-40 hidden xl:block"
            aria-hidden="true"
        >
            <ConnectionLine scrollProgress={smoothProgress} />
            {PARTICLES.map((p, i) => (
                <Particle key={i} particle={p} scrollProgress={smoothProgress} />
            ))}
        </div>
    );
}
