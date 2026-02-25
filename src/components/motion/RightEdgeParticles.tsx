import { useEffect, useRef } from "react";
import { useScroll, useSpring } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

// ── Canvas-based right-edge particle stream ──────────────────────────────────
// Renders on a fixed canvas covering the right 56px of the viewport.
// Scroll drives a "wave" crest that travels down the column.
// Each dot has permanent visibility + a breathing pulse + scroll glow.

const PARTICLE_COUNT = 26;
const STRIP_WIDTH = 56;

interface Dot {
    // Fraction 0–1 of the column height
    baseFrac: number;
    // Slight horizontal variation within the strip
    x: number;
    radius: number;
    // Individual pulse phase offset
    phase: number;
    speed: number; // vertical drift multiplier
}

function buildDots(): Dot[] {
    const dots: Dot[] = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
        dots.push({
            baseFrac: i / (PARTICLE_COUNT - 1),
            x: STRIP_WIDTH / 2 + (Math.sin(i * 2.4) * 10), // gentle zigzag ~±10px
            radius: 2 + (i % 3 === 0 ? 1.5 : 0) + (i % 7 === 0 ? 1 : 0),
            phase: i * 0.45,
            speed: 0.5 + (i % 4) * 0.12,
        });
    }
    return dots;
}

const DOTS = buildDots();

export default function RightEdgeParticles() {
    const isMobile = useIsMobile();
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const rafRef = useRef<number>(0);

    // Whole-document scroll progress [0,1]
    const { scrollYProgress } = useScroll();
    const smooth = useSpring(scrollYProgress, { stiffness: 60, damping: 28 });

    useEffect(() => {
        if (isMobile) return;
        const canvas = canvasRef.current;
        if (!canvas) return;

        const resize = () => {
            canvas.width = STRIP_WIDTH;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener("resize", resize);

        let startTime: number | null = null;

        const draw = (ts: number) => {
            if (!startTime) startTime = ts;
            const elapsed = (ts - startTime) / 1000; // seconds
            const scroll = smooth.get(); // 0–1

            const ctx = canvas.getContext("2d");
            if (!ctx) return;

            const h = canvas.height;
            ctx.clearRect(0, 0, STRIP_WIDTH, h);

            // ── Guide rail line ────────────────────────────────────────────────────
            const railGrad = ctx.createLinearGradient(0, 0, 0, h);
            railGrad.addColorStop(0, "rgba(192,57,43,0)");
            railGrad.addColorStop(0.15, "rgba(192,57,43,0.14)");
            railGrad.addColorStop(0.85, "rgba(192,57,43,0.14)");
            railGrad.addColorStop(1, "rgba(192,57,43,0)");
            ctx.strokeStyle = railGrad;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(STRIP_WIDTH / 2, 0);
            ctx.lineTo(STRIP_WIDTH / 2, h);
            ctx.stroke();

            // ── "Wave crest": a bright highlight that travels down as you scroll ──
            // crestY moves from top to bottom as scroll goes 0→1
            const crestFrac = scroll;
            const crestY = crestFrac * h;
            const crestGlow = ctx.createRadialGradient(
                STRIP_WIDTH / 2, crestY, 0,
                STRIP_WIDTH / 2, crestY, 60
            );
            crestGlow.addColorStop(0, "rgba(220,60,43,0.22)");
            crestGlow.addColorStop(0.5, "rgba(192,57,43,0.08)");
            crestGlow.addColorStop(1, "rgba(192,57,43,0)");
            ctx.fillStyle = crestGlow;
            ctx.fillRect(0, Math.max(0, crestY - 60), STRIP_WIDTH, 120);

            // ── Dots ───────────────────────────────────────────────────────────────
            DOTS.forEach((dot) => {
                // Vertical position: base + parallax shift from scroll
                const parallaxShift = (dot.baseFrac - 0.5) * 180 * dot.speed * scroll;
                const rawY = dot.baseFrac * h + parallaxShift;
                const y = Math.max(dot.radius, Math.min(h - dot.radius, rawY));

                // Breathing pulse: each dot pulses independently
                const pulse = 0.5 + 0.5 * Math.sin(elapsed * 1.6 + dot.phase);

                // Base opacity — always visible
                const baseOpacity = 0.35 + pulse * 0.15;

                // Proximity to wave crest → extra glow
                const dist = Math.abs(y - crestY);
                const crestBoost = Math.max(0, 1 - dist / 160);
                const finalOpacity = Math.min(1, baseOpacity + crestBoost * 0.5);

                // Core dot
                const r = dot.radius * (1 + pulse * 0.18);
                ctx.beginPath();
                ctx.arc(dot.x, y, r, 0, Math.PI * 2);

                const coreHue = 4 + crestBoost * 6;
                const coreLit = 54 + crestBoost * 10;
                ctx.fillStyle = `hsla(${coreHue}, 72%, ${coreLit}%, ${finalOpacity})`;
                ctx.fill();

                // Soft glow halo
                const glowR = r * (2.8 + crestBoost * 2);
                const grad = ctx.createRadialGradient(dot.x, y, 0, dot.x, y, glowR);
                grad.addColorStop(0, `hsla(4,72%,56%,${finalOpacity * 0.55})`);
                grad.addColorStop(0.5, `hsla(4,72%,54%,${finalOpacity * 0.18})`);
                grad.addColorStop(1, "hsla(4,72%,54%,0)");
                ctx.beginPath();
                ctx.arc(dot.x, y, glowR, 0, Math.PI * 2);
                ctx.fillStyle = grad;
                ctx.fill();

                // Connector segment to next dot
                const nextDot = DOTS[(DOTS.indexOf(dot) + 1) % DOTS.length];
                if (nextDot) {
                    const nextParallax = (nextDot.baseFrac - 0.5) * 180 * nextDot.speed * scroll;
                    const nextY = Math.max(
                        nextDot.radius,
                        Math.min(h - nextDot.radius, nextDot.baseFrac * h + nextParallax)
                    );
                    const segOpacity = (finalOpacity * 0.25);
                    ctx.beginPath();
                    ctx.moveTo(dot.x, y);
                    ctx.lineTo(nextDot.x, nextY);
                    ctx.strokeStyle = `hsla(4,72%,54%,${segOpacity})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            });

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
                width: STRIP_WIDTH,
                height: "100vh",
                pointerEvents: "none",
                zIndex: 45,
            }}
            className="hidden lg:block"
            aria-hidden="true"
        />
    );
}
