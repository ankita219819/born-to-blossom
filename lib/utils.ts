import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { contactInfo, services } from "@/lib/content";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type BookingDetails = {
  service: string;
  name: string;
  email: string;
  phone?: string;
  day: number;
  month: number;
  year: number;
  time: string;
  notes?: string;
};

const BOOKING_TIMEZONE = "Asia/Kolkata";

function normalizeWhatsAppNumber(number: string) {
  return number.replace(/\D/g, "");
}

function parseTimeLabel(time: string) {
  const match = time.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!match) return { hours: 9, minutes: 0 };

  let hours = Number.parseInt(match[1], 10);
  const minutes = Number.parseInt(match[2], 10);
  const period = match[3].toUpperCase();

  if (period === "PM" && hours !== 12) hours += 12;
  if (period === "AM" && hours === 12) hours = 0;

  return { hours, minutes };
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

function formatCalendarStamp(year: number, month: number, day: number, hours: number, minutes: number) {
  const pad = (value: number) => String(value).padStart(2, "0");
  return `${year}${pad(month + 1)}${pad(day)}T${pad(hours)}${pad(minutes)}00`;
}

function getBookingWindow(details: BookingDetails) {
  const { hours, minutes } = parseTimeLabel(details.time);
  const duration = getServiceDurationMinutes(details.service);
  const endMinutes = hours * 60 + minutes + duration;

  return {
    start: formatCalendarStamp(details.year, details.month, details.day, hours, minutes),
    end: formatCalendarStamp(
      details.year,
      details.month,
      details.day,
      Math.floor(endMinutes / 60) % 24,
      endMinutes % 60
    )
  };
}

function buildBookingDescription(details: BookingDetails) {
  const lines = [
    `Service: ${details.service}`,
    `Name: ${details.name}`,
    `Email: ${details.email}`
  ];

  if (details.phone?.trim()) lines.push(`Phone: ${details.phone.trim()}`);
  lines.push(`Date: ${formatBookingDateLabel(details)}`, `Time: ${details.time}`);
  if (details.notes?.trim()) lines.push(`Notes: ${details.notes.trim()}`);

  return lines.join("\n");
}

export function buildWhatsAppBookingUrl(details: BookingDetails) {
  const date = formatBookingDateLabel(details);
  const lines = [
    "Hello! I would like to book a healing session.",
    "",
    `*Service:* ${details.service}`,
    `*Name:* ${details.name}`,
    `*Email:* ${details.email}`
  ];

  if (details.phone?.trim()) lines.push(`*Phone:* ${details.phone.trim()}`);
  lines.push(`*Date:* ${date}`, `*Time:* ${details.time}`);
  if (details.notes?.trim()) lines.push(`*Notes:* ${details.notes.trim()}`);

  return `https://wa.me/${normalizeWhatsAppNumber(contactInfo.whatsapp)}?text=${encodeURIComponent(lines.join("\n"))}`;
}

export function buildGoogleCalendarUrl(details: BookingDetails) {
  const { start, end } = getBookingWindow(details);
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `${details.service} — Born To Blossom`,
    dates: `${start}/${end}`,
    details: buildBookingDescription(details),
    location: contactInfo.location,
    ctz: BOOKING_TIMEZONE
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
  const { start, end } = getBookingWindow(details);
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Born To Blossom//Booking//EN",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    `UID:${Date.now()}@borntoblossom.com`,
    `DTSTAMP:${formatIcsUtcStamp(new Date())}`,
    `DTSTART;TZID=${BOOKING_TIMEZONE}:${start}`,
    `DTEND;TZID=${BOOKING_TIMEZONE}:${end}`,
    `SUMMARY:${escapeIcsValue(`${details.service} — Born To Blossom`)}`,
    `DESCRIPTION:${escapeIcsValue(buildBookingDescription(details))}`,
    `LOCATION:${escapeIcsValue(contactInfo.location)}`,
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
