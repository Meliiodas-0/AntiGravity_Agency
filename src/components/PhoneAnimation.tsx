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
    Users, Share2
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
    { Icon: Instagram, color: "#E4405F", bg: "#f0f0f0" },
    { Icon: Twitter, color: "#1DA1F2", bg: "#f0f0f0" },
    { Icon: Linkedin, color: "#0A66C2", bg: "#f0f0f0" },
    { Icon: Youtube, color: "#FF0000", bg: "#f0f0f0" },
];

// ─── Post Grid ────────────────────────────────────────────────────────────────
const POST_GRID = [
    { bg: "from-[#f0f0f0] to-[#ffffff]", accent: "#000000", label: "300K REACH", reel: true },
    { bg: "from-[#ffffff] to-[#f9f9f9]", accent: "#aaa", label: "Ad Creative", reel: false },
    { bg: "from-[#f0f9ff] to-[#ffffff]", accent: "#007bff", label: "Client Win", reel: false },
    { bg: "from-[#f9f9f9] to-[#ffffff]", accent: "#bbb", label: "Brand Shoot", reel: false },
    { bg: "from-[#fff0f5] to-[#ffffff]", accent: "#ff007f", label: "CASE STUDY", reel: true },
    { bg: "from-[#f5f5ff] to-[#f9f9f9]", accent: "#ccc", label: "BTS", reel: false },
    { bg: "from-[#ffffff] to-[#f9f9f9]", accent: "#000000", label: "Motion", reel: true },
    { bg: "from-[#effdf5] to-[#ffffff]", accent: "#10b981", label: "+220k Reach", reel: false },
    { bg: "from-[#ffffff] to-[#f9f9f9]", accent: "#aaa", label: "Interview", reel: false },
];

const HIGHLIGHTS = ["Results", "Clients", "Reels", "Ads", "BTS"];

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
    const x = useTransform(orbitProgress, (p: number) => Math.cos(baseAngle + p * Math.PI * 2) * radiusX);
    const y = useTransform(orbitProgress, (p: number) => Math.sin(baseAngle + p * Math.PI * 2) * radiusY);
    const sinAngle = useTransform(orbitProgress, (p: number) => Math.sin(baseAngle + p * Math.PI * 2));
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

// ─── DataTrail ─────────────────────────────────────────────────────────────
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
                background: "linear-gradient(to right, rgba(0,0,0,0.15), transparent)",
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
        <div className="w-full h-full bg-black flex flex-col overflow-hidden select-none text-white antialiased">
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

            <div className="flex items-center gap-3 px-3 pb-2 shrink-0">
                <div className="w-14 h-14 rounded-full p-[2px] bg-gradient-to-tr from-[#000000] via-[#555555] to-[#000000] shrink-0">
                    <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                        <div className="w-full h-full rounded-full bg-gradient-to-br from-[#f0f0f0] to-[#ffffff] flex items-center justify-center text-[12px] font-black text-black">
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

            <div className="px-4 pb-2 shrink-0 space-y-[3px]">
                <p className="font-semibold text-[12px] sm:text-[14px]">{BRAND.name}</p>
                <p className="text-white/50 text-[9px] sm:text-[11px] font-medium">{BRAND.category}</p>
                <p className="text-white/80 text-[10px] sm:text-[12px] leading-tight">{BRAND.bio}</p>
                <p className="text-[#0095f6] text-[10px] sm:text-[12px] font-medium">🔗 {BRAND.link}</p>
            </div>

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

            <div className="flex gap-2 px-4 pb-3 shrink-0">
                {["Edit profile", "Share profile"].map(t => (
                    <div key={t} className="flex-1 h-6 sm:h-7 bg-white/10 rounded-lg text-[10px] sm:text-[11px] font-semibold flex items-center justify-center border border-white/5">{t}</div>
                ))}
                <div className="w-6 h-6 sm:w-7 sm:h-7 bg-white/10 rounded-lg flex items-center justify-center border border-white/5">
                    <UserPlus size={isMobile ? 11 : 12} />
                </div>
            </div>

            <div className="flex gap-3 px-4 pb-3 overflow-x-hidden shrink-0">
                {HIGHLIGHTS.map(h => (
                    <div key={h} className="flex flex-col items-center gap-1 shrink-0">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-black/10 bg-gradient-to-br from-[#f0f0f0] to-white flex items-center justify-center text-[9px] sm:text-[10px] font-bold text-black shadow-sm">
                            {h[0]}
                        </div>
                        <span className="text-[8px] sm:text-[9px] text-white/40 font-medium">{h}</span>
                    </div>
                ))}
            </div>

            <div className="flex border-t border-white/10 shrink-0">
                {[Grid, Play, MessageCircle].map((Icon, i) => (
                    <div key={i} className={`flex-1 flex items-center justify-center py-1 ${i === 0 ? "border-b border-white" : ""}`}>
                        <Icon size={11} className={i === 0 ? "text-white" : "text-white/25"} />
                    </div>
                ))}
            </div>

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

            <div className="flex justify-around px-3 py-1 border-t border-white/10 bg-black shrink-0">
                {[Grid, Play, Share2, Users, MessageCircle].map((Icon, i) => (
                    <Icon key={i} size={12} className={i === 0 ? "text-white" : "text-white/20"} />
                ))}
            </div>
        </div>
    );
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function PhoneAnimation() {
    const containerRef = useRef<HTMLDivElement>(null);
    const isMobile = useIsMobile();
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

    const rawOrbit = useTransform(scrollYProgress, [0.1, 0.9], [0, 1]);
    const orbitProgress = useSpring(rawOrbit, { stiffness: 40, damping: 25 });
    const trailOpacity = useTransform(scrollYProgress, [0.2, 0.3, 0.7, 0.8], [0, 1, 1, 0]);

    // Scale down phone on scroll to make room for text below
    const phoneScale = useTransform(scrollYProgress, [0.7, 1], [1, 0.85]);

    const phoneW = isMobile ? 240 : 280;
    const phoneH = isMobile ? 480 : 560;
    const radiusX = isMobile ? 180 : 240;
    const radiusY = isMobile ? 80 : 100;
    const iconSize = isMobile ? 48 : 56;
    const activeIcons = isMobile ? ORBIT_ICONS.slice(0, 3) : ORBIT_ICONS;

    return (
        <div ref={containerRef} className="relative w-full flex items-center justify-center overflow-visible py-12 sm:py-20">
            <div className="relative" style={{ minHeight: phoneH }}>
                {/* Orbit anchor */}
                <div style={{ position: "absolute", top: "50%", left: "50%", zIndex: 1 }}>
                    {activeIcons.map((item, i) => (
                        <OrbitIcon
                            key={item.color}
                            item={item} index={i} total={activeIcons.length}
                            orbitProgress={orbitProgress}
                            radiusX={radiusX} radiusY={radiusY} iconSize={iconSize}
                        />
                    ))}
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
                    style={{ position: "relative", zIndex: 30, scale: phoneScale }}
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                >
                    <div style={{
                        width: phoneW, height: phoneH,
                        borderRadius: isMobile ? 32 : 40,
                        background: "#050505",
                        border: "8px solid #141414",
                        boxShadow: `0 30px 60px rgba(0,0,0,0.12), inset 0 0 0 1px rgba(255,255,255,0.05)`,
                        position: "relative",
                        transform: `perspective(1200px) rotateX(4deg) rotateY(-8deg)`,
                        overflow: "hidden",
                    }}>
                        <InstagramScreen />
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
