import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";
import { content } from "@/content/content";

// Minimal shell for standalone legal pages: a slim top bar with a route home,
// the document body, and the shared site footer.
export default function LegalLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border/40 bg-background/80 backdrop-blur-md">
        <nav className="mx-auto flex h-14 sm:h-16 max-w-6xl items-center justify-between px-5 sm:px-6">
          <Link to="/" className="text-sm font-bold uppercase tracking-[0.2em] text-foreground">
            {content.agency.name}
          </Link>
          <Link
            to="/"
            className="text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
          >
            &larr; Back to site
          </Link>
        </nav>
      </header>

      <main role="main">{children}</main>

      <Footer />
    </div>
  );
}
