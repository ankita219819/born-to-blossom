import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { contactInfo, services } from "@/lib/content";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type BookingDetails = {
  service: string;
  name: string;
  phone: string;
  email?: string;
  age: string;
  location: string;
  birthday: string;
  concern: string;
  sessionMode: string;
  medicalDisclaimer: string;
  confidentiality: string;
  day: number;
  month: number;
  year: number;
};

const BOOKING_TIMEZONE = "Asia/Kolkata";

function normalizeWhatsAppNumber(number: string) {
  return number.replace(/\D/g, "");
}

function getServiceDurationMinutes(service: string) {
  const duration = services.find((item) => item.title === service)?.time.match(/(\d+)/);
  return duration ? Number.parseInt(duration[1], 10) : 60;
}

function formatBookingDateLabel({ day, month, year }: Pick<BookingDetails, "day" | "month" | "year">) {
  return new Date(year, month, day).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric"
  });
}

function formatBirthdayLabel(birthday: string) {
  if (!birthday) return birthday;
  const date = new Date(`${birthday}T00:00:00`);
  if (Number.isNaN(date.getTime())) return birthday;
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric"
  });
}

function pad(value: number) {
  return String(value).padStart(2, "0");
}

function formatAllDayStamp(year: number, month: number, day: number) {
  return `${year}${pad(month + 1)}${pad(day)}`;
}

/** Google Calendar all-day events use an exclusive end date. */
function getAllDayBookingWindow(details: BookingDetails) {
  const startDate = new Date(details.year, details.month, details.day);
  const endDate = new Date(details.year, details.month, details.day + 1);

  return {
    start: formatAllDayStamp(startDate.getFullYear(), startDate.getMonth(), startDate.getDate()),
    end: formatAllDayStamp(endDate.getFullYear(), endDate.getMonth(), endDate.getDate())
  };
}

function buildBookingLines(details: BookingDetails, style: "plain" | "whatsapp") {
  const bold = (label: string, value: string) =>
    style === "whatsapp" ? `*${label}:* ${value}` : `${label}: ${value}`;

  const lines = [
    bold("Service", details.service),
    bold("Name", details.name),
    bold("Phone", details.phone)
  ];

  if (details.email?.trim()) lines.push(bold("Email", details.email.trim()));
  lines.push(
    bold("Age", details.age),
    bold("Location", details.location),
    bold("Birthday", formatBirthdayLabel(details.birthday)),
    bold("Preferred session date", formatBookingDateLabel(details)),
    bold("Session mode", details.sessionMode),
    bold("Concern / reason", details.concern),
    bold("Medical disclaimer", details.medicalDisclaimer),
    bold("Confidentiality", details.confidentiality),
    bold("Duration", `${getServiceDurationMinutes(details.service)} mins (time to be confirmed)`)
  );

  return lines;
}

function buildBookingDescription(details: BookingDetails) {
  return buildBookingLines(details, "plain").join("\n");
}

export function buildWhatsAppBookingUrl(details: BookingDetails) {
  const lines = [
    "Hello! I would like to book a healing session.",
    "",
    ...buildBookingLines(details, "whatsapp")
  ];

  return `https://wa.me/${normalizeWhatsAppNumber(contactInfo.whatsapp)}?text=${encodeURIComponent(lines.join("\n"))}`;
}

export function buildGoogleCalendarUrl(details: BookingDetails) {
  const { start, end } = getAllDayBookingWindow(details);
  const guests = [contactInfo.calendarInviteTo, contactInfo.calendarInviteCc].join(",");
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `${details.service} — Born To Blossom`,
    dates: `${start}/${end}`,
    details: buildBookingDescription(details),
    location: contactInfo.location,
    ctz: BOOKING_TIMEZONE,
    add: guests
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

function escapeIcsValue(value: string) {
  return value.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n");
}

function formatIcsUtcStamp(date: Date) {
  return date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");
}

export function downloadBookingIcs(details: BookingDetails) {
  const { start, end } = getAllDayBookingWindow(details);
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Born To Blossom//Booking//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:REQUEST",
    "BEGIN:VEVENT",
    `UID:${Date.now()}@borntoblossom.com`,
    `DTSTAMP:${formatIcsUtcStamp(new Date())}`,
    `DTSTART;VALUE=DATE:${start}`,
    `DTEND;VALUE=DATE:${end}`,
    `SUMMARY:${escapeIcsValue(`${details.service} — Born To Blossom`)}`,
    `DESCRIPTION:${escapeIcsValue(buildBookingDescription(details))}`,
    `LOCATION:${escapeIcsValue(contactInfo.location)}`,
    `ORGANIZER;CN=Born To Blossom:mailto:${contactInfo.calendarInviteTo}`,
    `ATTENDEE;ROLE=REQ-PARTICIPANT;PARTSTAT=NEEDS-ACTION;RSVP=TRUE;CN=Sonia Verma:mailto:${contactInfo.calendarInviteTo}`,
    `ATTENDEE;ROLE=OPT-PARTICIPANT;PARTSTAT=NEEDS-ACTION;RSVP=TRUE;CN=Born To Blossom:mailto:${contactInfo.calendarInviteCc}`,
    "END:VEVENT",
    "END:VCALENDAR"
  ].join("\r\n");

  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "born-to-blossom-session.ics";
  link.click();
  URL.revokeObjectURL(url);
}
