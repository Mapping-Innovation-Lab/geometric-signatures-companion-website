"use client";

import Link from "next/link";
import { useId, useRef, useState } from "react";
import type { CaseStudyContent } from "@/content/schema";

interface ProfileCopy {
  label: string;
  description: string;
}

type Profiles = Record<CaseStudyContent["concentrationProfile"], ProfileCopy>;

function ResultPanel({
  study,
  profile,
  labelledBy,
  panelId,
  hidden,
}: {
  study: CaseStudyContent;
  profile: ProfileCopy;
  labelledBy: string;
  panelId: string;
  hidden: boolean;
}) {
  const { results } = study;

  return (
    <section
      id={panelId}
      className="case-selector__panel"
      role="tabpanel"
      aria-labelledby={labelledBy}
      hidden={hidden}
    >
      <div className="case-selector__story">
        <p className="case-selector__profile">{profile.label}</p>
        <h3>{study.name}</h3>
        <p>{study.dek}</p>
        <p className="case-selector__profile-note">{profile.description}</p>
        <a className="editorial-action" href={`/cases/${study.slug}`}>
          Explore this case <span aria-hidden="true">→</span>
        </a>
      </div>

      <dl className="case-selector__results">
        <div>
          <dt>Data-derived pivot</dt>
          <dd>{results.pivotYear.formatted}</dd>
        </div>
        <div>
          <dt>Target papers</dt>
          <dd>{study.corpus.targetDocuments.formatted}</dd>
        </div>
        <div>
          <dt>Target rank</dt>
          <dd>{results.targetRank.formatted}</dd>
        </div>
        <div>
          <dt>Total inertia, D<sub>I</sub></dt>
          <dd>{results.effectByMetric["total-inertia"].formatted}</dd>
        </div>
        <div>
          <dt>Pairwise distance, D<sub>P</sub></dt>
          <dd>{results.effectByMetric["mean-pairwise-distance"].formatted}</dd>
        </div>
        <div>
          <dt>Random-removal p<sub>co</sub></dt>
          <dd>{results.validation.randomRemoval.pValue.formatted}</dd>
        </div>
        <div>
          <dt>Scrambled-assignment p<sub>co</sub></dt>
          <dd>{results.validation.scrambledAssignment.pValue.formatted}</dd>
        </div>
        <div>
          <dt>Look-elsewhere p</dt>
          <dd>{results.validation.lookElsewhere.pValue.formatted}</dd>
        </div>
      </dl>

      <p className="case-selector__source">
        {study.results.pivotYear.status}. Source: {study.results.pivotYear.source.path},{" "}
        {study.results.pivotYear.source.locator}
      </p>
    </section>
  );
}

export function CaseSelector({
  studies,
  profiles,
}: {
  studies: readonly CaseStudyContent[];
  profiles: Profiles;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const instanceId = useId().replaceAll(":", "");
  const study = studies[activeIndex];

  if (!study) return null;

  function selectCase(index: number, moveFocus = false) {
    setActiveIndex(index);
    if (moveFocus) tabRefs.current[index]?.focus();
  }

  function handleTabKey(event: React.KeyboardEvent<HTMLButtonElement>, index: number) {
    let nextIndex: number | undefined;
    if (event.key === "ArrowRight") nextIndex = (index + 1) % studies.length;
    if (event.key === "ArrowLeft") nextIndex = (index - 1 + studies.length) % studies.length;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = studies.length - 1;

    if (nextIndex !== undefined) {
      event.preventDefault();
      selectCase(nextIndex, true);
    }
  }

  return (
    <div className="case-selector">
      <div className="case-selector__tabs" role="tablist" aria-label="Historical case studies">
        {studies.map((candidate, index) => {
          const selected = index === activeIndex;
          return (
            <button
              key={candidate.id}
              ref={(node) => {
                tabRefs.current[index] = node;
              }}
              id={`${instanceId}-case-tab-${candidate.id}`}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={`${instanceId}-case-panel-${candidate.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => selectCase(index)}
              onKeyDown={(event) => handleTabKey(event, index)}
            >
              <span>{candidate.domain}</span>
              <strong>{candidate.shortName}</strong>
            </button>
          );
        })}
      </div>

      <label className="case-selector__select-label">
        Choose a historical case
        <select
          value={study.id}
          onChange={(event) => {
            const nextIndex = studies.findIndex((candidate) => candidate.id === event.target.value);
            if (nextIndex >= 0) selectCase(nextIndex);
          }}
        >
          {studies.map((candidate) => (
            <option key={candidate.id} value={candidate.id}>{candidate.name}</option>
          ))}
        </select>
      </label>

      {studies.map((candidate, index) => (
        <ResultPanel
          key={candidate.id}
          study={candidate}
          profile={profiles[candidate.concentrationProfile]}
          labelledBy={`${instanceId}-case-tab-${candidate.id}`}
          panelId={`${instanceId}-case-panel-${candidate.id}`}
          hidden={index !== activeIndex}
        />
      ))}

      <Link className="case-selector__comparison" href="/cases">
        Open the full five-case comparison <span aria-hidden="true">→</span>
      </Link>
    </div>
  );
}
