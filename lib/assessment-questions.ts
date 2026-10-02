/**
 * Lasoma Soul Family Assessment — question bank (37 questions).
 *
 * Source of truth: "Born-to-Blossom Lasoma Assessment" front-end + back-end docs.
 * Q1–Q2 are unscored (awareness style + self-guess), Q3–Q30 score the seven
 * life-area domains (0–4 points each, 4 questions per domain), Q31–Q37 score the
 * seven chakras (0–4 points each). Pure data — no logic, no React.
 */

export type OptionId = "A" | "B" | "C" | "D" | "E";

export type DomainId =
  | "mind"
  | "body"
  | "money"
  | "relationships"
  | "ancestral"
  | "career"
  | "spirit";

export type ChakraId =
  | "root"
  | "sacral"
  | "solar"
  | "heart"
  | "throat"
  | "thirdeye"
  | "crown";

/** Soft screening flags — never shown to the visitor as anything clinical. */
export type FlagId =
  | "somatic-history"
  | "underearning"
  | "controlling-relationship"
  | "workplace-mistreatment";

export type AwarenessStyle = "body" | "mind" | "doing" | "grounded" | "variable";
export type FocusGuess = DomainId | "ancestral-spirit";

export type AssessmentOption = {
  id: OptionId;
  text: string;
  /** 0 (pattern absent) – 4 (pattern strongly present). Unscored questions use 0. */
  points: number;
  flag?: FlagId;
  /** Q1 only. */
  style?: AwarenessStyle;
  /** Q2 only. */
  focus?: "mind" | "body" | "money-career" | "relationships" | "ancestral-spirit";
};

export type AssessmentQuestion = {
  /** 1-based display number, Q1…Q37. */
  id: number;
  kind: "style" | "focus" | "domain" | "chakra";
  domain?: DomainId;
  chakra?: ChakraId;
  prompt: string;
  options: AssessmentOption[];
};

