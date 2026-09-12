import "server-only";

import { readFileSync } from "node:fs";
import { join } from "node:path";

import { parseConceptAnchors } from "./concept-anchor-parser";
import type {
  ConceptAnchorCase,
  LookElsewhereRow,
  NullResultRow,
  RankingInterpretation,
  RankingRow,
  TauRow,
} from "./types";

interface PermutationResult {
  p_co: number;
  p_co_is_floor: boolean;
}

interface PValueCase {
  label: string;
  nulls: {
    random_removal: PermutationResult;
    scrambled_assignment: PermutationResult;
  };
  look_elsewhere: {
    observed_global_max_l2: number;
    global_p: number;
    z_score: number;
    argmax_concept: string;
    argmax_year: number;
    argmax_is_target: boolean;
  };
}

interface RankingConceptSourceRow {
  concept: string;
  l2: number;
  n_exceed: number;
  n_null: number;
}

interface RankingSourceRow {
  case: string;
  label: string;
  target: string;
  pivot_year: number;
  target_max_abs_d: number;
  rank_max_abs_d: number;
  target_l2: number;
  rank_l2: number;
  target_p_2d: number;
  rank_p_2d: number;
  per_concept: RankingConceptSourceRow[];
}

interface TauSourceRow {
  case: string;
  label: string;
  pivot: number;
  f_knee: number;
  nn_sim: number;
  nn_concept: string;
  tau: number;
  n_papers: number;
  max_abs_d: number;
  rank: number;
}

const dataDirectory = join(process.cwd(), "public", "supplementary", "archive", "data");

function readJson<T>(filename: string): T {
  const directory = filename === "tau_assignment_summary.json"
    ? join(process.cwd(), "content", "data")
    : dataDirectory;
  return JSON.parse(readFileSync(join(directory, filename), "utf8")) as T;
}

// Normalize display names only; source files and stable case IDs remain unchanged.
const displayLabel = (label: string) => label.replace(/\bGodel\b/g, "Gödel");

const conceptAnchorsMarkdown = readFileSync(join(dataDirectory, "concept_anchors.md"), "utf8");
const rankingPValues = readJson<{ cases: Record<string, PValueCase> }>("ranking_pvalues.json");
const rankingThreeWay = readJson<RankingSourceRow[]>("ranking_three_way.json");
const tauAssignmentSummary = readJson<unknown>("tau_assignment_summary.json");

const presentationCaseOrder = ["special_relativity", "higgs", "godel", "deep_learning", "attention"];
const expectedTauCaseIds = new Set(presentationCaseOrder);

const presentationCaseId = (caseId: string): string =>
  caseId === "sr_signal_detection" ? "special_relativity" : caseId;

export function formatPValue(value: number, isFloor: boolean): string {
  return isFloor ? "< 2e-4" : value.toFixed(4);
}

export function getConceptAnchorCases(): ConceptAnchorCase[] {
  return parseConceptAnchors(conceptAnchorsMarkdown);
}

export function getNullRows(): NullResultRow[] {
  return presentationCaseOrder.map((caseId) => {
    const result = rankingPValues.cases[caseId];
    if (!result) throw new Error(`Missing p-value data for ${caseId}.`);
    return {
      caseId: presentationCaseId(caseId),
      label: displayLabel(result.label),
      randomRemoval: formatPValue(result.nulls.random_removal.p_co, result.nulls.random_removal.p_co_is_floor),
      scrambledAssignment: formatPValue(
        result.nulls.scrambled_assignment.p_co,
        result.nulls.scrambled_assignment.p_co_is_floor,
      ),
    };
  });
}

export function getLookElsewhereRows(): LookElsewhereRow[] {
  return presentationCaseOrder.map((caseId) => {
    const result = rankingPValues.cases[caseId];
    if (!result) throw new Error(`Missing p-value data for ${caseId}.`);
    return {
      caseId: presentationCaseId(caseId),
      label: displayLabel(result.label),
      globalMaxL2: result.look_elsewhere.observed_global_max_l2,
      globalP: result.look_elsewhere.global_p,
      zScore: result.look_elsewhere.z_score,
      maximisingConcept: result.look_elsewhere.argmax_concept,
      maximisingYear: result.look_elsewhere.argmax_year,
      onTarget: result.look_elsewhere.argmax_is_target,
    };
  });
}

