"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  BarChart3,
  Clock3,
  Compass,
  Flower2,
  HeartHandshake,
  Lock,
  Mail,
  Radar,
  Sparkles,
  Timer
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import {
  AssessmentDialog,
  loadAssessmentState
} from "@/components/assessment/AssessmentDialog";
import { answeredCount, isComplete } from "@/lib/assessment-engine";
import { chakras, disclaimer, domains } from "@/lib/assessment-data";

const receives = [
  { icon: Sparkles, title: "Overall Soul Alignment Score", copy: "One percentage — a weather report for your inner world, not a verdict." },
  { icon: Radar, title: "Soul Family Wheel", copy: "All seven life areas plotted on one chart, so you see your unique shape at a glance." },
  { icon: Flower2, title: "Chakra Balance Map", copy: "Your seven energy centres, and the organs linked to each." },
  { icon: Compass, title: "S.O.S. Priority Area", copy: "The one area quietly asking for the most care right now." },
  { icon: Timer, title: "Healing Timeline", copy: "A realistic, encouraging estimate of how long focused work tends to take." },
  { icon: BarChart3, title: "Your Soul Profile", copy: "An affirming description of your pattern, including your natural strengths." },
  { icon: Mail, title: "A Personal Letter", copy: "Addressed to you by name and signed by Sonia and the Born to Blossom team." },
  { icon: HeartHandshake, title: "Your Recommended Next Step", copy: "The one modality most likely to help you next — not a list of twenty." }
];

