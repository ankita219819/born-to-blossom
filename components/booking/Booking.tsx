"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { CalendarPlus, ChevronLeft, ChevronRight, Download, Leaf, ShieldCheck } from "lucide-react";
import { bookingBenefits, bookingTimes, services } from "@/lib/content";
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
  email: string;
  phone: string;
  notes: string;
};

const BOOKING_MONTH_LABEL = "June 2026";
const BOOKING_YEAR = 2026;
const BOOKING_MONTH = 5;

export function Booking() {
  const { register, handleSubmit, formState } = useForm<BookingForm>();
  const [selectedDay, setSelectedDay] = useState(15);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [timeError, setTimeError] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<BookingDetails | null>(null);

  const onSubmit = (data: BookingForm) => {
    if (!selectedTime) {
      setTimeError(true);
      return;
    }

    const booking: BookingDetails = {
      ...data,
      day: selectedDay,
      month: BOOKING_MONTH,
      year: BOOKING_YEAR,
      time: selectedTime
    };

    setTimeError(false);
    setConfirmedBooking(booking);
    window.open(buildWhatsAppBookingUrl(booking), "_blank", "noopener,noreferrer");
  };

  return (
    <Section id="book-session">
      <Container>
        <div className="rounded-[28px] bg-[#EDE5D8] p-5 shadow-[0_20px_60px_rgba(0,0,0,0.07)] md:rounded-[36px] md:p-6 min-[1200px]:p-8">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6 min-[1200px]:flex-row min-[1200px]:gap-8">
              <div className="text-center min-[1200px]:w-[240px] min-[1200px]:shrink-0 min-[1200px]:text-left">
                <h2 className="font-display text-[1.85rem] font-medium leading-[1.1] tracking-[-0.03em] text-[#2E2925] md:text-[2.25rem] min-[1200px]:text-[2rem]">
                  Book Your Healing Session
                </h2>
                <div className="mt-6 grid gap-3 sm:grid-cols-2 min-[1200px]:mt-8 min-[1200px]:grid-cols-1">
                  {bookingBenefits.map((label) => (
                    <div
                      key={label}
                      className="flex items-center justify-center gap-2.5 text-[0.875rem] text-[#6F6258] min-[1200px]:justify-start"
                    >
                      <ShieldCheck className="h-4 w-4 shrink-0 text-[#365A43]" />
                      {label}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex-1 rounded-[24px] bg-[#FCF8F3] p-5 md:rounded-[28px] md:p-6 min-[1200px]:p-8">
                <div className="grid gap-6 min-[1200px]:grid-cols-[1fr_1.6fr_130px]">
                  <div className="grid content-start gap-3">
                    <label className="grid gap-1.5 text-[0.75rem] font-semibold uppercase tracking-[0.1em] text-[#9A8D82]">
                      Choose Service
                      <select
                        {...register("service", { required: true })}
                        className="h-[48px] rounded-[12px] border border-[#E5DACC] bg-white px-4 text-[0.9rem] font-normal text-[#2E2925] outline-none transition focus:border-[#365A43]"
                      >
                        <option value="">Select a service</option>
                        {services.map(({ title }) => (
                          <option key={title}>{title}</option>
                        ))}
                      </select>
                    </label>
                    {(
                      [
                        ["name", "Your Name", "Enter your name"],
                        ["email", "Email Address", "Enter your email"],
                        ["phone", "Phone Number", "Enter your phone"]
                      ] as const
                    ).map(([field, label, placeholder]) => (
                      <label
                        key={field}
                        className="grid gap-1.5 text-[0.75rem] font-semibold uppercase tracking-[0.1em] text-[#9A8D82]"
                      >
                        {label}
                        <input
                          {...register(field, { required: field !== "phone" })}
                          placeholder={placeholder}
                          className="h-[48px] rounded-[12px] border border-[#E5DACC] bg-white px-4 text-[0.9rem] font-normal text-[#2E2925] outline-none transition focus:border-[#365A43]"
                        />
                      </label>
                    ))}
                    <label className="grid gap-1.5 text-[0.75rem] font-semibold uppercase tracking-[0.1em] text-[#9A8D82]">
                      Notes (Optional)
                      <textarea
                        {...register("notes")}
                        placeholder="Share anything you'd like me to know."
                        className="min-h-[90px] resize-none rounded-[12px] border border-[#E5DACC] bg-white p-4 text-[0.9rem] font-normal text-[#2E2925] outline-none transition focus:border-[#365A43]"
                      />
                    </label>
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <button
                        type="button"
                        aria-label="Previous month"
                        className="grid h-6 w-6 place-items-center rounded-full transition hover:bg-[#F0EBE4]"
                      >
                        <ChevronLeft className="h-3 w-3 text-[#6F6258]" />
                      </button>
                      <h3 className="text-[0.8125rem] font-semibold text-[#2E2925]">{BOOKING_MONTH_LABEL}</h3>
                      <button
                        type="button"
                        aria-label="Next month"
                        className="grid h-6 w-6 place-items-center rounded-full transition hover:bg-[#F0EBE4]"
                      >
                        <ChevronRight className="h-3 w-3 text-[#6F6258]" />
                      </button>
                    </div>
                    <div className="mt-3 grid grid-cols-7 gap-px text-center text-[0.6rem] font-semibold uppercase tracking-[0.05em] text-[#9A8D82]">
                      {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((d) => (
                        <span key={d}>{d}</span>
                      ))}
                    </div>
                    <div className="mt-1 grid grid-cols-7">
                      {Array.from({ length: 35 }).map((_, index) => {
                        const day = index < 1 ? 31 + index : index;
                        const inMonth = index >= 1 && index <= 30;
                        return (
                          <button
                            type="button"
                            key={index}
                            onClick={() => inMonth && setSelectedDay(day)}
                            className={cn(
                              "grid h-7 w-full place-items-center rounded-full text-[0.75rem] font-medium transition",
                              !inMonth && "text-[#C8BDB5]",
                              selectedDay === day && inMonth
                                ? "bg-[#365A43] text-white"
                                : inMonth
                                  ? "hover:bg-[#F0EBE4]"
                                  : ""
                            )}
                          >
                            {day}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <h3 className="mb-3 text-[0.75rem] font-semibold uppercase tracking-[0.1em] text-[#9A8D82]">
                      Available Times
                    </h3>
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 min-[1200px]:grid-cols-1 min-[1200px]:gap-3">
                      {bookingTimes.map((time) => (
                        <button
                          key={time}
                          type="button"
                          onClick={() => {
                            setSelectedTime(time);
                            setTimeError(false);
                          }}
                          className={cn(
                            "rounded-[10px] px-2 py-1.5 text-left text-[0.875rem] font-medium transition md:text-[0.9rem]",
                            selectedTime === time
                              ? "bg-[#365A43] text-white"
                              : "text-[#2E2925] hover:bg-[#F0EBE4]"
                          )}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                    {timeError ? (
                      <p className="mt-2 text-[0.75rem] font-medium text-[#B45309]">Please select a time slot.</p>
                    ) : null}
                  </div>
                </div>

                <div className="mt-6">
                  <Button className="w-full" type="submit">
                    {formState.isSubmitting ? "Opening WhatsApp..." : "Book Appointment"}{" "}
                    <Leaf className="h-4 w-4" />
                  </Button>
                  <p className="mt-2 text-center text-[0.7rem] text-[#9A8D82]">
                    You&apos;ll be redirected to WhatsApp to send your booking request.
                  </p>

                  {confirmedBooking ? (
                    <div className="mt-5 rounded-[16px] border border-[#D8E8DC] bg-[#F4FAF5] p-4 md:p-5">
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
            </div>
          </form>
        </div>
      </Container>
    </Section>
  );
}
