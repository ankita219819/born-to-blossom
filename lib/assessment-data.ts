/**
 * Lasoma Soul Family Assessment — content & configuration.
 *
 * Domains, chakras, soul profiles, timeline bands, service map and safety
 * resources, transcribed from the Born to Blossom back-end document. The
 * question bank itself lives in `assessment-questions.ts`. Pure data — no
 * logic, no React.
 */

import type { ChakraId, DomainId, FlagId } from "@/lib/assessment-questions";

export type { AssessmentOption, AssessmentQuestion, ChakraId, DomainId, FlagId, OptionId } from "@/lib/assessment-questions";
export { questions } from "@/lib/assessment-questions";

export type Band = "low" | "moderate" | "high";

/* ── Bands ───────────────────────────────────────────────────────────── */

export const bandMeta: Record<Band, { label: string; color: string; soft: string; text: string }> = {
  low: { label: "Low", color: "#7FA98B", soft: "#E8F2EA", text: "#365A43" },
  moderate: { label: "Moderate", color: "#C69C6D", soft: "#F7EBD9", text: "#8A6234" },
  high: { label: "High", color: "#C79072", soft: "#FBE9E1", text: "#A8553B" }
};

/** Domain bands by percentage (spec §6). */
export function bandForPercent(percent: number): Band {
  if (percent <= 33) return "low";
  if (percent <= 66) return "moderate";
  return "high";
}

/** Chakra bands by raw 0–4 points (spec §5.4). */
export function bandForChakraPoints(points: number): Band {
  if (points <= 1) return "low";
  if (points <= 3) return "moderate";
  return "high";
}

/* ── Chakras ─────────────────────────────────────────────────────────── */

export type Chakra = {
  id: ChakraId;
  name: string;
  /** Short axis label for charts. */
  short: string;
  sanskrit: string;
  theme: string;
  organs: string;
  /** Question number (1-based) that scores this chakra. */
  questionId: number;
};

export const chakras: Chakra[] = [
  {
    id: "root",
    name: "Root Chakra",
    short: "Root",
    sanskrit: "Muladhara",
    theme: "Safety, security, belonging, survival",
    organs: "Adrenal glands, spine base, legs, feet, immune system",
    questionId: 31
  },
  {
    id: "sacral",
    name: "Sacral Chakra",
    short: "Sacral",
    sanskrit: "Svadhisthana",
    theme: "Creativity, pleasure, intimacy, emotional flow",
    organs: "Reproductive organs, bladder, kidneys, hips, lower back",
    questionId: 32
  },
  {
    id: "solar",
    name: "Solar Plexus Chakra",
    short: "Solar Plexus",
    sanskrit: "Manipura",
    theme: "Personal power, confidence, will, identity",
    organs: "Stomach, liver, pancreas, gallbladder, digestive system",
    questionId: 33
  },
  {
    id: "heart",
    name: "Heart Chakra",
    short: "Heart",
    sanskrit: "Anahata",
    theme: "Love, grief, compassion, connection, felt sense of safety with others",
    organs: "Heart, lungs, thymus, the vagus nerve and “social engagement” system",
    questionId: 34
  },
  {
    id: "throat",
    name: "Throat Chakra",
    short: "Throat",
    sanskrit: "Vishuddha",
    theme: "Truth, self-expression, boundaries, what goes unsaid",
    organs: "Throat, thyroid, mouth, jaw, neck",
    questionId: 35
  },
  {
    id: "thirdeye",
    name: "Third Eye Chakra",
    short: "Third Eye",
    sanskrit: "Ajna",
    theme: "Intuition, clarity, perception, mental patterns",
    organs: "Eyes, brain, pituitary gland, sinuses",
    questionId: 36
  },
  {
    id: "crown",
    name: "Crown Chakra",
    short: "Crown",
    sanskrit: "Sahasrara",
    theme: "Spiritual connection, purpose, unity, meaning",
    organs: "Pineal gland, upper brain, nervous system as a whole",
    questionId: 37
  }
];

export const chakraById = Object.fromEntries(chakras.map((chakra) => [chakra.id, chakra])) as Record<
  ChakraId,
  Chakra
>;

/* ── Domains ─────────────────────────────────────────────────────────── */

export type Domain = {
  id: DomainId;
  emoji: string;
  name: string;
  /** Two-line-friendly label for chart axes. */
  short: string;
  blurb: string;
  /** Chakra this domain is anchored to (spec §5.2). */
  chakra: ChakraId;
  breath: string;
  /** First-letter-lowercase phrase for letter copy. */
  phrase: string;
};

