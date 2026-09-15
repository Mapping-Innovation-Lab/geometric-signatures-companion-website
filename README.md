# Geometric Signatures of Scientific Revolutions

A paper companion to **Geometric Signatures of Conceptual Reorganization: A Counterfactual Embedding Framework for Detecting Scientific Revolutions**, by Dimitris Ntounis, Ariel Schwartzman, Chris Chafe, and Thomas A. Ryckman.

The site contains a short premise, a time-dependent conceptual ablation illustration, a summary of the case studies, and one unified supplementary section with the complete concept-anchor reference. The manuscript owns the derivations, primary results, and limitations.

## Development

Use Node.js 22.13+ (the 22.x LTS line) or Node.js 24+.

```bash
npm ci
NEXT_PUBLIC_BASE_PATH=/geometric-signatures-companion-website npm run dev -- --port 3000
```

Preview: [local website](http://127.0.0.1:3000/geometric-signatures-companion-website/).

## Verification

```bash
npm run lint
NEXT_PUBLIC_BASE_PATH=/geometric-signatures-companion-website npm run build
npm test
NEXT_PUBLIC_BASE_PATH=/geometric-signatures-companion-website npm run verify-static
npm run verify-publication
```

The last check fails on unresolved licensing or pending publication links. Both the [arXiv preprint](https://arxiv.org/abs/2609.14917) and analysis code are publicly accessible; deployment runs this check without a pending-link override.

## Publication

See [the publication checklist](docs/PUBLISHING.md) for GitHub Pages setup. A push to `main` builds and tests the site. Publication is a separate manual action, guarded against unresolved release reminders.

## Source and structure

- `content/paper-snapshot.ts`: manuscript version and sourced numeric records.
- `content/site-copy.ts`: narrative, public URL, route metadata, and publication links.
- `content/supplementary.ts`: supplementary robustness figures and visibility.
- `content/supplement/`: supplementary chapters, source readers, and concept-anchor parsing.
- `public/supplementary/`: only figures and data selected for public delivery.
- `content/data/`: machine-readable source tables read at build time.
- `app/` and `components/`: static Next.js routes and presentation.

Scientific prose is checked against `paper/sr_signal_detection_3D.tex` at manuscript commit `55ac67f9a2133c2157ef56da938fcdddb2ad62d1` (Overleaf update August 25, 2026; checked September 2, 2026). The extra supplementary datasets retain their supplied values and provenance. See [the figure inventory](docs/FIGURE_INVENTORY.md).

The Higgs response is an assignment artifact caused by pre-pivot sparsity and a historically unrelated paper. It is not supporting evidence for conceptual reorganization. Encoder agreement does not imply representation-independent concept rankings.

## Citation and rights

Use [CITATION.cff](CITATION.cff) to cite the preprint, [arXiv:2609.14917](https://arxiv.org/abs/2609.14917). Code is released under the [MIT License](LICENSE-CODE), while original website text and figures are released under [CC BY 4.0](LICENSE-CONTENT). The [dual-license notice](LICENSE) records the scope and exceptions; third-party font notices are distributed in `public/licenses/`.
