export interface ConceptAnchor {
  id: string;
  isTarget: boolean;
  description: string;
  aliases: string[];
  paraphrases: string[];
}

export interface ConceptAnchorCase {
  title: string;
  yearRange: string;
  slug: string;
  targetConcept: string;
  concepts: ConceptAnchor[];
}

export interface NullResultRow {
  caseId: string;
  label: string;
  randomRemoval: string;
  scrambledAssignment: string;
}

export interface LookElsewhereRow {
  caseId: string;
  label: string;
  globalMaxL2: number;
  globalP: number;
  zScore: number;
  maximisingConcept: string;
  maximisingYear: number;
  onTarget: boolean;
}

export interface RankingRow {
  caseId: string;
  label: string;
  pivotYear: number;
  maxAbsD: number;
  rankMaxAbsD: number;
  l2: number;
  rankL2: number;
  p2D: number;
  p2DIsFloor: boolean;
  rankP2D: number;
}

export interface RankingInterpretation {
  deepLearning: {
    label: string;
    targetL2: number;
    targetRankL2: number;
    competitorConcept: string;
    competitorL2: number;
    competitorRankL2: number;
  };
  attention: {
    label: string;
    rankMaxAbsD: number;
    rankP2D: number;
  };
}

export interface TauRow {
  caseId: string;
  label: string;
  pivotYear: number;
  fKnee: number;
  nearestSimilarity: number;
  nearestConcept: string;
  tau: number;
  assignedPapers: number;
  maxAbsD: number;
  rank: number;
}