export const domains: Domain[] = [
  {
    id: "mind",
    emoji: "🧠",
    name: "Mind & Emotions",
    short: "Mind",
    blurb: "How your thoughts and feelings move through you day to day.",
    chakra: "thirdeye",
    breath: "Notice the space between your eyebrows and the back of your head.",
    phrase: "mind and emotions"
  },
  {
    id: "body",
    emoji: "🌿",
    name: "Body & Nervous System",
    short: "Body",
    blurb: "How safe, rested and regulated your body feels.",
    chakra: "heart",
    breath: "Notice your chest and the quality of your breath right now.",
    phrase: "body and nervous system"
  },
  {
    id: "money",
    emoji: "🌾",
    name: "Money & Abundance",
    short: "Money",
    blurb: "Your inherited beliefs and everyday feelings around money.",
    chakra: "root",
    breath: "Notice your legs, your feet, how grounded you feel in your seat.",
    phrase: "money and abundance"
  },
  {
    id: "relationships",
    emoji: "🌸",
    name: "Love & Relationships",
    short: "Love",
    blurb: "Your patterns of attachment, boundaries, and closeness.",
    chakra: "sacral",
    breath: "Notice your lower belly and hips.",
    phrase: "love and relationships"
  },
  {
    id: "ancestral",
    emoji: "🌳",
    name: "Ancestral & Family Roots",
    short: "Ancestral",
    blurb: "What may have been passed down to you, not created by you.",
    chakra: "throat",
    breath: "Notice your throat and jaw — are they tight, or relaxed?",
    phrase: "ancestral and family roots"
  },
  {
    id: "career",
    emoji: "🌻",
    name: "Career & Self-Worth",
    short: "Career",
    blurb: "How you value yourself, and how you let the world value you.",
    chakra: "solar",
    breath: "Notice your stomach, just below your ribs.",
    phrase: "career and self-worth"
  },
  {
    id: "spirit",
    emoji: "✨",
    name: "Spiritual Connection & Intuition",
    short: "Spirit",
    blurb: "Your sense of inner guidance and connection to something larger.",
    chakra: "crown",
    breath: "Notice the crown of your head.",
    phrase: "spiritual connection and intuition"
  }
];

export const domainById = Object.fromEntries(domains.map((domain) => [domain.id, domain])) as Record<
  DomainId,
  Domain
>;

/** Tie-break priority when two domains share the top score (spec §7). */
export const sosPriority: DomainId[] = [
  "body",
  "relationships",
  "career",
  "mind",
  "money",
  "ancestral",
  "spirit"
];

/** Body line used in the letter, keyed by the S.O.S. domain's paired chakra. */
export const bodyLines: Record<ChakraId, string> = {
  root:
    "This often lives in the body too — many people carrying this pattern feel it in their legs, feet or lower back, as a sense of shaky ground, the seat of the Root Chakra, the energy centre connected to safety, security and belonging.",
  sacral:
    "This often lives in the body too — many people carrying this pattern feel it in their hips or lower belly, the seat of the Sacral Chakra, the energy centre connected to intimacy and emotional flow.",
  solar:
    "This often lives in the body too — many people carrying this pattern feel it as a tightening in the stomach, just below the ribs, or in digestion, the seat of the Solar Plexus Chakra, the energy centre connected to personal power and confidence.",
  heart:
    "This often lives in the body too — many people carrying this pattern feel it in the chest, in the lungs, or in how the breath moves, the seat of the Heart Chakra, the energy centre connected to love, grief and feeling safe with others.",
  throat:
    "This often lives in the body too — many people carrying this pattern feel it in the throat, jaw or neck, as words that stay stuck, the seat of the Throat Chakra, the energy centre connected to truth and what has gone unsaid.",
  thirdeye:
    "This often lives in the body too — many people carrying this pattern feel it behind the eyes, in the forehead, head or sinuses, the seat of the Third Eye Chakra, the energy centre connected to clarity and the patterns of the mind.",
  crown:
    "This often lives in the body too — many people carrying this pattern feel it at the crown of the head, or in the nervous system as a whole, the seat of the Crown Chakra, the energy centre connected to meaning and spiritual connection."
};

/* ── Quiz sections (drives the step sequence in the popup) ───────────── */

export type QuizSection = {
  id: string;
  emoji: string;
  title: string;
  blurb: string;
  /** Question ids (1-based) in this section. */
  questionIds: number[];
  /** "Pause for a breath" interstitial shown after the section. */
  breath: string;
};

const breathNote = "No need to change anything — just notice.";

