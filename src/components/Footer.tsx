import { content } from "@/content/content";

export default function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background px-6 py-12 sm:py-14">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          {/* Brand */}
          <div className="max-w-sm">
            <a
              href="#"
              className="text-sm font-bold uppercase tracking-[0.2em] text-foreground"
            >
              {content.agency.name}
            </a>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {content.hero.tagline}. Strategy to execution, owned end-to-end.
            </p>
          </div>

          {/* Quick nav */}
          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {content.nav.map((item) => {
                const id = item.toLowerCase();
                return (
                  <li key={id}>
                    <a
                      href={`#${id}`}
                      className="text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {item}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-border/40 pt-6 sm:flex-row sm:items-center">
          <p className="text-xs text-muted-foreground/60">
            &copy; 2026 {content.agency.name}. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground/50">
            Everything digital. Fully handled.
          </p>
        </div>
      </div>
    </footer>
  );
}
