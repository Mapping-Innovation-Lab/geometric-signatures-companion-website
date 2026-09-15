import { paperSnapshot } from "./paper-snapshot";

export const SHORT_SITE_TITLE = "Geometric Signatures of Scientific Revolutions";
export const FULL_PAPER_TITLE = paperSnapshot.manuscript.title;

export const PAPER_URL = "https://arxiv.org/abs/2609.14917";

export const ANALYSIS_REPOSITORY_URL =
  "https://github.com/Mapping-Innovation-Lab/geometric-signatures";

// Public preprint and analysis release; no sign-in is required.
export const publicationLinks = {
  paper: { href: PAPER_URL, pending: false },
  analysis: { href: ANALYSIS_REPOSITORY_URL, pending: false },
} as const;

export const SITE_URL = new URL(
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://mapping-innovation-lab.github.io/geometric-signatures-companion-website/",
).href;

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
export const HOME_URL = `${basePath}/`;
export const SUPPLEMENT_URL = `${basePath}/supplement/`;
export const CONCEPT_ANCHORS_URL = `${basePath}/supplement/concept-anchors/`;

export function homeSectionUrl(id: string) {
  return `${HOME_URL}#${id}`;
}

export const homepageCopy = {
  kicker: "A companion to the paper",
  title: "Geometric Signatures of Conceptual Reorganization",
  subtitle: "A Counterfactual Embedding Framework for Detecting Scientific Revolutions",
  deck:
    "We represent the text of scientific papers as numerical vectors, called embeddings, that allow us to compare their semantic similarity.",
  premiseTitle: "Can we detect conceptual reorganization in scientific literature?",
  premise: [
    "Scientific advances can change how ideas relate to one another. We developed a method to investigate these changes using scientific papers from physics, mathematics, and machine learning.",
  ],
  geometryCaption:
    "Within successive time windows, we compare the organization of these representations with and without the papers associated with a selected concept. This lets us examine how that concept's contribution to the field changes over time.",
  geometryNote:
    "The crosses mark average positions (centroids), and the arrow shows their difference, Δ(t). The positions shown here are illustrative.",
  currentReading: {
    title: "What we found.",
    paragraphs: [
      "Across five historical case studies, we find different patterns of conceptual reorganization, with special relativity providing the clearest benchmark. The results also show why identifying the papers associated with each concept matters: assignment errors can produce an apparent signal.",
      "The paper presents the method and case-study results. The supplementary material provides additional figures, robustness checks, and source data.",
    ],
  },
  supplementaryIntro:
    "Additional robustness checks, assignment figures, null tests, and source data are collected in one supplementary section.",
  supplementaryActions: {
    material: "Open supplementary material",
  },
} as const;

function pageMetadata(title: string, description: string, path: string) {
  const url = new URL(path, SITE_URL).href;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website" as const,
      title,
      description,
      url,
      siteName: SHORT_SITE_TITLE,
      images: [{ url: new URL("share.png", SITE_URL).href, width: 1200, height: 630,
        alt: `${SHORT_SITE_TITLE}. A counterfactual embedding framework for detecting scientific revolutions.` }],
    },
    twitter: { card: "summary_large_image" as const, title, description,
      images: [new URL("share.png", SITE_URL).href] },
  };
}

export const routeMetadata = {
  home: pageMetadata(FULL_PAPER_TITLE,
    "A paper companion for a counterfactual embedding framework that measures conceptual reorganization in scientific fields.", ""),
  supplement: pageMetadata(`Supplementary material · ${SHORT_SITE_TITLE}`,
    "Additional analyses, figures, and machine-readable results for the five case studies.", "supplement/"),
  conceptAnchors: pageMetadata(`Concept anchor reference · ${SHORT_SITE_TITLE}`,
    "The 50-concept reference used to construct the case-study anchors.", "supplement/concept-anchors/"),
} as const;
