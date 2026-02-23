import { motion, useScroll, useTransform, useSpring, useMotionValue, useAnimationFrame } from "framer-motion";
import { useRef, useState, useEffect, useMemo } from "react";
import {
    Smartphone,
    Instagram,
    Youtube,
    Facebook,
    Linkedin,
    Twitter,
    Music2,
    TrendingUp,
    Users,
    Eye,
    Heart,
    MessageCircle,
    ArrowUpRight,
    MoreHorizontal,
    Grid,
    UserPlus,
    ChevronDown,
    Play
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const socialIcons = [
    { Icon: Instagram, color: "text-[#E4405F]", label: "Instagram" },
    { Icon: Music2, color: "text-[#000000]", label: "TikTok" },
    { Icon: Youtube, color: "text-[#FF0000]", label: "YouTube" },
    { Icon: Facebook, color: "text-[#1877F2]", label: "Meta" },
    { Icon: Twitter, color: "text-[#1DA1F2]", label: "X" },
    { Icon: Linkedin, color: "text-[#0A66C2]", label: "LinkedIn" },
];

function StatCounter({ value, suffix = "", prefix = "" }: { value: any, suffix?: string, prefix?: string }) {
    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
        return value.on("change", (latest: number) => {
            setDisplayValue(Math.floor(latest));
        });
    }, [value]);

    return <span>{prefix}{displayValue.toLocaleString()}{suffix}</span>;
}

