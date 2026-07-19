import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
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
  Target, BookOpen, BadgeCheck, Instagram, Megaphone, Globe, Clapperboard,
  Bot, Workflow, Rocket, Map: MapIcon, BarChart3, Lightbulb, Server,
};

type Capability = (typeof content.arsenal.capabilities)[number];
type Slot = { tx: number; ty: number };

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
const clamp01 = (t: number) => Math.min(1, Math.max(0, t));

// ─── Layout: where each card lands once the deck is dealt ─────────────────────
function computeLayout(w: number, h: number, n: number) {
  const cols = w < 640 ? 2 : w < 920 ? 3 : w < 1220 ? 4 : 5;
  const gap = w < 640 ? 14 : 24;
  const maxGridW = Math.min(w * 0.95, 1880);
  const cardW = Math.floor((maxGridW - (cols - 1) * gap) / cols);
  const rows = Math.ceil(n / cols);
  const maxGridH = h * 0.99;
  const cardHFit = Math.floor((maxGridH - (rows - 1) * gap) / rows);
  // Let cards fill the vertical space (cap the aspect so they don't get absurdly tall).
  const cardH = Math.max(170, Math.min(Math.round(cardW * 0.82), cardHFit));
  const gridH = rows * cardH + (rows - 1) * gap;
  const lastRowCount = n - (rows - 1) * cols;
  const slots: Slot[] = [];
  for (let i = 0; i < n; i++) {
    const col = i % cols;
    const row = Math.floor(i / cols);
    // Center any short final row instead of leaving an empty slot on the right.
    const inRow = row === rows - 1 ? lastRowCount : cols;
    const rowW = inRow * cardW + (inRow - 1) * gap;
    slots.push({
      tx: -rowW / 2 + col * (cardW + gap) + cardW / 2,
      ty: -gridH / 2 + row * (cardH + gap) + cardH / 2,
    });
  }
  return { cardW, cardH, slots };
}

// ─── A card being thrown from the deck to its grid slot ──────────────────────
function ThrowCard({
  cap, index, total, slot, cardW, cardH, spread, onOpen,
}: {
  cap: Capability;
  index: number;
  total: number;
  slot: Slot;
  cardW: number;
  cardH: number;
  spread: MotionValue<number>;
  onOpen: () => void;
}) {
  const Icon = ICONS[cap.icon] ?? Sparkles;

  // Deal top-left first: card 0 leaves first. Finishes by ~0.68 so the tail
  // of the scroll is free for the finale.
  const step = 0.42 / total;
  const startP = index * step;
  const dur = 0.28;
  const stackRot = (index - (total - 1) / 2) * 1.6;
  const stackX = (index - (total - 1) / 2) * 4;

  const local = (p: number) => easeOut(clamp01((p - startP) / dur));
  const x = useTransform(spread, (p) => stackX + (slot.tx - stackX) * local(p));
  const y = useTransform(spread, (p) => slot.ty * local(p));
  const rotate = useTransform(spread, (p) => stackRot * (1 - local(p)));
  // Deck already sits near full size so the stack reads big.
  const scale = useTransform(spread, (p) => 0.94 + 0.06 * local(p));

  return (
    <motion.button
      type="button"
      onClick={onOpen}
      style={{
        x, y, rotate, scale,
        width: cardW,
        height: cardH,
        marginLeft: -cardW / 2,
        marginTop: -cardH / 2,
        zIndex: total - index,
      }}
      className="group absolute left-1/2 top-1/2 flex flex-col overflow-hidden rounded-3xl border border-white/60 bg-white/60 p-5 text-left shadow-[0_16px_50px_-16px_rgba(0,0,0,0.28)] backdrop-blur-xl transition-colors duration-500 hover:bg-white/90 sm:p-6"
    >
      <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-accent/[0.08] via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="relative flex items-center justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6">
          <Icon className="h-[22px] w-[22px]" strokeWidth={1.8} />
        </div>
        <ArrowUpRight className="h-[18px] w-[18px] text-muted-foreground/50 transition-all duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
      </div>
      <h3 className="relative mt-4 text-lg font-bold leading-tight tracking-tight text-foreground sm:text-xl">
        {cap.title}
      </h3>
      <p className="relative mt-1.5 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
        {cap.blurb}
      </p>
      <div className="relative mt-auto flex flex-wrap gap-1.5 pt-4">
        {cap.items.slice(0, 3).map((it) => (
          <span key={it} className="rounded-full border border-black/[0.06] bg-white/70 px-2.5 py-1 text-[11px] font-medium text-muted-foreground">
            {it}
          </span>
        ))}
      </div>
    </motion.button>
  );
}

