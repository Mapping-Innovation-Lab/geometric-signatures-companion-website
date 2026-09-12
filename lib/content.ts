import { paperSnapshot } from "@/content/paper-snapshot";
import type { CaseStudyContent } from "@/content/schema";

export function getCaseBySlug(slug: string): CaseStudyContent | undefined {
  return paperSnapshot.cases.find((study) => study.slug === slug);
}

export function formatPValue(value: { formatted: string }): string {
  return value.formatted;
}
