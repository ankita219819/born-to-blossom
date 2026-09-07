import {
  Flower2,
  Globe2,
  ShieldCheck,
  Sparkles
} from "lucide-react";

export const navItems = [
  "Home",
  "About",
  "Services",
  "Assessment",
  "Corporate",
  "Workshops",
  "Blog",
  "FAQ",
  "Book"
] as const;

export const heroFeatures = [
  ["20+ Modalities", Sparkles],
  ["Ancient Wisdom", Flower2],
  ["In-Person & Online", Globe2],
  ["Safe & Confidential", ShieldCheck]
] as const;

export const aboutTitle = "A Soul Who Has Walked This Path Before You";

export const aboutQuote =
  "Healing is not about changing who you are. It is about remembering.";

export const aboutParagraphs = [
  "I'm Sonia Verma Bhattacharyya, founder of Born to Blossom Soul Awakening — a multi-modality healing sanctuary in Gurgaon, serving seekers across India and the global diaspora in person and online.",
  "I am a certified practitioner and teacher across more than twenty healing disciplines, and the proponent of two original modalities — Humkaara and Hleem. I do not hold a title above you. I walk beside you — as a guide who has already entered the territory you are about to explore, holding a lamp for your path."
] as const;

export const aboutStats = [
  ["2000+", "Sessions facilitated"],
  ["20+", "Healing modalities"],
  ["8", "Countries served"],
  ["500+", "corporate wellness participants served"]
] as const;

export const healingPillars = [
  {
    title: "Release What No Longer Serves",
    copy: "Ancestral trauma, limiting beliefs, emotional wounds, and expired spiritual contracts — cleared so you reclaim energy spent in survival."
  },
  {
    title: "Reconnect to Your Authentic Self",
    copy: "Not to fix you — but to remind you. Intuition, body wisdom, lineage gifts, and the divine intelligence guiding your life."
  },
  {
    title: "Recalibrate for a Life You Love",
    copy: "When the subconscious landscape shifts, relationships, work, body, and finances follow — change that is whole, lasting, and joy-filled."
  }
] as const;

export const youtubeVideos = [
  { videoId: "lq_kjwbfj08", title: "Healing Anxiety", duration: "12:45" },
  { videoId: "SgYBS91LCnc", title: "Understanding Your Energy", duration: "10:21" },
  { videoId: "PazKsqDxago", title: "Letting Go & Healing", duration: "08:15" }
] as const;

export const instagramReels = [
  { shortcode: "DZsK6rsvXR1", title: "Release & Breathe", duration: "0:45" },
  { shortcode: "DJVQf2cBzEn", title: "Morning Ritual", duration: "0:32" },
  { shortcode: "DaDlx-yy4CM", title: "Inner Child", duration: "0:28" }
] as const;

export type TestimonialItem = {
  quote: string;
  name: string;
  role: string;
  rating: number;
};

export const testimonials: TestimonialItem[] = [
  {
    quote:
      "I had spent ten years in conventional therapy working through my mother wound — and I’m deeply grateful for all of it. But it was the Family Constellation session at Born to Blossom that completed something. I wept for my grandmother, whom I’d never met, and felt something in my body release that therapy had never reached. I am a different woman since that afternoon.",
    name: "P.K.",
    role: "Delhi · Family Constellation",
    rating: 5
  },
  {
    quote:
      "The Reiki Master sessions I received during my chemotherapy treatment were the only time I felt truly peaceful and not like a patient. My oncology nurse noticed that I healed faster than expected from my surgery. I cannot prove what’s connected, but in my heart I know.",
    name: "A.S.",
    role: "Gurugram · Reiki",
    rating: 5
  },
  {
    quote:
      "I came for the Quantum Belief Reprogramming work specifically for my money blocks. Three sessions in, I had dissolved a belief about ‘people like us don’t succeed’ that I’d absorbed from my father’s entire attitude to life. Within two months, I had my first six-figure month in business.",
    name: "M.J.",
    role: "Bengaluru · Quantum Belief Reprogramming",
    rating: 5
  },
  {
    quote:
      "The Humkaara session was unlike anything I have words for. Something moved through me during the session that I can only call grace. Three months later, the relationship pattern that had repeated in every partnership I’d had since my twenties has not reappeared.",
    name: "R.D.",
    role: "Pune · Humkaara",
    rating: 5
  },
  {
    quote:
      "We brought Born to Blossom to our annual leadership offsite with healthy scepticism. What happened across those two days changed the way we lead, communicate, and hold each other. Attrition in that team has dropped 60 percent in the following year.",
    name: "CEO",
    role: "Fintech Company, Gurugram",
    rating: 5
  },
  {
    quote:
      "RESTORE was the best investment I’ve ever made in myself — and I have invested significantly over the years. The eight sessions were each distinct, each necessary, and each building on the last. I emerged from the programme as someone I genuinely like.",
    name: "N.A.",
    role: "Delhi · RESTORE",
    rating: 5
  }
];

export const contactInfo = {
  phone: "+91 75068 28722",
  whatsapp: "+91 75068 28722",
  email: "sonia@borntoblossom.in",
  website: "https://borntoblossom.in",
  location: "Gurgaon, NCR, India",
  calendarInviteTo: "sonia.verma14@gmail.com",
  calendarInviteCc: "sonia@borntoblossom.in",
  instagramPrimary: "https://www.instagram.com/borntoblossom_soulawakening/",
  instagramHealing: "https://www.instagram.com/borntoblossomhealing/",
  youtube: "https://www.youtube.com/@borntoblossomhealing"
} as const;

export const bookingBenefits = [
  "Complimentary discovery call for new clients",
  "Safe & confidential container",
  "In-person Gurgaon · Online worldwide",
  "Multi-modality, personalised care"
] as const;

export const footerQuickLinks = [
  "Home",
  "About",
  "Services",
  "Soul Assessment",
  "Corporate",
  "Workshops",
  "RESTORE",
  "FAQ",
  "Blog",
  "Book",
  "Contact"
] as const;

export const footerServices = [
  "Family Constellation Therapy",
  "Reiki Healing",
  "Humkaara",
  "Hleem",
  "RESTORE",
  "Corporate Wellness"
] as const;
