import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import {
  Target,
  BookOpen,
  BadgeCheck,
  Instagram,
  Megaphone,
  Globe,
  Clapperboard,
  Bot,
  Workflow,
  Rocket,
  Map as MapIcon,
  BarChart3,
  Lightbulb,
  Server,
  ArrowUpRight,
  X,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { content } from "@/content/content";
import { useIsMobile } from "@/hooks/use-mobile";

const ICONS: Record<string, LucideIcon> = {
  Target,
  BookOpen,
  BadgeCheck,
  Instagram,
  Megaphone,
  Globe,
  Clapperboard,
  Bot,
  Workflow,
  Rocket,
  Map: MapIcon,
  BarChart3,
  Lightbulb,
  Server,
};

type Capability = (typeof content.arsenal.capabilities)[number];

// ─── Glass card with pointer-driven tilt ─────────────────────────────────────
function GlassCard({
  cap,
  index,
  onOpen,
  interactive,
}: {
  cap: Capability;
  index: number;
  onOpen: () => void;
  interactive: boolean;
}) {
  const Icon = ICONS[cap.icon] ?? Sparkles;
  const ref = useRef<HTMLButtonElement>(null);
  const rx = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 });
  const ry = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 });

  const onMove = (e: React.MouseEvent) => {
    if (!interactive) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ry.set(px * 10);
    rx.set(-py * 10);
  };
  const onLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.button
      ref={ref}
      type="button"
      onClick={onOpen}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      initial={{ opacity: 0, y: 30, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: (index % 5) * 0.06, ease: [0.22, 1, 0.36, 1] }}
      style={interactive ? { rotateX: rx, rotateY: ry, transformPerspective: 900 } : undefined}
      className="group relative flex h-full min-h-[190px] flex-col overflow-hidden rounded-3xl border border-white/60 bg-white/50 p-5 text-left shadow-[0_8px_40px_-12px_rgba(0,0,0,0.12)] backdrop-blur-xl transition-colors duration-500 hover:bg-white/80 sm:p-6"
    >
      {/* gradient edge glow */}
      <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-accent/[0.07] via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="pointer-events-none absolute -inset-px rounded-3xl bg-gradient-to-br from-accent/40 to-transparent opacity-0 blur-[2px] transition-opacity duration-500 group-hover:opacity-30" />

      <div className="relative flex items-center justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6">
          <Icon className="h-5 w-5" strokeWidth={1.8} />
        </div>
        <ArrowUpRight className="h-4 w-4 text-muted-foreground/50 transition-all duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
      </div>

      <h3 className="relative mt-4 text-lg font-bold leading-tight tracking-tight text-foreground sm:text-xl">
        {cap.title}
      </h3>
      <p className="relative mt-1.5 text-sm leading-relaxed text-muted-foreground">{cap.blurb}</p>

      <div className="relative mt-auto flex flex-wrap gap-1.5 pt-4">
        {cap.items.slice(0, 3).map((it) => (
          <span
            key={it}
            className="rounded-full border border-black/[0.06] bg-white/70 px-2.5 py-1 text-[10px] font-medium text-muted-foreground"
          >
            {it}
          </span>
        ))}
        {cap.items.length > 3 && (
          <span className="rounded-full bg-primary/[0.06] px-2.5 py-1 text-[10px] font-semibold text-primary">
            +{cap.items.length - 3}
          </span>
        )}
      </div>
    </motion.button>
  );
}

// ─── Detail modal ────────────────────────────────────────────────────────────
function CapabilityModal({ cap, onClose }: { cap: Capability; onClose: () => void }) {
  const Icon = ICONS[cap.icon] ?? Sparkles;
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-end justify-center p-3 sm:items-center sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="absolute inset-0 bg-black/50 backdrop-blur-md"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={cap.title}
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 30, scale: 0.97 }}
        transition={{ type: "spring", stiffness: 260, damping: 26 }}
        className="relative z-10 w-full max-w-lg overflow-hidden rounded-3xl border border-white/70 bg-white/85 p-7 shadow-2xl backdrop-blur-2xl sm:p-9"
      >
        <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-accent/10 blur-3xl" />
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-black/5 text-foreground transition-colors hover:bg-black/10"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg">
          <Icon className="h-6 w-6" strokeWidth={1.8} />
        </div>
        <h3 className="mt-5 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">{cap.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">{cap.blurb}</p>

        <div className="mt-6 grid grid-cols-2 gap-2">
          {cap.items.map((it, i) => (
            <motion.div
              key={it}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.08 + i * 0.03 }}
              className="flex items-center gap-2 rounded-xl border border-black/[0.05] bg-white/60 px-3 py-2"
            >
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
              <span className="text-xs font-medium text-foreground sm:text-sm">{it}</span>
            </motion.div>
          ))}
        </div>

        {cap.client && (
          <div className="mt-6 flex items-start gap-2 rounded-2xl bg-primary/[0.04] px-4 py-3">
            <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
            <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">
              <span className="font-semibold text-foreground">Delivered:</span> {cap.client}.
            </p>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

// ─── Deck teaser: fanned cards that spread on scroll ─────────────────────────
function DeckCard({
  i,
  progress,
  reduced,
}: {
  i: number;
  progress: MotionValue<number>;
  reduced: boolean;
}) {
  const mid = 2; // center of 5 cards
  const offset = i - mid;
  // Fanned (stacked) -> spread apart as progress goes 0 -> 1
  const x = useTransform(progress, [0, 1], [offset * 26, offset * 168]);
  const y = useTransform(progress, [0, 1], [Math.abs(offset) * 12, Math.abs(offset) * 30 - 10]);
  const rotate = useTransform(progress, [0, 1], [offset * 5, offset * 11]);
  const style = reduced ? { x: offset * 150, y: Math.abs(offset) * 18, rotate: offset * 9 } : { x, y, rotate };

  const shades = [
    "from-[#2a3446] to-[#0b1220]",
    "from-[#33405a] to-[#111a2e]",
    "from-[#3b3350] to-[#160f22]",
    "from-[#3a2b46] to-[#150a1e]",
    "from-[#28384f] to-[#0a1424]",
  ];

  return (
    <motion.div
      style={{ ...style, zIndex: 10 - Math.abs(offset) }}
      className="absolute left-1/2 top-1/2 h-52 w-40 -translate-x-1/2 -translate-y-1/2 sm:h-64 sm:w-48"
    >
      <div
        className={`relative h-full w-full overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-br ${shades[i]} shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)]`}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle at 30% 20%, rgba(255,255,255,0.5) 0, transparent 45%)",
          }}
        />
        <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-white/10 to-transparent" />
      </div>
    </motion.div>
  );
}

