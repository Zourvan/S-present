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
  const nodeCount = flow.nodes?.length ?? 0;
  const height = nodeCount > 5 ? 200 : nodeCount > 3 ? 220 : 240;

  return (
    <SlideFlow flow={flow} revealStep={revealStep} height={height} />
  );
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
  leftSteps?: string[];
  rightSteps?: string[];
  shared?: string[];
  revealStep: number;
  compact?: boolean;
}) {
  const { strings, locale } = useApp();
  return (
    <div
      className={`grid grid-cols-[1fr_auto_1fr] ${compact ? "gap-2" : "gap-3"}`}
    >
      <div
        className={`rounded-lg border-2 border-[var(--oral-coral)]/50 bg-[var(--oral-coral)]/5 ${
          compact ? "p-2.5" : "p-3"
        }`}
      >
        <p
          className={`mb-1.5 font-bold uppercase tracking-wide text-[var(--oral-coral)] ${
            compact ? "text-xs" : "text-sm"
          }`}
        >
          {leftTitle ?? strings.oral}
        </p>
        <ol className={compact ? "space-y-1" : "space-y-1.5"}>
          {leftSteps.map((step, i) => (
            <RevealItem key={step} index={i} revealStep={revealStep}>
              <li
                className={`flex gap-2 font-medium ${
                  compact ? "text-xs" : "text-sm"
                }`}
              >
                <span className="font-bold text-[var(--oral-coral)]">
                  {toLocaleDigits(i + 1, locale)}.
                </span>
                <span>{step}</span>
              </li>
            </RevealItem>
          ))}
        </ol>
      </div>
      <div className="flex flex-col items-center justify-center gap-1.5 px-1">
        <div
          className={`rounded-full border-2 border-[var(--brand-cyan)] bg-[var(--brand-cyan)]/10 text-center font-bold uppercase text-[var(--brand-cyan-dark)] ${
            compact ? "px-2.5 py-1.5 text-[10px]" : "px-3 py-2 text-xs"
          }`}
        >
          {strings.sharedPqs}
        </div>
        <ul
          className={`max-w-[140px] space-y-0.5 text-center font-medium text-[var(--text-muted)] ${
            compact ? "text-[10px]" : "text-xs"
          }`}
        >
          {shared.slice(0, 6).map((s, i) => (
            <RevealItem key={s} index={i + 2} revealStep={revealStep}>
              <li>{s}</li>
            </RevealItem>
          ))}
        </ul>
      </div>
      <div
        className={`rounded-lg border-2 border-[var(--biotech-burgundy)]/50 bg-[var(--biotech-burgundy)]/5 ${
          compact ? "p-2.5" : "p-3"
        }`}
      >
        <p
          className={`mb-1.5 font-bold uppercase tracking-wide text-[var(--biotech-burgundy)] ${
            compact ? "text-xs" : "text-sm"
          }`}
        >
          {rightTitle ?? strings.biotech}
        </p>
        <ol className={compact ? "space-y-1" : "space-y-1.5"}>
          {rightSteps.map((step, i) => (
            <RevealItem key={step} index={i} revealStep={revealStep}>
              <li
                className={`flex gap-2 font-medium ${
                  compact ? "text-xs" : "text-sm"
                }`}
              >
                <span className="font-bold text-[var(--biotech-burgundy)]">
                  {toLocaleDigits(i + 1, locale)}.
                </span>
                <span>{step}</span>
              </li>
            </RevealItem>
          ))}
        </ol>
      </div>
    </div>
  );
}
