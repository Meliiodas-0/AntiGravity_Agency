import { useEffect, useRef } from "react";
import { useScroll, useSpring } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

const STRIP_W = 52;
const NODE_COUNT = 22;        // nodes per strand
const NODE_SPACING = 38;      // px between nodes vertically
const AMPLITUDE = 16;         // horizontal sine amplitude
const CROSS_LINKS = true;     // draw rungs between strands

export default function RightEdgeParticles() {
    const isMobile = useIsMobile();
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const rafRef = useRef<number>(0);

    const { scrollYProgress } = useScroll();
    const smooth = useSpring(scrollYProgress, { stiffness: 55, damping: 26 });

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

        let t0: number | null = null;

        const draw = (ts: number) => {
            if (!t0) t0 = ts;
            const elapsed = (ts - t0) / 1000;         // seconds
            const scroll = smooth.get();              // 0–1

            const ctx = canvas.getContext("2d");
            if (!ctx) { rafRef.current = requestAnimationFrame(draw); return; }

            const h = canvas.height;
            const cx = STRIP_W / 2;

            ctx.clearRect(0, 0, STRIP_W, h);

            // ── rotation: time-driven + scroll accelerates it ────────────────────
            // base rotation turns continuously; scroll adds extra angular offset
            const baseRot = elapsed * 0.9;
            const scrollRot = scroll * Math.PI * 3;  // extra 1.5 full turns at scroll=1
            const rot = baseRot + scrollRot;

            // ── vertical scroll offset: helix drifts upward as user scrolls ─────
            const scrollOffset = scroll * NODE_COUNT * NODE_SPACING * 0.6;

            // Total helix height
            const helixH = (NODE_COUNT - 1) * NODE_SPACING;
            // Start above viewport so it scrolls into view nicely
            const startY = (h - helixH) / 2 - scrollOffset;

            // ─── helper: map depth (sin of angle) to visual properties ──────────
            const depthProps = (depth: number) => {
                // depth: -1 = behind, +1 = front
                const normDepth = (depth + 1) / 2;        // 0–1
                const opacity = 0.28 + normDepth * 0.62;
                const radius = 2 + normDepth * 2.2;
                const bright = 42 + normDepth * 18;   // hsl lightness
                return { opacity, radius, bright };
            };

            // Build node data for both strands before drawing so we can layer properly
            type NodeData = {
                x: number; y: number; depth: number;
                opacity: number; radius: number; bright: number; strand: 0 | 1;
                idx: number;
            };
            const nodes: NodeData[] = [];

            for (let i = 0; i < NODE_COUNT; i++) {
                const angle = rot + i * (Math.PI * 2 / 8); // 8 steps per full turn
                const y = startY + i * NODE_SPACING;

                // Skip nodes completely off screen
                if (y < -20 || y > h + 20) continue;

                // Strand A
                const ax = cx + Math.cos(angle) * AMPLITUDE;
                const da = Math.sin(angle);
                const pa = depthProps(da);
                nodes.push({ x: ax, y, depth: da, ...pa, strand: 0, idx: i });

                // Strand B (π offset)
                const bx = cx + Math.cos(angle + Math.PI) * AMPLITUDE;
                const db = Math.sin(angle + Math.PI);
                const pb = depthProps(db);
                nodes.push({ x: bx, y, depth: db, ...pb, strand: 1, idx: i });
            }

            // Sort back-to-front for painter's algorithm
            nodes.sort((a, b) => a.depth - b.depth);

            // ─── Draw cross-link rungs (behind everything) ────────────────────────
            if (CROSS_LINKS) {
                for (let i = 0; i < NODE_COUNT; i++) {
                    const angle = rot + i * (Math.PI * 2 / 8);
                    const y = startY + i * NODE_SPACING;
                    if (y < -10 || y > h + 10) continue;

                    const ax = cx + Math.cos(angle) * AMPLITUDE;
                    const bx = cx + Math.cos(angle + Math.PI) * AMPLITUDE;

                    // Cross-link only visible when the two strands are roughly side-by-side
                    const da = Math.sin(angle);
                    const crossOpacity = Math.max(0, (1 - Math.abs(da)) * 0.22);

                    ctx.beginPath();
                    ctx.moveTo(ax, y);
                    ctx.lineTo(bx, y);
                    ctx.strokeStyle = `hsla(4,72%,54%,${crossOpacity})`;
                    ctx.lineWidth = 0.8;
                    ctx.stroke();
                }
            }

            // ─── Draw backbone curves between adjacent same-strand nodes ─────────
            // Do this per strand to get smooth curves
            for (const strand of [0, 1] as const) {
                const strandNodes = nodes
                    .filter(n => n.strand === strand)
                    .sort((a, b) => a.idx - b.idx);

                for (let k = 0; k < strandNodes.length - 1; k++) {
                    const a = strandNodes[k];
                    const b = strandNodes[k + 1];
                    const avgOp = (a.opacity + b.opacity) / 2 * 0.32;

                    ctx.beginPath();
                    ctx.moveTo(a.x, a.y);
                    ctx.lineTo(b.x, b.y);

                    // Color shifts slightly per strand
                    const hue = strand === 0 ? 4 : 8;
                    ctx.strokeStyle = `hsla(${hue},72%,54%,${avgOp})`;
                    ctx.lineWidth = 0.8;
                    ctx.stroke();
                }
            }

            // ─── Draw nodes (sorted back-to-front) ───────────────────────────────
            for (const n of nodes) {
                // Glow halo
                const glowR = n.radius * 3.2;
                const grd = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, glowR);
                grd.addColorStop(0, `hsla(4,72%,60%,${n.opacity * 0.55})`);
                grd.addColorStop(0.5, `hsla(4,72%,54%,${n.opacity * 0.15})`);
                grd.addColorStop(1, "hsla(4,72%,54%,0)");
                ctx.beginPath();
                ctx.arc(n.x, n.y, glowR, 0, Math.PI * 2);
                ctx.fillStyle = grd;
                ctx.fill();

                // Core dot
                ctx.beginPath();
                ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
                ctx.fillStyle = `hsla(4,72%,${n.bright}%,${n.opacity})`;
                ctx.fill();
            }

            // ─── Subtle vignette fade at top and bottom ───────────────────────────
            const vigTop = ctx.createLinearGradient(0, 0, 0, 80);
            vigTop.addColorStop(0, "rgba(5,5,5,0.95)");
            vigTop.addColorStop(1, "rgba(5,5,5,0)");
            ctx.fillStyle = vigTop;
            ctx.fillRect(0, 0, STRIP_W, 80);

            const vigBot = ctx.createLinearGradient(0, h - 80, 0, h);
            vigBot.addColorStop(0, "rgba(5,5,5,0)");
            vigBot.addColorStop(1, "rgba(5,5,5,0.95)");
            ctx.fillStyle = vigBot;
            ctx.fillRect(0, h - 80, STRIP_W, 80);

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
                zIndex: 45,
            }}
            className="hidden lg:block"
            aria-hidden="true"
        />
    );
}
