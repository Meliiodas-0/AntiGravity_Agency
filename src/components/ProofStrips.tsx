import { content } from "@/content/content";
import ScrollReveal from "./motion/ScrollReveal";
import { motion } from "framer-motion";

type Client = { name: string; url: string; logo: string };

function MarqueeStrip({ items, reverse = false, speed = 35 }: { items: Client[]; reverse?: boolean; speed?: number }) {
  const repeated = [...items, ...items, ...items]; // Triple for smoother loop
  return (
    <div className="overflow-hidden marquee-fade-mask py-4 sm:py-6 w-full">
      <div
        className={`flex gap-4 sm:gap-8 md:gap-12 whitespace-nowrap ${reverse ? "marquee-strip-reverse" : "marquee-strip"
          }`}
        style={{ animationDuration: `${speed}s` }}
      >
        {repeated.map((item, i) => (
          <a
            key={`${item.name}-${i}`}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center justify-center rounded-2xl px-6 sm:px-14 py-6 sm:py-12 min-w-[140px] sm:min-w-[340px] md:min-w-[420px] bg-white/[0.02] border border-white/5 backdrop-blur-sm transition-all duration-700 hover:bg-white/[0.05] hover:border-white/20 hover:shadow-2xl hover:shadow-primary/10"
          >
            {/* Ambient background glow on hover */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

            <div className="relative w-32 h-12 sm:w-56 sm:h-24 md:w-72 md:h-32 flex items-center justify-center transition-all duration-700 group-hover:scale-105 group-hover:brightness-110">
              <img
                src={item.logo}
                alt={item.name}
                title={item.name}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-contain filter drop-shadow-md brightness-90 contrast-110 group-hover:brightness-100 transition-all duration-700"
              />
            </div>

            <div className="absolute bottom-3 left-0 right-0 text-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
              <span className="text-[10px] uppercase tracking-widest font-semibold text-primary/80">
                {item.name}
              </span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

export default function ProofStrips() {
  return (
    <section id="proof" className="relative scroll-mt-28 py-10 sm:py-20 md:py-24 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-10 animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px] -z-10" />

      <ScrollReveal className="max-w-7xl mx-auto px-6 sm:px-8 mb-16 sm:mb-24" scale>
        <div className="flex flex-col items-start gap-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <p className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-primary font-bold">Client Ecosystem</p>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-[1.1] tracking-tight">
            {content.proof.title}
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground/80 mt-4 max-w-2xl leading-relaxed">
            {content.proof.sub}
          </p>
        </div>
      </ScrollReveal>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10"
      >
        <div className="space-y-6 sm:space-y-8">
          <MarqueeStrip items={content.proofStrips[0]} speed={40} />
          <MarqueeStrip items={content.proofStrips[1]} reverse speed={50} />
        </div>
      </motion.div>
    </section>
  );
}
