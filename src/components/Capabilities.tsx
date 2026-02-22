import { content } from "@/content/content";
import { motion } from "framer-motion";
import ScrollReveal from "./motion/ScrollReveal";
import { useIsMobile } from "@/hooks/use-mobile";

const icons = ["⚡", "🎬", "📈", "👤", "🌐", "🎪"];

export default function Capabilities() {
  const isMobile = useIsMobile();
  const items = content.capabilities.items;

  return (
    <section id="capabilities" className="relative scroll-mt-24 py-20 sm:py-24 md:py-32 px-5 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal className="mb-14 md:mb-20">
          <p className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-primary/70 mb-3 sm:mb-4 font-medium">Services</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
            {content.capabilities.title}
          </h2>
        </ScrollReveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
          {items.map((cap, idx) => (
            <motion.div
              key={cap.title}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: isMobile ? "-30px" : "-80px" }}
              transition={{ duration: 0.5, delay: isMobile ? idx * 0.08 : idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="group rounded-xl border border-border/60 bg-card/50 p-6 sm:p-7 md:p-8 transition-all duration-300 hover:border-primary/40 hover:bg-card/80"
            >
              <div className="flex items-start gap-4">
                <span className="text-2xl sm:text-3xl shrink-0 mt-0.5 select-none" aria-hidden="true">{icons[idx]}</span>
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-1.5 sm:mb-2 group-hover:text-primary transition-colors">
                    {cap.title}
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{cap.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
