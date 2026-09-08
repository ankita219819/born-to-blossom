export type ServiceCategoryId = "energy" | "mind" | "ancestral" | "holistic";

export type ServiceCategory = {
  id: ServiceCategoryId;
  title: string;
  shortTitle: string;
  description: string;
  accent: string;
};

export type ServiceDetail = {
  slug: string;
  title: string;
  shortTitle: string;
  tagline: string;
  summary: string;
  categoryId: ServiceCategoryId;
  duration: string;
  format: string;
  featured?: boolean;
  image?: string;
  imageAlt?: string;
  whatIs: string[];
  whatHappens: string[];
  benefits: string[];
  whoFor: string;
  notes?: string;
};

export const serviceCategories: ServiceCategory[] = [
  {
    id: "energy",
    title: "Energy Healing",
    shortTitle: "Energy",
    description:
      "Modalities that work with life-force energy, sacred sound, and subtle-body intelligence to restore balance, clear blockages, and awaken vitality.",
    accent: "#C69C6D"
  },
  {
    id: "mind",
    title: "Mind & Belief Work",
    shortTitle: "Mind",
    description:
      "Practices that rewire limiting beliefs, calm the nervous system, and illuminate the subconscious contracts shaping your relationships, confidence, and success.",
    accent: "#7B6B8A"
  },
  {
    id: "ancestral",
    title: "Ancestral & Systemic Healing",
    shortTitle: "Ancestral",
    description:
      "Systemic and lineage-based work that frees inherited patterns, restores belonging, and heals what was carried silently across generations.",
    accent: "#B76E79"
  },
  {
    id: "holistic",
    title: "Holistic & Natural Therapies",
    shortTitle: "Holistic",
    description:
      "Body-centred, flower-essence, and multi-modality journeys — including flagship programmes and corporate offerings — for deep, lasting transformation.",
    accent: "#5B8A7A"
  }
];

