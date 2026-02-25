import React, { useRef, useState } from "react";
import {
    motion,
    useScroll,
    useTransform,
    useSpring,
    useMotionValue,
    useMotionValueEvent,
    MotionValue,
} from "framer-motion";
import { Instagram, Youtube, Linkedin, Twitter, ArrowUpRight, TrendingUp, Grid, MessageCircle, Play, MoreHorizontal, ChevronDown, UserPlus, BarChart3, Users, Eye, Link2, Heart, Share2 } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

// ─── Brand Config ─────────────────────────────────────────────────────────────
const BRAND = {
    handle: "studsagency",
    name: "Studs Agency",
    bio: "Engineered growth. Premium content.",
    category: "Marketing Agency",
    link: "studsagency.com",
    posts: "124",
    followers: "524k",
    following: "1,412",
};

// ─── Social Orbit Icons ───────────────────────────────────────────────────────
const ORBIT_ICONS = [
    { Icon: Instagram, color: "#E4405F", label: "Instagram", bg: "#1a0a0d" },
    { Icon: Twitter, color: "#1DA1F2", label: "X", bg: "#060f18" },
    { Icon: Linkedin, color: "#0A66C2", label: "LinkedIn", bg: "#06101a" },
    { Icon: Youtube, color: "#FF0000", label: "YouTube", bg: "#1a0606" },
];

// ─── Post Grid Thumbnails ─────────────────────────────────────────────────────
const POST_GRID = [
    { bg: "from-[#1a0606] to-[#0d0d0d]", accent: "#c0392b", label: "300K REACH", sub: "Reel Workshop" },
    { bg: "from-[#0d0d0d] to-[#111]", accent: "#888", label: "Ad Creative", sub: "↑ 4.2x ROAS" },
    { bg: "from-[#060d12] to-[#0d0d0d]", accent: "#1DA1F2", label: "Client Win", sub: "+18k Followers" },
    { bg: "from-[#111] to-[#0d0d0d]", accent: "#aaa", label: "Brand Shoot", sub: "Visual Identity" },
    { bg: "from-[#1a0606] to-[#111]", accent: "#c0392b", label: "CASE STUDY", sub: "523% Growth" },
    { bg: "from-[#0d1117] to-[#111]", accent: "#6e6e6e", label: "BTS", sub: "Production Day" },
    { bg: "from-[#111] to-[#0d0d0d]", accent: "#c0392b", label: "Motion", sub: "Design Teaser" },
    { bg: "from-[#060d12] to-[#0d0d0d]", accent: "#4ade80", label: "Results", sub: "+220k Reach" },
    { bg: "from-[#0d0d0d] to-[#111]", accent: "#aaa", label: "Interview", sub: "CEO Feature" },
];

const HIGHLIGHTS = ["Results", "Clients", "Reels", "Ads", "BTS"];

// ─── Stat Counter ─────────────────────────────────────────────────────────────
function StatCounter({ value, prefix = "", suffix = "" }: { value: MotionValue<number>; prefix?: string; suffix?: string }) {
    const [display, setDisplay] = useState(() => Math.floor(value.get()));
    useMotionValueEvent(value, "change", (v) => setDisplay(Math.floor(v)));
    return <span>{prefix}{display.toLocaleString()}{suffix}</span>;
}

// ─── Orbiting Icon ────────────────────────────────────────────────────────────
function OrbitIcon({
    item, index, total, orbitProgress, radiusX, radiusY, isMobile,
}: {
    item: typeof ORBIT_ICONS[0];
    index: number;
    total: number;
    orbitProgress: MotionValue<number>;
    radiusX: number;
    radiusY: number;
    isMobile: boolean;
}) {
    const baseAngle = (index / total) * Math.PI * 2;
    const speed = 1 + index * 0.15; // slight speed variation per icon

    const x = useTransform(orbitProgress, (p: number) => {
        const angle = baseAngle + p * Math.PI * 2 * speed;
        return Math.cos(angle) * radiusX;
    });
    const y = useTransform(orbitProgress, (p: number) => {
        const angle = baseAngle + p * Math.PI * 2 * speed;
        return Math.sin(angle) * radiusY;
    });
    const zDepth = useTransform(orbitProgress, (p: number) => {
        const angle = baseAngle + p * Math.PI * 2 * speed;
        return Math.sin(angle); // -1 behind phone, +1 in front
    });
    const opacity = useTransform(zDepth, [-1, -0.3, 0.3, 1], [0.4, 0.7, 0.85, 1]);
    const scale = useTransform(zDepth, [-1, 0, 1], [0.75, 0.9, 1]);
    const zIndex = useTransform(zDepth, [-1, 1], [10, 50]);

    const Icon = item.Icon;
    const size = isMobile ? 40 : 52;

    return (
        <motion.div
            style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                x: useTransform(x, v => v - size / 2),
                y: useTransform(y, v => v - size / 2),
                opacity,
                scale,
                zIndex,
            }}
        >
            <div
                style={{
                    width: size,
                    height: size,
                    borderRadius: 14,
                    background: item.bg,
                    border: `1px solid ${item.color}30`,
                    boxShadow: `0 0 20px ${item.color}15, inset 0 1px 0 rgba(255,255,255,0.06)`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Icon size={isMobile ? 18 : 24} color={item.color} />
            </div>
        </motion.div>
    );
}

