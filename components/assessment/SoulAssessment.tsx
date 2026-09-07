"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Clock3,
  Flower2,
  Leaf,
  Lock,
  Printer,
  RotateCcw,
  Sparkles
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { contactInfo } from "@/lib/content";
import { dimensions, questions, type OptionId } from "@/lib/assessment-data";
import {
  answeredCount,
  scoreAssessment,
  type AnswerMap,
  type PrescribedModality
} from "@/lib/assessment-engine";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "btb-soul-assessment-v1";
const OPTION_LETTERS: OptionId[] = ["A", "B", "C", "D", "E"];

type Stage = "intro" | "quiz" | "result";

type SavedState = {
  name: string;
  answers: AnswerMap;
  stage: Stage;
  step: number;
  updatedAt: string;
};

function loadState(): SavedState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as SavedState;
    if (!parsed || typeof parsed !== "object" || !parsed.answers) return null;
    return parsed;
  } catch {
    return null;
  }
}

function saveState(state: SavedState) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* storage unavailable (private mode) — the assessment still works in-session */
  }
}

const tierCopy: Record<PrescribedModality["tier"], { label: string; className: string }> = {
  primary: {
    label: "Primary",
    className: "bg-[#365A43] text-white"
  },
  support: {
    label: "Secondary layer",
    className: "bg-[#E8F2EA] text-[#365A43]"
  },
  indicated: {
    label: "Also indicated",
    className: "bg-[#FCECEF] text-[#A8695A]"
  }
};

/* ── Shared bits ─────────────────────────────────────────────────────── */

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="eyebrow mb-4">{children}</p>;
}

