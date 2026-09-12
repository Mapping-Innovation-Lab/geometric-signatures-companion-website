import katex from "katex";

// Render the finite notation vocabulary used by the typed supplementary records.
// Longer expressions must match before their individual metric names.
const notation: Record<string, string> = {
  "max(|D_I|, |D_P|)": String.raw`\max(|D_I|, |D_P|)`,
  "||D||_2": String.raw`\|D\|_2`,
  "D_I": "D_I",
  "D_P": "D_P",
  "p_2D": String.raw`p_{\mathrm{2D}}`,
  "p_global": String.raw`p_{\mathrm{global}}`,
  "p_co": String.raw`p_{\mathrm{co}}`,
  "f_knee": String.raw`f_{\mathrm{knee}}`,
  "tau(c)": String.raw`\tau(c)`,
  "t*": "t^*",
  "L2": String.raw`\ell_2`,
};
const pattern = new RegExp(
  `(?<![A-Za-z0-9_])(${Object.keys(notation)
    .sort((a, b) => b.length - a.length)
    .map((token) => token.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
    .join("|")})(?![A-Za-z0-9_])`,
  "g",
);

export function InlineMath({ latex }: { latex: string }) {
  return <span className="scientific-math" dangerouslySetInnerHTML={{ __html: katex.renderToString(latex, {
    displayMode: false,
    throwOnError: true,
    output: "htmlAndMathml",
    strict: "error",
  }) }} />;
}

export function ScientificText({ text }: { text: string }) {
  return <>{text.split(pattern).map((part, index) => notation[part]
    ? <InlineMath key={index} latex={notation[part]} />
    : part)}</>;
}
