import { useEffect, useRef } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import Lenis from "lenis";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
    const lenisRef = useRef<Lenis | null>(null);
    const isMobile = useIsMobile();

    useEffect(() => {
        // Skip Lenis on mobile — native scroll is smoother and more battery-friendly
        if (isMobile) return;

        const lenis = new Lenis({
            duration: 1.2,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
        });

        lenisRef.current = lenis;

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
        };
    }, [isMobile]);

    return <>{children}</>;
}
