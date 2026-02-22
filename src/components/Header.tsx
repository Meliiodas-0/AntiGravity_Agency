import { useState, useEffect } from "react";
import { content } from "@/content/content";

export default function Header() {
  const [active, setActive] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const sections = content.nav.map((n) => n.toLowerCase());
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { rootMargin: "-50% 0px -50% 0px" }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/80 border-b border-white/5">
        <nav className="max-w-6xl mx-auto flex items-center justify-between px-5 sm:px-6 h-14 sm:h-16">
          <a href="#" className="text-foreground font-bold text-sm uppercase tracking-[0.2em]">
            {content.agency.name}
          </a>

          {/* Desktop nav */}
          <ul className="hidden md:flex gap-8">
            {content.nav.map((item) => {
              const id = item.toLowerCase();
              return (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    className={`text-xs uppercase tracking-widest transition-colors ${
                      active === id
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {item}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Mobile hamburger */}
          <button
            className="md:hidden relative z-[70] flex flex-col justify-center items-center w-10 h-10 -mr-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            <span
              className={`block w-5 h-0.5 bg-foreground transition-all duration-300 ${
                menuOpen ? "rotate-45 translate-y-[3px]" : ""
              }`}
            />
            <span
              className={`block w-5 h-0.5 bg-foreground mt-1 transition-all duration-300 ${
                menuOpen ? "-rotate-45 -translate-y-[2px]" : ""
              }`}
            />
          </button>
        </nav>
      </header>

      {/* Mobile full-screen overlay - outside header */}
      {menuOpen && (
        <div
          className="md:hidden fixed inset-0 z-[60] flex flex-col items-center justify-center gap-8"
          style={{ background: "hsl(21, 30%, 6%)" }}
        >
          <button
            className="absolute top-4 right-3 z-[70] w-10 h-10 flex flex-col justify-center items-center"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            <span className="block w-5 h-0.5 bg-foreground rotate-45 translate-y-[1px]" />
            <span className="block w-5 h-0.5 bg-foreground -rotate-45 -translate-y-[1px]" />
          </button>

          {content.nav.map((item) => {
            const id = item.toLowerCase();
            return (
              <a
                key={id}
                href={`#${id}`}
                onClick={() => setMenuOpen(false)}
                className={`text-2xl font-semibold uppercase tracking-widest transition-colors ${
                  active === id
                    ? "text-accent"
                    : "text-foreground/70 active:text-accent"
                }`}
              >
                {item}
              </a>
            );
          })}
        </div>
      )}
    </>
  );
}