export default function MarketingDNA() {
    const containerRef = useRef<HTMLDivElement>(null);
    const isMobile = useIsMobile();

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    // Helix & Data Stream Controls
    const rotation = useTransform(scrollYProgress, [0, 1], [0, 720]);
    const smoothRotation = useSpring(rotation, { stiffness: 60, damping: 25 });

    // Social Icon "Absorption" path
    const helixRadius = useTransform(scrollYProgress, [0, 0.4, 0.7, 1], [isMobile ? 120 : 180, isMobile ? 100 : 150, 40, 10]);
    const phoneY = useTransform(scrollYProgress, [0, 1], [100, -100]);
    const smoothPhoneY = useSpring(phoneY, { stiffness: 60, damping: 25 });

    // Animated Insights Metrics
    const reachCount = useTransform(scrollYProgress, [0.3, 0.9], [1240, 852400]);
    const profileVisits = useTransform(scrollYProgress, [0.4, 0.95], [450, 15600]);
    const followerGrowth = useTransform(scrollYProgress, [0.2, 0.8], [240, 524800]);

    const chartPathLength = useTransform(scrollYProgress, [0.3, 0.8], [0, 1]);

    return (
        <section
            ref={containerRef}
            className="relative py-24 sm:py-32 md:py-48 overflow-hidden bg-[#050505]"
            style={{ perspective: "2000px" }}
        >
            {/* Background Data Particles */}
            <div className="absolute inset-0 pointer-events-none opacity-20">
                {[...Array(25)].map((_, i) => (
                    <DataParticle key={i} i={i} scrollYProgress={scrollYProgress} />
                ))}
            </div>

            <div className="max-w-7xl mx-auto px-5 sm:px-6 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-32">

                    {/* Storytelling Side */}
                    <div className="flex-1 text-center lg:text-left">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] uppercase tracking-widest font-bold mb-6"
                        >
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                            </span>
                            Proprietary Engine v3.0
                        </motion.div>

                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-4xl sm:text-6xl md:text-7xl font-bold mb-8 tracking-tighter leading-[0.95]"
                        >
                            Marketing In Our <br />
                            <span className="text-secondary-foreground/40 italic font-light">Very</span> <br />
                            <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/50 bg-clip-text text-transparent">Digital DNA</span>
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-muted-foreground text-lg sm:text-xl max-w-xl mx-auto lg:mx-0 leading-relaxed font-light mb-10"
                        >
                            We analyze the DNA of viral moments to build reliable growth engines. Our neural pathing turns raw engagement into engineered, compounding growth.
                        </motion.p>

                        <div className="grid grid-cols-2 gap-8 max-w-md mx-auto lg:mx-0 border-t border-white/5 pt-10">
                            {[
                                { val: reachCount, label: "Reach Engineered", prefix: "+", suffix: "" },
                                { val: followerGrowth, label: "Network Effect", prefix: "+", suffix: "" },
                            ].map((stat, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.2 + (i * 0.1) }}
                                >
                                    <p className="text-3xl font-bold tracking-tighter text-foreground">
                                        <StatCounter value={stat.val} prefix={stat.prefix} suffix={stat.suffix} />
                                    </p>
                                    <p className="text-xs uppercase tracking-widest text-muted-foreground mt-1">{stat.label}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Integrated 3D Helix Side */}
                    <div
                        className="flex-1 relative h-[600px] sm:h-[800px] w-full max-w-[600px] flex items-center justify-center pt-20"
                        style={{ transformStyle: "preserve-3d" }}
                    >
                        {/* Premium Phone Frame - SHARPENED PRECISION */}
                        <motion.div
                            style={{
                                y: smoothPhoneY,
                                transformStyle: "preserve-3d",
                                rotateX: 15,
                                rotateY: -22,
                                translateZ: "80px"
                            }}
                            className="relative z-30 w-[200px] h-[400px] sm:w-[280px] sm:h-[560px] bg-[#0c0c0c] rounded-[4.2rem] border-[12px] border-[#151515] shadow-[0_40px_100px_rgba(0,0,0,0.8),0_0_80px_rgba(var(--primary-rgb),0.15)] flex items-center justify-center p-2.5 transition-shadow duration-500"
                        >
                            {/* Inner Bezel Polish */}
                            <div className="absolute inset-[-2px] rounded-[3.8rem] border border-white/10 pointer-events-none" />
                            <div className="absolute inset-[-6px] rounded-[4rem] border border-white/5 pointer-events-none" />
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-8 bg-black rounded-b-[2.5rem] z-50 border-x border-b border-white/10 shadow-inner" />

                            {/* Instagram UI Screen Content */}
                            <div className="w-full h-full bg-[#000] rounded-[3.2rem] overflow-hidden relative border border-white/5 flex flex-col font-sans select-none shadow-2xl">
                                {/* Status Bar */}
                                <div className="h-10 px-8 flex justify-between items-center text-[10px] text-white/90">
                                    <span className="font-semibold">9:41</span>
                                    <div className="flex gap-1.5 items-center">
                                        <div className="w-4 h-4 rounded-sm border-[1px] border-white/30 flex items-center justify-center">
                                            <div className="w-2 h-2 bg-white/10 rounded-full" />
                                        </div>
                                        <div className="w-5 h-2.5 bg-white rounded-[2px]" />
                                    </div>
                                </div>

                                {/* Instagram Profile Header */}
                                <div className="px-5 pb-5 space-y-4">
                                    <div className="flex justify-between items-center text-white">
                                        <div className="flex items-center gap-1.5">
                                            <span className="font-bold text-sm tracking-tight">antigravity.agency</span>
                                            <ChevronDown className="w-3.5 h-3.5 text-white/60" />
                                        </div>
                                        <div className="flex gap-4">
                                            <TrendingUp className="w-6 h-6" />
                                            <MoreHorizontal className="w-6 h-6" />
                                        </div>
                                    </div>

                                    {/* Profile Stats */}
                                    <div className="flex items-center justify-between gap-2 pt-2">
                                        <div className="relative">
                                            <div className="w-18 h-18 sm:w-22 sm:h-22 rounded-full p-[3px] bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 shadow-lg shadow-primary/20">
                                                <div className="w-full h-full rounded-full bg-black border-[3px] border-black flex items-center justify-center overflow-hidden">
                                                    <div className="w-full h-full bg-primary/20 flex items-center justify-center font-bold text-primary text-lg">AG</div>
                                                </div>
                                            </div>
                                            <div className="absolute bottom-0 right-0 w-7 h-7 bg-[#0095f6] rounded-full border-[3px] border-black flex items-center justify-center shadow-md">
                                                <span className="text-white text-sm font-bold">+</span>
                                            </div>
                                        </div>
                                        <div className="flex gap-4 sm:gap-7 flex-1 justify-center text-center">
                                            <div>
                                                <p className="font-bold text-base text-white">124</p>
                                                <p className="text-[10px] text-white/50 uppercase tracking-tighter">Posts</p>
                                            </div>
                                            <div>
                                                <p className="font-bold text-base text-white">524k</p>
                                                <p className="text-[10px] text-white/50 uppercase tracking-tighter">Followers</p>
                                            </div>
                                            <div>
                                                <p className="font-bold text-base text-white">1,412</p>
                                                <p className="text-[10px] text-white/50 uppercase tracking-tighter">Following</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Bio */}
                                    <div className="text-[11px] text-white leading-snug">
                                        <p className="font-bold">Antigravity Agency</p>
                                        <p className="text-white/90">Everything digital. Fully handled.</p>
                                        <p className="text-primary font-medium">antigravity.dev</p>
                                    </div>

                                    {/* Buttons */}
                                    <div className="flex gap-2 pt-1">
                                        <div className="flex-1 h-8 bg-white/10 rounded-lg flex items-center justify-center text-[11px] font-bold text-white active:bg-white/20 transition-colors">Edit profile</div>
                                        <div className="flex-1 h-8 bg-white/10 rounded-lg flex items-center justify-center text-[11px] font-bold text-white active:bg-white/20 transition-colors">Share profile</div>
                                        <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center text-white active:bg-white/20 transition-colors"><UserPlus className="w-4 h-4" /></div>
                                    </div>

                                    {/* Professional Dashboard - THE GROWTH ENGINE */}
                                    <motion.div
                                        className="p-4 bg-white/5 rounded-xl border border-white/10 space-y-2.5 shadow-xl"
                                        whileHover={{ scale: 1.02 }}
                                    >
                                        <div className="flex justify-between items-center">
                                            <p className="text-[11px] font-bold text-white tracking-tight">Professional dashboard</p>
                                            <ArrowUpRight className="w-4 h-4 text-primary" />
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-1 h-5 bg-primary rounded-full shadow-[0_0_10px_rgba(var(--primary-rgb),0.5)]" />
                                            <p className="text-[10px] text-white/70 leading-relaxed">
                                                <span className="text-primary font-bold"><StatCounter value={reachCount} /></span> accounts reached in the last 30 days.
                                            </p>
                                        </div>
                                    </motion.div>
                                </div>

                                {/* Dynamic Post Grid */}
                                <div className="border-t border-white/10 pt-1">
                                    <div className="flex justify-around py-2 border-b border-white/10">
                                        <Grid className="w-4 h-4 text-white" />
                                        <Play className="w-4 h-4 text-white/40" />
                                        <MessageCircle className="w-4 h-4 text-white/40" />
                                    </div>
                                    <div className="grid grid-cols-3 gap-[1px]">
                                        {[...Array(9)].map((_, i) => (
                                            <PostGridItem key={i} i={i} scrollYProgress={scrollYProgress} />
                                        ))}
                                    </div>
                                </div>

                                {/* Bottom Navigation */}
                                <div className="mt-auto h-12 border-t border-white/10 flex items-center justify-around px-4 bg-black">
                                    {[...Array(5)].map((_, i) => (
                                        <div key={i} className="w-5 h-5 rounded-sm border border-white/10 flex items-center justify-center">
                                            {i === 0 && <div className="w-2.5 h-2.5 rounded-[1px] border-white/80 border" />}
                                            {i === 2 && <div className="w-3.5 h-3.5 rounded-sm border-white/80 border-2" />}
                                            {i === 4 && <div className="w-4 h-4 rounded-full bg-white/10" />}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>

                        {/* Revolving "Data Stream" Helix */}
                        <div
                            className="absolute inset-0 flex items-center justify-center pointer-events-none"
                            style={{ transformStyle: "preserve-3d" }}
                        >
                            {socialIcons.map((item, i) => (
                                <SocialIconHelix
                                    key={i}
                                    item={item}
                                    i={i}
                                    total={socialIcons.length}
                                    smoothRotation={smoothRotation}
                                    helixRadius={helixRadius}
                                    scrollYProgress={scrollYProgress}
                                />
                            ))}
                        </div>

                        {/* Core Reactor Glow */}
                        <motion.div
                            style={{
                                scale: useTransform(scrollYProgress, [0.4, 0.8], [0.8, 2.5]),
                                opacity: useTransform(scrollYProgress, [0.4, 0.8, 1], [0, 0.25, 0])
                            }}
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary blur-[140px] rounded-full pointer-events-none z-0"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}

function DataParticle({ i, scrollYProgress }: { i: number, scrollYProgress: any }) {
    const left = useMemo(() => `${Math.random() * 100}%`, [i]);
    const top = useMemo(() => `${Math.random() * 100}%`, [i]);
    const yTransform = useTransform(scrollYProgress, [0, 1], [0, (i % 2 === 0 ? 400 : -400)]);

    return (
        <motion.div
            style={{
                position: 'absolute',
                left,
                top,
                width: '1px',
                height: '60px',
                background: 'linear-gradient(to bottom, transparent, hsl(var(--primary)), transparent)',
                y: yTransform,
            }}
        />
    );
}

function PostGridItem({ i, scrollYProgress }: { i: number, scrollYProgress: any }) {
    const opacity = useTransform(scrollYProgress, [0.4 + (i * 0.05), 0.6 + (i * 0.05)], [0, 1]);

    return (
        <motion.div
            style={{ opacity }}
            className="aspect-square bg-white/5 relative group"
        >
            <div className="absolute inset-x-0 bottom-0 top-0 bg-gradient-to-t from-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute top-1 right-1">
                {i % 3 === 0 && <Play className="w-2.5 h-2.5 text-white/80" />}
            </div>
        </motion.div>
    );
}

function SocialIconHelix({ item, i, total, smoothRotation, helixRadius, scrollYProgress }: {
    item: any,
    i: number,
    total: number,
    smoothRotation: any,
    helixRadius: any,
    scrollYProgress: any
}) {
    const angle = (i / total) * Math.PI * 2;

    const x = useTransform(smoothRotation, (r: any) => Math.cos(angle + (r * Math.PI) / 180) * helixRadius.get());
    const y = useTransform(smoothRotation, (r: any) => Math.sin(angle + (r * Math.PI) / 180) * helixRadius.get() + Math.sin(angle) * 80);
    const scale = useTransform(scrollYProgress, [0.6, 0.9], [1.1, 0.3]);
    const translateZ = useTransform(smoothRotation, (r: any) => Math.cos(angle + (r * Math.PI) / 180) * 180);
    const opacity = useTransform(scrollYProgress, [0.7, 0.95], [1, 0]);

    const connHeight = useTransform(scrollYProgress, [0, 1], ["100px", "0px"]);
    const connOpacity = useTransform(scrollYProgress, [0.3, 0.7], [0.3, 0]);

    const Icon = item.Icon;

    return (
        <motion.div
            style={{
                x, y, scale, translateZ, opacity
            }}
            className="absolute w-12 h-12 sm:w-16 sm:h-16 rounded-2xl glass-card gradient-border flex items-center justify-center text-primary shadow-2xl backdrop-blur-md z-40"
        >
            <Icon className={`w-6 h-6 sm:w-8 sm:h-8 ${item.color}`} />

            {/* Dynamic Connection Path */}
            <motion.div
                style={{
                    height: connHeight,
                    opacity: connOpacity
                }}
                className="absolute w-[1px] bg-gradient-to-t from-primary/60 to-transparent -top-full left-1/2 -translate-x-1/2"
            />
        </motion.div>
    );
}
