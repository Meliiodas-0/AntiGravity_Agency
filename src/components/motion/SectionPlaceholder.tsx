import { useRef, ReactNode } from "react";

interface SectionPlaceholderProps {
    children?: ReactNode;
    height?: string | number;
    className?: string;
}

/**
 * A stable placeholder for lazy-loaded sections.
 * Essential for mobile/iOS to prevent layout shifts and flickering.
 */
export default function SectionPlaceholder({
    children,
    height = "600px",
    className = ""
}: SectionPlaceholderProps) {
    return (
        <div
            className={`w-full overflow-hidden ${className}`}
            style={{ minHeight: typeof height === 'number' ? `${height}px` : height }}
        >
            {children}
        </div>
    );
}
