import { legalMeta, resolveTokens, type LegalDocData } from "@/content/legal";

// Renders a structured legal document (see LegalDocData) into readable, on-brand
// long-form text. All strings pass through resolveTokens so [[TOKENS]] become
// the values configured in legalMeta.
export default function LegalDoc({ doc }: { doc: LegalDocData }) {
  return (
    <article className="mx-auto max-w-3xl px-5 sm:px-6 py-14 sm:py-20">
      <p className="mb-3 text-[10px] sm:text-xs uppercase tracking-[0.3em] text-primary/70 font-medium">
        Legal
      </p>
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-foreground">
        {resolveTokens(doc.title)}
      </h1>
      <p className="mt-3 text-sm text-muted-foreground/70">
        Last updated: {legalMeta.effectiveDate}
      </p>

      <div className="mt-10 space-y-8">
        {doc.sections.map((section, i) => (
          <section key={i}>
            <h2 className="mb-3 text-lg sm:text-xl font-semibold text-foreground">
              {resolveTokens(section.heading)}
            </h2>
            <div className="space-y-3">
              {section.blocks.map((block, j) => {
                if (block.type === "h3") {
                  return (
                    <h3 key={j} className="mt-4 text-base font-semibold text-foreground/90">
                      {resolveTokens(block.text)}
                    </h3>
                  );
                }
                if (block.type === "ul") {
                  return (
                    <ul
                      key={j}
                      className="list-disc space-y-1.5 pl-5 text-sm sm:text-base leading-relaxed text-muted-foreground"
                    >
                      {block.items.map((item, k) => (
                        <li key={k}>{resolveTokens(item)}</li>
                      ))}
                    </ul>
                  );
                }
                return (
                  <p key={j} className="text-sm sm:text-base leading-relaxed text-muted-foreground">
                    {resolveTokens(block.text)}
                  </p>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </article>
  );
}
