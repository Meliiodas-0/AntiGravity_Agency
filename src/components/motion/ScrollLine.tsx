import { motion, useScroll, useSpring } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { Settings } from "lucide-react";
import { useEffect, useRef, useState, useCallback } from "react";

export default function ScrollLine() {
  const isMobile = useIsMobile();
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 25,
    restDelta: 0.001,
  });

  const pathRef = useRef<SVGPathElement>(null);
  const [pathTotalLength, setPathTotalLength] = useState(0);
  const [gearPos, setGearPos] = useState({ x: 0, y: 0 });
  const [dims, setDims] = useState({ w: 0, h: 0 });

  const measure = useCallback(() => {
    setDims({
      w: window.innerWidth,
      h: document.documentElement.scrollHeight,
    });
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    const t1 = setTimeout(measure, 600);
    const t2 = setTimeout(measure, 2000);
    return () => {
      window.removeEventListener("resize", measure);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [measure]);

  useEffect(() => {
    if (pathRef.current) {
      setPathTotalLength(pathRef.current.getTotalLength());
    }
  }, [dims]);

  useEffect(() => {
    if (isMobile) return;
    const unsub = smoothProgress.on("change", (v) => {
      if (pathRef.current && pathTotalLength > 0) {
        const pt = pathRef.current.getPointAtLength(v * pathTotalLength);
        setGearPos({ x: pt.x, y: pt.y });
      }
    });
    return unsub;
  }, [smoothProgress, pathTotalLength, isMobile]);

  if (isMobile || dims.h === 0) return null;

  const { w, h } = dims;

  // Stay strictly OUTSIDE the content column
  const contentW = Math.min(1152, w - 40);
  const marginL = (w - contentW) / 2;

  // Gutter edges — always in the margin area, never inside content
  const gutterL = Math.max(20, marginL * 0.35);
  const gutterR = w - gutterL;

  // Path stays in gutters, only crosses in gaps BETWEEN sections
  const pathPoints = [
    // Start top-right gutter
    { x: gutterR, y: h * 0.01 },

    // Down right gutter through hero section
    { x: gutterR, y: h * 0.11 },

    // Gap: hero → proof — cross over to left gutter
    { x: gutterL, y: h * 0.155 },

    // Down left gutter through proof strip
    { x: gutterL, y: h * 0.26 },

    // Gap: proof → stats — cross to right gutter
    { x: gutterR, y: h * 0.30 },

    // Down right gutter through stats
    { x: gutterR, y: h * 0.37 },

    // Gap: stats → capabilities — cross to left
    { x: gutterL, y: h * 0.40 },

    // Down left gutter through capabilities
    { x: gutterL, y: h * 0.51 },

    // Gap: capabilities → process — cross to right
    { x: gutterR, y: h * 0.545 },

    // Down right gutter through process
    { x: gutterR, y: h * 0.65 },

    // Gap: process → trust — cross to left
    { x: gutterL, y: h * 0.69 },

    // Down left gutter through trust
    { x: gutterL, y: h * 0.79 },

    // Gap: trust → contact — cross to right
    { x: gutterR, y: h * 0.83 },

    // Down right gutter through contact
    { x: gutterR, y: h * 0.94 },

    // End bottom
    { x: gutterR, y: h * 0.98 },
  ];

  // Build smooth cubic bezier path
  let d = `M ${pathPoints[0].x} ${pathPoints[0].y}`;
  for (let i = 0; i < pathPoints.length - 1; i++) {
    const curr = pathPoints[i];
    const next = pathPoints[i + 1];
    const dy = next.y - curr.y;
    // Control points: keep vertical midpoint, use current/next x
    const cp1y = curr.y + dy * 0.5;
    const cp2y = curr.y + dy * 0.5;
    d += ` C ${curr.x} ${cp1y}, ${next.x} ${cp2y}, ${next.x} ${next.y}`;
  }

  // Waypoint dots at the horizontal sweep points (section gaps)
  const waypointYFractions = [0.155, 0.30, 0.40, 0.545, 0.69, 0.83];
  const waypointDots = waypointYFractions.map((frac) => {
    const closest = pathPoints.reduce((prev, curr) =>
      Math.abs(curr.y - h * frac) < Math.abs(prev.y - h * frac) ? curr : prev
    );
    return { x: closest.x, y: h * frac };
  });

  const gearSize = 24;

  return (
    <div
      className="absolute top-0 left-0 w-full pointer-events-none"
      style={{ height: h, zIndex: 4 }}
      aria-hidden="true"
    >
      <svg
        width={w}
        height={h}
        className="absolute top-0 left-0"
        style={{ overflow: "visible" }}
      >
        <defs>
          {/* Vertical gradient so line fades at top and bottom */}
          <linearGradient id="scroll-line-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0" />
            <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity="0.04" />
            <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="0.06" />
            <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity="0.04" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
          </linearGradient>

          {/* Glow filter for waypoint dots */}
          <filter id="dot-glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Ghost path (full, very faint) */}
        <path
          d={d}
          fill="none"
          stroke="url(#scroll-line-grad)"
          strokeWidth={1}
          strokeLinecap="round"
        />

        {/* Animated drawn path */}
        <motion.path
          ref={pathRef}
          d={d}
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth={1}
          strokeLinecap="round"
          strokeDasharray="6 12"
          style={{
            pathLength: smoothProgress,
            opacity: 0.15,
          }}
        />

        {/* Waypoint dots at section transitions */}
        {waypointDots.map((dot, i) => (
          <g key={i}>
            <circle
              cx={dot.x}
              cy={dot.y}
              r={4}
              fill="hsl(var(--primary))"
              opacity={0.08}
              filter="url(#dot-glow)"
            />
            <circle
              cx={dot.x}
              cy={dot.y}
              r={1.5}
              fill="hsl(var(--primary))"
              opacity={0.2}
            />
          </g>
        ))}
      </svg>

      {/* Gear icon — CSS spin + follows path */}
      {pathTotalLength > 0 && (
        <div
          className="absolute"
          style={{
            left: gearPos.x - gearSize / 2,
            top: gearPos.y - gearSize / 2,
          }}
        >
          <div className="relative gear-spin">
            {/* Radial glow */}
            <div
              className="absolute rounded-full"
              style={{
                inset: -6,
                background:
                  "radial-gradient(circle, hsl(var(--primary) / 0.15) 0%, transparent 60%)",
              }}
            />
            <Settings
              size={gearSize}
              className="text-primary/40 relative z-10 drop-shadow-[0_0_4px_hsl(var(--primary)/0.3)]"
              strokeWidth={1.5}
            />
          </div>
        </div>
      )}
    </div>
  );
}
