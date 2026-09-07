/**
 * Lasoma Soul Family Assessment — source data.
 *
 * 25 questions across 5 dimensions, each option tagged with the Soul Profiles
 * it feeds and the modalities it maps to (per the Born to Blossom backend
 * prescription architecture). Pure data — no logic, no React.
 */

export type DimensionId = "SOM" | "EMO" | "MIND" | "ANC" | "SOUL";

export type ProfileId =
  | "p1" | "p2" | "p3" | "p4" | "p5"
  | "p6" | "p7" | "p8" | "p9" | "p10";

export type ModalityKey =
  | "reiki-healing"
  | "quantum-belief-reprogramming"
  | "nlp"
  | "family-constellation-therapy"
  | "somatic-healing"
  | "sound-healing"
  | "bach-flower-therapy"
  | "Humkaara"
  | "hleem"
  | "access-bars"
  | "lama-fera-healing"
  | "eft"
  | "generational-ancestral-trauma-healing"
  | "womb-healing"
  | "shamanic-healing"
  | "business-constellation"
  | "soul-contract-reading"
  | "restore"
  | "corporate-wellness"
  | "corporate-retreat-design";

/** [profile, weight] — the first tag on an option is its primary vector. */
export type ProfileWeight = [ProfileId, number];

export type OptionId = "A" | "B" | "C" | "D" | "E";

export type AssessmentOption = {
  id: OptionId;
  text: string;
  profiles: ProfileWeight[];
  modalities: ModalityKey[];
};

export type AssessmentQuestion = {
  id: number;
  dimension: DimensionId;
  prompt: string;
  options: AssessmentOption[];
};

export type AssessmentDimension = {
  id: DimensionId;
  numeral: string;
  title: string;
  shortTitle: string;
  intro: string;
  questionIds: number[];
};

export type Modality = {
  key: ModalityKey;
  name: string;
  category: string;
  indication: string;
  mechanism: string;
  dosage: string;
  format: string;
};

export type SoulProfile = {
  id: ProfileId;
  index: number;
  title: string;
  essence: string;
  criteria: string;
  manifestation: string[];
  rootMechanism: string;
  modalities: ModalityKey[];
  dailyTools: string[];
  arc: { phase: string; focus: string }[];
  mantra: string;
};

/* ── Dimensions ─────────────────────────────────────────────────────── */

export const dimensions: AssessmentDimension[] = [
  {
    id: "SOM",
    numeral: "I",
    title: "Physical, Somatic & Nervous System Regulation",
    shortTitle: "Body & Nervous System",
    intro:
      "Exploring physical body wisdom, stored tissue tension, nervous system reactivity, and vital life-force.",
    questionIds: [1, 2, 3, 4, 5]
  },
  {
    id: "EMO",
    numeral: "II",
    title: "Emotional Processing, Heart Healing & Relationships",
    shortTitle: "Heart & Relationships",
    intro:
      "Evaluating emotional processing, heart-center blockages, attachment templates, and relational dynamics.",
    questionIds: [6, 7, 8, 9, 10]
  },
  {
    id: "MIND",
    numeral: "III",
    title: "Subconscious Mind, Abundance & Identity Blueprint",
    shortTitle: "Mind & Abundance",
    intro:
      "Uncovering subconscious core belief structures, financial glass ceilings, self-worth, and visibility blocks.",
    questionIds: [11, 12, 13, 14, 15]
  },
  {
    id: "ANC",
    numeral: "IV",
    title: "Ancestral Field, Lineage & Systemic Karma",
    shortTitle: "Ancestral Lineage",
    intro:
      "Illuminating inherited family fates, transgenerational bloodline patterns, and systemic entanglements.",
    questionIds: [16, 17, 18, 19, 20]
  },
  {
    id: "SOUL",
    numeral: "V",
    title: "Sacred Feminine, Soul Contract & Life Purpose Alignment",
    shortTitle: "Soul & Purpose",
    intro:
      "Exploring second-chakra energy, womb space wisdom, intuitive gifts, soul agreements, and dharmic calling.",
    questionIds: [21, 22, 23, 24, 25]
  }
];

export const dimensionLabels: Record<DimensionId, string> = {
  SOM: "Physical & Somatic",
  EMO: "Emotional & Heart",
  MIND: "Subconscious & Mind",
  ANC: "Ancestral & Lineage",
  SOUL: "Feminine, Soul & Purpose"
};

/* ── Modality registry (Section 3: dosage guide) ────────────────────── */