function Meter({ label, share, numeral }: { label: string; share: number; numeral: string }) {
  const percent = Math.round(share * 100);
  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <p className="text-[0.9rem] font-medium text-[#2E2925]">
          <span className="mr-2 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-[#C69C6D]">
            {numeral}
          </span>
          {label}
        </p>
        <p className="text-[0.8rem] font-semibold tabular-nums text-[#6F6258]">{percent}%</p>
      </div>
      <div className="mt-2 h-[7px] w-full overflow-hidden rounded-full bg-[#EFE5DA]">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-[#365A43] to-[#7FA98B]"
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

/* ── Component ───────────────────────────────────────────────────────── */

export function SoulAssessment() {
  const [hydrated, setHydrated] = useState(false);
  const [stage, setStage] = useState<Stage>("intro");
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [hasSaved, setHasSaved] = useState(false);
  const [showIncomplete, setShowIncomplete] = useState(false);
  const topRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = loadState();
    if (saved) {
      setName(saved.name ?? "");
      setAnswers(saved.answers ?? {});
      setHasSaved(Object.keys(saved.answers ?? {}).length > 0);
      if (saved.stage === "result") setStage("intro");
      setStep(Math.min(Math.max(saved.step ?? 0, 0), dimensions.length - 1));
    }
    setHydrated(true);
  }, []);

  const persist = useCallback(
    (next: Partial<SavedState>) => {
      saveState({
        name,
        answers,
        stage,
        step,
        updatedAt: new Date().toISOString(),
        ...next
      });
    },
    [answers, name, stage, step]
  );

  const answered = answeredCount(answers);
  const progress = Math.round((answered / questions.length) * 100);

  const dimension = dimensions[step];
  const stepQuestions = useMemo(
    () => questions.filter((question) => question.dimension === dimension?.id),
    [dimension?.id]
  );
  const stepComplete = stepQuestions.every((question) => Boolean(answers[question.id]));

  const result = useMemo(
    () => (stage === "result" ? scoreAssessment(answers) : null),
    [answers, stage]
  );

  const scrollToTop = useCallback(() => {
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  function choose(questionId: number, optionId: OptionId) {
    const next = { ...answers, [questionId]: optionId };
    setAnswers(next);
    setHasSaved(true);
    setShowIncomplete(false);
    persist({ answers: next });
  }

  function begin(resume: boolean) {
    const nextAnswers = resume ? answers : {};
    const nextStep = resume ? step : 0;
    if (!resume) {
      setAnswers({});
      setStep(0);
    }
    setStage("quiz");
    persist({ answers: nextAnswers, step: nextStep, stage: "quiz" });
    requestAnimationFrame(scrollToTop);
  }

  function goNext() {
    if (!stepComplete) {
      setShowIncomplete(true);
      return;
    }
    if (step < dimensions.length - 1) {
      const nextStep = step + 1;
      setStep(nextStep);
      persist({ step: nextStep });
    } else {
      setStage("result");
      persist({ stage: "result" });
    }
    requestAnimationFrame(scrollToTop);
  }

  function goBack() {
    if (step === 0) {
      setStage("intro");
      persist({ stage: "intro" });
    } else {
      const nextStep = step - 1;
      setStep(nextStep);
      persist({ step: nextStep });
    }
    setShowIncomplete(false);
    requestAnimationFrame(scrollToTop);
  }

  function restart() {
    setAnswers({});
    setStep(0);
    setStage("intro");
    setHasSaved(false);
    saveState({ name, answers: {}, stage: "intro", step: 0, updatedAt: new Date().toISOString() });
    requestAnimationFrame(scrollToTop);
  }

  const whatsappHref = result
    ? `https://wa.me/${contactInfo.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
        `Namaste. I completed the Soul Assessment on borntoblossom.in.\n\nName: ${
          name || "—"
        }\nPrimary Soul Profile: ${result.primary.title}\nSecondary Layer: ${
          result.secondary.title
        }\n\nI would like to book a discovery call.`
      )}`
    : "#";

  return (
    <div ref={topRef} className="scroll-mt-28">
      {!hydrated ? (
        <Container className="section-pad section-pad-end">
          <div className="mx-auto h-[420px] max-w-3xl animate-pulse rounded-[28px] border border-[#EFE5DA] bg-[#FFFDFC]" />
        </Container>
      ) : (
        <AnimatePresence mode="wait">
          {stage === "intro" ? (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
            >
              <IntroView
                name={name}
                onNameChange={(value) => {
                  setName(value);
                  persist({ name: value });
                }}
                hasSaved={hasSaved}
                answered={answered}
                onStart={begin}
              />
            </motion.div>
          ) : null}

          {stage === "quiz" && dimension ? (
            <motion.div
              key={`quiz-${dimension.id}`}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <Container className="pb-16 pt-6 md:pb-24 md:pt-10">
                <div className="mx-auto max-w-3xl">
                  <div className="sticky top-0 z-30 -mx-4 mb-8 bg-[#FCF8F3]/92 px-4 py-4 backdrop-blur md:top-24 md:mx-0 md:rounded-[20px] md:border md:border-[#EFE5DA] md:bg-[#FFFDFC]/92 md:px-6">
                    <div className="flex items-center justify-between gap-4">
                      <p className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-[#C69C6D]">
                        Dimension {dimension.numeral} of V
                      </p>
                      <p className="text-[0.8rem] font-semibold tabular-nums text-[#6F6258]">
                        {answered}/{questions.length}
                      </p>
                    </div>
                    <div className="mt-3 h-[6px] w-full overflow-hidden rounded-full bg-[#EFE5DA]">
                      <motion.div
                        className="h-full rounded-full bg-[#365A43]"
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                      />
                    </div>
                  </div>

                  <h2 className="font-display text-[1.75rem] font-medium leading-[1.15] tracking-[-0.03em] text-[#2E2925] md:text-[2.25rem]">
                    {dimension.title}
                  </h2>
                  <p className="mt-3 text-[0.95rem] leading-[1.8] text-[#6F6258] md:text-[1rem]">
                    {dimension.intro}
                  </p>

                  <div className="mt-10 grid gap-8 md:mt-12 md:gap-10">
                    {stepQuestions.map((question, questionIndex) => (
                      <fieldset
                        key={question.id}
                        className="rounded-[22px] border border-[#EFE5DA] bg-[#FFFDFC] p-5 shadow-[0_10px_30px_rgba(30,20,10,0.05)] md:rounded-[26px] md:p-7"
                      >
                        <legend className="sr-only">{question.prompt}</legend>
                        <p className="flex gap-3 text-[1rem] font-medium leading-[1.55] text-[#2E2925] md:text-[1.0625rem]">
                          <span className="mt-[2px] shrink-0 font-display text-[1.05rem] text-[#C69C6D]">
                            Q{question.id}
                          </span>
                          <span>{question.prompt}</span>
                        </p>

                        <div className="mt-5 grid gap-2.5">
                          {question.options.map((option) => {
                            const selected = answers[question.id] === option.id;
                            return (
                              <label
                                key={option.id}
                                className={cn(
                                  "group flex cursor-pointer items-start gap-3 rounded-[16px] border p-3.5 transition-all duration-200 md:gap-4 md:p-4",
                                  selected
                                    ? "border-[#365A43] bg-[#E8F2EA] shadow-[0_8px_20px_rgba(54,90,67,0.12)]"
                                    : "border-[#EFE5DA] bg-[#FCF8F3] hover:border-[#C69C6D] hover:bg-[#F8F3ED]"
                                )}
                              >
                                <input
                                  type="radio"
                                  name={`question-${question.id}`}
                                  value={option.id}
                                  checked={selected}
                                  onChange={() => choose(question.id, option.id)}
                                  className="sr-only"
                                />
                                <span
                                  aria-hidden
                                  className={cn(
                                    "mt-[1px] grid h-7 w-7 shrink-0 place-items-center rounded-full border text-[0.75rem] font-semibold transition",
                                    selected
                                      ? "border-[#365A43] bg-[#365A43] text-white"
                                      : "border-[#DCCDBE] bg-white text-[#9A8D82] group-hover:border-[#C69C6D]"
                                  )}
                                >
                                  {selected ? <Check className="h-4 w-4" /> : option.id}
                                </span>
                                <span
                                  className={cn(
                                    "text-[0.9375rem] leading-[1.65] md:text-[0.975rem]",
                                    selected ? "text-[#2E2925]" : "text-[#6F6258]"
                                  )}
                                >
                                  {option.text}
                                </span>
                              </label>
                            );
                          })}
                        </div>

                        {showIncomplete && !answers[question.id] ? (
                          <p className="mt-3 text-[0.82rem] font-medium text-[#B4635A]">
                            Please choose the response that resonates most.
                          </p>
                        ) : null}
                        <span className="sr-only">
                          Question {questionIndex + 1} of {stepQuestions.length}
                        </span>
                      </fieldset>
                    ))}
                  </div>

                  <div className="mt-10 flex flex-col-reverse gap-3 md:mt-12 md:flex-row md:items-center md:justify-between">
                    <button
                      type="button"
                      onClick={goBack}
                      className="inline-flex h-[52px] items-center justify-center gap-2 rounded-full border border-[#DCCDBE] bg-white px-6 text-[0.9375rem] font-semibold text-[#365A43] transition hover:border-[#365A43]"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      {step === 0 ? "Back to start" : `Dimension ${dimensions[step - 1].numeral}`}
                    </button>
                    <Button onClick={goNext} className="w-full md:w-auto">
                      {step === dimensions.length - 1
                        ? "Reveal my Soul Prescription"
                        : `Continue to Dimension ${dimensions[step + 1].numeral}`}
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>

                  <p className="mt-6 flex items-center justify-center gap-2 text-center text-[0.78rem] text-[#9A8D82]">
                    <Lock className="h-3.5 w-3.5" />
                    Your answers are saved only on this device. Nothing is transmitted.
                  </p>
                </div>
              </Container>
            </motion.div>
          ) : null}

          {stage === "result" && result ? (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <ResultView
                name={name}
                result={result}
                whatsappHref={whatsappHref}
                onRestart={restart}
                onReview={() => {
                  setStage("quiz");
                  setStep(0);
                  persist({ stage: "quiz", step: 0 });
                  requestAnimationFrame(scrollToTop);
                }}
              />
            </motion.div>
          ) : null}
        </AnimatePresence>
      )}
    </div>
  );
}

/* ── Intro ───────────────────────────────────────────────────────────── */

function IntroView({
  name,
  onNameChange,
  hasSaved,
  answered,
  onStart
}: {
  name: string;
  onNameChange: (value: string) => void;
  hasSaved: boolean;
  answered: number;
  onStart: (resume: boolean) => void;
}) {
  return (
    <Container className="pb-16 pt-6 md:pb-24 md:pt-10">
      <div className="mx-auto max-w-4xl">
        <div className="relative overflow-hidden rounded-[28px] border border-[#EFE5DA] bg-[#FFFDFC] p-6 shadow-[0_24px_70px_rgba(54,90,67,0.12)] md:rounded-[36px] md:p-12">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[#FCECEF] blur-3xl"
          />
          <div className="relative">
            <Eyebrow>Lasoma Soul Family Assessment</Eyebrow>
            <h1 className="font-display text-[2.1rem] font-medium leading-[1.1] tracking-[-0.04em] text-[#2E2925] md:text-[3rem] xl:text-[3.5rem]">
              A compassionate mirror for your inner world
            </h1>
            <p className="mt-5 text-[1rem] leading-[1.85] text-[#6F6258] md:mt-6 md:text-[1.0625rem]">
              Twenty-five intuitive questions across the five fundamental dimensions of human
              experience — body, heart, subconscious mind, ancestral lineage, and soul purpose.
              There are no right or wrong answers. Choose the option that most deeply resonates
              with your current reality, and your personalised Prescription of Soul Journey appears
              the moment you finish.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {[
                [Clock3, "10–12 minutes", "25 questions, five dimensions"],
                [Sparkles, "Instant result", "Your prescription renders immediately"],
                [Lock, "Private by design", "Saved on your device only"]
              ].map(([Icon, title, copy]) => {
                const IconComponent = Icon as typeof Clock3;
                return (
                  <div
                    key={title as string}
                    className="rounded-[18px] border border-[#EFE5DA] bg-[#FCF8F3] p-4"
                  >
                    <IconComponent className="h-5 w-5 text-[#365A43]" />
                    <p className="mt-3 text-[0.9375rem] font-semibold text-[#2E2925]">
                      {title as string}
                    </p>
                    <p className="mt-1 text-[0.82rem] leading-[1.6] text-[#6F6258]">
                      {copy as string}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 md:mt-10">
              <label
                htmlFor="assessment-name"
                className="block text-[0.82rem] font-semibold uppercase tracking-[0.12em] text-[#9A8D82]"
              >
                Your name (optional)
              </label>
              <input
                id="assessment-name"
                type="text"
                value={name}
                onChange={(event) => onNameChange(event.target.value)}
                placeholder="So your prescription can be addressed to you"
                autoComplete="given-name"
                className="mt-2 h-[54px] w-full rounded-[14px] border border-[#EFE5DA] bg-[#FCF8F3] px-4 text-[0.975rem] text-[#2E2925] outline-none transition placeholder:text-[#B6AA9F] focus:border-[#365A43] focus:bg-white"
              />
            </div>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button onClick={() => onStart(false)} className="w-full sm:w-auto">
                {hasSaved ? "Start fresh" : "Begin the assessment"}
                <Flower2 className="h-4 w-4" />
              </Button>
              {hasSaved && answered > 0 ? (
                <button
                  type="button"
                  onClick={() => onStart(true)}
                  className="inline-flex h-[52px] items-center justify-center gap-2 rounded-full border border-[#DCCDBE] bg-white px-6 text-[0.9375rem] font-semibold text-[#365A43] transition hover:-translate-y-0.5 hover:border-[#365A43] md:h-[56px]"
                >
                  Resume — {answered}/{questions.length} answered
                  <ArrowRight className="h-4 w-4" />
                </button>
              ) : null}
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-3 md:mt-10 md:grid-cols-5">
          {dimensions.map((dimension) => (
            <div
              key={dimension.id}
              className="rounded-[18px] border border-[#EFE5DA] bg-[#FFFDFC] p-4 md:p-5"
            >
              <p className="font-display text-[1.4rem] text-[#C69C6D]">{dimension.numeral}</p>
              <p className="mt-1 text-[0.9rem] font-semibold leading-[1.4] text-[#2E2925]">
                {dimension.shortTitle}
              </p>
              <p className="mt-2 text-[0.78rem] leading-[1.6] text-[#9A8D82]">
                Questions {dimension.questionIds[0]}–
                {dimension.questionIds[dimension.questionIds.length - 1]}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}

/* ── Result ──────────────────────────────────────────────────────────── */

function ResultView({
  name,
  result,
  whatsappHref,
  onRestart,
  onReview
}: {
  name: string;
  result: NonNullable<ReturnType<typeof scoreAssessment>>;
  whatsappHref: string;
  onRestart: () => void;
  onReview: () => void;
}) {
  const date = new Date(result.generatedAt).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric"
  });

  return (
    <Container className="pb-16 pt-6 md:pb-24 md:pt-10">
      <div className="mx-auto max-w-5xl" id="soul-prescription">
        {/* Header */}
        <div className="relative overflow-hidden rounded-[28px] border border-[#EFE5DA] bg-gradient-to-br from-[#365A43] to-[#2D4B37] p-6 text-white shadow-[0_24px_70px_rgba(54,90,67,0.22)] md:rounded-[36px] md:p-12">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-white/10 blur-3xl"
          />
          <div className="relative">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[#E8CFAE]">
              Prescription of Soul Journey, Soul Growth &amp; Soul Awakening
            </p>
            <h1 className="mt-4 font-display text-[2.1rem] font-medium leading-[1.1] tracking-[-0.03em] md:text-[3.1rem]">
              {result.primary.title}
            </h1>
            <p className="mt-4 max-w-2xl text-[1rem] leading-[1.85] text-white/85 md:text-[1.0625rem]">
              {result.primary.essence}
            </p>

            <dl className="mt-8 grid gap-4 border-t border-white/15 pt-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                ["Prepared for", name || "Beloved soul"],
                ["Date of assessment", date],
                ["Secondary layer", result.secondary.title],
                ["Lead dimension", result.leadDimension.shortTitle]
              ].map(([label, value]) => (
                <div key={label}>
                  <dt className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-[#E8CFAE]">
                    {label}
                  </dt>
                  <dd className="mt-1.5 text-[0.95rem] font-medium leading-[1.5]">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className="mt-6 grid gap-6 md:mt-8 lg:grid-cols-[1.55fr_1fr]">
          {/* Left column */}
          <div className="grid gap-6">
            <section className="rounded-[24px] border border-[#EFE5DA] bg-[#FFFDFC] p-6 shadow-[0_10px_30px_rgba(30,20,10,0.05)] md:rounded-[28px] md:p-8">
              <Eyebrow>1 · Your soul landscape diagnosis</Eyebrow>
              <p className="text-[1rem] leading-[1.85] text-[#6F6258] md:text-[1.0625rem]">
                Your responses cluster most densely in{" "}
                <strong className="font-semibold text-[#2E2925]">
                  {result.leadDimension.title}
                </strong>
                , which places your primary blueprint as{" "}
                <strong className="font-semibold text-[#2E2925]">{result.primary.title}</strong>.
                Beneath it runs a secondary layer of{" "}
                <strong className="font-semibold text-[#2E2925]">{result.secondary.title}</strong> —
                the pattern that will surface once the first layer softens.
              </p>
              <p className="mt-4 text-[1rem] leading-[1.85] text-[#6F6258] md:text-[1.0625rem]">
                {result.primary.rootMechanism} This is not a character flaw and it is not
                permanent. It is a mechanism — and mechanisms respond to the right sequence of
                work, applied in the right order.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {result.primary.manifestation.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-[#EFE5DA] bg-[#FCF8F3] px-3.5 py-1.5 text-[0.8rem] font-medium text-[#6F6258]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </section>

            <section className="rounded-[24px] border border-[#EFE5DA] bg-[#FFFDFC] p-6 shadow-[0_10px_30px_rgba(30,20,10,0.05)] md:rounded-[28px] md:p-8">
              <Eyebrow>2 · Prescribed healing modalities</Eyebrow>
              <div className="grid gap-3">
                {result.prescription.map((modality) => (
                  <Link
                    key={modality.key}
                    href={`/services/${modality.key}`}
                    className="group flex flex-col gap-2 rounded-[18px] border border-[#EFE5DA] bg-[#FCF8F3] p-4 transition hover:-translate-y-0.5 hover:border-[#365A43] hover:bg-white md:p-5"
                  >
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span
                        className={cn(
                          "rounded-full px-2.5 py-1 text-[0.66rem] font-semibold uppercase tracking-[0.1em]",
                          tierCopy[modality.tier].className
                        )}
                      >
                        {tierCopy[modality.tier].label}
                      </span>
                      <span className="text-[0.72rem] font-medium uppercase tracking-[0.1em] text-[#9A8D82]">
                        {modality.category}
                      </span>
                    </div>
                    <p className="font-display text-[1.25rem] leading-tight text-[#2E2925] transition group-hover:text-[#365A43] md:text-[1.4rem]">
                      {modality.name}
                    </p>
                    <p className="text-[0.9rem] leading-[1.7] text-[#6F6258]">
                      {modality.mechanism}
                    </p>
                    <p className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-[0.82rem] font-semibold text-[#365A43]">
                      <span>Dosage · {modality.dosage}</span>
                      <span className="font-medium text-[#9A8D82]">{modality.format}</span>
                      <span className="inline-flex items-center gap-1 opacity-0 transition group-hover:opacity-100">
                        Explore <ArrowRight className="h-3.5 w-3.5" />
                      </span>
                    </p>
                  </Link>
                ))}
              </div>
            </section>

            <section className="rounded-[24px] border border-[#EFE5DA] bg-[#FFFDFC] p-6 shadow-[0_10px_30px_rgba(30,20,10,0.05)] md:rounded-[28px] md:p-8">
              <Eyebrow>3 · Your customised session sequencing arc</Eyebrow>
              <ol className="relative grid gap-6 border-l border-[#EFE5DA] pl-6">
                {result.arc.map((phase) => (
                  <li key={phase.phase} className="relative">
                    <span
                      aria-hidden
                      className="absolute -left-[31px] top-1.5 grid h-[18px] w-[18px] place-items-center rounded-full border-2 border-[#365A43] bg-[#FCF8F3]"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-[#365A43]" />
                    </span>
                    <p className="text-[0.72rem] font-semibold uppercase tracking-[0.13em] text-[#C69C6D]">
                      {phase.phase}
                    </p>
                    <p className="mt-1.5 text-[0.975rem] leading-[1.7] text-[#2E2925]">
                      {phase.focus}
                    </p>
                  </li>
                ))}
              </ol>
            </section>
          </div>

          {/* Right column */}
          <div className="grid content-start gap-6">
            <section className="rounded-[24px] border border-[#EFE5DA] bg-[#FFFDFC] p-6 shadow-[0_10px_30px_rgba(30,20,10,0.05)] md:rounded-[28px] md:p-7">
              <Eyebrow>Your five dimensions</Eyebrow>
              <div className="grid gap-4">
                {result.dimensionScores.map((dimensionScore) => (
                  <Meter
                    key={dimensionScore.id}
                    label={dimensionScore.shortTitle}
                    numeral={dimensionScore.numeral}
                    share={dimensionScore.share}
                  />
                ))}
              </div>
              <p className="mt-5 text-[0.82rem] leading-[1.7] text-[#9A8D82]">
                Density across your responses, not a score. A higher band simply means that plane
                is speaking loudest right now.
              </p>
            </section>

            <section className="rounded-[24px] border border-[#EFE5DA] bg-[#E8F2EA] p-6 md:rounded-[28px] md:p-7">
              <Eyebrow>4 · Daily soul integration toolkit</Eyebrow>
              <ul className="grid gap-3">
                {result.dailyTools.map((tool) => (
                  <li key={tool} className="flex gap-3 text-[0.9375rem] leading-[1.7] text-[#2E2925]">
                    <Leaf className="mt-1 h-4 w-4 shrink-0 text-[#365A43]" />
                    <span>{tool}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="rounded-[24px] border border-[#EFE5DA] bg-[#FFFDFC] p-6 md:rounded-[28px] md:p-7">
              <Eyebrow>Secondary layer</Eyebrow>
              <p className="font-display text-[1.4rem] leading-tight text-[#2E2925]">
                {result.secondary.title}
              </p>
              <p className="mt-3 text-[0.9rem] leading-[1.75] text-[#6F6258]">
                {result.secondary.essence}
              </p>
            </section>

            <section className="rounded-[24px] border border-[#E8CFAE] bg-[#FCF8F3] p-6 text-center md:rounded-[28px] md:p-7">
              <p className="font-display text-[1.25rem] italic leading-[1.5] text-[#365A43] md:text-[1.4rem]">
                “{result.primary.mantra}”
              </p>
              <p className="mt-4 text-[0.8rem] uppercase tracking-[0.14em] text-[#9A8D82]">
                Blessing &amp; sacred dedication
              </p>
            </section>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-6 rounded-[24px] border border-[#EFE5DA] bg-[#FFFDFC] p-6 shadow-[0_10px_30px_rgba(30,20,10,0.05)] md:mt-8 md:rounded-[28px] md:p-10">
          <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr] lg:items-center">
            <div>
              <h2 className="font-display text-[1.75rem] font-medium leading-[1.15] tracking-[-0.03em] text-[#2E2925] md:text-[2.25rem]">
                Walk this prescription with a guide
              </h2>
              <p className="mt-3 text-[0.975rem] leading-[1.8] text-[#6F6258] md:text-[1rem]">
                This reading is a compassionate map, not a medical diagnosis. In a discovery call,
                Sonia refines it into your exact session sequence — and confirms where to begin.
              </p>
            </div>
            <div className="grid gap-3">
              <Button href="/#book-session" className="w-full">
                Book a discovery call <Leaf className="h-4 w-4" />
              </Button>
              <Button
                href={whatsappHref}
                variant="secondary"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full"
              >
                Send my result on WhatsApp
              </Button>
            </div>
          </div>

          <div className="mt-7 flex flex-wrap gap-3 border-t border-[#EFE5DA] pt-6 print:hidden">
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex h-[46px] items-center gap-2 rounded-full border border-[#DCCDBE] bg-white px-5 text-[0.875rem] font-semibold text-[#365A43] transition hover:border-[#365A43]"
            >
              <Printer className="h-4 w-4" /> Save as PDF
            </button>
            <button
              type="button"
              onClick={onReview}
              className="inline-flex h-[46px] items-center gap-2 rounded-full border border-[#DCCDBE] bg-white px-5 text-[0.875rem] font-semibold text-[#365A43] transition hover:border-[#365A43]"
            >
              <ArrowLeft className="h-4 w-4" /> Review my answers
            </button>
            <button
              type="button"
              onClick={onRestart}
              className="inline-flex h-[46px] items-center gap-2 rounded-full border border-[#DCCDBE] bg-white px-5 text-[0.875rem] font-semibold text-[#9A8D82] transition hover:border-[#C79072] hover:text-[#C79072]"
            >
              <RotateCcw className="h-4 w-4" /> Start over
            </button>
          </div>
        </div>
      </div>
    </Container>
  );
}
