import type { Metadata } from "next";

import { ArchiveFigurePlate } from "@/components/supplement/archive-figure";
import { ResultTable } from "@/components/supplement/result-table";
import { InlineMath, ScientificText } from "@/components/scientific-text";
import { PublicationLink } from "@/components/publication-link";
import {
  publishedArchiveChapters,
  publishedArchiveFigures,
} from "@/content/supplement/archive";
import { CONCEPT_ANCHORS_URL, routeMetadata } from "@/content/site-copy";
import { publishedSupplementaryItems } from "@/content/supplementary";
import {
  formatPValue,
  getLookElsewhereRows,
  getNullRows,
  getRankingInterpretation,
  getRankingRows,
  getTauRows,
} from "@/content/supplement/source";

export const metadata: Metadata = routeMetadata.supplement;

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const archiveData = (file: string) => `${basePath}/supplementary/archive/data/${file}`;

const tauRows = getTauRows();
const nullRows = getNullRows();
const lookElsewhereRows = getLookElsewhereRows();
const rankingRows = getRankingRows();
const rankingInterpretation = getRankingInterpretation();
const publishedFigureById = new Map(
  publishedArchiveFigures.map((figure) => [figure.id, figure]),
);
const publishedChapterIndex = (index: number) => String(index + 2).padStart(2, "0");

const tauTable = (
  <ResultTable
    caption="Case-specific confusion-aware margin calibration and assigned-paper counts."
    columns={[
      { key: "case", label: "Case" },
      { key: "pivot", label: "t*", align: "right" },
      { key: "fKnee", label: "f_knee", align: "right" },
      { key: "nearestSimilarity", label: "Nearest-anchor similarity", align: "right" },
      { key: "nearestConcept", label: "Nearest concept" },
      { key: "tau", label: "tau(c)", align: "right" },
      { key: "assignedPapers", label: "Assigned papers", align: "right" },
      { key: "maxAbsD", label: "max(|D_I|, |D_P|)", align: "right" },
      { key: "rank", label: "Rank", align: "right" },
    ]}
    rows={tauRows.map((row) => ({
      id: row.caseId,
      case: row.label,
      pivot: row.pivotYear,
      fKnee: row.fKnee.toFixed(3),
      nearestSimilarity: row.nearestSimilarity.toFixed(3),
      nearestConcept: row.nearestConcept,
      tau: row.tau.toFixed(3),
      assignedPapers: row.assignedPapers.toLocaleString("en-US"),
      maxAbsD: row.maxAbsD.toFixed(3),
      rank: row.rank,
    }))}
  />
);

const nullTable = (
  <ResultTable
    caption="Joint co-dominance p-values under the two null designs."
    columns={[
      { key: "case", label: "Case" },
      { key: "randomRemoval", label: "Random-removal p_co", align: "right" },
      { key: "scrambledAssignment", label: "Scrambled-assignment p_co", align: "right" },
    ]}
    rows={nullRows.map((row) => ({
      id: row.caseId,
      case: row.label,
      randomRemoval: row.randomRemoval,
      scrambledAssignment: row.scrambledAssignment,
    }))}
  />
);

const lookElsewhereTable = (
  <ResultTable
    caption="Grid-wide maximum response and look-elsewhere correction across each 10-concept by 11-year grid."
    columns={[
      { key: "case", label: "Case" },
      { key: "globalMaxL2", label: "Global max ||D||_2", align: "right" },
      { key: "globalP", label: "p_global", align: "right" },
      { key: "zScore", label: "z", align: "right" },
      { key: "maximisingCell", label: "Maximizing cell" },
      { key: "onTarget", label: "On target?" },
    ]}
    rows={lookElsewhereRows.map((row) => ({
      id: row.caseId,
      case: row.label,
      globalMaxL2: row.globalMaxL2.toFixed(3),
      globalP: formatPValue(row.globalP, false),
      zScore: row.zScore.toFixed(3),
      maximisingCell: `${row.maximisingConcept}, ${row.maximisingYear}`,
      onTarget: row.onTarget ? "Yes" : "No",
    }))}
  />
);

const rankingTable = (
  <ResultTable
    caption="Target ranking under the manuscript's maximum norm, joint Euclidean magnitude, and sign-aware p-value."
    columns={[
      { key: "case", label: "Case" },
      { key: "pivot", label: "t*", align: "right" },
      { key: "maxAbsD", label: "max(|D_I|, |D_P|)", align: "right" },
      { key: "rankMaxAbsD", label: "Rank", align: "right" },
      { key: "l2", label: "||D||_2", align: "right" },
      { key: "rankL2", label: "Rank", align: "right" },
      { key: "p2D", label: "p_2D", align: "right" },
      { key: "rankP2D", label: "Rank", align: "right" },
    ]}
    rows={rankingRows.map((row) => ({
      id: row.caseId,
      case: row.label,
      pivot: row.pivotYear,
      maxAbsD: row.maxAbsD.toFixed(3),
      rankMaxAbsD: row.rankMaxAbsD,
      l2: row.l2.toFixed(3),
      rankL2: row.rankL2,
      p2D: formatPValue(row.p2D, row.p2DIsFloor),
      rankP2D: row.rankP2D,
    }))}
  />
);

