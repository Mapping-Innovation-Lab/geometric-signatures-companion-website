# Structured scientific content

This directory is the boundary between reviewed scientific content and presentation code.

## Files

- `schema.ts` defines reusable contracts for manuscript provenance, numerical values, cases, metrics, citations, and figures.
- `paper-snapshot.ts` records the current near-final `_3D.tex` manuscript snapshot and a provisional, source-located set of values used to plan the production site.

The current React mockup does not consume this content yet. Content integration is a later implementation step governed by `docs/SITE_SPEC.md`.

## Update contract

When a new manuscript or analysis export arrives:

1. Record its exact main TeX filename, version label, and receipt date. Until Dimitris explicitly identifies a successor, `paper/sr_signal_detection_3D.tex` is the source of truth.
2. Compare title, authors, case definitions, method configuration, tables, figures, equations, and bibliography keys with the previous snapshot.
3. Update a case as one unit: pivot, rank, both metric values, maximum effect, target-paper count, margin scale, null-test values, and caveats.
4. Keep changed values `provisional` until they are checked against both the manuscript and the corresponding analysis output.
5. Change values to `verified` only after that check. Use `published` only for values matching the released paper.
6. Run the scientific-content audit described in `docs/SITE_SPEC.md` before deployment.

## Display rules

- Components must use `formatted` for display and `value` for sorting, scales, comparisons, and calculations.
- Respect `comparator`; a value stored as `0.001` with `lt` displays as `< 0.001`, not `0.001`.
- Always display or link the associated caveat when it materially changes interpretation.
- Do not derive missing results from charts or rounded prose. Obtain them from the analysis output or mark them unavailable.
