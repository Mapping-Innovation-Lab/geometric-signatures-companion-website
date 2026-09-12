import type { ConceptAnchorCase } from "@/content/supplement/types";

export function ConceptAnchorCaseSection({ caseData }: { caseData: ConceptAnchorCase }) {
  return (
    <section
      id={caseData.slug}
      className="anchor-case"
      aria-labelledby={`${caseData.slug}-heading`}
    >
      <header className="anchor-case__header">
        <div>
          <p className="section-index">{caseData.yearRange}</p>
          <h2 id={`${caseData.slug}-heading`}>{caseData.title}</h2>
        </div>
        <p className="anchor-case__target">
          Target concept <code>{caseData.targetConcept}</code>
        </p>
      </header>

      <div className="anchor-case__concepts">
        {caseData.concepts.map((concept) => (
          <details
            className={`anchor-concept${concept.isTarget ? " anchor-concept--target" : ""}`}
            key={concept.id}
            open={concept.isTarget}
          >
            <summary>
              <code>{concept.id}</code>
              <span>{concept.isTarget ? "Target" : "Context"}</span>
            </summary>
            <div className="anchor-concept__body">
              <div className="anchor-concept__definition">
                <p className="anchor-concept__label">Description</p>
                <p className="anchor-concept__description">{concept.description}</p>
                <p className="anchor-concept__label">Aliases</p>
                <p className="anchor-concept__aliases">{concept.aliases.join("; ")}</p>
              </div>
              <div>
                <p className="anchor-concept__label">Embedded paraphrases</p>
                <ol className="anchor-concept__paraphrases">
                  {concept.paraphrases.map((paraphrase) => (
                    <li key={paraphrase}>{paraphrase}</li>
                  ))}
                </ol>
              </div>
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
