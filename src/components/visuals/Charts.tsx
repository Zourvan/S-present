"use client";

import { useId, useMemo } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ScatterChart,
  Scatter,
  ZAxis,
  Cell,
  BarChart,
  Bar,
  Legend,
} from "recharts";
import { useApp } from "@/lib/providers/AppProviders";
import { toLocaleDigits } from "@/lib/i18n/digits";
import { RevealItem, usePrefersReducedMotion } from "./Reveal";

const CYAN = "#00adc8";
const CYAN_DARK = "#008a9e";
const WARN = "#9b1c2e";
const INK = "#1a1214";
const MUTED = "#5c4a4e";
const BORDER = "#e8d5c4";
const SURFACE = "#ffffff";

const RISK_COLORS: Record<string, string> = {
  low: "#047857",
  med: "#b45309",
  high: "#c2410c",
  critical: "#991b1b",
};

function ChartTooltipShell({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ value?: number | string; name?: string; color?: string }>;
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-md border border-[var(--border)] bg-[var(--surface)] px-2.5 py-1.5 text-xs font-semibold shadow-md">
      <p className="text-[var(--text-ink)]">{label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color ?? CYAN }}>
          {p.name}: {p.value}
        </p>
      ))}
    </div>
  );
}

export function MonitoringChart({
  labels,
  series,
  excursionIndexes = [],
  note,
  revealStep,
}: {
  labels: string[];
  series: number[];
  excursionIndexes?: number[];
  note?: string;
  revealStep: number;
}) {
  const { strings, locale } = useApp();
  const reduce = usePrefersReducedMotion();
  const instant = reduce || revealStep >= 99;
  const visible = revealStep > 0 || revealStep >= 99;
  const fillId = useId().replace(/:/g, "");

  const data = useMemo(
    () =>
      series.map((value, i) => ({
        name: labels[i] ?? String(i + 1),
        value,
        excursion: excursionIndexes.includes(i),
      })),
    [series, labels, excursionIndexes],
  );

  return (
    <RevealItem index={0} revealStep={revealStep}>
      <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-3 md:p-4">
        <p className="mb-2 text-sm font-bold uppercase tracking-wide text-[var(--text-ink)]">
          {strings.chartNote}
        </p>
        <div className="h-48 w-full sm:h-56" dir="ltr">
          {visible ? (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={data}
                margin={{ top: 12, right: 16, left: 4, bottom: 8 }}
              >
                <defs>
                  <linearGradient id={fillId} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={CYAN} stopOpacity={0.35} />
                    <stop offset="100%" stopColor={CYAN} stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="4 6"
                  stroke={BORDER}
                  vertical={false}
                />
                <XAxis
                  dataKey="name"
                  tick={{ fill: INK, fontSize: 14, fontWeight: 700 }}
                  tickLine={false}
                  axisLine={{ stroke: BORDER }}
                />
                <YAxis
                  tick={{ fill: MUTED, fontSize: 13, fontWeight: 700 }}
                  tickLine={false}
                  axisLine={false}
                  width={42}
                  tickFormatter={(v) => toLocaleDigits(v, locale)}
                />
                <Tooltip content={<ChartTooltipShell />} />
                <Area
                  type="monotone"
                  dataKey="value"
                  name={strings.chartNote}
                  stroke={CYAN}
                  strokeWidth={3}
                  fill={`url(#${fillId})`}
                  isAnimationActive={!instant}
                  animationDuration={1100}
                  dot={(props) => {
                    const { cx, cy, payload, index } = props as {
                      cx?: number;
                      cy?: number;
                      payload?: { excursion?: boolean };
                      index?: number;
                    };
                    if (cx == null || cy == null) return null;
                    const excursion = Boolean(payload?.excursion);
                    return (
                      <circle
                        key={`dot-${index}`}
                        cx={cx}
                        cy={cy}
                        r={excursion ? 7 : 5}
                        fill={excursion ? WARN : CYAN}
                        stroke={SURFACE}
                        strokeWidth={2}
                      />
                    );
                  }}
                  activeDot={{ r: 8, strokeWidth: 2, stroke: SURFACE }}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke={CYAN_DARK}
                  strokeWidth={0}
                  isAnimationActive={false}
                  legendType="none"
                  dot={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex h-full items-center justify-center text-sm font-medium text-[var(--text-muted)]">
              …
            </div>
          )}
        </div>
        {note ? (
          <p className="mt-2 text-sm font-medium text-[var(--text-ink)]">
            {note}
          </p>
        ) : null}
      </div>
    </RevealItem>
  );
}

export function RiskMatrixVisual({
  revealStep,
}: {
  revealStep: number;
}) {
  const { strings, locale } = useApp();
  const reduce = usePrefersReducedMotion();
  const instant = reduce || revealStep >= 99;
  const visible = revealStep > 0 || revealStep >= 99;

  const colLabels = [strings.lowProb, strings.medProb, strings.highProb];
  // Row 0 is the top of the chart (high severity). Risk rises with both severity and probability.
  const rowLabels = [strings.highSev, strings.medSev, strings.lowSev];
  const cells = [
    [strings.riskHigh, strings.riskHigh, strings.riskCritical],
    [strings.riskMed, strings.riskHigh, strings.riskHigh],
    [strings.riskLow, strings.riskMed, strings.riskHigh],
  ];

  const bandKey = (v: string) => {
    if (v === strings.riskLow) return "low";
    if (v === strings.riskMed) return "med";
    if (v === strings.riskHigh) return "high";
    return "critical";
  };

  const scatterData = useMemo(() => {
    const points: Array<{
      x: number;
      y: number;
      z: number;
      label: string;
      band: string;
    }> = [];
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        const label = cells[r][c];
        points.push({
          x: c,
          y: 2 - r,
          z: 1,
          label,
          band: bandKey(label),
        });
      }
    }
    return points;
    // eslint-disable-next-line react-hooks/exhaustive-deps -- cells rebuilt from strings
  }, [strings]);

  return (
    <RevealItem index={0} revealStep={revealStep}>
      <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4">
        <p className="mb-3 text-sm font-bold uppercase tracking-wide text-[var(--text-ink)]">
          {strings.riskMatrixTitle}
        </p>
        <div className="h-56 w-full md:h-64" dir="ltr">
          {visible ? (
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 8, right: 16, bottom: 8, left: 8 }}>
                <CartesianGrid stroke={BORDER} strokeDasharray="3 3" />
                <XAxis
                  type="number"
                  dataKey="x"
                  domain={[-0.5, 2.5]}
                  ticks={[0, 1, 2]}
                  tickFormatter={(v) => colLabels[v] ?? ""}
                  tick={{ fill: INK, fontSize: 12, fontWeight: 700 }}
                  tickLine={false}
                  axisLine={{ stroke: BORDER }}
                />
                <YAxis
                  type="number"
                  dataKey="y"
                  domain={[-0.5, 2.5]}
                  ticks={[0, 1, 2]}
                  tickFormatter={(v) =>
                    // y=2 high sev (top), y=0 low sev
                    rowLabels[2 - v] ?? ""
                  }
                  tick={{ fill: INK, fontSize: 12, fontWeight: 700 }}
                  tickLine={false}
                  axisLine={false}
                  width={72}
                />
                <ZAxis type="number" dataKey="z" range={[900, 900]} />
                <Tooltip
                  cursor={{ strokeDasharray: "3 3" }}
                  content={({ active, payload }) => {
                    if (!active || !payload?.[0]) return null;
                    const p = payload[0].payload as {
                      label: string;
                      x: number;
                      y: number;
                    };
                    return (
                      <div className="rounded-md border border-[var(--border)] bg-[var(--surface)] px-2.5 py-1.5 text-xs font-semibold shadow-md">
                        {colLabels[p.x]} · {rowLabels[2 - p.y]}: {p.label}
                      </div>
                    );
                  }}
                />
                <Scatter
                  data={scatterData}
                  isAnimationActive={!instant}
                  shape={(props: {
                    cx?: number;
                    cy?: number;
                    payload?: { label: string; band: string };
                  }) => {
                    const { cx = 0, cy = 0, payload } = props;
                    const size = 52;
                    const fill =
                      RISK_COLORS[payload?.band ?? "med"] ?? RISK_COLORS.med;
                    return (
                      <g>
                        <rect
                          x={cx - size / 2}
                          y={cy - size / 2}
                          width={size}
                          height={size}
                          rx={10}
                          fill={fill}
                        />
                        <text
                          x={cx}
                          y={cy + 5}
                          textAnchor="middle"
                          fill="#fff"
                          fontSize={13}
                          fontWeight={800}
                        >
                          {payload?.label}
                        </text>
                      </g>
                    );
                  }}
                >
                  {scatterData.map((entry, i) => (
                    <Cell key={i} fill={RISK_COLORS[entry.band]} />
                  ))}
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
          ) : null}
        </div>
        <p className="mt-2 text-center text-xs font-medium text-[var(--text-muted)]">
          {toLocaleDigits("3×3", locale)} · {strings.riskMatrixExample}
        </p>
      </div>
    </RevealItem>
  );
}

