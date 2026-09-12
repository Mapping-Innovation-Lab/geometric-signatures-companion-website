import { paperSnapshot } from "@/content/paper-snapshot";
import {
  CONCEPT_ANCHORS_URL,
  homeSectionUrl,
  SUPPLEMENT_URL,
} from "@/content/site-copy";
import { PublicationLink } from "@/components/publication-link";

export function SiteFooter() {
  const { authors } = paperSnapshot;

  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <p className="site-footer__authors">
          <span>© 2026 {authors.map((author) => author.name).join(" · ")}</span>
          <span className="site-footer__licenses">
            Original text and figures: <a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a>
            {" · "}Website code: <a href={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/licenses/LICENSE-MIT.txt`}>MIT</a>
          </span>
        </p>
        <nav className="site-footer__links" aria-label="Footer links">
          <PublicationLink resource="paper">Paper</PublicationLink>
          <PublicationLink resource="analysis">Analysis code</PublicationLink>
          <a href={SUPPLEMENT_URL}>Supplementary material</a>
          <a href={CONCEPT_ANCHORS_URL}>Concept anchors</a>
          <a href={homeSectionUrl("top")}>Back to top ↑</a>
        </nav>
      </div>
    </footer>
  );
}
