import {
  HOME_URL,
  homeSectionUrl,
  SUPPLEMENT_URL,
  SHORT_SITE_TITLE,
} from "@/content/site-copy";
import { ReadingState } from "@/components/reading-state";
import { PublicationLink } from "@/components/publication-link";

const primaryLinks = [
  { id: "idea", label: "Premise" },
  { id: "current-reading", label: "Key findings" },
] as const;

function NavigationLinks() {
  return (
    <>
      {primaryLinks.map((link) => (
        <a key={link.id} href={homeSectionUrl(link.id)} data-section-link={link.id}>
          {link.label}
        </a>
      ))}
      <a href={SUPPLEMENT_URL}>Supplementary material</a>
      <PublicationLink resource="paper">Paper ↗</PublicationLink>
    </>
  );
}

export function SiteHeader() {
  return (
    <header className="site-header">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <div className="site-header__inner">
        <a className="site-header__brand" href={HOME_URL} aria-label={`${SHORT_SITE_TITLE} home`}>
          <span aria-hidden="true">GS</span>
          <strong>{SHORT_SITE_TITLE}</strong>
        </a>
        <nav className="site-header__nav" aria-label="Primary navigation">
          <NavigationLinks />
        </nav>
        <details className="site-header__menu">
          <summary>Menu</summary>
          <nav aria-label="Mobile navigation">
            <NavigationLinks />
          </nav>
        </details>
      </div>
      <ReadingState />
    </header>
  );
}
