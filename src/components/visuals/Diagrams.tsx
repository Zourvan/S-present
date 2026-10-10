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
  return (
    <SlideFlow layers={layers} revealStep={revealStep} cycle height={0} />
  );
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
}: {
  items?: Array<{ title: string; body?: string }>;
  revealStep: number;
}) {
  const { locale } = useApp();
  const cols =
    items.length === 4
      ? "sm:grid-cols-2 lg:grid-cols-4"
      : "sm:grid-cols-2 lg:grid-cols-3";
  return (
    <div className={`grid auto-rows-fr gap-2.5 sm:gap-3 ${cols}`}>
      {items.map((item, i) => (
        <RevealItem key={item.title} index={i} revealStep={revealStep}>
          <div className="flex h-full min-h-[7.5rem] flex-col rounded-lg border border-[var(--border)] bg-[var(--surface)] p-3 md:p-4">
            <div className="mb-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-[var(--brand-cyan)] text-sm font-bold text-white">
              {toLocaleDigits(i + 1, locale)}
            </div>
            <p className="text-sm font-bold md:text-base">{item.title}</p>
            {item.body ? (
              <p className="mt-1 flex-1 text-sm font-medium text-[var(--text-muted)] md:text-[0.95em]">
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
