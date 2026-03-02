import { content } from "@/content/content";
import { motion } from "framer-motion";
import ScrollReveal from "./motion/ScrollReveal";
import { useIsMobile } from "@/hooks/use-mobile";

export default function Trust() {
  const isMobile = useIsMobile();

  return (
    <section id="trust" className="relative scroll-mt-24 py-8 sm:py-16 px-5 sm:px-6 overflow-visible">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal className="text-center mb-10 sm:mb-12" scale>
          <p className="text-[10px] sm:text-xs uppercase tracking-[0.34em] text-primary/60 mb-4 font-semibold">Why us</p>
          <h2 className="text-3xl sm:text-5xl font-bold text-foreground tracking-tight leading-tight max-w-3xl mx-auto">
            {content.trust.title}
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
          {content.trust.cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{
                opacity: isMobile ? 0.3 : 0,
                y: isMobile ? 10 : 30,
                scale: isMobile ? 0.98 : 0.92
              }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: isMobile ? "200px" : "-30px" }}
              transition={{ duration: isMobile ? 0.4 : 0.8, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="group relative rounded-3xl bg-white/40 backdrop-blur-md border border-black/[0.06] p-8 sm:p-10 transition-all duration-700 hover:bg-white hover:shadow-2xl hover:shadow-primary/10 select-none cursor-default"
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="h-px w-8 bg-black/10 group-hover:w-12 group-hover:bg-primary transition-all duration-700" />
                <span className="text-xs font-mono font-bold text-muted-foreground group-hover:text-primary transition-colors duration-500">0{i + 1}</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-black mb-5 group-hover:text-primary transition-colors duration-500 tracking-tight">
                {card.title}
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed font-light group-hover:text-foreground transition-colors duration-500">
                {card.description}
              </p>

              {/* Subtle background glow on hover */}
              <div className="absolute inset-0 bg-primary/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-3xl" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