export const modalities: Record<ModalityKey, Modality> = {
  "reiki-healing": {
    key: "reiki-healing",
    name: "Reiki Healing",
    category: "Energy Healing",
    indication: "Stress, fatigue, immune recovery, chakra blockages.",
    mechanism: "Hand position channeling, chakra balancing, aura cleansing.",
    dosage: "3–6 Sessions",
    format: "In-person / Online"
  },
  "quantum-belief-reprogramming": {
    key: "quantum-belief-reprogramming",
    name: "Quantum Belief Reprogramming (QBR)",
    category: "Mind & Belief",
    indication: "Money blocks, imposter syndrome, core wounds.",
    mechanism: "Theta-state subconscious access, belief extraction & installation.",
    dosage: "4–6 Sessions",
    format: "In-person / Online"
  },
  nlp: {
    key: "nlp",
    name: "Neuro-Linguistic Programming (NLP)",
    category: "Mind & Belief",
    indication: "Phobias, confidence, communication, self-sabotage.",
    mechanism: "Timeline re-imprinting, submodality shifting, parts integration.",
    dosage: "3–5 Sessions",
    format: "In-person / Online"
  },
  "family-constellation-therapy": {
    key: "family-constellation-therapy",
    name: "Family Constellation Therapy",
    category: "Ancestral & Systemic",
    indication: "Repeating family fates, relationship blocks, grief.",
    mechanism: "Systemic field representation, restoring orders of love.",
    dosage: "1–3 Sessions",
    format: "In-person / Online"
  },
  "somatic-healing": {
    key: "somatic-healing",
    name: "Somatic Healing",
    category: "Holistic & Somatic",
    indication: "Trauma in body, chronic tension, nervous system freeze.",
    mechanism: "Titrated breathwork, felt-sense tracking, pendulation.",
    dosage: "4–8 Sessions",
    format: "In-person / Online"
  },
  "sound-healing": {
    key: "sound-healing",
    name: "Sound Healing",
    category: "Energy Healing",
    indication: "High stress, insomnia, overactive mind, dissonance.",
    mechanism: "Tibetan singing bowls, crystal bowls, vocal toning.",
    dosage: "1–4 Sessions",
    format: "In-person / Online"
  },
  "bach-flower-therapy": {
    key: "bach-flower-therapy",
    name: "Bach Flower Therapy",
    category: "Holistic & Natural",
    indication: "Emotional imbalances, acute grief, panic, transition.",
    mechanism: "Vibrational flower essences (38 remedies) custom blend.",
    dosage: "3–6 Months",
    format: "In-person / Online"
  },
  Humkaara: {
    key: "Humkaara",
    name: "Humkaara (Original Modality)",
    category: "Energy Healing",
    indication: "Root-level energetic blockages, heavy karmic weight.",
    mechanism: "Sacred sound activation, cosmic vibration channeling.",
    dosage: "2–4 Sessions",
    format: "In-person / Online"
  },
  hleem: {
    key: "hleem",
    name: "Hleem Sacred Attunement (Original Modality)",
    category: "Energy Healing",
    indication: "Feminine wounding, womb disconnection, mother wound.",
    mechanism: "Sacred feminine bija mantra attunement, womb blessing.",
    dosage: "3–6 Sessions",
    format: "In-person / Online"
  },
  "access-bars": {
    key: "access-bars",
    name: "Access Bars®",
    category: "Mind & Belief",
    indication: "Mental clutter, insomnia, overthinking, rigid control.",
    mechanism: "Light touch on 32 brain points, electromagnetic release.",
    dosage: "3–6 Sessions",
    format: "In-person / Online"
  },
  "lama-fera-healing": {
    key: "lama-fera-healing",
    name: "Lama Fera Healing",
    category: "Energy Healing",
    indication: "Heavy negative energy, psychic drain, severe illness.",
    mechanism: "Tibetan Buddhist light healing, Buddha compassion frequency.",
    dosage: "3–5 Sessions",
    format: "In-person / Online"
  },
  eft: {
    key: "eft",
    name: "EFT (Emotional Freedom Technique)",
    category: "Mind & Belief",
    indication: "Trauma triggers, acute phobias, public speaking anxiety.",
    mechanism: "Acupressure meridian tapping, amygdala de-escalation.",
    dosage: "2–4 Sessions",
    format: "In-person / Online"
  },
  "generational-ancestral-trauma-healing": {
    key: "generational-ancestral-trauma-healing",
    name: "Generational Trauma Healing",
    category: "Ancestral & Systemic",
    indication: "Transgenerational pain, inherited family burdens.",
    mechanism: "Ancestral mapping, bloodline clearing, reconciliation ritual.",
    dosage: "4–6 Sessions",
    format: "In-person / Online"
  },
  "womb-healing": {
    key: "womb-healing",
    name: "Womb Healing & Sacred Feminine Awakening",
    category: "Ancestral & Systemic",
    indication: "PCOS, fibroids, menstrual pain, reproductive grief.",
    mechanism: "Second chakra restoration, Tantric womb meditation.",
    dosage: "3–6 Sessions",
    format: "In-person / Online"
  },
  "shamanic-healing": {
    key: "shamanic-healing",
    name: "Shamanic Healing (Soul Retrieval)",
    category: "Ancestral & Systemic",
    indication: "Soul loss after shock, loss of vitality, intrusions.",
    mechanism: "Journeying, soul retrieval, power animal restoration.",
    dosage: "1–3 Ceremonies",
    format: "In-person / Online"
  },
  "business-constellation": {
    key: "business-constellation",
    name: "Business Constellation",
    category: "Ancestral & Systemic",
    indication: "Enterprise stagnation, partner conflicts, growth blocks.",
    mechanism: "Organisational systemic field representation & alignment.",
    dosage: "1–3 Sessions",
    format: "In-person / Online"
  },
  "soul-contract-reading": {
    key: "soul-contract-reading",
    name: "Soul Contract Reading",
    category: "Mind & Belief",
    indication: "Feeling directionless, spiritual crisis, purpose confusion.",
    mechanism: "Numerology, astrology & channelled pre-birth contract reading.",
    dosage: "1 Deep Dive",
    format: "In-person / Online"
  },
  restore: {
    key: "restore",
    name: "RESTORE — Signature Journey",
    category: "Flagship Package",
    indication: "Complex multi-layered issues (Body + Mind + Lineage + Soul).",
    mechanism:
      "Structured 8-week arc: Recalibrate, Excavate, Surrender, Transform, Open, Rebirth, Emerge.",
    dosage: "8 Sessions",
    format: "In-person / Online"
  },
  "corporate-wellness": {
    key: "corporate-wellness",
    name: "Corporate Wellness",
    category: "Corporate Program",
    indication: "Employee burnout, team misalignment, executive stress.",
    mechanism: "Bilingual workshops, executive coaching, team sound baths.",
    dosage: "Half-day / Monthly",
    format: "In-person / Online"
  },
  "corporate-retreat-design": {
    key: "corporate-retreat-design",
    name: "Corporate Retreat Design",
    category: "Corporate Program",
    indication: "Leadership disconnect, strategic stagnation, team renewal.",
    mechanism: "Immersive retreats combining constellations, sound & NLP.",
    dosage: "1–3 Days",
    format: "In-person / Online"
  }
};

/* ── Soul Profiles (Section 2: combination matrix) ──────────────────── */

