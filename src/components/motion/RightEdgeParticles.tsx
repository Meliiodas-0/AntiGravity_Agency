import { useEffect, useRef } from "react";
import { useScroll, useSpring } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

const STRIP_W = 52;
const CX = STRIP_W / 2;
const PARTICLE_COUNT = 38;  // dense cloud

// Seeded pseudo-random so layout is stable across renders
function seededRand(seed: number) {
    const x = Math.sin(seed + 1) * 10000;
    return x - Math.floor(x);
}

// Generate scattered particles once
const PARTICLES = Array.from({ length: PARTICLE_COUNT }, (_, i) => {
    const r1 = seededRand(i * 3);
    const r2 = seededRand(i * 3 + 1);
    const r3 = seededRand(i * 3 + 2);
    return {
        // Vertical position spread evenly across 38 particles with slight jitter
        baseFrac: (i / (PARTICLE_COUNT - 1)) + (r1 - 0.5) * 0.025,
        // Angle in degrees around the centre axis (initial spread for scattered look)
        initAngle: r2 * 360,
        // Orbit radius — tight 5–15px for dense feel
        orbitR: 5 + r3 * 10,
        // Fine dots: 0.7 to 2.2px
        dotR: 0.7 + seededRand(i * 7) * 1.5,
        // Soft vertical jitter
        jitterY: (seededRand(i * 5) - 0.5) * 12,
        // Speed multiplier (some rotate faster than others)
        speedMult: 0.6 + seededRand(i * 11) * 0.8,
    };
});

export default function RightEdgeParticles() {
    const isMobile = useIsMobile();
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const rafRef = useRef<number>(0);

    const { scrollYProgress } = useScroll();
    // Spring so motion eases in/out with user scroll rather than jumping
    const smooth = useSpring(scrollYProgress, { stiffness: 45, damping: 24 });

    useEffect(() => {
        if (isMobile) return;
        const canvas = canvasRef.current;
        if (!canvas) return;

        const resize = () => {
            canvas.width = STRIP_W;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener("resize", resize);

        const draw = () => {
            const scroll = smooth.get();   // 0–1
            const ctx = canvas.getContext("2d");
            if (!ctx) { rafRef.current = requestAnimationFrame(draw); return; }

            const h = canvas.height;
            ctx.clearRect(0, 0, STRIP_W, h);

            // Total rotation driven purely by scroll (0 → 720° across full page)
            const totalRotDeg = scroll * 720;

            // Draw each particle
            for (const p of PARTICLES) {
                // Where on screen this particle sits vertically
                const baseY = p.baseFrac * h + p.jitterY;
                if (baseY < -10 || baseY > h + 10) continue;

                // Rotation angle: initial spread + scroll-driven spin, each at own speed
                const angleDeg = p.initAngle + totalRotDeg * p.speedMult;
                const angleRad = (angleDeg * Math.PI) / 180;

                const x = CX + Math.cos(angleRad) * p.orbitR;
                const y = baseY + Math.sin(angleRad) * p.orbitR * 0.35; // slight vertical bob

                // Depth from cos(angle): -1 = behind, +1 = front
                const depth = Math.cos(angleRad);
                const normDepth = (depth + 1) / 2;  // 0–1

                const opacity = 0.25 + normDepth * 0.65;
                const bright = 44 + normDepth * 16;
                const r = p.dotR * (0.78 + normDepth * 0.32);

                // Glow
                const glowR = r * 3.5;
                const grd = ctx.createRadialGradient(x, y, 0, x, y, glowR);
                grd.addColorStop(0, `hsla(4,72%,60%,${opacity * 0.5})`);
                grd.addColorStop(0.6, `hsla(4,72%,54%,${opacity * 0.12})`);
                grd.addColorStop(1, "hsla(4,72%,54%,0)");
                ctx.beginPath();
                ctx.arc(x, y, glowR, 0, Math.PI * 2);
                ctx.fillStyle = grd;
                ctx.fill();

                // Core dot
                ctx.beginPath();
                ctx.arc(x, y, r, 0, Math.PI * 2);
                ctx.fillStyle = `hsla(4,72%,${bright}%,${opacity})`;
                ctx.fill();
            }


            rafRef.current = requestAnimationFrame(draw);
        };

        rafRef.current = requestAnimationFrame(draw);
        return () => {
            window.removeEventListener("resize", resize);
            cancelAnimationFrame(rafRef.current);
        };
    }, [isMobile, smooth]);

    if (isMobile) return null;

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: "fixed",
                top: 0,
                right: 0,
                width: STRIP_W,
                height: "100vh",
                pointerEvents: "none",
                zIndex: 9999,
                background: "transparent",
            }}
            className="hidden lg:block"
            aria-hidden="true"
        />
    );
}