// ─── SVG Data Trail ───────────────────────────────────────────────────────────
function DataTrail({
    index, total, orbitProgress, trailOpacity, radiusX, radiusY,
}: {
    index: number;
    total: number;
    orbitProgress: MotionValue<number>;
    trailOpacity: MotionValue<number>;
    radiusX: number;
    radiusY: number;
}) {
    const baseAngle = (index / total) * Math.PI * 2;
    const speed = 1 + index * 0.15;

    const [x1, setX1] = useState(0);
    const [y1, setY1] = useState(0);

    useMotionValueEvent(orbitProgress, "change", (p) => {
        const angle = baseAngle + p * Math.PI * 2 * speed;
        setX1(Math.cos(angle) * radiusX);
        setY1(Math.sin(angle) * radiusY);
    });

    // Animate dash offset for draw-in effect
    const pathLen = Math.sqrt(x1 * x1 + y1 * y1);

    return (
        <motion.svg
            style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                overflow: "visible",
                pointerEvents: "none",
                opacity: trailOpacity,
                zIndex: 20,
            }}
            width={0} height={0}
        >
            <motion.line
                x1={x1} y1={y1} x2={0} y2={0}
                stroke="hsl(4 72% 54% / 0.55)"
                strokeWidth={1}
                strokeDasharray={pathLen}
                strokeDashoffset={0}
                strokeLinecap="round"
                style={{ filter: "blur(0.4px)" }}
            />
        </motion.svg>
    );
}