function ChapterTables({ chapterId }: { chapterId: string }) {
  if (chapterId === "calibration") return tauTable;
  if (chapterId === "nulls") return nullTable;
  if (chapterId === "look-elsewhere") {
    return (
      <div className="archive-tables">
        {lookElsewhereTable}
        {rankingTable}
        <p className="archive-ranking-interpretation">
          {rankingInterpretation.deepLearning.label} is rank{" "}
          {rankingInterpretation.deepLearning.targetRankL2} under <ScientificText text="||D||_2" /> at{" "}
          {rankingInterpretation.deepLearning.targetL2.toFixed(3)}, a near-tie with rank{" "}
          {rankingInterpretation.deepLearning.competitorRankL2}{" "}
          <code>{rankingInterpretation.deepLearning.competitorConcept}</code> at{" "}
          {rankingInterpretation.deepLearning.competitorL2.toFixed(3)}. {" "}
          {rankingInterpretation.attention.label} improves from rank{" "}
          {rankingInterpretation.attention.rankMaxAbsD} under <ScientificText text="max(|D_I|, |D_P|)" />{" "}
          to rank {rankingInterpretation.attention.rankP2D} under <ScientificText text="p_2D" /> ({
            rankingInterpretation.attention.rankMaxAbsD
          }{" "}
          → {rankingInterpretation.attention.rankP2D}).
        </p>
      </div>
    );
  }
  return null;
}

