"use client";

import { useId } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { bandMeta, type Band } from "@/lib/assessment-data";

/* ── Radar ───────────────────────────────────────────────────────────── */

export type RadarAxis = {
  /** Label split across lines for narrow screens. */
  label: string[];
  /** 0–100 */
  value: number;
  band?: Band;
};

const RADAR_W = 380;
const RADAR_H = 330;
const RADAR_CX = RADAR_W / 2;
const RADAR_CY = 165;
const RADAR_R = 100;
const RADAR_LABEL_R = 122;

function polar(index: number, count: number, radius: number) {
  const angle = -Math.PI / 2 + (index / count) * Math.PI * 2;
  return { x: RADAR_CX + Math.cos(angle) * radius, y: RADAR_CY + Math.sin(angle) * radius, cos: Math.cos(angle) };
}

export function RadarChart({
  axes,
  title,
  color = "#365A43"
}: {
  axes: RadarAxis[];
  title: string;
  color?: string;
}) {
  const reduce = useReducedMotion();
  const uid = useId();
  const count = axes.length;
  const rings = [25, 50, 75, 100];

  const ringPath = (pct: number) =>
    axes
      .map((_, i) => {
        const p = polar(i, count, (RADAR_R * pct) / 100);
        return `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`;
      })
      .join(" ") + " Z";

  const shape =
    axes
      .map((axis, i) => {
        const p = polar(i, count, (RADAR_R * Math.max(axis.value, 4)) / 100);
        return `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`;
      })
      .join(" ") + " Z";

  const summary = axes.map((axis) => `${axis.label.join(" ")} ${Math.round(axis.value)} percent`).join(", ");

  return (
    <svg
      viewBox={`0 0 ${RADAR_W} ${RADAR_H}`}
      role="img"
      aria-labelledby={`${uid}-t`}
      className="mx-auto block h-auto w-full max-w-[420px]"
    >
      <title id={`${uid}-t`}>{`${title}: ${summary}`}</title>
      {rings.map((pct) => (
        <path key={pct} d={ringPath(pct)} fill="none" stroke="#E4D8C9" strokeWidth={pct === 100 ? 1.4 : 1} />
      ))}
      {axes.map((_, i) => {
        const p = polar(i, count, RADAR_R);
        return <line key={i} x1={RADAR_CX} y1={RADAR_CY} x2={p.x} y2={p.y} stroke="#E4D8C9" strokeWidth={1} />;
      })}
      <motion.path
        d={shape}
        fill={color}
        fillOpacity={0.2}
        stroke={color}
        strokeWidth={2.2}
        strokeLinejoin="round"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />
      {axes.map((axis, i) => {
        const p = polar(i, count, (RADAR_R * Math.max(axis.value, 4)) / 100);
        const fill = axis.band ? bandMeta[axis.band].color : color;
        return <circle key={i} cx={p.x} cy={p.y} r={4.5} fill={fill} stroke="#FFFDFC" strokeWidth={1.8} />;
      })}
      {axes.map((axis, i) => {
        const p = polar(i, count, RADAR_LABEL_R);
        const anchor = p.cos > 0.3 ? "start" : p.cos < -0.3 ? "end" : "middle";
        const lineHeight = 15;
        const baseY = p.y - ((axis.label.length - 1) * lineHeight) / 2 + 4;
        return (
          <text
            key={i}
            x={p.x}
            y={baseY}
            textAnchor={anchor}
            fontSize={14}
            fontWeight={600}
            fill="#2E2925"
            style={{ fontFamily: "var(--font-inter), sans-serif" }}
          >
            {axis.label.map((line, li) => (
              <tspan key={li} x={p.x} dy={li === 0 ? 0 : lineHeight}>
                {line}
              </tspan>
            ))}
            <tspan x={p.x} dy={lineHeight} fontSize={12.5} fontWeight={500} fill="#6F6258">
              {Math.round(axis.value)}%
            </tspan>
          </text>
        );
      })}
    </svg>
  );
}

/* ── S.O.S. gauge ────────────────────────────────────────────────────── */