export const questions: AssessmentQuestion[] = [
  {
    id: 1,
    kind: "style",
    prompt: "When life feels heavy, where do you usually notice it first?",
    options: [
      { id: "A", text: "In my body — a tight chest, a knotted stomach, a headache.", points: 0, style: "body" },
      { id: "B", text: "In my thoughts — my mind starts racing or replaying things.", points: 0, style: "mind" },
      { id: "C", text: "In my behaviour — I get busy, distracted, or a little numb.", points: 0, style: "doing" },
      { id: "D", text: "I generally stay fairly calm and grounded.", points: 0, style: "grounded" },
      { id: "E", text: "It's different every time — I don't have one fixed pattern.", points: 0, style: "variable" }
    ]
  },
  {
    id: 2,
    kind: "focus",
    prompt: "If you had to guess right now, which one area of your life quietly needs the most attention?",
    options: [
      { id: "A", text: "My mind and emotions", points: 0, focus: "mind" },
      { id: "B", text: "My body and energy", points: 0, focus: "body" },
      { id: "C", text: "Money and career", points: 0, focus: "money-career" },
      { id: "D", text: "My relationships", points: 0, focus: "relationships" },
      { id: "E", text: "Something deeper — family patterns or my spiritual life", points: 0, focus: "ancestral-spirit" }
    ]
  },
  {
    id: 3,
    kind: "domain",
    domain: "mind",
    prompt: "How often does your mind replay the same worry or conversation, over and over?",
    options: [
      { id: "A", text: "Almost every day — it's hard to switch off.", points: 4 },
      { id: "B", text: "A few times a week, especially when I'm stressed.", points: 3 },
      { id: "C", text: "Only occasionally, and I can usually let it go.", points: 1 },
      { id: "D", text: "Rarely — my mind feels quiet most of the time.", points: 0 },
      { id: "E", text: "It's not overthinking exactly, but I do get \"stuck\" in other ways.", points: 2 }
    ]
  },
  {
    id: 4,
    kind: "domain",
    domain: "mind",
    prompt: "When you feel a strong emotion — anger, sadness, fear — what do you usually do with it?",
    options: [
      { id: "A", text: "I push it down and carry on as if nothing happened.", points: 4 },
      { id: "B", text: "I feel it, but I mostly keep it to myself.", points: 3 },
      { id: "C", text: "I let myself feel it and talk it through with someone I trust.", points: 1 },
      { id: "D", text: "I express it openly, right when it happens.", points: 0 },
      { id: "E", text: "It changes — sometimes I hold it in, sometimes it all comes out at once.", points: 2 }
    ]
  },
  {
    id: 5,
    kind: "domain",
    domain: "mind",
    prompt: "Small triggers — a tone of voice, a message left on \"read\" — can send my mood into a spiral.",
    options: [
      { id: "A", text: "Yes, very often — more than I'd like.", points: 4 },
      { id: "B", text: "Sometimes, especially when I'm already tired or low.", points: 3 },
      { id: "C", text: "Occasionally, but I recover quickly.", points: 1 },
      { id: "D", text: "Rarely — it takes a lot to shake me.", points: 0 },
      { id: "E", text: "I'm more affected by big things than small ones.", points: 2 }
    ]
  },
  {
    id: 6,
    kind: "domain",
    domain: "mind",
    prompt: "After you make a mistake, how does your inner voice usually talk to you?",
    options: [
      { id: "A", text: "Harshly — I can be my own worst critic.", points: 4 },
      { id: "B", text: "A bit critical at first, then I settle down.", points: 3 },
      { id: "C", text: "Fairly kindly — I remind myself everyone makes mistakes.", points: 1 },
      { id: "D", text: "Very kindly — I genuinely don't beat myself up.", points: 0 },
      { id: "E", text: "My inner voice is quiet — I don't notice much self-talk either way.", points: 2 }
    ]
  },
  {
    id: 7,
    kind: "domain",
    domain: "body",
    prompt: "Do you carry tension in your body — jaw, shoulders, stomach — even when nothing is \"wrong\"?",
    options: [
      { id: "A", text: "Yes, almost constantly.", points: 4 },
      { id: "B", text: "Yes, especially when I'm stressed.", points: 3 },
      { id: "C", text: "Sometimes, but it passes quickly.", points: 1 },
      { id: "D", text: "No, my body feels fairly relaxed most days.", points: 0 },
      { id: "E", text: "I don't notice tension, but I have other physical patterns (headaches, stomach issues, etc.).", points: 3 }
    ]
  },
  {
    id: 8,
    kind: "domain",
    domain: "body",
    prompt: "How would you describe your sleep and energy lately?",
    options: [
      { id: "A", text: "I'm tired most days, even after a full night's sleep.", points: 4 },
      { id: "B", text: "My sleep is okay, but I wake up unrested some days.", points: 3 },
      { id: "C", text: "I sleep well most nights and feel rested.", points: 0 },
      { id: "D", text: "My sleep and energy are both great.", points: 0 },
      { id: "E", text: "It changes a lot depending on what's going on in my life.", points: 2 }
    ]
  },
  {
    id: 9,
    kind: "domain",
    domain: "body",
    prompt: "Do you find it hard to rest, even when you have the time to?",
    options: [
      { id: "A", text: "Yes — resting makes me feel guilty or restless.", points: 4 },
      { id: "B", text: "A little — I often find something \"productive\" to do instead.", points: 3 },
      { id: "C", text: "Not really — I can rest when I need to.", points: 1 },
      { id: "D", text: "Resting comes naturally to me.", points: 0 },
      { id: "E", text: "I don't get much chance to test this either way.", points: 2 }
    ]
  },
  {
    id: 10,
    kind: "domain",
    domain: "body",
    prompt: "How safe do you generally feel in your own body?",
    options: [
      { id: "A", text: "Not very — my body sometimes reacts to things from my past, even now.", points: 4, flag: "somatic-history" },
      { id: "B", text: "Mostly safe, though certain situations can still unsettle me.", points: 3 },
      { id: "C", text: "Fairly safe, most of the time.", points: 1 },
      { id: "D", text: "Very safe — I feel at home in my body.", points: 0 },
      { id: "E", text: "I've honestly never thought about it this way.", points: 1 }
    ]
  },
  {
    id: 11,
    kind: "domain",
    domain: "money",
    prompt: "Which sentence feels most true about money for you?",
    options: [
      { id: "A", text: "\"There's never quite enough\" — even when things are objectively fine.", points: 4 },
      { id: "B", text: "I manage okay, but money still stresses me more than I'd like.", points: 3 },
      { id: "C", text: "I feel reasonably secure with money.", points: 1 },
      { id: "D", text: "I feel genuinely at ease and trusting around money.", points: 0 },
      { id: "E", text: "My relationship with money is complicated in a way not listed here.", points: 2 }
    ]
  },
  {
    id: 12,
    kind: "domain",
    domain: "money",
    prompt: "Growing up, money in my household was mostly talked about as...",
    options: [
      { id: "A", text: "A source of stress, fear, or conflict.", points: 4 },
      { id: "B", text: "Something to be careful and a little anxious about.", points: 3 },
      { id: "C", text: "A neutral, practical topic.", points: 1 },
      { id: "D", text: "Something abundant and never a big worry.", points: 0 },
      { id: "E", text: "It wasn't really talked about at all.", points: 2 }
    ]
  },
  {
    id: 13,
    kind: "domain",
    domain: "money",
    prompt: "When someone offers to pay for me, gift me something, or help me financially...",
    options: [
      { id: "A", text: "I feel uncomfortable and try to refuse or pay them back quickly.", points: 4 },
      { id: "B", text: "I accept, but I feel a little guilty about it.", points: 3 },
      { id: "C", text: "I accept graciously, most of the time.", points: 1 },
      { id: "D", text: "I receive easily, without guilt.", points: 0 },
      { id: "E", text: "It depends a lot on who is offering.", points: 2 }
    ]
  },
  {
    id: 14,
    kind: "domain",
    domain: "money",
    prompt: "Do you feel you're paid or valued fairly for the work and effort you put in?",
    options: [
      { id: "A", text: "No — I consistently feel underpaid or overlooked.", points: 4 },
      { id: "B", text: "Somewhat — there's room for more, but it's not terrible.", points: 2 },
      { id: "C", text: "Yes, mostly.", points: 1 },
      { id: "D", text: "Yes, completely.", points: 0 },
      { id: "E", text: "I've stopped expecting to be valued fairly, so I don't really check anymore.", points: 4, flag: "underearning" }
    ]
  },
  {
    id: 15,
    kind: "domain",
    domain: "relationships",
    prompt: "In close relationships, I tend to...",
    options: [
      { id: "A", text: "Worry a lot about whether the other person still cares.", points: 4 },
      { id: "B", text: "Keep a bit of emotional distance, even when I care deeply.", points: 3 },
      { id: "C", text: "Feel fairly secure, most of the time.", points: 1 },
      { id: "D", text: "Feel very secure and at ease.", points: 0 },
      { id: "E", text: "My pattern shifts depending on the relationship.", points: 2 }
    ]
  },
  {
    id: 16,
    kind: "domain",
    domain: "relationships",
    prompt: "Looking back at your relationships — romantic, friendships, or family — what do you notice?",
    options: [
      { id: "A", text: "The same painful pattern keeps repeating, just with different people.", points: 4 },
      { id: "B", text: "Some patterns repeat, but I've made changes over time.", points: 2 },
      { id: "C", text: "Each relationship has felt fairly different from the last.", points: 1 },
      { id: "D", text: "I haven't noticed any repeating pattern.", points: 0 },
      { id: "E", text: "I've noticed a pattern, but it isn't necessarily a painful one.", points: 1 }
    ]
  },
  {
    id: 17,
    kind: "domain",
    domain: "relationships",
    prompt: "How easy is it for you to say no, or set a boundary, with someone close to you?",
    options: [
      { id: "A", text: "Very hard — I usually give in or stay quiet to keep the peace.", points: 4 },
      { id: "B", text: "Hard, but I'm slowly getting better at it.", points: 3 },
      { id: "C", text: "Fairly easy, most of the time.", points: 1 },
      { id: "D", text: "Very easy — I set boundaries without much guilt.", points: 0 },
      { id: "E", text: "It depends entirely on the person or situation.", points: 2 }
    ]
  },
  {
    id: 18,
    kind: "domain",
    domain: "relationships",
    prompt: "Have you been in a relationship where you felt controlled, put down, or like you were \"walking on eggshells\"?",
    options: [
      { id: "A", text: "Yes, and I can still feel its effects on how I relate to people today.", points: 4, flag: "controlling-relationship" },
      { id: "B", text: "Yes, at some point, but I feel I've mostly moved past it.", points: 3 },
      { id: "C", text: "Not really — my relationships have generally felt respectful.", points: 0 },
      { id: "D", text: "No, never.", points: 0 },
      { id: "E", text: "I'm honestly not sure — I'd have to think about it more.", points: 2 }
    ]
  },
  {
    id: 19,
    kind: "domain",
    domain: "ancestral",
    prompt: "Do you ever feel like you're carrying an emotion or a heaviness that doesn't fully feel like \"yours\"?",
    options: [
      { id: "A", text: "Yes, often — like it belongs to my family more than to me.", points: 4 },
      { id: "B", text: "Sometimes, in certain moods or situations.", points: 3 },
      { id: "C", text: "Rarely.", points: 1 },
      { id: "D", text: "No, not that I've noticed.", points: 0 },
      { id: "E", text: "I've felt this, but never thought of it as a \"family\" thing.", points: 2 }
    ]
  },
  {
    id: 20,
    kind: "domain",
    domain: "ancestral",
    prompt: "Are there patterns in your life — money struggles, relationship struggles, health issues — that also showed up in your parents or grandparents?",
    options: [
      { id: "A", text: "Yes, very clearly — it's almost like a repeat.", points: 4 },
      { id: "B", text: "Yes, in some ways.", points: 3 },
      { id: "C", text: "A little, but nothing major.", points: 1 },
      { id: "D", text: "Not that I know of.", points: 0 },
      { id: "E", text: "I don't know enough about my family history to say.", points: 2 }
    ]
  },
  {
    id: 21,
    kind: "domain",
    domain: "ancestral",
    prompt: "Do you ever hold yourself back from success, happiness, or healing because part of you feels guilty for \"having it better\" than your family did?",
    options: [
      { id: "A", text: "Yes, this feels very true.", points: 4 },
      { id: "B", text: "Yes, a little, though I try not to let it stop me.", points: 3 },
      { id: "C", text: "Not really.", points: 1 },
      { id: "D", text: "No, I don't feel this at all.", points: 0 },
      { id: "E", text: "I've never thought about it this way before.", points: 2 }
    ]
  },
  {
    id: 22,
    kind: "domain",
    domain: "ancestral",
    prompt: "Were there topics, losses, or events in your family that were never really talked about openly?",
    options: [
      { id: "A", text: "Yes, and I sense they still affect the family, even now.", points: 4 },
      { id: "B", text: "Yes, but I don't think they affect me much today.", points: 2 },
      { id: "C", text: "Not really — my family talks about most things openly.", points: 0 },
      { id: "D", text: "No, my family is very open.", points: 0 },
      { id: "E", text: "There may have been, but I genuinely don't know.", points: 2 }
    ]
  },
  {
    id: 23,
    kind: "domain",
    domain: "career",
    prompt: "When it comes to asking for what you deserve at work — a raise, credit, a promotion...",
    options: [
      { id: "A", text: "I almost never ask, even when I know I deserve it.", points: 4 },
      { id: "B", text: "I ask sometimes, but it takes a lot of courage.", points: 3 },
      { id: "C", text: "I ask fairly comfortably.", points: 1 },
      { id: "D", text: "I ask easily and confidently.", points: 0 },
      { id: "E", text: "My situation doesn't really involve \"asking\" (self-employed, no manager, etc.).", points: 1 }
    ]
  },
  {
    id: 24,
    kind: "domain",
    domain: "career",
    prompt: "Do you ever push yourself hard at work mainly to prove something — to others, or to yourself — rather than because you enjoy it?",
    options: [
      { id: "A", text: "Yes, a lot of my drive comes from needing to prove myself.", points: 4 },
      { id: "B", text: "Sometimes — it's a mix of both.", points: 2 },
      { id: "C", text: "Not really — I mostly do it because I enjoy it.", points: 0 },
      { id: "D", text: "No, my work feels aligned with what I actually want.", points: 0 },
      { id: "E", text: "I'm honestly not sure what drives me at work.", points: 2 }
    ]
  },
  {
    id: 25,
    kind: "domain",
    domain: "career",
    prompt: "Have you experienced being humiliated, undermined, or treated unfairly by someone in a position of power over you?",
    options: [
      { id: "A", text: "Yes, and it still affects how I show up at work today.", points: 4, flag: "workplace-mistreatment" },
      { id: "B", text: "Yes, at some point, but I've largely moved on.", points: 3 },
      { id: "C", text: "Not really — I've generally been treated fairly.", points: 0 },
      { id: "D", text: "No, never.", points: 0 },
      { id: "E", text: "It's complicated — there's more to it than a simple yes or no.", points: 2 }
    ]
  },
  {
    id: 26,
    kind: "domain",
    domain: "career",
    prompt: "Does being seen, praised, or successful ever feel uncomfortable rather than enjoyable?",
    options: [
      { id: "A", text: "Yes, success can feel oddly unsafe, or \"too much.\"", points: 4 },
      { id: "B", text: "Sometimes, especially in front of certain people.", points: 3 },
      { id: "C", text: "Not usually.", points: 1 },
      { id: "D", text: "No, I enjoy being seen and celebrated.", points: 0 },
      { id: "E", text: "I haven't had much chance to test this.", points: 1 }
    ]
  },
  {
    id: 27,
    kind: "domain",
    domain: "spirit",
    prompt: "How connected do you feel to your own intuition, or \"gut feeling\"?",
    options: [
      { id: "A", text: "Not very — I often override it with logic or other people's opinions.", points: 4 },
      { id: "B", text: "Somewhat — I hear it, but don't always trust it.", points: 3 },
      { id: "C", text: "Fairly connected — I listen to it most of the time.", points: 1 },
      { id: "D", text: "Very connected — it's one of my main guides in life.", points: 0 },
      { id: "E", text: "It comes and goes; I'm not sure how to describe it.", points: 2 }
    ]
  },
  {
    id: 28,
    kind: "domain",
    domain: "spirit",
    prompt: "How comfortable are you with stillness — sitting quietly with no distraction, even for a few minutes?",
    options: [
      { id: "A", text: "Very uncomfortable — I avoid it if I can.", points: 4 },
      { id: "B", text: "A bit restless, but I can manage short periods.", points: 3 },
      { id: "C", text: "Fairly comfortable.", points: 1 },
      { id: "D", text: "Very comfortable — I genuinely enjoy stillness.", points: 0 },
      { id: "E", text: "I've never really tried it.", points: 2 }
    ]
  },
  {
    id: 29,
    kind: "domain",
    domain: "spirit",
    prompt: "Do you feel a clear sense of purpose or meaning in your life right now?",
    options: [
      { id: "A", text: "Not really — I often feel a bit lost about my \"why.\"", points: 4 },
      { id: "B", text: "Somewhat, but it's not always clear.", points: 3 },
      { id: "C", text: "Yes, fairly clear.", points: 1 },
      { id: "D", text: "Yes, very clear.", points: 0 },
      { id: "E", text: "It changes a lot depending on the season of life I'm in.", points: 2 }
    ]
  },
  {
    id: 30,
    kind: "domain",
    domain: "spirit",
    prompt: "Do you feel supported by something larger than yourself — call it God, the Universe, Source, or your own higher self?",
    options: [
      { id: "A", text: "Rarely — I mostly feel like I'm on my own.", points: 4 },
      { id: "B", text: "Sometimes, especially in hard moments.", points: 2 },
      { id: "C", text: "Yes, fairly often.", points: 1 },
      { id: "D", text: "Yes, very strongly and consistently.", points: 0 },
      { id: "E", text: "I believe in this, but I don't actively feel it day to day.", points: 2 }
    ]
  },
  {
    id: 31,
    kind: "chakra",
    chakra: "root",
    prompt: "When you think about safety and stability (home, money, feeling grounded), how does your body usually respond?",
    options: [
      { id: "A", text: "Unsettled — tight legs, restless feet, or a general sense of shaky ground.", points: 4 },
      { id: "B", text: "Okay, but a part of me is often bracing for something to go wrong.", points: 3 },
      { id: "C", text: "Fairly grounded and secure most of the time.", points: 1 },
      { id: "D", text: "Very grounded, safe, and steady.", points: 0 },
      { id: "E", text: "It depends heavily on what's happening in my life right now.", points: 2 }
    ]
  },
  {
    id: 32,
    kind: "chakra",
    chakra: "sacral",
    prompt: "How easily do you allow yourself pleasure, creativity, or emotional flow — in relationships, sensuality, or simply enjoying life?",
    options: [
      { id: "A", text: "Very hard — I often feel blocked, numb, or guilty about enjoying myself.", points: 4 },
      { id: "B", text: "It comes and goes — I can access it, but not consistently.", points: 3 },
      { id: "C", text: "Fairly easily, most of the time.", points: 1 },
      { id: "D", text: "Very easily — pleasure and creativity flow naturally.", points: 0 },
      { id: "E", text: "Honestly hard for me to answer.", points: 2 }
    ]
  },
  {
    id: 33,
    kind: "chakra",
    chakra: "solar",
    prompt: "Notice your stomach and midsection as you answer: where does your confidence usually sit?",
    options: [
      { id: "A", text: "My stomach tightens often — I second-guess my own power and decisions.", points: 4 },
      { id: "B", text: "Confident in some areas, shaky in others.", points: 3 },
      { id: "C", text: "Generally steady in my own power.", points: 1 },
      { id: "D", text: "Very confident and secure in who I am.", points: 0 },
      { id: "E", text: "It changes a lot depending on who I'm around.", points: 2 }
    ]
  },
  {
    id: 34,
    kind: "chakra",
    chakra: "heart",
    prompt: "How open does your heart feel — to giving love, receiving love, and moving through grief?",
    options: [
      { id: "A", text: "Fairly guarded — I hold back, or I give more than I receive.", points: 4 },
      { id: "B", text: "Somewhat open, though old hurt still lingers.", points: 3 },
      { id: "C", text: "Fairly open most of the time.", points: 1 },
      { id: "D", text: "Very open — I give and receive love freely.", points: 0 },
      { id: "E", text: "It depends on the relationship or season of my life.", points: 2 }
    ]
  },
  {
    id: 35,
    kind: "chakra",
    chakra: "throat",
    prompt: "How easily can you speak your truth — say what you really mean, ask for what you need, or set a boundary out loud?",
    options: [
      { id: "A", text: "Very hard — words often get stuck, or I stay quiet instead.", points: 4 },
      { id: "B", text: "I can do it, but it takes real effort and courage.", points: 3 },
      { id: "C", text: "Fairly easily, most of the time.", points: 1 },
      { id: "D", text: "Very easily — my voice and my truth move together.", points: 0 },
      { id: "E", text: "It depends entirely on who I'm speaking to.", points: 2 }
    ]
  },
  {
    id: 36,
    kind: "chakra",
    chakra: "thirdeye",
    prompt: "How clear does your inner vision feel — trusting your perception, seeing situations clearly, imagining what's possible?",
    options: [
      { id: "A", text: "Foggy — I often doubt what I see or sense.", points: 4 },
      { id: "B", text: "Somewhat clear, though self-doubt creeps in.", points: 3 },
      { id: "C", text: "Fairly clear most of the time.", points: 1 },
      { id: "D", text: "Very clear — I trust what I see and sense.", points: 0 },
      { id: "E", text: "It changes depending on how rested or stressed I am.", points: 2 }
    ]
  },
  {
    id: 37,
    kind: "chakra",
    chakra: "crown",
    prompt: "How connected do you feel to a sense of purpose, meaning, or something greater than your day-to-day life?",
    options: [
      { id: "A", text: "Quite disconnected — life can feel like just \"getting through the day.\"", points: 4 },
      { id: "B", text: "Somewhat connected, though it fades in busy periods.", points: 3 },
      { id: "C", text: "Fairly connected most of the time.", points: 1 },
      { id: "D", text: "Very connected — a felt sense of meaning runs through my life.", points: 0 },
      { id: "E", text: "It comes in waves I can't always explain.", points: 2 }
    ]
  }
];
