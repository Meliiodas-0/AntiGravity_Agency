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

    const rotation = useTransform(scrollYProgress, [0, 1], [0, 540]); // More rotation for extra flair
    const smoothRotation = useSpring(rotation, { stiffness: 90, damping: 30 }); // Snappier

    const yOffset = useTransform(scrollYProgress, [0, 1], [80, -80]);
    const smoothY = useSpring(yOffset, { stiffness: 90, damping: 30 });

    return (
        <section
            ref={containerRef}
            className="relative py-24 sm:py-32 overflow-hidden bg-background/30"
            style={{ perspective: "1000px" }} // Added perspective for 3D
        >
            <div className="max-w-7xl mx-auto px-5 sm:px-6">
                <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

                    {/* Static Content Side */}
                    <div className="flex-1 text-center lg:text-left z-10">
                        <motion.p
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-primary/70 mb-4 font-medium"
                        >
                            Our DNA
                        </motion.p>
                        <motion.h2
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ delay: 0.1 }}
                            className="text-3xl sm:text-5xl lg:text-6xl font-bold mb-8 tracking-tight leading-tight"
                        >
                            Marketing in <br />
                            <span className="text-primary">Our Very DNA</span>
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ delay: 0.2 }}
                            className="text-muted-foreground text-base sm:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed font-light"
                        >
                            We don't just "do" social media. We engineer viral loops and cultural moments. Our strategies are built into the fabric of every platform, ensuring your brand isn't just seen—it's felt.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ delay: 0.4 }}
                            className="mt-10 flex flex-wrap justify-center lg:justify-start gap-4 sm:gap-6"
                        >
                            {socialIcons.map((item, i) => (
                                <div key={i} className="flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-white/5 text-sm font-medium">
                                    <item.Icon className={`w-4 h-4 ${item.color}`} />
                                    <span>{item.label}</span>
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Animated DNA Side */}
                    <div
                        className="flex-1 relative h-[400px] sm:h-[500px] w-full max-w-[500px] flex items-center justify-center"
                        style={{ transformStyle: "preserve-3d" }}
                    >
                        {/* Phone Icon */}
                        <motion.div
                            style={{
                                y: smoothY,
                                transformStyle: "preserve-3d",
                                translateZ: "0px"
                            }}
                            className="relative z-20 w-32 h-64 sm:w-40 sm:h-80 bg-[#0a0a0a] rounded-[3rem] border-4 border-white/10 shadow-2xl flex items-center justify-center overflow-hidden"
                        >
                            <div className="absolute inset-x-0 top-0 h-6 bg-white/5 rounded-b-xl" />
                            <Smartphone className="w-12 h-12 text-primary/40" />
                            <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent" />

                            <div className="w-full h-full p-4 flex flex-col gap-3 opacity-20 mt-10">
                                <div className="h-4 w-3/4 bg-white/10 rounded" />
                                <div className="h-4 w-1/2 bg-white/10 rounded" />
                                <div className="h-24 w-full bg-white/5 rounded-xl mt-2" />
                            </div>
                        </motion.div>

                        {/* Revolving Helix Icons */}
                        <div
                            className="absolute inset-0 flex items-center justify-center"
                            style={{ transformStyle: "preserve-3d" }}
                        >
                            {socialIcons.map((item, i) => {
                                const angle = (i / socialIcons.length) * Math.PI * 2;
                                const radius = isMobile ? 120 : 180;

                                return (
                                    <motion.div
                                        key={i}
                                        style={{
                                            x: useTransform(smoothRotation, (r) => Math.cos(angle + (r * Math.PI) / 180) * radius),
                                            y: useTransform(smoothRotation, (r) => Math.sin(angle + (r * Math.PI) / 180) * radius + Math.sin(angle) * 50),
                                            scale: useTransform(smoothRotation, (r) => 0.8 + Math.cos(angle + (r * Math.PI) / 180) * 0.2),
                                            translateZ: useTransform(smoothRotation, (r) => Math.cos(angle + (r * Math.PI) / 180) * 100),
                                            opacity: useTransform(smoothRotation, (r) => 0.5 + Math.cos(angle + (r * Math.PI) / 180) * 0.5),
                                        }}
                                        className="absolute w-12 h-12 sm:w-16 sm:h-16 rounded-2xl glass-card gradient-border flex items-center justify-center text-primary shadow-xl"
                                    >
                                        <item.Icon className={`w-6 h-6 sm:w-8 sm:h-8 ${item.color}`} />

                                        {/* DNA Connecting Lines (Visual representation) */}
                                        <div className="absolute w-[2px] h-32 bg-gradient-to-b from-primary/40 to-transparent -bottom-32 left-1/2 -translate-x-1/2 opacity-20" />
                                        <div className="absolute w-[2px] h-32 bg-gradient-to-t from-primary/40 to-transparent -top-32 left-1/2 -translate-x-1/2 opacity-20" />
                                    </motion.div>
                                );
                            })}
                        </div>

                        {/* Glowing orbs for extra depth */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/10 blur-[100px] rounded-full pointer-events-none" />
                    </div>

                </div>
            </div>
        </section>
    );
}
