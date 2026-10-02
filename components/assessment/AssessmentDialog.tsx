"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Clock3, Lock, Sparkles, X } from "lucide-react";
import { AssessmentResults } from "@/components/assessment/AssessmentResults";
import {
  chakraById,
  disclaimer,
  domainById,
  questions,
  quizSections,
  type AssessmentQuestion,
  type OptionId
} from "@/lib/assessment-data";
import { answeredCount, isComplete, scoreAssessment, type AnswerMap } from "@/lib/assessment-engine";

export const ASSESSMENT_STORAGE_KEY = "btb-soul-assessment-v2";

type Stage = "intro" | "quiz" | "finish" | "result";

type SavedState = {
  name: string;
  answers: AnswerMap;
  stage: Stage;
  step: number;
};

export function loadAssessmentState(): SavedState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(ASSESSMENT_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as SavedState;
    if (!parsed || typeof parsed !== "object" || typeof parsed.answers !== "object" || !parsed.answers) return null;
    const answers: AnswerMap = {};
    for (const question of questions) {
      const value = (parsed.answers as Record<string, unknown>)[String(question.id)];
      if (question.options.some((option) => option.id === value)) answers[question.id] = value as OptionId;
    }
    return {
      name: typeof parsed.name === "string" ? parsed.name.slice(0, 60) : "",
      answers,
      stage: parsed.stage,
      step: typeof parsed.step === "number" ? parsed.step : 0
    };
  } catch {
    return null;
  }
}

