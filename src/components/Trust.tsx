import { content } from "@/content/content";
import { motion } from "framer-motion";
import ScrollReveal from "./motion/ScrollReveal";
import { useIsMobile } from "@/hooks/use-mobile";

const labels = ["01", "02", "03"];

export default function Trust() {
  const isMobile = useIsMobile();

  return (
    <section id="trust" className="relative scroll-mt-24 py-20 sm:py-24 md:py-32 px-5 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal className="mb-14 sm:mb-16 md:mb-20">
          <p className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-primary/70 mb-3 sm:mb-4 font-medium">Why us</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
            {content.trust.title}
          </h2>
        </ScrollReveal>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
          {content.trust.cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="group rounded-xl border border-border/60 bg-card/50 p-6 sm:p-8 md:p-10 transition-all duration-300 hover:border-primary/40 hover:bg-card/80"
            >
              <span className="text-3xl sm:text-4xl font-bold text-primary/50 block mb-3 sm:mb-4">{labels[i]}</span>
              <h3 className="text-xl sm:text-2xl font-semibold text-foreground mb-2 sm:mb-3 group-hover:text-primary transition-colors">
                {card.title}
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{card.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
