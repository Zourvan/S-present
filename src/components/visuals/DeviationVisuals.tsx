"use client";

import type { ToneName, VisualData, VisualType } from "@/lib/types";
import { REFERENCES } from "@/lib/references";
import { useApp } from "@/lib/providers/AppProviders";
import { RevealItem } from "./Reveal";

function toneVars(tone: ToneName = "violet") {
  if (tone === "amber") {
    return {
      border: "var(--tone-amber)",
      background: "var(--tone-amber-bg)",
      ink: "var(--tone-amber)",
    };
  }
  if (tone === "red") {
    return {
      border: "var(--tone-red)",
      background: "var(--tone-red-bg)",
      ink: "var(--tone-red)",
    };
  }
  return {
    border: "var(--tone-violet)",
    background: "var(--tone-violet-bg)",
    ink: "var(--tone-violet)",
  };
}

function Callout({ text }: { text: string }) {
  return (
    <p className="rounded-md border-l-4 border-[var(--tone-violet)] bg-[var(--tone-violet-bg)] px-2.5 py-1.5 text-[0.8em] font-semibold leading-snug text-[var(--text-ink)] sm:text-[0.85em]">
      {text}
    </p>
  );
}

function BlockCard({
  heading,
  points,
  chips = false,
}: {
  heading: string;
  points: string[];
  chips?: boolean;
}) {
  return (
    <section className="flex h-full min-h-0 min-w-0 flex-col rounded-lg border border-[var(--border)] bg-[var(--surface)] p-2.5 sm:p-3">
      <h3 className="mb-1.5 shrink-0 text-[0.8em] font-bold uppercase tracking-wide text-[var(--brand-cyan-dark)] sm:text-[0.85em]">
        {heading}
      </h3>
      {chips ? (
        <ul className="flex min-h-0 flex-1 flex-wrap content-start gap-1.5 overflow-y-auto">
          {points.map((point) => (
            <li
              key={point}
              className="rounded-full border border-[var(--border)] bg-[var(--bg-cream)] px-2 py-1 text-[0.75em] font-semibold leading-snug text-[var(--text-ink)] sm:text-[0.8em]"
            >
              {point}
            </li>
          ))}
        </ul>
      ) : (
        <ul className="min-h-0 flex-1 space-y-1.5 overflow-y-auto">
          {points.map((point) => (
            <li
              key={point}
              className="flex gap-1.5 text-[0.8em] font-medium leading-snug text-[var(--text-ink)] sm:text-[0.85em]"
            >
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--brand-cyan)]" />
              <span className="min-w-0">{point}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

function Badge({ children }: { children: string }) {
  return (
    <p className="w-fit rounded-full border border-[var(--tone-amber)] bg-[var(--tone-amber-bg)] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[var(--text-ink)]">
      {children}
    </p>
  );
}

function SourceLinks({ ids }: { ids: string[] }) {
  return (
    <p className="flex flex-wrap gap-x-2 gap-y-0.5 text-[10px] font-semibold">
      {ids.map((id) => {
        const ref = REFERENCES.find((entry) => entry.id === id);
        if (!ref) return <span key={id}>[{id}]</span>;
        return (
          <a
            key={id}
            href={ref.url}
            target="_blank"
            rel="noopener noreferrer"
            className="pointer-events-auto text-[var(--brand-cyan-dark)] underline-offset-2 hover:underline"
            onClick={(event) => event.stopPropagation()}
          >
            [{id}] {ref.name}
          </a>
        );
      })}
    </p>
  );
}

function LifecycleSlide({
  data,
  revealStep,
}: {
  data: VisualData;
  revealStep: number;
}) {
  const { strings } = useApp();
  const blocks = data.blocks ?? [];
  const legend = [
    ["amber", strings.eventAndInvestigation],
    ["red", strings.riskEscalationOnly],
    ["violet", strings.qualitySystemControls],
  ] as const;
  return (
    <div className="flex h-full min-h-0 flex-col gap-2">
      <div className="grid min-h-0 flex-1 grid-cols-1 gap-2 sm:grid-cols-3">
        {blocks.map((block, index) => (
          <RevealItem
            key={block.heading}
            index={index}
            revealStep={revealStep}
            className="min-h-0"
          >
            <BlockCard
              heading={block.heading}
              points={block.points}
              chips={index === 1}
            />
          </RevealItem>
        ))}
      </div>
      <RevealItem index={3} revealStep={revealStep} className="min-h-0">
        <figure
          className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-2"
          aria-label="Deviation lifecycle from detection through closure. Amber marks event and investigation stages. Red marks risk escalation only. Violet marks shared quality-system controls."
        >
          <figcaption className="mb-1 flex flex-wrap gap-1.5">
            {legend.map(([tone, label]) => {
              const colors = toneVars(tone);
              return (
                <span
                  key={tone}
                  className="rounded-full border px-2 py-0.5 text-[10px] font-bold"
                  style={{
                    borderColor: colors.border,
                    background: colors.background,
                    color: "var(--text-ink)",
                  }}
                >
                  <span style={{ color: colors.ink }}>{label}</span>
                </span>
              );
            })}
          </figcaption>
          <ol className="flex items-stretch gap-1">
            {(data.stages ?? []).map((stage, index) => {
              const colors = toneVars(stage.tone);
              return (
                <li key={stage.label} className="flex min-w-0 flex-1 items-center gap-1">
                  <div
                    className="min-w-0 flex-1 rounded-md border-2 px-1 py-1 text-center"
                    style={{
                      borderColor: colors.border,
                      background: colors.background,
                    }}
                  >
                    <p
                      className="text-[9px] font-bold uppercase tracking-wide"
                      style={{ color: colors.ink }}
                    >
                      {stage.caption}
                    </p>
                    <p className="text-[11px] font-bold leading-tight text-[var(--text-ink)]">
                      {stage.label}
                    </p>
                  </div>
                  {index < (data.stages?.length ?? 0) - 1 ? (
                    <span className="shrink-0 text-sm font-bold text-[var(--text-muted)]" aria-hidden>
                      →
                    </span>
                  ) : null}
                </li>
              );
            })}
          </ol>
          {data.branches?.[0] ? (
            <p
              className="mt-1.5 rounded-md border-2 px-2 py-1 text-[11px] font-semibold leading-snug text-[var(--text-ink)]"
              style={{
                borderColor: toneVars("red").border,
                background: toneVars("red").background,
              }}
            >
              <span className="font-bold" style={{ color: toneVars("red").ink }}>
                {strings.riskEscalation}:
              </span>{" "}
              {data.branches[0].steps.join(" ")}
            </p>
          ) : null}
        </figure>
      </RevealItem>
      {data.callout ? (
        <RevealItem index={4} revealStep={revealStep}>
          <Callout text={data.callout} />
        </RevealItem>
      ) : null}
    </div>
  );
}

function ContainmentSlide({
  data,
  revealStep,
}: {
  data: VisualData;
  revealStep: number;
}) {
  const { strings } = useApp();
  return (
    <div className="grid h-full min-h-0 grid-cols-1 gap-2 lg:grid-cols-[1.05fr_1fr]">
      <RevealItem index={0} revealStep={revealStep} className="min-h-0">
        <div className="grid h-full min-h-0 grid-cols-2 gap-2">
          {(data.blocks ?? []).map((block, index) => (
            <section
              key={block.heading}
              className="flex min-h-0 min-w-0 flex-col rounded-lg border border-[var(--border)] bg-[var(--surface)] p-2.5 sm:p-3"
            >
              <h3 className="shrink-0 text-[0.85em] font-bold text-[var(--brand-cyan-dark)] sm:text-[0.9em]">
                {index + 1}. {block.heading}
              </h3>
              <ul className="mt-1.5 min-h-0 flex-1 space-y-1.5 overflow-y-auto">
                {block.points.map((point) => (
                  <li
                    key={point}
                    className="text-[0.8em] font-medium leading-snug text-[var(--text-ink)] sm:text-[0.85em]"
                  >
                    {point}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </RevealItem>
      <RevealItem index={1} revealStep={revealStep} className="min-h-0">
        <figure
          className="flex h-full min-h-0 flex-col gap-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-2.5 sm:p-3"
          aria-label={strings.immediateResponseTree}
        >
          <figcaption className="shrink-0 text-[0.8em] font-bold uppercase tracking-wide text-[var(--brand-cyan-dark)] sm:text-[0.85em]">
            {strings.immediateResponseTree}
          </figcaption>
          <div
            className="shrink-0 rounded-md border-2 px-2 py-1.5 text-center text-[0.85em] font-bold text-[var(--text-ink)] sm:text-[0.9em]"
            style={{
              borderColor: toneVars("amber").border,
              background: toneVars("amber").background,
            }}
          >
            {strings.eventDetected}
          </div>
          <p className="shrink-0 text-center text-[0.85em] font-bold leading-snug text-[var(--text-ink)] sm:text-[0.9em]">
            {strings.immediateRiskQuestion}
          </p>
          <div className="grid min-h-0 flex-1 grid-cols-1 gap-1.5 sm:grid-cols-3">
            {(data.branches ?? []).map((branch) => {
              const colors = toneVars(branch.tone);
              return (
                <div
                  key={branch.label}
                  className="flex min-h-0 flex-col rounded-md border-2 p-2"
                  style={{
                    borderColor: colors.border,
                    background: colors.background,
                  }}
                >
                  <p
                    className="shrink-0 text-[0.8em] font-bold leading-tight sm:text-[0.85em]"
                    style={{ color: colors.ink }}
                  >
                    {branch.label}
                  </p>
                  <ol className="mt-1.5 min-h-0 flex-1 space-y-1 overflow-y-auto">
                    {branch.steps.map((step, index) => (
                      <li
                        key={step}
                        className="text-[0.78em] font-semibold leading-snug text-[var(--text-ink)] sm:text-[0.82em]"
                      >
                        {index + 1}. {step}
                      </li>
                    ))}
                  </ol>
                </div>
              );
            })}
          </div>
          <p
            className="shrink-0 rounded-md border-2 px-2 py-1.5 text-center text-[0.8em] font-bold text-[var(--text-ink)] sm:text-[0.85em]"
            style={{
              borderColor: toneVars("violet").border,
              background: toneVars("violet").background,
            }}
          >
            {strings.allBranchesDocumented}
          </p>
        </figure>
      </RevealItem>
    </div>
  );
}

const RISK_BANDS: Array<Array<"Low" | "Moderate" | "High">> = [
  ["Moderate", "Moderate", "High", "High", "High"],
  ["Moderate", "Moderate", "Moderate", "High", "High"],
  ["Low", "Moderate", "Moderate", "Moderate", "High"],
  ["Low", "Low", "Moderate", "Moderate", "Moderate"],
  ["Low", "Low", "Low", "Moderate", "Moderate"],
];

function bandFill(band: "Low" | "Moderate" | "High") {
  if (band === "Low") return "var(--risk-low)";
  if (band === "Moderate") return "var(--risk-moderate)";
  return "var(--risk-high)";
}

function RiskSlide({
  data,
  revealStep,
}: {
  data: VisualData;
  revealStep: number;
}) {
  const { strings } = useApp();
  const factors = data.blocks?.[0];
  const decisions = data.blocks?.[1];
  const likelihood = [
    strings.axisLowest,
    strings.axisLower,
    strings.axisMiddle,
    strings.axisHigher,
    strings.axisHighest,
  ];
  const consequence = [
    strings.axisHighest,
    strings.axisHigher,
    strings.axisMiddle,
    strings.axisLower,
    strings.axisLowest,
  ];
  const bandLabel = {
    Low: strings.riskBandLow,
    Moderate: strings.riskBandModerate,
    High: strings.riskBandHigh,
  } as const;
  return (
    <div className="grid h-full min-h-0 grid-cols-[0.9fr_1.1fr] gap-2">
      <div className="flex min-h-0 flex-col gap-1.5">
        {factors ? (
          <RevealItem index={0} revealStep={revealStep}>
            <section className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-2">
              <h3 className="mb-1 text-[12px] font-bold uppercase tracking-wide text-[var(--brand-cyan-dark)]">
                {factors.heading}
              </h3>
              <dl className="space-y-0.5">
                {factors.points.map((point) => {
                  const [term, ...rest] = point.split(": ");
                  return (
                    <div key={point} className="grid grid-cols-[6.6rem_1fr] gap-1">
                      <dt className="text-[11px] font-bold text-[var(--text-ink)]">{term}</dt>
                      <dd className="text-[11px] font-medium leading-snug text-[var(--text-ink)]">
                        {rest.join(": ")}
                      </dd>
                    </div>
                  );
                })}
              </dl>
            </section>
          </RevealItem>
        ) : null}
        {decisions ? (
          <RevealItem index={1} revealStep={revealStep}>
            <BlockCard heading={decisions.heading} points={decisions.points} />
          </RevealItem>
        ) : null}
      </div>
      <RevealItem index={2} revealStep={revealStep} className="min-h-0">
        <figure className="flex h-full flex-col rounded-lg border border-[var(--border)] bg-[var(--surface)] p-2">
          <figcaption className="mb-1 text-[11px] font-bold uppercase tracking-wide text-[var(--text-ink)]">
            {strings.riskMatrix5x5Title}
          </figcaption>
          <table className="w-full flex-1 border-collapse text-center">
            <caption className="sr-only">{strings.riskMatrixAxisNote}</caption>
            <thead>
              <tr>
                <th className="p-1 text-start text-[10px] font-bold text-[var(--text-ink)]">
                  {strings.consequenceLikelihood}
                </th>
                {likelihood.map((label) => (
                  <th key={label} className="p-1 text-[10px] font-bold text-[var(--text-ink)]">
                    {label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {RISK_BANDS.map((row, rowIndex) => (
                <tr key={consequence[rowIndex]}>
                  <th className="pe-1 text-end text-[10px] font-bold text-[var(--text-ink)]">
                    {consequence[rowIndex]}
                  </th>
                  {row.map((band, colIndex) => (
                    <td key={`${rowIndex}-${colIndex}`} className="p-0.5">
                      <div
                        className="flex h-7 items-center justify-center rounded text-[11px] font-extrabold text-white"
                        style={{ background: bandFill(band) }}
                      >
                        {bandLabel[band]}
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-1 text-[10px] font-medium leading-snug text-[var(--text-muted)]">
            {strings.riskMatrixAxisNote}
          </p>
          {data.callout ? (
            <p
              className="mt-1 rounded-md border-2 px-2 py-1 text-[11px] font-semibold leading-snug text-[var(--text-ink)]"
              style={{
                borderColor: toneVars("red").border,
                background: toneVars("red").background,
              }}
            >
              <span className="font-bold" style={{ color: toneVars("red").ink }}>
                {strings.escalate}:
              </span>{" "}
              {data.callout}
            </p>
          ) : null}
        </figure>
      </RevealItem>
    </div>
  );
}

function EvidenceSlide({
  data,
  revealStep,
}: {
  data: VisualData;
  revealStep: number;
}) {
  const { strings } = useApp();
  const plan = data.blocks?.[0];
  const nodes = data.nodes ?? [];
  return (
    <div className="grid h-full min-h-0 grid-cols-[0.95fr_1.05fr] gap-2">
      {plan ? (
        <RevealItem index={0} revealStep={revealStep}>
          <section className="h-full rounded-lg border border-[var(--border)] bg-[var(--surface)] p-2">
            <h3 className="mb-1 text-[12px] font-bold uppercase tracking-wide text-[var(--brand-cyan-dark)]">
              {plan.heading}
            </h3>
            <ol className="space-y-1">
              {plan.points.map((point, index) => (
                <li key={point} className="flex gap-1.5 text-[12px] font-medium leading-snug">
                  <span className="font-bold text-[var(--brand-cyan-dark)]">{index + 1}.</span>
                  <span>{point}</span>
                </li>
              ))}
            </ol>
          </section>
        </RevealItem>
      ) : null}
      <RevealItem index={1} revealStep={revealStep} className="min-h-0">
        <figure
          className="flex h-full flex-col justify-between rounded-lg border border-[var(--border)] bg-[var(--surface)] p-2"
          aria-label="Evidence map with the deviation in the center and six evidence categories: process, people, equipment, materials, measurement, and environment."
        >
          <figcaption className="text-[11px] font-bold uppercase tracking-wide text-[var(--brand-cyan-dark)]">
            {strings.evidenceMap}
          </figcaption>
          <ul className="grid grid-cols-3 gap-1.5">
            {nodes.slice(0, 3).map((node) => (
              <li
                key={node}
                className="rounded-md border-2 px-1 py-1.5 text-center text-[12px] font-bold text-[var(--text-ink)]"
                style={{
                  borderColor: toneVars("amber").border,
                  background: toneVars("amber").background,
                }}
              >
                {node}
              </li>
            ))}
          </ul>
          <div className="mx-auto my-1 w-fit rounded-full border-2 border-[var(--tone-violet)] bg-[var(--tone-violet-bg)] px-4 py-1.5 text-center text-[13px] font-bold text-[var(--text-ink)]">
            {strings.deviation}
          </div>
          <ul className="grid grid-cols-3 gap-1.5">
            {nodes.slice(3, 6).map((node) => (
              <li
                key={node}
                className="rounded-md border-2 px-1 py-1.5 text-center text-[12px] font-bold text-[var(--text-ink)]"
                style={{
                  borderColor: toneVars("amber").border,
                  background: toneVars("amber").background,
                }}
              >
                {node}
              </li>
            ))}
          </ul>
          <p className="mt-1.5 text-[11px] font-semibold leading-snug text-[var(--text-ink)]">
            <span className="font-bold text-[var(--tone-violet)]">
              {strings.possibleContributors}:{" "}
            </span>
            {(data.contributors ?? []).join(" · ")}
          </p>
          {data.blocks?.[1] ? (
            <p className="mt-1 text-[11px] font-medium leading-snug text-[var(--text-muted)]">
              {data.blocks[1].points.join(" ")}
            </p>
          ) : null}
        </figure>
      </RevealItem>
    </div>
  );
}

function FishboneSlide({
  data,
  revealStep,
}: {
  data: VisualData;
  revealStep: number;
}) {
  const methods = data.blocks?.[0];
  const causes = data.blocks?.[1];
  const failures = data.blocks?.[2];
  const bones = data.bones ?? [];
  return (
    <div className="grid h-full min-h-0 grid-cols-[0.92fr_1.08fr] gap-2">
      <div className="flex min-h-0 flex-col gap-1.5">
        {methods ? (
          <RevealItem index={0} revealStep={revealStep}>
            <BlockCard heading={methods.heading} points={methods.points} chips />
          </RevealItem>
        ) : null}
        {causes ? (
          <RevealItem index={1} revealStep={revealStep}>
            <section className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-2">
              <h3 className="mb-1 text-[12px] font-bold uppercase tracking-wide text-[var(--brand-cyan-dark)]">
                {causes.heading}
              </h3>
              <ul className="space-y-0.5">
                {causes.points.map((point) => (
                  <li
                    key={point}
                    className="flex gap-1.5 text-[11px] font-medium leading-snug text-[var(--text-ink)]"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--brand-cyan)]" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </section>
          </RevealItem>
        ) : null}
        {failures ? (
          <RevealItem index={1} revealStep={revealStep}>
            <BlockCard heading={failures.heading} points={failures.points} />
          </RevealItem>
        ) : null}
      </div>
      <RevealItem index={2} revealStep={revealStep} className="h-full min-h-0">
        <figure
          className="flex h-full flex-col rounded-lg border border-[var(--border)] bg-[var(--surface)] p-2"
          aria-label="Hypothetical fishbone for tablet-weight variation. Every branch is a potential cause and requires evidence. No verified root cause is shown."
        >
          <figcaption className="mb-1 flex flex-wrap items-center gap-1.5">
            <Badge>Hypothetical example</Badge>
            <span className="text-[11px] font-semibold text-[var(--text-ink)]">
              No branch is a confirmed cause
            </span>
          </figcaption>
          <div className="flex min-h-0 flex-1 flex-col justify-between gap-1">
            <ul className="grid grid-cols-3 gap-1">
              {bones.slice(0, 3).map((bone) => (
                <Bone key={bone} label={bone} />
              ))}
            </ul>
            <div className="flex items-center gap-1" aria-hidden>
              <div className="h-1 flex-1 rounded bg-[var(--text-ink)]" />
              <span className="text-sm font-bold">▶</span>
            </div>
            <ul className="grid grid-cols-3 gap-1">
              {bones.slice(3).map((bone) => (
                <Bone key={bone} label={bone} />
              ))}
            </ul>
          </div>
          <p
            className="mt-1.5 rounded-md border-2 px-2 py-1 text-[12px] font-bold leading-snug text-[var(--text-ink)]"
            style={{
              borderColor: toneVars("amber").border,
              background: toneVars("amber").background,
            }}
          >
            Effect (hypothetical): {data.effect}
          </p>
        </figure>
      </RevealItem>
    </div>
  );
}

function Bone({ label }: { label: string }) {
  return (
    <li
      className="rounded-md border-2 px-1 py-1 text-center"
      style={{
        borderColor: toneVars("amber").border,
        background: toneVars("amber").background,
      }}
    >
      <p className="text-[11px] font-bold leading-tight text-[var(--text-ink)]">{label}</p>
      <p className="text-[9px] font-semibold leading-tight text-[var(--text-ink)]">
        Potential causes — evidence required
      </p>
    </li>
  );
}

function OosSlide({
  data,
  revealStep,
}: {
  data: VisualData;
  revealStep: number;
}) {
  const blocks = data.blocks ?? [];
  return (
    <div className="grid h-full min-h-0 grid-cols-[0.92fr_1.08fr] gap-2">
      <div className="flex min-h-0 flex-col gap-1.5">
        {blocks.slice(0, 2).map((block, index) => (
          <RevealItem key={block.heading} index={index} revealStep={revealStep}>
            <BlockCard heading={block.heading} points={block.points} />
          </RevealItem>
        ))}
        {blocks[2] ? (
          <RevealItem index={1} revealStep={revealStep}>
            <section className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-2">
              <h3 className="mb-1 text-[12px] font-bold uppercase tracking-wide text-[var(--brand-cyan-dark)]">
                {blocks[2].heading}
              </h3>
              <ol className="space-y-0.5">
                {blocks[2].points.map((point, index) => (
                  <li key={point} className="text-[11px] font-medium leading-snug">
                    <span className="font-bold text-[var(--brand-cyan-dark)]">{index + 1}. </span>
                    {point}
                  </li>
                ))}
              </ol>
            </section>
          </RevealItem>
        ) : null}
      </div>
      <RevealItem index={2} revealStep={revealStep} className="min-h-0">
        <figure
          className="flex h-full flex-col gap-1.5 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-2"
          aria-label="Two-stage OOS investigation. Stage 1 is the initial laboratory assessment. If a laboratory cause is demonstrated, document it and assess impact. If not, expand to a full investigation. OOT signals follow a separate path through trend review and risk-based investigation."
        >
          <figcaption className="text-[11px] font-bold uppercase tracking-wide text-[var(--brand-cyan-dark)]">
            Two-stage OOS investigation
          </figcaption>
          <div
            className="rounded-md border-2 px-2 py-1.5"
            style={{
              borderColor: toneVars("amber").border,
              background: toneVars("amber").background,
            }}
          >
            <p className="text-[12px] font-bold text-[var(--text-ink)]">
              Stage 1 — Initial laboratory assessment
            </p>
            <p className="text-[11px] font-medium leading-snug text-[var(--text-ink)]">
              Review original data, calculations, equipment, procedure execution, and sample handling.
            </p>
          </div>
          <p className="text-center text-[12px] font-bold text-[var(--text-ink)]">
            Is a scientifically demonstrated laboratory cause established?
          </p>
          <div className="grid grid-cols-2 gap-1.5">
            {(data.branches ?? []).map((branch) => {
              const colors = toneVars(branch.tone);
              return (
                <div
                  key={branch.label}
                  className="rounded-md border-2 p-1.5"
                  style={{ borderColor: colors.border, background: colors.background }}
                >
                  <p className="text-[12px] font-bold" style={{ color: colors.ink }}>
                    {branch.label}
                  </p>
                  {branch.steps.map((step) => (
                    <p
                      key={step}
                      className="mt-0.5 text-[11px] font-semibold leading-snug text-[var(--text-ink)]"
                    >
                      {step}
                    </p>
                  ))}
                </div>
              );
            })}
          </div>
          <p
            className="mt-auto rounded-md border-2 px-2 py-1.5 text-[11px] font-semibold leading-snug text-[var(--text-ink)]"
            style={{
              borderColor: toneVars("violet").border,
              background: toneVars("violet").background,
            }}
          >
            <span className="font-bold" style={{ color: toneVars("violet").ink }}>
              Separate OOT path:
            </span>{" "}
            {data.callout}
          </p>
        </figure>
      </RevealItem>
    </div>
  );
}

function ImpactSlide({
  data,
  revealStep,
}: {
  data: VisualData;
  revealStep: number;
}) {
  const dimensions = data.blocks?.[0];
  const oral = data.blocks?.[1];
  const biotech = data.blocks?.[2];
  return (
    <div className="flex h-full min-h-0 flex-col gap-1.5">
      {dimensions ? (
        <RevealItem index={0} revealStep={revealStep}>
          <section className="rounded-lg border border-[var(--border)] bg-[var(--surface)] px-2 py-1.5">
            <h3 className="text-[11px] font-bold uppercase tracking-wide text-[var(--brand-cyan-dark)]">
              {dimensions.heading}
            </h3>
            <ul className="mt-0.5 grid grid-cols-2 gap-x-3 gap-y-0.5">
              {dimensions.points.map((point) => (
                <li key={point} className="text-[11px] font-medium leading-snug text-[var(--text-ink)]">
                  {point}
                </li>
              ))}
            </ul>
          </section>
        </RevealItem>
      ) : null}
      <RevealItem index={1} revealStep={revealStep}>
        <div className="grid grid-cols-2 gap-1.5">
          {[oral, biotech].map((block) =>
            block ? (
              <section
                key={block.heading}
                className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-2"
              >
                <Badge>Hypothetical example</Badge>
                <h3 className="mt-1 text-[12px] font-bold text-[var(--text-ink)]">{block.heading}</h3>
                <ul className="mt-0.5 space-y-0.5">
                  {block.points.map((point) => (
                    <li key={point} className="text-[11px] font-medium leading-snug text-[var(--text-ink)]">
                      {point}
                    </li>
                  ))}
                </ul>
              </section>
            ) : null,
          )}
        </div>
      </RevealItem>
      {data.table ? (
        <RevealItem index={2} revealStep={revealStep} className="min-h-0">
          <div className="overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--surface)]">
            {data.table.caption ? (
              <p className="border-b border-[var(--border)] bg-[var(--bg-cream)] px-2 py-1 text-[11px] font-semibold text-[var(--text-ink)]">
                {data.table.caption}
              </p>
            ) : null}
            <table className="w-full table-fixed border-collapse text-left">
              <thead>
                <tr className="bg-[var(--brand-cyan)]/15">
                  {data.table.headers.map((header) => (
                    <th
                      key={header}
                      className="border-b border-[var(--border)] px-1.5 py-1 text-[11px] font-bold leading-tight text-[var(--text-ink)]"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.table.rows.map((row) => (
                  <tr key={row[0]} className="odd:bg-[var(--surface)] even:bg-[var(--bg-cream)]/50">
                    {row.map((cell, cellIndex) => (
                      <td
                        key={`${row[0]}-${cellIndex}`}
                        className={`border-b border-[var(--border)] px-1.5 py-1 text-[11px] leading-snug text-[var(--text-ink)] ${
                          cellIndex === 0 ? "font-bold" : "font-medium"
                        }`}
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
      ) : null}
    </div>
  );
}

function CapaDesignSlide({
  data,
  revealStep,
}: {
  data: VisualData;
  revealStep: number;
}) {
  return (
    <div className="grid h-full min-h-0 grid-cols-[1.05fr_0.95fr] gap-2">
      <RevealItem index={0} revealStep={revealStep} className="min-h-0">
        <div className="flex h-full flex-col gap-1.5">
          <div className="grid grid-cols-2 gap-1.5">
            {(data.blocks ?? []).slice(0, 4).map((block) => (
              <section
                key={block.heading}
                className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-2"
              >
                <h3 className="text-[12px] font-bold text-[var(--brand-cyan-dark)]">{block.heading}</h3>
                <ul className="mt-1 space-y-0.5">
                  {block.points.map((point) => (
                    <li key={point} className="text-[11px] font-medium leading-snug text-[var(--text-ink)]">
                      {point}
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
          {data.blocks?.[4] ? (
            <BlockCard
              heading={data.blocks[4].heading}
              points={data.blocks[4].points}
              chips
            />
          ) : null}
        </div>
      </RevealItem>
      <div className="flex min-h-0 flex-col gap-1.5">
        <RevealItem index={1} revealStep={revealStep}>
          <figure
            className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-2"
            aria-label="Four-layer CAPA model: contain, correct, eliminate or control the demonstrated cause, then verify effectiveness."
          >
            <figcaption className="mb-1 text-[11px] font-bold uppercase tracking-wide text-[var(--brand-cyan-dark)]">
              Four-layer CAPA model
            </figcaption>
            <ol className="space-y-1">
              {(data.stages ?? []).map((stage, index) => {
                const colors = toneVars(stage.tone);
                return (
                  <li key={stage.label} className="flex items-center gap-1">
                    <span
                      className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white"
                      style={{ background: colors.border }}
                    >
                      {index + 1}
                    </span>
                    <span
                      className="min-w-0 flex-1 rounded-md border-2 px-2 py-0.5 text-[12px] font-bold text-[var(--text-ink)]"
                      style={{ borderColor: colors.border, background: colors.background }}
                    >
                      {stage.label}
                    </span>
                  </li>
                );
              })}
            </ol>
          </figure>
        </RevealItem>
        <RevealItem index={2} revealStep={revealStep}>
          <section className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-2">
            <h3 className="text-[11px] font-bold leading-snug text-[var(--tone-violet)]">
              {data.frameworkNote}
            </h3>
            <ol className="mt-1 space-y-0.5">
              {(data.framework ?? []).map((item, index) => (
                <li key={item} className="text-[11px] font-semibold leading-snug text-[var(--text-ink)]">
                  {index + 1}. {item}
                </li>
              ))}
            </ol>
          </section>
        </RevealItem>
      </div>
    </div>
  );
}

function CapaClosureSlide({
  data,
  revealStep,
}: {
  data: VisualData;
  revealStep: number;
}) {
  return (
    <div className="grid h-full min-h-0 grid-cols-[0.9fr_1.1fr] gap-2">
      <RevealItem index={0} revealStep={revealStep}>
        <div className="flex h-full flex-col gap-1.5">
          {(data.blocks ?? []).map((block) => (
            <BlockCard key={block.heading} heading={block.heading} points={block.points} />
          ))}
        </div>
      </RevealItem>
      <RevealItem index={1} revealStep={revealStep} className="min-h-0">
        <figure
          className="flex h-full flex-col gap-1.5 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-2"
          aria-label="CAPA lifecycle from approval through effectiveness assessment. An effective outcome can be closed. An ineffective outcome reopens the investigation or CAPA, reassesses the cause, and revises the actions. Overdue actions and overdue effectiveness assessments escalate under the approved quality system."
        >
          <figcaption className="text-[11px] font-bold uppercase tracking-wide text-[var(--brand-cyan-dark)]">
            Execution and effectiveness lifecycle
          </figcaption>
          <ol className="flex flex-wrap items-center gap-1">
            {(data.stages ?? []).map((stage, index) => (
              <li key={stage.label} className="flex items-center gap-1">
                <span
                  className="rounded-md border-2 px-1.5 py-1 text-[11px] font-bold leading-tight text-[var(--text-ink)]"
                  style={{
                    borderColor: toneVars(stage.tone).border,
                    background: toneVars(stage.tone).background,
                  }}
                >
                  {stage.label}
                </span>
                {index < (data.stages?.length ?? 0) - 1 ? (
                  <span aria-hidden className="font-bold text-[var(--text-muted)]">
                    →
                  </span>
                ) : null}
              </li>
            ))}
          </ol>
          <div className="grid flex-1 grid-cols-2 gap-1.5">
            {(data.branches ?? []).map((branch) => {
              const colors = toneVars(branch.tone);
              return (
                <div
                  key={branch.label}
                  className="rounded-md border-2 p-1.5"
                  style={{ borderColor: colors.border, background: colors.background }}
                >
                  <p className="text-[12px] font-bold" style={{ color: colors.ink }}>
                    {branch.label}
                  </p>
                  <ul className="mt-1 space-y-0.5">
                    {branch.steps.map((step) => (
                      <li key={step} className="text-[11px] font-semibold leading-snug text-[var(--text-ink)]">
                        {step}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
          {data.callout ? <Callout text={data.callout} /> : null}
        </figure>
      </RevealItem>
    </div>
  );
}

function CaseSlide({
  data,
  revealStep,
}: {
  data: VisualData;
  revealStep: number;
}) {
  const report = data.blocks?.[0];
  const governance = data.blocks?.[1];
  const worked = data.blocks?.[2];
  const biotech = data.blocks?.[3];
  return (
    <div className="flex h-full min-h-0 flex-col gap-1.5">
      <div className="grid min-h-0 flex-1 grid-cols-2 gap-1.5">
        <RevealItem index={0} revealStep={revealStep} className="min-h-0">
          <section className="h-full rounded-lg border border-[var(--border)] bg-[var(--surface)] p-2">
            <h3 className="text-[12px] font-bold text-[var(--brand-cyan-dark)]">{report?.heading}</h3>
            <ol className="mt-1 grid grid-cols-2 gap-x-2 gap-y-0.5">
              {(report?.points ?? []).map((point, index) => (
                <li key={point} className="text-[11px] font-medium leading-snug text-[var(--text-ink)]">
                  <span className="font-bold text-[var(--tone-violet)]">{index + 1}. </span>
                  {point}
                </li>
              ))}
            </ol>
            {governance ? (
              <div className="mt-1.5 border-t border-[var(--border)] pt-1">
                <h3 className="text-[11px] font-bold uppercase tracking-wide text-[var(--brand-cyan-dark)]">
                  {governance.heading}
                </h3>
                <ul className="mt-0.5 space-y-0.5">
                  {governance.points.map((point) => (
                    <li key={point} className="text-[11px] font-medium leading-snug text-[var(--text-ink)]">
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </section>
        </RevealItem>
        <RevealItem index={1} revealStep={revealStep} className="min-h-0">
          <section className="flex h-full flex-col rounded-lg border border-[var(--border)] bg-[var(--surface)] p-2">
            {data.badge ? <Badge>{data.badge}</Badge> : null}
            <h3 className="mt-1 text-[12px] font-bold text-[var(--text-ink)]">{worked?.heading}</h3>
            <ol className="mt-1 space-y-0.5">
              {(worked?.points ?? []).map((point, index) => (
                <li key={point} className="flex gap-1 text-[11px] font-medium leading-snug text-[var(--text-ink)]">
                  <span className="font-bold text-[var(--tone-amber)]">{index + 1}.</span>
                  <span>{point}</span>
                </li>
              ))}
            </ol>
            {biotech ? (
              <p className="mt-auto pt-1 text-[11px] font-medium leading-snug text-[var(--text-ink)]">
                <span className="font-bold">{biotech.heading}: </span>
                {biotech.points.join(" ")}
              </p>
            ) : null}
          </section>
        </RevealItem>
      </div>
      <RevealItem index={2} revealStep={revealStep}>
        <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] px-2 py-1.5">
          <p className="text-[10px] font-bold uppercase tracking-wide text-[var(--brand-cyan-dark)]">
            Investigation findings connect to
          </p>
          <ol className="mt-1 flex flex-wrap items-center gap-1">
            {(data.links ?? []).map((link, index) => (
              <li key={link} className="flex items-center gap-1">
                <span
                  className="rounded-full border-2 px-2 py-0.5 text-[11px] font-bold text-[var(--text-ink)]"
                  style={{
                    borderColor: toneVars("violet").border,
                    background: toneVars("violet").background,
                  }}
                >
                  {link}
                </span>
                {index < (data.links?.length ?? 0) - 1 ? (
                  <span aria-hidden className="font-bold text-[var(--text-muted)]">
                    →
                  </span>
                ) : null}
              </li>
            ))}
          </ol>
          {data.sourceIds?.length ? (
            <div className="mt-1">
              <SourceLinks ids={data.sourceIds} />
            </div>
          ) : null}
        </div>
      </RevealItem>
    </div>
  );
}

export function DeviationVisual({
  type,
  data,
  revealStep,
}: {
  type: VisualType;
  data: VisualData;
  revealStep: number;
}) {
  switch (type) {
    case "deviationLifecycle":
      return <LifecycleSlide data={data} revealStep={revealStep} />;
    case "containmentTree":
      return <ContainmentSlide data={data} revealStep={revealStep} />;
    case "riskPrioritization":
      return <RiskSlide data={data} revealStep={revealStep} />;
    case "evidenceMap":
      return <EvidenceSlide data={data} revealStep={revealStep} />;
    case "fishbone":
      return <FishboneSlide data={data} revealStep={revealStep} />;
    case "oosWorkflow":
      return <OosSlide data={data} revealStep={revealStep} />;
    case "impactCompare":
      return <ImpactSlide data={data} revealStep={revealStep} />;
    case "capaDesign":
      return <CapaDesignSlide data={data} revealStep={revealStep} />;
    case "capaClosure":
      return <CapaClosureSlide data={data} revealStep={revealStep} />;
    case "investigationCase":
      return <CaseSlide data={data} revealStep={revealStep} />;
    default:
      return null;
  }
}
