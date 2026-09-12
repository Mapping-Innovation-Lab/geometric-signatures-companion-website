import type { ArchiveFigure } from "@/content/supplement/archive";
import { ScientificText } from "@/components/scientific-text";

export function ArchiveFigurePlate({ figure }: { figure: ArchiveFigure }) {
  return (
    <figure
      className={`archive-figure archive-figure--${figure.layout}`}
      data-figure-role={figure.role}
    >
      <h3 className="archive-figure__title">{figure.title}</h3>
      <a className="figure-enlarge" href={figure.pngPath} target="_blank" rel="noreferrer" aria-label={`View full-size figure: ${figure.title} (opens in a new tab)`}>
      {/* The archived PNGs are already print-resolution and must retain their native typography. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={figure.pngPath}
        alt={figure.altText}
        width={figure.width}
        height={figure.height}
        loading="lazy"
        decoding="async"
      />
      </a>
      <figcaption>
        <p><ScientificText text={figure.caption} /></p>
      </figcaption>
    </figure>
  );
}
