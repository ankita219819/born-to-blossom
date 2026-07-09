"use client";

import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import {
  CalendarDays,
  CalendarPlus,
  Check,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  Download,
  MapPin,
  MessageCircle,
  Monitor,
  Send
} from "lucide-react";
import { bookingBenefits, services } from "@/lib/content";
import {
  buildGoogleCalendarUrl,
  buildWhatsAppBookingUrl,
  cn,
  downloadBookingIcs,
  type BookingDetails
} from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/layout/Container";

type BookingForm = {
  service: string;
  name: string;
  phone: string;
  email: string;
  age: string;
  location: string;
  birthday: string;
  concern: string;
  sessionMode: string;
  medicalDisclaimer: boolean;
  confidentiality: boolean;
};

const fieldClass =
  "h-[48px] w-full rounded-[12px] border border-[#E5DACC] bg-white px-4 text-[0.9rem] font-normal text-[#2E2925] outline-none transition placeholder:text-[#B5A99E] focus:border-[#365A43]";
const labelClass = "grid gap-1.5 text-[0.8rem] font-semibold text-[#2E2925]";

function RequiredMark() {
  return <span className="text-[#C45C5C]">*</span>;
}

function FieldLabel({ children, hint }: { children: React.ReactNode; hint?: React.ReactNode }) {
  return (
    <>
      <span className="inline-flex items-baseline gap-1">
        {children}
        <RequiredMark />
      </span>
      {hint ? <span className="text-[0.72rem] font-normal text-[#9A8D82]">{hint}</span> : null}
    </>
  );
}

function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function buildMonthCells(year: number, month: number) {
  const firstDay = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startWeekday = firstDay.getDay();
  const cells: Array<{ day: number; inMonth: boolean; date: Date | null }> = [];

  const prevMonthDays = new Date(year, month, 0).getDate();
  for (let i = startWeekday - 1; i >= 0; i -= 1) {
    cells.push({ day: prevMonthDays - i, inMonth: false, date: null });
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    cells.push({ day, inMonth: true, date: new Date(year, month, day) });
  }

  while (cells.length % 7 !== 0 || cells.length < 35) {
    const nextDay = cells.length - (startWeekday + daysInMonth) + 1;
    cells.push({ day: nextDay, inMonth: false, date: null });
  }

  return cells;
}

const HOW_IT_WORKS = [
  {
    title: "Fill the form",
    copy: "Tell us about yourself and choose your preferred service.",
    Icon: ClipboardList
  },
  {
    title: "Select Date",
    copy: "Pick a preferred date that works best for you.",
    Icon: CalendarDays
  },
  {
    title: "Get Confirmation",
    copy: "Our team will confirm your session and share all the details with you.",
    Icon: MessageCircle
  }
] as const;

function BookingIntro({ className }: { className?: string }) {
  return (
    <div className={cn("text-center md:text-left", className)}>
      <h2 className="font-display text-[2rem] font-medium leading-[1.1] tracking-[-0.03em] text-[#2E2925] md:text-[2.35rem] min-[1200px]:text-[2.1rem]">
        Book Your Healing Session
      </h2>
      <p className="mt-3 text-[0.9rem] leading-[1.7] text-[#6F6258] md:mt-4 md:text-[0.95rem]">
        Fill out this form and our team will get back to you for confirmation of your session slot.
      </p>
      <div className="mt-5 grid gap-2.5 sm:grid-cols-2 md:mt-6 min-[1200px]:grid-cols-1">
        {bookingBenefits.map((label) => (
          <div
            key={label}
            className="flex items-center justify-center gap-2.5 text-[0.875rem] text-[#6F6258] md:justify-start"
          >
            <span className="grid h-5 w-5 place-items-center rounded-full bg-[#365A43]/10 text-[#365A43]">
              <Check className="h-3 w-3" strokeWidth={3} />
            </span>
            {label}
          </div>
        ))}
      </div>
    </div>
  );
}

