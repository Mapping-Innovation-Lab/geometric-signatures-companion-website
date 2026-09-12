import { HOME_URL, SUPPLEMENT_URL } from "@/content/site-copy";

export default function NotFound() {
  return (
    <main className="not-found shell">
      <p className="editorial-kicker">404 / Geometric Signatures</p>
      <h1>Page not found.</h1>
      <p>This address does not point to a page in the paper companion.</p>
      <div className="companion-actions">
        <a className="editorial-action editorial-action--primary" href={HOME_URL}>
          Return to the homepage <span className="editorial-action__arrow" aria-hidden="true">→</span>
        </a>
        <a className="text-link" href={SUPPLEMENT_URL}>Browse the supplementary material</a>
      </div>
    </main>
  );
}