export function getRankingRows(): RankingRow[] {
  const rowsByCase = new Map(rankingThreeWay.map((row) => [row.case, row]));

  return presentationCaseOrder.map((caseId) => {
    const row = rowsByCase.get(caseId);
    if (!row) throw new Error(`Missing ranking data for ${caseId}.`);
    const target = row.per_concept.find((concept) => concept.concept === row.target);
    if (!target) throw new Error(`Missing target ranking data for ${caseId}.`);
    return {
      caseId: presentationCaseId(row.case),
      label: displayLabel(row.label),
      pivotYear: row.pivot_year,
      maxAbsD: row.target_max_abs_d,
      rankMaxAbsD: row.rank_max_abs_d,
      l2: row.target_l2,
      rankL2: row.rank_l2,
      p2D: row.target_p_2d,
      p2DIsFloor: target.n_null > 0 && target.n_exceed === 0,
      rankP2D: row.rank_p_2d,
    };
  });
}

export function getRankingInterpretation(): RankingInterpretation {
  const deepLearning = rankingThreeWay.find((row) => row.case === "deep_learning");
  if (!deepLearning) throw new Error("Missing ranking interpretation data for deep_learning.");
  const deepLearningTarget = deepLearning.per_concept.find(
    (concept) => concept.concept === deepLearning.target,
  );
  if (!deepLearningTarget) {
    throw new Error("Missing target ranking interpretation data for deep_learning.");
  }
  const competitors = deepLearning.per_concept.filter(
    (concept) => concept.concept !== deepLearning.target,
  );
  const competitor = competitors.reduce<RankingConceptSourceRow | undefined>(
    (leader, concept) => !leader || concept.l2 > leader.l2 ? concept : leader,
    undefined,
  );
  if (!competitor) {
    throw new Error("Missing competitor ranking interpretation data for deep_learning.");
  }

  const attention = rankingThreeWay.find((row) => row.case === "attention");
  if (!attention) throw new Error("Missing ranking interpretation data for attention.");

  return {
    deepLearning: {
      label: deepLearning.label,
      targetL2: deepLearningTarget.l2,
      targetRankL2: deepLearning.rank_l2,
      competitorConcept: competitor.concept,
      competitorL2: competitor.l2,
      competitorRankL2:
        1 + deepLearning.per_concept.filter((concept) => concept.l2 > competitor.l2).length,
    },
    attention: {
      label: attention.label,
      rankMaxAbsD: attention.rank_max_abs_d,
      rankP2D: attention.rank_p_2d,
    },
  };
}

function validateTauSourceRow(value: unknown, index: number): TauSourceRow {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new Error(`Tau record ${index + 1} must be an object.`);
  }

  const record = value as Record<string, unknown>;
  for (const field of ["case", "label", "nn_concept"] as const) {
    if (typeof record[field] !== "string" || record[field].trim() === "") {
      throw new Error(`Tau record ${index + 1} field ${field} must be a non-empty string.`);
    }
  }
  for (const field of [
    "pivot",
    "f_knee",
    "nn_sim",
    "tau",
    "n_papers",
    "max_abs_d",
    "rank",
  ] as const) {
    if (typeof record[field] !== "number" || !Number.isFinite(record[field])) {
      throw new Error(`Tau record ${index + 1} field ${field} must be a finite number.`);
    }
  }

  return record as unknown as TauSourceRow;
}

export function getTauRows(): TauRow[] {
  if (!Array.isArray(tauAssignmentSummary)) {
    throw new Error("Tau assignment summary must be an array.");
  }

  const seenCaseIds = new Set<string>();
  const rows = tauAssignmentSummary.map((value, index) => {
    const row = validateTauSourceRow(value, index);
    const caseId = presentationCaseId(row.case);
    if (!expectedTauCaseIds.has(caseId)) {
      throw new Error(`Unexpected tau case ${caseId}.`);
    }
    if (seenCaseIds.has(caseId)) {
      throw new Error(`Duplicate tau case ${caseId}.`);
    }
    seenCaseIds.add(caseId);

    return {
      caseId,
      label: displayLabel(row.label),
      pivotYear: row.pivot,
      fKnee: row.f_knee,
      nearestSimilarity: row.nn_sim,
      nearestConcept: row.nn_concept,
      tau: row.tau,
      assignedPapers: row.n_papers,
      maxAbsD: row.max_abs_d,
      rank: row.rank,
    };
  });

  for (const caseId of presentationCaseOrder) {
    if (!seenCaseIds.has(caseId)) throw new Error(`Missing tau case ${caseId}.`);
  }

  return rows;
}
