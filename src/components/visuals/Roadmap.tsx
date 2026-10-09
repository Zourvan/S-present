"use client";

import { useApp } from "@/lib/providers/AppProviders";
import { RevealItem } from "./Reveal";

export function RoadmapGantt({
  phases = [],
  revealStep,
}: {
  phases?: Array<{
    name: string;
    period: string;
    activities: string[];
    deliverables: string[];
  }>;
  revealStep: number;
}) {
  const { strings } = useApp();
  const colors = [
    "var(--brand-cyan)",
    "var(--oral-coral)",
    "var(--biotech-burgundy)",
    "var(--brand-cyan-dark)",
    "var(--shared-slate)",
  ];

  return (
    <div className="flex h-full min-h-0 flex-col gap-1.5">
      <p className="shrink-0 text-[11px] font-bold uppercase tracking-wide text-[var(--text-ink)]">
        {strings.roadmapNote}
      </p>
      <div className="grid min-h-0 flex-1 grid-rows-5 gap-1.5">
        {phases.slice(0, 5).map((phase, i) => (
          <RevealItem key={phase.name} index={i} revealStep={revealStep}>
            <div
              className="flex h-full min-h-0 flex-col justify-center rounded-md border border-[var(--border)] border-s-4 bg-[var(--surface)] px-2.5 py-1.5"
              style={{
                borderInlineStartColor: colors[i % colors.length],
              }}
            >
              <div className="flex flex-wrap items-baseline justify-between gap-x-2 gap-y-0.5">
                <h4 className="text-[13px] font-bold leading-tight">
                  {phase.name}
                </h4>
                <span className="rounded bg-[var(--bg-cream)] px-1.5 py-0.5 text-[10px] font-bold text-[var(--text-ink)]">
                  {phase.period}
                </span>
              </div>
              <p className="mt-0.5 line-clamp-2 text-[11px] font-medium leading-snug text-[var(--text-muted)]">
                <span className="font-bold text-[var(--brand-cyan-dark)]">
                  {strings.activities}:
                </span>{" "}
                {phase.activities.slice(0, 3).join(" · ")}
                <span className="mx-1.5 text-[var(--border)]">|</span>
                <span className="font-bold text-[var(--biotech-burgundy)]">
                  {strings.deliverables}:
                </span>{" "}
                {phase.deliverables.slice(0, 3).join(" · ")}
              </p>
            </div>
          </RevealItem>
        ))}
      </div>
    </div>
  );
}
