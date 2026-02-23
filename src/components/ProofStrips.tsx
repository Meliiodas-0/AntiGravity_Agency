import { content } from "@/content/content";
import ScrollReveal from "./motion/ScrollReveal";
import { motion } from "framer-motion";

type Client = { name: string; url: string; logo: string };

function MarqueeStrip({ items, reverse = false, speed = 45 }: { items: Client[]; reverse?: boolean; speed?: number }) {
  const repeated = [...items, ...items];
  return (
    <div className="overflow-hidden marquee-fade-mask py-2 sm:py-3 w-full">
      <div
        className={`flex gap-3 sm:gap-6 md:gap-8 whitespace-nowrap ${reverse ? "marquee-strip-reverse" : "marquee-strip"
          }`}
        style={{ animationDuration: `${speed}s` }}
      >
        {repeated.map((item, i) => (
          <a
            key={i}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center justify-center rounded-2xl px-6 sm:px-8 md:px-10 py-6 sm:py-8 md:py-10 min-w-[180px] sm:min-w-[220px] md:min-w-[260px] glass-card gradient-border transition-all duration-500 hover:bg-white/5"
          >
            <div className="w-32 h-16 sm:w-40 sm:h-20 md:w-56 md:h-24 flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
              <img
                src={item.logo}
                alt={item.name}
                loading="eager"
                decoding="async"
                className="w-full h-full object-contain filter drop-shadow-sm transition-all duration-500"
              />
            </div>
            <span className="text-xs sm:text-sm font-medium text-muted-foreground mt-4 sm:mt-5 whitespace-nowrap transition-colors duration-500 group-hover:text-primary">
              {item.name}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}

export default function ProofStrips() {
  return (
    <section id="proof" className="relative scroll-mt-24 py-20 sm:py-24 md:py-32">

      <ScrollReveal className="max-w-6xl mx-auto px-5 sm:px-6 mb-12 sm:mb-16" scale>
        <p className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-primary/70 mb-3 sm:mb-4 font-medium">Clients</p>
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">{content.proof.title}</h2>
        <p className="text-sm sm:text-base md:text-lg text-muted-foreground mt-3 sm:mt-4 max-w-xl">{content.proof.sub}</p>
      </ScrollReveal>
      <motion.div
        initial={{ opacity: 0, filter: "blur(10px)" }}
        whileInView={{ opacity: 1, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
      >
        <div className="space-y-3 sm:space-y-4">
          <MarqueeStrip items={content.proofStrips[0]} speed={45} />
          <MarqueeStrip items={content.proofStrips[1]} reverse speed={55} />
        </div>
      </motion.div>
    </section>
  );
}