export const allServices: ServiceDetail[] = [
  // ─── Energy Healing ───────────────────────────────────────────────────────
  {
    slug: "reiki-healing",
    title: "Reiki Healing",
    shortTitle: "Reiki",
    tagline: "Channel divine life-force energy for deep restoration.",
    summary:
      "Master-level Reiki that channels universal life-force energy to ease stress, pain, and grief while restoring chakra balance.",
    categoryId: "energy",
    duration: "60–90 mins",
    format: "In-Person / Online",
    featured: true,
    image: "/images/spiritual_healing.webp",
    imageAlt:
      "Silhouette meditating with glowing chakras overlooking a serene mountain sunrise",
    whatIs: [
      "Reiki is a gentle yet profound Japanese energy-healing practice that channels universal life-force energy through the practitioner’s hands to support the body’s natural capacity to restore balance. At Born to Blossom, sessions are offered at Reiki Master level — drawing on years of certified practice and teaching.",
      "Rather than diagnosing or treating disease, Reiki works with the energetic field that underlies physical, emotional, and mental wellbeing. Clients often describe a deep sense of warmth, stillness, and release as blocked or stagnant energy begins to move.",
      "Whether you are navigating chronic stress, unresolved grief, sleep disruption, or simply seeking deeper energetic alignment, Reiki offers a sacred, non-invasive container for restoration — available both in person in Gurgaon and online worldwide."
    ],
    whatHappens: [
      "You rest fully clothed while the practitioner places hands lightly on or above key energy centres. The session may include gentle chakra balancing, intention-setting, and a period of quiet integration.",
      "Online sessions use distant Reiki technique with the same care and presence as in-person work. Many clients report vivid sensations, emotional release, or a profound sense of peace during and after the session."
    ],
    benefits: [
      "Reduces stress and nervous-system overwhelm",
      "Eases physical tension and supports pain relief",
      "Improves sleep quality and deeper rest",
      "Balances and clears the chakras",
      "Supports healthy processing of grief and emotional residue",
      "Deepens overall energetic vitality and calm"
    ],
    whoFor:
      "Ideal for anyone seeking gentle, effective energy restoration — from first-time seekers to those already on a healing path. Especially supportive during periods of stress, transition, physical discomfort, or emotional heaviness.",
    notes:
      "A series of 3 or 6 sessions is recommended for deeper, cumulative shifts. Single sessions are welcome for maintenance or acute support."
  },
  {
    slug: "lama-fera-healing",
    title: "Lama Fera Healing",
    shortTitle: "Lama Fera",
    tagline: "Tibetan Buddhist energy work for clearing and protection.",
    summary:
      "Tibetan Buddhist energy healing that clears dense energetic imprints and restores luminous clarity to your field.",
    categoryId: "energy",
    duration: "60–90 mins",
    format: "In-Person / Online",
    whatIs: [
      "Lama Fera is a Tibetan Buddhist energy-healing modality that works with sacred symbols, mantras, and divine light to clear dense energetic imprints from the aura and subtle body. It is known for its precision in dissolving stuck energy, psychic residue, and protective armour that no longer serves.",
      "At Born to Blossom, Lama Fera is offered as a complementary energy practice within a multi-modality sanctuary — held with reverence for its Tibetan roots and adapted with the same professional, sacred container that defines all our work.",
      "Where Reiki softens and restores, Lama Fera often cuts through denser layers — making it particularly supportive when you feel energetically heavy, psychically overloaded, or in need of strong clearing and protection."
    ],
    whatHappens: [
      "After a brief intake, the practitioner works with Lama Fera symbols and light transmissions across your energy field. You may remain seated or lying down, fully clothed, in a quiet, consecrated space.",
      "Sessions can include personal aura clearing as well as guidance on maintaining energetic hygiene. Space clearing for homes or workplaces is available as a separate offering."
    ],
    benefits: [
      "Clears dense or stuck energetic imprints",
      "Strengthens the aura and energetic boundaries",
      "Supports psychic protection and clarity",
      "Releases heaviness after conflict, grief, or overload",
      "Complements other energy and ancestral modalities"
    ],
    whoFor:
      "Well suited for those who feel energetically depleted, psychically sensitive, or as if something “won’t shift” through talk alone. Also valuable after intense life events, travel, or prolonged caregiving.",
    notes:
      "Space clearing for homes, offices, or sacred spaces can be booked separately from personal healing sessions."
  },
  {
    slug: "sound-healing",
    title: "Sound Healing",
    shortTitle: "Sound Healing",
    tagline: "Vibrate yourself back into wholeness.",
    summary:
      "Immersive sound sessions with bowls and sacred mantras that recalibrate the nervous system and restore cellular harmony.",
    categoryId: "energy",
    duration: "60–75 mins",
    format: "In-Person preferred / Online available",
    featured: true,
    image: "/images/meditation.webp",
    imageAlt:
      "Woman meditating on a hilltop beneath cherry blossoms at sunrise",
    whatIs: [
      "Sound Healing uses vibrational instruments — singing bowls, mantras, and resonant tones — to invite the body and mind into coherent rhythm. Sound bypasses the analytical mind and speaks directly to the nervous system, the cells, and the subtle energy field.",
      "At Born to Blossom, sound sessions are held as sacred immersions rather than performances. The intention is not entertainment but recalibration: helping your system remember its natural frequency of ease, clarity, and wholeness.",
      "Whether in a private session or a group Sound Bath, the work draws on ancient vibrational wisdom held within a contemporary, professionally held container."
    ],
    whatHappens: [
      "You settle into a comfortable resting position while bowls, tones, and mantras wash through the space. There is nothing to “do” — only to receive.",
      "Private sessions may include guided intention-setting and gentle integration conversation afterward. Group Sound Baths create a shared field of resonance ideal for deep rest and collective release."
    ],
    benefits: [
      "Calms anxiety and overactive mind patterns",
      "Supports deep nervous-system rest and recovery",
      "Releases emotional and energetic tension held in the body",
      "Enhances meditation and meditative states",
      "Restores a felt sense of inner harmony and presence"
    ],
    whoFor:
      "Anyone seeking nervous-system restoration, creative reopening, or a non-verbal path into healing. Especially supportive for those who feel “stuck in the head” or exhausted by constant cognitive effort.",
    notes:
      "In-person sessions in Gurgaon are preferred for the full vibrational experience. Group Sound Baths are offered periodically — enquire when booking."
  },
  {
    slug: "Humkaara",
    title: "Humkaara",
    shortTitle: "Humkaara",
    tagline: "Sacred sound activation at the root of creation.",
    summary:
      "An original Born to Blossom modality using primordial sacred sound to unlock energetic blockages at their deepest root.",
    categoryId: "energy",
    duration: "60–90 mins",
    format: "In-Person / Online",
    featured: true,
    whatIs: [
      "Humkaara — meaning the primordial cosmic vibration, the sound at the root of creation — is an original healing modality developed by Sonia Verma Bhattacharyya. It emerged from deep meditation practice as a transmission moving through sound, breath, and sacred intent.",
      "Unlike inherited traditions alone, Humkaara was refined over years of client work into a full, replicable modality: one that uses sacred sound activation to unlock energetic blockages at their deepest root. Clients have described the effect as “like being rewired at the source code.”",
      "Humkaara sits at the heart of Born to Blossom’s contribution to the healing field — offered both as a personal healing session and as practitioner training for those called to carry this work forward."
    ],
    whatHappens: [
      "The session opens with grounding and intention. Through sacred sound activation, breath, and focused transmission, the practitioner works with the vibrational field to dissolve root-level blockages.",
      "You may experience shifts in sensation, emotion, or awareness during the session. Integration time is held so the work can settle into the body and daily life."
    ],
    benefits: [
      "Unlocks deep energetic blockages at the root",
      "Rewires patterns that talk therapy alone cannot reach",
      "Activates vital life-force through sacred sound",
      "Supports profound clarity and inner reorganisation",
      "Complements ancestral, belief, and somatic work"
    ],
    whoFor:
      "Seekers ready for deep energetic rewiring — especially those who sense that something foundational needs to shift. Also suited for practitioners exploring certification in this original modality.",
    notes:
      "Humkaara practitioner training and certification are available. Ask when booking if you feel called to learn and transmit this work."
  },
  {
    slug: "hleem",
    title: "Hleem",
    shortTitle: "Hleem",
    tagline: "Feminine attunement for power, creativity, and divinity.",
    summary:
      "An original feminine attunement modality working with the bija of the sacred feminine to reclaim power, creativity, and womb wisdom.",
    categoryId: "energy",
    duration: "75–90 mins",
    format: "In-Person preferred / Online available",
    featured: true,
    whatIs: [
      "Hleem — the bija (seed) mantra of the sacred feminine — is the second original modality of Born to Blossom. Born from Sonia’s journey of feminine healing and devotion to the Mahavidyas and Shakta Tantric tradition, Hleem is designed for the reclamation of feminine power, creativity, and divinity.",
      "This work engages the energetic body’s feminine circuits: the womb space, the creative centre, and the relationship one holds with the divine feminine within. It is neither clinical nor performative — it is sacred attunement offered with precision and care.",
      "Hleem is offered as both a healing session and a practitioner certification, extending the transmission to those who wish to hold this work for others."
    ],
    whatHappens: [
      "Sessions are held in a consecrated space with prayer, intention, and feminine energetic attunement. Through mantra, presence, and subtle-body work, the practitioner supports reconnection to feminine circuits and creative life-force.",
      "You remain fully clothed. The pace is unhurried, allowing the nervous system and energetic body to receive without force. Integration guidance is offered before you leave."
    ],
    benefits: [
      "Reclaims feminine power, creativity, and vitality",
      "Supports womb-space and creative-centre healing",
      "Deepens relationship with the divine feminine within",
      "Softens shame, disconnection, or inherited feminine wounding",
      "Restores intuitive knowing and embodied sovereignty"
    ],
    whoFor:
      "Women and feminine-identified seekers ready to reconnect with creative power, womb wisdom, and sacred femininity. Also open to practitioners seeking Hleem certification.",
    notes:
      "In-person sessions in Gurgaon are preferred. Practitioner certification in Hleem is available — enquire for upcoming training dates."
  },

  // ─── Mind & Belief Work ───────────────────────────────────────────────────
  {
    slug: "quantum-belief-reprogramming",
    title: "Quantum Belief Reprogramming",
    shortTitle: "QBR",
    tagline: "Rewrite the subconscious beliefs running your life.",
    summary:
      "Theta-level belief work that dissolves money blocks, relationship patterns, and unworthiness at the subconscious root.",
    categoryId: "mind",
    duration: "75–90 mins",
    format: "In-Person / Online",
    featured: true,
    whatIs: [
      "Quantum Belief Reprogramming (QBR) works at theta-level awareness to identify and transform the subconscious beliefs that silently script your relationships, finances, self-worth, and life trajectory. When the belief landscape shifts, outer circumstances often follow with surprising speed.",
      "At Born to Blossom, QBR is held as precise, compassionate belief surgery — not positive thinking, but deep subconscious rewiring. Clients frequently arrive with money blocks, patterns of unworthiness, or relationship loops that no amount of willpower has been able to change.",
      "This work pairs powerfully with NLP, Somatic Healing, and ancestral modalities when beliefs are entangled with body memory or lineage patterns."
    ],
    whatHappens: [
      "Through guided dialogue and theta-level access, limiting beliefs are brought into awareness, examined, and replaced with aligned truths that your system can actually hold.",
      "Sessions are focused and transformative. You leave with clarity on what shifted and how to support the new belief architecture in daily life."
    ],
    benefits: [
      "Dissolves money blocks and scarcity programming",
      "Transforms relationship and attachment patterns",
      "Releases deep unworthiness and self-sabotage",
      "Rewires subconscious scripts at the root",
      "Creates lasting change beyond surface affirmations"
    ],
    whoFor:
      "Anyone stuck in repeating patterns around money, love, success, or self-worth — especially when they “know better” intellectually but cannot shift behaviourally. Ideal for entrepreneurs, professionals, and seekers ready for root-level change.",
    notes:
      "A series of 4–6 sessions is recommended for durable belief transformation. Often combined with NLP or Somatic Healing for multi-layered results."
  },
  {
    slug: "nlp",
    title: "NLP",
    shortTitle: "NLP",
    tagline: "Rewire the language that shapes your inner world.",
    summary:
      "Neuro-Linguistic Programming to build confidence, release phobias, and transform the internal dialogue that limits your life.",
    categoryId: "mind",
    duration: "60–90 mins",
    format: "In-Person / Online",
    whatIs: [
      "Neuro-Linguistic Programming (NLP) explores how language, perception, and behavioural patterns interact to create your lived reality. The stories you tell yourself — and the way you encode experience — can be both prison and key.",
      "At Born to Blossom, NLP is practiced as a precise tool for confidence, phobia release, communication mastery, and reframing limiting internal dialogue. It is never cold technique; it is held within the same sacred, professional container as all our modalities.",
      "NLP often combines beautifully with Quantum Belief Reprogramming and Somatic Healing when mental patterns are fused with body-held emotion or deep subconscious belief."
    ],
    whatHappens: [
      "Through structured dialogue, anchoring, and reframing techniques, you work with the practitioner to interrupt unhelpful patterns and install more resourceful ways of thinking, feeling, and responding.",
      "Sessions are interactive and practical. You leave with tools you can use between appointments, not only insights that fade by Monday."
    ],
    benefits: [
      "Builds authentic confidence and self-leadership",
      "Releases phobias and conditioned fear responses",
      "Improves communication and relational clarity",
      "Transforms limiting internal dialogue",
      "Creates practical tools for everyday emotional mastery"
    ],
    whoFor:
      "Professionals, leaders, and seekers who want concrete change in how they think, speak, and respond — especially around confidence, fear, or communication under pressure.",
    notes:
      "Frequently combined with Quantum Belief Reprogramming and/or Somatic Healing for deeper, multi-layered transformation."
  },
  {
    slug: "access-bars",
    title: "Access Bars",
    shortTitle: "Access Bars",
    tagline: "Clear the mental static stored in 32 points on the head.",
    summary:
      "A gentle hands-on session working 32 points on the head to release limiting thoughts, emotions, and energetic charge — ages 5 to 95.",
    categoryId: "mind",
    duration: "60–90 mins",
    format: "In-Person only",
    whatIs: [
      "Access Bars is a gentle, hands-on modality that works with 32 points on the head — each corresponding to different areas and aspects of life. Light touch on these points facilitates the release of the electromagnetic charge of thoughts, feelings, emotions, and limiting beliefs stored in the brain and energetic field.",
      "Clients often describe Access Bars as profoundly quieting: mental chatter softens, the body drops into deep rest, and a spacious clarity becomes available. It is suitable across a wide age range — from children to elders — and requires no belief system to receive.",
      "At Born to Blossom, Access Bars is offered exclusively in person, ensuring the full subtlety of touch, presence, and energetic holding that this work deserves."
    ],
    whatHappens: [
      "You lie fully clothed while the practitioner gently touches the 32 Bars points. Most people drift into a deeply relaxed or meditative state. There is nothing you need to analyse or “figure out.”",
      "The session closes with quiet integration time. Many leave feeling lighter, clearer, and as if mental fog has lifted."
    ],
    benefits: [
      "Quiets mental chatter and overthinking",
      "Releases stored emotional and energetic charge",
      "Supports deep rest and nervous-system reset",
      "Increases mental clarity and ease",
      "Gentle enough for children, adults, and elders (ages 5–95)"
    ],
    whoFor:
      "Anyone carrying mental overwhelm, racing thoughts, or energetic density in the head — including sensitive children, stressed professionals, and elders seeking gentle restoration. Ideal when you want change without intensive talk processing.",
    notes:
      "In-Person only in Gurgaon. Suitable for ages 5–95. A series can deepen cumulative clearing for chronic mental or emotional load."
  },
  {
    slug: "eft",
    title: "EFT Tapping",
    shortTitle: "EFT",
    tagline: "Tap through emotional charge with precision and care.",
    summary:
      "Emotional Freedom Technique that combines acupoint tapping with focused awareness to release stress, anxiety, and stuck emotion — excellent remotely.",
    categoryId: "mind",
    duration: "60 mins",
    format: "In-Person / Online (excellent remote)",
    whatIs: [
      "Emotional Freedom Technique (EFT), or tapping, combines gentle stimulation of meridian acupoints with focused verbal and emotional awareness. By tapping while attending to a charged issue, the nervous system often releases the intensity that keeps patterns locked in place.",
      "At Born to Blossom, EFT is practiced with clinical clarity and sacred presence — never as a quick fix slogan, but as a precise tool for dissolving emotional charge around anxiety, trauma residue, cravings, performance fear, and relational triggers.",
      "EFT is one of our most effective remote modalities: the technique travels beautifully through online sessions, making it ideal for clients across India and the global diaspora."
    ],
    whatHappens: [
      "Together you identify the issue and its emotional charge. You then tap through a sequence of points while staying present with the feeling or belief, allowing intensity to decrease round by round.",
      "Sessions are collaborative and grounding. You leave with a tapping sequence you can use independently when triggers arise between appointments."
    ],
    benefits: [
      "Reduces anxiety and acute emotional intensity",
      "Releases stuck trauma residue and stress charge",
      "Supports phobia and performance-fear work",
      "Highly effective in online / remote sessions",
      "Gives you a self-help tool for daily regulation"
    ],
    whoFor:
      "Anyone seeking a practical, body-inclusive way to work with anxiety, emotional triggers, or stress — especially those who prefer structured technique with clear, felt results. Excellent for remote clients.",
    notes:
      "Sixty-minute sessions work well as standalone support or as a complement to QBR, Somatic, and ancestral work."
  },
  {
    slug: "soul-contract-reading",
    title: "Soul Contract Reading",
    shortTitle: "Soul Contract",
    tagline: "Illuminate pre-birth agreements, lessons, and soul gifts.",
    summary:
      "A sacred reading of pre-birth soul agreements that clarifies life lessons, relationships, and the gifts you came here to embody.",
    categoryId: "mind",
    duration: "75–90 mins",
    format: "In-Person / Online",
    featured: true,
    image: "/images/tarot-reading.webp",
    imageAlt: "Hands holding sacred cards beside a lit candle at golden hour",
    whatIs: [
      "A Soul Contract Reading illuminates the pre-birth agreements, lessons, and soul gifts shaping your current incarnation. It is not fortune-telling — it is a map of meaning: why certain relationships repeat, what themes your soul chose to master, and where your unique gifts are asking to be lived.",
      "At Born to Blossom, these readings are held as sacred dialogue between your higher intelligence and a practitioner trained to listen with precision, compassion, and spiritual maturity. Clarity often brings profound relief — and the courage to stop fighting your path.",
      "You receive not only spoken insight but a written summary, so the guidance can continue to inform your choices long after the session ends."
    ],
    whatHappens: [
      "The session opens with grounding and intention. Through intuitive and energetic reading of your soul contract themes, key agreements, lessons, and gifts are brought into language you can understand and use.",
      "Space is held for questions and integration. A written summary follows so you can revisit the insights as your journey unfolds."
    ],
    benefits: [
      "Clarifies pre-birth soul agreements and life lessons",
      "Illuminates repeating relationship and destiny themes",
      "Reveals soul gifts waiting to be embodied",
      "Reduces confusion and self-blame around life challenges",
      "Provides a written summary for ongoing reflection"
    ],
    whoFor:
      "Seekers at crossroads, those confused by repeating life patterns, and anyone longing to understand the deeper “why” behind their journey — without fatalism, and with empowerment.",
    notes:
      "Includes a written summary after the session. Beautiful as a standalone reading or as orientation before deeper healing work such as RESTORE or Family Constellation."
  },

  // ─── Ancestral & Systemic Healing ─────────────────────────────────────────
  {
    slug: "family-constellation-therapy",
    title: "Family Constellation Therapy",
    shortTitle: "Family Constellation",
    tagline: "Heal your lineage, free your future.",
    summary:
      "Hellinger-based systemic work that reveals hidden family dynamics, heals ancestral wounds, and restores love and belonging.",
    categoryId: "ancestral",
    duration: "90–120 mins (individual) · Group ~4 hrs",
    format: "In-Person preferred / Online available",
    featured: true,
    image: "/images/family-constellation.webp",
    imageAlt:
      "Family standing together on a hilltop connected by golden light at sunrise",
    whatIs: [
      "Family Constellation Therapy, rooted in Bert Hellinger’s systemic approach, reveals the hidden dynamics running through your family system — loyalties, exclusions, unfinished grief, and patterns that quietly shape your relationships, health, and destiny.",
      "At Born to Blossom, constellation work is held as sacred systemic seeing: you are not asked to blame your lineage, but to look with love at what has been carried, excluded, or unfinished — so that belonging and order can be restored.",
      "Many clients discover that symptoms they thought were “personal failings” are actually systemic — and that when the system is honoured and reordered, something shifts permanently in the field of their life."
    ],
    whatHappens: [
      "In individual sessions (90–120 minutes), representatives or floor markers may be used to map the family system, allowing unseen dynamics to become visible and movable. The facilitator guides movements, sentences, and acknowledgements that restore systemic balance.",
      "Group constellations (approximately 4 hours) offer a powerful shared field where participants both work their own issues and serve as representatives for others. In-person work in Gurgaon is preferred for the full embodied experience."
    ],
    benefits: [
      "Uncovers hidden multi-generational family dynamics",
      "Heals ancestral wounds and interrupted belonging",
      "Releases loyalties that keep you stuck in old pain",
      "Restores love, order, and harmony in the family system",
      "Often creates permanent shifts where talk therapy plateaued"
    ],
    whoFor:
      "Anyone sensing that family history is still running their life — mother or father wounds, repeating relationship patterns, unexplained guilt, or the feeling of carrying something that was never theirs. Also powerful for those who have done years of conventional therapy and sense something systemic remains unfinished.",
    notes:
      "Individual sessions: 90–120 minutes. Group workshops: approximately 4 hours. In-person preferred; online available when needed."
  },
  {
    slug: "business-constellation",
    title: "Business Constellation",
    shortTitle: "Business Constellation",
    tagline: "See the hidden dynamics shaping your enterprise or team.",
    summary:
      "Systemic constellation work for businesses, founders, and teams — revealing organisational blind spots and restoring healthy order.",
    categoryId: "ancestral",
    duration: "90–120 mins",
    format: "In-Person preferred / Online available",
    whatIs: [
      "Business Constellation applies systemic constellation principles to enterprises, partnerships, and teams. Organisations, like families, carry invisible loyalties, exclusions, and imbalances — between founders, roles, profits, purpose, and the people who built the field.",
      "At Born to Blossom, business constellation work helps leaders see what talk and strategy alone cannot: the systemic dynamics blocking growth, trust, succession, or creative flow. Clarity at this level often unlocks decisions that have been stalled for months or years.",
      "This is not corporate theatre. It is precise systemic seeing held with confidentiality, professionalism, and respect for the living organism of your business."
    ],
    whatHappens: [
      "Through constellation mapping of roles, stakeholders, and organisational elements, hidden dynamics become visible. The facilitator guides acknowledgements and movements that restore healthier systemic order.",
      "Sessions may focus on leadership dilemmas, partnership tension, team culture, succession, or the relationship between profit and purpose. Insights are translated into practical next steps."
    ],
    benefits: [
      "Reveals organisational blind spots and systemic blocks",
      "Clarifies founder, partner, and team dynamics",
      "Supports healthier succession and role clarity",
      "Restores alignment between purpose, profit, and people",
      "Informs high-stakes decisions with systemic intelligence"
    ],
    whoFor:
      "Founders, business owners, partners, and leadership teams sensing that something invisible is blocking growth, cohesion, or succession — especially when strategy alone has not resolved the issue.",
    notes:
      "Confidential sessions for enterprises and teams. Can be paired with Corporate Wellness or Retreat Design for fuller organisational transformation."
  },
  {
    slug: "generational-ancestral-trauma-healing",
    title: "Generational & Ancestral Trauma Healing",
    shortTitle: "Ancestral Trauma",
    tagline: "Release what your lineage could not complete.",
    summary:
      "Deep ancestral trauma work that clears inherited emotional and energetic imprints carried across generations — typically in a 4–6 session series.",
    categoryId: "ancestral",
    duration: "90–120 mins",
    format: "In-Person / Online",
    whatIs: [
      "Generational and ancestral trauma healing addresses the unresolved pain, fear, and unfinished stories that travel through bloodlines — often showing up as anxiety that has no biography, grief that is older than your life, or patterns that defy personal logic.",
      "At Born to Blossom, this work weaves systemic awareness with energetic and somatic sensitivity. You are not asked to dwell endlessly in the past; you are invited to complete what was interrupted so that love and life-force can flow forward again.",
      "This modality honours both the science of inherited stress patterns and the sacred intelligence of lineage — held within a professional, multi-modality practice."
    ],
    whatHappens: [
      "Sessions explore ancestral themes through dialogue, energetic clearing, and systemic or somatic techniques as appropriate. The pace respects your nervous system’s capacity.",
      "Over a series, layers of inherited charge are identified, witnessed, and released — with integration practices to help the new freedom settle into daily life."
    ],
    benefits: [
      "Clears inherited emotional and energetic imprints",
      "Releases anxiety, guilt, or grief that feels “older than you”",
      "Interrupts repeating generational patterns",
      "Restores flow between past, present, and future",
      "Creates freedom for the generations that follow you"
    ],
    whoFor:
      "Those who sense they are carrying family trauma, cultural wounding, or patterns that began before their birth. Especially supportive after Family Constellation when deeper personal clearing of ancestral charge is needed.",
    notes:
      "A series of 4–6 sessions is recommended for meaningful ancestral clearing. Often paired with Family Constellation, Somatic Healing, or Womb Healing."
  },
  {
    slug: "shamanic-healing",
    title: "Shamanic Healing",
    shortTitle: "Shamanic Healing",
    tagline: "Soul retrieval and ceremony for what was lost along the way.",
    summary:
      "Ceremonial shamanic work including soul retrieval — reclaiming fragmented essence and restoring wholeness after trauma or loss.",
    categoryId: "ancestral",
    duration: "90 mins",
    format: "In-Person preferred",
    whatIs: [
      "Shamanic Healing works with the understanding that parts of the soul or vital essence can fragment under trauma, shock, or prolonged overwhelm — leaving a person alive but not fully here. Soul retrieval and related ceremonial practices support the return of that essence.",
      "At Born to Blossom, shamanic work is held with deep respect for indigenous wisdom traditions and adapted within a contemporary, ethically grounded container. Ceremony is not performance; it is precise spiritual technology offered with humility and care.",
      "This modality is especially powerful when cognitive approaches have reached their limit and the longing is for something older, deeper, and more elemental to come home."
    ],
    whatHappens: [
      "The session is held as ceremony: grounding, invocation, and shamanic journeying or retrieval work guided by the practitioner. You remain safe, held, and fully respected throughout.",
      "Integration is essential. Time is given afterward to ground the returned essence into the body and name practical support for the days that follow."
    ],
    benefits: [
      "Supports soul retrieval after trauma or loss",
      "Restores vital essence and a felt sense of wholeness",
      "Clears spiritual and energetic debris",
      "Deepens connection to inner guidance and life-force",
      "Offers ceremonial closure where ordinary process cannot"
    ],
    whoFor:
      "Those who feel fragmented after trauma, loss, or profound life rupture — or who sense that a vital part of themselves went missing and has not fully returned. Best for clients ready for ceremonial depth.",
    notes:
      "In-person preferred in Gurgaon. Held as sacred ceremony — arrive with openness and allow integration time afterward."
  },
  {
    slug: "womb-healing",
    title: "Womb Healing",
    shortTitle: "Womb Healing",
    tagline: "Restore the sacred centre of creativity and feminine life-force.",
    summary:
      "Energetic and emotional womb healing for creativity, feminine vitality, and release of stored grief, shame, or ancestral imprint — series of 3 or 6 recommended.",
    categoryId: "ancestral",
    duration: "75–90 mins",
    format: "In-Person preferred / Online available",
    whatIs: [
      "Womb Healing addresses the energetic, emotional, and ancestral imprints held in the womb space — the sacred centre of creativity, intuition, and feminine life-force. This work is not medical treatment; it is sacred restoration of a centre that often carries silence, shame, grief, or inherited wounding.",
      "At Born to Blossom, womb healing is offered with reverence and professionalism — honouring both the physical body and the subtle feminine circuits connected to lineage, creativity, and sovereignty. It pairs naturally with Hleem and ancestral trauma work.",
      "Many women arrive having never been invited to relate to their womb as wise rather than problematic. This session opens that relationship with care."
    ],
    whatHappens: [
      "Through energetic healing, breath, intention, and guided awareness, the womb space is approached as a living field. Stored emotion and ancestral charge may surface and release in a held, paced way.",
      "You remain fully clothed. Sessions honour consent, privacy, and the nervous system’s readiness. Integration guidance supports continued connection between appointments."
    ],
    benefits: [
      "Restores connection to womb wisdom and creativity",
      "Releases stored grief, shame, or emotional imprint",
      "Supports feminine vitality and energetic sovereignty",
      "Addresses ancestral feminine wounding held in the body",
      "Deepens embodied intuition and creative flow"
    ],
    whoFor:
      "Women and feminine-identified seekers navigating creative blocks, womb-related emotional history, fertility grief, mother-line wounding, or a longing to reclaim feminine centre. Also supportive after loss or major life transitions.",
    notes:
      "In-person preferred. A series of 3 or 6 sessions is recommended. Often combined with Hleem and Generational Ancestral Trauma Healing."
  },

  // ─── Holistic & Natural Therapies ─────────────────────────────────────────
  {
    slug: "somatic-healing",
    title: "Somatic Healing",
    shortTitle: "Somatic Healing",
    tagline: "Let the body release what the mind alone cannot.",
    summary:
      "Body-centred trauma and stress release that helps the nervous system complete what was frozen — for trauma, chronic stress, and anxiety.",
    categoryId: "holistic",
    duration: "60–90 mins",
    format: "In-Person / Online",
    whatIs: [
      "Somatic Healing works with the body’s innate intelligence to release trauma, chronic stress, and anxiety held in the nervous system and tissues. Where talk stays in the story, somatic work listens to sensation, impulse, and completion — allowing what was frozen to finally move through.",
      "At Born to Blossom, somatic practice is tender, paced, and never forced. You are guided to befriend your body after years of disconnection, hypervigilance, or shutdown — reclaiming safety from the inside out.",
      "This modality is a cornerstone for clients whose healing has plateaued at the cognitive level, and it integrates powerfully with QBR, NLP, EFT, and ancestral work."
    ],
    whatHappens: [
      "Sessions invite mindful attention to bodily sensation, breath, and subtle impulse. Through guided tracking and discharge, the nervous system is supported to complete incomplete stress responses.",
      "You remain in choice at every step. Online somatic sessions are highly effective when presence and pacing are held with skill — as they are here."
    ],
    benefits: [
      "Releases body-held trauma and chronic tension",
      "Regulates anxiety and nervous-system hyperarousal",
      "Restores felt safety and embodiment",
      "Completes stress responses stuck in freeze or fight",
      "Builds lasting capacity for presence and resilience"
    ],
    whoFor:
      "Anyone living with trauma residue, chronic stress, anxiety, or a sense of being disconnected from their body. Especially valuable when insight is clear but the body still does not feel safe.",
    notes:
      "Often combined with Quantum Belief Reprogramming and NLP for mind-and-body coherence. Suitable in person or online."
  },
  {
    slug: "bach-flower-therapy",
    title: "Bach Flower Therapy",
    shortTitle: "Bach Flowers",
    tagline: "Gentle plant wisdom for the emotional landscape.",
    summary:
      "Personalised blends from Dr Bach’s 38 flower remedies to support emotional balance — initial 75 mins, follow-ups 45; available online globally.",
    categoryId: "holistic",
    duration: "Initial 75 mins · Follow-up 45 mins",
    format: "In-Person / Online (global)",
    whatIs: [
      "Bach Flower Therapy works with 38 flower essences developed by Dr Edward Bach to gently restore emotional balance. Each remedy corresponds to a specific emotional state — fear, uncertainty, loneliness, over-care, despondency, and more — treating the person, not the disease.",
      "At Born to Blossom, Bach Flowers are selected with precision after careful listening. Emotions are treated as messengers, not enemies — and the right blend supports the system to find its own equilibrium without force or side effects.",
      "Because essences work energetically and emotionally, this modality travels beautifully across distance — making it ideal for clients anywhere in the world."
    ],
    whatHappens: [
      "The initial consultation explores your emotional landscape in depth. A personalised blend is selected from the 38 remedies and prepared for you to take daily.",
      "Follow-up sessions (45 minutes) refine the formula as your state shifts. Online consultations serve clients across India and internationally with the same care as in-person work."
    ],
    benefits: [
      "Gently balances fear, worry, and emotional overwhelm",
      "Supports transitions, grief, and uncertainty",
      "Safe, non-habit-forming, and suitable alongside other care",
      "Personalised formulas that evolve with you",
      "Fully effective via online consultations worldwide"
    ],
    whoFor:
      "Anyone seeking gentle, plant-based emotional support — including sensitive souls, those in transition, parents supporting children, and clients who prefer a non-invasive complementary therapy. Excellent for global diaspora clients.",
    notes:
      "Initial consultation: 75 minutes. Follow-ups: 45 minutes. Remedies can be prepared and guidance delivered online for clients worldwide."
  },
  {
    slug: "restore",
    title: "RESTORE",
    shortTitle: "RESTORE",
    tagline: "An eight-session multi-modality journey to the root.",
    summary:
      "Born to Blossom’s flagship eight-session journey weaving multiple modalities for people ready for deep, lasting root work.",
    categoryId: "holistic",
    duration: "8-session journey",
    format: "In-Person / Online (blended as needed)",
    featured: true,
    whatIs: [
      "RESTORE is Born to Blossom’s flagship healing journey: an eight-session, multi-modality container designed for people ready to go to the root — not to dabble, but to transform. It weaves the modalities your system most needs across body, mind, energy, ancestry, and soul.",
      "Rather than a single technique repeated eight times, RESTORE is a curated arc. Sessions may draw on Family Constellation, Quantum Belief Reprogramming, Somatic Healing, Reiki, Humkaara, Hleem, and other offerings — sequenced with clinical clarity and sacred intelligence.",
      "This is the path for those who have tried fragments of healing and are ready for a coherent, held journey that honours the whole human being."
    ],
    whatHappens: [
      "An opening assessment maps your history, goals, and systemic landscape. Together, an eight-session arc is designed — with clear milestones and space for what emerges.",
      "Each session builds on the last. Integration practices between appointments help the work root into relationships, work, body, and daily life. The journey closes with consolidation and forward guidance."
    ],
    benefits: [
      "Deep root-level transformation across multiple layers",
      "Coherent multi-modality sequencing instead of scattered sessions",
      "Addresses body, mind, energy, ancestry, and soul together",
      "Held container with continuity and accountability",
      "Designed for lasting change, not temporary relief"
    ],
    whoFor:
      "People ready for deep root work — those who sense that piecemeal sessions are no longer enough, and who are willing to commit to an eight-session sacred arc of transformation.",
    notes:
      "Flagship offering. Eight sessions customised to your needs. Enquire to discuss readiness, pacing, and whether RESTORE is the right container for this season of your life."
  },
  {
    slug: "corporate-wellness",
    title: "Corporate Wellness",
    shortTitle: "Corporate Wellness",
    tagline: "Custom organisational programmes that actually land.",
    summary:
      "Bespoke wellness and mindfulness programmes for organisations — grounded, professional, and designed to transform team culture.",
    categoryId: "holistic",
    duration: "Custom programmes",
    format: "On-site / Hybrid / Online",
    whatIs: [
      "Corporate Wellness at Born to Blossom brings sacred, evidence-informed healing intelligence into organisational life — without fluff, jargon, or performative wellness theatre. Programmes are custom-designed for the culture, pressures, and aspirations of each enterprise.",
      "Drawing on mindfulness, nervous-system education, energetic awareness, and facilitated group process, these offerings help teams move from burnout and scepticism toward genuine regulation, presence, and connection.",
      "With hundreds of corporate participants already served, the work is known for warmth, grounded expertise, and the capacity to turn sceptics into believers — not through hype, but through felt experience."
    ],
    whatHappens: [
      "A discovery conversation clarifies organisational needs, audience, and constraints. A custom programme is then designed — from single workshops to multi-week series.",
      "Delivery may include experiential sessions, leadership circles, and practical tools employees can use immediately. Measurement and feedback loops ensure the work serves both people and performance."
    ],
    benefits: [
      "Reduces burnout and improves team nervous-system health",
      "Builds authentic mindfulness and emotional literacy at work",
      "Strengthens culture, trust, and psychological safety",
      "Custom-fit to your organisation — not a generic package",
      "Facilitated with professional warmth that transforms rooms"
    ],
    whoFor:
      "HR leaders, founders, and directors seeking wellness programmes that are substantive rather than superficial — for teams in tech, professional services, and mission-driven organisations across India and beyond.",
    notes:
      "Fully customisable. Can integrate elements of sound, mindfulness, constellation awareness, and leadership presence. Enquire for proposals and scheduling."
  },
  {
    slug: "corporate-retreat-design",
    title: "Corporate Retreat Design",
    shortTitle: "Corporate Retreats",
    tagline: "One-to-three-day immersions for leadership and teams.",
    summary:
      "Bespoke 1–3 day leadership and team immersions that weave healing intelligence, strategy, and sacred space into organisational transformation.",
    categoryId: "holistic",
    duration: "1–3 day immersions",
    format: "On-site / Retreat venue",
    whatIs: [
      "Corporate Retreat Design crafts immersive 1–3 day experiences for leadership teams and organisations ready to go deeper than a lunchtime workshop. These retreats weave facilitation, nervous-system and relational intelligence, and — where appropriate — systemic or contemplative practices into a coherent arc.",
      "At Born to Blossom, retreats are designed as living containers: not spa packages with a slide deck, but carefully held journeys that allow teams to tell the truth, regulate together, and return with clarity and commitment.",
      "Every retreat is custom — shaped by your industry, stage, and the real human questions your leadership is carrying."
    ],
    whatHappens: [
      "Design begins with deep listening to leadership goals and team dynamics. An immersion arc is crafted — sessions, silence, dialogue, and experiential modules sequenced for maximum integration.",
      "On retreat, facilitation holds both structure and emergence. Closing rituals and post-retreat guidance help insights survive the return to ordinary work life."
    ],
    benefits: [
      "Creates breakthrough clarity for leadership and teams",
      "Builds trust, cohesion, and shared nervous-system safety",
      "Integrates wellness with strategy and culture work",
      "Custom 1–3 day design for your organisational moment",
      "Leaves lasting practices — not just a peak experience"
    ],
    whoFor:
      "Leadership teams, founding circles, and organisations ready to invest in immersive transformation — especially during transitions, rapid growth, cultural repair, or vision renewal.",
    notes:
      "1–3 day immersions at your venue or a partner retreat location. Can complement ongoing Corporate Wellness retainers and Business Constellation work."
  }
];

export function getServiceBySlug(slug: string): ServiceDetail | undefined {
  return allServices.find((service) => service.slug === slug);
}

export function getServicesByCategory(
  id: ServiceCategoryId
): ServiceDetail[] {
  return allServices.filter((service) => service.categoryId === id);
}

export function getFeaturedServices(): ServiceDetail[] {
  return allServices.filter((service) => service.featured);
}

export function getAllServiceSlugs(): string[] {
  return allServices.map((service) => service.slug);
}
