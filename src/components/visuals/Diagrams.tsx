"use client";

import { useApp } from "@/lib/providers/AppProviders";
import { toLocaleDigits } from "@/lib/i18n/digits";
import { RevealItem } from "./Reveal";
import { SlideFlow } from "./flow/SlideFlow";

export function CycleDiagram({
  layers = [],
  revealStep,
}: {
  layers?: string[];
  revealStep: number;
}) {
  return <SlideFlow layers={layers} revealStep={revealStep} height={0} />;
}

export function HierarchyLayers({
  layers = [],
  revealStep,
}: {
  layers?: string[];
  revealStep: number;
}) {
  const { locale } = useApp();
  return (
    <div className="mx-auto flex h-full w-full max-w-4xl flex-col items-stretch justify-center gap-2.5">
      {layers.map((layer, i) => {
        const widthPct = Math.max(78, 100 - i * 4);
        return (
          <RevealItem key={layer} index={i} revealStep={revealStep}>
            <div
              className="mx-auto rounded-lg border border-[var(--border)] px-4 py-3 text-[0.95em] font-semibold leading-snug md:px-5 md:py-3.5 md:text-[1.05em]"
              style={{
                width: `${widthPct}%`,
                background:
                  i === 0
                    ? "color-mix(in srgb, var(--brand-cyan) 18%, transparent)"
                    : "var(--surface)",
              }}
            >
              <span className="me-2 font-bold text-[var(--brand-cyan)]">
                L{toLocaleDigits(i + 1, locale)}
              </span>
              {layer}
            </div>
          </RevealItem>
        );
      })}
    </div>
  );
}

export function OverviewGrid({
  items = [],
  revealStep,
  compact = false,
  fill = false,
}: {
  items?: Array<{ title: string; body?: string }>;
  revealStep: number;
  compact?: boolean;
  fill?: boolean;
}) {
  const { locale } = useApp();
  const n = items.length;
  const cols =
    n === 5
      ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5"
      : n === 4
        ? "grid-cols-2 lg:grid-cols-4"
        : n === 3
          ? "grid-cols-1 sm:grid-cols-3"
          : "grid-cols-2 lg:grid-cols-3";

  return (
    <div
      className={`grid gap-2.5 sm:gap-3 ${cols} ${
        fill
          ? "min-h-0 h-full flex-1 content-stretch auto-rows-fr"
          : "auto-rows-fr"
      }`}
    >
      {items.map((item, i) => (
        <RevealItem
          key={item.title}
          index={i}
          revealStep={revealStep}
          className={fill ? "min-h-0 h-full" : undefined}
        >
          <div
            className={`flex h-full flex-col border border-[var(--border)] bg-[var(--surface)] ${
              fill
                ? "min-h-0 rounded-lg p-3.5 md:p-4"
                : compact
                  ? "min-h-0 rounded-md p-2.5 md:p-3"
                  : "min-h-[6.5rem] rounded-lg p-3.5 md:p-4"
            }`}
          >
            <div className="mb-2 flex items-center gap-2 text-[0.8em] font-bold text-[var(--brand-cyan)]">
              <span className="tabular-nums tracking-wide">
                {toLocaleDigits(String(i + 1).padStart(2, "0"), locale)}
              </span>
              <span className="h-px flex-1 bg-[var(--border)]" aria-hidden />
            </div>
            <p
              className={`font-bold leading-snug text-[var(--slide-title)] ${
                fill ? "text-[1.05em]" : compact ? "text-[0.95em]" : "text-[1.02em]"
              }`}
            >
              {item.title}
            </p>
            {item.body ? (
              <p
                className={`mt-1.5 flex-1 font-medium leading-snug text-[var(--text-muted)] ${
                  fill ? "text-[0.95em]" : compact ? "text-[0.82em]" : "text-[0.9em]"
                }`}
              >
                {item.body}
              </p>
            ) : null}
          </div>
        </RevealItem>
      ))}
    </div>
  );
}

