import { content } from "@/content/content";
import { motion } from "framer-motion";
import ScrollReveal from "./motion/ScrollReveal";

export default function Process() {
  const steps = content.process.steps;

  return (
    <section id="process" className="relative scroll-mt-24 py-24 sm:py-32 px-5 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal className="text-center mb-16 sm:mb-24" scale>
          <p className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-primary/70 mb-4 font-medium">Workflow</p>
          <h2 className="text-3xl sm:text-5xl font-bold text-foreground tracking-tight leading-tight">
            {content.process.title}
          </h2>
        </ScrollReveal>

        <div className="relative">
          {/* Connecting line — refined for cleaner look */}
          <div className="hidden lg:block absolute top-1/2 -translate-y-[100px] left-[calc(12.5%+10px)] right-[calc(12.5%+10px)] h-[1px]">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
              className="w-full h-full bg-gradient-to-r from-primary/30 via-primary/10 to-primary/30 origin-left"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10">
            {steps.map((step, idx) => (
              <motion.div
                key={step.step}
                initial={{
                  opacity: 0,
                  y: 30,
                  x: idx % 2 === 0 ? -10 : 10,
                  scale: 0.95,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  x: 0,
                  scale: 1,
                }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.7, delay: idx * 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="relative group p-8 sm:p-10 rounded-2xl glass-card gradient-border glow-hover transition-all duration-500 h-full"
              >
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary text-sm font-mono font-bold mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500">
                  {idx + 1}
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-4 tracking-tight group-hover:text-primary transition-colors duration-300">{step.title}</h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed font-light">{step.description}</p>

                {/* Visual marker for line connection points */}
                <div className="hidden lg:block absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full border border-primary/20 bg-[#0a0a0a]" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