function saveState(state: SavedState) {
  try {
    window.localStorage.setItem(ASSESSMENT_STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* storage unavailable (private mode) — the assessment still works in-session */
  }
}

function clearState() {
  try {
    window.localStorage.removeItem(ASSESSMENT_STORAGE_KEY);
  } catch {
    /* ignore */
  }
}

/* ── Step sequence ───────────────────────────────────────────────────── */

type Step =
  | { kind: "question"; question: AssessmentQuestion; sectionIndex: number; number: number }
  | { kind: "breath"; sectionIndex: number };

const questionById = new Map(questions.map((question) => [question.id, question]));

const steps: Step[] = quizSections.flatMap((section, sectionIndex) => {
  const out: Step[] = section.questionIds.map((id) => ({
    kind: "question" as const,
    question: questionById.get(id)!,
    sectionIndex,
    number: id
  }));
  if (section.breath) out.push({ kind: "breath", sectionIndex });
  return out;
});

const TOTAL = questions.length;

function firstUnansweredStep(answers: AnswerMap) {
  const index = steps.findIndex((step) => step.kind === "question" && !answers[step.question.id]);
  return index === -1 ? steps.length - 1 : index;
}

/* ── Dialog ──────────────────────────────────────────────────────────── */

export function AssessmentDialog({ onClose }: { onClose: () => void }) {
  const [initial] = useState(loadAssessmentState);
  const [name, setName] = useState(initial?.name ?? "");
  const [answers, setAnswers] = useState<AnswerMap>(initial?.answers ?? {});
  const [stage, setStage] = useState<Stage>(() => {
    if (initial && isComplete(initial.answers) && initial.stage === "result") return "result";
    return "intro";
  });
  const [step, setStep] = useState(() => (initial ? firstUnansweredStep(initial.answers) : 0));
  const [direction, setDirection] = useState<1 | -1>(1);
  const [nameError, setNameError] = useState(false);

  const panelRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const lockRef = useRef(false);
  const timerRef = useRef<number | null>(null);

  const answered = answeredCount(answers);
  const result = useMemo(
    () => (stage === "result" ? scoreAssessment(answers, name) : null),
    [stage, answers, name]
  );

  /* Persist progress. */
  useEffect(() => {
    saveState({ name, answers, stage, step });
  }, [name, answers, stage, step]);

  /* Lock page scroll while open. */
  useEffect(() => {
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = overflow;
    };
  }, []);

  useEffect(
    () => () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    },
    []
  );

  /* Each screen's heading takes focus on mount and resets the scroll position. */
  const screenKey = stage === "quiz" ? `q${step}` : stage;
  const headingRef = useCallback((element: HTMLHeadingElement | null) => {
    if (!element) return;
    scrollRef.current?.scrollTo({ top: 0 });
    element.focus({ preventScroll: true });
  }, []);
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 });
  }, [screenKey]);

  const go = useCallback(
    (delta: 1 | -1) => {
      setDirection(delta);
      const next = step + delta;
      if (next >= steps.length) setStage("finish");
      else if (next < 0) setStage("intro");
      else setStep(next);
    },
    [step]
  );

  const choose = useCallback(
    (question: AssessmentQuestion, option: OptionId) => {
      if (lockRef.current) return;
      lockRef.current = true;
      setAnswers((prev) => ({ ...prev, [question.id]: option }));
      timerRef.current = window.setTimeout(() => {
        lockRef.current = false;
        go(1);
      }, 280);
    },
    [go]
  );

  const back = useCallback(() => {
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
      lockRef.current = false;
    }
    if (stage === "finish") {
      setDirection(-1);
      setStage("quiz");
      setStep(steps.length - 1);
      return;
    }
    if (stage === "quiz") go(-1);
  }, [go, stage]);

  const begin = useCallback(
    (resume: boolean) => {
      if (!name.trim()) {
        setNameError(true);
        nameRef.current?.focus();
        return;
      }
      setNameError(false);
      setDirection(1);
      setStep(resume ? firstUnansweredStep(answers) : 0);
      setStage("quiz");
    },
    [answers, name]
  );

  const restart = useCallback(() => {
    clearState();
    setAnswers({});
    setStep(0);
    setDirection(1);
    setStage("intro");
  }, []);

  /* Keyboard: Esc closes, A–E / 1–5 pick an option, Tab is trapped. */
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key === "Tab" && panelRef.current) {
        const focusable = panelRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        const active = document.activeElement;
        if (event.shiftKey && (active === first || !panelRef.current.contains(active))) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && (active === last || !panelRef.current.contains(active))) {
          event.preventDefault();
          first.focus();
        }
        return;
      }

      if (stage !== "quiz" || event.metaKey || event.ctrlKey || event.altKey) return;
      const target = event.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA")) return;
      const current = steps[step];
      if (current?.kind !== "question") return;
      const key = event.key.toUpperCase();
      const index = "ABCDE".includes(key) && key.length === 1 ? "ABCDE".indexOf(key) : "12345".indexOf(key);
      if (index >= 0 && index < current.question.options.length) {
        event.preventDefault();
        choose(current.question, current.question.options[index].id);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [choose, onClose, stage, step]);

  const current = steps[step];
  const isResult = stage === "result" && result;
  const progress =
    stage === "finish"
      ? 1
      : stage === "quiz" && current
        ? current.kind === "question"
          ? (current.number - 1) / TOTAL
          : Math.max(...quizSections[current.sectionIndex].questionIds) / TOTAL
        : 0;
  const counter = stage === "quiz" && current?.kind === "question" ? `${current.number}/${TOTAL}` : null;

  const dark = !isResult;

  return (
    <MotionConfig reducedMotion="user">
      <div className="fixed inset-0 z-[100] flex items-stretch justify-center sm:items-center sm:p-6">
        <motion.div
          aria-hidden
          className="absolute inset-0 bg-[#0B1A12]/70 backdrop-blur-[3px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.25 }}
        />

        <motion.div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Lasoma Soul Family Assessment"
          tabIndex={-1}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          className={`relative flex h-[100dvh] w-full flex-col overflow-hidden outline-none sm:h-[min(860px,92dvh)] sm:rounded-[32px] sm:border sm:shadow-[0_40px_120px_rgba(0,0,0,0.45)] ${
            isResult
              ? "bg-[#FCF8F3] text-[#2E2925] sm:max-w-[1000px] sm:border-[#EFE5DA]"
              : "bg-[#12281D] text-[#F3E9D8] sm:max-w-[640px] sm:border-white/10"
          }`}
        >
          {dark && (
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-56 bg-[radial-gradient(ellipse_at_top,rgba(198,156,109,0.16),transparent_70%)]"
            />
          )}

          {/* Header */}
          <header
            className={`relative z-10 shrink-0 px-4 pb-3 pt-[max(0.75rem,env(safe-area-inset-top))] sm:px-6 sm:pt-5 ${
              isResult ? "border-b border-[#EFE5DA] bg-[#FCF8F3]" : ""
            }`}
          >
            <div className="grid grid-cols-[48px_1fr_auto] items-center gap-2">
              {stage === "quiz" || stage === "finish" ? (
                <button
                  type="button"
                  onClick={back}
                  aria-label="Previous question"
                  className="grid h-12 w-12 place-items-center rounded-full text-[#C9D6CC] transition hover:bg-white/10 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E8CFAE]"
                >
                  <ArrowLeft className="h-5 w-5" />
                </button>
              ) : (
                <span aria-hidden className="h-12 w-12" />
              )}

              <p
                className={`truncate text-center font-display text-[1.3rem] font-medium tracking-[0.02em] sm:text-[1.5rem] ${
                  isResult ? "text-[#365A43]" : "text-[#EBDDC4]"
                }`}
              >
                Born to Blossom
              </p>

              <div className="flex items-center justify-end gap-1">
                {counter && (
                  <span
                    aria-label={`Question ${counter.replace("/", " of ")}`}
                    className="min-w-[2.75rem] text-right text-[0.95rem] font-medium tabular-nums text-[#A9BBAE]"
                  >
                    {counter}
                  </span>
                )}
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close assessment"
                  className={`grid h-12 w-12 place-items-center rounded-full transition focus:outline-none focus-visible:ring-2 ${
                    isResult
                      ? "text-[#6F6258] hover:bg-[#EFE5DA] focus-visible:ring-[#365A43]"
                      : "text-[#C9D6CC] hover:bg-white/10 hover:text-white focus-visible:ring-[#E8CFAE]"
                  }`}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {(stage === "quiz" || stage === "finish") && (
              <div
                role="progressbar"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={Math.round(progress * 100)}
                aria-label="Assessment progress"
                className="mt-2 h-[5px] w-full overflow-hidden rounded-full bg-white/10"
              >
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-[#C69C6D] to-[#E8CFAE]"
                  animate={{ width: `${Math.round(progress * 100)}%` }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                />
              </div>
            )}
          </header>

          {/* Body */}
          <div
            ref={scrollRef}
            data-lenis-prevent
            className="relative z-10 min-h-0 flex-1 overflow-y-auto overscroll-contain [scrollbar-width:thin]"
          >
            <AnimatePresence mode="wait" initial={false} custom={direction}>
              <motion.div
                key={screenKey}
                custom={direction}
                initial={{ opacity: 0, x: direction * 28 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -28 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                {stage === "intro" && (
                  <IntroScreen
                    name={name}
                    nameError={nameError}
                    nameRef={nameRef}
                    headingRef={headingRef}
                    answered={answered}
                    complete={isComplete(answers)}
                    onNameChange={(value) => {
                      setName(value);
                      if (value.trim()) setNameError(false);
                    }}
                    onBegin={begin}
                    onViewResult={() => {
                      if (!name.trim()) {
                        setNameError(true);
                        nameRef.current?.focus();
                        return;
                      }
                      setStage("result");
                    }}
                    onRestart={restart}
                  />
                )}

                {stage === "quiz" && current?.kind === "question" && (
                  <QuestionScreen
                    key={current.question.id}
                    step={current}
                    selected={answers[current.question.id]}
                    headingRef={headingRef}
                    onChoose={(option) => choose(current.question, option)}
                    onSkipForward={() => go(1)}
                  />
                )}

                {stage === "quiz" && current?.kind === "breath" && (
                  <BreathScreen
                    headingRef={headingRef}
                    text={quizSections[current.sectionIndex].breath}
                    onContinue={() => go(1)}
                  />
                )}

                {stage === "finish" && (
                  <FinishScreen
                    headingRef={headingRef}
                    onSee={() => {
                      setDirection(1);
                      setStage("result");
                    }}
                  />
                )}

                {isResult && result && (
                  <AssessmentResults
                    name={name}
                    result={result}
                    onClose={onClose}
                    onReview={() => {
                      setDirection(-1);
                      setStep(0);
                      setStage("quiz");
                    }}
                    onRetake={restart}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </MotionConfig>
  );
}

/* ── Screens ─────────────────────────────────────────────────────────── */

type HeadingRef = (element: HTMLHeadingElement | null) => void;

const primaryButton =
  "inline-flex min-h-[54px] w-full items-center justify-center gap-2 rounded-full bg-[#C69C6D] px-7 text-[1rem] font-semibold text-[#12281D] shadow-[0_12px_28px_rgba(0,0,0,0.25)] transition hover:bg-[#E8CFAE] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E8CFAE] focus-visible:ring-offset-2 focus-visible:ring-offset-[#12281D] active:scale-[0.99]";

const ghostButton =
  "inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full border border-white/20 px-6 text-[0.92rem] font-semibold text-[#E8DCC6] transition hover:border-[#C69C6D] hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E8CFAE]";

function IntroScreen({
  name,
  nameError,
  nameRef,
  headingRef,
  answered,
  complete,
  onNameChange,
  onBegin,
  onViewResult,
  onRestart
}: {
  name: string;
  nameError: boolean;
  nameRef: React.RefObject<HTMLInputElement | null>;
  headingRef: HeadingRef;
  answered: number;
  complete: boolean;
  onNameChange: (value: string) => void;
  onBegin: (resume: boolean) => void;
  onViewResult: () => void;
  onRestart: () => void;
}) {
  const inProgress = answered > 0 && !complete;

  return (
    <div className="mx-auto w-full max-w-[560px] px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-4 sm:px-8 sm:pb-8">
      <p className="text-center text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-[#C69C6D]">
        The Lasoma Soul Family Assessment
      </p>
      <h2
        ref={headingRef}
        tabIndex={-1}
        className="mt-3 text-center font-display text-[2rem] font-medium leading-[1.15] tracking-[-0.02em] text-[#F3E9D8] outline-none sm:text-[2.4rem]"
      >
        Before you begin
      </h2>
      <p className="mt-3 text-center text-[0.98rem] leading-[1.7] text-[#B7C6BA]">
        Seven areas of your life, your chakra map, and one personalised Prescription of Soul Journey.
      </p>

      <ul className="mt-6 grid grid-cols-3 gap-2 text-center">
        {[
          [Clock3, "15–20 min", "37 questions"],
          [Sparkles, "Instant", "your results"],
          [Lock, "Private", "stays on device"]
        ].map(([Icon, title, copy]) => {
          const IconComponent = Icon as typeof Clock3;
          return (
            <li key={title as string} className="rounded-2xl border border-white/10 bg-white/[0.04] px-2 py-3">
              <IconComponent className="mx-auto h-[18px] w-[18px] text-[#E8CFAE]" />
              <p className="mt-1.5 text-[0.82rem] font-semibold text-[#F3E9D8]">{title as string}</p>
              <p className="text-[0.7rem] text-[#9FB1A4]">{copy as string}</p>
            </li>
          );
        })}
      </ul>

      <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-[0.88rem] leading-[1.7] text-[#B7C6BA]">
        There are no right or wrong answers. For every question, pick the option that feels closest to true for you,
        right now. If none fit perfectly, choose the nearest one — every question has a &ldquo;it&rsquo;s a bit
        different for me&rdquo; option. Answer honestly rather than how you think you &ldquo;should&rdquo; feel.
      </div>

      <div className="mt-6">
        <label htmlFor="assessment-name" className="block text-[0.85rem] font-semibold text-[#E8DCC6]">
          What should we call you?
        </label>
        <input
          id="assessment-name"
          ref={nameRef}
          type="text"
          autoComplete="given-name"
          enterKeyHint="go"
          maxLength={60}
          value={name}
          onChange={(event) => onNameChange(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") onBegin(inProgress);
          }}
          aria-invalid={nameError}
          aria-describedby={nameError ? "assessment-name-error" : undefined}
          placeholder="Your first name"
          className={`mt-2 h-[52px] w-full rounded-2xl border bg-[#0F2218] px-4 text-[16px] text-[#F3E9D8] placeholder:text-[#6F8576] focus:outline-none focus:ring-2 focus:ring-[#E8CFAE] ${
            nameError ? "border-[#E59A86]" : "border-white/15"
          }`}
        />
        {nameError && (
          <p id="assessment-name-error" role="alert" className="mt-2 text-[0.8rem] text-[#F0B3A2]">
            Please tell us your name so your letter can be addressed to you.
          </p>
        )}
      </div>

      <div className="mt-6 grid gap-3">
        {complete ? (
          <>
            <button type="button" onClick={onViewResult} className={primaryButton}>
              View my Prescription <ArrowRight className="h-4 w-4" />
            </button>
            <button type="button" onClick={onRestart} className={ghostButton}>
              Retake the assessment
            </button>
          </>
        ) : inProgress ? (
          <>
            <button type="button" onClick={() => onBegin(true)} className={primaryButton}>
              Continue — {answered}/{TOTAL} answered <ArrowRight className="h-4 w-4" />
            </button>
            <button type="button" onClick={onRestart} className={ghostButton}>
              Start over
            </button>
          </>
        ) : (
          <button type="button" onClick={() => onBegin(false)} className={primaryButton}>
            Begin the assessment <ArrowRight className="h-4 w-4" />
          </button>
        )}
      </div>

      <p className="mt-5 text-center text-[0.72rem] leading-[1.7] text-[#7F9486]">{disclaimer}</p>
    </div>
  );
}

function QuestionScreen({
  step,
  selected,
  headingRef,
  onChoose,
  onSkipForward
}: {
  step: Extract<Step, { kind: "question" }>;
  selected?: OptionId;
  headingRef: HeadingRef;
  onChoose: (option: OptionId) => void;
  onSkipForward: () => void;
}) {
  const { question, sectionIndex } = step;
  const section = quizSections[sectionIndex];
  const chakra = question.chakra ? chakraById[question.chakra] : null;
  const domain = question.domain ? domainById[question.domain] : null;

  return (
    <div className="mx-auto w-full max-w-[560px] px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-3 sm:px-8 sm:pb-8">
      <p className="mx-auto flex w-fit max-w-full items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-3.5 py-1.5 text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-[#E8CFAE]">
        <span aria-hidden className="text-[0.95rem] leading-none">
          {chakra ? "🕉" : section.emoji}
        </span>
        <span className="truncate">{chakra ? chakra.name : section.title}</span>
      </p>

      <h2
        ref={headingRef}
        tabIndex={-1}
        className="mt-5 text-center font-display text-[1.6rem] font-medium leading-[1.3] text-[#F3E9D8] outline-none sm:text-[1.95rem]"
      >
        {question.prompt}
      </h2>

      <p className="mx-auto mt-3 max-w-[46ch] text-center text-[0.9rem] leading-[1.65] text-[#9FB1A4]">
        {chakra
          ? `Connected to: ${chakra.theme}`
          : domain
            ? domain.blurb
            : section.blurb}
      </p>
      {chakra && (
        <p className="mx-auto mt-1 max-w-[46ch] text-center text-[0.78rem] leading-[1.6] text-[#7F9486]">
          Organs: {chakra.organs}
        </p>
      )}

      <div role="group" aria-label="Answer options" className="mt-6 grid gap-2.5 sm:mt-7">
        {question.options.map((option) => {
          const isSelected = selected === option.id;
          return (
            <button
              key={option.id}
              type="button"
              aria-pressed={isSelected}
              onClick={() => (isSelected && selected ? onSkipForward() : onChoose(option.id))}
              className={`group flex w-full items-center gap-3 rounded-[20px] border px-3.5 py-3 text-left text-[0.96rem] leading-[1.45] transition duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E8CFAE] active:scale-[0.99] sm:px-4 sm:py-3.5 ${
                isSelected
                  ? "border-[#C69C6D] bg-[#2C4C39] text-white shadow-[0_0_0_1px_rgba(198,156,109,0.4)]"
                  : "border-[#2F4F3D] bg-[#1B3828] text-[#EDE3D2] hover:border-[#C69C6D]/70 hover:bg-[#21432F]"
              }`}
            >
              <span
                aria-hidden
                className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-[0.78rem] font-semibold transition ${
                  isSelected ? "bg-[#C69C6D] text-[#12281D]" : "bg-[#0F2218] text-[#E8CFAE]"
                }`}
              >
                {isSelected ? <Check className="h-4 w-4" /> : option.id}
              </span>
              <span className="min-w-0 flex-1 break-words">{option.text}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function BreathScreen({
  headingRef,
  text,
  onContinue
}: {
  headingRef: HeadingRef;
  text: string;
  onContinue: () => void;
}) {
  return (
    <div className="mx-auto flex w-full max-w-[520px] flex-col items-center px-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-6 text-center sm:px-8 sm:pb-8 sm:pt-10">
      <div aria-hidden className="relative grid h-36 w-36 place-items-center sm:h-44 sm:w-44">
        <span className="absolute inset-0 rounded-full bg-[#C69C6D]/15 motion-safe:animate-[btb-breathe_6s_ease-in-out_infinite]" />
        <span className="absolute inset-5 rounded-full bg-[#C69C6D]/20 motion-safe:animate-[btb-breathe_6s_ease-in-out_0.4s_infinite]" />
        <span className="relative text-[2.6rem]">🌬</span>
      </div>
      <h2
        ref={headingRef}
        tabIndex={-1}
        className="mt-6 font-display text-[1.5rem] font-medium leading-[1.4] text-[#F3E9D8] outline-none sm:text-[1.8rem]"
      >
        {text}
      </h2>
      <p className="mt-3 text-[0.85rem] text-[#9FB1A4]">Optional, but this is where a lot of the real insight happens.</p>
      <button type="button" onClick={onContinue} className={`${primaryButton} mt-8 max-w-[360px]`}>
        Continue <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  );
}

function FinishScreen({ headingRef, onSee }: { headingRef: HeadingRef; onSee: () => void }) {
  return (
    <div className="mx-auto w-full max-w-[540px] px-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-6 text-center sm:px-8 sm:pb-8 sm:pt-10">
      <p className="text-[2.2rem]" aria-hidden>
        🌸
      </p>
      <h2
        ref={headingRef}
        tabIndex={-1}
        className="mt-3 font-display text-[1.9rem] font-medium leading-[1.2] text-[#F3E9D8] outline-none sm:text-[2.3rem]"
      >
        Ready to see your Prescription of Soul Journey?
      </h2>
      <p className="mt-4 text-[0.95rem] leading-[1.75] text-[#B7C6BA]">
        Whatever your results show you, please remember: this is a snapshot of a pattern, not a permanent label. Every
        pattern that was learned can also be gently unlearned — that is the entire premise Born to Blossom is built on.
      </p>
      <p className="mt-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-left text-[0.82rem] leading-[1.7] text-[#9FB1A4]">
        If any part of this assessment brought up something heavy — including experiences of abuse, harassment, or
        feeling unsafe — please know this is a starting point for self-reflection, not a substitute for professional
        support. If you are in distress, please reach out to a licensed therapist or a mental health helpline in your
        area. You do not have to carry this alone.
      </p>
      <button type="button" onClick={onSee} className={`${primaryButton} mt-7`}>
        See my Prescription of Soul Journey <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  );
}