// ─── Instagram Profile Screen ─────────────────────────────────────────────────
function InstagramScreen({ analyticsProgress }: { analyticsProgress: MotionValue<number> }) {
    const analyticsY = useTransform(analyticsProgress, [0, 1], ["102%", "0%"]);

    return (
        <div className="w-full h-full bg-black rounded-[inherit] overflow-hidden relative flex flex-col select-none">
            {/* Status bar */}
            <div className="flex justify-between items-center px-5 py-2 text-[9px] text-white/80 font-medium shrink-0">
                <span>9:41</span>
                <div className="flex gap-1 items-center">
                    <svg width="14" height="8" viewBox="0 0 14 8" fill="none">
                        <rect x="0" width="3" height="8" rx="1" fill="white" fillOpacity="0.3" />
                        <rect x="4" width="3" height="8" rx="1" fill="white" fillOpacity="0.6" />
                        <rect x="8" width="3" height="8" rx="1" fill="white" />
                        <rect x="12" y="2" width="2" height="4" rx="0.5" fill="white" fillOpacity="0.4" />
                    </svg>
                </div>
            </div>

            {/* IG Top bar */}
            <div className="flex items-center justify-between px-4 pb-2 shrink-0">
                <div className="flex items-center gap-1">
                    <span className="text-white font-bold text-[12px]">{BRAND.handle}</span>
                    <ChevronDown size={12} className="text-white/60" />
                </div>
                <div className="flex gap-3 text-white">
                    <TrendingUp size={18} />
                    <MoreHorizontal size={18} />
                </div>
            </div>

            {/* Profile row */}
            <div className="flex items-start gap-3 px-4 pb-3 shrink-0">
                {/* Avatar */}
                <div className="w-16 h-16 rounded-full p-[2px] bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 shrink-0">
                    <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                        <div className="w-full h-full rounded-full bg-gradient-to-br from-[#c0392b] to-[#911] flex items-center justify-center text-white text-[15px] font-black tracking-tight">
                            SA
                        </div>
                    </div>
                </div>
                {/* Stats */}
                <div className="flex gap-3 flex-1 text-center pt-1">
                    {[["124", "Posts"], ["524k", "Followers"], ["1.4k", "Following"]].map(([num, lbl]) => (
                        <div key={lbl} className="flex-1">
                            <p className="text-white font-bold text-[11px]">{num}</p>
                            <p className="text-white/40 text-[8px] uppercase tracking-tight">{lbl}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Bio */}
            <div className="px-4 pb-2 shrink-0">
                <p className="text-white text-[10px] font-semibold">{BRAND.name}</p>
                <p className="text-white/50 text-[8px]">{BRAND.category}</p>
                <p className="text-white/80 text-[10px] mt-0.5">{BRAND.bio}</p>
                <p className="text-[#0095f6] text-[10px] mt-0.5">🔗 {BRAND.link}</p>
            </div>

            {/* Action buttons */}
            <div className="flex gap-1.5 px-4 pb-2 shrink-0">
                <div className="flex-1 h-6 bg-white/10 rounded-md flex items-center justify-center text-[9px] font-semibold text-white">Edit profile</div>
                <div className="flex-1 h-6 bg-white/10 rounded-md flex items-center justify-center text-[9px] font-semibold text-white">Share profile</div>
                <div className="w-6 h-6 bg-white/10 rounded-md flex items-center justify-center"><UserPlus size={10} className="text-white" /></div>
            </div>

            {/* Highlights */}
            <div className="flex gap-3 px-4 pb-2 overflow-x-hidden shrink-0">
                {HIGHLIGHTS.map((h) => (
                    <div key={h} className="flex flex-col items-center gap-0.5 shrink-0">
                        <div className="w-10 h-10 rounded-full border border-white/20 bg-white/5 flex items-center justify-center">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#c0392b]/60 to-black flex items-center justify-center text-[5px] text-white/70 font-bold uppercase text-center leading-tight">{h[0]}</div>
                        </div>
                        <span className="text-[7px] text-white/50">{h}</span>
                    </div>
                ))}
            </div>

            {/* Grid tabs */}
            <div className="flex border-t border-white/10 shrink-0">
                {[Grid, Play, MessageCircle].map((Icon, i) => (
                    <div key={i} className={`flex-1 flex items-center justify-center py-1.5 ${i === 0 ? "border-b border-white" : ""}`}>
                        <Icon size={13} className={i === 0 ? "text-white" : "text-white/30"} />
                    </div>
                ))}
            </div>

            {/* Post grid */}
            <div className="grid grid-cols-3 gap-px flex-1 min-h-0 overflow-hidden">
                {POST_GRID.map((p, i) => (
                    <div key={i} className={`relative bg-gradient-to-br ${p.bg} flex flex-col items-start justify-end p-1 aspect-square`}>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-4 h-0.5 rounded-full" style={{ backgroundColor: p.accent + "80" }} />
                        </div>
                        <p className="text-[6px] font-bold leading-tight z-10 text-white/90">{p.label}</p>
                        <p className="text-[5px] text-white/40 z-10">{p.sub}</p>
                        {i % 3 === 0 && <Play size={6} className="absolute top-1 right-1 text-white/60" />}
                    </div>
                ))}
            </div>

            {/* Analytics overlay — slides up at scroll > 60% */}
            <motion.div
                style={{ y: analyticsY }}
                className="absolute inset-x-0 bottom-0 bg-[#0a0a0a] border-t border-white/10 rounded-t-2xl p-3 z-40 shadow-2xl"
            >
                <div className="flex items-center justify-between mb-2">
                    <span className="text-white text-[10px] font-bold">Professional Dashboard</span>
                    <ArrowUpRight size={12} className="text-[#c0392b]" />
                </div>

                {/* Metrics grid */}
                <div className="grid grid-cols-2 gap-1.5 mb-2">
                    {[
                        { icon: Eye, label: "Reach", val: "524.8k" },
                        { icon: Users, label: "Profile Visits", val: "12,400" },
                        { icon: Link2, label: "Link Taps", val: "3,241" },
                        { icon: Heart, label: "Engagement", val: "6.8%" },
                    ].map(({ icon: Icon, label, val }) => (
                        <div key={label} className="bg-white/5 rounded-lg px-2 py-1.5 border border-white/8">
                            <div className="flex items-center gap-1 mb-0.5">
                                <Icon size={8} className="text-white/40" />
                                <span className="text-[7px] text-white/40">{label}</span>
                            </div>
                            <p className="text-white text-[10px] font-bold">{val}</p>
                        </div>
                    ))}
                </div>

                {/* Mini bar chart */}
                <div className="bg-white/5 rounded-lg p-2 border border-white/8">
                    <div className="flex items-center justify-between mb-1">
                        <span className="text-[7px] text-white/50">30-day reach</span>
                        <BarChart3 size={8} className="text-[#c0392b]" />
                    </div>
                    <div className="flex items-end gap-px h-8">
                        {[35, 48, 42, 61, 55, 72, 68, 80, 75, 90, 85, 100, 95, 88].map((h, i) => (
                            <motion.div
                                key={i}
                                className="flex-1 rounded-t-[1px]"
                                style={{ background: `hsl(4 72% ${44 + h * 0.14}%)`, opacity: 0.7 + h * 0.003 }}
                                initial={{ height: 0 }}
                                animate={{ height: `${h}%` }}
                                transition={{ delay: i * 0.05, duration: 0.6, ease: "easeOut" }}
                            />
                        ))}
                    </div>
                </div>
            </motion.div>

            {/* Bottom nav */}
            <div className="flex justify-around px-4 py-1.5 border-t border-white/10 bg-black shrink-0">
                {[Grid, Play, Share2, Users, MessageCircle].map((Icon, i) => (
                    <Icon key={i} size={14} className={i === 0 ? "text-white" : "text-white/25"} />
                ))}
            </div>
        </div>
    );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function MarketingDNA() {
    const containerRef = useRef<HTMLDivElement>(null);
    const isMobile = useIsMobile();

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    // Smooth orbit progress: starts moving at scroll 0.2
    const rawOrbit = useTransform(scrollYProgress, [0.2, 1.0], [0, 1]);
    const orbitProgress = useSpring(rawOrbit, { stiffness: 40, damping: 20 });

    // Data trails: visible from scroll 0.4 → 0.75
    const trailOpacity = useTransform(scrollYProgress, [0.38, 0.45, 0.7, 0.78], [0, 1, 1, 0]);

    // Analytics panel: slides up from scroll 0.65 → 1.0
    const analyticsProgress = useTransform(scrollYProgress, [0.65, 0.9], [0, 1]);
    const smoothAnalytics = useSpring(analyticsProgress, { stiffness: 50, damping: 20 });

    // KPI counters
    const reachCount = useTransform(scrollYProgress, [0.55, 0.95], [219000, 524800]);
    const followerCount = useTransform(scrollYProgress, [0.5, 0.9], [162000, 524800]);

    // Phone idle float
    const phoneFloat = useMotionValue(0);

    // Subtle reactor glow at end
    const reactorScale = useTransform(scrollYProgress, [0.82, 0.9, 1], [1, 1.6, 1]);
    const reactorOpacity = useTransform(scrollYProgress, [0.82, 0.88, 1], [0, 0.2, 0]);

    const radiusX = isMobile ? 100 : 155;
    const radiusY = isMobile ? 52 : 80;

    // Phone dimensions
    const phoneW = isMobile ? 180 : 240;
    const phoneH = isMobile ? 364 : 490;

    return (
        <section
            ref={containerRef}
            className="relative py-24 sm:py-36 md:py-56 overflow-hidden bg-[#050505]"
        >
            {/* Ambient background glow */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[160px]" />
            </div>

            <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

                    {/* ── Left: Copy + KPIs ─────────────────────────────────────── */}
                    <div className="flex-1 text-center lg:text-left z-20">
                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] uppercase tracking-widest font-bold mb-6"
                        >
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                            </span>
                            Proprietary Engine v3.0
                        </motion.div>

                        {/* Headline */}
                        <motion.h2
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-4xl sm:text-6xl md:text-7xl font-bold mb-6 tracking-tighter leading-[0.95]"
                        >
                            Marketing In Our{" "}
                            <br />
                            <span className="text-foreground/35 italic font-light">Very</span>{" "}
                            <br />
                            <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/50 bg-clip-text text-transparent">
                                Digital DNA
                            </span>
                        </motion.h2>

                        {/* Body */}
                        <motion.p
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-muted-foreground text-base sm:text-lg max-w-md mx-auto lg:mx-0 leading-relaxed font-light mb-10"
                        >
                            We analyse the DNA of viral moments to build reliable growth engines.
                            Our neural pathing turns raw engagement into engineered, compounding results.
                        </motion.p>

                        {/* KPIs */}
                        <div className="grid grid-cols-2 gap-8 max-w-xs mx-auto lg:mx-0 border-t border-white/5 pt-8">
                            {[
                                { val: reachCount, label: "Reach Engineered", prefix: "+" },
                                { val: followerCount, label: "Network Growth", prefix: "+" },
                            ].map((stat, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.15 + i * 0.1 }}
                                >
                                    <p className="text-2xl sm:text-3xl font-bold tracking-tighter text-foreground">
                                        <StatCounter value={stat.val} prefix={stat.prefix} />
                                    </p>
                                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground mt-1">
                                        {stat.label}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* ── Right: Phone + Orbit ──────────────────────────────────── */}
                    <div
                        className="flex-1 relative flex items-center justify-center"
                        style={{
                            minHeight: isMobile ? 440 : 600,
                            maxWidth: isMobile ? "100%" : 560,
                            width: "100%",
                        }}
                    >
                        {/* Subtle reactor glow */}
                        <motion.div
                            style={{
                                scale: reactorScale,
                                opacity: reactorOpacity,
                                position: "absolute",
                                width: 300,
                                height: 300,
                                borderRadius: "50%",
                                background: "hsl(4 72% 54%)",
                                filter: "blur(80px)",
                                zIndex: 0,
                                top: "50%",
                                left: "50%",
                                x: "-50%",
                                y: "-50%",
                                pointerEvents: "none",
                            }}
                        />

                        {/* Orbit icons */}
                        <div className="absolute" style={{ top: "50%", left: "50%", zIndex: 1 }}>
                            {ORBIT_ICONS.map((item, i) => (
                                <OrbitIcon
                                    key={item.label}
                                    item={item}
                                    index={i}
                                    total={ORBIT_ICONS.length}
                                    orbitProgress={orbitProgress}
                                    radiusX={radiusX}
                                    radiusY={radiusY}
                                    isMobile={isMobile}
                                />
                            ))}
                        </div>

                        {/* SVG data trails */}
                        <div className="absolute" style={{ top: "50%", left: "50%", zIndex: 15, overflow: "visible" }}>
                            {ORBIT_ICONS.map((_, i) => (
                                <DataTrail
                                    key={i}
                                    index={i}
                                    total={ORBIT_ICONS.length}
                                    orbitProgress={orbitProgress}
                                    trailOpacity={trailOpacity}
                                    radiusX={radiusX}
                                    radiusY={radiusY}
                                />
                            ))}
                        </div>

                        {/* Phone mockup */}
                        <motion.div
                            style={{ zIndex: 30, position: "relative" }}
                            animate={{ y: [0, -8, 0] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <motion.div
                                style={{
                                    width: phoneW,
                                    height: phoneH,
                                    borderRadius: isMobile ? 36 : 46,
                                    background: "#0e0e0e",
                                    border: "10px solid #1a1a1a",
                                    boxShadow: `
                                        0 0 0 1px rgba(255,255,255,0.06),
                                        0 40px 100px rgba(0,0,0,0.8),
                                        0 0 60px rgba(192,57,43,0.08),
                                        inset 0 1px 0 rgba(255,255,255,0.08)
                                    `,
                                    position: "relative",
                                    overflow: "hidden",
                                    rotateX: 6,
                                    rotateY: isMobile ? 0 : -18,
                                    transformStyle: "preserve-3d",
                                }}
                            >
                                {/* Notch */}
                                <div style={{
                                    position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
                                    width: "40%", height: 24, background: "#0e0e0e",
                                    borderBottomLeftRadius: 16, borderBottomRightRadius: 16, zIndex: 60,
                                    border: "1px solid rgba(255,255,255,0.04)", borderTop: "none",
                                }} />

                                {/* Glass glare */}
                                <div style={{
                                    position: "absolute", top: 0, left: "-20%", width: "45%", height: "100%",
                                    background: "linear-gradient(115deg, rgba(255,255,255,0.04) 0%, transparent 60%)",
                                    zIndex: 55, pointerEvents: "none", borderRadius: "inherit",
                                }} />

                                {/* Screen content */}
                                <div style={{
                                    position: "absolute", inset: 0, borderRadius: isMobile ? 26 : 36,
                                    overflow: "hidden",
                                }}>
                                    <InstagramScreen analyticsProgress={smoothAnalytics} />
                                </div>

                                {/* Rim light */}
                                <div style={{
                                    position: "absolute", inset: -1, borderRadius: "inherit",
                                    border: "1px solid rgba(255,255,255,0.09)",
                                    pointerEvents: "none", zIndex: 65,
                                }} />
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
