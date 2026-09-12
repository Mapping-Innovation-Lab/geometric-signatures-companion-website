"use client";

import { useId, useRef, useState } from "react";
import { MathBlock } from "@/components/math-block";
import type { MethodEquation } from "@/content/method";
import type { MetricDefinition, MetricId } from "@/content/schema";

const pedagogicalPoints = [
  [18, 70],
  [34, 30],
  [50, 58],
  [66, 22],
  [82, 55],
] as const;

const pointTotals = pedagogicalPoints.reduce(
  (sum, [x, y]) => [sum[0] + x, sum[1] + y],
  [0, 0],
);
const centroid = [
  pointTotals[0] / pedagogicalPoints.length,
  pointTotals[1] / pedagogicalPoints.length,
] as const;

const pointPairs = pedagogicalPoints.flatMap((point, index) =>
  pedagogicalPoints.slice(index + 1).map((other) => [point, other] as const),
);

interface MetricEquations {
  "total-inertia": MethodEquation;
  "mean-pairwise-distance": MethodEquation;
}

export function MetricGeometry({
  metrics,
  equations,
}: {
  metrics: readonly MetricDefinition[];
  equations: MetricEquations;
}) {
  const [activeId, setActiveId] = useState<MetricId>("total-inertia");
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const instanceId = useId().replaceAll(":", "");
  const activeIndex = metrics.findIndex((metric) => metric.id === activeId);
  const metric = metrics[activeIndex] ?? metrics[0];
  const equation = equations[metric.id];

  function selectMetric(index: number, moveFocus = false) {
    const nextMetric = metrics[index];
    if (!nextMetric) return;
    setActiveId(nextMetric.id);
    if (moveFocus) tabRefs.current[index]?.focus();
  }

  function handleTabKey(event: React.KeyboardEvent<HTMLButtonElement>, index: number) {
    let nextIndex: number | undefined;
    if (event.key === "ArrowRight") nextIndex = (index + 1) % metrics.length;
    if (event.key === "ArrowLeft") nextIndex = (index - 1 + metrics.length) % metrics.length;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = metrics.length - 1;
    if (nextIndex !== undefined) {
      event.preventDefault();
      selectMetric(nextIndex, true);
    }
  }

  if (!metric) return null;

  return (
    <div className="metric-geometry">
      <div className="metric-geometry__tabs" role="tablist" aria-label="Geometry metric">
        {metrics.map((candidate, index) => {
          const selected = candidate.id === metric.id;
          return (
            <button
              key={candidate.id}
              ref={(node) => {
                tabRefs.current[index] = node;
              }}
              id={`${instanceId}-metric-tab-${candidate.id}`}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={`${instanceId}-metric-panel`}
              tabIndex={selected ? 0 : -1}
              onClick={() => selectMetric(index)}
              onKeyDown={(event) => handleTabKey(event, index)}
            >
              {candidate.name}
            </button>
          );
        })}
      </div>

      <section
        id={`${instanceId}-metric-panel`}
        className="metric-geometry__panel"
        role="tabpanel"
        tabIndex={0}
        aria-labelledby={`${instanceId}-metric-tab-${metric.id}`}
      >
        <figure className="metric-geometry__figure">
          <div className="metric-geometry__plot">
            <p>One fixed pedagogical arrangement</p>
            <svg
              viewBox="0 0 100 100"
              role="img"
              aria-label={
                metric.id === "total-inertia"
                  ? "Five fixed concept centroids connected to their arithmetic mean."
                  : "The same five fixed concept centroids connected pairwise."
              }
              data-points={pedagogicalPoints.map((point) => point.join(",")).join(";")}
              data-centroid={`${centroid[0]},${centroid[1]}`}
            >
              <title>{metric.name} on a fixed pedagogical concept geometry</title>
              <desc>
                The axes and five concept-centroid positions remain fixed while the selected
                geometric relationship changes.
              </desc>
              <path className="metric-geometry__axis" d="M 10 88 H 92 M 10 88 V 8" />
              <text className="metric-geometry__axis-label" x="73" y="97">Dimension 1</text>
              <text className="metric-geometry__axis-label" x="2" y="12">Dimension 2</text>
              <g className={`metric-geometry__relations metric-geometry__relations--${metric.id}`}>
                {metric.id === "total-inertia"
                  ? pedagogicalPoints.map(([x, y]) => (
                      <line key={`${x}-${y}`} x1={x} y1={y} x2={centroid[0]} y2={centroid[1]} />
                    ))
                  : pointPairs.map(([[x1, y1], [x2, y2]]) => (
                      <line key={`${x1}-${y1}-${x2}-${y2}`} x1={x1} y1={y1} x2={x2} y2={y2} />
                    ))}
              </g>
              <g className="metric-geometry__points">
                {pedagogicalPoints.map(([cx, cy], index) => (
                  <g key={`${cx}-${cy}`}>
                    <circle cx={cx} cy={cy} r="3.2" />
                    <text x={cx + 4} y={cy - 3}>c{index + 1}</text>
                  </g>
                ))}
              </g>
              {metric.id === "total-inertia" ? (
                <g className="metric-geometry__centroid">
                  <circle cx={centroid[0]} cy={centroid[1]} r="4" />
                  <path d={`M ${centroid[0] - 2.5} ${centroid[1]} H ${centroid[0] + 2.5} M ${centroid[0]} ${centroid[1] - 2.5} V ${centroid[1] + 2.5}`} />
                  <text x={centroid[0] + 5} y={centroid[1] + 7}>arithmetic mean</text>
                </g>
              ) : null}
            </svg>
          </div>
          <figcaption>
            Synthetic geometry for explanation only. The points and axes do not show measured data.
          </figcaption>
        </figure>

        <div className="metric-geometry__copy">
          <p className="editorial-kicker">{metric.name}</p>
          <h3>{metric.plainLanguage}</h3>
          <p>{metric.interpretation}</p>
          <MathBlock
            latex={equation.latex}
            label={equation.accessibleLabel}
            explanation={equation.explanation}
          />
          <p className="metric-geometry__source">
            Provisional definition. Source: {equation.source.path}, {equation.source.locator}
          </p>
        </div>
      </section>
    </div>
  );
}
