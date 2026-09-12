import type { Metadata } from "next";

import { ConceptAnchorCaseSection } from "@/components/supplement/concept-anchor-case";
import { routeMetadata, SUPPLEMENT_URL } from "@/content/site-copy";
import { getConceptAnchorCases } from "@/content/supplement/source";

export const metadata: Metadata = routeMetadata.conceptAnchors;

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const routePath = (path: string) => `${basePath}${path}`;
const rawAnchorSource = routePath("/supplementary/archive/data/concept_anchors.md");

export default function ConceptAnchorReferencePage() {
  const anchorCases = getConceptAnchorCases();

  return (
    <main className="anchor-page">
      <header id="top" className="anchor-hero shell">
        <div className="anchor-hero__copy">
          <p className="editorial-kicker">Supplementary material · Concept assignments</p>
          <h1 id="anchor-reference-title">The 50-concept anchor reference</h1>
          <p className="anchor-hero__deck">
            For each concept, we embed five written paraphrases and L2-normalize their mean.
            Papers and anchors use <code>intfloat/multilingual-e5-base</code>. Each anchor
            therefore incorporates all five descriptions rather than one phrase alone.
          </p>
          <p className="anchor-formula">
            <code>anchor(c) = normalize(mean(e_1, …, e_5))</code>
          </p>
        </div>

        <nav className="anchor-contents" aria-label="Anchor case studies">
          <p className="anchor-contents__label">Five case studies</p>
          <ol>
            {anchorCases.map((caseData, index) => (
              <li key={caseData.slug}>
                <a href={`#${caseData.slug}`}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <span>
                    <strong>{caseData.title}</strong>
                    <small>{caseData.yearRange}</small>
                  </span>
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </header>

      <div className="anchor-body shell">
        {anchorCases.map((caseData) => (
          <ConceptAnchorCaseSection caseData={caseData} key={caseData.slug} />
        ))}

        <nav className="anchor-provenance" aria-label="Reference source and return links">
          <p className="section-index">Source and navigation</p>
          <a href={SUPPLEMENT_URL}>Return to the supplementary material</a>
          <a href={rawAnchorSource} download>
            Download the raw concept-anchor Markdown <span aria-hidden="true">↓</span>
          </a>
        </nav>
      </div>
    </main>
  );
}
