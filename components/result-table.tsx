import Link from "next/link";
import { concentrationProfiles } from "@/content/cases";
import type { CaseStudyContent } from "@/content/schema";

export function ResultTable({ studies }: { studies: readonly CaseStudyContent[] }) {
  return (
    <div
      className="result-table-wrap"
      role="region"
      tabIndex={0}
      aria-labelledby="comparison-title"
    >
      <table className="result-table">
        <caption>
          Provisional cross-case values from the current near-final manuscript snapshot.
        </caption>
        <thead>
          <tr>
            <th scope="col">Case</th>
            <th scope="col">Corpus documents</th>
            <th scope="col">Target papers</th>
            <th scope="col">Pivot</th>
            <th scope="col">Rank</th>
            <th scope="col">D_I</th>
            <th scope="col">D_P</th>
            <th scope="col">max |D|</th>
            <th scope="col">Random p_co</th>
            <th scope="col">Scrambled p_co</th>
            <th scope="col">LEE p</th>
            <th scope="col">Profile</th>
          </tr>
        </thead>
        <tbody>
          {studies.map((study) => {
            const href = `/cases/${study.slug}`;
            const profile = concentrationProfiles[study.concentrationProfile];

            return (
              <tr key={study.id}>
                <th scope="row">
                  <Link href={href}>{study.name}</Link>
                  <span>
                    {study.domain} · {study.historicalYearLabel}
                  </span>
                </th>
                <td>{study.corpus.documents?.formatted ?? "Not reported"}</td>
                <td>{study.corpus.targetDocuments.formatted}</td>
                <td>{study.results.pivotYear.formatted}</td>
                <td>{study.results.targetRank.formatted}</td>
                <td>{study.results.effectByMetric["total-inertia"].formatted}</td>
                <td>{study.results.effectByMetric["mean-pairwise-distance"].formatted}</td>
                <td>{study.results.maxAbsoluteEffect.formatted}</td>
                <td>{study.results.validation.randomRemoval.pValue.formatted}</td>
                <td>{study.results.validation.scrambledAssignment.pValue.formatted}</td>
                <td>{study.results.validation.lookElsewhere.pValue.formatted}</td>
                <td>
                  <Link href={href}>{profile.label}</Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
