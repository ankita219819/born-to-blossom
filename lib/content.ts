import {
  Flower2,
  HeartHandshake,
  ShieldCheck,
  Sparkles,
  Sprout,
  Star,
  SunMedium,
  type LucideIcon
} from "lucide-react";

export const navItems = [
  "Home",
  "About",
  "Services",
  "Healing Journey",
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
};

export const services: ServiceItem[] = [
  {
    title: "Psychiatric Consultation",
    copy: "Compassionate mental health support tailored to you.",
    time: "50 mins",
    Icon: HeartHandshake
  },
  {
    title: "Family Constellation Therapy",
    copy: "Heal generational patterns and restore belonging.",
    time: "60 mins",
    Icon: Sprout
  },
  {
    title: "Spiritual Healing",
    copy: "Restore inner balance through intentional ceremony.",
    time: "45 mins",
    Icon: Sparkles
  },
  {
    title: "Tarot Reading",
    copy: "Gain clarity and insight through intuitive guidance.",
    time: "45 mins",
    Icon: Star
  },
  {
    title: "Energy Healing",
    copy: "Clear energetic blockages and realign your natural flow.",
    time: "45 mins",
    Icon: SunMedium
  },
  {
    title: "Meditation Guidance",
    copy: "Mindfulness practices to cultivate peace and awareness.",
    time: "30 mins",
    Icon: Flower2
  }
];

export const heroFeatures = [
  ["Compassionate Care", HeartHandshake],
  ["Holistic Healing", Flower2],
  ["Personalized Guidance", Sparkles],
  ["Safe & Confidential", ShieldCheck]
] as const;

export const aboutStats = [
  ["12+", "Years practice"],
  ["1:1", "Personal care"],
  ["6", "Healing paths"],
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
