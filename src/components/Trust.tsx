import { content } from "@/content/content";
import { motion } from "framer-motion";
import ScrollReveal from "./motion/ScrollReveal";
import { useIsMobile } from "@/hooks/use-mobile";

export default function Trust() {
  const isMobile = useIsMobile();

  return (
    <section id="trust" className="relative scroll-mt-24 py-24 sm:py-32 px-5 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal className="text-center mb-16 sm:mb-24" scale>
          <p className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-primary/70 mb-4 font-medium">Why us</p>
          <h2 className="text-3xl sm:text-5xl font-bold text-foreground tracking-tight leading-tight max-w-3xl mx-auto">
            {content.trust.title}
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
          {content.trust.cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30, scale: 0.92, filter: isMobile ? "none" : "blur(6px)" }}
              whileInView={{ opacity: 1, y: 0, scale: 1, filter: "none" }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="group rounded-2xl glass-card gradient-border glow-hover p-8 sm:p-10 relative overflow-hidden"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-8 bg-primary/30 group-hover:w-12 group-hover:bg-primary transition-all duration-500" />
                <span className="text-xs font-mono font-bold text-primary/60 group-hover:text-primary transition-colors">0{i + 1}</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors duration-300 tracking-tight">
                {card.title}
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed font-light">{card.description}</p>

              {/* Subtle background glow on hover */}
              <div className="absolute inset-0 bg-primary/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
