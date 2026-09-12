# Geometric Signatures website

This repository is a concise paper companion, not the analysis pipeline or a replacement for the manuscript.

## Scientific authority

- Use the latest manuscript explicitly approved by Dimitris. The current source is `paper/sr_signal_detection_3D.tex` at `mapping_innovation_latex` commit `55ac67f9a2133c2157ef56da938fcdddb2ad62d1` (August 25, 2026).
- Keep numbers in typed records with source locators and verification dates. Updating a source-version label requires checking the associated claims, values, and caveats.
- Treat Higgs as an assignment artifact, not supporting historical evidence.
- Distinguish target-cell co-dominance tests from the grid-wide look-elsewhere test.
- Do not compare absolute response magnitudes across embedding models. Concept rankings depend on representation; an empty target assignment is no measurement, not zero effect.
- Preserve limitations concerning hindsight, modern training data, corpus coverage, and assignment quality. Do not infer historical causation or prospective prediction.

## Content and design

- The homepage has a premise, one illustrative diagram, a short interpretation, and selected supplementary material.
- Preserve the warm-paper background, serif headlines, restrained sans-serif interface, fine rules, generous spacing, and plot multiply blending.
- Keep scientific content in `content/`; components consume it.
- Preserve hidden calibration and alternative-diagnostic records. Their assets belong in `retained/`, never `public/`.
- Keep pending release links red with a non-color cue. Do not mark them resolved without testing anonymous access.
- Keep process plans and temporary audit artifacts outside the tracked repository.
- Equations use accessible KaTeX; images require meaningful alt text and captions.
- Preserve reduced-motion behavior and keyboard access.

## Engineering

Use the existing React/TypeScript architecture and npm lockfile. Build a static Next.js export with `NEXT_PUBLIC_BASE_PATH=/geometric-signatures-companion-website`. Do not add server authentication or dynamic server dependencies.

After changes run `npm run lint`, the base-path production build, `npm test`, and `npm run verify-static`. Before publication also run `npm run verify-publication` and inspect desktop, mobile, keyboard focus, figure blending, and nested routes.

Publishing the GitHub repository exposes source and Git history, including retained material. Publishing Pages exposes only the verified `out/` artifact. Do not change visibility, grant reuse rights, or trigger publication without the user's instruction.
