# Figure inventory

## Public selection

The supplementary page opens with two PNGs: concept-count robustness and paraphrase stability. The assignment-margin subsection and its figure pair are retained outside the public export. `content/supplementary.ts` records their source paths. Paraphrase stability shows only the assignment rule used in the paper, regenerated from the reviewed revision-2 JSON by `scripts/plot-semantic-stability.py`. The original two-rule figure is retained outside the public export; the unchanged source-data download retains all assignment-rule configurations. Figures open as full-size PNGs when clicked; vector PDFs remain in the exported assets without visible download links.

The same page then renders 12 PNG/vector-PDF pairs across four additional visible chapters:

| Chapter | Figures |
| --- | --- |
| Concept anchors and assignment geometry | Five case-specific assignment diagrams |
| Two-dimensional null distributions | Two five-case grids and two focused special-relativity panels |
| Look-elsewhere effect and ranking robustness | Five-case and special-relativity panels |
| Target versus context | Mean-context and strongest-context comparison |

Together, these 14 figures form five continuously numbered chapters. `content/supplement/archive.ts` owns dimensions, captions, alt text, and chapter membership for the 12 paired study plates. Public numeric tables are derived from `ranking_pvalues.json` and `ranking_three_way.json`; the concept reference is parsed from `concept_anchors.md`. These are supplied supplementary outputs, not regenerated measurements.

## Retained material

The hidden calibration chapter's figures, the original unfiltered supplement guide, and the alternative-diagnostic PNG are not kept in the public repository. The tau summary the supplement page reads lives in `content/data/tau_assignment_summary.json`. Visibility flags remain in the content records.

The historical manuscript-rendered PNGs are not kept in the public repository. Their old metadata in `content/figures.ts` documents the August 14 snapshot; it is not used by a public route and is not the current scientific authority.

## Updating figures

Keep original data and measured plots unchanged unless the source analysis changes. Check captions and interpretations against the approved manuscript. Update dimensions when replacing an image, preserve alt text and PDF pairs, and test the static export for missing or unexpected assets.
