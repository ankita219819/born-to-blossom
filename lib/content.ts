import {
  Flower2,
  HeartHandshake,
  ShieldCheck,
  Sparkles,
  Sprout,
  Star,
  type LucideIcon
} from "lucide-react";

export const navItems = [
  "Home",
  "About",
  "Services",
  "Videos",
  "Testimonials",
  "Book Session",
  "Contact"
] as const;

export type ServiceItem = {
  title: string;
  copy: string;
  time: string;
  Icon: LucideIcon;
  image?: string;
  imageAlt?: string;
};

export const services: ServiceItem[] = [
  {
    title: "Family Constellation Therapy",
    copy: "Heal generational patterns and restore belonging.",
    time: "60 mins",
    Icon: Sprout,
    image: "/images/family-constellation.png",
    imageAlt: "Family standing together on a hilltop connected by golden light at sunrise"
  },
  {
    title: "Spiritual Healing",
    copy: "Restore inner balance through intentional ceremony.",
    time: "45 mins",
    Icon: Sparkles,
    image: "/images/spiritual_healing.png",
    imageAlt: "Silhouette meditating with glowing chakras overlooking a serene mountain sunrise"
  },
  {
    title: "Tarot Reading",
    copy: "Gain clarity and insight through intuitive guidance.",
    time: "45 mins",
    Icon: Star,
    image: "/images/tarot-reading.png",
    imageAlt: "Hands holding tarot cards beside a lit candle at golden hour"
  },
  {
    title: "Meditation Guidance",
    copy: "Mindfulness practices to cultivate peace and awareness.",
    time: "30 mins",
    Icon: Flower2,
    image: "/images/meditation.png",
    imageAlt: "Woman meditating on a hilltop beneath cherry blossoms at sunrise"
  }
];

export const heroFeatures = [
  ["Compassionate Care", HeartHandshake],
  ["Holistic Healing", Flower2],
  ["Personalized Guidance", Sparkles],
  ["Safe & Confidential", ShieldCheck]
] as const;

export const aboutTitle = "Founder & Practitioner, Born to Blossom Soul Awakening";

export const aboutQuote =
  "I am not just a healer. I am a transmitter of divine Light Codes. Every session is a sacred transmission. Every client is a divine appointment.";

export const aboutParagraphs = [
  "I'm Sonia Verma Bhattacharyya, founder and practitioner of Born to Blossom Soul Awakening in Gurgaon, India. Light Codes are structured packets of divine intelligence — precision transmissions through light, sound, symbol, colour, and vibrational frequency — that heal, clear, activate, and transform the energy field.",
  "In session, I draw on ThetaHealing, Reiki, Family Constellation, Sound Healing, Somatic Healing, EFT, Hunkaara, Hleem, and sacred Shakta practice to support deals and business, emotional healing, money and abundance, relationships, health, and soul purpose. I hold the space in which divine healing occurs — with presence, confidentiality, and care."
] as const;

export const aboutStats = [
  ["6", "Life areas"],
  ["1:1", "Sacred sessions"],
  ["Gurgaon", "India"],
  ["100%", "Confidential"]
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

export const testimonials = [
  "I felt deeply seen and safe. The session helped me understand a family pattern I had carried for years.",
  "The blend of clinical insight and spiritual steadiness was unlike anything I had experienced before.",
  "A calm, beautiful space where practical healing and inner wisdom meet with so much compassion."
] as const;

export const contactInfo = {
  phone: "+91 75068 28722",
  whatsapp: "+91 75068 28722",
  email: "hello@borntoblossom.com",
  location: "Gurgaon, Haryana, India"
} as const;

export const bookingBenefits = [
  "Personalized Care",
  "Safe & Confidential",
  "Holistic & Integrative",
  "Compassionate Support"
] as const;

export const bookingTimes = [
  "09:00 AM",
  "10:30 AM",
  "12:00 PM",
  "02:00 PM",
  "03:30 PM",
  "05:00 PM",
  "06:30 PM"
] as const;

export const footerQuickLinks = [
  "Home",
  "About",
  "Services",
  "Videos",
  "Testimonials",
  "Book Session",
  "Contact"
] as const;

export const footerServices = [
  "Psychiatric Consultation",
  "Family Constellation Therapy",
  "Spiritual Healing",
  "Tarot Reading",
  "Energy Reading",
  "Meditation Guidance"
] as const;