export function SoulAssessment() {
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState<{ answered: number; complete: boolean }>({
    answered: 0,
    complete: false
  });
  const openerRef = useRef<HTMLElement | null>(null);

  const refreshProgress = useCallback(() => {
    const saved = loadAssessmentState();
    setProgress({
      answered: saved ? answeredCount(saved.answers) : 0,
      complete: saved ? isComplete(saved.answers) : false
    });
  }, []);

  const openDialog = useCallback(() => {
    openerRef.current = document.activeElement as HTMLElement | null;
    setOpen(true);
  }, []);

  const closeDialog = useCallback(() => {
    setOpen(false);
    refreshProgress();
    requestAnimationFrame(() => openerRef.current?.focus?.());
  }, [refreshProgress]);

  useEffect(() => {
    refreshProgress();
    if (new URLSearchParams(window.location.search).get("start") === "1") {
      setOpen(true);
    }
  }, [refreshProgress]);

  const ctaLabel = progress.complete
    ? "View my Prescription"
    : progress.answered > 0
      ? `Continue — ${progress.answered}/37 answered`
      : "Begin the assessment";

  return (
    <>
      <Container className="pb-16 pt-6 md:pb-24 md:pt-10">
        <div className="mx-auto max-w-4xl">
          {/* Intro */}
          <div className="relative overflow-hidden rounded-[28px] border border-[#EFE5DA] bg-[#FFFDFC] p-6 shadow-[0_24px_70px_rgba(54,90,67,0.12)] md:rounded-[36px] md:p-12">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[#FCECEF] blur-3xl"
            />
            <div className="relative">
              <p className="eyebrow mb-4">The Lasoma Soul Family Assessment</p>
              <h1 className="font-display text-[2.1rem] font-medium leading-[1.1] tracking-[-0.04em] text-[#2E2925] md:text-[3rem] xl:text-[3.5rem]">
                Heal. Release. Reclaim. Blossom.
              </h1>
              <p className="mt-5 text-[1rem] leading-[1.85] text-[#6F6258] md:mt-6 md:text-[1.0625rem]">
                A soul-family self-assessment across body, mind, money, relationships, ancestry, career and spirit —
                with a personalised Prescription of Soul Journey. There are no right or wrong answers; simply pick the
                option that feels closest to true for you, right now.
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {[
                  [Clock3, "15–20 minutes", "37 questions, one at a time"],
                  [Sparkles, "Instant result", "Your prescription appears the moment you finish"],
                  [Lock, "Private by design", "Saved on your device only"]
                ].map(([Icon, title, copy]) => {
                  const IconComponent = Icon as typeof Clock3;
                  return (
                    <div key={title as string} className="rounded-[18px] border border-[#EFE5DA] bg-[#FCF8F3] p-4">
                      <IconComponent className="h-5 w-5 text-[#365A43]" />
                      <p className="mt-2 text-[0.95rem] font-semibold text-[#2E2925]">{title as string}</p>
                      <p className="mt-1 text-[0.82rem] leading-[1.6] text-[#6F6258]">{copy as string}</p>
                    </div>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={openDialog}
                className="button-ripple mt-8 inline-flex min-h-[56px] w-full items-center justify-center gap-2 rounded-full bg-[#365A43] px-8 text-[1rem] font-semibold text-white shadow-[0_12px_28px_rgba(54,90,67,0.22)] transition hover:-translate-y-0.5 hover:bg-[#2D4B37] focus:outline-none focus:ring-2 focus:ring-[#365A43] focus:ring-offset-2 sm:w-auto"
              >
                <span className="relative z-10 inline-flex items-center gap-2">
                  {ctaLabel} <ArrowRight className="h-4 w-4" />
                </span>
              </button>
              <p className="mt-4 text-[0.78rem] leading-[1.7] text-[#9A8D82]">{disclaimer}</p>
            </div>
          </div>

          {/* Where this comes from */}
          <section className="mt-6 rounded-[24px] border border-[#EFE5DA] bg-[#FFFDFC] p-6 md:mt-8 md:rounded-[28px] md:p-9">
            <p className="eyebrow mb-3">Where this comes from</p>
            <p className="text-[0.975rem] leading-[1.85] text-[#6F6258] md:text-[1rem]">
              This assessment is built on well-known mind-body research and the ancient wisdom of the chakra system,
              woven together. It draws on ideas from <em>The Body Keeps the Score</em> (how the body stores what the
              mind can&apos;t always express), <em>It Didn&apos;t Start With You</em> (how family patterns pass down
              through generations), and the seven-chakra tradition — which teaches that specific life themes and even
              specific organs are connected to specific energy centres in the body.
            </p>
          </section>

          {/* Seven areas + chakras */}
          <section className="mt-6 rounded-[24px] border border-[#EFE5DA] bg-[#FFFDFC] p-6 md:mt-8 md:rounded-[28px] md:p-9">
            <p className="eyebrow mb-3">Seven soul-family areas</p>
            <ul className="grid gap-3 sm:grid-cols-2">
              {domains.map((domain) => (
                <li key={domain.id} className="flex gap-3 rounded-[18px] border border-[#EFE5DA] bg-[#FCF8F3] p-4">
                  <span aria-hidden className="text-[1.4rem] leading-none">
                    {domain.emoji}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[0.95rem] font-semibold text-[#2E2925]">{domain.name}</span>
                    <span className="mt-0.5 block text-[0.82rem] leading-[1.6] text-[#6F6258]">{domain.blurb}</span>
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-[0.9rem] leading-[1.8] text-[#6F6258]">
              Followed by a short <strong className="font-semibold text-[#365A43]">Chakra &amp; Body Wisdom</strong>{" "}
              section — {chakras.length} questions that ask you to sense into your body directly, from Root to Crown.
            </p>
          </section>

          {/* What you receive */}
          <section className="mt-6 rounded-[24px] border border-[#EFE5DA] bg-[#FFFDFC] p-6 md:mt-8 md:rounded-[28px] md:p-9">
            <p className="eyebrow mb-3">What you&apos;ll receive</p>
            <h2 className="font-display text-[1.75rem] font-medium leading-[1.15] tracking-[-0.03em] text-[#2E2925] md:text-[2.25rem]">
              Your Prescription of Soul Journey
            </h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {receives.map(({ icon: Icon, title, copy }, index) => (
                <li key={title} className="flex gap-3.5 rounded-[18px] border border-[#EFE5DA] bg-[#FCF8F3] p-4">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#E8F2EA] text-[#365A43]">
                    <Icon className="h-[18px] w-[18px]" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[0.95rem] font-semibold text-[#2E2925]">
                      <span className="mr-1.5 text-[0.72rem] tabular-nums text-[#C69C6D]">{index + 1}.</span>
                      {title}
                    </span>
                    <span className="mt-0.5 block text-[0.82rem] leading-[1.6] text-[#6F6258]">{copy}</span>
                  </span>
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={openDialog}
              className="mt-7 inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-full border border-[#DCCDBE] bg-white px-7 text-[0.95rem] font-semibold text-[#365A43] transition hover:-translate-y-0.5 hover:border-[#365A43] focus:outline-none focus:ring-2 focus:ring-[#365A43] focus:ring-offset-2 sm:w-auto"
            >
              {ctaLabel} <ArrowRight className="h-4 w-4" />
            </button>
          </section>
        </div>
      </Container>

      {open && <AssessmentDialog onClose={closeDialog} />}
    </>
  );
}