export const quizSections: QuizSection[] = [
  {
    id: "start",
    emoji: "🪷",
    title: "A Starting Reflection",
    blurb: "These first two questions help us understand your natural starting point — they won't be scored.",
    questionIds: [1, 2],
    breath: ""
  },
  ...domains.map((domain, index) => ({
    id: domain.id,
    emoji: domain.emoji,
    title: domain.name,
    blurb: domain.blurb,
    questionIds: [3 + index * 4, 4 + index * 4, 5 + index * 4, 6 + index * 4],
    breath: `Pause for a breath. ${domain.breath} ${breathNote}`
  })),
  {
    id: "chakra",
    emoji: "🕉",
    title: "Chakra & Body Wisdom",
    blurb:
      "These next seven questions ask you to sense into your body directly, rather than think your way to an answer.",
    questionIds: [31, 32, 33, 34, 35, 36, 37],
    breath:
      "Take one longer breath. Notice your whole body at once, from your feet to the crown of your head, as one connected system carrying one connected story."
  }
];

/* ── Timeline (spec §8) ──────────────────────────────────────────────── */

export type TimelineBand = {
  max: number;
  label: string;
  estimate: string;
  note: string;
};

export const timelineBands: TimelineBand[] = [
  {
    max: 33,
    label: "Light-Touch Phase",
    estimate: "4–8 focused weeks",
    note: "A short, focused block of practice tends to create a noticeable shift here."
  },
  {
    max: 50,
    label: "Steady Unfolding",
    estimate: "3–6 months",
    note: "Most people feel real, stable movement with about a season of consistent work."
  },
  {
    max: 70,
    label: "Deep Pattern Work",
    estimate: "6–12 months",
    note: "These patterns tend to run deeper or further back, so they benefit from sustained, layered support."
  },
  {
    max: 100,
    label: "Root-Level Rewiring",
    estimate: "12+ months",
    note: "This is tender, foundational work. It is best paced gently, and — where it feels right — supported alongside qualified professional care."
  }
];

/* ── Soul profiles (spec §9) ─────────────────────────────────────────── */

export type SoulProfile = {
  id: DomainId | "balanced";
  name: string;
  essence: string;
  strength: string;
};

export const soulProfiles: Record<DomainId | "balanced", SoulProfile> = {
  mind: {
    id: "mind",
    name: "The Overthinking Heart",
    essence: "A rich inner world that never quite gets to rest.",
    strength: "Deep self-awareness and emotional intelligence."
  },
  body: {
    id: "body",
    name: "The Silent Carrier",
    essence: "A body that has learned to hold what words never said.",
    strength: "A strong, resilient nervous system, once it is shown how to release."
  },
  money: {
    id: "money",
    name: "The Scarcity Survivor",
    essence: "A brilliant survival instinct around money that is ready to become trust instead.",
    strength: "Resourcefulness and the ability to make things work with very little."
  },
  relationships: {
    id: "relationships",
    name: "The Loyal Over-Giver",
    essence: "A heart that loves fully, sometimes at its own expense.",
    strength: "Deep loyalty and capacity for connection."
  },
  ancestral: {
    id: "ancestral",
    name: "The Family Torchbearer",
    essence: "Someone quietly carrying more of the family's story than they realise.",
    strength: "A natural sensitivity to patterns, and the potential to be the one who finally breaks the cycle."
  },
  career: {
    id: "career",
    name: "The Underestimated Achiever",
    essence: "Someone who gives more than they let themselves receive back.",
    strength: "Genuine competence and work ethic, ready to be matched with equal self-worth."
  },
  spirit: {
    id: "spirit",
    name: "The Disconnected Seeker",
    essence: "Someone searching for a sense of guidance that is actually already close by.",
    strength: "A natural pull toward meaning and growth."
  },
  balanced: {
    id: "balanced",
    name: "The Blossoming Soul",
    essence: "Someone in a genuinely steady season, with room to deepen and refine.",
    strength: "Self-awareness and groundedness across most areas of life."
  }
};

/* ── Recommended services (spec §12) ─────────────────────────────────── */

export type ServiceRec = {
  name: string;
  /** /services/<slug>; absent for self-paced suggestions. */
  slug?: string;
  why: string;
};

