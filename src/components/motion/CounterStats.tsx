import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  { value: 16, suffix: "+", label: "Clients Served" },
  { value: 6, suffix: "", label: "Core Services" },
  { value: 100, suffix: "%", label: "End-to-End" },
];

function AnimatedCounter({ target, suffix, inView }: { target: number; suffix: string; inView: boolean }) {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!inView || hasAnimated.current) return;
    hasAnimated.current = true;

    const duration = 2000;
    const start = performance.now();

    function tick(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        setDone(true);
      }
    }

    requestAnimationFrame(tick);
  }, [inView, target]);

  return (
    <span className="tabular-nums relative inline-block">
      <span className={`transition-transform duration-500 ${done ? "scale-105" : "scale-100"}`}>
        {count}
        {suffix}
      </span>
    </span>
  );
}

export default function CounterStats() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="relative py-16 sm:py-20 px-5 sm:px-6">
      <div ref={ref} className="max-w-4xl mx-auto">
        <div className="grid grid-cols-3 gap-4 sm:gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
              animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
              transition={{ duration: 0.7, delay: i * 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="text-center"
            >
              <div className="relative">
                {/* Glow behind number */}
                <div
                  className="absolute inset-0 rounded-full blur-[40px] transition-opacity duration-1000"
                  style={{
                    background: `radial-gradient(circle, hsl(var(--primary) / 0.2) 0%, transparent 70%)`,
                    opacity: inView ? 0.6 : 0,
                  }}
                />
                <div className="relative text-3xl sm:text-5xl md:text-6xl font-bold text-primary mb-2 sm:mb-3">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} inView={inView} />
                </div>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground uppercase tracking-wider">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
