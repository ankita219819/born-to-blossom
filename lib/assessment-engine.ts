/**
 * Soul Prescription Engine — pure scoring logic. No I/O, no React.
 *
 * Flow: answers -> profile scores + dimension vectors -> primary blueprint,
 * secondary layer, ranked modality prescription. Runs entirely client-side so
 * a client receives their prescription instantly, offline, with no data sent
 * anywhere.
 */

import {
  dimensions,
  modalities,
  questions,
  soulProfiles,
  type DimensionId,
  type Modality,
  type ModalityKey,
  type OptionId,
  type ProfileId,
  type SoulProfile
} from "@/lib/assessment-data";

export type AnswerMap = Record<number, OptionId>;

export type DimensionScore = {
  id: DimensionId;
  title: string;
  shortTitle: string;
  numeral: string;
  score: number;
  share: number;
};

export type ProfileScore = {
  profile: SoulProfile;
  score: number;
  share: number;
};

export type PrescribedModality = Modality & {
  tier: "primary" | "support" | "indicated";
  score: number;
};

export type AssessmentResult = {
  answeredCount: number;
  primary: SoulProfile;
  secondary: SoulProfile;
  isMultiLayered: boolean;
  profileScores: ProfileScore[];
  dimensionScores: DimensionScore[];
  leadDimension: DimensionScore;
  prescription: PrescribedModality[];
  arc: { phase: string; focus: string }[];
  dailyTools: string[];
  generatedAt: string;
};

/** Which dimension vector each profile feeds. Multi-entry = split evenly. */
const profileDimensions: Record<ProfileId, DimensionId[]> = {
  p1: ["SOM"],
  p2: ["EMO"],
  p3: ["MIND"],
  p4: ["ANC"],
  p5: ["SOUL"],
  p6: ["SOUL"],
  p7: ["SOM", "SOUL"],
  p8: ["MIND", "SOUL"],
  p9: ["ANC", "SOUL"],
  p10: []
};

/** A dimension counts as "engaged" for the multi-layered rule at this share. */
const MULTI_LAYER_DIMENSION_SHARE = 0.16;
const MULTI_LAYER_MIN_DIMENSIONS = 3;
/** ...unless one profile dominates this strongly. */
const DOMINANT_PROFILE_SHARE = 0.34;

const profileIds = Object.keys(soulProfiles) as ProfileId[];
const questionById = new Map(questions.map((question) => [question.id, question]));

function emptyRecord<T extends string>(keys: T[]): Record<T, number> {
  return keys.reduce((acc, key) => {
    acc[key] = 0;
    return acc;
  }, {} as Record<T, number>);
}

export function isComplete(answers: AnswerMap) {
  return questions.every((question) => Boolean(answers[question.id]));
}

export function answeredCount(answers: AnswerMap) {
  return questions.filter((question) => Boolean(answers[question.id])).length;
}

export function scoreAssessment(answers: AnswerMap): AssessmentResult {
  const profileTotals = emptyRecord(profileIds);
  const dimensionTotals = emptyRecord(dimensions.map((dimension) => dimension.id));
  const modalityTotals = {} as Record<ModalityKey, number>;
  let answered = 0;

  for (const question of questions) {
    const chosen = answers[question.id];
    if (!chosen) continue;
    const option = questionById.get(question.id)?.options.find((item) => item.id === chosen);
    if (!option) continue;
    answered += 1;

    for (const [profileId, weight] of option.profiles) {
      profileTotals[profileId] += weight;
      const targets = profileDimensions[profileId];
      if (targets.length) {
        const split = weight / targets.length;
        for (const dimensionId of targets) dimensionTotals[dimensionId] += split;
      }
    }

    for (const [index, key] of option.modalities.entries()) {
      modalityTotals[key] = (modalityTotals[key] ?? 0) + (index === 0 ? 2 : 1);
    }
  }

  const profileTotalSum = profileIds.reduce((sum, id) => sum + profileTotals[id], 0) || 1;
  const dimensionTotalSum =
    dimensions.reduce((sum, dimension) => sum + dimensionTotals[dimension.id], 0) || 1;

  const profileScores: ProfileScore[] = profileIds
    .filter((id) => id !== "p10")
    .map((id) => ({
      profile: soulProfiles[id],
      score: Math.round(profileTotals[id] * 10) / 10,
      share: profileTotals[id] / profileTotalSum
    }))
    .sort((a, b) => b.score - a.score || a.profile.index - b.profile.index);

  const dimensionScores: DimensionScore[] = dimensions
    .map((dimension) => ({
      id: dimension.id,
      title: dimension.title,
      shortTitle: dimension.shortTitle,
      numeral: dimension.numeral,
      score: Math.round(dimensionTotals[dimension.id] * 10) / 10,
      share: dimensionTotals[dimension.id] / dimensionTotalSum
    }))
    .sort((a, b) => b.score - a.score);

  const engagedDimensions = dimensionScores.filter(
    (dimension) => dimension.share >= MULTI_LAYER_DIMENSION_SHARE
  ).length;

  const topProfile = profileScores[0];
  const isMultiLayered =
    engagedDimensions >= MULTI_LAYER_MIN_DIMENSIONS &&
    topProfile.share < DOMINANT_PROFILE_SHARE;

  const primary = isMultiLayered ? soulProfiles.p10 : topProfile.profile;
  const secondary = isMultiLayered ? topProfile.profile : profileScores[1].profile;

  const prescription = buildPrescription(primary, secondary, modalityTotals);

  return {
    answeredCount: answered,
    primary,
    secondary,
    isMultiLayered,
    profileScores,
    dimensionScores,
    leadDimension: dimensionScores[0],
    prescription,
    arc: primary.arc,
    dailyTools: [...primary.dailyTools, ...secondary.dailyTools.slice(0, 1)],
    generatedAt: new Date().toISOString()
  };
}

function buildPrescription(
  primary: SoulProfile,
  secondary: SoulProfile,
  modalityTotals: Partial<Record<ModalityKey, number>>
): PrescribedModality[] {
  const seen = new Set<ModalityKey>();
  const out: PrescribedModality[] = [];

  const push = (key: ModalityKey, tier: PrescribedModality["tier"]) => {
    if (seen.has(key)) return;
    seen.add(key);
    out.push({ ...modalities[key], tier, score: modalityTotals[key] ?? 0 });
  };

  for (const key of primary.modalities) push(key, "primary");
  for (const key of secondary.modalities) push(key, "support");

  const indicated = (Object.keys(modalityTotals) as ModalityKey[])
    .filter((key) => !seen.has(key))
    .sort((a, b) => (modalityTotals[b] ?? 0) - (modalityTotals[a] ?? 0))
    .slice(0, 3);

  for (const key of indicated) push(key, "indicated");

  return out;
}

export { dimensions, modalities, questions, soulProfiles };
export type { DimensionId, Modality, ModalityKey, OptionId, ProfileId, SoulProfile };