// ─── Static card (mobile / reduced-motion) ───────────────────────────────────
function GlassCard({ cap, index, onOpen }: { cap: Capability; index: number; onOpen: () => void }) {
  const Icon = ICONS[cap.icon] ?? Sparkles;
  return (
    <motion.button
      type="button"
      onClick={onOpen}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.05 }}
      className="group relative flex min-h-[170px] flex-col overflow-hidden rounded-3xl border border-white/60 bg-white/60 p-5 text-left shadow-[0_8px_40px_-12px_rgba(0,0,0,0.12)] backdrop-blur-xl"
    >
      <div className="flex items-center justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg">
          <Icon className="h-5 w-5" strokeWidth={1.8} />
        </div>
        <ArrowUpRight className="h-4 w-4 text-muted-foreground/50" />
      </div>
      <h3 className="mt-4 text-lg font-bold leading-tight tracking-tight text-foreground">{cap.title}</h3>
      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{cap.blurb}</p>
      <div className="mt-auto flex flex-wrap gap-1.5 pt-4">
        {cap.items.slice(0, 3).map((it) => (
          <span key={it} className="rounded-full border border-black/[0.06] bg-white/70 px-2.5 py-1 text-[10px] font-medium text-muted-foreground">
            {it}
          </span>
        ))}
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
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    >
      <motion.div
        className="absolute inset-0 bg-black/50 backdrop-blur-md" onClick={onClose}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      />
      <motion.div
        role="dialog" aria-modal="true" aria-label={cap.title}
        initial={{ opacity: 0, y: 40, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 30, scale: 0.97 }}
        transition={{ type: "spring", stiffness: 260, damping: 26 }}
        className="relative z-10 w-full max-w-lg overflow-hidden rounded-3xl border border-white/70 bg-white/85 p-7 shadow-2xl backdrop-blur-2xl sm:p-9"
      >
        <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-accent/10 blur-3xl" />
        <button type="button" onClick={onClose} aria-label="Close" className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-black/5 text-foreground transition-colors hover:bg-black/10">
          <X className="h-4 w-4" />
        </button>
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg">
          <Icon className="h-6 w-6" strokeWidth={1.8} />
        </div>
        <h3 className="mt-5 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">{cap.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">{cap.blurb}</p>
        <div className="mt-6 grid grid-cols-2 gap-2">
          {cap.items.map((it, i) => (
            <motion.div key={it} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.08 + i * 0.03 }} className="flex items-center gap-2 rounded-xl border border-black/[0.05] bg-white/60 px-3 py-2">
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

function IntroCopy({ arsenal }: { arsenal: typeof content.arsenal }) {
  return (
    <>
      <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-3 py-1">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent sm:text-xs">{arsenal.eyebrow}</span>
      </div>
      <h2 className="mx-auto max-w-4xl text-4xl font-bold leading-[0.95] tracking-tight text-foreground sm:text-5xl md:text-6xl">
        {arsenal.title}
      </h2>
      <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">{arsenal.sub}</p>
    </>
  );
}

function ClosingCTA({ arsenal }: { arsenal: typeof content.arsenal }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="relative mt-6 overflow-hidden rounded-[2rem] border border-white/60 bg-gradient-to-br from-primary to-[#1a1a1a] px-8 py-14 text-center shadow-2xl sm:mt-10 sm:px-12 sm:py-20"
    >
      <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-accent/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-16 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
      <p className="relative text-[11px] uppercase tracking-[0.3em] text-white/50">The bottom line</p>
      <h3 className="relative mx-auto mt-4 max-w-3xl text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl">
        {arsenal.cta}
      </h3>
      <a href="#contact" className="relative mt-8 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-black transition-transform duration-300 hover:scale-[1.03]">
        {arsenal.ctaButton}
        <ArrowUpRight className="h-4 w-4" />
      </a>
    </motion.div>
  );
}

export default function Arsenal() {
  const reduced = useReducedMotion() ?? false;
  const isMobile = useIsMobile();
  const staticMode = reduced || isMobile;
  const [active, setActive] = useState<number | null>(null);
  const { arsenal } = content;
  const caps = arsenal.capabilities;

  // Scroll → latched "spread" that only ever increases (throw plays once).
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const spread = useMotionValue(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (v > spread.get()) spread.set(v);
  });

  // Finale: once the deck has settled, the grid recedes and a closing line
  // rises in — so the tail of the scroll is a payoff, not dead static space.
  // (Transform values track scroll live; opacity is toggled via state + CSS.)
  const gridScale = useTransform(scrollYProgress, [0.7, 0.95], [1, 0.9]);
  const finaleY = useTransform(scrollYProgress, [0.76, 0.94], [48, 0]);
  const [finaleOn, setFinaleOn] = useState(false);
  useMotionValueEvent(scrollYProgress, "change", (v) => setFinaleOn(v > 0.8));

  // Measure the card stage so cards land in a centered, responsive grid.
  const layerRef = useRef<HTMLDivElement>(null);
  const [dims, setDims] = useState({ w: 0, h: 0 });
  useEffect(() => {
    const el = layerRef.current;
    if (!el) return;
    const measure = () => setDims({ w: el.clientWidth, h: el.clientHeight });
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [staticMode]);

  const modal = (
    <AnimatePresence>
      {active !== null && <CapabilityModal cap={caps[active]} onClose={() => setActive(null)} />}
    </AnimatePresence>
  );

  // ── Static grid (mobile / reduced motion) ──
  if (staticMode) {
    return (
      <section id="arsenal" className="relative overflow-hidden px-5 py-16 sm:px-6 sm:py-24">
        <div className="pointer-events-none absolute left-1/4 top-24 -z-10 h-[400px] w-[400px] rounded-full bg-accent/[0.06] blur-[120px]" />
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 text-center">
            <IntroCopy arsenal={arsenal} />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {caps.map((cap, i) => (
              <GlassCard key={cap.title} cap={cap} index={i} onOpen={() => setActive(i)} />
            ))}
          </div>
          <ClosingCTA arsenal={arsenal} />
        </div>
        {modal}
      </section>
    );
  }

  const layout = dims.w > 0 ? computeLayout(dims.w, dims.h, caps.length) : null;

  // ── Scroll-driven deck (desktop + motion) ──
  return (
    <section id="arsenal" className="relative">
      <div className="pointer-events-none absolute left-1/4 top-40 -z-10 h-[500px] w-[500px] rounded-full bg-accent/[0.06] blur-[130px]" />
      <div className="pointer-events-none absolute bottom-40 right-1/4 -z-10 h-[420px] w-[420px] rounded-full bg-primary/[0.04] blur-[120px]" />

      <div ref={sectionRef} className="relative h-[260vh]">
        <div className="sticky top-0 flex h-screen flex-col overflow-hidden pt-16">
          {/* Subtle dot texture so the stage never reads as blank white */}
          <div
            className="pointer-events-none absolute inset-0 -z-10"
            style={{
              backgroundImage: "radial-gradient(circle, rgba(0,0,0,0.055) 1px, transparent 1px)",
              backgroundSize: "26px 26px",
              maskImage: "radial-gradient(ellipse 65% 55% at 50% 45%, #000, transparent 75%)",
              WebkitMaskImage: "radial-gradient(ellipse 65% 55% at 50% 45%, #000, transparent 75%)",
            }}
          />

          <div className="relative z-30 shrink-0 px-6 text-center">
            <IntroCopy arsenal={arsenal} />
          </div>

          {/* Card stage — deck stacks in the middle, deals into the grid, then recedes */}
          <motion.div
            ref={layerRef}
            style={{ scale: gridScale }}
            className={`relative mt-2 flex-1 transition-opacity duration-500 ${finaleOn ? "opacity-20" : "opacity-100"}`}
          >
            {layout &&
              caps.map((cap, i) => (
                <ThrowCard
                  key={cap.title}
                  cap={cap}
                  index={i}
                  total={caps.length}
                  slot={layout.slots[i]}
                  cardW={layout.cardW}
                  cardH={layout.cardH}
                  spread={spread}
                  onOpen={() => setActive(i)}
                />
              ))}
          </motion.div>

          {/* Finale — rises in over the settled grid as the last of the scroll plays */}
          <motion.div
            style={{ y: finaleY }}
            className={`absolute inset-x-0 bottom-0 top-0 z-40 flex flex-col items-center justify-center px-6 text-center transition-opacity duration-500 ${
              finaleOn ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <p className="text-[11px] uppercase tracking-[0.3em] text-accent/70">The bottom line</p>
            <h3 className="mx-auto mt-4 max-w-3xl text-3xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-5xl md:text-6xl">
              {arsenal.cta}
            </h3>
            <a
              href="#contact"
              className="mt-9 inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-semibold text-primary-foreground shadow-xl shadow-primary/20 transition-transform duration-300 hover:scale-[1.03]"
            >
              {arsenal.ctaButton}
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </motion.div>
        </div>
      </div>

      {modal}
    </section>
  );
}
