"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, Leaf, MessageCircle, Phone, RotateCcw } from "lucide-react";
import { RadarChart, FocusDonut, RankingBars, SosGauge } from "@/components/assessment/charts";
import {
  bandMeta,
  chakraById,
  disclaimer,
  domainById,
  helplines
} from "@/lib/assessment-data";
import type { AssessmentResult } from "@/lib/assessment-engine";
import { contactInfo } from "@/lib/content";

function Card({
  children,
  className = "",
  tone = "light"
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "light" | "sage" | "gold" | "green";
}) {
  const tones = {
    light: "border-[#EFE5DA] bg-[#FFFDFC]",
    sage: "border-[#D5E6DA] bg-[#E8F2EA]",
    gold: "border-[#E8CFAE] bg-[#FCF8F3]",
    green: "border-[#2D4B37] bg-[#365A43] text-white"
  } as const;
  return (
    <section className={`min-w-0 rounded-[22px] border p-4 min-[400px]:p-5 sm:rounded-[26px] sm:p-7 ${tones[tone]} ${className}`}>
      {children}
    </section>
  );
}

function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <p
      className={`mb-3 text-[0.72rem] font-semibold uppercase tracking-[0.16em] ${
        light ? "text-[#E8CFAE]" : "text-[#C69C6D]"
      }`}
    >
      {children}
    </p>
  );
}

function BandPill({ band }: { band: keyof typeof bandMeta }) {
  const meta = bandMeta[band];
  return (
    <span
      className="inline-flex items-center rounded-full px-3 py-1 text-[0.72rem] font-semibold uppercase tracking-[0.1em]"
      style={{ backgroundColor: meta.soft, color: meta.text }}
    >
      {meta.label}
    </span>
  );
}

const outlineButton =
  "inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-[#DCCDBE] bg-white px-5 text-[0.875rem] font-semibold text-[#365A43] transition hover:border-[#365A43] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#365A43]";

