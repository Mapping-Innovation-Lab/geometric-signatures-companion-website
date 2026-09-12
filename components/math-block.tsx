import katex from "katex";

export function MathBlock({
  latex,
  label,
  explanation,
}: {
  latex: string;
  label: string;
  explanation: string;
}) {
  const html = katex.renderToString(latex, {
    displayMode: true,
    throwOnError: true,
    strict: "warn",
  });

  return (
    <figure className="math-block" aria-label={label}>
      <div
        className="math-block__equation"
        dangerouslySetInnerHTML={{ __html: html }}
      />
      <figcaption>{explanation}</figcaption>
    </figure>
  );
}
