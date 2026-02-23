import { content } from "@/content/content";
import { motion } from "framer-motion";
import ScrollReveal from "./motion/ScrollReveal";

export default function Process() {
  const steps = content.process.steps;

  return (
    <section id="process" className="relative scroll-mt-24 py-20 sm:py-24 md:py-32 px-5 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal className="mb-14 sm:mb-16" scale>
          <p className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-primary/70 mb-3 sm:mb-4 font-medium">Workflow</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
            {content.process.title}
          </h2>
        </ScrollReveal>

        <div className="relative">
          {/* Connecting line */}
          <div className="hidden lg:block absolute top-[60px] left-[calc(12.5%+12px)] right-[calc(12.5%+12px)] h-[1px]">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
              className="w-full h-full bg-gradient-to-r from-primary/40 via-primary/20 to-primary/40 origin-left"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
            {steps.map((step, idx) => (
              <motion.div
                key={step.step}
                initial={{
                  opacity: 0,
                  y: 30,
                  x: idx % 2 === 0 ? -20 : 20,
                  scale: 0.95,
                  filter: "blur(6px)",
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  x: 0,
                  scale: 1,
                  filter: "blur(0px)",
                }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.7, delay: idx * 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="relative space-y-3 sm:space-y-4 p-6 sm:p-8 rounded-xl glass-card gradient-border glow-hover"
              >
                <span className="text-4xl sm:text-5xl font-bold text-primary/50">{step.step}</span>
                <h3 className="text-lg sm:text-xl font-semibold text-foreground">{step.title}</h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