export default function SupplementArchivePage() {
  return (
    <main className="archive-page">
      <header id="top" className="archive-hero shell">
        <div className="archive-hero__copy">
          <p className="editorial-kicker">Supplementary material · Additional analyses</p>
          <h1 id="archive-title">Supplementary material</h1>
          <p className="archive-hero__deck">
            Robustness checks, assignment figures, and null tests.
          </p>
        </div>

        <nav className="archive-contents" aria-label="Supplementary contents">
          <p className="archive-contents__label">Contents</p>
          <ol>
            <li>
              <a href="#robustness">
                <span>01</span>
                Assignment and robustness checks
              </a>
            </li>
            {publishedArchiveChapters.map((chapter, index) => (
              <li key={chapter.id}>
                <a href={`#${chapter.id}`}>
                  <span>{publishedChapterIndex(index)}</span>
                  {chapter.title}
                </a>
              </li>
            ))}
            <li>
              <a href="#source-data"><span>06</span>Source data</a>
            </li>
          </ol>
        </nav>
      </header>

      <div className="archive-body shell">
        <section
          id="robustness"
          className="archive-chapter"
          aria-labelledby="robustness-heading"
        >
          <header className="archive-chapter__header">
            <p className="section-index">01 / Chapter one</p>
            <h2 id="robustness-heading">Assignment and robustness checks</h2>
          </header>

          <div className="archive-chapter__reading">
            <div>
              <p className="archive-chapter__label">Question</p>
              <p>
                How sensitive are the assignments to the threshold, number of
                concepts, and composition of the concept set?
              </p>
            </div>
            <div>
              <p className="archive-chapter__label">Result</p>
              <p>
                We compare these choices through coverage, the
                resulting assignments, and the case-study responses.
              </p>
            </div>
            <div>
              <p className="archive-chapter__label">Conclusion</p>
              <p>
                These checks show where the comparison is stable and where the
                interpretation remains conditional on the assignment procedure.
              </p>
            </div>
          </div>

          <div className="supplementary-list">
            {publishedSupplementaryItems.map((item, index) => (
              <article
                className={`supplementary-item supplementary-item--${item.layout}`}
                key={item.id}
                id={item.id}
              >
                <figure className="supplementary-item__figure">
                  <a className="figure-enlarge" href={item.imagePath} target="_blank" rel="noreferrer" aria-label={`View full-size figure: ${item.title} (opens in a new tab)`}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={item.imagePath} alt={item.imageAlt} width={item.width} height={item.height} loading="lazy" decoding="async" />
                  </a>
                </figure>
                <div className="supplementary-item__copy">
                  <p className="supplementary-item__eyebrow">
                    {String(index + 1).padStart(2, "0")} / {item.eyebrow}
                  </p>
                  <h3>{item.title}</h3>
                  <p><ScientificText text={item.description} /></p>
                  {item.equation ? <p><InlineMath latex={item.equation} /> where <InlineMath latex={String.raw`s_{\mathrm{nn}}(c)`} /> is the cosine similarity to the nearest competing concept anchor.</p> : null}
                  <p className="supplementary-item__why">
                    <strong>Interpretation.</strong> <ScientificText text={item.whyItMatters} />
                  </p>
                  {item.details ? <details className="supplementary-details">
                    <summary>Methods and additional context</summary>
                    {item.details.map((paragraph) => <p key={paragraph}><ScientificText text={paragraph} /></p>)}
                  </details> : null}
                </div>
              </article>
            ))}
          </div>
        </section>

        {publishedArchiveChapters.map((chapter, chapterIndex) => {
          const chapterFigures = chapter.figureIds.map((figureId) => {
            const figure = publishedFigureById.get(figureId);
            if (!figure) throw new Error(`Missing archive figure ${figureId}.`);
            return figure;
          });

          return (
            <section
              id={chapter.id}
              className="archive-chapter"
              aria-labelledby={`${chapter.id}-heading`}
              key={chapter.id}
            >
              <header className="archive-chapter__header">
                <p className="section-index">
                  {publishedChapterIndex(chapterIndex)} / Chapter {[
                    "two",
                    "three",
                    "four",
                    "five",
                  ][chapterIndex]}
                </p>
                <h2 id={`${chapter.id}-heading`}>{chapter.title}</h2>
              </header>

              <div className="archive-chapter__reading">
                <div>
                  <p className="archive-chapter__label">Question</p>
                  <p><ScientificText text={chapter.question} /></p>
                </div>
                <div>
                  <p className="archive-chapter__label">Result</p>
                  <p><ScientificText text={chapter.result} /></p>
                </div>
                <div>
                  <p className="archive-chapter__label">Conclusion</p>
                  <p><ScientificText text={chapter.conclusion} /></p>
                </div>
              </div>

              {chapter.caveat ? (
                <div className="archive-caveat" role="note">
                  {chapter.id === "anchors" ? (
                    <p><strong>More details:</strong> You can find the complete 50-concept reference, including descriptions, aliases, and paraphrases, <a className="text-link" href={CONCEPT_ANCHORS_URL}>here</a>.</p>
                  ) : <p><strong>Interpretation note.</strong> <ScientificText text={chapter.caveat} /></p>}
                </div>
              ) : null}

              {chapter.id === "anchors" ? (
                <div className="archive-definition" role="note">
                  <p>
                    <strong>PC1 and PC2.</strong> Panel (a) uses principal component analysis (PCA), not UMAP or t-SNE. PC1 and PC2 are the first and second principal components of the 50 paraphrase embeddings in each case. The ensemble anchors are projected into the same two-dimensional display without refitting the axes. PCA is used only for visualization; assignments are evaluated in the full embedding space.
                  </p>
                  <p>
                    <strong>Gray points in panel (b).</strong> This panel plots similarity to each paper&apos;s best-matching anchor against its margin over the runner-up; it is not a low-dimensional projection. Orange points are assigned to the target. Gray points include papers assigned to other concepts and papers labeled “no match.” The lines mark the target&apos;s thresholds; the shaded bands show the ranges for other concepts. Crossing both target lines does not imply target membership: the target must also be the paper&apos;s closest anchor, and other concepts have their own thresholds.
                  </p>
                </div>
              ) : null}

              <ChapterTables chapterId={chapter.id} />

              <div className="archive-figure-grid">
                {chapterFigures.map((figure) => (
                  <ArchiveFigurePlate figure={figure} key={figure.id} />
                ))}
              </div>
            </section>
          );
        })}

        <aside id="source-data" className="archive-provenance" aria-labelledby="archive-provenance-heading">
          <p className="section-index">06 / Source data</p>
          <h2 id="archive-provenance-heading">Download the source files.</h2>
          <p>
            The figures are accompanied by the machine-readable inputs used to prepare the
            displayed comparisons. These files provide the values behind the plots and tables.
          </p>
          <p>
            The <PublicationLink resource="analysis">analysis code and reproduction instructions</PublicationLink>
            {" "}are available on GitHub.
          </p>
          <ul>
            <li><a href={archiveData("concept_anchors.md")} download>Concept anchors · Markdown</a></li>
            <li><a href={archiveData("ranking_pvalues.json")} download>Null and look-elsewhere results · JSON</a></li>
            <li><a href={archiveData("ranking_three_way.json")} download>Three-way ranking · JSON</a></li>
            <li><a href={archiveData("concept-count-robustness-v4.json")} download>Concept-count robustness · V4 · JSON</a></li>
            <li><a href={archiveData("paraphrase-stability-v2-rev2.json")} download>Paraphrase stability · V2, revision 2 · JSON</a></li>
          </ul>
        </aside>
      </div>
    </main>
  );
}
