import type { CitationRecord } from "@/content/schema";
import { CitationTreatment } from "@/components/citation-treatment";

export function CitationList({ citations }: { citations: readonly CitationRecord[] }) {
  return (
    <ol className="citation-list">
      {citations.map((citation) => {
        const id = `reference-${citation.bibtexKey}`;
        const titleId = `${id}-title`;

        return (
          <li id={id} key={citation.bibtexKey}>
            <article aria-labelledby={titleId}>
              <p className="citation-list__authors">
                {citation.authors.join(", ")} ({citation.year})
              </p>
              <cite id={titleId}>{citation.title}</cite>
              <CitationTreatment citation={citation} />
              {citation.venue ? <p>{citation.venue}</p> : null}
              <p className="citation-list__source">
                Bibliography key: <code>{citation.bibtexKey}</code>
                <span>Source: {citation.source.locator}</span>
              </p>
            </article>
          </li>
        );
      })}
    </ol>
  );
}
