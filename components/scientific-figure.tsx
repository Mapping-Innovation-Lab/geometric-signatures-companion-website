import type { FigureMetadata } from "@/content/schema";

export function ScientificFigure({ figure }: { figure: FigureMetadata }) {
  return (
    <figure
      className="scientific-figure"
      id={`figure-${figure.id}`}
      data-figure-id={figure.id}
      data-figure-status={figure.status}
    >
      {/* Reviewed static fallbacks must retain native lazy-loading and decoding semantics. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={figure.staticFallback}
        alt={figure.altText}
        loading="lazy"
        decoding="async"
      />
      <figcaption>
        <p className="scientific-figure__title">{figure.title}</p>
        <p>{figure.caption}</p>
        <p className="scientific-figure__source">
          Source: {figure.source.path}, {figure.source.locator}
        </p>
        {figure.caveats?.length ? (
          <div className="scientific-figure__caveats">
            <p>Caveats</p>
            <ul>
              {figure.caveats.map((caveat) => (
                <li key={caveat}>{caveat}</li>
              ))}
            </ul>
          </div>
        ) : null}
      </figcaption>
    </figure>
  );
}