export const soulProfiles: Record<ProfileId, SoulProfile> = {
  p1: {
    id: "p1",
    index: 1,
    title: "The Overburdened Vessel",
    essence:
      "Your body has been carrying what your mind could not finish processing. It is not weakness — it is an unfinished survival response still waiting to complete.",
    criteria: "High density in Dimension I & somatic options.",
    manifestation: ["Somatic tension", "Vagus nerve dysregulation", "Chronic fatigue"],
    rootMechanism:
      "Incomplete trauma charge locked in body tissues, dysregulated autonomic nervous system, exhausted life-force.",
    modalities: ["somatic-healing", "reiki-healing", "sound-healing"],
    dailyTools: [
      "Bach Flower blend (Rescue Remedy, Elm)",
      "Daily somatic shaking, 5 minutes",
      "Vagus nerve reset breathwork on waking"
    ],
    arc: [
      { phase: "Phase 1 · Sessions 1–2", focus: "Recalibrate & nervous system regulation (somatic release & Reiki)" },
      { phase: "Phase 2 · Sessions 3–4", focus: "Discharge stored tissue tension & restore vagal tone" },
      { phase: "Phase 3 · Sessions 5–6", focus: "Sound healing for cellular coherence & deep rest" },
      { phase: "Phase 4 · Sessions 7–8", focus: "Embodiment, capacity building & life-force restoration" }
    ],
    mantra: "My body is not the enemy. It is the witness that kept me alive."
  },
  p2: {
    id: "p2",
    index: 2,
    title: "The Guarded Heart",
    essence:
      "Your heart built its walls for good reason. This work does not tear them down — it makes them unnecessary.",
    criteria: "High density in Dimension II & emotional options.",
    manifestation: ["Unprocessed grief", "Heart armor", "Attachment wounds"],
    rootMechanism:
      "Repressed heartbreak, fear of vulnerability, relational betrayal cycles, codependency templates.",
    modalities: ["sound-healing", "bach-flower-therapy", "eft"],
    dailyTools: [
      "Daily heart-chakra toning",
      "Rose quartz meditation",
      "Boundary rituals before and after contact"
    ],
    arc: [
      { phase: "Phase 1 · Sessions 1–2", focus: "Safety, containment & grief acknowledgement" },
      { phase: "Phase 2 · Sessions 3–4", focus: "EFT release of betrayal charge & attachment triggers" },
      { phase: "Phase 3 · Sessions 5–6", focus: "Heart-centered sound healing & armor softening" },
      { phase: "Phase 4 · Sessions 7–8", focus: "Boundary embodiment & capacity to receive love" }
    ],
    mantra: "I can be open and safe at the same time."
  },
  p3: {
    id: "p3",
    index: 3,
    title: "The Bound Mind",
    essence:
      "You are not lacking discipline. You are running a program installed before you were seven — and programs can be rewritten.",
    criteria: "High density in Dimension III & mind options.",
    manifestation: ["Subconscious core wounds", "Poverty consciousness", "Imposter syndrome"],
    rootMechanism:
      "Theta-state early childhood conditioning, subconscious upper-limit self-sabotage, overactive ego defense.",
    modalities: ["quantum-belief-reprogramming", "nlp", "access-bars"],
    dailyTools: [
      "Subconscious neural re-imprinting audio before sleep",
      "Custom QBR belief statements",
      "Evening mental-clutter clearing"
    ],
    arc: [
      { phase: "Phase 1 · Sessions 1–2", focus: "Belief excavation & core wound mapping (QBR)" },
      { phase: "Phase 2 · Sessions 3–4", focus: "Theta-state extraction & new belief installation" },
      { phase: "Phase 3 · Sessions 5–6", focus: "NLP timeline re-imprinting & parts integration" },
      { phase: "Phase 4 · Sessions 7–8", focus: "Access Bars clearing, visibility & upper-limit expansion" }
    ],
    mantra: "The ceiling I keep hitting was never mine to begin with."
  },
  p4: {
    id: "p4",
    index: 4,
    title: "The Lineage Carrier",
    essence:
      "Some of what you carry was never yours. Returning it to where it belongs is an act of love, not betrayal.",
    criteria: "High density in Dimension IV & ancestral options.",
    manifestation: ["Transgenerational trauma", "Inherited family fate", "Systemic entanglement"],
    rootMechanism:
      "Blind systemic loyalty to suffering ancestors, parentification, inherited financial and relational glass ceilings.",
    modalities: ["family-constellation-therapy", "generational-ancestral-trauma-healing"],
    dailyTools: [
      "Ancestral honor rituals",
      "Systemic re-ordering sentences",
      "Monthly fire ceremony"
    ],
    arc: [
      { phase: "Phase 1 · Sessions 1–2", focus: "Genogram & systemic field mapping" },
      { phase: "Phase 2 · Sessions 3–4", focus: "Excavate & lineage release (Family Constellation)" },
      { phase: "Phase 3 · Sessions 5–6", focus: "Bloodline clearing & reconciliation ritual" },
      { phase: "Phase 4 · Sessions 7–8", focus: "Restoring orders of love & claiming your own fate" }
    ],
    mantra: "I honor you, and I set down what was never mine to carry."
  },
  p5: {
    id: "p5",
    index: 5,
    title: "The Suppressed Divine Feminine",
    essence:
      "Your creative centre has been holding the silence of generations of women. It is asking to speak again.",
    criteria: "High density in Dimension V (Q21–Q22) & feminine options.",
    manifestation: ["Womb space stagnation", "Reproductive grief / PCOS", "Creative disconnection"],
    rootMechanism:
      "Silenced maternal bloodline, over-masculine drive, second-chakra energetic blockage, intimacy wounding.",
    modalities: ["womb-healing", "hleem"],
    dailyTools: [
      "Hleem seed mantra japa",
      "Svadhisthana womb meditation",
      "Yoni steam / sacred oil ritual"
    ],
    arc: [
      { phase: "Phase 1 · Sessions 1–2", focus: "Womb space assessment & second-chakra restoration" },
      { phase: "Phase 2 · Sessions 3–4", focus: "Maternal line grief release & mother-wound work" },
      { phase: "Phase 3 · Sessions 5–6", focus: "Hleem sacred attunement & bija mantra activation" },
      { phase: "Phase 4 · Sessions 7–8", focus: "Creative rebirth, sensuality & feminine embodiment" }
    ],
    mantra: "I return the silence to my grandmothers, and I keep the song."
  },
  p6: {
    id: "p6",
    index: 6,
    title: "The Scattered Essence",
    essence:
      "A part of you left during something you could not survive whole. Soul work is simply going back for it.",
    criteria: "High density in Dimension V (Q23–Q24) & soul options.",
    manifestation: ["Soul fragmentation", "Vitality depletion", "Karmic disconnection"],
    rootMechanism:
      "Soul loss following severe shock, unfulfilled pre-birth agreements, karmic repeating lessons.",
    modalities: ["shamanic-healing", "soul-contract-reading", "lama-fera-healing"],
    dailyTools: [
      "Soul integration journaling",
      "Grounding earth rituals",
      "Power animal meditation"
    ],
    arc: [
      { phase: "Phase 1 · Sessions 1–2", focus: "Grounding, protection & vitality stabilisation" },
      { phase: "Phase 2 · Sessions 3–4", focus: "Soul contract reading & karmic pattern mapping" },
      { phase: "Phase 3 · Sessions 5–6", focus: "Shamanic journeying & soul retrieval ceremony" },
      { phase: "Phase 4 · Sessions 7–8", focus: "Integration of returned parts & dharmic realignment" }
    ],
    mantra: "Every part of me is welcome to come home."
  },
  p7: {
    id: "p7",
    index: 7,
    title: "The Empathic Absorber",
    essence:
      "Your sensitivity is a gift with no shield yet. We are not dulling it — we are giving it a door that closes.",
    criteria: "High density across Dimensions I & V regarding aura boundaries.",
    manifestation: ["Aura contamination", "Psychic drain", "Empathic overload"],
    rootMechanism:
      "Weak energetic biofield boundaries, lack of auric shielding, absorbing collective environmental stress.",
    modalities: ["Humkaara", "reiki-healing", "lama-fera-healing"],
    dailyTools: [
      "Auric protection visualisation, morning & night",
      "Black tourmaline / salt baths",
      "Daily Humkaara chanting"
    ],
    arc: [
      { phase: "Phase 1 · Sessions 1–2", focus: "Aura cleansing & energetic cord release (Reiki)" },
      { phase: "Phase 2 · Sessions 3–4", focus: "Lama Fera space clearing & heaviness removal" },
      { phase: "Phase 3 · Sessions 5–6", focus: "Humkaara sacred sound activation & field sealing" },
      { phase: "Phase 4 · Sessions 7–8", focus: "Daily shielding protocol & discernment training" }
    ],
    mantra: "I feel everything. I carry only what is mine."
  },
  p8: {
    id: "p8",
    index: 8,
    title: "The Misaligned Enterprise / Leader",
    essence:
      "Your strategy is not the bottleneck. The system your business sits inside is out of order — and systems can be re-ordered.",
    criteria: "High density in Q25 & business options in Dimension III.",
    manifestation: ["Enterprise stagnation", "Co-founder conflict", "Revenue bottlenecks"],
    rootMechanism:
      "Systemic field entanglements in company hierarchy, founder projection, lack of organizational coherence.",
    modalities: ["business-constellation", "nlp", "quantum-belief-reprogramming"],
    dailyTools: [
      "Business systemic field mapping",
      "Logical levels leadership alignment",
      "Team sound bath, monthly"
    ],
    arc: [
      { phase: "Phase 1 · Sessions 1–2", focus: "Organisational field mapping & bottleneck diagnosis" },
      { phase: "Phase 2 · Sessions 3–4", focus: "Business Constellation — restoring order & belonging" },
      { phase: "Phase 3 · Sessions 5–6", focus: "Executive NLP & QBR on visibility and worth" },
      { phase: "Phase 4 · Sessions 7–8", focus: "Team coherence, sound baths & leadership integration" }
    ],
    mantra: "When the system is in order, the revenue follows."
  },
  p9: {
    id: "p9",
    index: 9,
    title: "The Awakened Seeker & Healer",
    essence:
      "You are not only here to be healed. You are here to learn to hold the lamp for others — and that requires training.",
    criteria: "High density in Q20, Q23, Q24 indicating spiritual calling.",
    manifestation: ["Spiritual calling", "Healer path awakening", "Intuitive surge"],
    rootMechanism:
      "Soul readiness to step into professional healing arts, master ancient wisdom modalities, and serve humanity.",
    modalities: ["reiki-healing", "Humkaara", "hleem", "restore"],
    dailyTools: [
      "Daily sadhana practice",
      "Shakta tantric invocation",
      "Mentorship supervision, fortnightly"
    ],
    arc: [
      { phase: "Phase 1 · Sessions 1–2", focus: "Personal clearing — the healer heals first" },
      { phase: "Phase 2 · Sessions 3–4", focus: "Reiki / Humkaara practitioner attunement" },
      { phase: "Phase 3 · Sessions 5–6", focus: "Hleem attunement & lineage gift activation" },
      { phase: "Phase 4 · Sessions 7–8", focus: "RESTORE facilitator training & supervised practice" }
    ],
    mantra: "I heal myself in the same motion that I learn to hold others."
  },
  p10: {
    id: "p10",
    index: 10,
    title: "The Multi-Layered Blossom",
    essence:
      "Your pattern is not scattered — it is whole-system. Body, mind, lineage and soul are all speaking at once, and they need one sequenced arc, not five separate fixes.",
    criteria: "Responses distributed broadly across three or more dimensions.",
    manifestation: ["Whole human ecosystem overload", "Body + Mind + Lineage + Soul", "Layered, recurring patterns"],
    rootMechanism:
      "Complex, multi-dimensional challenges requiring a structured, sequential arc of deep soul transformation.",
    modalities: ["restore", "bach-flower-therapy"],
    dailyTools: [
      "Complete RESTORE toolkit",
      "Custom Bach Flower blend — 4 drops, 4x daily",
      "Customised meditations + weekly integration"
    ],
    arc: [
      { phase: "Phase 1 · Sessions 1–2", focus: "Recalibrate & nervous system regulation (somatic release & Reiki)" },
      { phase: "Phase 2 · Sessions 3–4", focus: "Excavate & lineage release (Family Constellation & QBR)" },
      { phase: "Phase 3 · Sessions 5–6", focus: "Transform & subconscious rewiring (NLP & Hleem / Humkaara)" },
      { phase: "Phase 4 · Sessions 7–8", focus: "Rebirth, embodiment & soul integration (RESTORE emergence ceremony)" }
    ],
    mantra: "You were not broken into this world. You were born to blossom."
  }
};

