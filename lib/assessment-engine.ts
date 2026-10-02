/**
 * Soul Prescription Engine — pure scoring logic. No I/O, no React.
 *
 * Flow: answers -> domain / chakra scores -> overall score, S.O.S. area, soul
 * profile, timeline, recommended service, personalised letter. Runs entirely
 * client-side so a visitor receives their prescription instantly, with no data
 * sent anywhere.
 */

import {
  awarenessLabels,
  awarenessLines,
  bandForChakraPoints,
  bandForPercent,
  bodyLines,
  chakraById,
  chakras,
  domainById,
  domains,
  flagConfig,
  gentleCareLine,
  questions,
  serviceCatalogue,
  serviceMap,
  soulProfiles,
  sosPriority,
  timelineBands,
  type Band,
  type ChakraId,
  type DomainId,
  type FlagId,
  type OptionId,
  type ServiceKey,
  type ServiceRec,
  type SoulProfile
} from "@/lib/assessment-data";
import type { AwarenessStyle } from "@/lib/assessment-questions";

export type AnswerMap = Record<number, OptionId>;

export type DomainScore = {
  id: DomainId;
  name: string;
  short: string;
  points: number;
  percent: number;
  band: Band;
  /** This domain's share of the visitor's total point load, 0–100. */
  focusShare: number;
};

export type ChakraScore = {
  id: ChakraId;
  name: string;
  short: string;
  points: number;
  percent: number;
  band: Band;
};

export type Recommendation = {
  /** Headline service (RESTORE when the whole-self override applies). */
  primary: ServiceRec | { name: string; slug?: undefined; why: string };
  /** Lighter, lower-commitment alternative when RESTORE leads. */
  alternative?: ServiceRec;
  selfPaced: boolean;
  restoreOverride: boolean;
};

export type AssessmentResult = {
  awarenessStyle: AwarenessStyle | null;
  awarenessLabel: string | null;
  overallPercent: number;
  overallBand: Band;
  domains: DomainScore[];
  chakras: ChakraScore[];
  sos: DomainScore;
  sosPairedChakra: ChakraScore;
  /** Domains sorted highest → lowest percent. */
  ranking: DomainScore[];
  profile: SoulProfile;
  timeline: { label: string; estimate: string; note: string };
  recommendation: Recommendation;
  flags: FlagId[];
  /** Show the calm "Extra Support" panel + gentle line. */
  needsCare: boolean;
  letter: { greeting: string; paragraphs: string[]; closing: string; signoff: string };
  generatedAt: string;
};

const MAX_DOMAIN_POINTS = 16;
const MAX_TOTAL_POINTS = MAX_DOMAIN_POINTS * 7;
const SECONDARY_THREAD_GAP = 5;
const RESTORE_HIGH_DOMAINS = 3;
const RESTORE_OVERALL_PERCENT = 65;

const questionById = new Map(questions.map((question) => [question.id, question]));

export function isComplete(answers: AnswerMap) {
  return questions.every((question) => Boolean(answers[question.id]));
}

export function answeredCount(answers: AnswerMap) {
  return questions.filter((question) => Boolean(answers[question.id])).length;
}

function chosenOption(answers: AnswerMap, questionId: number) {
  const chosen = answers[questionId];
  if (!chosen) return undefined;
  return questionById.get(questionId)?.options.find((option) => option.id === chosen);
}

function lowerFirst(text: string) {
  return text.charAt(0).toLowerCase() + text.slice(1);
}

function stripPeriod(text: string) {
  return text.replace(/[.\s]+$/, "");
}

