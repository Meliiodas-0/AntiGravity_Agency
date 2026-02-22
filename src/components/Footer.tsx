import { content } from "@/content/content";

export default function Footer() {
  return (
<footer className="border-t border-border/40 py-6 sm:py-7 px-6">
      <div className="max-w-6xl mx-auto flex items-center justify-center">
        <p className="text-xs text-muted-foreground/60">
          {content.agency.name} &copy; 2026
        </p>
      </div>
    </footer>
  );
}
