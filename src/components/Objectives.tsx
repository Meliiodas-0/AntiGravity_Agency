import { content } from "@/content/content";

export default function Objectives() {
  return (
    <section className="relative py-14 sm:py-16 md:py-24 px-5 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-10 sm:mb-14">
          {content.objectives.title}
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
          {content.objectives.items.map((item) => (
            <div
              key={item}
              className="border border-border rounded-xl px-5 py-4 sm:px-6 sm:py-5 text-sm sm:text-base text-foreground font-medium tracking-tight transition-colors hover:border-primary/40 hover:bg-primary/5"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