function parseKpiNumber(value: string): number | null {
  const m = value.replace(/,/g, "").match(/-?\d+(\.\d+)?/);
  if (!m) return null;
  const n = Number(m[0]);
  return Number.isFinite(n) ? n : null;
}

export function KpiDashboard({
  kpis = [],
  maturityLevels = [],
  revealStep,
}: {
  kpis?: Array<{ label: string; value: string; kind?: "leading" | "lagging" }>;
  maturityLevels?: string[];
  revealStep: number;
}) {
  const { strings, locale } = useApp();
  const reduce = usePrefersReducedMotion();
  const instant = reduce || revealStep >= 99;
  const visible = revealStep > 0 || revealStep >= 99;

  const barData = useMemo(() => {
    const numeric = kpis
      .map((k) => {
        const n = parseKpiNumber(k.value);
        return n == null
          ? null
          : {
              name: k.label.length > 22 ? `${k.label.slice(0, 20)}…` : k.label,
              value: n,
              kind: k.kind ?? "indicator",
            };
      })
      .filter(Boolean) as Array<{
      name: string;
      value: number;
      kind: string;
    }>;

    if (numeric.length >= 2) return numeric;

    // Illustrative scores when KPI values are qualitative labels
    return kpis.map((k, i) => ({
      name: k.label.length > 22 ? `${k.label.slice(0, 20)}…` : k.label,
      value: 60 + ((i * 17) % 35),
      kind: k.kind ?? "indicator",
    }));
  }, [kpis]);

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-3 gap-2.5">
        {kpis.map((kpi, i) => (
          <RevealItem key={kpi.label} index={i} revealStep={revealStep}>
            <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-3">
              <p className="text-xs font-bold uppercase tracking-wide text-[var(--text-ink)]">
                {kpi.kind === "leading"
                  ? strings.leading
                  : kpi.kind === "lagging"
                    ? strings.lagging
                    : strings.indicator}
              </p>
              <p className="text-xl font-bold text-[var(--brand-cyan-dark)]">
                {toLocaleDigits(kpi.value, locale)}
              </p>
              <p className="text-sm font-semibold">{kpi.label}</p>
            </div>
          </RevealItem>
        ))}
      </div>

      {barData.length > 0 ? (
        <RevealItem index={0} revealStep={revealStep}>
          <div className="h-40 w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] p-2 md:h-44">
            <div className="h-full w-full" dir="ltr">
              {visible ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={barData}
                    margin={{ top: 8, right: 8, left: 0, bottom: 4 }}
                  >
                    <CartesianGrid
                      strokeDasharray="4 6"
                      stroke={BORDER}
                      vertical={false}
                    />
                    <XAxis
                      dataKey="name"
                      tick={{ fill: INK, fontSize: 10, fontWeight: 600 }}
                      tickLine={false}
                      axisLine={{ stroke: BORDER }}
                      interval={0}
                      height={36}
                    />
                    <YAxis
                      tick={{ fill: MUTED, fontSize: 11, fontWeight: 600 }}
                      tickLine={false}
                      axisLine={false}
                      width={32}
                      tickFormatter={(v) => toLocaleDigits(v, locale)}
                    />
                    <Tooltip content={<ChartTooltipShell />} />
                    <Legend
                      wrapperStyle={{ fontSize: 11, fontWeight: 600 }}
                    />
                    <Bar
                      dataKey="value"
                      name={strings.indicator}
                      fill={CYAN}
                      radius={[8, 8, 0, 0]}
                      isAnimationActive={!instant}
                      animationDuration={900}
                    >
                      {barData.map((entry, i) => (
                        <Cell
                          key={i}
                          fill={
                            entry.kind === "lagging"
                              ? WARN
                              : entry.kind === "leading"
                                ? CYAN_DARK
                                : CYAN
                          }
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              ) : null}
            </div>
          </div>
        </RevealItem>
      ) : null}

      {maturityLevels.length > 0 ? (
        <div className="flex flex-wrap gap-1.5">
          {maturityLevels.map((level, i) => (
            <RevealItem key={level} index={i} revealStep={revealStep}>
              <span className="rounded-full border border-[var(--brand-cyan)]/40 bg-[var(--brand-cyan)]/10 px-3 py-1 text-xs font-bold text-[var(--brand-cyan-dark)] md:text-sm">
                {toLocaleDigits(i + 1, locale)}. {level}
              </span>
            </RevealItem>
          ))}
        </div>
      ) : null}
      <p className="text-sm font-medium text-[var(--text-ink)]">
        {strings.dashboardNote}
      </p>
    </div>
  );
}
