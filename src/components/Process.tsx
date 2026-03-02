import { content } from "@/content/content";
import { motion } from "framer-motion";
import ScrollReveal from "./motion/ScrollReveal";

export default function Process() {
  const steps = content.process.steps;

  return (
    <section id="process" className="relative scroll-mt-24 py-8 sm:py-16 px-5 sm:px-6 overflow-visible">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal className="text-center mb-10 sm:mb-12" scale>
          <p className="text-[10px] sm:text-xs uppercase tracking-[0.34em] text-primary/60 mb-4 font-semibold">Workflow</p>
          <h2 className="text-3xl sm:text-5xl font-bold text-foreground tracking-tight leading-tight">
            {content.process.title}
          </h2>
        </ScrollReveal>

        <div className="relative">
          {/* Connecting line — refined for light background */}
          <div className="hidden lg:block absolute top-[60px] left-[15%] right-[15%] h-[1px]">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              className="w-full h-full bg-gradient-to-r from-primary/10 via-primary/40 to-primary/20 origin-left"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10">
            {steps.map((step, idx) => (
              <motion.div
                key={step.step}
                initial={{
                  opacity: 0,
                  y: 30,
                  scale: 0.95,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.8, delay: idx * 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="relative group p-8 sm:p-10 rounded-3xl bg-white/50 backdrop-blur-sm border border-black/[0.05] hover:bg-white hover:shadow-xl hover:shadow-primary/5 transition-all duration-700 h-full select-none cursor-default"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-black/5 text-black text-sm font-mono font-bold mb-8 group-hover:bg-primary group-hover:text-white group-hover:rotate-12 transition-all duration-700">
                  {idx + 1}
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-black mb-4 tracking-tight group-hover:text-primary transition-colors duration-500">{step.title}</h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed font-light group-hover:text-foreground transition-colors duration-500">{step.description}</p>

                {/* Visual marker for line connection points */}
                <div className="hidden lg:block absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full border border-black/10 bg-white group-hover:border-primary/30 transition-colors duration-500" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
