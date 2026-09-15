# Publication checklist

## Prepared rename and later organization transfer

The local configuration targets the approved repository name `geometric-signatures`.
Do not deploy this configuration while the remote repository is still named
`mapping-innovation-website`. No remote rename or transfer is performed by a build.

1. At the approved cutover, rename the personal repository to `geometric-signatures`,
   update the local Git remote, push the matching base-path configuration, and
   run the Pages deployment. Verify `https://mapping-innovation-lab.github.io/geometric-signatures-companion-website/`.
2. Update the MIL site's paper-companion link only after the new address works.
   GitHub Pages does not redirect old site URLs automatically; arrange a separate
   redirect if existing shared links need to keep working.
3. Before transferring either private website repository to `Mapping-Innovation-Lab`,
   resolve the organization's Pages eligibility. GitHub Free organizations cannot
   publish Pages from private repositories; keeping the source private requires
   an eligible organization plan. Do not change visibility automatically.
4. The paper workflow derives `NEXT_PUBLIC_SITE_URL` from `github.repository_owner`,
   so it will build organization-hosted canonical URLs after transfer. For a local
   transfer rehearsal, build and test with
   `NEXT_PUBLIC_SITE_URL=https://mapping-innovation-lab.github.io/geometric-signatures-companion-website/`
   and `NEXT_PUBLIC_BASE_PATH=/geometric-signatures-companion-website`.
5. At transfer, update citation/attribution URLs in `CITATION.cff` and
   `LICENSE-CONTENT`, this checklist's personal-account examples, local remotes,
   and the MIL companion link. The MIL site's own origin and workflow also need
   updating at its cutover. Validate both public sites before announcing the move.

## Resolve release reminders

1. Paper links now point to [arXiv:2609.14917](https://arxiv.org/abs/2609.14917), and analysis links point to the public code repository. Both destinations in `content/site-copy.ts` have `pending: false`. The deployment workflow runs the publication check without an override; verify any future replacement URL without signing in.
2. The website code is licensed under MIT; original website text and figures are licensed under CC BY 4.0. The root `LICENSE` records the scope and exceptions. Do not replace third-party notices or imply that underlying datasets are covered.
3. `CITATION.cff` records the preprint URL, identifier, and September 14, 2026 submission date. Update it when publication details change; do not invent a journal publication or acceptance status.
4. Run the verification commands in the root README. `npm run verify-publication` must pass before deployment.

## Enable GitHub Pages

1. Open this repository's **Settings → Pages**. Under **Build and deployment**, select **GitHub Actions** as the source. Do not select a branch or the `/docs` folder.
2. GitHub Free supports Pages from public repositories. GitHub Pro also supports Pages from private repositories. The published site is normally public even when the repository is private. Choose repository visibility separately; this workflow does not change it.
3. Commit and push the verified release to `main`. The push runs the build, tests, and artifact verification but does not publish.
4. Open **Actions → Deploy GitHub Pages → Run workflow**, select `main`, and run it. The manual run checks release reminders, builds, and deploys the `out/` artifact.
5. After the deployment succeeds, open `https://mapping-innovation-lab.github.io/geometric-signatures-companion-website/` without signing in. Test the paper link, code link, unified supplement, nested concept-reference page, source downloads, mobile menu, and an invalid URL.

If the manual run stops at “Check publication readiness,” inspect the reported license, pending-link, or export problem and push a correction. If it stops at “Configure Pages,” check the repository's Pages source and plan eligibility.

## What is exposed

Pages receives only `out/`. Hidden calibration/alternative-diagnostic material and legacy figures are retained outside `public/` and are not copied into the deployment. A public Git repository exposes all tracked files and its history, including this retained material and historical process notes. Removing files from the latest tree does not erase history.

The site is static. No ChatGPT Sites authentication, server runtime, analytics, or external font request is required.

Reference: [GitHub's publishing-source documentation](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).