export function SosGauge({ percent, band, label }: { percent: number; band: Band; label: string }) {
  const reduce = useReducedMotion();
  const uid = useId();
  const cx = 120;
  const cy = 112;
  const r = 90;
  const clamped = Math.min(100, Math.max(0, percent));
  const end = Math.PI - (clamped / 100) * Math.PI;
  const x = cx + Math.cos(end) * r;
  const y = cy - Math.sin(end) * r;
  const track = `M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`;
  const value = `M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${x.toFixed(2)} ${y.toFixed(2)}`;

  return (
    <svg
      viewBox="0 0 240 150"
      role="img"
      aria-labelledby={`${uid}-t`}
      className="mx-auto block h-auto w-full max-w-[280px]"
    >
      <title id={`${uid}-t`}>{`${label}: ${clamped} percent, ${bandMeta[band].label} band`}</title>
      <path d={track} fill="none" stroke="#EFE5DA" strokeWidth={18} strokeLinecap="round" />
      {clamped > 0 && (
        <motion.path
          d={value}
          fill="none"
          stroke={bandMeta[band].color}
          strokeWidth={18}
          strokeLinecap="round"
          initial={reduce ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      )}
      <text
        x={cx}
        y={cy - 12}
        textAnchor="middle"
        fontSize={38}
        fontWeight={500}
        fill="#2E2925"
        style={{ fontFamily: "var(--font-cormorant), serif", fontVariantNumeric: "lining-nums" }}
      >
        {clamped}%
      </text>
      <text
        x={cx}
        y={cy + 12}
        textAnchor="middle"
        fontSize={11}
        fontWeight={600}
        letterSpacing={1.5}
        fill={bandMeta[band].text}
        style={{ fontFamily: "var(--font-inter), sans-serif" }}
      >
        {bandMeta[band].label.toUpperCase()}
      </text>
    </svg>
  );
}

/* ── Priority ranking bars ───────────────────────────────────────────── */

export function RankingBars({
  items
}: {
  items: { key: string; label: string; percent: number; band: Band }[];
}) {
  const reduce = useReducedMotion();
  return (
    <ol className="grid gap-3.5">
      {items.map((item, index) => (
        <li key={item.key}>
          <div className="flex items-baseline justify-between gap-3">
            <p className="min-w-0 text-[0.9rem] font-medium text-[#2E2925]">
              <span className="mr-2 text-[0.72rem] font-semibold tabular-nums text-[#C69C6D]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="break-words">{item.label}</span>
            </p>
            <p className="shrink-0 text-[0.8rem] font-semibold tabular-nums text-[#6F6258]">{item.percent}%</p>
          </div>
          <div className="mt-1.5 h-[8px] w-full overflow-hidden rounded-full bg-[#EFE5DA]">
            <motion.div
              className="h-full rounded-full"
              style={{ backgroundColor: bandMeta[item.band].color }}
              initial={reduce ? false : { width: 0 }}
              animate={{ width: `${Math.max(item.percent, 2)}%` }}
              transition={{ duration: 0.8, ease: "easeOut", delay: index * 0.05 }}
            />
          </div>
        </li>
      ))}
    </ol>
  );
}

/* ── Healing-focus donut ─────────────────────────────────────────────── */

const donutPalette = ["#365A43", "#7FA98B", "#C69C6D", "#C79072", "#D9A5B3", "#8A7BA8", "#B9AA97"];

export function FocusDonut({ items }: { items: { key: string; label: string; share: number }[] }) {
  const reduce = useReducedMotion();
  const uid = useId();
  const r = 70;
  const circumference = 2 * Math.PI * r;
  const visible = items.filter((item) => item.share > 0);
  let offset = 0;

  return (
    <div className="grid items-center gap-5 sm:grid-cols-[minmax(0,200px)_1fr] sm:gap-7">
      <svg
        viewBox="0 0 200 200"
        role="img"
        aria-labelledby={`${uid}-t`}
        className="mx-auto block h-auto w-full max-w-[200px]"
      >
        <title id={`${uid}-t`}>
          {`Suggested healing focus: ${items.map((i) => `${i.label} ${Math.round(i.share)} percent`).join(", ")}`}
        </title>
        <g transform="rotate(-90 100 100)">
          <circle cx={100} cy={100} r={r} fill="none" stroke="#EFE5DA" strokeWidth={26} />
          {visible.map((item) => {
            const length = (item.share / 100) * circumference;
            const gap = visible.length > 1 ? 2 : 0;
            const dash = `${Math.max(length - gap, 0)} ${circumference}`;
            const dashOffset = -offset;
            offset += length;
            const index = items.findIndex((i) => i.key === item.key);
            return (
              <motion.circle
                key={item.key}
                cx={100}
                cy={100}
                r={r}
                fill="none"
                stroke={donutPalette[index % donutPalette.length]}
                strokeWidth={26}
                strokeDasharray={dash}
                strokeDashoffset={dashOffset}
                initial={reduce ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.06 }}
              />
            );
          })}
        </g>
        <text
          x={100}
          y={96}
          textAnchor="middle"
          fontSize={13}
          fontWeight={600}
          letterSpacing={1.2}
          fill="#6F6258"
          style={{ fontFamily: "var(--font-inter), sans-serif" }}
        >
          FOCUS
        </text>
        <text
          x={100}
          y={116}
          textAnchor="middle"
          fontSize={13}
          fontWeight={600}
          letterSpacing={1.2}
          fill="#6F6258"
          style={{ fontFamily: "var(--font-inter), sans-serif" }}
        >
          PLAN
        </text>
      </svg>

      <ul className="grid gap-2">
        {items.map((item, index) => (
          <li key={item.key} className="flex items-center justify-between gap-3 text-[0.85rem]">
            <span className="flex min-w-0 items-center gap-2.5">
              <span
                aria-hidden
                className="h-3 w-3 shrink-0 rounded-full"
                style={{ backgroundColor: donutPalette[index % donutPalette.length] }}
              />
              <span className="break-words text-[#2E2925]">{item.label}</span>
            </span>
            <span className="shrink-0 font-semibold tabular-nums text-[#6F6258]">{Math.round(item.share)}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
