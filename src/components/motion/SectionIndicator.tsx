import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

const SECTIONS = [
  { id: "hero", label: "Home" },
  { id: "proof", label: "Clients" },
  { id: "capabilities", label: "Services" },
  { id: "process", label: "Process" },
  { id: "trust", label: "Trust" },
  { id: "contact", label: "Contact" },
];

export default function SectionIndicator() {
  const isMobile = useIsMobile();
  const [active, setActive] = useState(0);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    SECTIONS.forEach((section, idx) => {
      const el = document.getElementById(section.id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(idx);
        },
        { rootMargin: "-40% 0px -40% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  if (isMobile) return null;

  return (
    <div className="fixed left-6 top-1/2 -translate-y-1/2 z-50 flex flex-col items-start gap-3">
      <AnimatePresence mode="wait">
        <motion.span
          key={active}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 10 }}
          transition={{ duration: 0.3 }}
          className="text-[11px] font-mono text-primary/80 tracking-wider"
        >
          {String(active + 1).padStart(2, "0")} / {String(SECTIONS.length).padStart(2, "0")}
        </motion.span>
      </AnimatePresence>
      <div className="flex flex-col gap-2">
        {SECTIONS.map((_, idx) => (
          <div
            key={idx}
            className="w-[2px] h-4 rounded-full transition-all duration-500"
            style={{
              backgroundColor: idx === active ? "hsl(var(--primary))" : "hsl(var(--muted-foreground) / 0.2)",
              transform: idx === active ? "scaleY(1.5)" : "scaleY(1)",
            }}
          />
        ))}
      </div>
    </div>
  );
}