export default function Arsenal() {
  const reduced = useReducedMotion() ?? false;
  const isMobile = useIsMobile();
  const staticMode = reduced || isMobile;

  const [active, setActive] = useState<number | null>(null);
  const { arsenal } = content;

  // Scroll progress for the deck-intro fan-out
  const introRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: introRef,
    offset: ["start start", "end start"],
  });
  const fan = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.4 });
  const titleScale = useTransform(fan, [0, 1], [1, 0.82]);
  const titleY = useTransform(fan, [0, 1], [0, -30]);
  const deckOpacity = useTransform(fan, [0, 0.92, 1], [1, 1, 0]);
  const scrollHintOpacity = useTransform(fan, [0, 0.4], [1, 0]);

  return (
    <section id="arsenal" className="relative overflow-hidden">
      {/* Ambient background */}
      <div className="pointer-events-none absolute left-1/4 top-40 -z-10 h-[500px] w-[500px] rounded-full bg-accent/[0.06] blur-[130px]" />
      <div className="pointer-events-none absolute bottom-40 right-1/4 -z-10 h-[420px] w-[420px] rounded-full bg-primary/[0.04] blur-[120px]" />

      {/* ── Deck intro ── */}
      {staticMode ? (
        <div className="px-5 pt-16 text-center sm:px-6 sm:pt-24">
          <IntroCopy arsenal={arsenal} />
        </div>
      ) : (
        <div ref={introRef} className="relative h-[175vh]">
          <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden">
            <motion.div style={{ opacity: deckOpacity }} className="pointer-events-none absolute inset-0">
              {[0, 1, 2, 3, 4].map((i) => (
                <DeckCard key={i} i={i} progress={fan} reduced={reduced} />
              ))}
            </motion.div>
            <motion.div style={{ scale: titleScale, y: titleY }} className="relative z-20 px-6 text-center">
              <IntroCopy arsenal={arsenal} />
              <motion.p
                style={{ opacity: scrollHintOpacity }}
                className="mt-8 text-xs uppercase tracking-[0.3em] text-muted-foreground/60"
              >
                Scroll to open the deck
              </motion.p>
            </motion.div>
          </div>
        </div>
      )}

      {/* ── Arsenal grid ── */}
      <div className="mx-auto max-w-7xl px-5 pb-20 sm:px-6 sm:pb-28">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
          {arsenal.capabilities.map((cap, i) => (
            <GlassCard
              key={cap.title}
              cap={cap}
              index={i}
              interactive={!staticMode}
              onOpen={() => setActive(i)}
            />
          ))}
        </div>

        {/* ── Closing CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative mt-8 overflow-hidden rounded-[2rem] border border-white/60 bg-gradient-to-br from-primary to-[#1a1a1a] px-8 py-14 text-center shadow-2xl sm:mt-10 sm:px-12 sm:py-20"
        >
          <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-accent/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -right-16 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          <p className="relative text-[11px] uppercase tracking-[0.3em] text-white/50">The bottom line</p>
          <h3 className="relative mx-auto mt-4 max-w-3xl text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl">
            {arsenal.cta}
          </h3>
          <a
            href="#contact"
            className="relative mt-8 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-black transition-transform duration-300 hover:scale-[1.03]"
          >
            {arsenal.ctaButton}
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </motion.div>
      </div>

      <AnimatePresence>
        {active !== null && (
          <CapabilityModal cap={arsenal.capabilities[active]} onClose={() => setActive(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}

function IntroCopy({ arsenal }: { arsenal: typeof content.arsenal }) {
  return (
    <>
      <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-3 py-1">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent sm:text-xs">
          {arsenal.eyebrow}
        </span>
      </div>
      <h2 className="mx-auto max-w-4xl text-5xl font-bold leading-[0.95] tracking-tight text-foreground sm:text-6xl md:text-7xl lg:text-8xl">
        {arsenal.title}
      </h2>
      <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
        {arsenal.sub}
      </p>
    </>
  );
}