export function scoreAssessment(answers: AnswerMap, name = ""): AssessmentResult {
  /* Domains + chakras + flags */
  const domainPoints = Object.fromEntries(domains.map((domain) => [domain.id, 0])) as Record<DomainId, number>;
  const chakraPoints = Object.fromEntries(chakras.map((chakra) => [chakra.id, 0])) as Record<ChakraId, number>;
  const flags: FlagId[] = [];

  for (const question of questions) {
    const option = chosenOption(answers, question.id);
    if (!option) continue;
    if (question.kind === "domain" && question.domain) domainPoints[question.domain] += option.points;
    if (question.kind === "chakra" && question.chakra) chakraPoints[question.chakra] += option.points;
    if (option.flag && !flags.includes(option.flag)) flags.push(option.flag);
  }

  const totalPoints = domains.reduce((sum, domain) => sum + domainPoints[domain.id], 0);
  const overallPercent = Math.round((totalPoints / MAX_TOTAL_POINTS) * 100);

  const domainScores: DomainScore[] = domains.map((domain) => {
    const points = domainPoints[domain.id];
    const percent = Math.round((points / MAX_DOMAIN_POINTS) * 100);
    return {
      id: domain.id,
      name: domain.name,
      short: domain.short,
      points,
      percent,
      band: bandForPercent(percent),
      focusShare: totalPoints ? (points / totalPoints) * 100 : 0
    };
  });

  const chakraScores: ChakraScore[] = chakras.map((chakra) => ({
    id: chakra.id,
    name: chakra.name,
    short: chakra.short,
    points: chakraPoints[chakra.id],
    percent: chakraPoints[chakra.id] * 25,
    band: bandForChakraPoints(chakraPoints[chakra.id])
  }));

  /* S.O.S. area: safety override → highest percent → tie-break order. */
  const byPriority = (a: DomainScore, b: DomainScore) =>
    b.percent - a.percent || sosPriority.indexOf(a.id) - sosPriority.indexOf(b.id);
  const ranking = [...domainScores].sort(byPriority);

  const flaggedDomains = flags
    .map((flag) => domainScores.find((score) => score.id === flagConfig[flag].domain))
    .filter((score): score is DomainScore => Boolean(score))
    .sort(byPriority);
  const sos = flaggedDomains[0] ?? ranking[0];
  const sosPairedChakra = chakraScores.find((score) => score.id === domainById[sos.id].chakra)!;
  const needsCare = flags.some((flag) => flagConfig[flag].care);

  /* Profile: balanced only when nothing is elevated and nothing was flagged. */
  const isBalanced = !flags.length && overallPercent < 34 && domainScores.every((score) => score.band !== "high");
  const profile = isBalanced ? soulProfiles.balanced : soulProfiles[sos.id];

  const timeline = timelineBands.find((band) => overallPercent <= band.max) ?? timelineBands[timelineBands.length - 1];

  /* Recommendation (spec §12). */
  const highCount = domainScores.filter((score) => score.band === "high").length;
  const restoreOverride = highCount >= RESTORE_HIGH_DOMAINS || overallPercent >= RESTORE_OVERALL_PERCENT;
  const mapped = serviceMap[sos.id][sos.band];
  const isCatalogued = mapped in serviceCatalogue;
  const single: Recommendation["primary"] = isCatalogued
    ? serviceCatalogue[mapped as ServiceKey]
    : { name: mapped, why: "A gentle, low-commitment place to begin, at your own pace." };

  const recommendation: Recommendation = restoreOverride
    ? {
        primary: serviceCatalogue.restore,
        alternative: isCatalogued ? serviceCatalogue[mapped as ServiceKey] : undefined,
        selfPaced: false,
        restoreOverride: true
      }
    : { primary: single, selfPaced: !isCatalogued, restoreOverride: false };

  /* Awareness style (Q1) + self-guess (Q2). */
  const styleOption = chosenOption(answers, 1);
  const awarenessStyle = styleOption?.style ?? null;
  const focusGuess = chosenOption(answers, 2)?.focus;

  /* Letter. */
  const firstName = name.trim().split(/\s+/)[0] || "friend";
  const sosDomain = domainById[sos.id];
  const paragraphs: string[] = [];

  paragraphs.push("Thank you for taking the time to sit with these questions honestly — that alone is an act of self-care.");

  paragraphs.push(
    `What stood out most in your answers is a pattern we call ${profile.name} — ${lowerFirst(stripPeriod(profile.essence))}. This isn't a flaw — it's a strength: ${lowerFirst(stripPeriod(profile.strength))}.`
  );

  if (isBalanced) {
    paragraphs.push(
      `Right now, your answers describe a genuinely steady season. If one area is gently asking for attention, it is ${sosDomain.phrase}, and based on your answers this looks like ${timeline.label.toLowerCase()} — the kind of work that tends to unfold over ${timeline.estimate}, not overnight.`
    );
  } else {
    paragraphs.push(
      `Right now, your ${sosDomain.name} area is the one asking most clearly for your attention, and based on your answers, this looks like ${timeline.label} — the kind of work that tends to unfold over ${timeline.estimate}, not overnight.`
    );
  }

  const secondary = ranking.find((score) => score.id !== sos.id && sos.percent - score.percent <= SECONDARY_THREAD_GAP && score.percent > 0);
  if (secondary && !isBalanced) {
    paragraphs.push(
      `It often shows up alongside ${domainById[secondary.id].phrase} too — a second thread worth keeping an eye on.`
    );
  }

  paragraphs.push(bodyLines[sosDomain.chakra]);
  if (sosPairedChakra.band === "high" && sos.band === "high") {
    paragraphs.push(
      `Your answers point to this from two different directions — both your ${sosDomain.name} answers and your ${chakraById[sosDomain.chakra].name} answers — which is a strong, doubly-confirmed signal.`
    );
  }

  if (focusGuess) {
    const matches =
      focusGuess === sos.id ||
      (focusGuess === "money-career" && (sos.id === "money" || sos.id === "career")) ||
      (focusGuess === "ancestral-spirit" && (sos.id === "ancestral" || sos.id === "spirit"));
    paragraphs.push(
      matches
        ? "You sensed this yourself — your instinct about where you most needed attention was right."
        : `You guessed a different area at the start — so it may be a gentle surprise that ${sosDomain.phrase} came up loudest. That's often where the quiet work is.`
    );
  }

  if (awarenessStyle) paragraphs.push(awarenessLines[awarenessStyle]);

  if (needsCare) paragraphs.push(gentleCareLine);

  const closing = restoreOverride
    ? `You don't have to carry this pattern forward. We'd love to walk the next part of this with you — starting with ${recommendation.primary.name}, our flagship 8-session journey.${recommendation.alternative ? ` If you'd prefer a lighter first step, ${recommendation.alternative.name} is a gentle place to begin.` : ""}`
    : `You don't have to carry this pattern forward. We'd love to walk the next part of this with you — starting with ${lowerFirstIfSelfPaced(recommendation)}.`;

  return {
    awarenessStyle,
    awarenessLabel: awarenessStyle ? awarenessLabels[awarenessStyle] : null,
    overallPercent,
    overallBand: bandForPercent(overallPercent),
    domains: domainScores,
    chakras: chakraScores,
    sos,
    sosPairedChakra,
    ranking,
    profile,
    timeline: { label: timeline.label, estimate: timeline.estimate, note: timeline.note },
    recommendation,
    flags,
    needsCare,
    letter: {
      greeting: `Dear ${firstName},`,
      paragraphs,
      closing,
      signoff: "Sonia & the Born to Blossom Team 🌸"
    },
    generatedAt: new Date().toISOString()
  };
}

function lowerFirstIfSelfPaced(recommendation: Recommendation) {
  return recommendation.selfPaced ? lowerFirst(recommendation.primary.name) : recommendation.primary.name;
}

export { chakras, domains, questions };
export type { AwarenessStyle, Band, ChakraId, DomainId, FlagId, OptionId };
