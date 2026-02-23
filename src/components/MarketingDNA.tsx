import { motion, useScroll, useTransform, useSpring, useMotionValue, useAnimationFrame } from "framer-motion";
import { useRef, useState, useEffect } from "react";
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
    ArrowUpRight
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
    const reachCount = useTransform(scrollYProgress, [0.3, 0.9], [1240, 142800]);
    const profileVisits = useTransform(scrollYProgress, [0.4, 0.95], [450, 12600]);
    const followerGrowth = useTransform(scrollYProgress, [0.2, 0.8], [80, 2400]);

    const chartPathLength = useTransform(scrollYProgress, [0.3, 0.8], [0, 1]);

    return (
        <section
            ref={containerRef}
            className="relative py-24 sm:py-32 md:py-48 overflow-hidden bg-[#050505]"
            style={{ perspective: "1500px" }}
        >
            {/* Background Data Particles */}
            <div className="absolute inset-0 pointer-events-none opacity-20">
                {[...Array(25)].map((_, i) => (
                    <motion.div
                        key={i}
                        style={{
                            position: 'absolute',
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            width: '1px',
                            height: '60px',
                            background: 'linear-gradient(to bottom, transparent, hsl(var(--primary)), transparent)',
                            y: useTransform(scrollYProgress, [0, 1], [0, (i % 2 === 0 ? 400 : -400)]),
                        }}
                    />
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
                            Engineered for Virality
                        </motion.div>

                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-4xl sm:text-6xl md:text-7xl font-bold mb-8 tracking-tighter leading-[0.95]"
                        >
                            Data-Driven <br />
                            <span className="text-secondary-foreground/40 italic font-light">meets</span> <br />
                            <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/50 bg-clip-text text-transparent">Creative Mastery</span>
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-muted-foreground text-lg sm:text-xl max-w-xl mx-auto lg:mx-0 leading-relaxed font-light mb-10"
                        >
                            We analyze the DNA of viral moments to build reliable growth engines. Every revolving icon represents a data stream being processed into tangible ROI.
                        </motion.p>

                        <div className="grid grid-cols-2 gap-8 max-w-md mx-auto lg:mx-0 border-t border-white/5 pt-10">
                            {[
                                { val: reachCount, label: "Reach Engineered", prefix: "+", suffix: "" },
                                { val: followerGrowth, label: "New Leads", prefix: "+", suffix: "" },
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
                        className="flex-1 relative h-[500px] sm:h-[700px] w-full max-w-[600px] flex items-center justify-center pt-20"
                        style={{ transformStyle: "preserve-3d" }}
                    >
                        {/* Premium Phone Frame */}
                        <motion.div
                            style={{
                                y: smoothPhoneY,
                                transformStyle: "preserve-3d",
                                rotateX: 10,
                                rotateY: -15,
                                translateZ: "50px"
                            }}
                            className="relative z-30 w-[170px] h-[340px] sm:w-[240px] sm:h-[480px] bg-[#080808] rounded-[3.5rem] border-[8px] border-[#1a1a1a] shadow-[0_0_80px_rgba(var(--primary-rgb),0.2)] flex items-center justify-center p-2.5"
                        >
                            {/* Bezel Polish */}
                            <div className="absolute inset-0 rounded-[3rem] border border-white/10 pointer-events-none" />
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-b-2xl z-50 border-x border-b border-white/10" />

                            {/* Instagram UI Screen Content */}
                            <div className="w-full h-full bg-[#000] rounded-[2.8rem] overflow-hidden relative border border-white/5 flex flex-col font-sans">
                                {/* Header */}
                                <div className="pt-8 px-4 pb-2 border-b border-white/5 flex justify-between items-center bg-black/40 backdrop-blur-md sticky top-0 z-10">
                                    <div className="text-[10px] font-bold text-white tracking-tight">insights_dashboard</div>
                                    <ArrowUpRight className="w-3 h-3 text-primary" />
                                </div>

                                <div className="flex-1 overflow-hidden p-4 space-y-5">
                                    {/* Stats Grid */}
                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="glass-card border-white/10 p-3 flex flex-col justify-center">
                                            <p className="text-[8px] uppercase tracking-tighter text-muted-foreground mb-1">Reach</p>
                                            <p className="text-xs font-bold text-primary"><StatCounter value={reachCount} /></p>
                                        </div>
                                        <div className="glass-card border-white/10 p-3 flex flex-col justify-center">
                                            <p className="text-[8px] uppercase tracking-tighter text-muted-foreground mb-1">Followers</p>
                                            <p className="text-xs font-bold text-white"><StatCounter value={followerGrowth} prefix="+" /></p>
                                        </div>
                                    </div>

                                    {/* Growth Chart */}
                                    <div className="relative h-24 sm:h-32 glass-card border-white/10 p-3 overflow-hidden">
                                        <div className="flex justify-between items-center mb-2">
                                            <p className="text-[8px] font-medium text-white/50">Engagement Velocity</p>
                                            <TrendingUp className="w-2.5 h-2.5 text-primary" />
                                        </div>
                                        <svg className="w-full h-full overflow-visible" viewBox="0 0 100 40">
                                            <motion.path
                                                d="M0 35 Q 25 35, 40 25 T 70 15 T 100 5"
                                                fill="transparent"
                                                stroke="hsl(var(--primary))"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                style={{ pathLength: chartPathLength }}
                                            />
                                            <motion.path
                                                d="M0 35 Q 25 35, 40 25 T 70 15 T 100 5"
                                                fill="transparent"
                                                stroke="hsl(var(--primary))"
                                                strokeWidth="8"
                                                strokeOpacity="0.1"
                                                strokeLinecap="round"
                                                style={{ pathLength: chartPathLength }}
                                            />
                                        </svg>
                                    </div>

                                    {/* Interaction Feed */}
                                    <div className="space-y-3 pt-2">
                                        {[
                                            { Icon: Heart, label: "Likes Growing", color: "text-red-500" },
                                            { Icon: MessageCircle, label: "Deep Engagement", color: "text-blue-400" },
                                            { Icon: Users, label: "Audience Pipeline", color: "text-green-400" }
                                        ].map((item, i) => (
                                            <motion.div
                                                key={i}
                                                style={{ opacity: useTransform(scrollYProgress, [0.4 + (i * 0.1), 0.6 + (i * 0.1)], [0, 1]) }}
                                                className="flex items-center gap-2 border-b border-white/5 pb-2"
                                            >
                                                <div className={`p-1 rounded bg-white/5`}>
                                                    <item.Icon className={`w-2.5 h-2.5 ${item.color}`} />
                                                </div>
                                                <p className="text-[9px] text-white/70 font-medium">{item.label}</p>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>

                                {/* Bottom Navigation */}
                                <div className="h-10 border-t border-white/5 flex items-center justify-around px-4 bg-black/40 backdrop-blur-md">
                                    {[...Array(4)].map((_, i) => (
                                        <div key={i} className="w-1.5 h-1.5 rounded-full bg-white/20" />
                                    ))}
                                </div>
                            </div>
                        </motion.div>

                        {/* Revolving "Data Stream" Helix */}
                        <div
                            className="absolute inset-0 flex items-center justify-center pointer-events-none"
                            style={{ transformStyle: "preserve-3d" }}
                        >
                            {socialIcons.map((item, i) => {
                                const angle = (i / socialIcons.length) * Math.PI * 2;

                                return (
                                    <motion.div
                                        key={i}
                                        style={{
                                            x: useTransform(smoothRotation, (r) => Math.cos(angle + (r * Math.PI) / 180) * helixRadius.get()),
                                            y: useTransform(smoothRotation, (r) => Math.sin(angle + (r * Math.PI) / 180) * helixRadius.get() + Math.sin(angle) * 80),
                                            scale: useTransform(scrollYProgress, [0.6, 0.9], [1.1, 0.3]),
                                            translateZ: useTransform(smoothRotation, (r) => Math.cos(angle + (r * Math.PI) / 180) * 180),
                                            opacity: useTransform(scrollYProgress, [0.7, 0.95], [1, 0]),
                                        }}
                                        className="absolute w-12 h-12 sm:w-16 sm:h-16 rounded-2xl glass-card gradient-border flex items-center justify-center text-primary shadow-2xl backdrop-blur-md z-40"
                                    >
                                        <item.Icon className={`w-6 h-6 sm:w-8 sm:h-8 ${item.color}`} />

                                        {/* Dynamic Connection Path */}
                                        <motion.div
                                            style={{
                                                height: useTransform(scrollYProgress, [0, 1], ["100px", "0px"]),
                                                opacity: useTransform(scrollYProgress, [0.3, 0.7], [0.3, 0])
                                            }}
                                            className="absolute w-[1px] bg-gradient-to-t from-primary/60 to-transparent -top-full left-1/2 -track-x-1/2"
                                        />
                                    </motion.div>
                                );
                            })}
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