/* ── The 25 questions ───────────────────────────────────────────────── */

export const questions: AssessmentQuestion[] = [
  {
    id: 1,
    dimension: "SOM",
    prompt: "How does stress, heavy emotion, or mental overload physically manifest in your body?",
    options: [
      { id: "A", text: "Persistent muscle tightness in neck, shoulders, jaw clenching, tension headaches, or gut holding patterns.", profiles: [["p1", 2]], modalities: ["somatic-healing", "reiki-healing"] },
      { id: "B", text: "Profound chronic fatigue, waking up unrefreshed, and feeling perpetually drained of vital energy.", profiles: [["p1", 2]], modalities: ["somatic-healing", "reiki-healing"] },
      { id: "C", text: "Sudden panic spikes, heart racing, shallow breathing, feeling hyper-vigilant, or startled easily.", profiles: [["p1", 2], ["p2", 1]], modalities: ["eft", "sound-healing"] },
      { id: "D", text: "Brain fog, heavy head pressure, sensory overload, or feeling physically numb and detached from your body.", profiles: [["p3", 2], ["p1", 1]], modalities: ["access-bars"] },
      { id: "E", text: "Recurring physical symptoms or health patterns that mirror health struggles experienced by family members.", profiles: [["p4", 2]], modalities: ["generational-ancestral-trauma-healing"] }
    ]
  },
  {
    id: 2,
    dimension: "SOM",
    prompt: "When faced with unexpected challenges or overwhelming situations, what is your nervous system's default reaction?",
    options: [
      { id: "A", text: "Hyper-activation: racing heart, restlessness, an urge to flee, pace around, or frantically fix things.", profiles: [["p1", 2]], modalities: ["somatic-healing", "reiki-healing"] },
      { id: "B", text: "Freeze state: feeling paralyzed, unable to take action, shutting down physically, or craving deep sleep.", profiles: [["p1", 2]], modalities: ["somatic-healing", "reiki-healing"] },
      { id: "C", text: "Emotional flooding: sudden surge of tears, lump in the throat, chest constriction, or heavy sadness.", profiles: [["p2", 2], ["p1", 1]], modalities: ["eft", "sound-healing"] },
      { id: "D", text: "Defensive armoring: becoming physically tense, irritable, guarded, or bracing for a conflict.", profiles: [["p1", 2], ["p3", 1]], modalities: ["access-bars", "somatic-healing"] },
      { id: "E", text: "Dissociation: spacing out, feeling out-of-body, or observing the situation as if watching from afar.", profiles: [["p6", 2], ["p1", 1]], modalities: ["shamanic-healing", "somatic-healing"] }
    ]
  },
  {
    id: 3,
    dimension: "SOM",
    prompt: "How would you describe your relationship with rest, relaxation, and your physical body?",
    options: [
      { id: "A", text: "I find it nearly impossible to sit still; guilt or anxiety arises whenever I try to relax or do nothing.", profiles: [["p1", 2], ["p3", 1]], modalities: ["somatic-healing", "reiki-healing"] },
      { id: "B", text: "My body feels like an exhausting weight to carry; I feel disconnected from physical pleasure and ease.", profiles: [["p1", 2], ["p5", 1]], modalities: ["somatic-healing", "reiki-healing"] },
      { id: "C", text: "I push through physical fatigue using willpower, caffeine, or drive until my body completely crashes.", profiles: [["p1", 2]], modalities: ["eft", "sound-healing"] },
      { id: "D", text: "I suffer from sleep disruptions, vivid anxious dreams, frequent night wakings, or trouble falling asleep.", profiles: [["p3", 2], ["p1", 1]], modalities: ["access-bars", "sound-healing"] },
      { id: "E", text: "I feel deeply intuitive and attuned to my body, but I easily absorb the physical pain and stress of others.", profiles: [["p7", 2]], modalities: ["Humkaara", "reiki-healing"] }
    ]
  },
  {
    id: 4,
    dimension: "SOM",
    prompt: "Throughout your typical day, which energy and vital life-force pattern do you experience?",
    options: [
      { id: "A", text: "Extreme energy crashes in the afternoon with intense brain fog and craving sugar or caffeine.", profiles: [["p1", 2]], modalities: ["somatic-healing", "reiki-healing"] },
      { id: "B", text: "Adrenaline-fueled energy spikes followed by sudden bouts of severe physical and emotional exhaustion.", profiles: [["p1", 2]], modalities: ["somatic-healing", "reiki-healing"] },
      { id: "C", text: "Constant low-grade lethargy; my energetic battery never charges beyond 30% capacity.", profiles: [["p1", 2], ["p6", 1]], modalities: ["eft", "sound-healing"] },
      { id: "D", text: "Tension and restlessness that build through the day, making it difficult to wind down at night.", profiles: [["p3", 2], ["p1", 1]], modalities: ["access-bars"] },
      { id: "E", text: "Unpredictable energy that fluctuates wildly depending on the environments or people I interact with.", profiles: [["p7", 2]], modalities: ["Humkaara", "lama-fera-healing"] }
    ]
  },
  {
    id: 5,
    dimension: "SOM",
    prompt: "What physical area of your body feels like it holds the most stored memory, tension, or stagnation?",
    options: [
      { id: "A", text: "Throat, neck, and jaw — holding back unsaid words, stifled tears, or suppressed self-expression.", profiles: [["p1", 2], ["p2", 1]], modalities: ["somatic-healing", "sound-healing"] },
      { id: "B", text: "Heart, chest, and upper back — carrying old emotional grief, heartbreak, or protective energetic walls.", profiles: [["p2", 2], ["p1", 1]], modalities: ["sound-healing", "bach-flower-therapy"] },
      { id: "C", text: "Solar plexus and upper stomach — holding chronic worry, control issues, fear of failure, or anxiety.", profiles: [["p3", 2], ["p1", 1]], modalities: ["eft", "quantum-belief-reprogramming"] },
      { id: "D", text: "Lower abdomen, pelvic space, and hips — holding creative blocks, relational trauma, or feminine conditioning.", profiles: [["p5", 2], ["p1", 1]], modalities: ["womb-healing", "hleem"] },
      { id: "E", text: "Lower back, spine, and feet — holding insecurity regarding financial survival, stability, and belonging.", profiles: [["p4", 2], ["p3", 1]], modalities: ["generational-ancestral-trauma-healing"] }
    ]
  },
  {
    id: 6,
    dimension: "EMO",
    prompt: "What emotional state or baseline mood feels most dominant in your current life chapter?",
    options: [
      { id: "A", text: "Unexplained sadness, underlying grief, or a quiet heavy sorrow beneath daily activities.", profiles: [["p2", 2]], modalities: ["bach-flower-therapy", "sound-healing"] },
      { id: "B", text: "Persistent worry, fear of future catastrophes, dread, or waiting for 'the other shoe to drop.'", profiles: [["p2", 2], ["p3", 1]], modalities: ["eft", "quantum-belief-reprogramming"] },
      { id: "C", text: "Subconscious anger, irritability, resentment, or feeling repeatedly underappreciated and unfulfilled.", profiles: [["p2", 2], ["p1", 1]], modalities: ["somatic-healing", "nlp"] },
      { id: "D", text: "Emotional flatness or numbness — difficulty feeling genuine enthusiasm, deep joy, or passionate drive.", profiles: [["p2", 2], ["p6", 1]], modalities: ["family-constellation-therapy", "somatic-healing"] },
      { id: "E", text: "A persistent sense of guilt or shame, feeling responsible for other people's happiness and emotional state.", profiles: [["p4", 2], ["p2", 1]], modalities: ["family-constellation-therapy"] }
    ]
  },
  {
    id: 7,
    dimension: "EMO",
    prompt: "When emotional pain, disappointment, or conflict arises in personal relationships, how do you process it?",
    options: [
      { id: "A", text: "I internalize it completely, blaming myself and over-analyzing what I did wrong.", profiles: [["p2", 2], ["p3", 1]], modalities: ["bach-flower-therapy", "eft"] },
      { id: "B", text: "I express it through intense emotional outbursts or tearful releases, feeling overwhelmed by the feeling.", profiles: [["p2", 2]], modalities: ["eft", "quantum-belief-reprogramming"] },
      { id: "C", text: "I withdraw emotionally, put up wall-like barriers, and isolate myself to protect against further hurt.", profiles: [["p2", 2], ["p1", 1]], modalities: ["somatic-healing", "nlp"] },
      { id: "D", text: "I intellectualize the emotion immediately, analyzing it logically while disconnecting from the felt sense.", profiles: [["p2", 2], ["p3", 1]], modalities: ["family-constellation-therapy", "somatic-healing"] },
      { id: "E", text: "I keep the peace at all costs, pleasing others and suppressing my own feelings to avoid conflict.", profiles: [["p4", 2], ["p2", 1]], modalities: ["family-constellation-therapy"] }
    ]
  },
  {
    id: 8,
    dimension: "EMO",
    prompt: "Which pattern repeatedly surfaces in your intimate partnerships, close friendships, or family relationships?",
    options: [
      { id: "A", text: "Attracting people who are emotionally unavailable, distant, or who require me to 'fix' or save them.", profiles: [["p2", 2], ["p4", 1]], modalities: ["bach-flower-therapy", "family-constellation-therapy"] },
      { id: "B", text: "Deep-seated fear of abandonment, leading to needy attachment or over-checking the relationship's stability.", profiles: [["p2", 2], ["p3", 1]], modalities: ["eft", "quantum-belief-reprogramming"] },
      { id: "C", text: "Fear of engulfment or losing independence, causing me to pull away when intimacy deepens.", profiles: [["p2", 2], ["p5", 1]], modalities: ["somatic-healing", "nlp"] },
      { id: "D", text: "Repeating the exact same communication breakdowns or marital arguments that my parents experienced.", profiles: [["p4", 2], ["p2", 1]], modalities: ["family-constellation-therapy"] },
      { id: "E", text: "Over-giving and poor boundaries: giving far more love, time, and support than I receive in return.", profiles: [["p2", 2], ["p7", 1]], modalities: ["family-constellation-therapy", "bach-flower-therapy"] }
    ]
  },
  {
    id: 9,
    dimension: "EMO",
    prompt: "How do you experience setting personal boundaries and honoring your authentic needs?",
    options: [
      { id: "A", text: "I feel immense guilt whenever I say 'no,' often saying 'yes' even when completely exhausted.", profiles: [["p2", 2], ["p7", 1]], modalities: ["bach-flower-therapy", "eft"] },
      { id: "B", text: "My boundaries are extreme — either completely porous with no defense, or rigid brick walls.", profiles: [["p2", 2], ["p7", 1]], modalities: ["eft", "quantum-belief-reprogramming"] },
      { id: "C", text: "I state boundaries clearly, but people cross them because I struggle to enforce consequences.", profiles: [["p2", 2], ["p3", 1]], modalities: ["nlp", "somatic-healing"] },
      { id: "D", text: "I hide my true needs, fearing that expressing them will make me seem demanding or burdensome.", profiles: [["p2", 2], ["p4", 1]], modalities: ["family-constellation-therapy", "quantum-belief-reprogramming"] },
      { id: "E", text: "I set boundaries well professionally, but struggle significantly with family and romantic partners.", profiles: [["p4", 2], ["p2", 1]], modalities: ["family-constellation-therapy"] }
    ]
  },
  {
    id: 10,
    dimension: "EMO",
    prompt: "How open and safe does your heart feel when giving and receiving love and vulnerability?",
    options: [
      { id: "A", text: "I give love generously, but find it deeply uncomfortable to receive care, help, or compliments.", profiles: [["p2", 2], ["p5", 1]], modalities: ["bach-flower-therapy", "sound-healing"] },
      { id: "B", text: "My heart feels guarded by protective walls due to past romantic betrayals or childhood heartbreak.", profiles: [["p2", 2]], modalities: ["eft", "sound-healing"] },
      { id: "C", text: "I desire deep soul intimacy, but a subconscious voice warns me that vulnerability will lead to pain.", profiles: [["p2", 2], ["p3", 1]], modalities: ["somatic-healing", "nlp"] },
      { id: "D", text: "I feel a profound loneliness, as if no one truly sees, understands, or knows the real me.", profiles: [["p2", 2], ["p6", 1]], modalities: ["family-constellation-therapy", "soul-contract-reading"] },
      { id: "E", text: "I experience deep love and gratitude, but often worry about losing the people I love most.", profiles: [["p4", 2], ["p2", 1]], modalities: ["family-constellation-therapy", "bach-flower-therapy"] }
    ]
  },
  {
    id: 11,
    dimension: "MIND",
    prompt: "When reflecting on money, wealth, and financial abundance, which internal program runs loudest?",
    options: [
      { id: "A", text: "Poverty consciousness: 'Money is scarce and hard to earn; I must hoard it because dry spells are inevitable.'", profiles: [["p3", 2], ["p4", 1]], modalities: ["quantum-belief-reprogramming", "nlp"] },
      { id: "B", text: "Financial glass ceiling: 'I can earn comfortably, but large wealth is unsafe or not meant for me.'", profiles: [["p3", 2], ["p8", 1]], modalities: ["quantum-belief-reprogramming", "nlp"] },
      { id: "C", text: "Money leaks: 'Whenever I accumulate savings, unexpected expenses drain my financial cushion.'", profiles: [["p3", 2]], modalities: ["access-bars", "quantum-belief-reprogramming"] },
      { id: "D", text: "Guilt around wealth: 'If I become too successful, I will alienate my loved ones or be judged.'", profiles: [["p3", 2], ["p4", 1]], modalities: ["eft", "quantum-belief-reprogramming"] },
      { id: "E", text: "Abundance struggle: 'I must work frantically and sacrifice my health and peace to earn security.'", profiles: [["p4", 2], ["p3", 1]], modalities: ["generational-ancestral-trauma-healing"] }
    ]
  },
  {
    id: 12,
    dimension: "MIND",
    prompt: "How does your internal dialogue treat you when you attempt new goals or step into visibility?",
    options: [
      { id: "A", text: "Imposter syndrome: 'Who do you think you are? You aren't qualified or good enough to step forward.'", profiles: [["p3", 2]], modalities: ["quantum-belief-reprogramming", "nlp"] },
      { id: "B", text: "Perfectionism: 'If it isn't 100% flawless, it's a failure. I must re-do it until I feel safe from criticism.'", profiles: [["p3", 2]], modalities: ["quantum-belief-reprogramming", "nlp"] },
      { id: "C", text: "Self-sabotage: I start projects with immense enthusiasm, but freeze, procrastinate, or quit near completion.", profiles: [["p3", 2], ["p8", 1]], modalities: ["access-bars", "nlp"] },
      { id: "D", text: "Fear of judgment: 'People will criticize, envy, or expose me if I express my authentic voice publicly.'", profiles: [["p3", 2], ["p8", 1]], modalities: ["eft", "quantum-belief-reprogramming"] },
      { id: "E", text: "Comparison: constantly feeling behind in life and measuring my progress against peers.", profiles: [["p3", 2], ["p4", 1]], modalities: ["generational-ancestral-trauma-healing", "nlp"] }
    ]
  },
  {
    id: 13,
    dimension: "MIND",
    prompt: "How do you experience mental focus, decision-making, and internal clarity day to day?",
    options: [
      { id: "A", text: "Non-stop mental chatter: racing thoughts, over-analyzing past conversations, endless 'what-if' scenarios.", profiles: [["p3", 2]], modalities: ["quantum-belief-reprogramming", "access-bars"] },
      { id: "B", text: "Internal conflict: feeling pulled in two opposite directions — part of me wants growth, part wants safety.", profiles: [["p3", 2]], modalities: ["nlp", "quantum-belief-reprogramming"] },
      { id: "C", text: "Chronic indecision: constantly seeking advice because I struggle to trust my own judgment.", profiles: [["p3", 2], ["p5", 1]], modalities: ["access-bars", "nlp"] },
      { id: "D", text: "Mental fatigue: intellectually drained, scattered, unable to maintain sustained creative focus.", profiles: [["p3", 2], ["p1", 1]], modalities: ["eft", "access-bars"] },
      { id: "E", text: "Rigid over-control: needing to micromanage every detail of life and work to prevent unexpected chaos.", profiles: [["p3", 2], ["p4", 1]], modalities: ["access-bars", "generational-ancestral-trauma-healing"] }
    ]
  },
  {
    id: 14,
    dimension: "MIND",
    prompt: "What core subconscious fear feels most prominent when you think about fully stepping into your power?",
    options: [
      { id: "A", text: "Fear of rejection or abandonment by family or community if I change and outgrow them.", profiles: [["p3", 2], ["p4", 1]], modalities: ["quantum-belief-reprogramming", "family-constellation-therapy"] },
      { id: "B", text: "Fear of failure and public humiliation: what if I invest time and money and fail completely?", profiles: [["p3", 2], ["p8", 1]], modalities: ["quantum-belief-reprogramming", "nlp"] },
      { id: "C", text: "Fear of success and responsibility: what if I succeed and cannot handle the demand and pressure?", profiles: [["p3", 2], ["p8", 1]], modalities: ["access-bars", "nlp"] },
      { id: "D", text: "Fear of harm or envy: a deep instinctual feeling that standing out or being visible invites danger.", profiles: [["p3", 2], ["p4", 1]], modalities: ["eft", "generational-ancestral-trauma-healing"] },
      { id: "E", text: "Fear of being seen as selfish: believing that prioritizing my fulfillment hurts those around me.", profiles: [["p4", 2], ["p3", 1]], modalities: ["family-constellation-therapy"] }
    ]
  },
  {
    id: 15,
    dimension: "MIND",
    prompt: "Which message did you absorb most strongly during your childhood environment before age seven?",
    options: [
      { id: "A", text: "'Life is a struggle and you have to work hard just to survive.'", profiles: [["p3", 2], ["p4", 1]], modalities: ["quantum-belief-reprogramming", "nlp"] },
      { id: "B", text: "'Don't make a scene, keep quiet, and be a good child so everyone stays happy.'", profiles: [["p3", 2], ["p2", 1]], modalities: ["quantum-belief-reprogramming", "nlp"] },
      { id: "C", text: "'Love and approval are earned through high achievements, perfection, and good grades.'", profiles: [["p3", 2], ["p8", 1]], modalities: ["access-bars", "quantum-belief-reprogramming"] },
      { id: "D", text: "'The world is unsafe and people will take advantage of you if you let your guard down.'", profiles: [["p3", 2], ["p7", 1]], modalities: ["eft", "quantum-belief-reprogramming"] },
      { id: "E", text: "'Our family is destined for hardship; people like us don't get lucky or wealthy.'", profiles: [["p4", 2], ["p3", 1]], modalities: ["generational-ancestral-trauma-healing", "family-constellation-therapy"] }
    ]
  },
  {
    id: 16,
    dimension: "ANC",
    prompt: "Looking across your extended family tree, which pattern repeatedly occurs?",
    options: [
      { id: "A", text: "Unspoken secrets, family feuds, excluded members, early sudden deaths, or severed relationships.", profiles: [["p4", 2]], modalities: ["family-constellation-therapy"] },
      { id: "B", text: "Sudden financial loss, bankruptcy, lost property, forced migration, or material displacement.", profiles: [["p4", 2], ["p3", 1]], modalities: ["family-constellation-therapy"] },
      { id: "C", text: "Repeating relational fates across generations — early widowhood, bitter divorces, single parenting.", profiles: [["p4", 2], ["p2", 1]], modalities: ["generational-ancestral-trauma-healing"] },
      { id: "D", text: "Transgenerational health struggles, chronic illnesses, or addictions mirrored across relatives.", profiles: [["p4", 2], ["p1", 1]], modalities: ["generational-ancestral-trauma-healing"] },
      { id: "E", text: "Maternal lineage suppression: mothers and grandmothers whose voices, talents, or choices were silenced.", profiles: [["p5", 2], ["p4", 1]], modalities: ["hleem", "womb-healing"] }
    ]
  },
  {
    id: 17,
    dimension: "ANC",
    prompt: "What emotional position or systemic role have you carried within your immediate family?",
    options: [
      { id: "A", text: "The Parentified Child: the emotional anchor, mediator, or caregiver for my own parents.", profiles: [["p4", 2]], modalities: ["family-constellation-therapy"] },
      { id: "B", text: "The Black Sheep: an outsider who carries the unsaid truths and shadows of the family.", profiles: [["p4", 2], ["p9", 1]], modalities: ["family-constellation-therapy"] },
      { id: "C", text: "The Sacrificial Peacekeeper: suppressing my goals to maintain harmony and protect the family.", profiles: [["p4", 2], ["p2", 1]], modalities: ["generational-ancestral-trauma-healing"] },
      { id: "D", text: "The High Achiever: carrying pressure to validate the family's worth through my success and status.", profiles: [["p4", 2], ["p8", 1]], modalities: ["generational-ancestral-trauma-healing"] },
      { id: "E", text: "The Invisible One: staying quiet, asking for nothing, taking up as little space as possible.", profiles: [["p4", 2], ["p5", 1]], modalities: ["shamanic-healing", "hleem"] }
    ]
  },
  {
    id: 18,
    dimension: "ANC",
    prompt: "How do you feel connected to your ancestral heritage, cultural roots, and family history?",
    options: [
      { id: "A", text: "An invisible heavy weight on my shoulders — an obligation to suffer as my ancestors did.", profiles: [["p4", 2]], modalities: ["family-constellation-therapy"] },
      { id: "B", text: "Completely severed, disconnected, or alienated from my bloodline, roots, and family history.", profiles: [["p4", 2], ["p6", 1]], modalities: ["family-constellation-therapy"] },
      { id: "C", text: "Deep love for my family, but unconscious guilt whenever I experience more joy or wealth than they had.", profiles: [["p4", 2], ["p3", 1]], modalities: ["generational-ancestral-trauma-healing"] },
      { id: "D", text: "Burdened by unresolved ancestral grief, trauma, or cultural displacement not originating in my life.", profiles: [["p4", 2], ["p7", 1]], modalities: ["generational-ancestral-trauma-healing"] },
      { id: "E", text: "A powerful spiritual calling to heal my bloodline and ensure this trauma ends with me.", profiles: [["p9", 2], ["p4", 1]], modalities: ["shamanic-healing", "hleem"] }
    ]
  },
  {
    id: 19,
    dimension: "ANC",
    prompt: "When you reflect on your parents' marriage and relationship dynamic, how does it impact your life today?",
    options: [
      { id: "A", text: "I repeat the exact same argument styles, emotional distance, or conflicts my parents had.", profiles: [["p4", 2], ["p2", 1]], modalities: ["family-constellation-therapy"] },
      { id: "B", text: "I chose a life or partner that is the polar opposite, yet still feel governed by fear of their fate.", profiles: [["p4", 2]], modalities: ["family-constellation-therapy"] },
      { id: "C", text: "I feel stuck in the middle, still trying to mediate, heal, or fix my parents' relationship.", profiles: [["p4", 2]], modalities: ["generational-ancestral-trauma-healing"] },
      { id: "D", text: "I harbor deep unexpressed anger or resentment toward one or both parents for childhood wounds.", profiles: [["p4", 2], ["p2", 1]], modalities: ["generational-ancestral-trauma-healing", "eft"] },
      { id: "E", text: "Deep compassion for my parents' struggles, but I struggle to disentangle my identity from their pain.", profiles: [["p4", 2], ["p6", 1]], modalities: ["shamanic-healing", "family-constellation-therapy"] }
    ]
  },
  {
    id: 20,
    dimension: "ANC",
    prompt: "What is your relationship with ancestral gifts, wisdom, and the positive legacy of your lineage?",
    options: [
      { id: "A", text: "I feel blocked from the gifts and strength of my ancestors because the trauma feels too loud.", profiles: [["p4", 2]], modalities: ["family-constellation-therapy", "generational-ancestral-trauma-healing"] },
      { id: "B", text: "I recognize intuitive or healing abilities in myself that were suppressed or feared in past generations.", profiles: [["p9", 2], ["p4", 1]], modalities: ["Humkaara", "hleem"] },
      { id: "C", text: "A strong duty to honor my ancestors, but I don't know how to do so without carrying their pain.", profiles: [["p4", 2], ["p9", 1]], modalities: ["generational-ancestral-trauma-healing"] },
      { id: "D", text: "Completely unaware of my lineage's gifts, as though I am starting from zero in life.", profiles: [["p4", 2], ["p6", 1]], modalities: ["generational-ancestral-trauma-healing", "soul-contract-reading"] },
      { id: "E", text: "I sense my soul specifically chose this bloodline to act as a light-bearer and ancestral healer.", profiles: [["p9", 2], ["p4", 1]], modalities: ["shamanic-healing", "restore"] }
    ]
  },
  {
    id: 21,
    dimension: "SOUL",
    prompt: "Regarding your relationship with feminine energy, intuition, and natural creative flow (for all genders):",
    options: [
      { id: "A", text: "I operate in rigid, over-working masculine drive, struggling to slow down, surrender, or receive.", profiles: [["p5", 2]], modalities: ["womb-healing", "hleem"] },
      { id: "B", text: "I feel deeply disconnected from my creative spark, passion, sensuality, and capacity for pleasure.", profiles: [["p5", 2]], modalities: ["womb-healing", "hleem"] },
      { id: "C", text: "I experience blockages in my lower abdomen, pelvic space, or second chakra (Svadhisthana).", profiles: [["p5", 2]], modalities: ["womb-healing", "hleem"] },
      { id: "D", text: "I struggle to trust my intuitive gut feelings, relying heavily on logic and external validation.", profiles: [["p5", 2], ["p3", 1]], modalities: ["hleem", "quantum-belief-reprogramming"] },
      { id: "E", text: "A powerful awakening of sacred feminine energy, but no grounded tools or sanctuary to integrate it.", profiles: [["p5", 2], ["p9", 1]], modalities: ["hleem", "Humkaara"] }
    ]
  },
  {
    id: 22,
    dimension: "SOUL",
    prompt: "For those who carry a physical womb space or work with womb energy, which experience resonates most?",
    options: [
      { id: "A", text: "Physical challenges: PCOS, endometriosis, fibroids, severe menstrual pain, or hormonal imbalance.", profiles: [["p5", 2]], modalities: ["womb-healing", "hleem"] },
      { id: "B", text: "Reproductive or relational grief: miscarriage, abortion, birth trauma, or deep heartbreak scarring.", profiles: [["p5", 2], ["p2", 1]], modalities: ["womb-healing", "bach-flower-therapy"] },
      { id: "C", text: "Sensuality and intimacy wounds: difficulty feeling safe, open, and fully present during intimacy.", profiles: [["p5", 2], ["p1", 1]], modalities: ["womb-healing", "somatic-healing"] },
      { id: "D", text: "Creative stagnation: the 'womb of creation' inside me feels blocked from birthing new projects.", profiles: [["p5", 2], ["p8", 1]], modalities: ["womb-healing", "hleem"] },
      { id: "E", text: "A longing to heal the maternal line and connect with divine feminine Goddess consciousness.", profiles: [["p5", 2], ["p9", 1]], modalities: ["hleem", "shamanic-healing"] }
    ]
  },
  {
    id: 23,
    dimension: "SOUL",
    prompt: "When you contemplate your higher life purpose, career alignment, and soul dharma, what arises?",
    options: [
      { id: "A", text: "A persistent feeling of being lost or misaligned — as if living someone else's life script.", profiles: [["p6", 2]], modalities: ["soul-contract-reading", "shamanic-healing"] },
      { id: "B", text: "I know my purpose, but feel paralyzed by fear, financial insecurity, or lack of confidence.", profiles: [["p6", 2], ["p3", 1]], modalities: ["soul-contract-reading", "quantum-belief-reprogramming"] },
      { id: "C", text: "Repeated setbacks or 'glass doors' whenever I get close to stepping into my spiritual calling.", profiles: [["p6", 2], ["p8", 1]], modalities: ["shamanic-healing", "lama-fera-healing"] },
      { id: "D", text: "Profound soul fragmentation — as if a part of my vitality went missing after a past crisis.", profiles: [["p6", 2]], modalities: ["shamanic-healing", "lama-fera-healing"] },
      { id: "E", text: "I feel called to serve, heal, or guide others, but must heal myself first and master the healing arts.", profiles: [["p9", 2], ["p6", 1]], modalities: ["restore", "reiki-healing"] }
    ]
  },
  {
    id: 24,
    dimension: "SOUL",
    prompt: "How do you experience energetic sensitivity, aura boundaries, and spiritual protection in daily life?",
    options: [
      { id: "A", text: "I am an 'energy sponge' — absorbing the moods, anxiety, and physical pain of everyone around me.", profiles: [["p7", 2]], modalities: ["Humkaara", "reiki-healing"] },
      { id: "B", text: "I feel heavy, drained, or energetically contaminated after crowded places or being around negativity.", profiles: [["p7", 2]], modalities: ["Humkaara", "lama-fera-healing"] },
      { id: "C", text: "Unexplained psychic drain, heavy dreams, or external negative energies affecting my space.", profiles: [["p7", 2], ["p6", 1]], modalities: ["lama-fera-healing", "Humkaara"] },
      { id: "D", text: "Spiritually disconnected or dry, as though my prayers and meditations hit a glass ceiling.", profiles: [["p6", 2], ["p9", 1]], modalities: ["soul-contract-reading", "shamanic-healing"] },
      { id: "E", text: "Intense spiritual awakening symptoms, heightened intuition, or energetic shifts that feel overwhelming.", profiles: [["p9", 2], ["p7", 1]], modalities: ["Humkaara", "hleem"] }
    ]
  },
  {
    id: 25,
    dimension: "SOUL",
    prompt: "If you lead a business, team, or professional enterprise, which systemic challenge currently manifests?",
    options: [
      { id: "A", text: "Revenue or growth bottlenecks: strategy is solid, but revenue hits an invisible wall despite effort.", profiles: [["p8", 2]], modalities: ["business-constellation"] },
      { id: "B", text: "Leadership or partner friction: repeating conflicts with co-founders or team over authority and trust.", profiles: [["p8", 2], ["p4", 1]], modalities: ["business-constellation"] },
      { id: "C", text: "Founder exhaustion: carrying the entire operational and emotional weight of the business until burnout.", profiles: [["p8", 2], ["p1", 1]], modalities: ["business-constellation", "somatic-healing"] },
      { id: "D", text: "Visibility and brand blocks: hesitation to put my voice into the market, present, or claim authority.", profiles: [["p8", 2], ["p3", 1]], modalities: ["business-constellation", "nlp"] },
      { id: "E", text: "I do not run a business, but experience these same systemic blockages in my job progression.", profiles: [["p8", 2], ["p3", 1]], modalities: ["business-constellation", "quantum-belief-reprogramming"] }
    ]
  }
];

export const totalQuestions = questions.length;
