import React, { useRef, useState, useEffect } from "react";
import {
    motion,
    useScroll,
    useTransform,
    useSpring,
    useMotionValueEvent,
    MotionValue,
} from "framer-motion";
import {
    Instagram, Youtube, Linkedin, Twitter,
    ArrowUpRight, TrendingUp, Grid, MessageCircle,
    Play, MoreHorizontal, ChevronDown, UserPlus,
    BarChart3, Users, Eye, Link2, Heart, Share2
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

// ─── Brand ────────────────────────────────────────────────────────────────────
const BRAND = {
    handle: "studsagency",
    name: "Studs Agency",
    bio: "Engineered growth. Premium content.",
    category: "Marketing Agency",
    link: "studsagency.com",
};

// ─── Social Icons ─────────────────────────────────────────────────────────────
const ORBIT_ICONS = [
    { Icon: Instagram, color: "#E4405F", bg: "#1a1608" },
    { Icon: Twitter, color: "#1DA1F2", bg: "#020d1c" },
    { Icon: Linkedin, color: "#0A66C2", bg: "#040e2a" },
    { Icon: Youtube, color: "#FF0000", bg: "#1a0808" },
];

// ─── Post Grid ────────────────────────────────────────────────────────────────
const POST_GRID = [
    { bg: "from-[#1a1608] to-[#010308]", accent: "#d4af37", label: "300K REACH", reel: true },
    { bg: "from-[#010308] to-[#0a0a0a]", accent: "#444", label: "Ad Creative", reel: false },
    { bg: "from-[#020d1c] to-[#010308]", accent: "#1DA1F2", label: "Client Win", reel: false },
    { bg: "from-[#0a0a0a] to-[#010308]", accent: "#666", label: "Brand Shoot", reel: false },
    { bg: "from-[#1a1008] to-[#010308]", accent: "#ffab40", label: "CASE STUDY", reel: true },
    { bg: "from-[#0a0e2a] to-[#0a0a0a]", accent: "#555", label: "BTS", reel: false },
    { bg: "from-[#010308] to-[#0a0a0a]", accent: "#d4af37", label: "Motion", reel: true },
    { bg: "from-[#020d1c] to-[#010308]", accent: "#4ade80", label: "+220k Reach", reel: false },
    { bg: "from-[#010308] to-[#0a0a0a]", accent: "#666", label: "Interview", reel: false },
];

const HIGHLIGHTS = ["Results", "Clients", "Reels", "Ads", "BTS"];

// ─── Stat Counter ─────────────────────────────────────────────────────────────
function StatCounter({ value, prefix = "", suffix = "" }: {
    value: MotionValue<number>; prefix?: string; suffix?: string;
}) {
    const [display, setDisplay] = useState(() => Math.floor(value.get()));
    useMotionValueEvent(value, "change", (v) => setDisplay(Math.floor(v)));
    return <span>{prefix}{display.toLocaleString()}{suffix}</span>;
}

// ─── OrbitIcon – clean elliptical path ───────────────────────────────────────
function OrbitIcon({
    item, index, total, orbitProgress, radiusX, radiusY, iconSize,
}: {
    item: typeof ORBIT_ICONS[0];
    index: number; total: number;
    orbitProgress: MotionValue<number>;
    radiusX: number; radiusY: number; iconSize: number;
}) {
    const baseAngle = (index / total) * Math.PI * 2;

    // x / y are the pixel offsets from the orbit centre
    const x = useTransform(orbitProgress, (p: number) =>
        Math.cos(baseAngle + p * Math.PI * 2) * radiusX
    );
    const y = useTransform(orbitProgress, (p: number) =>
        Math.sin(baseAngle + p * Math.PI * 2) * radiusY
    );

    // Depth: sin(angle) gives -1 (behind) → +1 (front)
    const sinAngle = useTransform(orbitProgress, (p: number) =>
        Math.sin(baseAngle + p * Math.PI * 2)
    );
    const scale = useTransform(sinAngle, [-1, 1], [0.72, 1.05]);
    const opacity = useTransform(sinAngle, [-1, -0.35, 0.35, 1], [0.35, 0.65, 0.82, 1]);
    const zIndex = useTransform(sinAngle, [-1, 1], [10, 55]) as unknown as number;

    const Icon = item.Icon;
    const half = iconSize / 2;

    return (
        <motion.div
            style={{
                position: "absolute",
                top: 0, left: 0,
                // offset from centre, minus half icon to visually centre it
                x: useTransform(x, v => v - half),
                y: useTransform(y, v => v - half),
                width: iconSize, height: iconSize,
                scale, opacity, zIndex,
            }}
        >
            <div style={{
                width: "100%", height: "100%",
                borderRadius: 14,
                background: item.bg,
                border: `1px solid ${item.color}28`,
                boxShadow: `0 0 18px ${item.color}14, inset 0 1px 0 rgba(255,255,255,0.05)`,
                display: "flex", alignItems: "center", justifyContent: "center",
            }}>
                <Icon size={iconSize * 0.44} color={item.color} />
            </div>
        </motion.div>
    );
}

// ─── DataTrail – CSS rotation approach (no state per-frame) ──────────────────
function DataTrail({
    index, total, orbitProgress, trailOpacity, radiusX, radiusY,
}: {
    index: number; total: number;
    orbitProgress: MotionValue<number>;
    trailOpacity: MotionValue<number>;
    radiusX: number; radiusY: number;
}) {
    const baseAngle = (index / total) * Math.PI * 2;

    const rotate = useTransform(orbitProgress, (p: number) => {
        const angle = baseAngle + p * Math.PI * 2;
        const ex = Math.cos(angle) * radiusX;
        const ey = Math.sin(angle) * radiusY;
        return Math.atan2(ey, ex) * (180 / Math.PI);
    });

    const width = useTransform(orbitProgress, (p: number) => {
        const angle = baseAngle + p * Math.PI * 2;
        const ex = Math.cos(angle) * radiusX;
        const ey = Math.sin(angle) * radiusY;
        return Math.sqrt(ex * ex + ey * ey);
    });

    return (
        <motion.div
            style={{
                position: "absolute",
                top: 0, left: 0,
                height: 1,
                width,
                rotate,
                transformOrigin: "left center",
                background: "linear-gradient(to right, hsl(45 93% 58% / 0.7), transparent)",
                opacity: trailOpacity,
                zIndex: 18,
                pointerEvents: "none",
            }}
        />
    );
}

// ─── Instagram Screen ─────────────────────────────────────────────────────────
function InstagramScreen() {
    const isMobile = useIsMobile();
    return (
        <div className="w-full h-full bg-black flex flex-col overflow-hidden select-none text-white antialiased" style={{ textRendering: "optimizeLegibility", transform: "translateZ(0)", WebkitTransform: "translateZ(0)" }}>

            {/* Status bar */}
            <div className="flex justify-between items-center px-4 pt-3 pb-1.5 text-[10px] sm:text-[11px] font-medium shrink-0">
                <span className="text-white/90">9:41</span>
                <div className="flex items-center gap-1">
                    {[0.3, 0.6, 1].map((o, i) => (
                        <div key={i} style={{ width: 4, height: 8 + i * 2, borderRadius: 1.5, background: `rgba(255,255,255,${o})` }} />
                    ))}
                    <div className="w-5 h-3 rounded-[3px] border border-white/40 ml-1.5 flex items-center px-[2px]">
                        <div className="w-2.5 h-2 bg-white rounded-[1.5px]" />
                    </div>
                </div>
            </div>

            {/* IG header */}
            <div className="flex items-center justify-between px-4 pb-2 shrink-0">
                <div className="flex items-center gap-1.5">
                    <span className="font-bold text-[13px] sm:text-[15px]">{BRAND.handle}</span>
                    <ChevronDown size={14} className="text-white/50" />
                </div>
                <div className="flex gap-3">
                    <TrendingUp size={15} />
                    <MoreHorizontal size={15} />
                </div>
            </div>

            {/* Profile row */}
            <div className="flex items-center gap-3 px-3 pb-2 shrink-0">
                <div className="w-14 h-14 rounded-full p-[2px] bg-gradient-to-tr from-[#d4af37] via-[#f7e482] to-[#ffab40] shrink-0">
                    <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                        <div className="w-full h-full rounded-full bg-gradient-to-br from-[#1a1608] to-[#010308] flex items-center justify-center text-[12px] font-black">
                            SA
                        </div>
                    </div>
                </div>
                <div className="flex gap-2 flex-1 text-center">
                    {[["124", "Posts"], ["524k", "Followers"], ["1.4k", "Following"]].map(([n, l]) => (
                        <div key={l} className="flex-1">
                            <p className="font-bold text-[12px] sm:text-[14px]">{n}</p>
                            <p className="text-white/40 text-[8px] sm:text-[9px] uppercase tracking-tighter">{l}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Bio */}
            <div className="px-4 pb-2 shrink-0 space-y-[3px]">
                <p className="font-semibold text-[12px] sm:text-[14px]">{BRAND.name}</p>
                <p className="text-white/50 text-[9px] sm:text-[11px] font-medium">{BRAND.category}</p>
                <p className="text-white/80 text-[10px] sm:text-[12px] leading-tight">{BRAND.bio}</p>
                <p className="text-[#0095f6] text-[10px] sm:text-[12px] font-medium">🔗 {BRAND.link}</p>
            </div>

            {/* Professional Dashboard — inline dark card, right above buttons */}
            <div className="mx-4 mb-2 shrink-0 bg-white/10 border border-white/10 rounded-xl px-3 py-2">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-[10px] sm:text-[11px] font-semibold text-white">Professional dashboard</p>
                        <div className="flex items-center gap-1 mt-[2px]">
                            <TrendingUp size={isMobile ? 9 : 10} className="text-green-400" />
                            <span className="text-[8px] sm:text-[9px] text-white/50">1.4K views in the last 30 days.</span>
                        </div>
                    </div>
                    <ArrowUpRight size={isMobile ? 11 : 12} className="text-white/40" />
                </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-2 px-4 pb-3 shrink-0">
                {["Edit profile", "Share profile"].map(t => (
                    <div key={t} className="flex-1 h-6 sm:h-7 bg-white/10 rounded-lg text-[10px] sm:text-[11px] font-semibold flex items-center justify-center border border-white/5">{t}</div>
                ))}
                <div className="w-6 h-6 sm:w-7 sm:h-7 bg-white/10 rounded-lg flex items-center justify-center border border-white/5">
                    <UserPlus size={isMobile ? 11 : 12} />
                </div>
            </div>

            {/* Story highlights */}
            <div className="flex gap-3 px-4 pb-3 overflow-x-hidden shrink-0">
                {HIGHLIGHTS.map(h => (
                    <div key={h} className="flex flex-col items-center gap-1 shrink-0">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/20 bg-gradient-to-br from-[#d4af37]/30 to-black flex items-center justify-center text-[9px] sm:text-[10px] font-bold">
                            {h[0]}
                        </div>
                        <span className="text-[8px] sm:text-[9px] text-white/40 font-medium">{h}</span>
                    </div>
                ))}
            </div>

            {/* Tabs */}
            <div className="flex border-t border-white/10 shrink-0">
                {[Grid, Play, MessageCircle].map((Icon, i) => (
                    <div key={i} className={`flex-1 flex items-center justify-center py-1 ${i === 0 ? "border-b border-white" : ""}`}>
                        <Icon size={11} className={i === 0 ? "text-white" : "text-white/25"} />
                    </div>
                ))}
            </div>

            {/* Post grid */}
            <div className="grid grid-cols-3 gap-px flex-1 min-h-0 overflow-hidden">
                {POST_GRID.map((p, i) => (
                    <div key={i} className={`relative bg-gradient-to-br ${p.bg} flex flex-col justify-end p-1.5`}>
                        <div className="absolute inset-0 flex items-center justify-center opacity-40">
                            <div className="w-4 h-0.5 sm:w-5 sm:h-1 rounded-full" style={{ background: p.accent }} />
                        </div>
                        <p className="text-[8px] sm:text-[9px] font-bold text-white z-10 leading-tight drop-shadow-sm">{p.label}</p>
                        {p.reel && <Play size={isMobile ? 7 : 8} className="absolute top-1.5 right-1.5 text-white/80" />}
                    </div>
                ))}
            </div>

            {/* Bottom nav */}
            <div className="flex justify-around px-3 py-1 border-t border-white/10 bg-black shrink-0">
                {[Grid, Play, Share2, Users, MessageCircle].map((Icon, i) => (
                    <Icon key={i} size={12} className={i === 0 ? "text-white" : "text-white/20"} />
                ))}
            </div>
        </div>
    );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function MarketingDNA() {
    const containerRef = useRef<HTMLDivElement>(null);
    const isMobile = useIsMobile();

    // Use global scroll and calculate relative progress manually. 
    // This is much more reliable on mobile Safari/iOS than the 'target' prop.
    const { scrollY } = useScroll();
    const [elementTop, setElementTop] = useState(0);
    const [elementHeight, setElementHeight] = useState(0);

    useEffect(() => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        setElementTop(rect.top + scrollTop);
        setElementHeight(rect.height);
    }, []);

    const scrollYProgress = useTransform(scrollY,
        [elementTop - window.innerHeight, elementTop + elementHeight],
        [0, 1]
    );

    // Orbit: starts at scroll 0.2, completes a full revolution by 1.0
    const rawOrbit = useTransform(scrollYProgress, [0.2, 1.0], [0, 1]);
    const orbitProgress = useSpring(rawOrbit, { stiffness: 36, damping: 22 });

    // Data trails: appear at 0.4 → fade at 0.75
    const trailOpacity = useTransform(scrollYProgress, [0.38, 0.46, 0.7, 0.78], [0, 1, 1, 0]);

    // Analytics panel
    const analyticsProgress = useTransform(scrollYProgress, [0.65, 0.92], [0, 1]);
    const smoothAnalytics = useSpring(analyticsProgress, { stiffness: 48, damping: 22 });

    // KPI counters
    const reachCount = useTransform(scrollYProgress, [0.55, 0.95], [219000, 524800]);
    const followerCount = useTransform(scrollYProgress, [0.50, 0.90], [160000, 524800]);

    // Reactor glow
    const reactorScale = useTransform(scrollYProgress, [0.82, 0.90, 1.0], [1, 1.5, 1]);
    const reactorOpacity = useTransform(scrollYProgress, [0.82, 0.88, 1.0], [0, 0.18, 0]);

    // Dimensions — mobile matches desktop proportions, same high-detail look
    const phoneW = isMobile ? 260 : 315;
    const phoneH = isMobile ? 528 : 640;
    const radiusX = isMobile ? 200 : 280;   // large enough to clear phone edge
    const radiusY = isMobile ? 90 : 120;
    const iconSize = isMobile ? 54 : 68;

    // Filter icons on mobile for cleaner look
    const activeIcons = isMobile ? ORBIT_ICONS.slice(0, 2) : ORBIT_ICONS;

    return (
        <section
            ref={containerRef}
            className="relative py-20 sm:py-32 md:py-52 overflow-visible bg-[#050505]"
        >
            {/* Ambient glow */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[150px]" />
            </div>

            <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

                    {/* ── Left: Copy + KPIs ──────────────────────── */}
                    <div className="flex-1 text-center lg:text-left z-20">

                        <motion.h2
                            initial={{ opacity: 0, y: 22 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-4xl sm:text-6xl md:text-7xl font-bold mb-6 tracking-tighter leading-[0.95]"
                        >
                            Marketing In Our <br />
                            <span className="text-foreground/30 italic font-light">Very</span> <br />
                            <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/50 bg-clip-text text-transparent">
                                Digital DNA
                            </span>
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 14 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-muted-foreground text-base sm:text-lg max-w-md mx-auto lg:mx-0 leading-relaxed font-light mb-10"
                        >
                            We analyse the DNA of viral moments to build reliable growth engines.
                            Neural pathing turns raw engagement into engineered, compounding results.
                        </motion.p>

                        {/* KPIs */}
                        <div className="grid grid-cols-2 gap-8 max-w-xs mx-auto lg:mx-0 border-t border-white/5 pt-8">
                            {[
                                { val: reachCount, label: "Reach Engineered" },
                                { val: followerCount, label: "Network Growth" },
                            ].map((stat, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.15 + i * 0.1 }}
                                >
                                    <p className="text-2xl sm:text-3xl font-bold tracking-tighter">
                                        <StatCounter value={stat.val} prefix="+" />
                                    </p>
                                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground mt-1">
                                        {stat.label}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* ── Right: Phone + Orbit ────────────────────── */}
                    <div
                        className="flex-1 flex items-center justify-center relative"
                        style={{
                            minHeight: isMobile ? 560 : 640,
                            // Extra horizontal room so orbit icons don't clip
                            paddingLeft: radiusX * 0.6,
                            paddingRight: radiusX * 0.6,
                        }}
                    >
                        {/* Reactor glow */}
                        <motion.div style={{
                            scale: reactorScale, opacity: reactorOpacity,
                            position: "absolute", width: 280, height: 280, borderRadius: "50%",
                            background: "hsl(4 72% 54%)", filter: "blur(70px)",
                            zIndex: 0, top: "50%", left: "50%", x: "-50%", y: "-50%",
                            pointerEvents: "none",
                        }} />

                        {/* Orbit anchor: sits at visual centre of phone */}
                        <div style={{ position: "absolute", top: "50%", left: "50%", zIndex: 1 }}>

                            {/* Icons */}
                            {activeIcons.map((item, i) => (
                                <OrbitIcon
                                    key={item.color}
                                    item={item} index={i} total={activeIcons.length}
                                    orbitProgress={orbitProgress}
                                    radiusX={radiusX} radiusY={radiusY} iconSize={iconSize}
                                />
                            ))}

                            {/* Data trails */}
                            {activeIcons.map((_, i) => (
                                <DataTrail
                                    key={i}
                                    index={i} total={activeIcons.length}
                                    orbitProgress={orbitProgress}
                                    trailOpacity={trailOpacity}
                                    radiusX={radiusX} radiusY={radiusY}
                                />
                            ))}
                        </div>

                        {/* Phone */}
                        <motion.div
                            animate={{ y: [0, -9, 0] }}
                            transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
                            style={{ position: "relative", zIndex: 30 }}
                        >
                            <div style={{
                                width: phoneW, height: phoneH,
                                borderRadius: isMobile ? 38 : 48,
                                background: "#050505",
                                border: "9px solid #141414",
                                boxShadow: `
                                    0 0 0 1px rgba(255,255,255,0.1),
                                    0 40px 100px rgba(0,0,0,0.9),
                                    0 0 80px rgba(212,175,55,0.12),
                                    inset 0 0 0 1px rgba(255,255,255,0.08)
                                `,
                                position: "relative",
                                transform: `perspective(1800px) rotateX(5deg) rotateY(-14deg) translateZ(0)`,
                                WebkitTransform: `perspective(1800px) rotateX(5deg) rotateY(-14deg) translateZ(0)`,
                                transformStyle: "preserve-3d",
                                WebkitTransformStyle: "preserve-3d",
                                WebkitFontSmoothing: "antialiased",
                                backfaceVisibility: "hidden",
                                WebkitBackfaceVisibility: "hidden",
                                overflow: "hidden",
                            }}>
                                {/* Notch */}
                                <div style={{
                                    position: "absolute", top: 0, left: "50%",
                                    transform: "translateX(-50%)",
                                    width: "38%", height: 22,
                                    background: "#121212",
                                    borderBottomLeftRadius: 16, borderBottomRightRadius: 16,
                                    zIndex: 60, border: "1px solid rgba(255,255,255,0.08)", borderTop: "none",
                                }} />

                                {/* Glass glare */}
                                <div style={{
                                    position: "absolute", top: 0, left: "-15%",
                                    width: "40%", height: "100%",
                                    background: "linear-gradient(115deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.02) 30%, transparent 60%)",
                                    zIndex: 55, pointerEvents: "none",
                                }} />

                                {/* Screen */}
                                <div style={{
                                    position: "absolute", inset: 0,
                                    borderRadius: isMobile ? 30 : 40,
                                    overflow: "hidden",
                                }}>
                                    <InstagramScreen />
                                </div>

                                {/* Rim light */}
                                <div style={{
                                    position: "absolute", inset: -1,
                                    borderRadius: "inherit",
                                    border: "1px solid rgba(255,255,255,0.08)",
                                    pointerEvents: "none", zIndex: 65,
                                }} />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div >
        </section >
    );
}