export function TaxonomyAxes({
  axes,
  callout,
  revealStep,
}: {
  axes?: { x: string; y: string; cells: string[][] };
  callout?: string;
  revealStep: number;
}) {
  if (!axes) return null;
  return (
    <div className="space-y-2">
      <RevealItem index={0} revealStep={revealStep}>
        <div className="slide-table-wrap overflow-hidden rounded-xl border border-[var(--border)]">
          <table className="w-full min-w-[480px] text-sm md:min-w-0 md:text-base">
            <thead>
              <tr className="bg-[var(--bg-cream)]">
                <th className="p-3 text-start font-bold text-[var(--text-ink)]">
                  {axes.y} \\ {axes.x}
                </th>
                {axes.cells[0]?.map((_, i) => (
                  <th key={i} className="p-3 font-bold text-[var(--text-ink)]">
                    Col {i + 1}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {axes.cells.map((row, r) => (
                <tr key={r} className="odd:bg-[var(--surface)]">
                  <td className="p-3 font-bold text-[var(--text-ink)]">
                    Row {r + 1}
                  </td>
                  {row.map((cell, c) => (
                    <td
                      key={c}
                      className="border border-[var(--border)] p-3 font-semibold text-[var(--text-ink)]"
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </RevealItem>
      {callout ? (
        <RevealItem index={1} revealStep={revealStep}>
          <div className="rounded-md border-s-4 border-[var(--oral-coral)] bg-[var(--oral-coral)]/10 px-3 py-2.5 text-sm font-semibold md:text-base">
            {callout}
          </div>
        </RevealItem>
      ) : null}
    </div>
  );
}

export function ResponsibilityMatrix({
  matrix,
  revealStep,
}: {
  matrix?: { rows: string[]; cols: string[]; cells: string[][] };
  revealStep: number;
}) {
  const { strings } = useApp();
  if (!matrix) return null;
  return (
    <RevealItem index={0} revealStep={revealStep}>
      <div className="slide-table-wrap rounded-xl border border-[var(--border)] bg-[var(--surface)]">
        <table className="w-full min-w-[640px] border-collapse md:min-w-0">
          <thead>
            <tr className="bg-[var(--brand-cyan)]/15">
              <th className="border-b-2 border-[var(--brand-cyan)]/30 p-3 text-start text-sm font-bold text-[var(--text-ink)] md:p-4 md:text-base">
                {strings.function}
              </th>
              {matrix.cols.map((c) => (
                <th
                  key={c}
                  className="border-b-2 border-[var(--brand-cyan)]/30 p-3 text-sm font-bold text-[var(--text-ink)] md:p-4 md:text-base"
                >
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {matrix.rows.map((row, r) => (
              <tr
                key={row}
                className="odd:bg-[var(--surface)] even:bg-[var(--bg-cream)]/55"
              >
                <td className="border-b border-[var(--border)] p-3 text-sm font-bold text-[var(--text-ink)] md:p-4 md:text-base">
                  {row}
                </td>
                {(matrix.cells[r] ?? []).map((cell, c) => (
                  <td
                    key={`${r}-${c}`}
                    className="border-b border-[var(--border)] p-3 text-center text-base font-extrabold tracking-wide text-[var(--text-ink)] md:p-4 md:text-lg"
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </RevealItem>
  );
}

export function DecisionTree({
  items = [],
  revealStep,
}: {
  items?: Array<{ title: string; body?: string }>;
  revealStep: number;
}) {
  return (
    <div className="flex flex-col items-stretch gap-2">
      {items.map((item, i) => (
        <RevealItem key={item.title} index={i} revealStep={revealStep}>
          <div className="relative rounded-lg border border-[var(--border)] bg-[var(--surface)] p-3 ps-4">
            <span className="absolute start-0 top-0 h-full w-1 rounded-s bg-[var(--brand-cyan)]" />
            <p className="text-sm font-bold md:text-base">{item.title}</p>
            {item.body ? (
              <p className="mt-1 text-sm font-medium text-[var(--text-muted)] md:text-[0.95em]">
                {item.body}
              </p>
            ) : null}
          </div>
        </RevealItem>
      ))}
    </div>
  );
}
