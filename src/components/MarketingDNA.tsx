import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import {
    Smartphone,
    Instagram,
    Youtube,
    Facebook,
    Linkedin,
    Twitter,
    Music2
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const socialIcons = [
    { Icon: Instagram, color: "text-[#E4405F]", label: "Instagram", delay: 0 },
    { Icon: Music2, color: "text-[#000000]", label: "TikTok", delay: 0.1 },
    { Icon: Youtube, color: "text-[#FF0000]", label: "YouTube", delay: 0.2 },
    { Icon: Facebook, color: "text-[#1877F2]", label: "Meta", delay: 0.3 },
    { Icon: Twitter, color: "text-[#1DA1F2]", label: "X", delay: 0.4 },
    { Icon: Linkedin, color: "text-[#0A66C2]", label: "LinkedIn", delay: 0.5 },
];

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

    // Social Icon "Absorption" path (radius decreases as they flow into phone)
    const helixRadius = useTransform(scrollYProgress, [0, 0.4, 0.7, 1], [isMobile ? 130 : 200, isMobile ? 110 : 160, 40, 20]);
    const phoneY = useTransform(scrollYProgress, [0, 1], [120, -120]);
    const smoothPhoneY = useSpring(phoneY, { stiffness: 60, damping: 25 });

    return (
        <section
            ref={containerRef}
            className="relative py-24 sm:py-32 md:py-48 overflow-hidden bg-[#050505]"
            style={{ perspective: "1200px" }}
        >
            {/* Background Data Particles */}
            <div className="absolute inset-0 pointer-events-none opacity-20">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        style={{
                            position: 'absolute',
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            width: '1px',
                            height: '40px',
                            background: 'linear-gradient(to bottom, transparent, hsl(var(--primary)), transparent)',
                            y: useTransform(scrollYProgress, [0, 1], [0, (i % 2 === 0 ? 300 : -300)]),
                        }}
                    />
                ))}
            </div>

            <div className="max-w-7xl mx-auto px-5 sm:px-6 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-32">

                    {/* Storytelling Side */}
                    <div className="flex-1 text-center lg:text-left">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] uppercase tracking-widest font-bold mb-6"
                        >
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                            </span>
                            Proprietary Engine
                        </motion.div>

                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-4xl sm:text-6xl md:text-7xl font-bold mb-8 tracking-tighter leading-[0.95]"
                        >
                            Digital Strategy <br />
                            <span className="text-secondary-foreground/40 italic font-light">meets</span> <br />
                            <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/50 bg-clip-text text-transparent">Pure Engineering</span>
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-muted-foreground text-lg sm:text-xl max-w-xl mx-auto lg:mx-0 leading-relaxed font-light mb-10"
                        >
                            At Antigravity, marketing isn't just a creative pursuit—it's a high-performance system. We engineer multi-channel loops that feed directly into your growth KPIs, ensuring every click is an investment, not an expense.
                        </motion.p>

                        <div className="grid grid-cols-2 gap-8 max-w-md mx-auto lg:mx-0 border-t border-white/5 pt-10">
                            {[
                                { val: "2.4x", label: "Avg. Engagement" },
                                { val: "15ms", label: "Loop Latency" },
                            ].map((stat, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.2 + (i * 0.1) }}
                                >
                                    <p className="text-3xl font-bold tracking-tighter text-foreground">{stat.val}</p>
                                    <p className="text-xs uppercase tracking-widest text-muted-foreground mt-1">{stat.label}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Integrated 3D Helix Side */}
                    <div
                        className="flex-1 relative h-[500px] sm:h-[650px] w-full max-w-[600px] flex items-center justify-center pt-20"
                        style={{ transformStyle: "preserve-3d" }}
                    >
                        {/* Premium Phone Frame */}
                        <motion.div
                            style={{
                                y: smoothPhoneY,
                                transformStyle: "preserve-3d",
                                rotateX: 5,
                                rotateY: -10,
                                translateZ: "0px"
                            }}
                            className="relative z-30 w-[160px] h-[320px] sm:w-[220px] sm:h-[440px] bg-[#080808] rounded-[3.5rem] border-[6px] border-[#1a1a1a] shadow-[0_0_80px_rgba(var(--primary-rgb),0.15)] flex items-center justify-center p-3"
                        >
                            {/* Bezel Polish */}
                            <div className="absolute inset-0 rounded-[3rem] border border-white/5 pointer-events-none" />
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-5 bg-black rounded-b-2xl z-50 border-x border-b border-white/5" />

                            {/* Glowing Screen Content */}
                            <div className="w-full h-full bg-[#0a0a0a] rounded-[2.8rem] overflow-hidden relative border border-white/5">
                                <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent opacity-40" />

                                {/* Fake UI Particles Inside */}
                                <div className="p-6 pt-12 space-y-4">
                                    <div className="h-2 w-12 bg-primary/20 rounded-full" />
                                    <div className="h-8 w-full bg-white/5 rounded-2xl" />
                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="h-24 bg-white/5 rounded-2xl" />
                                        <div className="h-24 bg-white/5 rounded-2xl animate-pulse" />
                                    </div>
                                    <div className="h-32 w-full bg-gradient-to-br from-primary/20 to-transparent rounded-2xl flex items-center justify-center">
                                        <div className="flex gap-1">
                                            {[...Array(4)].map((_, i) => (
                                                <div key={i} className="w-1.5 h-1.5 rounded-full bg-primary" />
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Moving "Data" Overlay on screen */}
                                <motion.div
                                    style={{
                                        top: useTransform(scrollYProgress, [0, 1], ["100%", "-20%"])
                                    }}
                                    className="absolute inset-x-0 h-40 bg-gradient-to-t from-primary/10 to-transparent blur-xl"
                                />
                            </div>
                        </motion.div>

                        {/* Revolving "Data Stream" Helix */}
                        <div
                            className="absolute inset-0 flex items-center justify-center"
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
                                            scale: useTransform(scrollYProgress, [0.6, 0.9], [1, 0.4]),
                                            translateZ: useTransform(smoothRotation, (r) => Math.cos(angle + (r * Math.PI) / 180) * 150),
                                            opacity: useTransform(scrollYProgress, [0.7, 0.95], [1, 0]),
                                        }}
                                        className="absolute w-12 h-12 sm:w-16 sm:h-16 rounded-2xl glass-card gradient-border flex items-center justify-center text-primary shadow-2xl backdrop-blur-md"
                                    >
                                        <item.Icon className={`w-6 h-6 sm:w-8 sm:h-8 ${item.color}`} />

                                        {/* Dynamic Connection Paths */}
                                        <motion.div
                                            style={{
                                                height: useTransform(scrollYProgress, [0, 1], ["120px", "40px"]),
                                                opacity: useTransform(scrollYProgress, [0.4, 0.8], [0.2, 0])
                                            }}
                                            className="absolute w-[1px] bg-gradient-to-t from-primary/40 to-transparent -top-full left-1/2 -translate-x-1/2"
                                        />
                                    </motion.div>
                                );
                            })}
                        </div>

                        {/* Core Reactor Glow */}
                        <motion.div
                            style={{
                                scale: useTransform(scrollYProgress, [0.5, 0.8], [0.5, 2]),
                                opacity: useTransform(scrollYProgress, [0.5, 0.8, 1], [0, 0.15, 0])
                            }}
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary blur-[120px] rounded-full pointer-events-none z-0"
                        />
                    </div>

                </div>
            </div>
        </section>
    );
}
