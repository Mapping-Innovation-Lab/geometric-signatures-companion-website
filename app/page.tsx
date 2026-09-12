import type { Metadata } from "next";
import { HeroGeometry } from "@/components/hero-geometry";
import { PublicationLink } from "@/components/publication-link";
import {
  homepageCopy,
  routeMetadata,
  SUPPLEMENT_URL,
} from "@/content/site-copy";

export const metadata: Metadata = routeMetadata.home;

export default function Home() {
  return (
    <main className="companion-home">
      <section id="top" className="companion-hero shell" aria-labelledby="homepage-title">
        <div className="companion-hero__copy">
          <p className="editorial-kicker">{homepageCopy.kicker}</p>
          <h1 id="homepage-title">
            <span>{homepageCopy.title}:</span>{" "}
            <span className="companion-hero__subtitle">{homepageCopy.subtitle}</span>
          </h1>
          <p className="companion-hero__deck">{homepageCopy.deck}</p>
          <div className="companion-actions">
            <PublicationLink className="editorial-action editorial-action--primary" resource="paper">
              Read the paper <span className="editorial-action__arrow" aria-hidden="true">↗</span>
            </PublicationLink>
            <a className="editorial-action editorial-action--text" href="#supplementary">
              Explore the supplementary material <span className="editorial-action__arrow" aria-hidden="true">↓</span>
            </a>
          </div>
        </div>
        <HeroGeometry />
      </section>

      <section id="idea" className="companion-premise" aria-labelledby="premise-heading">
        <div className="companion-premise__inner shell">
          <p className="section-index">01 / The premise</p>
          <div className="companion-premise__body">
            <h2 id="premise-heading">
              {homepageCopy.premiseTitle}
            </h2>
            <div className="companion-premise__copy">
              {homepageCopy.premise.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        id="current-reading"
        className="companion-reading shell"
        aria-labelledby="current-reading-heading"
      >
        <header className="section-heading">
          <p className="section-index">02 / Key findings</p>
          <h2 id="current-reading-heading">{homepageCopy.currentReading.title}</h2>
        </header>
        <div className="companion-reading__copy">
          {homepageCopy.currentReading.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <PublicationLink className="text-link" resource="paper">
            Read the complete argument in the manuscript <span aria-hidden="true">→</span>
          </PublicationLink>
        </div>
      </section>

      <section
        id="supplementary"
        className="companion-supplementary shell"
        aria-labelledby="supplementary-heading"
      >
        <header className="section-heading section-heading--wide">
          <p className="section-index">03 / Supplementary analyses</p>
          <h2 id="supplementary-heading">Supplementary material</h2>
          <div className="companion-supplementary__summary">
            <p>{homepageCopy.supplementaryIntro}</p>
            <a
              className="editorial-action editorial-action--primary"
              href={SUPPLEMENT_URL}
            >
              {homepageCopy.supplementaryActions.material}{" "}
              <span className="editorial-action__arrow" aria-hidden="true">→</span>
            </a>
          </div>
        </header>
      </section>

    </main>
  );
}
