import React from "react";
import { motion } from "framer-motion";
import { Pause, Wrench, Cpu, Loader2 } from "lucide-react";

const WorkInProgress = () => {
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#050505] overflow-hidden">
            {/* Ambient background glow */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px] opacity-50" />
                <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] rounded-full bg-blue-500/5 blur-[100px] opacity-30" />
            </div>

            <div className="relative z-10 text-center px-6">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="flex flex-col items-center gap-8"
                >
                    {/* Animated Icon Container */}
                    <div className="relative">
                        <motion.div
                            animate={{
                                scale: [1, 1.1, 1],
                                opacity: [0.3, 0.6, 0.3],
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                            className="absolute inset-0 bg-primary/20 rounded-full blur-2xl"
                        />
                        <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md flex items-center justify-center shadow-2xl overflow-hidden group">
                           {/* Scanline effect */}
                           <motion.div 
                             animate={{ y: ["-100%", "100%"] }}
                             transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                             className="absolute inset-0 w-full h-[2px] bg-primary/20 z-0"
                           />
                           
                           <motion.div
                                animate={{
                                    rotate: [0, 5, -5, 0],
                                }}
                                transition={{
                                    duration: 6,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                                className="z-10"
                           >
                               <Pause size={48} className="text-primary sm:size-64 drop-shadow-[0_0_15px_rgba(var(--primary),0.5)]" />
                           </motion.div>
                        </div>
                    </div>

                    {/* Text Content */}
                    <div className="space-y-4">
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3, duration: 0.6 }}
                        >
                            <h1 className="text-4xl sm:text-6xl font-bold tracking-tighter bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent">
                                SYSTEM PAUSED
                            </h1>
                        </motion.div>
                        
                        <motion.p
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.5, duration: 0.6 }}
                            className="text-muted-foreground text-sm sm:text-base max-w-sm mx-auto font-light tracking-wide uppercase"
                        >
                            Deploying version <span className="text-primary font-bold">007</span>. 
                            Optimizing digital DNA for maximum output.
                        </motion.p>
                    </div>

                    {/* Progress Indicator */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8, duration: 1 }}
                        className="flex items-center gap-3 text-[10px] sm:text-xs text-white/30 tracking-[0.2em] font-medium"
                    >
                        <Loader2 className="animate-spin" size={12} />
                        UPDATING INFRASTRUCTURE
                    </motion.div>
                </motion.div>
            </div>

            {/* Footer Tag */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-20 text-[10px] tracking-widest uppercase">
                &copy; YOUR BRAND 2026 // v007
            </div>
        </div>
    );
};

export default WorkInProgress;
