import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

type Props = {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p";
  blurIn?: boolean;
  heroMode?: boolean;
};

export default function TextReveal({ text, className = "", as: Tag = "h1", blurIn = true, heroMode = false }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: heroMode ? ["start 90%", "start 20%"] : ["start 85%", "end 40%"],
  });

  const words = text.split(" ");

  if (heroMode) {
    return (
      <div ref={ref}>
        <Tag className={className}>
          {words.map((word, i) => (
            <HeroWord key={i} index={i} total={words.length} blurIn={blurIn}>
              {word}
            </HeroWord>
          ))}
        </Tag>
      </div>
    );
  }

  return (
    <div ref={ref}>
      <Tag className={className}>
        {words.map((word, i) => (
          <Word key={i} index={i} total={words.length} progress={scrollYProgress} blurIn={blurIn}>
            {word}
          </Word>
        ))}
      </Tag>
    </div>
  );
}

/* Entrance-animated words for hero (no scroll dependency, just staggered entrance) */
function HeroWord({
  children,
  index,
  total,
  blurIn,
}: {
  children: string;
  index: number;
  total: number;
  blurIn: boolean;
}) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 20, scale: 0.9, filter: blurIn ? "blur(8px)" : "none" }}
      animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      transition={{
        duration: 0.7,
        delay: 0.1 + index * 0.07,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="inline-block mr-[0.3em] will-change-[opacity,transform,filter]"
    >
      {children}
    </motion.span>
  );
}

/* Scroll-driven words for non-hero sections */
function Word({
  children,
  index,
  total,
  progress,
  blurIn,
}: {
  children: string;
  index: number;
  total: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  blurIn: boolean;
}) {
  const start = index / total;
  const end = (index + 1) / total;
  const opacity = useTransform(progress, [start, end], [0.08, 1]);
  const y = useTransform(progress, [start, end], [12, 0]);
  const scale = useTransform(progress, [start, end], [0.95, 1]);
  const blur = useTransform(progress, [start, end], [6, 0]);
  const filterStr = useTransform(blur, (v) => (blurIn ? `blur(${v}px)` : "none"));

  return (
    <motion.span
      style={{ opacity, y, scale, filter: filterStr }}
      className="inline-block mr-[0.3em] will-change-[opacity,transform,filter]"
    >
      {children}
    </motion.span>
  );
}