function HowItWorksCard() {
  return (
    <aside className="rounded-[22px] border border-[#EFE5DA] bg-[#FFFDFC] p-5 shadow-[0_10px_28px_rgba(30,20,10,0.04)] md:p-6">
      <div className="mb-5 flex items-center gap-2.5">
        <span className="grid h-9 w-9 place-items-center rounded-full bg-[#F4E6D4] text-[#C69C6D]">
          <CalendarDays className="h-4 w-4" />
        </span>
        <h3 className="font-display text-[1.35rem] font-medium text-[#2E2925]">How it works?</h3>
      </div>

      <ol className="grid gap-5">
        {HOW_IT_WORKS.map(({ title, copy, Icon }, index) => (
          <li key={title} className="flex gap-3">
            <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#E8F2EA] text-[0.75rem] font-bold text-[#365A43]">
              {index + 1}
            </span>
            <div>
              <div className="flex items-center gap-2">
                <Icon className="h-3.5 w-3.5 text-[#C69C6D]" />
                <h4 className="text-[0.9rem] font-semibold text-[#2E2925]">{title}</h4>
              </div>
              <p className="mt-1 text-[0.8rem] leading-[1.6] text-[#6F6258]">{copy}</p>
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-6 rounded-[14px] bg-[#F4FAF5] px-4 py-3 text-[0.78rem] leading-[1.55] text-[#365A43]">
        Session time will be confirmed over WhatsApp.
      </div>
    </aside>
  );
}

export function Booking() {
  const today = useMemo(() => startOfDay(new Date()), []);
  const { register, handleSubmit, formState, watch, setValue } = useForm<BookingForm>({
    defaultValues: {
      sessionMode: "Online / Virtual Call",
      medicalDisclaimer: false,
      confidentiality: false
    }
  });
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState(today);
  const [dateError, setDateError] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<BookingDetails | null>(null);

  const sessionMode = watch("sessionMode");
  const medicalDisclaimer = watch("medicalDisclaimer");
  const confidentiality = watch("confidentiality");

  const maxBirthday = useMemo(() => {
    const y = today.getFullYear();
    const m = String(today.getMonth() + 1).padStart(2, "0");
    const d = String(today.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  }, [today]);

  const monthLabel = useMemo(
    () =>
      new Date(viewYear, viewMonth, 1).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric"
      }),
    [viewYear, viewMonth]
  );

  const monthCells = useMemo(() => buildMonthCells(viewYear, viewMonth), [viewYear, viewMonth]);

  const canGoPrevMonth =
    viewYear > today.getFullYear() || (viewYear === today.getFullYear() && viewMonth > today.getMonth());

  const goToPrevMonth = () => {
    if (!canGoPrevMonth) return;
    if (viewMonth === 0) {
      setViewYear((year) => year - 1);
      setViewMonth(11);
      return;
    }
    setViewMonth((month) => month - 1);
  };

  const goToNextMonth = () => {
    if (viewMonth === 11) {
      setViewYear((year) => year + 1);
      setViewMonth(0);
      return;
    }
    setViewMonth((month) => month + 1);
  };

  const onSubmit = (data: BookingForm) => {
    if (!selectedDate || selectedDate < today) {
      setDateError(true);
      return;
    }

    if (!data.medicalDisclaimer || !data.confidentiality) return;

    const booking: BookingDetails = {
      service: data.service,
      name: data.name,
      phone: data.phone,
      email: data.email,
      age: data.age,
      location: data.location,
      birthday: data.birthday,
      concern: data.concern,
      sessionMode: data.sessionMode,
      medicalDisclaimer: "Yes, I agree",
      confidentiality: "Yes, I agree",
      day: selectedDate.getDate(),
      month: selectedDate.getMonth(),
      year: selectedDate.getFullYear()
    };

    setDateError(false);
    setConfirmedBooking(booking);
    window.open(buildWhatsAppBookingUrl(booking), "_blank", "noopener,noreferrer");
  };

  return (
    <Section id="book-session">
      <Container>
        <div className="rounded-[28px] bg-[#EDE5D8] p-4 shadow-[0_20px_60px_rgba(0,0,0,0.07)] md:rounded-[36px] md:p-6 min-[1200px]:p-7">
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Phone + tablet: intro on top. Desktop: left column */}
            <div className="min-[1200px]:hidden">
              <BookingIntro className="mb-5 px-1 md:mb-6" />
            </div>

            <div className="grid gap-5 min-[1200px]:grid-cols-[220px_minmax(0,1fr)_250px] min-[1200px]:items-start min-[1200px]:gap-6">
              <div className="hidden min-[1200px]:block">
                <BookingIntro />
              </div>

              <div className="rounded-[22px] bg-[#FCF8F3] p-4 md:rounded-[26px] md:p-6 min-[1200px]:p-7">
                <p className="mb-4 hidden text-[0.7rem] font-bold uppercase tracking-[0.14em] text-[#9A8D82] min-[1200px]:block">
                  Your Details
                </p>

                <div className="grid gap-4">
                  <label className={labelClass}>
                    <FieldLabel>Choose Service</FieldLabel>
                    <select {...register("service", { required: true })} className={fieldClass}>
                      <option value="">Select a service</option>
                      {services.map(({ title }) => (
                        <option key={title}>{title}</option>
                      ))}
                    </select>
                  </label>

                  <label className={labelClass}>
                    <FieldLabel>Full Name</FieldLabel>
                    <input
                      {...register("name", { required: true })}
                      placeholder="Enter your name"
                      className={fieldClass}
                    />
                  </label>

                  <div className="grid gap-4 md:grid-cols-2">
                    <label className={labelClass}>
                      <FieldLabel>Phone Number</FieldLabel>
                      <input
                        {...register("phone", { required: true })}
                        type="tel"
                        placeholder="Enter phone number"
                        className={fieldClass}
                      />
                    </label>
                    <label className={labelClass}>
                      <FieldLabel>Email ID</FieldLabel>
                      <input
                        {...register("email", { required: true })}
                        type="email"
                        placeholder="Enter email"
                        className={fieldClass}
                      />
                    </label>
                  </div>

                  <div className="grid grid-cols-2 gap-3 md:gap-4">
                    <label className={labelClass}>
                      <FieldLabel>Age</FieldLabel>
                      <input
                        {...register("age", { required: true, min: 1 })}
                        type="number"
                        min={1}
                        placeholder="Age"
                        className={fieldClass}
                      />
                    </label>
                    <label className={labelClass}>
                      <FieldLabel>Location</FieldLabel>
                      <input
                        {...register("location", { required: true })}
                        placeholder="City / area"
                        className={fieldClass}
                      />
                    </label>
                  </div>

                  <label className={labelClass}>
                    <FieldLabel hint="Please mention your correct date, as it will help us understand you.">
                      Birthday
                    </FieldLabel>
                    <input
                      {...register("birthday", {
                        required: true,
                        validate: (value) => {
                          if (!value) return "Birthday is required";
                          const selected = new Date(`${value}T00:00:00`);
                          if (Number.isNaN(selected.getTime())) return "Enter a valid birthday";
                          if (selected > today) return "Birthday cannot be a future date";
                          return true;
                        }
                      })}
                      type="date"
                      max={maxBirthday}
                      className={fieldClass}
                    />
                    {formState.errors.birthday ? (
                      <span className="text-[0.75rem] font-medium text-[#B45309]">
                        {formState.errors.birthday.message || "Birthday cannot be a future date"}
                      </span>
                    ) : null}
                  </label>

                  <fieldset>
                    <legend className="mb-2 inline-flex items-baseline gap-1 text-[0.8rem] font-semibold text-[#2E2925]">
                      Preferred Mode
                      <RequiredMark />
                    </legend>
                    <div className="grid gap-3 md:grid-cols-2">
                      {(
                        [
                          ["Online / Virtual Call", Monitor],
                          ["Offline / In-person visit", MapPin]
                        ] as const
                      ).map(([value, Icon]) => {
                        const selected = sessionMode === value;
                        return (
                          <button
                            key={value}
                            type="button"
                            onClick={() => setValue("sessionMode", value, { shouldValidate: true })}
                            className={cn(
                              "flex items-center gap-3 rounded-[14px] border bg-white px-4 py-3.5 text-left transition",
                              selected
                                ? "border-[#365A43] shadow-[0_0_0_1px_#365A43]"
                                : "border-[#E5DACC] hover:border-[#C9B8A4]"
                            )}
                          >
                            <span
                              className={cn(
                                "grid h-5 w-5 place-items-center rounded-full border",
                                selected ? "border-[#365A43] bg-[#365A43] text-white" : "border-[#C9B8A4]"
                              )}
                            >
                              {selected ? <Check className="h-3 w-3" strokeWidth={3} /> : null}
                            </span>
                            <Icon className={cn("h-4 w-4", selected ? "text-[#365A43]" : "text-[#9A8D82]")} />
                            <span className="text-[0.875rem] font-medium text-[#2E2925]">{value}</span>
                          </button>
                        );
                      })}
                    </div>
                    <input type="hidden" {...register("sessionMode", { required: true })} />
                  </fieldset>

                  <div className="rounded-[16px] border border-[#E5DACC] bg-white p-4 md:p-5">
                    <h3 className="mb-3 inline-flex items-baseline gap-1 text-[0.8rem] font-semibold text-[#2E2925]">
                      Preferred Session Date
                      <RequiredMark />
                    </h3>
                    <div className="flex items-center justify-between">
                      <button
                        type="button"
                        aria-label="Previous month"
                        onClick={goToPrevMonth}
                        disabled={!canGoPrevMonth}
                        className={cn(
                          "grid h-8 w-8 place-items-center rounded-full transition",
                          canGoPrevMonth ? "hover:bg-[#F0EBE4]" : "cursor-not-allowed opacity-35"
                        )}
                      >
                        <ChevronLeft className="h-4 w-4 text-[#6F6258]" />
                      </button>
                      <h4 className="text-[0.9rem] font-semibold text-[#2E2925]">{monthLabel}</h4>
                      <button
                        type="button"
                        aria-label="Next month"
                        onClick={goToNextMonth}
                        className="grid h-8 w-8 place-items-center rounded-full transition hover:bg-[#F0EBE4]"
                      >
                        <ChevronRight className="h-4 w-4 text-[#6F6258]" />
                      </button>
                    </div>
                    <div className="mt-3 grid grid-cols-7 gap-px text-center text-[0.62rem] font-semibold uppercase tracking-[0.05em] text-[#9A8D82]">
                      {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((d) => (
                        <span key={d}>{d}</span>
                      ))}
                    </div>
                    <div className="mt-1 grid grid-cols-7">
                      {monthCells.map((cell, index) => {
                        const isPast = Boolean(cell.date && cell.date < today);
                        const isSelectable = Boolean(cell.inMonth && cell.date && !isPast);
                        const isSelected =
                          Boolean(cell.date) &&
                          selectedDate.getFullYear() === cell.date!.getFullYear() &&
                          selectedDate.getMonth() === cell.date!.getMonth() &&
                          selectedDate.getDate() === cell.date!.getDate();

                        return (
                          <button
                            type="button"
                            key={`${viewYear}-${viewMonth}-${index}`}
                            disabled={!isSelectable}
                            onClick={() => {
                              if (!cell.date || !isSelectable) return;
                              setSelectedDate(cell.date);
                              setDateError(false);
                            }}
                            className={cn(
                              "grid h-9 w-full place-items-center rounded-full text-[0.8rem] font-medium transition",
                              !cell.inMonth && "text-[#C8BDB5]",
                              cell.inMonth && isPast && "cursor-not-allowed text-[#C8BDB5]",
                              isSelected && isSelectable && "bg-[#365A43] text-white",
                              isSelectable && !isSelected && "hover:bg-[#F0EBE4]"
                            )}
                          >
                            {cell.day}
                          </button>
                        );
                      })}
                    </div>
                    {dateError ? (
                      <p className="mt-2 text-[0.75rem] font-medium text-[#B45309]">Please select a future date.</p>
                    ) : null}
                    <p className="mt-3 text-[0.75rem] text-[#9A8D82]">Session time will be confirmed over WhatsApp.</p>
                  </div>

                  <label className={labelClass}>
                    <FieldLabel>Concern or Reason for Session</FieldLabel>
                    <textarea
                      {...register("concern", { required: true })}
                      placeholder="Please describe your concern or reason for session."
                      className="min-h-[110px] w-full resize-none rounded-[12px] border border-[#E5DACC] bg-white p-4 text-[0.9rem] font-normal text-[#2E2925] outline-none transition placeholder:text-[#B5A99E] focus:border-[#365A43]"
                    />
                  </label>

                  <div className="grid gap-3">
                    <label className="flex cursor-pointer items-start gap-3 text-[0.82rem] leading-[1.55] text-[#6F6258]">
                      <button
                        type="button"
                        role="checkbox"
                        aria-checked={medicalDisclaimer}
                        onClick={() =>
                          setValue("medicalDisclaimer", !medicalDisclaimer, {
                            shouldValidate: true
                          })
                        }
                        className={cn(
                          "mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-[5px] border transition",
                          medicalDisclaimer
                            ? "border-[#365A43] bg-[#365A43] text-white"
                            : "border-[#C9B8A4] bg-white"
                        )}
                      >
                        {medicalDisclaimer ? <Check className="h-3 w-3" strokeWidth={3} /> : null}
                      </button>
                      <span>
                        I understand that Born to Blossom services are not a replacement for medical, psychiatric, or
                        psychological care and do not provide diagnosis or medical treatment.{" "}
                        <span className="text-[#C45C5C]">*</span>
                      </span>
                    </label>
                    <input
                      type="checkbox"
                      className="sr-only"
                      {...register("medicalDisclaimer", { required: true })}
                    />

                    <label className="flex cursor-pointer items-start gap-3 text-[0.82rem] leading-[1.55] text-[#6F6258]">
                      <button
                        type="button"
                        role="checkbox"
                        aria-checked={confidentiality}
                        onClick={() =>
                          setValue("confidentiality", !confidentiality, {
                            shouldValidate: true
                          })
                        }
                        className={cn(
                          "mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-[5px] border transition",
                          confidentiality
                            ? "border-[#365A43] bg-[#365A43] text-white"
                            : "border-[#C9B8A4] bg-white"
                        )}
                      >
                        {confidentiality ? <Check className="h-3 w-3" strokeWidth={3} /> : null}
                      </button>
                      <span>
                        I understand that my personal information and sharing will be kept confidential, except where
                        legally required. <span className="text-[#C45C5C]">*</span>
                      </span>
                    </label>
                    <input type="checkbox" className="sr-only" {...register("confidentiality", { required: true })} />

                    {(formState.errors.medicalDisclaimer || formState.errors.confidentiality) && (
                      <p className="text-[0.75rem] font-medium text-[#B45309]">Please agree to both statements to continue.</p>
                    )}
                  </div>

                  <div className="pt-1">
                    <Button className="w-full" type="submit">
                      {formState.isSubmitting ? "Opening WhatsApp..." : "Book Appointment"}{" "}
                      <Send className="h-4 w-4" />
                    </Button>
                    <p className="mt-2.5 text-center text-[0.72rem] text-[#9A8D82]">
                      You&apos;ll be redirected to WhatsApp to send your booking request.
                    </p>
                  </div>

                  {confirmedBooking ? (
                    <div className="rounded-[16px] border border-[#D8E8DC] bg-[#F4FAF5] p-4 md:p-5">
                      <p className="text-center text-[0.85rem] font-semibold text-[#2E2925]">
                        Send the message in WhatsApp, then save the session to your calendar.
                      </p>
                      <div className="mt-4 grid gap-3 sm:grid-cols-2">
                        <Button
                          type="button"
                          variant="secondary"
                          className="h-[48px] w-full text-[0.875rem] md:h-[52px]"
                          onClick={() =>
                            window.open(buildGoogleCalendarUrl(confirmedBooking), "_blank", "noopener,noreferrer")
                          }
                        >
                          <CalendarPlus className="h-4 w-4" />
                          Add to Google Calendar
                        </Button>
                        <Button
                          type="button"
                          variant="secondary"
                          className="h-[48px] w-full text-[0.875rem] md:h-[52px]"
                          onClick={() => downloadBookingIcs(confirmedBooking)}
                        >
                          <Download className="h-4 w-4" />
                          Download for Apple / Outlook
                        </Button>
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>

              <div className="hidden min-[1200px]:block">
                <HowItWorksCard />
              </div>
            </div>

            {/* Tablet: how it works below form */}
            <div className="mt-5 hidden md:block min-[1200px]:hidden">
              <HowItWorksCard />
            </div>
          </form>
        </div>
      </Container>
    </Section>
  );
}
