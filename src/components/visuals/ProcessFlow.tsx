"use client";

import type { FlowData } from "@/lib/types";
import { useApp } from "@/lib/providers/AppProviders";
import { toLocaleDigits } from "@/lib/i18n/digits";
import { RevealItem } from "./Reveal";
import { SlideFlow } from "./flow/SlideFlow";

export function ProcessFlow({
  flow,
  revealStep,
}: {
  flow: FlowData;
  revealStep: number;
}) {
  return <SlideFlow flow={flow} revealStep={revealStep} height={0} />;
}

export function SplitPathways({
  leftTitle,
  rightTitle,
  leftSteps = [],
  rightSteps = [],
  shared = [],
  revealStep,
  compact = false,
}: {
  leftTitle?: string;
  rightTitle?: string;
  rightSteps?: string[];
  leftSteps?: string[];
  shared?: string[];
  revealStep: number;
  compact?: boolean;
}) {
  const { strings, locale } = useApp();
  return (
    <div
      className={`grid min-w-0 items-stretch ${
        compact
          ? "grid-cols-[1fr_minmax(7.5rem,9.5rem)_1fr] gap-2"
          : "grid-cols-[1fr_minmax(9.5rem,12.5rem)_1fr] gap-3"
      }`}
    >
      <div
        className={`min-w-0 rounded-lg border-2 border-[var(--oral-coral)]/50 bg-[var(--oral-coral)]/5 ${
          compact ? "p-2.5" : "p-3.5"
        }`}
      >
        <p
          className={`mb-1.5 font-bold uppercase tracking-wide text-[var(--oral-coral)] ${
            compact ? "text-xs" : "text-sm md:text-base"
          }`}
        >
          {leftTitle ?? strings.oral}
        </p>
        <ol className={compact ? "space-y-1" : "space-y-1.5"}>
          {leftSteps.map((step, i) => (
            <RevealItem key={step} index={i} revealStep={revealStep}>
              <li
                className={`flex gap-2 font-semibold leading-snug ${
                  compact ? "text-xs" : "text-sm md:text-[0.95em]"
                }`}
              >
                <span className="font-bold text-[var(--oral-coral)]">
                  {toLocaleDigits(i + 1, locale)}.
                </span>
                <span className="min-w-0">{step}</span>
              </li>
            </RevealItem>
          ))}
        </ol>
      </div>

      <div className="flex min-w-0 flex-col items-center justify-center gap-2 px-1">
        <div
          className={`w-full rounded-2xl border-2 border-[var(--brand-cyan)] bg-[var(--brand-cyan)]/15 text-center font-extrabold uppercase leading-tight text-[var(--brand-cyan-dark)] shadow-sm ${
            compact
              ? "px-2 py-2 text-[0.7rem]"
              : "px-3 py-2.5 text-sm md:text-base"
          }`}
        >
          {strings.sharedPqs}
        </div>
        <ul
          className={`w-full space-y-1 text-center font-semibold leading-snug text-[var(--text-ink)] ${
            compact ? "text-[0.65rem]" : "text-xs md:text-sm"
          }`}
        >
          {shared.slice(0, 6).map((s, i) => (
            <RevealItem key={s} index={i + 2} revealStep={revealStep}>
              <li className="rounded-md bg-[var(--brand-cyan)]/8 px-1.5 py-1">
                {s}
              </li>
            </RevealItem>
          ))}
        </ul>
      </div>

      <div
        className={`min-w-0 rounded-lg border-2 border-[var(--biotech-burgundy)]/50 bg-[var(--biotech-burgundy)]/5 ${
          compact ? "p-2.5" : "p-3.5"
        }`}
      >
        <p
          className={`mb-1.5 font-bold uppercase tracking-wide text-[var(--biotech-burgundy)] ${
            compact ? "text-xs" : "text-sm md:text-base"
          }`}
        >
          {rightTitle ?? strings.biotech}
        </p>
        <ol className={compact ? "space-y-1" : "space-y-1.5"}>
          {rightSteps.map((step, i) => (
            <RevealItem key={step} index={i} revealStep={revealStep}>
              <li
                className={`flex gap-2 font-semibold leading-snug ${
                  compact ? "text-xs" : "text-sm md:text-[0.95em]"
                }`}
              >
                <span className="font-bold text-[var(--biotech-burgundy)]">
                  {toLocaleDigits(i + 1, locale)}.
                </span>
                <span className="min-w-0">{step}</span>
              </li>
            </RevealItem>
          ))}
        </ol>
      </div>
    </div>
  );
}
