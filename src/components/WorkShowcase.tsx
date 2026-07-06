import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { content } from "@/content/content";
import ScrollReveal from "./motion/ScrollReveal";
import { useIsMobile } from "@/hooks/use-mobile";

type WorkItem = {
  title: string;
  tag: string;
  src?: string;
  poster?: string;
  href?: string;
  platform?: string;
};

// External reel (e.g. Instagram) — thumbnail that opens the post in a new tab.
function ExternalReelCard({ item, index, aspect }: { item: WorkItem; index: number; aspect: string }) {
  return (
    <motion.a
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 24, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      className="group relative m-0 block cursor-pointer overflow-hidden rounded-2xl border border-black/[0.06] bg-black shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-accent/15"
      style={{ aspectRatio: aspect }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#1e293b] via-[#0f172a] to-[#020617]" />
      {item.poster && (
        <img
          src={item.poster}
          alt={item.title}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      )}

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/25" />

      <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-90 transition-transform duration-500 group-hover:scale-110">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-black/35 ring-1 ring-white/40 backdrop-blur-sm">
          <Play className="h-5 w-5 translate-x-[1px] fill-white text-white" />
        </div>
      </div>

      <figcaption className="absolute inset-x-0 top-0 flex items-start justify-between gap-1.5 p-2.5 sm:p-3">
        <span className="min-w-0 truncate rounded-full bg-black/55 px-2 py-1 text-[9px] font-semibold uppercase tracking-wider text-white backdrop-blur-sm sm:px-2.5 sm:text-[10px]">
          {item.tag}
        </span>
        {item.platform && (
          <span className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full bg-white/90 px-2 py-1 text-[9px] font-bold uppercase tracking-wider text-black shadow-sm backdrop-blur sm:px-2.5 sm:text-[10px]">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            {item.platform}
          </span>
        )}
      </figcaption>
      <figcaption className="absolute inset-x-0 bottom-0 p-3.5">
        <h3 className="text-sm font-semibold leading-snug text-white">{item.title}</h3>
      </figcaption>
    </motion.a>
  );
}

function VideoCard({ item, index, aspect }: { item: WorkItem; index: number; aspect: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  // Videos use preload="none" so nothing decodes until the user engages.
  const play = () => {
    const v = ref.current;
    if (v)
      v.play().then(() => setPlaying(true)).catch(() => {});
  };
  const pause = () => {
    const v = ref.current;
    if (v) {
      v.pause();
      setPlaying(false);
    }
  };

  return (
    <motion.figure
      initial={{ opacity: 0, y: 24, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      className="group relative m-0 cursor-pointer overflow-hidden rounded-2xl border border-black/[0.06] bg-black shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-accent/15"
      style={{ aspectRatio: aspect }}
      onMouseEnter={play}
      onMouseLeave={pause}
      onClick={() => (playing ? pause() : play())}
    >
      {/* Cinematic backdrop shown before the poster paints */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1e293b] via-[#0f172a] to-[#020617]" />

      <video
        ref={ref}
        src={item.src}
        poster={item.poster}
        muted
        loop
        playsInline
        preload="none"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Readability overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/25" />

      {/* Play affordance — hidden while playing */}
      <div
        className={`pointer-events-none absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${
          playing ? "opacity-0" : "opacity-90"
        }`}
      >
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-black/35 ring-1 ring-white/40 backdrop-blur-sm">
          <Play className="h-5 w-5 translate-x-[1px] fill-white text-white" />
        </div>
      </div>

      <figcaption className="absolute inset-x-0 top-0 p-2.5 sm:p-3">
        <span className="rounded-full bg-black/55 px-2 py-1 text-[9px] font-semibold uppercase tracking-wider text-white backdrop-blur-sm sm:px-2.5 sm:text-[10px]">
          {item.tag}
        </span>
      </figcaption>
      <figcaption className="absolute inset-x-0 bottom-0 p-3.5">
        <h3 className="text-sm font-semibold leading-snug text-white">{item.title}</h3>
      </figcaption>
    </motion.figure>
  );
}

function ImageCard({ item, index, aspect }: { item: WorkItem; index: number; aspect: string }) {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 24, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      className="group relative m-0 overflow-hidden rounded-2xl border border-black/[0.06] bg-black shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-accent/15"
      style={{ aspectRatio: aspect }}
    >
      <img
        src={item.src}
        alt={item.title}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
      />

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/15 opacity-90 transition-opacity duration-500 group-hover:opacity-100" />

      <figcaption className="absolute inset-x-0 top-0 p-2.5 sm:p-3">
        <span className="rounded-full bg-black/55 px-2 py-1 text-[9px] font-semibold uppercase tracking-wider text-white backdrop-blur-sm sm:px-2.5 sm:text-[10px]">
          {item.tag}
        </span>
      </figcaption>
      <figcaption className="absolute inset-x-0 bottom-0 translate-y-1 p-3.5 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
        <h3 className="text-sm font-semibold leading-snug text-white">{item.title}</h3>
      </figcaption>
    </motion.figure>
  );
}

export default function WorkShowcase() {
  const isMobile = useIsMobile();
  const categories = content.work.categories;
  const [active, setActive] = useState(categories[0].key);
  const current = categories.find((c) => c.key === active) ?? categories[0];

  // Columns adapt to each category's aspect so cards never feel cramped.
  const cols =
    current.key === "video"
      ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
      : current.key === "design"
      ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
      : "grid-cols-2 sm:grid-cols-4";

  return (
    <section id="work" className="relative scroll-mt-24 overflow-hidden py-12 px-5 sm:py-20 sm:px-6">
      {/* ambient glows */}
      <div className="pointer-events-none absolute -top-20 right-1/4 -z-10 h-[420px] w-[420px] rounded-full bg-accent/5 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 left-1/4 -z-10 h-[360px] w-[360px] rounded-full bg-primary/[0.04] blur-[100px]" />

      <div className="mx-auto max-w-7xl">
        <ScrollReveal className="mb-8 sm:mb-12" scale>
          <div className="flex flex-col items-start gap-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-3 py-1">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent sm:text-xs">
                {content.work.eyebrow}
              </p>
            </div>
            <h2 className="max-w-3xl text-4xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-5xl md:text-6xl">
              {content.work.title}
            </h2>
            <p className="mt-2 max-w-2xl text-base leading-relaxed text-muted-foreground/80 sm:text-lg">
              {content.work.sub}
            </p>
          </div>
        </ScrollReveal>

        {/* Segmented category toggle */}
        <div className="mb-8 flex flex-wrap items-center gap-3 sm:mb-10">
          <div className="inline-flex flex-wrap rounded-full border border-black/[0.08] bg-white/70 p-1 backdrop-blur-sm">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActive(cat.key)}
                className={`relative rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-colors duration-300 sm:px-6 sm:text-sm ${
                  active === cat.key ? "text-white" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {active === cat.key && (
                  <motion.span
                    layoutId="work-tab"
                    className="absolute inset-0 -z-10 rounded-full bg-primary"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                {cat.label}
              </button>
            ))}
          </div>
          <p className="hidden text-sm text-muted-foreground/70 sm:block">{current.blurb}</p>
        </div>

        {/* Grid — re-keyed per category so it cleanly remounts on switch */}
        <motion.div
          key={current.key}
          initial={{ opacity: isMobile ? 1 : 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.25 }}
          className={`grid gap-3 sm:gap-5 ${cols}`}
        >
          {current.items.map((item, i) =>
            current.media === "video" ? (
              item.href ? (
                <ExternalReelCard key={item.href} item={item} index={i} aspect={current.aspect} />
              ) : (
                <VideoCard key={item.src} item={item} index={i} aspect={current.aspect} />
              )
            ) : (
              <ImageCard key={item.src} item={item} index={i} aspect={current.aspect} />
            )
          )}
        </motion.div>
      </div>
    </section>
  );
}
