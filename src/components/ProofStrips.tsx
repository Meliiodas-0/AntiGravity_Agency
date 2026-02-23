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
            className="flex flex-col items-center justify-center rounded-xl px-6 sm:px-8 md:px-10 py-4 sm:py-5 md:py-6 min-w-[120px] sm:min-w-[150px] md:min-w-[170px] glass-card gradient-border"
          >
            <div className="w-20 h-10 sm:w-24 sm:h-12 md:w-28 md:h-14 flex items-center justify-center">
              <img
                src={item.logo}
                alt={item.name}
                loading="eager"
                decoding="async"
                width={112}
                height={56}
                className="max-w-full max-h-full object-contain"
              />
            </div>
            <span className="text-xs sm:text-sm text-muted-foreground mt-2 sm:mt-3 whitespace-nowrap">
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