export const serviceCatalogue = {
  eft: {
    name: "EFT Tapping",
    slug: "eft",
    why: "A gentle tapping technique that calms the nervous system around a specific worry or emotional loop."
  },
  sound: {
    name: "Sound Healing",
    slug: "sound-healing",
    why: "Sacred sound that settles the nervous system and softens what the mind keeps circling."
  },
  somatic: {
    name: "Somatic Healing",
    slug: "somatic-healing",
    why: "Body-based healing that releases what talking alone cannot always reach."
  },
  qbr: {
    name: "Quantum Belief Reprogramming (QBR)",
    slug: "quantum-belief-reprogramming",
    why: "Theta-level belief work that dissolves money blocks and unworthiness at the subconscious root."
  },
  bars: {
    name: "Access Bars",
    slug: "access-bars",
    why: "A gentle, hands-on process that releases stored limiting thoughts, beliefs and emotions."
  },
  constellation: {
    name: "Family Constellation Therapy",
    slug: "family-constellation-therapy",
    why: "Hellinger-based systemic work that reveals hidden family dynamics and restores love and belonging."
  },
  ancestral: {
    name: "Generational & Ancestral Trauma Healing",
    slug: "generational-ancestral-trauma-healing",
    why: "Work aimed directly at patterns carried forward through the family line."
  },
  soulContract: {
    name: "Soul Contract Reading",
    slug: "soul-contract-reading",
    why: "A reading that illuminates the agreements and lessons your soul came here to work with."
  },
  nlp: {
    name: "NLP (Neuro-Linguistic Programming)",
    slug: "nlp",
    why: "Reframes the internal language and beliefs that quietly shape confidence and self-worth."
  },
  shamanic: {
    name: "Shamanic Healing",
    slug: "shamanic-healing",
    why: "Traditional soul-retrieval work for reconnecting to a felt sense of spirit and purpose."
  },
  reiki: {
    name: "Reiki Healing",
    slug: "reiki-healing",
    why: "Gentle, hands-on energy work that restores balance and a felt sense of being supported."
  },
  restore: {
    name: "RESTORE",
    slug: "restore",
    why: "Born to Blossom's flagship 8-session journey, weaving multiple modalities for deep, lasting root work."
  }
} satisfies Record<string, ServiceRec>;

export type ServiceKey = keyof typeof serviceCatalogue;

/** Domain × band → recommendation. `null` service = self-paced suggestion. */
export const serviceMap: Record<DomainId, Record<Band, ServiceKey | string>> = {
  mind: { high: "eft", moderate: "sound", low: "Self-paced mindfulness content and community" },
  body: { high: "somatic", moderate: "sound", low: "Self-paced body-awareness and breathwork practice" },
  money: { high: "qbr", moderate: "bars", low: "Self-paced money-mindset journaling" },
  relationships: { high: "constellation", moderate: "eft", low: "Self-paced boundaries practice" },
  ancestral: { high: "ancestral", moderate: "soulContract", low: "Self-paced ancestral-awareness journaling" },
  career: { high: "nlp", moderate: "bars", low: "Self-paced worth and visibility practice" },
  spirit: { high: "shamanic", moderate: "reiki", low: "Guided meditation and stillness practice" }
};

/* ── Safety protocol (spec §10) ──────────────────────────────────────── */

export type FlagConfig = {
  /** Domain the S.O.S. result is forced to when this flag fires. */
  domain: DomainId;
  /** Whether to show the gentle-care line and Extra Support panel. */
  care: boolean;
};

export const flagConfig: Record<FlagId, FlagConfig> = {
  "somatic-history": { domain: "body", care: true },
  underearning: { domain: "career", care: false },
  "controlling-relationship": { domain: "relationships", care: true },
  "workplace-mistreatment": { domain: "career", care: true }
};

export const gentleCareLine =
  "And if any part of this has ever felt unsafe, please know extra support is always available to you.";

export const helplines = [
  { name: "KIRAN Mental Health Helpline", contact: "1800-599-0019", note: "Toll-free, 24/7", tel: "18005990019" },
  { name: "iCall (TISS)", contact: "9152987821", note: "Counselling support", tel: "9152987821" },
  { name: "Vandrevala Foundation", contact: "1860-2662-345 / 1800-2333-330", note: "24/7 support", tel: "18602662345" },
  { name: "AASRA", contact: "+91-9820466726", note: "24/7 support", tel: "+919820466726" }
] as const;

export const disclaimer =
  "Born to Blossom offers complementary healing and is not a replacement for medical or licensed mental-health care, and does not provide diagnosis or medical treatment.";

/* ── Awareness style copy (unscored Q1) ──────────────────────────────── */

export const awarenessLabels = {
  body: "Body-led",
  mind: "Mind-led",
  doing: "Doing-led",
  grounded: "Grounded",
  variable: "Variable"
} as const;

export const awarenessLines = {
  body: "You told us you notice heavy moments in your body first — so it may help to know that what you feel physically is often your system speaking, not something to push through.",
  mind: "You told us you notice heavy moments in your thoughts first — so some of what feels like \"overthinking\" may really be your system asking to be heard.",
  doing: "You told us you tend to get busy or numb when life feels heavy — a very human way of coping, and one worth meeting with gentleness rather than judgement.",
  grounded: "You told us you tend to stay calm and grounded when life feels heavy — a real foundation to build on.",
  variable: "You told us your pattern is different every time — which often means your system is adapting in many ways, and deserves a gentle map."
} as const;
