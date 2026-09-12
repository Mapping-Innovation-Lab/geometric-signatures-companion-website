import { homepageCopy } from "@/content/site-copy";

const observedPoints = [
  [88, 164],
  [118, 116],
  [146, 222],
  [164, 142],
  [204, 246],
  [244, 106],
  [276, 178],
] as const;

const panelOffset = 376;
const ablatedPoints = observedPoints.map(([x, y]) => [x + panelOffset, y] as const);

const conceptCluster = [
  [210, 318],
  [246, 292],
  [278, 326],
  [298, 278],
] as const;

function PointCloud({ points }: { points: readonly (readonly [number, number])[] }) {
  return points.map(([cx, cy]) => (
    <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="7" />
  ));
}

function CentroidMarker({
  x,
  y,
  baseline = false,
  ablated = false,
}: {
  x: number;
  y: number;
  baseline?: boolean;
  ablated?: boolean;
}) {
  return (
    <g
      className={`hero-geometry__centroid${baseline ? " hero-geometry__centroid--baseline" : ""}${ablated ? " hero-geometry__centroid--ablated" : ""}`}
      aria-hidden="true"
    >
      <circle className="hero-geometry__centroid-halo" cx={x} cy={y} r="18" />
      <path d={`M ${x - 8} ${y} H ${x + 8} M ${x} ${y - 8} V ${y + 8}`} />
    </g>
  );
}

function ObservedState({ showLabel = true }: { showLabel?: boolean }) {
  return (
    <g className="hero-geometry__state">
      {showLabel ? (
        <text className="hero-geometry__state-label" x="188" y="54" textAnchor="middle">
          Observed field at time t
        </text>
      ) : null}
      <rect x="48" y="76" width="280" height="314" rx="3" />
      <g className="hero-geometry__points">
        <PointCloud points={observedPoints} />
      </g>
      <g className="hero-geometry__cluster">
        <PointCloud points={conceptCluster} />
        <ellipse cx="255" cy="303" rx="65" ry="42" />
      </g>
      <text className="hero-geometry__annotation" x="188" y="372" textAnchor="middle">
        Target concept included
      </text>
      <CentroidMarker x={207} y={217} />
    </g>
  );
}

function AblatedState({ showLabel = true }: { showLabel?: boolean }) {
  return (
    <g className="hero-geometry__state">
      {showLabel ? (
        <text className="hero-geometry__state-label" x="564" y="54" textAnchor="middle">
          Counterfactual field at time t
        </text>
      ) : null}
      <rect x="424" y="76" width="280" height="314" rx="3" />
      <g className="hero-geometry__points">
        <PointCloud points={ablatedPoints} />
      </g>
      <g className="hero-geometry__removed-region" aria-hidden="true">
        <ellipse cx="631" cy="303" rx="65" ry="42" />
      </g>
      <text className="hero-geometry__annotation" x="564" y="372" textAnchor="middle">
        Target concept removed
      </text>
      <CentroidMarker x={583} y={217} baseline />
      <CentroidMarker x={553} y={168} ablated />
      <g className="hero-geometry__delta" aria-hidden="true">
        <path d="M 578 208 L 558 177" />
        <path d="m 560 187 -2-10 10 3" />
        <text x="598" y="192">Δ(t)</text>
      </g>
    </g>
  );
}

export function HeroGeometry() {
  return (
    <figure className="hero-geometry">
      <div className="hero-geometry__badge">How the comparison works</div>
      <div className="hero-geometry__desktop">
        <svg
          viewBox="24 26 704 382"
          role="img"
          aria-label="Illustrative comparison, repeated across rolling time windows, of the observed embedding field at time t and the counterfactual field recomputed after target papers are removed."
        >
          <title>Observed and counterfactual geometry through time</title>
          <desc>
            Two labeled point clouds compare the observed field with the same
            retained papers after the target papers are removed. An arrow labeled
            delta of t connects the observed and ablated centroids. The comparison
            is repeated across rolling time windows.
          </desc>

          <ObservedState />

          <g className="hero-geometry__transition">
            <path d="M 350 226 H 404" />
            <path d="m 394 217 10 9-10 9" />
            <text x="377" y="176" textAnchor="middle">
              <tspan x="377">Remove</tspan>
              <tspan x="377" dy="17">target papers</tspan>
            </text>
          </g>

          <AblatedState />

        </svg>
      </div>
      <div className="hero-geometry__mobile">
        <section className="hero-geometry__mobile-state">
          <p className="hero-geometry__mobile-label">Observed field at time t</p>
          <svg
            viewBox="46 74 284 318"
            role="img"
            aria-label="Illustrative observed geometry including the target concept cluster."
          >
            <ObservedState showLabel={false} />
          </svg>
        </section>
        <p className="hero-geometry__mobile-transition">
          <span>Remove target papers</span>
          <span aria-hidden="true">↓</span>
        </p>
        <section className="hero-geometry__mobile-state">
          <p className="hero-geometry__mobile-label">Counterfactual field at time t</p>
          <svg
            viewBox="422 74 284 318"
            role="img"
            aria-label="Illustrative geometry recomputed after the target concept cluster is ablated."
          >
            <AblatedState showLabel={false} />
          </svg>
        </section>
      </div>
      <div className="hero-geometry__legend" aria-label="Centroid key">
        <span>
          <svg viewBox="0 0 48 48" aria-hidden="true"><CentroidMarker x={24} y={24} /></svg>
          Observed centroid
        </span>
        <span>
          <svg viewBox="0 0 48 48" aria-hidden="true"><CentroidMarker x={24} y={24} ablated /></svg>
          Ablated centroid
        </span>
      </div>
      <div className="hero-geometry__timeline">
        <p>Repeat across rolling time windows</p>
        <svg viewBox="0 0 240 48" role="img" aria-label="Successive rolling windows: t minus one, t, t plus one.">
          <g className="hero-geometry__time">
            <path d="M 20 12 H 220" />
            <circle cx="50" cy="12" r="3" />
            <circle cx="120" cy="12" r="4" />
            <circle cx="190" cy="12" r="3" />
            <text x="50" y="38" textAnchor="middle">t − 1</text>
            <text x="120" y="38" textAnchor="middle">t</text>
            <text x="190" y="38" textAnchor="middle">t + 1</text>
          </g>
        </svg>
      </div>
      <figcaption>
        {homepageCopy.geometryCaption}{" "}{homepageCopy.geometryNote}
      </figcaption>
    </figure>
  );
}