export function AssessmentResults({
  name,
  result,
  onReview,
  onRetake,
  onClose
}: {
  name: string;
  result: AssessmentResult;
  onReview: () => void;
  onRetake: () => void;
  onClose: () => void;
}) {
  const { sos, profile, timeline, recommendation } = result;
  const sosDomain = domainById[sos.id];
  const sosChakra = chakraById[sosDomain.chakra];
  const firstName = name.trim().split(/\s+/)[0];
  const date = new Date(result.generatedAt).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });

  const whatsappHref = `https://wa.me/${contactInfo.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
    `Namaste. I completed the Soul Assessment on borntoblossom.in.\n\nName: ${name || "—"}\nSoul Profile: ${profile.name}\nS.O.S. Area: ${sos.name} (${sos.percent}%)\nOverall: ${result.overallPercent}%\nRecommended: ${recommendation.primary.name}\n\nI would like to book a discovery call.`
  )}`;

  const serviceHref = recommendation.primary.slug ? `/services/${recommendation.primary.slug}` : "/services";

  return (
    <div className="mx-auto w-full max-w-[920px] px-4 pb-10 pt-5 sm:px-8 sm:pb-12 sm:pt-8">
      {/* 1 · Overview */}
      <Card tone="gold" className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-14 -top-14 h-48 w-48 rounded-full bg-[#FCECEF] blur-3xl"
        />
        <div className="relative grid gap-6 md:grid-cols-[1.25fr_1fr] md:items-center">
          <div className="min-w-0">
            <Eyebrow>Your Prescription of Soul Journey</Eyebrow>
            <h2 className="font-display text-[1.9rem] font-medium leading-[1.12] tracking-[-0.03em] text-[#2E2925] sm:text-[2.4rem]">
              {firstName ? `${firstName}, this is your soul map` : "This is your soul map"}
            </h2>
            <p className="mt-2 text-[0.8rem] text-[#9A8D82]">Prepared {date}</p>
            <div className="mt-5 rounded-[18px] border border-[#EFE5DA] bg-white p-4 sm:p-5">
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-[#9A8D82]">
                Your primary soul profile
              </p>
              <p className="mt-1 font-display text-[1.55rem] leading-tight text-[#365A43] sm:text-[1.85rem]">
                {profile.name}
              </p>
              <p className="mt-2 text-[0.92rem] leading-[1.65] text-[#6F6258]">{profile.essence}</p>
              <p className="mt-2 text-[0.92rem] leading-[1.65] text-[#2E2925]">
                <span className="font-semibold text-[#365A43]">Your strength: </span>
                {profile.strength}
              </p>
            </div>
          </div>

          <div className="min-w-0 rounded-[20px] border border-[#EFE5DA] bg-white p-5 text-center">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-[#9A8D82]">
              Overall soul alignment score
            </p>
            <p className="mt-1 font-display text-[3.6rem] font-medium leading-none text-[#2E2925] lining-nums">
              {result.overallPercent}
              <span className="text-[1.6rem] text-[#9A8D82]">%</span>
            </p>
            <div className="mt-3">
              <BandPill band={result.overallBand} />
            </div>
            <p className="mt-3 text-[0.8rem] leading-[1.6] text-[#6F6258]">
              How much root-pattern load you&apos;re carrying across all seven areas — a weather report for your inner
              world, not a verdict.
            </p>
            {result.awarenessLabel && (
              <p className="mt-3 text-[0.78rem] text-[#9A8D82]">
                Awareness style: <span className="font-semibold text-[#365A43]">{result.awarenessLabel}</span>
              </p>
            )}
          </div>
        </div>
      </Card>

      {/* 2 · Radars */}
      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <Card>
          <Eyebrow>Your Soul Family Wheel</Eyebrow>
          <RadarChart
            title="Soul Family Wheel"
            axes={result.domains.map((domain) => ({
              label: [domain.short],
              value: domain.percent,
              band: domain.band
            }))}
          />
          <p className="mt-3 text-[0.82rem] leading-[1.7] text-[#6F6258]">
            Seven life areas around one wheel. Further from the centre means a stronger pattern is asking for care;
            closer in means that area is flowing more freely.
          </p>
        </Card>
        <Card>
          <Eyebrow>Your Chakra Balance Map</Eyebrow>
          <RadarChart
            title="Chakra Balance Map"
            color="#C69C6D"
            axes={result.chakras.map((chakra) => ({
              label: chakra.short.split(" "),
              value: chakra.percent,
              band: chakra.band
            }))}
          />
          <p className="mt-3 text-[0.82rem] leading-[1.7] text-[#6F6258]">
            The seven energy centres from root to crown, and the organs each one is linked to, as your body-wisdom
            answers sense them.
          </p>
        </Card>
      </div>

      {/* 3 · S.O.S. + timeline */}
      <div className="mt-5 grid gap-5 lg:grid-cols-[1.15fr_1fr]">
        <Card>
          <Eyebrow>Your S.O.S. priority area</Eyebrow>
          <div className="grid gap-4 sm:grid-cols-[minmax(0,240px)_1fr] sm:items-center">
            <SosGauge percent={sos.percent} band={sos.band} label={`S.O.S. area ${sos.name}`} />
            <div className="min-w-0">
              <p className="font-display text-[1.5rem] leading-tight text-[#2E2925]">
                <span aria-hidden>{sosDomain.emoji} </span>
                {sos.name}
              </p>
              <p className="mt-2 text-[0.9rem] leading-[1.7] text-[#6F6258]">
                This is the area quietly asking for the most attention right now. {sosDomain.blurb}
              </p>
            </div>
          </div>
          <p className="mt-4 rounded-[16px] bg-[#FCF8F3] p-4 text-[0.88rem] leading-[1.7] text-[#6F6258]">
            <span className="font-semibold text-[#365A43]">Where it tends to live in the body: </span>
            {sosChakra.organs.charAt(0).toLowerCase() + sosChakra.organs.slice(1)} — the {sosChakra.name} (
            {sosChakra.sanskrit}), connected to {sosChakra.theme.charAt(0).toLowerCase() + sosChakra.theme.slice(1)}.
          </p>
        </Card>

        <Card tone="sage">
          <Eyebrow>Your estimated healing timeline</Eyebrow>
          <p className="font-display text-[1.7rem] leading-tight text-[#2E2925]">{timeline.label}</p>
          <p className="mt-1 text-[1.05rem] font-semibold text-[#365A43]">{timeline.estimate}</p>
          <p className="mt-3 text-[0.9rem] leading-[1.7] text-[#4F5E52]">{timeline.note}</p>
          <p className="mt-4 text-[0.78rem] leading-[1.6] text-[#6F7F73]">
            Directional and encouraging, not a clinical prediction — healing deserves a plan, not just a hope.
          </p>
        </Card>
      </div>

      {/* 4 · Ranking + focus */}
      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <Card>
          <Eyebrow>Your priority ranking</Eyebrow>
          <RankingBars
            items={result.ranking.map((domain) => ({
              key: domain.id,
              label: domain.name,
              percent: domain.percent,
              band: domain.band
            }))}
          />
        </Card>
        <Card>
          <Eyebrow>Suggested healing focus</Eyebrow>
          <FocusDonut
            items={result.domains.map((domain) => ({
              key: domain.id,
              label: domain.short,
              share: domain.focusShare
            }))}
          />
          <p className="mt-4 text-[0.8rem] leading-[1.65] text-[#6F6258]">
            Roughly how we&apos;d sequence your focus across areas, weighted by each one&apos;s share of your overall
            load.
          </p>
        </Card>
      </div>

      {/* 5 · Letter */}
      <Card tone="gold" className="mt-5">
        <Eyebrow>Your personal letter</Eyebrow>
        <div className="font-display text-[1.1rem] leading-[1.75] text-[#2E2925] sm:text-[1.2rem]">
          <p className="text-[1.3rem] sm:text-[1.45rem]">{result.letter.greeting}</p>
          {result.letter.paragraphs.map((paragraph, index) => (
            <p key={index} className="mt-4">
              {paragraph}
            </p>
          ))}
          <p className="mt-4">{result.letter.closing}</p>
          <p className="mt-6 text-[#9A8D82]">With warmth,</p>
          <p className="text-[#365A43]">{result.letter.signoff}</p>
        </div>
      </Card>

      {/* 6 · Next step */}
      <Card tone="green" className="mt-5">
        <Eyebrow light>Your recommended next step</Eyebrow>
        <h3 className="font-display text-[1.8rem] font-medium leading-tight sm:text-[2.2rem]">
          {recommendation.primary.name}
        </h3>
        <p className="mt-3 max-w-[60ch] text-[0.95rem] leading-[1.75] text-white/85">{recommendation.primary.why}</p>
        {recommendation.alternative && (
          <p className="mt-3 max-w-[60ch] text-[0.85rem] leading-[1.7] text-white/70">
            A lighter, lower-commitment alternative: {recommendation.alternative.name}.
          </p>
        )}
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <Link
            href="/#book-session"
            className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full bg-white px-6 text-[0.9375rem] font-semibold text-[#365A43] transition hover:bg-[#FCF8F3] focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#365A43]"
          >
            Book a discovery call <Leaf className="h-4 w-4" />
          </Link>
          <Link
            href={serviceHref}
            className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full border border-white/40 px-6 text-[0.9375rem] font-semibold text-white transition hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            {recommendation.primary.slug ? "Learn about this" : "Explore all services"}{" "}
            <ArrowRight className="h-4 w-4" />
          </Link>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full border border-white/40 px-6 text-[0.9375rem] font-semibold text-white transition hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white sm:col-span-2 lg:col-span-1"
          >
            <MessageCircle className="h-4 w-4" /> Send my result on WhatsApp
          </a>
        </div>
      </Card>

      {/* 7 · Extra support */}
      {result.needsCare && (
        <Card tone="sage" className="mt-5">
          <Eyebrow>Extra support, whenever you need it</Eyebrow>
          <p className="max-w-[62ch] text-[0.92rem] leading-[1.75] text-[#3E4F42]">
            This assessment is a starting point for self-reflection, not a substitute for professional support. If any
            of it brought up something heavy, please be gentle with yourself — you do not have to carry this alone.
            Pairing healing work with a licensed therapist can be a beautiful, supportive combination.
          </p>
          <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
            {helplines.map((line) => (
              <li key={line.name}>
                <a
                  href={`tel:${line.tel}`}
                  className="flex min-h-[56px] items-center gap-3 rounded-[16px] border border-[#CFE0D4] bg-white px-4 py-2.5 transition hover:border-[#365A43] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#365A43]"
                >
                  <Phone className="h-4 w-4 shrink-0 text-[#365A43]" />
                  <span className="min-w-0">
                    <span className="block text-[0.88rem] font-semibold text-[#2E2925]">{line.name}</span>
                    <span className="block break-words text-[0.8rem] text-[#6F6258]">
                      {line.contact} · {line.note}
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </Card>
      )}

      {/* 8 · Footer */}
      <p className="mt-6 text-[0.78rem] leading-[1.7] text-[#9A8D82]">
        {disclaimer} This is a snapshot of a pattern, not a permanent label — every pattern that was learned can also be
        gently unlearned.
      </p>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <button type="button" onClick={onReview} className={outlineButton}>
          <ArrowLeft className="h-4 w-4" /> Review my answers
        </button>
        <button type="button" onClick={onRetake} className={outlineButton}>
          <RotateCcw className="h-4 w-4" /> Retake the assessment
        </button>
        <button type="button" onClick={onClose} className={outlineButton}>
          Close
        </button>
      </div>
    </div>
  );
}
